'use client';

// ============================================================
// Restaurant Analogy – Interactive DBMS Analogy Card Flow
// ============================================================
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  alpha,
  useTheme,
  Tooltip,
  Chip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const restaurantItems = [
  {
    id: 'customer',
    restaurant: { icon: '🧑‍💼', label: 'Customer', desc: 'Places a food order' },
    dbms: { icon: '👤', label: 'User', desc: 'Sends a data query to DBMS', color: '#6366f1' },
  },
  {
    id: 'waiter',
    restaurant: { icon: '🧑‍🍳', label: 'Waiter', desc: 'Takes order, communicates with kitchen' },
    dbms: { icon: '⚙️', label: 'DBMS', desc: 'Processes query, manages database access', color: '#8b5cf6' },
  },
  {
    id: 'kitchen',
    restaurant: { icon: '🍳', label: 'Kitchen', desc: 'Prepares the food from stored ingredients' },
    dbms: { icon: '🗄️', label: 'Database', desc: 'Stores and retrieves actual data', color: '#06b6d4' },
  },
  {
    id: 'food',
    restaurant: { icon: '🍽️', label: 'Food', desc: 'Delivered back to the customer' },
    dbms: { icon: '📊', label: 'Information', desc: 'Query results returned to the user', color: '#10b981' },
  },
];

export default function RestaurantAnalogy() {
  const theme = useTheme();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Box>
      {/* Flow */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        {restaurantItems.map((item, i) => (
          <React.Fragment key={item.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHovered(item.id)}
              onHoverEnd={() => setHovered(null)}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: `2px solid ${hovered === item.id ? alpha(item.dbms.color, 0.6) : alpha(item.dbms.color, 0.2)}`,
                  bgcolor: alpha(item.dbms.color, hovered === item.id ? 0.12 : 0.05),
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  minWidth: { xs: 100, sm: 120 },
                }}
              >
                <Typography sx={{ fontSize: '2rem', mb: 0.5 }}>{item.restaurant.icon}</Typography>
                <Typography variant="caption" fontWeight={700} color={item.dbms.color}>
                  {item.restaurant.label}
                </Typography>
              </Paper>
            </motion.div>
            {i < restaurantItems.length - 1 && (
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Typography color="text.secondary" sx={{ fontSize: '1.2rem' }}>→</Typography>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </Box>

      {/* Mapping Cards */}
      <Grid container spacing={2.5}>
        {restaurantItems.map((item, i) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onHoverStart={() => setHovered(item.id)}
              onHoverEnd={() => setHovered(null)}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: `2px solid ${hovered === item.id ? alpha(item.dbms.color, 0.6) : alpha(item.dbms.color, 0.2)}`,
                  bgcolor: alpha(item.dbms.color, hovered === item.id ? 0.1 : 0.04),
                  transition: 'all 0.3s ease',
                  height: '100%',
                  cursor: 'default',
                }}
              >
                {/* Restaurant side */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1.5,
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(item.dbms.color, 0.08),
                  }}
                >
                  <Typography sx={{ fontSize: '1.5rem' }}>{item.restaurant.icon}</Typography>
                  <Box>
                    <Typography variant="caption" fontWeight={800} color={item.dbms.color}>
                      🍽️ {item.restaurant.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" fontSize="0.7rem">
                      {item.restaurant.desc}
                    </Typography>
                  </Box>
                </Box>

                {/* Arrow */}
                <Box sx={{ textAlign: 'center', my: 1 }}>
                  <Typography color={item.dbms.color} fontWeight={700}>
                    ↕
                  </Typography>
                </Box>

                {/* DBMS side */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(item.dbms.color, 0.12),
                    border: `1px solid ${alpha(item.dbms.color, 0.3)}`,
                  }}
                >
                  <Typography sx={{ fontSize: '1.5rem' }}>{item.dbms.icon}</Typography>
                  <Box>
                    <Typography variant="caption" fontWeight={800} color={item.dbms.color}>
                      🗄️ {item.dbms.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" fontSize="0.7rem">
                      {item.dbms.desc}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Summary */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(restaurantItems.find(r => r.id === hovered)?.dbms.color || '#6366f1', 0.1),
                border: `1px solid ${alpha(restaurantItems.find(r => r.id === hovered)?.dbms.color || '#6366f1', 0.3)}`,
              }}
            >
              {(() => {
                const item = restaurantItems.find(r => r.id === hovered);
                return item ? (
                  <Typography variant="body2" fontWeight={600} color={item.dbms.color}>
                    💡 Just as a <strong>{item.restaurant.label}</strong> {item.restaurant.desc.toLowerCase()},
                    the <strong>{item.dbms.label}</strong> in DBMS {item.dbms.desc.toLowerCase()}.
                  </Typography>
                ) : null;
              })()}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
