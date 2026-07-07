"use server";

import { prisma } from "@/lib/prisma";

export async function search(query: string) {
  const q = query.trim();
  if (!q) return { workspaces: [], users: [] };

  const [workspaces, users] = await Promise.all([
    prisma.project.findMany({
      where: {
        OR: [{ slug: { contains: q } }, { name: { contains: q } }],
      },
      select: { id: true, name: true, slug: true, plan: true },
      take: 20,
    }),
    prisma.user.findMany({
      where: {
        OR: [{ email: { contains: q } }, { name: { contains: q } }],
      },
      select: { id: true, name: true, email: true },
      take: 20,
    }),
  ]);

  return { workspaces, users };
}
