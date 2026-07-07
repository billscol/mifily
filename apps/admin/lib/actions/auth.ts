"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionCookieValue,
  SESSION_COOKIE_NAME,
  verifyPassword,
} from "@/lib/session";

export async function login(_prevState: unknown, formData: FormData) {
  const password = String(formData.get("password") || "");

  if (!verifyPassword(password)) {
    return { error: "Incorrect password" };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, createSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/login");
}
