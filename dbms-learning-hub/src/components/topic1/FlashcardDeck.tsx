'use client';

// ============================================================
// Flashcard Deck – Terminology flip cards
// ============================================================
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  alpha,
  useTheme,
  LinearProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FlipIcon from '@mui/icons-material/Flip';
import { useProgressStore } from '@/store/progressStore';

const flashcards = [
  {
    id: 'fc-data',
    term: 'Data',
    simpleMeaning: 'Raw facts',
    examMeaning: 'Unprocessed facts and figures without context',
    example: 'Numbers, names, dates — before being processed',
    emoji: '📝',
    color: '#6366f1',
  },
  {
    id: 'fc-database',
    term: 'Database',
    simpleMeaning: 'Collection of data',
    examMeaning: 'An organized collection of related data stored electronically',
    example: 'Student DB with Roll No, Name, Branch, Marks',
    emoji: '🗄️',
    color: '#8b5cf6',
  },
  {
    id: 'fc-dbms',
    term: 'DBMS',
    simpleMeaning: 'Database software',
    examMeaning:
      'A collection of programs that enables users to define, create, maintain, and control access to databases',
    example: 'MySQL, Oracle, PostgreSQL, SQL Server',
    emoji: '💻',
    color: '#06b6d4',
  },
  {
    id: 'fc-record',
    term: 'Record',
    simpleMeaning: 'One complete row',
    examMeaning: 'A collection of related fields representing one complete entity instance',
    example: 'Row: 101 | Rahul | CSE = one student record',
    emoji: '📋',
    color: '#10b981',
  },
  {
    id: 'fc-field',
    term: 'Field',
    simpleMeaning: 'One column',
    examMeaning: 'A single attribute or characteristic of an entity',
    example: '"Name" column in a student table is one field',
    emoji: '🏷️',
    color: '#f59e0b',
  },
  {
    id: 'fc-table',
    term: 'Table',
    simpleMeaning: 'Collection of records',
    examMeaning:
      'A structured storage format with rows (records) and columns (fields) for storing related data',
    example: 'Student Table with all student records',
    emoji: '📊',
    color: '#ef4444',
  },
];

export default function FlashcardDeck() {
  const theme = useTheme();
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [viewed, setViewed] = useState<Set<string>>(new Set());
  const { markFlashcardViewed } = useProgressStore();

  const card = flashcards[current];
  const progress = (viewed.size / flashcards.length) * 100;

  const go = (dir: -1 | 1) => {
    setFlipped(false);
    setTimeout(() => {
      setCurrent((c) => (c + dir + flashcards.length) % flashcards.length);
    }, 150);
  };

  const handleFlip = () => {
    if (!flipped) {
      const newViewed = new Set(viewed);
      newViewed.add(card.id);
      setViewed(newViewed);
      markFlashcardViewed(card.id);
    }
    setFlipped((f) => !f);
  };

  return (
    <Box>
      {/* Progress */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            {current + 1} / {flashcards.length} cards
          </Typography>
          <Typography variant="caption" color="primary.main" fontWeight={700}>
            {viewed.size} / {flashcards.length} flipped
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ borderRadius: 4 }} />
        <Box sx={{ display: 'flex', gap: 0.5, mt: 1.5, flexWrap: 'wrap' }}>
          {flashcards.map((fc, i) => (
            <Box
              key={fc.id}
              onClick={() => { setFlipped(false); setTimeout(() => setCurrent(i), 150); }}
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                bgcolor:
                  i === current
                    ? fc.color
                    : viewed.has(fc.id)
                    ? alpha(fc.color, 0.3)
                    : alpha(theme.palette.divider, 0.3),
                fontSize: '0.75rem',
                transition: 'all 0.2s ease',
                '&:hover': { transform: 'scale(1.1)' },
              }}
            >
              {fc.emoji}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Flashcard */}
      <Box
        className="flip-card"
        sx={{
          width: '100%',
          height: 260,
          cursor: 'pointer',
          perspective: '1200px',
          mb: 3,
        }}
        onClick={handleFlip}
        role="button"
        aria-label={flipped ? 'Show front of card' : 'Flip card to see definition'}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${card.id}-${flipped}`}
            initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', height: '100%' }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                background: flipped
                  ? `linear-gradient(135deg, ${alpha(card.color, 0.15)}, ${alpha(card.color, 0.05)})`
                  : `linear-gradient(135deg, ${card.color}22, ${card.color}08)`,
                border: `2px solid ${alpha(card.color, flipped ? 0.5 : 0.3)}`,
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
              }}
            >
              {/* Background emoji decoration */}
              <Typography
                sx={{
                  position: 'absolute',
                  fontSize: '8rem',
                  opacity: 0.05,
                  top: -20,
                  right: -10,
                  lineHeight: 1,
                }}
              >
                {card.emoji}
              </Typography>

              {!flipped ? (
                // Front
                <>
                  <Chip
                    label="TERM"
                    size="small"
                    sx={{
                      mb: 2,
                      bgcolor: alpha(card.color, 0.2),
                      color: card.color,
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                    }}
                  />
                  <Typography sx={{ fontSize: '3rem', mb: 1.5 }}>{card.emoji}</Typography>
                  <Typography variant="h4" fontWeight={900} color={card.color} sx={{ mb: 1 }}>
                    {card.term}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click to reveal definition
                  </Typography>
                </>
              ) : (
                // Back
                <>
                  <Chip
                    label="DEFINITION"
                    size="small"
                    sx={{
                      mb: 2,
                      bgcolor: alpha(card.color, 0.2),
                      color: card.color,
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                    }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color={card.color}
                    sx={{ mb: 0.5 }}
                  >
                    {card.term}
                  </Typography>
                  <Typography variant="body1" fontWeight={700} sx={{ mb: 1 }}>
                    "{card.simpleMeaning}"
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {card.examMeaning}
                  </Typography>
                  <Box
                    sx={{
                      px: 2,
                      py: 0.75,
                      borderRadius: 1.5,
                      bgcolor: alpha(card.color, 0.1),
                      border: `1px solid ${alpha(card.color, 0.2)}`,
                    }}
                  >
                    <Typography variant="caption" fontWeight={600} color={card.color}>
                      💡 {card.example}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Controls */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          onClick={() => go(-1)}
          id="flashcard-prev"
        >
          Previous
        </Button>
        <Button
          variant="contained"
          startIcon={<FlipIcon />}
          onClick={handleFlip}
          id="flashcard-flip"
          sx={{ background: `linear-gradient(135deg, ${card.color}, ${alpha(card.color, 0.7)})` }}
        >
          {flipped ? 'Show Term' : 'Reveal Definition'}
        </Button>
        <Button
          variant="outlined"
          endIcon={<NavigateNextIcon />}
          onClick={() => go(1)}
          id="flashcard-next"
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
