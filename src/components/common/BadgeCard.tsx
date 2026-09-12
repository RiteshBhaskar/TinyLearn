import React from 'react';
import { Badge } from '../../types';
import { Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

interface BadgeCardProps {
  badge: Badge;
  onSelect?: (badge: Badge) => void;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge, onSelect }) => {
  const handleClick = () => {
    if (badge.unlocked) {
      soundEffects.playSparkle();
    } else {
      soundEffects.playPop();
    }
    if (onSelect) onSelect(badge);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative rounded-3xl p-5 border-3 transition-all duration-300 select-none cursor-pointer ${
        badge.unlocked
          ? 'bg-gradient-to-b from-white via-amber-50/50 to-amber-100/60 border-amber-300 shadow-candy-yellow hover:scale-105'
          : 'bg-slate-100/80 border-slate-200 opacity-70 hover:opacity-90 hover:scale-102'
      }`}
    >
      {/* Top Tag */}
      <div className="flex justify-between items-center mb-3">
        <span
          className={`text-xs font-bubble font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
            badge.unlocked
              ? 'bg-amber-400 text-amber-950 shadow-sm'
              : 'bg-slate-200 text-slate-500'
          }`}
        >
          {badge.category}
        </span>

        {badge.unlocked ? (
          <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 size={13} />
            <span>Unlocked</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-slate-400 font-bold text-xs bg-slate-200/70 px-2 py-0.5 rounded-full">
            <Lock size={12} />
            <span>Locked</span>
          </div>
        )}
      </div>

      {/* Large Badge Icon */}
      <div className="flex justify-center my-3">
        <div
          className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-md border-2 transition-transform duration-300 ${
            badge.unlocked
              ? 'bg-gradient-to-tr from-amber-200 to-yellow-100 border-yellow-300 animate-pulse-slow'
              : 'bg-slate-200 border-slate-300 grayscale'
          }`}
        >
          {badge.icon}
        </div>
      </div>

      {/* Title & Description */}
      <div className="text-center mt-2">
        <h4 className={`font-bubble font-bold text-lg mb-1 ${badge.unlocked ? 'text-slate-800' : 'text-slate-500'}`}>
          {badge.title}
        </h4>
        <p className="text-xs text-slate-600 font-medium line-clamp-2">
          {badge.description}
        </p>

        {/* Unlock Requirement info */}
        <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500">
          <Sparkles size={12} className={badge.unlocked ? 'text-amber-500' : 'text-slate-400'} />
          <span>{badge.requirement}</span>
        </div>
      </div>
    </div>
  );
};
