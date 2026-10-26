/*
 * Estado de sesion del navegador (sessionStorage): se borra al cerrar la pestana.
 *  - alumno actual: quien esta haciendo el examen ahora mismo.
 *  - sesion del admin: token efimero con caducidad.
 */
import { ADMIN_SESSION_HOURS } from '../config.js';

const K_STUDENT = 'iot:alumnoActual';
const K_ADMIN = 'iot:adminSesion';

function read(key, fallback) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function write(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* sin efecto */
  }
}
function clear(key) {
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* sin efecto */
  }
}

/* ---- Alumno actual ---- */
export function getCurrentStudent() {
  return read(K_STUDENT, null);
}
export function setCurrentStudent(student) {
  write(K_STUDENT, student);
}
export function clearCurrentStudent() {
  clear(K_STUDENT);
}

/* ---- Sesion del administrador ---- */
export function startAdminSession(code) {
  const expiresAt = Date.now() + ADMIN_SESSION_HOURS * 60 * 60 * 1000;
  write(K_ADMIN, { code, expiresAt });
}
export function getAdminSession() {
  const s = read(K_ADMIN, null);
  if (!s) return null;
  if (Date.now() > s.expiresAt) {
    clear(K_ADMIN);
    return null;
  }
  return s;
}
export function endAdminSession() {
  clear(K_ADMIN);
}
