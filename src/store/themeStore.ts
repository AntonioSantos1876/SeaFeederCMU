import { create } from 'zustand';
import { Appearance } from 'react-native';

interface ThemeState {
  mode: 'system' | 'light' | 'dark';
  setMode: (mode: 'system' | 'light' | 'dark') => void;
}

/**
 * Global store for Theme preference.
 * Persists in memory for now (could be persisted to AsyncStorage in future).
 */
export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'system',
  setMode: (mode) => set({ mode }),
}));
