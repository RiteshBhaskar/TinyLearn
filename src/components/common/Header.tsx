import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/soundEffects';
import {
  Menu,
  X,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Sparkles
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  emoji: string;
  colorClass: string;
  activeClass: string;
}

export const Header: React.FC = () => {
  const { progress, currentRoute, setCurrentRoute, toggleSound, toggleSpeech } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', emoji: '🏠', colorClass: 'hover:bg-amber-100 text-amber-900', activeClass: 'btn-candy-yellow text-amber-950 scale-105' },
    { id: 'english', label: 'ABC', emoji: '🔤', colorClass: 'hover:bg-sky-100 text-sky-900', activeClass: 'btn-candy-blue text-white scale-105' },
    { id: 'numbers', label: 'Numbers', emoji: '🔢', colorClass: 'hover:bg-emerald-100 text-emerald-900', activeClass: 'btn-candy-green text-white scale-105' },
    { id: 'hindi', label: 'Hindi', emoji: 'अ', colorClass: 'hover:bg-pink-100 text-pink-900', activeClass: 'btn-candy-pink text-white scale-105' },
    { id: 'practice', label: 'Practice', emoji: '🎮', colorClass: 'hover:bg-purple-100 text-purple-900', activeClass: 'btn-candy-purple text-white scale-105' },
    { id: 'progress', label: 'Rewards', emoji: '🏆', colorClass: 'hover:bg-amber-100 text-amber-900', activeClass: 'btn-candy-yellow text-amber-950 scale-105' },
    { id: 'parents', label: 'Parents', emoji: '🛡️', colorClass: 'hover:bg-slate-100 text-slate-700', activeClass: 'bg-slate-800 text-white shadow-md scale-105' },
  ];

  const handleNavClick = (id: string) => {
    soundEffects.playPop();
    setCurrentRoute(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-6 max-w-7xl mx-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-full border-4 border-amber-300 shadow-toy-yellow px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all">
        
        {/* Logo: 🧸 TinyLearn */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 border-3 border-amber-400 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            🧸
          </div>
          <div className="leading-tight">
            <span className="font-bubble font-black text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-pink-500 via-purple-600 to-sky-500 bg-clip-text text-transparent">
              TinyLearn
            </span>
            <div className="hidden sm:flex items-center gap-1 -mt-1">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest font-bubble">
                Learn • Play • Grow
              </span>
              <Sparkles size={11} className="text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {navItems.map(item => {
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bubble font-black text-base transition-all duration-200 cursor-pointer ${
                  isActive
                    ? item.activeClass
                    : `${item.colorClass} bg-transparent`
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Stars, Coins & Audio controls */}
        <div className="flex items-center gap-2">
          
          {/* Star Counter Pill */}
          <div
            onClick={() => handleNavClick('progress')}
            className="flex items-center gap-1.5 bg-gradient-to-b from-amber-100 to-yellow-200 border-2 border-amber-400 px-3 py-1 rounded-full cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition select-none"
            title="Total Stars Collected"
          >
            <span className="text-lg animate-bounce-slow">⭐</span>
            <span className="font-bubble font-black text-amber-950 text-base">
              {progress.stars}
            </span>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              soundEffects.playPop();
              toggleSound();
            }}
            aria-label="Toggle Sound"
            title={progress.soundEnabled ? 'Sound Effects: ON' : 'Sound Effects: OFF'}
            className={`p-2 rounded-full border-2 transition cursor-pointer ${
              progress.soundEnabled
                ? 'bg-emerald-100 border-emerald-400 text-emerald-800 hover:bg-emerald-200'
                : 'bg-slate-100 border-slate-300 text-slate-400'
            }`}
          >
            {progress.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Speech Toggle */}
          <button
            onClick={() => {
              soundEffects.playPop();
              toggleSpeech();
            }}
            aria-label="Toggle Voice"
            title={progress.speechEnabled ? 'Voice Pronunciation: ON' : 'Voice Pronunciation: OFF'}
            className={`hidden sm:flex p-2 rounded-full border-2 transition cursor-pointer ${
              progress.speechEnabled
                ? 'bg-sky-100 border-sky-400 text-sky-800 hover:bg-sky-200'
                : 'bg-slate-100 border-slate-300 text-slate-400'
            }`}
          >
            {progress.speechEnabled ? <Mic size={18} /> : <MicOff size={18} />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => {
              soundEffects.playPop();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 rounded-full bg-amber-400 text-amber-950 border-2 border-amber-500 shadow-sm cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-md border-4 border-amber-300 rounded-3xl p-4 shadow-xl animate-pop-in">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => {
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-3 rounded-2xl font-bubble font-black text-base transition-all ${
                    isActive
                      ? item.activeClass
                      : 'bg-slate-50 border-2 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
