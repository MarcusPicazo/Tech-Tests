import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Mascot from '../components/Mascot.jsx';
import SchoolLogo from '../components/SchoolLogo.jsx';
import DepthButton from '../components/DepthButton.jsx';
import { EXAM_MINUTES } from '../config.js';
import { EXAMS } from '../data/exams.js';
import { getCurrentStudent } from '../lib/session.js';

export default function Instructions() {
  const navigate = useNavigate();
  const student = getCurrentStudent();
  const exam = student ? EXAMS[student.examId] : null;

  useEffect(() => {
    if (!student || !exam) navigate('/', { replace: true });
  }, [student, exam, navigate]);

  if (!student || !exam) return null;

  const total = exam.questions.length;
  const points = [
    { icon: '⏱️', text: `You have ${EXAM_MINUTES} minutes. There is a timer at the top.` },
    { icon: '📨', text: 'When the time is over, the test closes and your answers are sent automatically.' },
    { icon: '🎯', text: `There are ${total} questions in ${exam.sections.length} levels.` },
    { icon: '🔥', text: 'Get answers right in a row to build your streak! A wrong or blank answer starts it again.' },
    { icon: '➡️', text: 'You cannot go back to previous questions.' },
    { icon: '🎮', text: 'Some levels are games: connect wires, build sentences, guess words. They all count, so have fun and do your best!' },
    { icon: '⬜', text: 'If you don’t know an answer, you can leave it blank.' },
  ];

  return (
    <div className="min-h-full bg-paper px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto max-w-2xl"
      >
        <div className="mb-4 flex justify-center">
          <SchoolLogo className="h-16" />
        </div>
        <div className="mb-3 flex items-center gap-3">
          <Mascot pose="read" size={92} />
          <div>
            <h1 className="text-2xl font-800 text-ink">Before you start</h1>
            <p className="text-ink-soft">
              {student.name} · {student.gradeGroup.charAt(0)}° {student.gradeGroup.charAt(1)}
            </p>
          </div>
        </div>

        <div className="card space-y-5">
          <div className="rounded-2xl bg-sky-50 p-4 text-center">
            <p className="text-sm font-700 uppercase tracking-widest text-sky-600">Your test</p>
            <p className="font-display text-2xl font-800 text-ink">
              {exam.icon} {exam.title}
            </p>
          </div>

          {/* Mapa de niveles */}
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {exam.sections.map((s) => (
              <div key={s.n} className="flex flex-col items-center rounded-2xl border-2 border-[#e4e6f1] bg-white p-2 text-center">
                <span className="text-2xl" aria-hidden="true">{s.icon}</span>
                <span className="text-xs font-800 leading-tight text-ink">{s.name}</span>
              </div>
            ))}
          </div>

          <ul className="space-y-3">
            {points.map((p) => (
              <li key={p.text} className="flex gap-3">
                <span aria-hidden="true" className="text-2xl leading-none">
                  {p.icon}
                </span>
                <p className="font-700 text-ink">{p.text}</p>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl bg-paper p-4 text-sm text-ink-soft">
            Your progress is saved on this computer. If the browser closes, sign in again with
            the same student ID to continue.
          </div>

          <DepthButton variant="green" className="w-full" onClick={() => navigate('/test')}>
            LET&apos;S GO!
          </DepthButton>
        </div>
      </motion.div>
    </div>
  );
}
