import { BaseEdge, getSmoothStepPath } from '@xyflow/react';
import { useSettingsStore } from '../../store';

export default function EdgeConnection({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  animated,
}) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const settings = useSettingsStore(state => state.settings);
  const pulseClass = animated && !settings.reduceMotion ? 'animate-pulse' : '';

  return (
    <BaseEdge
      path={edgePath}
      markerEnd={markerEnd}
      style={{ ...style, stroke: 'var(--color-primary)', strokeWidth: 2, opacity: 0.5 }}
      className={pulseClass}
    />
  );
}
