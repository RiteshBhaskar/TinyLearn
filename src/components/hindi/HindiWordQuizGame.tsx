import React, { useState, useEffect } from 'react';
import { HINDI_LETTERS } from '../../data/hindiData';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/soundEffects';
import { speechEngine } from '../../utils/speech';
import { ConfettiCanvas } from '../common/ConfettiCanvas';
import { TikoMascot } from '../common/TikoMascot';
import { Volume2, Sparkles, RefreshCw } from 'lucide-react';

export const HindiWordQuizGame: React.FC = () => {
  const { addStars } = useApp();
  const [score, setScore] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [options, setOptions] = useState<{ id: string; word: string; emoji: string; isCorrect: boolean }[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [tikoMood, setTikoMood] = useState<'idle' | 'happy' | 'thinking' | 'celebrate'>('idle');
  const [tikoSpeech, setTikoSpeech] = useState<string>('अक्षर पहचानें और सही शब्द चुनें!');

  // Filter letters that have concrete words
  const validLetters = HINDI_LETTERS.filter(l => l.word !== 'खाली');

  const generateQuestion = () => {
    setSelectedWord(null);
    setFeedback(null);
    setTikoMood('thinking');

    const randomIdx = Math.floor(Math.random() * validLetters.length);
    setTargetIndex(randomIdx);
    const target = validLetters[randomIdx];

    const distractors: typeof validLetters = [];
    while (distractors.length < 2) {
      const d = validLetters[Math.floor(Math.random() * validLetters.length)];
      if (d.id !== target.id && !distractors.some(x => x.id === d.id)) {
        distractors.push(d);
      }
    }

    const allOpts = [
      { id: target.id, word: target.word, emoji: target.emoji, isCorrect: true },
      ...distractors.map(d => ({ id: d.id, word: d.word, emoji: d.emoji, isCorrect: false }))
    ].sort(() => Math.random() - 0.5);

    setOptions(allOpts);
    setTikoSpeech(`"${target.letter}" से क्या आता है? सोचो और चुनो!`);
    speechEngine.speak(`${target.letter} से क्या आता है?`, 'hi');
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const target = validLetters[targetIndex];

  const handleOptionClick = (opt: { id: string; word: string; emoji: string; isCorrect: boolean }) => {
    if (selectedWord !== null) return;
    setSelectedWord(opt.word);

    if (opt.isCorrect) {
      soundEffects.playCorrect();
      setShowCelebration(true);
      setScore(prev => prev + 1);
      addStars(3);
      setTikoMood('celebrate');
      setTikoSpeech(`शाबाश! ${target.letter} से ${target.word}! आप बहुत होशियार हैं! 🌟`);
      setFeedback({
        isCorrect: true,
        message: `शाबाश! ${target.letter} से ${target.word}!`
      });
      speechEngine.speak(`सही जवाब! ${target.letter} से ${target.word}!`, 'hi');

      setTimeout(() => {
        setShowCelebration(false);
        generateQuestion();
      }, 2200);
    } else {
      soundEffects.playGentleOops();
      setTikoMood('idle');
      setTikoSpeech(`फिर से कोशिश करो! ${target.letter} से क्या शुरू होता है?`);
      setFeedback({
        isCorrect: false,
        message: `नहीं, ${target.letter} से ${target.word} आता है!`
      });
      speechEngine.speak(`फिर से सोचो! ${target.letter} से क्या आता है?`, 'hi');

      setTimeout(() => {
        setSelectedWord(null);
      }, 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 select-none">
      <ConfettiCanvas active={showCelebration} durationMs={2000} />

      {/* Header Bar */}
      <div className="flex justify-between items-center bg-white/95 border-3 border-pink-200 rounded-3xl p-4 mb-6 shadow-candy-pink">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-2xl border-2 border-pink-300">
            🇮🇳
          </div>
          <div>
            <p className="text-xs font-bold text-pink-600 uppercase font-bubble tracking-wider">Score</p>
            <p className="font-bubble font-black text-2xl text-slate-800">{score} Stars ⭐</p>
          </div>
        </div>

        <div className="text-center hidden sm:block">
          <span className="font-hindi font-black text-pink-900 text-lg px-4 py-1.5 bg-pink-50 rounded-full border-2 border-pink-200">
            शब्द पहचानें 🎯
          </span>
        </div>

        <button
          onClick={generateQuestion}
          title="नया प्रश्न"
          className="p-3.5 bg-pink-100 hover:bg-pink-200 border-3 border-pink-300 rounded-2xl text-pink-900 font-bubble font-bold shadow-candy-pink btn-bounce cursor-pointer flex items-center gap-2"
        >
          <RefreshCw size={20} />
          <span className="text-sm hidden sm:inline">Next</span>
        </button>
      </div>

      {/* Main Question Card */}
      <div className="bg-gradient-to-b from-white via-pink-50 to-purple-50 border-4 border-pink-300 rounded-4xl p-6 sm:p-10 text-center shadow-candy-pink mb-6 relative overflow-hidden">
        
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
        <div className="inline-flex items-center gap-4 bg-white/90 border-3 border-pink-300 px-8 py-3 rounded-full shadow-candy-pink mb-6">
          <h2 className="font-hindi font-black text-3xl sm:text-4xl text-pink-950">
            <span className="text-pink-600 font-black text-5xl sm:text-6xl">{target?.letter}</span> से क्या आता है?
          </h2>
          <button
            onClick={() => speechEngine.speak(`${target?.letter} से क्या आता है?`, 'hi')}
            className="p-2.5 bg-pink-500 hover:bg-pink-400 text-white rounded-2xl shadow-sm btn-bounce cursor-pointer"
          >
            <Volume2 size={22} />
          </button>
        </div>

        {/* 3 Options with Word + Emoji styled as 3D Toy Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-2">
          {options.map((opt) => {
            const isSelected = selectedWord === opt.word;

            let blockVariant = 'toy-block toy-block-pink';
            if (isSelected) {
              if (opt.isCorrect) {
                blockVariant = 'toy-block toy-block-green scale-105 ring-4 ring-emerald-400 animate-bounce';
              } else {
                blockVariant = 'toy-block toy-block-yellow scale-95 opacity-80';
              }
            }

            return (
              <button
                key={opt.word}
                onClick={() => handleOptionClick(opt)}
                disabled={selectedWord !== null && opt.isCorrect}
                className={`p-6 rounded-4xl border-4 transition-all cursor-pointer btn-bounce flex flex-col items-center justify-center gap-2 ${blockVariant}`}
              >
                <span className="text-6xl sm:text-7xl my-1 drop-shadow-sm">{opt.emoji}</span>
                <span className="font-hindi font-black text-2xl sm:text-3xl text-slate-900">
                  {opt.word}
                </span>
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
