import { Star, ExternalLink } from "lucide-react";

const SOFTWARE = [
  { name: "Adobe Premiere Pro", cat: "Montage vidéo", level: "Professionnel", rating: 4.9, color: "#9999FF", bg: "#1d0033", logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg" },
  { name: "After Effects", cat: "Motion design", level: "Avancé", rating: 4.8, color: "#9999FF", bg: "#00005b", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg" },
  { name: "DaVinci Resolve", cat: "Étalonnage & montage", level: "Professionnel", rating: 4.9, color: "#FF0000", bg: "#1a0000", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg" },
  { name: "CapCut", cat: "Montage mobile", level: "Débutant", rating: 4.7, color: "#00D4FF", bg: "#001a2c", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/CapCut_Logo.svg/512px-CapCut_Logo.svg.png" },
  { name: "Final Cut Pro", cat: "Montage vidéo", level: "Professionnel", rating: 4.8, color: "#999999", bg: "#1a1a1a", logo: "https://upload.wikimedia.org/wikipedia/en/9/9f/2015_Final_Cut_Pro_Logo.png" },
  { name: "Filmora", cat: "Montage facile", level: "Intermédiaire", rating: 4.5, color: "#FFD700", bg: "#1a1400", logo: "https://upload.wikimedia.org/wikipedia/commons/7/74/Wondershare_Filmora_logo.svg" },
  { name: "Photoshop", cat: "Retouche photo", level: "Avancé", rating: 4.9, color: "#31A8FF", bg: "#001b2e", logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
  { name: "Lightroom", cat: "Étalonnage photo", level: "Intermédiaire", rating: 4.7, color: "#31A8FF", bg: "#001b2e", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg" },
];

const LEVELS: Record<string, string> = {
  "Débutant": "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  "Intermédiaire": "bg-amber-400/10 text-amber-400 border-amber-400/20",
  "Avancé": "bg-blue-400/10 text-blue-400 border-blue-400/20",
  "Professionnel": "bg-purple-400/10 text-purple-400 border-purple-400/20",
};

export default function SoftwareSection() {
  return (
    <section className="section-padding relative" id="software">
      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 100% 50%, rgba(124,58,237,0.2) 0%, transparent 60%)' }} />
      <div className="container-cinema relative z-10">
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit">Logiciels recommandés</div>
          <h2 className="section-title mt-4">Logiciels de <span className="gradient-text">Montage</span></h2>
          <p className="section-subtitle mt-4 mx-auto text-center">Les outils professionnels que nous maîtrisons et enseignons</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SOFTWARE.map((sw, i) => (
            <div key={sw.name} className="cinema-card p-5 group cursor-pointer" data-testid={`software-${i}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center p-2 flex-shrink-0"
                  style={{ background: sw.bg, border: `1px solid ${sw.color}25` }}>
                  <img src={sw.logo} alt={sw.name} className="w-full h-full object-contain" loading="lazy"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-white/60 text-xs">{sw.rating}</span>
                </div>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "'Poppins',sans-serif" }}>{sw.name}</h3>
              <p className="text-white/40 text-xs mb-3">{sw.cat}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${LEVELS[sw.level] || "bg-white/5 text-white/40 border-white/10"}`}>{sw.level}</span>
                <button className="text-white/30 hover:text-cyan-400 transition-colors"><ExternalLink size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
