import { create } from 'zustand';
import { useNotesStore } from './notesStore';
import { useGraphStore } from './graphStore';

export const useStatisticsStore = create((set, get) => ({
  getStats: () => {
    const notes = useNotesStore.getState().notes || [];
    const activeNotes = notes.filter(n => !n.deletedAt);
    const edges = useGraphStore.getState().edges || [];
    
    const categories = new Set(activeNotes.map(n => n.category).filter(Boolean));
    const tags = new Set(activeNotes.flatMap(n => n.tags || []));

    return {
      totalNotes: activeNotes.length,
      totalDeleted: notes.length - activeNotes.length,
      totalConnections: edges.length,
      totalCategories: categories.size,
      totalTags: tags.size
    };
  }
}));
