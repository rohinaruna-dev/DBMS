'use client';

// ============================================================
// DBMS Learning Hub – Navigation Sidebar
// ============================================================
import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Chip,
  LinearProgress,
  alpha,
  useTheme,
  Tooltip,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import QuizIcon from '@mui/icons-material/Quiz';
import MicIcon from '@mui/icons-material/Mic';
import SpeedIcon from '@mui/icons-material/Speed';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { usePathname, useRouter } from 'next/navigation';
import { useProgressStore } from '@/store/progressStore';

interface NavItemDef {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  color?: string;
}

const navItems: NavItemDef[] = [
  { label: 'Dashboard', href: '/', icon: <HomeIcon />, color: '#6366f1' },
  {
    label: 'Introduction to DBMS',
    href: '/module1/topic1',
    icon: <SchoolIcon />,
    badge: 'M1·T1',
    color: '#8b5cf6',
  },
  { label: 'Playground', href: '/playground', icon: <SportsEsportsIcon />, color: '#06b6d4' },
  { label: 'Quiz Center', href: '/quiz', icon: <QuizIcon />, color: '#10b981' },
  { label: 'Viva Corner', href: '/viva', icon: <MicIcon />, color: '#ef4444' },
  { label: 'Revision Notes', href: '/revision', icon: <SpeedIcon />, color: '#f59e0b' },
  { label: 'Progress Tracker', href: '/progress', icon: <TrendingUpIcon />, color: '#ec4899' },
  { label: 'About', href: '/about', icon: <InfoIcon />, color: '#64748b' },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { quizSessions, getTotalSectionsVisited, achievements } = useProgressStore();

  const totalAchievements = achievements.filter((a) => a.unlocked).length;
  const lastQuizScore =
    quizSessions.length > 0
      ? Math.round((quizSessions[quizSessions.length - 1].score / quizSessions[quizSessions.length - 1].totalQuestions) * 100)
      : null;

  const handleNav = (href: string) => {
    router.push(href);
    onClose?.();
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        pt: 1,
      }}
    >
      {/* ── Header ── */}
      <Box sx={{ px: 2, py: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <MenuBookIcon sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
          <Typography variant="caption" fontWeight={700} color="text.secondary" letterSpacing="0.08em">
            MODULE 1
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight={700} color="text.primary">
          Introduction to DBMS
        </Typography>

        {/* Mini progress */}
        <Box sx={{ mt: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Sections visited
            </Typography>
            <Typography variant="caption" fontWeight={700} color="primary.main">
              {Math.min(getTotalSectionsVisited(), 13)}/13
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={Math.min((getTotalSectionsVisited() / 13) * 100, 100)}
            sx={{ borderRadius: 4 }}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 1, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

      {/* ── Navigation ── */}
      <List dense sx={{ flex: 1, px: 1.5 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNav(item.href)}
                aria-current={isActive ? 'page' : undefined}
                sx={{
                  borderRadius: 2.5,
                  py: 1,
                  bgcolor: isActive
                    ? alpha(item.color || '#6366f1', 0.12)
                    : 'transparent',
                  border: isActive
                    ? `1px solid ${alpha(item.color || '#6366f1', 0.25)}`
                    : '1px solid transparent',
                  '&:hover': {
                    bgcolor: alpha(item.color || '#6366f1', 0.08),
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive ? item.color : 'text.secondary',
                    '& svg': { fontSize: '1.2rem' },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? item.color : 'text.primary',
                  }}
                />
                {item.badge && (
                  <Chip
                    label={item.badge}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      bgcolor: alpha(item.color || '#6366f1', 0.15),
                      color: item.color,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1) }} />

      {/* ── Stats Footer ── */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Achievements unlocked">
            <Box
              sx={{
                flex: 1,
                textAlign: 'center',
                p: 1,
                borderRadius: 2,
                bgcolor: alpha('#f59e0b', 0.1),
                border: `1px solid ${alpha('#f59e0b', 0.2)}`,
              }}
            >
              <Typography variant="h6" fontWeight={800} color="#f59e0b">
                {totalAchievements}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Badges
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Last quiz score">
            <Box
              sx={{
                flex: 1,
                textAlign: 'center',
                p: 1,
                borderRadius: 2,
                bgcolor: alpha('#10b981', 0.1),
                border: `1px solid ${alpha('#10b981', 0.2)}`,
              }}
            >
              <Typography variant="h6" fontWeight={800} color="#10b981">
                {lastQuizScore !== null ? `${lastQuizScore}%` : '—'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Quiz
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
