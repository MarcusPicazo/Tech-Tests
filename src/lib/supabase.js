/*
 * Cliente de Supabase para el navegador.
 *
 * Se crea SOLO si estan configuradas las dos variables de entorno.
 * Si no, `supabase` queda en null y toda la app funciona en "modo local"
 * (localStorage). Asi se puede probar sin configurar nada.
 */
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabase = Boolean(url && anonKey);

export const supabase = hasSupabase
  ? createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;
