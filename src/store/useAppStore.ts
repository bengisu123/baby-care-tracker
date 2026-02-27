import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeType = 'T1' | 'T2' | 'T3';

export interface ThemeColors {
  bg: string;
  card: string;
  text: string;
  muted: string;
  accent: string;
  accentText: string;
  border: string;
  nav: string;
  navActive: string;
}

export const themes: Record<ThemeType, ThemeColors> = {
  T1: {
    bg: '#FFF0F5', // LavenderBlush
    card: '#FFFFFF',
    text: '#4A4A4A',
    muted: '#9B9B9B',
    accent: '#FF69B4', // HotPink
    accentText: '#FFFFFF',
    border: '#FFD1DC',
    nav: '#FFFFFF',
    navActive: '#FF69B4',
  },
  T2: {
    bg: '#1B3022', // Dark Green
    card: '#2D4A36',
    text: '#E0E0E0',
    muted: '#A0A0A0',
    accent: '#76BA99', // Light Green
    accentText: '#1B3022',
    border: '#3E5C48',
    nav: '#2D4A36',
    navActive: '#76BA99',
  },
  T3: {
    bg: '#F0F4F8', // Light Blue Gray
    card: '#FFFFFF',
    text: '#243B53',
    muted: '#627D98',
    accent: '#486581', // Steel Blue
    accentText: '#FFFFFF',
    border: '#D9E2EC',
    nav: '#FFFFFF',
    navActive: '#486581',
  },
};

interface AppState {
  theme: ThemeType;
  babyName: string;
  babyBirthday: string;
  setTheme: (theme: ThemeType) => void;
  setBabyInfo: (name: string, birthday: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'T1',
      babyName: 'Bebeğim',
      babyBirthday: '',
      setTheme: (theme) => set({ theme }),
      setBabyInfo: (babyName, babyBirthday) => set({ babyName, babyBirthday }),
    }),
    {
      name: 'baby-tracker-app-settings',
    }
  )
);
