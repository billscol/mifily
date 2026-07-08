"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { callAdminInternalApi } from "@/lib/admin-internal-client";

const PAGE_SIZE = 25;

export async function listWorkspaces({
  page = 1,
  query = "",
}: {
  page?: number;
  query?: string;
}) {
  page = Math.max(1, Math.floor(page) || 1);
  const where = query
    ? {
        OR: [
          { slug: { contains: query } },
          { name: { contains: query } },
        ],
      }
    : {};

  const [workspaces, total] = await Promise.all([
    prisma.project.findMany({
      where,
      select: {
        id: true,
        name: true,
        slug: true,
        plan: true,
        totalLinks: true,
        totalClicks: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.project.count({ where }),
  ]);

  return { workspaces, total, pageSize: PAGE_SIZE };
}

export async function getWorkspace(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      users: {
        include: { user: { select: { id: true, name: true, email: true } } },
      },
    },
  });
}

export async function updateWorkspacePlan(
  id: string,
  data: {
    plan: string;
    planTier: number;
    usageLimit: number;
    linksLimit: number;
    domainsLimit: number;
    tagsLimit: number;
  },
) {
  await prisma.project.update({ where: { id }, data });
  revalidatePath(`/workspaces/${id}`);
}

export async function deleteWorkspace(id: string) {
  await callAdminInternalApi(`/api/admin-internal/workspaces/${id}`, {
    method: "DELETE",
  });
}
