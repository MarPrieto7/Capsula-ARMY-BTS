import { forwardRef } from "react";
import type { Capsule } from "@/data/capsule";
import { useI18n } from "@/hooks/useI18n";
import dancheong from "@/assets/dancheong.png";
import ArirangMark from "@/components/ArirangMark";

export type CardFormat = "square" | "story" | "post";

interface Props {
  capsule: Capsule;
  format?: CardFormat;
}

const FORMATS: Record<CardFormat, { ratio: string; maxW: string }> = {
  post:    { ratio: "aspect-[4/5]",  maxW: "max-w-[420px]" }, // 1080x1350 — IG / Threads
  square:  { ratio: "aspect-square", maxW: "max-w-[440px]" }, // 1080x1080 — IG square
  story:   { ratio: "aspect-[9/16]", maxW: "max-w-[300px]" }, // 1080x1920 — Stories
};

const CapsuleCard = forwardRef<HTMLDivElement, Props>(({ capsule, format = "post" }, ref) => {
  const { t } = useI18n();
  const moodLabel = t.moods[capsule.mood.id] ?? capsule.mood.label;
  const f = FORMATS[format];
  const isStory = format === "story";

  return (
    <div
      ref={ref}
      className={`relative mx-auto w-full ${f.maxW} ${f.ratio} overflow-hidden rounded-3xl bg-capsule shadow-card`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Dancheong-inspired ornaments — Korean traditional pattern */}
      <img src={dancheong} alt="" aria-hidden="true"
        className="absolute -top-20 -right-20 w-72 opacity-15 select-none" />
      <img src={dancheong} alt="" aria-hidden="true"
        className="absolute -bottom-24 -left-24 w-72 opacity-10 rotate-180 select-none" />

      {/* Hanji-style soft glow */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-glow" />
      {/* Subtle mountain ridge silhouette (Arirang aesthetic) */}
      <svg viewBox="0 0 400 80" className="absolute inset-x-0 bottom-0 w-full opacity-20" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 80 L60 40 L110 60 L160 25 L220 55 L280 30 L340 50 L400 20 L400 80 Z"
          fill="hsl(var(--gold-soft))" opacity="0.25" />
        <path d="M0 80 L80 55 L150 65 L220 45 L300 60 L400 40 L400 80 Z"
          fill="hsl(var(--violet-deep))" opacity="0.5" />
      </svg>

      <div className={`relative z-10 flex h-full flex-col text-foreground ${isStory ? "p-6" : "p-7"}`}>
        {/* Header — wordmark + ID */}
        <div className="flex items-start justify-between">
          <ArirangMark />
          <span className="text-[9px] uppercase tracking-[0.25em] text-foreground/50">
            #{capsule.id}
          </span>
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
          <div className="mt-3 flex items-end justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-foreground/50">{t.cardVibe}</div>
              <div className="font-serif text-sm text-foreground/90">{capsule.vibe}</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] uppercase tracking-[0.3em] text-foreground/50">{t.cardSealed}</div>
              <div className="font-serif text-sm text-foreground/90">{capsule.date}</div>
            </div>
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
