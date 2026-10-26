/*
 * API del panel de administrador. Misma interfaz en dos modos:
 *
 *   modo Supabase  (hay variables VITE_SUPABASE_*)
 *       -> llama a funciones RPC (iot_admin_*) que validan el codigo DENTRO
 *          de la base de datos. No hace falta ningun servidor propio.
 *   modo local     (sin Supabase)
 *       -> lee / escribe en localStorage; el codigo se compara con
 *          LOCAL_ADMIN_CODE de src/config.js.
 *
 * El codigo de administrador en modo Supabase se define en la funcion
 * `iot_admin_code_ok` de supabase/schema.sql (del lado del servidor).
 */
import { supabase, hasSupabase } from './supabase.js';
import { LOCAL_ADMIN_CODE } from '../config.js';
import {
  listLocalAttempts,
  updateLocalAttempt,
  deleteLocalAttempt,
} from './storage.js';

export const isLocalMode = !hasSupabase;

async function rpc(name, params) {
  const { data, error } = await supabase.rpc(name, params);
  if (error) {
    const err = new Error(error.message || 'Error en la base de datos');
    err.code = error.code;
    throw err;
  }
  return data;
}

// Normaliza un intento local al mismo "shape" de fila del modo Supabase.
function localToRow(a) {
  return {
    id: a.id,
    nombre: a.name || a.nombre || '',
    matricula: a.matricula || '',
    grado_grupo: a.grado_grupo || '',
    exam_id: a.exam_id || '',
    started_at: a.started_at,
    finished_at: a.finished_at,
    duration_seconds: a.duration_seconds,
    tab_switches: a.tab_switches,
    auto_ended: a.auto_ended,
    best_streak: a.best_streak,
    scores: a.scores,
    score_pct: a.score_pct,
    grade: a.grade,
    performance: a.performance,
    teacher_comment: a.teacher_comment || '',
  };
}

/* ---- Verificar codigo ---- */
export async function verifyCode(code) {
  if (isLocalMode) return code === LOCAL_ADMIN_CODE;
  const ok = await rpc('iot_admin_check', { p_code: code });
  return ok === true;
}

/* ---- Lista de resultados ---- */
export async function fetchRows(code) {
  if (isLocalMode) return listLocalAttempts().map(localToRow).reverse();
  const rows = await rpc('iot_admin_list_attempts', { p_code: code });
  return Array.isArray(rows) ? rows : [];
}

/* ---- Detalle de un alumno ---- */
export async function fetchDetail(code, id) {
  if (isLocalMode) {
    const a = listLocalAttempts().find((x) => x.id === id);
    if (!a) throw new Error('Intento no encontrado.');
    return { ...localToRow(a), answers: a.answers || {} };
  }
  return rpc('iot_admin_get_attempt', { p_code: code, p_id: id });
}

/* ---- Guardar el comentario del profesor ---- */
export async function saveComment(code, id, comment) {
  const text = String(comment || '');
  if (isLocalMode) {
    const a = updateLocalAttempt(id, { teacher_comment: text });
    return a ? { ...localToRow(a), answers: a.answers || {} } : null;
  }
  return rpc('iot_admin_save_comment', { p_code: code, p_id: id, p_comment: text });
}

/* ---- Eliminar un intento (permite repetir el examen) ---- */
export async function removeAttempt(code, id) {
  if (isLocalMode) {
    deleteLocalAttempt(id);
    return { ok: true };
  }
  await rpc('iot_admin_delete_attempt', { p_code: code, p_id: id });
  return { ok: true };
}
