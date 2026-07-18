'use client';
import React, { useState } from 'react';
import { Container, Typography, Box, Chip, alpha, useTheme, Tabs, Tab } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const DbmsSimulator = dynamic(() => import('@/components/playground/DbmsSimulator'), { ssr: false });
const ErConceptClassifier = dynamic(() => import('@/components/playground/ErConceptClassifier'), { ssr: false });
const CardinalityMatcher = dynamic(() => import('@/components/playground/CardinalityMatcher'), { ssr: false });

export default function PlaygroundPage() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const activities = [
    { label: 'SQL Table Simulator', color: '#06b6d4', component: <DbmsSimulator /> },
    { label: 'ER Concept Classifier', color: '#10b981', component: <ErConceptClassifier /> },
    { label: 'Cardinality Matcher', color: '#ec4899', component: <CardinalityMatcher /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Chip label="🎮 Interactive Playground" sx={{ mb: 2, fontWeight: 700, bgcolor: alpha('#06b6d4', 0.1), color: '#06b6d4' }} />
        <Typography variant="h3" fontWeight={900} sx={{ mb: 1 }}>
          DBMS Playground Hub
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Experience a real database in your browser! Choose an activity below to practice SQL CRUD operations or ER Modeling concepts.
        </Typography>

        <Tabs 
          value={activeTab} 
          onChange={(e, v) => setActiveTab(v)} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            mb: 3, 
            '& .MuiTabs-indicator': { backgroundColor: activities[activeTab].color } 
          }}
        >
          {activities.map((act, index) => (
            <Tab 
              key={index} 
              label={act.label} 
              sx={{ 
                fontWeight: 700, 
                color: activeTab === index ? act.color : 'text.secondary',
                '&.Mui-selected': { color: act.color }
              }} 
            />
          ))}
        </Tabs>

        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            border: `1px solid ${alpha(activities[activeTab].color, 0.2)}`,
            bgcolor: alpha(activities[activeTab].color, 0.03),
            minHeight: 500
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activities[activeTab].component}
            </motion.div>
          </AnimatePresence>
        </Box>
      </motion.div>
    </Container>
  );
}
