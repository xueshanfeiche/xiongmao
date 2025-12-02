import React, { useState } from 'react';
import { UserProgress, HanziChar, AppView } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, ArrowRight, Volume2, Check, RotateCcw, Repeat } from 'lucide-react';
import { updateMastery } from '../services/storage';

interface LearnProps {
  progress: UserProgress;
  data: HanziChar[];
  onBack: () => void;
  onUpdateProgress: (newProgress: UserProgress) => void;
}

export const Learn: React.FC<LearnProps> = ({ progress, data, onBack, onUpdateProgress }) => {
  const [currentIndex, setCurrentIndex] = useState(progress.unlockedIndex);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentChar = data[currentIndex] || data[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < data.length - 1 && currentIndex <= progress.unlockedIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handlePractice = (result: 'good' | 'hard') => {
    const newProgress = updateMastery(progress, currentChar.id, result === 'good');
    onUpdateProgress(newProgress);
    
    // Animation feedback could go here
    if (result === 'good') {
        // Auto advance if it was a good practice
        setTimeout(() => {
            if (currentIndex === progress.unlockedIndex && newProgress.unlockedIndex > progress.unlockedIndex) {
                // We just unlocked a new one!
                setCurrentIndex(newProgress.unlockedIndex);
                setIsFlipped(false);
            }
        }, 500);
    }
  };

  const playAudio = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    // Basic browser support check
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop previous
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN'; // Set language to Chinese
      utterance.rate = 0.8; // Slightly slower for clarity
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Text-to-speech not supported");
    }
  };

  const mastery = progress.mastery[currentChar.id] || 0;

  // CSS style for "Mi Zi Ge" (Rice Grid) - Classic Chinese learning grid
  const miZiGeStyle = {
    backgroundImage: `
        linear-gradient(to right, transparent 49.5%, #fee2e2 49.5%, #fee2e2 50.5%, transparent 50.5%),
        linear-gradient(to bottom, transparent 49.5%, #fee2e2 49.5%, #fee2e2 50.5%, transparent 50.5%),
        linear-gradient(45deg, transparent 49.5%, #fee2e2 49.5%, #fee2e2 50.5%, transparent 50.5%),
        linear-gradient(-45deg, transparent 49.5%, #fee2e2 49.5%, #fee2e2 50.5%, transparent 50.5%)
    `,
    backgroundSize: '100% 100%'
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-6 items-center animate-fade-in min-h-[600px] justify-center">
      <div className="w-full flex justify-between items-center mb-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回
        </Button>
        <span className="font-display text-panda-text text-xl">
           等级 {currentChar.level}
        </span>
      </div>

      {/* Progress Bar for this char */}
      <div className="w-full max-w-sm bg-gray-200 rounded-full h-3 mb-6 border-2 border-gray-300">
        <div 
          className="bg-green-400 h-full rounded-full transition-all duration-500" 
          style={{ width: `${mastery}%` }}
        ></div>
      </div>

      {/* Flashcard */}
      <div className="perspective-1000 w-full max-w-sm aspect-[3/4] relative mb-8 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative w-full h-full text-center transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-[2.5rem] border-8 border-panda-text shadow-[12px_12px_0_#F9BC60] flex flex-col items-center justify-between p-6 overflow-hidden">
             {/* Header */}
             <div className="w-full flex justify-between items-center px-2">
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold font-sans">
                    #{currentChar.id}
                </span>
                <Repeat className="text-gray-300 w-6 h-6 animate-pulse" />
             </div>

             {/* Character Container with Mi Zi Ge */}
             <div className="relative w-48 h-48 sm:w-56 sm:h-56 border-4 border-red-200 rounded-xl flex items-center justify-center bg-red-50/50" style={miZiGeStyle}>
                <span className="text-[8rem] sm:text-[9rem] font-serif leading-none text-panda-text z-10 drop-shadow-sm font-medium">
                  {currentChar.char}
                </span>
             </div>

             {/* Pinyin and Audio Button */}
             <div className="mb-2 flex flex-col items-center">
                 <span className="text-5xl font-display text-panda-primary tracking-wider mb-2">
                     {currentChar.pinyin}
                 </span>
                 <button 
                   onClick={(e) => playAudio(currentChar.char, e)}
                   className="flex items-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-600 px-4 py-2 rounded-full transition-colors text-sm font-bold"
                 >
                   <Volume2 size={16} /> 读音
                 </button>
             </div>

             <div className="text-gray-400 text-sm font-bold tracking-widest pb-1 uppercase">
                点击翻转
             </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-[2.5rem] border-8 border-panda-secondary shadow-[12px_12px_0_#2B2D42] flex flex-col p-5 rotate-y-180 items-center h-full">
            
            {/* Small Preview Corner */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-red-50 rounded-lg border-2 border-red-100 flex items-center justify-center text-2xl text-panda-text font-serif z-10 shadow-sm">
                {currentChar.char}
            </div>

            <div className="flex-1 w-full flex items-center justify-center pt-8 pb-4">
                
                {/* Example Section - Centered and Larger */}
                <div className="bg-blue-50 w-full rounded-3xl py-12 px-4 border-4 border-blue-100 text-center relative overflow-hidden group-hover:bg-blue-100 transition-colors shadow-sm">
                     {/* Decorative elements */}
                     <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-200 rounded-full opacity-40"></div>
                     <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-200 rounded-full opacity-40"></div>
                     
                     <p className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-6 relative z-10">
                         常用词组
                     </p>
                     <p className="text-5xl sm:text-6xl text-gray-700 font-serif font-bold relative z-10 leading-tight">
                         {currentChar.example}
                     </p>
                </div>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-auto z-10 relative" onClick={(e) => playAudio(currentChar.example, e)}>
              <Volume2 className="mr-2" /> 朗读
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex w-full gap-4 justify-between items-center max-w-sm">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className="p-4 rounded-full bg-gray-200 text-gray-600 disabled:opacity-30 hover:bg-gray-300 transition-colors shadow-sm"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex gap-3 flex-1 justify-center">
             <Button variant="accent" onClick={() => handlePractice('hard')} className="flex-1 text-base py-3">
                <RotateCcw className="mr-2 h-4 w-4" /> 没记住
             </Button>
             <Button variant="primary" onClick={() => handlePractice('good')} className="flex-1 text-base py-3">
                <Check className="mr-2 h-4 w-4" /> 学会了
             </Button>
        </div>

        <button 
          onClick={handleNext} 
          disabled={currentIndex >= progress.unlockedIndex}
          className="p-4 rounded-full bg-gray-200 text-gray-600 disabled:opacity-30 hover:bg-gray-300 transition-colors shadow-sm"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};
