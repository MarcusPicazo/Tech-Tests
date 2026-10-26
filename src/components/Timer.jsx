/*
 * Reloj visible del examen. Cambia de color al acercarse el limite:
 *   > 10 min : normal
 *   <= 10 min: aviso (ambar)
 *   <= 5 min : peligro (rojo) + parpadeo suave
 * Todo el aviso es VISUAL (sin sonido).
 */
export default function Timer({ label, minutesLeft }) {
  const warn = minutesLeft <= 10 && minutesLeft > 5;
  const danger = minutesLeft <= 5;

  const cls = danger
    ? 'bg-coral-50 text-coral-600 border-coral-500'
    : warn
      ? 'bg-sun-50 text-sun-600 border-sun-500'
      : 'bg-white text-ink border-[#e4e6f1]';

  return (
    <div
      className={`flex items-center gap-2 rounded-xl border-2 px-3 py-1.5 font-display text-lg font-700 tabular-nums ${cls} ${
        danger ? 'motion-safe:animate-pulse' : ''
      }`}
      aria-live="polite"
      aria-label={`Time left ${label}`}
    >
      <span aria-hidden="true">⏱️</span>
      <span>{label}</span>
    </div>
  );
}
