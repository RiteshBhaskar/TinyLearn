import React, { useState } from 'react';
import { NumberItem } from '../../types';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, Sparkles } from 'lucide-react';
import { SpeechButton } from '../common/SpeechButton';
import { soundEffects } from '../../utils/soundEffects';
import { speechEngine } from '../../utils/speech';
import { useApp } from '../../context/AppContext';
import { TikoMascot } from '../common/TikoMascot';

interface NumberCarouselProps {
  numbers: NumberItem[];
  initialIndex?: number;
  onBackToGrid: () => void;
}

export const NumberCarousel: React.FC<NumberCarouselProps> = ({
  numbers,
  initialIndex = 0,
  onBackToGrid
}) => {
  const { markNumberLearned, progress } = useApp();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [tappedObjects, setTappedObjects] = useState<number[]>([]);

  const current = numbers[currentIndex];

  const handlePrev = () => {
    soundEffects.playPop();
    setTappedObjects([]);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : numbers.length - 1));
  };

  const handleNext = () => {
    soundEffects.playPop();
    setTappedObjects([]);
    const nextIdx = currentIndex < numbers.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIdx);
    markNumberLearned(numbers[nextIdx].number);
  };

  const handleObjectTap = (index: number) => {
    const isAlreadyTapped = tappedObjects.includes(index);
    const newTapped = isAlreadyTapped
      ? tappedObjects.filter(i => i !== index)
      : [...tappedObjects, index];

    setTappedObjects(newTapped);
    soundEffects.playCountBeep(newTapped.length);

    if (!isAlreadyTapped) {
      speechEngine.speak(`${newTapped.length}`);
    }
  };

  const isLearned = progress.numbersCompleted.includes(current.number);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 animate-pop-in">
      
      {/* Top Bar with Back and Progress */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBackToGrid}
          className="px-5 py-2.5 btn-candy bg-white hover:bg-slate-50 border-3 border-emerald-300 rounded-full font-bubble font-black text-emerald-900 shadow-sm cursor-pointer flex items-center gap-1.5 text-sm"
        >
          <ChevronLeft size={20} />
          <span>All Numbers 🔢</span>
        </button>

        <span className="font-bubble font-black text-emerald-900 bg-emerald-100 border-2 border-emerald-300 px-4 py-1.5 rounded-full shadow-sm text-sm">
          Number {currentIndex + 1} of {numbers.length}
        </span>
      </div>

      {/* Main Focus Number Toy Card */}
      <div className="toy-block toy-block-green p-8 sm:p-12 text-center relative">
        
        {/* Learned badge */}
        {isLearned && (
          <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full font-bubble font-black text-sm border-2 border-emerald-300 shadow-sm">
            <CheckCircle2 size={18} />
            <span>Mastered! ⭐</span>
          </div>
        )}

        {/* Big 3D Number Digit */}
        <div className="my-2">
          <span className="font-bubble font-black text-8xl sm:text-9xl text-emerald-600 drop-shadow-md select-none inline-block animate-bounce-slow">
            {current.number}
          </span>
        </div>

        {/* Word Names: English & Hindi */}
        <div className="flex items-center justify-center gap-3 flex-wrap my-2">
          <h3 className="font-bubble font-black text-5xl text-slate-900">
            {current.word}
          </h3>
          <span className="font-hindi font-black text-3xl text-emerald-700 bg-emerald-100 px-4 py-1.5 rounded-2xl border-2 border-emerald-300">
            {current.hindiWord}
          </span>
        </div>

        {/* Interactive Counting Objects Sandbox */}
        <div className="bg-white/95 border-4 border-emerald-300 rounded-[2rem] p-6 my-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bubble font-black text-emerald-900 flex items-center gap-1.5">
              <Sparkles size={16} className="text-yellow-500" />
              <span>Tap each item to count!</span>
            </span>
            <span className="text-sm font-bubble font-black bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-300">
              Counted: {tappedObjects.length} / {current.number}
            </span>
          </div>

          {/* Sequential items */}
          <div className="flex flex-wrap justify-center gap-3 max-h-56 overflow-y-auto p-2">
            {current.objects.map((obj, idx) => {
              const isTapped = tappedObjects.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => handleObjectTap(idx)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl transition-all cursor-pointer select-none ${
                    isTapped
                      ? 'bg-emerald-300 border-3 border-emerald-500 scale-110 shadow-md ring-4 ring-emerald-200 animate-wiggle'
                      : 'bg-emerald-50 border-2 border-emerald-200 hover:scale-110 hover:bg-emerald-100'
                  }`}
                >
                  {obj}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mascot Tiko Cheering */}
        <div className="flex justify-center mb-6">
          <TikoMascot
            message={`Can you count all ${current.number} ${current.word} with me? 🎈`}
            size="sm"
            emotion="thinking"
          />
        </div>

        {/* Voice Audio Pronunciation */}
        <div className="flex justify-center mb-2">
          <SpeechButton
            text={`${current.word}. Number ${current.number}. ${current.funFact}`}
            size="xl"
            label={`Hear "${current.word}" (${current.number}) 🔊`}
            className="btn-candy-green text-xl"
          />
        </div>
      </div>

      {/* Navigation Buttons: Previous & Next */}
      <div className="flex items-center justify-between gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="flex-1 py-4 px-6 btn-candy bg-white hover:bg-emerald-50 border-4 border-emerald-300 text-emerald-900 text-xl shadow-toy-green cursor-pointer flex items-center justify-center gap-2"
        >
          <ChevronLeft size={26} />
          <span>Previous</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playSparkle();
            markNumberLearned(current.number);
            setTappedObjects([]);
          }}
          className="p-4 btn-candy bg-amber-100 hover:bg-amber-200 border-4 border-amber-300 text-amber-900 shadow-toy-yellow cursor-pointer"
          title="Reset counting"
        >
          <RotateCcw size={26} />
        </button>

        <button
          onClick={handleNext}
          className="flex-1 py-4 px-6 btn-candy btn-candy-green text-xl shadow-toy-green cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Next Number</span>
          <ChevronRight size={26} />
        </button>
      </div>
    </div>
  );
};
