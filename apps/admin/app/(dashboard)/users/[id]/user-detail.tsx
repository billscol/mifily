"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useTransition } from "react";
import type { Prisma } from "@prisma/client";
import { deleteUser } from "@/lib/actions/users";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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

type UserWithProjects = Prisma.UserGetPayload<{
  include: {
    projects: {
      include: { project: { select: { id: true; name: true; slug: true } } };
    };
  };
}>;

export function UserDetail({ user }: { user: UserWithProjects }) {
  const router = useRouter();
  const [isDeleting, startDeleting] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const ownedWorkspaces = user.projects.filter((p) => p.role === "owner");

  const remove = () => {
    setError(null);
    startDeleting(async () => {
      try {
        await deleteUser(user.id);
        router.push("/");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to delete");
      }
    });
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">{user.name || "(no name)"}</h1>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <p className="text-xs text-muted-foreground">
          Joined {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Workspaces ({user.projects.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          {user.projects.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Not a member of any workspace.
            </p>
          )}
          {user.projects.map(({ project, role }) => (
            <Link
              key={project.id}
              href={`/workspaces/${project.id}`}
              className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-accent"
            >
              <span>{project.name}</span>
              <span className="text-muted-foreground">{role}</span>
            </Link>
          ))}
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {ownedWorkspaces.length > 0 ? (
        <p className="text-sm text-muted-foreground">
          This user owns {ownedWorkspaces.length} workspace(s). Delete or
          transfer ownership of those workspaces first before deleting the
          user.
        </p>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-fit">
              Delete user
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete {user.email || user.name}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This permanently deletes the user's account. This can't be
                undone.
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
      )}
    </div>
  );
}
