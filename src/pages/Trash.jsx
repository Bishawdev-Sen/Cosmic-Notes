import PageLayout from '../components/layout/PageLayout';
import { useNotesStore } from '../store';
import { EmptyState, Card, Badge, Button } from '../components/ui';
import { Trash2, RotateCcw, AlertTriangle } from 'lucide-react';
import { useMemo } from 'react';

export default function Trash() {
  const allNotes = useNotesStore(state => state.notes);
  const notes = useMemo(() => allNotes.filter(n => n.deletedAt), [allNotes]);
  const restoreNote = useNotesStore(state => state.restoreNote);
  const permanentlyDeleteNote = useNotesStore(state => state.permanentlyDeleteNote);
  
  return (
    <PageLayout title="Trash">
      {notes.length === 0 ? (
        <EmptyState 
          icon={Trash2} 
          title="Trash is empty" 
          description="Deleted notes will appear here for 30 days before being permanently removed." 
        />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-[16px] bg-red-900/10 border border-red-500/20 text-red-500 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">Notes in trash are permanently deleted after 30 days.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map(note => (
              <Card key={note.id} className="flex flex-col gap-3 opacity-70">
                <h3 className="font-semibold text-lg truncate">{note.title || 'Untitled Note'}</h3>
                {note.category && <Badge className="w-fit" variant="secondary">{note.category}</Badge>}
                <p className="text-sm opacity-80 line-clamp-2 mt-2">{note.content}</p>
                <div className="flex gap-2 mt-2 pt-2 border-t border-primary/10">
                  <Button variant="secondary" size="sm" className="flex-1" onClick={() => restoreNote(note.id)}>
                    <RotateCcw className="h-4 w-4 mr-2" /> Restore
                  </Button>
                  <Button variant="danger" size="sm" className="flex-1" onClick={() => permanentlyDeleteNote(note.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
}
