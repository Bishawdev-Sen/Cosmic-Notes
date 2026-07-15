import { Handle, Position } from '@xyflow/react';

export default function StarNode({ data, selected }) {
  const isCustomColor = data.color && data.color !== 'default';
  
  const colorClasses = {
    red: 'border-red-500/50 text-red-500 shadow-red-500/50',
    blue: 'border-blue-500/50 text-blue-500 shadow-blue-500/50',
    green: 'border-green-500/50 text-green-500 shadow-green-500/50',
    yellow: 'border-yellow-500/50 text-yellow-500 shadow-yellow-500/50',
    default: 'border-primary/20 text-primary shadow-primary/50'
  };
  
  const activeColorClass = colorClasses[data.color] || colorClasses.default;
  const selectedClass = selected ? 'shadow-[0_0_15px_var(--tw-shadow-color)] scale-105 border-opacity-100' : '';

  return (
    <div className={`p-4 rounded-[24px] bg-surface border-2 flex flex-col items-center justify-center min-w-[100px] min-h-[80px] transition-all shadow-sm ${activeColorClass} ${selectedClass}`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-primary/50 border-none" />
      {data.category && (
        <span className="text-[10px] uppercase opacity-70 mb-1 tracking-wider">{data.category}</span>
      )}
      <div className="text-center font-medium w-full px-2 text-sm truncate">
        {data.label || 'Untitled'}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-primary/50 border-none" />
    </div>
  );
}
