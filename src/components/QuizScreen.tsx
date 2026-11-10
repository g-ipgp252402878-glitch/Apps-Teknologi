import React, { useState } from 'react';
import { QuizQuestion, CharacterData } from '../types';
import { soundEngine } from '../services/soundEngine';
import { speechService } from '../services/speechService';
import { VoiceAssistantBanner } from './VoiceAssistantBanner';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  CheckCircle,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Volume2,
  Award,
  ArrowLeft,
} from 'lucide-react';

interface QuizScreenProps {
  hero: CharacterData;
  friend: CharacterData;
  onComplete: (score: number) => void;
  onBack: () => void;
  onOpenVoiceBooth: () => void;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Apakah tindakan terbaik apabila melihat kawan baik anda duduk bersendirian dan menangis?',
    situation: 'Situasi di waktu rehat sekolah:',
    options: [
      {
        text: 'Duduk di sampingnya dengan lembut, bertanya khabar dan mendengar luahannya.',
        isCorrect: true,
        explanation: 'Tepat sekali! Menjadi pendengar yang empati memberikan rasa selamat dan sokongan emosi.',
      },
      {
        text: 'Ketawakan dia dan beritahu murid lain bahawa dia cengeng.',
        isCorrect: false,
        explanation: 'Kurang tepat. Mengejek kawan yang bersedih akan melukakan perasaannya dengan lebih mendalam.',
      },
      {
        text: 'Pura-pura tidak nampak dan pergi bermain bola sepak.',
        isCorrect: false,
        explanation: 'Kawan sejati peka terhadap kesedihan rakan dan cuba menghulurkan bantuan.',
      },
    ],
  },
  {
    id: 2,
    question: 'Jika kawan baik anda melakukan kesilapan kecil dan meminta maaf secara jujur, apakah sikap kita?',
    situation: 'Situasi perselisihan faham:',
    options: [
      {
        text: 'Membalas dendam dan merosakkan barang kepunyaannya pula.',
        isCorrect: false,
        explanation: 'Sikap dendam hanya akan merosakkan hubungan persahabatan yang telah lama dibina.',
      },
      {
        text: 'Memaafkannya dengan ikhlas dan mencari jalan penyelesaian bersama-sama.',
        isCorrect: true,
        explanation: 'Hebat! Sifat pemaaf adalah tiang utama persahabatan yang kekal abadi.',
      },
      {
        text: 'Memulaukan dia dan menghasut kawan-kawan lain supaya memusuhinya.',
        isCorrect: false,
        explanation: 'Tindakan memulaukan adalah perbuatan buli sosial yang tidak sihat.',
      },
    ],
  },
  {
    id: 3,
    question: 'Kawan anda berasa bimbang kerana sukar memahami sesuatu mata pelajaran. Apakah peranan anda?',
    situation: 'Situasi sesi pembelajaran:',
    options: [
      {
        text: 'Mengajak mengulang kaji bersama dan menerangkan bahagian yang kita fahami.',
        isCorrect: true,
        explanation: 'Sangat baik! Berkongsi ilmu bukan sahaja membantu rakan malah mengukuhkan kefahaman kita.',
      },
      {
        text: 'Memperlekehkan kemampuannya di hadapan guru.',
        isCorrect: false,
        explanation: 'Setiap insan mempunyai tahap pembelajaran yang berbeza dan perlu dihormati.',
      },
      {
        text: 'Menyuruhnya membuat kerja rumah kita sebagai syarat untuk berkawan.',
        isCorrect: false,
        explanation: 'Persahabatan sejati tidak mengambil kesempatan atas kesukaran orang lain.',
      },
    ],
  },
  {
    id: 4,
    question: 'Bagaimanakah watak Wira menyelesaikan masalah dengan Pak Beruang dalam cerita tadi?',
    situation: 'Pengajaran daripada video babak ke-6:',
    options: [
      {
        text: 'Menggunakan kekerasan fizikal dan senjata untuk menundukkannya.',
        isCorrect: false,
        explanation: 'Kekerasan tidak dapat merawat masalah emosi terpendam.',
      },
      {
        text: 'Mendengar luahan hatinya dengan penuh empati dan kasih sayang.',
        isCorrect: true,
        explanation: 'Tepat! Pak Beruang cuma inginkan seseorang yang sudi mendengar tanpa menghukum.',
      },
      {
        text: 'Mengurung Pak Beruang di dalam gua yang lebih gelap.',
        isCorrect: false,
        explanation: 'Mengasingkan orang yang bermasalah hanya menambah beban penderitaan mereka.',
      },
    ],
  },
  {
    id: 5,
    question: 'Apakah erti sebenar Sahabat Sejati?',
    situation: 'Nilai murni persahabatan:',
    options: [
      {
        text: 'Kawan yang hanya mencari kita sewaktu kita mempunyai makanan atau mainan baharu.',
        isCorrect: false,
        explanation: 'Itu kawan ketika senang sahaja, bukan sahabat sejati.',
      },
      {
        text: 'Kawan yang sentiasa menyokong, jujur, setia pada waktu senang mahupun susah.',
        isCorrect: true,
        explanation: 'Syabas! Itulah intipati sebenar persahabatan yang bernilai tinggi!',
      },
      {
        text: 'Kawan yang memaksa kita mengikut semua kehendaknya.',
        isCorrect: false,
        explanation: 'Persahabatan mestilah berasaskan rasa hormat dan saling bertolak ansur.',
      },
    ],
  },
];

export const QuizScreen: React.FC<QuizScreenProps> = ({
  hero,
  friend,
  onComplete,
  onBack,
  onOpenVoiceBooth,
}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOptionIdx(idx);
    setHasAnswered(true);

    const isCorrect = currentQ.options[idx].isCorrect;
    if (isCorrect) {
      soundEngine.playCorrect();
      setScore((prev) => prev + 1);
      speechService.speakDialogue(`Tahniah! Jawapan anda tepat. ${currentQ.options[idx].explanation}`, {
        speaker: 'pencerita',
      });
    } else {
      soundEngine.playWrong();
      speechService.speakDialogue(`Kurang tepat. ${currentQ.options[idx].explanation}`, {
        speaker: 'pencerita',
      });
    }
  };

  const readQuestionAloud = () => {
    soundEngine.playClick();
    speechService.speakDialogue(`${currentQ.situation} ${currentQ.question}`, {
      speaker: 'pencerita',
    });
  };

  const handleNextQuestion = () => {
    soundEngine.playClick();
    speechService.stop();
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
      soundEngine.playFanfare();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  };

  const handleRestartQuiz = () => {
    soundEngine.playClick();
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleProceedToCave = () => {
    soundEngine.playClick();
    onComplete(score);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <VoiceAssistantBanner
        instructionText="Uji kefahaman anda tentang nilai persahabatan! Baca situasi dengan teliti dan pilih jawapan yang paling berempati dan bijak."
        speakerTitle="Panduan Kuiz Persahabatan"
        onOpenVoiceBooth={onOpenVoiceBooth}
      />

      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-amber-400">
        {!isFinished ? (
          <>
            {/* Header & Progress */}
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
                <span className="text-xs font-black text-amber-600 uppercase tracking-wider flex items-center justify-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Soalan {currentQuestionIdx + 1} daripada {QUIZ_QUESTIONS.length}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#1b4332]">
                  Cabaran Nilai Persahabatan
                </h2>
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 bg-amber-100 px-3 py-1.5 rounded-full border border-amber-300">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-black text-amber-800">
                    Skor: {score} / {QUIZ_QUESTIONS.length}
                  </span>
                </div>
                {/* 5-Star Visual Badge Meter */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: QUIZ_QUESTIONS.length }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm transition-transform ${
                        i < score ? 'scale-110 drop-shadow-xs' : 'opacity-30 grayscale'
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden mb-6">
              <div
                className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-gradient-to-br from-amber-50 via-emerald-50 to-teal-50 rounded-2xl p-5 sm:p-6 border-2 border-emerald-300 mb-6 relative">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  {currentQ.situation}
                </span>
                <button
                  onClick={readQuestionAloud}
                  className="flex items-center gap-1 px-3 py-1 rounded-xl bg-white hover:bg-amber-100 text-stone-800 text-xs font-bold shadow-xs border border-amber-300 transition cursor-pointer"
                  title="Dengar bacaan soalan"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Dengar Soalan</span>
                </button>
              </div>
              <p className="text-base sm:text-xl font-black text-stone-900 leading-snug">
                {currentQ.question}
              </p>
            </div>

            {/* Options List */}
            <div className="flex flex-col gap-3 mb-6">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOptionIdx === idx;
                let btnStyle = 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800';

                if (hasAnswered) {
                  if (option.isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400 font-bold';
                  } else if (isSelected && !option.isCorrect) {
                    btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                  } else {
                    btnStyle = 'border-stone-200 bg-stone-100 text-stone-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border-2 text-left text-sm sm:text-base font-semibold transition flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-7 h-7 rounded-xl bg-stone-200/80 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-snug">{option.text}</span>
                    {hasAnswered && option.isCorrect && (
                      <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {hasAnswered && isSelected && !option.isCorrect && (
                      <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Box when answered */}
            {hasAnswered && selectedOptionIdx !== null && (
              <div
                className={`p-4 rounded-2xl border-2 mb-6 ${
                  currentQ.options[selectedOptionIdx].isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div className="font-black text-sm flex items-center gap-1.5 mb-1">
                  {currentQ.options[selectedOptionIdx].isCorrect ? (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Jawapan Anda Betul!</span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-4 h-4 text-rose-600" />
                      <span>Penjelasan Nilai:</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-medium">
                  {currentQ.options[selectedOptionIdx].explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {hasAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-900 font-black text-base shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition"
              >
                <span>
                  {currentQuestionIdx < QUIZ_QUESTIONS.length - 1
                    ? 'Soalan Seterusnya'
                    : 'Lihat Keputusan Kuiz'}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </>
        ) : (
          /* Results View */
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-20 h-20 rounded-full bg-amber-400 border-4 border-amber-200 flex items-center justify-center text-3xl shadow-xl animate-bounce mb-3">
              🏆
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1b4332]">
              Tahniah, {hero.name}!
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-md">
              Anda telah membuktikan kefahaman mendalam tentang nilai persahabatan sejati bersama {friend.name}!
            </p>

            <div className="bg-gradient-to-r from-amber-50 to-emerald-50 border-2 border-amber-300 rounded-2xl p-5 my-6 w-full max-w-md shadow-inner">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Markah Keseluruhan:
              </span>
              <div className="text-4xl font-black text-emerald-700 my-1">
                {score} / {QUIZ_QUESTIONS.length}
              </div>
              <p className="text-xs font-bold text-stone-700">
                {score >= 4
                  ? '🌟 Gelaran: Pakar Persahabatan Rimba Sejati!'
                  : '⭐ Terus amalkan sikap empati & kasih sayang!'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
              <button
                onClick={handleRestartQuiz}
                className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-extrabold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Uji Semula</span>
              </button>

              <button
                onClick={handleProceedToCave}
                className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-[#2d6a4f] hover:from-emerald-500 hover:to-[#1b4332] text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition cursor-pointer active:scale-95"
              >
                <span>Buka Pintu Gua ➔</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
