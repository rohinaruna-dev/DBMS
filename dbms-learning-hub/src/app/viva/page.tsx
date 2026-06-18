'use client';

// ============================================================
// Viva Corner – Random Viva Generator
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
  Collapse,
  LinearProgress,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { vivaQuestions } from '@/data/vivaData';
import { useProgressStore } from '@/store/progressStore';
import type { VivaQuestion } from '@/types';

const DIFFICULTY_COLOR = { easy: '#10b981', medium: '#f59e0b', hard: '#ef4444' };
const CATEGORIES = ['All', 'Definition', 'Concepts', 'Functions', 'Components', 'Applications', 'Analogies', 'Industry', 'Terminology', 'Importance'];

export default function VivaPage() {
  const theme = useTheme();
  const { addPlaygroundOperation } = useProgressStore();
  const [current, setCurrent] = useState<VivaQuestion | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [history, setHistory] = useState<VivaQuestion[]>([]);
  const [category, setCategory] = useState('All');
  const [practiced, setPracticed] = useState(0);

  const filtered = category === 'All' ? vivaQuestions : vivaQuestions.filter(q => q.category === category);

  const askQuestion = () => {
    const available = filtered.filter(q => q.id !== current?.id);
    if (available.length === 0) return;
    const random = available[Math.floor(Math.random() * available.length)];
    setCurrent(random);
    setShowAnswer(false);
    setHistory(prev => [random, ...prev.slice(0, 4)]);
    setPracticed(p => p + 1);
    if (practiced === 4) {
      addPlaygroundOperation({ type: 'SEARCH', timestamp: Date.now(), details: 'Practiced 5 viva questions!', success: true });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Chip label="🎤 Viva Corner" sx={{ mb: 2, fontWeight: 700, bgcolor: alpha('#ef4444', 0.1), color: '#ef4444' }} />
        <Typography variant="h3" fontWeight={900} sx={{ mb: 1 }}>
          Viva Practice
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Practice your oral exam skills. Click "Ask Me a Viva" to get a random question, then click to reveal the answer.
        </Typography>
      </motion.div>

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Paper elevation={0} sx={{ p: 2, borderRadius: 3, flex: 1, minWidth: 120, textAlign: 'center', border: `1px solid ${alpha('#ef4444', 0.2)}`, bgcolor: alpha('#ef4444', 0.05) }}>
          <Typography variant="h4" fontWeight={900} color="#ef4444">{practiced}</Typography>
          <Typography variant="caption" color="text.secondary">Questions Practiced</Typography>
        </Paper>
        <Paper elevation={0} sx={{ p: 2, borderRadius: 3, flex: 1, minWidth: 120, textAlign: 'center', border: `1px solid ${alpha('#6366f1', 0.2)}`, bgcolor: alpha('#6366f1', 0.05) }}>
          <Typography variant="h4" fontWeight={900} color="#6366f1">{filtered.length}</Typography>
          <Typography variant="caption" color="text.secondary">Available Questions</Typography>
        </Paper>
      </Box>

      {/* Filter */}
      <Box sx={{ mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select value={category} label="Filter by Category" onChange={(e) => setCategory(e.target.value)} id="viva-category-select">
            {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      {/* Ask Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<MicIcon />}
          endIcon={<ShuffleIcon />}
          onClick={askQuestion}
          fullWidth
          id="ask-viva-btn"
          sx={{
            py: 2.5,
            fontSize: '1.1rem',
            fontWeight: 800,
            mb: 4,
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            boxShadow: '0 8px 30px rgba(239,68,68,0.4)',
            '&:hover': { boxShadow: '0 12px 40px rgba(239,68,68,0.5)' },
          }}
        >
          🎤 Ask Me a Viva Question
        </Button>
      </motion.div>

      {/* Current Question */}
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 3,
                borderRadius: 4,
                border: `2px solid ${alpha('#ef4444', 0.3)}`,
                bgcolor: alpha('#ef4444', 0.04),
              }}
            >
              <Box sx={{ display: 'flex', gap: 1, mb: 2.5, flexWrap: 'wrap' }}>
                <Chip label={current.category} size="small" sx={{ fontWeight: 700, bgcolor: alpha('#6366f1', 0.1), color: '#6366f1' }} />
                <Chip
                  label={current.difficulty}
                  size="small"
                  sx={{ fontWeight: 700, bgcolor: alpha(DIFFICULTY_COLOR[current.difficulty], 0.1), color: DIFFICULTY_COLOR[current.difficulty] }}
                />
              </Box>
              <Typography variant="h5" fontWeight={800} sx={{ mb: 3, lineHeight: 1.4 }}>
                ❓ {current.question}
              </Typography>

              {!showAnswer ? (
                <Button
                  variant="outlined"
                  startIcon={<LightbulbIcon />}
                  onClick={() => setShowAnswer(true)}
                  id="show-answer-btn"
                  sx={{ borderColor: '#f59e0b', color: '#f59e0b', '&:hover': { bgcolor: alpha('#f59e0b', 0.08), borderColor: '#f59e0b' } }}
                >
                  💡 Show Answer
                </Button>
              ) : (
                <Collapse in={showAnswer}>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: 2.5,
                        bgcolor: alpha('#10b981', 0.06),
                        border: `1px solid ${alpha('#10b981', 0.3)}`,
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight={800} color="#10b981" sx={{ mb: 1 }}>
                        ✅ Answer:
                      </Typography>
                      <Typography variant="body1" lineHeight={1.8} sx={{ whiteSpace: 'pre-line' }}>
                        {current.answer}
                      </Typography>
                    </Box>
                  </motion.div>
                </Collapse>
              )}
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {!current && (
        <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
          <Typography variant="h1" sx={{ mb: 2, fontSize: '4rem' }}>🎤</Typography>
          <Typography variant="h6" fontWeight={600}>
            Ready to practice your viva?
          </Typography>
          <Typography variant="body2">
            Click the button above to get your first question!
          </Typography>
        </Box>
      )}

      {/* History */}
      {history.length > 1 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            📋 Recent Questions
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {history.slice(1).map((q) => (
              <Box
                key={q.id}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) },
                }}
                onClick={() => { setCurrent(q); setShowAnswer(false); }}
              >
                <Typography variant="body2" fontWeight={600}>
                  {q.question}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
}
