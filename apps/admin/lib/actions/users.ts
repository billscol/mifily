"use server";

import { prisma } from "@/lib/prisma";
import { callAdminInternalApi } from "@/lib/admin-internal-client";

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
