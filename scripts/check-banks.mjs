/*
 * Validador del contenido de los examenes:  node scripts/check-banks.mjs
 * Revisa que cada examen tenga QUESTIONS_PER_EXAM (65) reactivos, ids unicos, secciones y temas
 * validos, y que las respuestas correctas existan y obtengan puntaje 1.
 */
import { EXAMS } from '../src/data/exams.js';
import { scoreItem } from '../src/lib/answers.js';
import { QUESTIONS_PER_EXAM } from '../src/config.js';

let errors = 0;
const fail = (exam, q, msg) => {
  errors += 1;
  console.error(`✗ [${exam}] ${q ? q.id + ': ' : ''}${msg}`);
};

// Respuesta "perfecta" para cada tipo (simula al alumno que acierta todo).
function perfect(q) {
  switch (q.type) {
    case 'multiple-choice':
    case 'fact-or-fake':
      return q.answer;
    case 'gap-fill-bank':
      return q.answer.slice();
    case 'sentence-builder':
      return q.answer.split(' ');
    case 'sequence-order':
      return q.steps.slice();
    case 'word-select': {
      const toks = q.content.trim().split(/\s+/);
      const norm = (s) => s.toLowerCase().replace(/^[^\p{L}\p{N}]+/u, '').replace(/[^\p{L}\p{N}]+$/u, '');
      const want = new Set(q.answer.map(norm));
      return toks.map((t, i) => (want.has(norm(t)) ? i : -1)).filter((i) => i >= 0);
    }
    case 'wire-connect':
    case 'match-pairs':
      return Object.fromEntries(q.pairs);
    case 'sort-it':
      return Object.fromEntries(q.items);
    case 'word-guess':
      return q.answer.split('');
    default:
      return null;
  }
}

for (const exam of Object.values(EXAMS)) {
  const ids = new Set();
  const qs = exam.questions;
  if (qs.length !== QUESTIONS_PER_EXAM) fail(exam.id, null, `tiene ${qs.length} reactivos (deben ser ${QUESTIONS_PER_EXAM})`);
  const secs = new Set(exam.blocks.map((s) => s.n));
  const levels = new Set(exam.sections.map((s) => s.n));
  const perType = {};
  for (const q of qs) {
    perType[q.type] = (perType[q.type] || 0) + 1;
    if (ids.has(q.id)) fail(exam.id, q, 'id repetido');
    ids.add(q.id);
    if (!secs.has(q.block)) fail(exam.id, q, `bloque ${q.block} no existe en el banco`);
    if (!levels.has(q.section)) fail(exam.id, q, `nivel ${q.section} no existe`);
    if (!exam.topics[q.topic]) fail(exam.id, q, `tema "${q.topic}" no existe`);
    if (!q.prompt) fail(exam.id, q, 'falta prompt');
    if (q.type === 'multiple-choice' && !q.options.includes(q.answer)) fail(exam.id, q, 'answer no esta en options');
    if (q.type === 'multiple-choice' && new Set(q.options).size !== q.options.length) fail(exam.id, q, 'opciones repetidas');
    if (q.type === 'fact-or-fake' && !['Fact', 'Fake'].includes(q.answer)) fail(exam.id, q, 'answer debe ser Fact o Fake');
    if (q.type === 'sentence-builder' && q.tokens.slice().sort().join(' ') !== q.answer.split(' ').sort().join(' '))
      fail(exam.id, q, 'tokens y answer no coinciden');
    if (q.type === 'gap-fill-bank') {
      const blanks = (q.content.match(/___+/g) || []).length;
      if (blanks !== q.answer.length) fail(exam.id, q, `huecos (${blanks}) != respuestas (${q.answer.length})`);
      q.answer.forEach((w) => !q.bank.includes(w) && fail(exam.id, q, `"${w}" no esta en el banco`));
    }
    if (q.type === 'word-guess' && !/^[A-Z]+$/.test(q.answer)) fail(exam.id, q, 'answer debe ser una palabra en MAYUSCULAS');
    if ((q.type === 'wire-connect' || q.type === 'match-pairs') && new Set(q.pairs.map((p) => p[1])).size !== q.pairs.length)
      fail(exam.id, q, 'lados derechos repetidos');
    if (q.type === 'sort-it') {
      const cats = new Set(q.categories.map((c) => c.name));
      q.items.forEach(([it, c]) => !cats.has(c) && fail(exam.id, q, `"${it}" -> categoria inexistente "${c}"`));
    }
    if (q.type === 'word-select') {
      const n = perfect(q).length;
      if (n !== q.answer.length) fail(exam.id, q, `word-select: ${n} tokens coinciden, se esperaban ${q.answer.length}`);
    }
    const s = scoreItem(q, perfect(q));
    if (s !== 1) fail(exam.id, q, `la respuesta perfecta obtiene ${s}`);
  }
  // La mezcla: ningun par de preguntas seguidas del mismo tipo y cada nivel con variedad.
  qs.forEach((q, i) => {
    if (i > 0 && qs[i - 1].type === q.type) fail(exam.id, q, `mismo tipo que la anterior (${q.type})`);
  });
  exam.sections.forEach((lv) => {
    const kinds = new Set(qs.filter((q) => q.section === lv.n).map((q) => q.type));
    if (kinds.size < 5) fail(exam.id, null, `el nivel ${lv.n} solo tiene ${kinds.size} tipos distintos`);
  });
  const perSection = {};
  qs.forEach((q) => (perSection[q.section] = (perSection[q.section] || 0) + 1));
  console.log(`${exam.id}: ${qs.length} reactivos · por nivel ${JSON.stringify(perSection)} · por tipo ${JSON.stringify(perType)}`);
}

if (errors) {
  console.error(`\n${errors} error(es).`);
  process.exit(1);
}
console.log('\nOK: todos los bancos son validos.');
