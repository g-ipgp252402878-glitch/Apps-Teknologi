import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { soundEngine } from '../services/soundEngine';
import { Download, Sparkles, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={() => {
          soundEngine.playClick();
          install();
        }}
        className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3.5 py-1.5 text-xs font-bold text-gray-900 shadow-md hover:from-amber-300 hover:to-amber-400 active:scale-95 transition-all cursor-pointer"
        title="Pasang Aplikasi Luar Talian (PWA)"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Pasang App (Offline)</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => {
            soundEngine.playClick();
            setShowIOSGuide(true);
          }}
          className="flex items-center gap-1.5 rounded-full border border-amber-300/60 bg-amber-400/20 px-3 py-1 text-xs font-semibold text-amber-200 hover:bg-amber-400/30 transition cursor-pointer"
          title="Pasang di iOS"
        >
          <Download className="w-3 h-3 text-amber-300" />
          <span>Pasang di iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-[#fefae0] border-4 border-amber-400 p-6 shadow-2xl text-stone-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-[#2d6a4f] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Pasang di iPhone / iPad
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-full text-stone-500 hover:bg-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed mb-4">
                1. Tekan butang <strong>Kongsi (Share)</strong> di bar Safari.<br />
                2. Skrol ke bawah dan pilih <strong>'Add to Home Screen' (Tambah ke Skrin Utama)</strong>.<br />
                3. Buka app bila-bila masa walaupun tiada internet!
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-xl bg-[#2d6a4f] py-2.5 text-sm font-bold text-white hover:bg-[#1b4332] transition"
              >
                Faham & Tutup
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
