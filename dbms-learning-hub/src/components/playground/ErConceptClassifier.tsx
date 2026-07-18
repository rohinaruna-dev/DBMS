'use client';
import React, { useState } from 'react';
import { Box, Typography, Button, Paper, alpha, Chip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS = [
  { term: 'Student', type: 'Entity' },
  { term: 'Name', type: 'Attribute' },
  { term: 'Enrolls In', type: 'Relationship' },
  { term: 'Course', type: 'Entity' },
  { term: 'Age', type: 'Attribute' },
  { term: 'Teaches', type: 'Relationship' },
  { term: 'Department', type: 'Entity' },
  { term: 'Location', type: 'Attribute' },
];

export default function ErConceptClassifier() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const currentItem = ITEMS[currentIndex];
  const isFinished = currentIndex >= ITEMS.length;

  const handleGuess = (guess: string) => {
    if (guess === currentItem.type) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    
    setTimeout(() => {
      setFeedback(null);
      setCurrentIndex(currentIndex + 1);
    }, 1000);
  };

  const reset = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center', py: 4 }}>
      <Typography variant="h5" fontWeight={800} mb={2}>ER Concept Classifier</Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Classify the given term as an Entity, Attribute, or Relationship.
      </Typography>

      {isFinished ? (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: alpha('#10b981', 0.1), border: '1px solid #10b981' }}>
          <Typography variant="h4" fontWeight={800} color="#10b981" mb={2}>Game Over!</Typography>
          <Typography variant="h6" mb={3}>You scored {score} out of {ITEMS.length}</Typography>
          <Button variant="contained" onClick={reset} color="success">Play Again</Button>
        </Paper>
      ) : (
        <Box>
          <Typography variant="subtitle1" fontWeight={700} color="text.secondary" mb={2}>
            Term {currentIndex + 1} of {ITEMS.length}
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 6,
              mb: 4,
              borderRadius: 4,
              bgcolor: feedback === 'correct' ? alpha('#10b981', 0.2) : feedback === 'incorrect' ? alpha('#ef4444', 0.2) : alpha('#6366f1', 0.05),
              border: `2px solid ${feedback === 'correct' ? '#10b981' : feedback === 'incorrect' ? '#ef4444' : '#6366f1'}`,
              transition: 'all 0.3s ease',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.term}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Typography variant="h3" fontWeight={900} color="primary.main">
                  {currentItem.term}
                </Typography>
              </motion.div>
            </AnimatePresence>
            
            {feedback === 'correct' && <Typography color="success.main" fontWeight={800} mt={2}>✅ Correct!</Typography>}
            {feedback === 'incorrect' && <Typography color="error.main" fontWeight={800} mt={2}>❌ Incorrect! It's a {currentItem.type}</Typography>}
          </Paper>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            {['Entity', 'Attribute', 'Relationship'].map(type => (
              <Button
                key={type}
                variant="outlined"
                size="large"
                disabled={feedback !== null}
                onClick={() => handleGuess(type)}
                sx={{
                  fontWeight: 800,
                  px: 4,
                  py: 2,
                  borderRadius: 3,
                  borderColor: type === 'Entity' ? '#6366f1' : type === 'Attribute' ? '#f59e0b' : '#06b6d4',
                  color: type === 'Entity' ? '#6366f1' : type === 'Attribute' ? '#f59e0b' : '#06b6d4',
                  '&:hover': {
                    bgcolor: alpha(type === 'Entity' ? '#6366f1' : type === 'Attribute' ? '#f59e0b' : '#06b6d4', 0.1),
                    borderColor: type === 'Entity' ? '#6366f1' : type === 'Attribute' ? '#f59e0b' : '#06b6d4',
                  }
                }}
              >
                {type}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
