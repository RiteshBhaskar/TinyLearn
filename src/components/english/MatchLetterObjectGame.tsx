import React, { useState, useEffect } from 'react';
import { ENGLISH_LETTERS } from '../../data/englishData';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/soundEffects';
import { speechEngine } from '../../utils/speech';
import { ConfettiCanvas } from '../common/ConfettiCanvas';
import { TikoMascot } from '../common/TikoMascot';
import { Volume2, RefreshCw } from 'lucide-react';

const TOY_OPTIONS_THEMES = ['toy-block-pink', 'toy-block-blue', 'toy-block-yellow', 'toy-block-green'];

export const MatchLetterObjectGame: React.FC = () => {
  const { addStars } = useApp();
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [options, setOptions] = useState<{ letter: string; word: string; emoji: string }[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [tikoState, setTikoState] = useState<{ message: string; emotion: 'cheering' | 'correct' | 'encourage' }>({
    message: "What letter starts with this picture? 🍎",
    emotion: 'cheering'
  });

  const generateQuestion = () => {
    setSelectedLetter(null);

    const randomIdx = Math.floor(Math.random() * ENGLISH_LETTERS.length);
    setTargetIndex(randomIdx);
    const target = ENGLISH_LETTERS[randomIdx];

    const distractors: typeof ENGLISH_LETTERS = [];
    while (distractors.length < 3) {
      const d = ENGLISH_LETTERS[Math.floor(Math.random() * ENGLISH_LETTERS.length)];
      if (d.letter !== target.letter && !distractors.some(x => x.letter === d.letter)) {
        distractors.push(d);
      }
    }

    const allOptions = [target, ...distractors]
      .map(item => ({ letter: item.letter, word: item.word, emoji: item.emoji }))
      .sort(() => Math.random() - 0.5);

    setOptions(allOptions);
    setTikoState({
      message: `Which letter starts with "${target.word}"? 🧸`,
      emotion: 'cheering'
    });
    speechEngine.speak(`Which letter starts with ${target.word}?`);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const target = ENGLISH_LETTERS[targetIndex];

  const handleOptionClick = (chosenLetter: string) => {
    if (selectedLetter !== null) return;
    setSelectedLetter(chosenLetter);

    if (chosenLetter === target.letter) {
      soundEffects.playCorrect();
      setShowCelebration(true);
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      addStars(3);
      setTikoState({
        message: `Spot on! "${target.letter}" is for "${target.word}"! 🎉 ⭐ +3 Stars`,
        emotion: 'correct'
      });
      speechEngine.speak(`Correct! ${target.letter} is for ${target.word}!`);

      setTimeout(() => {
        setShowCelebration(false);
        generateQuestion();
      }, 2000);
    } else {
      soundEffects.playGentleOops();
      setStreak(0);
      setTikoState({
        message: `Almost! ${target.word} starts with "${target.letter}"! Let's try! 😊`,
        emotion: 'encourage'
      });
      speechEngine.speak(`Try again! ${target.word} starts with letter ${target.letter}!`);

      setTimeout(() => {
        setSelectedLetter(null);
      }, 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 select-none animate-pop-in">
      <ConfettiCanvas active={showCelebration} durationMs={2000} />

      {/* Header Score & Streak */}
      <div className="flex justify-between items-center bg-white/95 border-4 border-amber-300 rounded-3xl p-4 mb-6 shadow-toy-yellow">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🌟</span>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase font-bubble">Score</p>
            <p className="font-bubble font-black text-2xl text-slate-800">{score} Points</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-3xl">🔥</span>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase font-bubble">Streak</p>
            <p className="font-bubble font-black text-2xl text-orange-600">{streak} Streak</p>
          </div>
        </div>

        <button
          onClick={generateQuestion}
          title="New Question"
          className="p-3.5 btn-candy bg-amber-100 hover:bg-amber-200 border-3 border-amber-300 text-amber-900 shadow-sm cursor-pointer"
        >
          <RefreshCw size={22} />
        </button>
      </div>

      {/* Tiko Mascot Hint */}
      <div className="flex justify-center mb-6">
        <TikoMascot
          message={tikoState.message}
          emotion={tikoState.emotion}
          size="sm"
        />
      </div>

      {/* Main Question Card */}
      <div className="toy-block toy-block-pink p-8 sm:p-10 text-center mb-6">
        
        <p className="text-pink-900 font-bubble font-black text-xl mb-2">Match Picture to Letter:</p>

        {/* Big Animated Picture */}
        <div className="my-3">
          <span className="text-8xl sm:text-9xl inline-block animate-bounce-slow drop-shadow-md">
            {target.emoji}
          </span>
        </div>

        {/* Word Display with Audio */}
        <div className="inline-flex items-center gap-3 bg-white border-4 border-pink-300 px-8 py-3 rounded-full shadow-md mb-6">
          <h2 className="font-bubble font-black text-3xl sm:text-4xl text-slate-900">
            {target.word} <span className="text-slate-400 text-2xl">➔ ?</span>
          </h2>
          <button
            onClick={() => speechEngine.speak(`${target.word}. Which letter starts with ${target.word}?`)}
            className="p-2.5 btn-candy btn-candy-pink"
          >
            <Volume2 size={22} />
          </button>
        </div>

        {/* 4 3D Option Toy Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-2">
          {options.map((opt, idx) => {
            const isTarget = opt.letter === target.letter;
            const isSelected = selectedLetter === opt.letter;
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
                key={opt.letter}
                onClick={() => handleOptionClick(opt.letter)}
                disabled={selectedLetter !== null && isTarget}
                className={`toy-block py-8 px-4 font-bubble font-black text-6xl sm:text-7xl transition-all cursor-pointer ${cardStyle}`}
              >
                {opt.letter}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
