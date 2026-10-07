import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/portfolio-kitchen-hero.jpg";

export function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Bright modern kitchen remodel by My Team Renovation"
          className="h-full w-full object-cover"
          width={1200}
          height={1600}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/75 via-background/40 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
          <h1 className="fade-up font-display text-4xl leading-[1.02] text-foreground md:text-6xl lg:text-7xl">
            Transform your home with a{" "}
            <span className="text-gold-gradient italic">high-end remodel{"\u00a0"}</span>-{"\u00a0"}
            minus the delays, the mess, and the broken promises of typical contractors.
          </h1>

          <p className="fade-up mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Homeowners who value exceptional quality know the true value of their time and property.
            With large firms you become another number on a spreadsheet, trapped in voicemail,
            endless emails, and a revolving door of workers.
          </p>
          <p className="fade-up mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            <span className="text-foreground">My Team Renovation eliminates this headache.</span>{" "}
            Locally owned and family-operated, we combine rigorous project management with a direct
            line to the person in charge, from start to finish.
          </p>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-none bg-gold-gradient px-8 text-sm uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] hover:opacity-95"
            >
              <a href="#contact">
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="fade-up mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
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
      </div>
    </section>
  );
}
