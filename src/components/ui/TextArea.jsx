import { forwardRef } from 'react';

export const TextArea = forwardRef(({ className = '', error, ...props }, ref) => {
  return (
    <div className="w-full">
      <textarea
        ref={ref}
        className={`w-full rounded-[12px] bg-surface border ${error ? 'border-red-500' : 'border-transparent'} px-4 py-2 text-primary transition-colors hover:border-primary/50 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 min-h-[100px] resize-y ${className}`}
        {...props}
      />
      {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </div>
  );
});
TextArea.displayName = 'TextArea';
