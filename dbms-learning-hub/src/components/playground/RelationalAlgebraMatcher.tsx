'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  alpha,
  useTheme,
  Alert,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';

interface MatchItem {
  id: string;
  symbol: string;
  name: string;
  description: string;
}

const ALGEBRA_ITEMS: MatchItem[] = [
  { id: 'select', symbol: 'σ', name: 'Select', description: 'Filters rows that satisfy a given condition.' },
  { id: 'project', symbol: 'π', name: 'Project', description: 'Selects specific columns and discards the rest.' },
  { id: 'union', symbol: '∪', name: 'Union', description: 'Combines tuples from two relations, removing duplicates.' },
  { id: 'setdiff', symbol: '-', name: 'Set Difference', description: 'Returns tuples in the first relation but not in the second.' },
  { id: 'cartesian', symbol: '×', name: 'Cartesian Product', description: 'Combines every tuple of the first relation with every tuple of the second.' },
  { id: 'join', symbol: '⨝', name: 'Natural Join', description: 'Combines two relations based on common attributes.' },
];

export default function RelationalAlgebraMatcher() {
  const theme = useTheme();

  const [leftItems, setLeftItems] = useState<{ id: string; symbol: string }[]>([]);
  const [rightItems, setRightItems] = useState<{ id: string; name: string; description: string }[]>([]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [wrongMatch, setWrongMatch] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const initGame = () => {
    const shuffledLeft = [...ALGEBRA_ITEMS]
      .map(item => ({ id: item.id, symbol: item.symbol }))
      .sort(() => Math.random() - 0.5);
      
    const shuffledRight = [...ALGEBRA_ITEMS]
      .map(item => ({ id: item.id, name: item.name, description: item.description }))
      .sort(() => Math.random() - 0.5);

    setLeftItems(shuffledLeft);
    setRightItems(shuffledRight);
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedPairs([]);
    setWrongMatch(false);
    setIsFinished(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      if (selectedLeft === selectedRight) {
        // Match!
        setMatchedPairs(prev => [...prev, selectedLeft]);
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongMatch(false);
        
        if (matchedPairs.length + 1 === ALGEBRA_ITEMS.length) {
          setIsFinished(true);
        }
      } else {
        // Wrong match
        setWrongMatch(true);
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setWrongMatch(false);
        }, 800);
      }
    }
  }, [selectedLeft, selectedRight, matchedPairs.length]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" fontWeight={800} color="primary.main">
            🧮 Relational Algebra Matcher
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Match the symbol on the left with its correct name and description on the right.
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={initGame}>
          Reset
        </Button>
      </Box>

      {isFinished && (
        <Alert
          severity="success"
          icon={<CheckCircleIcon fontSize="inherit" />}
          sx={{ mb: 3, borderRadius: 2, '& .MuiAlert-message': { width: '100%' } }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" fontWeight={700}>
              Excellent! You've matched all the Relational Algebra operators correctly.
            </Typography>
            <Button size="small" variant="contained" color="success" onClick={initGame} sx={{ borderRadius: 2 }}>
              Play Again
            </Button>
          </Box>
        </Alert>
      )}

      <Grid container spacing={3} sx={{ flex: 1 }}>
        {/* Left Column (Symbols) */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} color="text.secondary" sx={{ textAlign: 'center' }}>
              Symbols
            </Typography>
            <AnimatePresence>
              {leftItems.map((item) => {
                const isMatched = matchedPairs.includes(item.id);
                const isSelected = selectedLeft === item.id;

                let bgcolor = 'background.paper';
                let borderColor = alpha(theme.palette.divider, 0.5);
                let color = 'text.primary';

                if (isMatched) {
                  bgcolor = alpha('#10b981', 0.1);
                  borderColor = '#10b981';
                  color = '#10b981';
                } else if (isSelected) {
                  if (wrongMatch) {
                    bgcolor = alpha('#ef4444', 0.1);
                    borderColor = '#ef4444';
                    color = '#ef4444';
                  } else {
                    bgcolor = alpha(theme.palette.primary.main, 0.1);
                    borderColor = theme.palette.primary.main;
                    color = theme.palette.primary.main;
                  }
                }

                return (
                  <motion.div
                    key={`left-${item.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={!isMatched ? { scale: 1.02 } : {}}
                    whileTap={!isMatched ? { scale: 0.98 } : {}}
                  >
                    <Paper
                      elevation={0}
                      onClick={() => !isMatched && !wrongMatch && setSelectedLeft(item.id)}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        textAlign: 'center',
                        cursor: isMatched || wrongMatch ? 'default' : 'pointer',
                        bgcolor,
                        border: `2px solid ${borderColor}`,
                        color,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Typography variant="h3" fontWeight={800}>
                        {item.symbol}
                      </Typography>
                    </Paper>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </Box>
        </Grid>

        {/* Right Column (Descriptions) */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} color="text.secondary" sx={{ textAlign: 'center' }}>
              Definitions
            </Typography>
            <AnimatePresence>
              {rightItems.map((item) => {
                const isMatched = matchedPairs.includes(item.id);
                const isSelected = selectedRight === item.id;

                let bgcolor = 'background.paper';
                let borderColor = alpha(theme.palette.divider, 0.5);

                if (isMatched) {
                  bgcolor = alpha('#10b981', 0.05);
                  borderColor = '#10b981';
                } else if (isSelected) {
                  if (wrongMatch) {
                    bgcolor = alpha('#ef4444', 0.05);
                    borderColor = '#ef4444';
                  } else {
                    bgcolor = alpha(theme.palette.primary.main, 0.05);
                    borderColor = theme.palette.primary.main;
                  }
                }

                return (
                  <motion.div
                    key={`right-${item.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={!isMatched ? { scale: 1.01 } : {}}
                    whileTap={!isMatched ? { scale: 0.99 } : {}}
                  >
                    <Paper
                      elevation={0}
                      onClick={() => !isMatched && !wrongMatch && setSelectedRight(item.id)}
                      sx={{
                        p: 2,
                        px: 3,
                        borderRadius: 3,
                        cursor: isMatched || wrongMatch ? 'default' : 'pointer',
                        bgcolor,
                        border: `2px solid ${borderColor}`,
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        minHeight: 90,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={700} sx={{ color: isMatched ? '#10b981' : isSelected && wrongMatch ? '#ef4444' : isSelected ? 'primary.main' : 'text.primary' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
