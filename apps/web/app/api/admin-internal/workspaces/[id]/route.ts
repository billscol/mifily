import { verifyAdminInternalRequest } from "@/lib/admin-internal/verify";
import { deleteWorkspaceAdmin } from "@/lib/api/workspaces/delete-workspace";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// DELETE /api/admin-internal/workspaces/:id - full cascade delete of a
// workspace (domains, folders, customers, Stripe subscription, links),
// called only from apps/admin. Reuses the same deleteWorkspaceAdmin() the
// app's own admin.dub.co tooling would use.
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!verifyAdminInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const workspace = await prisma.project.findUnique({
    where: { id },
    select: { id: true, slug: true, logo: true, stripeId: true },
  });

  if (!workspace) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  await deleteWorkspaceAdmin(workspace);

  return NextResponse.json({ deleted: true });
}
