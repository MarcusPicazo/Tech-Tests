# Tech Challenge — Examen de IoT y Ciberseguridad

Plataforma de examen **100% en inglés** para secundaria, con la misma estética y
funcionamiento que el examen diagnóstico de inglés (racha 🔥, temporizador,
autoguardado, portal del profesor con calificaciones y retroalimentación
automática).

| Grado | Examen | Temas |
|---|---|---|
| 1° A / 1° B | **Internet of Things** (`iot-1`) | qué es IoT, cómo funciona (SENSOR → INTERNET → DATA → ACTION), IoT a nuestro alrededor, sensores, escuela inteligente, diseñar un proyecto |
| 2° A / 2° B | **Internet of Things** (`iot-2`) | mismo nivel básico que 1°, con preguntas distintas |
| 3° A / 3° B | **Cybersecurity** (`cyber-3`) | qué proteger, información personal, contraseñas, phishing, pensar antes de compartir, Wi‑Fi, malware, ciberseguridad escolar |

Los exámenes de IoT son **básicos** (para principiantes, ~6 clases): solo usan lo
visto en la presentación, sin microcontroladores, nube ni otros temas avanzados.

Cada examen tiene **65 preguntas** en 5 niveles de 13 y dura **45 minutos**.
Al terminarse el tiempo el examen se cierra y se envía solo con todas las
respuestas (aunque el alumno haya cerrado el navegador y vuelva a entrar).

Los tipos de pregunta van **mezclados** en todos los niveles (nunca dos seguidas
del mismo tipo):

- **opción múltiple** y *Odd one out*
- **conectar con cables** (clic o arrastrar)
- **ordenar palabras** para formar oraciones
- **adivinar** la palabra con fichas de letras (o teclado)
- **Fact or Fake**, **clasificar** (Sort it!), ordenar pasos, completar y
  "spot the danger"

En los bancos (`src/data/banks/`) las preguntas están agrupadas por tipo en
"bloques"; la mezcla la hace `mixQuestions` en
[`src/data/exams.js`](src/data/exams.js) y es igual para todos los alumnos.
Todas cuentan para la calificación (las "divertidas" también).

**Racha 🔥:** solo sube con respuestas **correctas** seguidas; una respuesta
incorrecta o en blanco la regresa a 0.

**Logo:** `public/logo-bvg.png` (fondo transparente) aparece en todas las
pantallas.

## Registro del alumno

Nombre completo, matrícula y grado/grupo (1° A … 3° B). **No pide correo.**
El grado decide qué examen le toca. Cada matrícula solo puede entregar una vez
(el profesor puede borrar el intento para que lo repita).

## Calificación

- Cada reactivo vale 1 punto. Los de varias partes (cables, clasificar,
  completar, ordenar pasos) dan **crédito parcial**.
- **Calificación = % de aciertos / 10** (escala 0–10, un decimal).
- Desempeño: Excelente (≥90), Muy bien (≥80), Bien (≥70), Suficiente (≥60),
  Necesita reforzar (<60). Se ajusta en `PERFORMANCE_BANDS` de
  [`src/config.js`](src/config.js).
- El alumno **no** ve su calificación; solo el profesor en el portal.

## Portal del profesor (`/admin`)

- Tabla con calificación, %, desempeño, aciertos, duración, mejor racha.
- Filtros por examen, grupo y desempeño; exportar CSV.
- Estadísticas: distribución por desempeño, promedio por grupo y temas más
  difíciles del grupo.
- Detalle por alumno: % por nivel, **retroalimentación automática ("IA")** con
  resumen, fortalezas, áreas de mejora, deficiencias y recomendaciones por tema,
  comentario del profesor, todas las respuestas y reporte imprimible.

Código del profesor:

- **Modo Supabase (real):** lo defines tú en la base de datos (paso 3 de
  "Guardar resultados en Supabase"). **No** está en el repositorio.
- **Modo local (solo pruebas):** `prueba-local` (`LOCAL_ADMIN_CODE` en
  `src/config.js`).

## Cómo correrlo

```bash

npm install
npm run dev        # http://localhost:5174
```

Sin variables de entorno funciona en **modo local** (los resultados se guardan
en el navegador de esa computadora).

## Guardar resultados en Supabase (recomendado para el salón)

1. Crea un proyecto nuevo en <https://supabase.com/dashboard> (**New project**,
   región cercana, p. ej. `East US`). Guarda la contraseña de la base de datos.
2. **SQL Editor** → **New query** → pega TODO
   [`supabase/schema.sql`](supabase/schema.sql) → **Run**. Debe decir
   "Success. No rows returned". (Se puede volver a ejecutar sin problema.)
3. En otra **New query** define el código del profesor (inventa uno; no lo
   compartas ni lo subas a GitHub) y pulsa **Run**:

   ```sql
   insert into public.iot_settings (key, value)
   values ('admin_code', 'TU-CODIGO-SECRETO')
   on conflict (key) do update set value = excluded.value;
   ```

4. **Project Settings** → **API Keys**: copia la **Project URL** y la llave
   pública (`anon` o `publishable`). **Nunca** uses la `service_role` / `secret`.
5. Crea el archivo `.env` (copia de `.env.example`):

   ```
   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...   (o sb_publishable_...)
   ```

6. Reinicia `npm run dev`. En `/admin` ya no debe aparecer el aviso amarillo
   "Modo local". Haz un examen de prueba y revisa en Supabase → **Table
   Editor** → `iot_attempts` que aparezca la fila.
7. Para cambiar el código del profesor: vuelve a correr el `insert` del paso 3
   con el código nuevo.
8. Publicar: `npm run build` y sube la carpeta `dist/` (Netlify: conecta el repo; el build y la carpeta los toma de
   `netlify.toml`. Agrega las
   dos variables `VITE_...` en Netlify).

## Editar preguntas

Las preguntas están en [`src/data/banks/`](src/data/banks/):
`iot1.js`, `iot2.js` y `cyber3.js`. Cada archivo tiene los temas (`topics`,
con la pista que usa la retroalimentación), los niveles (`sections`) y las
preguntas. El formato de cada tipo está documentado en
[`src/lib/answers.js`](src/lib/answers.js).

Después de editar, valida que todo esté bien:

```bash
node scripts/check-banks.mjs
```

Revisa que haya 65 preguntas por examen (`QUESTIONS_PER_EXAM` en `src/config.js`), que la mezcla no repita tipo dos veces seguidas, ids únicos, temas válidos y que la
respuesta correcta de cada pregunta realmente obtenga el punto.
