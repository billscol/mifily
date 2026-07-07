import { prisma } from "@/lib/prisma";
import { BubbleIcon } from "@/ui/placeholders/bubble-icon";
import { ButtonLink } from "@/ui/placeholders/button-link";
import { Hero } from "@/ui/placeholders/hero";
import { GlobeSearch } from "@dub/ui";
import { cn, constructMetadata } from "@dub/utils";
import { redirect } from "next/navigation";

export const revalidate = false; // cache indefinitely

export const metadata = constructMetadata({
  title: "Link Not Found",
  description: "This link does not exist. Please check the URL and try again.",
  noIndex: true,
});

export function generateStaticParams() {
  return [];
}

export default async function NotFoundLinkPage(props: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await props.params;
  const domainData = await prisma.domain.findUnique({
    where: {
      slug: domain,
    },
  });

  if (domainData?.notFoundUrl) {
    redirect(domainData.notFoundUrl);
  }

  return (
    <main className="flex min-h-screen flex-col justify-center">
      <Hero>
        <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
          <BubbleIcon>
            <GlobeSearch className="size-12" />
          </BubbleIcon>
          <h1
            className={cn(
              "font-display mt-10 text-center text-4xl font-medium text-neutral-900 sm:text-5xl sm:leading-[1.15]",
              "animate-slide-up-fade motion-reduce:animate-fade-in [--offset:20px] [animation-duration:1s] [animation-fill-mode:both]",
            )}
          >
            Link not found
          </h1>
          <p
            className={cn(
              "mt-5 text-pretty text-center text-base text-neutral-700 sm:text-xl",
              "animate-slide-up-fade motion-reduce:animate-fade-in [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both]",
            )}
          >
            This link does not exist. Please check the URL and try again.
          </p>
        </div>

        <div
          className={cn(
            "relative mx-auto mt-8 flex max-w-fit flex-col items-center",
            "animate-slide-up-fade motion-reduce:animate-fade-in [--offset:5px] [animation-delay:300ms] [animation-duration:1s] [animation-fill-mode:both]",
          )}
        >
          <ButtonLink variant="primary" href="https://mifily.com">
            Go to mifily.com
          </ButtonLink>
        </div>
      </Hero>
    </main>
  );
}
