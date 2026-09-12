import React from 'react';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  color?: 'blue' | 'green' | 'pink' | 'purple' | 'orange' | 'yellow';
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animate?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  color = 'blue',
  height = 'md',
  showLabel = true,
  className = ''
}) => {
  const clamped = Math.min(100, Math.max(0, Math.round(percentage)));

  const colorGradients = {
    blue: 'from-sky-400 to-blue-500',
    green: 'from-emerald-400 to-teal-500',
    pink: 'from-pink-400 to-rose-500',
    purple: 'from-purple-400 to-indigo-500',
    orange: 'from-amber-400 to-orange-500',
    yellow: 'from-yellow-300 to-amber-400'
  }[color];

  const heightClasses = {
    sm: 'h-3',
    md: 'h-5',
    lg: 'h-7'
  }[height];

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5 font-bubble font-semibold text-slate-700 text-sm">
          <span>{label || 'Progress'}</span>
          <span className="font-bold text-slate-900 bg-white/80 px-2 py-0.5 rounded-full shadow-sm text-xs">
            {clamped}%
          </span>
        </div>
      )}
      <div className={`w-full bg-slate-200/80 rounded-full p-1 shadow-inner overflow-hidden ${heightClasses} flex items-center`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorGradients} transition-all duration-700 ease-out shadow-sm relative overflow-hidden`}
          style={{ width: `${clamped}%` }}
        >
          {/* Candy striped light shine effect */}
          <div className="absolute inset-0 bg-white/25 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[move-bg_2s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
};
