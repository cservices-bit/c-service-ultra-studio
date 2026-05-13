import { useState } from "react";
import { Play, BookOpen, Search, Clock, Star, Download } from "lucide-react";

const TUTORIALS = [
  { id: "t1", title: "Comment exporter en 4K sur Premiere Pro", cat: "Montage", type: "Vidéo", duration: "12 min", level: "Intermédiaire", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format", rating: 4.9, views: 12400 },
  { id: "t2", title: "Étalonnage cinéma avec DaVinci Resolve", cat: "Color Grading", type: "Vidéo", duration: "28 min", level: "Avancé", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format", rating: 4.8, views: 8900 },
  { id: "t3", title: "Créer une intro animée avec After Effects", cat: "Motion Design", type: "Vidéo", duration: "20 min", level: "Intermédiaire", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format", rating: 4.7, views: 6700 },
  { id: "t4", title: "Monétiser sa chaîne YouTube en RDC", cat: "Business", type: "Article", duration: "8 min", level: "Débutant", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&auto=format", rating: 4.9, views: 15200 },
  { id: "t5", title: "Tourner un clip musical professionnel", cat: "Tournage", type: "Vidéo", duration: "35 min", level: "Avancé", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format", rating: 4.8, views: 9800 },
  { id: "t6", title: "L'éclairage studio parfait pour vidéos", cat: "Tournage", type: "Vidéo", duration: "18 min", level: "Intermédiaire", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&auto=format", rating: 4.7, views: 7200 },
  { id: "t7", title: "CapCut : Maîtriser les effets avancés", cat: "Montage", type: "Vidéo", duration: "15 min", level: "Débutant", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format", rating: 4.6, views: 18400 },
  { id: "t8", title: "ChatGPT pour les scripts vidéo", cat: "IA & Création", type: "Article", duration: "6 min", level: "Tous niveaux", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&auto=format", rating: 4.9, views: 11600 },
];

const CATS = ["Tout", "Montage", "Color Grading", "Motion Design", "Tournage", "Business", "IA & Création"];
const LEVELS: Record<string, string> = {
  "Débutant": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Intermédiaire": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Avancé": "text-red-400 bg-red-400/10 border-red-400/20",
  "Tous niveaux": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
};

export default function TutorialsPage() {
  const [cat, setCat] = useState("Tout");
  const [search, setSearch] = useState("");

  const filtered = TUTORIALS.filter(t =>
    (cat === "Tout" || t.cat === cat) &&
    (search === "" || t.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <div className="relative py-16 text-center" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 60%)' }}>
        <div className="container-cinema">
          <div className="section-tag mx-auto w-fit mb-4"><BookOpen size={12} /> Tutoriels</div>
          <h1 className="section-title mb-4">Tutoriels <span className="gradient-text">Premium</span></h1>
          <p className="section-subtitle mx-auto text-center">Guides vidéo, articles et ressources pour maîtriser les outils créatifs professionnels</p>
        </div>
      </div>

      <div className="container-cinema py-12">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input placeholder="Rechercher un tutoriel..." value={search} onChange={e => setSearch(e.target.value)}
              data-testid="tutorials-search"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map(c => <button key={c} onClick={() => setCat(c)} className={`tab-btn ${cat === c ? "active" : ""}`}>{c}</button>)}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(t => (
            <div key={t.id} className="cinema-card overflow-hidden group cursor-pointer" data-testid={`tutorial-${t.id}`}>
              <div className="relative aspect-video overflow-hidden">
                <img src={t.img} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {t.type === "Vidéo"
                    ? <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-black/40"><Play size={18} className="text-white ml-0.5" /></div>
                    : <div className="w-12 h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-black/40"><BookOpen size={18} className="text-cyan-400" /></div>
                  }
                </div>
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  {t.type === "Vidéo" ? <Play size={10} className="text-cyan-400" /> : <BookOpen size={10} className="text-purple-400" />}
                  <span className="text-white/80 text-xs">{t.type}</span>
                </div>
              </div>
              <div className="p-4">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${LEVELS[t.level] || "text-white/40 bg-white/5 border-white/10"} mb-2 inline-block`}>{t.level}</span>
                <h3 className="text-white text-sm font-semibold mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "'Poppins',sans-serif" }}>{t.title}</h3>
                <div className="flex items-center justify-between text-xs text-white/30">
                  <span className="flex items-center gap-1"><Clock size={10} /> {t.duration}</span>
                  <span className="flex items-center gap-1"><Star size={10} className="text-amber-400" /> {t.rating}</span>
                  <span>{t.views.toLocaleString()} vues</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <BookOpen size={40} className="mx-auto mb-4 opacity-40" />
            <p>Aucun tutoriel trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}
