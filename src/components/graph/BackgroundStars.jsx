import { Background, BackgroundVariant } from '@xyflow/react';

export default function BackgroundStars() {
  // We'll use ReactFlow's dot background as a base for "stars" for now.
  // Phase 6 polish will make it more complex.
  return (
    <Background 
      variant={BackgroundVariant.Dots} 
      gap={40} 
      size={2} 
      color="var(--color-primary)" 
      className="opacity-30"
    />
  );
}
