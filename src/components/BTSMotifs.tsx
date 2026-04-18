import { useMemo } from "react";

/**
 * Animated background with subtle BTS-inspired Korean motifs:
 * - ARMY hearts (interlocking shape)
 * - Bangtan "7" symbol nods
 * - Purple bombs (light-stick orbs)
 * - Floating violet particles
 * Pure SVG/CSS — no copyrighted assets.
 *
 * `calm` prop: when true (e.g. while user is typing), the background slows
 * down and reduces opacity so it doesn't distract.
 */
const BTSMotifs = ({ calm = false }: { calm?: boolean }) => {
  // Slower speeds & lower opacity overall — gentler base feel.
  const orbs = useMemo(() =>
    Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 100 + Math.random() * 220,
      dur: 40 + Math.random() * 30,
      delay: -Math.random() * 30,
      hue: 270 + Math.random() * 25,
    })),
  []);

  const hearts = useMemo(() =>
    Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 24 + Math.random() * 36,
      dur: 50 + Math.random() * 30,   // much slower drift
      delay: -Math.random() * 40,
      rot: Math.random() * 30 - 15,
      opacity: 0.04 + Math.random() * 0.05,
    })),
  []);

  const sevens = useMemo(() =>
    Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      top: 10 + Math.random() * 80,
      left: 10 + Math.random() * 80,
      size: 80 + Math.random() * 60,
      dur: 60 + Math.random() * 30,
      delay: -Math.random() * 40,
      opacity: 0.03 + Math.random() * 0.04,
    })),
  []);

  const calmStyle = calm
    ? { animationPlayState: "paused" as const, transition: "opacity 1s ease" }
    : undefined;
  const calmOpacityFactor = calm ? 0.4 : 1;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ opacity: calm ? 0.55 : 1, transition: "opacity 1.2s ease" }}
    >
      {/* Drifting purple orbs (army bomb glow) */}
      {orbs.map(o => (
        <div
          key={`orb-${o.id}`}
          className="absolute rounded-full blur-3xl motif-drift"
          style={{
            top: `${o.top}%`,
            left: `${o.left}%`,
            width: `${o.size}px`,
            height: `${o.size}px`,
            background: `radial-gradient(circle, hsl(${o.hue} 90% 65% / 0.28), hsl(${o.hue} 80% 40% / 0) 70%)`,
            animationDuration: `${o.dur}s`,
            animationDelay: `${o.delay}s`,
            ...calmStyle,
          }}
        />
      ))}

      {/* ARMY hearts — slow & subtle */}
      {hearts.map(h => (
        <svg
          key={`heart-${h.id}`}
          viewBox="0 0 64 64"
          className="absolute motif-float"
          style={{
            top: `${h.top}%`,
            left: `${h.left}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            opacity: h.opacity * calmOpacityFactor,
            transform: `rotate(${h.rot}deg)`,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            color: "hsl(var(--lavender))",
            ...calmStyle,
          }}
        >
          <path
            fill="currentColor"
            d="M32 56 C 14 44, 4 32, 4 20 A 12 12 0 0 1 28 14 C 28 6, 36 6, 36 14 A 12 12 0 0 1 60 20 C 60 32, 50 44, 32 56 Z"
          />
          <path
            fill="hsl(var(--gold-soft))"
            opacity="0.4"
            d="M32 22 L 28 14 L 36 14 Z"
          />
        </svg>
      ))}

      {/* Stylized "7" — nod to Bangtan's 7 members */}
      {sevens.map(s => (
        <div
          key={`seven-${s.id}`}
          className="absolute motif-pulse font-serif italic select-none"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            fontSize: `${s.size}px`,
            opacity: s.opacity * calmOpacityFactor,
            color: "hsl(var(--gold-soft))",
            textShadow: "0 0 30px hsl(var(--violet-glow) / 0.6)",
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
            lineHeight: 1,
            ...calmStyle,
          }}
        >
          7
        </div>
      ))}

      {/* Slow rotating gradient ring — bomb light pulse */}
      <div
        className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full opacity-25 motif-spin"
        style={{
          background: "conic-gradient(from 0deg, transparent, hsl(280 90% 65% / 0.35), transparent, hsl(45 80% 70% / 0.18), transparent)",
          filter: "blur(60px)",
          ...calmStyle,
        }}
      />
      <div
        className="absolute -left-40 bottom-1/4 h-[600px] w-[600px] rounded-full opacity-20 motif-spin-rev"
        style={{
          background: "conic-gradient(from 180deg, transparent, hsl(260 80% 55% / 0.4), transparent, hsl(290 90% 70% / 0.25), transparent)",
          filter: "blur(70px)",
          ...calmStyle,
        }}
      />

      {/* Sparse rising 💜 — slower, fewer */}
      {Array.from({ length: 3 }).map((_, i) => {
        const top = 60 + Math.random() * 40;
        const left = Math.random() * 100;
        const dur = 50 + Math.random() * 25;
        const delay = -Math.random() * 50;
        const size = 12 + Math.random() * 10;
        return (
          <span
            key={`emoji-${i}`}
            className="absolute motif-rise select-none"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              fontSize: `${size}px`,
              opacity: 0.35 * calmOpacityFactor,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              filter: "drop-shadow(0 0 8px hsl(280 90% 70% / 0.5))",
              ...calmStyle,
            }}
          >
            💜
          </span>
        );
      })}
    </div>
  );
};

export default BTSMotifs;
