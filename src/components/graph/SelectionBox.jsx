import { MiniMap } from '@xyflow/react';

export default function SelectionBox() {
  return (
    <div className="hidden md:block">
      <MiniMap
        nodeStrokeColor="var(--color-primary)"
        nodeColor="var(--color-surface)"
        maskColor="var(--color-background)"
        style={{ backgroundColor: 'var(--color-surface)' }}
        className="!bg-surface !border !border-primary/20 !rounded-[12px] !bottom-4 !right-4 overflow-hidden opacity-50 hover:opacity-100 transition-opacity"
      />
    </div>
  );
}
