/* Utilidades de formato compartidas por el panel. */
import { EXAMS } from '../data/exams.js';
import { performanceFor } from '../lib/scoring.js';

export function fmtDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return String(iso);
  }
}

export function fmtDateShort(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return String(iso);
  }
}

export function fmtDuration(seconds) {
  const s = Number(seconds) || 0;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

export function fmtGrade(grade) {
  const g = Number(grade);
  return grade !== null && grade !== undefined && Number.isFinite(g) ? g.toFixed(1) : '—';
}

// Nombre corto del examen en espanol (para el profesor).
export const EXAM_LABELS = {
  'iot-1': 'IoT 1°',
  'iot-2': 'IoT 2°',
  'cyber-3': 'Ciberseguridad 3°',
};
export function examLabel(id) {
  return EXAM_LABELS[id] || id || '—';
}
export function examOf(row) {
  return EXAMS[row.exam_id] || null;
}

// Color de la banda de desempeno (para chips y graficas).
export function performanceColor(pct) {
  return performanceFor(pct).color;
}

export function sectionPct(row, n) {
  const v = row.scores && row.scores.sections && row.scores.sections[n];
  return v ? v.pct : null;
}

// Representacion legible de una respuesta (para el detalle del alumno).
export function formatAnswer(value) {
  if (value === null || value === undefined || value === '') return '(en blanco)';
  if (Array.isArray(value)) {
    if (value.length === 0) return '(en blanco)';
    // word-guess: letras sueltas -> palabra
    if (value.every((v) => typeof v === 'string' && v.length === 1)) return value.join('');
    return value.map((v) => (v === null ? '·' : String(v))).join('  →  ');
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) return '(en blanco)';
    return entries.map(([k, v]) => `${k} → ${v}`).join('  ·  ');
  }
  return String(value);
}
