import {
  Bath,
  ShowerHead,
  Layers,
  ChefHat,
  Hammer,
  Timer,
  UserRound,
  Sparkles,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";
import { Section, GoldRule, GoldCTA, Heading, ResponsiveImage } from "./primitives";
import { SITE } from "./site-data";
import kitchenDark from "@/assets/portfolio-kitchen-dark.jpg";
import promessaWebp from "@/assets/lp/promessa.webp";
import promessaJpg from "@/assets/lp/promessa.jpg";
import madeForLeftWebp from "@/assets/lp/made-for-left.webp";
import madeForLeftJpg from "@/assets/lp/made-for-left.jpg";
import madeForRightWebp from "@/assets/lp/made-for-right.webp";
import madeForRightJpg from "@/assets/lp/made-for-right.jpg";
import wideBannerWebp from "@/assets/lp/wide-banner.webp";
import wideBannerJpg from "@/assets/lp/wide-banner.jpg";

const WHY_BULLETS = [
  {
    icon: Bath,
    text: "Specialized Bathroom Remodeling — full-service residential transformations.",
  },
  { icon: ShowerHead, text: "Walk-In Shower Conversions with frameless glass and linear drains." },
  {
    icon: Layers,
    text: "Luxury Flooring — Hardwood, LVP, Laminate, Tile from wholesale channels.",
  },
  {
    icon: ChefHat,
    text: "Kitchen Remodeling — custom cabinetry, premium counters, open concepts.",
  },
  { icon: Hammer, text: "Custom Carpentry — finish work, walk-in closets, accent walls." },
  { icon: Timer, text: "Industry-Leading Timelines — a single bathroom finished in just 5 days." },
  { icon: UserRound, text: "A Single Point of Contact — work directly with owner Leonardo." },
  { icon: Sparkles, text: "Rigorous Daily Cleanups — job site vacuumed at end of every day." },
  {
    icon: ShieldCheck,
    text: "1-Year Warranty — a formal, rock-solid commitment on every project.",
  },
];

export function WhyChooseSection() {
  return (
    <Section id="why" className="bg-obsidian">
      <div className="mt-16">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          A streamlined, efficient construction process designed to modernize your space, maximize
          property value, and deliver ultimate comfort for your family.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2 md:gap-x-12">
          {WHY_BULLETS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-4">
              <span className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center border border-gold/30 bg-gold/5 text-gold">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm leading-relaxed text-foreground/90">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-24 mx-auto max-w-4xl text-center">
        <GoldRule className="mx-auto mb-10 w-32" />
        <p className="font-display text-2xl leading-relaxed text-foreground md:text-3xl">
          A home remodel shouldn't be a test of your patience. It should be an{" "}
          <span className="text-gold-gradient italic">investment in your lifestyle.</span>
        </p>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Impersonal corporate contractors ignore your calls, push back schedules, and go silent
          when you need them most. My Team Renovation stands as the trusted partner for families and
          professionals who demand elite standards of premium craftsmanship—without sacrificing a
          seamless, personalized, and stress-free experience.
        </p>
        <GoldCTA>Schedule Your Consultation</GoldCTA>
      </div>
    </Section>
  );
}

const LATE_LESSONS = [
  {
    title: "I'll go with a massive commercial firm because they seem more established.",
    detail:
      "…until the salesperson disappears, nobody answers the phone on Friday afternoon, and your home is handed off to a rotating crew of subcontractors you've never met.",
  },
  {
    title: "I'll just hire a cheap local handyman; it's a simple job.",
    detail:
      "…until you discover an expensive water leak behind your wall caused by an amateur waterproofing job.",
  },
  {
    title: "They promised me they'd be finished in two weeks.",
    detail:
      "…but the typical contractor takes your initial deposit, splits his crew among four other projects, and leaves your home a disaster zone for months.",
  },
  {
    title: "All contractors are the same; I'll just shop around for the lowest price.",
    detail:
      "…when in reality, premium work commands a fair price because it guarantees certified pros, strict punctuality, and an owner who personally manages your project every single day.",
  },
];

export function LateLessonsSection() {
  return (
    <Section id="lessons">
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {LATE_LESSONS.map((item) => (
          <article
            key={item.title}
            className="border-l-2 border-gold bg-card/60 p-8 transition-colors hover:bg-card"
          >
            <p className="font-display text-lg text-foreground md:text-xl">
              <span className="mr-3 text-destructive">✕</span>"{item.title}"
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {item.detail}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function ValuePropositionSection() {
  return (
    <Section id="value" className="bg-obsidian">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden ring-1 ring-border">
          <ResponsiveImage
            webp={promessaWebp}
            fallback={promessaJpg}
            alt="Walk-in wet room with freestanding tub and brushed-gold fixtures"
            width={1200}
            height={1500}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-obsidian/60 via-transparent to-transparent" />
        </div>
        <div>
          <GoldRule className="w-24" />
          <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            While the American remodeling market forces you to choose between rigid bureaucratic
            corporations and disorganized independent crews, My Team Renovation brings the perfect
            balance: the precision and punctuality of corporate project management, backed by the
            care and dedication of a family-owned local business.
          </p>
          <p className="mt-8 font-display text-2xl leading-snug text-foreground md:text-3xl">
            Our promise is simple: to elevate your living space while completely removing the stress
            of remodeling.
          </p>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            You will never be left hanging by an unanswered voicemail. We plan every phase down to
            the millimeter so you know exactly when the project will be handed over—with zero
            surprises and zero excuses.
          </p>
        </div>
      </div>
    </Section>
  );
}

const SERVICES = [
  {
    icon: Bath,
    title: "Primary & Guest Bathroom Remodeling",
    text: "Full-scale modernization: converting outdated tubs into spacious walk-in showers, seamless linear drains, custom recessed niches, premium vanities, integrated LED lighting, and high-end frameless glass doors.",
  },
  {
    icon: Layers,
    title: "Luxury Flooring Installation",
    text: "Professional removal of old surfaces followed by technically perfect installation of Hardwood, Luxury Vinyl Plank (LVP), or large-format porcelain tile. Sourced directly from wholesale distributors.",
  },
  {
    icon: ChefHat,
    title: "Gourmet Kitchen Remodeling",
    text: "Complete layout redesigns, structural wall removals for true open-concept living, custom cabinetry, farmhouse sinks, and architectural lighting layouts that turn your kitchen into the centerpiece of your home.",
  },
  {
    icon: Timer,
    title: "On-Site Management & Accelerated Execution",
    text: "Leonardo personally supervises your job site every day. A standard single bathroom delivered in 5 days with master-level finishes and a spotlessly cleaned workspace at the end of each shift.",
  },
];

export function ServicesSection() {
  return (
    <Section id="services">
      {SITE.copy.h2.services && <Heading className="text-center">{SITE.copy.h2.services}</Heading>}
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {SERVICES.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="group relative overflow-hidden border border-border bg-card p-10 transition-all hover:border-gold/50"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <Icon className="h-10 w-10 text-gold" strokeWidth={1.2} />
            <h3 className="mt-6 font-display text-2xl text-foreground">{title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {text}
            </p>
          </article>
        ))}
      </div>
      <GoldCTA>Request Your Free Estimate</GoldCTA>
    </Section>
  );
}

const IDEAL_YES = [
  "Discerning Homeowners who refuse to compromise on quality.",
  "Busy Professionals and Executives who value direct communication over corporate red tape.",
  "Work-From-Home Professionals who require quiet, organized, respectful crews on strict schedules.",
  "Recent Home Buyers looking to customize their newly purchased property with a top-tier local builder.",
];

const IDEAL_NO = [
  "Shoppers hunting purely for the lowest estimate.",
  "Anyone willing to trade poor communication and open deadlines for a discount.",
  "Homeowners looking to play contractors against each other in a bidding war.",
];

export function IdealClientSection() {
  return (
    <Section id="ideal" className="bg-obsidian">
      <div className="grid gap-10 md:grid-cols-2 md:items-stretch">
        <div className="flex flex-col gap-6">
          <div className="relative aspect-[4/3] overflow-hidden ring-1 ring-border">
            <ResponsiveImage
              webp={madeForLeftWebp}
              fallback={madeForLeftJpg}
              alt="Curbless shower with linear drain and mosaic accent wall"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="border border-gold/30 bg-card/40 p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">Made For</p>
            <ul className="mt-6 space-y-4">
              {IDEAL_YES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground/90">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-gold" />
                  <span className="text-sm md:text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="relative aspect-[4/3] overflow-hidden ring-1 ring-border">
            <ResponsiveImage
              webp={madeForRightWebp}
              fallback={madeForRightJpg}
              alt="Double vanity with quartz top and custom wood cabinetry"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="border border-border bg-card/40 p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Not For</p>
            <ul className="mt-6 space-y-4">
              {IDEAL_NO.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <X className="mt-1 h-5 w-5 flex-shrink-0 text-silver/60" />
                  <span className="text-sm md:text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

const RISKS = [
  {
    label: "Radio Silence",
    text: "Reaching out with an urgent structural question on Friday and getting nothing but an automated email response the following Monday.",
  },
  {
    label: "Endless Delays",
    text: "A one-week project turning into a months-long ordeal because the contractor pulled his crew off your home for a larger commercial account.",
  },
  {
    label: "Chronic Mess and Chaos",
    text: "A chaotic job site with tracking dust and construction debris left scattered across your living spaces every night.",
  },
  {
    label: "Hidden Technical Errors",
    text: "Cutting corners on shower pan waterproofing that inevitably leads to toxic mold and devastating structural repair costs.",
  },
  {
    label: "Scope Misalignment",
    text: "Crucial design elements discussed with a salesperson that never get communicated to the crew executing the work.",
  },
];

export function RisksSection() {
  return (
    <Section id="risks">
      <div className="mt-14 space-y-4">
        {RISKS.map((risk, i) => (
          <article
            key={risk.label}
            className="flex flex-col gap-4 border-l border-border bg-card/40 p-6 transition-all hover:border-destructive md:flex-row md:items-center md:gap-8 md:p-8"
          >
            <div className="flex items-center gap-4 md:w-72">
              <span className="font-display text-3xl text-destructive">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-lg text-foreground">{risk.label}</p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {risk.text}
            </p>
          </article>
        ))}
      </div>
      <div className="mx-auto mt-16 max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
          The question isn't just how much your remodel costs.
        </p>
        <p className="mt-6 font-display text-3xl leading-snug text-foreground md:text-4xl">
          What is your <span className="text-gold-gradient italic">peace of mind</span> and the
          equity of your home worth to you?
        </p>
      </div>
    </Section>
  );
}

const PRECISION = [
  {
    label: "Corporate Roots",
    text: "Founded by Leonardo Brandão after experiencing firsthand the frustration of bureaucracy and poor communication in the American remodeling market.",
  },
  {
    label: "True Local & Family Business",
    text: "Focused entirely on providing a highly attentive, personalized boutique experience for our community.",
  },
  {
    label: "Total Accessibility",
    text: "The owner personally manages your project and steps onto your job site daily—no communication breakdowns.",
  },
  {
    label: "Unrivaled Turnarounds",
    text: "Finished spaces on timelines that look impossible to our competitors, achieved through meticulous pre-construction planning.",
  },
  {
    label: "Culture of Cleanliness",
    text: "A job site meticulously swept, vacuumed, and organized every single day—out of respect for your property.",
  },
];

export function PrecisionSection() {
  return (
    <Section id="precision" className="bg-obsidian">
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-14">
        <div className="lg:col-span-3">
          <ul className="grid gap-6 sm:grid-cols-2">
            {PRECISION.map((item) => (
              <li key={item.label} className="border-l border-gold/40 bg-card/40 p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-gold">{item.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden ring-1 ring-border lg:col-span-2">
          <img
            src={kitchenDark}
            alt="Custom dark cabinet kitchen"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
        </div>
      </div>
      <GoldCTA>Work Directly With The Owner</GoldCTA>
    </Section>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Dedicated One-on-One Consultation",
    text: "We map out your exact aesthetic goals, design preferences, and functional needs with Leonardo directly.",
  },
  {
    n: "02",
    title: "Technical Site Visit & Structural Assessment",
    text: "Comprehensive on-site analysis of plumbing, electrical, and framing—performed personally by Leo.",
  },
  {
    n: "03",
    title: "Transparent, Itemized Estimate",
    text: "A clear, comprehensive proposal. Total price certainty with no hidden fees or mid-project surprises.",
  },
  {
    n: "04",
    title: "Material Procurement & Guidance",
    text: "Expert direction and wholesale source matching for finish materials, plus managed logistics.",
  },
  {
    n: "05",
    title: "Streamlined Construction & Daily Updates",
    text: "Kicks off exactly on time. Continuous progress updates and direct communication with your site manager.",
  },
  {
    n: "06",
    title: "Deep Clean & Key Handover",
    text: "Project wrapped on schedule. A thorough post-construction cleanup so you enjoy your new space the same day.",
  },
  {
    n: "07",
    title: "Post-Project Inspection & Warranty",
    text: "Final walkthrough followed by activation of your comprehensive 1-year structural warranty.",
  },
];

export function ProcessSection() {
  return (
    <Section id="process">
      {SITE.copy.h2.process && <Heading className="text-center">{SITE.copy.h2.process}</Heading>}
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step) => (
          <article
            key={step.n}
            className="group relative border border-border bg-card/40 p-8 transition-all hover:border-gold/50 hover:bg-card"
          >
            <span className="font-display text-5xl text-gold-gradient">{step.n}</span>
            <h3 className="mt-4 font-display text-xl text-foreground">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
          </article>
        ))}
      </div>
      <GoldCTA>Start Your Blueprint Today</GoldCTA>
    </Section>
  );
}

const COMPARISON = [
  {
    feature: "Communication",
    handy: "Poor; hard to reach, slow to reply.",
    big: "Bureaucratic; phone trees and automated emails.",
    mtr: "Direct, continuous, in real time with the owner.",
  },
  {
    feature: "Deadlines",
    handy: "Unpredictable; schedules shift week by week.",
    big: "Extended and bloated by slow corporate processes.",
    mtr: "Fastest turnarounds in the market — bathroom in 5 days.",
  },
  {
    feature: "Finishing Work",
    handy: "Amateur; lacks precision for high-end properties.",
    big: "Standardized; assembly-line results with no flexibility.",
    mtr: "Meticulous attention backed by premium craftsmanship.",
  },
  {
    feature: "Cleanliness",
    handy: "Debris and dust piled throughout your home.",
    big: "Cleanup delayed until the final week.",
    mtr: "Vacuumed and squared away at the end of every shift.",
  },
  {
    feature: "Warranty",
    handy: "Hard to reach or missing entirely.",
    big: "Slow corporate approval to send a technician.",
    mtr: "Formal 1-year warranty with local priority support.",
  },
];

export function ComparisonSection() {
  return (
    <Section id="compare" className="bg-obsidian">
      {SITE.copy.h2.compare && <Heading className="text-center">{SITE.copy.h2.compare}</Heading>}
      <div className="mt-14 space-y-4 md:hidden">
        {COMPARISON.map((row) => (
          <article key={row.feature} className="border border-border bg-card/40 p-5">
            <p className="font-display text-lg text-foreground">{row.feature}</p>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Handyman
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{row.handy}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Large Contractor Companies
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{row.big}</dd>
              </div>
              <div className="border-l border-gold/40 bg-gold/[0.04] p-3">
                <dt className="text-xs uppercase tracking-[0.2em] text-gold">My Team Renovation</dt>
                <dd className="mt-1 text-sm text-foreground">{row.mtr}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
      <div className="mt-14 hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="py-5 pr-4 text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Feature
              </th>
              <th
                scope="col"
                className="py-5 px-4 text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Handyman
              </th>
              <th
                scope="col"
                className="py-5 px-4 text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Large Contractor Companies
              </th>
              <th scope="col" className="py-5 pl-4 text-xs uppercase tracking-[0.2em] text-gold">
                My Team Renovation
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={row.feature} className="border-b border-border/60 align-top">
                <th
                  scope="row"
                  className="py-6 pr-4 font-display text-lg font-normal text-foreground"
                >
                  {row.feature}
                </th>
                <td className="py-6 px-4 text-sm text-muted-foreground">{row.handy}</td>
                <td className="py-6 px-4 text-sm text-muted-foreground">{row.big}</td>
                <td className="py-6 pl-4 text-sm text-foreground bg-gold/[0.04] border-l border-gold/40">
                  {row.mtr}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <GoldCTA>Choose The Right Team</GoldCTA>
    </Section>
  );
}

const PATHWAYS = [
  {
    title: "Instant Home Equity",
    text: "Immediately boost your property's appraisal by modernizing key spaces.",
  },
  {
    title: "Optimized Layouts",
    text: "Maximize your home's footprint with thoughtfully engineered kitchens and bathrooms.",
  },
  {
    title: "Modern Architectural Style",
    text: "Replace dated carpets or worn surfaces with ultra-durable premium finishes.",
  },
  {
    title: "Total Financial Certainty",
    text: "Your custom budget is locked in and respected from start to finish.",
  },
  {
    title: "Mitigated Liabilities",
    text: "Every installation executed strictly to local building codes.",
  },
];

const EMOTIONAL = [
  {
    title: "Complete Peace of Mind",
    text: "Knowing you can contact the head of the company directly at any moment.",
  },
  {
    title: "The Pride of Hosting",
    text: "The joy of opening your doors to friends, neighbors, and extended family.",
  },
  {
    title: "A Sense of Achievement",
    text: "Seeing your hard work materialize into a sophisticated, tailored environment.",
  },
  {
    title: "Pure Relief",
    text: "Navigating a significant home transformation with none of the horror stories.",
  },
];

export function PathwaysAndEmotionSection() {
  return (
    <Section id="value-add">
      <div className="relative mb-16 aspect-[16/6] overflow-hidden ring-1 ring-border">
        <ResponsiveImage
          webp={wideBannerWebp}
          fallback={wideBannerJpg}
          alt="Open-concept kitchen and living area with waterfall island"
          width={1179}
          height={442}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
      </div>
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <ul className="space-y-6">
            {PATHWAYS.map((item, i) => (
              <li key={item.title} className="flex gap-5">
                <span className="font-display text-2xl text-gold">0{i + 1}</span>
                <div>
                  <p className="font-display text-lg text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground md:text-base">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-muted-foreground">
            Because at the end of the day, a beautifully remodeled home is about how it makes your
            family feel.
          </p>
          <ul className="mt-10 space-y-6">
            {EMOTIONAL.map((item) => (
              <li key={item.title} className="border-l border-gold/40 pl-6">
                <p className="font-display text-lg text-foreground">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <GoldCTA>Elevate Your Home</GoldCTA>
    </Section>
  );
}

export function EstimateCallSection() {
  return (
    <Section id="estimate" className="bg-obsidian">
      <div className="relative overflow-hidden border border-gold/40 bg-gradient-to-br from-card via-obsidian to-card p-12 md:p-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            Schedule an initial site consultation to unlock the potential of your current space and
            establish an efficient, guaranteed timeline for construction.
          </p>
          <GoldCTA>Book On-Site Consultation with Leonardo</GoldCTA>
        </div>
      </div>
    </Section>
  );
}
