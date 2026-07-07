import { NextRequest } from "next/server";

// Shared-secret auth for endpoints called only by apps/admin (the separate
// operator admin panel), never by end users. Not a NextAuth session check -
// apps/admin has no session with this app.
export function verifyAdminInternalRequest(req: NextRequest) {
  const secret = req.headers.get("x-admin-internal-secret");
  return Boolean(
    secret &&
      process.env.ADMIN_INTERNAL_SECRET &&
      secret === process.env.ADMIN_INTERNAL_SECRET,
  );
}
