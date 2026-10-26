import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminSession, endAdminSession } from '../lib/session.js';
import { fetchRows, fetchDetail, isLocalMode } from '../lib/adminApi.js';
import { SCHOOL_NAME } from '../config.js';
import { rowsToCsv, downloadCsv } from '../lib/csv.js';
import { fmtDate, fmtDuration, fmtGrade, examLabel, sectionPct } from '../admin/format.js';
import Filters, { EMPTY_FILTERS } from '../admin/Filters.jsx';
import ResultsTable from '../admin/ResultsTable.jsx';
import GroupStats from '../admin/GroupStats.jsx';
import StudentDetail from '../admin/StudentDetail.jsx';
import { SkeletonRows } from '../components/Skeleton.jsx';
import SchoolLogo from '../components/SchoolLogo.jsx';


export default function AdminPanel() {
  const navigate = useNavigate();
  const session = getAdminSession();

  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [tab, setTab] = useState('resultados');
  const [openId, setOpenId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate('/admin', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async () => {
    setError('');
    try {
      const data = await fetchRows(session.code);
      setRows(data);
    } catch (e) {
      setError(e.message || 'No se pudieron cargar los resultados.');
      setRows([]);
    }
  };

  useEffect(() => {
    if (session) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Abrir detalle
  useEffect(() => {
    if (!openId) {
      setDetail(null);
      return;
    }
    setDetailLoading(true);
    fetchDetail(session.code, openId)
      .then((d) => setDetail(d))
      .catch((e) => setError(e.message))
      .finally(() => setDetailLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    const q = filters.q.trim().toLowerCase();
    return rows.filter((r) => {
      if (filters.exam && r.exam_id !== filters.exam) return false;
      if (filters.gradeGroup && r.grado_grupo !== filters.gradeGroup) return false;
      if (filters.performance && r.performance !== filters.performance) return false;
      if (q) {
        const hay = `${r.nombre} ${r.matricula}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [rows, filters]);

  const exportCsv = () => {
    const headers = [
      { label: 'Nombre', get: (r) => r.nombre },
      { label: 'Matricula', get: (r) => r.matricula },
      { label: 'Grupo', get: (r) => r.grado_grupo },
      { label: 'Examen', get: (r) => examLabel(r.exam_id) },
      { label: 'Fecha', get: (r) => fmtDate(r.finished_at) },
      { label: 'Duracion (min)', get: (r) => fmtDuration(r.duration_seconds) },
      ...[1, 2, 3, 4, 5].map((n) => ({
        label: `% Nivel ${n}`,
        get: (r) => (sectionPct(r, n) ?? ''),
      })),
      { label: 'Aciertos', get: (r) => (r.scores && r.scores.total ? `${r.scores.total.right}/${r.scores.total.count}` : '') },
      { label: '% total', get: (r) => r.score_pct ?? '' },
      { label: 'Calificacion', get: (r) => fmtGrade(r.grade) },
      { label: 'Desempeno', get: (r) => r.performance || '' },
      { label: 'Mejor racha', get: (r) => r.best_streak ?? 0 },
      { label: 'Cambios de pestana', get: (r) => r.tab_switches ?? 0 },
      { label: 'Comentario', get: (r) => r.teacher_comment || '' },
    ];
    const csv = rowsToCsv(headers, filtered);
    const suffix = filters.gradeGroup ? `_${filters.gradeGroup}` : filters.exam ? `_${filters.exam}` : '_todos';
    downloadCsv(`resultados${suffix}.csv`, csv);
  };

  const onDetailChanged = (updated) => {
    setDetail(updated);
    setRows((prev) =>
      (prev || []).map((r) =>
        r.id === updated.id
          ? { ...r, teacher_comment: updated.teacher_comment }
          : r,
      ),
    );
  };

  const onDetailDeleted = (id) => {
    setRows((prev) => (prev || []).filter((r) => r.id !== id));
    setOpenId(null);
  };

  if (!session) return null;

  return (
    <div className="min-h-full bg-paper">
      <header className="no-print border-b border-[#e4e6f1] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <SchoolLogo className="h-11" />
          <div>
            <h1 className="text-xl font-800 text-ink">Panel del profesor</h1>
            <p className="text-xs text-ink-faint">{SCHOOL_NAME} · Examen de IoT y Ciberseguridad</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={load}
              className="rounded-lg border-2 border-[#e4e6f1] px-3 py-2 text-sm font-700 text-ink-soft hover:border-sky-400"
            >
              ↻ Actualizar
            </button>
            <button
              onClick={() => {
                endAdminSession();
                navigate('/admin', { replace: true });
              }}
              className="rounded-lg border-2 border-[#e4e6f1] px-3 py-2 text-sm font-700 text-ink-soft hover:border-coral-400"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      {isLocalMode && (
        <div className="no-print bg-sun-50 px-6 py-2 text-center text-sm text-ink-soft">
          Modo local — los datos solo existen en esta computadora.
        </div>
      )}

      <main className="mx-auto max-w-6xl px-6 py-6">
        {error && (
          <p className="no-print mb-4 rounded-xl border-2 border-coral-400 bg-coral-50 p-3 text-sm font-600 text-coral-600">
            {error}
          </p>
        )}

        {detail || detailLoading ? (
          detailLoading ? (
            <SkeletonRows rows={8} />
          ) : (
            <StudentDetail
              attempt={detail}
              code={session.code}
              onBack={() => setOpenId(null)}
              onChanged={onDetailChanged}
              onDeleted={onDetailDeleted}
            />
          )
        ) : (
          <>
            <div className="no-print mb-4 flex gap-2">
              {[
                ['resultados', 'Resultados'],
                ['estadisticas', 'Estadísticas'],
              ].map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`rounded-lg px-4 py-2 text-sm font-700 ${
                    tab === k ? 'bg-ink text-white' : 'bg-white text-ink-soft shadow-card'
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={exportCsv}
                disabled={!rows || filtered.length === 0}
                className="ml-auto rounded-lg bg-brand-500 px-4 py-2 text-sm font-700 text-white disabled:opacity-40"
              >
                ⬇ Exportar CSV ({filtered.length})
              </button>
            </div>

            <div className="space-y-4">
              <Filters
                value={filters}
                onChange={setFilters}
                count={filtered.length}
                total={rows ? rows.length : 0}
              />

              {rows === null ? (
                <SkeletonRows rows={8} />
              ) : tab === 'resultados' ? (
                <ResultsTable rows={filtered} onOpen={setOpenId} />
              ) : (
                <GroupStats rows={filtered} />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
