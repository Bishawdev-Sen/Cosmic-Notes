import { Controls } from '@xyflow/react';

export default function CanvasControls() {
  return (
    <Controls 
      showInteractive={false}
      className="bg-surface border border-primary/20 rounded-[12px] overflow-hidden fill-primary text-primary"
    />
  );
}
