"use client";

import { APP_DOMAIN } from "@dub/utils";
import Link from "next/link";
import { useLanguage } from "./language-context";

export function FinalCta() {
  const { t } = useLanguage();

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-screen-xl overflow-hidden rounded-3xl bg-neutral-900 px-6 py-16 text-center sm:py-20">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(60% 80% at 20% 0%, #1d4ed8 0%, transparent 60%), radial-gradient(50% 70% at 90% 100%, #2563eb 0%, transparent 60%)",
          }}
        />

        <h2 className="font-display mx-auto max-w-2xl text-3xl font-medium tracking-tight text-white sm:text-4xl">
          {t.finalCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-neutral-300 sm:text-lg">
          {t.finalCta.subtitle}
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href={`${APP_DOMAIN}/register`}
            className="flex h-12 items-center rounded-lg bg-white px-6 text-base font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
          >
            {t.finalCta.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
