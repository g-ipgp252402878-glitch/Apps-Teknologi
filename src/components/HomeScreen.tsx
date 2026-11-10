import React from 'react';
import { ActiveScreen, CharacterData, AppProgress } from '../types';
import { AnimalAvatar } from './AnimalAvatar';
import { soundEngine } from '../services/soundEngine';
import { VoiceAssistantBanner } from './VoiceAssistantBanner';
import {
  BookOpen,
  Users,
  Tv,
  HelpCircle,
  Award,
  Mic,
  ArrowRight,
  Sparkles,
  Heart,
  CheckCircle2,
  Compass,
  Music,
} from 'lucide-react';

interface HomeScreenProps {
  hero: CharacterData;
  friend: CharacterData;
  progress: AppProgress;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenVoiceBooth: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  hero,
  friend,
  progress,
  onNavigate,
  onOpenVoiceBooth,
}) => {
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(soundEngine.isMusicPlaying());

  const handleToggleMusic = () => {
    soundEngine.playClick();
    if (soundEngine.isMusicPlaying()) {
      soundEngine.stopBGM();
      setIsMusicPlaying(false);
    } else {
      soundEngine.startBGM('jungle');
      setIsMusicPlaying(true);
    }
  };
  const menuItems = [
    {
      id: 'intro' as ActiveScreen,
      title: 'Kenapa Kawan Penting?',
      subtitle: 'Ketahui nilai sokongan sosial, empati & kesihatan emosi.',
      icon: '📖',
      color: 'border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50',
      badge: progress.introViewed ? 'Selesai' : 'Mula Di Sini',
      isCompleted: progress.introViewed,
    },
    {
      id: 'book' as ActiveScreen,
      title: 'Buku Kenangan Sahabat',
      subtitle: 'Isi maklumat kenangan manis & ikrar janji sahabat sejati.',
      icon: '📔',
      color: 'border-amber-500 bg-amber-50/50 hover:bg-amber-50',
      badge: progress.memorySaved ? 'Tersimpan' : 'Aktiviti Diari',
      isCompleted: progress.memorySaved,
    },
    {
      id: 'hero-studio' as ActiveScreen,
      title: 'Studio Cipta Wira & Sahabat',
      subtitle: 'Pilih haiwan kegemaran, nama unik & fesyen aksesori rimba.',
      icon: '🐯',
      color: 'border-orange-500 bg-orange-50/50 hover:bg-orange-50',
      badge: progress.heroCreated && progress.friendCreated ? '2 Watak Siap' : 'Peribadikan',
      isCompleted: progress.heroCreated && progress.friendCreated,
    },
    {
      id: 'voice-booth' as ActiveScreen,
      title: 'Studio Voice Over / Alih Suara',
      subtitle: 'Rakam suara sendiri menggunakan mikrofon untuk watak video!',
      icon: '🎙️',
      color: 'border-rose-500 bg-rose-50/50 hover:bg-rose-50',
      badge: progress.recordedVoiceUrl ? 'Suara Tersimpan' : 'Ciri Baharu',
      isCompleted: !!progress.recordedVoiceUrl,
    },
    {
      id: 'video' as ActiveScreen,
      title: 'Panggung Video 7 Babak',
      subtitle: 'Tonton kisah pengembaraan menyelamatkan sahabat dengan dialog penuh.',
      icon: '🎬',
      color: 'border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50',
      badge: progress.videoCompleted ? 'Tontonan Penuh' : 'Teater Animasi',
      isCompleted: progress.videoCompleted,
    },
    {
      id: 'quiz' as ActiveScreen,
      title: 'Kuiz Persahabatan',
      subtitle: 'Uji kefahaman tentang situasi empati, memaafkan & menyokong rakan.',
      icon: '🧩',
      color: 'border-teal-500 bg-teal-50/50 hover:bg-teal-50',
      badge: progress.quizCompleted ? `Skor: ${progress.quizScore}/5` : 'Cabaran Minda',
      isCompleted: progress.quizCompleted,
    },
    {
      id: 'cave' as ActiveScreen,
      title: 'Misi Akhir Gua Pak Beruang',
      subtitle: 'Buka 3 kunci empati untuk membuka pintu gua dan selamatkan kawan!',
      icon: '🚪',
      color: 'border-stone-700 bg-stone-100 hover:bg-stone-50',
      badge: progress.caveUnlocked ? 'Berjaya Diselamatkan!' : 'Misi Penyelamatan',
      isCompleted: progress.caveUnlocked,
    },
    {
      id: 'certificate' as ActiveScreen,
      title: 'Sijil Sahabat Hebat',
      subtitle: 'Terima pentauliahan rasmi Sijil Sahabat Sejati dan cetak kebanggaan anda.',
      icon: '🏆',
      color: 'border-yellow-500 bg-yellow-50/60 hover:bg-yellow-100',
      badge: progress.certificateEarned ? 'Telah Diterima' : 'Ganjaran Akhir',
      isCompleted: progress.certificateEarned,
    },
  ];

  const handleCardClick = (screen: ActiveScreen) => {
    soundEngine.playClick();
    onNavigate(screen);
  };

  const handleStartAdventure = () => {
    soundEngine.playCorrect();
    onNavigate('intro');
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <VoiceAssistantBanner
        instructionText="Selamat datang ke Pengembaraan Hutan! Tekan butang 'Mula Pengembaraan' atau pilih mana-mana aktiviti menarik di bawah untuk memulakan misi anda!"
        speakerTitle="Panduan Halaman Utama"
        onOpenVoiceBooth={onOpenVoiceBooth}
      />

      {/* Hero Banner */}
      <div className="w-full bg-gradient-to-br from-emerald-800 via-[#1b4332] to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-4 border-amber-400 mb-6 relative overflow-hidden">
        {/* Decorative backdrop elements */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-10 top-0 w-48 h-48 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Misi Nilai Persahabatan & Empati
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-amber-300 font-display leading-tight mb-2 drop-shadow-sm">
              Selamat Datang ke Dunia Hutan Rimba!
            </h2>

            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-xl mb-5 font-medium">
              Bantu wira haiwan mengharungi rintangan, memahami perasaan Pak Beruang (Masalah Terpendam), dan menyelamatkan sahabat tercinta melalui kuasa empati!
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={handleStartAdventure}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-base shadow-xl flex items-center gap-2.5 active:scale-95 transition cursor-pointer"
              >
                <span>Mula Pengembaraan 🚀</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onNavigate('hero-studio');
                }}
                className="px-5 py-3 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/50 font-bold text-sm flex items-center gap-2 transition cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Cipta Karakter</span>
              </button>

              <button
                onClick={handleToggleMusic}
                className={`px-4 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition cursor-pointer shadow-md ${
                  isMusicPlaying
                    ? 'bg-amber-400 text-stone-950 ring-2 ring-white animate-pulse'
                    : 'bg-emerald-900/90 hover:bg-emerald-800 text-amber-300 border border-amber-400/40'
                }`}
                title="Pasang / Hentikan Muzik Latar Rimba"
              >
                <Music className="w-4 h-4" />
                <span>{isMusicPlaying ? 'Muzik Rimba: Aktif 🎶' : 'Pasang Muzik Latar 🎵'}</span>
              </button>
            </div>
          </div>

          {/* Character Duo Showcase Widget */}
          <div className="shrink-0 bg-stone-950/60 backdrop-blur-md p-4 sm:p-5 rounded-3xl border-2 border-amber-300/60 shadow-xl flex flex-col items-center">
            <div className="text-[11px] font-black uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              Gandingan Sahabat Semasa
            </div>

            <div className="flex items-center gap-3">
              {/* Hero */}
              <div className="flex flex-col items-center">
                <div className="p-1.5 rounded-2xl bg-white/20 border border-amber-300">
                  <AnimalAvatar
                    type={hero.type}
                    color={hero.color}
                    pawColor={hero.pawColor || '#ffffff'}
                    accessory={hero.accessory}
                    size={70}
                  />
                </div>
                <span className="text-[11px] font-bold text-amber-200 mt-1">{hero.name}</span>
                <span className="text-[9px] text-stone-400">(Wira)</span>
              </div>

              <div className="text-2xl text-rose-400 animate-pulse">💖</div>

              {/* Friend */}
              <div className="flex flex-col items-center">
                <div className="p-1.5 rounded-2xl bg-white/20 border border-rose-300">
                  <AnimalAvatar
                    type={friend.type}
                    color={friend.color}
                    pawColor={friend.pawColor || '#fbcfe8'}
                    accessory={friend.accessory}
                    size={70}
                  />
                </div>
                <span className="text-[11px] font-bold text-rose-300 mt-1">{friend.name}</span>
                <span className="text-[9px] text-stone-400">(Sahabat)</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                onNavigate('hero-studio');
              }}
              className="mt-3 text-[11px] font-bold text-amber-300 hover:text-amber-200 underline transition cursor-pointer"
            >
              Ubah Suai Karakter ➔
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Adventure Menus */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <span>🗺️ Stesen Aktiviti Pengembaraan</span>
          </h3>
          <span className="text-xs font-semibold text-emerald-300">
            Pilih stesen mana-mana bila-bila masa
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className={`p-5 rounded-2xl border-l-6 ${item.color} shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-xl text-left flex flex-col justify-between cursor-pointer border-t border-r border-b border-stone-200/60 bg-white`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-1.5 rounded-xl bg-stone-100 shadow-xs">
                    {item.icon}
                  </span>
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      item.isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {item.isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    {item.badge}
                  </span>
                </div>

                <h4 className="text-base font-black text-stone-900 mb-1 leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Teroka Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Auto-Save & Offline Notice Footer */}
      <div className="w-full mt-6 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-emerald-200 text-xs text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Sistem Simpanan Automatik Aktif: Progres, watak, dan diari anda tidak akan hilang.</span>
        </div>
        <span className="font-bold text-amber-300">
          Berfungsi 100% Dalam Talian & Luar Talian (Offline)!
        </span>
      </div>
    </div>
  );
};
