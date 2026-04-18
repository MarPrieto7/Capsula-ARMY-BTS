/**
 * Original wordmark inspired by the Arirang aesthetic — NOT the official HYBE logo.
 * Combines a stylized half-moon, a single mountain ridge and the words
 * "ARIRANG · CAPSULE" in serif + hangul "아리랑" beneath.
 */
const ArirangMark = ({ className = "" }: { className?: string }) => (
  <div className={`inline-flex items-center gap-3 ${className}`}>
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <defs>
        <linearGradient id="amg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--gold-soft))" />
          <stop offset="100%" stopColor="hsl(var(--lavender))" />
        </linearGradient>
      </defs>
      {/* Moon */}
      <circle cx="24" cy="20" r="11" fill="none" stroke="url(#amg)" strokeWidth="1.2" />
      <path d="M18 16 a 9 9 0 0 0 12 12" fill="none" stroke="url(#amg)" strokeWidth="1.2" />
      {/* Mountain ridge */}
      <path d="M4 40 L 16 28 L 24 34 L 34 24 L 44 40 Z"
        fill="none" stroke="url(#amg)" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
    <div className="leading-tight">
      <div className="font-serif text-[13px] tracking-[0.45em] text-foreground/90">
        ARIRANG · CAPSULE
      </div>
      <div
        className="text-[10px] tracking-[0.35em] text-gold-soft/80"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        아리랑 · 보라해
      </div>
    </div>
  </div>
);

export default ArirangMark;
