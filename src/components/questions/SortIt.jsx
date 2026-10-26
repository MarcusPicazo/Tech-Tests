import { useMemo } from 'react';
import { shuffledOptions } from '../../lib/prng.js';

/*
 * "Sort it!": clasificar tarjetas en 2 (o 3) cajas.
 * - Cada tarjeta tiene un boton por categoria: clic para mandarla a esa caja.
 * - Clic en una tarjeta ya clasificada (dentro de la caja) -> regresa.
 * - Teclado: Tab + Enter/Espacio.
 *
 * question: { categories: [{ name, icon }], items: [item, categoria][] }
 * value: { [item]: categoria }
 */
const BIN_LOOKS = [
  'border-sky-500 bg-sky-50',
  'border-sun-500 bg-sun-50',
  'border-brand-500 bg-brand-50',
];

export default function SortIt({
  question,
  value,
  onChange,
  revealed,
  disabled,
  matricula = 'x',
}) {
  const cats = question.categories || [];
  const items = useMemo(
    () => shuffledOptions((question.items || []).map((it) => it[0]), matricula, question.id),
    [question.items, matricula, question.id],
  );
  const map = value && typeof value === 'object' ? value : {};
  const correctOf = (item) => ((question.items || []).find((it) => it[0] === item) || [])[1];

  const put = (item, cat) => {
    if (disabled) return;
    onChange({ ...map, [item]: cat });
  };
  const takeBack = (item) => {
    if (disabled) return;
    const next = { ...map };
    delete next[item];
    onChange(next);
  };

  const pending = items.filter((it) => !map[it]);

  return (
    <div className="space-y-5">
      {/* Tarjetas por clasificar */}
      <div className="min-h-[64px] space-y-2">
        {pending.length === 0 ? (
          <p className="rounded-2xl border-2 border-dashed border-[#e4e6f1] p-4 text-center font-700 text-ink-faint">
            All sorted! Tap a card in a box to move it back. 🎉
          </p>
        ) : (
          pending.map((it) => (
            <div
              key={it}
              className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-[#e4e6f1] bg-white p-2 pl-4"
            >
              <span className="flex-1 text-base font-700 text-ink sm:text-lg">{it}</span>
              {cats.map((c, ci) => (
                <button
                  key={c.name}
                  type="button"
                  disabled={disabled}
                  onClick={() => put(it, c.name)}
                  className={`rounded-xl border-2 px-3 py-1.5 text-sm font-800 text-ink transition-transform active:translate-y-0.5 ${BIN_LOOKS[ci % BIN_LOOKS.length]}`}
                  aria-label={`Put "${it}" in ${c.name}`}
                >
                  {c.icon} {c.name}
                </button>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Cajas */}
      <div className={`grid gap-3 ${cats.length === 3 ? 'sm:grid-cols-3' : 'grid-cols-2'}`}>
        {cats.map((c, ci) => {
          const inBin = items.filter((it) => map[it] === c.name);
          return (
            <div
              key={c.name}
              className={`min-h-[140px] rounded-2xl border-2 border-dashed p-3 ${BIN_LOOKS[ci % BIN_LOOKS.length]}`}
            >
              <p className="mb-2 text-center font-display text-lg font-800 text-ink">
                <span aria-hidden="true">{c.icon}</span> {c.name}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {inBin.map((it) => {
                  const st = revealed ? (correctOf(it) === c.name ? 'correct' : 'wrong') : undefined;
                  return (
                    <button
                      key={it}
                      type="button"
                      disabled={disabled}
                      onClick={() => takeBack(it)}
                      className={`word-chip ${
                        st === 'correct'
                          ? 'border-brand-500 bg-brand-50'
                          : st === 'wrong'
                            ? 'border-coral-500 bg-coral-50'
                            : ''
                      }`}
                      aria-label={`Move "${it}" back`}
                    >
                      {it}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
