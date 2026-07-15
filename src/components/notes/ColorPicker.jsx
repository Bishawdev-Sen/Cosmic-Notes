const predefinedColors = [
  { id: 'default', bg: 'bg-surface', border: 'border-primary/20' },
  { id: 'red', bg: 'bg-red-500/20', border: 'border-red-500/50' },
  { id: 'blue', bg: 'bg-blue-500/20', border: 'border-blue-500/50' },
  { id: 'green', bg: 'bg-green-500/20', border: 'border-green-500/50' },
  { id: 'yellow', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50' },
];

export default function ColorPicker({ color, onChange }) {
  return (
    <div className="flex gap-2">
      {predefinedColors.map(c => (
        <button
          key={c.id}
          onClick={() => onChange(c.id)}
          className={`w-6 h-6 rounded-full border-2 ${c.bg} ${c.border} transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-background ${
            color === c.id ? 'scale-110 ring-2 ring-primary ring-offset-1 ring-offset-background' : ''
          }`}
          title={c.id}
          aria-label={`Set color to ${c.id}`}
        />
      ))}
    </div>
  );
}
