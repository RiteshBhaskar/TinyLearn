import React, { useState } from 'react';
import { ENGLISH_LETTERS } from '../data/englishData';
import { AlphabetGrid } from '../components/english/AlphabetGrid';
import { AlphabetCarousel } from '../components/english/AlphabetCarousel';
import { FindLetterGame } from '../components/english/FindLetterGame';
import { MatchLetterObjectGame } from '../components/english/MatchLetterObjectGame';
import { TracingCanvas } from '../components/english/TracingCanvas';
import { ProgressBar } from '../components/common/ProgressBar';
import { useApp } from '../context/AppContext';
import { soundEffects } from '../utils/soundEffects';
import {
  BookOpen,
  Search,
  Layers,
  Sparkles,
  PenTool,
  Grid
} from 'lucide-react';

type EnglishTab = 'learn' | 'find' | 'match' | 'trace';

export const EnglishPage: React.FC = () => {
  const { progress } = useApp();
  const [activeTab, setActiveTab] = useState<EnglishTab>('learn');
  const [carouselIndex, setCarouselIndex] = useState<number | null>(null);

  const learnedCount = progress.englishCompleted.length;
  const totalCount = ENGLISH_LETTERS.length;
  const progressPercent = Math.round((learnedCount / totalCount) * 100);

  const handleTabChange = (tab: EnglishTab) => {
    soundEffects.playPop();
    setActiveTab(tab);
    setCarouselIndex(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-pop-in">
      
      {/* Page Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-100 border-2 border-blue-300 text-blue-900 px-4 py-1.5 rounded-full font-bubble font-bold text-sm mb-3">
          <BookOpen size={16} />
          <span>English Alphabet Module</span>
        </div>
        <h1 className="font-bubble font-black text-4xl sm:text-5xl text-slate-900 tracking-tight mb-2">
          ABC English Alphabet 🍎
        </h1>
        <p className="text-slate-600 font-medium max-w-lg mx-auto text-base">
          Learn letters A to Z with sound pronunciation, interactive games, and touch-friendly letter tracing!
        </p>
      </div>

      {/* Progress & Stats Bar */}
      <div className="max-w-xl mx-auto bg-white/90 border-3 border-blue-200 rounded-3xl p-4 sm:p-5 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bubble font-bold text-slate-700 text-sm flex items-center gap-1.5">
            <Sparkles size={16} className="text-amber-500" />
            <span>Letters Mastered</span>
          </span>
          <span className="font-bubble font-bold text-blue-700 text-sm">
            {learnedCount} / {totalCount} Letters ({progressPercent}%)
          </span>
        </div>
        <ProgressBar percentage={progressPercent} color="blue" height="md" showLabel={false} />
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        <button
          onClick={() => handleTabChange('learn')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bubble font-bold text-base transition-all cursor-pointer btn-bounce ${
            activeTab === 'learn'
              ? 'bg-blue-500 text-white shadow-candy-blue scale-105'
              : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-blue-50'
          }`}
        >
          <Grid size={18} />
          <span>A–Z Alphabet Cards</span>
        </button>

        <button
          onClick={() => handleTabChange('find')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bubble font-bold text-base transition-all cursor-pointer btn-bounce ${
            activeTab === 'find'
              ? 'bg-amber-400 text-amber-950 shadow-candy-yellow scale-105'
              : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-amber-50'
          }`}
        >
          <Search size={18} />
          <span>Find the Letter Game</span>
        </button>

        <button
          onClick={() => handleTabChange('match')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bubble font-bold text-base transition-all cursor-pointer btn-bounce ${
            activeTab === 'match'
              ? 'bg-pink-500 text-white shadow-candy-pink scale-105'
              : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-pink-50'
          }`}
        >
          <Layers size={18} />
          <span>Match Object Game</span>
        </button>

        <button
          onClick={() => handleTabChange('trace')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bubble font-bold text-base transition-all cursor-pointer btn-bounce ${
            activeTab === 'trace'
              ? 'bg-emerald-500 text-white shadow-candy-green scale-105'
              : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-emerald-50'
          }`}
        >
          <PenTool size={18} />
          <span>Letter Tracing Canvas 🎨</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'learn' && (
        <>
          {carouselIndex !== null ? (
            <AlphabetCarousel
              letters={ENGLISH_LETTERS}
              initialIndex={carouselIndex}
              onBackToGrid={() => {
                soundEffects.playPop();
                setCarouselIndex(null);
              }}
            />
          ) : (
            <AlphabetGrid
              letters={ENGLISH_LETTERS}
              onSelectLetter={(idx: number) => {
                soundEffects.playPop();
                setCarouselIndex(idx);
              }}
            />
          )}
        </>
      )}

      {activeTab === 'find' && <FindLetterGame />}
      {activeTab === 'match' && <MatchLetterObjectGame />}
      {activeTab === 'trace' && <TracingCanvas />}
    </div>
  );
};
