import React, { useState } from 'react';
import { soundEngine } from '../services/soundEngine';
import { speechService } from '../services/speechService';
import { VoiceAssistantBanner } from './VoiceAssistantBanner';
import {
  Heart,
  Smile,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Users,
} from 'lucide-react';

interface IntroScreenProps {
  onNext: () => void;
  onBack: () => void;
  onOpenVoiceBooth: () => void;
}

const PILLARS = [
  {
    title: 'Sokongan Emosi & Tempat Mengadu',
    icon: '💖',
    summary: 'Sahabat sejati adalah pelindung emosi saat kita sedih atau bimbang, sudi mendengar tanpa menghakimi.',
    detail: 'Kajian menunjukkan berkongsi perasaan dengan sahabat dapat mengurangkan stres dan memberi ketenangan jiwa.',
  },
  {
    title: 'Menghapuskan Rasa Sunyi & Terpinggir',
    icon: '🤝',
    summary: 'Kawan baik membuatkan kita rasa dihargai, diterima, dan sebahagian daripada sebuah komuniti yang penyayang.',
    detail: 'Perasaan keseorangan seperti yang dialami Pak Beruang dapat dirawat apabila ada kawan yang sudi menegur dan menemani.',
  },
  {
    title: 'Membantu Dalam Pelajaran & Kehidupan',
    icon: '📚',
    summary: 'Saling belajar, berkongsi kemahiran, dan memberi dorongan untuk mencapai cita-cita murni.',
    detail: 'Dua kepala lebih baik daripada satu! Belajar bersama kawan menjadikan pembelajaran lebih menyeronokkan.',
  },
  {
    title: 'Mengajar Nilai Empati & Memaafkan',
    icon: '🌱',
    summary: 'Melalui persahabatan, kita belajar meletakkan diri di tempat orang lain dan bersikap tolak ansur.',
    detail: 'Persahabatan sejati matang melalui sifat saling memaafkan dan membimbing ke arah kebaikan.',
  },
];

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onNext,
  onBack,
  onOpenVoiceBooth,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<number | null>(0);

  const handleReadPillar = (idx: number) => {
    soundEngine.playClick();
    setSelectedPillar(idx);
    const p = PILLARS[idx];
    speechService.speakDialogue(`${p.title}. ${p.summary} ${p.detail}`, {
      speaker: 'pencerita',
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <VoiceAssistantBanner
        instructionText="Mengapa kawan itu penting dalam hidup kita? Ketahui 4 tonggak sokongan sosial dan persahabatan. Tekan mana-mana kad untuk mendengar penjelasannya!"
        speakerTitle="Panduan Nilai Persahabatan"
        onOpenVoiceBooth={onOpenVoiceBooth}
      />

      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-emerald-400 text-stone-800">
        {/* Header */}
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
            <span className="text-xs font-black text-emerald-700 uppercase tracking-wider flex items-center justify-center gap-1">
              <Users className="w-4 h-4 text-emerald-600" />
              Pendidikan Emosi & Sosial
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1b4332]">
              Mengapa Kawan Itu Sangat Penting?
            </h2>
          </div>

          <div className="w-16" />
        </div>

        {/* Hero Quote */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 rounded-2xl p-4 sm:p-5 border-2 border-emerald-200 mb-6 flex items-center gap-4 shadow-sm">
          <div className="text-3xl shrink-0 p-2 rounded-2xl bg-white shadow-xs">
            🌿
          </div>
          <div>
            <p className="text-stone-800 text-sm sm:text-base font-bold italic leading-relaxed">
              "Kawan sejati bukan sekadar teman bermain di waktu lapang, tetapi tempat perlindungan emosi dan pelita di saat kegelapan."
            </p>
            <span className="text-xs font-black text-emerald-700 uppercase tracking-wider mt-1 block">
              — Falsafah Hutan Rimba Cahaya
            </span>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {PILLARS.map((pillar, idx) => (
            <button
              key={idx}
              onClick={() => handleReadPillar(idx)}
              className={`p-5 rounded-2xl border-2 text-left transition flex flex-col justify-between cursor-pointer ${
                selectedPillar === idx
                  ? 'border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-300'
                  : 'border-stone-200 bg-white hover:bg-stone-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{pillar.icon}</span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                    <Volume2 className="w-3 h-3" />
                    <span>Dengar</span>
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-black text-stone-900 mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed mb-2">
                  {pillar.summary}
                </p>
              </div>

              <div className="text-[11px] font-semibold text-emerald-900 bg-white/80 p-2.5 rounded-xl border border-emerald-200 mt-2">
                💡 {pillar.detail}
              </div>
            </button>
          ))}
        </div>

        {/* Proceed Button */}
        <div className="flex justify-end pt-4 border-t-2 border-stone-200">
          <button
            onClick={() => {
              soundEngine.playClick();
              speechService.stop();
              onNext();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-[#2d6a4f] to-emerald-700 hover:from-emerald-500 hover:to-[#1b4332] text-white font-black text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition"
          >
            <span>Seterusnya: Buku Kenangan Sahabat ➔</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
