import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({ title = "Something went wrong", message, onRetry, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center p-8 text-center rounded-[20px] bg-red-900/10 border border-red-500/20 ${className}`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-500">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-red-500">{title}</h3>
      {message && <p className="mb-6 max-w-sm text-sm text-red-400/80">{message}</p>}
      {onRetry && (
        <Button variant="danger" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </motion.div>
  );
};
