import { motion } from 'framer-motion';

export const EmptyState = ({ icon: Icon, title, description, action, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-8 text-center rounded-[20px] bg-surface/50 border border-primary/5 ${className}`}
    >
      {Icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-8 w-8 opacity-80" />
        </div>
      )}
      <h3 className="mb-2 text-xl font-semibold text-primary">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-primary/70">{description}</p>
      {action && <div>{action}</div>}
    </motion.div>
  );
};
