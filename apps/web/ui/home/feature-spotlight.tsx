import { CircleCheck } from "@dub/ui/icons";
import { cn } from "@dub/utils";
import { ReactNode } from "react";

export function FeatureSpotlight({
  id,
  eyebrow,
  title,
  description,
  bullets,
  visual,
  reverse = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  visual: ReactNode;
  reverse?: boolean;
}) {
  return (
    <section id={id} className="bg-neutral-50 py-20 sm:py-28">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            className={cn(
              "order-2",
              reverse ? "lg:order-2" : "lg:order-1",
            )}
          >
            <span className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              {eyebrow}
            </span>
            <h2 className="font-display mt-3 text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base text-neutral-600 sm:text-lg">
              {description}
            </p>
            <ul className="mt-6 space-y-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-blue-600" />
                  <span className="text-sm text-neutral-700 sm:text-base">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={cn(
              "order-1",
              reverse ? "lg:order-1" : "lg:order-2",
            )}
          >
            {visual}
          </div>
        </div>
      </div>
    </section>
  );
}
