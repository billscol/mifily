// Calls the internal admin-only endpoints on the main Mifily app (apps/web)
// for operations that need its full Prisma schema / business logic (full
// cascade delete of a workspace, safe user deletion) - this app's own
// Prisma schema is intentionally minimal and doesn't know how to do that
// safely on its own. See apps/web/app/api/admin-internal/*.

export async function callAdminInternalApi(path: string, init: RequestInit) {
  const baseUrl = process.env.MAIN_APP_INTERNAL_URL;
  const secret = process.env.ADMIN_INTERNAL_SECRET;

  if (!baseUrl || !secret) {
    throw new Error(
      "MAIN_APP_INTERNAL_URL / ADMIN_INTERNAL_SECRET are not configured",
    );
  }

  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      "x-admin-internal-secret": secret,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Admin internal API ${path} failed (${res.status}): ${body}`);
  }

  return res.json();
}
