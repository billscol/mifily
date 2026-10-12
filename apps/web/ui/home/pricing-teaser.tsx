"use client";

import { CircleCheck } from "@dub/ui/icons";
import { APP_DOMAIN } from "@dub/utils";
import Link from "next/link";
import { useLanguage } from "./language-context";

export function PricingTeaser() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="bg-neutral-50 py-20 sm:py-28">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-base text-neutral-600 sm:text-lg">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-neutral-200 bg-white p-8 shadow-xl shadow-neutral-900/5">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-semibold text-neutral-900">
              {t.pricing.free}
            </span>
            <span className="text-sm text-neutral-500">
              {t.pricing.forWorkspace}
            </span>
          </div>

          <ul className="mt-6 space-y-3">
            {t.pricing.included.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CircleCheck className="size-5 shrink-0 text-blue-600" />
                <span className="text-sm text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href={`${APP_DOMAIN}/register`}
            className="mt-8 flex h-11 w-full items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {t.pricing.cta}
          </Link>

          <p className="mt-3 text-center text-xs text-neutral-500">
            {t.pricing.needMore}{" "}
            <a
              href="mailto:support@mifily.com"
              className="font-medium text-blue-600 hover:underline"
            >
              {t.pricing.talkToUs}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
