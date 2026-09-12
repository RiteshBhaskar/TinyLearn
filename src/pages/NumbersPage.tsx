import React, { useState } from 'react';
import { NUMBERS_DATA } from '../data/numbersData';
import { NumberGrid } from '../components/numbers/NumberGrid';
import { NumberCarousel } from '../components/numbers/NumberCarousel';
import { CountObjectsGame } from '../components/numbers/CountObjectsGame';
import { NumberMatchGame } from '../components/numbers/NumberMatchGame';
import { NumberSequenceGame } from '../components/numbers/NumberSequenceGame';
import { BiggerNumberGame } from '../components/numbers/BiggerNumberGame';
import { ProgressBar } from '../components/common/ProgressBar';
import { useApp } from '../context/AppContext';
import { soundEffects } from '../utils/soundEffects';
import {
  Hash,
  Sparkles,
  Grid,
  Scale,
  ListOrdered,
  Eye,
  Layers
} from 'lucide-react';

type NumbersTab = 'learn' | 'count' | 'match' | 'sequence' | 'bigger';

export const NumbersPage: React.FC = () => {
  const { progress } = useApp();
  const [activeTab, setActiveTab] = useState<NumbersTab>('learn');
  const [carouselIndex, setCarouselIndex] = useState<number | null>(null);

  const learnedCount = progress.numbersCompleted.length;
  const totalCount = NUMBERS_DATA.length;
  const progressPercent = Math.round((learnedCount / totalCount) * 100);

  const handleTabChange = (tab: NumbersTab) => {
    soundEffects.playPop();
    setActiveTab(tab);
    setCarouselIndex(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-pop-in">
      
      {/* Page Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-100 border-2 border-emerald-300 text-emerald-900 px-4 py-1.5 rounded-full font-bubble font-bold text-sm mb-3">
          <Hash size={16} />
          <span>Numbers & Counting Module</span>
        </div>
        <h1 className="font-bubble font-black text-4xl sm:text-5xl text-slate-900 tracking-tight mb-2">
          123 Numbers (1–20) ⭐
        </h1>
        <p className="text-slate-600 font-medium max-w-lg mx-auto text-base">
          Count real visual objects, learn number names in English & Hindi, and play fun math games!
        </p>
      </div>

      {/* Progress & Stats Bar */}
      <div className="max-w-xl mx-auto bg-white/90 border-3 border-emerald-200 rounded-3xl p-4 sm:p-5 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bubble font-bold text-slate-700 text-sm flex items-center gap-1.5">
            <Sparkles size={16} className="text-amber-500" />
            <span>Numbers Mastered</span>
          </span>
          <span className="font-bubble font-bold text-emerald-700 text-sm">
            {learnedCount} / {totalCount} Numbers ({progressPercent}%)
          </span>
        </div>
        <ProgressBar percentage={progressPercent} color="green" height="md" showLabel={false} />
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        <button
          onClick={() => handleTabChange('learn')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl font-bubble font-bold text-base transition-all cursor-pointer btn-bounce ${
            activeTab === 'learn'
              ? 'bg-emerald-500 text-white shadow-candy-green scale-105'
              : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-emerald-50'
          }`}
        >
          <Grid size={18} />
          <span>Numbers 1–20</span>
        </button>

        <button
          onClick={() => handleTabChange('count')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl font-bubble font-bold text-base transition-all cursor-pointer btn-bounce ${
            activeTab === 'count'
              ? 'bg-amber-400 text-amber-950 shadow-candy-yellow scale-105'
              : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-amber-50'
          }`}
        >
          <Eye size={18} />
          <span>Count Objects</span>
        </button>

        <button
          onClick={() => handleTabChange('match')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl font-bubble font-bold text-base transition-all cursor-pointer btn-bounce ${
            activeTab === 'match'
              ? 'bg-pink-500 text-white shadow-candy-pink scale-105'
              : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-pink-50'
          }`}
        >
          <Layers size={18} />
          <span>Match Stars</span>
        </button>

        <button
          onClick={() => handleTabChange('sequence')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl font-bubble font-bold text-base transition-all cursor-pointer btn-bounce ${
            activeTab === 'sequence'
              ? 'bg-sky-500 text-white shadow-candy-blue scale-105'
              : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-sky-50'
          }`}
        >
          <ListOrdered size={18} />
          <span>Sequence (1, 2, __, 4)</span>
        </button>

        <button
          onClick={() => handleTabChange('bigger')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl font-bubble font-bold text-base transition-all cursor-pointer btn-bounce ${
            activeTab === 'bigger'
              ? 'bg-purple-500 text-white shadow-candy-purple scale-105'
              : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-purple-50'
          }`}
        >
          <Scale size={18} />
          <span>Bigger Number</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'learn' && (
        <>
          {carouselIndex !== null ? (
            <NumberCarousel
              numbers={NUMBERS_DATA}
              initialIndex={carouselIndex}
              onBackToGrid={() => {
                soundEffects.playPop();
                setCarouselIndex(null);
              }}
            />
          ) : (
            <NumberGrid
              numbers={NUMBERS_DATA}
              onSelectNumber={(idx: number) => {
                soundEffects.playPop();
                setCarouselIndex(idx);
              }}
            />
          )}
        </>
      )}

      {activeTab === 'count' && <CountObjectsGame />}
      {activeTab === 'match' && <NumberMatchGame />}
      {activeTab === 'sequence' && <NumberSequenceGame />}
      {activeTab === 'bigger' && <BiggerNumberGame />}
    </div>
  );
};
