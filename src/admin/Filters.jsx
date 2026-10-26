import { GRADE_VALUES, PERFORMANCE_BANDS } from '../config.js';
import { EXAM_LABELS } from './format.js';

/*
 * Filtros del panel: examen, grupo, desempeno y buscador por nombre o
 * matricula.
 */
export const EMPTY_FILTERS = { q: '', exam: '', gradeGroup: '', performance: '' };

export default function Filters({ value, onChange, count, total }) {
  const set = (patch) => onChange({ ...value, ...patch });

  return (
    <div className="no-print flex flex-wrap items-end gap-3 rounded-2xl bg-white p-4 shadow-card">
      <label className="flex flex-col text-xs font-700 text-ink-soft">
        Buscar (nombre o matrícula)
        <input
          type="search"
          className="mt-1 w-56 rounded-lg border-2 border-[#e4e6f1] px-3 py-2 text-sm font-600 text-ink focus:border-sky-500 focus:outline-none"
          value={value.q}
          onChange={(e) => set({ q: e.target.value })}
          placeholder="Escribe para filtrar…"
        />
      </label>

      <label className="flex flex-col text-xs font-700 text-ink-soft">
        Examen
        <select
          className="mt-1 rounded-lg border-2 border-[#e4e6f1] px-3 py-2 text-sm font-600 text-ink"
          value={value.exam}
          onChange={(e) => set({ exam: e.target.value })}
        >
          <option value="">Todos</option>
          {Object.entries(EXAM_LABELS).map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col text-xs font-700 text-ink-soft">
        Grupo
        <select
          className="mt-1 rounded-lg border-2 border-[#e4e6f1] px-3 py-2 text-sm font-600 text-ink"
          value={value.gradeGroup}
          onChange={(e) => set({ gradeGroup: e.target.value })}
        >
          <option value="">Todos</option>
          {GRADE_VALUES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col text-xs font-700 text-ink-soft">
        Desempeño
        <select
          className="mt-1 rounded-lg border-2 border-[#e4e6f1] px-3 py-2 text-sm font-600 text-ink"
          value={value.performance}
          onChange={(e) => set({ performance: e.target.value })}
        >
          <option value="">Todos</option>
          {PERFORMANCE_BANDS.map((b) => (
            <option key={b.label} value={b.label}>
              {b.label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        className="rounded-lg border-2 border-[#e4e6f1] px-3 py-2 text-sm font-700 text-ink-soft hover:border-coral-400"
        onClick={() => onChange(EMPTY_FILTERS)}
      >
        Limpiar
      </button>

      <span className="ml-auto self-center text-sm text-ink-faint">
        {count} de {total} alumnos
      </span>
    </div>
  );
}
