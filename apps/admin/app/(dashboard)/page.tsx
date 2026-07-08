import Link from "next/link";
import { getDashboardStats } from "@/lib/actions/stats";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const { totalUsers, totalWorkspaces, recentUsers, recentWorkspaces } =
    await getDashboardStats();

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total workspaces
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalWorkspaces}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Newest users</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {recentUsers.map((u) => (
              <Link
                key={u.id}
                href={`/users/${u.id}`}
                className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-accent"
              >
                <span>{u.name || u.email}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(u.createdAt).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Newest workspaces</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {recentWorkspaces.map((w) => (
              <Link
                key={w.id}
                href={`/workspaces/${w.id}`}
                className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-accent"
              >
                <span>{w.name}</span>
                <Badge variant="secondary">{w.plan}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
