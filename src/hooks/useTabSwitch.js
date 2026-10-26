import { useEffect, useRef, useState } from 'react';

/*
 * Cuenta cuantas veces el alumno sale de la pestana / minimiza la ventana
 * durante el examen (evento `visibilitychange`). No bloquea ni expulsa a nadie:
 * solo registra el numero para que el profesor lo vea en el panel.
 *
 *   enabled    : solo cuenta mientras sea true (durante el examen)
 *   initial    : valor inicial (al reanudar un intento guardado)
 *   onChange   : callback con el nuevo total (para autoguardar)
 */
export function useTabSwitch(enabled, initial = 0, onChange) {
  const [count, setCount] = useState(initial);
  const countRef = useRef(initial);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!enabled) return undefined;
    const handler = () => {
      if (document.visibilityState === 'hidden') {
        countRef.current += 1;
        setCount(countRef.current);
        if (typeof onChangeRef.current === 'function') {
          onChangeRef.current(countRef.current);
        }
      }
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [enabled]);

  return count;
}
