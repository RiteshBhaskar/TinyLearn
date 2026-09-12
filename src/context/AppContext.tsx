import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UserProgress, QuizResult, DailyGoal, Badge } from '../types';
import { INITIAL_BADGES } from '../data/badgesData';
import { soundEffects } from '../utils/soundEffects';
import { speechEngine } from '../utils/speech';

interface AppContextType {
  progress: UserProgress;
  badges: Badge[];
  activeReward: {
    type: 'stars' | 'badge' | 'quiz' | 'goal';
    title: string;
    stars: number;
    coins?: number;
    icon: string;
    description: string;
  } | null;
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  addStars: (stars: number, coins?: number, sound?: boolean) => void;
  markEnglishLearned: (letterId: string) => void;
  markNumberLearned: (numberId: number) => void;
  markHindiLearned: (letterId: string) => void;
  markTracingCompleted: (itemId: string) => void;
  recordQuizResult: (result: Omit<QuizResult, 'id' | 'date'>) => void;
  toggleSound: () => void;
  toggleSpeech: () => void;
  claimDailyGoal: (goalId: string) => void;
  dismissReward: () => void;
  resetAllProgress: () => void;
  loadDemoProgress: () => void;
}

const STORAGE_KEY = 'tinylearn_user_data_v1';

const getTodayDateString = () => {
  return new Date().toISOString().split('T')[0];
};

const getDefaultDailyGoals = (): DailyGoal[] => [
  {
    id: 'goal-english',
    text: 'Learn 5 English Letters',
    subject: 'english',
    target: 5,
    current: 0,
    completed: false,
    rewardStars: 10
  },
  {
    id: 'goal-numbers',
    text: 'Learn Numbers 1 to 10',
    subject: 'numbers',
    target: 10,
    current: 0,
    completed: false,
    rewardStars: 10
  },
  {
    id: 'goal-hindi',
    text: 'Practice 5 Hindi Letters',
    subject: 'hindi',
    target: 5,
    current: 0,
    completed: false,
    rewardStars: 10
  }
];

const defaultInitialProgress: UserProgress = {
  stars: 25,
  coins: 50,
  currentStreak: 1,
  lastActiveDate: getTodayDateString(),
  englishCompleted: ['A', 'B', 'C'],
  numbersCompleted: [1, 2, 3],
  hindiCompleted: ['h-a', 'h-aa'],
  tracingCompleted: ['A'],
  quizHistory: [],
  unlockedBadges: ['first-step'],
  dailyGoals: getDefaultDailyGoals(),
  dailyGoalsDate: getTodayDateString(),
  soundEnabled: true,
  speechEnabled: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Refresh daily goals if new day
        const today = getTodayDateString();
        if (parsed.dailyGoalsDate !== today) {
          parsed.dailyGoals = getDefaultDailyGoals();
          parsed.dailyGoalsDate = today;
          // Calculate streak
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          if (parsed.lastActiveDate === yesterdayStr) {
            parsed.currentStreak = (parsed.currentStreak || 1) + 1;
          } else if (parsed.lastActiveDate !== today) {
            parsed.currentStreak = 1;
          }
          parsed.lastActiveDate = today;
        }
        return { ...defaultInitialProgress, ...parsed };
      }
    } catch {
      // localStorage error fallback
    }
    return defaultInitialProgress;
  });

  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [activeReward, setActiveReward] = useState<AppContextType['activeReward']>(null);

  // Sync sound engines with state
  useEffect(() => {
    soundEffects.setSoundEnabled(progress.soundEnabled);
  }, [progress.soundEnabled]);

  useEffect(() => {
    speechEngine.setSpeechEnabled(progress.speechEnabled);
  }, [progress.speechEnabled]);

  // Save to localStorage whenever progress updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // LocalStorage error
    }
  }, [progress]);

  // Check and trigger badge unlocks
  useEffect(() => {
    const newlyUnlocked: string[] = [];

    // ABC Master: 26 letters
    if (progress.englishCompleted.length >= 26 && !progress.unlockedBadges.includes('abc-master')) {
      newlyUnlocked.push('abc-master');
    }

    // Number Star: 20 numbers
    if (progress.numbersCompleted.length >= 20 && !progress.unlockedBadges.includes('number-star')) {
      newlyUnlocked.push('number-star');
    }

    // Hindi Hero: 15+ letters
    if (progress.hindiCompleted.length >= 15 && !progress.unlockedBadges.includes('hindi-hero')) {
      newlyUnlocked.push('hindi-hero');
    }

    // Tracing Artist: 5+ tracings
    if (progress.tracingCompleted.length >= 5 && !progress.unlockedBadges.includes('tracing-pro')) {
      newlyUnlocked.push('tracing-pro');
    }

    // Star Collector: 50+ stars
    if (progress.stars >= 50 && !progress.unlockedBadges.includes('star-collector')) {
      newlyUnlocked.push('star-collector');
    }

    // Daily Learner: 3-day streak
    if (progress.currentStreak >= 3 && !progress.unlockedBadges.includes('streak-champ')) {
      newlyUnlocked.push('streak-champ');
    }

    // Super Scholar
    if (
      progress.englishCompleted.length >= 18 &&
      progress.numbersCompleted.length >= 15 &&
      progress.hindiCompleted.length >= 15 &&
      !progress.unlockedBadges.includes('super-scholar')
    ) {
      newlyUnlocked.push('super-scholar');
    }

    if (newlyUnlocked.length > 0) {
      const badgeToCelebrate = INITIAL_BADGES.find(b => b.id === newlyUnlocked[0]);
      setProgress(prev => ({
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, ...newlyUnlocked]
      }));

      if (badgeToCelebrate) {
        soundEffects.playFanfare();
        setActiveReward({
          type: 'badge',
          title: `New Badge: ${badgeToCelebrate.title}`,
          stars: 20,
          coins: 50,
          icon: badgeToCelebrate.icon,
          description: badgeToCelebrate.description
        });
      }
    }
  }, [
    progress.englishCompleted,
    progress.numbersCompleted,
    progress.hindiCompleted,
    progress.tracingCompleted,
    progress.stars,
    progress.currentStreak,
    progress.unlockedBadges
  ]);

  const addStars = (stars: number, coins: number = stars * 2, sound: boolean = true) => {
    if (sound) soundEffects.playSparkle();
    setProgress(prev => ({
      ...prev,
      stars: prev.stars + stars,
      coins: prev.coins + coins
    }));
  };

  const markEnglishLearned = (letterId: string) => {
    setProgress(prev => {
      const isAlreadyLearned = prev.englishCompleted.includes(letterId);
      const updatedList = isAlreadyLearned ? prev.englishCompleted : [...prev.englishCompleted, letterId];
      
      // Update daily goal
      const updatedGoals = prev.dailyGoals.map(goal => {
        if (goal.subject === 'english') {
          const nextCount = Math.min(goal.target, goal.current + (isAlreadyLearned ? 0 : 1));
          return {
            ...goal,
            current: nextCount,
            completed: nextCount >= goal.target
          };
        }
        return goal;
      });

      return {
        ...prev,
        englishCompleted: updatedList,
        dailyGoals: updatedGoals,
        stars: isAlreadyLearned ? prev.stars : prev.stars + 2,
        coins: isAlreadyLearned ? prev.coins : prev.coins + 5
      };
    });
  };

  const markNumberLearned = (numberId: number) => {
    setProgress(prev => {
      const isAlreadyLearned = prev.numbersCompleted.includes(numberId);
      const updatedList = isAlreadyLearned ? prev.numbersCompleted : [...prev.numbersCompleted, numberId];

      const updatedGoals = prev.dailyGoals.map(goal => {
        if (goal.subject === 'numbers') {
          const nextCount = Math.min(goal.target, goal.current + (isAlreadyLearned ? 0 : 1));
          return {
            ...goal,
            current: nextCount,
            completed: nextCount >= goal.target
          };
        }
        return goal;
      });

      return {
        ...prev,
        numbersCompleted: updatedList,
        dailyGoals: updatedGoals,
        stars: isAlreadyLearned ? prev.stars : prev.stars + 2,
        coins: isAlreadyLearned ? prev.coins : prev.coins + 5
      };
    });
  };

  const markHindiLearned = (letterId: string) => {
    setProgress(prev => {
      const isAlreadyLearned = prev.hindiCompleted.includes(letterId);
      const updatedList = isAlreadyLearned ? prev.hindiCompleted : [...prev.hindiCompleted, letterId];

      const updatedGoals = prev.dailyGoals.map(goal => {
        if (goal.subject === 'hindi') {
          const nextCount = Math.min(goal.target, goal.current + (isAlreadyLearned ? 0 : 1));
          return {
            ...goal,
            current: nextCount,
            completed: nextCount >= goal.target
          };
        }
        return goal;
      });

      return {
        ...prev,
        hindiCompleted: updatedList,
        dailyGoals: updatedGoals,
        stars: isAlreadyLearned ? prev.stars : prev.stars + 2,
        coins: isAlreadyLearned ? prev.coins : prev.coins + 5
      };
    });
  };

  const markTracingCompleted = (itemId: string) => {
    setProgress(prev => {
      const isAlreadyDone = prev.tracingCompleted.includes(itemId);
      return {
        ...prev,
        tracingCompleted: isAlreadyDone ? prev.tracingCompleted : [...prev.tracingCompleted, itemId],
        stars: isAlreadyDone ? prev.stars : prev.stars + 5,
        coins: isAlreadyDone ? prev.coins : prev.coins + 10
      };
    });
  };

  const recordQuizResult = (resultData: Omit<QuizResult, 'id' | 'date'>) => {
    const newResult: QuizResult = {
      ...resultData,
      id: 'quiz-' + Date.now(),
      date: new Date().toLocaleDateString()
    };

    setProgress(prev => {
      const percentage = (newResult.score / newResult.totalQuestions) * 100;
      const updatedBadges = [...prev.unlockedBadges];
      if (percentage >= 80 && !updatedBadges.includes('quiz-champion')) {
        updatedBadges.push('quiz-champion');
      }

      return {
        ...prev,
        quizHistory: [newResult, ...prev.quizHistory].slice(0, 20),
        stars: prev.stars + newResult.starsEarned,
        coins: prev.coins + newResult.starsEarned * 2,
        unlockedBadges: updatedBadges
      };
    });
  };

  const toggleSound = () => {
    setProgress(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const toggleSpeech = () => {
    setProgress(prev => ({ ...prev, speechEnabled: !prev.speechEnabled }));
  };

  const claimDailyGoal = (goalId: string) => {
    const goal = progress.dailyGoals.find(g => g.id === goalId);
    if (!goal || !goal.completed) return;

    soundEffects.playFanfare();
    addStars(goal.rewardStars, goal.rewardStars * 2, false);

    setActiveReward({
      type: 'goal',
      title: 'Daily Goal Completed! 🎉',
      stars: goal.rewardStars,
      coins: goal.rewardStars * 2,
      icon: '🎯',
      description: `Great job completing "${goal.text}" today!`
    });

    setProgress(prev => ({
      ...prev,
      dailyGoals: prev.dailyGoals.map(g => (g.id === goalId ? { ...g, claimed: true } : g))
    }));
  };

  const dismissReward = () => {
    setActiveReward(null);
  };

  const resetAllProgress = () => {
    const fresh: UserProgress = {
      ...defaultInitialProgress,
      stars: 0,
      coins: 0,
      currentStreak: 1,
      englishCompleted: [],
      numbersCompleted: [],
      hindiCompleted: [],
      tracingCompleted: [],
      quizHistory: [],
      unlockedBadges: ['first-step'],
      dailyGoals: getDefaultDailyGoals(),
      dailyGoalsDate: getTodayDateString(),
    };
    setProgress(fresh);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch {
      // error fallback
    }
  };

  const loadDemoProgress = () => {
    const demo: UserProgress = {
      stars: 145,
      coins: 320,
      currentStreak: 5,
      lastActiveDate: getTodayDateString(),
      englishCompleted: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'],
      numbersCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      hindiCompleted: ['h-a', 'h-aa', 'h-i', 'h-ee', 'h-u', 'h-oo', 'h-ka', 'h-kha', 'h-ga', 'h-gha', 'h-cha', 'h-ta', 'h-pa', 'h-ma'],
      tracingCompleted: ['A', 'B', 'C', '1', '2', '3'],
      quizHistory: [
        { id: 'q-1', date: 'Today', subject: 'Mixed', difficulty: 'easy', score: 9, totalQuestions: 10, starsEarned: 18 },
        { id: 'q-2', date: 'Yesterday', subject: 'English', difficulty: 'medium', score: 8, totalQuestions: 10, starsEarned: 16 },
        { id: 'q-3', date: '2 days ago', subject: 'Numbers', difficulty: 'easy', score: 10, totalQuestions: 10, starsEarned: 20 },
      ],
      unlockedBadges: ['first-step', 'quiz-champion', 'tracing-pro', 'star-collector', 'streak-champ'],
      dailyGoals: [
        { id: 'goal-english', text: 'Learn 5 English Letters', subject: 'english', target: 5, current: 5, completed: true, rewardStars: 10 },
        { id: 'goal-numbers', text: 'Learn Numbers 1 to 10', subject: 'numbers', target: 10, current: 8, completed: false, rewardStars: 10 },
        { id: 'goal-hindi', text: 'Practice 5 Hindi Letters', subject: 'hindi', target: 5, current: 5, completed: true, rewardStars: 10 }
      ],
      dailyGoalsDate: getTodayDateString(),
      soundEnabled: true,
      speechEnabled: true,
    };
    setProgress(demo);
    soundEffects.playFanfare();
  };

  const badges = INITIAL_BADGES.map(badge => ({
    ...badge,
    unlocked: progress.unlockedBadges.includes(badge.id)
  }));

  return (
    <AppContext.Provider
      value={{
        progress,
        badges,
        activeReward,
        currentRoute,
        setCurrentRoute,
        addStars,
        markEnglishLearned,
        markNumberLearned,
        markHindiLearned,
        markTracingCompleted,
        recordQuizResult,
        toggleSound,
        toggleSpeech,
        claimDailyGoal,
        dismissReward,
        resetAllProgress,
        loadDemoProgress
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
