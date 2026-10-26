/*
 * Bloques "skeleton" para estados de carga (nunca spinners genericos).
 * El brillo se hace con background-position (barato) y respeta reduce-motion.
 */
export function SkeletonLine({ className = '' }) {
  return (
    <div
      className={`h-4 rounded-lg bg-[#e9ebf3] motion-safe:animate-shimmer ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(90deg, #e9ebf3 0px, #f3f4fa 200px, #e9ebf3 400px)',
        backgroundSize: '800px 100%',
      }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="card space-y-4" aria-hidden="true">
      <SkeletonLine className="w-1/3" />
      <SkeletonLine className="h-8 w-3/4" />
      <div className="space-y-3 pt-2">
        <SkeletonLine className="h-12" />
        <SkeletonLine className="h-12" />
        <SkeletonLine className="h-12" />
        <SkeletonLine className="h-12" />
      </div>
    </div>
  );
}

export function SkeletonRows({ rows = 6 }) {
  return (
    <div className="space-y-2" aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonLine key={i} className="h-10" />
      ))}
    </div>
  );
}
