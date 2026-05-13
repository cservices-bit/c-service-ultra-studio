import { useState } from "react";
import { Play, X } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { T } from "@/data/translations";

const CATS = ["Tout", "Mariage", "Clips musicaux", "Église", "Publicité", "Documentaire", "Business", "Évènements"];

const ITEMS = [
  { id: "1", title: "Mariage Royal — Kinshasa", cat: "Mariage", thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format", yt: "" },
  { id: "2", title: "Clip — Artiste Congolais", cat: "Clips musicaux", thumb: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format", yt: "" },
  { id: "3", title: "Culte du Dimanche Live", cat: "Église", thumb: "https://images.unsplash.com/photo-1519167758481-83f29c82dc5c?w=600&auto=format", yt: "" },
  { id: "4", title: "Publicité — Marque locale", cat: "Publicité", thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format", yt: "" },
  { id: "5", title: "Documentaire — Kinshasa", cat: "Documentaire", thumb: "https://images.unsplash.com/photo-1581974267769-2c54a98b4eda?w=600&auto=format", yt: "" },
  { id: "6", title: "Conférence Business 2024", cat: "Business", thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format", yt: "" },
  { id: "7", title: "Festival de Musique", cat: "Évènements", thumb: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format", yt: "" },
  { id: "8", title: "Mariage Traditionnel", cat: "Mariage", thumb: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&auto=format", yt: "" },
  { id: "9", title: "Clip R&B Premium", cat: "Clips musicaux", thumb: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format", yt: "" },
];

export default function Gallery() {
  const [active, setActive] = useState("Tout");
  const [selected, setSelected] = useState<typeof ITEMS[0] | null>(null);
  const { language } = useStore();
  const t = T[language];

  const filtered = active === "Tout" ? ITEMS : ITEMS.filter(i => i.cat === active);

  return (
    <section className="section-padding relative" id="gallery">
      {/* BG */}
      <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,98,255,0.1) 0%, transparent 60%)' }} />

      <div className="container-cinema relative z-10">
        <div className="text-center mb-12">
          <div className="section-tag mx-auto w-fit"><Play size={12} /> {t.gallery.title}</div>
          <h2 className="section-title mt-4">{t.gallery.title}</h2>
          <p className="section-subtitle mt-4 mx-auto text-center">{t.gallery.sub}</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATS.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} data-testid={`gallery-filter-${cat}`}
              className={`tab-btn ${active === cat ? "active" : ""}`}>{cat}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <div key={item.id} className="gallery-item group cursor-pointer" data-testid={`gallery-item-${item.id}`}
              onClick={() => setSelected(item)}
              style={{ animationDelay: `${i * 80}ms` }}>
              <img src={item.thumb} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="gallery-overlay">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <Play size={22} className="text-cyan-400 ml-1" />
                  </div>
                  <div className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                    <p className="text-white text-xs font-medium">{item.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-[8000] flex items-center justify-center p-4" data-testid="gallery-lightbox">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelected(null)} />
          <div className="relative z-10 w-full max-w-3xl">
            <button onClick={() => setSelected(null)} className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div className="aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
              <img src={selected.thumb} alt={selected.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-white/70 text-sm mt-3 text-center">{selected.title} · {selected.cat}</p>
          </div>
        </div>
      )}
    </section>
  );
}
