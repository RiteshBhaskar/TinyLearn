import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/soundEffects';
import { speechEngine } from '../../utils/speech';
import { ConfettiCanvas } from '../common/ConfettiCanvas';
import { TikoMascot } from '../common/TikoMascot';
import { Volume2, RefreshCw } from 'lucide-react';

const EMOJI_OBJECTS = [
  { name: 'apples', emoji: '🍎' },
  { name: 'stars', emoji: '⭐' },
  { name: 'balloons', emoji: '🎈' },
  { name: 'butterflies', emoji: '🦋' },
  { name: 'cupcakes', emoji: '🧁' },
  { name: 'footballs', emoji: '⚽' },
  { name: 'strawberries', emoji: '🍓' },
  { name: 'ice creams', emoji: '🍦' }
];

const TOY_OPTIONS_THEMES = ['toy-block-green', 'toy-block-yellow', 'toy-block-orange'];

export const CountObjectsGame: React.FC = () => {
  const { addStars } = useApp();
  const [score, setScore] = useState(0);
  const [targetCount, setTargetCount] = useState(4);
  const [targetItem, setTargetItem] = useState(EMOJI_OBJECTS[0]);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [tikoState, setTikoState] = useState<{ message: string; emotion: 'cheering' | 'correct' | 'encourage' }>({
    message: "Tap each item to count along with me! 🧸",
    emotion: 'cheering'
  });

  const generateQuestion = () => {
    setSelectedOption(null);
    setTappedIndices([]);

    const count = Math.floor(Math.random() * 10) + 1;
    const item = EMOJI_OBJECTS[Math.floor(Math.random() * EMOJI_OBJECTS.length)];

    setTargetCount(count);
    setTargetItem(item);

    const distractors = new Set<number>();
    while (distractors.size < 2) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      const val = Math.max(1, count + offset);
      if (val !== count) {
        distractors.add(val);
      }
    }

    const allOpts = [count, ...Array.from(distractors)].sort(() => Math.random() - 0.5);
    setOptions(allOpts);
    setTikoState({
      message: `How many ${item.name} are there in the playground? 🎈`,
      emotion: 'cheering'
    });

    speechEngine.speak(`How many ${item.name} can you count?`);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleItemTap = (index: number) => {
    if (tappedIndices.includes(index)) {
      setTappedIndices(prev => prev.filter(i => i !== index));
    } else {
      const newTapped = [...tappedIndices, index];
      setTappedIndices(newTapped);
      soundEffects.playCountBeep(newTapped.length);
      speechEngine.speak(`${newTapped.length}`);
    }
  };

  const handleOptionClick = (num: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(num);

    if (num === targetCount) {
      soundEffects.playCorrect();
      setShowCelebration(true);
      setScore(prev => prev + 1);
      addStars(3);
      setTikoState({
        message: `Great job! There are exactly ${targetCount} ${targetItem.name}! 🎉 ⭐ +3 Stars`,
        emotion: 'correct'
      });
      speechEngine.speak(`Great job! There are ${targetCount} ${targetItem.name}!`);

      setTimeout(() => {
        setShowCelebration(false);
        generateQuestion();
      }, 2000);
    } else {
      soundEffects.playGentleOops();
      setTikoState({
        message: `Almost! Tap each ${targetItem.name.slice(0, -1)} to count together! 😊`,
        emotion: 'encourage'
      });
      speechEngine.speak(`Try counting again! Tap each item!`);

      setTimeout(() => {
        setSelectedOption(null);
      }, 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 select-none animate-pop-in">
      <ConfettiCanvas active={showCelebration} durationMs={2000} />

      {/* Header Bar */}
      <div className="flex justify-between items-center bg-white/95 border-4 border-amber-300 rounded-3xl p-4 mb-6 shadow-toy-yellow">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🍎</span>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase font-bubble">Score</p>
            <p className="font-bubble font-black text-2xl text-slate-800">{score} Points</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-emerald-100 border-2 border-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bubble font-black text-emerald-900">
          <span>💡 Tap items to count!</span>
        </div>

        <button
          onClick={generateQuestion}
          title="New Question"
          className="p-3.5 btn-candy bg-amber-100 hover:bg-amber-200 border-3 border-amber-300 text-amber-900 shadow-sm cursor-pointer"
        >
          <RefreshCw size={22} />
        </button>
      </div>

      {/* Mascot Hint */}
      <div className="flex justify-center mb-6">
        <TikoMascot
          message={tikoState.message}
          emotion={tikoState.emotion}
          size="sm"
        />
      </div>

      {/* Main 3D Card */}
      <div className="toy-block toy-block-green p-8 sm:p-10 text-center mb-6">
        
        <div className="inline-flex items-center gap-3 bg-white border-4 border-emerald-300 px-8 py-3 rounded-full shadow-md mb-6">
          <h2 className="font-bubble font-black text-3xl text-emerald-950">
            How many <span className="text-emerald-600">{targetItem.name}</span>?
          </h2>
          <button
            onClick={() => speechEngine.speak(`How many ${targetItem.name}?`)}
            className="p-2.5 btn-candy btn-candy-green"
          >
            <Volume2 size={22} />
          </button>
        </div>

        {/* Visual Countable Items */}
        <div className="bg-white/95 border-4 border-dashed border-emerald-300 rounded-[2rem] p-6 my-4 min-h-[150px] flex flex-wrap items-center justify-center gap-4 shadow-inner">
          {Array.from({ length: targetCount }).map((_, idx) => {
            const isTapped = tappedIndices.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => handleItemTap(idx)}
                className={`w-16 h-16 sm:w-18 sm:h-18 rounded-3xl flex items-center justify-center text-4xl sm:text-5xl transition-all cursor-pointer ${
                  isTapped
                    ? 'bg-emerald-300 border-3 border-emerald-500 scale-125 shadow-md ring-4 ring-emerald-200 animate-wiggle'
                    : 'hover:scale-110 active:scale-95 bg-emerald-50 border-2 border-emerald-200'
                }`}
              >
                {targetItem.emoji}
              </button>
            );
          })}
        </div>

        {tappedIndices.length > 0 && (
          <p className="font-bubble font-black text-emerald-900 text-base mb-3 animate-fade-in">
            Counted: {tappedIndices.length} {targetItem.name} ⭐
          </p>
        )}

        {/* 3 3D Option Toy Blocks */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-6">
          {options.map((num, idx) => {
            const isTarget = num === targetCount;
            const isSelected = selectedOption === num;
            const themeClass = TOY_OPTIONS_THEMES[idx % TOY_OPTIONS_THEMES.length];

            let cardStyle = `${themeClass}`;
            if (isSelected) {
              if (isTarget) {
                cardStyle = 'toy-block-green scale-110 ring-6 ring-emerald-300';
              } else {
                cardStyle = 'toy-block-pink opacity-80 scale-95';
              }
            }

            return (
              <button
                key={num}
                onClick={() => handleOptionClick(num)}
                disabled={selectedOption !== null && isTarget}
                className={`toy-block py-6 px-4 font-bubble font-black text-5xl sm:text-6xl transition-all cursor-pointer ${cardStyle}`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
