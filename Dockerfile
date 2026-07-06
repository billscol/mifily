# Multi-stage build for the "web" app (Next.js standalone) in this Turborepo monorepo.
# Built by .github/workflows/docker-publish.yml and pushed to ghcr.io/billscol/mifily.

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable

FROM base AS pruner
WORKDIR /app
COPY . .
RUN npx turbo prune --scope=web --docker

FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

# Build-time-only placeholder env: `next build` runs `prisma generate` (needs
# DATABASE_URL to be *defined*, not reachable) and may touch other env vars
# at module-load time. Real values are injected at runtime via docker-compose.
RUN printf '%s\n' \
  'DATABASE_URL="mysql://user:pass@localhost:3306/db"' \
  'NEXTAUTH_SECRET="build-time-placeholder"' \
  'NEXTAUTH_URL="https://app.mifily.com"' \
  'CRON_SECRET="build-time-placeholder"' \
  'ENCRYPTION_KEY="build-time-placeholder"' \
  'UPSTASH_REDIS_REST_URL="https://localhost"' \
  'UPSTASH_REDIS_REST_TOKEN="build-time-placeholder"' \
  'QSTASH_TOKEN="build-time-placeholder"' \
  'QSTASH_CURRENT_SIGNING_KEY="build-time-placeholder"' \
  'QSTASH_NEXT_SIGNING_KEY="build-time-placeholder"' \
  'TINYBIRD_API_KEY="build-time-placeholder"' \
  'RESEND_API_KEY="build-time-placeholder"' \
  > apps/web/.env

ENV NODE_ENV=production
RUN pnpm turbo run build --filter=web

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
