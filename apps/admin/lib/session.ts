import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "mifily_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

type SessionPayload = {
  adminId: string;
  email: string;
  exp: number;
};

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

export function createSessionCookieValue(admin: {
  id: string;
  email: string;
}) {
  const payload: SessionPayload = {
    adminId: admin.id,
    email: admin.email,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function readSessionCookieValue(
  value: string | undefined,
): SessionPayload | null {
  if (!value) return null;

  const [encoded, signature] = value.split(".");
  if (!encoded || !signature) return null;

  const expectedSignature = sign(encoded);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString(),
    ) as SessionPayload;
    if (typeof payload.exp !== "number" || payload.exp <= Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
