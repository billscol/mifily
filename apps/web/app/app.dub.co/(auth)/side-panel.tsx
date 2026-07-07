import { cn } from "@dub/utils";

export function SidePanel() {
  return (
    <div className="relative hidden h-full flex-col justify-center overflow-hidden border-l border-black/5 bg-neutral-50 min-[900px]:flex">
      {/* Gradient at bottom */}
      {[...Array(2)].map((_, idx) => (
        <div
          key={idx}
          className={cn(
            "absolute bottom-0 left-1/2 size-[80px] -translate-x-1/2 translate-y-1/2 scale-x-[1.6]",
            idx === 0 ? "mix-blend-overlay" : "opacity-15",
          )}
        >
          {[...Array(idx === 0 ? 2 : 1)].map((_, innerIdx) => (
            <div
              key={innerIdx}
              className={cn(
                "absolute -inset-16 mix-blend-overlay blur-[50px] saturate-[2]",
                "bg-[conic-gradient(from_90deg,#F00_5deg,#EAB308_63deg,#5CFF80_115deg,#1E00FF_170deg,#855AFC_220deg,#3A8BFD_286deg,#F00_360deg)]",
              )}
            />
          ))}
        </div>
      ))}

      <div className="relative flex items-center justify-center p-8 lg:p-14">
        <p className="text-content-default max-w-[370px] text-pretty text-center text-xl font-medium">
          Short links, powerful analytics.
        </p>
      </div>
    </div>
  );
}
