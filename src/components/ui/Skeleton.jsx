export const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-[12px] bg-surface ${className}`}
      {...props}
    />
  );
};

// Convenience component for a common text skeleton
export const TextSkeleton = ({ lines = 1, className = '' }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={`h-4 w-full ${className}`} style={{ width: i === lines - 1 && lines > 1 ? '60%' : '100%' }} />
    ))}
  </div>
);
