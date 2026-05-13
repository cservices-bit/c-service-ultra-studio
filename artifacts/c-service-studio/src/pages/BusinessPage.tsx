import { useState } from "react";
import { Briefcase, Plus, Phone, Trash2, DollarSign, Search } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { toast } from "sonner";

const CATS = ["Tout", "Montage", "Tournage", "Photo", "Formation", "Design", "Autre"];

export default function BusinessPage() {
  const { listings, addListing, deleteListing, currentUser } = useStore();
  const [cat, setCat] = useState("Tout");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", price: "", description: "", category: "Montage", image: "", whatsapp: "+243850406200" });

  const filtered = listings.filter(l =>
    (cat === "Tout" || l.category === cat) &&
    (search === "" || l.title.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price) { toast.error("Titre et prix requis."); return; }
    addListing(form);
    setForm({ title: "", price: "", description: "", category: "Montage", image: "", whatsapp: "+243850406200" });
    setShowForm(false);
    toast.success("Annonce publiée !");
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <div className="relative py-16 text-center" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 60%)' }}>
        <div className="container-cinema">
          <div className="section-tag mx-auto w-fit mb-4"><Briefcase size={12} /> Business</div>
          <h1 className="section-title mb-4">Opportunités <span className="gradient-text">Business</span></h1>
          <p className="section-subtitle mx-auto text-center">Services et offres professionnels disponibles. Contactez directement via WhatsApp.</p>
        </div>
      </div>

      <div className="container-cinema py-12">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40 w-56" />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATS.map(c => <button key={c} onClick={() => setCat(c)} className={`tab-btn text-xs ${cat === c ? "active" : ""}`}>{c}</button>)}
            </div>
          </div>
          {currentUser?.role === "admin" && (
            <button onClick={() => setShowForm(!showForm)} className="btn-cinema btn-outline text-sm flex-shrink-0">
              <Plus size={14} /> Nouvelle annonce
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="cinema-card p-6 mb-8 border-cyan-400/20">
            <h3 className="text-white font-semibold mb-4">Publier une annonce</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input placeholder="Titre *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
              <input placeholder="Prix (ex: 50$) *" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
              <textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40 sm:col-span-2 resize-none" rows={3} />
              <input placeholder="URL image" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/40">
                {CATS.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button type="submit" className="btn-cinema btn-primary">Publier</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-cinema btn-ghost">Annuler</button>
            </div>
          </form>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(item => (
            <div key={item.id} className="cinema-card overflow-hidden group" data-testid={`business-listing-${item.id}`}>
              <div className="aspect-video bg-white/5 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><Briefcase size={28} className="text-white/20" /></div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "'Poppins',sans-serif" }}>{item.title}</h3>
                  <span className="text-cyan-400 font-bold text-base flex-shrink-0">{item.price}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40 mb-3 inline-block">{item.category}</span>
                <p className="text-white/40 text-xs mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-2">
                  <a href={`https://wa.me/${item.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer"
                    className="btn-cinema btn-primary text-xs py-2 flex-1 justify-center">
                    <Phone size={12} /> Contacter sur WhatsApp
                  </a>
                  {currentUser?.role === "admin" && (
                    <button onClick={() => { deleteListing(item.id); toast.success("Supprimé !"); }}
                      className="w-9 h-9 flex items-center justify-center border border-red-400/20 rounded-xl text-red-400/60 hover:text-red-400 transition-all">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <Briefcase size={40} className="mx-auto mb-4 opacity-40" />
            <p>Aucune annonce trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}
