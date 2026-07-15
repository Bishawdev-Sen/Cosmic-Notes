import { forwardRef } from 'react';

export const Card = forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`rounded-[20px] bg-surface shadow-sm p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
Card.displayName = 'Card';
