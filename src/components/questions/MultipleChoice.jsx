import { useMemo } from 'react';
import { shuffledOptions } from '../../lib/prng.js';

/*
 * Opcion multiple: 4 opciones en tarjetas grandes tipo boton.
 * - El orden de las opciones se baraja de forma estable por matricula.
 * - Mouse: clic en la tarjeta. Teclado: Tab + Enter/Espacio, o teclas 1-9.
 * - `revealed`: pinta la correcta en verde y la elegida-incorrecta en rojo.
 *
 * Admite un `emoji` opcional como ilustracion junto al enunciado.
 */
export default function MultipleChoice({
  question,
  value,
  onChange,
  revealed,
  disabled,
  matricula = 'x',
  showStem = true,
}) {
  const options = useMemo(
    () => shuffledOptions(question.options || [], matricula, question.id),
    [question.options, matricula, question.id],
  );

  const onKeyDown = (e) => {
    const n = Number(e.key);
    if (!disabled && n >= 1 && n <= options.length) {
      onChange(options[n - 1]);
    }
  };

  return (
    <div
      role="group"
      aria-label={question.prompt || 'Opcion multiple'}
      onKeyDown={onKeyDown}
    >
      {showStem && (question.content || question.emoji) && (
        <div className="mb-4 flex items-center gap-4">
          {question.emoji && (
            <span className="text-5xl leading-none" aria-hidden="true">
              {question.emoji}
            </span>
          )}
          {question.content && (
            <p className="whitespace-pre-line text-xl font-700 leading-relaxed text-ink">
              {question.content}
            </p>
          )}
        </div>
      )}
      <div className="space-y-3">
      {options.map((opt, i) => {
        const selected = value === opt;
        let state;
        if (revealed) {
          if (opt === question.answer) state = 'correct';
          else if (selected) state = 'wrong';
        }
        return (
          <button
            key={opt}
            type="button"
            className="option-card"
            aria-pressed={selected}
            data-selected={selected}
            data-state={state}
            disabled={disabled}
            onClick={() => onChange(opt)}
          >
            <span
              className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border-2 border-current text-sm font-800 text-ink-faint"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span className="flex-1">{opt}</span>
          </button>
        );
      })}
      </div>
    </div>
  );
}
