import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/components/landing/site-data";
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
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
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
        <TestimonialsSection />
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
