import { create } from 'zustand';

type Language = 'FR' | 'EN' | 'SW';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguage = create<LanguageState>((set) => ({
  language: (localStorage.getItem('app-language') as Language) || 'FR',
  setLanguage: (lang) => {
    localStorage.setItem('app-language', lang);
    set({ language: lang });
  },
}));
