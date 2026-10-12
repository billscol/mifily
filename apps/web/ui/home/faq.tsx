"use client";

import { useLanguage } from "./language-context";

export function FAQ() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-center text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
          {t.faq.title}
        </h2>

        <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
          {t.faq.items.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium text-neutral-900">
                {faq.question}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="shrink-0 text-neutral-500 transition-transform group-open:rotate-45"
                >
                  <path
                    d="M9 2.75V15.25M2.75 9H15.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
