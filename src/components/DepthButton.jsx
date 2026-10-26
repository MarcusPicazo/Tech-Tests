/*
 * Boton 3D estilo Duolingo (borde inferior mas oscuro que "se hunde" al pulsar).
 * Es un <button> real: accesible con teclado (Enter / Espacio) sin codigo extra.
 */
const VARIANTS = {
  green: 'btn-3d--green',
  sky: 'btn-3d--sky',
  sun: 'btn-3d--sun',
  ghost: 'btn-3d--ghost',
};

export default function DepthButton({
  variant = 'green',
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`btn-3d ${VARIANTS[variant] || VARIANTS.green} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
