"use client";

import { Logo } from "@dub/ui";
import { APP_DOMAIN, cn } from "@dub/utils";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "./language-context";

export function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const NAV_LINKS = [
    { label: t.nav.features, href: "#features" },
    { label: t.nav.howItWorks, href: "#how-it-works" },
    { label: t.nav.pricing, href: "#pricing" },
    { label: t.nav.faq, href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#top" className="flex items-center gap-2">
          <Logo className="size-8" />
          <span className="font-display text-lg font-semibold text-neutral-900">
            Mifily
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center rounded-full border border-neutral-200 p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLang("es")}
              className={cn(
                "rounded-full px-2.5 py-1 transition-colors",
                lang === "es"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-500 hover:text-neutral-900",
              )}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={cn(
                "rounded-full px-2.5 py-1 transition-colors",
                lang === "en"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-500 hover:text-neutral-900",
              )}
            >
              EN
            </button>
          </div>
          <Link
            href={`${APP_DOMAIN}/login`}
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            {t.nav.login}
          </Link>
          <Link
            href={`${APP_DOMAIN}/register`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
          >
            {t.nav.signup}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="flex size-10 items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100 md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 18 18"
            fill="none"
            className={cn("transition-transform", isOpen && "rotate-90")}
          >
            {isOpen ? (
              <path
                d="M3.75 3.75L14.25 14.25M14.25 3.75L3.75 14.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2.5 5H15.5M2.5 9H15.5M2.5 13H15.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-center gap-0.5 rounded-full border border-neutral-200 p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLang("es")}
              className={cn(
                "flex-1 rounded-full px-2.5 py-1.5 transition-colors",
                lang === "es"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-500",
              )}
            >
              Español
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={cn(
                "flex-1 rounded-full px-2.5 py-1.5 transition-colors",
                lang === "en"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-500",
              )}
            >
              English
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-2 border-t border-neutral-200 pt-3">
            <Link
              href={`${APP_DOMAIN}/login`}
              className="rounded-lg px-3 py-2.5 text-center text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              {t.nav.login}
            </Link>
            <Link
              href={`${APP_DOMAIN}/register`}
              className="rounded-lg bg-blue-600 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
            >
              {t.nav.signup}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
