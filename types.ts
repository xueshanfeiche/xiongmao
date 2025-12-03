export interface HanziChar {
  id: number;
  char: string;
  pinyin: string;
  meaning: string;
  example: string; // Example phrase
  level: number; // Difficulty level 1-5
}

export interface UserProgress {
  unlockedIndex: number; // The highest index available to learn (global linear progress)
  mastery: Record<number, number>; // charId -> mastery score (0-100)
  stars: number; // Currency/Points
  streak: number;
  lastLoginDate: string;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  LEVEL_SELECT = 'LEVEL_SELECT',
  LEARN = 'LEARN',
  REVIEW = 'REVIEW'
}

export interface QuizQuestion {
  targetChar: HanziChar;
  options: HanziChar[]; // 3 wrong, 1 right
}