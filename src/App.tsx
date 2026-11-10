import React, { useState, useEffect } from 'react';
import { ActiveScreen, CharacterData, MemoryBookData, AppProgress } from './types';
import { storageService } from './services/storageService';
import { soundEngine } from './services/soundEngine';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { IntroScreen } from './components/IntroScreen';
import { MemoryBookScreen } from './components/MemoryBookScreen';
import { HeroStudioScreen } from './components/HeroStudioScreen';
import { FriendStudioScreen } from './components/FriendStudioScreen';
import { VoiceBoothScreen } from './components/VoiceBoothScreen';
import { VideoTheaterScreen } from './components/VideoTheaterScreen';
import { QuizScreen } from './components/QuizScreen';
import { CaveMissionScreen } from './components/CaveMissionScreen';
import { CertificateScreen } from './components/CertificateScreen';
import { MissionMapModal } from './components/MissionMapModal';

export default function App() {
  const initialData = storageService.loadData();

  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('home');
  const [hero, setHero] = useState<CharacterData>(initialData.hero);
  const [friend, setFriend] = useState<CharacterData>(initialData.friend);
  const [memory, setMemory] = useState<MemoryBookData>(initialData.memory);
  const [progress, setProgress] = useState<AppProgress>(initialData.progress);
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Auto-save whenever any relevant state changes
  useEffect(() => {
    storageService.saveData({
      hero,
      friend,
      memory,
      progress,
    });
  }, [hero, friend, memory, progress]);

  // Navigate helper with smooth top scroll
  const navigateTo = (screen: ActiveScreen) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen(screen);
  };

  const handleResetAdventure = () => {
    const fresh = storageService.resetAll();
    setHero(fresh.hero);
    setFriend(fresh.friend);
    setMemory(fresh.memory);
    setProgress(fresh.progress);
    setCurrentScreen('home');
    soundEngine.playFanfare();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#143224] via-[#1b4332] to-[#0f241a] text-stone-900 flex flex-col font-sans select-none antialiased">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onOpenMap={() => setIsMapOpen(true)}
        onResetAdventure={handleResetAdventure}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8 flex flex-col items-center">
        {currentScreen === 'home' && (
          <HomeScreen
            hero={hero}
            friend={friend}
            progress={progress}
            onNavigate={navigateTo}
            onOpenVoiceBooth={() => navigateTo('voice-booth')}
          />
        )}

        {currentScreen === 'intro' && (
          <IntroScreen
            onNext={() => {
              setProgress((prev) => ({ ...prev, introViewed: true }));
              navigateTo('book');
            }}
            onBack={() => navigateTo('home')}
            onOpenVoiceBooth={() => navigateTo('voice-booth')}
          />
        )}

        {currentScreen === 'book' && (
          <MemoryBookScreen
            hero={hero}
            friend={friend}
            initialData={memory}
            onSave={(newMemory) => {
              setMemory(newMemory);
              setProgress((prev) => ({ ...prev, memorySaved: true }));
            }}
            onBack={() => navigateTo('intro')}
            onNext={() => {
              setProgress((prev) => ({ ...prev, memorySaved: true }));
              navigateTo('hero-studio');
            }}
            onOpenVoiceBooth={() => navigateTo('voice-booth')}
          />
        )}

        {currentScreen === 'hero-studio' && (
          <HeroStudioScreen
            initialData={hero}
            onSave={(newHero) => {
              setHero(newHero);
              setProgress((prev) => ({ ...prev, heroCreated: true }));
            }}
            onBack={() => navigateTo('book')}
            onNext={() => {
              setProgress((prev) => ({ ...prev, heroCreated: true }));
              navigateTo('friend-studio');
            }}
            onOpenVoiceBooth={() => navigateTo('voice-booth')}
          />
        )}

        {currentScreen === 'friend-studio' && (
          <FriendStudioScreen
            hero={hero}
            initialData={friend}
            onSave={(newFriend) => {
              setFriend(newFriend);
              setProgress((prev) => ({ ...prev, friendCreated: true }));
            }}
            onBack={() => navigateTo('hero-studio')}
            onNext={() => {
              setProgress((prev) => ({ ...prev, friendCreated: true }));
              navigateTo('video');
            }}
            onOpenVoiceBooth={() => navigateTo('voice-booth')}
          />
        )}

        {currentScreen === 'voice-booth' && (
          <VoiceBoothScreen
            hero={hero}
            friend={friend}
            savedVoiceUrl={progress.recordedVoiceUrl}
            onSaveVoice={(url) => {
              setProgress((prev) => ({ ...prev, recordedVoiceUrl: url }));
              navigateTo('video');
            }}
            onBack={() => navigateTo('home')}
          />
        )}

        {currentScreen === 'video' && (
          <VideoTheaterScreen
            hero={hero}
            friend={friend}
            savedVoiceUrl={progress.recordedVoiceUrl}
            onComplete={() => {
              setProgress((prev) => ({ ...prev, videoCompleted: true }));
              navigateTo('quiz');
            }}
            onBack={() => navigateTo('friend-studio')}
            onOpenVoiceBooth={() => navigateTo('voice-booth')}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizScreen
            hero={hero}
            friend={friend}
            onComplete={(score) => {
              setProgress((prev) => ({
                ...prev,
                quizScore: score,
                quizCompleted: true,
              }));
              navigateTo('cave');
            }}
            onBack={() => navigateTo('video')}
            onOpenVoiceBooth={() => navigateTo('voice-booth')}
          />
        )}

        {currentScreen === 'cave' && (
          <CaveMissionScreen
            hero={hero}
            friend={friend}
            onComplete={() => {
              setProgress((prev) => ({
                ...prev,
                caveUnlocked: true,
                certificateEarned: true,
              }));
              navigateTo('certificate');
            }}
            onBack={() => navigateTo('quiz')}
            onOpenVoiceBooth={() => navigateTo('voice-booth')}
          />
        )}

        {currentScreen === 'certificate' && (
          <CertificateScreen
            hero={hero}
            friend={friend}
            progress={progress}
            onHome={() => navigateTo('home')}
            onRestartAdventure={handleResetAdventure}
          />
        )}
      </main>

      {/* Mission Map Modal */}
      {isMapOpen && (
        <MissionMapModal
          currentScreen={currentScreen}
          progress={progress}
          onNavigate={navigateTo}
          onClose={() => setIsMapOpen(false)}
        />
      )}

      {/* Friendly Jungle Applet Footer */}
      <footer className="w-full py-4 text-center text-xs font-semibold text-emerald-300/80 border-t border-emerald-900/60 mt-auto select-none print:hidden">
        <p>🌲 Pengembaraan Hutan: Misi Menyelamatkan Sahabat • Aplikasi Pembelajaran Nilai Murni & Empati Digital</p>
      </footer>
    </div>
  );
}
