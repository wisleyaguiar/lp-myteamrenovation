// Smoke test do endpoint de lead e das rotas (T16). Node puro, sem dependências.
// Uso: npm run build && npm run smoke [-- --tracking]
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import http from "node:http";
import { join } from "node:path";

const TRACKING = process.argv.includes("--tracking");
const SERVER = ".output/server/index.mjs";
const PUBLIC_DIR = ".output/public";
const SECRET_PATH = "/webhook/smoke-secret-9f3a";
const CAPI_TOKEN = "SMOKE_CAPI_TOKEN_9f3a";
// Valores (runtime) e nomes das variáveis secretas: o nome no bundle público denuncia leitura no cliente.
const LEAKABLE = [SECRET_PATH, CAPI_TOKEN, "META_CAPI_ACCESS_TOKEN", "LEAD_WEBHOOK_URL"];

let failures = 0;
function check(name, ok, detail = "") {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok || !detail ? "" : ` — ${detail}`}`);
}

// n8n falso: FAIL → 500, HANG → sem resposta, demais → 200 registrando o corpo.
let mode = "OK";
const hits = [];
const fakeSockets = new Set();
const fake = http.createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    hits.push({ url: req.url, body });
    if (mode === "HANG") return;
    res.writeHead(mode === "FAIL" ? 500 : 200).end("{}");
  });
});
fake.on("connection", (s) => {
  fakeSockets.add(s);
  s.on("close", () => fakeSockets.delete(s));
});
await new Promise((r) => fake.listen(0, "127.0.0.1", r));
const fakeUrl = `http://127.0.0.1:${fake.address().port}${SECRET_PATH}`;

// Meta falsa (CAPI): FAIL → 400, demais → 200 registrando o corpo.
let metaMode = "OK";
const metaHits = [];
const fakeMeta = http.createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    metaHits.push({ url: req.url, body });
    res.writeHead(metaMode === "FAIL" ? 400 : 200).end("{}");
  });
});
await new Promise((r) => fakeMeta.listen(0, "127.0.0.1", r));
const metaUrl = `http://127.0.0.1:${fakeMeta.address().port}`;

async function startApp(port, env) {
  const child = spawn("node", [SERVER], {
    env: { ...process.env, PORT: String(port), HOST: "127.0.0.1", ...env },
    stdio: ["ignore", "ignore", "pipe"],
  });
  let logs = "";
  child.stderr.on("data", (c) => (logs += c));
  let up = false;
  for (let i = 0; i < 100 && !up; i++) {
    try {
      up = (await fetch(`http://127.0.0.1:${port}/`)).ok;
    } catch {
      await new Promise((r) => setTimeout(r, 200));
    }
  }
  check(`servidor :${port} subiu`, up, logs);
  return { base: `http://127.0.0.1:${port}`, logs: () => logs, stop: () => child.kill() };
}

const validLead = () => ({
  name: "Smoke Test",
  email: "smoke@example.com",
  phone: "(281) 555-0100",
  service: "Bathroom Remodeling",
  zip: "77494",
  event_id: crypto.randomUUID(),
  event_source_url: "https://myteamrenovation.com/",
});

const post = (app, body) =>
  fetch(`${app.base}/api/lead`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

function filesUnder(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? filesUnder(p) : [p];
  });
}

const trackingEnv = TRACKING
  ? { META_PIXEL_ID: "000000000000000", GA4_MEASUREMENT_ID: "G-SMOKETEST" }
  : {};
const app = await startApp(3101, {
  LEAD_WEBHOOK_URL: fakeUrl,
  META_CAPI_ACCESS_TOKEN: CAPI_TOKEN,
  META_CAPI_BASE_URL: metaUrl,
  ...trackingEnv,
});

try {
  // Honeypot → 200 sem hit no n8n.
  let before = hits.length;
  let res = await post(app, { ...validLead(), company: "Spam Inc" });
  check(
    "honeypot → 200 sem n8n",
    res.status === 200 && hits.length === before,
    `status ${res.status}`,
  );

  // ZIPs inválidos → 400 field zip.
  for (const zip of ["", "7749", "774940", "ABCDE"]) {
    res = await post(app, { ...validLead(), zip });
    const j = await res.json().catch(() => ({}));
    check(
      `zip ${JSON.stringify(zip)} → 400 zip`,
      res.status === 400 && j.field === "zip",
      `status ${res.status} field ${j.field}`,
    );
  }

  // JSON inválido → 400 body.
  res = await post(app, "{not json");
  const bad = await res.json().catch(() => ({}));
  check("JSON inválido → 400 body", res.status === 400 && bad.field === "body");

  // Lead válido → 200 com payload CT-06.
  before = hits.length;
  const lead = validLead();
  res = await post(app, lead);
  const sent = hits.length === before + 1 ? JSON.parse(hits.at(-1).body) : {};
  check(
    "lead válido → 200",
    res.status === 200 && (await res.json()).ok === true,
    `status ${res.status}`,
  );
  check(
    "payload CT-06",
    sent.full_name === lead.name &&
      sent.email === lead.email &&
      sent.service === lead.service &&
      sent.zip === lead.zip &&
      sent.event_id === lead.event_id &&
      /^\+1\d{10}$/.test(sent.phone ?? "") &&
      !Number.isNaN(Date.parse(sent.submitted_at)),
    JSON.stringify(sent),
  );

  // FAIL → 502.
  mode = "FAIL";
  res = await post(app, validLead());
  check("n8n 500 → 502", res.status === 502, `status ${res.status}`);

  // HANG → 504 em 9–12 s.
  mode = "HANG";
  const t0 = Date.now();
  res = await post(app, validLead());
  const secs = (Date.now() - t0) / 1000;
  check(
    "n8n sem resposta → 504 em 9–12 s",
    res.status === 504 && secs >= 9 && secs <= 12,
    `status ${res.status} em ${secs.toFixed(1)} s`,
  );
  mode = "OK";
  for (const s of fakeSockets) s.destroy();

  // Rotas.
  const thanks = await (await fetch(`${app.base}/thank-you`)).text();
  check(
    "/thank-you com noindex e sem form",
    /<meta[^>]*name="robots"[^>]*content="noindex"/.test(thanks) && !thanks.includes("<form"),
  );

  const home = await (await fetch(`${app.base}/`)).text();
  if (TRACKING) {
    for (const [name, html] of [
      ["/", home],
      ["/thank-you", thanks],
    ]) {
      check(
        `--tracking: Pixel e GA4 em ${name}`,
        html.includes("connect.facebook.net") &&
          html.includes("000000000000000") &&
          html.includes("googletagmanager.com/gtag/js?id=G-SMOKETEST") &&
          html.includes("G-SMOKETEST"),
      );
    }
  } else {
    check(
      "/ sem connect.facebook.net e sem G-",
      !home.includes("connect.facebook.net") && !/\bG-[A-Z0-9]{4,20}\b/.test(home),
    );
  }

  // Segredos fora do HTML, das respostas e do bundle público.
  const leaked = filesUnder(PUBLIC_DIR).filter((f) => {
    const t = readFileSync(f).toString("latin1");
    return LEAKABLE.some((x) => t.includes(x));
  });
  check(
    "URL do webhook e token CAPI fora de .output/public",
    leaked.length === 0,
    leaked.join(", "),
  );
  check(
    "segredos fora do HTML e dos logs",
    ![home, thanks, app.logs()].some((t) => t.includes(SECRET_PATH) || t.includes(CAPI_TOKEN)),
  );
} finally {
  app.stop();
}

// CAPI (T23): Pixel + token, com Meta falsa.
const sha = (v) => createHash("sha256").update(v).digest("hex");
const capi = await startApp(3103, {
  LEAD_WEBHOOK_URL: fakeUrl,
  META_PIXEL_ID: "000000000000000",
  META_CAPI_ACCESS_TOKEN: CAPI_TOKEN,
  META_CAPI_TEST_EVENT_CODE: "TEST_SMOKE",
  META_CAPI_BASE_URL: metaUrl,
});
try {
  // Honeypot e falha do n8n não chamam a CAPI.
  let before = metaHits.length;
  await post(capi, { ...validLead(), company: "Spam Inc" });
  mode = "FAIL";
  await post(capi, validLead());
  mode = "OK";
  check("honeypot e n8n 500 não chamam a CAPI", metaHits.length === before);

  // Lead válido: 1 chamada, e-mail e telefone só em SHA-256.
  const lead = {
    ...validLead(),
    email: "  Smoke.Capi@Example.COM ",
    fbp: "fb.1.1.2",
    fbc: "fb.1.1.3",
  };
  before = metaHits.length;
  let res = await post(capi, lead);
  const call = metaHits.length === before + 1 ? metaHits.at(-1) : null;
  const sentBody = call ? JSON.parse(call.body) : {};
  const ev = sentBody.data?.[0] ?? {};
  check("lead válido com CAPI → 200", res.status === 200, `status ${res.status}`);
  check(
    "CAPI: Lead com event_id, test_event_code e user_data hasheado",
    call?.url === "/v23.0/000000000000000/events" &&
      ev.event_name === "Lead" &&
      ev.event_id === lead.event_id &&
      ev.action_source === "website" &&
      ev.event_source_url === lead.event_source_url &&
      sentBody.test_event_code === "TEST_SMOKE" &&
      ev.user_data?.em?.[0] === sha("smoke.capi@example.com") &&
      ev.user_data?.ph?.[0] === sha("12815550100") &&
      ev.user_data?.fbp === "fb.1.1.2" &&
      ev.user_data?.fbc === "fb.1.1.3",
    call?.body,
  );
  check(
    "CAPI: sem e-mail ou telefone em claro",
    !!call && !/smoke\.capi@example/i.test(call.body) && !call.body.includes("5550100"),
  );

  // CAPI falhando (400): lead continua 200 e o log não vaza o token.
  metaMode = "FAIL";
  res = await post(capi, validLead());
  metaMode = "OK";
  check("CAPI 400 → lead ainda 200", res.status === 200, `status ${res.status}`);
  await new Promise((r) => setTimeout(r, 200));
  check(
    "CAPI 400 → log capi_failed sem token",
    capi.logs().includes("capi_failed") && !capi.logs().includes(CAPI_TOKEN),
  );
} finally {
  capi.stop();
}

// Pixel sem token: CAPI desativada.
const noToken = await startApp(3104, {
  LEAD_WEBHOOK_URL: fakeUrl,
  META_PIXEL_ID: "000000000000000",
  META_CAPI_BASE_URL: metaUrl,
});
try {
  const before = metaHits.length;
  const res = await post(noToken, validLead());
  check(
    "sem token → lead 200 e sem chamada à CAPI",
    res.status === 200 && metaHits.length === before,
    `status ${res.status}`,
  );
} finally {
  noToken.stop();
}

// Sem LEAD_WEBHOOK_URL → 503.
const bare = await startApp(3102, { LEAD_WEBHOOK_URL: "" });
try {
  const res = await post(bare, validLead());
  const j = await res.json().catch(() => ({}));
  check(
    "sem LEAD_WEBHOOK_URL → 503",
    res.status === 503 && j.error === "lead_destination_unavailable",
    `status ${res.status}`,
  );
} finally {
  bare.stop();
}

fake.close();
fakeMeta.close();
for (const s of fakeSockets) s.destroy();
console.log(failures ? `\n${failures} falha(s)` : "\nSmoke OK");
process.exit(failures ? 1 : 0);
