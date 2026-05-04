import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, RefreshCw, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import StarField from "@/components/StarField";
import BTSMotifs from "@/components/BTSMotifs";
import HangulBrush from "@/components/HangulBrush";
import Constellation from "@/components/Constellation";
import CapsuleCard, { type CardFormat } from "@/components/CapsuleCard";
import LangSwitcher from "@/components/LangSwitcher";
import ArirangMark from "@/components/ArirangMark";
import CapsuleHistory from "@/components/CapsuleHistory";
import { useCapsuleHistory } from "@/hooks/useCapsuleHistory";
import { MOODS, generateCapsule, sanitize, type Capsule } from "@/data/capsule";
import { useI18n } from "@/hooks/useI18n";
import hero from "@/assets/hero-arirang.jpg";
import silk from "@/assets/silk-purple.jpg";
import composeArt from "@/assets/army-compose.jpg";

type Step = "intro" | "compose" | "result";

const Index = () => {
  const { t, lang } = useI18n();
  const [step, setStep] = useState<Step>("intro");
  const [mood, setMood] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [capsule, setCapsule] = useState<Capsule | null>(null);
  const [format, setFormat] = useState<CardFormat>("post");
  const cardRef = useRef<HTMLDivElement>(null);
  const { history, add: addHistory, clear: clearHistory } = useCapsuleHistory();

  // SEO — refresh on language change
  useEffect(() => {
    document.title = `ARMY Capsule 💜 — ${t.tagline}`;
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta("description", t.heroSub);
    setMeta("og:title", `ARMY Capsule 💜 — ${t.tagline}`, "property");
    setMeta("og:description", t.heroSub, "property");
    setMeta("twitter:title", `ARMY Capsule 💜 — ${t.tagline}`);
    setMeta("twitter:description", t.heroSub);

    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = window.location.origin + "/";
  }, [t, lang]);

  const startCompose = () => setStep("compose");
  const generate = () => {
    if (!mood) return;
    const c = generateCapsule(mood, sanitize(message));
    setCapsule(c);
    addHistory(c);
    setStep("result");
  };
  const regenerate = () => {
    if (!mood) return;
    const c = generateCapsule(mood, sanitize(message));
    setCapsule(c);
    addHistory(c);
  };
  const openFromHistory = (c: Capsule) => {
    setCapsule(c);
    setMood(c.mood.id);
    setMessage(c.message ?? "");
    setStep("result");
  };
  const reset = () => { setStep("intro"); setMood(null); setMessage(""); setCapsule(null); };

  // Native share-target sizes (in CSS px → toPng's pixelRatio scales up)
  const SHARE_PIXELS: Record<CardFormat, { w: number; h: number; ratio: number }> = {
    post:   { w: 540, h: 675,  ratio: 2 }, // → 1080x1350
    square: { w: 540, h: 540,  ratio: 2 }, // → 1080x1080
    story:  { w: 540, h: 960,  ratio: 2 }, // → 1080x1920
  };

  const exportPng = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    const cfg = SHARE_PIXELS[format];
    const dataUrl = await toPng(cardRef.current, {
      pixelRatio: cfg.ratio,
      cacheBust: true,
      canvasWidth: cfg.w,
      canvasHeight: cfg.h,
    });
    const res = await fetch(dataUrl);
    return await res.blob();
  };

  const handleDownload = async () => {
    try {
      const blob = await exportPng();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `army-capsule-${capsule?.id ?? "memory"}-${format}.png`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(t.toastSaved);
    } catch {
      toast.error(t.toastError);
    }
  };

  // Calm motifs while composing (less distraction while typing)
  const calmMotifs = step === "compose";

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-aurora" />
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-screen"
          style={{ backgroundImage: `url(${silk})`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden="true"
        />
        <BTSMotifs calm={calmMotifs} />
        <StarField count={70} />
        {/* Slow self-drawing hangul calligraphy */}
        <div className="absolute inset-x-0 top-1/3 h-[40vh] opacity-60">
          <HangulBrush />
        </div>
        <div className="absolute inset-0 bg-glow" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <button onClick={reset} className="hover:opacity-90 transition" aria-label="Home">
          <ArirangMark size="lg" />
        </button>
        <div className="flex items-center gap-2">
          <CapsuleHistory history={history} onOpen={openFromHistory} onClear={clearHistory} />
          <LangSwitcher />
        </div>
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
            capsule={capsule} cardRef={cardRef}
            format={format} setFormat={setFormat}
            onDownload={handleDownload}
            onRegenerate={regenerate} onReset={reset}
          />
        )}
      </section>

      <footer className="relative z-10 mt-10 border-t border-foreground/10 px-6 py-6 text-center text-xs text-foreground/50 md:px-10">
        {t.footer}
      </footer>
    </main>
  );
};

/* ---------- Intro ---------- */
const Intro = ({ onStart }: { onStart: () => void }) => {
  const { t } = useI18n();
  return (
    <div className="mx-auto grid max-w-6xl gap-10 pt-6 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:pt-10">
      <div className="flex flex-col justify-center animate-fade-up">
        <p className="mb-5 text-xs uppercase tracking-[0.4em] text-gold-soft/80">{t.heroEyebrow}</p>
        <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl">
          {t.heroTitle1} <span className="text-gradient">{t.heroTitle2}</span> 💜
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 md:text-lg">
          {t.heroSub}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            size="lg" onClick={onStart}
            className="group h-14 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-glow hover:bg-primary/90 animate-pulse-glow"
          >
            {t.start} <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
          </Button>
          <span className="text-xs uppercase tracking-[0.25em] text-foreground/50">{t.underBtn}</span>
        </div>

        <div className="mt-12">
          <Constellation size={520} showLabel className="w-full max-w-xl" />
        </div>
      </div>

      <div className="relative animate-scale-in">
        <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
          <img
            src={hero} alt="Purple moonlit Korean mountains — Arirang inspired"
            width={1920} height={1280}
            className="h-[420px] w-full object-cover md:h-[560px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="font-serif text-xl text-foreground/95 md:text-2xl">
              “{t.heroQuote1}<br/>
              <span className="text-gold-soft/90">{t.heroQuote2}</span>”
            </p>
          </div>
        </div>
        <div className="float-slow absolute -right-4 -top-4 hidden h-24 w-24 rounded-full bg-violet-glow/20 blur-2xl md:block" />
      </div>
    </div>
  );
};

/* ---------- Compose ---------- */
const Compose = ({
  mood, setMood, message, setMessage, onGenerate,
}: {
  mood: string | null;
  setMood: (id: string) => void;
  message: string;
  setMessage: (s: string) => void;
  onGenerate: () => void;
}) => {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl pt-6 md:pt-10 animate-fade-up text-center">
      {/* ARMY-themed hero image for the compose step */}
      <div className="mx-auto mb-8 overflow-hidden rounded-3xl shadow-soft max-w-md">
        <img
          src={composeArt}
          alt="A silhouette under a purple moon and seven stars — ARMY constellation"
          width={1080}
          height={1920}
          loading="lazy"
          className="h-48 w-full object-cover md:h-56"
        />
      </div>

      <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold-soft/80">{t.composeStep}</p>
      <h2 className="font-serif text-4xl md:text-5xl">{t.composeTitle}</h2>
      <p className="mt-3 text-sm text-foreground/65">{t.composeSub}</p>

      <div className="mx-auto mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 text-left">
        {MOODS.map(m => {
          const active = mood === m.id;
          return (
            <button
              key={m.id} onClick={() => setMood(m.id)}
              className={[
                "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500",
                active
                  ? "border-gold-soft/60 bg-secondary/80 shadow-glow"
                  : "border-foreground/10 glass hover:border-foreground/25 hover:-translate-y-0.5",
              ].join(" ")}
            >
              <div className="text-3xl">{m.emoji}</div>
              <div className="mt-3 font-serif text-xl">{t.moods[m.id] ?? m.label}</div>
              {active && (
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-soft to-transparent" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-12 text-left">
        <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-foreground/60">
          {t.whisperLabel} <span className="text-foreground/40 normal-case tracking-normal">{t.whisperOptional}</span>
        </label>
        <div className="glass-strong rounded-2xl p-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 150))}
            placeholder={t.whisperPlaceholder}
            rows={3} maxLength={150}
            className="w-full resize-none rounded-xl bg-transparent p-5 font-serif text-lg leading-relaxed placeholder:text-foreground/35 focus:outline-none"
          />
          <div className="flex items-center justify-between px-5 pb-3 text-[10px] uppercase tracking-[0.25em] text-foreground/50">
            <span>{t.staysOnDevice}</span>
            <span>{message.length}/150</span>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button
          size="lg" disabled={!mood} onClick={onGenerate}
          className="group h-14 rounded-full bg-primary px-10 text-base font-medium text-primary-foreground shadow-glow hover:bg-primary/90 disabled:opacity-40 disabled:shadow-none"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {t.seal}
        </Button>
      </div>
    </div>
  );
};

/* ---------- Result ---------- */
const Result = ({
  capsule, cardRef, format, setFormat, onDownload, onRegenerate, onReset,
}: {
  capsule: Capsule;
  cardRef: React.RefObject<HTMLDivElement>;
  format: CardFormat;
  setFormat: (f: CardFormat) => void;
  onDownload: () => void;
  onRegenerate: () => void;
  onReset: () => void;
}) => {
  const { t } = useI18n();
  const formats: { id: CardFormat; label: string }[] = [
    { id: "post",    label: t.shareSizeThreads },
    { id: "square",  label: t.shareSizePost },
    { id: "story",   label: t.shareSizeStory },
  ];
  return (
    <div className="mx-auto max-w-6xl grid gap-12 pt-4 md:grid-cols-[1fr_1fr] md:items-center md:pt-8">
      <div className="order-2 md:order-1 animate-fade-up text-center md:text-left">
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold-soft/80">{t.resultEyebrow}</p>
        <h2 className="font-serif text-4xl md:text-5xl">
          {t.resultTitle1}<br/><span className="text-gradient">{t.resultTitle2}</span>
        </h2>
        <p className="mt-5 mx-auto md:mx-0 max-w-lg text-foreground/70">{t.resultSub}</p>

        {/* Format selector */}
        <div className="mt-6">
          <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-foreground/55">
            {t.shareSizeLabel}
          </div>
          <div className="inline-flex flex-wrap justify-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 p-1">
            {formats.map(f => {
              const active = format === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={[
                    "rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] transition",
                    active
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-foreground/70 hover:text-foreground hover:bg-foreground/5",
                  ].join(" ")}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
          <Button onClick={onDownload} size="lg" className="h-12 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90 shadow-glow">
            <Download className="mr-2 h-4 w-4" /> {t.download}
          </Button>
          <Button onClick={onRegenerate} size="lg" variant="secondary" className="h-12 rounded-full bg-secondary/80 px-6 hover:bg-secondary">
            <RefreshCw className="mr-2 h-4 w-4" /> {t.regenerate}
          </Button>
        </div>

        <button onClick={onReset} className="mt-8 text-xs uppercase tracking-[0.3em] text-foreground/50 hover:text-foreground/80 transition">
          {t.another}
        </button>
      </div>

      <div className="order-1 md:order-2 animate-scale-in flex justify-center">
        <CapsuleCard ref={cardRef} capsule={capsule} format={format} />
      </div>
    </div>
  );
};

export default Index;
