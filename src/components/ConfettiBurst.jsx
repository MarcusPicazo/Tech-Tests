import { useEffect } from 'react';
import confetti from 'canvas-confetti';

/*
 * Celebracion visual al terminar el examen. Una sola rafaga, SIN sonido
 * (canvas-confetti no reproduce audio). Se omite si el sistema pide reducir
 * movimiento.
 */
export default function ConfettiBurst() {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const colors = ['#22b14c', '#1ca0e6', '#ffb703', '#ff7a6b'];
    confetti({
      particleCount: 120,
      spread: 75,
      startVelocity: 42,
      origin: { y: 0.6 },
      colors,
      disableForReducedMotion: true,
    });
    const t = setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        scalar: 0.9,
        origin: { y: 0.5 },
        colors,
        disableForReducedMotion: true,
      });
    }, 220);

    return () => {
      clearTimeout(t);
      confetti.reset();
    };
  }, []);

  return null;
}
