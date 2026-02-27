import React, { useMemo } from 'react';
import { useAppStore, themes } from '../store/useAppStore';
import { useRecordsStore } from '../store/useRecordsStore';
import { ThemedScreen, Card } from '../components/UI';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { format, subDays, startOfDay } from 'date-fns';
import { tr } from 'date-fns/locale';
import { TrendingUp, Activity, Moon, Utensils } from 'lucide-react';

export const Insights: React.FC = () => {
  const themeKey = useAppStore((state) => state.theme);
  const theme = themes[themeKey];
  const records = useRecordsStore((state) => state.records);

  const last7DaysData = useMemo(() => {
    const days = Array.from({ length: 7 }).map((_, i) => {
      const date = subDays(new Date(), 6 - i);
      const dayStr = format(date, 'EEE', { locale: tr });
      const dayRecords = records.filter(r => startOfDay(new Date(r.createdAt)).getTime() === startOfDay(date).getTime());
      
      const feeding = dayRecords.filter(r => r.type === 'feeding').reduce((acc, r) => acc + (r.payload.amountMl || 0), 0);
      const sleep = dayRecords.filter(r => r.type === 'sleep').reduce((acc, r) => acc + (r.payload.durationMin || 0), 0);
      const mood = dayRecords.filter(r => r.type === 'mood').reduce((acc, r) => acc + (r.payload.value || 0), 0) / (dayRecords.filter(r => r.type === 'mood').length || 1);

      return { name: dayStr, feeding, sleep: Math.round(sleep / 60), mood };
    });
    return days;
  }, [records]);

  return (
    <ThemedScreen className="p-6">
      <h1 className="text-2xl font-black mb-6">Haftalık İçgörü</h1>

      <div className="space-y-6">
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Utensils size={18} style={{ color: theme.accent }} />
            <h3 className="font-bold text-sm">Beslenme (ml)</h3>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last7DaysData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.border} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: theme.muted }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: '12px' }}
                  itemStyle={{ color: theme.accent }}
                />
                <Bar dataKey="feeding" fill={theme.accent} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Moon size={18} style={{ color: theme.accent }} />
            <h3 className="font-bold text-sm">Uyku (saat)</h3>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={last7DaysData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.border} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: theme.muted }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="sleep" stroke={theme.accent} strokeWidth={3} dot={{ fill: theme.accent }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 flex flex-col items-center text-center">
            <Activity size={24} className="mb-2" style={{ color: theme.accent }} />
            <div className="text-xs opacity-50 mb-1">Ort. Ruh Hali</div>
            <div className="text-xl font-bold">
              {last7DaysData.reduce((acc, d) => acc + d.mood, 0) / 7 > 3.5 ? '😊 Mutlu' : '😐 Nötr'}
            </div>
          </Card>
          <Card className="p-4 flex flex-col items-center text-center">
            <TrendingUp size={24} className="mb-2" style={{ color: theme.accent }} />
            <div className="text-xs opacity-50 mb-1">Gelişim</div>
            <div className="text-xl font-bold">Harika!</div>
          </Card>
        </div>
      </div>
    </ThemedScreen>
  );
};
