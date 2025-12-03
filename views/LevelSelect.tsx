import React from 'react';
import { AppView, UserProgress, HanziChar } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Star, Lock, Unlock, Trophy } from 'lucide-react';

interface LevelSelectProps {
  progress: UserProgress;
  data: HanziChar[];
  onSelectLevel: (level: number) => void;
  onBack: () => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({ progress, data, onSelectLevel, onBack }) => {
  const levels = [1, 2, 3, 4, 5];

  // Calculate stats per level
  const getLevelStats = (level: number) => {
    const levelChars = data.filter(c => c.level === level);
    const total = levelChars.length;
    
    // Count how many chars in this level have mastery > 80
    const mastered = levelChars.filter(c => (progress.mastery[c.id] || 0) >= 80).length;
    // Count how many are unlocked (basic unlock check based on index)
    // In this new mode, we might allow free access, but let's show progress bars.
    
    return { total, mastered };
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
        </Button>
        <h1 className="text-3xl font-display text-panda-text">选择难度等级</h1>
        <div className="w-24"></div> {/* Spacer for centering */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map(level => {
          const { total, mastered } = getLevelStats(level);
          const percent = Math.round((mastered / total) * 100) || 0;
          
          return (
            <div 
              key={level}
              onClick={() => onSelectLevel(level)}
              className="bg-white rounded-3xl border-4 border-panda-text shadow-[8px_8px_0_#ABD1C6] p-6 cursor-pointer hover:transform hover:scale-105 transition-all active:translate-y-1 active:shadow-none group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-panda-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-display font-bold border-2 border-panda-text">
                  {level}
                </div>
                {percent === 100 ? (
                    <Trophy className="text-yellow-500 w-8 h-8" />
                ) : (
                    <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                        {total} 字
                    </div>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-700 mb-2">等级 {level}</h3>
              <p className="text-gray-500 text-sm mb-4">
                 {level === 1 && "基础汉字与数字"}
                 {level === 2 && "日常生活与自然"}
                 {level === 3 && "动作与交互"}
                 {level === 4 && "复杂概念与形容"}
                 {level === 5 && "抽象思维与社会"}
              </p>

              <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-gray-300 overflow-hidden">
                 <div 
                   className="bg-green-400 h-full rounded-full transition-all duration-1000" 
                   style={{ width: `${percent}%` }}
                 ></div>
              </div>
              <div className="mt-2 text-right text-sm font-bold text-gray-400 group-hover:text-panda-primary transition-colors">
                 已掌握 {percent}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};