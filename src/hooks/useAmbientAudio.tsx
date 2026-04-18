import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Soft, looping ambient pad — slow, gentle, copyright-free.
 * Pure WebAudio synthesis: warm sine layers + slow chord changes + airy
 * reverb-ish noise wash. Designed to fade in/out, never spike, never click.
 */
const STORAGE_KEY = "purple-capsule-audio";

// Gentle Korean-flavored chord progression (Dm pent.) — long, slow.
const CHORDS: number[][] = [
  [146.83, 220.00, 261.63, 329.63], // Dm9-ish
  [130.81, 196.00, 246.94, 293.66], // Cmaj9-ish
  [164.81, 220.00, 246.94, 329.63], // soft suspension
  [146.83, 196.00, 261.63, 349.23], // Dm add4
];

export function useAmbientAudio() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "1") setEnabled(true);
    } catch { /* ignore */ }
  }, []);

  const start = useCallback(() => {
    if (cleanupRef.current) return;
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    ctxRef.current = ctx;

    // Master with very slow fade-in
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 5);

    // Soft lowpass — keeps everything warm and dark
    const warm = ctx.createBiquadFilter();
    warm.type = "lowpass";
    warm.frequency.value = 1100;
    warm.Q.value = 0.4;
    warm.connect(master);

    // 4 sine voices (one per chord note)
    const voices = [0, 1, 2, 3].map(() => {
      const o = ctx.createOscillator();
      o.type = "sine";
      const g = ctx.createGain();
      g.gain.value = 0;
      o.connect(g).connect(warm);
      o.start();
      return { o, g };
    });

    // Sub-octave sine for grounding
    const sub = ctx.createOscillator();
    sub.type = "sine";
    const subG = ctx.createGain();
    subG.gain.value = 0.04;
    sub.connect(subG).connect(warm);
    sub.start();

    // Airy noise wash — quiet, filtered noise for "breath"
    const bufSize = 2 * ctx.sampleRate;
    const noiseBuf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 900;
    noiseFilter.Q.value = 0.6;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.012;
    noise.connect(noiseFilter).connect(noiseGain).connect(master);
    noise.start();

    // Very slow LFO breathing on filter
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.04; // ~25s cycle
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 180;
    lfo.connect(lfoGain).connect(warm.frequency);
    lfo.start();

    // Chord scheduler — crossfade every 8s
    let chordIndex = 0;
    const setChord = (idx: number, fadeSec: number) => {
      const chord = CHORDS[idx % CHORDS.length];
      const t = ctx.currentTime;
      voices.forEach((v, i) => {
        const target = chord[i] ?? chord[chord.length - 1];
        // Smooth frequency glide
        v.o.frequency.cancelScheduledValues(t);
        v.o.frequency.setValueAtTime(v.o.frequency.value, t);
        v.o.frequency.linearRampToValueAtTime(target, t + fadeSec);
        // Gentle amplitude with slight per-voice offset
        v.g.gain.cancelScheduledValues(t);
        v.g.gain.linearRampToValueAtTime(0.18 + i * 0.02, t + fadeSec);
      });
      // Sub follows the root, one octave below
      sub.frequency.cancelScheduledValues(t);
      sub.frequency.linearRampToValueAtTime(chord[0] / 2, t + fadeSec);
    };
    setChord(0, 4);

    const interval = window.setInterval(() => {
      chordIndex++;
      setChord(chordIndex, 6);
    }, 8000);

    cleanupRef.current = () => {
      clearInterval(interval);
      try {
        const t = ctx.currentTime;
        master.gain.cancelScheduledValues(t);
        master.gain.linearRampToValueAtTime(0, t + 1.2);
        setTimeout(() => {
          try {
            voices.forEach(v => v.o.stop());
            sub.stop(); lfo.stop(); noise.stop();
            ctx.close();
          } catch { /* noop */ }
        }, 1400);
      } catch { /* noop */ }
    };
  }, []);

  const stop = useCallback(() => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    ctxRef.current = null;
  }, []);

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const next = !prev;
      try { localStorage.setItem(STORAGE_KEY, next ? "1" : "0"); } catch {}
      if (next) start(); else stop();
      return next;
    });
  }, [start, stop]);

  useEffect(() => () => { stop(); }, [stop]);

  return { enabled, toggle };
}
