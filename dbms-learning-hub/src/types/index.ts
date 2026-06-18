// ============================================================
// DBMS Learning Hub – TypeScript Types & Interfaces
// ============================================================

// ─── Quiz ───────────────────────────────────────────────────
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface QuizSession {
  startedAt: number;
  completedAt?: number;
  results: QuizResult[];
  score: number;
  totalQuestions: number;
}

// ─── Viva ────────────────────────────────────────────────────
export interface VivaQuestion {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// ─── Revision Cards ─────────────────────────────────────────
export interface RevisionCard {
  id: string;
  title: string;
  content: string;
  emoji: string;
  category: string;
  color: string;
}

// ─── Flashcard ───────────────────────────────────────────────
export interface Flashcard {
  id: string;
  term: string;
  simpleMeaning: string;
  examMeaning: string;
  emoji: string;
}

// ─── Playground / DB Simulator ───────────────────────────────
export interface DBRecord {
  id: string;
  rollNo: string;
  name: string;
  branch: string;
  [key: string]: string;
}

export interface DBOperation {
  type: 'INSERT' | 'UPDATE' | 'DELETE' | 'SEARCH' | 'RESET' | 'IMPORT';
  timestamp: number;
  details: string;
  success: boolean;
}

// ─── Progress ────────────────────────────────────────────────
export interface TopicProgress {
  topicId: string;
  title: string;
  visited: boolean;
  visitedAt?: number;
  timeSpent: number;
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlockedAt?: number;
  unlocked: boolean;
}

export interface ProgressState {
  topicsVisited: Record<string, TopicProgress>;
  quizSessions: QuizSession[];
  playgroundOperations: DBOperation[];
  revisionCardsViewed: string[];
  flashcardsViewed: string[];
  achievements: Achievement[];
  totalTimeSpent: number;
  lastVisited?: number;
}

// ─── Search ─────────────────────────────────────────────────
export interface SearchItem {
  id: string;
  type: 'topic' | 'definition' | 'quiz' | 'viva' | 'module' | 'section';
  title: string;
  content: string;
  url: string;
  sectionId?: string;
  icon?: string;
}

// ─── Navigation ─────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  children?: NavItem[];
}

// ─── DBMS App Cards ─────────────────────────────────────────
export interface AppCard {
  name: string;
  emoji: string;
  color: string;
  gradient: string;
  storedData: string[];
  description: string;
}

// ─── Industry Software ──────────────────────────────────────
export interface IndustrySoftware {
  name: string;
  logo: string;
  color: string;
  usedBy: string[];
  benefits: string[];
  popularity: number;
  type: string;
}
