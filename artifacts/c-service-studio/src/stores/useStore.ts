import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'FR' | 'EN' | 'SW';
export type Theme = 'dark' | 'light';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  joinedAt: string;
  favorites: string[];
  downloads: string[];
  progress: Record<string, number>;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  author: string;
}

export interface BusinessListing {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  whatsapp: string;
}

interface AppStore {
  // Theme
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;

  // Language
  language: Language;
  setLanguage: (l: Language) => void;

  // Auth
  currentUser: User | null;
  users: User[];
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  toggleFavorite: (id: string) => void;

  // News
  news: NewsItem[];
  addNews: (item: Omit<NewsItem, 'id' | 'date'>) => void;
  deleteNews: (id: string) => void;

  // Business
  listings: BusinessListing[];
  addListing: (item: Omit<BusinessListing, 'id'>) => void;
  deleteListing: (id: string) => void;

  // Visitors
  visitCount: number;
  incrementVisits: () => void;

  // Cookie consent
  cookieConsent: boolean | null;
  setCookieConsent: (v: boolean) => void;

  // Intro
  introSeen: boolean;
  setIntroSeen: () => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

const defaultNews: NewsItem[] = [
  {
    id: uid(), title: 'Nouveau studio ultra moderne à Kinshasa',
    description: 'C-SERVICE BUSINESS ouvre son nouveau studio équipé des dernières technologies cinématographiques professionnelles.',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format',
    category: 'Studio', date: new Date().toISOString(), author: 'Cianney'
  },
  {
    id: uid(), title: 'Formation Montage Vidéo — Inscriptions ouvertes',
    description: 'Notre nouvelle formation professionnelle en montage vidéo est disponible. Places très limitées.',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&auto=format',
    category: 'Académie', date: new Date(Date.now() - 864e5 * 3).toISOString(), author: 'Cianney'
  },
  {
    id: uid(), title: 'Clip musical 4K — Projet réalisé avec succès',
    description: 'Notre équipe a finalisé un clip musical exceptionnel pour un artiste de renom international. Qualité cinéma 4K HDR.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format',
    category: 'Réalisation', date: new Date(Date.now() - 864e5 * 7).toISOString(), author: 'Cianney'
  },
];

const defaultListings: BusinessListing[] = [
  { id: uid(), title: 'Montage vidéo professionnel', price: '50$', description: 'Montage complet avec effets, transitions et musique professionnelle.', category: 'Montage', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400', whatsapp: '+243850406200' },
  { id: uid(), title: 'Tournage cinéma Pack complet', price: '200$', description: 'Tournage professionnel 4K avec éclairage et son. Idéal pour clips et publicités.', category: 'Tournage', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400', whatsapp: '+243850406200' },
  { id: uid(), title: 'Photographie événementielle', price: '80$', description: 'Couverture photo complète de vos événements. Mariages, conférences, lancements.', category: 'Photo', image: 'https://images.unsplash.com/photo-1537633468092-8fab0d028d9c?w=400', whatsapp: '+243850406200' },
];

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
      },
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        get().setTheme(next);
      },

      language: 'FR',
      setLanguage: (language) => set({ language }),

      currentUser: null,
      users: [],
      register: (name, email, password) => {
        const { users } = get();
        if (users.find(u => u.email === email)) return { success: false, error: 'Cet email est déjà utilisé.' };
        const user: User = {
          id: uid(), name, email, role: email === 'cianney029@gmail.com' ? 'admin' : 'user',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00d4ff&color=050a14&bold=true&size=128`,
          joinedAt: new Date().toISOString(), favorites: [], downloads: [], progress: {}
        };
        const stored = [...users, { ...user, password }];
        set({ users: stored as any, currentUser: user });
        return { success: true };
      },
      login: (email, password) => {
        const { users } = get();
        const found = (users as any[]).find(u => u.email === email && u.password === password);
        if (!found) return { success: false, error: 'Email ou mot de passe incorrect.' };
        const { password: _p, ...user } = found;
        set({ currentUser: user });
        return { success: true };
      },
      logout: () => set({ currentUser: null }),
      updateProfile: (updates) => {
        const u = get().currentUser;
        if (!u) return;
        const updated = { ...u, ...updates };
        set({ currentUser: updated });
      },
      toggleFavorite: (id) => {
        const u = get().currentUser;
        if (!u) return;
        const favs = u.favorites.includes(id) ? u.favorites.filter(f => f !== id) : [...u.favorites, id];
        set({ currentUser: { ...u, favorites: favs } });
      },

      news: defaultNews,
      addNews: (item) => set(s => ({ news: [{ ...item, id: uid(), date: new Date().toISOString() }, ...s.news] })),
      deleteNews: (id) => set(s => ({ news: s.news.filter(n => n.id !== id) })),

      listings: defaultListings,
      addListing: (item) => set(s => ({ listings: [{ ...item, id: uid() }, ...s.listings] })),
      deleteListing: (id) => set(s => ({ listings: s.listings.filter(l => l.id !== id) })),

      visitCount: 0,
      incrementVisits: () => set(s => ({ visitCount: s.visitCount + 1 })),

      cookieConsent: null,
      setCookieConsent: (v) => set({ cookieConsent: v }),

      introSeen: false,
      setIntroSeen: () => set({ introSeen: true }),
    }),
    { name: 'csb-store' }
  )
);
