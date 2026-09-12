import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ENGLISH_LETTERS } from '../data/englishData';
import { NUMBERS_DATA } from '../data/numbersData';
import { HINDI_LETTERS } from '../data/hindiData';
import { soundEffects } from '../utils/soundEffects';
import { speechEngine } from '../utils/speech';
import { ConfettiCanvas } from '../components/common/ConfettiCanvas';
import { TikoMascot } from '../components/common/TikoMascot';
import {
  Sparkles,
  Volume2,
  RotateCcw,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

type QuizCategory = 'english' | 'numbers' | 'hindi' | 'mixed';
type QuizDifficulty = 'easy' | 'medium' | 'hard';

interface Question {
  id: string;
  category: 'english' | 'numbers' | 'hindi';
  prompt: string;
  lang?: 'en' | 'hi';
  visualCue?: string;
  options: {
    id: string;
    text: string;
    subText?: string;
    visual?: string;
    isCorrect: boolean;
  }[];
}

const OPTION_BUTTON_THEMES = [
  'toy-block-blue hover:bg-sky-100',
  'toy-block-pink hover:bg-pink-100',
  'toy-block-green hover:bg-emerald-100',
  'toy-block-yellow hover:bg-amber-100',
];

export const PracticePage: React.FC = () => {
  const { addStars, recordQuizResult } = useApp();

  // Quiz setup state
  const [inQuiz, setInQuiz] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>('mixed');
  const [selectedDifficulty] = useState<QuizDifficulty>('easy');

  // Quiz play state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tikoFeedback, setTikoFeedback] = useState<{ message: string; emotion: 'correct' | 'encourage' | 'cheering' }>({
    message: "You can do it! Pick the right answer! ⭐",
    emotion: 'cheering'
  });

  const startQuiz = () => {
    soundEffects.playPop();
    const generated: Question[] = [];

    for (let i = 0; i < 10; i++) {
      let poolCategory: 'english' | 'numbers' | 'hindi';
      if (selectedCategory === 'mixed') {
        const cats: ('english' | 'numbers' | 'hindi')[] = ['english', 'numbers', 'hindi'];
        poolCategory = cats[i % 3];
      } else {
        poolCategory = selectedCategory;
      }

      if (poolCategory === 'english') {
        const target = ENGLISH_LETTERS[Math.floor(Math.random() * ENGLISH_LETTERS.length)];
        const distractors: typeof ENGLISH_LETTERS = [];
        while (distractors.length < 3) {
          const d = ENGLISH_LETTERS[Math.floor(Math.random() * ENGLISH_LETTERS.length)];
          if (d.letter !== target.letter && !distractors.some((x: typeof target) => x.letter === d.letter)) {
            distractors.push(d);
          }
        }

        const isFindLetter = Math.random() > 0.5;
        if (isFindLetter) {
          generated.push({
            id: `q-eng-${i}`,
            category: 'english',
            prompt: `Which letter starts the word "${target.word}"?`,
            visualCue: target.emoji,
            options: [target, ...distractors]
              .map(item => ({
                id: item.letter,
                text: item.letter,
                subText: item.word,
                isCorrect: item.letter === target.letter
              }))
              .sort(() => Math.random() - 0.5)
          });
        } else {
          generated.push({
            id: `q-eng-word-${i}`,
            category: 'english',
            prompt: `Find the picture for letter "${target.letter}"!`,
            visualCue: target.letter,
            options: [target, ...distractors]
              .map(item => ({
                id: item.letter,
                text: item.word,
                visual: item.emoji,
                isCorrect: item.letter === target.letter
              }))
              .sort(() => Math.random() - 0.5)
          });
        }
      } else if (poolCategory === 'numbers') {
        const num = Math.floor(Math.random() * 10) + 1;
        const target = NUMBERS_DATA[num - 1] || NUMBERS_DATA[0];

        const isCount = Math.random() > 0.5;
        if (isCount) {
          const distractors = new Set<number>();
          while (distractors.size < 3) {
            const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
            const val = Math.max(1, num + offset);
            if (val !== num) distractors.add(val);
          }

          generated.push({
            id: `q-num-count-${i}`,
            category: 'numbers',
            prompt: `How many items do you see? Count them! ⭐`,
            visualCue: target.objects.slice(0, num).join(' '),
            options: [num, ...Array.from(distractors)]
              .map(n => ({
                id: String(n),
                text: String(n),
                subText: NUMBERS_DATA[n - 1]?.word || '',
                isCorrect: n === num
              }))
              .sort(() => Math.random() - 0.5)
          });
        } else {
          const other = Math.max(1, num + (Math.random() > 0.5 ? 3 : -3));
          const bigger = Math.max(num, other);
          generated.push({
            id: `q-num-big-${i}`,
            category: 'numbers',
            prompt: `Which number is BIGGER?`,
            visualCue: `${num}  vs  ${other}`,
            options: [
              { id: String(num), text: String(num), isCorrect: num === bigger },
              { id: String(other), text: String(other), isCorrect: other === bigger }
            ].sort(() => Math.random() - 0.5)
          });
        }
      } else {
        const validLetters = HINDI_LETTERS.filter(l => l.word !== 'खाली');
        const target = validLetters[Math.floor(Math.random() * validLetters.length)];

        const distractors: typeof validLetters = [];
        while (distractors.length < 3) {
          const d = validLetters[Math.floor(Math.random() * validLetters.length)];
          if (d.id !== target.id && !distractors.some(x => x.id === d.id)) {
            distractors.push(d);
          }
        }

        generated.push({
          id: `q-hin-${i}`,
          category: 'hindi',
          prompt: `${target.letter} से क्या आता है?`,
          lang: 'hi',
          visualCue: target.letter,
          options: [target, ...distractors]
            .map(item => ({
              id: item.id,
              text: item.word,
              visual: item.emoji,
              isCorrect: item.id === target.id
            }))
            .sort(() => Math.random() - 0.5)
        });
      }
    }

    setQuestions(generated);
    setCurrentIndex(0);
    setCorrectCount(0);
    setQuizFinished(false);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setInQuiz(true);
    setTikoFeedback({
      message: "You can do it! Pick the answer you like! ⭐",
      emotion: 'cheering'
    });

    if (generated[0]) {
      speechEngine.speak(generated[0].prompt, generated[0].lang || 'en');
    }
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    if (isCorrect) {
      soundEffects.playCorrect();
      setCorrectCount(prev => prev + 1);
      setShowConfetti(true);
      setTikoFeedback({
        message: "Yay! Awesome! You got it! 🎉 ⭐ +1 Star",
        emotion: 'correct'
      });
      speechEngine.speak('Awesome! You got it!');
      setTimeout(() => setShowConfetti(false), 1500);
    } else {
      soundEffects.playGentleOops();
      setTikoFeedback({
        message: "Almost! Nice try! Let's keep going! 😊",
        emotion: 'encourage'
      });
      speechEngine.speak('Nice try! You are doing great!');
    }
  };

  const handleNextQuestion = () => {
    soundEffects.playPop();
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setTikoFeedback({
        message: "Here comes the next fun question! 🚀",
        emotion: 'cheering'
      });
      speechEngine.speak(questions[nextIdx].prompt, questions[nextIdx].lang || 'en');
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    soundEffects.playFanfare();
    setShowConfetti(true);
    setQuizFinished(true);

    const stars = correctCount * 2;
    addStars(stars, stars * 2, false);

    recordQuizResult({
      subject: selectedCategory.toUpperCase(),
      difficulty: selectedDifficulty,
      score: correctCount,
      totalQuestions: questions.length,
      starsEarned: stars
    });
  };

  return (
    <div className="min-h-[80vh] max-w-4xl mx-auto px-4 py-6 select-none">
      <ConfettiCanvas active={showConfetti} durationMs={3000} />

      {!inQuiz ? (
        /* QUIZ LOBBY - Game Show Style */
        <div className="animate-pop-in">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-200 border-2 border-purple-400 text-purple-900 px-5 py-1.5 rounded-full font-bubble font-black text-sm mb-3 shadow-sm">
              <Sparkles size={16} />
              <span>🎮 Tiko's Quiz Game Show</span>
            </div>
            <h1 className="font-bubble font-black text-4xl sm:text-6xl text-slate-900 tracking-tight mb-2">
              Play &amp; Win Golden Stars! 🌟
            </h1>
            <p className="text-slate-600 font-bold max-w-lg mx-auto text-lg">
              Choose your favorite playground and answer 10 fun questions to earn stars and win shiny badges!
            </p>
          </div>

          {/* Lobby Mascot */}
          <div className="flex justify-center mb-8">
            <TikoMascot
              message="Ready for a fun game? Pick a subject and let's play! 🧸"
              size="md"
              emotion="cheering"
            />
          </div>

          {/* Subject Chooser */}
          <div className="toy-block toy-block-yellow p-8 mb-8">
            <h2 className="font-bubble font-black text-2xl sm:text-3xl text-amber-950 mb-6 flex items-center justify-center gap-2">
              <span>1. Choose Your Subject</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { id: 'english' as QuizCategory, label: 'ABC English', icon: '🔤', colorClass: 'btn-candy-blue' },
                { id: 'numbers' as QuizCategory, label: '123 Numbers', icon: '🔢', colorClass: 'btn-candy-green' },
                { id: 'hindi' as QuizCategory, label: 'हिंदी सीखें', icon: '🇮🇳', colorClass: 'btn-candy-pink' },
                { id: 'mixed' as QuizCategory, label: 'Mixed Quiz 🎲', icon: '🎉', colorClass: 'btn-candy-purple' }
              ].map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      soundEffects.playPop();
                      setSelectedCategory(cat.id);
                    }}
                    className={`p-5 rounded-3xl border-4 font-bubble font-black transition-all cursor-pointer flex flex-col items-center gap-2 ${
                      isSelected
                        ? `${cat.colorClass} scale-105 shadow-xl ring-4 ring-yellow-300`
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-amber-50 shadow-sm'
                    }`}
                  >
                    <span className="text-5xl">{cat.icon}</span>
                    <span className="text-lg">{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Start Button */}
            <div className="mt-8 pt-6 border-t-2 border-amber-300 flex justify-center">
              <button
                onClick={startQuiz}
                className="w-full sm:w-auto py-5 px-12 btn-candy btn-candy-green text-2xl cursor-pointer"
              >
                <span>🚀 Let's Play Tiko's Quiz!</span>
              </button>
            </div>
          </div>
        </div>
      ) : quizFinished ? (
        /* QUIZ CELEBRATION GAME SHOW FINALE */
        <div className="toy-block toy-block-yellow p-8 sm:p-12 text-center max-w-xl mx-auto animate-pop-in">
          
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-tr from-yellow-300 to-amber-400 border-4 border-white shadow-lg flex items-center justify-center text-6xl animate-bounce">
            🎉
          </div>

          <h2 className="font-bubble font-black text-4xl sm:text-5xl text-amber-950 mb-2">
            Awesome! You Did It! 🌟
          </h2>
          <p className="font-bubble font-bold text-slate-700 text-xl mb-6">
            You completed {selectedCategory.toUpperCase()} Quiz!
          </p>

          {/* Score Box */}
          <div className="bg-white border-4 border-amber-300 rounded-3xl p-6 shadow-md mb-6">
            <p className="text-xs font-black text-slate-400 uppercase font-bubble tracking-wider">Stars Collected</p>
            <p className="font-bubble font-black text-6xl text-amber-950 my-2">
              ⭐ {correctCount * 2} Stars
            </p>
            <p className="font-bubble font-bold text-emerald-700 text-lg">
              {correctCount} out of {questions.length} questions answered!
            </p>
          </div>

          {/* Mascot Celebration */}
          <div className="flex justify-center mb-8">
            <TikoMascot
              message="I'm so proud of you! You're a super learner! 🧸⭐"
              size="md"
              emotion="correct"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={startQuiz}
              className="flex-1 py-4 btn-candy btn-candy-blue text-xl cursor-pointer"
            >
              <RotateCcw size={22} className="mr-2" />
              <span>Play Again!</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playPop();
                setInQuiz(false);
              }}
              className="flex-1 py-4 btn-candy btn-candy-purple text-xl cursor-pointer"
            >
              <span>Back to Menu 🏠</span>
            </button>
          </div>
        </div>
      ) : (
        /* LIVE QUIZ SCREEN - Fun Game Show */
        <div className="max-w-2xl mx-auto animate-pop-in">
          
          {/* Top Info Bar */}
          <div className="flex justify-between items-center bg-white/95 border-3 border-amber-300 rounded-full px-5 py-2.5 mb-4 shadow-sm">
            <button
              onClick={() => {
                soundEffects.playPop();
                setInQuiz(false);
              }}
              className="px-3 py-1 rounded-full text-slate-600 hover:bg-slate-100 flex items-center gap-1 font-bubble font-bold text-sm cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Exit</span>
            </button>

            <span className="font-bubble font-black text-amber-950 bg-amber-200 border border-amber-300 px-4 py-1 rounded-full text-sm">
              Question {currentIndex + 1} of {questions.length}
            </span>

            <div className="flex items-center gap-1 font-bubble font-black text-amber-900 text-base">
              <span>⭐ {correctCount * 2}</span>
            </div>
          </div>

          {/* Star Meter Header */}
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className={`text-xl transition-all ${
                  i < currentIndex ? 'text-amber-400 scale-110' : 'text-slate-300 opacity-50'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>

          {/* Mascot Dialogue Bubble */}
          <div className="flex justify-center mb-4">
            <TikoMascot
              message={tikoFeedback.message}
              emotion={tikoFeedback.emotion}
              size="sm"
            />
          </div>

          {/* Question Box */}
          <div className="toy-block toy-block-purple p-6 sm:p-8 text-center mb-6">
            
            <div className="flex items-center justify-center gap-3 mb-2">
              <h2 className="font-bubble font-black text-2xl sm:text-4xl text-slate-900">
                {currentQ.prompt}
              </h2>
              <button
                onClick={() => speechEngine.speak(currentQ.prompt, currentQ.lang || 'en')}
                className="p-2.5 bg-purple-400 hover:bg-purple-300 text-white rounded-2xl shadow-sm cursor-pointer"
              >
                <Volume2 size={22} />
              </button>
            </div>

            {/* Visual Cue if any */}
            {currentQ.visualCue && (
              <div className="my-4 py-4 px-6 bg-white border-3 border-purple-200 rounded-3xl inline-block shadow-inner">
                <span className="font-bubble font-black text-6xl sm:text-7xl text-purple-900 tracking-wider inline-block animate-bounce-slow">
                  {currentQ.visualCue}
                </span>
              </div>
            )}

            {/* Large Colorful 3D Option Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOptionId === opt.id;
                const themeClass = OPTION_BUTTON_THEMES[idx % OPTION_BUTTON_THEMES.length];

                let stateStyle = `${themeClass}`;
                if (isAnswered) {
                  if (opt.isCorrect) {
                    stateStyle = 'toy-block-green scale-105 ring-6 ring-emerald-300';
                  } else if (isSelected) {
                    stateStyle = 'toy-block-pink opacity-80 scale-95';
                  } else {
                    stateStyle = 'opacity-40';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                    disabled={isAnswered}
                    className={`toy-block p-6 rounded-3xl font-bubble font-black text-3xl sm:text-4xl transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${stateStyle}`}
                  >
                    {opt.visual && <span className="text-5xl my-1">{opt.visual}</span>}
                    <span>{opt.text}</span>
                    {opt.subText && <span className="text-xs opacity-75 font-bold font-bubble">{opt.subText}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Continue / Next Button */}
          {isAnswered && (
            <div className="flex justify-center animate-pop-in">
              <button
                onClick={handleNextQuestion}
                className="py-4 px-10 btn-candy btn-candy-green text-2xl cursor-pointer flex items-center gap-2"
              >
                <span>{currentIndex < questions.length - 1 ? 'Next Question! 🚀' : 'See My Stars! 🎉'}</span>
                <ChevronRight size={26} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
