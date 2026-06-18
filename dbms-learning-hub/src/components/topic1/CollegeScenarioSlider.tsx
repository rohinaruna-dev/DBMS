'use client';

// ============================================================
// College Scenario Slider – Interactive DBMS vs Excel Demo
// ============================================================
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  Grid,
  Paper,
  alpha,
  useTheme,
  LinearProgress,
  Chip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import StorageIcon from '@mui/icons-material/Storage';
import TableChartIcon from '@mui/icons-material/TableChart';

const MARKS = [
  { value: 100, label: '100' },
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 50000, label: '50K' },
];

function getDifficulty(students: number) {
  const ratio = students / 50000;
  return {
    records: students * 6,
    searchDifficulty: Math.min(100, Math.round(ratio * 95 + 5)),
    storageComplexity: Math.min(100, Math.round(ratio * 90 + 8)),
    managementDifficulty: Math.min(100, Math.round(ratio * 98 + 2)),
    dbmsDifficulty: Math.min(15, Math.round(ratio * 10 + 2)),
  };
}

function colorForValue(val: number) {
  if (val < 30) return '#10b981';
  if (val < 60) return '#f59e0b';
  if (val < 80) return '#ef4444';
  return '#dc2626';
}

const MotionBox = motion(Box);

export default function CollegeScenarioSlider() {
  const theme = useTheme();
  const [students, setStudents] = useState(1000);
  const stats = getDifficulty(students);

  const metrics = [
    {
      label: 'Search Difficulty',
      excel: stats.searchDifficulty,
      dbms: Math.max(2, stats.dbmsDifficulty - 2),
      icon: '🔍',
    },
    {
      label: 'Storage Complexity',
      excel: stats.storageComplexity,
      dbms: stats.dbmsDifficulty,
      icon: '💾',
    },
    {
      label: 'Management Difficulty',
      excel: stats.managementDifficulty,
      dbms: Math.max(3, stats.dbmsDifficulty + 1),
      icon: '⚙️',
    },
  ];

  return (
    <Box>
      {/* ── Slider ── */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          bgcolor: alpha(theme.palette.primary.main, 0.04),
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            🎓 College Size Simulator
          </Typography>
          <AnimatePresence mode="wait">
            <MotionBox
              key={students}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Chip
                label={`${students.toLocaleString()} Students`}
                color="primary"
                sx={{ fontWeight: 800, fontSize: '1rem', px: 1 }}
              />
            </MotionBox>
          </AnimatePresence>
        </Box>

        <Slider
          value={students}
          min={100}
          max={50000}
          step={null}
          marks={MARKS}
          onChange={(_, v) => setStudents(v as number)}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => v.toLocaleString()}
          aria-label="number of students"
          sx={{ '& .MuiSlider-markLabel': { fontSize: '0.75rem' } }}
        />

        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              Records Generated
            </Typography>
            <Typography variant="h6" fontWeight={800} color="primary.main">
              {stats.records.toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Data Fields per Student
            </Typography>
            <Typography variant="h6" fontWeight={800} color="secondary.main">
              6
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Excel Files Needed
            </Typography>
            <Typography variant="h6" fontWeight={800} color="error.main">
              ~{Math.max(4, Math.ceil(students / 1000) * 4)}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* ── Comparison ── */}
      <Grid container spacing={2.5}>
        {/* Excel Column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: `2px solid ${alpha('#ef4444', 0.3)}`,
              bgcolor: alpha('#ef4444', 0.04),
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
              <TableChartIcon sx={{ color: '#ef4444', fontSize: '1.5rem' }} />
              <Typography variant="h6" fontWeight={800} color="#ef4444">
                ❌ Multiple Excel Files
              </Typography>
            </Box>
            {metrics.map((m) => (
              <Box key={m.label} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {m.icon} {m.label}
                  </Typography>
                  <Typography variant="body2" fontWeight={700} color={colorForValue(m.excel)}>
                    {m.excel}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={m.excel}
                  sx={{
                    '& .MuiLinearProgress-bar': { bgcolor: colorForValue(m.excel) },
                    bgcolor: alpha(colorForValue(m.excel), 0.15),
                  }}
                />
              </Box>
            ))}
            <Box
              sx={{
                mt: 2,
                p: 1.5,
                borderRadius: 2,
                bgcolor: alpha('#ef4444', 0.08),
                border: `1px solid ${alpha('#ef4444', 0.2)}`,
              }}
            >
              <Typography variant="caption" color="#ef4444" fontWeight={700}>
                ⚠️ With {students.toLocaleString()} students, Excel becomes unmanageable!
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* DBMS Column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: `2px solid ${alpha('#10b981', 0.3)}`,
              bgcolor: alpha('#10b981', 0.04),
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
              <StorageIcon sx={{ color: '#10b981', fontSize: '1.5rem' }} />
              <Typography variant="h6" fontWeight={800} color="#10b981">
                ✅ With DBMS
              </Typography>
            </Box>
            {metrics.map((m) => (
              <Box key={m.label} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {m.icon} {m.label}
                  </Typography>
                  <Typography variant="body2" fontWeight={700} color="#10b981">
                    {m.dbms}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={m.dbms}
                  sx={{
                    '& .MuiLinearProgress-bar': { bgcolor: '#10b981' },
                    bgcolor: alpha('#10b981', 0.15),
                  }}
                />
              </Box>
            ))}
            <Box
              sx={{
                mt: 2,
                p: 1.5,
                borderRadius: 2,
                bgcolor: alpha('#10b981', 0.08),
                border: `1px solid ${alpha('#10b981', 0.2)}`,
              }}
            >
              <Typography variant="caption" color="#10b981" fontWeight={700}>
                ✅ DBMS scales effortlessly to {students.toLocaleString()} students!
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
