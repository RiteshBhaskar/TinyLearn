import React, { useState } from 'react';
import { NumberItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/soundEffects';
import { speechEngine } from '../../utils/speech';
import { Volume2, CheckCircle2 } from 'lucide-react';

interface NumberGridProps {
  numbers: NumberItem[];
  onSelectNumber: (index: number) => void;
}

const NUMBER_BLOCK_THEMES = [
  { blockClass: 'toy-block-green', textClass: 'text-emerald-600' },
  { blockClass: 'toy-block-orange', textClass: 'text-orange-600' },
  { blockClass: 'toy-block-yellow', textClass: 'text-amber-600' },
  { blockClass: 'toy-block-blue', textClass: 'text-sky-600' },
  { blockClass: 'toy-block-purple', textClass: 'text-purple-600' },
];

export const NumberGrid: React.FC<NumberGridProps> = ({ numbers, onSelectNumber }) => {
  const { progress, markNumberLearned } = useApp();
  const [activeNumber, setActiveNumber] = useState<number | null>(null);

  const handleCardClick = (index: number, num: NumberItem) => {
    setActiveNumber(num.number);
    soundEffects.playCountBeep(num.number);
    markNumberLearned(num.number);

    // Speak number name
    speechEngine.speak(`${num.word}. Number ${num.number}`);

    setTimeout(() => {
      setActiveNumber(null);
    }, 1400);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 select-none">
      {numbers.map((item, index) => {
        const isLearned = progress.numbersCompleted.includes(item.number);
        const isActive = activeNumber === item.number;
        const theme = NUMBER_BLOCK_THEMES[index % NUMBER_BLOCK_THEMES.length];

        return (
          <div
            key={item.id}
            onClick={() => handleCardClick(index, item)}
            className={`toy-block ${theme.blockClass} p-4 sm:p-5 flex flex-col items-center justify-between cursor-pointer text-center group ${
              isActive ? 'scale-110 -rotate-2 ring-6 ring-emerald-300' : ''
            }`}
          >
            {/* Top Bar */}
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
                  onSelectNumber(index);
                }}
                title="Count items out loud"
                className="text-[11px] font-bubble font-bold text-slate-600 hover:text-slate-900 bg-white/90 px-2 py-0.5 rounded-full shadow-sm"
              >
                Count ↗
              </button>
            </div>

            {/* Big 3D Balloon Digit */}
            <div className="my-1">
              <span
                className={`font-bubble font-black text-6xl sm:text-7xl block transition-all duration-300 ${
                  isActive ? 'scale-125 animate-wiggle' : 'group-hover:scale-110'
                } ${theme.textClass}`}
              >
                {item.number}
              </span>
            </div>

            {/* Word Name & Hindi Name */}
            <div>
              <p className="font-bubble font-black text-slate-800 text-xl">
                {item.word}
              </p>
              <p className="font-hindi text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                {item.hindiWord}
              </p>
            </div>

            {/* Visual Countable Mini Items Preview */}
            <div className="my-2 py-2 px-3 bg-white/90 rounded-2xl border-2 border-emerald-200 flex flex-wrap justify-center gap-1 min-h-[44px] items-center shadow-inner w-full">
              {item.objects.slice(0, Math.min(item.number, 5)).map((obj, i) => (
                <span
                  key={i}
                  className="text-lg sm:text-xl transition-transform hover:scale-125"
                >
                  {obj}
                </span>
              ))}
              {item.number > 5 && (
                <span className="text-xs font-bubble font-black text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                  +{item.number - 5} more
                </span>
              )}
            </div>

            {/* Bottom Speaker Action */}
            <div className="mt-1 pt-2 border-t-2 border-black/5 w-full flex items-center justify-center gap-1.5 text-xs font-bubble font-bold text-slate-500">
              <Volume2 size={15} className={isActive ? 'text-emerald-500 animate-bounce' : 'text-orange-500'} />
              <span>{isActive ? 'Counting!' : 'Tap to count'}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
