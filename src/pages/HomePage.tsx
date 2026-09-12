import React from 'react';
import { useApp } from '../context/AppContext';
import { soundEffects } from '../utils/soundEffects';
import { TikoMascot } from '../components/common/TikoMascot';
import {
  Sparkles,
  ArrowRight,
  Play,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { DailyGoal } from '../types';

export const HomePage: React.FC = () => {
  const { progress, setCurrentRoute } = useApp();

  const handleNavigate = (route: string) => {
    soundEffects.playPop();
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-pop-in">
      
      {/* Top Friendly Mascot Welcome & Streak Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/90 border-4 border-amber-300 rounded-3xl p-4 sm:p-5 mb-8 shadow-toy-yellow">
        <TikoMascot
          message="Hi! I'm Tiko! Let's learn ABC, Numbers & Hindi together! 🧸"
          emotion="greeting"
          size="md"
        />

        {/* Quick Streak & Star Pills */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 border-2 border-orange-300 px-4 py-2 rounded-2xl shadow-sm">
            <span className="text-2xl animate-bounce-slow">🔥</span>
            <div>
              <p className="text-[10px] uppercase font-bold text-orange-700 tracking-wider">Streak</p>
              <p className="font-bubble font-black text-orange-950 text-base sm:text-lg">
                {progress.currentStreak} Days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-400 px-4 py-2 rounded-2xl shadow-sm">
            <span className="text-2xl animate-bounce-slow">⭐</span>
            <div>
              <p className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Stars</p>
              <p className="font-bubble font-black text-amber-950 text-base sm:text-lg">
                {progress.stars} Won
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION - Vibrant Classroom & Playground Theme */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#53B2FF] via-[#7B61FF] to-[#FF7EB6] text-white p-8 sm:p-14 shadow-2xl border-6 border-white mb-14">
        
        {/* Floating Cartoon Shapes & Sparkles */}
        <div className="absolute top-6 right-12 text-4xl opacity-70 animate-float" style={{ animationDuration: '6s' }}>☁️</div>
        <div className="absolute bottom-8 left-10 text-4xl opacity-70 animate-float" style={{ animationDuration: '8s', animationDelay: '1.5s' }}>🎈</div>
        <div className="absolute top-1/2 left-1/3 text-3xl opacity-50 animate-bounce-slow">⭐</div>
        <div className="absolute top-8 left-16 text-3xl opacity-60 animate-wiggle">🌈</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-bubble font-black text-yellow-200 mb-4 border-2 border-white/40 shadow-sm">
              <span>🧸 Ages 3–8 Years</span>
              <span>•</span>
              <span>Learn • Play • Grow</span>
            </div>

            <h1 className="font-bubble font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight drop-shadow-md mb-4">
              🌈 Let's Learn &amp; Have Fun!
            </h1>

            <p className="text-lg sm:text-2xl font-bubble font-bold text-sky-100 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              "Learn ABC, Numbers &amp; Hindi through games, stories and fun activities!"
            </p>

            {/* Chunky 3D Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => handleNavigate('english')}
                className="w-full sm:w-auto py-4 px-8 btn-candy btn-candy-yellow text-xl cursor-pointer"
              >
                <span>🟡 Start Learning</span>
                <ArrowRight size={22} className="ml-2" />
              </button>

              <button
                onClick={() => handleNavigate('practice')}
                className="w-full sm:w-auto py-4 px-8 btn-candy btn-candy-purple text-xl cursor-pointer"
              >
                <Play size={20} className="fill-white mr-2" />
                <span>🟣 Play a Game</span>
              </button>
            </div>
          </div>

          {/* Hero Right Visual: Cute Children's Learning Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-[2.5rem] bg-white/20 backdrop-blur-md border-4 border-white/50 p-4 flex items-center justify-center shadow-2xl">
              
              {/* Inner Playground Portal */}
              <div className="w-full h-full rounded-[2rem] bg-gradient-to-tr from-yellow-300 via-pink-300 to-sky-300 flex flex-col items-center justify-center text-center p-4 border-4 border-white shadow-inner animate-pulse-slow relative overflow-hidden">
                
                {/* Visual Learning Elements */}
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-4xl animate-bounce-slow" style={{ animationDelay: '0.2s' }}>📚</span>
                  <span className="text-7xl select-none animate-bounce-slow">🧸</span>
                  <span className="text-4xl animate-bounce-slow" style={{ animationDelay: '0.4s' }}>✏️</span>
                </div>

                <div className="flex items-center gap-2 mt-2 bg-white/95 px-4 py-1.5 rounded-2xl shadow-md border border-amber-200">
                  <span className="text-xl">🅰️</span>
                  <span className="font-bubble font-black text-purple-900 text-sm">
                    Tiko's Classroom
                  </span>
                  <span className="text-xl">🔟</span>
                </div>
              </div>

              {/* Floating Orbiting Badges */}
              <div className="absolute -top-4 -left-4 text-4xl bg-white p-2 rounded-2xl shadow-lg border-2 border-sky-300 animate-bounce" style={{ animationDuration: '3.2s' }}>
                🍎
              </div>
              <div className="absolute -top-4 -right-4 text-4xl bg-white p-2 rounded-2xl shadow-lg border-2 border-yellow-300 animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '0.5s' }}>
                ⭐
              </div>
              <div className="absolute -bottom-4 -left-4 text-4xl bg-white p-2 rounded-2xl shadow-lg border-2 border-emerald-300 animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '1s' }}>
                🚀
              </div>
              <div className="absolute -bottom-4 -right-4 text-4xl bg-white p-2 rounded-2xl shadow-lg border-2 border-pink-300 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }}>
                🇮🇳
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE MAIN SUBJECT CARDS - Large 3D Toy Blocks */}
      <section className="mb-14">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bubble font-black text-amber-800 bg-amber-200 px-4 py-1 rounded-full uppercase tracking-wider mb-2 border border-amber-300">
            <Sparkles size={14} />
            <span>Choose Your Playground</span>
          </div>
          <h2 className="font-bubble font-black text-3xl sm:text-5xl text-slate-900">
            What Do You Want to Learn? 🧸
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. ENGLISH: ABC Adventure (Blue + Yellow) */}
          <div
            onClick={() => handleNavigate('english')}
            className="toy-block toy-block-blue p-8 flex flex-col justify-between cursor-pointer select-none text-center group"
          >
            <div>
              {/* Header Badge */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-bubble font-black text-xs bg-sky-500 text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  ABC Adventure
                </span>
                <span className="text-xs font-bubble font-bold text-sky-700 bg-white/80 px-2.5 py-0.5 rounded-full border border-sky-200">
                  {progress.englishCompleted.length}/26 Letters
                </span>
              </div>

              {/* Toy Icon */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-sky-400 to-blue-500 border-4 border-white flex items-center justify-center text-5xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                🔤
              </div>

              {/* Title & Description */}
              <h3 className="font-bubble font-black text-3xl text-sky-950 mb-1">
                ABC Adventure
              </h3>
              <p className="font-bubble font-bold text-sky-700 text-base mb-5">
                Learn A to Z with Tiko
              </p>

              {/* Examples Box */}
              <div className="bg-white/90 border-3 border-sky-200 rounded-3xl p-4 mb-6 text-left space-y-2 text-base font-bubble font-bold text-slate-800 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🍎</span>
                  <span>A — Apple</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🐱</span>
                  <span>C — Cat</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🐶</span>
                  <span>D — Dog</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => handleNavigate('english')}
              className="w-full py-4 btn-candy btn-candy-blue text-lg cursor-pointer"
            >
              <span>Let's Learn ABC! 🚀</span>
            </button>
          </div>

          {/* 2. NUMBERS: Number Playground (Green + Orange) */}
          <div
            onClick={() => handleNavigate('numbers')}
            className="toy-block toy-block-green p-8 flex flex-col justify-between cursor-pointer select-none text-center group"
          >
            <div>
              {/* Header Badge */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-bubble font-black text-xs bg-emerald-500 text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Number Playground
                </span>
                <span className="text-xs font-bubble font-bold text-emerald-700 bg-white/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {progress.numbersCompleted.length}/20 Numbers
                </span>
              </div>

              {/* Toy Icon */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-500 border-4 border-white flex items-center justify-center text-5xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                🔢
              </div>

              {/* Title & Description */}
              <h3 className="font-bubble font-black text-3xl text-emerald-950 mb-1">
                Number Playground
              </h3>
              <p className="font-bubble font-bold text-emerald-700 text-base mb-5">
                Learn numbers 1 to 20
              </p>

              {/* Examples Box */}
              <div className="bg-white/90 border-3 border-emerald-200 rounded-3xl p-4 mb-6 text-left space-y-2 text-base font-bubble font-bold text-slate-800 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-700 font-black text-xl">1</span>
                  <span>⭐ One Star</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-700 font-black text-xl">2</span>
                  <span>⭐⭐ Two Stars</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-700 font-black text-xl">3</span>
                  <span>⭐⭐⭐ Three Stars</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => handleNavigate('numbers')}
              className="w-full py-4 btn-candy btn-candy-green text-lg cursor-pointer"
            >
              <span>Count With Me! ⭐</span>
            </button>
          </div>

          {/* 3. HINDI: हिंदी की दुनिया (Pink + Purple + Yellow) */}
          <div
            onClick={() => handleNavigate('hindi')}
            className="toy-block toy-block-pink p-8 flex flex-col justify-between cursor-pointer select-none text-center group"
          >
            <div>
              {/* Header Badge */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-bubble font-black text-xs bg-pink-500 text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  हिंदी की दुनिया
                </span>
                <span className="text-xs font-bubble font-bold text-pink-700 bg-white/80 px-2.5 py-0.5 rounded-full border border-pink-200">
                  {progress.hindiCompleted.length}/48 वर्णमाला
                </span>
              </div>

              {/* Toy Icon */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-pink-400 via-rose-400 to-purple-500 border-4 border-white flex items-center justify-center text-5xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                🇮🇳
              </div>

              {/* Title & Description */}
              <h3 className="font-hindi font-black text-3xl text-pink-950 mb-1">
                हिंदी सीखें
              </h3>
              <p className="font-hindi font-bold text-pink-700 text-base mb-5">
                अ से ज्ञ तक सीखें
              </p>

              {/* Examples Box */}
              <div className="bg-white/90 border-3 border-pink-200 rounded-3xl p-4 mb-6 text-left space-y-2 text-base font-hindi font-bold text-slate-800 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🍎</span>
                  <span>अ — अनार</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🥭</span>
                  <span>आ — आम</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🫘</span>
                  <span>इ — इमली</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => handleNavigate('hindi')}
              className="w-full py-4 btn-candy btn-candy-pink text-lg cursor-pointer"
            >
              <span>हिंदी सीखें! 🌸</span>
            </button>
          </div>
        </div>
      </section>

      {/* QUICK PRACTICE & DAILY QUESTS ROW */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/95 border-4 border-amber-300 rounded-[2.5rem] p-6 sm:p-10 shadow-toy-yellow mb-10">
        
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 text-xs font-bubble font-black text-purple-800 bg-purple-200 px-4 py-1 rounded-full uppercase tracking-wider mb-2 border border-purple-300">
            <Zap size={14} />
            <span>🎮 Tiko's Fun Quiz</span>
          </div>

          <h3 className="font-bubble font-black text-3xl sm:text-4xl text-slate-900 mb-2">
            Ready for a Fun Game? 🎯
          </h3>

          <p className="text-slate-600 text-base font-bold mb-6">
            Play a 10-question quiz in English, Numbers, or Hindi to collect golden stars and unlock cool shiny badges!
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleNavigate('practice')}
              className="py-4 px-8 btn-candy btn-candy-purple text-lg cursor-pointer"
            >
              <span>🎮 Play 10-Question Quiz!</span>
            </button>

            <button
              onClick={() => handleNavigate('progress')}
              className="py-4 px-8 btn-candy btn-candy-yellow text-lg cursor-pointer"
            >
              <span>🏆 My Treasure Box ({progress.unlockedBadges.length})</span>
            </button>
          </div>
        </div>

        {/* Right Fun Daily Goal Peek */}
        <div className="lg:col-span-5 bg-gradient-to-br from-amber-100 to-pink-100 border-3 border-amber-300 rounded-3xl p-5 shadow-inner">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bubble font-black text-amber-950 text-base">🎯 Today's Quests</span>
            <span className="text-xs font-black text-amber-800 bg-amber-300 px-2.5 py-0.5 rounded-full">
              Daily
            </span>
          </div>

          <div className="space-y-2">
            {progress.dailyGoals.slice(0, 2).map((goal: DailyGoal) => (
              <div key={goal.id} className="flex items-center justify-between text-sm font-bubble font-bold bg-white p-3 rounded-2xl border-2 border-amber-200 shadow-sm">
                <div className="flex items-center gap-2">
                  {goal.completed ? (
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                  )}
                  <span className={goal.completed ? 'line-through text-slate-400' : 'text-slate-800'}>
                    {goal.text}
                  </span>
                </div>
                <span className="text-amber-600 font-black">⭐ +{goal.rewardStars}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleNavigate('progress')}
            className="w-full mt-3 py-2.5 text-center text-xs font-bubble font-black text-amber-900 bg-amber-300 hover:bg-amber-400 rounded-2xl transition cursor-pointer shadow-sm"
          >
            See All Quests &amp; Map →
          </button>
        </div>
      </section>
    </div>
  );
};
