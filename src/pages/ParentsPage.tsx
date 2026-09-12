import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ENGLISH_LETTERS } from '../data/englishData';
import { NUMBERS_DATA } from '../data/numbersData';
import { HINDI_LETTERS } from '../data/hindiData';
import { soundEffects } from '../utils/soundEffects';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Hash,
  Languages,
  Clock,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Lock,
  DownloadCloud,
  HeartHandshake,
  KeyRound
} from 'lucide-react';
import { QuizResult } from '../types';

export const ParentsPage: React.FC = () => {
  const {
    progress,
    resetAllProgress,
    loadDemoProgress
  } = useApp();

  // Parental Math Lock Gate
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [gateInput, setGateInput] = useState('');
  const [gateError, setGateError] = useState(false);

  // Math challenge: e.g. 8 + 7 = 15
  const num1 = 8;
  const num2 = 7;
  const expectedAnswer = num1 + num2;

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(gateInput.trim(), 10) === expectedAnswer) {
      setGateUnlocked(true);
      setGateError(false);
      soundEffects.playCorrect();
    } else {
      setGateError(true);
      soundEffects.playGentleOops();
    }
  };

  // Calculations
  const englishPercent = Math.round((progress.englishCompleted.length / ENGLISH_LETTERS.length) * 100);
  const numbersPercent = Math.round((progress.numbersCompleted.length / NUMBERS_DATA.length) * 100);
  const hindiPercent = Math.round((progress.hindiCompleted.length / HINDI_LETTERS.length) * 100);

  const totalLearnedItems =
    progress.englishCompleted.length +
    progress.numbersCompleted.length +
    progress.hindiCompleted.length +
    progress.tracingCompleted.length;

  // Estimated learning time (each item approx 1.5 mins, each quiz approx 3 mins)
  const estimatedMins = Math.round(totalLearnedItems * 1.5 + progress.quizHistory.length * 3);

  const avgQuizScore =
    progress.quizHistory.length > 0
      ? Math.round(
          (progress.quizHistory.reduce((acc: number, q: QuizResult) => acc + (q.score / q.totalQuestions) * 100, 0) /
            progress.quizHistory.length)
        )
      : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-pop-in select-none">
      
      {/* Header Banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-purple-100 border-2 border-purple-300 text-purple-900 px-5 py-2 rounded-full font-bubble font-black text-sm mb-3 shadow-candy-purple">
          <ShieldCheck size={18} className="text-purple-600" />
          <span>Parent &amp; Educator Dashboard</span>
        </div>
        <h1 className="font-bubble font-black text-4xl sm:text-5xl text-slate-900 tracking-tight mb-2">
          Child Learning Insights 📊
        </h1>
        <p className="text-slate-600 font-bold max-w-xl mx-auto text-base">
          A friendly and comprehensive overview of your child's progress, activity stats, and safety settings.
        </p>
      </div>

      {/* Quick Summary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white/95 border-3 border-sky-300 rounded-3xl p-5 shadow-candy-blue">
          <div className="flex items-center gap-2 text-sky-600 mb-1">
            <Clock size={20} />
            <span className="text-xs font-black uppercase font-bubble text-slate-500">Learning Time</span>
          </div>
          <p className="font-bubble font-black text-3xl text-sky-950">
            ~{estimatedMins} <span className="text-sm font-bold text-slate-500">Mins</span>
          </p>
          <p className="text-[11px] text-slate-400 font-bold mt-1">Based on activities completed</p>
        </div>

        <div className="bg-white/95 border-3 border-emerald-300 rounded-3xl p-5 shadow-candy-green">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <CheckCircle2 size={20} />
            <span className="text-xs font-black uppercase font-bubble text-slate-500">Mastered Items</span>
          </div>
          <p className="font-bubble font-black text-3xl text-emerald-950">
            {totalLearnedItems} <span className="text-sm font-bold text-slate-500">Items</span>
          </p>
          <p className="text-[11px] text-slate-400 font-bold mt-1">Letters, numbers &amp; drawings</p>
        </div>

        <div className="bg-white/95 border-3 border-amber-300 rounded-3xl p-5 shadow-candy-yellow">
          <div className="flex items-center gap-2 text-amber-500 mb-1">
            <Sparkles size={20} />
            <span className="text-xs font-black uppercase font-bubble text-slate-500">Total Stars</span>
          </div>
          <p className="font-bubble font-black text-3xl text-amber-600">
            {progress.stars} <span className="text-sm font-bold text-slate-500">⭐</span>
          </p>
          <p className="text-[11px] text-slate-400 font-bold mt-1">Earned across all modules</p>
        </div>

        <div className="bg-white/95 border-3 border-purple-300 rounded-3xl p-5 shadow-candy-purple">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <Award size={20} />
            <span className="text-xs font-black uppercase font-bubble text-slate-500">Quiz Accuracy</span>
          </div>
          <p className="font-bubble font-black text-3xl text-purple-950">
            {avgQuizScore}%
          </p>
          <p className="text-[11px] text-slate-400 font-bold mt-1">Across {progress.quizHistory.length} quiz tests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Detailed Subject Breakdown */}
        <div className="bg-white/95 border-4 border-slate-200 rounded-4xl p-6 sm:p-8 shadow-candy-blue">
          <h2 className="font-bubble font-black text-2xl text-slate-800 mb-5 flex items-center gap-2">
            <span>📚 Subject Mastery Breakdown</span>
          </h2>

          <div className="space-y-4">
            {/* English */}
            <div className="p-4 bg-sky-50 rounded-3xl border-2 border-sky-200">
              <div className="flex justify-between items-center mb-1 font-bubble font-bold text-sm">
                <span className="text-sky-900 flex items-center gap-2 font-black text-base">
                  <BookOpen size={18} className="text-sky-600" /> English Alphabet (A–Z)
                </span>
                <span className="text-sky-700 font-black">{englishPercent}% ({progress.englishCompleted.length}/26)</span>
              </div>
              <div className="w-full h-3 bg-sky-100 rounded-full overflow-hidden my-2 border border-sky-300">
                <div className="h-full bg-sky-400 rounded-full transition-all duration-500" style={{ width: `${englishPercent}%` }} />
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {progress.englishCompleted.length > 0
                  ? `Completed: ${progress.englishCompleted.join(', ')}`
                  : 'No letters completed yet.'}
              </p>
            </div>

            {/* Numbers */}
            <div className="p-4 bg-emerald-50 rounded-3xl border-2 border-emerald-200">
              <div className="flex justify-between items-center mb-1 font-bubble font-bold text-sm">
                <span className="text-emerald-900 flex items-center gap-2 font-black text-base">
                  <Hash size={18} className="text-emerald-600" /> Numbers (1–20)
                </span>
                <span className="text-emerald-700 font-black">{numbersPercent}% ({progress.numbersCompleted.length}/20)</span>
              </div>
              <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden my-2 border border-emerald-300">
                <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${numbersPercent}%` }} />
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {progress.numbersCompleted.length > 0
                  ? `Completed numbers: ${progress.numbersCompleted.join(', ')}`
                  : 'No numbers completed yet.'}
              </p>
            </div>

            {/* Hindi */}
            <div className="p-4 bg-pink-50 rounded-3xl border-2 border-pink-200">
              <div className="flex justify-between items-center mb-1 font-bubble font-bold text-sm">
                <span className="text-pink-900 flex items-center gap-2 font-black text-base">
                  <Languages size={18} className="text-pink-600" /> Hindi Alphabet (अ–ज्ञ)
                </span>
                <span className="text-pink-700 font-black">{hindiPercent}% ({progress.hindiCompleted.length}/48)</span>
              </div>
              <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden my-2 border border-pink-300">
                <div className="h-full bg-pink-400 rounded-full transition-all duration-500" style={{ width: `${hindiPercent}%` }} />
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {progress.hindiCompleted.length} letters explored and pronounced.
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Performance History */}
        <div className="bg-white/95 border-4 border-slate-200 rounded-4xl p-6 sm:p-8 shadow-candy-purple flex flex-col justify-between">
          <div>
            <h2 className="font-bubble font-black text-2xl text-slate-800 mb-5 flex items-center gap-2">
              <span>🏆 Recent Quiz Sessions</span>
            </h2>

            {progress.quizHistory.length === 0 ? (
              <div className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 text-center">
                <p className="text-slate-400 font-bold font-bubble text-sm">
                  No practice quizzes completed yet. Encourage your child to test their skills in the Practice Game Show!
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {progress.quizHistory.slice(0, 5).map((q: QuizResult) => {
                  const pct = Math.round((q.score / q.totalQuestions) * 100);
                  return (
                    <div
                      key={q.id}
                      className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border-2 border-slate-200 transition shadow-xs"
                    >
                      <div>
                        <p className="font-bubble font-black text-slate-800 text-sm">
                          {q.subject} Quiz ({q.difficulty})
                        </p>
                        <p className="text-[11px] text-slate-400 font-bold">{q.date}</p>
                      </div>

                      <div className="text-right">
                        <span className="font-bubble font-black text-emerald-700 text-sm block">
                          {q.score}/{q.totalQuestions} ({pct}%)
                        </span>
                        <span className="text-[11px] text-amber-600 font-bold">
                          +{q.starsEarned} ⭐
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Privacy & Safety Guarantee */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3 text-xs text-slate-500 font-bold">
            <HeartHandshake size={24} className="text-pink-500 shrink-0" />
            <span>
              100% child-safe, ad-free environment. All data is saved securely on this device's browser local storage.
            </span>
          </div>
        </div>
      </div>

      {/* Parental Gate Controls (Reset & Demo Data) */}
      <div className="bg-gradient-to-b from-white to-amber-50 border-4 border-amber-300 rounded-4xl p-6 sm:p-8 shadow-candy-yellow">
        <h2 className="font-bubble font-black text-2xl text-slate-800 mb-2 flex items-center gap-2">
          <Lock size={22} className="text-amber-600" />
          <span>Parental Lock &amp; Controls</span>
        </h2>
        <p className="text-sm text-slate-600 font-bold mb-6">
          To prevent accidental changes by young children, please solve the simple addition problem below:
        </p>

        {!gateUnlocked ? (
          <form onSubmit={handleGateSubmit} className="max-w-md bg-white border-3 border-amber-200 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-center gap-3">
            <span className="font-bubble font-black text-amber-950 text-xl flex items-center gap-2">
              <KeyRound size={20} className="text-amber-500" />
              {num1} + {num2} = ?
            </span>
            <input
              type="number"
              value={gateInput}
              onChange={(e) => setGateInput(e.target.value)}
              placeholder="Answer"
              className="flex-1 px-4 py-2 bg-amber-50 rounded-2xl border-2 border-amber-300 font-black text-slate-800 text-center text-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bubble font-black rounded-2xl text-sm btn-candy-yellow btn-bounce cursor-pointer shadow-sm"
            >
              Unlock Gate
            </button>
            {gateError && <p className="text-xs font-bold text-rose-500 mt-1">Please try again!</p>}
          </form>
        ) : (
          <div className="animate-pop-in space-y-4">
            <div className="p-4 bg-emerald-100 border-3 border-emerald-400 text-emerald-900 rounded-3xl font-bubble font-black text-sm flex items-center gap-3 shadow-xs">
              <CheckCircle2 size={20} className="text-emerald-600" />
              <span>Parent Gate Unlocked! You have full access to learning management tools.</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              {/* Load Demo Data button */}
              <button
                onClick={loadDemoProgress}
                className="py-3 px-6 bg-sky-400 hover:bg-sky-300 text-sky-950 border-3 border-sky-500 rounded-2xl font-bubble font-black text-sm shadow-candy-blue btn-bounce flex items-center gap-2 cursor-pointer"
              >
                <DownloadCloud size={20} />
                <span>Load Sample Child Progress (Demo)</span>
              </button>

              {/* Reset Data button */}
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset all learning progress?')) {
                    soundEffects.playPop();
                    resetAllProgress();
                  }
                }}
                className="py-3 px-6 bg-rose-100 hover:bg-rose-200 text-rose-800 border-3 border-rose-300 rounded-2xl font-bubble font-black text-sm shadow-candy-pink btn-bounce flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw size={20} />
                <span>Reset All Learning Progress</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
