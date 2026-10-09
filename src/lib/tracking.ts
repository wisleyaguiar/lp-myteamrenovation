// Eventos do browser (CT-03). Sem Pixel/GA4 carregados, `fbq`/`gtag` não existem e tudo vira no-op.
// Cada evento sai no máximo uma vez por carregamento da página (Set de módulo).
type Fbq = (...args: unknown[]) => void;
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    gtag?: Gtag;
  }
}

export type VideoMilestone = 25 | 50 | 75 | 95;

const sent = new Set<string>();

function once(key: string, fn: () => void) {
  if (typeof window === "undefined" || sent.has(key)) return;
  sent.add(key);
  try {
    fn();
  } catch {
    // Tracking nunca pode quebrar a página.
  }
}

export function trackLead(eventId: string) {
  once(`lead:${eventId}`, () => {
    window.fbq?.("track", "Lead", {}, { eventID: eventId });
    window.gtag?.("event", "generate_lead");
  });
}

export function trackVideoPlay() {
  once("video-play", () => {
    window.fbq?.("trackCustom", "VideoPlay");
    window.gtag?.("event", "VideoPlay");
  });
}

export function trackVideoProgress(milestone: VideoMilestone) {
  once(`video-progress:${milestone}`, () => {
    window.fbq?.("trackCustom", "VideoProgress", { milestone });
    window.gtag?.("event", "VideoProgress", { milestone });
  });
}

// Snippets oficiais. Os IDs já chegam validados por regex no loader (public-config.ts).
export function pixelSnippet(pixelId: string) {
  return (
    "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?" +
    "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;" +
    "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;" +
    "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}" +
    "(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');" +
    `fbq('init',${JSON.stringify(pixelId)});fbq('track','PageView');`
  );
}

export function gtagSnippet(measurementId: string) {
  return (
    "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}" +
    `gtag('js',new Date());gtag('config',${JSON.stringify(measurementId)});`
  );
}
