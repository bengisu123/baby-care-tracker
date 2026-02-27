import React, { useState, useMemo } from 'react';
import { useAppStore, themes } from '../store/useAppStore';
import { useRecordsStore } from '../store/useRecordsStore';
import { ThemedScreen, Card } from '../components/UI';
import { RecordListItem } from '../components/RecordListItem';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Baby, Utensils, Heart, Activity, Moon, Droplets, Plus } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const themeKey = useAppStore((state) => state.theme);
  const theme = themes[themeKey];
  const { babyName } = useAppStore();
  const records = useRecordsStore((state) => state.records);

  const recentRecords = records.slice(0, 5);

  const quickStats = useMemo(() => {
    const today = new Date().toDateString();
    const todayRecords = records.filter(r => new Date(r.createdAt).toDateString() === today);
    
    const feeding = todayRecords.filter(r => r.type === 'feeding').reduce((acc, r) => acc + (r.payload.amountMl || 0), 0);
    const sleep = todayRecords.filter(r => r.type === 'sleep').reduce((acc, r) => acc + (r.payload.durationMin || 0), 0);
    const diapers = todayRecords.filter(r => r.type === 'diaper').length;

    return { feeding, sleep, diapers };
  }, [records]);

  return (
    <ThemedScreen className="p-6">
      <header className="mb-8">
        <div className="text-xs font-bold opacity-50 uppercase tracking-widest" style={{ color: theme.text }}>
          {format(new Date(), 'd MMMM yyyy, EEEE', { locale: tr })}
        </div>
        <h1 className="text-3xl font-black mt-1" style={{ color: theme.text }}>
          Merhaba, <span style={{ color: theme.accent }}>{babyName}</span>
        </h1>
      </header>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <Card className="flex flex-col items-center justify-center p-3 text-center">
          <Utensils size={20} className="mb-1" style={{ color: theme.accent }} />
          <div className="text-lg font-bold">{quickStats.feeding}</div>
          <div className="text-[10px] opacity-50">ml Beslenme</div>
        </Card>
        <Card className="flex flex-col items-center justify-center p-3 text-center">
          <Moon size={20} className="mb-1" style={{ color: theme.accent }} />
          <div className="text-lg font-bold">{Math.floor(quickStats.sleep / 60)}s {quickStats.sleep % 60}d</div>
          <div className="text-[10px] opacity-50">Toplam Uyku</div>
        </Card>
        <Card className="flex flex-col items-center justify-center p-3 text-center">
          <Droplets size={20} className="mb-1" style={{ color: theme.accent }} />
          <div className="text-lg font-bold">{quickStats.diapers}</div>
          <div className="text-[10px] opacity-50">Alt Değişimi</div>
        </Card>
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Hızlı İşlemler</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="flex items-center space-x-3 p-4" style={{ backgroundColor: theme.accent + '20' }}>
            <Heart size={24} style={{ color: theme.accent }} />
            <span className="font-bold text-sm">Ruh Hali</span>
          </Card>
          <Card className="flex items-center space-x-3 p-4" style={{ backgroundColor: theme.accent + '20' }}>
            <Activity size={24} style={{ color: theme.accent }} />
            <span className="font-bold text-sm">Panas Testi</span>
          </Card>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Son Kayıtlar</h2>
          <button className="text-xs font-bold" style={{ color: theme.accent }}>Tümünü Gör</button>
        </div>
        
        {recentRecords.length === 0 ? (
          <Card className="p-8 text-center flex flex-col items-center space-y-3">
            <Baby size={48} className="opacity-20" />
            <p className="text-sm opacity-50">Henüz kayıt eklenmemiş.</p>
          </Card>
        ) : (
          <div className="space-y-1">
            {recentRecords.map(record => (
              <RecordListItem key={record.id} record={record} />
            ))}
          </div>
        )}
      </section>
    </ThemedScreen>
  );
};
