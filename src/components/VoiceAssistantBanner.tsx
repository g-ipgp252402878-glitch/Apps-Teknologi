import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Mic } from 'lucide-react';
import { speechService } from '../services/speechService';
import { soundEngine } from '../services/soundEngine';

interface VoiceAssistantBannerProps {
  instructionText: string;
  speakerTitle?: string;
  onOpenVoiceBooth?: () => void;
}

export const VoiceAssistantBanner: React.FC<VoiceAssistantBannerProps> = ({
  instructionText,
  speakerTitle = 'Cikgu Rimba (Suara Panduan)',
  onOpenVoiceBooth,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleSpeak = async () => {
    soundEngine.playClick();
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    await speechService.speakDialogue(instructionText, {
      speaker: 'pencerita',
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
    });
    setIsPlaying(false);
  };

  return (
    <div className="w-full bg-gradient-to-r from-emerald-900/90 via-teal-900/90 to-emerald-950/90 border-2 border-emerald-400/40 rounded-2xl p-3 sm:p-4 mb-5 shadow-lg text-white backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xl shadow-md border-2 border-amber-200">
              🦜
            </div>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {speakerTitle}
              </span>
              {isPlaying && (
                <span className="text-[10px] bg-amber-400 text-stone-900 font-extrabold px-1.5 py-0.5 rounded-full animate-pulse">
                  Sedang Bercakap
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed mt-0.5">
              "{instructionText}"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={handleToggleSpeak}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                : 'bg-amber-400 hover:bg-amber-300 text-stone-950'
            }`}
          >
            {isPlaying ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Hentikan Suara</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>Dengar Arahan</span>
              </>
            )}
          </button>

          {onOpenVoiceBooth && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenVoiceBooth();
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-emerald-100 font-semibold text-xs border border-emerald-400/30 transition cursor-pointer"
              title="Rakam suara anda sendiri untuk watak!"
            >
              <Mic className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Rakam Suara Sendiri</span>
              <span className="sm:hidden">Rakam</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
