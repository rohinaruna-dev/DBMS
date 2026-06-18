'use client';

// ============================================================
// DBMS Learning Hub – Landing / Dashboard Page
// ============================================================
import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  alpha,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import QuizIcon from '@mui/icons-material/Quiz';
import MicIcon from '@mui/icons-material/Mic';
import SpeedIcon from '@mui/icons-material/Speed';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import { useProgressStore } from '@/store/progressStore';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const features = [
  {
    icon: '📚',
    title: 'Interactive Learning',
    desc: 'Collapsible sections with visual demos and real-world analogies',
    color: '#6366f1',
    href: '/module1/topic1',
  },
  {
    icon: '🎮',
    title: 'DBMS Playground',
    desc: 'Full CRUD simulator — insert, update, delete, search in-browser',
    color: '#06b6d4',
    href: '/playground',
  },
  {
    icon: '🧩',
    title: 'Quiz Center',
    desc: '15 MCQs with instant feedback, scoring, and confetti on completion',
    color: '#10b981',
    href: '/quiz',
  },
  {
    icon: '🎤',
    title: 'Viva Corner',
    desc: 'Random viva question generator with detailed flip-to-reveal answers',
    color: '#ef4444',
    href: '/viva',
  },
  {
    icon: '🚀',
    title: 'Revision Cards',
    desc: 'Swipeable one-minute revision cards for quick exam prep',
    color: '#f59e0b',
    href: '/revision',
  },
  {
    icon: '📈',
    title: 'Progress Tracker',
    desc: 'Dashboard with charts, achievements, and learning badges',
    color: '#ec4899',
    href: '/progress',
  },
];

const stats = [
  { label: 'Topics', value: '13+', emoji: '📖' },
  { label: 'Quiz Questions', value: '15', emoji: '🧩' },
  { label: 'Viva Questions', value: '15', emoji: '🎤' },
  { label: 'Revision Cards', value: '10', emoji: '🚀' },
];

const dbmsApps = ['🎬 Netflix', '🛒 Amazon', '📱 WhatsApp', '📸 Instagram', '🏦 Banking', '🔍 Google'];

export default function HomePage() {
  const theme = useTheme();
  const router = useRouter();
  const { addTimeSpent } = useProgressStore();
  const startTime = useRef(Date.now());

  useEffect(() => {
    return () => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      if (seconds > 5) addTimeSpent(seconds);
    };
  }, [addTimeSpent]);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '85vh', md: '90vh' },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background:
            theme.palette.mode === 'dark'
              ? 'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.1) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.06) 0%, transparent 60%)',
        }}
      >
        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            {/* ── Left: Hero Text ── */}
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionBox
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <Chip
                  label="🎓 Module 1 · Topic 1 · Introduction to DBMS"
                  sx={{
                    mb: 3,
                    fontWeight: 700,
                    bgcolor: alpha(theme.palette.primary.main, 0.12),
                    color: 'primary.main',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                    borderRadius: 2,
                    fontSize: '0.78rem',
                  }}
                />

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                    fontWeight: 900,
                    lineHeight: 1.1,
                    mb: 2,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 45%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Master Database Management Systems
                </Typography>

                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ mb: 2, fontWeight: 400, fontSize: { xs: '1rem', md: '1.2rem' } }}
                >
                  Interactively
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    fontWeight: 500,
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                  }}
                >
                  {['Learn', 'Visualize', 'Practice', 'Revise'].map((word, i) => (
                    <MotionBox
                      key={word}
                      component="span"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981'][i],
                        fontWeight: 700,
                      }}
                    >
                      {['📖', '🎨', '🎮', '🚀'][i]} {word}
                    </MotionBox>
                  ))}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <MotionBox
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => router.push('/module1/topic1')}
                      id="hero-start-learning"
                      sx={{
                        py: 1.5,
                        px: 3.5,
                        fontSize: '1rem',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        boxShadow: '0 8px 30px rgba(99,102,241,0.4)',
                        '&:hover': {
                          boxShadow: '0 12px 40px rgba(99,102,241,0.5)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Start Learning
                    </Button>
                  </MotionBox>

                  <MotionBox
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<SportsEsportsIcon />}
                      onClick={() => router.push('/playground')}
                      id="hero-try-playground"
                      sx={{
                        py: 1.5,
                        px: 3,
                        fontSize: '1rem',
                        borderWidth: 2,
                        borderColor: 'primary.main',
                        '&:hover': {
                          borderWidth: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                        },
                      }}
                    >
                      Try Playground
                    </Button>
                  </MotionBox>

                  <MotionBox
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<QuizIcon />}
                      onClick={() => router.push('/quiz')}
                      id="hero-take-quiz"
                      sx={{
                        py: 1.5,
                        px: 3,
                        fontSize: '1rem',
                        borderWidth: 2,
                        borderColor: '#10b981',
                        color: '#10b981',
                        '&:hover': {
                          borderWidth: 2,
                          bgcolor: alpha('#10b981', 0.08),
                          borderColor: '#10b981',
                        },
                      }}
                    >
                      Take Quiz
                    </Button>
                  </MotionBox>
                </Box>
              </MotionBox>
            </Grid>

            {/* ── Right: DBMS Architecture Graphic ── */}
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                sx={{ position: 'relative' }}
              >
                <DbmsArchitectureGraphic />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ═══════════════════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════════════════ */}
      <Box
        sx={{
          py: 5,
          borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          bgcolor: alpha(theme.palette.primary.main, 0.03),
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            {stats.map((stat, i) => (
              <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  sx={{ textAlign: 'center' }}
                >
                  <Typography variant="h2" sx={{ fontSize: '2rem', mb: 0.5 }}>
                    {stat.emoji}
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={800}
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    {stat.label}
                  </Typography>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══════════════════════════════════════════════════════
          FEATURES GRID
      ═══════════════════════════════════════════════════════ */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{ textAlign: 'center', mb: 6 }}
        >
          <Typography variant="h3" fontWeight={800} sx={{ mb: 1.5 }}>
            Everything you need to{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              master DBMS
            </Box>
          </Typography>
          <Typography variant="h6" color="text.secondary" fontWeight={400}>
            From beginner concepts to exam-ready knowledge
          </Typography>
        </MotionBox>

        <Grid container spacing={3}>
          {features.map((feature, i) => (
            <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <MotionCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => router.push(feature.href)}
                sx={{ cursor: 'pointer', height: '100%' }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.6rem',
                      bgcolor: alpha(feature.color, 0.12),
                      mb: 2,
                      border: `1px solid ${alpha(feature.color, 0.2)}`,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: feature.color }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                    {feature.desc}
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                      display: 'flex',
                      alignItems: 'center',
                      color: feature.color,
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      gap: 0.5,
                    }}
                  >
                    Explore <ArrowForwardIcon sx={{ fontSize: '0.9rem' }} />
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ═══════════════════════════════════════════════════════
          DBMS APPS MARQUEE
      ═══════════════════════════════════════════════════════ */}
      <Box
        sx={{
          py: 4,
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
          overflow: 'hidden',
        }}
      >
        <Typography variant="body2" color="text.secondary" textAlign="center" mb={2} fontWeight={600}>
          DBMS POWERS APPLICATIONS LIKE
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            animation: 'marquee 20s linear infinite',
            '@keyframes marquee': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' },
            },
          }}
        >
          {[...dbmsApps, ...dbmsApps].map((app, i) => (
            <Chip
              key={i}
              label={app}
              sx={{
                flexShrink: 0,
                fontWeight: 700,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                fontSize: '0.85rem',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* ═══════════════════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════════════════ */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <MotionBox
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />
            <Typography variant="h4" fontWeight={800} sx={{ mb: 1.5, position: 'relative' }}>
              Ready to start your DBMS journey? 🚀
            </Typography>
            <Typography sx={{ mb: 3, opacity: 0.9, position: 'relative' }}>
              Dive into interactive lessons, practice with the playground, and ace your exams!
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/module1/topic1')}
                id="cta-start-learning"
                sx={{
                  bgcolor: 'white',
                  color: '#6366f1',
                  fontWeight: 800,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                }}
              >
                📚 Start Learning Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => router.push('/quiz')}
                id="cta-take-quiz"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 700,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'white' },
                }}
              >
                🧩 Take a Quiz
              </Button>
            </Box>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}

// ─── DBMS Architecture Graphic ───────────────────────────────
function DbmsArchitectureGraphic() {
  const theme = useTheme();
  const layers = [
    { label: 'Users & Applications', icon: '👥', color: '#6366f1', desc: 'Students, Faculty, Admin' },
    { label: 'DBMS Software', icon: '⚙️', color: '#8b5cf6', desc: 'MySQL · Oracle · PostgreSQL' },
    { label: 'Database', icon: '🗄️', color: '#06b6d4', desc: 'Organized Data Storage' },
  ];

  return (
    <Box sx={{ position: 'relative', p: 3 }}>
      {/* Glow circle */}
      <Box
        sx={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {layers.map((layer, i) => (
          <React.Fragment key={layer.label}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.2 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: alpha(layer.color, 0.1),
                  border: `1px solid ${alpha(layer.color, 0.25)}`,
                  backdropFilter: 'blur(10px)',
                  mb: i < 2 ? 0 : 0,
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 2.5,
                    bgcolor: alpha(layer.color, 0.2),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem',
                    flexShrink: 0,
                    border: `2px solid ${alpha(layer.color, 0.4)}`,
                  }}
                >
                  {layer.icon}
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} color={layer.color}>
                    {layer.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {layer.desc}
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            {/* Animated connector arrow */}
            {i < 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.2 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 0.5, position: 'relative' }}>
                  <Box
                    sx={{
                      width: 2,
                      height: 30,
                      bgcolor: alpha(layer.color, 0.4),
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderTop: `8px solid ${alpha(layer.color, 0.6)}`,
                      },
                    }}
                  />
                  {/* Animated data particle */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: layer.color,
                      left: '50%',
                      marginLeft: -4,
                    }}
                    animate={{ y: [0, 28, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                  />
                </Box>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
