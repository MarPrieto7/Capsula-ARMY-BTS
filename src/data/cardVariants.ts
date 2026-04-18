// 3 visual variants for the capsule card. Selected randomly per generation.
// Pure data — colors are HSL semantic tokens (no raw colors in components).
export type CardVariant = {
  id: "moonlit" | "sunset" | "hanji";
  // tailwind classes for the surface gradient
  surfaceClass: string;
  // glow tint over the top
  glowClass: string;
  // ridge silhouette stroke colors (HSL token vars)
  ridgeFill1: string;
  ridgeFill2: string;
  // dancheong rotation (deg)
  dancheongRotate: number;
  dancheongOpacity: [number, number]; // [top-right, bottom-left]
};

export const CARD_VARIANTS: CardVariant[] = [
  {
    id: "moonlit",
    surfaceClass: "bg-capsule",
    glowClass: "bg-glow",
    ridgeFill1: "hsl(var(--gold-soft))",
    ridgeFill2: "hsl(var(--violet-deep))",
    dancheongRotate: 0,
    dancheongOpacity: [0.15, 0.10],
  },
  {
    id: "sunset",
    surfaceClass: "bg-gradient-to-br from-[hsl(var(--violet-deep))] via-[hsl(var(--violet-glow)/0.55)] to-[hsl(var(--gold-soft)/0.25)]",
    glowClass: "bg-gradient-to-b from-[hsl(var(--gold-soft)/0.18)] to-transparent",
    ridgeFill1: "hsl(var(--gold-soft))",
    ridgeFill2: "hsl(var(--violet-deep))",
    dancheongRotate: 25,
    dancheongOpacity: [0.18, 0.12],
  },
  {
    id: "hanji",
    surfaceClass: "bg-gradient-to-b from-[hsl(var(--background))] via-[hsl(var(--violet-deep)/0.55)] to-[hsl(var(--background))]",
    glowClass: "bg-gradient-to-b from-[hsl(var(--violet-glow)/0.20)] to-transparent",
    ridgeFill1: "hsl(var(--violet-glow))",
    ridgeFill2: "hsl(var(--gold-soft))",
    dancheongRotate: 45,
    dancheongOpacity: [0.10, 0.18],
  },
];

export function pickVariant(seed?: string): CardVariant {
  if (!seed) return CARD_VARIANTS[Math.floor(Math.random() * CARD_VARIANTS.length)];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return CARD_VARIANTS[h % CARD_VARIANTS.length];
}
