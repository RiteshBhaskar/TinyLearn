import React, { useState } from 'react';
import { EnglishLetter } from '../../types';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { SpeechButton } from '../common/SpeechButton';
import { soundEffects } from '../../utils/soundEffects';
import { useApp } from '../../context/AppContext';
import { TikoMascot } from '../common/TikoMascot';

interface AlphabetCarouselProps {
  letters: EnglishLetter[];
  initialIndex?: number;
  onBackToGrid: () => void;
}

export const AlphabetCarousel: React.FC<AlphabetCarouselProps> = ({
  letters,
  initialIndex = 0,
  onBackToGrid
}) => {
  const { markEnglishLearned, progress } = useApp();
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
    markEnglishLearned(letters[nextIdx].id);
  };

  const isLearned = progress.englishCompleted.includes(current.id);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 animate-pop-in">
      
      {/* Top Bar with Back button and progress pill */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBackToGrid}
          className="px-5 py-2.5 btn-candy bg-white hover:bg-slate-50 border-3 border-sky-300 rounded-full font-bubble font-black text-sky-900 shadow-sm cursor-pointer flex items-center gap-1.5 text-sm"
        >
          <ChevronLeft size={20} />
          <span>All Letters 🔤</span>
        </button>

        <span className="font-bubble font-black text-sky-900 bg-sky-100 border-2 border-sky-300 px-4 py-1.5 rounded-full shadow-sm text-sm">
          Letter {currentIndex + 1} of {letters.length}
        </span>
      </div>

      {/* Main 3D Giant Focus Toy Card */}
      <div className="toy-block toy-block-blue p-8 sm:p-12 text-center relative">
        
        {/* Learned badge */}
        {isLearned && (
          <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full font-bubble font-black text-sm border-2 border-emerald-300 shadow-sm">
            <CheckCircle2 size={18} />
            <span>Mastered! ⭐</span>
          </div>
        )}

        {/* Big Alphabet Letters */}
        <div className="flex items-baseline justify-center gap-4 my-2">
          <span className="font-bubble font-black text-8xl sm:text-9xl text-sky-600 drop-shadow-md select-none animate-bounce-slow inline-block">
            {current.letter}
          </span>
          <span className="font-bubble font-black text-6xl sm:text-7xl text-sky-400 select-none">
            {current.lowerLetter}
          </span>
        </div>

        {/* Big Cute Animated Picture */}
        <div className="my-4">
          <span className="text-8xl sm:text-9xl inline-block transition-transform hover:scale-125 duration-300 cursor-pointer animate-wiggle">
            {current.emoji}
          </span>
        </div>

        {/* Word Title */}
        <h3 className="font-bubble font-black text-5xl sm:text-6xl text-slate-900 tracking-wide mt-2 mb-2">
          {current.word}
        </h3>

        {/* Rhyme / Sentence in a cute bubble */}
        <div className="bg-white/95 border-3 border-sky-300 rounded-3xl p-4 sm:p-5 mb-6 shadow-md max-w-lg mx-auto">
          <p className="font-bubble font-bold text-lg sm:text-xl text-sky-950">
            "{current.exampleSentence}"
          </p>
        </div>

        {/* Mascot Tiko encouraging note */}
        <div className="flex justify-center mb-6">
          <TikoMascot
            message={`"${current.letter}" is for "${current.word}"! Say it with me! 🍎`}
            size="sm"
            emotion="cheering"
          />
        </div>

        {/* Big Bouncy Audio Pronunciation Button */}
        <div className="flex justify-center mb-2">
          <SpeechButton
            text={`${current.letter} for ${current.word}. ${current.exampleSentence}`}
            size="xl"
            label={`Hear "${current.letter} for ${current.word}" 🔊`}
            className="btn-candy-yellow text-xl"
          />
        </div>
      </div>

      {/* Navigation Controls: Previous & Next */}
      <div className="flex items-center justify-between gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="flex-1 py-4 px-6 btn-candy bg-white hover:bg-sky-50 border-4 border-sky-300 text-sky-900 text-xl shadow-toy-blue cursor-pointer flex items-center justify-center gap-2"
        >
          <ChevronLeft size={26} />
          <span>Previous</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playSparkle();
            markEnglishLearned(current.id);
          }}
          className="p-4 btn-candy bg-amber-100 hover:bg-amber-200 border-4 border-amber-300 text-amber-900 shadow-toy-yellow cursor-pointer"
          title="Replay sound"
        >
          <RotateCcw size={26} />
        </button>

        <button
          onClick={handleNext}
          className="flex-1 py-4 px-6 btn-candy btn-candy-green text-xl shadow-toy-green cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Next Letter</span>
          <ChevronRight size={26} />
        </button>
      </div>
    </div>
  );
};
