import Link from "next/link";
import { listWorkspaces } from "@/lib/actions/workspaces";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function WorkspacesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { page: pageParam, q } = await searchParams;
  const page = Number(pageParam) || 1;
  const query = q || "";

  const { workspaces, total, pageSize } = await listWorkspaces({
    page,
    query,
  });

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Workspaces</h1>
      </div>

      <form className="flex gap-2">
        <Input name="q" defaultValue={query} placeholder="Search by name or slug" />
        <Button type="submit">Search</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Links</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workspaces.map((w) => (
            <TableRow key={w.id}>
              <TableCell>
                <Link href={`/workspaces/${w.id}`} className="hover:underline">
                  {w.name} <span className="text-muted-foreground">/{w.slug}</span>
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{w.plan}</Badge>
              </TableCell>
              <TableCell>{w.totalLinks}</TableCell>
              <TableCell>{w.totalClicks}</TableCell>
              <TableCell>{new Date(w.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
          {workspaces.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No workspaces found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        page={page}
        total={total}
        pageSize={pageSize}
        basePath="/workspaces"
        query={query}
      />
    </div>
  );
}
