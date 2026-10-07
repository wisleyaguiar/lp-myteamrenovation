import { Section, Eyebrow, Heading, GoldRule } from "./primitives";
import kitchenHero from "@/assets/portfolio-kitchen-hero.jpg";
import kitchenDark from "@/assets/portfolio-kitchen-dark.jpg";
import bathSubway from "@/assets/portfolio-bath-subway.jpg";
import bathMaster from "@/assets/portfolio-bath-master.jpg";
import bathMarble from "@/assets/portfolio-bath-marble.jpg";
import stairs from "@/assets/portfolio-stairs.jpg";
import floorGray from "@/assets/portfolio-floor-gray.jpg";
import floorWood from "@/assets/portfolio-floor-wood.jpg";

const PROJECTS = [
  {
    src: kitchenHero,
    alt: "Modern white kitchen with blue shiplap island",
    label: "Modern Kitchen",
    tall: true,
  },
  {
    src: bathMarble,
    alt: "Master bathroom with marble walls and round mirror",
    label: "Marble Bathroom",
  },
  {
    src: kitchenDark,
    alt: "Dark cabinet kitchen with quartz waterfall island",
    label: "Custom Kitchen",
  },
  {
    src: bathMaster,
    alt: "Primary bathroom with freestanding tub",
    label: "Primary Bathroom",
    tall: true,
  },
  {
    src: bathSubway,
    alt: "Subway tile walk-in shower with brass fixtures",
    label: "Walk-In Shower",
  },
  { src: stairs, alt: "Custom hardwood staircase treads", label: "Custom Carpentry" },
  { src: floorGray, alt: "Gray LVP flooring installation", label: "Luxury Flooring" },
  { src: floorWood, alt: "Warm oak wood flooring installation", label: "Hardwood Floors" },
];

export function PortfolioSection() {
  return (
    <Section id="portfolio" className="bg-obsidian">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow className="justify-center">Portfolio</Eyebrow>
        <Heading className="mt-6">Recent Projects Delivered With Precision</Heading>
        <GoldRule className="mx-auto mt-6 max-w-[6rem]" />
        <p className="mt-6 text-muted-foreground">
          A selection of bathrooms, kitchens, flooring, and custom carpentry projects completed by
          our team.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {PROJECTS.map((p) => (
          <figure
            key={p.src}
            className={`group relative overflow-hidden bg-card ring-1 ring-border ${p.tall ? "row-span-2 aspect-[3/4] md:aspect-[3/5]" : "aspect-square"}`}
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-90" />
            <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-xs uppercase tracking-[0.24em] text-gold">
              {p.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

const TESTIMONIALS = [
  {
    name: "Weverton Nazario",
    meta: "10 reviews · 3 months ago",
    body: "We recently hired My Team Renovation for a remodeling project at our home, which included building an outdoor kitchen and an external restroom. From the beginning, the team was professional, responsive, and clear in explaining the scope of work. They paid attention to details and demonstrated solid craftsmanship throughout the project. Leonardo was supervising on a daily basis. The crew maintained a respectful work environment and kept the area as organized as possible during construction. We would confidently recommend My Team Renovation to anyone looking for reliable home remodeling services.",
  },
  {
    name: "Zhanna Karvas",
    meta: "Local Guide · 20 reviews · 7 months ago",
    body: "The My Team Renovation did an outstanding job remodeling our bathroom. Leo and team did an excellent job of rebuilding my master bath shower — the RIGHT WAY this time — after shoddy builder work left me leaky and moldy. MyTeam doesn't cut corners. They do what they say they will do. Leo shows up typically once a day — sometimes more — to monitor progress and quality. The guys show up promptly on time every.single.day. and work hard and with focus. I will 100% be calling MyTeam back for the second bathroom and many more things I want to do to my home.",
  },
  {
    name: "Fernando Blanco",
    meta: "12 reviews · 1 year ago",
    body: "Leonardo and his entire team are truly exceptional. After significant damage to my home due to a plumbing accident, the scope of the project was essentially close to an entire home rebuild. Leo ran an estimate quickly, walked me through each line item, and began the project rather quickly. The team is comprised of truly hard-working and meticulous individuals. While my house was relatively new (5 years old) prior to the accident, it now looks better than it ever was, with a custom design and high-end, quality finishes. I highly recommend MyTeamRenovation.",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <Section id="testimonials">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow className="justify-center">Client Reviews</Eyebrow>
        <Heading className="mt-6">Trusted by Homeowners on Google</Heading>
        <GoldRule className="mx-auto mt-6 max-w-[6rem]" />
        <p className="mt-6 text-muted-foreground">
          Verified 5-star reviews from real homeowners who chose My Team Renovation.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <article
            key={t.name}
            className="flex flex-col gap-5 border border-border bg-card/40 p-8 backdrop-blur-sm"
          >
            <Stars />
            <p className="text-sm leading-relaxed text-muted-foreground">"{t.body}"</p>
            <div className="mt-auto border-t border-border pt-4">
              <p className="font-display text-lg text-foreground">{t.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.meta}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
