export type View = 'mood-check-in' | 'chat' | 'garden';

export enum Mood {
  Blooming = 'blooming',
  Droopy = 'droopy',
  Wilted = 'wilted',
  Bud = 'bud',
}

export interface JournalEntry {
  id: string;
  date: Date;
  mood: Mood;
  text: string;
  chatHistory: ChatMessage[];
}

export interface ChatMessage {
  id:string;
  sender: 'user' | 'bloomy';
  text: string;
  isEasterEgg?: boolean;
}

export type Theme = 'Classic' | 'Starlight' | 'Sunset' | 'Forest' | 'Ocean' | 'Custom';
export type Font = 'Nunito' | 'Inter' | 'Lobster' | 'Poppins' | 'Caveat' | 'Comfortaa';

export type PetalColor = 'pink' | 'gold' | 'mixed';
export type PetalSpeed = 'slow' | 'medium' | 'fast';
export type PetalDensity = 'low' | 'medium' | 'high';

export interface PetalSettings {
  enabled: boolean;
  color: PetalColor;
  speed: PetalSpeed;
  density: PetalDensity;
}

export interface CustomTheme {
  c1: string;
  c2: string;
  c3: string;
  c4: string;
}

export interface AppSettings {
  theme: Theme;
  font: Font;
  userName: string;
  petalSettings: PetalSettings;
  customTheme?: CustomTheme;
}