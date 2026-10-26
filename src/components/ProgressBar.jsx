import { motion, useReducedMotion } from 'framer-motion';

/*
 * Barra de progreso superior que se llena reactivo por reactivo.
 * value / total en pasos. Anima solo el ancho (transform-friendly via layout).
 */
export default function ProgressBar({ value, total }) {
  const reduce = useReducedMotion();
  const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;

  return (
    <div
      className="h-4 w-full overflow-hidden rounded-full bg-[#e4e6f1]"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={value}
      aria-label="Test progress"
    >
      <motion.div
        className="h-full rounded-full bg-brand-500"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
