# Standalone app, not part of the apps/web Turborepo build - no
# workspace:* dependencies, so it's built in complete isolation (only this
# folder is copied in, no root pnpm-workspace.yaml visible).

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat openssl
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY apps/admin/ .
RUN corepack prepare pnpm@9.15.9 --activate
RUN pnpm install --no-frozen-lockfile
ENV NODE_ENV=production
RUN pnpm run build

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
