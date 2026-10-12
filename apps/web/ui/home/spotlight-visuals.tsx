"use client";

import { ArrowRight, ChartActivity2 } from "@dub/ui/icons";
import { useLanguage } from "./language-context";

export function CreateLinkVisual() {
  const { t } = useLanguage();

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl shadow-neutral-900/5">
      <div className="text-xs font-medium text-neutral-500">
        {t.createLinkVisual.destLabel}
      </div>
      <div className="mt-1.5 truncate rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-700">
        {t.createLinkVisual.destUrl}
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div className="flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <ArrowRight className="size-4 rotate-90" />
        </div>
      </div>

      <div className="mt-2 text-xs font-medium text-neutral-500">
        {t.createLinkVisual.shortLabel}
      </div>
      <div className="mt-1.5 flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5">
        <span className="text-sm font-semibold text-blue-700">
          mify.co/summer
        </span>
        <span className="rounded-md bg-white px-2 py-1 text-xs font-medium text-blue-600 shadow-sm">
          {t.createLinkVisual.copy}
        </span>
      </div>
    </div>
  );
}

export function AnalyticsVisual() {
  const { t } = useLanguage();

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl shadow-neutral-900/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
          <ChartActivity2 className="size-3.5 text-blue-600" />
          {t.analyticsVisual.clicks30d}
        </div>
        <span className="font-display text-lg font-semibold text-neutral-900">
          24,018
        </span>
      </div>

      <div className="mt-4 flex h-24 items-end gap-1.5">
        {[30, 45, 35, 60, 50, 70, 55, 80, 65, 90, 75, 95].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-blue-600 to-blue-400"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <div className="mt-6 space-y-2.5 border-t border-neutral-100 pt-4">
        {t.analyticsVisual.devices.map((device) => (
          <div key={device.label} className="flex items-center gap-3">
            <span className="w-16 text-xs text-neutral-600">
              {device.label}
            </span>
            <div className="h-1.5 flex-1 rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${device.pct}%` }}
              />
            </div>
            <span className="w-8 text-right text-xs font-medium text-neutral-500">
              {device.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
