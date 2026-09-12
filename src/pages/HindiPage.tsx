import React, { useState } from 'react';
import { HINDI_LETTERS } from '../data/hindiData';
import { HindiGrid } from '../components/hindi/HindiGrid';
import { HindiCarousel } from '../components/hindi/HindiCarousel';
import { HindiWordQuizGame } from '../components/hindi/HindiWordQuizGame';
import { HindiMatchGame } from '../components/hindi/HindiMatchGame';
import { HindiFindLetterGame } from '../components/hindi/HindiFindLetterGame';
import { ProgressBar } from '../components/common/ProgressBar';
import { useApp } from '../context/AppContext';
import { soundEffects } from '../utils/soundEffects';
import {
  Languages,
  Sparkles,
  Grid,
  Search,
  Layers,
  HelpCircle
} from 'lucide-react';

type HindiTab = 'learn' | 'word-quiz' | 'match' | 'find';

export const HindiPage: React.FC = () => {
  const { progress } = useApp();
  const [activeTab, setActiveTab] = useState<HindiTab>('learn');
  const [carouselIndex, setCarouselIndex] = useState<number | null>(null);

  const learnedCount = progress.hindiCompleted.length;
  const totalCount = HINDI_LETTERS.length;
  const progressPercent = Math.round((learnedCount / totalCount) * 100);

  const handleTabChange = (tab: HindiTab) => {
    soundEffects.playPop();
    setActiveTab(tab);
    setCarouselIndex(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-pop-in">
      
      {/* Page Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-orange-100 border-2 border-orange-300 text-orange-900 px-4 py-1.5 rounded-full font-bubble font-bold text-sm mb-3">
          <Languages size={16} />
          <span>हिंदी वर्णमाला मॉड्यूल</span>
        </div>
        <h1 className="font-bubble font-black text-4xl sm:text-5xl text-slate-900 tracking-tight mb-2">
          हिंदी सीखें (अ से ज्ञ) 🇮🇳
        </h1>
        <p className="text-slate-600 font-medium max-w-lg mx-auto text-base">
          स्वर और व्यंजन सीखें, सही उच्चारण सुनें और मज़ेदार हिंदी खेल खेलें!
        </p>
      </div>

      {/* Progress & Stats Bar */}
      <div className="max-w-xl mx-auto bg-white/90 border-3 border-orange-200 rounded-3xl p-4 sm:p-5 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bubble font-bold text-slate-700 text-sm flex items-center gap-1.5">
            <Sparkles size={16} className="text-amber-500" />
            <span>अक्षर सीखे गए</span>
          </span>
          <span className="font-bubble font-bold text-orange-700 text-sm">
            {learnedCount} / {totalCount} अक्षर ({progressPercent}%)
          </span>
        </div>
        <ProgressBar percentage={progressPercent} color="orange" height="md" showLabel={false} />
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        <button
          onClick={() => handleTabChange('learn')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bubble font-bold text-base transition-all cursor-pointer btn-bounce ${
            activeTab === 'learn'
              ? 'bg-orange-500 text-white shadow-candy-orange scale-105'
              : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-orange-50'
          }`}
        >
          <Grid size={18} />
          <span>वर्णमाला (अ–ज्ञ)</span>
        </button>

        <button
          onClick={() => handleTabChange('word-quiz')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bubble font-bold text-base transition-all cursor-pointer btn-bounce ${
            activeTab === 'word-quiz'
              ? 'bg-amber-400 text-amber-950 shadow-candy-yellow scale-105'
              : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-amber-50'
          }`}
        >
          <HelpCircle size={18} />
          <span>अ से क्या आता है?</span>
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
          <span>चित्र व अक्षर मिलान</span>
        </button>

        <button
          onClick={() => handleTabChange('find')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bubble font-bold text-base transition-all cursor-pointer btn-bounce ${
            activeTab === 'find'
              ? 'bg-emerald-500 text-white shadow-candy-green scale-105'
              : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-emerald-50'
          }`}
        >
          <Search size={18} />
          <span>अक्षर खोजें (Find)</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'learn' && (
        <>
          {carouselIndex !== null ? (
            <HindiCarousel
              letters={HINDI_LETTERS}
              initialIndex={carouselIndex}
              onBackToGrid={() => {
                soundEffects.playPop();
                setCarouselIndex(null);
              }}
            />
          ) : (
            <HindiGrid
              letters={HINDI_LETTERS}
              onSelectLetter={(idx: number) => {
                soundEffects.playPop();
                setCarouselIndex(idx);
              }}
            />
          )}
        </>
      )}

      {activeTab === 'word-quiz' && <HindiWordQuizGame />}
      {activeTab === 'match' && <HindiMatchGame />}
      {activeTab === 'find' && <HindiFindLetterGame />}
    </div>
  );
};
