import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingElements } from './components/common/FloatingElements';
import { RewardPopup } from './components/common/RewardPopup';
import { HomePage } from './pages/HomePage';
import { EnglishPage } from './pages/EnglishPage';
import { NumbersPage } from './pages/NumbersPage';
import { HindiPage } from './pages/HindiPage';
import { PracticePage } from './pages/PracticePage';
import { ProgressPage } from './pages/ProgressPage';
import { ParentsPage } from './pages/ParentsPage';

export const App: React.FC = () => {
  const { currentRoute } = useApp();

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'english':
        return <EnglishPage />;
      case 'numbers':
        return <NumbersPage />;
      case 'hindi':
        return <HindiPage />;
      case 'practice':
        return <PracticePage />;
      case 'progress':
        return <ProgressPage />;
      case 'parents':
        return <ParentsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Background playful floating shapes */}
      <FloatingElements />

      {/* Top Main Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Reward / Celebration Popup */}
      <RewardPopup />
    </div>
  );
};
