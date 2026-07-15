import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export const Switch = forwardRef(({ checked, onChange, label, className = '', ...props }, ref) => {
  return (
    <label className={`flex items-center space-x-3 cursor-pointer group ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
          {...props}
        />
        <div className={`w-11 h-6 rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background ${
          checked ? 'bg-primary' : 'bg-surface'
        }`} />
        <motion.div
          className="absolute left-1 top-1 w-4 h-4 bg-background rounded-full shadow-sm"
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
      {label && <span className="text-sm font-medium text-primary select-none">{label}</span>}
    </label>
  );
});
Switch.displayName = 'Switch';
