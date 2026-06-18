'use client';

// ============================================================
// Interactive Table Builder – Build a DB table live
// ============================================================
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  alpha,
  useTheme,
  Tooltip,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { motion, AnimatePresence } from 'framer-motion';

interface TableRow {
  id: string;
  [key: string]: string;
}

const defaultColumns = ['Roll No', 'Name', 'Branch'];
const defaultRows: TableRow[] = [
  { id: '1', 'Roll No': '101', Name: 'Rahul', Branch: 'CSE' },
  { id: '2', 'Roll No': '102', Name: 'Priya', Branch: 'ECE' },
  { id: '3', 'Roll No': '103', Name: 'Arun', Branch: 'IT' },
];

export default function InteractiveTableBuilder() {
  const theme = useTheme();
  const [columns, setColumns] = useState<string[]>(defaultColumns);
  const [rows, setRows] = useState<TableRow[]>(defaultRows);
  const [newColName, setNewColName] = useState('');
  const [newRow, setNewRow] = useState<Record<string, string>>({});

  const addColumn = () => {
    const name = newColName.trim();
    if (!name || columns.includes(name)) return;
    setColumns((prev) => [...prev, name]);
    setRows((prev) => prev.map((r) => ({ ...r, [name]: '' })));
    setNewColName('');
  };

  const removeColumn = (col: string) => {
    if (columns.length <= 1) return;
    setColumns((prev) => prev.filter((c) => c !== col));
    setRows((prev) => prev.map((r) => { const copy = { ...r }; delete copy[col]; return copy; }));
  };

  const addRow = () => {
    const newId = Date.now().toString();
    const rowData: TableRow = { id: newId };
    columns.forEach((col) => { rowData[col] = newRow[col] || ''; });
    setRows((prev) => [...prev, rowData]);
    setNewRow({});
  };

  const deleteRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const updateCell = (rowId: string, col: string, value: string) => {
    setRows((prev) =>
      prev.map((r) => (r.id === rowId ? { ...r, [col]: value } : r))
    );
  };

  const headerColors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <Chip
          icon={<TableRowsIcon />}
          label={`${rows.length} Records · ${columns.length} Fields`}
          color="primary"
          sx={{ fontWeight: 700 }}
        />
        <Typography variant="caption" color="text.secondary">
          Click any cell to edit • Add rows and columns
        </Typography>
      </Box>

      {/* ── Table ── */}
      <Paper
        elevation={0}
        sx={{
          overflow: 'auto',
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          mb: 3,
        }}
      >
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
          {/* Header */}
          <Box component="thead">
            <Box component="tr">
              {columns.map((col, i) => (
                <Box
                  component="th"
                  key={col}
                  sx={{
                    px: 2,
                    py: 1.5,
                    bgcolor: alpha(headerColors[i % headerColors.length], 0.12),
                    borderBottom: `2px solid ${alpha(headerColors[i % headerColors.length], 0.3)}`,
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="caption"
                      fontWeight={800}
                      color={headerColors[i % headerColors.length]}
                      sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    >
                      {col}
                    </Typography>
                    {columns.length > 1 && (
                      <Tooltip title={`Remove "${col}" column`}>
                        <IconButton
                          size="small"
                          onClick={() => removeColumn(col)}
                          aria-label={`remove ${col} column`}
                          sx={{ p: 0.3, opacity: 0.5, '&:hover': { opacity: 1, color: 'error.main' } }}
                        >
                          <DeleteIcon sx={{ fontSize: '0.75rem' }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              ))}
              <Box component="th" sx={{ px: 1, py: 1, bgcolor: alpha('#64748b', 0.06) }}>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  Actions
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Rows */}
          <Box component="tbody">
            <AnimatePresence>
              {rows.map((row, ri) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    backgroundColor: ri % 2 === 0
                      ? alpha(theme.palette.primary.main, 0.02)
                      : 'transparent',
                  }}
                >
                  {columns.map((col) => (
                    <Box
                      component="td"
                      key={col}
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                      }}
                    >
                      <TextField
                        size="small"
                        value={row[col] || ''}
                        onChange={(e) => updateCell(row.id, col, e.target.value)}
                        variant="standard"
                        inputProps={{ 'aria-label': `${col} row ${ri + 1}` }}
                        sx={{
                          '& input': { fontSize: '0.85rem', fontWeight: 500 },
                          '& .MuiInput-underline:before': { borderColor: 'transparent' },
                        }}
                      />
                    </Box>
                  ))}
                  <Box
                    component="td"
                    sx={{ px: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}
                  >
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => deleteRow(row.id)}
                      aria-label={`delete row ${ri + 1}`}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </motion.tr>
              ))}
            </AnimatePresence>

            {/* New Row Input */}
            <Box component="tr" sx={{ bgcolor: alpha('#10b981', 0.04) }}>
              {columns.map((col) => (
                <Box component="td" key={col} sx={{ px: 1, py: 1 }}>
                  <TextField
                    size="small"
                    value={newRow[col] || ''}
                    onChange={(e) => setNewRow((prev) => ({ ...prev, [col]: e.target.value }))}
                    placeholder={col}
                    variant="standard"
                    inputProps={{ 'aria-label': `new ${col}` }}
                    sx={{ '& input': { fontSize: '0.85rem', color: '#10b981' } }}
                  />
                </Box>
              ))}
              <Box component="td" sx={{ px: 1 }}>
                <Tooltip title="Add this row">
                  <IconButton
                    size="small"
                    onClick={addRow}
                    aria-label="add new row"
                    sx={{
                      bgcolor: alpha('#10b981', 0.12),
                      color: '#10b981',
                      '&:hover': { bgcolor: alpha('#10b981', 0.2) },
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* ── Add Column ── */}
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size="small"
          label="New Column Name"
          value={newColName}
          onChange={(e) => setNewColName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addColumn()}
          sx={{ minWidth: 180 }}
          inputProps={{ 'aria-label': 'new column name' }}
        />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addColumn}
          disabled={!newColName.trim()}
          id="add-column-btn"
        >
          Add Column
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addRow}
          color="success"
          id="add-row-btn"
        >
          Add Empty Row
        </Button>
      </Box>

      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.06),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          💡 <strong>You just built a database table!</strong> This is exactly how DBMS stores data
          — in structured tables with rows (records) and columns (fields). Try adding a "Marks" or
          "Phone" column!
        </Typography>
      </Box>
    </Box>
  );
}
