/*
 * "Fact or Fake?": una afirmacion y dos botones grandes.
 * - Mouse: clic. Teclado: Tab + Enter/Espacio, o teclas F (fact) / K (fake).
 *
 * question: { content, emoji, answer: 'Fact' | 'Fake' }
 * value: 'Fact' | 'Fake' | null
 */
const CHOICES = [
  { key: 'Fact', icon: '✅', label: 'FACT', hint: 'It is true', tone: 'brand' },
  { key: 'Fake', icon: '🙅', label: 'FAKE', hint: 'It is not true', tone: 'coral' },
];

export default function FactOrFake({ question, value, onChange, revealed, disabled }) {
  const onKeyDown = (e) => {
    if (disabled) return;
    const k = e.key.toLowerCase();
    if (k === 'f') onChange('Fact');
    if (k === 'k') onChange('Fake');
  };

  return (
    <div className="space-y-6" role="group" aria-label="Fact or fake" onKeyDown={onKeyDown}>
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-sky-50 p-6 text-center">
        {question.emoji && (
          <span className="text-5xl leading-none" aria-hidden="true">
            {question.emoji}
          </span>
        )}
        <p className="text-xl font-800 leading-snug text-ink sm:text-2xl">“{question.content}”</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {CHOICES.map((c) => {
          const selected = value === c.key;
          let state;
          if (revealed) {
            if (c.key === question.answer) state = 'correct';
            else if (selected) state = 'wrong';
          }
          const look = state
            ? state === 'correct'
              ? 'border-brand-500 bg-brand-50'
              : 'border-coral-500 bg-coral-50'
            : selected
              ? c.tone === 'brand'
                ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-300'
                : 'border-coral-500 bg-coral-50 ring-2 ring-coral-400'
              : 'border-[#e4e6f1] bg-white hover:border-sky-400';
          return (
            <button
              key={c.key}
              type="button"
              aria-pressed={selected}
              disabled={disabled}
              onClick={() => onChange(c.key)}
              className={`flex flex-col items-center gap-1 rounded-3xl border-2 border-b-[6px] px-4 py-5 transition-transform active:translate-y-0.5 ${look}`}
            >
              <span className="text-4xl leading-none" aria-hidden="true">
                {c.icon}
              </span>
              <span className="font-display text-2xl font-800 text-ink">{c.label}</span>
              <span className="text-sm font-600 text-ink-faint">{c.hint}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
