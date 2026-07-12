import { create } from 'zustand';

interface GlobalState {
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  activeWidget: string | null;
  setActiveWidget: (widgetId: string | null) => void;
}

export const useStore = create<GlobalState>((set) => ({
  theme: 'auto',
  setTheme: (theme) => set({ theme }),
  activeWidget: null,
  setActiveWidget: (widgetId) => set({ activeWidget: widgetId }),
}));
