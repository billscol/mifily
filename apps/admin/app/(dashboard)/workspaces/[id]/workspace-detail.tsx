"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useTransition } from "react";
import type { Prisma } from "@prisma/client";
import { deleteWorkspace, updateWorkspacePlan } from "@/lib/actions/workspaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Workspace = Prisma.ProjectGetPayload<{
  include: {
    users: {
      include: { user: { select: { id: true; name: true; email: true } } };
    };
  };
}>;

export function WorkspaceDetail({ workspace }: { workspace: Workspace }) {
  const router = useRouter();
  const [form, setForm] = useState({
    plan: workspace.plan,
    planTier: workspace.planTier,
    usageLimit: workspace.usageLimit,
    linksLimit: workspace.linksLimit,
    domainsLimit: workspace.domainsLimit,
    tagsLimit: workspace.tagsLimit,
  });
  const [isSaving, startSaving] = useTransition();
  const [isDeleting, startDeleting] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setError(null);
    setSaved(false);
    startSaving(async () => {
      try {
        await updateWorkspacePlan(workspace.id, form);
        setSaved(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to save");
      }
    });
  };

  const remove = () => {
    setError(null);
    startDeleting(async () => {
      try {
        await deleteWorkspace(workspace.id);
        router.push("/");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to delete");
      }
    });
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">{workspace.name}</h1>
        <p className="text-sm text-muted-foreground">/{workspace.slug}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Plan & limits</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="plan">Plan</Label>
            <Input
              id="plan"
              value={form.plan}
              onChange={(e) => setForm({ ...form, plan: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="planTier">Plan tier</Label>
            <Input
              id="planTier"
              type="number"
              value={form.planTier}
              onChange={(e) =>
                setForm({ ...form, planTier: Number(e.target.value) })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="usageLimit">Tracked events / mo</Label>
            <Input
              id="usageLimit"
              type="number"
              value={form.usageLimit}
              onChange={(e) =>
                setForm({ ...form, usageLimit: Number(e.target.value) })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="linksLimit">Links / mo</Label>
            <Input
              id="linksLimit"
              type="number"
              value={form.linksLimit}
              onChange={(e) =>
                setForm({ ...form, linksLimit: Number(e.target.value) })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="domainsLimit">Domains</Label>
            <Input
              id="domainsLimit"
              type="number"
              value={form.domainsLimit}
              onChange={(e) =>
                setForm({ ...form, domainsLimit: Number(e.target.value) })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tagsLimit">Tags</Label>
            <Input
              id="tagsLimit"
              type="number"
              value={form.tagsLimit}
              onChange={(e) =>
                setForm({ ...form, tagsLimit: Number(e.target.value) })
              }
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-center gap-3">
          <Button onClick={save} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
          {saved && <span className="text-sm text-muted-foreground">Saved.</span>}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Members ({workspace.users.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          {workspace.users.map(({ user, role }) => (
            <Link
              key={user.id}
              href={`/users/${user.id}`}
              className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-accent"
            >
              <span>{user.name || user.email}</span>
              <span className="text-muted-foreground">{role}</span>
            </Link>
          ))}
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-fit">
            Delete workspace
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{workspace.name}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the workspace, its domains, links,
              folders, and customers. This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={remove} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
