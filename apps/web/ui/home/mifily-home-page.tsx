"use client";

import { FAQ } from "./faq";
import { FeatureSpotlight } from "./feature-spotlight";
import { Features } from "./features";
import { FinalCta } from "./final-cta";
import { HomeFooter } from "./home-footer";
import { HomeHero } from "./home-hero";
import { useLanguage, LanguageProvider } from "./language-context";
import { HomeNavbar } from "./navbar";
import { PricingTeaser } from "./pricing-teaser";
import { AnalyticsVisual, CreateLinkVisual } from "./spotlight-visuals";
import { StatsBar } from "./stats-bar";
import { Testimonial } from "./testimonial";

function HomeContent() {
  const { t } = useLanguage();

  return (
    <div className="bg-white">
      <HomeNavbar />
      <HomeHero />
      <StatsBar />
      <Features />
      <FeatureSpotlight
        id="how-it-works"
        eyebrow={t.spotlight1.eyebrow}
        title={t.spotlight1.title}
        description={t.spotlight1.description}
        bullets={t.spotlight1.bullets}
        visual={<CreateLinkVisual />}
      />
      <FeatureSpotlight
        eyebrow={t.spotlight2.eyebrow}
        title={t.spotlight2.title}
        description={t.spotlight2.description}
        bullets={t.spotlight2.bullets}
        visual={<AnalyticsVisual />}
        reverse
      />
      <Testimonial />
      <PricingTeaser />
      <FAQ />
      <FinalCta />
      <HomeFooter />
    </div>
  );
}

export function MifilyHomePage() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
