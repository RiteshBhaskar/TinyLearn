import React, { useState } from 'react';
import { HindiLetter } from '../../types';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/soundEffects';
import { speechEngine } from '../../utils/speech';
import { Volume2, CheckCircle2 } from 'lucide-react';

interface HindiGridProps {
  letters: HindiLetter[];
  onSelectLetter: (index: number) => void;
}

const HINDI_BLOCK_THEMES = [
  { blockClass: 'toy-block-pink', textClass: 'text-pink-600' },
  { blockClass: 'toy-block-purple', textClass: 'text-purple-600' },
  { blockClass: 'toy-block-yellow', textClass: 'text-amber-600' },
  { blockClass: 'toy-block-orange', textClass: 'text-orange-600' },
  { blockClass: 'toy-block-green', textClass: 'text-emerald-600' },
];

export const HindiGrid: React.FC<HindiGridProps> = ({ letters, onSelectLetter }) => {
  const { progress, markHindiLearned } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'swar' | 'vyanjan'>('all');
  const [activeId, setActiveId] = useState<string | null>(null);

  const filteredLetters = letters.filter(l => {
    if (activeTab === 'swar') return l.type === 'swar';
    if (activeTab === 'vyanjan') return l.type === 'vyanjan';
    return true;
  });

  const handleCardClick = (letter: HindiLetter) => {
    setActiveId(letter.id);
    soundEffects.playPop();
    markHindiLearned(letter.id);

    // Speak in Hindi: "अ से अनार"
    speechEngine.speak(`${letter.letter} से ${letter.word}`, 'hi');

    setTimeout(() => {
      setActiveId(null);
    }, 1400);
  };

  return (
    <div className="select-none">
      
      {/* Playful Tab Switcher */}
      <div className="flex justify-center gap-3 sm:gap-4 mb-8">
        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('all');
          }}
          className={`px-6 py-3 rounded-full font-bubble font-black text-lg transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'btn-candy-pink text-white scale-105'
              : 'bg-white border-3 border-pink-200 text-pink-900 hover:bg-pink-50 shadow-sm'
          }`}
        >
          सम्पूर्ण वर्णमाला (All) 🌸
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('swar');
          }}
          className={`px-6 py-3 rounded-full font-bubble font-black text-lg transition-all cursor-pointer ${
            activeTab === 'swar'
              ? 'btn-candy-yellow text-amber-950 scale-105'
              : 'bg-white border-3 border-amber-200 text-amber-900 hover:bg-amber-50 shadow-sm'
          }`}
        >
          स्वर (अ - अः) 🍎
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('vyanjan');
          }}
          className={`px-6 py-3 rounded-full font-bubble font-black text-lg transition-all cursor-pointer ${
            activeTab === 'vyanjan'
              ? 'btn-candy-purple text-white scale-105'
              : 'bg-white border-3 border-purple-200 text-purple-900 hover:bg-purple-50 shadow-sm'
          }`}
        >
          व्यंजन (क - ज्ञ) 🕊️
        </button>
      </div>

      {/* Grid of 3D Hindi Toy Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {filteredLetters.map((item, index) => {
          const originalIndex = letters.findIndex(l => l.id === item.id);
          const isLearned = progress.hindiCompleted.includes(item.id);
          const isActive = activeId === item.id;
          const theme = HINDI_BLOCK_THEMES[index % HINDI_BLOCK_THEMES.length];

          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className={`toy-block ${theme.blockClass} p-4 sm:p-5 flex flex-col items-center justify-between cursor-pointer text-center group ${
                isActive ? 'scale-110 -rotate-2 ring-6 ring-pink-300' : ''
              }`}
            >
              {/* Top status */}
              <div className="w-full flex justify-between items-center mb-1">
                {isLearned ? (
                  <span className="flex items-center gap-1 text-emerald-600 font-bubble font-black text-xs bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    <CheckCircle2 size={13} />
                    <span>सीखा!</span>
                  </span>
                ) : (
                  <span className="text-pink-400 text-sm">⭐</span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectLetter(originalIndex);
                  }}
                  title="कार्ड खोलें"
                  className="text-[11px] font-bubble font-bold text-slate-600 hover:text-slate-900 bg-white/90 px-2 py-0.5 rounded-full shadow-sm"
                >
                  Expand ↗
                </button>
              </div>

              {/* Big Devanagari Character */}
              <div className="my-1">
                <span
                  className={`font-hindi font-black text-6xl sm:text-7xl block transition-all duration-300 ${
                    isActive ? 'scale-125 animate-wiggle' : 'group-hover:scale-110'
                  } ${theme.textClass}`}
                >
                  {item.letter}
                </span>
              </div>

              {/* Big Emoji Picture */}
              <div className="my-2">
                <span
                  className={`text-5xl sm:text-6xl inline-block transition-transform duration-300 ${
                    isActive ? 'animate-bounce' : 'group-hover:scale-125'
                  }`}
                >
                  {item.emoji}
                </span>
              </div>

              {/* Hindi Word Name */}
              <p className="font-hindi font-black text-slate-800 text-xl">
                {item.word}
              </p>
              <p className="text-xs font-bold text-slate-500 font-bubble">
                {item.englishMeaning}
              </p>

              {/* Tap to Speak */}
              <div className="mt-2 pt-2 border-t-2 border-black/5 w-full flex items-center justify-center gap-1.5 text-xs font-bubble font-bold text-slate-500">
                <Volume2 size={15} className={isActive ? 'text-pink-500 animate-bounce' : 'text-purple-500'} />
                <span>{isActive ? 'बोल रहे हैं!' : 'सुनें 🔊'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
