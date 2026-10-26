/*
 * Exportacion a CSV con BOM UTF-8 para que Excel abra bien los acentos.
 * Sin dependencias.
 */
function cell(value) {
  if (value === null || value === undefined) return '';
  const s = String(value);
  // Entrecomilla si hay separador, comillas o salto de linea.
  if (/[",\n;]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function rowsToCsv(headers, rows) {
  const head = headers.map((h) => cell(h.label ?? h)).join(',');
  const body = rows
    .map((r) => headers.map((h) => cell(typeof h === 'string' ? r[h] : h.get(r))).join(','))
    .join('\r\n');
  return `${head}\r\n${body}`;
}

// Dispara la descarga de un archivo CSV (BOM + UTF-8).
export function downloadCsv(filename, csvText) {
  const BOM = '﻿';
  const blob = new Blob([BOM + csvText], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
