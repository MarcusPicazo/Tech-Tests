/*
 * Generador pseudoaleatorio determinista.
 * Sirve para barajar las opciones de cada reactivo de opcion multiple con una
 * semilla derivada de la matricula: el mismo alumno ve siempre el mismo orden
 * (util al reanudar), pero dos alumnos distintos ven ordenes distintos.
 */

// Hash de cadena -> entero de 32 bits (variante de xfnv1a).
export function hashString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// mulberry32: PRNG pequeno y rapido. Devuelve una funcion () => [0, 1).
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Baraja una copia del arreglo (Fisher-Yates) usando la funcion rng dada.
export function shuffleWithRng(array, rng) {
  const out = array.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/*
 * Devuelve las opciones de un reactivo barajadas de forma estable para una
 * matricula concreta. Se mezcla el id del reactivo en la semilla para que no
 * todos los reactivos queden con el mismo orden relativo.
 */
export function shuffledOptions(options, matricula, questionId) {
  if (!Array.isArray(options) || options.length < 2) return options || [];
  const seed = hashString(`${matricula}::${questionId}`);
  return shuffleWithRng(options, mulberry32(seed));
}
