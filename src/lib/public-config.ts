// Config pública lida em runtime (Coolify), sem rebuild. Só entram valores que o navegador
// pode ver; segredos de servidor nunca passam por aqui. Inválido ou vazio vira null.
import { createServerFn } from "@tanstack/react-start";

export type PublicConfig = {
  metaPixelId: string | null;
  ga4MeasurementId: string | null;
  vslVideoUrl: string | null;
};

const matching = (re: RegExp) => (v: string | undefined) => {
  const s = v?.trim();
  return s && re.test(s) ? s : null;
};

const pixelId = matching(/^\d{5,20}$/);
const ga4Id = matching(/^G-[A-Z0-9]{4,20}$/);

function httpsUrl(v: string | undefined): string | null {
  try {
    const u = new URL(v?.trim() ?? "");
    return u.protocol === "https:" ? u.href : null;
  } catch {
    return null;
  }
}

export const getPublicConfig = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicConfig> => ({
    metaPixelId: pixelId(process.env.META_PIXEL_ID),
    ga4MeasurementId: ga4Id(process.env.GA4_MEASUREMENT_ID),
    vslVideoUrl: httpsUrl(process.env.VSL_VIDEO_URL),
  }),
);
