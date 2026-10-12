"use client";

import { useLanguage } from "./language-context";

export function Testimonial() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <svg
          width="32"
          height="24"
          viewBox="0 0 32 24"
          fill="none"
          className="mx-auto text-blue-200"
        >
          <path
            d="M13.6 0L8 10.4H13.6V24H0V11.2C0 5.6 4.8 0.8 10.4 0H13.6ZM32 0L26.4 10.4H32V24H18.4V11.2C18.4 5.6 23.2 0.8 28.8 0H32Z"
            fill="currentColor"
          />
        </svg>

        <p className="font-display mt-6 text-2xl font-medium leading-snug text-neutral-900 sm:text-3xl">
          {t.testimonial.quote}
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-blue-100 font-display text-sm font-semibold text-blue-700">
            AM
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-neutral-900">
              {t.testimonial.name}
            </div>
            <div className="text-sm text-neutral-500">
              {t.testimonial.role}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
