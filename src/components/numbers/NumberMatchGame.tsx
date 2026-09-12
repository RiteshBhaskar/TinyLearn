import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/soundEffects';
import { speechEngine } from '../../utils/speech';
import { ConfettiCanvas } from '../common/ConfettiCanvas';
import { TikoMascot } from '../common/TikoMascot';
import { RefreshCw } from 'lucide-react';

const TOY_OPTIONS_THEMES = ['toy-block-yellow', 'toy-block-orange', 'toy-block-green'];

export const NumberMatchGame: React.FC = () => {
  const { addStars } = useApp();
  const [score, setScore] = useState(0);
  const [targetNumber, setTargetNumber] = useState(5);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [tikoState, setTikoState] = useState<{ message: string; emotion: 'cheering' | 'correct' | 'encourage' }>({
    message: "Count the shiny stars and pick the matching number! ⭐",
    emotion: 'cheering'
  });

  const generateQuestion = () => {
    setSelectedOption(null);

    const num = Math.floor(Math.random() * 10) + 1;
    setTargetNumber(num);

    const distractors = new Set<number>();
    while (distractors.size < 2) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      const val = Math.max(1, num + offset);
      if (val !== num) distractors.add(val);
    }

    const allOpts = [num, ...Array.from(distractors)].sort(() => Math.random() - 0.5);
    setOptions(allOpts);
    setTikoState({
      message: `How many golden stars can you count? 🌟`,
      emotion: 'cheering'
    });
    speechEngine.speak(`Match the stars with the correct number!`);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleOptionClick = (num: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(num);

    if (num === targetNumber) {
      soundEffects.playCorrect();
      setShowCelebration(true);
      setScore(prev => prev + 1);
      addStars(3);
      setTikoState({
        message: `Super! That matches ${targetNumber} shining stars! 🎉 ⭐ +3 Stars`,
        emotion: 'correct'
      });
      speechEngine.speak(`Correct! That is number ${targetNumber}!`);

      setTimeout(() => {
        setShowCelebration(false);
        generateQuestion();
      }, 2000);
    } else {
      soundEffects.playGentleOops();
      setTikoState({
        message: `Almost! Count the stars carefully and try again! 😊`,
        emotion: 'encourage'
      });
      speechEngine.speak(`Count the stars again!`);

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
          <span className="text-3xl">⭐</span>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase font-bubble">Score</p>
            <p className="font-bubble font-black text-2xl text-slate-800">{score} Points</p>
          </div>
        </div>

        <p className="font-bubble font-black text-amber-950 text-base">Match Stars to Number</p>

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
      <div className="toy-block toy-block-yellow p-8 sm:p-10 text-center mb-6">
        
        <p className="text-amber-950 font-bubble font-black text-xl mb-2">Count the Stars:</p>

        {/* Stars Container */}
        <div className="bg-white/95 border-4 border-amber-300 rounded-[2rem] p-6 my-4 min-h-[140px] flex flex-wrap items-center justify-center gap-3 shadow-inner">
          {Array.from({ length: targetNumber }).map((_, idx) => (
            <span
              key={idx}
              className="text-5xl sm:text-6xl animate-bounce-slow inline-block drop-shadow-sm"
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* 3 3D Option Toy Blocks */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-6">
          {options.map((num, idx) => {
            const isTarget = num === targetNumber;
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
