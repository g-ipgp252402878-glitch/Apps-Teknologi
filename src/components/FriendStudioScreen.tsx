import React, { useState } from 'react';
import { CharacterData, AnimalType } from '../types';
import { AnimalAvatar } from './AnimalAvatar';
import { soundEngine } from '../services/soundEngine';
import { VoiceAssistantBanner } from './VoiceAssistantBanner';
import { Heart, Sparkles, ArrowRight, ArrowLeft, Volume2, Users } from 'lucide-react';

interface FriendStudioScreenProps {
  hero: CharacterData;
  initialData: CharacterData;
  onSave: (friend: CharacterData) => void;
  onBack: () => void;
  onNext: () => void;
  onOpenVoiceBooth: () => void;
}

const FRIEND_ANIMAL_OPTIONS: { type: AnimalType; label: string; icon: string; defaultColor: string }[] = [
  { type: 'cat', label: 'Kucing Manja', icon: '🐱', defaultColor: '#ffb4a2' },
  { type: 'rabbit', label: 'Arnab Lincah', icon: '🐰', defaultColor: '#e9ecef' },
  { type: 'panda', label: 'Panda Penyayang', icon: '🐼', defaultColor: '#ffffff' },
  { type: 'fox', label: 'Musang Setia', icon: '🦊', defaultColor: '#f77f00' },
  { type: 'tiger', label: 'Harimau Berjiwa Lembut', icon: '🐯', defaultColor: '#f4a261' },
  { type: 'bear', label: 'Beruang Pelindung', icon: '🐻', defaultColor: '#8d5b4c' },
];

const FRIEND_ACCESSORIES = [
  { id: 'bell', label: 'Loceng Persahabatan', icon: '🔔' },
  { id: 'flower', label: 'Bunga Rimba Cantik', icon: '🌸' },
  { id: 'crown', label: 'Mahkota Bintang', icon: '👑' },
  { id: 'glasses', label: 'Kacamata Comel', icon: '👓' },
  { id: 'bandana', label: 'Bandana Kembar', icon: '🧣' },
  { id: 'cape', label: 'Selendang Pelindung', icon: '🦸' },
];

const FRIEND_TRAITS = [
  'Sentiasa Mendengar Bila Sedih',
  'Suka Berkongsi & Tidak Kedekut',
  'Paling Ikhlas & Memaafkan',
  'Pintar Menyokong Kawan',
  'Sentiasa Menghiburkan & Ceria',
];

const COLOR_PALETTES = ['#e76f51', '#ffb4a2', '#2a9d8f', '#e9ecef', '#8d5b4c', '#f77f00', '#ffffff', '#e0a96d'];
const PAW_COLOR_PALETTES = [
  { color: '#fbcfe8', label: 'Merah Jambu' },
  { color: '#ffffff', label: 'Putih Gebu' },
  { color: '#fef08a', label: 'Kuning Madu' },
  { color: '#fed7aa', label: 'Oren Pic' },
  { color: '#bae6fd', label: 'Biru Awan' },
  { color: '#e9d5ff', label: 'Ungu Comel' },
  { color: '#b45309', label: 'Coklat Lembut' },
  { color: '#334155', label: 'Kelabu Gelap' },
];

export const FriendStudioScreen: React.FC<FriendStudioScreenProps> = ({
  hero,
  initialData,
  onSave,
  onBack,
  onNext,
  onOpenVoiceBooth,
}) => {
  const [friend, setFriend] = useState<CharacterData>({
    ...initialData,
    pawColor: initialData.pawColor || '#fbcfe8',
  });

  const handleTypeSelect = (type: AnimalType, defColor: string) => {
    soundEngine.playClick();
    soundEngine.playAnimalSound(type);
    setFriend((prev) => ({ ...prev, type, color: defColor }));
  };

  const handleAccessorySelect = (accessory: string) => {
    soundEngine.playClick();
    setFriend((prev) => ({ ...prev, accessory }));
  };

  const handleColorSelect = (color: string) => {
    soundEngine.playClick();
    setFriend((prev) => ({ ...prev, color }));
  };

  const handlePawColorSelect = (pawColor: string) => {
    soundEngine.playClick();
    setFriend((prev) => ({ ...prev, pawColor }));
  };

  const handleSaveAndProceed = () => {
    soundEngine.playCorrect();
    onSave(friend);
    onNext();
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <VoiceAssistantBanner
        instructionText="Hebat! Sekarang cipta watak Kawan Baik anda. Watak inilah yang akan muncul dalam video dan memerlukan bantuan anda di Gua Masalah Terpendam!"
        speakerTitle="Panduan Studio Sahabat"
        onOpenVoiceBooth={onOpenVoiceBooth}
      />

      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-rose-400">
        <div className="flex items-center justify-between border-b-2 border-stone-200 pb-4 mb-6">
          <button
            onClick={() => {
              soundEngine.playClick();
              onBack();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Wira</span>
          </button>
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1b4332] flex items-center justify-center gap-2">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
              Langkah 2: Studio Sahabat Sejati
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Kawan baik anda yang akan beraksi bersama dalam kisah pengembaraan!
            </p>
          </div>
          <div className="w-16" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Dual Friendship Live Preview Card */}
          <div className="lg:col-span-5 flex flex-col items-center bg-gradient-to-b from-rose-50 via-amber-50 to-emerald-50 p-6 rounded-2xl border-2 border-rose-300 shadow-inner">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2 flex items-center gap-1">
              <Users className="w-4 h-4" />
              Gandingan Sahabat Rimba
            </div>

            {/* Side-by-side Avatar Duo */}
            <div className="flex items-center justify-center gap-3 my-3">
              {/* Hero */}
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-2xl bg-white shadow-md border-2 border-amber-300">
                  <AnimalAvatar
                    type={hero.type}
                    color={hero.color}
                    pawColor={hero.pawColor || '#ffffff'}
                    accessory={hero.accessory}
                    size={75}
                  />
                </div>
                <span className="text-[11px] font-extrabold text-[#1b4332] mt-1">
                  {hero.name} (Wira)
                </span>
              </div>

              {/* Heart Connection */}
              <div className="flex flex-col items-center">
                <span className="text-2xl animate-bounce">💖</span>
                <span className="text-[9px] font-bold text-rose-600 uppercase">Sahabat</span>
              </div>

              {/* Friend */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => soundEngine.playAnimalSound(friend.type)}
                  className="p-2 rounded-2xl bg-white shadow-md border-2 border-rose-400 hover:scale-105 active:scale-95 transition cursor-pointer relative"
                  title="Tekan untuk dengar suara sahabat!"
                >
                  <AnimalAvatar
                    type={friend.type}
                    color={friend.color}
                    pawColor={friend.pawColor || '#fbcfe8'}
                    accessory={friend.accessory}
                    size={75}
                  />
                  <span className="absolute -bottom-1 -right-1 bg-rose-400 p-1 rounded-full text-white">
                    <Volume2 className="w-3 h-3" />
                  </span>
                </button>
                <span className="text-[11px] font-extrabold text-rose-800 mt-1">
                  {friend.name || 'Sahabat Sejati'}
                </span>
              </div>
            </div>

            {/* Friendship Meter */}
            <div className="w-full bg-white p-3 rounded-xl border border-rose-200 mt-2 shadow-xs">
              <div className="flex justify-between items-center text-xs font-bold text-stone-700 mb-1">
                <span>Tahap Ikatan Persahabatan:</span>
                <span className="text-rose-600">100% Sahabat Sejati</span>
              </div>
              <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 h-full w-full rounded-full" />
              </div>
            </div>

            <p className="text-xs text-stone-600 italic text-center mt-3 bg-white/70 p-2.5 rounded-xl border border-stone-200 w-full">
              "{friend.quote}"
            </p>
          </div>

          {/* Form Controls */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Friend Name */}
            <div>
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5">
                Nama Sahabat Baik Anda:
              </label>
              <input
                type="text"
                value={friend.name}
                onChange={(e) => setFriend({ ...friend, name: e.target.value })}
                placeholder="Contoh: Aminah / Sang Kancil Ceria"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-300 focus:border-rose-400 focus:outline-none text-stone-900 font-bold text-base bg-stone-50"
              />
            </div>

            {/* Friend Animal Type */}
            <div>
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-2">
                Pilih Bentuk Haiwan Sahabat:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {FRIEND_ANIMAL_OPTIONS.map((item) => (
                  <button
                    key={item.type}
                    onClick={() => handleTypeSelect(item.type, item.defaultColor)}
                    className={`p-2 rounded-xl flex flex-col items-center gap-1 border-2 transition cursor-pointer ${
                      friend.type === item.type
                        ? 'border-rose-500 bg-rose-100 shadow-md font-bold scale-105'
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
                Warna Bulu Sahabat:
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {COLOR_PALETTES.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleColorSelect(c)}
                    className={`w-8 h-8 rounded-full border-2 transition transform active:scale-90 cursor-pointer ${
                      friend.color === c ? 'border-stone-900 scale-110 shadow-lg ring-2 ring-rose-400' : 'border-stone-300'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Paw Color Palette (NEW) */}
            <div className="bg-rose-50/70 p-3.5 rounded-2xl border-2 border-rose-300/80">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🐾 Pilih Warna Tapak Tangan Sahabat (Paws):</span>
                </label>
                <span className="text-[10px] font-extrabold text-rose-800 bg-rose-200/80 px-2 py-0.5 rounded-full">
                  Tapak Kaki & Jari (Toe Beans)
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {PAW_COLOR_PALETTES.map((item) => {
                  const isSelected = (friend.pawColor || '#fbcfe8') === item.color;
                  return (
                    <button
                      key={item.color}
                      onClick={() => handlePawColorSelect(item.color)}
                      className={`h-9 px-3 rounded-full border-2 transition-all transform active:scale-90 cursor-pointer flex items-center gap-1.5 shadow-xs ${
                        isSelected
                          ? 'border-stone-950 bg-white ring-2 ring-rose-500 scale-105 font-black text-stone-900'
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
                Aksesori Sahabat:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {FRIEND_ACCESSORIES.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => handleAccessorySelect(acc.id)}
                    className={`p-2 rounded-xl flex flex-col items-center gap-1 border-2 transition cursor-pointer ${
                      friend.accessory === acc.id
                        ? 'border-rose-500 bg-rose-100 shadow-md font-bold scale-105'
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

            {/* Friend Superpower / Trait */}
            <div>
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5">
                Kelebihan Terhebat Sahabat:
              </label>
              <select
                value={friend.trait}
                onChange={(e) => {
                  soundEngine.playClick();
                  setFriend({ ...friend, trait: e.target.value });
                }}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-300 focus:border-rose-400 focus:outline-none text-stone-900 font-semibold text-sm bg-stone-50"
              >
                {FRIEND_TRAITS.map((trait) => (
                  <option key={trait} value={trait}>
                    {trait}
                  </option>
                ))}
              </select>
            </div>

            {/* Friend Quote */}
            <div>
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5">
                Ucapan Kegemaran Sahabat:
              </label>
              <input
                type="text"
                value={friend.quote}
                onChange={(e) => setFriend({ ...friend, quote: e.target.value })}
                placeholder="Contoh: Kita sahabat selamanya, susah senang bersama!"
                className="w-full px-4 py-2 rounded-xl border-2 border-stone-300 focus:border-rose-400 focus:outline-none text-stone-800 text-sm bg-stone-50"
              />
            </div>

            {/* Proceed to Video */}
            <button
              onClick={handleSaveAndProceed}
              className="mt-4 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition"
            >
              <span>Simpan Sahabat & Mula Tonton Video Animasi 7 Babak!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
