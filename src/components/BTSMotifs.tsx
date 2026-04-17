import { useMemo } from "react";

/**
 * Animated background with subtle BTS-inspired motifs:
 * - ARMY heart (the iconic interlocking hearts shape, simplified)
 * - Bangtan "7" symbol nods
 * - Purple bombs (light-stick orbs)
 * - Floating violet particles
 * Pure SVG/CSS — performant, no images, no copyrighted assets.
 */
const BTSMotifs = () => {
  const orbs = useMemo(() =>
    Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 80 + Math.random() * 200,
      dur: 18 + Math.random() * 22,
      delay: -Math.random() * 20,
      hue: 270 + Math.random() * 25,
    })),
  []);

  const hearts = useMemo(() =>
    Array.from({ length: 7 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 28 + Math.random() * 40,
      dur: 22 + Math.random() * 18,
      delay: -Math.random() * 25,
      rot: Math.random() * 40 - 20,
      opacity: 0.06 + Math.random() * 0.08,
    })),
  []);

  const sevens = useMemo(() =>
    Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      top: 10 + Math.random() * 80,
      left: 10 + Math.random() * 80,
      size: 80 + Math.random() * 60,
      dur: 30 + Math.random() * 20,
      delay: -Math.random() * 30,
      opacity: 0.04 + Math.random() * 0.05,
    })),
  []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
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
            background: `radial-gradient(circle, hsl(${o.hue} 90% 65% / 0.35), hsl(${o.hue} 80% 40% / 0) 70%)`,
            animationDuration: `${o.dur}s`,
            animationDelay: `${o.delay}s`,
          }}
        />
      ))}

      {/* ARMY hearts */}
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
            opacity: h.opacity,
            transform: `rotate(${h.rot}deg)`,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            color: "hsl(var(--lavender))",
          }}
        >
          {/* ARMY interlocking heart silhouette */}
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
            opacity: s.opacity,
            color: "hsl(var(--gold-soft))",
            textShadow: "0 0 30px hsl(var(--violet-glow) / 0.6)",
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
            lineHeight: 1,
          }}
        >
          7
        </div>
      ))}

      {/* Slow rotating gradient ring — bomb light pulse */}
      <div
        className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full opacity-30 motif-spin"
        style={{
          background: "conic-gradient(from 0deg, transparent, hsl(280 90% 65% / 0.4), transparent, hsl(45 80% 70% / 0.2), transparent)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute -left-40 bottom-1/4 h-[600px] w-[600px] rounded-full opacity-25 motif-spin-rev"
        style={{
          background: "conic-gradient(from 180deg, transparent, hsl(260 80% 55% / 0.5), transparent, hsl(290 90% 70% / 0.3), transparent)",
          filter: "blur(70px)",
        }}
      />

      {/* Subtle floating "💜" emoji-style hearts (small & sparse) */}
      {Array.from({ length: 5 }).map((_, i) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const dur = 25 + Math.random() * 15;
        const delay = -Math.random() * 30;
        const size = 14 + Math.random() * 12;
        return (
          <span
            key={`emoji-${i}`}
            className="absolute motif-rise select-none"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              fontSize: `${size}px`,
              opacity: 0.5,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              filter: "drop-shadow(0 0 8px hsl(280 90% 70% / 0.5))",
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
