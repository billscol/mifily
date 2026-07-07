"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { search } from "@/lib/actions/search";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Results = Awaited<ReturnType<typeof search>>;

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [isPending, startTransition] = useTransition();

  const runSearch = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      setResults(await search(query));
    });
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Search</h1>
        <p className="text-sm text-muted-foreground">
          Find a workspace by slug/name, or a user by email/name.
        </p>
      </div>

      <form onSubmit={runSearch} className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="acme, or jane@example.com"
          autoFocus
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Searching..." : "Search"}
        </Button>
      </form>

      {results && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Workspaces ({results.workspaces.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {results.workspaces.length === 0 && (
                <p className="text-sm text-muted-foreground">No matches.</p>
              )}
              {results.workspaces.map((w) => (
                <Link
                  key={w.id}
                  href={`/workspaces/${w.id}`}
                  className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-accent"
                >
                  <span>
                    {w.name} <span className="text-muted-foreground">/{w.slug}</span>
                  </span>
                  <Badge variant="secondary">{w.plan}</Badge>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Users ({results.users.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {results.users.length === 0 && (
                <p className="text-sm text-muted-foreground">No matches.</p>
              )}
              {results.users.map((u) => (
                <Link
                  key={u.id}
                  href={`/users/${u.id}`}
                  className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-accent"
                >
                  <span>{u.name || "(no name)"}</span>
                  <span className="text-muted-foreground">{u.email}</span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
