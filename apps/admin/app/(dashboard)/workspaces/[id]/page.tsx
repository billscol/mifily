import { notFound } from "next/navigation";
import { getWorkspace } from "@/lib/actions/workspaces";
import { WorkspaceDetail } from "./workspace-detail";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workspace = await getWorkspace(id);

  if (!workspace) {
    notFound();
  }

  return <WorkspaceDetail workspace={workspace} />;
}
