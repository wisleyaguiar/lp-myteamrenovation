import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/mtr-logo.png";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "#why", label: "Why Us" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-28 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logoAsset}
            alt="My Team Renovation"
            className="h-20 w-auto md:h-24"
            width={160}
            height={96}
          />
          <span className="sr-only">My Team Renovation</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            size="lg"
            className="bg-gold-gradient text-primary-foreground shadow-[var(--shadow-gold)] hover:opacity-90 rounded-none tracking-wide"
          >
            <a href="#contact">Free Estimate</a>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="container mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-none px-2 py-3 text-sm font-medium text-muted-foreground hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-2 bg-gold-gradient text-primary-foreground rounded-none">
              <a href="#contact" onClick={() => setOpen(false)}>
                Free Estimate
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-obsidian">
      <div className="gold-rule" />
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3 md:items-start">
          <div>
            <img src={logoAsset} alt="My Team Renovation" className="h-28 w-auto md:h-36" />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Premium Residential Construction, Remodeling &amp; Luxury Flooring.
            </p>
          </div>
          <div className="text-sm text-muted-foreground md:text-center">
            <p className="mb-1 uppercase tracking-[0.24em] text-gold text-xs">Contact</p>
            <a href="mailto:contact@myteamrenovation.com" className="hover:text-gold">
              contact@myteamrenovation.com
            </a>
            <br />
            <a href="https://www.myteamrenovation.com" className="hover:text-gold">
              www.myteamrenovation.com
            </a>
          </div>
          <div className="text-sm text-muted-foreground md:text-right">
            <p className="mb-1 uppercase tracking-[0.24em] text-gold text-xs">Owner-Led</p>
            <p>Leonardo Brandão</p>
            <p className="mt-2 text-xs">Family owned. Locally operated.</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-border/40 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© 2026 My Team Renovation. All rights reserved.</p>
          <p className="uppercase tracking-[0.2em]">Construction &amp; Remodeling</p>
        </div>
      </div>
    </footer>
  );
}
