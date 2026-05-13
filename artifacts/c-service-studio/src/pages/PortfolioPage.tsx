import { useState } from "react";
import { Grid3X3, Play, Camera, Film, ChevronDown, X } from "lucide-react";

const CATS = ["Tout", "Cinéma", "Clips musicaux", "Mariage", "Publicité", "Documentaire", "Backstage"];

const PROJECTS = [
  { id: "p1", title: "Long Métrage — Kinshasa Dreams", cat: "Cinéma", year: "2024", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format", desc: "Réalisation d'un court-métrage de 28 minutes tourné en 4K dans les quartiers de Kinshasa." },
  { id: "p2", title: "Clip — Artiste Congolais R&B", cat: "Clips musicaux", year: "2024", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format", desc: "Direction artistique complète, tournage en studio et en extérieur, post-production cinéma." },
  { id: "p3", title: "Mariage Royal — Grand Hôtel", cat: "Mariage", year: "2024", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format", desc: "Couverture complète d'un grand mariage avec 3 caméras, drone et son professionnel." },
  { id: "p4", title: "Publicité — Brasserie Nationale", cat: "Publicité", year: "2023", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format", desc: "Spot publicitaire 30s diffusé sur les chaînes nationales. Réalisation, effets visuels et couleur." },
  { id: "p5", title: "Documentaire — Vivre à Kinshasa", cat: "Documentaire", year: "2023", img: "https://images.unsplash.com/photo-1581974267769-2c54a98b4eda?w=800&auto=format", desc: "Documentaire de 45 minutes sur la vie quotidienne dans la capitale congolaise." },
  { id: "p6", title: "Behind The Scenes — Studio Session", cat: "Backstage", year: "2024", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format", desc: "Coulisses d'une session d'enregistrement studio pour un artiste de renom." },
  { id: "p7", title: "Clip Gospel — Louange & Adoration", cat: "Clips musicaux", year: "2024", img: "https://images.unsplash.com/photo-1519167758481-83f29c82dc5c?w=800&auto=format", desc: "Production de clip gospel avec chorégraphie, effets lumières et post-production cinéma." },
  { id: "p8", title: "Publicité — Banque du Congo", cat: "Publicité", year: "2023", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format", desc: "Campagne publicitaire institutionnelle pour une grande institution financière congolaise." },
  { id: "p9", title: "Shooting Photos — Collection Mode", cat: "Backstage", year: "2024", img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&auto=format", desc: "Session photo mode avec stylisme, maquillage professionnel et retouche Lightroom premium." },
];

export default function PortfolioPage() {
  const [cat, setCat] = useState("Tout");
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);

  const filtered = cat === "Tout" ? PROJECTS : PROJECTS.filter(p => p.cat === cat);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <div className="relative py-16 text-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 60%)' }}>
        <div className="container-cinema">
          <div className="section-tag mx-auto w-fit mb-4"><Film size={12} /> Portfolio</div>
          <h1 className="section-title mb-4">Nos <span className="gradient-text">Réalisations</span></h1>
          <p className="section-subtitle mx-auto text-center">Chaque projet raconte une histoire unique. Découvrez l'étendue de notre savoir-faire cinématographique.</p>
        </div>
      </div>

      <div className="container-cinema py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATS.map(c => <button key={c} onClick={() => setCat(c)} className={`tab-btn ${cat === c ? "active" : ""}`}>{c}</button>)}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((p, i) => (
            <div key={p.id} className="break-inside-avoid gallery-item group cursor-pointer rounded-xl overflow-hidden"
              style={{ aspectRatio: i % 3 === 1 ? "4/5" : "16/10" }}
              onClick={() => setSelected(p)} data-testid={`portfolio-${p.id}`}>
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="gallery-overlay flex-col gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <Play size={18} className="text-cyan-400 ml-0.5" />
                </div>
                <div className="text-center px-4">
                  <p className="text-white text-sm font-semibold">{p.title}</p>
                  <p className="text-white/60 text-xs">{p.cat} · {p.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-[8000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelected(null)} />
          <div className="relative z-10 w-full max-w-4xl glass rounded-2xl overflow-hidden border border-white/10">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white z-10">
              <X size={18} />
            </button>
            <img src={selected.img} alt={selected.title} className="w-full aspect-video object-cover" />
            <div className="p-6">
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 mr-3">{selected.cat}</span>
              <span className="text-white/40 text-xs">{selected.year}</span>
              <h3 className="text-white font-semibold text-lg mt-3 mb-2">{selected.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{selected.desc}</p>
              <a href="https://wa.me/243850406200" target="_blank" rel="noopener noreferrer"
                className="btn-cinema btn-primary mt-4 inline-flex text-sm">
                Commander un projet similaire
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
