import React from 'react';
import { useAppStore, themes } from '../store/useAppStore';
import { Home, List, BarChart2, Settings, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onPlusClick: () => void;
}

export const BottomNav: React.FC<NavProps> = ({ activeTab, onTabChange, onPlusClick }) => {
  const themeKey = useAppStore((state) => state.theme);
  const theme = themes[themeKey];

  const tabs = [
    { id: 'home', icon: Home, label: 'Ana Sayfa' },
    { id: 'records', icon: List, label: 'Kayıtlar' },
    { id: 'insights', icon: BarChart2, label: 'İçgörü' },
    { id: 'settings', icon: Settings, label: 'Ayarlar' },
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-20 flex items-center justify-around px-4 border-t z-40"
      style={{ backgroundColor: theme.nav, borderColor: theme.border }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="flex flex-col items-center justify-center space-y-1"
        >
          <tab.icon 
            size={24} 
            color={activeTab === tab.id ? theme.navActive : theme.muted} 
            strokeWidth={activeTab === tab.id ? 2.5 : 2}
          />
          <span 
            className="text-[10px] font-medium"
            style={{ color: activeTab === tab.id ? theme.navActive : theme.muted }}
          >
            {tab.label}
          </span>
        </button>
      ))}

      <button
        onClick={onPlusClick}
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
        style={{ backgroundColor: theme.accent, color: theme.accentText }}
      >
        <Plus size={32} />
      </button>
    </div>
  );
};
