// ============================================================
// DBMS Learning Hub – MUI v7 + Material Design 3 Theme
// ============================================================
import { createTheme, alpha } from '@mui/material/styles';

// ─── Design Tokens ──────────────────────────────────────────
const tokens = {
  // Primary: Deep Indigo/Violet
  primary: {
    main: '#6366f1',
    light: '#818cf8',
    dark: '#4f46e5',
    contrastText: '#ffffff',
  },
  // Secondary: Teal/Cyan
  secondary: {
    main: '#06b6d4',
    light: '#22d3ee',
    dark: '#0891b2',
    contrastText: '#ffffff',
  },
  // Accent
  accent: '#f59e0b',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

// ─── Light Theme ─────────────────────────────────────────────
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: tokens.primary,
    secondary: tokens.secondary,
    background: {
      default: '#f8faff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e1b4b',
      secondary: '#4c4a6e',
    },
    success: { main: tokens.success },
    error: { main: tokens.error },
    warning: { main: tokens.warning },
    info: { main: tokens.info },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' as const },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 1px 3px rgba(99,102,241,0.08), 0 8px 24px rgba(99,102,241,0.06)',
          border: '1px solid rgba(99,102,241,0.1)',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(99,102,241,0.15), 0 20px 40px rgba(99,102,241,0.1)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '0.9rem',
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            boxShadow: '0 6px 20px rgba(99,102,241,0.5)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { '& .MuiOutlinedInput-root': { borderRadius: 12 } },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '12px !important',
          '&:before': { display: 'none' },
          marginBottom: 8,
          border: '1px solid rgba(99,102,241,0.12)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { borderRight: '1px solid rgba(99,102,241,0.1)' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 8, height: 8 },
      },
    },
  },
});

// ─── Dark Theme ──────────────────────────────────────────────
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#818cf8',
      light: '#a5b4fc',
      dark: '#6366f1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#22d3ee',
      light: '#67e8f9',
      dark: '#06b6d4',
      contrastText: '#000000',
    },
    background: {
      default: '#0f0e1a',
      paper: '#1a1830',
    },
    text: {
      primary: '#e2e0ff',
      secondary: '#a5a3cc',
    },
    success: { main: '#34d399' },
    error: { main: '#f87171' },
    warning: { main: '#fbbf24' },
    info: { main: '#60a5fa' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' as const },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: alpha('#1a1830', 0.9),
          backdropFilter: 'blur(20px)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(129,140,248,0.08)',
          border: '1px solid rgba(129,140,248,0.15)',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.4), 0 20px 40px rgba(129,140,248,0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '0.9rem',
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            boxShadow: '0 6px 20px rgba(99,102,241,0.5)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { '& .MuiOutlinedInput-root': { borderRadius: 12 } },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '12px !important',
          '&:before': { display: 'none' },
          marginBottom: 8,
          border: '1px solid rgba(129,140,248,0.15)',
          backgroundColor: alpha('#1a1830', 0.8),
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: alpha('#1a1830', 0.95),
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(129,140,248,0.15)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a1830',
          borderRight: '1px solid rgba(129,140,248,0.15)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 8, height: 8 },
      },
    },
  },
});
