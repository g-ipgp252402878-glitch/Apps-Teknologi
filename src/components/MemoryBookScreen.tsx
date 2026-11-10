import React, { useState } from 'react';
import { MemoryBookData, CharacterData } from '../types';
import { soundEngine } from '../services/soundEngine';
import { speechService } from '../services/speechService';
import { VoiceAssistantBanner } from './VoiceAssistantBanner';
import { AnimalAvatar } from './AnimalAvatar';
import {
  BookOpen,
  Save,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Heart,
  Star,
  CheckCircle,
  Volume2,
} from 'lucide-react';

interface MemoryBookScreenProps {
  hero: CharacterData;
  friend: CharacterData;
  initialData: MemoryBookData;
  onSave: (data: MemoryBookData) => void;
  onBack: () => void;
  onNext: () => void;
  onOpenVoiceBooth: () => void;
}

const STICKERS = ['🌟 Bintang', '💖 Sahabat', '🐾 Rimba', '🍀 Bertuah', '🎈 Ceria', '🏆 Juara'];

export const MemoryBookScreen: React.FC<MemoryBookScreenProps> = ({
  hero,
  friend,
  initialData,
  onSave,
  onBack,
  onNext,
  onOpenVoiceBooth,
}) => {
  const [data, setData] = useState<MemoryBookData>(initialData);
  const [selectedSticker, setSelectedSticker] = useState('💖 Sahabat');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveData = () => {
    soundEngine.playCorrect();
    onSave(data);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleProceed = () => {
    soundEngine.playClick();
    onSave(data);
    onNext();
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <VoiceAssistantBanner
        instructionText="Isi Buku Kenangan Persahabatan Digital anda! Catatkan kenangan manis, janji setia dan aktiviti yang digemari bersama sahabat sejati anda."
        speakerTitle="Panduan Buku Kenangan"
        onOpenVoiceBooth={onOpenVoiceBooth}
      />

      <div className="w-full bg-[#fdfbf7] rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-amber-300 relative text-stone-800">
        {/* Book Header */}
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
            <span className="text-xs font-black text-amber-700 uppercase tracking-wider flex items-center justify-center gap-1">
              <BookOpen className="w-4 h-4 text-amber-600" />
              Diari Kenangan Digital
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1b4332]">
              Buku Kenangan Persahabatan
            </h2>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>{hero.name} & {friend.name}</span>
          </div>
        </div>

        {/* Polaroid Friendship Photo Card Showcase */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-amber-300 shadow-md mb-6 flex flex-col md:flex-row items-center justify-between gap-5 relative">
          {/* Polaroid photo frame */}
          <div className="bg-amber-50/80 p-3 pb-4 rounded-2xl border-4 border-amber-100 shadow-md flex flex-col items-center shrink-0">
            <div className="flex items-center gap-3 bg-gradient-to-br from-emerald-100/70 via-teal-50 to-amber-100/70 p-3 rounded-xl border border-stone-200">
              <div className="flex flex-col items-center">
                <AnimalAvatar
                  type={hero.type}
                  color={hero.color}
                  pawColor={hero.pawColor || '#ffffff'}
                  accessory={hero.accessory}
                  size={65}
                />
                <span className="text-[10px] font-black text-emerald-900 mt-1">{hero.name}</span>
              </div>
              <span className="text-xl animate-pulse">💖</span>
              <div className="flex flex-col items-center">
                <AnimalAvatar
                  type={friend.type}
                  color={friend.color}
                  pawColor={friend.pawColor || '#fbcfe8'}
                  accessory={friend.accessory}
                  size={65}
                />
                <span className="text-[10px] font-black text-rose-900 mt-1">{friend.name}</span>
              </div>
            </div>
            <div className="mt-2 text-[11px] font-black text-stone-700 tracking-wide flex items-center gap-1">
              <span>{selectedSticker}</span>
              <span className="text-stone-400">•</span>
              <span>Sahabat Selamanya</span>
            </div>
          </div>

          {/* Diary Tips & Sticker Bar */}
          <div className="flex-1 w-full flex flex-col justify-between">
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Pilih Cap Pelekat Diari:
                </span>
                <span className="text-[10px] font-bold text-stone-500">Tekan untuk cop pelekat!</span>
              </div>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {STICKERS.map((stk) => (
                  <button
                    key={stk}
                    onClick={() => {
                      soundEngine.playCorrect();
                      setSelectedSticker(stk);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition shrink-0 cursor-pointer ${
                      selectedSticker === stk
                        ? 'bg-amber-400 text-stone-900 shadow-md scale-105 ring-2 ring-amber-500'
                        : 'bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {stk}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200 flex items-center justify-between gap-2">
              <span className="text-xs text-emerald-900 font-medium">
                💡 Janji yang anda tulis di sini akan disimpan dan boleh dibaca semula bila-bila masa!
              </span>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  speechService.speakDialogue(
                    `Ikrar Persahabatan antara ${hero.name} dan ${friend.name}: ${data.friendPromise || 'Sentiasa setia bersama, susah mahupun senang!'}`,
                    { speaker: 'wira' }
                  );
                }}
                className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                title="Dengar bacaan ikrar"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Dengar Ikrar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* 1. Nama Sahabat */}
          <div className="bg-white p-4 rounded-2xl border-2 border-stone-200 shadow-xs">
            <label className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span>1. Nama Penuh / Gelaran Kawan Baik:</span>
            </label>
            <input
              type="text"
              value={data.friendName}
              onChange={(e) => setData({ ...data, friendName: e.target.value })}
              placeholder="Contoh: Nur Aminah / Danial"
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-emerald-600 focus:outline-none text-stone-900 font-bold text-sm bg-stone-50"
            />
          </div>

          {/* 2. Di mana berkenalan */}
          <div className="bg-white p-4 rounded-2xl border-2 border-stone-200 shadow-xs">
            <label className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-1.5">
              2. Bagaimana / Di Mana Mula Berkenalan?
            </label>
            <input
              type="text"
              value={data.howWeMet}
              onChange={(e) => setData({ ...data, howWeMet: e.target.value })}
              placeholder="Contoh: Duduk sebelah di dalam kelas"
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-emerald-600 focus:outline-none text-stone-900 font-semibold text-sm bg-stone-50"
            />
          </div>

          {/* 3. Aktiviti kegemaran */}
          <div className="bg-white p-4 rounded-2xl border-2 border-stone-200 shadow-xs">
            <label className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-1.5">
              3. Aktiviti Yang Paling Seronok Dilakukan Bersama:
            </label>
            <input
              type="text"
              value={data.favoriteActivity}
              onChange={(e) => setData({ ...data, favoriteActivity: e.target.value })}
              placeholder="Contoh: Mengulang kaji & bermain basikal"
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-emerald-600 focus:outline-none text-stone-900 font-semibold text-sm bg-stone-50"
            />
          </div>

          {/* 4. Kenangan Manis */}
          <div className="bg-white p-4 rounded-2xl border-2 border-stone-200 shadow-xs">
            <label className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-1.5">
              4. Kenangan Paling Manis / Paling Disayangi:
            </label>
            <input
              type="text"
              value={data.bestMemory}
              onChange={(e) => setData({ ...data, bestMemory: e.target.value })}
              placeholder="Contoh: Waktu dia tolong pinjamkan warna ketika melukis"
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-emerald-600 focus:outline-none text-stone-900 font-semibold text-sm bg-stone-50"
            />
          </div>

          {/* 5. Kod Rahsia */}
          <div className="bg-white p-4 rounded-2xl border-2 border-stone-200 shadow-xs">
            <label className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-1.5">
              5. Nama Gelaran Rahsia / Kod Khas Persahabatan:
            </label>
            <input
              type="text"
              value={data.secretCodeName}
              onChange={(e) => setData({ ...data, secretCodeName: e.target.value })}
              placeholder="Contoh: Pasukan Sahabat Bintang 7"
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-emerald-600 focus:outline-none text-stone-900 font-semibold text-sm bg-stone-50"
            />
          </div>

          {/* 6. Janji Setia */}
          <div className="bg-white p-4 rounded-2xl border-2 border-stone-200 shadow-xs">
            <label className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-1.5">
              6. Janji Sahabat Sejati (Ikrar):
            </label>
            <input
              type="text"
              value={data.friendPromise}
              onChange={(e) => setData({ ...data, friendPromise: e.target.value })}
              placeholder="Contoh: Sentiasa menyokong & tidak akan mengejek"
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-emerald-600 focus:outline-none text-stone-900 font-semibold text-sm bg-stone-50"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t-2 border-stone-200">
          <button
            onClick={handleSaveData}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-black text-sm flex items-center justify-center gap-2 transition cursor-pointer border border-stone-300"
          >
            {isSaved ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Tersimpan dalam Memori!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-stone-600" />
                <span>Simpan Diari</span>
              </>
            )}
          </button>

          <button
            onClick={handleProceed}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-[#2d6a4f] to-emerald-700 hover:from-emerald-500 hover:to-[#1b4332] text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition"
          >
            <span>Teruskan ke Studio Watak ➔</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
