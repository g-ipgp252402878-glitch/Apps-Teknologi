import React, { useState } from 'react';
import { CharacterData } from '../types';
import { AnimalAvatar } from './AnimalAvatar';
import { soundEngine } from '../services/soundEngine';
import { speechService } from '../services/speechService';
import { VoiceAssistantBanner } from './VoiceAssistantBanner';
import confetti from 'canvas-confetti';
import {
  Key,
  Unlock,
  Lock,
  Heart,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Volume2,
  CheckCircle2,
} from 'lucide-react';

interface CaveMissionScreenProps {
  hero: CharacterData;
  friend: CharacterData;
  onComplete: () => void;
  onBack: () => void;
  onOpenVoiceBooth: () => void;
}

interface EmpathyKey {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export const CaveMissionScreen: React.FC<CaveMissionScreenProps> = ({
  hero,
  friend,
  onComplete,
  onBack,
  onOpenVoiceBooth,
}) => {
  const [keys, setKeys] = useState<EmpathyKey[]>([
    {
      id: 1,
      name: 'Kunci Telinga Mendengar',
      description: 'Mendengar keluhan Pak Beruang dengan sabar tanpa mencelah atau menyindir.',
      icon: '👂',
      unlocked: false,
    },
    {
      id: 2,
      name: 'Kunci Kata-kata Semangat',
      description: 'Menyampaikan kata-kata positif: "Kamu berharga dan tidak keseorangan lagi."',
      icon: '💬',
      unlocked: false,
    },
    {
      id: 3,
      name: 'Kunci Pelukan Kasih Sahabat',
      description: 'Menghulurkan tangan persahabatan yang tulus dan memaafkan segala kesilapan.',
      icon: '🤝',
      unlocked: false,
    },
  ]);

  const [activeSpeech, setActiveSpeech] = useState<string | null>(null);

  const allUnlocked = keys.every((k) => k.unlocked);

  const handleUnlockKey = (id: number) => {
    soundEngine.playCorrect();
    const updated = keys.map((k) => (k.id === id ? { ...k, unlocked: true } : k));
    setKeys(updated);

    const keyObj = keys.find((k) => k.id === id);
    if (keyObj) {
      setActiveSpeech(`Kunci ${keyObj.name} berjaya disematkan! Hati Pak Beruang semakin tenang.`);
      speechService.speakDialogue(`Hebat! ${keyObj.name} berjaya membuka kunci masalah terpendam!`, {
        speaker: 'pencerita',
      });
    }

    if (updated.every((k) => k.unlocked)) {
      setTimeout(() => {
        soundEngine.playFanfare();
        try {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 },
          });
        } catch {}
      }, 500);
    }
  };

  const handleClaimCertificate = () => {
    soundEngine.playClick();
    onComplete();
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <VoiceAssistantBanner
        instructionText={`Misi Akhir: Buka pintu Gua Masalah Terpendam untuk menyelamatkan ${friend.name}! Tekan setiap Kunci Empati untuk merawat kesedihan Pak Beruang.`}
        speakerTitle="Panduan Misi Akhir"
        onOpenVoiceBooth={onOpenVoiceBooth}
      />

      <div className="w-full bg-gradient-to-b from-[#1b263b] via-[#0d1b2a] to-[#1b263b] rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-amber-400 text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-700 pb-4 mb-6">
          <button
            onClick={() => {
              soundEngine.playClick();
              onBack();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 font-bold text-xs transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>

          <div className="text-center">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4" />
              Misi Penyelamatan Terakhir
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-white">
              Gua Masalah Terpendam
            </h2>
          </div>

          <div className="w-16" />
        </div>

        {/* Cave Visual Theater Box */}
        <div className="relative w-full rounded-2xl bg-black/60 border-2 border-stone-600 p-6 mb-6 overflow-hidden flex flex-col sm:flex-row items-center justify-around gap-6 shadow-inner">
          {/* Hero Ready */}
          <div className="flex flex-col items-center">
            <AnimalAvatar
              type={hero.type}
              color={hero.color}
              pawColor={hero.pawColor || '#ffffff'}
              accessory={hero.accessory}
              size={110}
            />
            <span className="mt-2 text-xs font-black text-amber-300 bg-stone-900/90 px-3 py-1 rounded-full border border-amber-400/40">
              {hero.name} (Wira)
            </span>
          </div>

          {/* Center Cave Door & Locks */}
          <div className="flex flex-col items-center max-w-xs text-center z-10">
            <div
              className={`w-28 h-28 rounded-2xl border-4 flex items-center justify-center text-4xl shadow-2xl transition-all duration-500 relative ${
                allUnlocked
                  ? 'border-emerald-400 bg-emerald-950/80 animate-pulse text-emerald-300 ring-4 ring-emerald-400/50'
                  : 'border-amber-500 bg-stone-900/90 text-amber-400'
              }`}
            >
              {allUnlocked ? <Unlock className="w-14 h-14" /> : <Lock className="w-14 h-14" />}
              {allUnlocked && (
                <span className="absolute -top-2 -right-2 text-2xl animate-spin">✨</span>
              )}
            </div>

            <span className="text-xs font-black text-stone-300 uppercase tracking-wider mt-3">
              {allUnlocked ? '✨ Pintu Gua Terbuka Luas!' : '🔒 Pintu Gua Masih Terkunci'}
            </span>

            {/* Socket Indicators for 3 Keys */}
            <div className="flex items-center gap-2 mt-2">
              {keys.map((k) => (
                <span
                  key={k.id}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border transition-all ${
                    k.unlocked
                      ? 'bg-emerald-500 text-stone-950 border-emerald-300 shadow-md scale-110'
                      : 'bg-stone-800 text-stone-500 border-stone-600'
                  }`}
                  title={k.name}
                >
                  {k.unlocked ? '🔑' : '⚪'}
                </span>
              ))}
            </div>

            {/* Pak Beruang Emotional State */}
            <div className="mt-3 bg-stone-900/80 p-2.5 rounded-xl border border-stone-700 flex items-center gap-2">
              <AnimalAvatar type="bear" color="#6c584c" pawColor="#573e31" size={40} isSad={!allUnlocked} />
              <div className="text-left text-[11px] leading-tight">
                <p className="font-bold text-amber-200">Pak Beruang</p>
                <p className="text-stone-300">
                  {allUnlocked ? '💖 Hatiku kini lapang dan damai!' : 'Perasaanku masih terpendam...'}
                </p>
              </div>
            </div>
          </div>

          {/* Friend Trapped or Free */}
          <div className="flex flex-col items-center">
            <AnimalAvatar
              type={friend.type}
              color={friend.color}
              pawColor={friend.pawColor || '#fbcfe8'}
              accessory={friend.accessory}
              size={110}
              isTrapped={!allUnlocked}
              isSad={!allUnlocked}
            />
            <span className="mt-2 text-xs font-black text-rose-300 bg-stone-900/90 px-3 py-1 rounded-full border border-rose-400/40">
              {friend.name} {allUnlocked ? '(Bebas!) 🎉' : '(Terkurung)'}
            </span>
          </div>
        </div>

        {/* 3 Empathy Keys Unlock Panel */}
        <div className="mb-6">
          <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
            <Key className="w-4 h-4" />
            Tekan 3 Kunci Hati Empati Untuk Membuka Pintu Gua:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {keys.map((k) => (
              <button
                key={k.id}
                disabled={k.unlocked}
                onClick={() => handleUnlockKey(k.id)}
                className={`p-4 rounded-2xl border-2 text-left transition flex flex-col justify-between cursor-pointer ${
                  k.unlocked
                    ? 'border-emerald-400 bg-emerald-950/40 text-emerald-200 opacity-90'
                    : 'border-amber-400/60 bg-stone-800/80 hover:bg-stone-800 hover:border-amber-300 hover:scale-102 text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{k.icon}</span>
                    {k.unlocked ? (
                      <span className="text-[10px] font-black bg-emerald-500 text-stone-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Terbuka
                      </span>
                    ) : (
                      <span className="text-[10px] font-black bg-amber-400 text-stone-950 px-2 py-0.5 rounded-full">
                        Tekan Untuk Buka
                      </span>
                    )}
                  </div>
                  <h4 className="font-black text-sm text-amber-300 mb-1">{k.name}</h4>
                  <p className="text-xs text-stone-300 leading-snug">{k.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Completion Action */}
        {allUnlocked && (
          <div className="flex flex-col items-center bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border-2 border-emerald-400 p-5 rounded-2xl text-center shadow-xl animate-fade-in">
            <span className="text-3xl mb-1 animate-bounce">🎉</span>
            <h3 className="text-xl font-black text-amber-300">
              Misi Penyelamatan Berjaya Sepenuhnya!
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 max-w-md mt-1 mb-4">
              {friend.name} telah berjaya diselamatkan dan Pak Beruang kini menemui ketenangan. Anda layak menerima Sijil Sahabat Hebat!
            </p>
            <button
              onClick={handleClaimCertificate}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-base shadow-xl flex items-center gap-2 cursor-pointer active:scale-95 transition"
            >
              <span>Tuntut Sijil Sahabat Hebat 🏆</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
