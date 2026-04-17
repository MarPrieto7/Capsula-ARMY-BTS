import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Share2, RefreshCw, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import StarField from "@/components/StarField";
import CapsuleCard from "@/components/CapsuleCard";
import { MOODS, generateCapsule, sanitize, type Capsule } from "@/data/capsule";
import hero from "@/assets/hero-arirang.jpg";
import silk from "@/assets/silk-purple.jpg";
import silhouette from "@/assets/silhouette-night.jpg";

type Step = "intro" | "compose" | "result";

const Index = () => {
  const [step, setStep] = useState<Step>("intro");
  const [mood, setMood] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [capsule, setCapsule] = useState<Capsule | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // SEO
  useEffect(() => {
    document.title = "ARMY Time Capsule 💜 — Purple Memory Experience";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Create your BTS-inspired emotional time capsule in under a minute. A purple, shareable keepsake for ARMY worldwide. No login, no tracking.");
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = window.location.origin + "/";
  }, []);

  const startCompose = () => setStep("compose");

  const generate = () => {
    if (!mood) return;
    const safe = sanitize(message);
    setCapsule(generateCapsule(mood, safe));
    setStep("result");
  };

  const regenerate = () => {
    if (!mood) return;
    setCapsule(generateCapsule(mood, sanitize(message)));
  };

  const reset = () => {
    setStep("intro"); setMood(null); setMessage(""); setCapsule(null);
  };

  const exportPng = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
    const res = await fetch(dataUrl);
    return await res.blob();
  };

  const handleDownload = async () => {
    try {
      const blob = await exportPng();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `purple-capsule-${capsule?.id ?? "memory"}.png`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Capsule saved 💜");
    } catch {
      toast.error("Couldn't save the capsule. Try again?");
    }
  };

  const handleShare = async () => {
    try {
      const blob = await exportPng();
      if (!blob) return;
      const file = new File([blob], `purple-capsule.png`, { type: "image/png" });
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (nav.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My Purple Capsule 💜",
          text: "I made my ARMY time capsule. Make yours too 💜",
        });
      } else {
        await handleDownload();
        toast("Sharing not supported here — downloaded instead 💜");
      }
    } catch {
      // user cancelled — silent
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient background layers */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-aurora" />
        <div
          className="absolute inset-0 opacity-[0.18] mix-blend-screen"
          style={{ backgroundImage: `url(${silk})`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-glow" />
        <StarField count={90} />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10">
        <button onClick={reset} className="font-serif text-lg tracking-wide text-foreground/90 hover:text-foreground transition">
          Purple <span className="text-gradient">Capsule</span> 💜
        </button>
        <span className="hidden text-xs uppercase tracking-[0.3em] text-foreground/50 md:block">
          ARMY · Time Capsule
        </span>
      </header>

      <section className="relative z-10 px-6 pb-20 md:px-10">
        {step === "intro" && <Intro onStart={startCompose} />}
        {step === "compose" && (
          <Compose
            mood={mood} setMood={setMood}
            message={message} setMessage={setMessage}
            onGenerate={generate}
          />
        )}
        {step === "result" && capsule && (
          <Result
            capsule={capsule}
            cardRef={cardRef}
            onDownload={handleDownload}
            onShare={handleShare}
            onRegenerate={regenerate}
            onReset={reset}
          />
        )}
      </section>

      <footer className="relative z-10 mt-10 border-t border-foreground/10 px-6 py-6 text-center text-xs text-foreground/50 md:px-10">
        Made with 💜 for ARMY worldwide · No accounts, no tracking, no data stored.
      </footer>
    </main>
  );
};

/* ---------- Intro ---------- */
const Intro = ({ onStart }: { onStart: () => void }) => (
  <div className="mx-auto grid max-w-6xl gap-10 pt-6 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:pt-10">
    <div className="flex flex-col justify-center animate-fade-up">
      <p className="mb-5 text-xs uppercase tracking-[0.4em] text-gold-soft/80">
        A Purple Memory Experience
      </p>
      <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl">
        Create your <span className="text-gradient">BTS memory capsule</span> 💜
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 md:text-lg">
        A quiet refuge for ARMY. Choose a feeling, write a whisper to your future self,
        and seal it inside a purple keepsake — yours to keep, yours to share.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Button
          size="lg"
          onClick={onStart}
          className="group h-14 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-glow hover:bg-primary/90 animate-pulse-glow"
        >
          Start <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
        </Button>
        <span className="text-xs uppercase tracking-[0.25em] text-foreground/50">
          Less than 60 seconds · No login
        </span>
      </div>

      <ul className="mt-12 grid grid-cols-3 gap-4 text-xs text-foreground/60">
        <li><span className="block text-gold-soft/90 font-serif text-2xl">3</span>simple steps</li>
        <li><span className="block text-gold-soft/90 font-serif text-2xl">∞</span>capsules</li>
        <li><span className="block text-gold-soft/90 font-serif text-2xl">0</span>data stored</li>
      </ul>
    </div>

    <div className="relative animate-scale-in">
      <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
        <img
          src={hero}
          alt="Purple moonlit Korean mountains — Arirang inspired"
          width={1920} height={1280}
          className="h-[420px] w-full object-cover md:h-[560px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="font-serif text-xl text-foreground/95 md:text-2xl">
            “Beyond the mountains, more mountains —<br/>
            <span className="text-gold-soft/90">and beyond them, you.</span>”
          </p>
        </div>
      </div>
      <div className="float-slow absolute -right-4 -top-4 hidden h-24 w-24 rounded-full bg-violet-glow/20 blur-2xl md:block" />
    </div>
  </div>
);

/* ---------- Compose ---------- */
const Compose = ({
  mood, setMood, message, setMessage, onGenerate,
}: {
  mood: string | null;
  setMood: (id: string) => void;
  message: string;
  setMessage: (s: string) => void;
  onGenerate: () => void;
}) => (
  <div className="mx-auto max-w-3xl pt-6 md:pt-10 animate-fade-up">
    <p className="mb-3 text-center text-xs uppercase tracking-[0.4em] text-gold-soft/80">Step 1 of 2</p>
    <h2 className="text-center font-serif text-4xl md:text-5xl">How are you feeling, today?</h2>
    <p className="mt-3 text-center text-sm text-foreground/65">Pick one. There are no wrong answers.</p>

    <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {MOODS.map(m => {
        const active = mood === m.id;
        return (
          <button
            key={m.id}
            onClick={() => setMood(m.id)}
            className={[
              "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500",
              active
                ? "border-gold-soft/60 bg-secondary/80 shadow-glow"
                : "border-foreground/10 glass hover:border-foreground/25 hover:-translate-y-0.5",
            ].join(" ")}
          >
            <div className="text-3xl">{m.emoji}</div>
            <div className="mt-3 font-serif text-xl">{m.label}</div>
            {active && (
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-soft to-transparent" />
            )}
          </button>
        );
      })}
    </div>

    <div className="mt-12">
      <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-foreground/60">
        A whisper to your future self <span className="text-foreground/40 normal-case tracking-normal">(optional)</span>
      </label>
      <div className="glass-strong rounded-2xl p-1">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, 150))}
          placeholder="Write softly. 150 characters."
          rows={3}
          maxLength={150}
          className="w-full resize-none rounded-xl bg-transparent p-5 font-serif text-lg leading-relaxed placeholder:text-foreground/35 focus:outline-none"
        />
        <div className="flex items-center justify-between px-5 pb-3 text-[10px] uppercase tracking-[0.25em] text-foreground/50">
          <span>Stays on your device only</span>
          <span>{message.length}/150</span>
        </div>
      </div>
    </div>

    <div className="mt-10 flex justify-center">
      <Button
        size="lg"
        disabled={!mood}
        onClick={onGenerate}
        className="group h-14 rounded-full bg-primary px-10 text-base font-medium text-primary-foreground shadow-glow hover:bg-primary/90 disabled:opacity-40 disabled:shadow-none"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Seal my capsule
      </Button>
    </div>
  </div>
);

/* ---------- Result ---------- */
const Result = ({
  capsule, cardRef, onDownload, onShare, onRegenerate, onReset,
}: {
  capsule: Capsule;
  cardRef: React.RefObject<HTMLDivElement>;
  onDownload: () => void;
  onShare: () => void;
  onRegenerate: () => void;
  onReset: () => void;
}) => (
  <div className="mx-auto max-w-6xl grid gap-12 pt-4 md:grid-cols-[1fr_1fr] md:items-center md:pt-8">
    <div className="order-2 md:order-1 animate-fade-up">
      <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold-soft/80">Your capsule is sealed</p>
      <h2 className="font-serif text-4xl md:text-5xl">A small piece of you,<br/>kept in <span className="text-gradient">violet light</span>.</h2>
      <p className="mt-5 max-w-lg text-foreground/70">
        Save it as a memory. Share it as a whisper. The capsule lives only here, only now —
        nothing is uploaded anywhere.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={onDownload} size="lg" className="h-12 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90 shadow-glow">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
        <Button onClick={onShare} size="lg" variant="secondary" className="h-12 rounded-full bg-secondary/80 px-6 hover:bg-secondary">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
        <Button onClick={onRegenerate} size="lg" variant="ghost" className="h-12 rounded-full px-6 text-foreground/80 hover:bg-foreground/5">
          <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
        </Button>
      </div>

      <button onClick={onReset} className="mt-8 text-xs uppercase tracking-[0.3em] text-foreground/50 hover:text-foreground/80 transition">
        ← Create another capsule
      </button>

      <div className="mt-12 hidden md:block">
        <img
          src={silhouette}
          alt="Silhouette under a starry purple sky"
          width={1280} height={1600}
          loading="lazy"
          className="h-40 w-full rounded-2xl object-cover opacity-70"
        />
      </div>
    </div>

    <div className="order-1 md:order-2 animate-scale-in">
      <CapsuleCard ref={cardRef} capsule={capsule} />
    </div>
  </div>
);

export default Index;
