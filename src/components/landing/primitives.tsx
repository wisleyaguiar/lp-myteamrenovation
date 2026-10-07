import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  containerClassName?: string;
}

export function Section({ id, className, containerClassName, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <div className={cn("container mx-auto max-w-7xl px-6", containerClassName)}>{children}</div>
    </section>
  );
}

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div className={cn("flex items-center gap-3 text-xs uppercase tracking-[0.28em]", className)}>
      <span className="h-px w-8 bg-gold" />
      <span className="text-gold font-medium">{children}</span>
    </div>
  );
}

interface HeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function Heading({ children, className, as: Tag = "h2" }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display text-4xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function GoldRule({ className }: { className?: string }) {
  return <div className={cn("gold-rule w-full", className)} />;
}

interface GoldCTAProps {
  href?: string;
  children: ReactNode;
  className?: string;
}

export function GoldCTA({ href = "#contact", children, className }: GoldCTAProps) {
  return (
    <div className={cn("mt-12 flex justify-center", className)}>
      <a
        href={href}
        className="group inline-flex h-14 items-center justify-center bg-gold-gradient px-10 text-sm uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] transition-opacity hover:opacity-95"
      >
        {children}
        <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}
