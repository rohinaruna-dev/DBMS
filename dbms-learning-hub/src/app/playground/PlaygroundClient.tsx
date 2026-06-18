'use client';
import React from 'react';
import { Container, Typography, Box, Chip, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
const DbmsSimulator = dynamic(() => import('@/components/playground/DbmsSimulator'), { ssr: false });

export default function PlaygroundPage() {
  const theme = useTheme();
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Chip label="🎮 Interactive Playground" sx={{ mb: 2, fontWeight: 700, bgcolor: alpha('#06b6d4', 0.1), color: '#06b6d4' }} />
        <Typography variant="h3" fontWeight={900} sx={{ mb: 1 }}>
          DBMS Simulator
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Experience a real database in your browser! Insert, update, delete, and search student records.
          All operations run in-memory using Zustand state — no backend required.
        </Typography>
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            border: `1px solid ${alpha('#06b6d4', 0.2)}`,
            bgcolor: alpha('#06b6d4', 0.03),
          }}
        >
          <DbmsSimulator />
        </Box>
      </motion.div>
    </Container>
  );
}
