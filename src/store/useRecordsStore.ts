import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type RecordType = 'feeding' | 'mood' | 'pain' | 'note' | 'sleep' | 'diaper';

export interface RecordEntry {
  id: string;
  type: RecordType;
  createdAt: string;
  payload: any;
}

interface RecordsState {
  records: RecordEntry[];
  loading: boolean;
  error: string | null;
  addRecord: (type: RecordType, payload: any) => void;
  updateRecord: (id: string, payload: any) => void;
  deleteRecord: (id: string) => void;
  clearRecords: () => void;
}

export const useRecordsStore = create<RecordsState>()(
  persist(
    (set) => ({
      records: [],
      loading: false,
      error: null,
      addRecord: (type, payload) => {
        const newRecord: RecordEntry = {
          id: uuidv4(),
          type,
          createdAt: new Date().toISOString(),
          payload,
        };
        set((state) => ({ records: [newRecord, ...state.records] }));
      },
      updateRecord: (id, payload) => {
        set((state) => ({
          records: state.records.map((r) =>
            r.id === id ? { ...r, payload: { ...r.payload, ...payload } } : r
          ),
        }));
      },
      deleteRecord: (id) => {
        set((state) => ({
          records: state.records.filter((r) => r.id !== id),
        }));
      },
      clearRecords: () => set({ records: [] }),
    }),
    {
      name: 'baby-tracker-records',
    }
  )
);
