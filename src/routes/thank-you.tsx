import { Link, createFileRoute } from "@tanstack/react-router";
import logoWebp from "@/assets/lp/logo.webp";
import logoPng from "@/assets/lp/logo.png";
import { ResponsiveImage } from "@/components/landing/primitives";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [{ title: "Thank you — My Team Renovation" }, { name: "robots", content: "noindex" }],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-foreground">
      <div className="max-w-xl text-center">
        <ResponsiveImage
          webp={logoWebp}
          fallback={logoPng}
          alt="My Team Renovation"
          width={400}
          height={290}
          loading="eager"
          className="mx-auto mb-10 h-24 w-auto"
        />
        <h1 className="font-display text-4xl text-foreground md:text-5xl">Thank you.</h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Your request is in. Leonardo will contact you shortly to schedule your on-site
          consultation.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex min-h-14 items-center justify-center bg-gold-gradient px-8 py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] transition-opacity hover:opacity-95 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
