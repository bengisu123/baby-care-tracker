import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) return `${h} s ${m} dk`;
  return `${m} dk`;
}

export const MOODS = [
  { value: 1, label: 'Çok Mutsuz', emoji: '😫' },
  { value: 2, label: 'Mutsuz', emoji: '☹️' },
  { value: 3, label: 'Nötr', emoji: '😐' },
  { value: 4, label: 'Mutlu', emoji: '🙂' },
  { value: 5, label: 'Çok Mutlu', emoji: '😊' },
];

export const PAIN_LABELS = ['İlgili', 'Sıkıntılı', 'Heyecanlı', 'Mutsuz'];
