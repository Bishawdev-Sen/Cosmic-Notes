import { forwardRef } from 'react';

export const Badge = forwardRef(({ className = '', variant = 'primary', children, ...props }, ref) => {
  const variants = {
    primary: "bg-primary/20 text-primary",
    secondary: "bg-surface text-primary/80",
    accent: "bg-accent/20 text-accent",
  };

  return (
    <span
      ref={ref}
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
});
Badge.displayName = 'Badge';
