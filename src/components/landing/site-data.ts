// Somente dados confirmados (R4). Copy do Anexo B aprovada pela agência/cliente (PDF avaliação, 7 out 2026).
// Todo valor dependente do cliente começa null/false; a UI omite o que estiver ausente.
export const SITE_URL = "https://myteamrenovation.com";

export interface SiteGoogle {
  rating: number;
  reviewCount: number;
  profileUrl: string;
}

export interface SiteCopy {
  heroH1: string | null;
  heroSupport: string | null;
  heroSupportNoCities: string | null;
  ctaLabel: string | null;
  headerCtaLabel: string | null;
  phoneLabel: string | null;
  submitLabel: string | null;
  consentText: string | null;
  galleryLabel12: string | null;
  galleryLabel13: string | null;
  h2: {
    services: string | null;
    process: string | null;
    compare: string | null;
    faq: string | null;
    contact: string | null;
    finalCta: string | null;
  };
}

export interface SiteData {
  /** Telefone em E.164, ex.: "+17135550100". */
  phone: string | null;
  serviceArea: string[] | null;
  licensedInsured: boolean;
  google: SiteGoogle | null;
  /** Aprovação do corte de conteúdo (RF-36). */
  contentCutApproved: boolean;
  copy: SiteCopy;
}

export const SITE: SiteData = {
  phone: null,
  serviceArea: null,
  licensedInsured: false,
  google: null,
  contentCutApproved: false,
  copy: {
    heroH1: "Your primary bathroom, fully remodeled in 5 days — managed personally by the owner.",
    heroSupport: null,
    heroSupportNoCities:
      "Locally owned. One-year warranty, a spotless job site every day, and a direct line to Leonardo — no call centers, no rotating crews.",
    ctaLabel: "Book Your Free In-Home Consultation",
    headerCtaLabel: "Free Estimate",
    phoneLabel: "Mobile phone",
    submitLabel: "Send to Leonardo",
    consentText: null,
    galleryLabel12: "SPA BATHROOM",
    galleryLabel13: "SHOWER WITH BENCH",
    h2: {
      services: null,
      process: "How your project runs",
      compare: "How we compare",
      faq: "Questions homeowners ask us",
      contact: "Book your free in-home consultation",
      finalCta: null,
    },
  },
};
