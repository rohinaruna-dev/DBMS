'use client';

// ============================================================
// Progress Tracker – Learning Dashboard
// ============================================================
import React from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  LinearProgress,
  alpha,
  useTheme,
  Button,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useProgressStore } from '@/store/progressStore';

const MotionPaper = motion(Paper);

export default function ProgressPage() {
  const theme = useTheme();
  const {
    topicsVisited,
    quizSessions,
    playgroundOperations,
    revisionCardsViewed,
    flashcardsViewed,
    achievements,
    totalTimeSpent,
    getQuizAvgScore,
    resetProgress,
  } = useProgressStore();

  const totalSections = 13;
  const sectionsVisited = Object.keys(topicsVisited).length;
  const quizAvg = getQuizAvgScore();
  const lastScore = quizSessions.length
    ? Math.round((quizSessions[quizSessions.length - 1].score / quizSessions[quizSessions.length - 1].totalQuestions) * 100)
    : 0;
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const minutes = Math.round(totalTimeSpent / 60);

  const stats = [
    { label: 'Topics Visited', value: `${sectionsVisited}/${totalSections}`, color: '#6366f1', emoji: '📚', progress: (sectionsVisited / totalSections) * 100 },
    { label: 'Quiz Sessions', value: quizSessions.length, color: '#10b981', emoji: '🧩', progress: Math.min(quizSessions.length * 10, 100) },
    { label: 'Avg Quiz Score', value: `${quizAvg}%`, color: '#f59e0b', emoji: '📊', progress: quizAvg },
    { label: 'DB Operations', value: playgroundOperations.length, color: '#06b6d4', emoji: '🎮', progress: Math.min(playgroundOperations.length * 5, 100) },
    { label: 'Cards Reviewed', value: `${revisionCardsViewed.length}/10`, color: '#ec4899', emoji: '🚀', progress: (revisionCardsViewed.length / 10) * 100 },
    { label: 'Time Spent', value: `${minutes}m`, color: '#8b5cf6', emoji: '⏱️', progress: Math.min(minutes * 2, 100) },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Chip label="📈 Progress Tracker" sx={{ mb: 2, fontWeight: 700, bgcolor: alpha('#ec4899', 0.1), color: '#ec4899' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Box>
            <Typography variant="h3" fontWeight={900} sx={{ mb: 1 }}>Learning Dashboard</Typography>
            <Typography variant="body1" color="text.secondary">Track your DBMS learning progress across all activities.</Typography>
          </Box>
          <Button variant="outlined" startIcon={<RefreshIcon />} color="error" onClick={resetProgress} id="reset-progress-btn" size="small">
            Reset Progress
          </Button>
        </Box>
      </motion.div>

      {/* Stats Grid */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {stats.map((stat, i) => (
          <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 4 }}>
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: `1px solid ${alpha(stat.color, 0.2)}`,
                bgcolor: alpha(stat.color, 0.04),
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="body2" fontWeight={600} color="text.secondary">{stat.label}</Typography>
                <Typography sx={{ fontSize: '1.4rem' }}>{stat.emoji}</Typography>
              </Box>
              <Typography variant="h4" fontWeight={900} color={stat.color} sx={{ mb: 1 }}>
                {stat.value}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={stat.progress}
                sx={{ '& .MuiLinearProgress-bar': { bgcolor: stat.color }, bgcolor: alpha(stat.color, 0.12) }}
              />
            </MotionPaper>
          </Grid>
        ))}
      </Grid>

      {/* Quiz History */}
      {quizSessions.length > 0 && (
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: `1px solid ${alpha('#10b981', 0.2)}` }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>🧩 Quiz History</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {quizSessions.slice(-5).reverse().map((session, i) => {
              const pct = Math.round((session.score / session.totalQuestions) * 100);
              return (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ minWidth: 100 }}>
                    {new Date(session.startedAt).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      sx={{
                        '& .MuiLinearProgress-bar': { bgcolor: pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444' },
                        bgcolor: alpha('#10b981', 0.1),
                      }}
                    />
                  </Box>
                  <Typography variant="body2" fontWeight={700} color={pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444'}>
                    {session.score}/{session.totalQuestions} ({pct}%)
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Paper>
      )}

      {/* Achievements */}
      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${alpha('#f59e0b', 0.2)}` }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          🏆 Achievements ({unlockedAchievements.length}/{achievements.length})
        </Typography>
        <Grid container spacing={2}>
          {achievements.map((ach, i) => (
            <Grid key={ach.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <MotionPaper
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2.5,
                  border: `1px solid ${alpha(ach.unlocked ? '#f59e0b' : theme.palette.divider, ach.unlocked ? 0.5 : 0.3)}`,
                  bgcolor: alpha(ach.unlocked ? '#f59e0b' : theme.palette.background.paper, ach.unlocked ? 0.08 : 0.5),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  opacity: ach.unlocked ? 1 : 0.5,
                  filter: ach.unlocked ? 'none' : 'grayscale(100%)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Typography sx={{ fontSize: '2rem' }}>{ach.unlocked ? ach.emoji : '🔒'}</Typography>
                <Box>
                  <Typography variant="body2" fontWeight={700} color={ach.unlocked ? '#f59e0b' : 'text.secondary'}>
                    {ach.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">{ach.description}</Typography>
                  {ach.unlocked && ach.unlockedAt && (
                    <Typography variant="caption" color="#10b981" display="block" fontWeight={700}>
                      ✅ {new Date(ach.unlockedAt).toLocaleDateString()}
                    </Typography>
                  )}
                </Box>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
