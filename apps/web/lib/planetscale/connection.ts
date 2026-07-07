import { prisma } from "@/lib/prisma";

// Self-hosted: no PlanetScale HTTP endpoint in front of our MySQL, so this
// is a drop-in shim (same `{ rows }` shape as @planetscale/database's
// Connection.execute()) backed by the regular TCP-based Prisma client
// instead, matching what every caller in this directory already expects.
export const conn = {
  execute: async <T = any>(
    sql: string,
    params: unknown[] = [],
  ): Promise<{ rows: T[]; rowsAffected: number }> => {
    if (/^\s*select/i.test(sql)) {
      const rows = await prisma.$queryRawUnsafe<T[]>(sql, ...params);
      return { rows, rowsAffected: rows.length };
    }
    const rowsAffected = await prisma.$executeRawUnsafe(sql, ...params);
    return { rows: [], rowsAffected };
  },
};
