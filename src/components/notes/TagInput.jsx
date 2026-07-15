import { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui';

export default function TagInput({ tags = [], onChange }) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = input.trim().toLowerCase();
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(t => t !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1">
        {tags.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 rounded bg-primary/20 px-2 py-0.5 text-xs text-primary">
            #{tag}
            <button onClick={() => removeTag(tag)} className="hover:text-primary/70 focus:outline-none">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tags (press Enter)"
        className="h-8 text-sm"
      />
    </div>
  );
}
