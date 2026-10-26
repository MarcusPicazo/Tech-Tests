import { useMemo, useState } from 'react';
import { normToken } from '../../lib/answers.js';

/*
 * Texto con huecos ("___") + banco de palabras abajo.
 * - Clic en una palabra del banco -> vuela al hueco activo (o al primero vacio).
 * - Clic en un hueco lleno -> devuelve la palabra al banco.
 * - Tambien se puede arrastrar (extra), pero el clic basta: los mouses viejos
 *   y trackpads fallan con drag-and-drop.
 * - Teclado: Tab entre huecos y palabras + Enter/Espacio.
 *
 * value: (string | null)[]  con una entrada por hueco.
 */
export default function GapFillBank({ question, value, onChange, revealed, disabled }) {
  const parts = useMemo(() => String(question.content || '').split(/___+/), [question.content]);
  const blanks = parts.length - 1;
  const answers = Array.isArray(value) && value.length === blanks ? value : new Array(blanks).fill(null);
  const [active, setActive] = useState(0);

  // Cuantas veces se usa cada palabra (para deshabilitar chips repetidos).
  const usedCount = {};
  answers.forEach((w) => {
    if (w != null) usedCount[w] = (usedCount[w] || 0) + 1;
  });
  const seen = {};

  const firstEmpty = () => answers.findIndex((w) => w == null);

  const place = (word) => {
    if (disabled) return;
    let slot = answers[active] == null ? active : firstEmpty();
    if (slot < 0) return; // no hay huecos libres
    const next = answers.slice();
    next[slot] = word;
    onChange(next);
    const after = next.findIndex((w) => w == null);
    setActive(after < 0 ? slot : after);
  };

  const clearBlank = (i) => {
    if (disabled || answers[i] == null) return;
    const next = answers.slice();
    next[i] = null;
    onChange(next);
    setActive(i);
  };

  return (
    <div className="space-y-5">
      <p className="text-xl leading-relaxed text-ink">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < blanks && (
              <BlankSlot
                index={i}
                word={answers[i]}
                active={active === i && answers[i] == null}
                state={
                  revealed
                    ? normToken(answers[i]) === normToken((question.answer || [])[i])
                      ? 'correct'
                      : 'wrong'
                    : undefined
                }
                disabled={disabled}
                onClick={() => (answers[i] == null ? setActive(i) : clearBlank(i))}
                onDrop={(w) => {
                  if (disabled) return;
                  const next = answers.slice();
                  next[i] = w;
                  onChange(next);
                }}
              />
            )}
          </span>
        ))}
      </p>

      <div className="flex flex-wrap gap-2" aria-label="Banco de palabras">
        {(question.bank || []).map((word, i) => {
          seen[word] = (seen[word] || 0) + 1;
          const isUsed = seen[word] <= (usedCount[word] || 0);
          return (
            <button
              key={`${word}-${i}`}
              type="button"
              className="word-chip"
              disabled={disabled || isUsed}
              draggable={!disabled && !isUsed}
              onDragStart={(e) => e.dataTransfer.setData('text/plain', word)}
              onClick={() => place(word)}
              aria-label={`Colocar ${word}`}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BlankSlot({ word, active, state, disabled, onClick, onDrop }) {
  const base =
    'mx-1 inline-flex min-w-[80px] items-center justify-center rounded-lg border-b-4 px-2 py-0.5 align-middle text-lg font-800 transition-colors';
  const look = state
    ? state === 'correct'
      ? 'border-brand-600 bg-brand-50 text-brand-700'
      : 'border-coral-600 bg-coral-50 text-coral-700'
    : word
      ? 'border-sky-600 bg-sky-50 text-ink'
      : active
        ? 'border-sky-500 bg-white text-ink-faint ring-2 ring-sky-300'
        : 'border-[#c4c8db] bg-white text-ink-faint';
  return (
    <button
      type="button"
      className={`${base} ${look}`}
      disabled={disabled}
      onClick={onClick}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const w = e.dataTransfer.getData('text/plain');
        if (w) onDrop(w);
      }}
    >
      {word || '    '}
    </button>
  );
}
