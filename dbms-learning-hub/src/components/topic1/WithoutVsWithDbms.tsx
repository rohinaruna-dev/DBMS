'use client';

// ============================================================
// WithoutVsWithDbms – Side-by-side comparison visualization
// ============================================================
import React from 'react';
import { Box, Typography, Grid, Paper, alpha, useTheme, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const withoutFiles = [
  { name: 'Marks.xlsx', icon: '📊', problem: 'Duplicate student info in every file' },
  { name: 'Attendance.xlsx', icon: '📋', problem: 'Same data copied, often inconsistent' },
  { name: 'Fees.xlsx', icon: '💰', problem: 'Hard to find: which file has latest data?' },
  { name: 'Library.xlsx', icon: '📚', problem: 'No link between files → data islands' },
  { name: 'Hostel.xlsx', icon: '🏠', problem: 'Security issues → anyone can open' },
  { name: 'Results.xlsx', icon: '🏆', problem: 'If one file corrupts, data is lost' },
];

const withDbmsTables = [
  { name: 'Students', icon: '🧑‍🎓', fields: ['Roll No', 'Name', 'Branch', 'Phone'] },
  { name: 'Attendance', icon: '📋', fields: ['Roll No', 'Date', 'Status'] },
  { name: 'Fees', icon: '💰', fields: ['Roll No', 'Amount', 'Payment Date'] },
  { name: 'Library', icon: '📚', fields: ['Roll No', 'Book ID', 'Return Date'] },
];

const withoutProblems = [
  '❌ Duplicate records across files',
  '❌ Inconsistent & conflicting data',
  '❌ Difficult and slow searching',
  '❌ No security — files accessible by anyone',
  '❌ Data loss risk from file corruption',
  '❌ No way to link related information',
];

const withBenefits = [
  '✅ No duplication — data stored once',
  '✅ Consistent and accurate data',
  '✅ Fast search in milliseconds',
  '✅ Role-based security & access control',
  '✅ Automatic backup and recovery',
  '✅ Tables linked via relationships',
];

export default function WithoutVsWithDbms() {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      {/* ── Without DBMS ── */}
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
          <Typography variant="h6" fontWeight={800} color="#ef4444" sx={{ mb: 2.5 }}>
            ❌ Without DBMS
          </Typography>

          {/* Scattered Files */}
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ mb: 1.5, display: 'block' }}>
              SCATTERED FILE SYSTEM:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {withoutFiles.map((file, i) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      p: 1.25,
                      borderRadius: 2,
                      bgcolor: alpha('#ef4444', 0.06),
                      border: `1px solid ${alpha('#ef4444', 0.15)}`,
                    }}
                  >
                    <Typography sx={{ fontSize: '1.2rem', mt: 0.1 }}>{file.icon}</Typography>
                    <Box>
                      <Typography variant="body2" fontWeight={700} color="#ef4444">
                        📁 {file.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ⚠️ {file.problem}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>

          {/* Problems list */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {withoutProblems.map((p) => (
              <Box key={p} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CancelIcon sx={{ fontSize: '0.9rem', color: '#ef4444', flexShrink: 0 }} />
                <Typography variant="body2" color="text.secondary">
                  {p.replace('❌ ', '')}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>

      {/* ── With DBMS ── */}
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
          <Typography variant="h6" fontWeight={800} color="#10b981" sx={{ mb: 2.5 }}>
            ✅ With DBMS
          </Typography>

          {/* Centralized DB */}
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ mb: 1.5, display: 'block' }}>
              CENTRALIZED DATABASE:
            </Typography>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: alpha('#10b981', 0.08),
                border: `2px solid ${alpha('#10b981', 0.3)}`,
                mb: 1.5,
                textAlign: 'center',
              }}
            >
              <Typography sx={{ fontSize: '1.5rem', mb: 0.5 }}>🗄️</Typography>
              <Typography variant="subtitle2" fontWeight={800} color="#10b981">
                COLLEGE DATABASE
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Single source of truth
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {withDbmsTables.map((table, i) => (
                <motion.div
                  key={table.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Box
                    sx={{
                      p: 1.25,
                      borderRadius: 2,
                      bgcolor: alpha('#10b981', 0.06),
                      border: `1px solid ${alpha('#10b981', 0.2)}`,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography sx={{ fontSize: '1rem' }}>{table.icon}</Typography>
                      <Typography variant="body2" fontWeight={700} color="#10b981">
                        {table.name} Table
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {table.fields.map((f) => (
                        <Chip
                          key={f}
                          label={f}
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            bgcolor: alpha('#10b981', 0.15),
                            color: '#10b981',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>

          {/* Benefits */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {withBenefits.map((b) => (
              <Box key={b} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ fontSize: '0.9rem', color: '#10b981', flexShrink: 0 }} />
                <Typography variant="body2" color="text.secondary">
                  {b.replace('✅ ', '')}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
