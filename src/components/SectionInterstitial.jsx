import { motion, useReducedMotion } from 'framer-motion';
import Mascot from './Mascot.jsx';
import DepthButton from './DepthButton.jsx';

/*
 * Pantalla intermedia entre niveles: numero de nivel, icono, nombre, una
 * frase motivadora y la mascota. Todo el texto del alumno va en ingles.
 */
export default function SectionInterstitial({ section, cheer, index, total, onContinue }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto flex max-w-lg flex-col items-center text-center"
    >
      <Mascot pose="cheer" size={140} />

      {/* Mapa de niveles: completados, actual y por venir */}
      <div className="mt-4 flex items-center gap-1.5" aria-label={`Level ${index} of ${total}`}>
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-3 rounded-full transition-all ${
              i + 1 < index ? 'w-6 bg-brand-500' : i + 1 === index ? 'w-10 bg-sky-500' : 'w-6 bg-[#e4e6f1]'
            }`}
          />
        ))}
      </div>

      <p className="mt-4 font-display text-sm font-700 uppercase tracking-widest text-sky-600">
        Level {index} of {total}
      </p>
      <h2 className="mt-1 text-3xl font-800 text-ink">
        <span aria-hidden="true">{section.icon}</span> {section.name}
      </h2>
      <p className="mt-3 text-lg font-700 text-brand-600">{cheer}</p>
      <p className="mt-2 text-ink-soft">{section.blurb}</p>
      <DepthButton variant="green" className="mt-8 w-full" onClick={onContinue} autoFocus>
        START LEVEL
      </DepthButton>
    </motion.div>
  );
}
