import React, { useState, useEffect, useRef } from 'react';
import { CharacterData, StoryScene } from '../types';
import { AnimalAvatar } from './AnimalAvatar';
import { StorybookBackground } from './StorybookBackground';
import { soundEngine } from '../services/soundEngine';
import { speechService } from '../services/speechService';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Mic,
  Bookmark,
} from 'lucide-react';

interface VideoTheaterScreenProps {
  hero: CharacterData;
  friend: CharacterData;
  savedVoiceUrl?: string;
  onComplete: () => void;
  onBack: () => void;
  onOpenVoiceBooth: () => void;
}

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export const VideoTheaterScreen: React.FC<VideoTheaterScreenProps> = ({
  hero,
  friend,
  savedVoiceUrl,
  onComplete,
  onBack,
  onOpenVoiceBooth,
}) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [currentSpeakingRole, setCurrentSpeakingRole] = useState<'wira' | 'sahabat' | 'beruang' | 'pencerita' | null>(null);
  const [useCustomVoice, setUseCustomVoice] = useState(!!savedVoiceUrl);
  const [isPageTurning, setIsPageTurning] = useState(false);

  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const scenes: StoryScene[] = [
    {
      id: 1,
      title: 'Keriangan di Hutan Rimba Cahaya',
      location: 'Lembah Sungai Hijau',
      theme: 'forest',
      bgStyle: 'from-emerald-800 via-teal-700 to-emerald-900',
      description: 'Pertemuan wira dan sahabat yang bermain riang di bawah sinaran mentari pagi.',
      dialogues: [
        {
          speaker: 'pencerita',
          text: `Pada suatu pagi yang indah dan damai di Hutan Rimba Cahaya, ${hero.name} dan sahabat akrabnya, ${friend.name}, sedang riang bermain kejar-kejar dan memetik buah beri manis.`,
        },
        {
          speaker: 'wira',
          speakerName: hero.name,
          text: `Wahai sahabatku ${friend.name}, lihatlah betapa cantiknya alam rimba kita hari ini! Tiada perkara yang lebih menggembirakan selain ketawa dan bermain bersama kawan sejati!`,
          emotion: 'happy',
        },
        {
          speaker: 'sahabat',
          speakerName: friend.name,
          text: `Betul itu, ${hero.name}! Walau apa jua cabaran yang mendatang, kita telah berjanji untuk sentiasa setia bersama, susah mahupun senang!`,
          emotion: 'happy',
        },
      ],
    },
    {
      id: 2,
      title: 'Awan Kelabu & Tangisan Pak Beruang',
      location: 'Tepi Hutan Kabut Berduri',
      theme: 'cave',
      bgStyle: 'from-slate-900 via-zinc-800 to-teal-950',
      description: 'Langit bertukar mendung bergemuruh. Pak Beruang muncul memikul beban masalah dan kesunyian.',
      dialogues: [
        {
          speaker: 'pencerita',
          text: 'Tiba-tiba, "DUM!" Guruh berdentum kuat dan awan kelabu tebal menutupi cahaya mentari. Muncul Pak Beruang yang sarat memikul beg Masalah Terpendam.',
        },
        {
          speaker: 'beruang',
          speakerName: 'Pak Beruang',
          text: 'Aduhai, beratnya beban di dadaku ini... Mengapa tiada sesiapa pun yang sudi duduk mendengar rintihan dan kesedihan hatiku?!',
          emotion: 'sad',
        },
        {
          speaker: 'sahabat',
          speakerName: friend.name,
          text: `Lihatlah ${hero.name}! Pak Beruang sedang menangis teresak-esak. Dia kelihatan begitu sunyi, kecewa dan terluka...`,
          emotion: 'caring',
        },
      ],
    },
    {
      id: 3,
      title: 'Sahabat Terperangkap di Gua Sunyi Berbatu',
      location: 'Pintu Gua Masalah Terpendam',
      theme: 'cave',
      bgStyle: 'from-slate-950 via-indigo-950 to-stone-900',
      description: `${friend.name} terperangkap di dalam gua berbatu kerana diselubungi emosi bimbang.`,
      dialogues: [
        {
          speaker: 'pencerita',
          text: `Kerana terperangkap dalam kebimbangan dan salah faham yang mendalam, pintu gua tertutup rapat dan ${friend.name} kini terkurung di sebalik jeriji besi yang terkunci kukuh!`,
        },
        {
          speaker: 'sahabat',
          speakerName: friend.name,
          text: `Tolong saya, ${hero.name}! Di dalam gua ini sangat gelap, dingin dan sunyi! Tolonglah keluarkan saya dari sini!`,
          emotion: 'scared',
        },
        {
          speaker: 'wira',
          speakerName: hero.name,
          text: `Bertenanglah dan jangan takut, wahai sahabatku ${friend.name}! Kawan sejati tidak akan sesekali membiarkan kawannya dalam kesusahan! Aku bersumpah akan menyelamatkanmu!`,
          emotion: 'brave',
        },
      ],
    },
    {
      id: 4,
      title: 'Mengharungi Jeram Deras & Laluan Curam',
      location: 'Titi Kayu & Jeram Pelangi',
      theme: 'forest',
      bgStyle: 'from-emerald-900 via-green-800 to-teal-900',
      description: `${hero.name} mengharungi cabaran curam dan sungai deras mencari jalan penyelesaian.`,
      dialogues: [
        {
          speaker: 'pencerita',
          text: `Dengan semangat waja membara, ${hero.name} berlari pantas menyeberangi titi kayu yang bergoyang di atas jeram sungai bergelora demi mencari penawar untuk membuka pintu gua.`,
        },
        {
          speaker: 'wira',
          speakerName: hero.name,
          text: `Kasih seorang sahabat memberi aku sejuta keberanian! Walau berombak deras sungai ini, aku tidak akan berundur walau setapak! Bertahanlah ${friend.name}!`,
          emotion: 'brave',
        },
      ],
    },
    {
      id: 5,
      title: 'Misteri Tiga Kunci Hati di Air Terjun Budi',
      location: 'Puncak Air Terjun Pelangi',
      theme: 'river',
      bgStyle: 'from-cyan-900 via-teal-800 to-emerald-900',
      description: 'Wira menemui kunci-kunci ajaib: Mendengar, Empati, dan Kasih Sayang.',
      dialogues: [
        {
          speaker: 'pencerita',
          text: 'Di puncak Air Terjun Budi yang dihiasi pelangi gemilang, terpancarlah Tiga Kunci Hati Empati yang berkuasa merawat segala kedukaan dan kekusutan.',
        },
        {
          speaker: 'wira',
          speakerName: hero.name,
          text: 'Inilah rahsianya! Kunci Emas untuk Mendengar, Kunci Biru untuk Kata-kata Semangat, dan Kunci Merah Jambu untuk Pelukan Kasih! Inilah penawar kesedihan Pak Beruang!',
          emotion: 'caring',
        },
      ],
    },
    {
      id: 6,
      title: 'Bicara Lemah Lembut Menenangkan Pak Beruang',
      location: 'Hadapan Gua Berbatu Senja',
      theme: 'cave',
      bgStyle: 'from-zinc-900 via-stone-800 to-amber-950',
      description: 'Wira tidak bertarung, sebaliknya menenangkan Pak Beruang dengan mendengar luahannya.',
      dialogues: [
        {
          speaker: 'beruang',
          speakerName: 'Pak Beruang',
          text: 'Adakah kamu datang ke mari mahu memarahi, mengejek atau menghukumku seperti haiwan yang lain?',
          emotion: 'sad',
        },
        {
          speaker: 'wira',
          speakerName: hero.name,
          text: 'Tidak, Pak Beruang. Kami datang bukan untuk berlawan, tetapi membawa kasih sayang. Kami sedia duduk dan mendengar segala luahan hatimu tanpa menghakimi. Luahkanlah, kami ada di sini.',
          emotion: 'caring',
        },
        {
          speaker: 'beruang',
          speakerName: 'Pak Beruang',
          text: 'Air mata ini menitis kerana rasa syukur... Sungguh lapang dan damai rasa dadaku bila ada insan yang sudi mendengar tanpa menyindir atau memulaukanku!',
          emotion: 'happy',
        },
      ],
    },
    {
      id: 7,
      title: 'Pintu Terbuka & Sorakan Persahabatan Abadi',
      location: 'Taman Bunga Emas & Pelangi',
      theme: 'sunny',
      bgStyle: 'from-amber-600 via-emerald-600 to-teal-800',
      description: `${friend.name} berjaya diselamatkan! Semua haiwan berpelukan dalam keharmonian.`,
      dialogues: [
        {
          speaker: 'pencerita',
          text: 'Pintu gua terbuka luas dengan pancaran cahaya keemasan! Sahabat berlari keluar dan mereka berpelukan erat diiringi sorakan riang seluruh warga rimba!',
        },
        {
          speaker: 'sahabat',
          speakerName: friend.name,
          text: `Syukur yang tidak terhingga! Terima kasih wahai sahabat sejatiku ${hero.name} kerana tidak pernah berputus asa menyelamatkan daku!`,
          emotion: 'happy',
        },
        {
          speaker: 'wira',
          speakerName: hero.name,
          text: `Sama-sama, ${friend.name}! Inilah erti persahabatan sejati! Hati yang berempati dan saling menyayangi adalah harta terindah di alam semesta!`,
          emotion: 'happy',
        },
      ],
    },
  ];

  const currentScene = scenes[currentSceneIdx];
  const currentDialogue = currentScene.dialogues[dialogueIdx] || currentScene.dialogues[0];

  // Adjust background music automatically to scene atmosphere
  useEffect(() => {
    if (currentScene.theme === 'cave') {
      soundEngine.setBgmType('cave');
    } else {
      soundEngine.setBgmType('jungle');
    }
  }, [currentSceneIdx, currentScene.theme]);

  // Read dialogue until the very end, non-robotic and synchronized
  useEffect(() => {
    let isCancelled = false;

    const playCurrentDialogue = async () => {
      if (!isPlayingRef.current) return;

      const dlg = currentScene.dialogues[dialogueIdx];
      if (!dlg) return;

      setCurrentSpeakingRole(dlg.speaker);

      // Custom voice playback support if user recorded
      if (useCustomVoice && savedVoiceUrl && (dlg.speaker === 'wira' || dlg.speaker === 'sahabat')) {
        try {
          const audio = new Audio(savedVoiceUrl);
          await new Promise((res) => {
            audio.onended = res;
            audio.onerror = res;
            audio.play().catch(res);
          });
        } catch {}
      } else {
        // Natural speech synthesis
        await speechService.speakDialogue(dlg.text, {
          speaker: dlg.speaker,
          onStart: () => {
            if (!isCancelled) setCurrentSpeakingRole(dlg.speaker);
          },
          onEnd: () => {
            if (!isCancelled) setCurrentSpeakingRole(null);
          },
        });
      }

      if (isCancelled || !isPlayingRef.current) return;

      // Small natural pause before next line
      await new Promise((r) => setTimeout(r, 700));
      if (isCancelled || !isPlayingRef.current) return;

      // Advance dialogue or next scene
      if (autoAdvance) {
        if (dialogueIdx < currentScene.dialogues.length - 1) {
          setDialogueIdx((prev) => prev + 1);
        } else if (currentSceneIdx < scenes.length - 1) {
          triggerPageTurn(currentSceneIdx + 1, 0);
        } else {
          // Completed all 7 scenes
          soundEngine.playFanfare();
          setIsPlaying(false);
          onComplete();
        }
      }
    };

    playCurrentDialogue();

    return () => {
      isCancelled = true;
      speechService.stop();
      setCurrentSpeakingRole(null);
    };
  }, [currentSceneIdx, dialogueIdx, isPlaying, autoAdvance, useCustomVoice, savedVoiceUrl]);

  const triggerPageTurn = (newSceneIdx: number, newDialogueIdx: number = 0) => {
    soundEngine.playWhoosh();
    setIsPageTurning(true);
    setCurrentSceneIdx(newSceneIdx);
    setDialogueIdx(newDialogueIdx);
    setTimeout(() => {
      setIsPageTurning(false);
    }, 450);
  };

  const togglePlay = () => {
    soundEngine.playClick();
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleReplayDialogue = () => {
    soundEngine.playClick();
    speechService.stop();
    const dlg = currentScene.dialogues[dialogueIdx];
    if (dlg) {
      setCurrentSpeakingRole(dlg.speaker);
      speechService.speakDialogue(dlg.text, {
        speaker: dlg.speaker,
        onEnd: () => setCurrentSpeakingRole(null),
      });
    }
  };

  const handleNextDialogueOrScene = () => {
    soundEngine.playClick();
    speechService.stop();
    if (dialogueIdx < currentScene.dialogues.length - 1) {
      setDialogueIdx((prev) => prev + 1);
    } else if (currentSceneIdx < scenes.length - 1) {
      triggerPageTurn(currentSceneIdx + 1, 0);
    } else {
      soundEngine.playFanfare();
      onComplete();
    }
  };

  const handlePrevScene = () => {
    soundEngine.playClick();
    speechService.stop();
    if (dialogueIdx > 0) {
      setDialogueIdx((prev) => prev - 1);
    } else if (currentSceneIdx > 0) {
      triggerPageTurn(currentSceneIdx - 1, 0);
    }
  };

  const jumpToScene = (idx: number) => {
    soundEngine.playClick();
    speechService.stop();
    triggerPageTurn(idx, 0);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      {/* Top Storybook Header Banner */}
      <div className="w-full bg-gradient-to-r from-[#2c1810] via-[#43281c] to-[#2c1810] rounded-2xl p-4 mb-4 text-white shadow-2xl flex items-center justify-between border-4 border-amber-500 relative">
        <button
          onClick={() => {
            soundEngine.playClick();
            speechService.stop();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-200 text-xs font-bold transition cursor-pointer border border-amber-600/40"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="text-center">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-1.5 font-display">
            <BookOpen className="w-4 h-4 text-amber-400" />
            Buku Cerita Bergambar Rimba
          </div>
          <h2 className="text-base sm:text-xl font-black text-amber-200 font-display">
            Babak {ROMAN_NUMERALS[currentSceneIdx]}: {currentScene.title}
          </h2>
        </div>

        <button
          onClick={() => {
            soundEngine.playClick();
            speechService.stop();
            onOpenVoiceBooth();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-black shadow-md transition cursor-pointer"
          title="Rakam suara sendiri"
        >
          <Mic className="w-3.5 h-3.5 text-stone-900" />
          <span className="hidden sm:inline">Alih Suara</span>
        </button>
      </div>

      {/* ENCHANTED STORYBOOK FRAME (Double Page Open Book Design) */}
      <div className="relative w-full rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-[#3a2012] via-[#24140a] to-[#3a2012] border-6 sm:border-8 border-amber-500 shadow-2xl">
        {/* Book Ribbon Bookmark Decoration */}
        <div className="absolute -top-3 left-16 z-30 flex flex-col items-center">
          <div className="w-8 h-8 bg-rose-600 shadow-md flex items-center justify-center text-white text-xs font-black rounded-t-sm">
            <Bookmark className="w-4 h-4 fill-white" />
          </div>
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-rose-600" />
        </div>

        {/* Storybook Inner Page Container (16:9 Aspect Ratio) */}
        <div
          className={`relative w-full aspect-video max-h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-300 bg-stone-900 transition-all duration-300 ${
            isPageTurning ? 'opacity-70 scale-99 filter brightness-110' : 'opacity-100 scale-100'
          }`}
        >
          {/* THE 7 HANDCRAFTED STORYBOOK BACKGROUNDS */}
          <StorybookBackground sceneId={currentScene.id} />

          {/* Book Spine Center Crease (Gives realistic open storybook depth) */}
          <div className="absolute inset-y-0 left-1/2 w-8 -ml-4 bg-gradient-to-r from-transparent via-black/25 to-transparent pointer-events-none z-15" />

          {/* Storybook Location Badge (Top-Left) */}
          <div className="absolute top-3 left-3 z-25 flex items-center gap-2 bg-[#fefae0]/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full border-2 border-amber-600/70 text-[#1b4332] text-xs font-black shadow-md">
            <span>📍 {currentScene.location}</span>
          </div>

          {/* Storybook Chapter Page Number (Top-Right) */}
          <div className="absolute top-3 right-3 z-25 flex items-center gap-1.5 bg-[#fefae0]/90 backdrop-blur-xs px-3 py-1.5 rounded-full border-2 border-amber-600/70 text-[#1b4332] text-xs font-black shadow-md">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Muka Surat {currentScene.id} / 7</span>
          </div>

          {/* CHARACTERS STAGE (Elevated Above Dialogue Scroll) */}
          <div className="absolute inset-x-0 bottom-28 sm:bottom-32 z-20 flex items-end justify-between px-6 sm:px-18 pointer-events-none">
            {/* WIRA (Hero) on Left Page */}
            <div
              className={`flex flex-col items-center transition-all duration-300 ${
                currentSpeakingRole === 'wira' ? 'scale-110 drop-shadow-2xl' : 'scale-95 opacity-90'
              }`}
            >
              {/* Speaking Callout Bubble */}
              {currentSpeakingRole === 'wira' && (
                <div className="bg-amber-400 text-stone-950 text-[11px] sm:text-xs font-black px-3 py-1 rounded-full mb-1 shadow-lg animate-bounce border-2 border-white flex items-center gap-1">
                  <span>💬 {hero.name}</span>
                </div>
              )}
              <div className="p-1 rounded-2xl bg-white/30 backdrop-blur-xs shadow-md">
                <AnimalAvatar
                  type={hero.type}
                  color={hero.color}
                  pawColor={hero.pawColor || '#ffffff'}
                  accessory={hero.accessory}
                  size={window.innerWidth < 640 ? 80 : 120}
                  isTalking={currentSpeakingRole === 'wira'}
                />
              </div>
              <div className="bg-[#fefae0] text-[#1b4332] px-3 py-0.5 rounded-full text-[11px] font-black mt-1 shadow-md border-2 border-amber-600">
                {hero.name} (Wira)
              </div>
            </div>

            {/* PAK BERUANG in Middle for Cave Scenes */}
            {(currentScene.theme === 'cave' || currentScene.id === 6) && (
              <div
                className={`flex flex-col items-center transition-all duration-300 ${
                  currentSpeakingRole === 'beruang' ? 'scale-115 drop-shadow-2xl' : 'scale-95 opacity-85'
                }`}
              >
                {currentSpeakingRole === 'beruang' && (
                  <div className="bg-rose-500 text-white text-[11px] sm:text-xs font-black px-3 py-1 rounded-full mb-1 shadow-lg animate-bounce border-2 border-white">
                    <span>💬 Pak Beruang</span>
                  </div>
                )}
                <div className="p-1 rounded-2xl bg-stone-900/40 shadow-md">
                  <AnimalAvatar
                    type="bear"
                    color="#6c584c"
                    pawColor="#573e31"
                    size={window.innerWidth < 640 ? 90 : 135}
                    isTalking={currentSpeakingRole === 'beruang'}
                    isSad={currentScene.id < 6}
                  />
                </div>
                <div className="bg-stone-900 text-amber-200 px-3 py-0.5 rounded-full text-[10px] font-black mt-1 shadow-md border border-stone-600">
                  Pak Beruang (Masalah Terpendam)
                </div>
              </div>
            )}

            {/* SAHABAT (Best Friend) on Right Page */}
            <div
              className={`flex flex-col items-center transition-all duration-300 ${
                currentSpeakingRole === 'sahabat' ? 'scale-110 drop-shadow-2xl' : 'scale-95 opacity-90'
              }`}
            >
              {currentSpeakingRole === 'sahabat' && (
                <div className="bg-rose-500 text-white text-[11px] sm:text-xs font-black px-3 py-1 rounded-full mb-1 shadow-lg animate-bounce border-2 border-white flex items-center gap-1">
                  <span>💬 {friend.name}</span>
                </div>
              )}
              <div className="p-1 rounded-2xl bg-white/30 backdrop-blur-xs shadow-md">
                <AnimalAvatar
                  type={friend.type}
                  color={friend.color}
                  pawColor={friend.pawColor || '#fbcfe8'}
                  accessory={friend.accessory}
                  size={window.innerWidth < 640 ? 80 : 120}
                  isTalking={currentSpeakingRole === 'sahabat'}
                  isSad={currentScene.id === 2 || currentScene.id === 3}
                  isTrapped={currentScene.id === 3}
                />
              </div>
              <div className="bg-[#fefae0] text-rose-700 px-3 py-0.5 rounded-full text-[11px] font-black mt-1 shadow-md border-2 border-rose-500">
                {friend.name} (Sahabat)
              </div>
            </div>
          </div>

          {/* PARCHMENT STORYBOOK DIALOGUE SCROLL (Bottom Bar) */}
          <div className="absolute inset-x-3 bottom-2.5 z-30 bg-[#fffdf7]/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border-3 border-amber-600 shadow-2xl flex items-center justify-between gap-3 text-stone-900">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-md shadow-xs ${
                    currentDialogue.speaker === 'wira'
                      ? 'bg-amber-400 text-stone-900 border border-amber-500'
                      : currentDialogue.speaker === 'sahabat'
                      ? 'bg-rose-500 text-white'
                      : currentDialogue.speaker === 'beruang'
                      ? 'bg-stone-800 text-amber-200'
                      : 'bg-emerald-700 text-white'
                  }`}
                >
                  {currentDialogue.speaker === 'wira'
                    ? `🐾 ${hero.name}`
                    : currentDialogue.speaker === 'sahabat'
                    ? `💖 ${friend.name}`
                    : currentDialogue.speaker === 'beruang'
                    ? '🐻 Pak Beruang'
                    : '📖 Pencerita Rimba'}
                </span>
                <span className="text-[11px] font-bold text-stone-500">
                  Ayat {dialogueIdx + 1} daripada {currentScene.dialogues.length}
                </span>
              </div>
              <p className="text-xs sm:text-base font-bold text-stone-800 leading-snug italic font-display">
                "{currentDialogue.text}"
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleReplayDialogue}
                className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition cursor-pointer border border-amber-300"
                title="Baca Semula Dialog Ini"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextDialogueOrScene}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs transition cursor-pointer shadow-sm border border-amber-500"
              >
                <span>Seterusnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STORYBOOK VIDEO CONTROLS BAR */}
      <div className="w-full bg-[#fdfbf7] rounded-2xl p-4 mt-4 shadow-xl border-2 border-stone-200 flex flex-wrap items-center justify-between gap-3 text-stone-800">
        {/* Play / Pause / Nav */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm shadow-md transition cursor-pointer ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Jeda Cerita</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Buka & Main Cerita 📖</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrevScene}
            disabled={currentSceneIdx === 0 && dialogueIdx === 0}
            className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-700 transition cursor-pointer border border-stone-300"
            title="Babak Terdahulu"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={handleNextDialogueOrScene}
            className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer border border-stone-300"
            title="Babak Seterusnya"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Auto Advance Toggle & Voice Info */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-bold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={autoAdvance}
              onChange={(e) => setAutoAdvance(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
            />
            <span>Autobaca Dialog</span>
          </label>

          {savedVoiceUrl && (
            <label className="flex items-center gap-2 text-xs font-bold text-stone-700 cursor-pointer bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-300">
              <input
                type="checkbox"
                checked={useCustomVoice}
                onChange={(e) => setUseCustomVoice(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 cursor-pointer"
              />
              <span className="flex items-center gap-1">
                <Mic className="w-3 h-3 text-rose-500" />
                Suara Rakamanku
              </span>
            </label>
          )}
        </div>

        {/* Proceed to Quiz */}
        <button
          onClick={() => {
            soundEngine.playCorrect();
            speechService.stop();
            onComplete();
          }}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-900 font-black text-xs shadow-md transition cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4 text-stone-900" />
          <span>Selesai Tonton & Ke Kuiz ➔</span>
        </button>
      </div>

      {/* 7 CHAPTER STORYBOOK TABS */}
      <div className="w-full mt-3 flex items-center gap-2 overflow-x-auto pb-2">
        {scenes.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => jumpToScene(idx)}
            className={`flex-1 min-w-[110px] p-2.5 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 cursor-pointer border ${
              currentSceneIdx === idx
                ? 'bg-amber-400 text-stone-950 shadow-md border-amber-600 ring-2 ring-white scale-102 font-black'
                : 'bg-white/90 hover:bg-white text-stone-700 border-stone-200'
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider font-display">Babak {ROMAN_NUMERALS[idx]}</span>
            <span className="truncate w-full text-center text-[11px] leading-tight font-sans">{s.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
