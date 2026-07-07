import { cn } from "@dub/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-10 text-black dark:text-white", className)}
    >
      <rect width="64" height="64" rx="16" fill="currentColor" />
      <text
        x="32"
        y="43"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="32"
        fontWeight="700"
        fill="white"
        className="dark:fill-black"
      >
        M
      </text>
    </svg>
  );
}
