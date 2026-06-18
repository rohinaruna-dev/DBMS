'use client';

// ============================================================
// DBMS Around You – Interactive App Cards
// ============================================================
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  alpha,
  useTheme,
  Collapse,
} from '@mui/material';
import { motion } from 'framer-motion';

const apps = [
  {
    name: 'WhatsApp',
    emoji: '💬',
    color: '#25d366',
    gradient: 'linear-gradient(135deg, #25d366, #128c7e)',
    storedData: [
      '💬 Messages & Media',
      '👥 Contact List',
      '👫 Group Details',
      '📹 Status Updates',
      '🔔 Notification Settings',
      '🔒 Encryption Keys',
    ],
    fact: 'WhatsApp processes 100 billion messages per day using databases!',
  },
  {
    name: 'Instagram',
    emoji: '📸',
    color: '#e1306c',
    gradient: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    storedData: [
      '🖼️ Photos & Videos',
      '👤 User Profiles',
      '❤️ Likes & Comments',
      '👥 Followers/Following',
      '🏷️ Hashtags',
      '📊 Analytics Data',
    ],
    fact: 'Instagram stores over 100 million photos uploaded daily!',
  },
  {
    name: 'Amazon',
    emoji: '🛒',
    color: '#ff9900',
    gradient: 'linear-gradient(135deg, #ff9900, #e47911)',
    storedData: [
      '📦 Product Catalog',
      '👤 Customer Data',
      '🛒 Shopping Carts',
      '📋 Order History',
      '💳 Payment Records',
      '⭐ Reviews & Ratings',
    ],
    fact: 'Amazon\'s database handles millions of transactions every second!',
  },
  {
    name: 'Netflix',
    emoji: '🎬',
    color: '#e50914',
    gradient: 'linear-gradient(135deg, #e50914, #b20710)',
    storedData: [
      '🎬 Movie & Show Library',
      '👤 User Preferences',
      '📺 Watch History',
      '⭐ Ratings & Reviews',
      '🤖 Recommendation Data',
      '🌐 Regional Availability',
    ],
    fact: 'Netflix uses its database to power AI recommendations for 230M+ users!',
  },
  {
    name: 'Banking',
    emoji: '🏦',
    color: '#1e40af',
    gradient: 'linear-gradient(135deg, #1e40af, #1e3a8a)',
    storedData: [
      '💰 Account Balances',
      '💳 Transaction History',
      '📝 Loan Information',
      '🔒 Security Credentials',
      '📊 Credit Scores',
      '📄 KYC Documents',
    ],
    fact: 'Banks process millions of transactions per day with zero tolerance for errors!',
  },
  {
    name: 'Google',
    emoji: '🔍',
    color: '#4285f4',
    gradient: 'linear-gradient(135deg, #4285f4, #0f9d58, #f4b400, #db4437)',
    storedData: [
      '🔍 Search Index',
      '📧 Gmail Emails',
      '📂 Drive Files',
      '🗺️ Maps Location Data',
      '📺 YouTube Videos',
      '🎯 Ad Targeting Data',
    ],
    fact: 'Google stores petabytes of data, processing billions of searches daily!',
  },
];

const MotionPaper = motion(Paper);

export default function DbmsAroundYou() {
  const theme = useTheme();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Box>
      <Grid container spacing={2.5}>
        {apps.map((app, i) => {
          const isSelected = selected === app.name;
          return (
            <Grid key={app.name} size={{ xs: 12, sm: 6, md: 4 }}>
              <MotionPaper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                elevation={0}
                onClick={() => setSelected(isSelected ? null : app.name)}
                id={`app-card-${app.name.toLowerCase()}`}
                role="button"
                aria-expanded={isSelected}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelected(isSelected ? null : app.name)}
                sx={{
                  p: 2.5,
                  cursor: 'pointer',
                  borderRadius: 3,
                  border: `2px solid ${isSelected ? alpha(app.color, 0.6) : alpha(app.color, 0.2)}`,
                  bgcolor: alpha(app.color, isSelected ? 0.1 : 0.04),
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    border: `2px solid ${alpha(app.color, 0.5)}`,
                    bgcolor: alpha(app.color, 0.08),
                  },
                }}
              >
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2.5,
                      background: app.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                      boxShadow: `0 4px 12px ${alpha(app.color, 0.4)}`,
                    }}
                  >
                    {app.emoji}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={800} color={app.color}>
                      {app.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {isSelected ? 'Click to collapse' : 'Click to see stored data'}
                    </Typography>
                  </Box>
                </Box>

                {/* Collapsed preview */}
                {!isSelected && (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {app.storedData.slice(0, 3).map((d) => (
                      <Chip
                        key={d}
                        label={d}
                        size="small"
                        sx={{
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          bgcolor: alpha(app.color, 0.1),
                          color: app.color,
                          height: 20,
                        }}
                      />
                    ))}
                    <Chip
                      label={`+${app.storedData.length - 3} more`}
                      size="small"
                      sx={{ fontSize: '0.65rem', height: 20 }}
                    />
                  </Box>
                )}

                {/* Expanded data */}
                <Collapse in={isSelected}>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={700} mb={1} display="block">
                      DATA STORED IN DATABASE:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                      {app.storedData.map((data, di) => (
                        <motion.div
                          key={data}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: di * 0.06 }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              p: 0.75,
                              borderRadius: 1.5,
                              bgcolor: alpha(app.color, 0.08),
                            }}
                          >
                            <Typography variant="body2" fontWeight={600}>
                              {data}
                            </Typography>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                    <Box
                      sx={{
                        mt: 1.5,
                        p: 1.25,
                        borderRadius: 1.5,
                        bgcolor: alpha(app.color, 0.15),
                        border: `1px solid ${alpha(app.color, 0.3)}`,
                      }}
                    >
                      <Typography variant="caption" color={app.color} fontWeight={700}>
                        💡 {app.fact}
                      </Typography>
                    </Box>
                  </Box>
                </Collapse>
              </MotionPaper>
            </Grid>
          );
        })}
      </Grid>

      <Box
        sx={{
          mt: 3,
          p: 2.5,
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,182,212,0.1))',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" fontWeight={700}>
          🌍 Every major application you use runs on a Database Management System!
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Without DBMS, modern applications like these simply could not exist.
        </Typography>
      </Box>
    </Box>
  );
}
