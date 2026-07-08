"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [totalUsers, totalWorkspaces, recentUsers, recentWorkspaces] =
    await Promise.all([
      prisma.user.count(),
      prisma.project.count(),
      prisma.user.findMany({
        select: { id: true, name: true, email: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.project.findMany({
        select: { id: true, name: true, slug: true, plan: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  return { totalUsers, totalWorkspaces, recentUsers, recentWorkspaces };
}
