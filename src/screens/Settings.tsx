import React from 'react';
import { useAppStore, themes, ThemeType } from '../store/useAppStore';
import { useRecordsStore } from '../store/useRecordsStore';
import { ThemedScreen, Card, Button } from '../components/UI';
import { cn } from '../lib/utils';
import { Palette, Baby, Trash2, Download, Bell } from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme: currentTheme, setTheme, babyName, babyBirthday, setBabyInfo } = useAppStore();
  const theme = themes[currentTheme];
  const clearRecords = useRecordsStore((state) => state.clearRecords);

  const themeOptions: { id: ThemeType, label: string, color: string }[] = [
    { id: 'T1', label: 'Pembe (T1)', color: '#FF69B4' },
    { id: 'T2', label: 'Koyu Yeşil (T2)', color: '#76BA99' },
    { id: 'T3', label: 'Mavi (T3)', color: '#486581' },
  ];

  return (
    <ThemedScreen className="p-6">
      <h1 className="text-2xl font-black mb-6">Ayarlar</h1>

      <div className="space-y-6">
        <section>
          <div className="flex items-center space-x-2 mb-4 opacity-50">
            <Palette size={18} />
            <h2 className="text-xs font-bold uppercase tracking-widest">Görünüm</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {themeOptions.map((opt) => (
              <Card 
                key={opt.id}
                onClick={() => setTheme(opt.id)}
                className={cn(
                  "flex items-center justify-between p-4 border-2 transition-all",
                  currentTheme === opt.id ? "border-current" : "border-transparent"
                )}
                style={{ borderColor: currentTheme === opt.id ? theme.accent : 'transparent' }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: opt.color }} />
                  <span className="font-bold">{opt.label}</span>
                </div>
                {currentTheme === opt.id && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />}
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-2 mb-4 opacity-50">
            <Baby size={18} />
            <h2 className="text-xs font-bold uppercase tracking-widest">Bebek Bilgileri</h2>
          </div>
          <Card className="space-y-4">
            <div>
              <label className="text-xs font-bold opacity-50 block mb-1">Bebek Adı</label>
              <input 
                type="text"
                value={babyName}
                onChange={(e) => setBabyInfo(e.target.value, babyBirthday)}
                className="w-full p-3 rounded-xl border focus:outline-none"
                style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.text }}
              />
            </div>
          </Card>
        </section>

        <section>
          <div className="flex items-center space-x-2 mb-4 opacity-50">
            <Bell size={18} />
            <h2 className="text-xs font-bold uppercase tracking-widest">Uygulama</h2>
          </div>
          <div className="space-y-3">
            <Card className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Download size={20} className="opacity-50" />
                <span className="font-bold">Verileri Dışa Aktar</span>
              </div>
            </Card>
            <Card 
              onClick={() => {
                if (confirm('Tüm kayıtlar silinecek. Emin misiniz?')) {
                  clearRecords();
                }
              }}
              className="flex items-center justify-between p-4 text-red-500"
            >
              <div className="flex items-center space-x-3">
                <Trash2 size={20} />
                <span className="font-bold">Tüm Verileri Sıfırla</span>
              </div>
            </Card>
          </div>
        </section>

        <div className="text-center pt-8 opacity-30 text-[10px]">
          Bebek Günlüğü v1.0.0<br/>
          Sevgiyle geliştirildi.
        </div>
      </div>
    </ThemedScreen>
  );
};
