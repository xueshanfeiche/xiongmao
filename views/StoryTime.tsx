import React, { useState } from 'react';
import { UserProgress, HanziChar } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Sparkles, BookOpen, Volume2 } from 'lucide-react';
import { generateStory } from '../services/geminiService';

interface StoryProps {
  progress: UserProgress;
  data: HanziChar[];
  onBack: () => void;
}

export const StoryTime: React.FC<StoryProps> = ({ progress, data, onBack }) => {
  const [story, setStory] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    // Pick 3 random known characters
    const knownChars = data.slice(0, progress.unlockedIndex + 1);
    const shuffled = [...knownChars].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    
    if (selected.length === 0) {
        setStory("先去学习一些汉字吧！");
        setLoading(false);
        return;
    }

    const result = await generateStory(selected);
    setStory(result);
    setLoading(false);
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Remove brackets for smoother reading
      const cleanText = text.replace(/\[|\]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-6 items-center animate-fade-in">
      <div className="w-full flex justify-between items-center mb-6">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回
        </Button>
        <span className="font-display text-purple-500 text-xl">魔法绘本</span>
      </div>

      <div className="bg-white p-8 rounded-[3rem] border-4 border-purple-200 shadow-[12px_12px_0_rgba(167,139,250,0.4)] w-full min-h-[400px] flex flex-col items-center">
         
         {!story && !loading && (
             <div className="flex flex-col items-center justify-center h-full text-center mt-12">
                 <div className="bg-purple-100 p-6 rounded-full mb-6">
                    <Sparkles className="w-16 h-16 text-purple-400" />
                 </div>
                 <h3 className="text-2xl font-display text-panda-text mb-4">想听故事吗？</h3>
                 <p className="text-gray-500 mb-8 max-w-xs">熊猫会用你学过的汉字为你写一个神奇的故事！</p>
                 <Button onClick={handleGenerate} variant="accent" size="lg">
                    生成故事
                 </Button>
             </div>
         )}

         {loading && (
             <div className="flex flex-col items-center justify-center h-full mt-20 space-y-4">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-500"></div>
                 <p className="text-purple-500 font-bold animate-pulse">熊猫正在思考...</p>
             </div>
         )}

         {story && !loading && (
             <div className="w-full text-left">
                 <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                    <BookOpen size={20}/> 你的专属故事
                 </h3>
                 <div className="prose prose-lg text-gray-700 leading-relaxed whitespace-pre-line font-sans mb-6">
                     {story}
                 </div>
                 <div className="mt-8 flex justify-center gap-4">
                    <Button onClick={() => playAudio(story)} variant="primary" size="md">
                        <Volume2 className="mr-2" /> 朗读故事
                    </Button>
                    <Button onClick={handleGenerate} variant="secondary" size="md">
                        再读一个
                    </Button>
                 </div>
             </div>
         )}
      </div>
    </div>
  );
};