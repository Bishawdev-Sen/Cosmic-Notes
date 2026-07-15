import { Handle, Position } from '@xyflow/react';

export default function PlanetNode({ data, selected }) {
  return (
    <div className={`p-6 rounded-full bg-surface border-2 flex items-center justify-center text-primary min-w-[120px] min-h-[120px] transition-all shadow-md ${selected ? 'border-accent shadow-[0_0_25px_rgba(138,180,255,0.5)] scale-105' : 'border-accent/40'}`}>
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <div className="text-center font-bold truncate w-full px-2">
        {data.label || 'Planet'}
      </div>
      <Handle type="source" position={Position.Right} className="opacity-0" />
    </div>
  );
}
