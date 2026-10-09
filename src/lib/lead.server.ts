// Endpoint de lead (CT-01, CT-06): revalida o payload e encaminha ao webhook n8n.
// Nunca lança (um throw viraria o HTML 500 do errorMiddleware) e nunca loga a URL nem o lead.
import { leadSchema } from "@/lib/lead-schema";

const WEBHOOK_TIMEOUT_MS = 10_000;

const VALIDATION_FIELDS = new Set([
  "name",
  "phone",
  "email",
  "service",
  "zip",
  "event_id",
  "event_source_url",
  "fbp",
  "fbc",
  "consent",
]);

function json(body: unknown, status: number): Response {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

function validationError(field: string, message: string): Response {
  return json({ error: "validation_failed", field, message }, 400);
}

/** "+1" + dígitos digitados; um "1" inicial em número de 11 dígitos não é duplicado. */
export function normalizePhoneE164(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  return `+1${digits}`;
}

export async function handleLead(request: Request): Promise<Response> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return validationError("body", "Request body must be valid JSON");
  }
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return validationError("body", "Request body must be a JSON object");
  }

  // Honeypot (RF-43): descarta em silêncio, sem n8n.
  const honeypot = (raw as { company?: unknown }).company;
  if (typeof honeypot === "string" && honeypot.trim() !== "") return json({ ok: true }, 200);

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const key = String(issue?.path[0] ?? "body");
    return validationError(VALIDATION_FIELDS.has(key) ? key : "body", issue?.message ?? "Invalid");
  }
  const lead = parsed.data;

  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    console.error("lead_destination_unconfigured");
    return json({ error: "lead_destination_unavailable" }, 503);
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        full_name: lead.name,
        phone: normalizePhoneE164(lead.phone),
        email: lead.email,
        service: lead.service,
        zip: lead.zip,
        submitted_at: new Date().toISOString(),
        event_id: lead.event_id,
      }),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error("lead_upstream_error", { status: res.status, event_id: lead.event_id });
      return json({ error: "upstream_error" }, 502);
    }
    return json({ ok: true }, 200);
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      console.error("lead_upstream_timeout", { event_id: lead.event_id });
      return json({ error: "upstream_timeout" }, 504);
    }
    console.error("lead_upstream_error", { event_id: lead.event_id });
    return json({ error: "upstream_error" }, 502);
  }
}
