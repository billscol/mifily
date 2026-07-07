import { verifyAdminInternalRequest } from "@/lib/admin-internal/verify";
import { prisma } from "@/lib/prisma";
import { storage } from "@/lib/storage";
import { R2_URL } from "@dub/utils";
import { NextRequest, NextResponse } from "next/server";

// DELETE /api/admin-internal/users/:id - same rule as the self-service
// DELETE /api/user: a user who still owns a workspace can't be deleted
// (transfer ownership or delete the workspace first). Called only from
// apps/admin.
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!verifyAdminInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const ownedWorkspaces = await prisma.projectUsers.findMany({
    where: { userId: id, role: "owner" },
    select: { project: { select: { slug: true } } },
  });

  if (ownedWorkspaces.length > 0) {
    return NextResponse.json(
      {
        error: "User owns workspaces",
        workspaces: ownedWorkspaces.map((w) => w.project.slug),
      },
      { status: 422 },
    );
  }

  const user = await prisma.user.delete({ where: { id } });

  if (user.image && user.image.startsWith(`${R2_URL}/avatars/${id}`)) {
    await storage.delete({ key: user.image.replace(`${R2_URL}/`, "") });
  }

  return NextResponse.json({ deleted: true });
}
