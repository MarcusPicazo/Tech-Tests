import { useMemo } from 'react';
import { shuffledOptions } from '../../lib/prng.js';

/*
 * Ordenar pasos de un proceso (p. ej. SENSOR -> INTERNET -> DATA -> ACTION).
 * - Clic en una tarjeta de abajo -> se agrega como el siguiente paso.
 * - Clic en un paso ya colocado -> regresa (y los de abajo suben).
 * - Teclado: Tab + Enter/Espacio.
 *
 * question: { steps: string[] (orden correcto) }
 * value: string[] (orden elegido)
 */
export default function SequenceOrder({
  question,
  value,
  onChange,
  revealed,
  disabled,
  matricula = 'x',
}) {
  const steps = question.steps || [];
  const scrambled = useMemo(
    () => shuffledOptions(steps, matricula, question.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question.steps, matricula, question.id],
  );
  const chosen = Array.isArray(value) ? value : [];
  const pool = scrambled.filter((s) => !chosen.includes(s));

  const add = (s) => !disabled && onChange([...chosen, s]);
  const removeAt = (i) => {
    if (disabled) return;
    const next = chosen.slice();
    next.splice(i, 1);
    onChange(next);
  };

  return (
    <div className="space-y-5">
      <ol className="space-y-2" aria-label="Your order">
        {steps.map((_, i) => {
          const s = chosen[i];
          const st = revealed && s ? (steps[i] === s ? 'correct' : 'wrong') : undefined;
          return (
            <li key={i} className="flex items-center gap-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ink font-display text-lg font-800 text-white">
                {i + 1}
              </span>
              {s ? (
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => removeAt(i)}
                  className={`flex-1 rounded-2xl border-2 px-4 py-3 text-left text-base font-700 text-ink sm:text-lg ${
                    st === 'correct'
                      ? 'border-brand-500 bg-brand-50'
                      : st === 'wrong'
                        ? 'border-coral-500 bg-coral-50'
                        : 'border-sky-500 bg-sky-50'
                  }`}
                  aria-label={`Remove step ${i + 1}: ${s}`}
                >
                  {s}
                </button>
              ) : (
                <div
                  className={`flex-1 rounded-2xl border-2 border-dashed px-4 py-3 text-ink-faint ${
                    i === chosen.length ? 'border-sky-400' : 'border-[#e4e6f1]'
                  }`}
                >
                  {i === chosen.length ? 'Tap the next step…' : '·'}
                </div>
              )}
              {i < steps.length - 1 && <span className="sr-only">then</span>}
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap gap-2" aria-label="Steps to place">
        {pool.map((s) => (
          <button
            key={s}
            type="button"
            className="word-chip"
            disabled={disabled}
            onClick={() => add(s)}
            aria-label={`Add ${s}`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
