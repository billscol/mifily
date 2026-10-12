"use client";

import { MarkdownDescription } from "@/ui/shared/markdown-description";
import { Button, DubProductIcon } from "@dub/ui";
import { capitalize } from "@dub/utils";
import { usePlausible } from "next-plausible";
import Image from "next/image";
import { ReactNode } from "react";
import { useOnboardingProgress } from "../../use-onboarding-progress";

const products = {
  partners: {
    image: "https://assets.dub.co/icons/trophy.webp",
    title: "Mifily Partners",
    description:
      "Modern affiliate programs with global payouts and accurate attribution.",
  },
  links: {
    image: "https://assets.dub.co/icons/link.webp",
    title: "Mifily Links",
    description:
      "Short links, QR codes, real-time analytics, and conversion tracking.",
  },
};

export function ProductSelector() {
  return (
    <div className="animate-fade-in mx-auto grid w-full gap-4 sm:max-w-[600px] sm:grid-cols-2">
      {Object.entries(products).map(([key, product]) => (
        <ProductOption
          key={key}
          product={key as "links" | "partners"}
          icon={product.image}
          title={
            <span className="flex items-center justify-center gap-2">
              <DubProductIcon product={key as "links" | "partners"} />{" "}
              {product.title}
            </span>
          }
          description={product.description}
          cta={`Continue with ${product.title}`}
        />
      ))}
    </div>
  );
}

function ProductOption({
  product,
  icon,
  title,
  description,
  cta,
}: {
  product: "links" | "partners";
  icon: string;
  title: ReactNode;
  description: string;
  cta: string;
}) {
  const { continueTo, isLoading, isSuccessful } = useOnboardingProgress();
  const plausible = usePlausible();
  return (
    <div className="relative flex h-full flex-col items-center gap-6 rounded-xl border border-neutral-300 p-6 pt-12 transition-all">
      <div className="relative size-36">
        <Image
          src={icon}
          alt=""
          fill
          className="object-contain"
          fetchPriority="high"
        />
      </div>
      <div className="space-y-2 text-center">
        <span className="text-base font-semibold text-neutral-900">
          {title}
        </span>
        <MarkdownDescription className="text-sm text-neutral-500">
          {description}
        </MarkdownDescription>
      </div>
      <div className="flex w-full grow flex-col justify-end gap-2">
        <Button
          type="button"
          variant="primary"
          className="rounded-lg"
          onClick={() => {
            plausible("Selected Product", {
              props: {
                product: capitalize(product),
              },
            });
            continueTo("domain", { params: { product } });
          }}
          loading={isLoading || isSuccessful}
          text={cta}
        />
      </div>
    </div>
  );
}
