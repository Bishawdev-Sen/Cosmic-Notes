import { create } from 'zustand';
import { useStorageStore } from './storageStore';
import { useNotesStore } from './notesStore';

const generateId = () => crypto.randomUUID();
const now = () => new Date().toISOString();

export const useGraphStore = create((set, get) => ({
  edges: [],
  viewport: { x: 0, y: 0, zoom: 1 },
  draggingNodeId: null,

  initEdges: (savedEdges) => {
    if (savedEdges) {
      set({ edges: savedEdges });
    }
  },

  createEdge: (source, target) => {
    const newEdge = {
      id: generateId(),
      source,
      target,
      animated: true,
      type: "smoothstep",
      createdAt: now()
    };
    
    set((state) => ({ edges: [...state.edges, newEdge] }));
    useStorageStore.getState().requestSave();
  },

  deleteEdge: (id) => {
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== id),
    }));
    useStorageStore.getState().requestSave();
  },

  setViewport: (viewport) => {
    set({ viewport });
  },

  updateNodePosition: (id, position) => {
    useNotesStore.getState().updateNote(id, { position });
  }
}));
