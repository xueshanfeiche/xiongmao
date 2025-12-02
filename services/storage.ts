import { UserProgress } from '../types';
import { INITIAL_PROGRESS } from '../constants';

const STORAGE_KEY = 'panda_hanzi_progress_v1';

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress", e);
  }
};

export const loadProgress = (): UserProgress => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Basic check to ensure structure matches
      return { ...INITIAL_PROGRESS, ...parsed };
    }
  } catch (e) {
    console.error("Failed to load progress", e);
  }
  return INITIAL_PROGRESS;
};

export const updateMastery = (
  currentProgress: UserProgress, 
  charId: number, 
  isCorrect: boolean
): UserProgress => {
  const currentMastery = currentProgress.mastery[charId] || 0;
  let newMastery = currentMastery;

  if (isCorrect) {
    newMastery = Math.min(100, currentMastery + 20); // Increase by 20%
  } else {
    newMastery = Math.max(0, currentMastery - 10); // Decrease by 10%
  }

  // Check if we should unlock the next character
  // Logic: If user masters the current unlocked character > 60%, unlock next
  let newUnlockedIndex = currentProgress.unlockedIndex;
  // Get the ID of the character currently at the edge of unlocked
  // For simplicity in this demo, unlockedIndex corresponds to HANZI_DATA array index
  
  if (isCorrect && newMastery >= 60 && charId === (currentProgress.unlockedIndex + 1)) {
     // If we just practiced the latest character and got it good
     newUnlockedIndex++;
  }

  const newProgress = {
    ...currentProgress,
    mastery: {
      ...currentProgress.mastery,
      [charId]: newMastery,
    },
    stars: isCorrect ? currentProgress.stars + 1 : currentProgress.stars,
    unlockedIndex: Math.max(currentProgress.unlockedIndex, newUnlockedIndex)
  };

  saveProgress(newProgress);
  return newProgress;
};