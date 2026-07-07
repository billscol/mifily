import { prisma } from "@/lib/prisma";
import { BubbleIcon } from "@/ui/placeholders/bubble-icon";
import { Hero } from "@/ui/placeholders/hero";
import { CircleHalfDottedClock } from "@dub/ui";
import { cn, constructMetadata } from "@dub/utils";
import { redirect } from "next/navigation";

export const revalidate = false; // cache indefinitely

export const metadata = constructMetadata({
  title: "Expired Link",
  description:
    "This link has expired. Please contact the owner of this link to get a new one.",
  noIndex: true,
});

export function generateStaticParams() {
  return [];
}

export default async function ExpiredLinkPage(props: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await props.params;
  const domainData = await prisma.domain.findUnique({
    where: {
      slug: domain,
    },
  });

  if (domainData?.expiredUrl) {
    redirect(domainData.expiredUrl);
  }

  return (
    <div>
      <Hero>
        <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
          <BubbleIcon>
            <CircleHalfDottedClock className="size-12" />
          </BubbleIcon>
          <h1
            className={cn(
              "font-display mt-10 text-center text-4xl font-medium text-neutral-900 sm:text-5xl sm:leading-[1.15]",
              "animate-slide-up-fade motion-reduce:animate-fade-in [--offset:20px] [animation-duration:1s] [animation-fill-mode:both]",
            )}
          >
            Expired link
          </h1>
          <p
            className={cn(
              "mt-5 text-pretty text-center text-base text-neutral-700 sm:text-xl",
              "animate-slide-up-fade motion-reduce:animate-fade-in [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both]",
            )}
          >
            This link has expired. Please contact the owner of this link to get
            a new one.
          </p>
        </div>
      </Hero>
    </div>
  );
}
