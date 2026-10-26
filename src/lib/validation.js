/*
 * Validadores del formulario de registro. Funciones puras.
 * Los mensajes van en ingles: todo lo que ve el alumno esta en ingles.
 */
import { GRADE_VALUES } from '../config.js';

// Letras (con acentos y n), espacios, apostrofo y guion.
const NAME_RE = /^[A-Za-zÀ-ÿñÑ'’\-\s]+$/;

export function normalizeMatricula(value) {
  return String(value || '')
    .toUpperCase()
    .replace(/\s+/g, '');
}

export function validateName(value) {
  const v = String(value || '').trim();
  if (!v) return 'Enter your full name.';
  if (v.length < 5) return 'Your name must have at least 5 characters.';
  if (!NAME_RE.test(v)) return 'Use only letters, spaces and accents.';
  return '';
}

export function validateMatricula(value) {
  const v = normalizeMatricula(value);
  if (!v) return 'Your student ID is required.';
  if (v.length < 3) return 'Your student ID looks too short.';
  return '';
}

export function validateGradeGroup(value) {
  if (!value) return 'Select your grade and group.';
  if (!GRADE_VALUES.includes(value)) return 'Select a valid grade and group.';
  return '';
}

// Valida todo el formulario y devuelve { field: mensaje } solo con los errores.
export function validateRegistration({ name, matricula, gradeGroup }) {
  const errors = {};
  const n = validateName(name);
  const m = validateMatricula(matricula);
  const g = validateGradeGroup(gradeGroup);
  if (n) errors.name = n;
  if (m) errors.matricula = m;
  if (g) errors.gradeGroup = g;
  return errors;
}
