import React, { ReactNode } from 'react';
import { useAppStore, themes } from '../store/useAppStore';
import { cn } from '../lib/utils';

interface ThemedScreenProps {
  children: ReactNode;
  className?: string;
  showNav?: boolean;
}

export const ThemedScreen: React.FC<ThemedScreenProps> = ({ children, className, showNav = true }) => {
  const themeKey = useAppStore((state) => state.theme);
  const theme = themes[themeKey];

  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col transition-colors duration-300",
        className
      )}
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <main className={cn("flex-1 overflow-y-auto pb-24", className)}>
        {children}
      </main>
    </div>
  );
};

export const Card: React.FC<{ children: ReactNode; className?: string; onClick?: () => void }> = ({ children, className, onClick }) => {
  const themeKey = useAppStore((state) => state.theme);
  const theme = themes[themeKey];

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl p-4 shadow-sm transition-all duration-200",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
      style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}
    >
      {children}
    </div>
  );
};

export const Button: React.FC<{ 
  children: ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', className, disabled }) => {
  const themeKey = useAppStore((state) => state.theme);
  const theme = themes[themeKey];

  const styles = {
    primary: {
      backgroundColor: theme.accent,
      color: theme.accentText,
    },
    secondary: {
      backgroundColor: theme.border,
      color: theme.text,
    },
    outline: {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.accent}`,
      color: theme.accent,
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50",
        className
      )}
      style={styles[variant]}
    >
      {children}
    </button>
  );
};
