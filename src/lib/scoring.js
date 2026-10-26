/*
 * CALIFICACION Y RETROALIMENTACION.
 *
 * Todas las funciones son PURAS (no leen ni escriben nada fuera de sus
 * argumentos).
 *
 * Reglas:
 *  1. Cada reactivo vale `points` (1 por defecto). Los reactivos de varias
 *     partes (cables, clasificar, huecos, ordenar pasos) dan credito parcial.
 *  2. Porcentaje = puntos obtenidos / puntos posibles.
 *  3. Calificacion = porcentaje / 10, en escala 0-10 con un decimal.
 *  4. Desempeno = banda de PERFORMANCE_BANDS (config.js) segun el porcentaje.
 *  5. Tambien se calcula el % por seccion (mundo) y por tema; con eso se arma
 *     la retroalimentacion automatica que ve el profesor.
 */
import { PERFORMANCE_BANDS } from '../config.js';
import { scoreItem, isBlank, expectedAnswer } from './answers.js';

const round1 = (n) => Math.round(n * 10) / 10;

// Primera letra en minuscula, salvo siglas como "IoT" (palabra con otra mayuscula).
const lcFirst = (text) => {
  const first = String(text).split(" ")[0];
  return /[A-Z]/.test(first.slice(1)) ? text : text.charAt(0).toLowerCase() + text.slice(1);
};

export function performanceFor(pct) {
  const p = Number(pct) || 0;
  return PERFORMANCE_BANDS.find((b) => p >= b.min) || PERFORMANCE_BANDS[PERFORMANCE_BANDS.length - 1];
}

export function gradeFromPct(pct) {
  return round1((Number(pct) || 0) / 10);
}

/* ------------------------------------------------------------------ */
/*  Calificacion completa de un intento                                */
/* ------------------------------------------------------------------ */
/*
 * Devuelve:
 * {
 *   total:    { pct, points, max, right, count, answered },
 *   sections: { [n]: { pct, points, max } },
 *   topics:   { [topic]: { pct, right, total } },
 *   grade:    8.5,
 *   performance: 'Muy bien'
 * }
 */
export function scoreAttempt(exam, answers = {}) {
  const total = { points: 0, max: 0, right: 0, count: 0, answered: 0 };
  const sections = {};
  const topics = {};

  exam.questions.forEach((q) => {
    const pts = typeof q.points === 'number' ? q.points : 1;
    const got = scoreItem(q, answers[q.id]) * pts;

    total.points += got;
    total.max += pts;
    total.count += 1;
    if (got === pts) total.right += 1;
    if (!isBlank(q, answers[q.id])) total.answered += 1;

    const s = (sections[q.section] = sections[q.section] || { points: 0, max: 0 });
    s.points += got;
    s.max += pts;

    const t = (topics[q.topic] = topics[q.topic] || { points: 0, max: 0, right: 0, total: 0 });
    t.points += got;
    t.max += pts;
    t.total += 1;
    if (got === pts) t.right += 1;
  });

  const pctOf = (o) => (o.max > 0 ? Math.round((o.points / o.max) * 100) : 0);

  const pct = pctOf(total);
  const outSections = {};
  Object.entries(sections).forEach(([n, s]) => {
    outSections[n] = { pct: pctOf(s), points: round1(s.points), max: s.max };
  });
  const outTopics = {};
  Object.entries(topics).forEach(([k, t]) => {
    outTopics[k] = { pct: pctOf(t), right: t.right, total: t.total };
  });

  return {
    total: { ...total, points: round1(total.points), pct },
    sections: outSections,
    topics: outTopics,
    grade: gradeFromPct(pct),
    performance: performanceFor(pct).label,
  };
}

/* ------------------------------------------------------------------ */
/*  Retroalimentacion automatica por tema (para el panel del profesor) */
/* ------------------------------------------------------------------ */
/*
 * A partir del % por tema:
 *   >= 80%  y con >= 2 reactivos  -> fortaleza
 *   55-79%                         -> area de mejora
 *   < 55%                          -> deficiencia
 *
 * Ademas arma un resumen en prosa y recomendaciones concretas usando la
 * pista (`hint`) de cada tema definida en el examen.
 */
export function topicProfile(exam, answers = {}) {
  const scored = scoreAttempt(exam, answers);
  const topicMeta = exam.topics || {};

  const strengths = [];
  const improvements = [];
  const deficiencies = [];
  const recommendations = [];

  Object.entries(scored.topics)
    .map(([key, t]) => ({ key, ...t, meta: topicMeta[key] || { es: key, hint: '' } }))
    .sort((a, b) => b.pct - a.pct)
    .forEach((t) => {
      const line = `${t.meta.es} — ${t.pct}% (${t.right}/${t.total})`;
      if (t.pct >= 80 && t.total >= 2) strengths.push(line);
      else if (t.pct >= 55) improvements.push(line);
      else {
        deficiencies.push(line);
        if (t.meta.hint) recommendations.push(`Repasar ${lcFirst(t.meta.es)}: ${t.meta.hint}.`);
      }
    });
  improvements.reverse();
  deficiencies.reverse();
  recommendations.reverse();

  // Seccion mas fuerte y mas debil (mundos del examen).
  const secs = (exam.sections || [])
    .map((s) => ({ ...s, pct: scored.sections[s.n] ? scored.sections[s.n].pct : 0 }))
    .sort((a, b) => b.pct - a.pct);
  const best = secs[0];
  const worst = secs[secs.length - 1];

  const blanks = scored.total.count - scored.total.answered;
  const parts = [];
  parts.push(
    `Obtuvo ${scored.total.pct}% (calificación ${scored.grade.toFixed(1)}/10, desempeño "${scored.performance}").`,
  );
  if (strengths.length) {
    parts.push(`Domina especialmente: ${strengths.map((s) => lcFirst(s.split(' — ')[0])).slice(0, 3).join(', ')}.`);
  }
  if (deficiencies.length) {
    parts.push(`Necesita reforzar: ${deficiencies.map((s) => lcFirst(s.split(' — ')[0])).slice(0, 3).join(', ')}.`);
  } else if (improvements.length) {
    parts.push(`Puede mejorar en: ${improvements.map((s) => lcFirst(s.split(' — ')[0])).slice(0, 3).join(', ')}.`);
  }
  if (best && worst && best.n !== worst.n) {
    parts.push(
      `Su mejor sección fue "${best.name}" (${best.pct}%) y la más difícil "${worst.name}" (${worst.pct}%).`,
    );
  }
  if (blanks > 0) {
    parts.push(`Dejó ${blanks} reactivo(s) en blanco.`);
  }

  if (recommendations.length === 0 && improvements.length > 0) {
    recommendations.push('Practicar con ejercicios cortos los temas marcados como área de mejora.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Proponerle un proyecto o reto extra para seguir avanzando.');
  }

  return {
    scored,
    strengths,
    improvements,
    deficiencies,
    recommendations,
    summary: parts.join(' '),
  };
}

/* ------------------------------------------------------------------ */
/*  Detalle de respuestas (para la vista de un alumno en el panel)     */
/* ------------------------------------------------------------------ */
export function answerReview(exam, answers = {}) {
  return exam.questions.map((q) => {
    const given = answers[q.id];
    const score = scoreItem(q, given);
    const answered = !isBlank(q, given);
    return {
      id: q.id,
      section: q.section,
      topic: q.topic,
      type: q.type,
      prompt: q.prompt,
      content: q.content,
      given: given === undefined ? null : given,
      expected: expectedAnswer(q),
      score,
      correct: score === 1,
      answered,
    };
  });
}
