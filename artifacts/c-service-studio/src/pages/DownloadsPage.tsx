import { useState } from "react";
import { Download, Search, Star, Smartphone, Monitor, Apple, ExternalLink } from "lucide-react";

type Platform = "Tout" | "Android" | "iOS" | "PC/Mac";

const APPS = [
  { id: "d1", name: "CapCut", cat: "Montage vidéo", platform: "Android" as Platform, size: "95 MB", rating: 4.8, reviews: 12400, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/CapCut_Logo.svg/512px-CapCut_Logo.svg.png", link: "https://www.capcut.com", desc: "Le meilleur outil de montage vidéo mobile. Effets, transitions, musique, textes et plus." },
  { id: "d2", name: "VN Video Editor", cat: "Montage vidéo", platform: "Android" as Platform, size: "54 MB", rating: 4.7, reviews: 8200, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/VN_Video_Editor_logo.png/512px-VN_Video_Editor_logo.png", link: "#", desc: "Montage vidéo professionnel multi-pistes avec effets cinéma avancés." },
  { id: "d3", name: "Lightroom Mobile", cat: "Retouche photo", platform: "Android" as Platform, size: "127 MB", rating: 4.6, reviews: 9800, logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg", link: "#", desc: "Étalonnage et retouche photo professionnelle directement sur Android." },
  { id: "d4", name: "Kinemaster", cat: "Montage vidéo", platform: "Android" as Platform, size: "79 MB", rating: 4.5, reviews: 15600, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/KineMaster_App_Icon.png/512px-KineMaster_App_Icon.png", link: "#", desc: "Montage vidéo complet avec calques, effets et exportation 4K." },
  { id: "d5", name: "Alight Motion", cat: "Motion design", platform: "Android" as Platform, size: "88 MB", rating: 4.7, reviews: 7300, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Alight_Motion_App_Logo.png/512px-Alight_Motion_App_Logo.png", link: "#", desc: "Animation graphique et motion design sur mobile. Idéal pour les intros et effets." },
  { id: "d6", name: "CapCut iOS", cat: "Montage vidéo", platform: "iOS" as Platform, size: "245 MB", rating: 4.9, reviews: 18900, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/CapCut_Logo.svg/512px-CapCut_Logo.svg.png", link: "#", desc: "Version iOS de CapCut avec toutes les fonctionnalités premium disponibles." },
  { id: "d7", name: "Lightroom iOS", cat: "Retouche photo", platform: "iOS" as Platform, size: "198 MB", rating: 4.7, reviews: 11200, logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg", link: "#", desc: "Lightroom Mobile sur iPhone et iPad avec sync Creative Cloud." },
  { id: "d8", name: "iMovie", cat: "Montage vidéo", platform: "iOS" as Platform, size: "1.2 GB", rating: 4.5, reviews: 24000, logo: "https://upload.wikimedia.org/wikipedia/en/2/26/IMovie_icon.png", link: "#", desc: "L'application de montage vidéo officielle Apple, gratuite et puissante." },
  { id: "d9", name: "LumaFusion", cat: "Montage vidéo", platform: "iOS" as Platform, size: "512 MB", rating: 4.9, reviews: 6800, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/LumaFusion-Icon.png/512px-LumaFusion-Icon.png", link: "#", desc: "Le montage vidéo professionnel multi-pistes sur iPad. Alternative à Premiere Pro." },
  { id: "d10", name: "Adobe Premiere Pro", cat: "Montage vidéo", platform: "PC/Mac" as Platform, size: "3.8 GB", rating: 4.9, reviews: 45000, logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg", link: "https://www.adobe.com/products/premiere.html", desc: "Le standard mondial du montage vidéo professionnel. Workflows cinéma complets." },
  { id: "d11", name: "After Effects", cat: "Motion design", platform: "PC/Mac" as Platform, size: "4.2 GB", rating: 4.8, reviews: 38000, logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg", link: "https://www.adobe.com/products/aftereffects.html", desc: "Animation graphique, compositing vidéo et effets visuels professionnels." },
  { id: "d12", name: "DaVinci Resolve", cat: "Étalonnage", platform: "PC/Mac" as Platform, size: "2.8 GB", rating: 4.9, reviews: 52000, logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg", link: "https://www.blackmagicdesign.com/products/davinciresolve", desc: "Montage, étalonnage, effets visuels et audio professionnel en une seule app. GRATUIT !" },
  { id: "d13", name: "Photoshop", cat: "Retouche photo", platform: "PC/Mac" as Platform, size: "4.5 GB", rating: 4.9, reviews: 67000, logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg", link: "#", desc: "Le logiciel de retouche photo référence mondiale. Compositing, illustration et design." },
  { id: "d14", name: "Filmora", cat: "Montage vidéo", platform: "PC/Mac" as Platform, size: "1.6 GB", rating: 4.5, reviews: 28000, logo: "https://upload.wikimedia.org/wikipedia/commons/7/74/Wondershare_Filmora_logo.svg", link: "#", desc: "Montage vidéo accessible avec effets premium. Idéal pour YouTubers et créateurs de contenu." },
  { id: "d15", name: "Blender", cat: "3D & Animation", platform: "PC/Mac" as Platform, size: "380 MB", rating: 4.8, reviews: 33000, logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg", link: "https://www.blender.org", desc: "Suite 3D professionnelle open-source. Modélisation, animation, rendu et effets visuels. GRATUIT !" },
];

const PLATFORM_ICONS: Record<Platform | "Tout", React.ElementType> = { "Tout": Download, "Android": Smartphone, "iOS": Apple, "PC/Mac": Monitor };

export default function DownloadsPage() {
  const [platform, setPlatform] = useState<Platform | "Tout">("Tout");
  const [cat, setCat] = useState("Tout");
  const [search, setSearch] = useState("");

  const allCats = ["Tout", ...Array.from(new Set(APPS.map(a => a.cat)))];
  const filtered = APPS.filter(a =>
    (platform === "Tout" || a.platform === platform) &&
    (cat === "Tout" || a.cat === cat) &&
    (search === "" || a.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <div className="relative py-16 text-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,98,255,0.12) 0%, transparent 60%)' }}>
        <div className="container-cinema">
          <div className="section-tag mx-auto w-fit mb-4"><Download size={12} /> Download Center</div>
          <h1 className="section-title mb-4">Download <span className="gradient-text">Center</span></h1>
          <p className="section-subtitle mx-auto text-center">Tous les logiciels essentiels pour les créatifs — Android, iOS et PC/Mac</p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="badge-security badge-ssl">15 logiciels</span>
            <span className="badge-security badge-verified">Liens officiels</span>
            <span className="badge-security badge-protected">100% sécurisés</span>
          </div>
        </div>
      </div>

      <div className="container-cinema py-12">
        {/* Platform filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {(["Tout", "Android", "iOS", "PC/Mac"] as const).map(p => {
            const Icon = PLATFORM_ICONS[p];
            return (
              <button key={p} onClick={() => setPlatform(p)} data-testid={`platform-${p}`}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all text-sm font-medium ${platform === p ? "bg-cyan-400/15 border-cyan-400/40 text-cyan-400" : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"}`}>
                <Icon size={15} /> {p}
              </button>
            );
          })}
        </div>

        {/* Search & category */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input placeholder="Rechercher un logiciel..." value={search} onChange={e => setSearch(e.target.value)}
              data-testid="downloads-search"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
          </div>
          <div className="flex flex-wrap gap-2">
            {allCats.map(c => <button key={c} onClick={() => setCat(c)} className={`tab-btn ${cat === c ? "active" : ""}`}>{c}</button>)}
          </div>
        </div>

        {/* Results count */}
        <p className="text-white/30 text-sm mb-6">{filtered.length} logiciel{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}</p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(app => {
            const PIcon = PLATFORM_ICONS[app.platform];
            return (
              <div key={app.id} className="download-card group" data-testid={`download-${app.id}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 overflow-hidden">
                      <img src={app.logo} alt={app.name} className="w-full h-full object-contain"
                        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "'Poppins',sans-serif" }}>{app.name}</h3>
                      <p className="text-white/40 text-xs">{app.cat}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span className="text-white/60 text-xs">{app.rating}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-white/30"><PIcon size={10} /> {app.platform}</span>
                  </div>
                </div>
                <p className="text-white/40 text-xs leading-relaxed">{app.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/25 text-xs">{app.size} · {app.reviews.toLocaleString()} avis</span>
                  <a href={app.link} target="_blank" rel="noopener noreferrer" data-testid={`download-btn-${app.id}`}
                    className="flex items-center gap-1.5 px-4 py-2 bg-cyan-400/10 border border-cyan-400/25 text-cyan-400 text-xs font-medium rounded-full hover:bg-cyan-400/20 transition-all">
                    <Download size={12} /> Télécharger
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <Download size={40} className="mx-auto mb-4 opacity-40" />
            <p>Aucun logiciel trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}
