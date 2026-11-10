import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, RotateCcw, Check, Sparkles, Volume2, Info, ArrowLeft } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';
import { speechService } from '../services/speechService';
import { AnimalAvatar } from './AnimalAvatar';
import { CharacterData } from '../types';

interface VoiceBoothScreenProps {
  hero: CharacterData;
  friend: CharacterData;
  savedVoiceUrl?: string;
  onSaveVoice: (audioUrl: string) => void;
  onBack: () => void;
}

export const VoiceBoothScreen: React.FC<VoiceBoothScreenProps> = ({
  hero,
  friend,
  savedVoiceUrl,
  onSaveVoice,
  onBack,
}) => {
  const [targetRole, setTargetRole] = useState<'hero' | 'friend' | 'narrator'>('hero');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(savedVoiceUrl || null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const sampleScripts = {
    hero: `Hai! Saya ${hero.name}! Jangan takut sahabatku, saya akan selamatkan awak walau apa pun rintangan!`,
    friend: `Tolong saya! Saya rindukan awak, sahabat sejati saya!`,
    narrator: `Selamat datang ke Pengembaraan Rimba! Bersama kita terokai nilai persahabatan sejati!`,
  };

  const startRecording = async () => {
    soundEngine.playClick();
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setAudioUrl(base64data);
        };
        // Stop stream tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = window.setInterval(() => {
        setRecordingDuration((prev) => {
          if (prev >= 15) {
            stopRecording();
            return 15;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Mic access error:', err);
      setMicError('Sila benarkan akses mikrofon pelayar untuk membuat rakaman voice over.');
    }
  };

  const stopRecording = () => {
    soundEngine.playClick();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const playRecordedAudio = () => {
    if (!audioUrl) return;
    soundEngine.playClick();

    if (audioElementRef.current) {
      if (isPlayingAudio) {
        audioElementRef.current.pause();
        setIsPlayingAudio(false);
        return;
      }
      audioElementRef.current.play();
      setIsPlayingAudio(true);
      audioElementRef.current.onended = () => setIsPlayingAudio(false);
      audioElementRef.current.onerror = () => setIsPlayingAudio(false);
    }
  };

  const handleSave = () => {
    if (!audioUrl) return;
    soundEngine.playFanfare();
    onSaveVoice(audioUrl);
  };

  const playScriptGuide = () => {
    soundEngine.playClick();
    speechService.speakDialogue(sampleScripts[targetRole], {
      speaker: targetRole === 'hero' ? 'wira' : targetRole === 'friend' ? 'sahabat' : 'pencerita',
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-amber-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-stone-200 pb-4 mb-6">
        <button
          onClick={() => {
            soundEngine.playClick();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1b4332] flex items-center justify-center gap-2">
            <Mic className="w-6 h-6 text-rose-500 animate-pulse" />
            Studio Voice Over & Alih Suara
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Rakam suara anda sendiri untuk menghidupkan watak dalam video pengembaraan!
          </p>
        </div>

        <div className="w-20" />
      </div>

      {/* Role Picker */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button
          onClick={() => {
            soundEngine.playClick();
            setTargetRole('hero');
          }}
          className={`p-3 rounded-2xl flex flex-col items-center gap-2 border-3 transition cursor-pointer ${
            targetRole === 'hero'
              ? 'border-amber-500 bg-amber-50 shadow-md scale-102'
              : 'border-stone-200 bg-white hover:bg-stone-50'
          }`}
        >
          <AnimalAvatar type={hero.type} color={hero.color} accessory={hero.accessory} size={50} />
          <span className="text-xs sm:text-sm font-extrabold text-stone-800">Suara Wira ({hero.name})</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setTargetRole('friend');
          }}
          className={`p-3 rounded-2xl flex flex-col items-center gap-2 border-3 transition cursor-pointer ${
            targetRole === 'friend'
              ? 'border-emerald-500 bg-emerald-50 shadow-md scale-102'
              : 'border-stone-200 bg-white hover:bg-stone-50'
          }`}
        >
          <AnimalAvatar type={friend.type} color={friend.color} accessory={friend.accessory} size={50} />
          <span className="text-xs sm:text-sm font-extrabold text-stone-800">Suara Sahabat ({friend.name})</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setTargetRole('narrator');
          }}
          className={`p-3 rounded-2xl flex flex-col items-center gap-2 border-3 transition cursor-pointer ${
            targetRole === 'narrator'
              ? 'border-indigo-500 bg-indigo-50 shadow-md scale-102'
              : 'border-stone-200 bg-white hover:bg-stone-50'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl shadow">
            🎙️
          </div>
          <span className="text-xs sm:text-sm font-extrabold text-stone-800">Suara Pencerita</span>
        </button>
      </div>

      {/* Script Teleprompter */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-200 mb-6 relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Skrip Dialog Yang Boleh Dibaca:
          </span>
          <button
            onClick={playScriptGuide}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 text-stone-800 text-xs font-bold transition cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            Contoh Suara Panduan
          </button>
        </div>
        <p className="text-stone-800 text-base sm:text-lg font-bold leading-relaxed italic bg-white p-4 rounded-xl border border-amber-200 shadow-inner">
          "{sampleScripts[targetRole]}"
        </p>
      </div>

      {/* Error Notice */}
      {micError && (
        <div className="bg-rose-50 border-2 border-rose-300 text-rose-800 p-3 rounded-xl mb-4 text-xs font-semibold flex items-center gap-2">
          <Info className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{micError}</span>
        </div>
      )}

      {/* Recording Studio Center */}
      <div className="bg-[#1b4332] text-white rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl border-4 border-[#2d6a4f] mb-6">
        {/* Waveform / Visualizer */}
        <div className="h-16 flex items-center justify-center gap-1.5 mb-4">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full bg-gradient-to-t from-amber-400 to-amber-200 transition-all duration-150 ${
                isRecording
                  ? 'animate-pulse'
                  : isPlayingAudio
                  ? 'h-8'
                  : 'h-2 opacity-40'
              }`}
              style={{
                height: isRecording
                  ? `${Math.max(8, (Math.sin(i * 0.8 + recordingDuration * 4) + 1) * 26)}px`
                  : undefined,
              }}
            />
          ))}
        </div>

        {/* Status / Timer */}
        <div className="mb-6">
          {isRecording ? (
            <div className="flex items-center gap-2 text-rose-400 font-extrabold text-lg">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span>SEDANG MERAKAM ({recordingDuration}s / 15s)</span>
            </div>
          ) : audioUrl ? (
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Rakaman Suara Tersedia!</span>
            </div>
          ) : (
            <p className="text-stone-300 text-sm">
              Tekan butang mikrofon merah di bawah untuk mula merakam.
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-extrabold text-base shadow-lg active:scale-95 transition cursor-pointer"
            >
              <Mic className="w-5 h-5" />
              <span>Mula Rakaman</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-stone-900 hover:bg-black text-white font-extrabold text-base shadow-lg active:scale-95 transition cursor-pointer border-2 border-white animate-pulse"
            >
              <Square className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>Berhenti Merakam</span>
            </button>
          )}

          {audioUrl && !isRecording && (
            <>
              <button
                onClick={playRecordedAudio}
                className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-base shadow-lg active:scale-95 transition cursor-pointer"
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-5 h-5 fill-stone-900" />
                    <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-stone-900" />
                    <span>Dengar Semula</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setAudioUrl(null);
                }}
                className="p-3.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                title="Rakam Semula"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Hidden Audio Element for playback */}
        {audioUrl && (
          <audio
            ref={audioElementRef}
            src={audioUrl}
            onEnded={() => setIsPlayingAudio(false)}
            className="hidden"
          />
        )}
      </div>

      {/* Save Button */}
      {audioUrl && (
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-[#2d6a4f] hover:from-emerald-500 hover:to-[#1b4332] text-white font-extrabold text-base shadow-xl active:scale-95 transition cursor-pointer border-2 border-emerald-400"
          >
            <Check className="w-5 h-5" />
            <span>Gunakan Suara Ini Dalam Video & Misi!</span>
          </button>
        </div>
      )}
    </div>
  );
};
