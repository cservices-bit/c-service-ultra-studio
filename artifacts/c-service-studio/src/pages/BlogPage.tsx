import { useState } from "react";
import { Newspaper, Search, Calendar, Tag, ArrowRight } from "lucide-react";
import { useStore } from "@/stores/useStore";

const POSTS = [
  { id: "b1", title: "10 astuces pour un montage vidéo professionnel", cat: "Montage", date: "2025-05-01", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format", excerpt: "Découvrez les techniques utilisées par les monteurs professionnels pour donner un rendu cinéma à vos vidéos. Transitions, rythme, couleur..." },
  { id: "b2", title: "Comment lancer son studio vidéo avec peu de budget", cat: "Business", date: "2025-04-25", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format", excerpt: "Vous voulez créer votre studio vidéo en RDC ? Voici les équipements essentiels, le budget minimum et les premières étapes pour réussir." },
  { id: "b3", title: "DaVinci Resolve vs Premiere Pro : lequel choisir ?", cat: "Technologie", date: "2025-04-18", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format", excerpt: "Comparatif complet des deux logiciels de montage les plus utilisés au monde. Fonctionnalités, prix, courbe d'apprentissage..." },
  { id: "b4", title: "L'IA dans la création vidéo : révolution ou danger ?", cat: "IA & Digital", date: "2025-04-10", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format", excerpt: "ChatGPT pour les scripts, Midjourney pour les storyboards, Runway pour la génération vidéo... L'IA transforme la création vidéo." },
  { id: "b5", title: "Guide complet : Filmer un mariage en 4K", cat: "Mariage", date: "2025-04-02", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format", excerpt: "Planification, équipement, angles de prise de vue, son, montage... Tout ce qu'il faut savoir pour réaliser un film de mariage exceptionnel." },
  { id: "b6", title: "Les tendances vidéo 2025 à connaître absolument", cat: "Tendances", date: "2025-03-28", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format", excerpt: "Vidéos courtes, contenu vertical, IA générative, réalité augmentée... Les formats qui domineront les réseaux sociaux en 2025." },
];

const CATS = ["Tout", "Montage", "Business", "Technologie", "IA & Digital", "Mariage", "Tendances"];

export default function BlogPage() {
  const [cat, setCat] = useState("Tout");
  const [search, setSearch] = useState("");
  const { language } = useStore();

  const filtered = POSTS.filter(p =>
    (cat === "Tout" || p.cat === cat) &&
    (search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="relative py-16 text-center" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.1) 0%, transparent 60%)' }}>
        <div className="container-cinema">
          <div className="section-tag mx-auto w-fit mb-4"><Newspaper size={12} /> Blog</div>
          <h1 className="section-title mb-4">Blog & <span className="gradient-text">Actualités</span></h1>
          <p className="section-subtitle mx-auto text-center">Articles, astuces et tendances du monde de la production vidéo et du digital</p>
        </div>
      </div>

      <div className="container-cinema py-12">
        {/* Search & filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input placeholder="Rechercher un article..." value={search} onChange={e => setSearch(e.target.value)}
              data-testid="blog-search"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map(c => <button key={c} onClick={() => setCat(c)} className={`tab-btn ${cat === c ? "active" : ""}`}>{c}</button>)}
          </div>
        </div>

        {/* Featured post */}
        {cat === "Tout" && search === "" && filtered[0] && (
          <div className="cinema-card overflow-hidden mb-8 group cursor-pointer">
            <div className="grid md:grid-cols-2">
              <div className="aspect-video md:aspect-auto overflow-hidden">
                <img src={filtered[0].img} alt={filtered[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400"><Tag size={10} className="inline mr-1" />{filtered[0].cat}</span>
                  <span className="text-white/30 text-xs flex items-center gap-1"><Calendar size={11} />{new Date(filtered[0].date).toLocaleDateString("fr-FR")}</span>
                </div>
                <h2 className="text-white font-bold text-xl mb-3 group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "'Poppins',sans-serif" }}>{filtered[0].title}</h2>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{filtered[0].excerpt}</p>
                <button className="btn-cinema btn-primary w-fit text-sm">Lire l'article <ArrowRight size={14} /></button>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(cat !== "Tout" || search !== "" ? filtered : filtered.slice(1)).map(p => (
            <div key={p.id} className="cinema-card overflow-hidden group cursor-pointer" data-testid={`blog-post-${p.id}`}>
              <div className="aspect-video overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50">{p.cat}</span>
                  <span className="text-white/25 text-xs">{new Date(p.date).toLocaleDateString("fr-FR")}</span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "'Poppins',sans-serif" }}>{p.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-4">{p.excerpt}</p>
                <button className="text-cyan-400 text-xs flex items-center gap-1 hover:gap-2 transition-all">
                  Lire la suite <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <Newspaper size={40} className="mx-auto mb-4 opacity-40" />
            <p>Aucun article trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}
