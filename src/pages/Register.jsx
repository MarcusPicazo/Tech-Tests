import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Mascot from '../components/Mascot.jsx';
import SchoolLogo from '../components/SchoolLogo.jsx';
import DepthButton from '../components/DepthButton.jsx';
import { SCHOOL_NAME, DEPARTMENT } from '../config.js';
import { examForGrade } from '../data/exams.js';
import {
  validateName,
  validateMatricula,
  validateGradeGroup,
  validateRegistration,
  normalizeMatricula,
} from '../lib/validation.js';
import { checkExistingSubmission } from '../lib/attempts.js';
import { setCurrentStudent } from '../lib/session.js';
import { loadProgress } from '../lib/storage.js';

const FIELD_VALIDATORS = {
  name: validateName,
  matricula: validateMatricula,
  gradeGroup: validateGradeGroup,
};

const GRADES = [
  { n: '1', label: '1st grade' },
  { n: '2', label: '2nd grade' },
  { n: '3', label: '3rd grade' },
];

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', matricula: '', gradeGroup: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [checking, setChecking] = useState(false);
  const [blocked, setBlocked] = useState(null); // fecha ISO si ya entrego
  const [resumeNote, setResumeNote] = useState(false);

  const setField = (field, raw) => {
    const value = field === 'matricula' ? normalizeMatricula(raw) : raw;
    setValues((v) => ({ ...v, [field]: value }));
    setBlocked(null);
    if (touched[field] || field === 'gradeGroup') {
      const msg = FIELD_VALIDATORS[field](value);
      setErrors((e) => ({ ...e, [field]: msg }));
    }
    if (field === 'matricula') {
      setResumeNote(Boolean(value && loadProgress(value)));
    }
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const msg = FIELD_VALIDATORS[field](values[field]);
    setErrors((e) => ({ ...e, [field]: msg }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validateRegistration(values);
    setErrors(found);
    setTouched({ name: true, matricula: true, gradeGroup: true });
    if (Object.keys(found).length > 0) {
      const first = document.querySelector(`[data-field="${Object.keys(found)[0]}"]`);
      if (first) first.focus();
      return;
    }

    setChecking(true);
    const already = await checkExistingSubmission(values.matricula);
    setChecking(false);
    if (already) {
      setBlocked(already);
      return;
    }

    const exam = examForGrade(values.gradeGroup);
    const student = {
      name: values.name.trim().replace(/\s+/g, ' '),
      matricula: normalizeMatricula(values.matricula),
      gradeGroup: values.gradeGroup,
      examId: exam.id,
    };
    setCurrentStudent(student);
    navigate('/instructions');
  };

  const exam = examForGrade(values.gradeGroup);

  return (
    <div className="min-h-full bg-paper px-4 py-8">
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <SchoolLogo className="mb-4 h-20" />
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-2"
        >
          <Mascot pose="wave" size={130} />
        </motion.div>

        <h1 className="text-center text-3xl font-800 text-ink">Tech Challenge</h1>
        <p className="mt-1 text-center font-700 text-sky-600">
          🌐 Internet of Things · 🛡️ Cybersecurity
        </p>
        <p className="mt-1 text-center text-sm text-ink-soft">
          {DEPARTMENT} · {SCHOOL_NAME}
        </p>

        <form onSubmit={onSubmit} noValidate className="card mt-6 w-full space-y-5">
          <Field id="name" label="Full name" error={errors.name}>
            <input
              id="name"
              data-field="name"
              type="text"
              autoComplete="name"
              className="input"
              placeholder="e.g. Ana Sofía Pérez López"
              value={values.name}
              onChange={(e) => setField('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              aria-invalid={Boolean(errors.name)}
            />
          </Field>

          <Field
            id="matricula"
            label="Student ID (matrícula)"
            error={errors.matricula}
            hint={resumeNote ? 'You have an unfinished test: you will continue where you stopped.' : ''}
          >
            <input
              id="matricula"
              data-field="matricula"
              type="text"
              inputMode="text"
              autoCapitalize="characters"
              className="input uppercase"
              value={values.matricula}
              onChange={(e) => setField('matricula', e.target.value)}
              onBlur={() => handleBlur('matricula')}
              aria-invalid={Boolean(errors.matricula)}
            />
          </Field>

          <fieldset>
            <legend className="mb-2 block font-700 text-ink">Grade and group</legend>
            <div className="space-y-2" data-field="gradeGroup" tabIndex={-1}>
              {GRADES.map((g) => (
                <div key={g.n} className="flex items-center gap-2">
                  <span className="w-24 flex-none text-sm font-700 text-ink-soft">{g.label}</span>
                  {['A', 'B'].map((grp) => {
                    const v = `${g.n}${grp}`;
                    const selected = values.gradeGroup === v;
                    return (
                      <button
                        key={v}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setField('gradeGroup', v)}
                        className={`flex-1 rounded-2xl border-2 border-b-4 px-3 py-2.5 font-display text-lg font-800 transition-colors ${
                          selected
                            ? 'border-sky-600 bg-sky-500 text-white'
                            : 'border-[#e4e6f1] bg-white text-ink hover:border-sky-400'
                        }`}
                      >
                        {g.n}° {grp}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            {errors.gradeGroup && (
              <p className="mt-1 text-sm font-600 text-coral-600" role="alert">
                {errors.gradeGroup}
              </p>
            )}
            {exam && !errors.gradeGroup && (
              <p className="mt-3 rounded-2xl bg-sky-50 p-3 text-center font-700 text-ink">
                Your test: <span className="text-sky-600">{exam.icon} {exam.title}</span>
              </p>
            )}
          </fieldset>

          {blocked && (
            <div role="alert" className="rounded-2xl border-2 border-sun-500 bg-sun-50 p-4 text-ink">
              <p className="font-700">You already took this test on {formatDate(blocked)}.</p>
              <p className="mt-1 text-sm text-ink-soft">
                Talk to your teacher if you need to take it again.
              </p>
            </div>
          )}

          <DepthButton type="submit" variant="green" className="w-full" disabled={checking}>
            {checking ? 'Checking...' : 'START'}
          </DepthButton>
        </form>

        <Link
          to="/admin"
          className="mt-6 text-sm text-ink-faint underline-offset-2 hover:underline"
        >
          Acceso para profesores
        </Link>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 14px;
          border: 2px solid #e4e6f1;
          background: #fff;
          padding: 12px 14px;
          font-size: 1rem;
          font-weight: 600;
          color: #2b2d42;
          transition: border-color 120ms;
        }
        .input:focus { border-color: #1ca0e6; outline: none; }
        .input[aria-invalid="true"] { border-color: #f5473d; }
      `}</style>
    </div>
  );
}

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-700 text-ink">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-sm text-ink-faint">{hint}</p>}
      {error && (
        <p className="mt-1 text-sm font-600 text-coral-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
