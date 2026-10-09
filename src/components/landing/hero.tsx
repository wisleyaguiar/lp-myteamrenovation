import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDesktopWebp from "@/assets/lp/hero-desktop.webp";
import heroDesktopJpg from "@/assets/lp/hero-desktop.jpg";
import heroMobileWebp from "@/assets/lp/hero-mobile.webp";
import heroMobileJpg from "@/assets/lp/hero-mobile.jpg";
import { SITE } from "@/components/landing/site-data";

const HERO_ALT =
  "Primary bathroom remodel with freestanding tub, frameless glass shower and brushed-gold fixtures";

// Linha de confiança (RF-19): só itens confirmados; nenhum item → null (linha omitida).
function TrustLine() {
  const { google, serviceArea, licensedInsured } = SITE;
  const items = [
    google && (
      <span key="google" className="flex items-center gap-2">
        <span className="flex text-gold" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </span>
        {google.rating.toFixed(1)} · {google.reviewCount} Google reviews
      </span>
    ),
    serviceArea && serviceArea.length > 0 && (
      <span key="area">Serving {serviceArea.join(" · ")}</span>
    ),
    licensedInsured && <span key="licensed">Licensed &amp; Insured</span>,
  ].filter(Boolean);
  if (items.length === 0) return null;
  return (
    <div className="fade-up mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground">
      {items}
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-20 lg:pt-28"
    >
      <div className="absolute inset-0">
        <picture>
          <source media="(min-width: 768px)" type="image/webp" srcSet={heroDesktopWebp} />
          <source media="(min-width: 768px)" srcSet={heroDesktopJpg} />
          <source type="image/webp" srcSet={heroMobileWebp} />
          <img
            src={heroMobileJpg}
            alt={HERO_ALT}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[30%_center] md:object-[25%_center]"
            width={828}
            height={1472}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-background/[.86] via-background/60 via-45% to-background/[.12]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        {/* Mobile: o texto cobre a foto toda; o scrim garante contraste (UI-02). */}
        <div className="absolute inset-0 bg-background/70 md:hidden" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[96rem] px-6 py-8 md:py-24">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-3xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
            <h1 className="fade-up font-display text-3xl leading-[1.05] text-foreground md:text-6xl md:leading-[1.02] lg:text-7xl">
              {SITE.copy.heroH1 ?? (
                <>
                  Transform your home with a{" "}
                  <span className="text-gold-gradient italic">high-end remodel{" "}</span>-{" "}
                  minus the delays, the mess, and the broken promises of typical contractors.
                </>
              )}
            </h1>

            <p className="fade-up mt-4 max-w-2xl text-base leading-relaxed text-foreground md:mt-8 md:text-lg">
              Homeowners who value exceptional quality know the true value of their time and
              property. With large firms you become another number on a spreadsheet, trapped in
              voicemail, endless emails, and a revolving door of workers.
            </p>
            <p className="fade-up mt-4 hidden max-w-2xl text-base leading-relaxed text-foreground md:block md:text-lg">
              <span className="text-foreground">My Team Renovation eliminates this headache.</span>{" "}
              Locally owned and family-operated, we combine rigorous project management with a
              direct line to the person in charge, from start to finish.
            </p>

            <div className="fade-up mt-6 flex flex-wrap items-center gap-4 md:mt-10">
              <Button
                asChild
                size="lg"
                className="h-auto min-h-14 whitespace-normal rounded-none bg-gold-gradient px-6 py-4 text-center text-sm uppercase tracking-[0.12em] text-primary-foreground shadow-[var(--shadow-gold)] hover:opacity-95 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:px-8 md:tracking-[0.2em]"
              >
                <a href="#contact">
                  {SITE.copy.ctaLabel ?? "Schedule Consultation"}
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                </a>
              </Button>
            </div>

            <TrustLine />

            <div className="fade-up mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs uppercase tracking-[0.24em] text-muted-foreground md:mt-12">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold" /> 1-Year Warranty
              </span>
              <span className="flex items-center gap-2">
                <span className="text-gold">◆</span> Bathrooms in 5 Days
              </span>
              <span className="flex items-center gap-2">
                <span className="text-gold">◆</span> Direct Owner Access
              </span>
            </div>
          </div>
          {/* Coluna direita reservada ao cartão do VSL (T19). */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
