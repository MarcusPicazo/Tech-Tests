import { useMemo, useState } from 'react';
import { shuffledOptions } from '../../lib/prng.js';

/*
 * Emparejar dos columnas (termino tecnico <-> definicion) con clics.
 * - Clic en un elemento de la izquierda -> queda "activo".
 * - Clic en uno de la derecha -> se forma la pareja (se colorea con un numero).
 * - Clic en una pareja ya hecha -> se deshace.
 * - Teclado: Tab + Enter/Espacio.
 *
 * pairs: [left, right][]   (el orden de la derecha se baraja por matricula)
 * value: { [left]: right }
 */
// Colores de las paletas por defecto de Tailwind (no sobrescritas en el theme).
const SWATCHES = [
  'bg-indigo-100 border-indigo-500 text-indigo-900',
  'bg-emerald-100 border-emerald-500 text-emerald-900',
  'bg-amber-100 border-amber-500 text-amber-900',
  'bg-rose-100 border-rose-500 text-rose-900',
  'bg-violet-100 border-violet-500 text-violet-900',
  'bg-teal-100 border-teal-500 text-teal-900',
];

export default function MatchPairs({
  question,
  value,
  onChange,
  revealed,
  disabled,
  matricula = 'x',
}) {
  const lefts = useMemo(() => (question.pairs || []).map((p) => p[0]), [question.pairs]);
  const rights = useMemo(
    () => shuffledOptions((question.pairs || []).map((p) => p[1]), matricula, question.id),
    [question.pairs, matricula, question.id],
  );
  const map = value && typeof value === 'object' ? value : {};
  const [activeLeft, setActiveLeft] = useState(null);

  const rightToLeft = {};
  Object.entries(map).forEach(([l, r]) => {
    rightToLeft[r] = l;
  });

  const colorFor = (left) => {
    const idx = lefts.indexOf(left);
    return SWATCHES[idx % SWATCHES.length];
  };

  const pickLeft = (l) => {
    if (disabled) return;
    if (map[l]) {
      // deshacer pareja
      const next = { ...map };
      delete next[l];
      onChange(next);
      setActiveLeft(null);
      return;
    }
    setActiveLeft((cur) => (cur === l ? null : l));
  };

  const pickRight = (r) => {
    if (disabled) return;
    if (rightToLeft[r]) {
      // esa definicion ya estaba emparejada: liberarla
      const next = { ...map };
      delete next[rightToLeft[r]];
      onChange(next);
      return;
    }
    if (activeLeft == null) return;
    onChange({ ...map, [activeLeft]: r });
    setActiveLeft(null);
  };

  const rowState = (left) => {
    if (!revealed) return undefined;
    const correct = (question.pairs || []).find((p) => p[0] === left);
    return correct && map[left] === correct[1] ? 'correct' : 'wrong';
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <ul className="space-y-3" aria-label="Terminos">
        {lefts.map((l) => {
          const matched = Boolean(map[l]);
          const st = rowState(l);
          return (
            <li key={l}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => pickLeft(l)}
                aria-pressed={activeLeft === l}
                className={`flex w-full items-center gap-2 rounded-xl border-2 px-4 py-3 text-left font-700 transition-colors ${
                  st === 'correct'
                    ? 'border-brand-500 bg-brand-50'
                    : st === 'wrong'
                      ? 'border-coral-500 bg-coral-50'
                      : matched
                        ? colorFor(l)
                        : activeLeft === l
                          ? 'border-sky-500 bg-white ring-2 ring-sky-300'
                          : 'border-[#e4e6f1] bg-white'
                }`}
              >
                {matched && (
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 border-current text-xs font-800">
                    {lefts.indexOf(l) + 1}
                  </span>
                )}
                <span>{l}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="space-y-3" aria-label="Definiciones">
        {rights.map((r) => {
          const owner = rightToLeft[r];
          return (
            <li key={r}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => pickRight(r)}
                className={`flex w-full items-center gap-2 rounded-xl border-2 px-4 py-3 text-left font-600 transition-colors ${
                  owner
                    ? colorFor(owner)
                    : activeLeft
                      ? 'border-sky-400 bg-white hover:bg-sky-50'
                      : 'border-[#e4e6f1] bg-white'
                }`}
              >
                {owner && (
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 border-current text-xs font-800">
                    {lefts.indexOf(owner) + 1}
                  </span>
                )}
                <span>{r}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
