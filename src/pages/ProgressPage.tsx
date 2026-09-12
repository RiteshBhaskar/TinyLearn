import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ENGLISH_LETTERS } from '../data/englishData';
import { NUMBERS_DATA } from '../data/numbersData';
import { HINDI_LETTERS } from '../data/hindiData';
import { TikoMascot } from '../components/common/TikoMascot';
import { soundEffects } from '../utils/soundEffects';
import {
  Trophy,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  BookOpen,
  Hash,
  Languages,
  MapPin,
  Gift
} from 'lucide-react';
import { Badge, DailyGoal } from '../types';

export const ProgressPage: React.FC = () => {
  const { progress, badges, claimDailyGoal, setCurrentRoute } = useApp();
  const [activeTab, setActiveTab] = useState<'journey' | 'treasure'>('journey');

  // Percentages
  const englishPercent = Math.round((progress.englishCompleted.length / ENGLISH_LETTERS.length) * 100);
  const numbersPercent = Math.round((progress.numbersCompleted.length / NUMBERS_DATA.length) * 100);
  const hindiPercent = Math.round((progress.hindiCompleted.length / HINDI_LETTERS.length) * 100);

  const unlockedCount = badges.filter((b: Badge) => b.unlocked).length;

  const journeySteps = [
    {
      id: 'step-1',
      title: '🏠 Learning Camp',
      desc: 'Start your magical journey',
      status: 'completed',
      color: 'toy-block-yellow',
      icon: '🏠',
      stars: '5/5',
      route: 'home'
    },
    {
      id: 'step-2',
      title: '🔤 ABC Adventure',
      desc: 'Learn letters A to Z',
      status: englishPercent > 0 ? (englishPercent >= 80 ? 'completed' : 'active') : 'locked',
      color: 'toy-block-blue',
      icon: '🔤',
      progress: `${progress.englishCompleted.length} / 26 Letters`,
      route: 'english'
    },
    {
      id: 'step-3',
      title: '🔢 Number Playground',
      desc: 'Count numbers 1 to 20',
      status: numbersPercent > 0 ? (numbersPercent >= 80 ? 'completed' : 'active') : 'locked',
      color: 'toy-block-green',
      icon: '🔢',
      progress: `${progress.numbersCompleted.length} / 20 Numbers`,
      route: 'numbers'
    },
    {
      id: 'step-4',
      title: '🇮🇳 हिंदी की दुनिया',
      desc: 'Learn Hindi अ से ज्ञ',
      status: hindiPercent > 0 ? (hindiPercent >= 80 ? 'completed' : 'active') : 'locked',
      color: 'toy-block-pink',
      icon: '🌸',
      progress: `${progress.hindiCompleted.length} / 48 अक्षरों`,
      route: 'hindi'
    },
    {
      id: 'step-5',
      title: '🏆 Super Learner Castle',
      desc: 'Master of all knowledge!',
      status: unlockedCount >= 6 ? 'completed' : 'active',
      color: 'toy-block-purple',
      icon: '👑',
      progress: `${unlockedCount} / ${badges.length} Badges`,
      route: 'practice'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 select-none animate-pop-in">
      
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-yellow-200 border-2 border-yellow-400 text-amber-950 px-5 py-1.5 rounded-full font-bubble font-black text-sm mb-3 shadow-sm">
          <Sparkles size={16} />
          <span>My Learning Playground</span>
        </div>
        <h1 className="font-bubble font-black text-4xl sm:text-6xl text-slate-900 tracking-tight mb-2">
          {activeTab === 'journey' ? '🌈 My Learning Journey' : '🏆 My Treasure Box'}
        </h1>
        <p className="text-slate-600 font-bold max-w-lg mx-auto text-lg">
          Follow your colorful adventure map, collect golden stars, and unlock sparkling treasure badges!
        </p>
      </div>

      {/* Mascot Speech */}
      <div className="flex justify-center mb-8">
        <TikoMascot
          message={`You have collected ⭐ ${progress.stars} Stars and 🪙 ${progress.coins} Coins! Amazing! 🧸`}
          size="md"
          emotion="cheering"
        />
      </div>

      {/* Main Mode Toggle: Journey Map vs Treasure Box */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('journey');
          }}
          className={`px-8 py-3.5 rounded-full font-bubble font-black text-xl transition-all cursor-pointer ${
            activeTab === 'journey'
              ? 'btn-candy-blue scale-105 shadow-xl'
              : 'bg-white border-3 border-sky-200 text-sky-900 hover:bg-sky-50 shadow-sm'
          }`}
        >
          <span>🌈 Adventure Trail Map</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('treasure');
          }}
          className={`px-8 py-3.5 rounded-full font-bubble font-black text-xl transition-all cursor-pointer ${
            activeTab === 'treasure'
              ? 'btn-candy-yellow text-amber-950 scale-105 shadow-xl'
              : 'bg-white border-3 border-amber-200 text-amber-900 hover:bg-amber-50 shadow-sm'
          }`}
        >
          <span>🏆 My Treasure Box ({unlockedCount})</span>
        </button>
      </div>

      {/* TAB 1: 🌈 MY LEARNING JOURNEY ADVENTURE MAP */}
      {activeTab === 'journey' && (
        <div className="space-y-8 animate-pop-in">
          
          {/* Visual Journey Steps */}
          <div className="relative py-4">
            
            {/* Winding Connecting Trail */}
            <div className="hidden md:block absolute top-1/2 left-12 right-12 h-4 bg-gradient-to-r from-amber-300 via-sky-300 to-purple-300 rounded-full -translate-y-1/2 -z-0" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {journeySteps.map((step, idx) => {
                return (
                  <div
                    key={step.id}
                    onClick={() => {
                      soundEffects.playPop();
                      setCurrentRoute(step.route);
                    }}
                    className={`toy-block ${step.color} p-5 flex flex-col items-center justify-between text-center cursor-pointer group hover:scale-110 transition-all`}
                  >
                    {/* Checkpoint Step Number */}
                    <span className="w-8 h-8 rounded-full bg-white font-bubble font-black text-sm flex items-center justify-center shadow-md mb-2 border-2 border-slate-200">
                      {idx + 1}
                    </span>

                    {/* Step Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-white border-3 border-amber-300 flex items-center justify-center text-4xl shadow-sm mb-2 group-hover:rotate-12 transition-transform">
                      {step.icon}
                    </div>

                    <h3 className="font-bubble font-black text-lg text-slate-900 leading-tight mb-1">
                      {step.title}
                    </h3>

                    <p className="text-xs font-bold text-slate-600 mb-3">
                      {step.progress || step.desc}
                    </p>

                    {/* Action Button */}
                    <button className="w-full py-1.5 px-3 bg-white/95 rounded-full font-bubble font-black text-xs text-slate-800 shadow-sm group-hover:bg-amber-300 transition">
                      Explore ➔
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Today's Quests in Adventure Style */}
          <div className="toy-block toy-block-yellow p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bubble font-black text-2xl sm:text-3xl text-amber-950 flex items-center gap-2">
                <span>🎯 Today's Learning Quests</span>
              </h3>
              <span className="text-xs font-black text-amber-900 bg-amber-300 px-3 py-1 rounded-full">
                Daily Stars
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {progress.dailyGoals.map((goal: DailyGoal) => (
                <div
                  key={goal.id}
                  className={`p-4 rounded-3xl border-3 transition-all ${
                    goal.completed
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm'
                      : 'bg-white border-amber-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {goal.completed ? (
                      <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                    )}
                    <span className="font-bubble font-black text-sm">
                      {goal.text}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-bold mt-3 pt-2 border-t border-slate-100">
                    <span className="text-slate-500">
                      {goal.current} / {goal.target}
                    </span>
                    <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-black">
                      ⭐ +{goal.rewardStars}
                    </span>
                  </div>

                  {goal.completed && (
                    <button
                      onClick={() => claimDailyGoal(goal.id)}
                      className="w-full mt-3 py-2 btn-candy btn-candy-green text-xs cursor-pointer"
                    >
                      <Gift size={14} className="mr-1" />
                      <span>Claim +{goal.rewardStars} Stars!</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 🏆 MY TREASURE BOX */}
      {activeTab === 'treasure' && (
        <div className="space-y-8 animate-pop-in">
          
          {/* Golden Treasure Chest Bar */}
          <div className="toy-block toy-block-yellow p-8 text-center relative overflow-hidden treasure-glow">
            <span className="text-7xl block mb-2 animate-bounce-slow">
              👑
            </span>
            <h2 className="font-bubble font-black text-3xl sm:text-5xl text-amber-950 mb-2">
              The Golden Treasure Vault
            </h2>
            <p className="font-bubble font-bold text-amber-800 text-lg max-w-md mx-auto mb-6">
              You have unlocked {unlockedCount} of {badges.length} badges!
            </p>

            <div className="flex justify-center gap-6">
              <div className="bg-white/90 border-3 border-amber-400 px-6 py-3 rounded-3xl shadow-md">
                <span className="text-3xl block">⭐</span>
                <span className="font-bubble font-black text-3xl text-amber-950">
                  {progress.stars}
                </span>
                <p className="text-xs font-bold text-amber-700 uppercase font-bubble">Total Stars</p>
              </div>

              <div className="bg-white/90 border-3 border-purple-400 px-6 py-3 rounded-3xl shadow-md">
                <span className="text-3xl block">🪙</span>
                <span className="font-bubble font-black text-3xl text-purple-950">
                  {progress.coins}
                </span>
                <p className="text-xs font-bold text-purple-700 uppercase font-bubble">Coins</p>
              </div>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {badges.map((badge: Badge) => {
              return (
                <div
                  key={badge.id}
                  className={`toy-block p-6 text-center transition-all ${
                    badge.unlocked
                      ? 'toy-block-yellow ring-4 ring-yellow-300'
                      : 'bg-slate-100 border-slate-300 opacity-60'
                  }`}
                >
                  {/* Badge Icon */}
                  <div
                    className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-5xl mb-3 shadow-md border-3 ${
                      badge.unlocked
                        ? 'bg-gradient-to-tr from-yellow-300 to-amber-400 border-white animate-bounce-slow'
                        : 'bg-slate-200 border-slate-300 grayscale'
                    }`}
                  >
                    {badge.icon}
                  </div>

                  <h3 className="font-bubble font-black text-2xl text-slate-900 mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-600 mb-3">
                    {badge.description}
                  </p>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-center gap-1.5 text-xs font-black text-amber-900">
                    {badge.unlocked ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 size={14} /> Unlocked!
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <Lock size={12} /> {badge.requirement}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
