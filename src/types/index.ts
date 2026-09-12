export type SubjectType = 'english' | 'numbers' | 'hindi';

export interface EnglishLetter {
  id: string;
  letter: string;
  lowerLetter: string;
  word: string;
  phonetic: string;
  emoji: string;
  color: string;
  bgLight: string;
  borderColor: string;
  exampleSentence: string;
  funFact?: string;
}

export interface NumberItem {
  id: number;
  number: number;
  word: string;
  hindiWord: string;
  emoji: string;
  color: string;
  bgLight: string;
  borderColor: string;
  objects: string[];
  funFact: string;
}

export interface HindiLetter {
  id: string;
  letter: string;
  type: 'swar' | 'vyanjan';
  word: string;
  englishMeaning: string;
  phonetic: string;
  emoji: string;
  color: string;
  bgLight: string;
  borderColor: string;
  sentence: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: SubjectType | 'general' | 'streak';
  requirement: string;
  unlocked: boolean;
  unlockedAt?: string;
  color: string;
}

export interface DailyGoal {
  id: string;
  text: string;
  subject: SubjectType | 'practice';
  target: number;
  current: number;
  completed: boolean;
  rewardStars: number;
}

export interface QuizQuestion {
  id: string;
  subject: SubjectType;
  difficulty: 'easy' | 'medium' | 'hard';
  questionText: string;
  subText?: string;
  visualCue?: string;
  audioPrompt?: string;
  options: {
    id: string;
    text: string;
    visual?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface QuizResult {
  id: string;
  date: string;
  subject: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  starsEarned: number;
}

export interface UserProgress {
  stars: number;
  coins: number;
  currentStreak: number;
  lastActiveDate: string;
  englishCompleted: string[]; // letter ids
  numbersCompleted: number[]; // number ids
  hindiCompleted: string[]; // letter ids
  quizHistory: QuizResult[];
  unlockedBadges: string[]; // badge ids
  dailyGoals: DailyGoal[];
  dailyGoalsDate: string;
  soundEnabled: boolean;
  speechEnabled: boolean;
  tracingCompleted: string[];
}
