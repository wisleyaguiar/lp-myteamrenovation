import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { SERVICE_OPTIONS, leadSchema } from "@/lib/lead-schema";
import { Section, Heading, GoldCTA } from "./primitives";
import { SITE } from "./site-data";

const FAQS = [
  {
    q: "How are you able to completely remodel a bathroom in just 5 days?",
    a: "Our record-breaking 5-day turnaround is the result of absolute pre-construction coordination. We never swing a hammer or begin demolition until 100% of your materials are secured on site and our specialized crew is fully assigned to your home, working consecutively without outside interruptions.",
  },
  {
    q: "Who is responsible for purchasing the remodeling materials?",
    a: "We handle all logistics for structural materials (waterproofing systems, drywall, thinsets, plumbing lines). For visual finish selections (tiles, flooring, plumbing fixtures, vanities, lighting), we provide specialized design guidance and introduce you directly to our wholesale distributor network.",
  },
  {
    q: "What makes My Team Renovation different from a large commercial contractor?",
    a: "Large builders route you through account representatives and corporate managers who rarely visit your home. At My Team Renovation, we combine institutional precision with the high-touch care of a local, family-run business. You deal directly with the owner, Leonardo, who personally oversees your job site.",
  },
  {
    q: "Will my daily work-from-home routine be heavily disrupted during construction?",
    a: "We build with your professional schedule in mind. Our crews work within strict, predictable hours, establish heavy-duty dust barriers, and utilize advanced dust-extraction tools. Active on-site management ensures noise levels are controlled around your critical meeting windows.",
  },
  {
    q: "Can the initial estimate change once construction begins?",
    a: "Financial transparency is our foundational rule. The price locked into your approved proposal is exactly what you pay. If you choose to expand scope, update finishes, or alter design elements mid-remodel, we write a clear, itemized change order for your approval before executing any new work.",
  },
];

// RF-26/RF-38: só entram com dado confirmado em SITE (F-DADOS).
const CONDITIONAL_FAQS = [
  ...(SITE.serviceArea?.length
    ? [
        {
          q: "Do you serve my area?",
          a: `Yes, if you are in ${SITE.serviceArea.join(", ")}. My Team Renovation serves these areas.`,
        },
      ]
    : []),
  ...(SITE.licensedInsured
    ? [
        {
          q: "Are you licensed and insured?",
          a: "Yes. My Team Renovation is licensed and insured.",
        },
      ]
    : []),
];

export function FaqSection() {
  return (
    <Section id="faq">
      {SITE.copy.h2.faq && <Heading className="mb-12 text-center">{SITE.copy.h2.faq}</Heading>}
      <div className="grid gap-16 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <p className="text-muted-foreground">
            Answers to the most common questions we receive from discerning homeowners.
          </p>
        </div>
        <div className="lg:col-span-2">
          <Accordion type="single" collapsible className="w-full">
            {[...FAQS, ...CONDITIONAL_FAQS].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="py-6 text-left font-display text-lg text-foreground hover:no-underline hover:text-gold data-[state=open]:text-gold">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}

const FIELD_CLASS =
  "h-12 rounded-lg border-white/10 bg-[#152238] text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-gold";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={`${id}-error`} role="alert" className="text-sm text-red-300">
      {message}
    </p>
  ) : null;
}

// RF-18/R4: só sugere ligar se o telefone confirmado existir.
const SUBMIT_ERROR = `We couldn't send your request. Please try again${SITE.phone ? " or call us" : ""}.`;

function readCookie(name: string): string | undefined {
  const hit = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : undefined;
}

export function ContactFormSection() {
  const [service, setService] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const parsed = leadSchema.safeParse({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      service,
      zip: String(data.get("zip") ?? ""),
      company: String(data.get("company") ?? ""),
      event_id: crypto.randomUUID(),
      event_source_url: window.location.href,
      fbp: readCookie("_fbp"),
      fbc: readCookie("_fbc"),
      consent: SITE.copy.consentText ? true : undefined,
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      setFormError("");
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    setErrors({});
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(String(res.status));
      // RF-14: o Lead do browser só dispara em /thank-you, com este event_id (dedupe com a CAPI).
      try {
        sessionStorage.setItem("mtr_lead_event_id", parsed.data.event_id);
      } catch {
        // sessionStorage bloqueado: o redirecionamento segue, sem Lead no browser.
      }
      window.location.assign("/thank-you");
    } catch {
      setSubmitting(false);
      setFormError(SUBMIT_ERROR);
      toast.error(SUBMIT_ERROR);
    }
  };

  return (
    <Section id="contact" className="bg-obsidian">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          {SITE.copy.h2.contact && <Heading className="mb-6">{SITE.copy.h2.contact}</Heading>}
          <p className="text-muted-foreground">
            Fill out the brief form below and Leonardo will reach out directly to discuss your
            project.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-14 rounded-2xl border border-white/10 bg-[#0f1a2b] p-8 shadow-2xl md:p-10"
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-white">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                required
                autoComplete="name"
                placeholder="Your full name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={FIELD_CLASS}
              />
              <FieldError id="name" message={errors.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-white">
                {SITE.copy.phoneLabel ?? "WhatsApp"}
              </Label>
              <div className="flex gap-2">
                <div
                  aria-hidden="true"
                  className="flex h-12 w-16 items-center justify-center rounded-lg border border-white/10 bg-[#152238] text-sm text-foreground"
                >
                  +1
                </div>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="(000) 000-0000"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={`${FIELD_CLASS} flex-1`}
                />
              </div>
              <FieldError id="phone" message={errors.phone} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-white">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={FIELD_CLASS}
              />
              <FieldError id="email" message={errors.email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zip" className="text-sm font-medium text-white">
                ZIP code
              </Label>
              <Input
                id="zip"
                name="zip"
                required
                inputMode="numeric"
                pattern="\d{5}"
                maxLength={5}
                autoComplete="postal-code"
                placeholder="77494"
                aria-invalid={!!errors.zip}
                aria-describedby={errors.zip ? "zip-error" : undefined}
                className={FIELD_CLASS}
              />
              <FieldError id="zip" message={errors.zip} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service" className="text-sm font-medium text-white">
                Remodeling Service Needed
              </Label>
              <Select name="service" required value={service} onValueChange={setService}>
                <SelectTrigger
                  id="service"
                  aria-required="true"
                  aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? "service-error" : undefined}
                  className="h-12 rounded-lg border-white/10 bg-[#152238] text-base text-foreground focus:ring-gold data-[placeholder]:text-muted-foreground"
                >
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-[#152238] text-foreground">
                  {SERVICE_OPTIONS.map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="focus:bg-gold/10 focus:text-foreground"
                    >
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError id="service" message={errors.service} />
            </div>

            {/* Honeypot (RF-43): fora da tela e da árvore de acessibilidade. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <input type="text" name="company" tabIndex={-1} autoComplete="off" />
            </div>
          </div>

          {SITE.copy.consentText && (
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              {SITE.copy.consentText}
            </p>
          )}

          {formError && (
            <p role="alert" className="mt-6 text-sm text-red-300">
              {formError}
            </p>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="mt-10 h-auto min-h-14 w-full whitespace-normal rounded-lg bg-gold-gradient px-4 py-4 text-center text-sm uppercase tracking-[0.12em] text-primary-foreground shadow-[var(--shadow-gold)] hover:opacity-95 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:tracking-[0.2em]"
          >
            {submitting
              ? "Sending…"
              : (SITE.copy.submitLabel ?? "Connect Directly with My Team Renovation")}
            <ArrowRight className="ml-3 h-4 w-4 shrink-0" />
          </Button>
        </form>
      </div>
    </Section>
  );
}

export function FinalCtaSection() {
  return (
    <Section className="border-y border-border">
      <div className="mx-auto max-w-4xl text-center">
        {SITE.copy.h2.finalCta && <Heading className="mb-6">{SITE.copy.h2.finalCta}</Heading>}
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          My Team Renovation delivers master-level craftsmanship, efficient timelines, and the
          personal respect your home deserves.
        </p>
        <GoldCTA>Contact Leonardo Directly</GoldCTA>
      </div>
    </Section>
  );
}
