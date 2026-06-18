'use client';

// ============================================================
// Revision Cards – Swipeable One-Minute Revision
// ============================================================
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  alpha,
  useTheme,
  LinearProgress,
  IconButton,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CheckIcon from '@mui/icons-material/Check';
import { revisionCards } from '@/data/revisionData';
import { useProgressStore } from '@/store/progressStore';

export default function RevisionPage() {
  const theme = useTheme();
  const { markRevisionCardViewed } = useProgressStore();
  const [current, setCurrent] = useState(0);
  const [viewed, setViewed] = useState<Set<string>>(new Set());
  const [dir, setDir] = useState(1);

  const card = revisionCards[current];
  const progress = (viewed.size / revisionCards.length) * 100;

  const go = (direction: number) => {
    const next = (current + direction + revisionCards.length) % revisionCards.length;
    setDir(direction);
    setCurrent(next);
    const c = revisionCards[next];
    if (!viewed.has(c.id)) {
      setViewed(prev => new Set([...prev, c.id]));
      markRevisionCardViewed(c.id);
    }
  };

  const markCurrent = () => {
    if (!viewed.has(card.id)) {
      setViewed(prev => new Set([...prev, card.id]));
      markRevisionCardViewed(card.id);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Chip label="🚀 Revision Center" sx={{ mb: 2, fontWeight: 700, bgcolor: alpha('#f59e0b', 0.1), color: '#f59e0b' }} />
        <Typography variant="h3" fontWeight={900} sx={{ mb: 1 }}>
          One-Minute Revision
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Swipe through revision cards for a quick exam recap. Perfect for last-minute revision!
        </Typography>
      </motion.div>

      {/* Progress */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" fontWeight={600} color="text.secondary">
            Card {current + 1} of {revisionCards.length}
          </Typography>
          <Typography variant="body2" fontWeight={700} color="#f59e0b">
            {viewed.size}/{revisionCards.length} reviewed
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ '& .MuiLinearProgress-bar': { bgcolor: '#f59e0b' }, bgcolor: alpha('#f59e0b', 0.15) }}
        />
        {/* Dot nav */}
        <Box sx={{ display: 'flex', gap: 0.75, mt: 1.5, flexWrap: 'wrap' }}>
          {revisionCards.map((c, i) => (
            <Box
              key={c.id}
              onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); if (!viewed.has(c.id)) { setViewed(prev => new Set([...prev, c.id])); markRevisionCardViewed(c.id); } }}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                cursor: 'pointer',
                bgcolor: i === current ? c.color : viewed.has(c.id) ? alpha(c.color, 0.5) : alpha(theme.palette.divider, 0.4),
                transition: 'all 0.2s ease',
                '&:hover': { transform: 'scale(1.3)' },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Card */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={card.id}
          custom={dir}
          initial={{ opacity: 0, x: dir * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -80 }}
          transition={{ duration: 0.3 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              mb: 3,
              borderRadius: 4,
              border: `2px solid ${alpha(card.color, 0.35)}`,
              bgcolor: alpha(card.color, 0.05),
              minHeight: 340,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background emoji */}
            <Typography sx={{ position: 'absolute', fontSize: '10rem', opacity: 0.04, right: -20, top: -20, lineHeight: 1, pointerEvents: 'none' }}>
              {card.emoji}
            </Typography>

            {/* Category tag */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Chip label={card.category} size="small" sx={{ bgcolor: alpha(card.color, 0.15), color: card.color, fontWeight: 700 }} />
              {viewed.has(card.id) && (
                <Chip label="✅ Reviewed" size="small" sx={{ bgcolor: alpha('#10b981', 0.1), color: '#10b981', fontWeight: 700 }} />
              )}
            </Box>

            <Typography variant="h5" fontWeight={800} color={card.color} sx={{ mb: 2.5, display: 'flex', gap: 1.5, alignItems: 'center' }}>
              <span>{card.emoji}</span>
              <span>{card.title}</span>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'pre-line',
                lineHeight: 2,
                fontSize: { xs: '0.9rem', md: '1rem' },
              }}
            >
              {card.content}
            </Typography>
          </Paper>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <IconButton
          onClick={() => go(-1)}
          size="large"
          aria-label="previous card"
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) },
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <Button
          variant="outlined"
          startIcon={<CheckIcon />}
          onClick={markCurrent}
          disabled={viewed.has(card.id)}
          id="mark-reviewed-btn"
          sx={{ borderColor: '#10b981', color: '#10b981' }}
        >
          Mark Reviewed
        </Button>
        <IconButton
          onClick={() => go(1)}
          size="large"
          aria-label="next card"
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) },
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>

      {/* All cards nav */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>All Topics</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {revisionCards.map((c, i) => (
            <Chip
              key={c.id}
              label={`${c.emoji} ${c.title}`}
              onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
              sx={{
                cursor: 'pointer',
                fontWeight: 600,
                bgcolor: i === current ? c.color : alpha(c.color, 0.1),
                color: i === current ? 'white' : c.color,
                border: viewed.has(c.id) ? `2px solid ${c.color}` : 'none',
                '&:hover': { bgcolor: alpha(c.color, 0.3) },
              }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
