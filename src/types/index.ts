export type AnimalType = 'tiger' | 'cat' | 'rabbit' | 'bear' | 'panda' | 'fox';

export interface CharacterData {
  name: string;
  type: AnimalType;
  color: string;
  pawColor?: string; // Customizable color for paws and pads
  accessory: string; // e.g. 'bandana', 'crown', 'glasses', 'cape', 'bell'
  trait: string; // e.g. 'Penyayang', 'Pemberani', 'Setia', 'Ceria', 'Pendengar Baik'
  quote: string;
}

export interface MemoryBookData {
  friendName: string;
  howWeMet: string;
  favoriteActivity: string;
  bestMemory: string;
  secretCodeName: string;
  friendPromise: string;
}

export interface DialogueLine {
  speaker: 'wira' | 'sahabat' | 'beruang' | 'pencerita';
  speakerName?: string;
  text: string;
  emotion?: 'happy' | 'sad' | 'brave' | 'scared' | 'caring' | 'neutral';
}

export interface StoryScene {
  id: number;
  title: string;
  location: string;
  theme: 'forest' | 'cave' | 'river' | 'sunny';
  description: string;
  dialogues: DialogueLine[];
  bgStyle: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  situation: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface AppProgress {
  introViewed: boolean;
  memorySaved: boolean;
  heroCreated: boolean;
  friendCreated: boolean;
  videoCompleted: boolean;
  quizScore: number;
  quizCompleted: boolean;
  caveUnlocked: boolean;
  certificateEarned: boolean;
  recordedVoiceUrl?: string;
}

export type ActiveScreen =
  | 'home'
  | 'intro'
  | 'book'
  | 'hero-studio'
  | 'friend-studio'
  | 'voice-booth'
  | 'video'
  | 'quiz'
  | 'cave'
  | 'certificate'
  | 'map';
