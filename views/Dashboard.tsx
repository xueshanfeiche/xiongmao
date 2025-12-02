import React from 'react';
import { AppView, UserProgress, HanziChar } from '../types';
import { Button } from '../components/Button';
import { Star, BookOpen, Brain, Lock, CheckCircle } from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  data: HanziChar[];
  onChangeView: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ progress, data, onChangeView }) => {
  // Calculate stats
  // Explicitly cast to number[] because Object.values can return unknown[] depending on TS config
  const masteryValues = Object.values(progress.mastery) as number[];
  const masteredCount = masteryValues.filter(m => m >= 80).length;
  const learningCount = masteryValues.filter(m => m > 0 && m < 80).length;
  const totalUnlocked = progress.unlockedIndex + 1;

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-6 rounded-3xl border-4 border-panda-text shadow-[8px_8px_0_#2B2D42]">
        <div>
          <h1 className="text-4xl font-display text-panda-text mb-2">熊猫识字</h1>
          <p className="text-gray-500 font-sans">欢迎回来，小书童！</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center bg-yellow-100 p-3 rounded-2xl border-2 border-yellow-400">
             <Star className="text-yellow-500 w-8 h-8 fill-yellow-500" />
             <span className="font-bold text-yellow-700">{progress.stars}</span>
          </div>
        </div>
      </header>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-3xl border-4 border-blue-200 flex flex-col items-center text-center space-y-4">
          <div className="bg-white p-4 rounded-full border-4 border-blue-200">
            <BookOpen className="w-12 h-12 text-blue-400" />
          </div>
          <h2 className="text-3xl font-display text-panda-text">学习新字</h2>
          <p className="text-gray-600">认识新的汉字，拓展词汇量！</p>
          <Button onClick={() => onChangeView(AppView.LEARN)} variant="primary" size="lg" className="w-full">
            开始学习
          </Button>
        </div>

        <div className="bg-green-50 p-6 rounded-3xl border-4 border-green-200 flex flex-col items-center text-center space-y-4">
          <div className="bg-white p-4 rounded-full border-4 border-green-200">
            <Brain className="w-12 h-12 text-green-400" />
          </div>
          <h2 className="text-3xl font-display text-panda-text">复习闯关</h2>
          <p className="text-gray-600">玩游戏，记汉字，看看你记住了多少！</p>
          <Button onClick={() => onChangeView(AppView.REVIEW)} variant="secondary" size="lg" className="w-full">
            开始挑战
          </Button>
        </div>
      </div>

      {/* Progress Map (Simplified) */}
      <div className="bg-white p-6 rounded-3xl border-4 border-panda-text shadow-[8px_8px_0_#ABD1C6]">
        <h3 className="text-2xl font-display text-panda-text mb-4">学习足迹</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {data.slice(0, totalUnlocked + 5).map((char, index) => {
             const isLocked = index > progress.unlockedIndex;
             const mastery = progress.mastery[char.id] || 0;
             const isMastered = mastery >= 80;
             
             return (
               <div 
                 key={char.id}
                 className={`
                   w-14 h-14 rounded-2xl flex items-center justify-center border-b-4 text-2xl font-bold relative
                   ${isLocked 
                     ? 'bg-gray-200 text-gray-400 border-gray-300' 
                     : isMastered 
                        ? 'bg-green-100 text-green-700 border-green-300' 
                        : 'bg-white text-panda-text border-panda-text'
                    }
                 `}
               >
                 {isLocked ? <Lock size={16} /> : char.char}
                 {isMastered && !isLocked && (
                   <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-0.5">
                     <CheckCircle size={12} className="text-white" />
                   </div>
                 )}
               </div>
             );
          })}
          <div className="w-14 h-14 flex items-center justify-center text-gray-300 text-xl font-display">...</div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          已掌握: {masteredCount} | 学习中: {learningCount} | 未解锁: {data.length - totalUnlocked}
        </div>
      </div>
    </div>
  );
};