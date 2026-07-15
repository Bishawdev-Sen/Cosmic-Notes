import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled, 
  loading, 
  className = '', 
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-[12px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-background hover:brightness-110",
    secondary: "bg-surface text-primary hover:brightness-110",
    ghost: "bg-transparent text-primary hover:bg-surface",
    outline: "bg-transparent border border-primary/20 text-primary hover:border-primary",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "p-2",
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </motion.button>
  );
});
Button.displayName = 'Button';
