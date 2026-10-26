import { useMemo } from 'react';
import { shuffledOptions } from '../../lib/prng.js';
import { isCorrect } from '../../lib/answers.js';

/*
 * Ordenar palabras desordenadas para formar una oracion.
 * - Clic en una palabra de abajo -> se agrega al final de la oracion.
 * - Clic en una palabra ya colocada -> regresa al banco.
 * - Teclado: Tab + Enter/Espacio.
 *
 * tokens: string[] (desordenadas)   answer: string (oracion correcta)
 * value : string[] (orden elegido por el alumno)
 */
export default function SentenceBuilder({
  question,
  value,
  onChange,
  revealed,
  disabled,
  matricula = 'x',
}) {
  const scrambled = useMemo(
    () => shuffledOptions(question.tokens || [], matricula, question.id),
    [question.tokens, matricula, question.id],
  );
  const chosen = Array.isArray(value) ? value : [];

  // Palabras que quedan disponibles (restando las ya usadas, con duplicados).
  const pool = scrambled.slice();
  chosen.forEach((w) => {
    const idx = pool.indexOf(w);
    if (idx >= 0) pool.splice(idx, 1);
  });

  const add = (w) => !disabled && onChange([...chosen, w]);
  const removeAt = (i) => {
    if (disabled) return;
    const next = chosen.slice();
    next.splice(i, 1);
    onChange(next);
  };

  const state = revealed ? (isCorrect(question, chosen) ? 'correct' : 'wrong') : undefined;
  const areaLook =
    state === 'correct'
      ? 'border-brand-500 bg-brand-50'
      : state === 'wrong'
        ? 'border-coral-500 bg-coral-50'
        : 'border-[#e4e6f1] bg-white';

  return (
    <div className="space-y-5">
      <div
        className={`min-h-[64px] rounded-2xl border-2 border-dashed p-3 ${areaLook}`}
        aria-label="Oracion en construccion"
      >
        <div className="flex flex-wrap gap-2">
          {chosen.length === 0 && (
            <span className="px-2 py-2 text-ink-faint">Tap the words in order…</span>
          )}
          {chosen.map((w, i) => (
            <button
              key={`${w}-${i}`}
              type="button"
              className="word-chip border-sky-500 bg-sky-50"
              disabled={disabled}
              onClick={() => removeAt(i)}
              aria-label={`Quitar ${w}`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2" aria-label="Palabras disponibles">
        {pool.map((w, i) => (
          <button
            key={`${w}-${i}`}
            type="button"
            className="word-chip"
            disabled={disabled}
            onClick={() => add(w)}
            aria-label={`Agregar ${w}`}
          >
            {w}
          </button>
        ))}
        {pool.length === 0 && (
          <span className="px-2 py-2 text-ink-faint">All words used.</span>
        )}
      </div>
    </div>
  );
}
