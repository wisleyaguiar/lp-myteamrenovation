// Lead da LP Black Friday (public/blackfriday): mesma validação do api/lead.php do zip,
// encaminha ao workflow n8n "LP Black Friday 2026" (→ Kommo) e depois à CAPI.
// O main.js da LP só aceita HTTP 2xx com { ok: true }. Nunca lança e nunca loga a URL nem o lead.
import { z } from "zod";
import { normalizePhoneE164 } from "@/lib/lead.server";
import { sendCapiLead } from "@/lib/meta-capi.server";

const WEBHOOK_TIMEOUT_MS = 15_000; // o n8n só responde depois do Kommo

const BF_PROJECTS = [
  "Replace a tub with a walk-in shower",
  "Remodel my master bathroom shower",
  "Fully renovate my master bathroom",
] as const;

// Atribuição é cortada, não recusada: UTM longa não pode derrubar o lead.
const cut = (max: number) =>
  z
    .string()
    .optional()
    .transform((s) => (s ?? "").trim().slice(0, max));

const bfLeadSchema = z.object({
  first_name: z.string().trim().min(1).max(60),
  phone: z
    .string()
    .transform(normalizePhoneE164)
    .pipe(z.string().regex(/^\+1[2-9]\d{9}$/)),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}$/),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(120)
    .refine((v) => v === "" || z.string().email().safeParse(v).success)
    .default(""),
  project_type: z.enum(BF_PROJECTS),
  event_id: z.string().regex(/^[\w-]{6,64}$/),
  page_url: cut(500),
  fbp: cut(200),
  fbc: cut(400),
  utm_source: cut(200),
  utm_medium: cut(200),
  utm_campaign: cut(200),
  utm_content: cut(200),
  utm_term: cut(200),
  fbclid: cut(200),
  gclid: cut(200),
  landing_url: cut(500),
  referrer: cut(500),
});

function json(body: unknown, status: number): Response {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

export async function handleBfLead(request: Request): Promise<Response> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "bad_json" }, 400);
  }
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return json({ ok: false, error: "bad_json" }, 400);
  }

  // Honeypot: finge sucesso, não envia nada.
  const honeypot = (raw as { company?: unknown }).company;
  if (typeof honeypot === "string" && honeypot.trim() !== "") return json({ ok: true }, 200);

  const parsed = bfLeadSchema.safeParse(raw);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0] ?? "body")))];
    return json({ ok: false, error: "invalid", fields }, 422);
  }
  const lead = parsed.data;

  const webhookUrl = process.env.BF_LEAD_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    console.error("bf_lead_destination_unconfigured");
    return json({ ok: false, error: "lead_destination_unavailable" }, 503);
  }

  const { fbp, fbc, ...forward } = lead;
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...forward, submitted_at: new Date().toISOString() }),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error("bf_lead_upstream_error", { status: res.status, event_id: lead.event_id });
      return json({ ok: false, error: "crm_failed" }, 502);
    }
  } catch (err) {
    const timeout = err instanceof Error && err.name === "TimeoutError";
    console.error(timeout ? "bf_lead_upstream_timeout" : "bf_lead_upstream_error", {
      event_id: lead.event_id,
    });
    return json(
      { ok: false, error: timeout ? "upstream_timeout" : "crm_failed" },
      timeout ? 504 : 502,
    );
  }

  await sendCapiLead({
    eventId: lead.event_id,
    eventSourceUrl: lead.page_url,
    userAgent: request.headers.get("user-agent"),
    fbp: fbp || undefined,
    fbc: fbc || undefined,
    email: lead.email,
    phone: lead.phone,
  });
  return json({ ok: true }, 200);
}
