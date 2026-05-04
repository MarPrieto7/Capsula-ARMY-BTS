/**
 * Original "ARMY CAPSULE" wordmark — NOT an official HYBE/BTS logo.
 * A delicate purple half-moon with a 7-star constellation (nod to the 7 members),
 * paired with elegant serif typography and animated hangul "보라해" beneath.
 */
const ArirangMark = ({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) => {
  const isLg = size === "lg";
  return (
  <div className={`inline-flex items-center gap-3 ${className}`}>
    <svg viewBox="0 0 56 56" className={isLg ? "h-14 w-14" : "h-9 w-9"} aria-hidden="true">
      <defs>
        <linearGradient id="amg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--lavender))" />
          <stop offset="100%" stopColor="hsl(var(--gold-soft))" />
        </linearGradient>
      </defs>
      {/* Half moon (crescent) */}
      <path
        d="M34 16 a 12 12 0 1 0 0 24 a 9 9 0 0 1 0 -24 z"
        fill="url(#amg)" opacity="0.85"
      />
      {/* 7-star constellation arc */}
      {[
        [10, 10], [18, 8], [26, 12], [34, 6],
        [42, 14], [48, 22], [44, 32],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r="1.1"
          fill="hsl(var(--gold-soft))"
          opacity="0.9"
        >
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur={`${3 + (i % 3)}s`}
            begin={`${i * 0.4}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      {/* Connecting constellation lines */}
      <path
        d="M10 10 L18 8 L26 12 L34 6 L42 14 L48 22 L44 32"
        stroke="hsl(var(--lavender) / 0.4)"
        strokeWidth="0.4"
        fill="none"
      />
    </svg>
    <div className="leading-tight">
      <div className={`font-serif tracking-[0.4em] text-foreground/95 ${isLg ? "text-[22px]" : "text-[14px]"}`}>
        ARMY <span className="text-gradient">CAPSULE</span>
      </div>
      <div
        className={`tracking-[0.4em] text-gold-soft/80 hangul-stroke ${isLg ? "text-[13px]" : "text-[10px]"}`}
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        보 라 해
      </div>
    </div>
  </div>
  );
};

export default ArirangMark;
