import React, { useState, useEffect } from 'react';
import { HINDI_LETTERS } from '../../data/hindiData';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/soundEffects';
import { speechEngine } from '../../utils/speech';
import { ConfettiCanvas } from '../common/ConfettiCanvas';
import { TikoMascot } from '../common/TikoMascot';
import { Sparkles, RefreshCw, Volume2 } from 'lucide-react';

export const HindiMatchGame: React.FC = () => {
  const { addStars } = useApp();
  const [score, setScore] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [options, setOptions] = useState<{ id: string; letter: string }[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [tikoMood, setTikoMood] = useState<'idle' | 'happy' | 'thinking' | 'celebrate'>('idle');
  const [tikoSpeech, setTikoSpeech] = useState<string>('चित्र देखकर सही अक्षर का चयन करें!');

  const validLetters = HINDI_LETTERS.filter(l => l.word !== 'खाली');

  const generateQuestion = () => {
    setSelectedId(null);
    setFeedback(null);
    setTikoMood('thinking');

    const randomIdx = Math.floor(Math.random() * validLetters.length);
    setTargetIndex(randomIdx);
    const target = validLetters[randomIdx];

    const distractors: typeof validLetters = [];
    while (distractors.length < 3) {
      const d = validLetters[Math.floor(Math.random() * validLetters.length)];
      if (d.id !== target.id && !distractors.some(x => x.id === d.id)) {
        distractors.push(d);
      }
    }

    const allOpts = [
      { id: target.id, letter: target.letter },
      ...distractors.map(d => ({ id: d.id, letter: d.letter }))
    ].sort(() => Math.random() - 0.5);

    setOptions(allOpts);
    setTikoSpeech(`${target.word} किस अक्षर से शुरू होता है?`);
    speechEngine.speak(`${target.word}. ${target.word} किस अक्षर से शुरू होता है?`, 'hi');
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const target = validLetters[targetIndex];

  const handleOptionClick = (opt: { id: string; letter: string }) => {
    if (selectedId !== null) return;
    setSelectedId(opt.id);

    if (opt.id === target.id) {
      soundEffects.playCorrect();
      setShowCelebration(true);
      setScore(prev => prev + 1);
      addStars(3);
      setTikoMood('celebrate');
      setTikoSpeech(`अति उत्तम! ${target.letter} से ${target.word}! 🎉`);
      setFeedback({
        isCorrect: true,
        message: `बहुत बढ़िया! ${target.letter} से ${target.word}!`
      });
      speechEngine.speak(`शाबाश! ${target.letter} से ${target.word}!`, 'hi');

      setTimeout(() => {
        setShowCelebration(false);
        generateQuestion();
      }, 2200);
    } else {
      soundEffects.playGentleOops();
      setTikoMood('idle');
      setTikoSpeech(`यह अक्षर '${opt.letter}' है। सही अक्षर '${target.letter}' ढूंढें!`);
      setFeedback({
        isCorrect: false,
        message: `गलत! ${target.word} अक्षर '${target.letter}' से शुरू होता है!`
      });
      speechEngine.speak(`अक्षर '${target.letter}' ढूंढो!`, 'hi');

      setTimeout(() => {
        setSelectedId(null);
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
            🎯
          </div>
          <div>
            <p className="text-xs font-bold text-amber-600 uppercase font-bubble tracking-wider">Score</p>
            <p className="font-bubble font-black text-2xl text-slate-800">{score} Stars ⭐</p>
          </div>
        </div>

        <div className="text-center hidden sm:block">
          <span className="font-hindi font-black text-amber-900 text-lg px-4 py-1.5 bg-amber-50 rounded-full border-2 border-amber-200">
            चित्र और अक्षर मिलाओ 🎨
          </span>
        </div>

        <button
          onClick={generateQuestion}
          title="नया प्रश्न"
          className="p-3.5 bg-amber-100 hover:bg-amber-200 border-3 border-amber-300 rounded-2xl text-amber-900 font-bubble font-bold shadow-candy-yellow btn-bounce cursor-pointer flex items-center gap-2"
        >
          <RefreshCw size={20} />
          <span className="text-sm hidden sm:inline">Next</span>
        </button>
      </div>

      {/* Main Game Card */}
      <div className="bg-gradient-to-b from-white via-amber-50 to-orange-50 border-4 border-amber-300 rounded-4xl p-6 sm:p-10 text-center shadow-candy-yellow mb-6 relative overflow-hidden">
        
        {/* Tiko Mascot Helper */}
        <div className="flex justify-center mb-4">
          <TikoMascot
            mood={tikoMood}
            size="md"
            speechText={tikoSpeech}
            onSpeak={() => speechEngine.speak(tikoSpeech, 'hi')}
          />
        </div>

        {/* Big Emoji + Hindi Word */}
        <div className="my-2">
          <span className="text-8xl sm:text-9xl inline-block animate-bounce-slow drop-shadow-md">
            {target?.emoji}
          </span>
        </div>

        <div className="inline-flex items-center gap-3 bg-white/90 border-3 border-amber-300 px-6 py-2.5 rounded-full shadow-candy-yellow mb-6">
          <h2 className="font-hindi font-black text-2xl sm:text-3xl text-slate-800">
            {target?.word} <span className="text-amber-500 font-bold text-xl">→ ?</span>
          </h2>
          <button
            onClick={() => speechEngine.speak(`${target?.word}`, 'hi')}
            className="p-2 bg-amber-400 hover:bg-amber-300 text-amber-950 rounded-xl shadow-sm btn-bounce cursor-pointer"
          >
            <Volume2 size={18} />
          </button>
        </div>

        {/* 4 Devanagari Letters Options styled as 3D Toy Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-2">
          {options.map((opt) => {
            const isTarget = opt.id === target?.id;
            const isSelected = selectedId === opt.id;

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
                key={opt.id}
                onClick={() => handleOptionClick(opt)}
                disabled={selectedId !== null && isTarget}
                className={`py-6 px-4 rounded-4xl border-4 font-hindi font-black text-6xl sm:text-7xl transition-all cursor-pointer btn-bounce ${blockVariant}`}
              >
                {opt.letter}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`mt-6 p-4 rounded-3xl font-hindi font-bold text-lg animate-pop-in flex items-center justify-center gap-2 ${
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
