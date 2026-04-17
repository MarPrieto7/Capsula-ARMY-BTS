import { useMemo } from "react";

interface Props { count?: number; className?: string }

const StarField = ({ count = 60, className = "" }: Props) => {
  const stars = useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2.5 + 0.6,
      dur: 3 + Math.random() * 6,
      delay: Math.random() * 6,
      max: 0.4 + Math.random() * 0.5,
    })),
  [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {stars.map(s => (
        <span
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            // @ts-expect-error css vars
            "--dur": `${s.dur}s`,
            "--max": s.max,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
