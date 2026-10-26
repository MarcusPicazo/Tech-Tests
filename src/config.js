/*
 * Configuracion central de la plataforma.
 * Todo lo que el profesor podria querer ajustar vive aqui.
 */

// --- Modo de retroalimentacion ---
// false  -> examen: el alumno NO ve si acerto (solo avanza).
// true   -> modo practica: muestra verde/rojo tras cada respuesta.
export const SHOW_IMMEDIATE_FEEDBACK = false;

// --- Tiempo ---
export const EXAM_MINUTES = 45; // temporizador global: al llegar a 0 el examen se envia solo
export const TIME_WARNINGS_MIN = [10, 5]; // avisos visuales (minutos restantes)

// --- Numero de preguntas por examen (lo revisa scripts/check-banks.mjs) ---
export const QUESTIONS_PER_EXAM = 65;

// --- Grados y grupos ---
// El primer caracter del grupo decide que examen le toca al alumno
// (ver src/data/exams.js): 1 y 2 -> IoT, 3 -> Ciberseguridad.
export const GRADE_OPTIONS = [
  { value: '1A', label: '1st grade · Group A' },
  { value: '1B', label: '1st grade · Group B' },
  { value: '2A', label: '2nd grade · Group A' },
  { value: '2B', label: '2nd grade · Group B' },
  { value: '3A', label: '3rd grade · Group A' },
  { value: '3B', label: '3rd grade · Group B' },
];
export const GRADE_VALUES = GRADE_OPTIONS.map((g) => g.value);

// --- Escala de calificacion ---
// Calificacion = % de aciertos / 10 (escala 0-10, un decimal).
// Desempeno segun el porcentaje (de mayor a menor).
export const PERFORMANCE_BANDS = [
  { min: 90, label: 'Excelente', color: '#22b14c' },
  { min: 80, label: 'Muy bien', color: '#43c574' },
  { min: 70, label: 'Bien', color: '#1ca0e6' },
  { min: 60, label: 'Suficiente', color: '#ffb703' },
  { min: 0, label: 'Necesita reforzar', color: '#f5473d' },
];

// --- Codigo de administrador para MODO LOCAL (sin Supabase) ---
// SOLO se usa para probar en una computadora sin Supabase (los datos viven en
// ese navegador). En modo Supabase el codigo real se guarda en la tabla
// iot_settings de la base de datos (ver supabase/schema.sql), nunca aqui.
export const LOCAL_ADMIN_CODE = 'prueba-local';

// --- Sesion del panel de administrador ---
export const ADMIN_SESSION_HOURS = 2;

// --- Identidad del colegio (encabezados, reporte impreso, pantallas) ---
export const SCHOOL_NAME = 'Escuela Berta von Glumer';
export const DEPARTMENT = 'CIT'; // area que aplica el examen (computo / tecnologia)
export const REPORT_SUBTITLE =
  'Examen de Tecnología (IoT / Ciberseguridad) · CIT — Escuela Berta von Glumer';
