import { Section, Eyebrow, Heading, GoldRule, ResponsiveImage } from "./primitives";
import { SITE } from "./site-data";

// Galeria = posições 04–13 do Anexo A (alts idênticos ao anexo). 12/13 sem rótulo até aprovação (NC-04).
const GALLERY_FILES = import.meta.glob("../../assets/lp/gallery-*.{webp,jpg}", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;
const asset = (n: string, ext: "webp" | "jpg") =>
  GALLERY_FILES[`../../assets/lp/gallery-${n}.${ext}`];

const PROJECTS = [
  {
    n: "04",
    alt: "Kitchen remodel with quartz island, gas cooktop and pendant lighting",
    label: "KITCHEN REMODEL",
    w: 720,
    h: 1200,
    tall: true,
  },
  {
    n: "05",
    alt: "Marble-look walk-in shower with frameless glass and matte black fixtures",
    label: "MARBLE SHOWER",
    w: 800,
    h: 800,
  },
  {
    n: "06",
    alt: "Custom kitchen with waterfall quartz island and white shaker cabinets",
    label: "Custom Kitchen",
    w: 770,
    h: 770,
  },
  {
    n: "07",
    alt: "Primary bathroom double vanity with arched brass mirrors",
    label: "Primary Bathroom",
    w: 720,
    h: 1200,
    tall: true,
  },
  {
    n: "08",
    alt: "Subway-tile walk-in shower with frameless glass and brass hardware",
    label: "Walk-In Shower",
    w: 800,
    h: 800,
  },
  { n: "09", alt: "Custom built-in shelving wall", label: "Custom Carpentry", w: 800, h: 800 },
  {
    n: "10",
    alt: "Wide-plank light oak flooring in a primary bedroom",
    label: "Luxury Flooring",
    w: 800,
    h: 800,
  },
  {
    n: "11",
    alt: "Hardwood staircase with solid oak treads",
    label: "HARDWOOD STAIRS",
    w: 800,
    h: 800,
  },
  {
    n: "12",
    alt: "Freestanding soaking tub next to a curbless walk-in shower",
    label: SITE.copy.galleryLabel12,
    w: 800,
    h: 800,
  },
  {
    n: "13",
    alt: "Walk-in shower with built-in bench and pebble floor",
    label: SITE.copy.galleryLabel13,
    w: 800,
    h: 800,
  },
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

      <div className="mt-16 grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {PROJECTS.map((p) => (
          <figure
            key={p.n}
            className={`group relative overflow-hidden bg-card ring-1 ring-border ${p.tall ? "row-span-2" : "aspect-square"}`}
          >
            <ResponsiveImage
              webp={asset(p.n, "webp")}
              fallback={asset(p.n, "jpg")}
              alt={p.alt}
              width={p.w}
              height={p.h}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-90" />
            {p.label && (
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-xs uppercase tracking-[0.24em] text-gold">
                {p.label}
              </figcaption>
            )}
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
      {SITE.google?.profileUrl && (
        <p className="mt-10 text-center">
          <a
            href={SITE.google.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            See all reviews on Google
          </a>
        </p>
      )}
    </Section>
  );
}
