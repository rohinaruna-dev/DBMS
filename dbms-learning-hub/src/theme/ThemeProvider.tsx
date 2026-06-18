'use client';

// ============================================================
// DBMS Learning Hub – Theme Provider with Dark/Light toggle
// ============================================================
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'dark',
  toggleTheme: () => {},
});

export function useThemeMode() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  // Read from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dbms-theme') as ThemeMode | null;
    if (saved === 'light' || saved === 'dark') {
      setMode(saved);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const next: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('dbms-theme', next);
      return next;
    });
  };

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  // Avoid flash during hydration
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
