import React from 'react';
import { useAppStore, themes } from '../store/useAppStore';
import { useRecordsStore, RecordEntry } from '../store/useRecordsStore';
import { Card } from './UI';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Utensils, Heart, Activity, Moon, Droplets, FileText, Trash2 } from 'lucide-react';
import { formatDuration } from '../lib/utils';

export const RecordListItem: React.FC<{ record: RecordEntry; showDelete?: boolean }> = ({ record, showDelete = true }) => {
  const themeKey = useAppStore((state) => state.theme);
  const theme = themes[themeKey];
  const deleteRecord = useRecordsStore((state) => state.deleteRecord);

  const getIcon = () => {
    switch (record.type) {
      case 'feeding': return Utensils;
      case 'mood': return Heart;
      case 'pain': return Activity;
      case 'sleep': return Moon;
      case 'diaper': return Droplets;
      default: return FileText;
    }
  };

  const Icon = getIcon();

  const getContent = () => {
    const p = record.payload;
    switch (record.type) {
      case 'feeding':
        return `${p.method === 'breast' ? 'Meme' : p.method === 'bottle' ? 'Biberon' : 'Mama'} - ${p.amountMl}ml / ${p.durationMin}dk`;
      case 'mood':
        return `${p.emoji} ${p.label}`;
      case 'pain':
        return `Panas: ${p.ilgili}, ${p.sıkıntılı}, ${p.heyecanlı}, ${p.mutsuz}`;
      case 'sleep':
        return `Uyku: ${formatDuration(p.durationMin)}`;
      case 'diaper':
        return `Alt: ${p.kind === 'wet' ? 'Islak' : p.kind === 'dirty' ? 'Kirli' : 'Her İkisi'}`;
      case 'note':
        return p.text;
      default:
        return '';
    }
  };

  return (
    <Card className="mb-3 flex items-center justify-between group">
      <div className="flex items-center space-x-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: theme.bg }}
        >
          <Icon size={20} style={{ color: theme.accent }} />
        </div>
        <div>
          <div className="font-bold text-sm" style={{ color: theme.text }}>{getContent()}</div>
          <div className="text-[10px] opacity-50" style={{ color: theme.text }}>
            {format(new Date(record.createdAt), 'HH:mm - d MMMM', { locale: tr })}
          </div>
        </div>
      </div>
      {showDelete && (
        <button 
          onClick={() => deleteRecord(record.id)}
          className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: '#FF4444' }}
        >
          <Trash2 size={18} />
        </button>
      )}
    </Card>
  );
};
