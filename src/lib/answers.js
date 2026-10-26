/*
 * Utilidades sobre respuestas: saber si una respuesta esta en blanco y cuanto
 * vale (0..1). Se usan tanto para la retroalimentacion inmediata (modo
 * practica) como para la calificacion final (src/lib/scoring.js).
 *
 * Convenciones por tipo de reactivo (ver tambien src/data/banks/*.js):
 *
 *  multiple-choice
 *      options: string[]   answer: string          value: string | null
 *  fact-or-fake
 *      answer: 'Fact' | 'Fake'                     value: 'Fact' | 'Fake' | null
 *  gap-fill-bank
 *      content con "___"    bank: string[]          answer: string[] (una por hueco)
 *      value: (string|null)[]  (misma longitud que answer)
 *  sentence-builder
 *      tokens: string[]     answer: string (oracion correcta)
 *      value: string[] (orden elegido)
 *  sequence-order
 *      steps: string[] (en el orden CORRECTO; se barajan en pantalla)
 *      value: string[] (orden elegido)
 *  word-select
 *      content: string      answer: string[] (formas de palabra correctas)
 *      value: number[] (indices de tokens seleccionados)
 *  wire-connect / match-pairs
 *      pairs: [left, right][]                       value: { [left]: right }
 *  sort-it
 *      categories: string[]  items: [item, categoria][]
 *      value: { [item]: categoria }
 *  word-guess
 *      answer: string (una palabra, MAYUSCULAS)     extra: string (letras distractoras)
 *      value: string[] (letras elegidas, en orden)
 *
 * Credito parcial: wire-connect, match-pairs, sort-it, gap-fill-bank y
 * sequence-order valen la fraccion de partes correctas. El resto es 0 o 1.
 */

export function countBlanks(content) {
  const m = String(content || '').match(/___+/g);
  return m ? m.length : 0;
}

export function wordCount(text) {
  return String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

// Tokeniza un texto por espacios, conservando la puntuacion pegada al token.
export function tokenize(text) {
  return String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

// Normaliza un token para comparar: minusculas y sin puntuacion en los extremos.
export function normToken(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/^[^\p{L}\p{N}]+/u, '')
    .replace(/[^\p{L}\p{N}]+$/u, '');
}

function normSentence(s) {
  return String(s || '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Indices de tokens que cuentan como correctos en un word-select.
export function expectedWordSelectIndices(question) {
  const tokens = tokenize(question.content);
  const wanted = new Set((question.answer || []).map(normToken));
  const out = [];
  tokens.forEach((tk, i) => {
    if (wanted.has(normToken(tk))) out.push(i);
  });
  return out;
}

// Respuesta correcta "completa" para mostrar en el panel.
export function expectedAnswer(question) {
  switch (question.type) {
    case 'wire-connect':
    case 'match-pairs':
      return Object.fromEntries(question.pairs || []);
    case 'sort-it':
      return Object.fromEntries(question.items || []);
    case 'sequence-order':
      return question.steps || [];
    default:
      return question.answer ?? null;
  }
}

export function isBlank(question, value) {
  switch (question.type) {
    case 'multiple-choice':
    case 'fact-or-fake':
      return value === null || value === undefined || value === '';
    case 'gap-fill-bank':
      return !Array.isArray(value) || value.every((v) => v === null || v === undefined || v === '');
    case 'sentence-builder':
    case 'sequence-order':
    case 'word-select':
    case 'word-guess':
      return !Array.isArray(value) || value.length === 0;
    case 'wire-connect':
    case 'match-pairs':
    case 'sort-it':
      return !value || typeof value !== 'object' || Object.keys(value).length === 0;
    default:
      return value === null || value === undefined || value === '';
  }
}

/*
 * Puntaje de un reactivo entre 0 y 1 (credito parcial donde aplica).
 */
export function scoreItem(question, value) {
  if (isBlank(question, value)) return 0;

  switch (question.type) {
    case 'multiple-choice':
    case 'fact-or-fake':
      return value === question.answer ? 1 : 0;

    case 'gap-fill-bank': {
      const expected = question.answer || [];
      if (!Array.isArray(value) || expected.length === 0) return 0;
      const ok = expected.filter((w, i) => normToken(value[i]) === normToken(w)).length;
      return ok / expected.length;
    }

    case 'sentence-builder':
      return normSentence(value.join(' ')) === normSentence(question.answer) ? 1 : 0;

    case 'sequence-order': {
      const steps = question.steps || [];
      if (steps.length === 0) return 0;
      const ok = steps.filter((s, i) => value[i] === s).length;
      return ok / steps.length;
    }

    case 'word-select': {
      const expected = expectedWordSelectIndices(question);
      const got = [...new Set(value)].sort((a, b) => a - b);
      if (got.length !== expected.length) return 0;
      return expected.every((idx, i) => idx === got[i]) ? 1 : 0;
    }

    case 'wire-connect':
    case 'match-pairs': {
      const pairs = question.pairs || [];
      if (pairs.length === 0) return 0;
      const ok = pairs.filter(([left, right]) => value[left] === right).length;
      return ok / pairs.length;
    }

    case 'sort-it': {
      const items = question.items || [];
      if (items.length === 0) return 0;
      const ok = items.filter(([item, cat]) => value[item] === cat).length;
      return ok / items.length;
    }

    case 'word-guess':
      return value.join('').toUpperCase() === String(question.answer || '').toUpperCase() ? 1 : 0;

    default:
      return 0;
  }
}

// true solo si el reactivo vale el punto completo.
export function isCorrect(question, value) {
  return scoreItem(question, value) === 1;
}
