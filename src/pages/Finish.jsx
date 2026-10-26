import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Mascot from '../components/Mascot.jsx';
import SchoolLogo from '../components/SchoolLogo.jsx';
import DepthButton from '../components/DepthButton.jsx';
import ConfettiBurst from '../components/ConfettiBurst.jsx';
import { clearCurrentStudent } from '../lib/session.js';

/*
 * Pantalla de cierre. Mensaje NEUTRO: el alumno NO ve su calificacion
 * (eso solo lo ve el profesor en el portal). Si festeja su mejor racha.
 */
export default function Finish() {
  const navigate = useNavigate();
  const location = useLocation();
  const best = location.state && location.state.bestStreak;
  const timeUp = Boolean(location.state && location.state.timeUp);

  const done = () => {
    clearCurrentStudent();
    navigate('/', { replace: true });
  };

  return (
    <div className="flex min-h-full items-center justify-center bg-paper px-4 py-10">
      <ConfettiBurst />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card w-full max-w-md text-center"
      >
        <SchoolLogo className="mx-auto mb-4 h-14" />
        <div className="mx-auto mb-2 w-fit">
          <Mascot pose="cheer" size={150} />
        </div>
        <h1 className="text-3xl font-800 text-ink">
          {timeUp ? "Time's up! ⏰" : 'Mission complete! 🎉'}
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          {timeUp
            ? 'Your test was sent automatically with all your answers. Great effort!'
            : 'Great job! Your answers were saved. Your teacher will review your results.'}
        </p>

        {best > 0 && (
          <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-2xl border-2 border-sun-500 bg-sun-50 px-5 py-3">
            <span className="text-3xl" aria-hidden="true">🔥</span>
            <span className="text-left">
              <span className="block text-xs font-800 uppercase tracking-widest text-sun-600">Best streak</span>
              <span className="font-display text-2xl font-800 tabular-nums text-ink">{best} in a row</span>
            </span>
          </div>
        )}

        <DepthButton variant="sky" className="mt-8 w-full" onClick={done}>
          CLOSE
        </DepthButton>
      </motion.div>
    </div>
  );
}
