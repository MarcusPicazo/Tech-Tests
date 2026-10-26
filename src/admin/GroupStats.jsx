import { useMemo } from 'react';
import { PERFORMANCE_BANDS, GRADE_VALUES } from '../config.js';
import { EXAMS } from '../data/exams.js';
import { examLabel, fmtGrade } from './format.js';

/*
 * Estadisticas: distribucion por desempeno, promedio por grupo y (cuando se
 * filtra un solo examen) el promedio por tema y por nivel, para ver que temas
 * le cuestan mas al grupo. Graficas hechas con divs y CSS (sin libreria).
 */
const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

export default function GroupStats({ rows }) {
  const counts = useMemo(() => {
    const c = Object.fromEntries(PERFORMANCE_BANDS.map((b) => [b.label, 0]));
    rows.forEach((r) => {
      if (c[r.performance] !== undefined) c[r.performance] += 1;
    });
    return c;
  }, [rows]);

  const byGroup = useMemo(
    () =>
      GRADE_VALUES.map((g) => {
        const rs = rows.filter((r) => r.grado_grupo === g);
        return {
          group: g,
          exam: rs[0] ? rs[0].exam_id : null,
          n: rs.length,
          grade: avg(rs.map((r) => Number(r.grade) || 0)),
          pct: Math.round(avg(rs.map((r) => Number(r.score_pct) || 0))),
        };
      }).filter((g) => g.n > 0),
    [rows],
  );

  // Si todas las filas son del mismo examen: promedio por tema y por nivel.
  const examIds = [...new Set(rows.map((r) => r.exam_id))];
  const exam = examIds.length === 1 ? EXAMS[examIds[0]] : null;
  const topicAvg = useMemo(() => {
    if (!exam) return [];
    return Object.entries(exam.topics)
      .map(([key, meta]) => ({
        key,
        label: meta.es,
        pct: Math.round(avg(rows.map((r) => r.scores?.topics?.[key]?.pct ?? 0))),
      }))
      .sort((a, b) => a.pct - b.pct);
  }, [exam, rows]);
  const sectionAvg = useMemo(() => {
    if (!exam) return [];
    return exam.sections.map((s) => ({
      ...s,
      pct: Math.round(avg(rows.map((r) => r.scores?.sections?.[s.n]?.pct ?? 0))),
    }));
  }, [exam, rows]);

  const max = Math.max(1, ...Object.values(counts));

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white p-5 shadow-card">
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="text-lg font-800 text-ink">Distribución por desempeño</h3>
          <span className="text-sm text-ink-faint">
            {rows.length} alumnos · promedio {fmtGrade(avg(rows.map((r) => Number(r.grade) || 0)))}
          </span>
        </div>
        <div className="flex items-end gap-3" style={{ height: 220 }}>
          {PERFORMANCE_BANDS.slice().reverse().map((b) => {
            const n = counts[b.label] || 0;
            const h = Math.round((n / max) * 180);
            return (
              <div key={b.label} className="flex flex-1 flex-col items-center justify-end gap-2">
                <span className="text-sm font-800 tabular-nums text-ink">{n}</span>
                <div
                  className="w-full rounded-t-lg transition-[height] duration-300"
                  style={{ height: Math.max(4, h), backgroundColor: b.color }}
                  title={`${b.label}: ${n}`}
                />
                <span className="text-center text-xs font-700 text-ink-soft">{b.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-card">
          <h3 className="mb-3 text-lg font-800 text-ink">Promedio por grupo</h3>
          {byGroup.length === 0 ? (
            <p className="text-sm text-ink-faint">Sin datos.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-ink-faint">
                  <th className="py-1">Grupo</th>
                  <th className="py-1">Examen</th>
                  <th className="py-1 text-center">Alumnos</th>
                  <th className="py-1 text-center">%</th>
                  <th className="py-1 text-center">Promedio</th>
                </tr>
              </thead>
              <tbody>
                {byGroup.map((g) => (
                  <tr key={g.group} className="border-t border-[#eef0f6]">
                    <td className="py-2 font-800">{g.group}</td>
                    <td className="py-2 text-ink-soft">{examLabel(g.exam)}</td>
                    <td className="py-2 text-center tabular-nums">{g.n}</td>
                    <td className="py-2 text-center tabular-nums">{g.pct}%</td>
                    <td className="py-2 text-center font-800 tabular-nums">{fmtGrade(g.grade)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-card">
          <h3 className="mb-3 text-lg font-800 text-ink">Temas: del más difícil al más fácil</h3>
          {!exam ? (
            <p className="text-sm text-ink-faint">
              Filtra un solo examen (IoT 1°, IoT 2° o Ciberseguridad 3°) para ver el promedio por tema.
            </p>
          ) : (
            <div className="space-y-2">
              {topicAvg.map((t) => (
                <Bar key={t.key} label={t.label} pct={t.pct} />
              ))}
              <p className="pt-2 text-xs font-800 uppercase tracking-wide text-ink-faint">Por nivel</p>
              {sectionAvg.map((s) => (
                <Bar key={s.n} label={`${s.icon} ${s.name}`} pct={s.pct} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Bar({ label, pct }) {
  const color = pct >= 80 ? '#22b14c' : pct >= 60 ? '#ffb703' : '#f5473d';
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-700 text-ink">{label}</span>
        <span className="tabular-nums text-ink-soft">{pct}%</span>
      </div>
      <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-[#e4e6f1]">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
