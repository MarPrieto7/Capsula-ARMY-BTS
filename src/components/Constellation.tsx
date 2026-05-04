/**
 * Large 7-star constellation — a visual nod to the 7 members of Bangtan.
 * Pure SVG. Stars twinkle softly; connecting lines are drawn slowly.
 */
interface Props {
  className?: string;
  size?: number;
  showLabel?: boolean;
  label?: string;
}

const STARS: [number, number, number][] = [
  // [cx, cy, r]
  [60, 90, 3.2],
  [130, 50, 4.0],
  [210, 80, 3.0],
  [290, 40, 4.6],
  [360, 90, 3.4],
  [430, 60, 3.0],
  [490, 130, 3.8],
];

const Constellation = ({ className = "", size = 540, showLabel = false, label = "보 라 해" }: Props) => {
  const path = STARS.map((s, i) => `${i === 0 ? "M" : "L"}${s[0]} ${s[1]}`).join(" ");
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size }}>
      <svg viewBox="0 0 560 200" className="w-full h-auto" aria-hidden="true">
        <defs>
          <linearGradient id="constLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(var(--lavender) / 0)" />
            <stop offset="50%" stopColor="hsl(var(--lavender) / 0.7)" />
            <stop offset="100%" stopColor="hsl(var(--gold-soft) / 0)" />
          </linearGradient>
          <radialGradient id="starGlow">
            <stop offset="0%" stopColor="hsl(var(--gold-soft))" stopOpacity="1" />
            <stop offset="60%" stopColor="hsl(var(--lavender))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--violet-glow))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connecting line */}
        <path
          d={path}
          fill="none"
          stroke="url(#constLine)"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="constellation-line"
        />

        {/* Stars with halos */}
        {STARS.map(([cx, cy, r], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r * 5} fill="url(#starGlow)" opacity="0.35">
              <animate attributeName="opacity" values="0.15;0.5;0.15"
                dur={`${4 + (i % 3)}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={cx} cy={cy} r={r} fill="hsl(var(--gold-soft))">
              <animate attributeName="opacity" values="0.6;1;0.6"
                dur={`${3 + (i % 3)}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
            {/* Subtle 4-point sparkle */}
            <path
              d={`M${cx - r * 3} ${cy} L${cx + r * 3} ${cy} M${cx} ${cy - r * 3} L${cx} ${cy + r * 3}`}
              stroke="hsl(var(--gold-soft) / 0.5)"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>
      {showLabel && (
        <div
          className="text-center text-[10px] tracking-[0.5em] text-gold-soft/80 hangul-stroke mt-2"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default Constellation;
