import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Checkbox = forwardRef(({ checked, onChange, label, className = '', ...props }, ref) => {
  return (
    <label className={`flex items-center space-x-3 cursor-pointer group ${className}`}>
      <div className="relative flex items-center justify-center w-5 h-5">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
          {...props}
        />
        <div className={`w-5 h-5 rounded-[4px] border-2 transition-colors ${
          checked 
            ? 'border-primary bg-primary' 
            : 'border-primary/50 bg-transparent group-hover:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background'
        }`} />
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute text-background pointer-events-none"
            >
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {label && <span className="text-sm font-medium text-primary select-none">{label}</span>}
    </label>
  );
});
Checkbox.displayName = 'Checkbox';
