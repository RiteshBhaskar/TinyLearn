import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/soundEffects';
import { speechEngine } from '../../utils/speech';
import { ConfettiCanvas } from '../common/ConfettiCanvas';
import { TikoMascot } from '../common/TikoMascot';
import { Sparkles, RefreshCw, Volume2 } from 'lucide-react';

export const BiggerNumberGame: React.FC = () => {
  const { addStars } = useApp();
  const [score, setScore] = useState(0);
  const [numA, setNumA] = useState(7);
  const [numB, setNumB] = useState(4);
  const [selectedNum, setSelectedNum] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [tikoMood, setTikoMood] = useState<'idle' | 'happy' | 'thinking' | 'celebrate'>('idle');
  const [tikoSpeech, setTikoSpeech] = useState<string>('Which number is bigger? Tap the larger one!');

  const generateQuestion = () => {
    setSelectedNum(null);
    setFeedback(null);
    setTikoMood('thinking');

    let a = Math.floor(Math.random() * 19) + 1;
    let b = Math.floor(Math.random() * 19) + 1;
    while (a === b) {
      b = Math.floor(Math.random() * 19) + 1;
    }

    setNumA(a);
    setNumB(b);
    setTikoSpeech(`Which one is bigger? ${a} or ${b}?`);

    speechEngine.speak(`Which number is bigger? ${a} or ${b}?`);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const bigger = Math.max(numA, numB);

  const handleChoice = (chosen: number) => {
    if (selectedNum !== null) return;
    setSelectedNum(chosen);

    if (chosen === bigger) {
      soundEffects.playCorrect();
      setShowCelebration(true);
      setScore(prev => prev + 1);
      addStars(3);
      setTikoMood('celebrate');
      setTikoSpeech(`Woohoo! ${bigger} is much bigger than ${Math.min(numA, numB)}! 🌟`);
      setFeedback({
        isCorrect: true,
        message: `Yes! ${bigger} is bigger than ${Math.min(numA, numB)}!`
      });
      speechEngine.speak(`Great job! ${bigger} is bigger!`);

      setTimeout(() => {
        setShowCelebration(false);
        generateQuestion();
      }, 2200);
    } else {
      soundEffects.playGentleOops();
      setTikoMood('idle');
      setTikoSpeech(`Look at the stars underneath to count which has more!`);
      setFeedback({
        isCorrect: false,
        message: `Oops! ${bigger} has more than ${chosen}!`
      });
      speechEngine.speak(`Try again! Which one has more?`);

      setTimeout(() => {
        setSelectedNum(null);
      }, 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 select-none">
      <ConfettiCanvas active={showCelebration} durationMs={2000} />

      {/* Header Bar */}
      <div className="flex justify-between items-center bg-white/95 border-3 border-purple-200 rounded-3xl p-4 mb-6 shadow-candy-purple">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl border-2 border-purple-300">
            ⚖️
          </div>
          <div>
            <p className="text-xs font-bold text-purple-600 uppercase font-bubble tracking-wider">Score</p>
            <p className="font-bubble font-black text-2xl text-slate-800">{score} Stars ⭐</p>
          </div>
        </div>

        <div className="text-center hidden sm:block">
          <span className="font-bubble font-black text-purple-900 text-lg px-4 py-1.5 bg-purple-50 rounded-full border-2 border-purple-200">
            Number Showdown 💥
          </span>
        </div>

        <button
          onClick={generateQuestion}
          title="New Question"
          className="p-3.5 bg-purple-100 hover:bg-purple-200 border-3 border-purple-300 rounded-2xl text-purple-900 font-bubble font-bold shadow-candy-purple btn-bounce cursor-pointer flex items-center gap-2"
        >
          <RefreshCw size={20} />
          <span className="text-sm hidden sm:inline">Next</span>
        </button>
      </div>

      {/* Main Comparison Card */}
      <div className="bg-gradient-to-b from-white via-purple-50 to-pink-50 border-4 border-purple-300 rounded-4xl p-6 sm:p-10 text-center shadow-candy-purple mb-6 relative overflow-hidden">
        
        {/* Tiko Mascot Helper */}
        <div className="flex justify-center mb-4">
          <TikoMascot
            mood={tikoMood}
            size="md"
            speechText={tikoSpeech}
            onSpeak={() => speechEngine.speak(tikoSpeech)}
          />
        </div>

        <div className="inline-flex items-center gap-3 bg-white/90 border-3 border-purple-300 px-6 py-2.5 rounded-full shadow-candy-purple mb-6">
          <h2 className="font-bubble font-black text-xl sm:text-2xl text-purple-950">
            Which number is <span className="text-pink-600 underline decoration-wavy decoration-pink-400">BIGGER</span>?
          </h2>
          <button
            onClick={() => speechEngine.speak(`Which number is bigger? ${numA} or ${numB}?`)}
            className="p-2 bg-purple-400 hover:bg-purple-300 text-white rounded-xl shadow-sm btn-bounce cursor-pointer"
          >
            <Volume2 size={18} />
          </button>
        </div>

        {/* 2 Big Choice Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 mt-2">
          {[numA, numB].map((num) => {
            const isTarget = num === bigger;
            const isSelected = selectedNum === num;

            let blockVariant = 'toy-block toy-block-purple';
            if (isSelected) {
              if (isTarget) {
                blockVariant = 'toy-block toy-block-green scale-105 ring-4 ring-emerald-400 animate-bounce';
              } else {
                blockVariant = 'toy-block toy-block-pink scale-95 opacity-80';
              }
            }

            return (
              <button
                key={num}
                onClick={() => handleChoice(num)}
                disabled={selectedNum !== null && isTarget}
                className={`p-6 sm:p-8 rounded-4xl border-4 transition-all cursor-pointer btn-bounce flex flex-col items-center justify-center ${blockVariant}`}
              >
                <span className="font-bubble font-black text-7xl sm:text-8xl my-2 drop-shadow-sm">
                  {num}
                </span>

                {/* Visual Count Mini Dots */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-3 max-w-[140px] bg-white/60 p-2 rounded-2xl border border-purple-200">
                  {Array.from({ length: Math.min(num, 10) }).map((_, i) => (
                    <span key={i} className="text-sm drop-shadow-xs">
                      ⭐
                    </span>
                  ))}
                  {num > 10 && <span className="text-xs font-black text-purple-700">+{num - 10}</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`mt-6 p-4 rounded-3xl font-bubble font-bold text-lg animate-pop-in flex items-center justify-center gap-2 ${
              feedback.isCorrect
                ? 'bg-emerald-100 border-3 border-emerald-400 text-emerald-800'
                : 'bg-amber-100 border-3 border-amber-400 text-amber-900'
            }`}
          >
            {feedback.isCorrect && <Sparkles size={24} className="text-emerald-600 animate-spin" />}
            <span>{feedback.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};
