/*
 * Mascota: una laptop amistosa "conectada" (con antena, guino a IoT) dibujada con formas geometricas simples (SVG inline).
 * Sin imagenes externas, sin personajes con derechos de autor.
 *
 * pose: 'wave' | 'think' | 'cheer' | 'read' | 'idle'
 */
export default function Mascot({ pose = 'idle', size = 120, className = '' }) {
  const eyes =
    pose === 'think' ? (
      <>
        <circle cx="42" cy="46" r="4" fill="#2b2d42" />
        <circle cx="70" cy="46" r="4" fill="#2b2d42" />
        <circle cx="43" cy="45" r="1.4" fill="#fff" />
        <circle cx="71" cy="45" r="1.4" fill="#fff" />
      </>
    ) : (
      <>
        <circle cx="42" cy="45" r="5" fill="#2b2d42" />
        <circle cx="70" cy="45" r="5" fill="#2b2d42" />
        <circle cx="44" cy="43" r="1.6" fill="#fff" />
        <circle cx="72" cy="43" r="1.6" fill="#fff" />
      </>
    );

  const mouth =
    pose === 'cheer' ? (
      <path d="M44 58 Q56 74 68 58 Q56 66 44 58 Z" fill="#2b2d42" />
    ) : pose === 'think' ? (
      <path d="M48 62 L64 60" stroke="#2b2d42" strokeWidth="4" strokeLinecap="round" />
    ) : (
      <path
        d="M46 59 Q56 69 66 59"
        stroke="#2b2d42"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    );

  return (
    <svg
      viewBox="0 -4 112 100"
      width={size}
      height={(size * 100) / 112}
      role="img"
      aria-label="Test mascot"
      className={className}
    >
      {/* base / teclado */}
      <path d="M10 78 L102 78 L112 92 L0 92 Z" fill="#c9cee0" />
      <rect x="20" y="82" width="72" height="5" rx="2.5" fill="#aeb4cc" />

      {/* antena (conectada a Internet) */}
      <path d="M56 11 L56 3" stroke="#aeb4cc" strokeWidth="3" strokeLinecap="round" />
      <circle cx="56" cy="3" r="3.2" fill="#1ca0e6" />
      <path d="M48 4 Q56 -3 64 4" stroke="#1ca0e6" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />

      {/* pantalla */}
      <rect x="18" y="10" width="76" height="66" rx="10" fill="#ffffff" stroke="#c9cee0" strokeWidth="3" />
      <rect x="18" y="10" width="76" height="66" rx="10" fill="#eef7ff" opacity="0.6" />

      {/* cara */}
      {eyes}
      {mouth}

      {/* mejillas */}
      <circle cx="34" cy="55" r="4" fill="#ffd9d3" />
      <circle cx="78" cy="55" r="4" fill="#ffd9d3" />

      {/* brazo que saluda / anima */}
      {(pose === 'wave' || pose === 'cheer') && (
        <g
          style={{
            transformOrigin: '96px 60px',
            animation: 'pop 900ms ease-in-out infinite alternate',
          }}
        >
          <rect x="92" y="40" width="8" height="26" rx="4" fill="#22b14c" />
          <circle cx="96" cy="38" r="7" fill="#22b14c" />
        </g>
      )}

      {/* burbuja de pensamiento */}
      {pose === 'think' && (
        <g fill="#ffb703">
          <circle cx="100" cy="24" r="6" />
          <circle cx="108" cy="16" r="4" />
        </g>
      )}

      {/* libro / lectura */}
      {pose === 'read' && (
        <g>
          <path d="M40 84 Q56 78 72 84 L72 92 Q56 87 40 92 Z" fill="#1ca0e6" />
          <path d="M56 82 L56 92" stroke="#0f4f75" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}
