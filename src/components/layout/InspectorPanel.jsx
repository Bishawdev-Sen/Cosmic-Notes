import { useNotesStore } from '../../store';
import { Input, TextArea, Button, Switch } from '../ui';
import TagInput from '../notes/TagInput';
import CategorySelector from '../notes/CategorySelector';
import ColorPicker from '../notes/ColorPicker';
import { Star, Pin, Trash2, Copy, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InspectorPanel({ selectedId, onClose, onConfirmDelete }) {
  const note = useNotesStore(state => state.getNoteById(selectedId));
  const updateNote = useNotesStore(state => state.updateNote);
  const toggleFavorite = useNotesStore(state => state.toggleFavorite);
  const togglePin = useNotesStore(state => state.togglePin);
  const duplicateNote = useNotesStore(state => state.duplicateNote);

  if (!note) return null;

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute top-0 right-0 h-full w-full md:top-4 md:right-4 md:h-auto md:w-80 bg-surface/95 md:rounded-[20px] p-6 border-l md:border border-primary/10 flex flex-col gap-4 md:max-h-[calc(100vh-32px)] overflow-y-auto z-40 backdrop-blur-md"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-primary">Inspector</h3>
        <button onClick={onClose} className="text-primary/50 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-primary/70 uppercase font-medium">Title</label>
        <Input 
          value={note.title} 
          onChange={(e) => updateNote(note.id, { title: e.target.value })} 
          placeholder="Note title..."
        />
      </div>

      <div className="flex flex-col gap-1 flex-grow">
        <label className="text-xs text-primary/70 uppercase font-medium">Content</label>
        <TextArea 
          value={note.content} 
          onChange={(e) => updateNote(note.id, { content: e.target.value })} 
          placeholder="Note content..."
          className="min-h-[100px]"
        />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="text-xs text-primary/70 uppercase font-medium">Category</label>
        <CategorySelector 
          category={note.category} 
          onChange={(c) => updateNote(note.id, { category: c })} 
        />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="text-xs text-primary/70 uppercase font-medium">Tags</label>
        <TagInput 
          tags={note.tags} 
          onChange={(t) => updateNote(note.id, { tags: t })} 
        />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="text-xs text-primary/70 uppercase font-medium">Color</label>
        <ColorPicker 
          color={note.color} 
          onChange={(c) => updateNote(note.id, { color: c })} 
        />
      </div>

      <div className="flex justify-between items-center py-4 border-t border-b border-primary/10 mt-2">
        <Switch 
          checked={note.favorite} 
          onChange={() => toggleFavorite(note.id)} 
          label={<span className="flex items-center gap-1"><Star className="h-4 w-4"/> Favorite</span>}
        />
        <Switch 
          checked={note.pinned} 
          onChange={() => togglePin(note.id)} 
          label={<span className="flex items-center gap-1"><Pin className="h-4 w-4"/> Pin</span>}
        />
      </div>

      <div className="flex justify-between gap-2 mt-4">
        <Button variant="secondary" className="flex-1" onClick={() => duplicateNote(note.id)}>
          <Copy className="h-4 w-4 mr-2" /> Copy
        </Button>
        <Button variant="danger" className="flex-1" onClick={() => onConfirmDelete(note.id)}>
          <Trash2 className="h-4 w-4 mr-2" /> Delete
        </Button>
      </div>
    </motion.div>
  );
}
