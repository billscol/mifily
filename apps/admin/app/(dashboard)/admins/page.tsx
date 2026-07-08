import { listAdmins } from "@/lib/actions/admins";
import { getCurrentAdmin } from "@/lib/actions/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddAdminForm } from "./add-admin-form";
import { DeleteAdminButton } from "./delete-admin-button";

export default async function AdminsPage() {
  const [admins, current] = await Promise.all([
    listAdmins(),
    getCurrentAdmin(),
  ]);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admins</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.name || "(no name)"}</TableCell>
              <TableCell className="text-muted-foreground">
                {a.email}
                {a.id === current?.adminId && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    (you)
                  </span>
                )}
              </TableCell>
              <TableCell>{new Date(a.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <DeleteAdminButton
                  id={a.id}
                  disabled={a.id === current?.adminId || admins.length <= 1}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="max-w-sm">
        <h2 className="mb-3 text-lg font-medium">Add admin</h2>
        <AddAdminForm />
      </div>
    </div>
  );
}
