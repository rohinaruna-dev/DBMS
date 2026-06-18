'use client';

// ============================================================
// DBMS Learning Hub – Top App Bar
// ============================================================
import React, { useState, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  Tooltip,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Fade,
  alpha,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from '@/theme/ThemeProvider';
import { searchIndex } from '@/data/searchData';
import Fuse from 'fuse.js';
import { useRouter } from 'next/navigation';
import type { SearchItem } from '@/types';

const fuse = new Fuse(searchIndex, {
  keys: ['title', 'content'],
  threshold: 0.4,
  includeScore: true,
});

interface TopBarProps {
  onMenuClick: () => void;
  drawerWidth: number;
  isMobile: boolean;
}

export default function TopBar({ onMenuClick, isMobile }: TopBarProps) {
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }
    const hits = fuse.search(value).slice(0, 6).map((r) => r.item);
    setResults(hits);
    setShowResults(true);
  }, []);

  const handleResultClick = (item: SearchItem) => {
    setShowResults(false);
    setQuery('');
    if (item.sectionId) {
      router.push(`${item.url}#${item.sectionId}`);
    } else {
      router.push(item.url);
    }
  };

  const typeColors: Record<string, string> = {
    topic: '#6366f1',
    section: '#06b6d4',
    definition: '#f59e0b',
    quiz: '#10b981',
    viva: '#ef4444',
    module: '#8b5cf6',
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        bgcolor:
          mode === 'dark' ? alpha('#1a1830', 0.95) : alpha('#ffffff', 0.95),
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ gap: 1.5, minHeight: '64px !important' }}>
        {/* ── Menu Toggle (mobile) ── */}
        {isMobile && (
          <IconButton
            edge="start"
            onClick={onMenuClick}
            aria-label="open navigation menu"
            sx={{ color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* ── Logo ── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onClick={() => router.push('/')}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
            }}
          >
            🗄️
          </Box>
          <Typography
            variant="h6"
            fontWeight={800}
            sx={{
              display: { xs: 'none', sm: 'block' },
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            DBMS Hub
          </Typography>
        </Box>

        {/* ── Global Search ── */}
        <Box sx={{ flexGrow: 1, maxWidth: 480, position: 'relative', mx: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: mode === 'dark'
                ? alpha(theme.palette.primary.main, 0.1)
                : alpha(theme.palette.primary.main, 0.06),
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              px: 2,
              py: 0.5,
              transition: 'all 0.2s ease',
              '&:focus-within': {
                border: `1px solid ${theme.palette.primary.main}`,
                boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)}`,
              },
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: '1.1rem' }} />
            <InputBase
              placeholder="Search topics, definitions, quizzes… (Ctrl+K)"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => query.length >= 2 && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              inputProps={{ 'aria-label': 'global search' }}
              sx={{ flex: 1, fontSize: '0.9rem' }}
            />
            {query && (
              <IconButton size="small" onClick={() => { setQuery(''); setResults([]); }}>
                ✕
              </IconButton>
            )}
          </Box>

          {/* ── Search Dropdown ── */}
          <Fade in={showResults && results.length > 0}>
            <Paper
              elevation={8}
              sx={{
                position: 'absolute',
                top: '110%',
                left: 0,
                right: 0,
                zIndex: 9999,
                borderRadius: 2,
                overflow: 'hidden',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <List dense disablePadding>
                {results.map((item) => (
                  <ListItem
                    key={item.id}
                    onClick={() => handleResultClick(item)}
                    sx={{
                      cursor: 'pointer',
                      py: 1,
                      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, fontSize: '1.1rem' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      secondary={item.content.slice(0, 60) + '…'}
                      primaryTypographyProps={{ fontWeight: 600, fontSize: '0.875rem' }}
                      secondaryTypographyProps={{ fontSize: '0.75rem' }}
                    />
                    <Chip
                      label={item.type}
                      size="small"
                      sx={{
                        ml: 1,
                        bgcolor: alpha(typeColors[item.type] || '#6366f1', 0.15),
                        color: typeColors[item.type] || '#6366f1',
                        fontWeight: 700,
                        fontSize: '0.65rem',
                        height: 20,
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Fade>
        </Box>

        {/* ── Theme Toggle ── */}
        <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <IconButton
            onClick={toggleTheme}
            aria-label="toggle theme"
            sx={{
              ml: 'auto',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.2),
                transform: 'rotate(15deg)',
              },
            }}
          >
            {mode === 'dark' ? (
              <LightModeIcon sx={{ color: '#fbbf24' }} />
            ) : (
              <DarkModeIcon sx={{ color: '#6366f1' }} />
            )}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
