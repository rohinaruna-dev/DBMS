'use client';

// ============================================================
// Data Flow Animation – User → DBMS → Database → Output
// ============================================================
import React, { useState } from 'react';
import { Box, Button, Typography, alpha, useTheme, Chip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';

type FlowState = 'idle' | 'sending' | 'processing' | 'returning' | 'done';

const nodes = [
  { id: 'user', label: 'User', icon: '👤', color: '#6366f1', x: 0 },
  { id: 'dbms', label: 'DBMS', icon: '⚙️', color: '#8b5cf6', x: 1 },
  { id: 'db', label: 'Database', icon: '🗄️', color: '#06b6d4', x: 2 },
  { id: 'output', label: 'Output', icon: '📊', color: '#10b981', x: 3 },
];

const messages: Record<FlowState, string> = {
  idle: 'Click "Search Student" to see data flow through the DBMS system.',
  sending: '📤 User sends search query to DBMS...',
  processing: '⚙️ DBMS processes the query and searches the database...',
  returning: '📥 DBMS retrieves data and returns it to the user...',
  done: '✅ Result displayed! Roll No 101 → Rahul Sharma, CSE, 85% Attendance',
};

export default function DataFlowAnimation() {
  const theme = useTheme();
  const [state, setState] = useState<FlowState>('idle');
  const [activeNode, setActiveNode] = useState<number>(-1);
  const [particlePos, setParticlePos] = useState<number>(0);
  const [returning, setReturning] = useState(false);

  const runAnimation = async () => {
    if (state !== 'idle' && state !== 'done') return;
    setState('sending');
    setReturning(false);
    setActiveNode(0);
    await delay(500);
    setActiveNode(1);
    setState('processing');
    await delay(700);
    setActiveNode(2);
    await delay(700);
    setReturning(true);
    setState('returning');
    setActiveNode(3);
    await delay(700);
    setState('done');
  };

  const reset = () => {
    setState('idle');
    setActiveNode(-1);
    setParticlePos(0);
    setReturning(false);
  };

  return (
    <Box>
      {/* ── Nodes ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          mb: 4,
          position: 'relative',
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
        }}
      >
        {nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            {/* Node */}
            <motion.div
              animate={
                activeNode === i
                  ? { scale: [1, 1.2, 1], transition: { duration: 0.4 } }
                  : {}
              }
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: { xs: 56, sm: 72 },
                    height: { xs: 56, sm: 72 },
                    borderRadius: '50%',
                    bgcolor: alpha(node.color, activeNode >= i && state !== 'idle' ? 0.25 : 0.1),
                    border: `3px solid ${alpha(node.color, activeNode >= i && state !== 'idle' ? 0.7 : 0.25)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    transition: 'all 0.4s ease',
                    boxShadow:
                      activeNode === i
                        ? `0 0 20px ${alpha(node.color, 0.5)}`
                        : 'none',
                  }}
                >
                  {node.icon}
                </Box>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  color={activeNode >= i && state !== 'idle' ? node.color : 'text.secondary'}
                  sx={{ transition: 'color 0.3s ease' }}
                >
                  {node.label}
                </Typography>
              </Box>
            </motion.div>

            {/* Arrow + particle */}
            {i < nodes.length - 1 && (
              <Box sx={{ flex: 1, position: 'relative', height: 24, minWidth: 20 }}>
                {/* Static arrow */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: 2,
                    bgcolor: alpha(nodes[i].color, 0.3),
                    transform: 'translateY(-50%)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    right: -4,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: 0,
                    borderTop: '5px solid transparent',
                    borderBottom: '5px solid transparent',
                    borderLeft: `8px solid ${alpha(nodes[i].color, returning ? 0.2 : 0.6)}`,
                  }}
                />
                {/* Return arrow */}
                {returning && i >= 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -4,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 0,
                      height: 0,
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderRight: `8px solid ${alpha('#10b981', 0.6)}`,
                    }}
                  />
                )}

                {/* Moving particle */}
                <AnimatePresence>
                  {activeNode === i && state === 'sending' && (
                    <motion.div
                      initial={{ left: '0%', opacity: 1 }}
                      animate={{ left: '100%', opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        marginTop: -5,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: nodes[i].color,
                      }}
                    />
                  )}
                  {returning && activeNode === i + 1 && (
                    <motion.div
                      initial={{ left: '100%', opacity: 1 }}
                      animate={{ left: '0%', opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        marginTop: -5,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                      }}
                    />
                  )}
                </AnimatePresence>
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>

      {/* ── Message ── */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: alpha(
            state === 'done' ? '#10b981' : theme.palette.primary.main,
            0.08
          ),
          border: `1px solid ${alpha(
            state === 'done' ? '#10b981' : theme.palette.primary.main,
            0.2
          )}`,
          minHeight: 52,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Typography
              variant="body2"
              fontWeight={600}
              color={state === 'done' ? '#10b981' : 'text.primary'}
            >
              {messages[state]}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* ── Controls ── */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={runAnimation}
          disabled={state !== 'idle' && state !== 'done'}
          id="data-flow-search-btn"
          sx={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          Search Student (Roll: 101)
        </Button>
        <Button variant="outlined" onClick={reset} id="data-flow-reset-btn">
          Reset
        </Button>
        {state === 'done' && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <Chip
              label="⚡ Query completed in 2ms"
              sx={{ bgcolor: alpha('#10b981', 0.15), color: '#10b981', fontWeight: 700 }}
            />
          </motion.div>
        )}
      </Box>
    </Box>
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
