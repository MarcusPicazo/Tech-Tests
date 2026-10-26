import { useEffect, useRef, useState } from 'react';

/*
 * Temporizador global de cuenta regresiva basado en marca de tiempo real
 * (no en el numero de ticks), asi sigue siendo correcto aunque la pestana
 * quede en segundo plano o el equipo se congele un momento.
 *
 *   totalSeconds : duracion total (p. ej. 60 * 60)
 *   startedAtMs  : Date.now() del inicio del examen
 *   onExpire     : se llama UNA sola vez cuando el tiempo llega a 0
 */
export function useTimer(totalSeconds, startedAtMs, onExpire) {
  const compute = () => {
    if (!startedAtMs) return totalSeconds;
    const elapsed = Math.floor((Date.now() - startedAtMs) / 1000);
    return Math.max(0, totalSeconds - elapsed);
  };

  const [remaining, setRemaining] = useState(compute);
  const firedRef = useRef(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    const tick = () => {
      const r = compute();
      setRemaining(r);
      if (r <= 0 && !firedRef.current) {
        firedRef.current = true;
        if (typeof onExpireRef.current === 'function') onExpireRef.current();
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSeconds, startedAtMs]);

  const mm = Math.floor(remaining / 60);
  const ss = remaining % 60;
  return {
    remaining,
    label: `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`,
    minutesLeft: Math.ceil(remaining / 60),
  };
}
