import { SCHOOL_NAME } from '../config.js';

/*
 * Logo de la institucion (PNG con fondo transparente en /public).
 * Aparece en todas las pantallas: registro, instrucciones, examen, cierre y
 * panel del profesor.
 */
export default function SchoolLogo({ className = 'h-12' }) {
  return (
    <img
      src="/logo-bvg.png"
      alt={`Logo ${SCHOOL_NAME}`}
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
