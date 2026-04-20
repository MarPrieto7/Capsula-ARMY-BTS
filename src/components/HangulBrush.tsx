/**
 * Animated hangul calligraphy in the background — a slow self-drawing
 * brush stroke spelling 보라해 ("borahae" / I purple you).
 * Pure SVG, no copyrighted assets.
 */
const HangulBrush = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 800 300"
    className={`pointer-events-none absolute inset-0 h-full w-full hangul-brush ${className}`}
    aria-hidden="true"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <linearGradient id="brushGrad" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="hsl(var(--lavender) / 0.0)" />
        <stop offset="50%" stopColor="hsl(var(--lavender) / 0.7)" />
        <stop offset="100%" stopColor="hsl(var(--gold-soft) / 0.0)" />
      </linearGradient>
    </defs>
    {/* Stylised abstract hangul-like brush strokes */}
    <path
      d="M120 140 q 40 -60 100 -20 t 80 30"
      fill="none" stroke="url(#brushGrad)" strokeWidth="2.5" strokeLinecap="round"
    />
    <path
      d="M340 170 q 60 -50 120 -10 t 90 20"
      fill="none" stroke="url(#brushGrad)" strokeWidth="2" strokeLinecap="round"
    />
    <path
      d="M560 130 q 50 -40 100 0 t 80 40"
      fill="none" stroke="url(#brushGrad)" strokeWidth="2.5" strokeLinecap="round"
    />
  </svg>
);

export default HangulBrush;
