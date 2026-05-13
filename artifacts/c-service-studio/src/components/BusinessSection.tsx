import { useState } from "react";
import { Briefcase, Plus, Phone, Trash2, DollarSign } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { T } from "@/data/translations";
import { toast } from "sonner";

export default function BusinessSection() {
  const { listings, addListing, deleteListing, currentUser, language } = useStore();
  const t = T[language];
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", price: "", description: "", category: "Montage", image: "", whatsapp: "+243850406200" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price) { toast.error("Titre et prix requis."); return; }
    addListing(form);
    setForm({ title: "", price: "", description: "", category: "Montage", image: "", whatsapp: "+243850406200" });
    setShowForm(false);
    toast.success("Annonce publiée !");
  };

  const displayed = listings.slice(0, 6);

  return (
    <section className="section-padding relative" id="business">
      <div className="container-cinema">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="section-tag w-fit"><Briefcase size={12} /> {t.business.title}</div>
            <h2 className="section-title mt-3">{t.business.title}</h2>
            <p className="section-subtitle mt-2">{t.business.sub}</p>
          </div>
          {currentUser?.role === "admin" && (
            <button onClick={() => setShowForm(!showForm)} className="btn-cinema btn-outline flex-shrink-0 text-sm">
              <Plus size={14} /> Publier annonce
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="cinema-card p-6 mb-8 border-cyan-400/20">
            <h3 className="text-white font-semibold mb-4">Nouvelle annonce</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input placeholder="Titre *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
              <input placeholder="Prix (ex: 50$)" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
              <textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40 sm:col-span-2 resize-none" rows={3} />
              <input placeholder="URL image" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/40">
                {["Montage", "Tournage", "Photo", "Formation", "Design", "Autre"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button type="submit" className="btn-cinema btn-primary">Publier</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-cinema btn-ghost">Annuler</button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((item) => (
            <div key={item.id} className="cinema-card overflow-hidden group" data-testid={`listing-${item.id}`}>
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
                  <span className="text-cyan-400 font-bold text-sm flex items-center gap-0.5 flex-shrink-0"><DollarSign size={12} />{item.price.replace("$","")}</span>
                </div>
                <p className="text-white/40 text-xs mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-2">
                  <a href={`https://wa.me/${item.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer"
                    className="btn-cinema btn-primary text-xs py-2 px-4 flex-1 justify-center">
                    <Phone size={12} /> WhatsApp
                  </a>
                  {currentUser?.role === "admin" && (
                    <button onClick={() => { deleteListing(item.id); toast.success("Supprimé !"); }}
                      className="w-9 h-9 flex items-center justify-center border border-red-400/20 rounded-xl text-red-400/60 hover:text-red-400 hover:border-red-400/40 transition-all">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
