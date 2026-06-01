/**
 * Osa Mayor / Big Dipper (북두칠성) — the 7-star asterism.
 * A poetic nod to the 7 members of Bangtan.
 * Pure SVG with animated line-drawing + twinkling stars + soft sweep glow.
 */
interface Props {
  className?: string;
  size?: number;
  showLabel?: boolean;
  label?: string;
}

// Realistic Big Dipper geometry (bowl + handle, Dubhe → Alkaid)
const STARS: { cx: number; cy: number; r: number; name: string }[] = [
  { cx: 70,  cy: 150, r: 4.2, name: "Dubhe" },
  { cx: 165, cy: 130, r: 3.6, name: "Merak" },
  { cx: 215, cy: 165, r: 3.4, name: "Phecda" },
  { cx: 270, cy: 140, r: 3.8, name: "Megrez" },
  { cx: 355, cy: 110, r: 4.6, name: "Alioth" },
  { cx: 440, cy: 80,  r: 3.8, name: "Mizar" },
  { cx: 515, cy: 55,  r: 5.0, name: "Alkaid" },
];

const Constellation = ({ className = "", size = 540, showLabel = false, label = "보 라 해" }: Props) => {
  const path = STARS.map((s, i) => `${i === 0 ? "M" : "L"}${s.cx} ${s.cy}`).join(" ");

  return (
    <div className={`relative inline-block max-w-full ${className}`} style={{ width: `min(${size}px, 100%)` }}>
      <svg viewBox="0 0 580 220" className="w-full h-auto overflow-visible" aria-label="Osa Mayor — Big Dipper">
        <defs>
          <linearGradient id="constLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(var(--violet-glow))" stopOpacity="0.2" />
            <stop offset="50%" stopColor="hsl(var(--gold-soft))" stopOpacity="0.95" />
            <stop offset="100%" stopColor="hsl(var(--lavender))" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="starHalo">
            <stop offset="0%"   stopColor="hsl(var(--gold-soft))" stopOpacity="1" />
            <stop offset="55%"  stopColor="hsl(var(--lavender))"  stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(var(--violet-glow))" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="sweep" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="hsl(var(--gold-soft))" stopOpacity="0" />
            <stop offset="50%"  stopColor="hsl(var(--gold-soft))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--gold-soft))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Faint background ghost line (always visible) */}
        <path d={path} fill="none" stroke="hsl(var(--lavender) / 0.18)" strokeWidth="1" strokeLinecap="round" />

        {/* Animated drawing line — repeats slowly */}
        <path
          d={path}
          fill="none"
          stroke="url(#constLine)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="900"
          strokeDashoffset="900"
          filter="url(#softGlow)"
        >
          <animate attributeName="stroke-dashoffset" from="900" to="0" dur="3.5s" begin="0.4s" fill="freeze" />
          <animate attributeName="opacity" values="1;0.55;1" dur="6s" begin="4s" repeatCount="indefinite" />
        </path>

        {/* Stars with halos + twinkle + spark */}
        {STARS.map((s, i) => (
          <g key={s.name}>
            {/* Outer halo — pulsing */}
            <circle cx={s.cx} cy={s.cy} r={s.r * 5.5} fill="url(#starHalo)" opacity="0">
              <animate attributeName="opacity"
                values="0;0.5;0.2;0.55;0.2"
                dur={`${5 + (i % 3)}s`}
                begin={`${0.6 + i * 0.35}s`}
                repeatCount="indefinite" />
            </circle>

            {/* Core star — twinkle */}
            <circle cx={s.cx} cy={s.cy} r={s.r} fill="hsl(var(--gold-soft))" filter="url(#softGlow)" opacity="0">
              <animate attributeName="opacity" values="0;1" dur="0.4s" begin={`${0.4 + i * 0.4}s`} fill="freeze" />
              <animate attributeName="r"
                values={`${s.r};${s.r * 1.35};${s.r}`}
                dur={`${3 + (i % 4)}s`} begin={`${1 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>

            {/* 4-point sparkle */}
            <g opacity="0">
              <animate attributeName="opacity" values="0;0.75;0.35;0.75"
                dur={`${4 + (i % 3)}s`} begin={`${1.2 + i * 0.4}s`} repeatCount="indefinite" />
              <path d={`M${s.cx - s.r * 4} ${s.cy} L${s.cx + s.r * 4} ${s.cy}
                        M${s.cx} ${s.cy - s.r * 4} L${s.cx} ${s.cy + s.r * 4}`}
                stroke="hsl(var(--gold-soft) / 0.85)" strokeWidth="0.6" strokeLinecap="round" />
            </g>
          </g>
        ))}

        {/* Slow shimmering sweep across the line */}
        <path
          d={path}
          fill="none"
          stroke="url(#sweep)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="120 780"
          opacity="0.7"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-900" dur="6s" begin="4s" repeatCount="indefinite" />
        </path>
      </svg>

      {showLabel && (
        <div
          className="text-center text-[10px] tracking-[0.5em] text-gold-soft/80 mt-2"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default Constellation;
