import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useAppStore, themes } from '../store/useAppStore';

interface ModalSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const ModalSheet: React.FC<ModalSheetProps> = ({ isOpen, onClose, title, children }) => {
  const themeKey = useAppStore((state) => state.theme);
  const theme = themes[themeKey];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[32px] p-6 max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: theme.card }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: theme.text }}>{title}</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full"
                style={{ backgroundColor: theme.bg }}
              >
                <X size={20} style={{ color: theme.text }} />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
