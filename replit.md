# C-SERVICE BUSINESS — ULTRA STUDIO

Site web ultra-premium de production cinéma pour C-SERVICE BUSINESS — ULTRA STUDIO. Propriétaire : Cianney. WhatsApp : +243 850406200. Email : Cianney029@gmail.com. Slogan : "Transformons vos idées en œuvres cinématographiques."

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (API server only)
- `SESSION_SECRET` — session secret for express-session

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- **Frontend**: React 19 + Vite 7 + Tailwind CSS v4 — artifact at `artifacts/c-service-studio/`
- **State**: Zustand v5 with persist middleware (localStorage only, no backend)
- **Router**: Wouter (SPA routing)
- **UI**: Custom cinema dark theme, shadcn/ui base components
- **Fonts**: Bebas Neue, Montserrat, Poppins (Google Fonts)
- **Backend**: Express 5 (API server, minimal use)
- **DB**: PostgreSQL + Drizzle ORM (API server only)

## Where things live

- `artifacts/c-service-studio/src/App.tsx` — router with 14 routes
- `artifacts/c-service-studio/src/stores/useStore.ts` — global Zustand store (auth, language, theme, news, listings, visitors, cookies, intro)
- `artifacts/c-service-studio/src/data/translations.ts` — FR/EN/SW translations (T object)
- `artifacts/c-service-studio/src/index.css` — full cinema dark theme with glassmorphism, glow effects, animations
- `artifacts/c-service-studio/src/components/` — Navbar, Hero, Services, Gallery, Stats, Testimonials, FAQ, News, Business, Academy, Software, Footer, Chatbot, CookieBanner, AuthModal, IntroScreen, CustomCursor, ScrollProgress, BackToTop
- `artifacts/c-service-studio/src/pages/` — Home, AcademyPage, BusinessPage, PortfolioPage, BlogPage, DownloadsPage, ContactPage, AdminPage, LutsPage, TutorialsPage
- `artifacts/c-service-studio/src/pages/legal/` — PrivacyPage, TermsPage, CookiesPage, SecurityPage

## Architecture decisions

- No backend required: all data persisted in localStorage via Zustand persist middleware (`name: 'csb-store'`).
- Admin role auto-assigned to `cianney029@gmail.com` on registration.
- Multilingual (FR/EN/SW) via `T` object in `translations.ts`, switching via Zustand store.
- Custom cursor disabled on touch devices (`pointer: coarse` detection).
- Intro screen shows once per user session, then `introSeen: true` persists.
- Contact form messages stored in localStorage under `csb-messages` key.

## Product

Site web ultra-premium 14 pages :
- **/** — Accueil (Hero, Services, Académie, Galerie, Stats, Logiciels, Actualités, Business, Témoignages, FAQ)
- **/portfolio** — Portfolio cinéma avec filtre et lightbox
- **/academy** — Académie avec 9 formations interactives
- **/business** — Annonces de services avec gestion admin
- **/blog** — Blog avec articles par catégorie
- **/downloads** — 15 logiciels Android/iOS/PC avec téléchargement
- **/luts** — 10 LUTs cinéma avec prévisualisation et download
- **/tutorials** — 8 tutoriels vidéo/articles filtrables
- **/contact** — Formulaire + WhatsApp + carte
- **/admin** — Dashboard admin (actualités, annonces, utilisateurs, messages, stats)
- **/privacy, /terms, /cookies, /security** — Pages légales complètes

## User preferences

- Thème : Dark cinéma ultra-premium (bleu profond, cyan néon, violet, doré)
- Police : Bebas Neue pour les titres, Poppins/Montserrat pour le corps
- WhatsApp : +243 850406200 (Cianney)
- Email admin : cianney029@gmail.com (mot de passe à définir à l'inscription)
- Langue par défaut : Français (FR)
- Ne jamais modifier les coordonnées de contact sans demande explicite

## Gotchas

- L'intro screen ne s'affiche qu'une fois (Zustand persist). Pour la revoir, effacer localStorage.
- Les LUTs et downloads sont des liens vers des fichiers externes/URLs officiels.
- La page Admin est protégée côté client (rôle admin requis). Pas de protection backend.
- Le curseur personnalisé est désactivé sur mobile/tablette.
- Les images proviennent d'Unsplash (production) — prévoir hébergement propre pour le déploiement.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
