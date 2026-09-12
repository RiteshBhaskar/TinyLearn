import React, { useState } from 'react';
import { EnglishLetter } from '../../types';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/soundEffects';
import { speechEngine } from '../../utils/speech';
import { Volume2, CheckCircle2, Sparkles } from 'lucide-react';

interface AlphabetGridProps {
  letters: EnglishLetter[];
  onSelectLetter: (index: number) => void;
}

const TOY_THEMES = [
  { blockClass: 'toy-block-blue', textClass: 'text-sky-600', badgeClass: 'bg-sky-100 text-sky-800' },
  { blockClass: 'toy-block-yellow', textClass: 'text-amber-600', badgeClass: 'bg-amber-100 text-amber-800' },
  { blockClass: 'toy-block-pink', textClass: 'text-pink-600', badgeClass: 'bg-pink-100 text-pink-800' },
  { blockClass: 'toy-block-green', textClass: 'text-emerald-600', badgeClass: 'bg-emerald-100 text-emerald-800' },
  { blockClass: 'toy-block-purple', textClass: 'text-purple-600', badgeClass: 'bg-purple-100 text-purple-800' },
  { blockClass: 'toy-block-orange', textClass: 'text-orange-600', badgeClass: 'bg-orange-100 text-orange-800' },
];

export const AlphabetGrid: React.FC<AlphabetGridProps> = ({ letters, onSelectLetter }) => {
  const { progress, markEnglishLearned } = useApp();
  const [activeLetterId, setActiveLetterId] = useState<string | null>(null);

  const handleCardClick = (index: number, letter: EnglishLetter) => {
    setActiveLetterId(letter.id);
    soundEffects.playPop();
    markEnglishLearned(letter.id);

    // Voice: "A for Apple"
    speechEngine.speak(`${letter.letter} for ${letter.word}`);

    setTimeout(() => {
      setActiveLetterId(null);
    }, 1400);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 select-none">
      {letters.map((item, index) => {
        const isLearned = progress.englishCompleted.includes(item.id);
        const isActive = activeLetterId === item.id;
        const theme = TOY_THEMES[index % TOY_THEMES.length];

        return (
          <div
            key={item.id}
            onClick={() => handleCardClick(index, item)}
            className={`toy-block ${theme.blockClass} p-4 sm:p-5 flex flex-col items-center justify-between cursor-pointer text-center group ${
              isActive ? 'scale-110 -rotate-2 ring-6 ring-yellow-300' : ''
            }`}
          >
            {/* Top Bar inside block */}
            <div className="w-full flex justify-between items-center mb-1">
              {isLearned ? (
                <span className="flex items-center gap-1 text-emerald-600 font-bubble font-black text-xs bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  <CheckCircle2 size={13} />
                  <span>Done!</span>
                </span>
              ) : (
                <span className="text-amber-400 text-sm">⭐</span>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectLetter(index);
                }}
                title="Expand Reading Card"
                className="text-[11px] font-bubble font-bold text-slate-600 hover:text-slate-900 bg-white/90 px-2 py-0.5 rounded-full shadow-sm"
              >
                Expand ↗
              </button>
            </div>

            {/* Giant 3D Alphabet Letter */}
            <div className="my-1">
              <span
                className={`font-bubble font-black text-6xl sm:text-7xl block transition-all duration-300 ${
                  isActive ? 'scale-125 animate-wiggle' : 'group-hover:scale-110'
                } ${theme.textClass}`}
              >
                {item.letter}
              </span>
            </div>

            {/* Big Animated Emoji Picture */}
            <div className="my-2">
              <span
                className={`text-5xl sm:text-6xl inline-block transition-transform duration-300 ${
                  isActive ? 'animate-bounce' : 'group-hover:scale-125'
                }`}
              >
                {item.emoji}
              </span>
            </div>

            {/* Word Name */}
            <p className="font-bubble font-black text-slate-800 text-lg sm:text-xl tracking-wide">
              {item.word}
            </p>

            {/* Bottom Speaker Action */}
            <div className="mt-2 pt-2 border-t-2 border-black/5 w-full flex items-center justify-center gap-1.5 text-xs font-bubble font-bold text-slate-500">
              <Volume2 size={15} className={isActive ? 'text-pink-500 animate-bounce' : 'text-amber-500'} />
              <span>{isActive ? 'Speaking!' : 'Tap to hear'}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
