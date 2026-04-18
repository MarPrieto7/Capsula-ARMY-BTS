import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Original ambient pad inspired by Korean traditional textures (gayageum-like
 * plucks + airy daegeum pad). 100% synthesized via WebAudio — no copyrighted
 * audio. Off by default; toggling is gesture-driven so browsers allow it.
 */
const STORAGE_KEY = "purple-capsule-audio";

export function useAmbientAudio() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "1") setEnabled(true);
    } catch { /* ignore */ }
  }, []);

  const start = useCallback(() => {
    if (nodesRef.current) return;
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2.5);

    // Pentatonic Korean-style scale (D minor pentatonic-ish)
    const scale = [146.83, 174.61, 196.00, 220.00, 261.63, 293.66, 329.63];

    // Pad layer — two detuned saws through lowpass
    const pad = ctx.createGain();
    pad.gain.value = 0.5;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 800;
    filter.Q.value = 0.7;
    pad.connect(filter).connect(master);

    const o1 = ctx.createOscillator(); o1.type = "sine";    o1.frequency.value = scale[0];
    const o2 = ctx.createOscillator(); o2.type = "triangle"; o2.frequency.value = scale[2] / 2;
    const o3 = ctx.createOscillator(); o3.type = "sine";    o3.frequency.value = scale[4];
    o1.connect(pad); o2.connect(pad); o3.connect(pad);
    o1.start(); o2.start(); o3.start();

    // Slow LFO on filter for breathing
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 350;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();

    // Sparse pluck — gayageum style
    let plucking = true;
    const pluck = () => {
      if (!plucking) return;
      const t = ctx.currentTime;
      const note = scale[Math.floor(Math.random() * scale.length)] * (Math.random() < 0.3 ? 2 : 1);
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = note;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.18, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + 2.4);
      const f = ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = 2400;
      osc.connect(f).connect(g).connect(master);
      osc.start(t);
      osc.stop(t + 2.6);
      const next = 2.2 + Math.random() * 3.5;
      setTimeout(pluck, next * 1000);
    };
    setTimeout(pluck, 1200);

    nodesRef.current = {
      stop: () => {
        plucking = false;
        try {
          master.gain.cancelScheduledValues(ctx.currentTime);
          master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
          setTimeout(() => {
            try { o1.stop(); o2.stop(); o3.stop(); lfo.stop(); ctx.close(); } catch {}
          }, 700);
        } catch {}
      },
    };
  }, []);

  const stop = useCallback(() => {
    nodesRef.current?.stop();
    nodesRef.current = null;
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
