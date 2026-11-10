import React, { useEffect } from 'react';
import { CharacterData, AppProgress } from '../types';
import { soundEngine } from '../services/soundEngine';
import { speechService } from '../services/speechService';
import { AnimalAvatar } from './AnimalAvatar';
import confetti from 'canvas-confetti';
import {
  Award,
  Printer,
  Sparkles,
  RotateCcw,
  Volume2,
  Share2,
  CheckCircle,
  Home,
} from 'lucide-react';

interface CertificateScreenProps {
  hero: CharacterData;
  friend: CharacterData;
  progress: AppProgress;
  onHome: () => void;
  onRestartAdventure: () => void;
}

export const CertificateScreen: React.FC<CertificateScreenProps> = ({
  hero,
  friend,
  progress,
  onHome,
  onRestartAdventure,
}) => {
  useEffect(() => {
    soundEngine.playFanfare();
    try {
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.4 },
      });
    } catch {}
  }, []);

  const todayDate = new Date().toLocaleDateString('ms-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const readCertificate = () => {
    soundEngine.playClick();
    speechService.speakDialogue(
      `Sijil Penghargaan Sahabat Sejati. Dengan sukacitanya dianugerahkan kepada ${hero.name} dan ${friend.name} atas kejayaan mengharungi rintangan rimba, menyemai nilai empati, dan membuktikan ikatan persahabatan yang tulus dan abadi.`,
      { speaker: 'pencerita' }
    );
  };

  const handlePrint = () => {
    soundEngine.playClick();
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Action Bar */}
      <div className="w-full flex items-center justify-between gap-3 mb-4 print:hidden">
        <button
          onClick={() => {
            soundEngine.playClick();
            onHome();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-stone-800 font-extrabold text-xs shadow-md transition cursor-pointer"
        >
          <Home className="w-4 h-4 text-emerald-700" />
          <span>Menu Utama</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={readCertificate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-xs shadow-md transition cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-stone-950" />
            <span>Dengar Bacaan Sijil</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* THE CERTIFICATE */}
      <div className="w-full bg-[#fdfbf7] border-8 sm:border-12 border-amber-400 rounded-3xl p-6 sm:p-12 shadow-2xl relative text-stone-900 text-center select-none overflow-hidden print:border-8 print:p-8">
        {/* Ornate corner borders */}
        <div className="absolute top-3 left-3 text-2xl text-amber-500 opacity-60">⚜️</div>
        <div className="absolute top-3 right-3 text-2xl text-amber-500 opacity-60">⚜️</div>
        <div className="absolute bottom-3 left-3 text-2xl text-amber-500 opacity-60">⚜️</div>
        <div className="absolute bottom-3 right-3 text-2xl text-amber-500 opacity-60">⚜️</div>

        {/* Inner Gold Inset Border */}
        <div className="border-2 border-dashed border-amber-300 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-white/90 via-amber-50/50 to-white/90">
          {/* Header Title */}
          <div className="flex justify-center items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-amber-500 animate-spin" />
            <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-emerald-800">
              Akademi Persahabatan Rimba Cahaya
            </span>
            <Sparkles className="w-6 h-6 text-amber-500 animate-spin" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#1b4332] tracking-wide my-2 uppercase font-display">
            Sijil Sahabat Sejati & Wira Rimba
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 italic mb-6">
            Pentauliahan Khas Atas Kejayaan Menyelamatkan Sahabat & Menyuburkan Nilai Empati
          </p>

          <p className="text-xs sm:text-sm font-semibold text-stone-600 uppercase tracking-widest">
            Dengan penuh rasa bangga dan sukacita dianugerahkan kepada:
          </p>

          {/* Recipient Duo Names */}
          <div className="my-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {/* Hero */}
            <div className="flex flex-col items-center">
              <div className="p-2 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-sm">
                <AnimalAvatar
                  type={hero.type}
                  color={hero.color}
                  pawColor={hero.pawColor || '#ffffff'}
                  accessory={hero.accessory}
                  size={65}
                />
              </div>
              <span className="text-lg sm:text-xl font-black text-[#1b4332] mt-1.5 underline decoration-amber-400 decoration-wavy">
                {hero.name}
              </span>
              <span className="text-[11px] font-bold text-stone-500">Wira Penyelamat</span>
            </div>

            <div className="text-3xl text-rose-500 font-black animate-pulse">&</div>

            {/* Friend */}
            <div className="flex flex-col items-center">
              <div className="p-2 rounded-2xl bg-rose-50 border-2 border-rose-300 shadow-sm">
                <AnimalAvatar
                  type={friend.type}
                  color={friend.color}
                  pawColor={friend.pawColor || '#fbcfe8'}
                  accessory={friend.accessory}
                  size={65}
                />
              </div>
              <span className="text-lg sm:text-xl font-black text-rose-700 mt-1.5 underline decoration-rose-400 decoration-wavy">
                {friend.name}
              </span>
              <span className="text-[11px] font-bold text-stone-500">Sahabat Terhebat</span>
            </div>
          </div>

          {/* Citation Body */}
          <p className="text-xs sm:text-sm font-medium text-stone-700 max-w-xl mx-auto leading-relaxed mb-6">
            Telah berjaya mengharungi 7 babak pengembaraan hutan, merungkai masalah terpendam Pak Beruang melalui kelembutan mendengar, serta membuktikan bahawa kasih sayang dan persahabatan yang ikhlas mampu mengatasi segala rintangan dalam kehidupan.
          </p>

          {/* Badges Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-4">
            <span className="bg-amber-100 border border-amber-300 px-3 py-1 rounded-full text-xs font-black text-amber-900 flex items-center gap-1">
              🏆 Wira Empati
            </span>
            <span className="bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full text-xs font-black text-emerald-900 flex items-center gap-1">
              ⭐ Sahabat Setia
            </span>
            <span className="bg-teal-100 border border-teal-300 px-3 py-1 rounded-full text-xs font-black text-teal-900 flex items-center gap-1">
              👂 Pendengar Bijak
            </span>
            <span className="bg-rose-100 border border-rose-300 px-3 py-1 rounded-full text-xs font-black text-rose-900 flex items-center gap-1">
              💖 Ikatan 100%
            </span>
          </div>

          {/* Signature & Seal Footer */}
          <div className="pt-6 border-t-2 border-amber-200 mt-6 grid grid-cols-3 items-center">
            <div className="text-left">
              <span className="text-[11px] font-bold text-stone-500 block">Tarikh Penganugerahan:</span>
              <span className="text-xs sm:text-sm font-black text-stone-800">{todayDate}</span>
            </div>

            {/* Official Gold Seal Badge */}
            <div className="flex justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border-4 border-amber-200 flex flex-col items-center justify-center shadow-lg transform rotate-6">
                <span className="text-xl sm:text-2xl">🎖️</span>
                <span className="text-[8px] sm:text-[9px] font-black uppercase text-amber-950 tracking-tighter">
                  SEAL RASMI
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold text-stone-500 block">Pengesahan:</span>
              <span className="text-xs sm:text-sm font-black text-[#1b4332]">
                Majlis Rimba Harmoni
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Restart / Replay Buttons */}
      <div className="w-full flex justify-center gap-3 mt-6 print:hidden">
        <button
          onClick={() => {
            soundEngine.playClick();
            onRestartAdventure();
          }}
          className="flex items-center gap-1.5 px-6 py-3 rounded-2xl bg-white hover:bg-stone-100 text-stone-800 font-black text-xs shadow-md transition cursor-pointer border border-stone-300"
        >
          <RotateCcw className="w-4 h-4 text-stone-600" />
          <span>Mula Pengembaraan Baharu</span>
        </button>
      </div>
    </div>
  );
};
