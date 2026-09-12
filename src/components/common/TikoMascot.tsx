import React, { useState } from 'react';
import { speechEngine } from '../../utils/speech';
import { soundEffects } from '../../utils/soundEffects';
import { Volume2 } from 'lucide-react';

export type TikoEmotion = 'greeting' | 'cheering' | 'correct' | 'encourage' | 'thinking' | 'idle';
export type TikoMood = 'idle' | 'happy' | 'thinking' | 'celebrate';

const moodToEmotion: Record<TikoMood, TikoEmotion> = {
  idle: 'idle',
  happy: 'cheering',
  thinking: 'thinking',
  celebrate: 'correct'
};

interface TikoMascotProps {
  message?: string;
  emotion?: TikoEmotion;
  mood?: TikoMood;
  size?: 'sm' | 'md' | 'lg';
  showBubble?: boolean;
  className?: string;
  lang?: 'en' | 'hi';
  speechText?: string;
  onSpeak?: () => void;
}

export const TikoMascot: React.FC<TikoMascotProps> = ({
  message,
  emotion,
  mood,
  size = 'md',
  showBubble = true,
  className = '',
  lang = 'en',
  speechText,
  onSpeak
}) => {
  const [isWaving, setIsWaving] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const displayMessage = message ?? speechText ?? "Hi! I'm Tiko! Let's learn & play together! 🧸";
  const resolvedEmotion = emotion ?? (mood ? moodToEmotion[mood] : 'greeting');

  const handleTikoClick = () => {
    soundEffects.playPop();
    setIsWaving(true);
    setIsSpeaking(true);

    if (onSpeak) {
      onSpeak();
      setIsSpeaking(false);
      setTimeout(() => setIsWaving(false), 600);
      return;
    }

    speechEngine.speak(
      displayMessage.replace(/[^\w\s\u0900-\u097F]/gi, ''),
      lang,
      () => {
        setIsSpeaking(false);
        setTimeout(() => setIsWaving(false), 600);
      }
    );
  };

  const emotionEmojis = {
    greeting: '👋',
    cheering: '⭐',
    correct: '🎉',
    encourage: '❤️',
    thinking: '💡',
    idle: '✨'
  }[resolvedEmotion];

  const sizeClasses = {
    sm: 'w-16 h-16 text-3xl',
    md: 'w-24 h-24 text-5xl',
    lg: 'w-32 h-32 text-6xl'
  }[size];

  const bubbleTextSizes = {
    sm: 'text-xs max-w-xs',
    md: 'text-sm sm:text-base max-w-sm',
    lg: 'text-base sm:text-lg max-w-md'
  }[size];

  return (
    <div className={`relative flex items-center gap-3 sm:gap-4 select-none ${className}`}>
      
      {/* Tiko Teddy Bear Avatar */}
      <div
        onClick={handleTikoClick}
        title="Tap Tiko to hear him speak!"
        className={`relative ${sizeClasses} rounded-3xl bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-100 border-4 border-amber-400 shadow-toy-yellow flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group shrink-0`}
      >
        {/* Cute Teddy Bear with expression */}
        <span className={`transition-transform duration-300 ${isWaving ? 'animate-wiggle scale-110' : 'animate-bounce-slow'}`}>
          🧸
        </span>

        {/* Emotion mini-badge on shoulder */}
        <span className="absolute -top-2 -right-2 text-xl bg-white rounded-full p-1 border-2 border-amber-300 shadow-sm animate-bounce" style={{ animationDuration: '2s' }}>
          {emotionEmojis}
        </span>

        {/* Name tag pill */}
        <span className="absolute -bottom-2 bg-amber-500 text-amber-950 font-bubble font-black text-[10px] px-2 py-0.5 rounded-full border border-amber-300 shadow-sm">
          Tiko
        </span>
      </div>

      {/* Tiko Speech Bubble */}
      {showBubble && (
        <div
          onClick={handleTikoClick}
          className={`relative bg-white border-3 border-amber-300 rounded-3xl p-3.5 sm:p-4 shadow-md cursor-pointer hover:border-amber-400 transition-all ${bubbleTextSizes} animate-pop-in`}
        >
          {/* Speech Bubble Arrow */}
          <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-amber-300" />
          <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-white" />

          <div className="flex items-center justify-between gap-2">
            <p className="font-bubble font-bold text-slate-800 leading-snug">
              {displayMessage}
            </p>
            <div className="shrink-0 text-amber-500 hover:text-amber-600 bg-amber-100 p-1.5 rounded-xl">
              <Volume2 size={16} className={isSpeaking ? 'animate-bounce text-pink-500' : ''} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
