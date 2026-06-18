'use client';

// ============================================================
// Workflow Animation – Paper Files vs DBMS System Comparison
// ============================================================
import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper, alpha, useTheme, Chip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Step {
  icon: string;
  label: string;
  delay: number;
}

const paperSteps: Step[] = [
  { icon: '🧑‍🎓', label: 'Student Request', delay: 0 },
  { icon: '🗂️', label: 'Find Register', delay: 0.4 },
  { icon: '👀', label: 'Manual Search', delay: 0.8 },
  { icon: '🧮', label: 'Calculate Attendance', delay: 1.2 },
  { icon: '📊', label: 'Result', delay: 1.6 },
];

const dbmsSteps: Step[] = [
  { icon: '🧑‍🎓', label: 'Student Request', delay: 0 },
  { icon: '🔍', label: 'Database Query', delay: 0.3 },
  { icon: '⚡', label: 'Instant Result', delay: 0.6 },
];

function WorkflowStep({ step, index, active }: { step: Step; index: number; active: boolean }) {
  const theme = useTheme();
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: step.delay, type: 'spring', stiffness: 200 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
              }}
            >
              {step.icon}
            </Box>
            <Typography variant="caption" fontWeight={600} textAlign="center" sx={{ maxWidth: 80 }}>
              {step.label}
            </Typography>
            {index < paperSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: step.delay + 0.2 }}
              >
                <Typography color="text.secondary" sx={{ mt: -0.5 }}>↓</Typography>
              </motion.div>
            )}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function WorkflowAnimation() {
  const theme = useTheme();
  const [playing, setPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const handlePlay = () => {
    setKey((k) => k + 1);
    setPlaying(true);
  };

  const handleReset = () => {
    setPlaying(false);
    setKey((k) => k + 1);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          onClick={handlePlay}
          disabled={playing}
          id="workflow-play-btn"
          sx={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          Animate Comparison
        </Button>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleReset}
          id="workflow-reset-btn"
        >
          Reset
        </Button>
      </Box>

      <Grid container spacing={3} key={key}>
        {/* ── Paper Files ── */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: `2px solid ${alpha('#ef4444', 0.3)}`,
              bgcolor: alpha('#ef4444', 0.04),
              minHeight: 380,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" fontWeight={800} color="#ef4444">
                📄 Paper Files System
              </Typography>
              {playing && (
                <Chip
                  label="⏱️ ~5 Minutes"
                  sx={{ bgcolor: alpha('#ef4444', 0.15), color: '#ef4444', fontWeight: 800 }}
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              {paperSteps.map((step, i) => (
                <WorkflowStep key={step.label} step={step} index={i} active={playing} />
              ))}
            </Box>
            {playing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
              >
                <Box
                  sx={{
                    mt: 2,
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha('#ef4444', 0.1),
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body2" color="#ef4444" fontWeight={700}>
                    ❌ Takes 5+ Minutes per student!
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    500 students = 2500 minutes of manual work
                  </Typography>
                </Box>
              </motion.div>
            )}
          </Paper>
        </Grid>

        {/* ── DBMS System ── */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: `2px solid ${alpha('#10b981', 0.3)}`,
              bgcolor: alpha('#10b981', 0.04),
              minHeight: 380,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" fontWeight={800} color="#10b981">
                🗄️ DBMS System
              </Typography>
              {playing && (
                <Chip
                  label="⚡ 2 Seconds"
                  sx={{ bgcolor: alpha('#10b981', 0.15), color: '#10b981', fontWeight: 800 }}
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              {dbmsSteps.map((step, i) => (
                <WorkflowStep key={step.label} step={{ ...step, delay: step.delay + 0.5 }} index={i} active={playing} />
              ))}
            </Box>
            {playing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <Box
                  sx={{
                    mt: 2,
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha('#10b981', 0.1),
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body2" color="#10b981" fontWeight={700}>
                    ✅ Results in under 2 seconds!
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    500 students = same 2 seconds
                  </Typography>
                </Box>
              </motion.div>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* ── Verdict ── */}
      {playing && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }}>
          <Box
            sx={{
              mt: 3,
              p: 2.5,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" fontWeight={800}>
              🚀 DBMS is 150× faster than paper files!
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              This is why every modern college uses a Database Management System.
            </Typography>
          </Box>
        </motion.div>
      )}
    </Box>
  );
}
