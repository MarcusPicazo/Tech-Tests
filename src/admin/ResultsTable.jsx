import { fmtDate, fmtDuration, fmtGrade, examLabel, performanceColor } from './format.js';

/*
 * Tabla de resultados. Cada fila es clicable y abre el detalle del alumno.
 */
export default function ResultsTable({ rows, onOpen }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-2xl bg-white p-8 text-center text-ink-faint shadow-card">
        No hay resultados con estos filtros.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-card">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-[#e4e6f1] text-left text-xs uppercase tracking-wide text-ink-faint">
            <th className="p-3">Nombre</th>
            <th className="p-3">Matrícula</th>
            <th className="p-3">Grupo</th>
            <th className="p-3">Examen</th>
            <th className="p-3">Fecha</th>
            <th className="p-3">Duración</th>
            <th className="p-3 text-center">Aciertos</th>
            <th className="p-3 text-center">%</th>
            <th className="p-3 text-center">Calificación</th>
            <th className="p-3">Desempeño</th>
            <th className="p-3 text-center">Racha</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const t = r.scores && r.scores.total;
            return (
              <tr
                key={r.id}
                tabIndex={0}
                onClick={() => onOpen(r.id)}
                onKeyDown={(e) => (e.key === 'Enter' ? onOpen(r.id) : null)}
                className="cursor-pointer border-b border-[#eef0f6] hover:bg-sky-50 focus:bg-sky-50 focus:outline-none"
              >
                <td className="p-3 font-700 text-ink">{r.nombre}</td>
                <td className="p-3 font-600">{r.matricula}</td>
                <td className="p-3">{r.grado_grupo}</td>
                <td className="p-3 text-ink-soft">{examLabel(r.exam_id)}</td>
                <td className="p-3 text-ink-soft">{fmtDate(r.finished_at)}</td>
                <td className="p-3 tabular-nums">
                  {fmtDuration(r.duration_seconds)}
                  {r.auto_ended && (
                    <span className="ml-1 text-xs text-coral-600" title="Se terminó el tiempo">
                      ⏱
                    </span>
                  )}
                </td>
                <td className="p-3 text-center tabular-nums">{t ? `${t.right}/${t.count}` : '—'}</td>
                <td className="p-3 text-center tabular-nums">{r.score_pct ?? '—'}%</td>
                <td className="p-3 text-center text-base font-800 tabular-nums text-ink">
                  {fmtGrade(r.grade)}
                </td>
                <td className="p-3">
                  <span
                    className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-800 text-white"
                    style={{ backgroundColor: performanceColor(r.score_pct) }}
                  >
                    {r.performance || '—'}
                  </span>
                </td>
                <td className="p-3 text-center tabular-nums">🔥 {r.best_streak ?? 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
