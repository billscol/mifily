// These are link-facing utility pages (not found, banned, expired, stats),
// not marketing pages - no Nav/Footer (Mifily's own marketing site chrome).
export default function ExternalPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-neutral-50/80">
      {children}
    </div>
  );
}
