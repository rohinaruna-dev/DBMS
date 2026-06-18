'use client';
import React from 'react';
import { Container, Typography, Box, Chip, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
const QuizEngine = dynamic(() => import('@/components/quiz/QuizEngine'), { ssr: false });

export default function QuizPage() {
  const theme = useTheme();
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Chip label="🧩 Quiz Center" sx={{ mb: 2, fontWeight: 700, bgcolor: alpha('#10b981', 0.1), color: '#10b981' }} />
        <Typography variant="h3" fontWeight={900} sx={{ mb: 1 }}>
          DBMS Quiz
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Test your knowledge with 10 randomly selected MCQs from our question bank.
          Get instant feedback, explanations, and confetti on completion! 🎉
        </Typography>
        <QuizEngine />
      </motion.div>
    </Container>
  );
}
