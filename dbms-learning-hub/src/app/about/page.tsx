'use client';
import React from 'react';
import { Container, Typography, Box, Chip, alpha, useTheme, Grid, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const theme = useTheme();
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Chip label="ℹ️ About" sx={{ mb: 2, fontWeight: 700, bgcolor: alpha('#64748b', 0.1), color: '#64748b' }} />
        <Typography variant="h3" sx={{ mb: 1, fontWeight: 900 }}>About DBMS Learning Hub</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          A production-ready interactive educational platform for mastering Database Management Systems.
        </Typography>

        <Grid container spacing={3}>
          {[
            { emoji: '🎓', title: 'Educational Goal', desc: 'Convert traditional DBMS notes into an interactive, visual, and engaging learning experience for CS students.' },
            { emoji: '🛠️', title: 'Tech Stack', desc: 'Next.js 15 · React 19 · TypeScript · MUI v7 · Framer Motion · Zustand · Fuse.js · Vercel' },
            { emoji: '📚', title: 'Content Coverage', desc: 'Module 1, Topic 1: Introduction to DBMS with 13+ interactive sections, 15 MCQs, 15 viva questions, 10 revision cards.' },
            { emoji: '🎯', title: 'Target Audience', desc: 'First-year and second-year Computer Science / IT engineering students preparing for DBMS exams and viva.' },
          ].map((item, i) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`, height: '100%' }}>
                  <Typography sx={{ fontSize: '2rem', mb: 1.5 }}>{item.emoji}</Typography>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.7}>{item.desc}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>🚀 Ready to Deploy on Vercel</Typography>
          <Typography sx={{ opacity: 0.9, mb: 2 }}>Run `npm run build` then connect your GitHub repo to Vercel for instant deployment.</Typography>
          <Button variant="contained" href="/module1/topic1" id="about-start-btn" sx={{ bgcolor: 'white', color: '#6366f1', fontWeight: 800, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}>
            Start Learning Now
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
}
