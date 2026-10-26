import { tokenize, expectedWordSelectIndices } from '../../lib/answers.js';

/*
 * Texto donde el alumno hace clic en las palabras que cumplen un criterio
 * (p. ej. "click on all the verbs"). Las palabras elegidas se resaltan.
 * - Mouse: clic para marcar / desmarcar.
 * - Teclado: Tab entre palabras + Enter/Espacio.
 *
 * value: number[]  (indices de los tokens seleccionados)
 */
export default function WordSelect({ question, value, onChange, revealed, disabled }) {
  const tokens = tokenize(question.content);
  const selected = new Set(Array.isArray(value) ? value : []);
  const correctSet = revealed ? new Set(expectedWordSelectIndices(question)) : null;

  const toggle = (i) => {
    if (disabled) return;
    const next = new Set(selected);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    onChange([...next].sort((a, b) => a - b));
  };

  return (
    <p className="whitespace-pre-line rounded-2xl border-2 border-[#e4e6f1] bg-white p-4 text-lg leading-loose text-ink sm:text-xl" aria-label={question.prompt}>
      {tokens.map((tk, i) => {
        const isSel = selected.has(i);
        let look = 'hover:bg-sky-50';
        if (revealed) {
          const shouldBe = correctSet.has(i);
          if (isSel && shouldBe) look = 'bg-brand-100 text-brand-800 ring-2 ring-brand-500';
          else if (isSel && !shouldBe) look = 'bg-coral-50 text-coral-600 ring-2 ring-coral-500 line-through';
          else if (!isSel && shouldBe) look = 'ring-2 ring-brand-400';
        } else if (isSel) {
          look = 'bg-sky-50 text-ink ring-2 ring-sky-500';
        }
        return (
          <span key={i}>
            <button
              type="button"
              disabled={disabled}
              aria-pressed={isSel}
              onClick={() => toggle(i)}
              className={`mx-0.5 rounded-md px-1 py-0.5 font-600 transition-colors ${look}`}
            >
              {tk}
            </button>{' '}
          </span>
        );
      })}
    </p>
  );
}
