// All curated content — no DB needed. Quotes are original (inspired by ARMY spirit), not copyrighted lyrics.
export type Mood = {
  id: string;
  label: string;
  emoji: string;
  hue: number; // for subtle accent variation
};

export const MOODS: Mood[] = [
  { id: "happy",     label: "Happy",     emoji: "😊", hue: 50 },
  { id: "sad",       label: "Sad",       emoji: "🌧",  hue: 220 },
  { id: "hopeful",   label: "Hopeful",   emoji: "✨", hue: 280 },
  { id: "nostalgic", label: "Nostalgic", emoji: "🌙", hue: 260 },
  { id: "lost",      label: "Lost",      emoji: "🌫",  hue: 240 },
  { id: "motivated", label: "Motivated", emoji: "🔥", hue: 20 },
];

// Original inspirational phrases — written for this app, not lyrics.
export const PHRASES: Record<string, string[]> = {
  happy: [
    "Your smile is the kind of light that makes the whole world bloom.",
    "Today, joy chose you — and you said yes.",
    "Some days feel like a song you never want to end.",
  ],
  sad: [
    "Even rain knows how to dance with the right music.",
    "The night holds you gently — you are not walking alone.",
    "Tears are just love with nowhere else to go.",
  ],
  hopeful: [
    "A small light is still a light — and yours is enough.",
    "Tomorrow is already on its way to meet you.",
    "Stars do not ask permission to shine. Neither should you.",
  ],
  nostalgic: [
    "Some memories are softer than the moon at 3am.",
    "The past doesn't fade — it just learns to whisper.",
    "Every old song is a door back to who you were.",
  ],
  lost: [
    "Even when the map disappears, the path remembers your steps.",
    "You are not lost — you are between two beautiful places.",
    "The fog will lift. It always does.",
  ],
  motivated: [
    "Burn slowly, but burn for what is yours.",
    "Your dream does not need permission. Only patience.",
    "Today is a beginning written in violet ink.",
  ],
};

// Suggested track *titles* only — generic, no copyrighted lyrics.
// User asked NOT to include actual songs, so we keep this as soft "vibes".
export const VIBES: Record<string, string[]> = {
  happy:     ["Sunrise in Seoul", "Lavender Skies", "Dance of Tiny Joys"],
  sad:       ["Rain on Han River", "Quiet Letters", "Soft Goodbyes"],
  hopeful:   ["First Light", "Constellations", "A Promise to Tomorrow"],
  nostalgic: ["Old Polaroids", "Moonlit Hallway", "Echoes of 2013"],
  lost:      ["Between Stars", "Unwritten Map", "Drifting Violet"],
  motivated: ["Rise Anthem", "Embers & Gold", "Run Toward It"],
};

export function pick<T>(arr: T[], seed?: number): T {
  const i = seed !== undefined
    ? Math.abs(seed) % arr.length
    : Math.floor(Math.random() * arr.length);
  return arr[i];
}

export function generateCapsule(moodId: string, message: string) {
  const mood = MOODS.find(m => m.id === moodId) ?? MOODS[0];
  return {
    mood,
    phrase: pick(PHRASES[mood.id]),
    vibe: pick(VIBES[mood.id]),
    message: message.trim(),
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    id: Math.random().toString(36).slice(2, 8).toUpperCase(),
  };
}

export type Capsule = ReturnType<typeof generateCapsule>;

// Basic input sanitization — strip HTML tags & limit length defensively.
export function sanitize(input: string, max = 150): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .slice(0, max);
}
