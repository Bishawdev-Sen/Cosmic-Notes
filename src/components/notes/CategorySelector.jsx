import { useState } from 'react';

const predefinedCategories = ["General", "Ideas", "Research", "Tasks", "Archive"];

export default function CategorySelector({ category, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {predefinedCategories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1 rounded-[8px] text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
            category === cat ? 'bg-primary text-background' : 'bg-surface border border-primary/20 text-primary hover:bg-primary/10'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
