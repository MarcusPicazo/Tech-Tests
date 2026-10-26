import { useEffect, useMemo, useRef } from 'react';
import { shuffledOptions } from '../../lib/prng.js';
import { isCorrect } from '../../lib/answers.js';

/*
 * "Guess the word": una adivinanza + fichas de letras para deletrear la
 * respuesta (tipo juego de palabras).
 * - Clic en una ficha -> la letra pasa a la siguiente casilla vacia.
 * - Clic en una casilla llena -> la letra regresa a las fichas.
 * - Tambien se puede escribir con el teclado (y Backspace para borrar).
 *
 * question: { content (pista), emoji, answer: 'SENSOR', extra: 'QZ' }
 * value: string[]  (letras elegidas, en orden)
 */
export default function WordGuess({
  question,
  value,
  onChange,
  revealed,
  disabled,
  matricula = 'x',
}) {
  const answer = String(question.answer || '').toUpperCase();
  const tiles = useMemo(
    () =>
      shuffledOptions(
        (answer + String(question.extra || '').toUpperCase()).split(''),
        matricula,
        question.id,
      ),
    [answer, question.extra, matricula, question.id],
  );
  const chosen = Array.isArray(value) ? value.slice(0, answer.length) : [];
  // Copia "viva" de las letras: si se teclea muy rapido llegan varias teclas
  // antes del siguiente render y cada una debe ver la anterior.
  const chosenRef = useRef(chosen);
  chosenRef.current = chosen;

  // Que fichas estan usadas (greedy, respeta letras repetidas).
  const usedFor = (letters) => {
    const u = new Array(tiles.length).fill(false);
    letters.forEach((ch) => {
      const idx = tiles.findIndex((t, i) => !u[i] && t === ch);
      if (idx >= 0) u[idx] = true;
    });
    return u;
  };
  const used = usedFor(chosen);

  const commit = (next) => {
    chosenRef.current = next;
    onChange(next);
  };
  const add = (ch) => {
    const cur = chosenRef.current;
    if (disabled || cur.length >= answer.length) return;
    commit([...cur, ch]);
  };
  const removeAt = (i) => {
    if (disabled) return;
    const next = chosenRef.current.slice();
    next.splice(i, 1);
    commit(next);
  };

  const onKeyDown = (e) => {
    if (disabled || e.ctrlKey || e.metaKey || e.altKey) return;
    const cur = chosenRef.current;
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (cur.length) removeAt(cur.length - 1);
      return;
    }
    const k = e.key.length === 1 ? e.key.toUpperCase() : '';
    if (!/^[A-Z0-9-]$/.test(k)) return;
    const u = usedFor(cur);
    const idx = tiles.findIndex((t, i) => !u[i] && t === k);
    if (idx >= 0) add(k);
  };

  // Escribir con el teclado fisico (sin necesidad de enfocar nada).
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const state = revealed ? (isCorrect(question, chosen) ? 'correct' : 'wrong') : undefined;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 rounded-2xl bg-sky-50 p-4">
        {question.emoji && (
          <span className="text-5xl leading-none" aria-hidden="true">
            {question.emoji}
          </span>
        )}
        <p className="text-lg font-700 leading-snug text-ink sm:text-xl">{question.content}</p>
      </div>

      {/* Casillas */}
      <div className="flex flex-wrap justify-center gap-2" aria-label="Your word">
        {answer.split('').map((_, i) => {
          const ch = chosen[i];
          const look =
            state === 'correct'
              ? 'border-brand-500 bg-brand-50 text-brand-700'
              : state === 'wrong'
                ? 'border-coral-500 bg-coral-50 text-coral-600'
                : ch
                  ? 'border-sky-500 bg-sky-50 text-ink'
                  : i === chosen.length
                    ? 'border-sky-400 bg-white ring-2 ring-sky-200'
                    : 'border-[#c4c8db] bg-white';
          return (
            <button
              key={i}
              type="button"
              disabled={disabled || !ch}
              onClick={() => removeAt(i)}
              aria-label={ch ? `Remove ${ch}` : `Empty box ${i + 1}`}
              className={`flex h-12 w-10 items-center justify-center rounded-xl border-b-4 border-2 font-display text-2xl font-800 transition-colors sm:h-14 sm:w-12 ${look}`}
            >
              {ch || ''}
            </button>
          );
        })}
      </div>
      <p className="text-center text-sm font-600 text-ink-faint">
        {answer.length} letters · tap the letters or type them
      </p>

      {/* Fichas */}
      <div className="flex flex-wrap justify-center gap-2" aria-label="Letter tiles">
        {tiles.map((t, i) => (
          <button
            key={`${t}-${i}`}
            type="button"
            disabled={disabled || used[i] || chosen.length >= answer.length}
            onClick={() => add(t)}
            className="letter-tile"
            aria-label={`Letter ${t}`}
          >
            {t}
          </button>
        ))}
        <button
          type="button"
          disabled={disabled || chosen.length === 0}
          onClick={() => removeAt(chosen.length - 1)}
          className="letter-tile bg-paper text-ink-soft"
          aria-label="Delete last letter"
        >
          ⌫
        </button>
      </div>
    </div>
  );
}
