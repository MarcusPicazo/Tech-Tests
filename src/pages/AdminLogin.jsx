import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DepthButton from '../components/DepthButton.jsx';
import SchoolLogo from '../components/SchoolLogo.jsx';
import { verifyCode, isLocalMode } from '../lib/adminApi.js';
import { startAdminSession } from '../lib/session.js';

/*
 * Acceso al panel: un solo campo de codigo.
 *   - modo servidor: el codigo se valida en la Netlify Function.
 *   - modo local: se compara con LOCAL_ADMIN_CODE.
 * La sesion se guarda en sessionStorage con caducidad de 2 horas.
 */
export default function AdminLogin() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Escribe el código.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const ok = await verifyCode(code.trim());
      if (!ok) {
        setError('Código incorrecto.');
        setBusy(false);
        return;
      }
      startAdminSession(code.trim());
      navigate('/admin/panel', { replace: true });
    } catch (err) {
      setError(err.message || 'No se pudo verificar el código.');
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center bg-paper px-4 py-10">
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={onSubmit}
        className="card w-full max-w-sm space-y-4"
        noValidate
      >
        <SchoolLogo className="mx-auto h-16" />
        <h1 className="text-2xl font-800 text-ink">Panel del profesor</h1>
        <p className="text-sm text-ink-soft">
          Ingresa el código de administrador para ver los resultados.
        </p>

        <input
          type="password"
          autoFocus
          className="w-full rounded-xl border-2 border-[#e4e6f1] bg-white px-4 py-3 font-600 text-ink focus:border-sky-500 focus:outline-none"
          placeholder="Código"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-label="Código de administrador"
        />

        {error && (
          <p className="text-sm font-600 text-coral-600" role="alert">
            {error}
          </p>
        )}

        <DepthButton type="submit" variant="green" className="w-full" disabled={busy}>
          {busy ? 'Verificando…' : 'ENTRAR'}
        </DepthButton>

        {isLocalMode && (
          <p className="rounded-xl bg-sun-50 p-3 text-xs text-ink-soft">
            Modo local: los datos solo existen en esta computadora. El código por
            defecto se configura en <code>src/config.js</code>.
          </p>
        )}

        <Link to="/" className="block text-center text-sm text-ink-faint hover:underline">
          ← Volver
        </Link>
      </motion.form>
    </div>
  );
}
