import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/soundEffects';
import { speechEngine } from '../../utils/speech';
import { ConfettiCanvas } from '../common/ConfettiCanvas';
import { TikoMascot } from '../common/TikoMascot';
import { Sparkles, RefreshCw } from 'lucide-react';

export const NumberSequenceGame: React.FC = () => {
  const { addStars } = useApp();
  const [score, setScore] = useState(0);
  const [sequence, setSequence] = useState<{ val: number | string; isMissing: boolean }[]>([]);
  const [missingVal, setMissingVal] = useState<number>(3);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [tikoMood, setTikoMood] = useState<'idle' | 'happy' | 'thinking' | 'celebrate'>('idle');
  const [tikoSpeech, setTikoSpeech] = useState<string>('Find the missing number in the line!');

  const generateQuestion = () => {
    setSelectedOption(null);
    setFeedback(null);
    setTikoMood('thinking');
    setTikoSpeech('Look closely! What number belongs in the missing spot?');

    // Sequence of 4 numbers, starting between 1 and 16
    const start = Math.floor(Math.random() * 15) + 1;
    const missingIndex = Math.floor(Math.random() * 2) + 1; // index 1 or 2 (middle missing)
    const target = start + missingIndex;

    const seq = [];
    for (let i = 0; i < 4; i++) {
      if (i === missingIndex) {
        seq.push({ val: '?', isMissing: true });
      } else {
        seq.push({ val: start + i, isMissing: false });
      }
    }

    setSequence(seq);
    setMissingVal(target);

    // Distractors
    const distractors = new Set<number>();
    while (distractors.size < 2) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      const val = Math.max(1, target + offset);
      if (val !== target) distractors.add(val);
    }

    const allOpts = [target, ...Array.from(distractors)].sort(() => Math.random() - 0.5);
    setOptions(allOpts);

    speechEngine.speak(`What number is missing in the sequence?`);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleOptionClick = (num: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(num);

    if (num === missingVal) {
      soundEffects.playCorrect();
      setShowCelebration(true);
      setScore(prev => prev + 1);
      addStars(3);
      setTikoMood('celebrate');
      setTikoSpeech(`Fantastic! ${missingVal} fills the blank spot perfectly! 🎉`);
      setFeedback({
        isCorrect: true,
        message: `Hooray! ${missingVal} completes the sequence!`
      });
      speechEngine.speak(`Awesome! ${missingVal} is the missing number!`);

      setTimeout(() => {
        setShowCelebration(false);
        generateQuestion();
      }, 2200);
    } else {
      soundEffects.playGentleOops();
      setTikoMood('idle');
      setTikoSpeech(`Count them in order: ${sequence.map(s => s.isMissing ? '...' : s.val).join(', ')}`);
      setFeedback({
        isCorrect: false,
        message: `Not quite! Count in order from left to right!`
      });
      speechEngine.speak(`Count in order and try again!`);

      setTimeout(() => {
        setSelectedOption(null);
      }, 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 select-none">
      <ConfettiCanvas active={showCelebration} durationMs={2000} />

      {/* Header Bar */}
      <div className="flex justify-between items-center bg-white/95 border-3 border-amber-200 rounded-3xl p-4 mb-6 shadow-candy-yellow">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl border-2 border-amber-300">
            🔢
          </div>
          <div>
            <p className="text-xs font-bold text-amber-600 uppercase font-bubble tracking-wider">Score</p>
            <p className="font-bubble font-black text-2xl text-slate-800">{score} Stars ⭐</p>
          </div>
        </div>

        <div className="text-center hidden sm:block">
          <span className="font-bubble font-black text-amber-900 text-lg px-4 py-1.5 bg-amber-50 rounded-full border-2 border-amber-200">
            Missing Number Train 🚂
          </span>
        </div>

        <button
          onClick={generateQuestion}
          title="New Question"
          className="p-3.5 bg-amber-100 hover:bg-amber-200 border-3 border-amber-300 rounded-2xl text-amber-900 font-bubble font-bold shadow-candy-yellow btn-bounce cursor-pointer flex items-center gap-2"
        >
          <RefreshCw size={20} />
          <span className="text-sm hidden sm:inline">Next</span>
        </button>
      </div>

      {/* Main Game Card */}
      <div className="bg-gradient-to-b from-white via-sky-50 to-amber-50 border-4 border-sky-300 rounded-4xl p-6 sm:p-10 text-center shadow-candy-blue mb-6 relative overflow-hidden">
        
        {/* Tiko Mascot Helper */}
        <div className="flex justify-center mb-4">
          <TikoMascot
            mood={tikoMood}
            size="md"
            speechText={tikoSpeech}
            onSpeak={() => speechEngine.speak(tikoSpeech)}
          />
        </div>

        <p className="text-sky-900 font-bubble font-black text-xl mb-4">
          Which number goes into the mystery box? ❓
        </p>

        {/* Sequence Blocks styled like train cars */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 my-6 flex-wrap">
          {sequence.map((item, idx) => (
            <div
              key={idx}
              className={`w-18 h-24 sm:w-24 sm:h-28 rounded-3xl border-4 flex flex-col items-center justify-center font-bubble font-black text-4xl sm:text-5xl transition-all shadow-md ${
                item.isMissing
                  ? 'toy-block toy-block-amber border-dashed animate-pulse ring-4 ring-amber-300'
                  : 'toy-block toy-block-blue'
              }`}
            >
              <span>{item.isMissing && selectedOption === missingVal ? missingVal : item.val}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Car #{idx + 1}</span>
            </div>
          ))}
        </div>

        {/* Option Number Buttons */}
        <div className="mt-8">
          <p className="text-sm font-bold text-slate-500 font-bubble uppercase mb-3">Choose the answer:</p>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {options.map((num) => {
              const isTarget = num === missingVal;
              const isSelected = selectedOption === num;

              let blockVariant = 'toy-block toy-block-yellow';
              if (isSelected) {
                if (isTarget) {
                  blockVariant = 'toy-block toy-block-green scale-110 ring-4 ring-emerald-400 animate-bounce';
                } else {
                  blockVariant = 'toy-block toy-block-pink scale-95 opacity-80';
                }
              }

              return (
                <button
                  key={num}
                  onClick={() => handleOptionClick(num)}
                  disabled={selectedOption !== null && isTarget}
                  className={`py-6 px-4 rounded-3xl border-4 font-bubble font-black text-5xl sm:text-6xl cursor-pointer btn-bounce ${blockVariant}`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback message banner */}
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
