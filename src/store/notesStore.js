import { create } from 'zustand';
import { useStorageStore } from './storageStore';

const generateId = () => crypto.randomUUID();
const now = () => new Date().toISOString();

export const useNotesStore = create((set, get) => ({
  notes: [],
  selectedNoteId: null,
  selectedNoteIds: [],
  loading: false,
  error: null,

  initNotes: (savedNotes) => {
    if (savedNotes) {
      set({ notes: savedNotes });
    }
  },

  createNote: (partial) => {
    const newNote = {
      id: generateId(),
      title: "",
      content: "",
      category: "General",
      tags: [],
      favorite: false,
      pinned: false,
      color: "default",
      position: { x: 0, y: 0 },
      ...partial,
      createdAt: now(),
      updatedAt: now(),
      deletedAt: null,
    };
    
    set((state) => ({ notes: [...state.notes, newNote] }));
    useStorageStore.getState().requestSave();
    return newNote.id;
  },

  updateNote: (id, patch) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...patch, updatedAt: now() } : note
      ),
    }));
    useStorageStore.getState().requestSave();
  },

  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, deletedAt: now(), updatedAt: now() } : note
      ),
    }));
    useStorageStore.getState().requestSave();
  },

  restoreNote: (id) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, deletedAt: null, updatedAt: now() } : note
      ),
    }));
    useStorageStore.getState().requestSave();
  },

  permanentlyDeleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }));
    useStorageStore.getState().requestSave();
  },

  duplicateNote: (id) => {
    const state = get();
    const noteToDuplicate = state.notes.find((n) => n.id === id);
    if (!noteToDuplicate) return;
    
    const duplicate = {
      ...noteToDuplicate,
      id: generateId(),
      title: `${noteToDuplicate.title} (Copy)`,
      position: { x: noteToDuplicate.position.x + 20, y: noteToDuplicate.position.y + 20 },
      createdAt: now(),
      updatedAt: now(),
      deletedAt: null,
    };
    
    set({ notes: [...state.notes, duplicate] });
    useStorageStore.getState().requestSave();
  },

  toggleFavorite: (id) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, favorite: !note.favorite, updatedAt: now() } : note
      ),
    }));
    useStorageStore.getState().requestSave();
  },

  togglePin: (id) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned, updatedAt: now() } : note
      ),
    }));
    useStorageStore.getState().requestSave();
  },

  // Selectors
  getActiveNotes: () => get().notes.filter((n) => !n.deletedAt),
  getDeletedNotes: () => get().notes.filter((n) => n.deletedAt),
  getFavoriteNotes: () => get().notes.filter((n) => !n.deletedAt && n.favorite),
  getPinnedNotes: () => get().notes.filter((n) => !n.deletedAt && n.pinned),
  getNoteById: (id) => get().notes.find((n) => n.id === id),
}));
