'use client';
import React, { useState } from 'react';
import { Box, Typography, Button, Paper, alpha, Grid } from '@mui/material';

const SCENARIOS = [
  { text: 'Person and Passport', type: '1:1' },
  { text: 'Department and Employee', type: '1:N' },
  { text: 'Student and Course', type: 'M:N' },
  { text: 'State and Governor', type: '1:1' },
  { text: 'Author and Book', type: '1:N' },
  { text: 'Customer and Product', type: 'M:N' },
];

export default function CardinalityMatcher() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const currentScenario = SCENARIOS[currentIndex];
  const isFinished = currentIndex >= SCENARIOS.length;

  const handleGuess = (guess: string) => {
    if (guess === currentScenario.type) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    
    setTimeout(() => {
      setFeedback(null);
      setCurrentIndex(currentIndex + 1);
    }, 1200);
  };

  const reset = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', textAlign: 'center', py: 4 }}>
      <Typography variant="h5" fontWeight={800} mb={2}>Cardinality Matcher</Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Match the real-world scenario to its correct Cardinality mapping.
      </Typography>

      {isFinished ? (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: alpha('#ec4899', 0.1), border: '1px solid #ec4899' }}>
          <Typography variant="h4" fontWeight={800} color="#ec4899" mb={2}>All Scenarios Matched!</Typography>
          <Typography variant="h6" mb={3}>Your accuracy: {score} / {SCENARIOS.length}</Typography>
          <Button variant="contained" onClick={reset} color="secondary">Try Again</Button>
        </Paper>
      ) : (
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2} fontWeight={700}>
            Scenario {currentIndex + 1} of {SCENARIOS.length}
          </Typography>
          
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              mb: 4,
              borderRadius: 4,
              bgcolor: feedback === 'correct' ? alpha('#10b981', 0.15) : feedback === 'incorrect' ? alpha('#ef4444', 0.15) : alpha('#ec4899', 0.05),
              border: `2px dashed ${feedback === 'correct' ? '#10b981' : feedback === 'incorrect' ? '#ef4444' : '#ec4899'}`,
              transition: 'all 0.3s ease',
            }}
          >
            <Typography variant="h4" fontWeight={800} color={feedback === 'correct' ? '#10b981' : feedback === 'incorrect' ? '#ef4444' : 'text.primary'}>
              {currentScenario.text}
            </Typography>
            
            <Box sx={{ minHeight: 40, mt: 2 }}>
              {feedback === 'correct' && <Typography color="success.main" fontWeight={800}>🎉 Spot on!</Typography>}
              {feedback === 'incorrect' && <Typography color="error.main" fontWeight={800}>❌ Nope! The correct cardinality is {currentScenario.type}</Typography>}
            </Box>
          </Paper>

          <Grid container spacing={2} justifyContent="center">
            {['1:1', '1:N', 'N:1', 'M:N'].map(type => (
              <Grid item xs={6} sm={3} key={type}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  disabled={feedback !== null}
                  onClick={() => handleGuess(type)}
                  sx={{
                    py: 2.5,
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    borderRadius: 3,
                    borderColor: '#ec4899',
                    color: '#ec4899',
                    '&:hover': {
                      bgcolor: alpha('#ec4899', 0.1),
                      borderColor: '#ec4899',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  {type}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
