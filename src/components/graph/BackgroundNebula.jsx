import { motion } from 'framer-motion';

export default function BackgroundNebula({ reduceMotion }) {
  const transition = reduceMotion ? {} : {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut"
  };

  const animate = reduceMotion ? {} : {
    scale: [1, 1.1, 1],
    opacity: [0.5, 0.8, 0.5],
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div 
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-[100px] mix-blend-screen"
        animate={animate}
        transition={transition}
      />
      <motion.div 
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full blur-[120px] mix-blend-screen"
        animate={animate}
        transition={{ ...transition, delay: reduceMotion ? 0 : 4 }}
      />
    </div>
  );
}
