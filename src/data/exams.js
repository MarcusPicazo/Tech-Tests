/*
 * Catalogo de examenes. El grado del alumno decide cual le toca:
 *   1A / 1B -> IoT (1st grade)
 *   2A / 2B -> IoT (2nd grade)
 *   3A / 3B -> Cybersecurity (3rd grade)
 *
 * Cada banco (src/data/banks/*.js) exporta { topics, sections, questions }.
 * En el banco las preguntas estan agrupadas por TIPO en "bloques" (`section`
 * del banco = bloque, de lo mas facil a lo mas dificil). Aqui se MEZCLAN:
 * el alumno ve 5 niveles de 13 preguntas donde los tipos se van alternando
 * (opcion multiple, cables, ordenar palabras, adivinar, clasificar...).
 * La mezcla es fija (igual para todos los alumnos) y cada tipo conserva su
 * orden de dificultad del banco.
 *
 * Para agregar o quitar preguntas solo hay que editar el banco.
 */
import * as iot1 from './banks/iot1.js';
import * as iot2 from './banks/iot2.js';
import * as cyber3 from './banks/cyber3.js';

const IOT_LEVELS = [
  { n: 1, name: 'Power On', icon: '⚡', blurb: 'A warm-up mix: choose, connect, build and guess!' },
  { n: 2, name: 'Connect & Build', icon: '🔌', blurb: 'Wires, words and questions — all mixed up!' },
  { n: 3, name: 'Gadget Lab', icon: '🧪', blurb: 'Halfway there! Every question is a surprise.' },
  { n: 4, name: 'Fun Mix', icon: '🎮', blurb: 'Relax and have fun — every answer still counts.' },
  { n: 5, name: 'Final Mission', icon: '🚀', blurb: 'Last level! Use everything you know.' },
];

const CYBER_LEVELS = [
  { n: 1, name: 'Log In', icon: '🔐', blurb: 'A warm-up mix: choose, connect, build and guess!' },
  { n: 2, name: 'Connect & Protect', icon: '🔌', blurb: 'Wires, words and questions — all mixed up!' },
  { n: 3, name: 'Cyber Lab', icon: '🧪', blurb: 'Halfway there! Every question is a surprise.' },
  { n: 4, name: 'Fun Mix', icon: '🎮', blurb: 'Relax and have fun — every answer still counts.' },
  { n: 5, name: 'Cyber Mission', icon: '🛡️', blurb: 'Last level! Stop. Think. Check. Protect.' },
];

/*
 * Mezcla las preguntas del banco:
 *  1. Cada tipo se reparte a lo largo de TODO el examen (la k-esima pregunta
 *     de un tipo con n preguntas va cerca de la posicion (k + 0.5) / n).
 *  2. Se evita que salgan dos preguntas seguidas del mismo tipo.
 *  3. Se corta en niveles del mismo tamano y se reasigna `section` al nivel
 *     (el bloque original queda en `block`).
 */
export function mixQuestions(questions, levelCount) {
  const total = questions.length;
  const byType = {};
  questions.forEach((q) => {
    (byType[q.type] = byType[q.type] || []).push(q);
  });
  const typeOrder = Object.keys(byType);

  const placed = [];
  typeOrder.forEach((type, ti) => {
    const list = byType[type];
    list.forEach((q, k) => {
      placed.push({ q, target: ((k + 0.5) * total) / list.length + ti * 0.001 });
    });
  });
  placed.sort((a, b) => a.target - b.target);

  const remaining = placed.map((p) => p.q);
  const ordered = [];
  while (remaining.length) {
    const last = ordered[ordered.length - 1];
    let idx = remaining.findIndex((q) => !last || q.type !== last.type);
    if (idx < 0) idx = 0;
    ordered.push(remaining.splice(idx, 1)[0]);
  }

  const perLevel = Math.ceil(total / levelCount);
  return ordered.map((q, i) => ({
    ...q,
    block: q.section,
    section: Math.min(levelCount, Math.floor(i / perLevel) + 1),
  }));
}

function buildExam(meta, bank, levels) {
  return {
    ...meta,
    topics: bank.topics,
    blocks: bank.sections,
    sections: levels,
    questions: mixQuestions(bank.questions, levels.length),
  };
}

export const EXAMS = {
  'iot-1': buildExam(
    { id: 'iot-1', title: 'Internet of Things', short: 'IoT · 1st grade', icon: '🌐' },
    iot1,
    IOT_LEVELS,
  ),
  'iot-2': buildExam(
    { id: 'iot-2', title: 'Internet of Things', short: 'IoT · 2nd grade', icon: '📡' },
    iot2,
    IOT_LEVELS,
  ),
  'cyber-3': buildExam(
    { id: 'cyber-3', title: 'Cybersecurity', short: 'Cybersecurity · 3rd grade', icon: '🛡️' },
    cyber3,
    CYBER_LEVELS,
  ),
};

const BY_GRADE = { 1: 'iot-1', 2: 'iot-2', 3: 'cyber-3' };

export function examIdForGrade(gradeGroup) {
  return BY_GRADE[String(gradeGroup || '').charAt(0)] || null;
}

export function examForGrade(gradeGroup) {
  const id = examIdForGrade(gradeGroup);
  return id ? EXAMS[id] : null;
}

export function sectionOf(exam, n) {
  return (exam.sections || []).find((s) => s.n === n) || null;
}

// Preguntas "de juego" (se marcan con la etiqueta "Fun question").
export function isFunQuestion(q) {
  return (
    q.type === 'fact-or-fake' ||
    q.type === 'sort-it' ||
    /^(odd one out|just for fun)/i.test(q.prompt || '')
  );
}

// Frase motivadora que se muestra al ENTRAR a cada nivel.
export const SECTION_CHEERS = [
  "You've got this!",
  'Nice and steady.',
  'Halfway there!',
  'Fun time! 🎉',
  'Final mission — go!',
];
