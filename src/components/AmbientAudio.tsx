import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

/**
 * Soft ambient music player.
 * - Loops the bundled instrumental
 * - Starts muted; user toggles play/mute with a single button (autoplay-safe)
 * - Persists preference across reloads
 */
const STORAGE_KEY = "army-capsule-audio-on";

const AmbientAudio = () => {
  const { t } = useI18n();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio("/ambient.mp3");
    a.loop = true;
    a.volume = 0.35;
    a.preload = "auto";
    audioRef.current = a;
    // Auto-resume if user previously enabled
    const wasOn = localStorage.getItem(STORAGE_KEY) === "1";
    if (wasOn) {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
    return () => { a.pause(); audioRef.current = null; };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      localStorage.setItem(STORAGE_KEY, "0");
    } else {
      try {
        await a.play();
        setPlaying(true);
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* blocked */
      }
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? t.audioOn : t.audioOff}
      title={playing ? t.audioOn : t.audioOff}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground/75 backdrop-blur-sm transition hover:border-gold-soft/50 hover:text-foreground"
    >
      {playing ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
      {playing && (
        <span className="pointer-events-none absolute -inset-1 rounded-full border border-gold-soft/40 animate-pulse-glow" />
      )}
    </button>
  );
};

export default AmbientAudio;
