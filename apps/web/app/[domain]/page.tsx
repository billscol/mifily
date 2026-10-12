import { ButtonLink } from "@/ui/placeholders/button-link";
import { Hero } from "@/ui/placeholders/hero";
import { Logo } from "@dub/ui";
import { cn, constructMetadata } from "@dub/utils";
import { BubbleIcon } from "../../ui/placeholders/bubble-icon";
import { BrowserGraphic } from "./browser-graphic";

export const revalidate = false; // cache indefinitely

export async function generateMetadata(props: {
  params: Promise<{ domain: string }>;
}) {
  const params = await props.params;
  const title = `${params.domain}`;
  const description = "Short links, powerful analytics.";

  return constructMetadata({
    title,
    description,
  });
}
// @see: https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export function generateStaticParams() {
  return [];
}

export default function CustomDomainPage() {
  return (
    <div>
      <Hero>
        <div className="relative mx-auto flex w-full max-w-xl flex-col items-center">
          <BubbleIcon>
            <Logo className="size-10" />
          </BubbleIcon>
          <div className="mt-16 w-full">
            <BrowserGraphic />
          </div>
          <h1
            className={cn(
              "font-display mt-2 text-center text-4xl font-medium text-neutral-900 sm:text-5xl sm:leading-[1.15]",
              "animate-slide-up-fade motion-reduce:animate-fade-in [--offset:20px] [animation-duration:1s] [animation-fill-mode:both]",
            )}
          >
            Welcome to Mifily
          </h1>
          <p
            className={cn(
              "mt-5 text-balance text-base text-neutral-700 sm:text-xl",
              "animate-slide-up-fade motion-reduce:animate-fade-in [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both]",
            )}
          >
            Short links, powerful analytics.
          </p>
        </div>

        <div
          className={cn(
            "relative mx-auto mt-8 flex max-w-fit flex-col items-center",
            "animate-slide-up-fade motion-reduce:animate-fade-in [--offset:5px] [animation-delay:300ms] [animation-duration:1s] [animation-fill-mode:both]",
          )}
        >
          <ButtonLink variant="primary" href="https://app.mifily.com">
            Go to dashboard
          </ButtonLink>
        </div>
      </Hero>
    </div>
  );
}
