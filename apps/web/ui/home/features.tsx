"use client";

import {
  ChartLine,
  Globe,
  Hyperlink,
  QRCode,
  ShieldCheck,
  Users,
} from "@dub/ui/icons";
import { useLanguage } from "./language-context";

const ICONS = [Hyperlink, ChartLine, QRCode, Globe, Users, ShieldCheck];

export function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
            {t.features.title}
          </h2>
          <p className="mt-4 text-base text-neutral-600 sm:text-lg">
            {t.features.subtitle}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map(({ title, description }, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-neutral-900/5"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-semibold text-neutral-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
