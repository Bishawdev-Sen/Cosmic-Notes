import { create } from 'zustand';
import { useStorageStore } from './storageStore';

const defaultSettings = {
  theme: "deep-space",
  animations: true,
  reduceMotion: false,
  showGrid: true,
  showStars: true,
  showNebula: true,
  autosaveDelay: 300
};

export const useSettingsStore = create((set, get) => ({
  settings: defaultSettings,

  initSettings: (savedSettings) => {
    if (savedSettings) {
      set({ settings: { ...defaultSettings, ...savedSettings } });
    }
  },

  updateSettings: (patch) => {
    set((state) => ({
      settings: { ...state.settings, ...patch }
    }));
    useStorageStore.getState().requestSave();
  }
}));
