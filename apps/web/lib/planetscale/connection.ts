import { prisma } from "@/lib/prisma";

// Self-hosted: no PlanetScale HTTP endpoint in front of our MySQL, so this
// is a drop-in shim (same `{ rows }` shape as @planetscale/database's
// Connection.execute()) backed by the regular TCP-based Prisma client
// instead, matching what every caller in this directory already expects.
export const conn = {
  execute: async (sql: string, params: unknown[] = []) => {
    if (/^\s*select/i.test(sql)) {
      const rows = await prisma.$queryRawUnsafe<Record<string, unknown>[]>(
        sql,
        ...params,
      );
      return { rows };
    }
    const rowsAffected = await prisma.$executeRawUnsafe(sql, ...params);
    return { rowsAffected };
  },
};
