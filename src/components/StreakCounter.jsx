import { useEffect, useRef, useState } from 'react';

/*
 * Racha visual: cuantas respuestas CORRECTAS seguidas lleva el alumno. Una
 * respuesta incorrecta o en blanco la regresa a 0. El icono hace "pop" al crecer.
 */
export default function StreakCounter({ value }) {
  const [popping, setPopping] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (value > prev.current && value > 0) {
      setPopping(true);
      const t = setTimeout(() => setPopping(false), 340);
      prev.current = value;
      return () => clearTimeout(t);
    }
    prev.current = value;
    return undefined;
  }, [value]);

  if (value <= 0) {
    return <div className="w-16" aria-hidden="true" />;
  }

  return (
    <div
      className="flex items-center gap-1.5 font-display text-lg font-800 text-sun-600"
      aria-label={`Streak: ${value}`}
    >
      <span
        className={`inline-block text-2xl ${popping ? 'motion-safe:animate-pop' : ''}`}
        aria-hidden="true"
      >
        🔥
      </span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
