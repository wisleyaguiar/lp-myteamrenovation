// Somente dados confirmados (R4) — preencher na fase F-DADOS.
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
    heroH1: null,
    heroSupport: null,
    heroSupportNoCities: null,
    ctaLabel: null,
    headerCtaLabel: null,
    phoneLabel: null,
    submitLabel: null,
    consentText: null,
    galleryLabel12: null,
    galleryLabel13: null,
    h2: {
      services: null,
      process: null,
      compare: null,
      faq: null,
      contact: null,
      finalCta: null,
    },
  },
};
