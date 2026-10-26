/*
 * Operaciones sobre "intentos" que funcionan en los dos modos:
 *  - modo Supabase  (hay variables de entorno)
 *  - modo local     (localStorage)
 *
 */
import { supabase, hasSupabase } from './supabase.js';
import {
  localSubmissionDate,
  saveLocalAttempt,
  clearProgress,
  enqueueAttempt,
  markSubmitted,
  getQueue,
  setQueue,
} from './storage.js';

/*
 * Devuelve la fecha ISO de entrega si la matricula YA entrego el examen, o null.
 *
 * En modo Supabase se usa una funcion RPC (SECURITY DEFINER) llamada
 * `iot_student_submission_date`, definida en supabase/schema.sql: asi el alumno
 * anonimo puede saber si ya entrego sin poder leer los datos de nadie.
 */
export async function checkExistingSubmission(matricula) {
  const mat = String(matricula || '').trim().toUpperCase();
  if (!mat) return null;

  if (hasSupabase && supabase) {
    try {
      const { data, error } = await supabase.rpc('iot_student_submission_date', {
        p_matricula: mat,
      });
      if (error) {
        // Si la RPC no existe o falla, no bloqueamos el registro:
        // la restriccion UNIQUE de la base es la red de seguridad final.
        console.warn('checkExistingSubmission: RPC no disponible', error.message);
        return null;
      }
      return data || null;
    } catch (e) {
      console.warn('checkExistingSubmission: error de red', e);
      return null;
    }
  }

  return localSubmissionDate(mat);
}

/*
 * Manda un intento a Supabase mediante la RPC iot_submit_attempt (que hace el
 * upsert del alumno + el insert del intento del lado del servidor).
 * Trata "ya entrego" como exito idempotente (util al reintentar la cola).
 */
async function sendToSupabase(attempt) {
  const payload = {
    name: attempt.name,
    matricula: attempt.matricula,
    grado_grupo: attempt.grado_grupo,
    exam_id: attempt.exam_id,
    started_at: attempt.started_at,
    finished_at: attempt.finished_at,
    duration_seconds: attempt.duration_seconds,
    answers: attempt.answers,
    scores: attempt.scores,
    score_pct: attempt.score_pct,
    grade: attempt.grade,
    performance: attempt.performance,
    best_streak: attempt.best_streak,
    auto_ended: attempt.auto_ended,
    tab_switches: attempt.tab_switches,
  };
  const { data, error } = await supabase.rpc('iot_submit_attempt', { payload });
  if (error) {
    if (/ya entrego|already/i.test(error.message || '')) return null; // idempotente
    throw error;
  }
  return data;
}

/*
 * Envia un intento terminado.
 *
 *  - Modo local: guarda una copia permanente en localStorage.
 *  - Modo Supabase: intenta la RPC; si la red falla, deja el intento en una
 *    cola en localStorage y se reintenta luego (retryQueue). El alumno igual
 *    ve que "quedo guardado".
 *
 * Devuelve { ok, mode, queued }.
 */
export async function submitAttempt(attempt) {
  clearProgress(attempt.matricula);

  if (!hasSupabase || !supabase) {
    saveLocalAttempt(attempt); // copia permanente en modo local
    return { ok: true, mode: 'local', queued: false };
  }

  try {
    await sendToSupabase(attempt);
    markSubmitted(attempt.matricula, attempt.finished_at);
    return { ok: true, mode: 'supabase', queued: false };
  } catch (e) {
    console.warn('submitAttempt: sin conexion, el intento queda en cola', e);
    enqueueAttempt(attempt);
    markSubmitted(attempt.matricula, attempt.finished_at);
    return { ok: true, mode: 'supabase', queued: true };
  }
}

/*
 * Reintenta enviar los intentos que quedaron en cola (por fallo de red).
 * Se llama al arrancar la app y cuando el navegador vuelve a estar "online".
 */
export async function retryQueue() {
  if (!hasSupabase || !supabase) return;
  const q = getQueue();
  if (q.length === 0) return;
  const remaining = [];
  for (const item of q) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await sendToSupabase(item);
    } catch {
      remaining.push(item);
    }
  }
  setQueue(remaining);
}
