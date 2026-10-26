import { useMemo, useState } from 'react';
import { answerReview, topicProfile } from '../lib/scoring.js';
import { removeAttempt, saveComment } from '../lib/adminApi.js';
import {
  fmtDate,
  fmtDuration,
  fmtGrade,
  formatAnswer,
  examLabel,
  examOf,
  performanceColor,
} from './format.js';
import PrintReport from './PrintReport.jsx';
import DepthButton from '../components/DepthButton.jsx';

const TYPE_LABELS = {
  'multiple-choice': 'Opción múltiple',
  'fact-or-fake': 'Fact or fake',
  'wire-connect': 'Conectar cables',
  'match-pairs': 'Emparejar',
  'sentence-builder': 'Ordenar palabras',
  'sequence-order': 'Ordenar pasos',
  'word-guess': 'Adivinar palabra',
  'sort-it': 'Clasificar',
  'gap-fill-bank': 'Completar',
  'word-select': 'Señalar palabras',
};

export default function StudentDetail({ attempt, code, onBack, onChanged, onDeleted }) {
  const exam = examOf(attempt);
  const answers = attempt.answers || {};
  const review = useMemo(() => (exam ? answerReview(exam, answers) : []), [exam, answers]);
  const profile = useMemo(() => (exam ? topicProfile(exam, answers) : null), [exam, answers]);
  const [confirmDel, setConfirmDel] = useState(false);
  const [delBusy, setDelBusy] = useState(false);
  const [comment, setComment] = useState(attempt.teacher_comment || '');
  const [saveMsg, setSaveMsg] = useState('');
  const [saving, setSaving] = useState(false);

  if (!exam) {
    return (
      <div className="rounded-2xl bg-white p-5 shadow-card">
        <button onClick={onBack} className="text-sm font-700 text-sky-600">← Volver</button>
        <p className="mt-3 text-coral-600">Examen desconocido: {String(attempt.exam_id)}</p>
      </div>
    );
  }

  const sections = exam.sections.map((s) => ({
    section: s,
    pct: attempt.scores?.sections?.[s.n]?.pct ?? 0,
    items: review.filter((r) => r.section === s.n),
  }));

  const doDelete = async () => {
    setDelBusy(true);
    try {
      await removeAttempt(code, attempt.id);
      onDeleted(attempt.id);
    } catch (e) {
      alert(`No se pudo eliminar: ${e.message}`);
      setDelBusy(false);
    }
  };

  const doSaveComment = async () => {
    setSaving(true);
    try {
      const updated = await saveComment(code, attempt.id, comment);
      onChanged(updated || { ...attempt, teacher_comment: comment });
      setSaveMsg('Comentario guardado.');
    } catch (e) {
      setSaveMsg(`Error: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  const total = attempt.scores?.total;

  return (
    <div className="space-y-6">
      {/* Barra superior */}
      <div className="no-print flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border-2 border-[#e4e6f1] px-3 py-2 text-sm font-700 text-ink-soft hover:border-sky-400"
        >
          ← Volver a la lista
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg border-2 border-[#e4e6f1] px-3 py-2 text-sm font-700 text-ink-soft hover:border-sky-400"
        >
          🖨️ Imprimir reporte
        </button>
        <div className="ml-auto">
          {confirmDel ? (
            <span className="flex items-center gap-2 text-sm">
              ¿Eliminar este intento? (el alumno podrá repetir)
              <button
                onClick={doDelete}
                disabled={delBusy}
                className="rounded-lg bg-coral-500 px-3 py-2 font-700 text-white"
              >
                {delBusy ? 'Eliminando…' : 'Sí, eliminar'}
              </button>
              <button
                onClick={() => setConfirmDel(false)}
                className="rounded-lg border-2 border-[#e4e6f1] px-3 py-2 font-700 text-ink-soft"
              >
                Cancelar
              </button>
            </span>
          ) : (
            <button
              onClick={() => setConfirmDel(true)}
              className="rounded-lg border-2 border-coral-300 px-3 py-2 text-sm font-700 text-coral-600 hover:bg-coral-50"
            >
              Eliminar intento
            </button>
          )}
        </div>
      </div>

      {/* Cabecera del alumno */}
      <div className="no-print flex flex-wrap items-center gap-5 rounded-2xl bg-white p-5 shadow-card">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-800 text-ink">{attempt.nombre}</h2>
          <p className="text-ink-soft">
            {attempt.matricula} · Grupo {attempt.grado_grupo} · {examLabel(attempt.exam_id)}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-soft">
            <span>Entregado: {fmtDate(attempt.finished_at)}</span>
            <span>
              Duración: {fmtDuration(attempt.duration_seconds)} min
              {attempt.auto_ended && <strong className="text-coral-600"> (se terminó el tiempo)</strong>}
            </span>
            <span>
              Cambios de pestaña:{' '}
              <strong className={attempt.tab_switches > 5 ? 'text-coral-600' : ''}>
                {attempt.tab_switches ?? 0}
              </strong>
            </span>
            <span>Mejor racha: 🔥 {attempt.best_streak ?? 0}</span>
            {total && (
              <span>
                Aciertos completos: {total.right}/{total.count} · En blanco: {total.count - total.answered}
              </span>
            )}
          </div>
        </div>
        <div
          className="flex flex-col items-center rounded-2xl border-4 px-6 py-3"
          style={{ borderColor: performanceColor(attempt.score_pct) }}
        >
          <span className="text-xs font-800 uppercase tracking-widest text-ink-faint">Calificación</span>
          <span className="font-display text-5xl font-800 tabular-nums text-ink">{fmtGrade(attempt.grade)}</span>
          <span className="text-sm font-800" style={{ color: performanceColor(attempt.score_pct) }}>
            {attempt.performance} · {attempt.score_pct}%
          </span>
        </div>
      </div>

      {/* Por nivel */}
      <div className="no-print grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {sections.map(({ section, pct }) => (
          <div key={section.n} className="rounded-2xl bg-white p-3 text-center shadow-card">
            <div className="text-2xl" aria-hidden="true">{section.icon}</div>
            <div className="text-xs font-800 text-ink">{section.name}</div>
            <div
              className="font-display text-2xl font-800 tabular-nums"
              style={{ color: pct >= 80 ? '#22b14c' : pct >= 60 ? '#e29500' : '#d62f2f' }}
            >
              {pct}%
            </div>
          </div>
        ))}
      </div>

      {/* Retroalimentacion automatica */}
      {profile && (
        <div className="no-print space-y-4">
          <div className="rounded-2xl border-2 border-sky-400 bg-white p-5 shadow-card">
            <h3 className="flex items-center gap-2 text-lg font-800 text-ink">
              <span aria-hidden="true">🤖</span> Retroalimentación de la IA
            </h3>
            <p className="mt-2 leading-relaxed text-ink-soft">{profile.summary}</p>
            <p className="mt-3 text-sm font-800 text-ink">Recomendaciones</p>
            <ul className="mt-1 space-y-1 text-sm text-ink-soft">
              {profile.recommendations.map((r, i) => (
                <li key={i}>→ {r}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <FeedbackCard title="Puntos fuertes" tone="brand" items={profile.strengths} empty="Aún no hay un tema claramente dominado." />
            <FeedbackCard title="Áreas de mejora" tone="sun" items={profile.improvements} empty="Sin áreas intermedias." />
            <FeedbackCard title="Deficiencias" tone="coral" items={profile.deficiencies} empty="Sin deficiencias marcadas." />
          </div>
        </div>
      )}

      {/* Comentario del profesor */}
      <div className="no-print space-y-3 rounded-2xl border-2 border-[#e4e6f1] bg-white p-5">
        <h3 className="text-lg font-800 text-ink">Comentario del profesor</h3>
        <textarea
          className="h-24 w-full resize-y rounded-xl border-2 border-[#e4e6f1] p-3 text-sm text-ink focus:border-sky-500 focus:outline-none"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setSaveMsg('');
          }}
          placeholder="Observaciones para el alumno o para sus papás (aparece en el reporte impreso)…"
        />
        <div className="flex items-center gap-3">
          <DepthButton variant="green" onClick={doSaveComment} disabled={saving}>
            {saving ? 'Guardando…' : 'GUARDAR COMENTARIO'}
          </DepthButton>
          {saveMsg && (
            <span className={`text-sm font-600 ${saveMsg.startsWith('Error') ? 'text-coral-600' : 'text-brand-600'}`}>
              {saveMsg}
            </span>
          )}
        </div>
      </div>

      {/* Detalle de respuestas */}
      <div className="no-print rounded-2xl bg-white p-5 shadow-card">
        <h3 className="mb-3 text-lg font-800 text-ink">Respuestas</h3>
        <div className="space-y-5">
          {sections.map((g) => (
            <div key={g.section.n}>
              <p className="mb-2 text-xs font-800 uppercase tracking-wide text-ink-faint">
                Nivel {g.section.n} · {g.section.icon} {g.section.name}
              </p>
              <div className="space-y-2">
                {g.items.map((r) => (
                  <div
                    key={r.id}
                    className={`rounded-xl border-2 p-3 text-sm ${
                      r.correct
                        ? 'border-brand-300 bg-brand-50'
                        : r.score > 0
                          ? 'border-sun-500 bg-sun-50'
                          : r.answered
                            ? 'border-coral-400 bg-coral-50'
                            : 'border-[#e4e6f1] bg-paper'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 w-10 flex-none font-800 tabular-nums">
                        {r.correct ? '✓' : r.score > 0 ? `${Math.round(r.score * 100)}%` : r.answered ? '✗' : '—'}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-700 text-ink">
                          {r.prompt}
                          {r.content && <span className="font-600 text-ink-soft"> — {r.content.replace(/\n+/g, ' ')}</span>}
                        </p>
                        <p className="text-ink-soft">
                          Respuesta: <span className="font-600">{formatAnswer(r.given)}</span>
                        </p>
                        {!r.correct && (
                          <p className="text-brand-700">
                            Correcta: <span className="font-600">{formatAnswer(r.expected)}</span>
                          </p>
                        )}
                      </div>
                      <span className="flex-none text-right text-xs text-ink-faint">
                        {TYPE_LABELS[r.type] || r.type}
                        <br />
                        {exam.topics[r.topic]?.es}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <PrintReport attempt={attempt} exam={exam} profile={profile} />
    </div>
  );
}

function FeedbackCard({ title, tone, items, empty }) {
  const ring =
    tone === 'brand' ? 'border-brand-300' : tone === 'sun' ? 'border-sun-500' : 'border-coral-400';
  return (
    <div className={`rounded-2xl border-2 bg-white p-4 shadow-card ${ring}`}>
      <h4 className="mb-2 font-800 text-ink">{title}</h4>
      {items.length === 0 ? (
        <p className="text-sm text-ink-faint">{empty}</p>
      ) : (
        <ul className="space-y-1.5 text-sm text-ink-soft">
          {items.map((it, i) => (
            <li key={i} className="leading-snug">
              • {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
