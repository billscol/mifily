"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { getCurrentAdmin } from "@/lib/actions/auth";

export async function listAdmins() {
  return prisma.adminUser.findMany({
    select: { id: true, email: true, name: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function addAdmin(
  _prevState: unknown,
  formData: FormData,
): Promise<{ error?: string }> {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const name = String(formData.get("name") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || password.length < 8) {
    return {
      error: "Email is required and password must be at least 8 characters",
    };
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    return { error: "An admin with that email already exists" };
  }

  await prisma.adminUser.create({
    data: { email, name: name || null, passwordHash: await hashPassword(password) },
  });

  revalidatePath("/admins");
  return {};
}

export async function deleteAdmin(id: string) {
  const current = await getCurrentAdmin();
  if (current?.adminId === id) {
    throw new Error("You can't delete your own account while signed in.");
  }

  const count = await prisma.adminUser.count();
  if (count <= 1) {
    throw new Error("Can't delete the last remaining admin.");
  }

  await prisma.adminUser.delete({ where: { id } });
  revalidatePath("/admins");
}
