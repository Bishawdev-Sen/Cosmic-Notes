import { create } from 'zustand';
import { useNotesStore } from './notesStore';

export const useSearchStore = create((set, get) => ({
  query: '',
  activeFilters: {
    category: null,
    tag: null,
    favorite: false,
    pinned: false,
  },
  sortBy: 'updatedAt', // 'updatedAt' | 'createdAt' | 'title'

  setQuery: (query) => set({ query }),
  
  setFilter: (key, value) => set((state) => ({
    activeFilters: { ...state.activeFilters, [key]: value }
  })),

  clearFilters: () => set({
    activeFilters: { category: null, tag: null, favorite: false, pinned: false },
    query: ''
  }),

  setSortBy: (sortBy) => set({ sortBy }),
}));

export const getFilteredNotes = () => {
  const notes = useNotesStore.getState().notes.filter(n => !n.deletedAt);
  const { query, activeFilters, sortBy } = useSearchStore.getState();

  let filtered = notes;

  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(n => 
      (n.title && n.title.toLowerCase().includes(lowerQuery)) || 
      (n.content && n.content.toLowerCase().includes(lowerQuery))
    );
  }

  if (activeFilters.favorite) filtered = filtered.filter(n => n.favorite);
  if (activeFilters.pinned) filtered = filtered.filter(n => n.pinned);
  if (activeFilters.category) filtered = filtered.filter(n => n.category === activeFilters.category);
  if (activeFilters.tag) filtered = filtered.filter(n => n.tags && n.tags.includes(activeFilters.tag));

  filtered.sort((a, b) => {
    if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '');
    if (sortBy === 'createdAt') return new Date(b.createdAt) - new Date(a.createdAt);
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  return filtered;
};
