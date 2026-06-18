// ============================================================
// DBMS Learning Hub – Zustand Progress Store
// ============================================================
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProgressState, TopicProgress, QuizSession, DBOperation, Achievement } from '@/types';

const defaultAchievements: Achievement[] = [
  {
    id: 'first-visit',
    title: 'First Step',
    description: 'Visited your first topic',
    emoji: '🎯',
    unlocked: false,
  },
  {
    id: 'quiz-first',
    title: 'Quiz Taker',
    description: 'Completed your first quiz',
    emoji: '🧩',
    unlocked: false,
  },
  {
    id: 'quiz-perfect',
    title: 'Perfect Score',
    description: 'Scored 100% on a quiz',
    emoji: '🏆',
    unlocked: false,
  },
  {
    id: 'playground-first',
    title: 'Data Explorer',
    description: 'Used the DBMS Playground for the first time',
    emoji: '🎮',
    unlocked: false,
  },
  {
    id: 'viva-master',
    title: 'Viva Ready',
    description: 'Practiced 5 viva questions',
    emoji: '🎤',
    unlocked: false,
  },
  {
    id: 'flashcard-complete',
    title: 'Term Master',
    description: 'Viewed all flashcards',
    emoji: '📚',
    unlocked: false,
  },
  {
    id: 'revision-complete',
    title: 'Quick Reviser',
    description: 'Completed all revision cards',
    emoji: '🚀',
    unlocked: false,
  },
  {
    id: 'all-sections',
    title: 'Complete Learner',
    description: 'Visited all topic sections',
    emoji: '🌟',
    unlocked: false,
  },
];

interface ProgressStore extends ProgressState {
  markTopicVisited: (topicId: string, title: string) => void;
  addQuizSession: (session: QuizSession) => void;
  addPlaygroundOperation: (op: DBOperation) => void;
  markRevisionCardViewed: (cardId: string) => void;
  markFlashcardViewed: (cardId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  addTimeSpent: (seconds: number) => void;
  resetProgress: () => void;
  getQuizAvgScore: () => number;
  getTotalSectionsVisited: () => number;
}

const initialState: ProgressState = {
  topicsVisited: {},
  quizSessions: [],
  playgroundOperations: [],
  revisionCardsViewed: [],
  flashcardsViewed: [],
  achievements: defaultAchievements,
  totalTimeSpent: 0,
  lastVisited: undefined,
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      markTopicVisited: (topicId, title) => {
        set((state) => {
          const existing = state.topicsVisited[topicId];
          const updated: TopicProgress = {
            topicId,
            title,
            visited: true,
            visitedAt: existing?.visitedAt ?? Date.now(),
            timeSpent: existing?.timeSpent ?? 0,
            completed: existing?.completed ?? false,
          };
          return {
            topicsVisited: { ...state.topicsVisited, [topicId]: updated },
            lastVisited: Date.now(),
          };
        });
        // Unlock first-visit achievement
        const state = get();
        if (!state.achievements.find((a) => a.id === 'first-visit')?.unlocked) {
          get().unlockAchievement('first-visit');
        }
      },

      addQuizSession: (session) => {
        set((state) => ({ quizSessions: [...state.quizSessions, session] }));
        const state = get();
        if (!state.achievements.find((a) => a.id === 'quiz-first')?.unlocked) {
          get().unlockAchievement('quiz-first');
        }
        if (session.score === session.totalQuestions) {
          if (!state.achievements.find((a) => a.id === 'quiz-perfect')?.unlocked) {
            get().unlockAchievement('quiz-perfect');
          }
        }
      },

      addPlaygroundOperation: (op) => {
        set((state) => ({
          playgroundOperations: [...state.playgroundOperations.slice(-99), op],
        }));
        const state = get();
        if (state.playgroundOperations.length === 1) {
          if (!state.achievements.find((a) => a.id === 'playground-first')?.unlocked) {
            get().unlockAchievement('playground-first');
          }
        }
      },

      markRevisionCardViewed: (cardId) => {
        set((state) => {
          const viewed = state.revisionCardsViewed.includes(cardId)
            ? state.revisionCardsViewed
            : [...state.revisionCardsViewed, cardId];
          return { revisionCardsViewed: viewed };
        });
      },

      markFlashcardViewed: (cardId) => {
        set((state) => {
          const viewed = state.flashcardsViewed.includes(cardId)
            ? state.flashcardsViewed
            : [...state.flashcardsViewed, cardId];
          return { flashcardsViewed: viewed };
        });
        const state = get();
        // 6 flashcards total
        if (state.flashcardsViewed.length >= 5) {
          if (!state.achievements.find((a) => a.id === 'flashcard-complete')?.unlocked) {
            get().unlockAchievement('flashcard-complete');
          }
        }
      },

      unlockAchievement: (achievementId) => {
        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === achievementId ? { ...a, unlocked: true, unlockedAt: Date.now() } : a
          ),
        }));
      },

      addTimeSpent: (seconds) => {
        set((state) => ({ totalTimeSpent: state.totalTimeSpent + seconds }));
      },

      resetProgress: () => {
        set({ ...initialState, achievements: defaultAchievements });
      },

      getQuizAvgScore: () => {
        const { quizSessions } = get();
        if (!quizSessions.length) return 0;
        const total = quizSessions.reduce(
          (sum, s) => sum + (s.score / s.totalQuestions) * 100,
          0
        );
        return Math.round(total / quizSessions.length);
      },

      getTotalSectionsVisited: () => {
        return Object.keys(get().topicsVisited).length;
      },
    }),
    {
      name: 'dbms-progress-store',
    }
  )
);
