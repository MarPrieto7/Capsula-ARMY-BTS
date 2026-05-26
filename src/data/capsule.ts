// All curated content — original phrases inspired by the spirit of BTS songs.
// Song titles are referenced (nominative use, public information).
// NO copyrighted lyrics are reproduced — every "lyricInspired" line is an original
// composition written for this app, only evoking each song's mood.
export type Mood = {
  id: string;
  label: string;
  emoji: string;
  hue: number;
};

export const MOODS: Mood[] = [
  { id: "happy",       label: "Happy",       emoji: "😊", hue: 50 },
  { id: "sad",         label: "Sad",         emoji: "🌧",  hue: 220 },
  { id: "hopeful",     label: "Hopeful",     emoji: "✨", hue: 280 },
  { id: "nostalgic",   label: "Nostalgic",   emoji: "🌙", hue: 260 },
  { id: "lost",        label: "Lost",        emoji: "🌫",  hue: 240 },
  { id: "motivated",   label: "Motivated",   emoji: "🔥", hue: 20 },
  { id: "grateful",    label: "Grateful",    emoji: "🌸", hue: 320 },
  { id: "loved",       label: "Loved",       emoji: "💜", hue: 290 },
  { id: "anxious",     label: "Anxious",     emoji: "🌊", hue: 200 },
  { id: "peaceful",    label: "Peaceful",    emoji: "🕊", hue: 180 },
  { id: "dreamy",      label: "Dreamy",      emoji: "🌌", hue: 270 },
  { id: "brave",       label: "Brave",       emoji: "🦋", hue: 340 },
  { id: "excited",     label: "Excited",     emoji: "🎆", hue: 30 },
  { id: "melancholic", label: "Melancholic", emoji: "🥀", hue: 250 },
  { id: "inspired",    label: "Inspired",    emoji: "⭐", hue: 45 },
];

// Original phrases — written for this app, not lyrics.
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
  grateful: [
    "Thank you, quiet hands that held me when I forgot how.",
    "Even the smallest kindness today is enough to write home about.",
    "Gratitude is the softest kind of light — and it suits you.",
  ],
  loved: [
    "You are loved in seven different languages tonight.",
    "Some hearts find each other across oceans, eras, and songs.",
    "To be loved is to be remembered, even in your silences.",
  ],
  anxious: [
    "Breathe. The world can wait one more violet second.",
    "Your storm is not your home — it's only passing through.",
    "Soft hands, soft mind. The tide will return what it took.",
  ],
  peaceful: [
    "Stillness is its own kind of song.",
    "The moon doesn't rush, and neither must you.",
    "Tonight, let your bones rest. The stars are keeping watch.",
  ],
  dreamy: [
    "Tonight your thoughts wear silk and walk barefoot through the stars.",
    "Some dreams are letters from the future — read them gently.",
    "The moon left a little of its light inside you. Keep it.",
  ],
  brave: [
    "Even your trembling hands are doing something holy.",
    "Brave is just fear that decided to keep walking.",
    "You crossed your own ocean today — and you're still standing.",
  ],
  excited: [
    "Your heart is dancing, and the whole sky noticed.",
    "Something good is on the way — you can feel the violet humming.",
    "Today feels like a song you've never heard but already love.",
  ],
  melancholic: [
    "Some sadness is just love remembering itself out loud.",
    "The grey hours have their own quiet beauty — let them speak.",
    "You are not broken; you are tender, and that is a kind of strength.",
  ],
  inspired: [
    "There's a small spark in you that the world has been waiting for.",
    "Your ideas are stars learning how to shine in your colour.",
    "Create softly, create bravely — the universe is listening.",
  ],
};

// Song-inspired lines — ORIGINAL writing evoking the spirit of real BTS songs.
// Titles are factual references; the "line" text is newly written, not copied.
export type SongInspired = { line: string; song: string; album: string };

export const SONG_INSPIRED: Record<string, SongInspired[]> = {
  happy: [
    { line: "Even on the darkest highway, dynamite waits inside you.",     song: "Dynamite",        album: "BE (2020)" },
    { line: "The world keeps turning, and so does our small joy.",         song: "Permission to Dance", album: "Butter (2021)" },
    { line: "Boy with luv learns to love himself first — softly.",         song: "Boy With Luv",    album: "Map of the Soul: Persona (2019)" },
  ],
  sad: [
    { line: "Spring days come back, even when winter forgets us.",         song: "Spring Day",      album: "You Never Walk Alone (2017)" },
    { line: "The fake love we carried was teaching us what real love is.", song: "Fake Love",       album: "Love Yourself: Tear (2018)" },
    { line: "Our blood, sweat and tears wrote a softer song than we knew.",song: "Blood Sweat & Tears", album: "Wings (2016)" },
  ],
  hopeful: [
    { line: "Tomorrow is a quiet promise the night keeps for you.",        song: "Tomorrow",        album: "Skool Luv Affair (2014)" },
    { line: "Answer: love yourself — that's where the morning begins.",    song: "Answer: Love Myself", album: "Love Yourself: Answer (2018)" },
    { line: "The magic shop inside you is always open — just knock.",      song: "Magic Shop",      album: "Love Yourself: Tear (2018)" },
  ],
  nostalgic: [
    { line: "The moon still hums the lullabies we forgot we knew.",        song: "Moon",            album: "BE (2020)" },
    { line: "Euphoria is remembering the day we became ourselves.",        song: "Euphoria",        album: "Love Yourself: Answer (2018)" },
    { line: "Every spring day, the past sends us a paper plane.",          song: "Spring Day",      album: "You Never Walk Alone (2017)" },
  ],
  lost: [
    { line: "Lost between mirrors, you'll still find your own face waiting.",song: "Lost",          album: "Love Yourself: Her (2017)" },
    { line: "Black swans pass — your dance does not end with them.",       song: "Black Swan",      album: "Map of the Soul: 7 (2020)" },
    { line: "The sea inside you is wide enough to hold every doubt.",      song: "Sea",             album: "Love Yourself: Her (2017)" },
  ],
  motivated: [
    { line: "Not today — today we burn quietly toward the sun.",            song: "Not Today",       album: "You Never Walk Alone (2017)" },
    { line: "Mic drop softly: the work you did in silence speaks now.",    song: "Mic Drop",        album: "Love Yourself: Her (2017)" },
    { line: "Run, even when the road runs out — make a new one.",          song: "Run",             album: "The Most Beautiful Moment in Life Pt.2 (2015)" },
  ],
  grateful: [
    { line: "Two! Three! — and the whole world says thank you back.",      song: "2!3!",            album: "Wings (2016)" },
    { line: "Mikrokosmos: every small light is someone saying thank you.", song: "Mikrokosmos",     album: "Map of the Soul: Persona (2019)" },
    { line: "Pied Piper teaches us to be thankful for the songs that found us.", song: "Pied Piper", album: "Love Yourself: Her (2017)" },
  ],
  loved: [
    { line: "Serendipity — the universe was always going to bring us here.", song: "Serendipity",  album: "Love Yourself: Her (2017)" },
    { line: "I need u, and the violet stays even when the words don't.",   song: "I Need U",        album: "The Most Beautiful Moment in Life Pt.1 (2015)" },
    { line: "Boy with luv keeps choosing softness — and so do you.",       song: "Boy With Luv",    album: "Map of the Soul: Persona (2019)" },
  ],
  anxious: [
    { line: "The truth untold is safe with the moon for one more night.",  song: "The Truth Untold",album: "Love Yourself: Tear (2018)" },
    { line: "Fake love taught us how to listen to the real one inside.",   song: "Fake Love",       album: "Love Yourself: Tear (2018)" },
    { line: "Outro: Tear softly — and the morning will still come.",       song: "Outro: Tear",     album: "Love Yourself: Tear (2018)" },
  ],
  peaceful: [
    { line: "Life goes on, quietly, like rain on a violet rooftop.",       song: "Life Goes On",    album: "BE (2020)" },
    { line: "Stay tonight — the silence is wide enough for both of us.",   song: "Stay",            album: "BE (2020)" },
    { line: "The moon hums, and you are allowed to rest.",                  song: "Moon",            album: "BE (2020)" },
  ],
};

// Vibe titles (original ambient names — NOT BTS songs).
export const VIBES: Record<string, string[]> = {
  happy:     ["Sunrise in Seoul", "Lavender Skies", "Dance of Tiny Joys"],
  sad:       ["Rain on Han River", "Quiet Letters", "Soft Goodbyes"],
  hopeful:   ["First Light", "Constellations", "A Promise to Tomorrow"],
  nostalgic: ["Old Polaroids", "Moonlit Hallway", "Echoes of 2013"],
  lost:      ["Between Stars", "Unwritten Map", "Drifting Violet"],
  motivated: ["Rise Anthem", "Embers & Gold", "Run Toward It"],
  grateful:  ["Soft Bow", "Small Light, Big Heart", "Thank You Letter"],
  loved:     ["Violet Embrace", "Seven Stars, One Heart", "Borahae Lullaby"],
  anxious:   ["Held Breath", "Tide at 3am", "Soft Static"],
  peaceful:  ["Slow Snowfall", "Tea & Moonlight", "After the Rain"],
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
    song: pick(SONG_INSPIRED[mood.id]),
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
