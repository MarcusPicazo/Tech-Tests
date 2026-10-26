-- ============================================================================
--  Examen de Tecnologia (IoT / Ciberseguridad) — esquema de base de datos
--  (Supabase / Postgres)
--
--  Usa tablas y funciones con prefijo "iot_", asi que puede vivir en el MISMO
--  proyecto de Supabase que el examen de ingles sin chocar con el.
--
--  Como usarlo:
--   1. Entra a tu proyecto de Supabase -> SQL Editor -> New query.
--   2. Pega TODO este archivo y pulsa "Run".
--   3. Listo. No hace falta crear politicas a mano.
--
--  Modelo de seguridad:
--   - El alumno (anonimo) NO puede leer ni escribir las tablas directamente.
--   - El alumno entrega su examen llamando a iot_submit_attempt().
--   - El alumno puede consultar si YA entrego con iot_student_submission_date().
--   - El panel del profesor usa funciones iot_admin_* que validan el codigo de
--     administrador dentro de la base de datos.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
--  Tablas
-- ---------------------------------------------------------------------------
create table if not exists public.iot_students (
  id           uuid primary key default gen_random_uuid(),
  nombre       text not null,
  matricula    text not null unique,
  grado_grupo  text,
  created_at   timestamptz not null default now()
);

create table if not exists public.iot_attempts (
  id               uuid primary key default gen_random_uuid(),
  student_id       uuid not null references public.iot_students(id) on delete cascade,
  exam_id          text not null,               -- 'iot-1' | 'iot-2' | 'cyber-3'
  started_at       timestamptz,
  finished_at      timestamptz,
  duration_seconds integer,
  answers          jsonb  not null default '{}'::jsonb,
  scores           jsonb,                        -- detalle por seccion y tema
  score_pct        integer,                      -- 0..100
  grade            numeric(3,1),                 -- 0.0..10.0
  performance      text,                         -- 'Excelente' | 'Muy bien' | ...
  best_streak      integer not null default 0,
  auto_ended       boolean not null default false,
  tab_switches     integer not null default 0,
  teacher_comment  text not null default '',
  created_at       timestamptz not null default now()
);

-- Un intento por alumno (permite repetir solo si el profesor borra el intento).
create unique index if not exists iot_attempts_one_per_student
  on public.iot_attempts (student_id);

create index if not exists iot_attempts_created_at_idx on public.iot_attempts (created_at desc);

-- ---------------------------------------------------------------------------
--  RLS: bloqueado para el rol anonimo (sin politicas)
-- ---------------------------------------------------------------------------
alter table public.iot_students  enable row level security;
alter table public.iot_attempts  enable row level security;

-- ---------------------------------------------------------------------------
--  RPC 1: fecha de entrega de una matricula (o null)  — la usa el registro
-- ---------------------------------------------------------------------------
create or replace function public.iot_student_submission_date(p_matricula text)
returns timestamptz
language sql
security definer
set search_path = public
as $$
  select a.finished_at
  from public.iot_attempts a
  join public.iot_students s on s.id = a.student_id
  where upper(s.matricula) = upper(p_matricula)
  limit 1;
$$;

-- ---------------------------------------------------------------------------
--  RPC 2: entrega del examen (upsert de alumno + insert de intento)
-- ---------------------------------------------------------------------------
create or replace function public.iot_submit_attempt(payload jsonb)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_student_id uuid;
  v_attempt_id uuid;
  v_matricula  text := upper(trim(payload->>'matricula'));
begin
  if v_matricula is null or v_matricula = '' then
    raise exception 'matricula requerida';
  end if;

  insert into public.iot_students (nombre, matricula, grado_grupo)
  values (
    coalesce(payload->>'name', ''),
    v_matricula,
    payload->>'grado_grupo'
  )
  on conflict (matricula) do update
    set nombre      = excluded.nombre,
        grado_grupo = excluded.grado_grupo
  returning id into v_student_id;

  if exists (select 1 from public.iot_attempts where student_id = v_student_id) then
    raise exception 'esta matricula ya entrego el examen';
  end if;

  insert into public.iot_attempts (
    student_id, exam_id, started_at, finished_at, duration_seconds,
    answers, scores, score_pct, grade, performance,
    best_streak, auto_ended, tab_switches
  )
  values (
    v_student_id,
    coalesce(payload->>'exam_id', ''),
    (payload->>'started_at')::timestamptz,
    (payload->>'finished_at')::timestamptz,
    (payload->>'duration_seconds')::int,
    coalesce(payload->'answers', '{}'::jsonb),
    payload->'scores',
    (payload->>'score_pct')::int,
    (payload->>'grade')::numeric,
    payload->>'performance',
    coalesce((payload->>'best_streak')::int, 0),
    coalesce((payload->>'auto_ended')::boolean, false),
    coalesce((payload->>'tab_switches')::int, 0)
  )
  returning id into v_attempt_id;

  return v_attempt_id;
end;
$$;

revoke all on function public.iot_student_submission_date(text) from public;
revoke all on function public.iot_submit_attempt(jsonb) from public;
grant execute on function public.iot_student_submission_date(text) to anon, authenticated;
grant execute on function public.iot_submit_attempt(jsonb) to anon, authenticated;

-- ===========================================================================
--  PANEL DEL PROFESOR — funciones RPC
--
--  El codigo del profesor NO esta en este archivo (el repositorio es
--  publico). Se guarda en la tabla iot_settings. Despues de ejecutar este
--  archivo, corre UNA vez en el SQL Editor (con tu propio codigo):
--
--     insert into public.iot_settings (key, value)
--     values ('admin_code', 'TU-CODIGO-SECRETO')
--     on conflict (key) do update set value = excluded.value;
--
--  Mientras no exista ese codigo, el panel no deja entrar a nadie.
-- ===========================================================================
create table if not exists public.iot_settings (
  key   text primary key,
  value text not null
);
alter table public.iot_settings enable row level security;
revoke all on table public.iot_settings from anon, authenticated;

create or replace function public.iot_admin_code_ok(p_code text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce(p_code, '') <> '' and exists (
    select 1 from public.iot_settings
    where key = 'admin_code' and value <> '' and value = p_code
  );
$$;

create or replace function public.iot_admin_check(p_code text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select public.iot_admin_code_ok(p_code);
$$;

create or replace function public.iot_attempt_json(a public.iot_attempts, s public.iot_students, with_answers boolean)
returns jsonb
language sql
stable
set search_path = public
as $$
  select jsonb_build_object(
    'id', a.id,
    'nombre', s.nombre,
    'matricula', s.matricula,
    'grado_grupo', s.grado_grupo,
    'exam_id', a.exam_id,
    'started_at', a.started_at,
    'finished_at', a.finished_at,
    'duration_seconds', a.duration_seconds,
    'tab_switches', a.tab_switches,
    'auto_ended', a.auto_ended,
    'best_streak', a.best_streak,
    'scores', a.scores,
    'score_pct', a.score_pct,
    'grade', a.grade,
    'performance', a.performance,
    'teacher_comment', a.teacher_comment
  ) || case when with_answers then jsonb_build_object('answers', a.answers) else '{}'::jsonb end;
$$;

create or replace function public.iot_admin_list_attempts(p_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.iot_admin_code_ok(p_code) then
    raise exception 'codigo de administrador incorrecto';
  end if;
  return coalesce((
    select jsonb_agg(public.iot_attempt_json(a, s, false) order by a.created_at desc)
    from public.iot_attempts a
    join public.iot_students s on s.id = a.student_id
  ), '[]'::jsonb);
end;
$$;

create or replace function public.iot_admin_get_attempt(p_code text, p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.iot_admin_code_ok(p_code) then
    raise exception 'codigo de administrador incorrecto';
  end if;
  return (
    select public.iot_attempt_json(a, s, true)
    from public.iot_attempts a
    join public.iot_students s on s.id = a.student_id
    where a.id = p_id
  );
end;
$$;

create or replace function public.iot_admin_save_comment(p_code text, p_id uuid, p_comment text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.iot_admin_code_ok(p_code) then
    raise exception 'codigo de administrador incorrecto';
  end if;
  update public.iot_attempts
     set teacher_comment = coalesce(p_comment, '')
   where id = p_id;
  return public.iot_admin_get_attempt(p_code, p_id);
end;
$$;

create or replace function public.iot_admin_delete_attempt(p_code text, p_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.iot_admin_code_ok(p_code) then
    raise exception 'codigo de administrador incorrecto';
  end if;
  delete from public.iot_attempts where id = p_id;
  return true;
end;
$$;

-- Funciones internas: Supabase da EXECUTE por defecto a anon/authenticated en
-- funciones nuevas, por eso se revoca explicitamente a esos roles tambien.
revoke all on function public.iot_admin_code_ok(text) from public, anon, authenticated;
revoke all on function public.iot_attempt_json(public.iot_attempts, public.iot_students, boolean) from public, anon, authenticated;
grant execute on function public.iot_admin_check(text)                        to anon, authenticated;
grant execute on function public.iot_admin_list_attempts(text)                to anon, authenticated;
grant execute on function public.iot_admin_get_attempt(text, uuid)            to anon, authenticated;
grant execute on function public.iot_admin_save_comment(text, uuid, text)     to anon, authenticated;
grant execute on function public.iot_admin_delete_attempt(text, uuid)         to anon, authenticated;
