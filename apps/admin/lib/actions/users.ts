"use server";

import { prisma } from "@/lib/prisma";
import { callAdminInternalApi } from "@/lib/admin-internal-client";

const PAGE_SIZE = 25;

export async function listUsers({
  page = 1,
  query = "",
}: {
  page?: number;
  query?: string;
}) {
  page = Math.max(1, Math.floor(page) || 1);
  const where = query
    ? {
        OR: [{ email: { contains: query } }, { name: { contains: query } }],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        _count: { select: { projects: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.user.count({ where }),
  ]);

  return { users, total, pageSize: PAGE_SIZE };
}

export async function getUser(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      projects: {
        include: { project: { select: { id: true, name: true, slug: true } } },
      },
    },
  });
}

export async function deleteUser(id: string) {
  await callAdminInternalApi(`/api/admin-internal/users/${id}`, {
    method: "DELETE",
  });
}
