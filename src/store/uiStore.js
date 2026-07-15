import { create } from 'zustand';

export const useUiStore = create((set) => ({
  sidebarCollapsed: false,
  activeModal: null,
  activePanel: null,
  contextMenu: null,
  isSelecting: false,

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setActiveModal: (modal) => set({ activeModal: modal }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  setContextMenu: (menu) => set({ contextMenu: menu }),
  setIsSelecting: (selecting) => set({ isSelecting: selecting }),
}));
