/*
 * Capa de persistencia local (localStorage).
 *
 * Se usa para tres cosas:
 *  1. Autoguardado del examen en curso (reanudar tras recargar / corte de luz).
 *  2. Modo local completo: si NO hay variables de Supabase, los intentos
 *     terminados se guardan aqui y el panel de admin los lee de aqui.
 *  3. Cola offline: si al enviar a Supabase falla la red, el intento queda
 *     en cola y se reintenta luego.
 *
 * Las llaves llevan el prefijo "iot:" para no chocar con el examen de ingles
 * si ambos se abren en el mismo dominio.
 *
 * Todas las lecturas/escrituras van envueltas en try/catch: en algunos equipos
 * escolares el almacenamiento puede estar restringido.
 */

const K_PROGRESS = 'iot:progreso:'; // + MATRICULA
const K_ATTEMPTS = 'iot:intentos'; // array (modo local)
const K_QUEUE = 'iot:cola'; // array (pendientes de sincronizar)
const K_INDEX = 'iot:matriculas'; // { MATRICULA: fechaISO } entregas hechas

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* sin efecto */
  }
}

/* ------------------------------------------------------------------ */
/*  1. Autoguardado del examen en curso                                */
/* ------------------------------------------------------------------ */

export function loadProgress(matricula) {
  if (!matricula) return null;
  return readJSON(K_PROGRESS + matricula, null);
}

export function saveProgress(matricula, data) {
  if (!matricula) return false;
  return writeJSON(K_PROGRESS + matricula, { ...data, savedAt: Date.now() });
}

export function clearProgress(matricula) {
  if (!matricula) return;
  removeKey(K_PROGRESS + matricula);
}

/* ------------------------------------------------------------------ */
/*  2. Intentos terminados (modo local) + indice de entregas           */
/* ------------------------------------------------------------------ */

export function listLocalAttempts() {
  const arr = readJSON(K_ATTEMPTS, []);
  return Array.isArray(arr) ? arr : [];
}

export function saveLocalAttempt(attempt) {
  const all = listLocalAttempts();
  const idx = all.findIndex((a) => a.id === attempt.id);
  if (idx >= 0) all[idx] = attempt;
  else all.push(attempt);
  writeJSON(K_ATTEMPTS, all);
  markSubmitted(attempt.matricula, attempt.finished_at);
  return attempt;
}

export function updateLocalAttempt(id, patch) {
  const all = listLocalAttempts();
  const idx = all.findIndex((a) => a.id === id);
  if (idx < 0) return null;
  all[idx] = { ...all[idx], ...patch };
  writeJSON(K_ATTEMPTS, all);
  return all[idx];
}

export function deleteLocalAttempt(id) {
  const all = listLocalAttempts();
  const target = all.find((a) => a.id === id);
  const next = all.filter((a) => a.id !== id);
  writeJSON(K_ATTEMPTS, next);
  if (target) unmarkSubmitted(target.matricula);
  return true;
}

/* Indice ligero MATRICULA -> fecha de entrega (para el chequeo "una sola vez"). */
export function getSubmittedIndex() {
  const obj = readJSON(K_INDEX, {});
  return obj && typeof obj === 'object' ? obj : {};
}

export function markSubmitted(matricula, whenISO) {
  if (!matricula) return;
  const obj = getSubmittedIndex();
  obj[matricula] = whenISO || new Date().toISOString();
  writeJSON(K_INDEX, obj);
}

export function unmarkSubmitted(matricula) {
  if (!matricula) return;
  const obj = getSubmittedIndex();
  delete obj[matricula];
  writeJSON(K_INDEX, obj);
}

export function localSubmissionDate(matricula) {
  return getSubmittedIndex()[matricula] || null;
}

/* ------------------------------------------------------------------ */
/*  3. Cola offline (pendientes de sincronizar con Supabase)           */
/* ------------------------------------------------------------------ */

export function getQueue() {
  const arr = readJSON(K_QUEUE, []);
  return Array.isArray(arr) ? arr : [];
}

export function enqueueAttempt(payload) {
  const q = getQueue();
  q.push({ ...payload, queuedAt: Date.now() });
  writeJSON(K_QUEUE, q);
}

export function setQueue(arr) {
  writeJSON(K_QUEUE, Array.isArray(arr) ? arr : []);
}

/* Utilidad para IDs locales (no dependemos de crypto.randomUUID en equipos viejos). */
export function makeId(prefix = 'loc') {
  const rnd = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}_${rnd}`;
}
