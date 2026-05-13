import { useState } from "react";
import { Plus, Trash2, Newspaper, Calendar } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { T } from "@/data/translations";
import { toast } from "sonner";

export default function NewsSection() {
  const { news, addNews, deleteNews, currentUser, language } = useStore();
  const t = T[language];
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image: "", category: "Studio", author: currentUser?.name || "Cianney" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) { toast.error("Titre et description requis."); return; }
    addNews({ ...form, author: currentUser?.name || "Cianney" });
    setForm({ title: "", description: "", image: "", category: "Studio", author: currentUser?.name || "Cianney" });
    setShowForm(false);
    toast.success("Actualité publiée !");
  };

  return (
    <section className="section-padding relative" id="news">
      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(0,212,255,0.15) 0%, transparent 60%)' }} />

      <div className="container-cinema relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <div className="section-tag w-fit"><Newspaper size={12} /> {t.news.title}</div>
            <h2 className="section-title mt-3">{t.news.title}</h2>
            <p className="section-subtitle mt-2">{t.news.sub}</p>
          </div>
          {currentUser?.role === "admin" && (
            <button onClick={() => setShowForm(!showForm)} data-testid="add-news-btn"
              className="btn-cinema btn-outline flex-shrink-0">
              <Plus size={16} /> Publier
            </button>
          )}
        </div>

        {/* Admin form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="cinema-card p-6 mb-8 border-cyan-400/20" data-testid="news-form">
            <h3 className="text-white font-semibold mb-4">Nouvelle actualité</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input placeholder="Titre *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40 sm:col-span-2" />
              <textarea placeholder="Description *" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40 sm:col-span-2 resize-none" />
              <input placeholder="URL image" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/40">
                {["Studio", "Académie", "Réalisation", "Business", "Annonce", "Formation"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button type="submit" className="btn-cinema btn-primary">Publier</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-cinema btn-ghost">Annuler</button>
            </div>
          </form>
        )}

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div key={item.id} className="cinema-card overflow-hidden group" data-testid={`news-card-${item.id}`}>
              <div className="aspect-video bg-white/5 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><Newspaper size={32} className="text-white/20" /></div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400">{item.category}</span>
                  <div className="flex items-center gap-1.5 text-white/30 text-xs">
                    <Calendar size={11} />
                    {new Date(item.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                  </div>
                </div>
                <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{item.description}</p>
                {currentUser?.role === "admin" && (
                  <button onClick={() => { deleteNews(item.id); toast.success("Supprimé !"); }}
                    className="mt-3 text-red-400/60 hover:text-red-400 text-xs flex items-center gap-1 transition-colors">
                    <Trash2 size={12} /> Supprimer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
