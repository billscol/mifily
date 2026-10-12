"use client";

import { ChartLine, Globe, Hyperlink } from "@dub/ui/icons";
import { useLanguage } from "./language-context";

export function LinkMockup() {
  const { t } = useLanguage();

  return (
    <div className="relative">
      <div className="rounded-2xl border border-neutral-200 bg-white p-2 shadow-2xl shadow-neutral-900/10 ring-1 ring-black/5">
        <div className="flex items-center gap-2 border-b border-neutral-100 px-3 py-2.5">
          <div className="flex items-center gap-1.5">
            <div className="size-2.5 rounded-full bg-red-400" />
            <div className="size-2.5 rounded-full bg-yellow-400" />
            <div className="size-2.5 rounded-full bg-green-400" />
          </div>
          <div className="mx-auto flex h-6 w-full max-w-sm items-center justify-center rounded-md bg-neutral-100 text-xs font-medium text-neutral-500">
            {t.mockup.urlBar}
          </div>
        </div>

        <div className="divide-y divide-neutral-100 p-3">
          {t.mockup.links.map((link) => (
            <div
              key={link.short}
              className="flex items-center justify-between gap-4 py-3 first:pt-2"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Hyperlink className="size-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">
                    {link.short}
                  </div>
                  <div className="text-xs text-neutral-500">{link.dest}</div>
                </div>
              </div>
              <div className="hidden items-center gap-1.5 text-xs font-medium text-neutral-500 sm:flex">
                <ChartLine className="size-3.5" />
                {link.clicks} {t.mockup.clicksLabel}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -left-4 -top-6 hidden w-44 -rotate-3 rounded-xl border border-neutral-200 bg-white p-3 shadow-xl shadow-neutral-900/10 sm:-left-10 sm:block">
        <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
          <ChartLine className="size-3.5 text-blue-600" />
          {t.mockup.clicksThisWeek}
        </div>
        <div className="mt-2 flex items-end gap-1">
          {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-blue-500/80"
              style={{ height: `${h * 0.3}px` }}
            />
          ))}
        </div>
      </div>

      <div className="absolute -bottom-6 -right-2 hidden w-48 rotate-2 rounded-xl border border-neutral-200 bg-white p-3 shadow-xl shadow-neutral-900/10 sm:-right-10 sm:block">
        <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
          <Globe className="size-3.5 text-blue-600" />
          {t.mockup.topCountries}
        </div>
        <div className="mt-2 space-y-1.5">
          {t.mockup.countries.map(({ country, pct }) => (
            <div key={country} className="flex items-center gap-2">
              <span className="w-16 truncate text-[11px] text-neutral-600">
                {country}
              </span>
              <div className="h-1.5 flex-1 rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
