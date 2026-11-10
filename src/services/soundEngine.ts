/**
 * Web Audio API Sound Engine
 * Provides 100% offline, realistic procedural sound effects and background adventure music.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGainNode: GainNode | null = null;
  private sfxGainNode: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private bgmIntervalId: number | null = null;
  private currentBgmType: 'jungle' | 'cave' = 'jungle';
  private bgmVolume: number = 0.35;
  private sfxVolume: number = 0.7;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.bgmGainNode = this.ctx.createGain();
      this.bgmGainNode.gain.setValueAtTime(this.isMuted ? 0 : this.bgmVolume, this.ctx.currentTime);
      this.bgmGainNode.connect(this.ctx.destination);

      this.sfxGainNode = this.ctx.createGain();
      this.sfxGainNode.gain.setValueAtTime(this.isMuted ? 0 : this.sfxVolume, this.ctx.currentTime);
      this.sfxGainNode.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.ctx && this.bgmGainNode && this.sfxGainNode) {
      const now = this.ctx.currentTime;
      this.bgmGainNode.gain.setValueAtTime(muted ? 0 : this.bgmVolume, now);
      this.sfxGainNode.gain.setValueAtTime(muted ? 0 : this.sfxVolume, now);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setBgmVolume(val: number) {
    this.bgmVolume = Math.max(0, Math.min(1, val));
    if (this.bgmGainNode && this.ctx && !this.isMuted) {
      this.bgmGainNode.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
    }
  }

  public getBgmVolume(): number {
    return this.bgmVolume;
  }

  // --- SOUND EFFECTS ---

  public playClick() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGainNode || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playCorrect() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGainNode || this.isMuted) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGainNode) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = now + idx * 0.08;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.35, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);

        osc.start(startTime);
        osc.stop(startTime + 0.32);
      });
    } catch {}
  }

  public playWrong() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGainNode || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      // Low friendly wobble
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.15);
      osc.frequency.linearRampToValueAtTime(150, now + 0.3);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  }

  public playFanfare() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGainNode || this.isMuted) return;

      const chords = [
        { freq: 440, delay: 0 },
        { freq: 554.37, delay: 0.12 },
        { freq: 659.25, delay: 0.24 },
        { freq: 880, delay: 0.38 },
        { freq: 1108.73, delay: 0.5 },
      ];
      const now = this.ctx.currentTime;

      chords.forEach(({ freq, delay }) => {
        if (!this.ctx || !this.sfxGainNode) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = now + delay;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.4, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);

        osc.start(startTime);
        osc.stop(startTime + 0.52);
      });
    } catch {}
  }

  public playAnimalSound(type: string) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGainNode || this.isMuted) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      switch (type) {
        case 'tiger':
          // Low resonant gentle roar
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.exponentialRampToValueAtTime(90, now + 0.35);
          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
          break;
        case 'cat':
          // Meow pitch rise then fall
          osc.type = 'sine';
          osc.frequency.setValueAtTime(650, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
          osc.frequency.exponentialRampToValueAtTime(600, now + 0.35);
          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38);
          break;
        case 'rabbit':
          // Cute hop boing
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(350, now);
          osc.frequency.exponentialRampToValueAtTime(700, now + 0.12);
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
          break;
        case 'bear':
          // Friendly bear growl
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(120, now);
          osc.frequency.linearRampToValueAtTime(150, now + 0.15);
          osc.frequency.linearRampToValueAtTime(90, now + 0.4);
          gain.gain.setValueAtTime(0.4, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
          break;
        case 'panda':
          // Sweet gentle chirp
          osc.type = 'sine';
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.linearRampToValueAtTime(680, now + 0.1);
          osc.frequency.linearRampToValueAtTime(520, now + 0.22);
          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
          break;
        case 'fox':
        default:
          // Fox playful yip
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(700, now);
          osc.frequency.exponentialRampToValueAtTime(950, now + 0.1);
          osc.frequency.exponentialRampToValueAtTime(500, now + 0.25);
          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
          break;
      }

      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.5);
    } catch {}
  }

  public playWhoosh() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGainNode || this.isMuted) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  // --- BACKGROUND MUSIC GENERATOR (Looping procedurally) ---

  public startBGM(type: 'jungle' | 'cave' = 'jungle') {
    this.initContext();
    this.currentBgmType = type;
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    // Pentatonic scale marimba & woodwind notes for rich storybook feel
    const jungleNotes = [
      261.63, // C4
      293.66, // D4
      329.63, // E4
      392.00, // G4
      440.00, // A4
      523.25, // C5
      587.33, // D5
      659.25, // E5
    ];
    const caveNotes = [130.81, 155.56, 174.61, 196.0, 220.0]; // Low mysterious pads

    let step = 0;
    const tempo = type === 'jungle' ? 320 : 650; // ms per note

    const playStep = () => {
      if (!this.isBgmPlaying || !this.ctx || !this.bgmGainNode || this.isMuted) return;

      const now = this.ctx.currentTime;

      if (this.currentBgmType === 'jungle') {
        // Melodic cheerful forest arpeggio pattern
        const pattern = [0, 2, 4, 5, 4, 2, 3, 1, 0, 4, 5, 7, 5, 4, 2, 0];
        const noteIdx = pattern[step % pattern.length];
        const freq = jungleNotes[noteIdx];

        // Lead Marimba / Kalimba note
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18 * this.bgmVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

        osc.connect(gain);
        gain.connect(this.bgmGainNode);
        osc.start(now);
        osc.stop(now + 0.4);

        // Harmonizing bell overtone on every other beat
        if (step % 2 === 0) {
          const harmOsc = this.ctx.createOscillator();
          const harmGain = this.ctx.createGain();
          harmOsc.type = 'sine';
          harmOsc.frequency.setValueAtTime(freq * 1.5, now);
          harmGain.gain.setValueAtTime(0.06 * this.bgmVolume, now);
          harmGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          harmOsc.connect(harmGain);
          harmGain.connect(this.bgmGainNode);
          harmOsc.start(now);
          harmOsc.stop(now + 0.32);
        }

        // Warm supportive bass note on every 4 steps
        if (step % 4 === 0) {
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          bassOsc.type = 'sine';
          const bassFreqs = [130.81, 164.81, 174.61, 196.0]; // C3, E3, F3, G3
          const bassFreq = bassFreqs[Math.floor(step / 4) % bassFreqs.length];
          bassOsc.frequency.setValueAtTime(bassFreq, now);
          bassGain.gain.setValueAtTime(0.22 * this.bgmVolume, now);
          bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
          bassOsc.connect(bassGain);
          bassGain.connect(this.bgmGainNode);
          bassOsc.start(now);
          bassOsc.stop(now + 0.95);
        }
      } else {
        // Cave ambient pad with mysterious echoes
        const noteIdx = step % caveNotes.length;
        const freq = caveNotes[noteIdx];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.12 * this.bgmVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.bgmGainNode);
        osc.start(now);
        osc.stop(now + 1.3);
      }

      step++;
    };

    playStep();
    this.bgmIntervalId = window.setInterval(playStep, tempo);
  }

  public setBgmType(type: 'jungle' | 'cave') {
    if (this.currentBgmType === type) return;
    this.currentBgmType = type;
    if (this.isBgmPlaying) {
      this.stopBGM();
      this.startBGM(type);
    }
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmIntervalId !== null) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
  }

  public isMusicPlaying(): boolean {
    return this.isBgmPlaying;
  }
}

export const soundEngine = new SoundEngine();
