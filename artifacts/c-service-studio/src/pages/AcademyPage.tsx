import { useState } from "react";
import { GraduationCap, Play, Search, Star, Clock, Users, BookOpen, Award } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { T } from "@/data/translations";

const ALL_COURSES = [
  { id: "a1", title: "Montage Vidéo Professionnel", cat: "Montage", level: "Débutant → Pro", duration: "12h", students: 340, rating: 4.9, color: "#00d4ff", badge: "Bestseller", desc: "Maîtrisez Adobe Premiere Pro, DaVinci Resolve et CapCut. De l'import à l'export final, couvrez tous les aspects du montage professionnel." },
  { id: "a2", title: "Business Digital & Réseaux Sociaux", cat: "Business", level: "Intermédiaire", duration: "8h", students: 210, rating: 4.8, color: "#7c3aed", badge: "Populaire", desc: "Créez et monétisez votre présence digitale. Stratégies Instagram, TikTok, YouTube et Facebook pour les créatifs et entrepreneurs." },
  { id: "a3", title: "Tournage Cinéma 4K", cat: "Tournage", level: "Avancé", duration: "16h", students: 180, rating: 4.9, color: "#0062ff", badge: "Nouveau", desc: "Apprenez à cadrer, éclairer et filmer comme un professionnel. Gestion de l'exposition, mise au point, direction artistique et organisation de plateau." },
  { id: "a4", title: "Motion Design & Animation", cat: "Motion", level: "Intermédiaire", duration: "10h", students: 150, rating: 4.7, color: "#f59e0b", badge: null, desc: "Créez des animations percutantes avec After Effects. Intros, génériques, infographies animées et effets visuels pour vos vidéos." },
  { id: "a5", title: "Marketing Digital & IA", cat: "Marketing", level: "Tous niveaux", duration: "6h", students: 280, rating: 4.8, color: "#10b981", badge: "Tendance", desc: "Utilisez l'intelligence artificielle pour booster votre marketing. ChatGPT, Midjourney, stratégies de contenu et automatisation." },
  { id: "a6", title: "IA Créative & Automatisation", cat: "IA", level: "Avancé", duration: "8h", students: 120, rating: 4.9, color: "#ef4444", badge: "Nouveau", desc: "Automatisez votre flux de travail créatif avec l'IA. Génération d'images, scripts automatiques, workflows optimisés." },
  { id: "a7", title: "Photographie Professionnelle", cat: "Photo", level: "Débutant → Pro", duration: "14h", students: 200, rating: 4.8, color: "#00d4ff", badge: null, desc: "Du mode manuel à la retouche Lightroom. Maîtrisez l'exposition, la composition et le traitement des photos professionnelles." },
  { id: "a8", title: "Drone & Prises de Vue Aériennes", cat: "Drone", level: "Intermédiaire", duration: "6h", students: 90, rating: 4.7, color: "#7c3aed", badge: null, desc: "Pilotage de drone DJI, réglages caméra, cadrage aérien et intégration dans vos productions vidéo." },
  { id: "a9", title: "Étalonnage & Color Grading", cat: "Montage", level: "Avancé", duration: "10h", students: 130, rating: 4.9, color: "#0062ff", badge: "Expert", desc: "Maîtrisez l'étalonnage colorimétrique avec DaVinci Resolve. LUTs, courbes, qualificateurs et looks cinéma professionnels." },
];

const CATS = ["Tout", "Montage", "Business", "Tournage", "Motion", "Marketing", "IA", "Photo", "Drone"];

const BADGE_COLORS: Record<string, string> = {
  "Bestseller": "bg-amber-400/15 text-amber-400 border-amber-400/25",
  "Populaire": "bg-purple-400/15 text-purple-400 border-purple-400/25",
  "Nouveau": "bg-emerald-400/15 text-emerald-400 border-emerald-400/25",
  "Tendance": "bg-cyan-400/15 text-cyan-400 border-cyan-400/25",
  "Expert": "bg-red-400/15 text-red-400 border-red-400/25",
};

export default function AcademyPage() {
  const [cat, setCat] = useState("Tout");
  const [search, setSearch] = useState("");
  const { language } = useStore();
  const t = T[language];

  const filtered = ALL_COURSES.filter(c =>
    (cat === "Tout" || c.cat === cat) &&
    (search === "" || c.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,98,255,0.15) 0%, transparent 60%)' }}>
        <div className="container-cinema text-center">
          <div className="section-tag mx-auto w-fit mb-4"><GraduationCap size={12} /> Académie C-SERVICE</div>
          <h1 className="section-title mb-4">{t.academy.title}</h1>
          <p className="section-subtitle mx-auto text-center">{t.academy.sub}</p>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
            {[
              { icon: BookOpen, label: "9 cours disponibles", color: "#00d4ff" },
              { icon: Users, label: "1200+ étudiants", color: "#7c3aed" },
              { icon: Award, label: "Certificat inclus", color: "#f59e0b" },
              { icon: Clock, label: "Accès à vie", color: "#10b981" },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2 text-sm text-white/60">
                <s.icon size={16} style={{ color: s.color }} /> {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-cinema py-12">
        {/* Search & filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input placeholder="Rechercher une formation..." value={search} onChange={e => setSearch(e.target.value)}
              data-testid="academy-search"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} data-testid={`academy-cat-${c}`}
                className={`tab-btn ${cat === c ? "active" : ""}`}>{c}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <div key={c.id} className="cinema-card p-6 group cursor-pointer" data-testid={`academy-course-${c.id}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}>
                  <Play size={20} style={{ color: c.color }} className="ml-0.5" />
                </div>
                {c.badge && <span className={`text-xs px-2.5 py-0.5 rounded-full border ${BADGE_COLORS[c.badge]}`}>{c.badge}</span>}
              </div>
              <h3 className="text-white font-semibold text-base mb-2 group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "'Poppins',sans-serif" }}>{c.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-3">{c.desc}</p>
              <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                <span className="flex items-center gap-1"><Clock size={11} /> {c.duration}</span>
                <span className="flex items-center gap-1"><Star size={11} className="text-amber-400" /> {c.rating}</span>
                <span className="flex items-center gap-1"><Users size={11} /> {c.students}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-1">
                <div className="progress-bar-fill h-full rounded-full" style={{ width: '0%', transition: 'width 0s' }} />
              </div>
              <p className="text-white/25 text-xs mb-4">{c.level}</p>
              <button className="btn-cinema btn-primary w-full justify-center text-sm">
                <Play size={14} /> Commencer la formation
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <GraduationCap size={40} className="mx-auto mb-4 opacity-40" />
            <p>Aucune formation trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}
