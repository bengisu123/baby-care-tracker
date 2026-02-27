import React, { useState } from 'react';
import { useAppStore, themes } from '../store/useAppStore';
import { useRecordsStore, RecordType } from '../store/useRecordsStore';
import { Button } from './UI';
import { MOODS, PAIN_LABELS } from '../lib/utils';
import { Baby, Utensils, Heart, Activity, Moon, Droplets, FileText } from 'lucide-react';

interface RecordFormProps {
  onSuccess: () => void;
}

export const RecordForm: React.FC<RecordFormProps> = ({ onSuccess }) => {
  const themeKey = useAppStore((state) => state.theme);
  const theme = themes[themeKey];
  const addRecord = useRecordsStore((state) => state.addRecord);

  const [step, setStep] = useState<'select' | 'form'>('select');
  const [type, setType] = useState<RecordType | null>(null);

  // Form states
  const [feedingMethod, setFeedingMethod] = useState<'breast' | 'bottle' | 'formula'>('breast');
  const [amount, setAmount] = useState(50);
  const [duration, setDuration] = useState(15);
  const [mood, setMood] = useState(3);
  const [pain, setPain] = useState({ ilgili: 3, sıkıntılı: 0, heyecanlı: 3, mutsuz: 0 });
  const [note, setNote] = useState('');
  const [diaperKind, setDiaperKind] = useState<'wet' | 'dirty' | 'both'>('wet');

  const handleSelectType = (t: RecordType) => {
    setType(t);
    setStep('form');
  };

  const handleSubmit = () => {
    if (!type) return;

    let payload = {};
    switch (type) {
      case 'feeding':
        payload = { method: feedingMethod, amountMl: amount, durationMin: duration, note };
        break;
      case 'mood':
        const moodObj = MOODS.find(m => m.value === mood);
        payload = { value: mood, label: moodObj?.label, emoji: moodObj?.emoji, note };
        break;
      case 'pain':
        payload = { ...pain, note };
        break;
      case 'note':
        payload = { text: note };
        break;
      case 'sleep':
        payload = { durationMin: duration, note };
        break;
      case 'diaper':
        payload = { kind: diaperKind, note };
        break;
    }

    addRecord(type, payload);
    onSuccess();
  };

  if (step === 'select') {
    const options = [
      { id: 'feeding', label: 'Beslenme', icon: Utensils },
      { id: 'mood', label: 'Ruh Hali', icon: Heart },
      { id: 'pain', label: 'Panas Testi', icon: Activity },
      { id: 'sleep', label: 'Uyku', icon: Moon },
      { id: 'diaper', label: 'Alt Değiştirme', icon: Droplets },
      { id: 'note', label: 'Not', icon: FileText },
    ];

    return (
      <div className="grid grid-cols-2 gap-4">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelectType(opt.id as RecordType)}
            className="flex flex-col items-center justify-center p-6 rounded-2xl space-y-3 transition-all active:scale-95"
            style={{ backgroundColor: theme.bg }}
          >
            <opt.icon size={32} style={{ color: theme.accent }} />
            <span className="font-semibold text-sm" style={{ color: theme.text }}>{opt.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {type === 'feeding' && (
        <>
          <div className="flex space-x-2">
            {(['breast', 'bottle', 'formula'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setFeedingMethod(m)}
                className="flex-1 py-2 rounded-lg text-sm font-medium border transition-all"
                style={{ 
                  backgroundColor: feedingMethod === m ? theme.accent : 'transparent',
                  color: feedingMethod === m ? theme.accentText : theme.text,
                  borderColor: theme.accent
                }}
              >
                {m === 'breast' ? 'Meme' : m === 'bottle' ? 'Biberon' : 'Mama'}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold opacity-70">Miktar (ml): {amount}</label>
            <input 
              type="range" min="0" max="300" step="10" value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-pink-500"
              style={{ accentColor: theme.accent }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold opacity-70">Süre (dk): {duration}</label>
            <input 
              type="range" min="0" max="60" step="5" value={duration} 
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: theme.accent }}
            />
          </div>
        </>
      )}

      {type === 'mood' && (
        <div className="space-y-6 text-center">
          <div className="text-6xl mb-4">{MOODS.find(m => m.value === mood)?.emoji}</div>
          <div className="text-xl font-bold" style={{ color: theme.accent }}>{MOODS.find(m => m.value === mood)?.label}</div>
          <input 
            type="range" min="1" max="5" step="1" value={mood} 
            onChange={(e) => setMood(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: theme.accent }}
          />
        </div>
      )}

      {type === 'pain' && (
        <div className="space-y-4">
          {PAIN_LABELS.map((label) => (
            <div key={label} className="p-4 rounded-xl" style={{ backgroundColor: theme.bg }}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm">{label}</span>
                <span className="font-bold" style={{ color: theme.accent }}>{pain[label.toLowerCase() as keyof typeof pain]}</span>
              </div>
              <input 
                type="range" min="0" max="5" step="1" 
                value={pain[label.toLowerCase() as keyof typeof pain]}
                onChange={(e) => setPain({ ...pain, [label.toLowerCase()]: Number(e.target.value) })}
                className="w-full"
                style={{ accentColor: theme.accent }}
              />
              <div className="flex justify-between text-[10px] opacity-50 mt-1">
                <span>Hiç</span>
                <span>Ortalama</span>
                <span>Çok fazla</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {type === 'sleep' && (
        <div className="space-y-2">
          <label className="text-sm font-semibold opacity-70">Uyku Süresi (dk): {duration}</label>
          <input 
            type="range" min="0" max="720" step="15" value={duration} 
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: theme.accent }}
          />
        </div>
      )}

      {type === 'diaper' && (
        <div className="flex space-x-2">
          {(['wet', 'dirty', 'both'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setDiaperKind(k)}
              className="flex-1 py-3 rounded-xl text-sm font-bold border transition-all"
              style={{ 
                backgroundColor: diaperKind === k ? theme.accent : 'transparent',
                color: diaperKind === k ? theme.accentText : theme.text,
                borderColor: theme.accent
              }}
            >
              {k === 'wet' ? 'Islak' : k === 'dirty' ? 'Kirli' : 'Her İkisi'}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-semibold opacity-70">Notlar</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Bugün bebeğim için..."
          className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2"
          style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.text }}
          rows={3}
        />
      </div>

      <div className="flex space-x-3">
        <Button variant="secondary" className="flex-1" onClick={() => setStep('select')}>Geri</Button>
        <Button variant="primary" className="flex-1" onClick={handleSubmit}>Kaydet</Button>
      </div>
    </div>
  );
};
