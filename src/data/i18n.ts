export type Lang = "en" | "es" | "es-419" | "ko" | "fr" | "de";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en",     label: "English",         flag: "🇬🇧" },
  { code: "es",     label: "Español",         flag: "🇪🇸" },
  { code: "es-419", label: "Español (LatAm)", flag: "🌎" },
  { code: "ko",     label: "한국어",            flag: "🇰🇷" },
  { code: "fr",     label: "Français",        flag: "🇫🇷" },
  { code: "de",     label: "Deutsch",         flag: "🇩🇪" },
];

export type Dict = {
  brand: string;
  tagline: string;
  heroEyebrow: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSub: string;
  start: string;
  underBtn: string;
  steps: string;
  capsules: string;
  noData: string;
  heroQuote1: string;
  heroQuote2: string;
  composeStep: string;
  composeTitle: string;
  composeSub: string;
  whisperLabel: string;
  whisperOptional: string;
  whisperPlaceholder: string;
  staysOnDevice: string;
  seal: string;
  resultEyebrow: string;
  resultTitle1: string;
  resultTitle2: string;
  resultSub: string;
  download: string;
  share: string;
  regenerate: string;
  another: string;
  footer: string;
  cardArmy: string;
  cardMood: string;
  cardNote: string;
  cardVibe: string;
  cardSealed: string;
  cardMade: string;
  toastSaved: string;
  toastError: string;
  toastShareFallback: string;
  shareTitle: string;
  shareText: string;
  moods: Record<string, string>;
};

export const DICT: Record<Lang, Dict> = {
  en: {
    brand: "Purple", tagline: "A Purple Memory Experience",
    heroEyebrow: "A Purple Memory Experience",
    heroTitle1: "Create your", heroTitle2: "BTS memory capsule",
    heroSub: "A quiet refuge for ARMY. Choose a feeling, write a whisper to your future self, and seal it inside a purple keepsake — yours to keep, yours to share.",
    start: "Start", underBtn: "Less than 60 seconds · No login",
    steps: "simple steps", capsules: "capsules", noData: "data stored",
    heroQuote1: "Beyond the mountains, more mountains —", heroQuote2: "and beyond them, you.",
    composeStep: "Step 1 of 2",
    composeTitle: "How are you feeling, today?",
    composeSub: "Pick one. There are no wrong answers.",
    whisperLabel: "A whisper to your future self", whisperOptional: "(optional)",
    whisperPlaceholder: "Write softly. 150 characters.",
    staysOnDevice: "Stays on your device only", seal: "Seal my capsule",
    resultEyebrow: "Your capsule is sealed",
    resultTitle1: "A small piece of you,", resultTitle2: "kept in violet light.",
    resultSub: "Save it as a memory. Share it as a whisper. The capsule lives only here, only now — nothing is uploaded anywhere.",
    download: "Download", share: "Share", regenerate: "Regenerate",
    another: "← Create another capsule",
    footer: "Made with 💜 for ARMY worldwide · No accounts, no tracking, no data stored.",
    cardArmy: "ARMY · Time Capsule", cardMood: "Mood",
    cardNote: "A note to myself", cardVibe: "Vibe", cardSealed: "Sealed",
    cardMade: "Made with Purple Capsule 💜",
    toastSaved: "Capsule saved 💜", toastError: "Couldn't save the capsule. Try again?",
    toastShareFallback: "Sharing not supported here — downloaded instead 💜",
    shareTitle: "My Purple Capsule 💜", shareText: "I made my ARMY time capsule. Make yours too 💜",
    moods: { happy:"Happy", sad:"Sad", hopeful:"Hopeful", nostalgic:"Nostalgic", lost:"Lost", motivated:"Motivated" },
  },
  es: {
    brand: "Purple", tagline: "Una experiencia de memoria púrpura",
    heroEyebrow: "Una experiencia de memoria púrpura",
    heroTitle1: "Crea tu", heroTitle2: "cápsula del tiempo BTS",
    heroSub: "Un refugio silencioso para ARMY. Elige una emoción, escribe un susurro a tu yo del futuro y séllalo en un recuerdo púrpura — tuyo para guardar, tuyo para compartir.",
    start: "Empezar", underBtn: "Menos de 60 segundos · Sin registro",
    steps: "pasos simples", capsules: "cápsulas", noData: "datos guardados",
    heroQuote1: "Más allá de las montañas, más montañas —", heroQuote2: "y más allá de ellas, tú.",
    composeStep: "Paso 1 de 2",
    composeTitle: "¿Cómo te sientes hoy?",
    composeSub: "Elige una. No hay respuestas equivocadas.",
    whisperLabel: "Un susurro a tu yo del futuro", whisperOptional: "(opcional)",
    whisperPlaceholder: "Escribe con suavidad. 150 caracteres.",
    staysOnDevice: "Solo se queda en tu dispositivo", seal: "Sellar mi cápsula",
    resultEyebrow: "Tu cápsula está sellada",
    resultTitle1: "Un pequeño trozo de ti,", resultTitle2: "guardado en luz violeta.",
    resultSub: "Guárdala como recuerdo. Compártela como un susurro. La cápsula vive solo aquí, solo ahora — nada se sube a ningún sitio.",
    download: "Descargar", share: "Compartir", regenerate: "Regenerar",
    another: "← Crear otra cápsula",
    footer: "Hecho con 💜 para ARMY de todo el mundo · Sin cuentas, sin rastreo, sin datos guardados.",
    cardArmy: "ARMY · Cápsula del Tiempo", cardMood: "Emoción",
    cardNote: "Una nota para mí", cardVibe: "Vibra", cardSealed: "Sellado",
    cardMade: "Hecho con Purple Capsule 💜",
    toastSaved: "Cápsula guardada 💜", toastError: "No se pudo guardar. ¿Intentamos de nuevo?",
    toastShareFallback: "No se puede compartir aquí — descargada 💜",
    shareTitle: "Mi Purple Capsule 💜", shareText: "Hice mi cápsula del tiempo ARMY. Haz la tuya 💜",
    moods: { happy:"Feliz", sad:"Triste", hopeful:"Esperanzada", nostalgic:"Nostálgica", lost:"Perdida", motivated:"Motivada" },
  },
  "es-419": {
    brand: "Purple", tagline: "Una experiencia de memoria púrpura",
    heroEyebrow: "Una experiencia de memoria púrpura",
    heroTitle1: "Creá tu", heroTitle2: "cápsula del tiempo BTS",
    heroSub: "Un refugio tranquilo para ARMY. Elegí una emoción, escribí un susurro a vos del futuro y guardalo en un recuerdo púrpura — para vos, para compartir.",
    start: "Comenzar", underBtn: "Menos de 60 segundos · Sin registro",
    steps: "pasos simples", capsules: "cápsulas", noData: "datos guardados",
    heroQuote1: "Más allá de las montañas, más montañas —", heroQuote2: "y más allá, vos.",
    composeStep: "Paso 1 de 2",
    composeTitle: "¿Cómo te sentís hoy?",
    composeSub: "Elegí una. No hay respuestas equivocadas.",
    whisperLabel: "Un susurro a vos del futuro", whisperOptional: "(opcional)",
    whisperPlaceholder: "Escribí suavecito. 150 caracteres.",
    staysOnDevice: "Solo queda en tu dispositivo", seal: "Sellar mi cápsula",
    resultEyebrow: "Tu cápsula está sellada",
    resultTitle1: "Un pedacito de vos,", resultTitle2: "guardado en luz violeta.",
    resultSub: "Guardala como recuerdo. Compartila como un susurro. La cápsula vive solo acá, solo ahora — nada se sube a ningún lado.",
    download: "Descargar", share: "Compartir", regenerate: "Regenerar",
    another: "← Crear otra cápsula",
    footer: "Hecho con 💜 para ARMY del mundo · Sin cuentas, sin rastreo, sin datos guardados.",
    cardArmy: "ARMY · Cápsula del Tiempo", cardMood: "Emoción",
    cardNote: "Una nota para mí", cardVibe: "Vibra", cardSealed: "Sellado",
    cardMade: "Hecho con Purple Capsule 💜",
    toastSaved: "Cápsula guardada 💜", toastError: "No se pudo guardar. ¿Probamos otra vez?",
    toastShareFallback: "No se puede compartir acá — descargada 💜",
    shareTitle: "Mi Purple Capsule 💜", shareText: "Hice mi cápsula del tiempo ARMY. Hacé la tuya 💜",
    moods: { happy:"Feliz", sad:"Triste", hopeful:"Esperanzada", nostalgic:"Nostálgica", lost:"Perdida", motivada:"Motivada", motivated:"Motivada" } as any,
  },
  ko: {
    brand: "퍼플", tagline: "보라빛 기억의 경험",
    heroEyebrow: "보라빛 기억의 경험",
    heroTitle1: "당신의", heroTitle2: "BTS 추억 캡슐 만들기",
    heroSub: "아미를 위한 조용한 안식처. 감정을 고르고, 미래의 자신에게 속삭임을 적어, 보라색 캡슐에 봉인하세요 — 간직할 수도, 나눌 수도 있어요.",
    start: "시작하기", underBtn: "60초 미만 · 로그인 없음",
    steps: "단계", capsules: "캡슐", noData: "저장된 데이터",
    heroQuote1: "산 너머에 또 산이 있고 —", heroQuote2: "그 너머에 당신이 있어요.",
    composeStep: "1 / 2 단계",
    composeTitle: "오늘 기분이 어떤가요?",
    composeSub: "하나만 골라요. 틀린 답은 없어요.",
    whisperLabel: "미래의 나에게 보내는 속삭임", whisperOptional: "(선택)",
    whisperPlaceholder: "조용히 적어보세요. 150자.",
    staysOnDevice: "당신의 기기에만 남습니다", seal: "캡슐 봉인하기",
    resultEyebrow: "캡슐이 봉인되었어요",
    resultTitle1: "당신의 작은 조각이,", resultTitle2: "보랏빛 안에 담겼어요.",
    resultSub: "추억으로 저장하세요. 속삭임처럼 나누세요. 이 캡슐은 지금 여기에만 존재해요 — 어디에도 업로드되지 않아요.",
    download: "다운로드", share: "공유", regenerate: "다시 만들기",
    another: "← 다른 캡슐 만들기",
    footer: "전 세계 아미를 위해 💜 · 계정 없음, 추적 없음, 저장 없음.",
    cardArmy: "ARMY · 타임 캡슐", cardMood: "기분",
    cardNote: "나에게 쓰는 메모", cardVibe: "분위기", cardSealed: "봉인일",
    cardMade: "Purple Capsule로 만들었어요 💜",
    toastSaved: "캡슐이 저장되었어요 💜", toastError: "저장에 실패했어요. 다시 시도할까요?",
    toastShareFallback: "공유를 지원하지 않아 다운로드했어요 💜",
    shareTitle: "나의 Purple Capsule 💜", shareText: "ARMY 타임 캡슐을 만들었어요. 당신도 만들어봐요 💜",
    moods: { happy:"행복", sad:"슬픔", hopeful:"희망", nostalgic:"그리움", lost:"길잃음", motivated:"열정" },
  },
  fr: {
    brand: "Purple", tagline: "Une expérience de mémoire violette",
    heroEyebrow: "Une expérience de mémoire violette",
    heroTitle1: "Crée ta", heroTitle2: "capsule souvenir BTS",
    heroSub: "Un refuge silencieux pour ARMY. Choisis une émotion, écris un murmure à ton toi futur, et scelle-le dans un souvenir violet — à garder, à partager.",
    start: "Commencer", underBtn: "Moins de 60 secondes · Sans compte",
    steps: "étapes simples", capsules: "capsules", noData: "données stockées",
    heroQuote1: "Au-delà des montagnes, d'autres montagnes —", heroQuote2: "et au-delà, toi.",
    composeStep: "Étape 1 sur 2",
    composeTitle: "Comment te sens-tu, aujourd'hui ?",
    composeSub: "Choisis-en une. Il n'y a pas de mauvaise réponse.",
    whisperLabel: "Un murmure à ton toi futur", whisperOptional: "(facultatif)",
    whisperPlaceholder: "Écris tout doucement. 150 caractères.",
    staysOnDevice: "Reste seulement sur ton appareil", seal: "Sceller ma capsule",
    resultEyebrow: "Ta capsule est scellée",
    resultTitle1: "Un petit morceau de toi,", resultTitle2: "gardé dans la lumière violette.",
    resultSub: "Garde-la en souvenir. Partage-la comme un murmure. La capsule vit seulement ici, seulement maintenant — rien n'est envoyé nulle part.",
    download: "Télécharger", share: "Partager", regenerate: "Régénérer",
    another: "← Créer une autre capsule",
    footer: "Fait avec 💜 pour ARMY dans le monde · Sans compte, sans suivi, sans données.",
    cardArmy: "ARMY · Capsule Temporelle", cardMood: "Émotion",
    cardNote: "Une note pour moi", cardVibe: "Ambiance", cardSealed: "Scellé",
    cardMade: "Fait avec Purple Capsule 💜",
    toastSaved: "Capsule sauvegardée 💜", toastError: "Impossible de sauvegarder. On réessaie ?",
    toastShareFallback: "Partage non supporté ici — téléchargée 💜",
    shareTitle: "Ma Purple Capsule 💜", shareText: "J'ai créé ma capsule ARMY. Crée la tienne 💜",
    moods: { happy:"Heureuse", sad:"Triste", hopeful:"Pleine d'espoir", nostalgic:"Nostalgique", lost:"Perdue", motivated:"Motivée" },
  },
  de: {
    brand: "Purple", tagline: "Ein violettes Erinnerungserlebnis",
    heroEyebrow: "Ein violettes Erinnerungserlebnis",
    heroTitle1: "Erstelle deine", heroTitle2: "BTS-Erinnerungskapsel",
    heroSub: "Ein stiller Zufluchtsort für ARMY. Wähle ein Gefühl, schreibe deinem zukünftigen Ich ein Flüstern und versiegle es in einer violetten Erinnerung — zum Behalten, zum Teilen.",
    start: "Starten", underBtn: "Weniger als 60 Sekunden · Kein Login",
    steps: "einfache Schritte", capsules: "Kapseln", noData: "gespeicherte Daten",
    heroQuote1: "Hinter den Bergen, weitere Berge —", heroQuote2: "und dahinter, du.",
    composeStep: "Schritt 1 von 2",
    composeTitle: "Wie fühlst du dich heute?",
    composeSub: "Wähle eines. Es gibt keine falschen Antworten.",
    whisperLabel: "Ein Flüstern an dein zukünftiges Ich", whisperOptional: "(optional)",
    whisperPlaceholder: "Schreibe sanft. 150 Zeichen.",
    staysOnDevice: "Bleibt nur auf deinem Gerät", seal: "Kapsel versiegeln",
    resultEyebrow: "Deine Kapsel ist versiegelt",
    resultTitle1: "Ein kleines Stück von dir,", resultTitle2: "in violettem Licht bewahrt.",
    resultSub: "Behalte sie als Erinnerung. Teile sie wie ein Flüstern. Die Kapsel lebt nur hier, nur jetzt — nichts wird hochgeladen.",
    download: "Herunterladen", share: "Teilen", regenerate: "Neu erstellen",
    another: "← Andere Kapsel erstellen",
    footer: "Mit 💜 für ARMY weltweit · Keine Konten, kein Tracking, keine Daten.",
    cardArmy: "ARMY · Zeitkapsel", cardMood: "Stimmung",
    cardNote: "Eine Notiz an mich", cardVibe: "Vibe", cardSealed: "Versiegelt",
    cardMade: "Erstellt mit Purple Capsule 💜",
    toastSaved: "Kapsel gespeichert 💜", toastError: "Speichern fehlgeschlagen. Nochmal versuchen?",
    toastShareFallback: "Teilen nicht unterstützt — heruntergeladen 💜",
    shareTitle: "Meine Purple Capsule 💜", shareText: "Ich habe meine ARMY-Kapsel erstellt. Erstell deine 💜",
    moods: { happy:"Glücklich", sad:"Traurig", hopeful:"Hoffnungsvoll", nostalgic:"Nostalgisch", lost:"Verloren", motivated:"Motiviert" },
  },
};
