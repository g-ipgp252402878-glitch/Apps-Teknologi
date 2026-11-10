import React, { useState } from 'react';
import { ActiveScreen } from '../types';
import { soundEngine } from '../services/soundEngine';
import { PWAInstallButton } from './PWAInstallButton';
import { OfflineIndicator } from './OfflineIndicator';
import {
  Volume2,
  VolumeX,
  Music,
  Map,
  Home,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenMap: () => void;
  onResetAdventure: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenMap,
  onResetAdventure,
}) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  const handleToggleMusic = () => {
    soundEngine.playClick();
    if (isMusicPlaying) {
      soundEngine.stopBGM();
      setIsMusicPlaying(false);
    } else {
      soundEngine.startBGM('jungle');
      setIsMusicPlaying(true);
    }
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.setMute(nextMute);
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#143d2c] via-[#1b4332] to-[#2d6a4f] text-white py-3 px-4 sm:px-6 shadow-xl border-b-4 border-amber-400 flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* Brand & Title */}
      <div className="flex items-center justify-between">
        <div
          onClick={() => {
            soundEngine.playClick();
            onNavigate('home');
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-400 border-2 border-amber-200 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
            🌲
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-amber-300 tracking-wide font-display drop-shadow-xs flex items-center gap-1.5">
              <span>Pengembaraan Hutan</span>
              <span className="text-[10px] bg-emerald-700/80 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-500 font-sans hidden sm:inline">
                Edisi Sahabat
              </span>
            </h1>
            <p className="text-[11px] text-emerald-100 font-medium">
              Misi Menyelamatkan Sahabat Sejati
            </p>
          </div>
        </div>

        {/* Mobile quick icons */}
        <div className="flex items-center gap-1.5 md:hidden">
          <button
            onClick={handleToggleMusic}
            className={`p-2 rounded-xl transition cursor-pointer ${
              isMusicPlaying ? 'bg-amber-400 text-stone-900' : 'bg-emerald-900/60 text-stone-300'
            }`}
            title="Muzik Latar"
          >
            <Music className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenMap}
            className="p-2 rounded-xl bg-amber-400 text-stone-900 font-bold transition cursor-pointer"
            title="Peta Misi"
          >
            <Map className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation & Controls Desktop */}
      <div className="flex items-center gap-2 flex-wrap justify-end">
        <OfflineIndicator />

        {/* Home Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onNavigate('home');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            currentScreen === 'home'
              ? 'bg-amber-400 text-stone-950 font-black shadow-md'
              : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 border border-emerald-600/40'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Utama</span>
        </button>

        {/* Map Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onOpenMap();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black shadow-md transition cursor-pointer"
        >
          <Map className="w-3.5 h-3.5" />
          <span>Peta Misi</span>
        </button>

        {/* BGM Toggle Button */}
        <button
          onClick={handleToggleMusic}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            isMusicPlaying
              ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 font-black shadow-md ring-2 ring-white/60'
              : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-600/40'
          }`}
          title="Pasang / Hentikan Muzik Latar Rimba"
        >
          {isMusicPlaying ? (
            <span className="flex items-end gap-0.5 h-3.5 mr-0.5">
              <span className="w-1 bg-stone-900 animate-bounce h-2 rounded-full" />
              <span className="w-1 bg-stone-900 animate-bounce h-3.5 rounded-full [animation-delay:150ms]" />
              <span className="w-1 bg-stone-900 animate-bounce h-2.5 rounded-full [animation-delay:300ms]" />
            </span>
          ) : (
            <Music className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline">
            {isMusicPlaying ? 'Muzik Aktif 🎶' : 'Pasang Muzik'}
          </span>
        </button>

        {/* Mute SFX Toggle */}
        <button
          onClick={handleToggleMute}
          className="p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-600/40 transition cursor-pointer"
          title={isMuted ? 'Buka Bunyi' : 'Senyapkan Bunyi'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* PWA Install Button */}
        <PWAInstallButton />

        {/* Reset Progress */}
        <button
          onClick={() => {
            soundEngine.playClick();
            if (window.confirm('Adakah anda pasti mahu memulakan semula pengembaraan dari awal?')) {
              onResetAdventure();
            }
          }}
          className="p-2 rounded-xl bg-emerald-900/40 hover:bg-rose-900/60 text-stone-300 hover:text-white border border-stone-600/40 transition cursor-pointer"
          title="Mula Semula Pengembaraan"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
