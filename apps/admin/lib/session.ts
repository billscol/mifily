import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "mifily_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set");
  }
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionCookieValue() {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS });
  const encoded = Buffer.from(payload).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifySessionCookieValue(value: string | undefined) {
  if (!value) return false;

  const [encoded, signature] = value.split(".");
  if (!encoded || !signature) return false;

  const expectedSignature = sign(encoded);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return false;
  }

  try {
    const { exp } = JSON.parse(Buffer.from(encoded, "base64url").toString());
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

export function verifyPassword(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
