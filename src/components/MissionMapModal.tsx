import React from 'react';
import { ActiveScreen, AppProgress } from '../types';
import { soundEngine } from '../services/soundEngine';
import { X, CheckCircle2, Lock, MapPin, Sparkles } from 'lucide-react';

interface MissionMapModalProps {
  currentScreen: ActiveScreen;
  progress: AppProgress;
  onNavigate: (screen: ActiveScreen) => void;
  onClose: () => void;
}

interface MapStation {
  id: ActiveScreen;
  name: string;
  locationName: string;
  icon: string;
  description: string;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export const MissionMapModal: React.FC<MissionMapModalProps> = ({
  currentScreen,
  progress,
  onNavigate,
  onClose,
}) => {
  const stations: MapStation[] = [
    {
      id: 'home',
      name: 'Halaman Utama',
      locationName: 'Pintu Gerbang Rimba',
      icon: '🌲',
      description: 'Pusat aktiviti & persediaan pengembaraan.',
      isUnlocked: true,
      isCompleted: true,
    },
    {
      id: 'intro',
      name: 'Kenapa Kawan Penting?',
      locationName: 'Lembah Ilmu & Empati',
      icon: '📖',
      description: 'Mengetahui kepentingan sokongan emosi.',
      isUnlocked: true,
      isCompleted: progress.introViewed,
    },
    {
      id: 'book',
      name: 'Buku Kenangan',
      locationName: 'Pondok Diari Sahabat',
      icon: '📔',
      description: 'Mencatat nama & aktiviti kawan baik.',
      isUnlocked: true,
      isCompleted: progress.memorySaved,
    },
    {
      id: 'hero-studio',
      name: 'Studio Wira',
      locationName: 'Bengkel Wira Haiwan',
      icon: '🐯',
      description: 'Mencipta watak utama penjelajah.',
      isUnlocked: true,
      isCompleted: progress.heroCreated,
    },
    {
      id: 'friend-studio',
      name: 'Studio Sahabat',
      locationName: 'Kubah Sahabat Sejati',
      icon: '💖',
      description: 'Mencipta kawan baik untuk video animasi.',
      isUnlocked: true,
      isCompleted: progress.friendCreated,
    },
    {
      id: 'video',
      name: 'Panggung Video 7 Babak',
      locationName: 'Teater Air Terjun Cahaya',
      icon: '🎬',
      description: 'Menonton kisah penyelamatan penuh dialog.',
      isUnlocked: true,
      isCompleted: progress.videoCompleted,
    },
    {
      id: 'quiz',
      name: 'Kuiz Persahabatan',
      locationName: 'Jambatan Ujian Minda',
      icon: '🧩',
      description: '5 soalan senario persahabatan berempati.',
      isUnlocked: true,
      isCompleted: progress.quizCompleted,
    },
    {
      id: 'cave',
      name: 'Gua Masalah Terpendam',
      locationName: 'Puncak Penyelamatan Akhir',
      icon: '🚪',
      description: 'Buka 3 kunci hati empati untuk selamatkan rakan.',
      isUnlocked: true,
      isCompleted: progress.caveUnlocked,
    },
    {
      id: 'certificate',
      name: 'Sijil Sahabat Hebat',
      locationName: 'Dewan Penganugerahan',
      icon: '🏆',
      description: 'Pentauliahan rasmi Sahabat Sejati.',
      isUnlocked: progress.caveUnlocked,
      isCompleted: progress.certificateEarned,
    },
  ];

  const handleSelectStation = (station: MapStation) => {
    if (!station.isUnlocked) {
      soundEngine.playWrong();
      return;
    }
    soundEngine.playWhoosh();
    onNavigate(station.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-5">
      <div className="w-full max-w-2xl bg-[#fdfbf7] rounded-3xl border-4 border-amber-400 p-5 sm:p-7 shadow-2xl relative max-h-[85vh] flex flex-col text-stone-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-stone-200 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#1b4332]">
                Peta Misi Pengembaraan Rimba
              </h2>
              <p className="text-xs text-stone-600">
                Pilih mana-mana stesen untuk terus ke destinasi!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stations Scrollable List */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-2.5">
          {stations.map((st, idx) => {
            const isCurrent = currentScreen === st.id;

            return (
              <button
                key={st.id}
                onClick={() => handleSelectStation(st)}
                className={`w-full p-3 rounded-2xl border-2 text-left transition flex items-center justify-between gap-3 cursor-pointer ${
                  isCurrent
                    ? 'border-amber-500 bg-amber-100 shadow-md ring-2 ring-amber-400'
                    : st.isCompleted
                    ? 'border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 shadow-xs flex items-center justify-center text-xl shrink-0">
                    {st.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-black text-[#1b4332]">
                        {idx + 1}. {st.name}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-black bg-amber-400 text-stone-900 px-2 py-0.2 rounded-full">
                          Lokasi Semasa
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-800 block">
                      📍 {st.locationName}
                    </span>
                    <p className="text-[11px] text-stone-500 line-clamp-1">{st.description}</p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1.5">
                  {st.isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Selesai
                    </span>
                  ) : !st.isUnlocked ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                      <Lock className="w-3.5 h-3.5" />
                      Terkunci
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-xl">
                      Terbuka ➔
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t-2 border-stone-200 mt-3 flex justify-end">
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs transition cursor-pointer"
          >
            Tutup Peta
          </button>
        </div>
      </div>
    </div>
  );
};
