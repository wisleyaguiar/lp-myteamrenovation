import { createFileRoute } from "@tanstack/react-router";
import heroDesktopWebp from "@/assets/lp/hero-desktop.webp";
import heroMobileWebp from "@/assets/lp/hero-mobile.webp";
import { SITE, SITE_URL } from "@/components/landing/site-data";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader, SiteFooter } from "@/components/landing/chrome";
import { HeroSection } from "@/components/landing/hero";
import {
  WhyChooseSection,
  LateLessonsSection,
  ValuePropositionSection,
  ServicesSection,
  IdealClientSection,
  RisksSection,
  PrecisionSection,
  ProcessSection,
  ComparisonSection,
  PathwaysAndEmotionSection,
  EstimateCallSection,
} from "@/components/landing/sections";
import { FaqSection, ContactFormSection, FinalCtaSection } from "@/components/landing/interactive";
import { PortfolioSection, TestimonialsSection } from "@/components/landing/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Team Renovation — Premium Home Remodeling, Owner-Led" },
      {
        name: "description",
        content:
          "Luxury bathroom, kitchen, flooring, and custom carpentry remodels delivered on the fastest timelines in the market. Owner-led project management by Leonardo Brandão. 1-year warranty.",
      },
      { property: "og:title", content: "My Team Renovation — Premium Home Remodeling, Owner-Led" },
      {
        property: "og:description",
        content:
          "Luxury bathroom, kitchen, flooring, and custom carpentry remodels delivered on the fastest timelines in the market. Owner-led project management by Leonardo Brandão. 1-year warranty.",
      },
      { property: "og:url", content: `${SITE_URL}/` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      {
        rel: "preload",
        as: "image",
        href: heroDesktopWebp,
        type: "image/webp",
        media: "(min-width: 768px)",
        fetchPriority: "high",
      },
      {
        rel: "preload",
        as: "image",
        href: heroMobileWebp,
        type: "image/webp",
        media: "(max-width: 767px)",
        fetchPriority: "high",
      },
    ],
    // RF-21: AggregateRating só com nota e total confirmados (iguais aos exibidos).
    scripts: SITE.google
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              name: "My Team Renovation",
              url: `${SITE_URL}/`,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: SITE.google.rating,
                reviewCount: SITE.google.reviewCount,
              },
            }),
          },
        ]
      : [],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <TestimonialsSection />
        <WhyChooseSection />
        <LateLessonsSection />
        <ValuePropositionSection />
        <ServicesSection />
        <PortfolioSection />
        <IdealClientSection />
        <RisksSection />
        <PrecisionSection />
        <ProcessSection />
        <ComparisonSection />
        <PathwaysAndEmotionSection />
        <EstimateCallSection />
        <FaqSection />
        <ContactFormSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
      <Toaster theme="dark" position="top-center" />
    </div>
  );
}
