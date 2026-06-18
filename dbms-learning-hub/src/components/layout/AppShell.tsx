'use client';

// ============================================================
// DBMS Learning Hub – App Shell (Responsive Layout)
// ============================================================
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

const DRAWER_WIDTH = 260;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleDrawerClose = () => setMobileOpen(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* ── Top App Bar ── */}
      <TopBar onMenuClick={handleDrawerToggle} drawerWidth={DRAWER_WIDTH} isMobile={isMobile} />

      {/* ── Sidebar / Drawer ── */}
      {isMobile ? (
        // Mobile: Temporary Drawer
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
            },
          }}
        >
          <Sidebar onClose={handleDrawerClose} />
        </Drawer>
      ) : (
        // Desktop: Permanent Sidebar
        <Box
          component="nav"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
          }}
        >
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                top: 64,
                height: 'calc(100% - 64px)',
              },
            }}
            open
          >
            <Sidebar />
          </Drawer>
        </Box>
      )}

      {/* ── Main Content ── */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: '64px',
          minHeight: 'calc(100vh - 64px)',
          bgcolor: 'background.default',
          transition: 'background-color 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
