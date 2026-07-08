"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPasswordHash } from "@/lib/password";
import {
  createSessionCookieValue,
  readSessionCookieValue,
  SESSION_COOKIE_NAME,
} from "@/lib/session";

export async function login(_prevState: unknown, formData: FormData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");

  const admin = await prisma.adminUser.findUnique({ where: { email } });

  if (!admin || !(await verifyPasswordHash(password, admin.passwordHash))) {
    return { error: "Incorrect email or password" };
  }

  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_COOKIE_NAME,
    createSessionCookieValue({ id: admin.id, email: admin.email }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    },
  );

  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/login");
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const session = readSessionCookieValue(
    cookieStore.get(SESSION_COOKIE_NAME)?.value,
  );
  return session;
}

export async function createFirstAdmin(
  _prevState: unknown,
  formData: FormData,
) {
  const existingCount = await prisma.adminUser.count();
  if (existingCount > 0) {
    return { error: "Setup already completed" };
  }

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

  const admin = await prisma.adminUser.create({
    data: { email, name: name || null, passwordHash: await hashPassword(password) },
  });

  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_COOKIE_NAME,
    createSessionCookieValue({ id: admin.id, email: admin.email }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    },
  );

  redirect("/");
}
