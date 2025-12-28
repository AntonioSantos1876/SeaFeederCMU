import { useColorScheme } from 'react-native';
import { useThemeStore } from './store/themeStore';

const pallette = {
  black: '#050505',
  darkSurface: '#121212',
  white: '#ffffff',
  lightBlueMixed: '#f0f9ff', // Very subtle blueish white
  cmuRed: '#C41230',
  popBlue: '#007FFF',
};

/**
 * Generates the theme object based on the current scheme.
 */
export const getTheme = (scheme: 'light' | 'dark') => ({
  mode: scheme,
  dark: scheme === 'dark',
  colors: {
    background: scheme === 'dark' ? pallette.black : pallette.lightBlueMixed,
    surface: scheme === 'dark' ? pallette.darkSurface : pallette.white,
    primary: pallette.cmuRed,
    secondary: pallette.popBlue, // Used for active state
    text: scheme === 'dark' ? pallette.white : '#0f172a',
    textSecondary: scheme === 'dark' ? '#9ca3af' : '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    border: scheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    card: scheme === 'dark' ? 'rgba(30,30,30,0.6)' : 'rgba(255,255,255,0.7)',
  },
  glass: {
    intensity: 40,
    tint: scheme === 'dark' ? 'dark' : 'light',
    style: {
      borderWidth: 1,
      borderColor: scheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)',
      overflow: 'hidden',
    }
  }
});

/**
 * Hook to get the current active theme.
 * Respects the 'system' override from the store.
 */
export const useAppTheme = () => {
  const systemScheme = useColorScheme();
  const userMode = useThemeStore((state) => state.mode);

  let activeScheme: 'light' | 'dark' = 'dark'; // Default fallback

  if (userMode === 'system') {
    activeScheme = systemScheme || 'dark';
  } else {
    activeScheme = userMode;
  }

  return getTheme(activeScheme);
};
