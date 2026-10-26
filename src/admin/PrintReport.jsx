import { SCHOOL_NAME, REPORT_SUBTITLE } from '../config.js';
import { fmtDateShort, fmtDuration, fmtGrade, examLabel } from './format.js';

/*
 * Reporte individual para imprimir. Solo se ve en @media print (.print-only).
 * Una hoja por alumno: encabezado del colegio, calificacion destacada,
 * % por nivel, retroalimentacion y comentario del profesor.
 */
export default function PrintReport({ attempt, exam, profile }) {
  return (
    <div className="print-only print-page">
      <header style={{ borderBottom: '3px solid #2b2d42', paddingBottom: 8, marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: '20pt' }}>{SCHOOL_NAME}</h1>
        <p style={{ margin: 0, fontSize: '11pt' }}>{REPORT_SUBTITLE}</p>
      </header>

      <table style={{ width: '100%', fontSize: '11pt', marginBottom: 16 }}>
        <tbody>
          <tr>
            <td><strong>Alumno:</strong> {attempt.nombre}</td>
            <td><strong>Matrícula:</strong> {attempt.matricula}</td>
          </tr>
          <tr>
            <td><strong>Grupo:</strong> {attempt.grado_grupo}</td>
            <td><strong>Examen:</strong> {examLabel(attempt.exam_id)}</td>
          </tr>
          <tr>
            <td><strong>Fecha:</strong> {fmtDateShort(attempt.finished_at)}</td>
            <td><strong>Duración:</strong> {fmtDuration(attempt.duration_seconds)} min</td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          border: '2px solid #22b14c',
          borderRadius: 10,
          padding: 12,
          textAlign: 'center',
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: '11pt', textTransform: 'uppercase', letterSpacing: 1 }}>Calificación</div>
        <div style={{ fontSize: '32pt', fontWeight: 800 }}>{fmtGrade(attempt.grade)}</div>
        <div style={{ fontSize: '10pt' }}>
          {attempt.performance} · {attempt.score_pct}% de aciertos
        </div>
      </div>

      <h3 style={{ fontSize: '12pt', margin: '0 0 4px' }}>Resultado por nivel</h3>
      <table style={{ width: '100%', fontSize: '10pt', borderCollapse: 'collapse', marginBottom: 16 }}>
        <thead>
          <tr>
            {exam.sections.map((s) => (
              <th key={s.n} style={{ border: '1px solid #999', padding: 4 }}>{s.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {exam.sections.map((s) => (
              <td key={s.n} style={{ border: '1px solid #999', padding: 4, textAlign: 'center' }}>
                {attempt.scores?.sections?.[s.n]?.pct ?? 0}%
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {profile && (
        <div style={{ fontSize: '10.5pt' }}>
          <h3 style={{ fontSize: '12pt', margin: '0 0 4px' }}>Retroalimentación</h3>
          <p style={{ margin: '2px 0 6px' }}>{profile.summary}</p>
          <p style={{ margin: '2px 0' }}>
            <strong>Puntos fuertes:</strong>{' '}
            {profile.strengths.length ? profile.strengths.join('; ') : 'Aún por consolidar.'}
          </p>
          <p style={{ margin: '2px 0' }}>
            <strong>Áreas de mejora:</strong>{' '}
            {profile.improvements.length ? profile.improvements.join('; ') : '—'}
          </p>
          <p style={{ margin: '2px 0' }}>
            <strong>Deficiencias:</strong>{' '}
            {profile.deficiencies.length ? profile.deficiencies.join('; ') : '—'}
          </p>
          <p style={{ margin: '6px 0 2px' }}>
            <strong>Recomendaciones:</strong> {profile.recommendations.join(' ')}
          </p>
          {attempt.teacher_comment && (
            <p style={{ margin: '6px 0 0' }}>
              <strong>Comentario del profesor:</strong> {attempt.teacher_comment}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
