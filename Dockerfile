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

# Build-time-only placeholder env (see deploy/build-env.sh for why).
RUN sh deploy/build-env.sh

# `next build` runs generateStaticParams for some pages (e.g. partner
# program routes), which execute real Prisma queries. Point at the
# ephemeral, empty MySQL service the workflow starts (reachable at
# 127.0.0.1 because the build runs with `network: host`) and push the
# schema so those queries return `[]` instead of failing the build. This
# overrides the placeholder DATABASE_URL from build-env.sh: dotenv-flow
# never overrides an already-set process env var.
ENV DATABASE_URL="mysql://root:root@127.0.0.1:3306/mifily_ci"
RUN pnpm --filter web run prisma:push

ENV NODE_ENV=production
# The GH Actions runner has ~7GB RAM; Next.js's default V8 heap limit isn't
# enough for this monorepo's build and OOMs otherwise.
ENV NODE_OPTIONS="--max-old-space-size=6144"
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
