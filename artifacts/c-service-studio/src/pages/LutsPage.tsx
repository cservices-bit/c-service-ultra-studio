import { useState } from "react";
import { Download, Star, Heart, Filter } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { toast } from "sonner";

const LUTS = [
  { id: "l1", name: "Teal & Orange", cat: "Cinéma", color: "from-teal-500 to-orange-500", preview: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format", rating: 4.9, downloads: 2400, compat: ["Premiere Pro", "DaVinci Resolve", "CapCut"] },
  { id: "l2", name: "Hollywood Gold", cat: "Hollywood", color: "from-yellow-500 to-amber-600", preview: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format", rating: 4.8, downloads: 1800, compat: ["Premiere Pro", "After Effects", "Final Cut"] },
  { id: "l3", name: "Wedding Soft", cat: "Mariage", color: "from-pink-300 to-rose-400", preview: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format", rating: 4.9, downloads: 3200, compat: ["Premiere Pro", "DaVinci Resolve", "Filmora"] },
  { id: "l4", name: "Music Video Vibe", cat: "Music Video", color: "from-purple-600 to-pink-500", preview: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&auto=format", rating: 4.7, downloads: 1500, compat: ["Premiere Pro", "CapCut", "DaVinci Resolve"] },
  { id: "l5", name: "Dark Cinematic", cat: "Dark Cinematic", color: "from-slate-700 to-slate-900", preview: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&auto=format", rating: 4.9, downloads: 2900, compat: ["DaVinci Resolve", "Premiere Pro", "Final Cut"] },
  { id: "l6", name: "Church Look", cat: "Église", color: "from-amber-300 to-yellow-500", preview: "https://images.unsplash.com/photo-1519167758481-83f29c82dc5c?w=400&auto=format", rating: 4.8, downloads: 1200, compat: ["Premiere Pro", "CapCut", "Filmora"] },
  { id: "l7", name: "Documentary Raw", cat: "Documentaire", color: "from-stone-400 to-stone-600", preview: "https://images.unsplash.com/photo-1581974267769-2c54a98b4eda?w=400&auto=format", rating: 4.7, downloads: 900, compat: ["DaVinci Resolve", "Premiere Pro"] },
  { id: "l8", name: "Netflix Style", cat: "Netflix Style", color: "from-red-600 to-red-900", preview: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&auto=format", rating: 4.9, downloads: 4100, compat: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Final Cut"] },
  { id: "l9", name: "Drone Aerial", cat: "Drone Look", color: "from-sky-400 to-blue-600", preview: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format", rating: 4.8, downloads: 1600, compat: ["Premiere Pro", "DaVinci Resolve", "Final Cut"] },
  { id: "l10", name: "Gold Luxury", cat: "Gold Luxury", color: "from-yellow-400 to-amber-500", preview: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format", rating: 4.9, downloads: 2100, compat: ["Premiere Pro", "DaVinci Resolve", "Filmora", "CapCut"] },
];

const CATS = ["Tout", "Cinéma", "Hollywood", "Mariage", "Music Video", "Dark Cinematic", "Église", "Netflix Style", "Drone Look", "Gold Luxury"];
const SOFTWARE = ["Premiere Pro", "DaVinci Resolve", "CapCut", "Final Cut", "After Effects", "Filmora"];

export default function LutsPage() {
  const [cat, setCat] = useState("Tout");
  const [favorites, setFavorites] = useState<string[]>([]);
  const { currentUser, toggleFavorite } = useStore();

  const filtered = cat === "Tout" ? LUTS : LUTS.filter(l => l.cat === cat);

  const handleFavorite = (id: string) => {
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
    toast.success(favorites.includes(id) ? "Retiré des favoris" : "Ajouté aux favoris !");
  };

  const handleDownload = (name: string) => {
    toast.success(`Téléchargement de "${name}" en cours...`);
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <div className="relative py-16 text-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,212,255,0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(124,58,237,0.1) 0%, transparent 50%)' }}>
        <div className="container-cinema">
          <div className="section-tag mx-auto w-fit mb-4"><Filter size={12} /> LUTs & Looks Cinéma</div>
          <h1 className="section-title mb-4">C-SERVICE <span className="gradient-text">LUTs & Cinema Looks</span></h1>
          <p className="section-subtitle mx-auto text-center">Looks cinéma professionnels compatibles avec les principaux logiciels de montage</p>

          {/* Software compatibility */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {SOFTWARE.map(s => (
              <span key={s} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-cinema py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATS.map(c => <button key={c} onClick={() => setCat(c)} className={`tab-btn ${cat === c ? "active" : ""}`}>{c}</button>)}
        </div>

        {/* LUTs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(lut => (
            <div key={lut.id} className="cinema-card overflow-hidden group" data-testid={`lut-${lut.id}`}>
              {/* Preview */}
              <div className="relative aspect-square overflow-hidden">
                <img src={lut.preview} alt={lut.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 opacity-40 bg-gradient-to-br ${lut.color}`} />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button onClick={() => handleDownload(lut.name)} data-testid={`lut-download-${lut.id}`}
                    className="w-11 h-11 rounded-full bg-cyan-400 flex items-center justify-center text-slate-900 hover:scale-110 transition-transform">
                    <Download size={18} />
                  </button>
                  <button onClick={() => handleFavorite(lut.id)}
                    className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                    <Heart size={18} className={favorites.includes(lut.id) ? "text-red-400 fill-red-400" : "text-white"} />
                  </button>
                </div>
                {/* Rating badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  <Star size={10} className="text-amber-400 fill-amber-400" />
                  <span className="text-white text-xs">{lut.rating}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "'Poppins',sans-serif" }}>{lut.name}</h3>
                  <span className="text-white/30 text-xs">{lut.downloads.toLocaleString()}+</span>
                </div>
                <p className="text-white/40 text-xs mb-3">{lut.cat}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {lut.compat.slice(0, 2).map(s => (
                    <span key={s} className="text-xs px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/30">{s}</span>
                  ))}
                  {lut.compat.length > 2 && <span className="text-xs text-white/20">+{lut.compat.length - 2}</span>}
                </div>
                <button onClick={() => handleDownload(lut.name)} data-testid={`lut-dl-btn-${lut.id}`}
                  className="btn-cinema btn-primary w-full justify-center text-xs py-2.5">
                  <Download size={13} /> Télécharger
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 cinema-card p-10 text-center border-cyan-400/20">
          <h3 className="font-bebas text-4xl text-white mb-3" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>Pack Complet C-SERVICE LUTs</h3>
          <p className="text-white/50 text-sm mb-6">Téléchargez tous nos LUTs en un seul clic. Compatible avec tous les logiciels.</p>
          <button onClick={() => toast.success("Pack complet en cours de préparation !")} className="btn-cinema btn-primary text-sm">
            <Download size={16} /> Télécharger le Pack Complet (ZIP)
          </button>
        </div>
      </div>
    </div>
  );
}
