import PageLayout from '../components/layout/PageLayout';
import { useNotesStore } from '../store';
import { EmptyState, Card, Badge, Button } from '../components/ui';
import { Star, FileText } from 'lucide-react';
import { useMemo } from 'react';

export default function Favorites() {
  const allNotes = useNotesStore(state => state.notes);
  const notes = useMemo(() => allNotes.filter(n => !n.deletedAt && n.favorite), [allNotes]);
  
  return (
    <PageLayout title="Favorites">
      {notes.length === 0 ? (
        <EmptyState 
          icon={Star} 
          title="No favorites yet" 
          description="Star your important notes on the canvas to find them easily here." 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map(note => (
            <Card key={note.id} className="flex flex-col gap-3 relative group">
              <Star className="h-5 w-5 text-accent absolute top-6 right-6 fill-accent" />
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary/50" />
                <h3 className="font-semibold text-lg truncate pr-6">{note.title || 'Untitled Note'}</h3>
              </div>
              {note.category && <Badge className="w-fit">{note.category}</Badge>}
              <p className="text-sm opacity-80 line-clamp-3 mt-2">{note.content}</p>
            </Card>
          ))}
        </div>
      )}
    </PageLayout>
  );
}
