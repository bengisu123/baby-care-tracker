import React, { useState, useMemo } from 'react';
import { useAppStore, themes } from '../store/useAppStore';
import { useRecordsStore, RecordType } from '../store/useRecordsStore';
import { ThemedScreen, Card } from '../components/UI';
import { RecordListItem } from '../components/RecordListItem';
import { cn } from '../lib/utils';
import { Search, Filter, Calendar } from 'lucide-react';

export const RecordsList: React.FC = () => {
  const themeKey = useAppStore((state) => state.theme);
  const theme = themes[themeKey];
  const records = useRecordsStore((state) => state.records);
  
  const [filterType, setFilterType] = useState<RecordType | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      const matchesType = filterType === 'all' || r.type === filterType;
      const matchesSearch = JSON.stringify(r.payload).toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [records, filterType, search]);

  const types: { id: RecordType | 'all', label: string }[] = [
    { id: 'all', label: 'Hepsi' },
    { id: 'feeding', label: 'Beslenme' },
    { id: 'mood', label: 'Ruh Hali' },
    { id: 'pain', label: 'Panas' },
    { id: 'sleep', label: 'Uyku' },
    { id: 'diaper', label: 'Alt' },
    { id: 'note', label: 'Notlar' },
  ];

  return (
    <ThemedScreen className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-black mb-4">Günlük Kayıtlar</h1>
        
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
          <input 
            type="text"
            placeholder="Kayıtlarda ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:outline-none focus:ring-2"
            style={{ backgroundColor: theme.card, borderColor: theme.border, color: theme.text }}
          />
        </div>

        <div className="flex overflow-x-auto space-x-2 pb-2 no-scrollbar">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilterType(t.id)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
              )}
              style={{ 
                backgroundColor: filterType === t.id ? theme.accent : theme.card,
                color: filterType === t.id ? theme.accentText : theme.text,
                borderColor: filterType === t.id ? theme.accent : theme.border
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="space-y-1">
        {filteredRecords.length === 0 ? (
          <div className="py-20 text-center opacity-30 flex flex-col items-center">
            <Filter size={48} className="mb-4" />
            <p>Kayıt bulunamadı.</p>
          </div>
        ) : (
          filteredRecords.map(record => (
            <RecordListItem key={record.id} record={record} />
          ))
        )}
      </div>
    </ThemedScreen>
  );
};
