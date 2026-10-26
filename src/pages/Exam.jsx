import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { EXAM_MINUTES, SHOW_IMMEDIATE_FEEDBACK } from '../config.js';
import { EXAMS, SECTION_CHEERS, isFunQuestion } from '../data/exams.js';
import { isBlank, isCorrect } from '../lib/answers.js';
import { scoreAttempt } from '../lib/scoring.js';
import { getCurrentStudent } from '../lib/session.js';
import {
  loadProgress,
  saveProgress,
  localSubmissionDate,
  makeId,
} from '../lib/storage.js';
import { submitAttempt } from '../lib/attempts.js';

import ProgressBar from '../components/ProgressBar.jsx';
import Timer from '../components/Timer.jsx';
import StreakCounter from '../components/StreakCounter.jsx';
import StreakToast from '../components/StreakToast.jsx';
import SectionInterstitial from '../components/SectionInterstitial.jsx';
import SchoolLogo from '../components/SchoolLogo.jsx';
import QuestionRenderer from '../components/questions/QuestionRenderer.jsx';
import DepthButton from '../components/DepthButton.jsx';
import { SkeletonCard } from '../components/Skeleton.jsx';
import { useTimer } from '../hooks/useTimer.js';
import { useTabSwitch } from '../hooks/useTabSwitch.js';

/*
 * Construye la lista ordenada de "pasos" del examen:
 *  - una pantalla intermedia antes de cada seccion (nivel)
 *  - un paso por reactivo
 */
function buildSteps(exam) {
  const steps = [];
  exam.sections.forEach((section, si) => {
    const items = exam.questions.filter((q) => q.section === section.n);
    if (items.length === 0) return;
    steps.push({
      kind: 'interstitial',
      section,
      cheer: SECTION_CHEERS[si] || 'Keep going!',
    });
    items.forEach((q, qi) =>
      steps.push({ kind: 'question', section, question: q, indexInSection: qi + 1, sectionSize: items.length }),
    );
  });
  return steps;
}

// Cada cuantas respuestas CORRECTAS seguidas aparece el festejo de racha.
const STREAK_MILESTONE = 5;

export default function Exam() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const student = getCurrentStudent();
  const exam = student ? EXAMS[student.examId] : null;

  const steps = useMemo(() => (exam ? buildSteps(exam) : []), [exam]);
  const totalAnswerable = useMemo(
    () => steps.filter((s) => s.kind !== 'interstitial').length,
    [steps],
  );

  const [ready, setReady] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startedAt, setStartedAt] = useState(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [toast, setToast] = useState(null);
  const [checked, setChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const tabSwitches = useTabSwitch(
    ready && !submitting,
    0,
    (n) => persist({ tabSwitches: n }),
  );
  // Espejo mutable para persistir sin depender del render.
  const stateRef = useRef({});
  stateRef.current = { stepIndex, answers, startedAt, streak, bestStreak, tabSwitches };

  function persist(partial = {}) {
    if (!student) return;
    const s = { ...stateRef.current, ...partial };
    saveProgress(student.matricula, {
      examId: student.examId,
      stepIndex: s.stepIndex,
      answers: s.answers,
      startedAt: s.startedAt,
      streak: s.streak,
      bestStreak: s.bestStreak,
      tabSwitches: s.tabSwitches,
    });
  }

  /* ---- Inicializacion / reanudacion ---- */
  useEffect(() => {
    if (!student || !exam) {
      navigate('/', { replace: true });
      return;
    }
    if (localSubmissionDate(student.matricula)) {
      // Ya entrego: no debe estar aqui.
      navigate('/', { replace: true });
      return;
    }
    const saved = loadProgress(student.matricula);
    if (saved && typeof saved.stepIndex === 'number' && (!saved.examId || saved.examId === exam.id)) {
      setStepIndex(Math.min(saved.stepIndex, steps.length - 1));
      setAnswers(saved.answers || {});
      setStartedAt(saved.startedAt || Date.now());
      setStreak(saved.streak || 0);
      setBestStreak(saved.bestStreak || 0);
    } else {
      const now = Date.now();
      setStartedAt(now);
      saveProgress(student.matricula, {
        examId: exam.id,
        stepIndex: 0,
        answers: {},
        startedAt: now,
        streak: 0,
        bestStreak: 0,
        tabSwitches: 0,
      });
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = steps[stepIndex];

  /* ---- Temporizador global ---- */
  const timeUpRef = useRef(false);
  const timer = useTimer(EXAM_MINUTES * 60, startedAt, () => {
    if (timeUpRef.current) return;
    timeUpRef.current = true;
    setTimeUp(true);
    finishExam(true);
  });

  /* ---- Respuestas ---- */
  const setAnswer = (qid, value) => {
    setAnswers((prev) => {
      const next = { ...prev, [qid]: value };
      persist({ answers: next });
      return next;
    });
  };

  const currentAnswered = () =>
    step.kind === 'interstitial' || !isBlank(step.question, answers[step.question.id]);

  const advance = () => {
    // La racha solo crece con respuestas 100% correctas; una incorrecta o en
    // blanco la regresa a 0. Las pantallas de nivel no la cambian.
    const isQuestion = step.kind === 'question';
    const right = isQuestion && isCorrect(step.question, answers[step.question.id]);
    const nextStreak = !isQuestion ? streak : right ? streak + 1 : 0;
    const nextBest = Math.max(bestStreak, nextStreak);

    if (right && nextStreak % STREAK_MILESTONE === 0) {
      setToast({ id: Date.now(), value: nextStreak });
    }

    if (stepIndex >= steps.length - 1) {
      setStreak(nextStreak);
      setBestStreak(nextBest);
      finishExam(false, nextBest);
      return;
    }
    const nextIndex = stepIndex + 1;
    setStepIndex(nextIndex);
    setStreak(nextStreak);
    setBestStreak(nextBest);
    setChecked(false);
    persist({ stepIndex: nextIndex, streak: nextStreak, bestStreak: nextBest });
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  const onPrimary = () => {
    if (submitting) return;
    if (
      SHOW_IMMEDIATE_FEEDBACK &&
      step.kind !== 'interstitial' &&
      !checked &&
      currentAnswered()
    ) {
      setChecked(true);
      return;
    }
    advance();
  };

  async function finishExam(byTimeout, finalBest) {
    if (submitting) return;
    setSubmitting(true);
    const now = Date.now();
    const answersNow = stateRef.current.answers;

    const scored = scoreAttempt(exam, answersNow);

    const attempt = {
      id: makeId('att'),
      matricula: student.matricula,
      name: student.name,
      grado_grupo: student.gradeGroup,
      exam_id: exam.id,
      started_at: new Date(startedAt || now).toISOString(),
      finished_at: new Date(now).toISOString(),
      duration_seconds: Math.max(0, Math.round((now - (startedAt || now)) / 1000)),
      answers: answersNow,
      tab_switches: tabSwitches,
      auto_ended: Boolean(byTimeout),
      best_streak: finalBest ?? stateRef.current.bestStreak,
      scores: scored,
      score_pct: scored.total.pct,
      grade: scored.grade,
      performance: scored.performance,
      teacher_comment: '',
    };
    try {
      await submitAttempt(attempt);
    } finally {
      navigate('/done', {
        replace: true,
        state: { bestStreak: attempt.best_streak, timeUp: Boolean(byTimeout) },
      });
    }
  }

  /* ---- Render ---- */
  if (!student || !exam) return null;

  if (!ready || !step) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <SkeletonCard />
      </div>
    );
  }

  const doneAnswerable = steps
    .slice(0, stepIndex)
    .filter((s) => s.kind !== 'interstitial').length;

  const isLast = stepIndex >= steps.length - 1;
  const primaryLabel =
    SHOW_IMMEDIATE_FEEDBACK && step.kind !== 'interstitial' && !checked
      ? 'CHECK'
      : isLast
        ? 'FINISH'
        : 'CONTINUE';
  const isFun = step.kind === 'question' && isFunQuestion(step.question);

  return (
    <div className="flex min-h-full flex-col bg-paper">
      {/* Encabezado fijo: progreso + tiempo + nivel + racha */}
      <header className="sticky top-0 z-10 border-b border-[#e4e6f1] bg-paper/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <SchoolLogo className="h-9 flex-none sm:h-10" />
          <ProgressBar value={doneAnswerable} total={totalAnswerable} />
          <Timer label={timer.label} minutesLeft={timer.minutesLeft} />
        </div>
        <div className="mx-auto mt-1.5 flex max-w-3xl items-center justify-between text-sm text-ink-soft">
          <span className="font-700">
            <span aria-hidden="true">{step.section.icon}</span> Level {step.section.n} ·{' '}
            {step.section.name}
            {step.kind === 'question' && (
              <span className="ml-2 font-600 text-ink-faint">
                {step.indexInSection}/{step.sectionSize}
              </span>
            )}
          </span>
          <StreakCounter value={streak} />
        </div>
      </header>

      <StreakToast toast={toast} />

      {/* Ultimo minuto: aviso de que el examen se enviara solo */}
      {!timeUp && timer.remaining > 0 && timer.remaining <= 60 && (
        <div className="sticky top-[86px] z-10 bg-coral-500 px-4 py-2 text-center font-700 text-white" role="alert">
          ⏰ Less than 1 minute left! Your test will be sent automatically.
        </div>
      )}

      {/* Se acabo el tiempo: se bloquea todo mientras se envia */}
      {timeUp && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-ink/60 px-4" role="alert">
          <div className="card max-w-sm text-center">
            <p className="text-5xl" aria-hidden="true">⏰</p>
            <p className="mt-2 font-display text-2xl font-800 text-ink">Time&apos;s up!</p>
            <p className="mt-1 text-ink-soft">Sending your answers…</p>
          </div>
        </div>
      )}

      {/* Area del examen: sin menu contextual y sin seleccion de texto */}
      <main
        className="no-select mx-auto w-full max-w-3xl flex-1 px-4 py-6"
        onContextMenu={(e) => e.preventDefault()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.22 }}
          >
            {step.kind === 'interstitial' ? (
              <SectionInterstitial
                section={step.section}
                cheer={step.cheer}
                index={step.section.n}
                total={exam.sections.length}
                onContinue={onPrimary}
              />
            ) : (
              <div className={`card ${isFun ? 'ring-4 ring-sun-400/40' : ''}`}>
                {isFun && (
                  <p className="mb-2 inline-flex items-center gap-1 rounded-full bg-sun-50 px-3 py-1 text-xs font-800 uppercase tracking-widest text-sun-600">
                    🎮 Fun question · just relax
                  </p>
                )}
                <p className="mb-4 font-display text-sm font-700 uppercase tracking-widest text-sky-600">
                  {step.question.prompt}
                </p>
                <QuestionRenderer
                  question={step.question}
                  value={answers[step.question.id]}
                  onChange={(v) => setAnswer(step.question.id, v)}
                  revealed={checked}
                  disabled={checked}
                  matricula={student.matricula}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Barra inferior con el boton grande (no aparece en las intermedias) */}
      {step.kind !== 'interstitial' && (
        <footer className="sticky bottom-0 border-t border-[#e4e6f1] bg-white px-4 py-3">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
            <span className="hidden text-sm text-ink-faint sm:block">
              {currentAnswered()
                ? 'Answer ready. Press CONTINUE.'
                : 'Not sure? You can leave it blank.'}
            </span>
            <DepthButton
              variant="green"
              className="ml-auto min-w-[180px]"
              onClick={onPrimary}
              disabled={submitting}
            >
              {submitting ? 'Saving…' : primaryLabel}
            </DepthButton>
          </div>
        </footer>
      )}
    </div>
  );
}
