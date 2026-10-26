import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { retryQueue } from './lib/attempts.js';
import './index.css';

// Reintenta enviar intentos que quedaron en cola por falta de red.
retryQueue();
window.addEventListener('online', retryQueue);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
