// Self-hosted: no PlanetScale HTTP endpoint in front of our MySQL, and our
// middleware runs with `runtime: "nodejs"` (see apps/web/middleware.ts), so
// the regular TCP-based Prisma client works fine here - no need for the
// HTTP-based PlanetScale driver this file used originally.
export { prisma as prismaEdge } from "./index";
