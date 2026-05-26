// 3 visual variants for the capsule card. Selected randomly per generation.
// Pure data — colors are HSL semantic tokens (no raw colors in components).
export type CardVariant = {
  id: "moonlit" | "sunset" | "hanji" | "hanbok-silk" | "hanbok-norigae" | "silhouettes-7";
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
  // optional background image (rendered behind content with overlay)
  bgImage?: string;
  bgOverlayClass?: string;
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
  {
    id: "hanbok-silk",
    surfaceClass: "bg-gradient-to-tr from-[hsl(285_60%_25%)] via-[hsl(270_55%_35%)] to-[hsl(45_55%_55%/0.4)]",
    glowClass: "bg-gradient-to-b from-[hsl(45_70%_75%/0.18)] via-transparent to-[hsl(285_70%_45%/0.25)]",
    ridgeFill1: "hsl(45 70% 75%)",
    ridgeFill2: "hsl(285 60% 35%)",
    dancheongRotate: 12,
    dancheongOpacity: [0.22, 0.16],
  },
  {
    id: "hanbok-norigae",
    surfaceClass: "bg-gradient-to-bl from-[hsl(260_60%_22%)] via-[hsl(295_50%_30%)] to-[hsl(335_45%_30%)]",
    glowClass: "bg-gradient-to-b from-[hsl(335_60%_70%/0.18)] to-transparent",
    ridgeFill1: "hsl(45 70% 80%)",
    ridgeFill2: "hsl(335 50% 35%)",
    dancheongRotate: -20,
    dancheongOpacity: [0.20, 0.14],
  },
  {
    id: "silhouettes-7",
    surfaceClass: "bg-[hsl(260_55%_12%)]",
    glowClass: "bg-gradient-to-b from-[hsl(var(--gold-soft)/0.15)] to-transparent",
    ridgeFill1: "hsl(var(--gold-soft))",
    ridgeFill2: "hsl(var(--violet-deep))",
    dancheongRotate: 8,
    dancheongOpacity: [0.10, 0.08],
    bgImage: "/src/assets/card-silhouettes-7.jpg",
    bgOverlayClass: "bg-gradient-to-b from-[hsl(260_60%_10%/0.55)] via-[hsl(260_60%_10%/0.75)] to-[hsl(260_60%_8%/0.92)]",
  },
];

export function pickVariant(seed?: string): CardVariant {
  if (!seed) return CARD_VARIANTS[Math.floor(Math.random() * CARD_VARIANTS.length)];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return CARD_VARIANTS[h % CARD_VARIANTS.length];
}
