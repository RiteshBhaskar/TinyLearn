import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speechEngine } from '../../utils/speech';
import { soundEffects } from '../../utils/soundEffects';
import { useApp } from '../../context/AppContext';

interface SpeechButtonProps {
  text: string;
  lang?: 'en' | 'hi';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'pill' | 'icon-only';
  label?: string;
  className?: string;
  onSpeakStart?: () => void;
  onSpeakEnd?: () => void;
}

export const SpeechButton: React.FC<SpeechButtonProps> = ({
  text,
  lang = 'en',
  size = 'md',
  variant = 'primary',
  label,
  className = '',
  onSpeakStart,
  onSpeakEnd
}) => {
  const { progress } = useApp();
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playPop();

    if (!progress.speechEnabled) return;

    setSpeaking(true);
    if (onSpeakStart) onSpeakStart();

    speechEngine.speak(
      text,
      lang,
      () => {
        setSpeaking(false);
        if (onSpeakEnd) onSpeakEnd();
      }
    );
  };

  const sizeClasses = {
    sm: 'p-2 text-xs gap-1.5 min-h-[36px]',
    md: 'px-4 py-2 text-sm gap-2 min-h-[44px]',
    lg: 'px-5 py-3 text-base gap-2.5 min-h-[52px]',
    xl: 'px-6 py-4 text-xl gap-3 min-h-[64px]'
  }[size];

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 30
  }[size];

  return (
    <button
      onClick={handleSpeak}
      title={progress.speechEnabled ? `Listen: "${text}"` : 'Speech is disabled in settings'}
      aria-label={`Listen to ${text}`}
      className={`relative inline-flex items-center justify-center font-bubble font-bold rounded-2xl cursor-pointer btn-bounce select-none ${
        speaking ? 'ring-4 ring-pink-400 bg-pink-500 text-white scale-105' : 'bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-candy-yellow'
      } ${sizeClasses} ${className}`}
    >
      {progress.speechEnabled ? (
        <Volume2
          size={iconSizes}
          className={`${speaking ? 'animate-bounce text-white' : 'text-amber-900'}`}
        />
      ) : (
        <VolumeX size={iconSizes} className="text-amber-900 opacity-60" />
      )}
      
      {label && <span>{speaking ? 'Speaking...' : label}</span>}
      
      {speaking && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
        </span>
      )}
    </button>
  );
};
