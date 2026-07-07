"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { callAdminInternalApi } from "@/lib/admin-internal-client";

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
