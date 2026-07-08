import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SESSION_COOKIE_NAME, readSessionCookieValue } from "@/lib/session";
import { logout } from "@/lib/actions/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = readSessionCookieValue(
    cookieStore.get(SESSION_COOKIE_NAME)?.value,
  );

  if (!session) {
    const adminCount = await prisma.adminUser.count();
    redirect(adminCount === 0 ? "/setup" : "/login");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b px-6 py-3">
          <span className="text-sm text-muted-foreground">
            Signed in as <span className="font-medium text-foreground">{session.email}</span>
          </span>
          <form action={logout}>
            <Button variant="ghost" size="sm" type="submit">
              Sign out
            </Button>
          </form>
        </header>
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
