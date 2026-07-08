import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SetupForm } from "./setup-form";

export const dynamic = "force-dynamic";

export default async function SetupPage() {
  const existingCount = await prisma.adminUser.count();
  if (existingCount > 0) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <SetupForm />
    </div>
  );
}
