"use client";

import { useTransition } from "react";
import { deleteAdmin } from "@/lib/actions/admins";
import { Button } from "@/components/ui/button";

export function DeleteAdminButton({
  id,
  disabled,
}: {
  id: string;
  disabled?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={disabled || isPending}
      onClick={() => {
        if (!confirm("Delete this admin account?")) return;
        startTransition(async () => {
          try {
            await deleteAdmin(id);
          } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to delete admin");
          }
        });
      }}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
