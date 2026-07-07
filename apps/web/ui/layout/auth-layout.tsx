import { ClientOnly } from "@dub/ui";
import { cn } from "@dub/utils";
import { PropsWithChildren, Suspense } from "react";

export const AuthLayout = ({
  showTerms,
  className,
  children,
}: PropsWithChildren<{
  showTerms?: "app" | "partners";
  className?: string;
}>) => {
  return (
    <div
      className={cn(
        "flex min-h-[100dvh] w-full flex-col items-center justify-between",
        className,
      )}
    >
      {/* Empty div to help center main content */}
      <div className="grow basis-0">
        <div className="h-24" />
      </div>

      <ClientOnly className="relative flex w-full flex-col items-center justify-center px-4">
        <Suspense>{children}</Suspense>
      </ClientOnly>

      <div className="flex grow basis-0 flex-col justify-end">
        {/* No Terms of Service / Privacy Policy pages of our own yet - not
            linking to dub.co's, since these aren't our legal terms. */}
      </div>
    </div>
  );
};
