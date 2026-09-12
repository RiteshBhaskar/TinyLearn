import React from 'react';

export const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Soft Sunny Light Halos */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-yellow-200 via-amber-100 to-transparent opacity-60 blur-3xl" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-gradient-to-bl from-pink-200 via-purple-100 to-transparent opacity-40 blur-3xl" />
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-sky-200 via-teal-100 to-transparent opacity-40 blur-3xl" />

      {/* Drifting Puffy Clouds */}
      <div
        className="absolute top-12 left-[-150px] opacity-75 animate-cloud-drift flex items-center"
        style={{ animationDuration: '38s' }}
      >
        <svg width="140" height="70" viewBox="0 0 120 60" fill="none">
          <path
            d="M20 45 C10 45 5 35 15 28 C15 15 35 10 45 20 C55 10 80 12 85 24 C95 18 110 26 105 40 C115 48 105 55 95 52 L20 52 Z"
            fill="#FFFFFF"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.04))"
          />
        </svg>
      </div>

      <div
        className="absolute top-48 left-[-180px] opacity-60 animate-cloud-drift flex items-center"
        style={{ animationDuration: '48s', animationDelay: '12s' }}
      >
        <svg width="180" height="90" viewBox="0 0 120 60" fill="none">
          <path
            d="M20 45 C10 45 5 35 15 28 C15 15 35 10 45 20 C55 10 80 12 85 24 C95 18 110 26 105 40 C115 48 105 55 95 52 L20 52 Z"
            fill="#FFFFFF"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.03))"
          />
        </svg>
      </div>

      {/* Floating Animated Balloons */}
      <div className="absolute top-1/4 left-6 text-3xl opacity-70 animate-float" style={{ animationDuration: '6s' }}>
        🎈
      </div>
      <div className="absolute top-2/3 right-8 text-3xl opacity-70 animate-float" style={{ animationDuration: '7.5s', animationDelay: '1.5s' }}>
        🎈
      </div>

      {/* Smiling Stars & Rainbow */}
      <div className="absolute top-28 right-16 text-3xl opacity-80 animate-wiggle" style={{ animationDuration: '3s' }}>
        ⭐
      </div>
      <div className="absolute top-3/4 left-12 text-2xl opacity-75 animate-bounce-slow" style={{ animationDuration: '4s', animationDelay: '0.8s' }}>
        🌟
      </div>
      <div className="absolute bottom-24 right-1/4 text-3xl opacity-60 animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }}>
        🌈
      </div>

      {/* Fluttering Butterflies & Sparkles */}
      <div className="absolute top-1/2 left-1/5 text-2xl opacity-70 animate-float" style={{ animationDuration: '5s', animationDelay: '3s' }}>
        🦋
      </div>
      <div className="absolute bottom-1/3 right-1/3 text-2xl opacity-70 animate-bounce-slow" style={{ animationDuration: '6s', animationDelay: '2.5s' }}>
        ✨
      </div>
    </div>
  );
};
