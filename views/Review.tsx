import React, { useState, useEffect, useCallback } from 'react';
import { UserProgress, HanziChar, QuizQuestion } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Trophy } from 'lucide-react';
import { updateMastery } from '../services/storage';

interface ReviewProps {
  progress: UserProgress;
  data: HanziChar[];
  onBack: () => void;
  onUpdateProgress: (newProgress: UserProgress) => void;
}

export const Review: React.FC<ReviewProps> = ({ progress, data, onBack, onUpdateProgress }) => {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);

  // Generate a question
  const generateQuestion = useCallback(() => {
    // Only use unlocked characters
    const unlockedChars = data.slice(0, progress.unlockedIndex + 1);
    
    // Pick a random target
    const target = unlockedChars[Math.floor(Math.random() * unlockedChars.length)];
    
    // Pick 3 distractors
    const distractors = unlockedChars
        .filter(c => c.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    
    // If not enough distractors (early game), add from locked ones but hide pinyin/meaning if needed (simplified here)
    if (distractors.length < 3) {
        const extra = data.filter(c => c.id !== target.id && !distractors.includes(c)).slice(0, 3 - distractors.length);
        distractors.push(...extra);
    }

    const options = [target, ...distractors].sort(() => 0.5 - Math.random());

    setQuestion({ targetChar: target, options });
    setSelectedOption(null);
    setIsCorrect(null);
  }, [data, progress.unlockedIndex]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (char: HanziChar) => {
    if (selectedOption !== null || !question) return; // Prevent double click

    setSelectedOption(char.id);
    const correct = char.id === question.targetChar.id;
    setIsCorrect(correct);

    if (correct) {
        setStreak(s => s + 1);
        // Play success sound logic here
    } else {
        setStreak(0);
        // Play error sound logic here
    }

    // Update persistence
    const newProgress = updateMastery(progress, question.targetChar.id, correct);
    onUpdateProgress(newProgress);

    // Next question delay
    setTimeout(() => {
        generateQuestion();
    }, 1500);
  };

  if (!question) return <div>加载中...</div>;

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-6 items-center animate-fade-in">
       <div className="w-full flex justify-between items-center mb-8">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> 退出
        </Button>
        <div className="flex items-center gap-2 text-orange-500 font-bold text-xl">
            <Trophy /> 连胜: {streak}
        </div>
      </div>

      <div className="text-center mb-10">
          <h2 className="text-2xl text-gray-500 font-display mb-4">这是哪个字？</h2>
          <div className="text-3xl font-bold text-panda-text mb-2">
            "{question.targetChar.meaning}"
          </div>
          <div className="text-xl text-panda-primary font-bold">
            {question.targetChar.pinyin}
          </div>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full mb-8">
        {question.options.map((option) => {
            let btnStyle = "bg-white border-panda-text text-panda-text hover:bg-gray-50";
            
            // Reveal state
            if (selectedOption !== null) {
                if (option.id === question.targetChar.id) {
                    btnStyle = "bg-green-500 border-green-700 text-white"; // Correct answer always turns green
                } else if (option.id === selectedOption) {
                    btnStyle = "bg-red-400 border-red-600 text-white"; // Wrong selection turns red
                } else {
                    btnStyle = "bg-gray-100 border-gray-200 text-gray-300"; // Others fade out
                }
            }

            return (
                <button
                    key={option.id}
                    onClick={() => handleAnswer(option)}
                    className={`
                        h-40 rounded-3xl border-b-8 text-6xl font-sans transition-all transform duration-200
                        flex items-center justify-center shadow-lg
                        ${btnStyle}
                        ${selectedOption === null ? 'active:translate-y-1 active:border-b-4' : 'cursor-default'}
                    `}
                    disabled={selectedOption !== null}
                >
                    {option.char}
                </button>
            );
        })}
      </div>

      {isCorrect === true && (
          <div className="text-green-500 font-display text-3xl animate-bounce">
              太棒了！ 🎉
          </div>
      )}
      {isCorrect === false && (
          <div className="text-panda-accent font-display text-2xl">
              没关系，再试一次。
          </div>
      )}
    </div>
  );
};