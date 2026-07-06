# Build for the "web" app (Next.js standalone) in this Turborepo monorepo.
# Built by .github/workflows/docker-publish.yml and pushed to ghcr.io/billscol/mifily.
#
# No `turbo prune` step: it's just a Docker-layer-caching optimization, and
# turbo 1.12.5's prune has known lockfile-pruning bugs with pnpm 9's
# lockfile format (root-only devDependencies like eslint get dropped from
# the pruned pnpm-lock.yaml). A plain root install is slower but reliable,
# and this only runs in CI, not on the resource-constrained VPS.

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile

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

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
