import React, { useState } from 'react';
import { CharacterData, AnimalType } from '../types';
import { AnimalAvatar } from './AnimalAvatar';
import { soundEngine } from '../services/soundEngine';
import { VoiceAssistantBanner } from './VoiceAssistantBanner';
import { Sparkles, ArrowRight, ArrowLeft, Volume2, Shield } from 'lucide-react';

interface HeroStudioScreenProps {
  initialData: CharacterData;
  onSave: (hero: CharacterData) => void;
  onBack: () => void;
  onNext: () => void;
  onOpenVoiceBooth: () => void;
}

const ANIMAL_OPTIONS: { type: AnimalType; label: string; icon: string; defaultColor: string }[] = [
  { type: 'tiger', label: 'Harimau Belang', icon: '🐯', defaultColor: '#f4a261' },
  { type: 'cat', label: 'Kucing Ceria', icon: '🐱', defaultColor: '#e76f51' },
  { type: 'rabbit', label: 'Arnab Pantas', icon: '🐰', defaultColor: '#e9ecef' },
  { type: 'bear', label: 'Beruang Gagah', icon: '🐻', defaultColor: '#8d5b4c' },
  { type: 'panda', label: 'Panda Comel', icon: '🐼', defaultColor: '#ffffff' },
  { type: 'fox', label: 'Musang Bijak', icon: '🦊', defaultColor: '#f77f00' },
];

const ACCESSORY_OPTIONS = [
  { id: 'bandana', label: 'Bandana Merah', icon: '🧣' },
  { id: 'crown', label: 'Mahkota Daun Emas', icon: '👑' },
  { id: 'glasses', label: 'Kacamata Penjelajah', icon: '👓' },
  { id: 'cape', label: 'Jubah Wira Ungu', icon: '🦸' },
  { id: 'bell', label: 'Loceng Rimba', icon: '🔔' },
  { id: 'flower', label: 'Bunga Persahabatan', icon: '🌸' },
];

const TRAIT_OPTIONS = [
  'Pemberani & Setia',
  'Penyayang & Lembut Hati',
  'Ceria & Suka Membantu',
  'Bijak Menyelesaikan Masalah',
  'Pendengar Yang Baik',
];

const COLOR_PALETTES = ['#f4a261', '#e76f51', '#2a9d8f', '#e9ecef', '#8d5b4c', '#f77f00', '#ffffff', '#457b9d'];
const PAW_COLOR_PALETTES = [
  { color: '#ffffff', label: 'Putih Gebu' },
  { color: '#fbcfe8', label: 'Merah Jambu' },
  { color: '#fef08a', label: 'Kuning Jagung' },
  { color: '#fed7aa', label: 'Oren Pic' },
  { color: '#bae6fd', label: 'Biru Awan' },
  { color: '#b45309', label: 'Coklat Madu' },
  { color: '#334155', label: 'Kelabu Gelap' },
  { color: '#e9d5ff', label: 'Ungu Lavender' },
];

export const HeroStudioScreen: React.FC<HeroStudioScreenProps> = ({
  initialData,
  onSave,
  onBack,
  onNext,
  onOpenVoiceBooth,
}) => {
  const [hero, setHero] = useState<CharacterData>({
    ...initialData,
    pawColor: initialData.pawColor || '#ffffff',
  });

  const handleTypeSelect = (type: AnimalType, defColor: string) => {
    soundEngine.playClick();
    soundEngine.playAnimalSound(type);
    setHero((prev) => ({ ...prev, type, color: defColor }));
  };

  const handleAccessorySelect = (accessory: string) => {
    soundEngine.playClick();
    setHero((prev) => ({ ...prev, accessory }));
  };

  const handleColorSelect = (color: string) => {
    soundEngine.playClick();
    setHero((prev) => ({ ...prev, color }));
  };

  const handlePawColorSelect = (pawColor: string) => {
    soundEngine.playClick();
    setHero((prev) => ({ ...prev, pawColor }));
  };

  const handleSaveAndProceed = () => {
    soundEngine.playCorrect();
    onSave(hero);
    onNext();
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <VoiceAssistantBanner
        instructionText="Cipta watak Wira Rimba anda! Pilih jenis haiwan kegemaran, nama yang hebat, aksesori, dan warna bulunya. Tekan wira untuk dengar suaranya!"
        speakerTitle="Panduan Studio Wira"
        onOpenVoiceBooth={onOpenVoiceBooth}
      />

      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-amber-400">
        <div className="flex items-center justify-between border-b-2 border-stone-200 pb-4 mb-6">
          <button
            onClick={() => {
              soundEngine.playClick();
              onBack();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1b4332] flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-amber-500" />
              Langkah 1: Studio Wira Rimba
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Watak utama yang akan memimpin misi menyelamatkan sahabat!
            </p>
          </div>
          <div className="w-16" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Live Preview Card */}
          <div className="lg:col-span-5 flex flex-col items-center bg-gradient-to-b from-[#2d6a4f]/15 to-[#52b788]/20 p-6 rounded-2xl border-2 border-[#52b788]/40 shadow-inner">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2d6a4f] mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Pratonton Wira Anda
            </div>

            <button
              onClick={() => {
                soundEngine.playAnimalSound(hero.type);
              }}
              className="group relative my-3 p-3 rounded-full bg-white/80 shadow-xl border-4 border-amber-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Tekan untuk dengar suara haiwan!"
            >
              <AnimalAvatar
                type={hero.type}
                color={hero.color}
                pawColor={hero.pawColor || '#ffffff'}
                accessory={hero.accessory}
                size={140}
                className="group-hover:animate-bounce"
              />
              <span className="absolute -bottom-2 -right-2 bg-amber-400 p-2 rounded-full shadow-md text-stone-900 border-2 border-white">
                <Volume2 className="w-4 h-4" />
              </span>
            </button>

            <h3 className="text-xl font-black text-[#1b4332] mt-2 text-center">
              {hero.name || 'Wira Rimba'}
            </h3>
            <span className="inline-block bg-[#2d6a4f] text-white text-xs font-bold px-3 py-1 rounded-full mt-1">
              {hero.trait}
            </span>
            <p className="text-xs text-stone-600 italic text-center mt-3 bg-white/70 p-2.5 rounded-xl border border-stone-200 w-full">
              "{hero.quote}"
            </p>
          </div>

          {/* Form Controls */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Name Input */}
            <div>
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5">
                Nama Wira Anda:
              </label>
              <input
                type="text"
                value={hero.name}
                onChange={(e) => setHero({ ...hero, name: e.target.value })}
                placeholder="Contoh: Sang Belang Wira"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-300 focus:border-[#2d6a4f] focus:outline-none text-stone-900 font-bold text-base bg-stone-50"
              />
            </div>

            {/* Animal Selection */}
            <div>
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-2">
                Pilih Spesies Haiwan:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {ANIMAL_OPTIONS.map((item) => (
                  <button
                    key={item.type}
                    onClick={() => handleTypeSelect(item.type, item.defaultColor)}
                    className={`p-2 rounded-xl flex flex-col items-center gap-1 border-2 transition cursor-pointer ${
                      hero.type === item.type
                        ? 'border-amber-500 bg-amber-100 shadow-md font-bold scale-105'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-[11px] leading-tight text-center text-stone-800 font-semibold">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fur Color Palette */}
            <div>
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-2">
                Pilih Warna Bulu Wira:
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {COLOR_PALETTES.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleColorSelect(c)}
                    className={`w-8 h-8 rounded-full border-2 transition transform active:scale-90 cursor-pointer ${
                      hero.color === c ? 'border-stone-900 scale-110 shadow-lg ring-2 ring-amber-400' : 'border-stone-300'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Paw Color Palette (NEW) */}
            <div className="bg-amber-50/70 p-3.5 rounded-2xl border-2 border-amber-300/80">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🐾 Pilih Warna Tapak Tangan (Paws):</span>
                </label>
                <span className="text-[10px] font-extrabold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
                  Tapak Kaki & Jari (Toe Beans)
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {PAW_COLOR_PALETTES.map((item) => {
                  const isSelected = (hero.pawColor || '#ffffff') === item.color;
                  return (
                    <button
                      key={item.color}
                      onClick={() => handlePawColorSelect(item.color)}
                      className={`h-9 px-3 rounded-full border-2 transition-all transform active:scale-90 cursor-pointer flex items-center gap-1.5 shadow-xs ${
                        isSelected
                          ? 'border-stone-950 bg-white ring-2 ring-amber-500 scale-105 font-black text-stone-900'
                          : 'border-stone-300 bg-white/80 hover:bg-white text-stone-600'
                      }`}
                      title={item.label}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-stone-300 shadow-inner"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[11px]">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accessory */}
            <div>
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-2">
                Aksesori Istimewa:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {ACCESSORY_OPTIONS.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => handleAccessorySelect(acc.id)}
                    className={`p-2 rounded-xl flex flex-col items-center gap-1 border-2 transition cursor-pointer ${
                      hero.accessory === acc.id
                        ? 'border-[#2d6a4f] bg-emerald-100 shadow-md font-bold scale-105'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-xl">{acc.icon}</span>
                    <span className="text-[10px] leading-tight text-center text-stone-800 font-medium">
                      {acc.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trait Selection */}
            <div>
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5">
                Sifat Keperibadian:
              </label>
              <select
                value={hero.trait}
                onChange={(e) => {
                  soundEngine.playClick();
                  setHero({ ...hero, trait: e.target.value });
                }}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-300 focus:border-[#2d6a4f] focus:outline-none text-stone-900 font-semibold text-sm bg-stone-50"
              >
                {TRAIT_OPTIONS.map((trait) => (
                  <option key={trait} value={trait}>
                    {trait}
                  </option>
                ))}
              </select>
            </div>

            {/* Moto */}
            <div>
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5">
                Slogan / Kata Semangat Wira:
              </label>
              <input
                type="text"
                value={hero.quote}
                onChange={(e) => setHero({ ...hero, quote: e.target.value })}
                placeholder="Contoh: Bersama sahabat, kita tidak gentar!"
                className="w-full px-4 py-2 rounded-xl border-2 border-stone-300 focus:border-[#2d6a4f] focus:outline-none text-stone-800 text-sm bg-stone-50"
              />
            </div>

            {/* Proceed to Friend Studio */}
            <button
              onClick={handleSaveAndProceed}
              className="mt-4 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-[#2d6a4f] to-emerald-700 hover:from-emerald-500 hover:to-[#1b4332] text-white font-black text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition"
            >
              <span>Simpan Wira & Cipta Sahabat Sejati</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
