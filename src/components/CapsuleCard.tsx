import { forwardRef } from "react";
import type { Capsule } from "@/data/capsule";
import dancheong from "@/assets/dancheong.png";

interface Props { capsule: Capsule }

const CapsuleCard = forwardRef<HTMLDivElement, Props>(({ capsule }, ref) => {
  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[420px] aspect-[4/5] overflow-hidden rounded-3xl bg-capsule shadow-card"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Dancheong watermark */}
      <img
        src={dancheong}
        alt=""
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-72 opacity-15 select-none"
      />
      <img
        src={dancheong}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-24 -left-24 w-72 opacity-10 rotate-180 select-none"
      />

      {/* Glow */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-glow" />

      <div className="relative z-10 flex h-full flex-col p-8 text-foreground">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-soft/90">
            ARMY · Time Capsule
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">
            #{capsule.id}
          </span>
        </div>

        {/* Mood */}
        <div className="mt-8 flex items-center gap-3">
          <span className="text-4xl leading-none">{capsule.mood.emoji}</span>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">Mood</div>
            <div className="font-serif text-2xl leading-tight">{capsule.mood.label}</div>
          </div>
        </div>

        {/* Phrase */}
        <blockquote className="mt-8 font-serif text-[26px] leading-[1.25] text-foreground/95">
          <span className="text-gold-soft/80">“</span>
          {capsule.phrase}
          <span className="text-gold-soft/80">”</span>
        </blockquote>

        {/* User message */}
        {capsule.message && (
          <div className="mt-6 border-l-2 border-gold-soft/40 pl-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 mb-1">
              A note to myself
            </div>
            <p className="text-sm italic leading-relaxed text-foreground/85">
              {capsule.message}
            </p>
          </div>
        )}

        <div className="mt-auto pt-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-soft/40 to-transparent" />
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">Vibe</div>
              <div className="font-serif text-base text-foreground/90">{capsule.vibe}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">Sealed</div>
              <div className="font-serif text-base text-foreground/90">{capsule.date}</div>
            </div>
          </div>
          <p className="mt-5 text-center text-[10px] uppercase tracking-[0.35em] text-foreground/55">
            Made with Purple Capsule 💜
          </p>
        </div>
      </div>
    </div>
  );
});

CapsuleCard.displayName = "CapsuleCard";
export default CapsuleCard;
