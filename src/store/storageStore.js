import { create } from 'zustand';
import { useNotesStore } from './notesStore';
import { useGraphStore } from './graphStore';
import { useSettingsStore } from './settingsStore';

const LOCAL_STORAGE_KEY = 'constellation-notes';

export const useStorageStore = create((set, get) => {
  let saveTimeout = null;

  return {
    lastSaved: null,
    
    // Load state from local storage
    loadFromStorage: () => {
      try {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (data) {
          return JSON.parse(data);
        }
      } catch (e) {
        console.error("Failed to load from local storage", e);
      }
      return { version: "1.0", notes: [], edges: [], settings: {}, categories: [], metadata: {} };
    },

    // Triggered by other stores when their state changes
    requestSave: () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
      
      const delay = useSettingsStore.getState().settings?.autosaveDelay || 300;
      
      saveTimeout = setTimeout(() => {
        try {
          const notes = useNotesStore.getState().notes;
          const edges = useGraphStore.getState().edges;
          const settings = useSettingsStore.getState().settings;
          
          const payload = {
            version: "1.0",
            notes,
            edges,
            settings,
            categories: [], // Not implemented yet
            metadata: {
              lastSaved: new Date().toISOString(),
              device: "browser"
            }
          };
          
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
          set({ lastSaved: payload.metadata.lastSaved });
        } catch (e) {
          console.error("Failed to save to local storage", e);
        }
      }, delay);
    },

    exportData: () => {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) return data;
      
      const payload = {
        version: "1.0",
        notes: useNotesStore.getState().notes,
        edges: useGraphStore.getState().edges,
        settings: useSettingsStore.getState().settings,
        categories: [],
        metadata: {
          lastSaved: new Date().toISOString(),
          device: "browser"
        }
      };
      return JSON.stringify(payload);
    },

    importData: (jsonString) => {
      try {
        const data = JSON.parse(jsonString);
        if (data && Array.isArray(data.notes) && Array.isArray(data.edges)) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
  };
});
