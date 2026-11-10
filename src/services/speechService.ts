/**
 * Speech Service:
 * - Natural Voice Synthesis (Bahasa Melayu / Indonesia) with emotive character pitch/rate tuning.
 * - Dialogue completion promise guarantees full spoken delivery without premature cut-offs.
 * - Voice Assistant narrator for reading screen instructions.
 */

export interface SpeechOptions {
  speaker?: 'wira' | 'sahabat' | 'beruang' | 'pencerita';
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private bestVoice: SpeechSynthesisVoice | null = null;
  private isSpeaking: boolean = false;
  private voicesLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (voices.length === 0) return;

    // Search order: Malay (ms-MY), Indonesian (id-ID), or natural sounding multilingual voice
    const malayVoice = voices.find(v => v.lang.toLowerCase().startsWith('ms') || v.lang.toLowerCase().includes('malay'));
    const indonesianVoice = voices.find(v => v.lang.toLowerCase().startsWith('id') || v.lang.toLowerCase().includes('indonesia'));
    const googleNatural = voices.find(v => v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium'));
    
    this.bestVoice = malayVoice || indonesianVoice || googleNatural || voices[0] || null;
    this.voicesLoaded = true;
  }

  public isAvailable(): boolean {
    return !!this.synth;
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }

  /**
   * Speak dialogue and resolve ONLY when finished reading completely.
   */
  public speakDialogue(text: string, options: SpeechOptions = {}): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.synth) {
        // Fallback simulation delay based on word count so animations sync gracefully
        const words = text.split(' ').length;
        const simulatedDurationMs = Math.max(1800, words * 280);
        options.onStart?.();
        this.isSpeaking = true;
        setTimeout(() => {
          this.isSpeaking = false;
          options.onEnd?.();
          resolve(true);
        }, simulatedDurationMs);
        return;
      }

      // Stop previous utterance cleanly and resume synth if stuck
      this.synth.cancel();
      if (this.synth.paused) {
        this.synth.resume();
      }

      // Re-check voices in case they loaded asynchronously
      if (!this.bestVoice) {
        this.loadVoices();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      if (this.bestVoice) {
        utterance.voice = this.bestVoice;
        utterance.lang = this.bestVoice.lang;
      } else {
        utterance.lang = 'ms-MY';
      }

      // Character-specific pitch and cadence for non-robotic, engaging delivery:
      let rate = options.rate ?? 0.94; // slightly relaxed for clear Malay storytelling
      let pitch = options.pitch ?? 1.0;

      if (options.speaker === 'wira') {
        rate = 0.96;
        pitch = 1.08; // energetic, confident hero
      } else if (options.speaker === 'sahabat') {
        rate = 0.92;
        pitch = 1.18; // soft, cute, heartfelt
      } else if (options.speaker === 'beruang') {
        rate = 0.84;
        pitch = 0.74; // deep, slightly sorrowful / contemplative
      } else if (options.speaker === 'pencerita') {
        rate = 0.92;
        pitch = 1.02; // warm, narrative storyteller
      }

      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = options.volume ?? 1.0;

      utterance.onstart = () => {
        this.isSpeaking = true;
        options.onStart?.();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        options.onEnd?.();
        resolve(true);
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis event error:', e);
        this.isSpeaking = false;
        options.onEnd?.();
        resolve(false);
      };

      this.currentUtterance = utterance;
      
      // Resume then speak (fixes Chrome synthesis freeze bug)
      if (this.synth.paused) {
        this.synth.resume();
      }
      this.synth.speak(utterance);
    });
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const speechService = new SpeechService();
