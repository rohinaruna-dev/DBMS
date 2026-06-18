'use client';

// ============================================================
// DBMS Simulator – Full In-Browser CRUD Playground
// ============================================================
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  alpha,
  useTheme,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import SortIcon from '@mui/icons-material/Sort';
import { usePlaygroundStore } from '@/store/playgroundStore';
import { useProgressStore } from '@/store/progressStore';
import type { DBRecord } from '@/types';

type TabId = 'table' | 'insert' | 'search' | 'log';

export default function DbmsSimulator() {
  const theme = useTheme();
  const {
    records,
    operationLog,
    searchResults,
    lastOperation,
    insertRecord,
    updateRecord,
    deleteRecord,
    searchRecords,
    clearSearch,
    resetDatabase,
    importData,
    sortRecords,
  } = usePlaygroundStore();
  const { addPlaygroundOperation } = useProgressStore();

  const [tab, setTab] = useState<TabId>('table');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [editTarget, setEditTarget] = useState<DBRecord | null>(null);
  const [sortField, setSortField] = useState<keyof DBRecord>('rollNo');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Insert form
  const [form, setForm] = useState({ rollNo: '', name: '', branch: '' });
  // Search form
  const [searchQuery, setSearchQuery] = useState('');
  // Edit form
  const [editForm, setEditForm] = useState({ rollNo: '', name: '', branch: '' });

  const showRows = searchResults ?? records;

  const handleInsert = () => {
    if (!form.rollNo || !form.name || !form.branch) {
      setToast({ msg: 'Please fill all fields!', type: 'error' });
      return;
    }
    insertRecord({ rollNo: form.rollNo, name: form.name, branch: form.branch });
    addPlaygroundOperation({ type: 'INSERT', timestamp: Date.now(), details: `Inserted ${form.name}`, success: true });
    setForm({ rollNo: '', name: '', branch: '' });
    setToast({ msg: `✅ Record inserted: ${form.name} (Roll: ${form.rollNo})`, type: 'success' });
    setTab('table');
  };

  const handleSearch = () => {
    searchRecords(searchQuery);
    if (!searchQuery.trim()) {
      setToast({ msg: 'Search cleared', type: 'info' });
    } else {
      const count = (searchResults?.length ?? 0);
      setToast({ msg: `🔍 Found records matching "${searchQuery}"`, type: 'success' });
    }
  };

  const handleDelete = (id: string, name: string) => {
    deleteRecord(id);
    addPlaygroundOperation({ type: 'DELETE', timestamp: Date.now(), details: `Deleted ${name}`, success: true });
    setToast({ msg: `🗑️ Deleted: ${name}`, type: 'success' });
  };

  const handleEdit = (record: DBRecord) => {
    setEditTarget(record);
    setEditForm({ rollNo: record.rollNo, name: record.name, branch: record.branch });
  };

  const handleEditSave = () => {
    if (!editTarget) return;
    updateRecord(editTarget.id, { rollNo: editForm.rollNo, name: editForm.name, branch: editForm.branch });
    addPlaygroundOperation({ type: 'UPDATE', timestamp: Date.now(), details: `Updated ${editForm.name}`, success: true });
    setToast({ msg: `✏️ Updated: ${editForm.name}`, type: 'success' });
    setEditTarget(null);
  };

  const handleReset = () => {
    resetDatabase();
    clearSearch();
    setSearchQuery('');
    setToast({ msg: '🔄 Database reset to default records', type: 'info' });
  };

  const handleExport = () => {
    const json = JSON.stringify(records, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_database.json';
    a.click();
    URL.revokeObjectURL(url);
    setToast({ msg: '📥 Exported database as JSON', type: 'success' });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (Array.isArray(data)) {
          importData(data);
          setToast({ msg: `📤 Imported ${data.length} records`, type: 'success' });
        }
      } catch {
        setToast({ msg: 'Invalid JSON file', type: 'error' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSort = () => {
    sortRecords(sortField, sortDir);
    setToast({ msg: `Sorted by ${String(sortField)} (${sortDir})`, type: 'info' });
  };

  const branches = ['CSE', 'ECE', 'IT', 'MECH', 'CIVIL', 'EEE', 'AIDS'];

  return (
    <Box>
      {/* ── Stats bar ── */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <Chip
          label={`📊 ${records.length} Records`}
          color="primary"
          sx={{ fontWeight: 700 }}
        />
        {searchResults !== null && (
          <Chip
            label={`🔍 ${searchResults.length} Results`}
            sx={{ bgcolor: alpha('#f59e0b', 0.15), color: '#f59e0b', fontWeight: 700 }}
          />
        )}
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <Tooltip title="Export JSON">
            <IconButton size="small" onClick={handleExport} aria-label="export database">
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Import JSON">
            <IconButton size="small" component="label" aria-label="import database">
              <UploadIcon fontSize="small" />
              <input type="file" accept=".json" hidden onChange={handleImport} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset Database">
            <IconButton size="small" color="warning" onClick={handleReset} aria-label="reset database">
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* ── Operation Log ── */}
      {lastOperation && (
        <Box
          sx={{
            mb: 2,
            p: 1.5,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.06),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
            fontFamily: 'monospace',
          }}
        >
          <Typography variant="caption" color="primary.main" fontWeight={700}>
            &gt;_ {lastOperation}
          </Typography>
        </Box>
      )}

      {/* ── Tabs ── */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v as TabId)}
        sx={{ mb: 2.5, borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.12)}` }}
        TabIndicatorProps={{ sx: { background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' } }}
      >
        <Tab label="📊 Table View" value="table" id="tab-table" />
        <Tab label="➕ Insert" value="insert" id="tab-insert" />
        <Tab label="🔍 Search" value="search" id="tab-search" />
        <Tab label="📋 Log" value="log" id="tab-log" />
      </Tabs>

      {/* ── TABLE VIEW ── */}
      {tab === 'table' && (
        <Box>
          {/* Sort controls */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortField} label="Sort By" onChange={(e) => setSortField(e.target.value as keyof DBRecord)}>
                <MenuItem value="rollNo">Roll No</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="branch">Branch</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel>Order</InputLabel>
              <Select value={sortDir} label="Order" onChange={(e) => setSortDir(e.target.value as 'asc' | 'desc')}>
                <MenuItem value="asc">↑ Ascending</MenuItem>
                <MenuItem value="desc">↓ Descending</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<SortIcon />}
              onClick={handleSort}
              size="small"
              id="sort-btn"
            >
              Sort
            </Button>
            {searchResults !== null && (
              <Button variant="outlined" size="small" onClick={() => { clearSearch(); setSearchQuery(''); }}>
                Clear Filter
              </Button>
            )}
          </Box>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
              overflow: 'auto',
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['#', 'Roll No', 'Name', 'Branch', 'Actions'].map((h) => (
                    <TableCell
                      key={h}
                      sx={{
                        fontWeight: 800,
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'primary.main',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <AnimatePresence>
                  {showRows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                        {searchResults !== null
                          ? `🔍 No records found for "${searchQuery}"`
                          : '📭 Database is empty. Insert some records!'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    showRows.map((row, i) => (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: i * 0.03 }}
                        style={{
                          backgroundColor:
                            i % 2 === 0
                              ? alpha(theme.palette.primary.main, 0.02)
                              : 'transparent',
                        }}
                      >
                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.8rem', fontWeight: 600 }}>
                          {i + 1}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {row.rollNo}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.branch}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              bgcolor: alpha(theme.palette.secondary.main, 0.12),
                              color: 'secondary.main',
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => handleEdit(row)}
                                aria-label={`edit ${row.name}`}
                                sx={{ color: '#6366f1' }}
                              >
                                <EditIcon sx={{ fontSize: '0.9rem' }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(row.id, row.name)}
                                aria-label={`delete ${row.name}`}
                              >
                                <DeleteIcon sx={{ fontSize: '0.9rem' }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* ── INSERT ── */}
      {tab === 'insert' && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: `1px solid ${alpha('#10b981', 0.2)}`,
            bgcolor: alpha('#10b981', 0.04),
          }}
        >
          <Typography variant="h6" fontWeight={700} color="#10b981" sx={{ mb: 2.5 }}>
            ➕ INSERT New Record
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Roll No"
              value={form.rollNo}
              onChange={(e) => setForm((f) => ({ ...f, rollNo: e.target.value }))}
              fullWidth
              inputProps={{ 'aria-label': 'roll number input' }}
              id="insert-rollno"
            />
            <TextField
              label="Student Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              fullWidth
              inputProps={{ 'aria-label': 'student name input' }}
              id="insert-name"
            />
            <FormControl fullWidth>
              <InputLabel>Branch</InputLabel>
              <Select
                value={form.branch}
                label="Branch"
                onChange={(e) => setForm((f) => ({ ...f, branch: e.target.value }))}
                inputProps={{ 'aria-label': 'branch selection' }}
                id="insert-branch"
              >
                {branches.map((b) => (
                  <MenuItem key={b} value={b}>{b}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleInsert}
              size="large"
              id="insert-submit-btn"
              sx={{ bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}
            >
              INSERT Record
            </Button>
          </Box>
          <Box
            sx={{
              mt: 2.5,
              p: 1.5,
              borderRadius: 1.5,
              bgcolor: alpha('#10b981', 0.1),
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              color: '#10b981',
            }}
          >
            SQL: INSERT INTO Students (RollNo, Name, Branch) VALUES ('{form.rollNo || '?'}', '{form.name || '?'}', '{form.branch || '?'}');
          </Box>
        </Paper>
      )}

      {/* ── SEARCH ── */}
      {tab === 'search' && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: `1px solid ${alpha('#f59e0b', 0.2)}`,
            bgcolor: alpha('#f59e0b', 0.04),
          }}
        >
          <Typography variant="h6" fontWeight={700} color="#f59e0b" sx={{ mb: 2.5 }}>
            🔍 SEARCH Records
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              label="Search by Roll No, Name, or Branch"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              sx={{ flex: 1, minWidth: 220 }}
              inputProps={{ 'aria-label': 'search query' }}
              id="search-input"
            />
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              id="search-submit-btn"
              sx={{ bgcolor: '#f59e0b', '&:hover': { bgcolor: '#d97706' }, color: '#000' }}
            >
              SEARCH
            </Button>
          </Box>
          {searchResults !== null && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Found <strong>{searchResults.length}</strong> record(s) matching "{searchQuery}"
            </Typography>
          )}
          {searchResults !== null && searchResults.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {searchResults.map((r) => (
                <Box
                  key={r.id}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha('#f59e0b', 0.1),
                    border: `1px solid ${alpha('#f59e0b', 0.3)}`,
                  }}
                >
                  <Typography variant="body2" fontWeight={700}>
                    📋 Roll: {r.rollNo} | Name: {r.name} | Branch: {r.branch}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
          <Box
            sx={{
              mt: 2.5,
              p: 1.5,
              borderRadius: 1.5,
              bgcolor: alpha('#f59e0b', 0.1),
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              color: '#d97706',
            }}
          >
            SQL: SELECT * FROM Students WHERE Name LIKE '%{searchQuery || '?'}%';
          </Box>
        </Paper>
      )}

      {/* ── LOG ── */}
      {tab === 'log' && (
        <Box>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            📋 Operation Log
          </Typography>
          {operationLog.length === 0 ? (
            <Typography color="text.secondary">No operations yet. Start using the database!</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {operationLog.map((op, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    bgcolor: alpha(op.success ? '#10b981' : '#ef4444', 0.06),
                    border: `1px solid ${alpha(op.success ? '#10b981' : '#ef4444', 0.2)}`,
                    display: 'flex',
                    gap: 2,
                  }}
                >
                  <Chip
                    label={op.type}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      bgcolor: alpha(
                        op.type === 'INSERT' ? '#10b981'
                        : op.type === 'DELETE' ? '#ef4444'
                        : op.type === 'UPDATE' ? '#6366f1'
                        : '#f59e0b',
                        0.2
                      ),
                      color:
                        op.type === 'INSERT' ? '#10b981'
                        : op.type === 'DELETE' ? '#ef4444'
                        : op.type === 'UPDATE' ? '#6366f1'
                        : '#f59e0b',
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="caption" sx={{ flex: 1 }}>
                    {op.details}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(op.timestamp).toLocaleTimeString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}

      {/* ── Edit Dialog ── */}
      <Dialog open={!!editTarget} onClose={() => setEditTarget(null)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>✏️ Edit Record</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Roll No"
            value={editForm.rollNo}
            onChange={(e) => setEditForm((f) => ({ ...f, rollNo: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Name"
            value={editForm.name}
            onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Branch</InputLabel>
            <Select
              value={editForm.branch}
              label="Branch"
              onChange={(e) => setEditForm((f) => ({ ...f, branch: e.target.value }))}
            >
              {branches.map((b) => <MenuItem key={b} value={b}>{b}</MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditTarget(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave} id="edit-save-btn">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Toast ── */}
      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast(null)}
          severity={toast?.type || 'success'}
          sx={{ fontWeight: 600 }}
        >
          {toast?.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
