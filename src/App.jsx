import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Instructions from './pages/Instructions.jsx';
import Exam from './pages/Exam.jsx';
import Finish from './pages/Finish.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import { getAdminSession } from './lib/session.js';

function RequireAdmin({ children }) {
  return getAdminSession() ? children : <Navigate to="/admin" replace />;
}

/*
 * Rutas de la aplicacion. El comodin siempre regresa al registro.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/test" element={<Exam />} />
      <Route path="/done" element={<Finish />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/panel"
        element={
          <RequireAdmin>
            <AdminPanel />
          </RequireAdmin>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
