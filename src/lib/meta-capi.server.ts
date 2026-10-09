// Meta Conversions API (CT-02): evento Lead enviado pelo servidor após o 2xx do n8n.
// Nunca lança e nunca loga token, URL, e-mail ou telefone. Falha = só o log `capi_failed`.
import { createHash } from "node:crypto";

const GRAPH_VERSION = "v23.0";
const CAPI_TIMEOUT_MS = 5_000;

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

export type CapiLead = {
  eventId: string;
  eventSourceUrl: string;
  userAgent: string | null;
  fbp?: string;
  fbc?: string;
  email: string;
  phone: string;
};

/** Só dígitos, com o código do país 1 (ex.: "+17135550100" → "17135550100"). */
function phoneDigits(phone: string): string {
  const d = phone.replace(/\D/g, "");
  return d.length === 10 ? `1${d}` : d;
}

export async function sendCapiLead(lead: CapiLead): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID?.trim();
  const token = process.env.META_CAPI_ACCESS_TOKEN?.trim();
  if (!pixelId || !token) return;

  // META_CAPI_BASE_URL existe só para o smoke apontar a um Meta falso; em produção fica vazio.
  const base = process.env.META_CAPI_BASE_URL?.trim() || "https://graph.facebook.com";
  const testCode = process.env.META_CAPI_TEST_EVENT_CODE?.trim();

  try {
    const res = await fetch(`${base}/${GRAPH_VERSION}/${encodeURIComponent(pixelId)}/events`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: lead.eventId,
            action_source: "website",
            event_source_url: lead.eventSourceUrl,
            user_data: {
              ...(lead.userAgent ? { client_user_agent: lead.userAgent } : {}),
              ...(lead.fbp ? { fbp: lead.fbp } : {}),
              ...(lead.fbc ? { fbc: lead.fbc } : {}),
              em: [sha256(lead.email.trim().toLowerCase())],
              ph: [sha256(phoneDigits(lead.phone))],
            },
          },
        ],
        ...(testCode ? { test_event_code: testCode } : {}),
        access_token: token,
      }),
      signal: AbortSignal.timeout(CAPI_TIMEOUT_MS),
    });
    if (!res.ok) console.error("capi_failed", res.status, lead.eventId);
  } catch (err) {
    const reason = err instanceof Error && err.name === "TimeoutError" ? "timeout" : "network";
    console.error("capi_failed", reason, lead.eventId);
  }
}
