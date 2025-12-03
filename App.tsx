import React, { useState, useEffect } from 'react';
import { Dashboard } from './views/Dashboard';
import { Learn } from './views/Learn';
import { Review } from './views/Review';
import { LevelSelect } from './views/LevelSelect';
import { AppView, UserProgress } from './types';
import { HANZI_DATA, INITIAL_PROGRESS, getAllHanzi } from './constants';
import { loadProgress, saveProgress } from './services/storage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);
  const [data] = useState(getAllHanzi()); 
  const [selectedLevel, setSelectedLevel] = useState<number | undefined>(undefined);

  useEffect(() => {
    const saved = loadProgress();
    setProgress(saved);
  }, []);

  const handleUpdateProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const handleSelectLevel = (level: number) => {
    setSelectedLevel(level);
    setCurrentView(AppView.LEARN);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return (
          <Dashboard 
            progress={progress} 
            data={data} 
            onChangeView={setCurrentView} 
          />
        );
      case AppView.LEVEL_SELECT:
        return (
            <LevelSelect 
                progress={progress}
                data={data}
                onSelectLevel={handleSelectLevel}
                onBack={() => setCurrentView(AppView.DASHBOARD)}
            />
        );
      case AppView.LEARN:
        return (
          <Learn 
            progress={progress} 
            data={data} 
            selectedLevel={selectedLevel}
            onBack={() => setCurrentView(AppView.LEVEL_SELECT)}
            onUpdateProgress={handleUpdateProgress}
          />
        );
      case AppView.REVIEW:
        return (
          <Review 
            progress={progress} 
            data={data} 
            onBack={() => setCurrentView(AppView.DASHBOARD)}
            onUpdateProgress={handleUpdateProgress}
          />
        );
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-panda-bg text-panda-text font-sans selection:bg-panda-primary selection:text-white pb-10">
      {renderView()}
      
      {/* Global decorative elements */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gradient-to-r from-panda-primary via-panda-accent to-panda-secondary z-50"></div>
    </div>
  );
};

export default App;