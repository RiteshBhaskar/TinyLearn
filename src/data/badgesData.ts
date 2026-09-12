import { Badge } from '../types';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first-step',
    title: 'First Explorer 🌟',
    description: 'Completed your very first lesson on TinyLearn!',
    icon: '🌟',
    category: 'general',
    requirement: 'Complete any 1 lesson',
    unlocked: true,
    unlockedAt: 'Welcome Gift',
    color: '#F59E0B'
  },
  {
    id: 'abc-master',
    title: 'ABC Master 🔤',
    description: 'Explored all 26 English alphabet letters!',
    icon: '🔤',
    category: 'english',
    requirement: 'Learn all 26 English letters',
    unlocked: false,
    color: '#3B82F6'
  },
  {
    id: 'number-star',
    title: 'Number Star 🔢',
    description: 'Mastered counting numbers 1 to 20!',
    icon: '🔢',
    category: 'numbers',
    requirement: 'Learn numbers 1 to 20',
    unlocked: false,
    color: '#10B981'
  },
  {
    id: 'hindi-hero',
    title: 'Hindi Hero 🇮🇳',
    description: 'Learned Hindi Swar and Vyanjan characters!',
    icon: '🇮🇳',
    category: 'hindi',
    requirement: 'Explore at least 15 Hindi letters',
    unlocked: false,
    color: '#F97316'
  },
  {
    id: 'tracing-pro',
    title: 'Tracing Artist 🎨',
    description: 'Practiced drawing and tracing letters on the canvas!',
    icon: '🎨',
    category: 'english',
    requirement: 'Trace 5 letters or numbers',
    unlocked: false,
    color: '#EC4899'
  },
  {
    id: 'quiz-champion',
    title: 'Quiz Champion 🏆',
    description: 'Scored 80% or higher in the Practice Quiz!',
    icon: '🏆',
    category: 'general',
    requirement: 'Score 80%+ in a 10-question quiz',
    unlocked: false,
    color: '#EAB308'
  },
  {
    id: 'star-collector',
    title: 'Star Collector ⭐',
    description: 'Collected 50 or more shining golden stars!',
    icon: '⭐',
    category: 'general',
    requirement: 'Earn 50 Total Stars',
    unlocked: false,
    color: '#FBBF24'
  },
  {
    id: 'streak-champ',
    title: 'Daily Learner 🔥',
    description: 'Practiced for multiple days in a row!',
    icon: '🔥',
    category: 'streak',
    requirement: 'Build a 3-day learning streak',
    unlocked: false,
    color: '#EF4444'
  },
  {
    id: 'super-scholar',
    title: 'Super Scholar 🎓',
    description: 'True genius! Mastered English, Numbers & Hindi!',
    icon: '🎓',
    category: 'general',
    requirement: 'Complete 70%+ in all 3 subjects',
    unlocked: false,
    color: '#8B5CF6'
  }
];
