"use client";

import { Logo } from "@dub/ui";
import { APP_DOMAIN } from "@dub/utils";
import Link from "next/link";
import { useLanguage } from "./language-context";

export function HomeFooter() {
  const { t } = useLanguage();

  const columns = [
    {
      title: t.footer.columns.product,
      links: [
        { label: t.footer.links.features, href: "#features" },
        { label: t.footer.links.howItWorks, href: "#how-it-works" },
        { label: t.footer.links.pricing, href: "#pricing" },
      ],
    },
    {
      title: t.footer.columns.company,
      links: [
        { label: t.footer.links.login, href: `${APP_DOMAIN}/login` },
        { label: t.footer.links.signup, href: `${APP_DOMAIN}/register` },
        { label: t.footer.links.contact, href: "mailto:support@mifily.com" },
      ],
    },
    {
      title: t.footer.columns.resources,
      links: [
        { label: t.footer.links.faq, href: "#faq" },
        { label: t.footer.links.support, href: "mailto:support@mifily.com" },
      ],
    },
    {
      title: t.footer.columns.legal,
      links: [
        { label: t.footer.links.privacy, href: "#" },
        { label: t.footer.links.terms, href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-6">
          <div className="col-span-2 sm:col-span-2">
            <Link href="#top" className="flex items-center gap-2">
              <Logo className="size-8" />
              <span className="font-display text-lg font-semibold text-neutral-900">
                Mifily
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-neutral-500">
              {t.footer.tagline}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-neutral-900">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Mifily. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
