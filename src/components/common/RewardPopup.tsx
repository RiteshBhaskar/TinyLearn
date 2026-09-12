import React from 'react';
import { useApp } from '../../context/AppContext';
import { ConfettiCanvas } from './ConfettiCanvas';
import { Sparkles, X } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export const RewardPopup: React.FC = () => {
  const { activeReward, dismissReward } = useApp();

  if (!activeReward) return null;

  const handleDismiss = () => {
    soundEffects.playPop();
    dismissReward();
  };

  return (
    <>
      <ConfettiCanvas active={true} durationMs={3500} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
        <div className="relative w-full max-w-md bg-gradient-to-b from-amber-50 via-white to-pink-50 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-yellow-300 text-center animate-pop-in">
          
          {/* Close Button */}
          <button
            onClick={handleDismiss}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Big Bouncy Mascot / Icon */}
          <div className="relative mx-auto mb-4 w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 border-4 border-white shadow-lg animate-bounce">
            <span className="text-5xl select-none">{activeReward.icon || '⭐'}</span>
            <div className="absolute -top-2 -right-2 text-2xl animate-spin" style={{ animationDuration: '4s' }}>
              ✨
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bubble text-2xl sm:text-3xl font-extrabold text-amber-900 mb-2">
            {activeReward.title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 font-medium text-sm sm:text-base mb-6">
            {activeReward.description}
          </p>

          {/* Star & Coin Rewards Tally */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-amber-100 border-2 border-amber-300 px-4 py-2 rounded-2xl shadow-sm">
              <span className="text-2xl">⭐</span>
              <span className="font-bubble font-bold text-amber-900 text-lg">
                +{activeReward.stars} Stars
              </span>
            </div>
            {activeReward.coins && (
              <div className="flex items-center gap-2 bg-purple-100 border-2 border-purple-300 px-4 py-2 rounded-2xl shadow-sm">
                <span className="text-2xl">🪙</span>
                <span className="font-bubble font-bold text-purple-900 text-lg">
                  +{activeReward.coins} Coins
                </span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleDismiss}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-bubble font-bold text-xl rounded-2xl shadow-candy-green btn-bounce flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles size={24} />
            <span>Awesome! Keep Learning!</span>
          </button>
        </div>
      </div>
    </>
  );
};
