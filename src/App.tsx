import React, { useState, useEffect } from 'react';
import { Dashboard } from './screens/Dashboard';
import { RecordsList } from './screens/RecordsList';
import { Insights } from './screens/Insights';
import { Settings } from './screens/Settings';
import { BottomNav } from './components/BottomNav';
import { ModalSheet } from './components/ModalSheet';
import { RecordForm } from './components/RecordForm';
import { useAppStore, themes } from './store/useAppStore';
import { useRecordsStore } from './store/useRecordsStore';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const themeKey = useAppStore((state) => state.theme);
  const theme = themes[themeKey];

  // Mock initial data if empty
  const { records, addRecord } = useRecordsStore();
  
  useEffect(() => {
    if (records.length === 0) {
      // Add some sample data for the first time
      addRecord('feeding', { method: 'breast', amountMl: 120, durationMin: 20, note: 'Sabah beslenmesi' });
      addRecord('mood', { value: 5, label: 'Çok Mutlu', emoji: '😊', note: 'Uykusunu iyi aldı' });
      addRecord('sleep', { durationMin: 120, note: 'Öğle uykusu' });
    }
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <Dashboard />;
      case 'records': return <RecordsList />;
      case 'insights': return <Insights />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen relative bg-black overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onPlusClick={() => setIsModalOpen(true)}
      />

      <ModalSheet 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Yeni Kayıt Ekle"
      >
        <RecordForm onSuccess={() => setIsModalOpen(false)} />
      </ModalSheet>

      {/* Global styles for the mobile container feel */}
      <style dangerouslySetInnerHTML={{ __html: `
        body {
          background-color: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
        }
        #root {
          width: 100%;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
