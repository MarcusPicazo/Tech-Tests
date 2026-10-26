import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/*
 * Festejo breve cuando la racha llega a un multiplo de 5 (5, 10, 15...).
 * Igual que el contador, NO revela si las respuestas son correctas: solo
 * celebra que el alumno sigue contestando.
 */
const LINES = ['On fire!', 'Unstoppable!', 'Super streak!', 'Keep it up!', 'Amazing focus!'];

export default function StreakToast({ toast }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    setVisible(toast);
    const t = setTimeout(() => setVisible(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-24 z-20 flex justify-center px-4" aria-live="polite">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={visible.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 rounded-full border-2 border-sun-500 bg-white px-5 py-2 font-display text-lg font-800 text-ink shadow-card"
          >
            <span className="text-2xl" aria-hidden="true">🔥</span>
            {visible.value} in a row! {LINES[(visible.value / 5 - 1) % LINES.length]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
