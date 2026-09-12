import React, { useState, useEffect } from 'react';
import { HINDI_LETTERS } from '../../data/hindiData';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/soundEffects';
import { speechEngine } from '../../utils/speech';
import { ConfettiCanvas } from '../common/ConfettiCanvas';
import { TikoMascot } from '../common/TikoMascot';
import { Volume2, Sparkles, RefreshCw } from 'lucide-react';

export const HindiFindLetterGame: React.FC = () => {
  const { addStars } = useApp();
  const [score, setScore] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [options, setOptions] = useState<{ id: string; letter: string }[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [tikoMood, setTikoMood] = useState<'idle' | 'happy' | 'thinking' | 'celebrate'>('idle');
  const [tikoSpeech, setTikoSpeech] = useState<string>('अक्षर की आवाज़ सुनें और उसे खोजें!');

  const generateQuestion = () => {
    setSelectedId(null);
    setFeedback(null);
    setTikoMood('thinking');

    const randomIdx = Math.floor(Math.random() * HINDI_LETTERS.length);
    setTargetIndex(randomIdx);
    const target = HINDI_LETTERS[randomIdx];

    const distractors: typeof HINDI_LETTERS = [];
    while (distractors.length < 3) {
      const d = HINDI_LETTERS[Math.floor(Math.random() * HINDI_LETTERS.length)];
      if (d.id !== target.id && !distractors.some(x => x.id === d.id)) {
        distractors.push(d);
      }
    }

    const allOpts = [
      { id: target.id, letter: target.letter },
      ...distractors.map(d => ({ id: d.id, letter: d.letter }))
    ].sort(() => Math.random() - 0.5);

    setOptions(allOpts);
    setTikoSpeech(`अक्षर "${target.letter}" कहां है? उसे पहचानो!`);
    speechEngine.speak(`अक्षर '${target.letter}' ढूंढो!`, 'hi');
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const target = HINDI_LETTERS[targetIndex];

  const handleOptionClick = (opt: { id: string; letter: string }) => {
    if (selectedId !== null) return;
    setSelectedId(opt.id);

    if (opt.id === target.id) {
      soundEffects.playCorrect();
      setShowCelebration(true);
      setScore(prev => prev + 1);
      addStars(3);
      setTikoMood('celebrate');
      setTikoSpeech(`अति सुंदर! यह अक्षर '${target.letter}' (${target.word}) है! 🌟`);
      setFeedback({
        isCorrect: true,
        message: `अति सुंदर! यह अक्षर '${target.letter}' (${target.word}) है!`
      });
      speechEngine.speak(`शाबाश! यह '${target.letter}' है!`, 'hi');

      setTimeout(() => {
        setShowCelebration(false);
        generateQuestion();
      }, 2200);
    } else {
      soundEffects.playGentleOops();
      setTikoMood('idle');
      setTikoSpeech(`यह अक्षर '${opt.letter}' है। हमें '${target.letter}' चाहिए!`);
      setFeedback({
        isCorrect: false,
        message: `यह अक्षर '${opt.letter}' है। अक्षर '${target.letter}' ढूंढें!`
      });
      speechEngine.speak(`यह '${opt.letter}' है। '${target.letter}' ढूंढो!`, 'hi');

      setTimeout(() => {
        setSelectedId(null);
      }, 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 select-none">
      <ConfettiCanvas active={showCelebration} durationMs={2000} />

      {/* Header Bar */}
      <div className="flex justify-between items-center bg-white/95 border-3 border-orange-200 rounded-3xl p-4 mb-6 shadow-candy-orange">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl border-2 border-orange-300">
            🔍
          </div>
          <div>
            <p className="text-xs font-bold text-orange-600 uppercase font-bubble tracking-wider">Score</p>
            <p className="font-bubble font-black text-2xl text-slate-800">{score} Stars ⭐</p>
          </div>
        </div>

        <div className="text-center hidden sm:block">
          <span className="font-hindi font-black text-orange-900 text-lg px-4 py-1.5 bg-orange-50 rounded-full border-2 border-orange-200">
            अक्षर खोजो 🔎
          </span>
        </div>

        <button
          onClick={generateQuestion}
          title="नया प्रश्न"
          className="p-3.5 bg-orange-100 hover:bg-orange-200 border-3 border-orange-300 rounded-2xl text-orange-900 font-bubble font-bold shadow-candy-orange btn-bounce cursor-pointer flex items-center gap-2"
        >
          <RefreshCw size={20} />
          <span className="text-sm hidden sm:inline">Next</span>
        </button>
      </div>

      {/* Main Question Card */}
      <div className="bg-gradient-to-b from-white via-orange-50 to-amber-50 border-4 border-orange-300 rounded-4xl p-6 sm:p-10 text-center shadow-candy-orange mb-6 relative overflow-hidden">
        
        {/* Tiko Mascot Helper */}
        <div className="flex justify-center mb-4">
          <TikoMascot
            mood={tikoMood}
            size="md"
            speechText={tikoSpeech}
            onSpeak={() => speechEngine.speak(tikoSpeech, 'hi')}
          />
        </div>

        {/* Big Devanagari Letter */}
        <div className="inline-flex items-center gap-4 bg-white/90 border-3 border-orange-300 px-8 py-3 rounded-full shadow-candy-orange mb-6">
          <h2 className="font-hindi font-black text-2xl sm:text-3xl text-orange-950">
            अक्षर <span className="text-orange-600 text-5xl sm:text-6xl font-black">"{target?.letter}"</span> पहचानें
          </h2>
          <button
            onClick={() => speechEngine.speak(`अक्षर '${target?.letter}' ढूंढो!`, 'hi')}
            className="p-2.5 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl shadow-sm btn-bounce cursor-pointer"
          >
            <Volume2 size={22} />
          </button>
        </div>

        {/* 4 Devanagari Options styled as 3D Toy Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-2">
          {options.map((opt) => {
            const isTarget = opt.id === target?.id;
            const isSelected = selectedId === opt.id;

            let blockVariant = 'toy-block toy-block-orange';
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
                className={`py-8 px-4 rounded-4xl border-4 font-hindi font-black text-6xl sm:text-7xl transition-all cursor-pointer btn-bounce ${blockVariant}`}
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
