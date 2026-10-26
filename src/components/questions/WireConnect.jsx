import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { shuffledOptions } from '../../lib/prng.js';

/*
 * "Connect the wires": conectar cada enchufe de la izquierda con su pareja de
 * la derecha. Se dibuja un cable de color (curva SVG) entre los dos.
 * - Clic en un enchufe -> queda activo (aparece un cable punteado que sigue
 *   al puntero). Clic en un conector de la derecha -> se conecta.
 * - Tambien se puede ARRASTRAR del enchufe al conector.
 * - Clic en un enchufe o conector ya conectado -> se desconecta.
 * - Teclado: Tab + Enter/Espacio.
 *
 * pairs: [left, right][]   (el orden de la derecha se baraja por matricula)
 * value: { [left]: right }
 */
const CABLES = ['#1ca0e6', '#22b14c', '#ffb703', '#f5473d', '#7c3aed', '#14b8a6'];

export default function WireConnect({
  question,
  value,
  onChange,
  revealed,
  disabled,
  matricula = 'x',
}) {
  const lefts = useMemo(() => (question.pairs || []).map((p) => p[0]), [question.pairs]);
  const rights = useMemo(
    () => shuffledOptions((question.pairs || []).map((p) => p[1]), matricula, question.id),
    [question.pairs, matricula, question.id],
  );
  const map = value && typeof value === 'object' ? value : {};
  const rightToLeft = {};
  Object.entries(map).forEach(([l, r]) => {
    rightToLeft[r] = l;
  });

  const boxRef = useRef(null);
  const leftRefs = useRef({});
  const rightRefs = useRef({});
  const dragging = useRef(false);
  const skipClick = useRef(false);
  const [active, setActive] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [points, setPoints] = useState({ size: { w: 0, h: 0 }, left: {}, right: {} });

  // Mide la posicion de cada enchufe/conector relativa al contenedor.
  const measure = useCallback(() => {
    const box = boxRef.current;
    if (!box) return;
    const b = box.getBoundingClientRect();
    const left = {};
    const right = {};
    lefts.forEach((l) => {
      const el = leftRefs.current[l];
      if (!el) return;
      const r = el.getBoundingClientRect();
      left[l] = { x: r.right - b.left, y: r.top + r.height / 2 - b.top };
    });
    rights.forEach((rt) => {
      const el = rightRefs.current[rt];
      if (!el) return;
      const r = el.getBoundingClientRect();
      right[rt] = { x: r.left - b.left, y: r.top + r.height / 2 - b.top };
    });
    setPoints({ size: { w: b.width, h: b.height }, left, right });
  }, [lefts, rights]);

  useLayoutEffect(() => {
    measure();
    const box = boxRef.current;
    if (!box || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, [measure]);

  const colorFor = (left) => CABLES[lefts.indexOf(left) % CABLES.length];

  const connect = (left, right) => {
    if (disabled || left == null) return;
    const next = { ...map };
    // Un conector solo admite un cable.
    if (rightToLeft[right]) delete next[rightToLeft[right]];
    next[left] = right;
    onChange(next);
    setActive(null);
    setCursor(null);
  };

  const pickLeft = (l) => {
    if (disabled) return;
    if (skipClick.current) {
      // El pointerdown ya lo activo: el click que sigue no debe desactivarlo.
      skipClick.current = false;
      return;
    }
    if (map[l]) {
      const next = { ...map };
      delete next[l];
      onChange(next);
      setActive(null);
      return;
    }
    setActive((cur) => (cur === l ? null : l));
  };

  const pickRight = (r) => {
    if (disabled) return;
    if (active != null) {
      connect(active, r);
      return;
    }
    if (rightToLeft[r]) {
      const next = { ...map };
      delete next[rightToLeft[r]];
      onChange(next);
    }
  };

  const relPoint = (e) => {
    const b = boxRef.current.getBoundingClientRect();
    return { x: e.clientX - b.left, y: e.clientY - b.top };
  };

  const onPointerMove = (e) => {
    if (active == null) return;
    setCursor(relPoint(e));
  };

  const onPointerUp = (e) => {
    if (!dragging.current) return;
    dragging.current = false;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    // Si se solto fuera del enchufe de origen no habra "click" que consuma la bandera.
    if (!(el && el.closest('[data-plug]') === leftRefs.current[active])) skipClick.current = false;
    const socket = el && el.closest('[data-socket]');
    if (socket && active != null) {
      connect(active, socket.getAttribute('data-socket'));
    }
  };

  const curve = (a, b) => {
    const dx = Math.max(40, (b.x - a.x) / 2);
    return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
  };

  const cableState = (left) => {
    if (!revealed) return undefined;
    const correct = (question.pairs || []).find((p) => p[0] === left);
    return correct && map[left] === correct[1] ? 'correct' : 'wrong';
  };

  return (
    <div
      ref={boxRef}
      className="relative grid grid-cols-2 gap-x-14 gap-y-3 sm:gap-x-24"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={() => setCursor(null)}
    >
      {/* Capa de cables */}
      <svg
        className="pointer-events-none absolute inset-0 overflow-visible"
        width={points.size.w}
        height={points.size.h}
        aria-hidden="true"
      >
        {Object.entries(map).map(([l, r]) => {
          const a = points.left[l];
          const b = points.right[r];
          if (!a || !b) return null;
          const st = cableState(l);
          const stroke = st === 'correct' ? '#22b14c' : st === 'wrong' ? '#f5473d' : colorFor(l);
          return (
            <g key={`${l}->${r}`}>
              <path d={curve(a, b)} stroke="#2b2d42" strokeOpacity="0.12" strokeWidth="10" fill="none" strokeLinecap="round" />
              <path
                d={curve(a, b)}
                stroke={stroke}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                className="wire-draw"
              />
            </g>
          );
        })}
        {active != null && cursor && points.left[active] && (
          <path
            d={curve(points.left[active], cursor)}
            stroke={colorFor(active)}
            strokeWidth="5"
            strokeDasharray="8 8"
            fill="none"
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* Columna izquierda: enchufes */}
      <ul className="relative space-y-3" aria-label="Plugs">
        {lefts.map((l) => {
          const connected = Boolean(map[l]);
          const isActive = active === l;
          return (
            <li key={l}>
              <button
                type="button"
                data-plug={l}
                ref={(el) => {
                  leftRefs.current[l] = el;
                }}
                disabled={disabled}
                aria-pressed={isActive}
                onClick={() => pickLeft(l)}
                onPointerDown={(e) => {
                  if (disabled || map[l]) return;
                  dragging.current = true;
                  skipClick.current = active !== l;
                  setActive(l);
                  setCursor(relPoint(e));
                }}
                style={{ touchAction: 'none', borderColor: connected || isActive ? colorFor(l) : undefined }}
                className={`relative flex min-h-[56px] w-full items-center rounded-2xl border-2 bg-white px-3 py-2 pr-5 text-left text-base font-700 text-ink transition-colors sm:text-lg ${
                  isActive ? 'ring-2 ring-sky-300' : connected ? '' : 'border-[#e4e6f1] hover:border-sky-400'
                }`}
              >
                <span className="flex-1">{l}</span>
                <span
                  aria-hidden="true"
                  className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-4 border-white shadow"
                  style={{ backgroundColor: colorFor(l) }}
                />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Columna derecha: conectores */}
      <ul className="relative space-y-3" aria-label="Sockets">
        {rights.map((r) => {
          const owner = rightToLeft[r];
          return (
            <li key={r}>
              <button
                type="button"
                data-socket={r}
                ref={(el) => {
                  rightRefs.current[r] = el;
                }}
                disabled={disabled}
                onClick={() => pickRight(r)}
                style={{ borderColor: owner ? colorFor(owner) : undefined }}
                className={`relative flex min-h-[56px] w-full items-center rounded-2xl border-2 bg-white px-3 py-2 pl-5 text-left text-sm font-600 text-ink transition-colors sm:text-base ${
                  owner ? '' : active != null ? 'border-sky-400 hover:bg-sky-50' : 'border-[#e4e6f1]'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-4 border-white shadow"
                  style={{ backgroundColor: owner ? colorFor(owner) : '#c4c8db' }}
                />
                <span className="flex-1">{r}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
