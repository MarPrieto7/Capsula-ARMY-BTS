import { forwardRef, useEffect, useState } from "react";
import QRCode from "qrcode";
import type { Capsule } from "@/data/capsule";
import { useI18n } from "@/hooks/useI18n";
import dancheong from "@/assets/dancheong.png";
import ArirangMark from "@/components/ArirangMark";
import { pickVariant, type CardVariant } from "@/data/cardVariants";

export type CardFormat = "square" | "story" | "post";

interface Props {
  capsule: Capsule;
  format?: CardFormat;
  variant?: CardVariant; // optional — falls back to seed by capsule.id
}

const FORMATS: Record<CardFormat, { ratio: string; maxW: string }> = {
  post:    { ratio: "aspect-[4/5]",  maxW: "max-w-[420px]" }, // 1080x1350 — IG / Threads
  square:  { ratio: "aspect-square", maxW: "max-w-[440px]" }, // 1080x1080 — IG square
  story:   { ratio: "aspect-[9/16]", maxW: "max-w-[300px]" }, // 1080x1920 — Stories
};

const CapsuleCard = forwardRef<HTMLDivElement, Props>(({ capsule, format = "post", variant }, ref) => {
  const { t } = useI18n();
  const moodLabel = t.moods[capsule.mood.id] ?? capsule.mood.label;
  const f = FORMATS[format];
  const isStory = format === "story";
  const v = variant ?? pickVariant(capsule.id);

  // Generate QR code data URL pointing back to the site
  const [qrUrl, setQrUrl] = useState<string>("");
  useEffect(() => {
    const url = typeof window !== "undefined" ? window.location.origin + "/" : "https://arirang-capsule.app/";
    QRCode.toDataURL(url, {
      margin: 0,
      width: 160,
      color: { dark: "#1a0d2e", light: "#f4ecd8" },
    }).then(setQrUrl).catch(() => setQrUrl(""));
  }, []);

  return (
    <div
      ref={ref}
      className={`relative mx-auto w-full ${f.maxW} ${f.ratio} overflow-hidden rounded-3xl ${v.surfaceClass} shadow-card`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Dancheong-inspired ornaments — Korean traditional pattern */}
      <img src={dancheong} alt="" aria-hidden="true"
        style={{ opacity: v.dancheongOpacity[0], transform: `rotate(${v.dancheongRotate}deg)` }}
        className="absolute -top-20 -right-20 w-72 select-none" />
      <img src={dancheong} alt="" aria-hidden="true"
        style={{ opacity: v.dancheongOpacity[1], transform: `rotate(${180 + v.dancheongRotate}deg)` }}
        className="absolute -bottom-24 -left-24 w-72 select-none" />

      {/* Hanji-style soft glow */}
      <div className={`absolute inset-x-0 top-0 h-1/2 ${v.glowClass}`} />
      {/* Subtle mountain ridge silhouette (Arirang aesthetic) */}
      <svg viewBox="0 0 400 80" className="absolute inset-x-0 bottom-0 w-full opacity-25" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 80 L60 40 L110 60 L160 25 L220 55 L280 30 L340 50 L400 20 L400 80 Z"
          fill={v.ridgeFill1} opacity="0.30" />
        <path d="M0 80 L80 55 L150 65 L220 45 L300 60 L400 40 L400 80 Z"
          fill={v.ridgeFill2} opacity="0.55" />
      </svg>

      <div className={`relative z-10 flex h-full flex-col text-foreground ${isStory ? "p-6" : "p-7"}`}>
        {/* Header — wordmark */}
        <div className="flex items-start justify-between">
          <ArirangMark />
        </div>

        {/* Mood */}
        <div className="mt-6 flex items-center gap-3">
          <span className={isStory ? "text-3xl" : "text-4xl"}>{capsule.mood.emoji}</span>
          <div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-foreground/50">{t.cardMood}</div>
            <div className={`font-serif leading-tight ${isStory ? "text-xl" : "text-2xl"}`}>{moodLabel}</div>
          </div>
        </div>

        {/* Inspired-by song line */}
        <blockquote className={`mt-5 font-serif leading-[1.3] text-foreground/95 ${isStory ? "text-lg" : "text-[22px]"}`}>
          <span className="text-gold-soft/80">“</span>
          {capsule.song.line}
          <span className="text-gold-soft/80">”</span>
        </blockquote>
        <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-gold-soft/80">
          {t.cardInspired} <span className="text-foreground/85">{capsule.song.song}</span>
          <span className="text-foreground/45"> · {t.cardFromAlbum} {capsule.song.album}</span>
        </div>

        {/* Personal whisper */}
        {capsule.message && (
          <div className="mt-4 border-l-2 border-gold-soft/40 pl-4">
            <div className="text-[9px] uppercase tracking-[0.3em] text-foreground/50 mb-1">
              {t.cardNote}
            </div>
            <p className={`italic leading-relaxed text-foreground/85 ${isStory ? "text-xs" : "text-sm"}`}>
              {capsule.message}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-5">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-soft/40 to-transparent" />
          <div className="mt-3 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[9px] uppercase tracking-[0.3em] text-foreground/50">{t.cardVibe}</div>
              <div className="font-serif text-sm text-foreground/90 truncate">{capsule.vibe}</div>
              <div className="mt-2 text-[9px] uppercase tracking-[0.3em] text-foreground/50">{t.cardSealed}</div>
              <div className="font-serif text-sm text-foreground/90">{capsule.date}</div>
            </div>

            {/* QR code */}
            {qrUrl && (
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="rounded-lg bg-[hsl(var(--gold-soft)/0.95)] p-1.5">
                  <img
                    src={qrUrl} alt="QR code"
                    className={isStory ? "h-12 w-12" : "h-14 w-14"}
                  />
                </div>
                <div className="text-[7px] uppercase tracking-[0.25em] text-foreground/55 text-center max-w-[80px] leading-tight">
                  {t.scanQR}
                </div>
              </div>
            )}
          </div>
          <p className="mt-4 text-center text-[9px] uppercase tracking-[0.35em] text-foreground/55">
            {t.cardMade}
          </p>
        </div>
      </div>
    </div>
  );
});

CapsuleCard.displayName = "CapsuleCard";
export default CapsuleCard;
