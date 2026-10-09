import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "@tanstack/react-router";
import { Play } from "lucide-react";
import posterWebp from "@/assets/lp/vsl-poster.webp";
import posterJpg from "@/assets/lp/vsl-poster.jpg";
import { ResponsiveImage } from "@/components/landing/primitives";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const VIDEO_LABEL = "Video: Leonardo Brandão explains how My Team Renovation works";

// URL do MP4 vem do loader da raiz (VSL_VIDEO_URL); null desativa o recurso (RF-29).
export function useVslUrl() {
  return useLoaderData({ from: "__root__" }).vslVideoUrl;
}

// ponytail: sem <track>; adicionar quando existir um .vtt de legendas (UI-17).
function VslVideo({
  src,
  autoPlay,
  className,
}: {
  src: string;
  autoPlay?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    // Dentro do gesto de toque que abriu o modal; se o navegador recusar, os controles nativos valem.
    if (autoPlay) ref.current?.play().catch(() => {});
  }, [autoPlay]);
  return (
    <video
      ref={ref}
      src={src}
      poster={posterWebp}
      controls
      playsInline
      preload="none"
      aria-label={VIDEO_LABEL}
      className={cn(
        "block aspect-[9/16] bg-black object-contain focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
        className,
      )}
    />
  );
}

// Desktop (≥ 1024 px): irmão direto da <section> do hero; altura = viewport − header (7rem) − base (3,25rem).
// --vsl-h é definida na section e reaproveitada pelo espaçador do grid (VslSpacer).
export function VslCard({ src }: { src: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[calc(7rem+1px)] z-10 mx-auto hidden w-full max-w-[96rem] justify-end px-6 lg:flex">
      <VslVideo
        src={src}
        className="pointer-events-auto h-[var(--vsl-h)] w-auto ring-1 ring-gold/40 shadow-[var(--shadow-gold)]"
      />
    </div>
  );
}

// Reserva a largura do cartão na coluna direita do grid, para o texto nunca passar por baixo (UI-12).
export function VslSpacer() {
  return (
    <div className="hidden w-[calc(var(--vsl-h)*9/16)] lg:ml-10 lg:block" aria-hidden="true" />
  );
}

// Mobile/tablet (< 1024 px): miniatura 9:16 com tamanho reservado; o toque abre o player em modal.
export function VslMobileCard({ src }: { src: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fade-up mt-6 flex items-center gap-4 text-left focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:hidden"
      >
        <span className="relative block aspect-[9/16] w-14 shrink-0 overflow-hidden border border-gold/40">
          <ResponsiveImage
            webp={posterWebp}
            fallback={posterJpg}
            alt=""
            width={720}
            height={1280}
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-background/40">
            <Play className="h-5 w-5 fill-current text-gold" aria-hidden="true" />
          </span>
        </span>
        <span className="text-sm uppercase tracking-[0.12em] text-foreground">
          Watch: how we work
        </span>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[min(24rem,calc(100vw-2rem),calc((100svh-2rem)*9/16))] max-w-noneborder-gold/40 bg-black p-0 sm:rounded-none">
          <DialogTitle className="sr-only">{VIDEO_LABEL}</DialogTitle>
          <DialogDescription className="sr-only">Press play to watch the video.</DialogDescription>
          <VslVideo src={src} autoPlay className="w-full" />
        </DialogContent>
      </Dialog>
    </>
  );
}
