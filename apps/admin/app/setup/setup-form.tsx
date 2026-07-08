"use client";

import { useActionState } from "react";
import { createFirstAdmin } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SetupForm() {
  const [state, formAction, isPending] = useActionState(
    createFirstAdmin,
    undefined,
  );

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Set up Mifily Admin</CardTitle>
        <CardDescription>
          No admin account exists yet. Create the first one.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" autoFocus />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
            />
            <p className="text-xs text-muted-foreground">At least 8 characters.</p>
          </div>
          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Creating..." : "Create admin account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
