import Link from "next/link";
import { listUsers } from "@/lib/actions/users";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { page: pageParam, q } = await searchParams;
  const page = Number(pageParam) || 1;
  const query = q || "";

  const { users, total, pageSize } = await listUsers({ page, query });

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
      </div>

      <form className="flex gap-2">
        <Input name="q" defaultValue={query} placeholder="Search by name or email" />
        <Button type="submit">Search</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Workspaces</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>
                <Link href={`/users/${u.id}`} className="hover:underline">
                  {u.name || "(no name)"}
                </Link>
              </TableCell>
              <TableCell className="text-muted-foreground">{u.email}</TableCell>
              <TableCell>{u._count.projects}</TableCell>
              <TableCell>{new Date(u.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        page={page}
        total={total}
        pageSize={pageSize}
        basePath="/users"
        query={query}
      />
    </div>
  );
}
