import { CharacterData, MemoryBookData, AppProgress } from '../types';

const STORAGE_KEY = 'wira_rimba_adventure_v2';

export interface StoredAppData {
  hero: CharacterData;
  friend: CharacterData;
  memory: MemoryBookData;
  progress: AppProgress;
}

export const defaultHero: CharacterData = {
  name: 'Sang Belang Wira',
  type: 'tiger',
  color: '#f4a261',
  pawColor: '#ffffff',
  accessory: 'bandana',
  trait: 'Pemberani & Penyayang',
  quote: 'Tiada kawan yang tertinggal di belakang!',
};

export const defaultFriend: CharacterData = {
  name: 'Sang Kancil Ceria',
  type: 'cat',
  color: '#e76f51',
  pawColor: '#fbcfe8',
  accessory: 'bell',
  trait: 'Setia & Pendengar Yang Baik',
  quote: 'Persahabatan kita harta paling bernilai!',
};

export const defaultMemory: MemoryBookData = {
  friendName: 'Aminah',
  howWeMet: 'Bermain buaian bersama di tadika rimba.',
  favoriteActivity: 'Membaca buku cerita & berkongsi bekalan.',
  bestMemory: 'Bila kawan tolong waktu terseliuh kaki di padang.',
  secretCodeName: 'Sahabat Bintang 7',
  friendPromise: 'Akan selalu saling menyokong waktu gembira mahupun susah.',
};

export const defaultProgress: AppProgress = {
  introViewed: false,
  memorySaved: false,
  heroCreated: false,
  friendCreated: false,
  videoCompleted: false,
  quizScore: 0,
  quizCompleted: false,
  caveUnlocked: false,
  certificateEarned: false,
  recordedVoiceUrl: undefined,
};

export const storageService = {
  loadData(): StoredAppData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          hero: { ...defaultHero, ...parsed.hero },
          friend: { ...defaultFriend, ...parsed.friend },
          memory: { ...defaultMemory, ...parsed.memory },
          progress: { ...defaultProgress, ...parsed.progress },
        };
      }
    } catch (e) {
      console.warn('Failed to load local state:', e);
    }
    return {
      hero: { ...defaultHero },
      friend: { ...defaultFriend },
      memory: { ...defaultMemory },
      progress: { ...defaultProgress },
    };
  },

  saveData(data: StoredAppData) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save local state:', e);
    }
  },

  resetAll(): StoredAppData {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear storage:', e);
    }
    return {
      hero: { ...defaultHero },
      friend: { ...defaultFriend },
      memory: { ...defaultMemory },
      progress: { ...defaultProgress },
    };
  },
};
