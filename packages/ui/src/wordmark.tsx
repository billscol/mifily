import { cn } from "@dub/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      width="90"
      height="24"
      viewBox="0 0 90 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-auto text-black dark:text-white", className)}
    >
      <text
        x="0"
        y="18"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="currentColor"
      >
        Mifily
      </text>
    </svg>
  );
}
