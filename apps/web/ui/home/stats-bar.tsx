"use client";

import { useLanguage } from "./language-context";

export function StatsBar() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8">
        {t.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-neutral-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
