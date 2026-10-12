"use client";

import { APP_DOMAIN } from "@dub/utils";
import Link from "next/link";
import { LinkMockup } from "./link-mockup";
import { useLanguage } from "./language-context";

export function HomeHero() {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white"
    >
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[600px] opacity-50 [mask-image:radial-gradient(closest-side,black,transparent)]"
        style={{
          backgroundImage:
            "radial-gradient(45% 45% at 50% 0%, #bfdbfe 0%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-screen-xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {t.hero.badge}
          </span>

          <h1 className="font-display mt-6 text-4xl font-medium tracking-tight text-neutral-900 sm:text-6xl sm:leading-[1.1]">
            {t.hero.title[0]}
            <br />
            {t.hero.title[1]}
          </h1>

          <p className="mt-6 max-w-xl text-balance text-base text-neutral-600 sm:text-xl">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href={`${APP_DOMAIN}/register`}
              className="flex h-12 items-center rounded-lg bg-blue-600 px-6 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700"
            >
              {t.hero.ctaPrimary}
            </Link>
            <Link
              href="#how-it-works"
              className="flex h-12 items-center rounded-lg border border-neutral-300 bg-white px-6 text-base font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>

          <p className="mt-4 text-sm text-neutral-500">{t.hero.note}</p>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          <LinkMockup />
        </div>
      </div>
    </section>
  );
}
