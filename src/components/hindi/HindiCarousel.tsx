import React, { useState } from 'react';
import { HindiLetter } from '../../types';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { SpeechButton } from '../common/SpeechButton';
import { soundEffects } from '../../utils/soundEffects';
import { useApp } from '../../context/AppContext';
import { TikoMascot } from '../common/TikoMascot';

interface HindiCarouselProps {
  letters: HindiLetter[];
  initialIndex?: number;
  onBackToGrid: () => void;
}

export const HindiCarousel: React.FC<HindiCarouselProps> = ({
  letters,
  initialIndex = 0,
  onBackToGrid
}) => {
  const { markHindiLearned, progress } = useApp();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const current = letters[currentIndex];

  const handlePrev = () => {
    soundEffects.playPop();
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : letters.length - 1));
  };

  const handleNext = () => {
    soundEffects.playPop();
    const nextIdx = currentIndex < letters.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIdx);
    markHindiLearned(letters[nextIdx].id);
  };

  const isLearned = progress.hindiCompleted.includes(current.id);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 animate-pop-in select-none">
      
      {/* Top Bar with Back and Progress */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBackToGrid}
          className="px-5 py-2.5 btn-candy bg-white hover:bg-slate-50 border-3 border-pink-300 rounded-full font-bubble font-black text-pink-900 shadow-sm cursor-pointer flex items-center gap-1.5 text-sm"
        >
          <ChevronLeft size={20} />
          <span>वर्णमाला (All) 🌸</span>
        </button>

        <span className="font-bubble font-black text-pink-900 bg-pink-100 border-2 border-pink-300 px-4 py-1.5 rounded-full shadow-sm text-sm">
          अक्षर {currentIndex + 1} of {letters.length} ({current.type === 'swar' ? 'स्वर' : 'व्यंजन'})
        </span>
      </div>

      {/* Main Focus Card */}
      <div className="toy-block toy-block-pink p-8 sm:p-12 text-center relative">
        
        {/* Learned badge */}
        {isLearned && (
          <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full font-bubble font-black text-sm border-2 border-emerald-300 shadow-sm">
            <CheckCircle2 size={18} />
            <span>सीख लिया! ⭐</span>
          </div>
        )}

        {/* Big Devanagari Character */}
        <div className="my-2">
          <span className="font-hindi font-black text-8xl sm:text-9xl text-pink-600 drop-shadow-md select-none inline-block animate-bounce-slow">
            {current.letter}
          </span>
        </div>

        {/* Big Emoji Picture */}
        <div className="my-4">
          <span className="text-8xl sm:text-9xl inline-block transition-transform hover:scale-125 duration-300 cursor-pointer animate-wiggle">
            {current.emoji}
          </span>
        </div>

        {/* Hindi Word Title */}
        <h3 className="font-hindi font-black text-5xl sm:text-6xl text-slate-900 tracking-wide mt-2 mb-2">
          {current.word}
        </h3>

        {/* English Meaning & Phonetics */}
        <p className="text-base font-bold text-slate-600 mb-4 font-bubble">
          Meaning: <span className="text-pink-600 font-black">{current.englishMeaning}</span> • ({current.phonetic})
        </p>

        {/* Sentence / Rhyme */}
        <div className="bg-white/95 border-3 border-pink-300 rounded-3xl p-4 sm:p-5 mb-6 shadow-md max-w-lg mx-auto">
          <p className="font-hindi font-bold text-2xl text-pink-950">
            "{current.sentence}"
          </p>
        </div>

        {/* Mascot Tiko Speaking Note */}
        <div className="flex justify-center mb-6">
          <TikoMascot
            message={`"${current.letter}" से "${current.word}"! बहुत सुंदर! 🌸`}
            size="sm"
            emotion="correct"
            lang="hi"
          />
        </div>

        {/* Voice Speech Trigger in Hindi */}
        <div className="flex justify-center mb-2">
          <SpeechButton
            text={`${current.letter} से ${current.word}. ${current.sentence}`}
            lang="hi"
            size="xl"
            label={`सुनें: "${current.letter} से ${current.word}" 🔊`}
            className="btn-candy-pink text-xl"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="flex-1 py-4 px-6 btn-candy bg-white hover:bg-pink-50 border-4 border-pink-300 text-pink-900 text-xl shadow-toy-pink cursor-pointer flex items-center justify-center gap-2"
        >
          <ChevronLeft size={26} />
          <span>पिछला</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playSparkle();
            markHindiLearned(current.id);
          }}
          className="p-4 btn-candy bg-amber-100 hover:bg-amber-200 border-4 border-amber-300 text-amber-900 shadow-toy-yellow cursor-pointer"
          title="Replay sound"
        >
          <RotateCcw size={26} />
        </button>

        <button
          onClick={handleNext}
          className="flex-1 py-4 px-6 btn-candy btn-candy-pink text-xl shadow-toy-pink cursor-pointer flex items-center justify-center gap-2"
        >
          <span>अगला अक्षर</span>
          <ChevronRight size={26} />
        </button>
      </div>
    </div>
  );
};
