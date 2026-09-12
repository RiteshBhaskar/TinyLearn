import React from 'react';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/soundEffects';
import { Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentRoute } = useApp();

  const handleLinkClick = (route: string) => {
    soundEffects.playPop();
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 pt-12 pb-10 bg-gradient-to-b from-transparent via-amber-100 to-yellow-200 border-t-6 border-amber-300 overflow-hidden select-none">
      
      {/* Decorative Wave/Floating Doodles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b-3 border-amber-300">
          
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <div
              onClick={() => handleLinkClick('home')}
              className="inline-flex items-center gap-2.5 cursor-pointer group"
            >
              <span className="text-4xl group-hover:scale-125 transition-transform">🧸</span>
              <span className="font-bubble font-black text-3xl sm:text-4xl bg-gradient-to-r from-pink-500 via-purple-600 to-sky-500 bg-clip-text text-transparent">
                TinyLearn
              </span>
            </div>
            <p className="font-bubble font-black text-amber-950 text-lg mt-1 flex items-center justify-center md:justify-start gap-1">
              <span>Learn • Play • Grow</span>
              <Sparkles size={18} className="text-yellow-500 animate-spin" style={{ animationDuration: '4s' }} />
            </p>
            <p className="text-slate-600 font-bold text-sm mt-1 max-w-sm">
              The colorful learning playground for little heroes aged 3 to 8!
            </p>
          </div>

          {/* Quick Navigation Candy Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 font-bubble font-black text-sm">
            <button onClick={() => handleLinkClick('home')} className="px-4 py-2 bg-white/90 hover:bg-white text-slate-800 rounded-full border-2 border-amber-300 shadow-sm transition cursor-pointer">
              🏠 Home
            </button>
            <button onClick={() => handleLinkClick('english')} className="px-4 py-2 bg-white/90 hover:bg-white text-sky-800 rounded-full border-2 border-sky-300 shadow-sm transition cursor-pointer">
              🔤 ABC
            </button>
            <button onClick={() => handleLinkClick('numbers')} className="px-4 py-2 bg-white/90 hover:bg-white text-emerald-800 rounded-full border-2 border-emerald-300 shadow-sm transition cursor-pointer">
              🔢 Numbers
            </button>
            <button onClick={() => handleLinkClick('hindi')} className="px-4 py-2 bg-white/90 hover:bg-white text-pink-800 rounded-full border-2 border-pink-300 shadow-sm transition cursor-pointer">
              अ Hindi
            </button>
            <button onClick={() => handleLinkClick('practice')} className="px-4 py-2 bg-white/90 hover:bg-white text-purple-800 rounded-full border-2 border-purple-300 shadow-sm transition cursor-pointer">
              🎮 Quiz
            </button>
            <button onClick={() => handleLinkClick('progress')} className="px-4 py-2 bg-white/90 hover:bg-white text-amber-800 rounded-full border-2 border-yellow-300 shadow-sm transition cursor-pointer">
              🏆 Treasure
            </button>
            <button onClick={() => handleLinkClick('parents')} className="px-4 py-2 bg-white/90 hover:bg-white text-slate-700 rounded-full border-2 border-slate-300 shadow-sm transition cursor-pointer">
              🛡️ Parents
            </button>
          </div>
        </div>

        {/* Made by RITESH BHASKAR & Social Connections */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-amber-200/80">
          <div className="flex items-center gap-2 text-slate-800 font-bubble font-black text-base sm:text-lg">
            <span>Made with</span>
            <Heart size={20} className="text-rose-500 fill-rose-500 animate-pulse" />
            <span>by</span>
            <span className="px-3 py-1 bg-white rounded-full border-2 border-amber-400 text-purple-900 shadow-candy-purple tracking-wide">
              RITESH BHASKAR
            </span>
          </div>

          {/* Social Links Candy Badges */}
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/riteshbhaskar01?stkn=MThnMm5jMmRpNW15MA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white rounded-full font-bubble font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ritesh-bhaskar-b90149236/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-full font-bubble font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/RiteshBhaskar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full font-bubble font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-slate-700 font-bubble">
          <p>© 2026 TinyLearn. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-xs text-slate-600">
            <span>The Happy Learning Space for Curious Kids 🎈</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
