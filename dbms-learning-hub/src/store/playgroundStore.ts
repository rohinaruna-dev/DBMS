// ============================================================
// DBMS Learning Hub – Playground (DB Simulator) Store
// ============================================================
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DBRecord, DBOperation } from '@/types';

const defaultRecords: DBRecord[] = [
  { id: '1', rollNo: '101', name: 'Rahul Sharma', branch: 'CSE' },
  { id: '2', rollNo: '102', name: 'Priya Patel', branch: 'ECE' },
  { id: '3', rollNo: '103', name: 'Arun Kumar', branch: 'IT' },
  { id: '4', rollNo: '104', name: 'Sneha Reddy', branch: 'MECH' },
  { id: '5', rollNo: '105', name: 'Rohit Verma', branch: 'CSE' },
];

interface PlaygroundStore {
  records: DBRecord[];
  operationLog: DBOperation[];
  searchResults: DBRecord[] | null;
  lastOperation: string;
  insertRecord: (record: Omit<DBRecord, 'id'>) => boolean;
  updateRecord: (id: string, updates: Partial<Omit<DBRecord, 'id'>>) => boolean;
  deleteRecord: (id: string) => boolean;
  searchRecords: (query: string) => DBRecord[];
  resetDatabase: () => void;
  clearSearch: () => void;
  importData: (data: DBRecord[]) => void;
  sortRecords: (field: keyof DBRecord, direction: 'asc' | 'desc') => void;
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function logOp(
  set: (fn: (state: PlaygroundStore) => Partial<PlaygroundStore>) => void,
  op: DBOperation
) {
  set((state) => ({
    operationLog: [op, ...state.operationLog.slice(0, 49)],
    lastOperation: op.details,
  }));
}

export const usePlaygroundStore = create<PlaygroundStore>()(
  persist(
    (set, get) => ({
      records: defaultRecords,
      operationLog: [],
      searchResults: null,
      lastOperation: 'Database initialized with sample data.',

      insertRecord: (record) => {
        const newRecord: DBRecord = { ...record, id: generateId() };
        set((state) => ({ records: [...state.records, newRecord] }));
        logOp(set, {
          type: 'INSERT',
          timestamp: Date.now(),
          details: `Inserted: Roll ${record.rollNo} – ${record.name} (${record.branch})`,
          success: true,
        });
        return true;
      },

      updateRecord: (id, updates) => {
        const exists = get().records.find((r) => r.id === id);
        if (!exists) {
          logOp(set, {
            type: 'UPDATE',
            timestamp: Date.now(),
            details: `Update failed: Record with ID "${id}" not found.`,
            success: false,
          });
          return false;
        }
        set((state) => ({
          records: state.records.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        }));
        logOp(set, {
          type: 'UPDATE',
          timestamp: Date.now(),
          details: `Updated: Roll ${exists.rollNo} – ${exists.name}`,
          success: true,
        });
        return true;
      },

      deleteRecord: (id) => {
        const exists = get().records.find((r) => r.id === id);
        if (!exists) {
          logOp(set, {
            type: 'DELETE',
            timestamp: Date.now(),
            details: `Delete failed: Record not found.`,
            success: false,
          });
          return false;
        }
        set((state) => ({ records: state.records.filter((r) => r.id !== id) }));
        logOp(set, {
          type: 'DELETE',
          timestamp: Date.now(),
          details: `Deleted: Roll ${exists.rollNo} – ${exists.name}`,
          success: true,
        });
        return true;
      },

      searchRecords: (query) => {
        const q = query.toLowerCase().trim();
        if (!q) {
          set({ searchResults: null });
          logOp(set, {
            type: 'SEARCH',
            timestamp: Date.now(),
            details: 'Search cleared.',
            success: true,
          });
          return [];
        }
        const results = get().records.filter(
          (r) =>
            r.rollNo.toLowerCase().includes(q) ||
            r.name.toLowerCase().includes(q) ||
            r.branch.toLowerCase().includes(q)
        );
        set({ searchResults: results });
        logOp(set, {
          type: 'SEARCH',
          timestamp: Date.now(),
          details: `Searched "${query}" → ${results.length} result(s) found.`,
          success: true,
        });
        return results;
      },

      clearSearch: () => {
        set({ searchResults: null });
      },

      resetDatabase: () => {
        set({ records: defaultRecords, searchResults: null });
        logOp(set, {
          type: 'RESET',
          timestamp: Date.now(),
          details: 'Database reset to default records.',
          success: true,
        });
      },

      importData: (data) => {
        const sanitized = data.map((r) => ({ ...r, id: r.id || generateId() }));
        set({ records: sanitized, searchResults: null });
        logOp(set, {
          type: 'IMPORT',
          timestamp: Date.now(),
          details: `Imported ${sanitized.length} records from JSON.`,
          success: true,
        });
      },

      sortRecords: (field, direction) => {
        set((state) => ({
          records: [...state.records].sort((a, b) => {
            const av = String(a[field]).toLowerCase();
            const bv = String(b[field]).toLowerCase();
            return direction === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
          }),
        }));
      },
    }),
    { name: 'dbms-playground-store' }
  )
);
