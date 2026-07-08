import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Pagination({
  page,
  total,
  pageSize,
  basePath,
  query,
}: {
  page: number;
  total: number;
  pageSize: number;
  basePath: string;
  query?: string;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const qs = query ? `&q=${encodeURIComponent(query)}` : "";

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>
        Page {page} of {totalPages} ({total} total)
      </span>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild disabled={page <= 1}>
          <Link href={`${basePath}?page=${page - 1}${qs}`}>Previous</Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          disabled={page >= totalPages}
        >
          <Link href={`${basePath}?page=${page + 1}${qs}`}>Next</Link>
        </Button>
      </div>
    </div>
  );
}
