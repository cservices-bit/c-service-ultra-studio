import { useState } from "react";
import { useStore } from "@/stores/useStore";
import { LayoutDashboard, Users, Newspaper, Briefcase, MessageSquare, Settings, BarChart2, Lock, Trash2, Plus, Mail, TrendingUp, Film, GraduationCap, Download } from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

type Tab = "overview" | "news" | "business" | "users" | "messages" | "settings";

const NAV_ITEMS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
  { key: "news", label: "Actualités", icon: Newspaper },
  { key: "business", label: "Annonces", icon: Briefcase },
  { key: "users", label: "Utilisateurs", icon: Users },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "settings", label: "Paramètres", icon: Settings },
];

function OverviewTab() {
  const { visitCount, news, listings, users } = useStore();
  const messages = JSON.parse(localStorage.getItem("csb-messages") || "[]");

  const cards = [
    { icon: TrendingUp, label: "Visiteurs total", value: visitCount.toLocaleString(), color: "#00d4ff", trend: "+12%" },
    { icon: Newspaper, label: "Actualités", value: news.length, color: "#7c3aed", trend: "+3" },
    { icon: Briefcase, label: "Annonces", value: listings.length, color: "#f59e0b", trend: "+2" },
    { icon: Users, label: "Comptes créés", value: users.length, color: "#10b981", trend: "+5" },
    { icon: MessageSquare, label: "Messages reçus", value: messages.length, color: "#0062ff", trend: "+8" },
    { icon: Film, label: "Projets portfolio", value: 9, color: "#ef4444", trend: "stable" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(c => (
          <div key={c.label} className="cinema-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}>
                <c.icon size={18} style={{ color: c.color }} />
              </div>
              <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{c.trend}</span>
            </div>
            <div className="font-bebas text-3xl mb-1" style={{ fontFamily: "'Bebas Neue',sans-serif", color: c.color }}>{c.value}</div>
            <p className="text-white/40 text-xs">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="cinema-card p-6">
        <h3 className="text-white font-semibold mb-4">Actions rapides</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/luts" className="btn-cinema btn-outline text-xs"><Download size={12} /> Gérer les LUTs</Link>
          <Link href="/academy" className="btn-cinema btn-outline text-xs"><GraduationCap size={12} /> Académie</Link>
          <Link href="/portfolio" className="btn-cinema btn-outline text-xs"><Film size={12} /> Portfolio</Link>
          <a href="https://wa.me/243850406200" target="_blank" rel="noopener noreferrer" className="btn-cinema btn-outline text-xs"><Mail size={12} /> WhatsApp</a>
        </div>
      </div>

      {/* Recent news */}
      <div className="cinema-card p-6">
        <h3 className="text-white font-semibold mb-4">Dernières actualités</h3>
        <div className="space-y-3">
          {useStore.getState().news.slice(0, 3).map(n => (
            <div key={n.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center flex-shrink-0">
                <Newspaper size={14} className="text-cyan-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-sm truncate">{n.title}</p>
                <p className="text-white/30 text-xs">{new Date(n.date).toLocaleDateString("fr-FR")}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 flex-shrink-0">{n.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewsTab() {
  const { news, addNews, deleteNews, currentUser } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image: "", category: "Studio" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) { toast.error("Titre et description requis."); return; }
    addNews({ ...form, author: currentUser?.name || "Admin" });
    setForm({ title: "", description: "", image: "", category: "Studio" });
    setShowForm(false);
    toast.success("Actualité publiée !");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Actualités ({news.length})</h3>
        <button onClick={() => setShowForm(!showForm)} className="btn-cinema btn-primary text-xs"><Plus size={12} /> Nouvelle</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="cinema-card p-6 border-cyan-400/20">
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
            <button type="submit" className="btn-cinema btn-primary text-sm">Publier</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-cinema btn-ghost text-sm">Annuler</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {news.map(n => (
          <div key={n.id} className="cinema-card p-4 flex items-center gap-4">
            {n.image && <img src={n.image} alt={n.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" loading="lazy" />}
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{n.title}</p>
              <p className="text-white/40 text-xs mt-0.5">{n.category} · {new Date(n.date).toLocaleDateString("fr-FR")}</p>
            </div>
            <button onClick={() => { deleteNews(n.id); toast.success("Supprimé !"); }}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-400/20 text-red-400/60 hover:text-red-400 hover:border-red-400/40 transition-all flex-shrink-0">
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BusinessTab() {
  const { listings, addListing, deleteListing, currentUser } = useStore();
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Annonces ({listings.length})</h3>
        <button onClick={() => setShowForm(!showForm)} className="btn-cinema btn-primary text-xs"><Plus size={12} /> Nouvelle</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="cinema-card p-6 border-cyan-400/20">
          <div className="grid sm:grid-cols-2 gap-4">
            <input placeholder="Titre *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
            <input placeholder="Prix (ex: 50$) *" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40 sm:col-span-2 resize-none" rows={2} />
            <input placeholder="URL image" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/40">
              {["Montage", "Tournage", "Photo", "Formation", "Design", "Autre"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-3 mt-4">
            <button type="submit" className="btn-cinema btn-primary text-sm">Publier</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-cinema btn-ghost text-sm">Annuler</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {listings.map(l => (
          <div key={l.id} className="cinema-card p-4 flex items-center gap-4">
            {l.image && <img src={l.image} alt={l.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" loading="lazy" />}
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{l.title}</p>
              <p className="text-white/40 text-xs mt-0.5">{l.category} · <span className="text-cyan-400">{l.price}</span></p>
            </div>
            <button onClick={() => { deleteListing(l.id); toast.success("Supprimé !"); }}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-400/20 text-red-400/60 hover:text-red-400 hover:border-red-400/40 transition-all flex-shrink-0">
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsersTab() {
  const { users } = useStore();
  return (
    <div className="space-y-6">
      <h3 className="text-white font-semibold">Comptes utilisateurs ({users.length})</h3>
      <div className="cinema-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10">
            <tr>
              <th className="text-left text-white/40 text-xs p-4 font-medium">Utilisateur</th>
              <th className="text-left text-white/40 text-xs p-4 font-medium hidden sm:table-cell">Email</th>
              <th className="text-left text-white/40 text-xs p-4 font-medium">Rôle</th>
              <th className="text-left text-white/40 text-xs p-4 font-medium hidden md:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {(users as any[]).map(u => (
              <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <img src={u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=00d4ff&color=050a14`} className="w-7 h-7 rounded-full object-cover" alt={u.name} />
                    <span className="text-white/80 text-xs font-medium">{u.name}</span>
                  </div>
                </td>
                <td className="p-4 text-white/50 text-xs hidden sm:table-cell">{u.email}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${u.role === "admin" ? "bg-purple-400/10 border-purple-400/20 text-purple-400" : "bg-white/5 border-white/10 text-white/40"}`}>{u.role}</span>
                </td>
                <td className="p-4 text-white/30 text-xs hidden md:table-cell">{new Date(u.joinedAt).toLocaleDateString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="text-center py-12 text-white/30"><Users size={28} className="mx-auto mb-3 opacity-40" /><p>Aucun utilisateur inscrit</p></div>
        )}
      </div>
    </div>
  );
}

function MessagesTab() {
  const messages: any[] = JSON.parse(localStorage.getItem("csb-messages") || "[]");
  return (
    <div className="space-y-6">
      <h3 className="text-white font-semibold">Messages reçus ({messages.length})</h3>
      {messages.length === 0 ? (
        <div className="text-center py-20 text-white/30"><MessageSquare size={32} className="mx-auto mb-3 opacity-40" /><p>Aucun message pour l'instant</p></div>
      ) : (
        <div className="space-y-4">
          {messages.map((m: any, i: number) => (
            <div key={i} className="cinema-card p-5">
              <div className="flex items-start justify-between mb-2 gap-4">
                <div>
                  <p className="text-white font-semibold text-sm">{m.name}</p>
                  <p className="text-white/40 text-xs">{m.email} · {new Date(m.date).toLocaleDateString("fr-FR")}</p>
                </div>
                {m.subject && <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 flex-shrink-0">{m.subject}</span>}
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{m.message}</p>
              <a href={`mailto:${m.email}`} className="text-cyan-400 text-xs mt-2 inline-flex items-center gap-1 hover:underline"><Mail size={11} /> Répondre</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SettingsTab() {
  const { currentUser, updateProfile } = useStore();
  const [name, setName] = useState(currentUser?.name || "");
  const handleSave = () => { updateProfile({ name }); toast.success("Profil mis à jour !"); };
  return (
    <div className="space-y-6">
      <h3 className="text-white font-semibold">Paramètres du profil admin</h3>
      <div className="cinema-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <img src={currentUser?.avatar || ""} className="w-16 h-16 rounded-full border-2 border-cyan-400/30 object-cover" alt={currentUser?.name} />
          <div>
            <p className="text-white font-semibold">{currentUser?.name}</p>
            <p className="text-white/40 text-sm">{currentUser?.email}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-400/10 border border-purple-400/20 text-purple-400 mt-1 inline-block">Administrateur</span>
          </div>
        </div>
        <div className="flex gap-3">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Nom d'affichage"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
          <button onClick={handleSave} className="btn-cinema btn-primary">Sauvegarder</button>
        </div>
      </div>

      <div className="cinema-card p-6 border-red-400/10">
        <h4 className="text-white font-semibold text-sm mb-2">Zone dangereuse</h4>
        <p className="text-white/40 text-xs mb-4">Réinitialiser le store local (supprime tous les favoris, news et annonces personnalisées)</p>
        <button onClick={() => { localStorage.clear(); toast.success("Données effacées. Rechargement..."); setTimeout(() => window.location.reload(), 1000); }}
          className="text-xs px-4 py-2 border border-red-400/25 text-red-400/70 rounded-full hover:border-red-400/50 hover:text-red-400 transition-all">
          Réinitialiser les données locales
        </button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const { currentUser, logout } = useStore();
  const [, navigate] = useLocation();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <Lock size={48} className="text-red-400/50 mx-auto mb-4" />
          <h2 className="text-white font-bold text-xl mb-2">Accès restreint</h2>
          <p className="text-white/40 text-sm mb-6">Cette page est réservée aux administrateurs.<br/>Connectez-vous avec le compte admin.</p>
          <Link href="/" className="btn-cinema btn-primary">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  const TABS: Record<Tab, React.ReactNode> = {
    overview: <OverviewTab />,
    news: <NewsTab />,
    business: <BusinessTab />,
    users: <UsersTab />,
    messages: <MessagesTab />,
    settings: <SettingsTab />,
  };

  return (
    <div className="min-h-screen pt-16 flex" data-testid="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar hidden lg:flex flex-col" data-testid="admin-sidebar">
        <div className="p-6 border-b border-white/10">
          <div className="font-bebas text-xl text-white tracking-widest" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>C-SERVICE</div>
          <p className="text-white/30 text-xs mt-0.5">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {NAV_ITEMS.map(item => (
            <button key={item.key} onClick={() => setTab(item.key)} data-testid={`admin-nav-${item.key}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${tab === item.key ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20" : "text-white/50 hover:bg-white/5 hover:text-white/80"}`}>
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <img src={currentUser.avatar || ""} className="w-8 h-8 rounded-full object-cover" alt={currentUser.name} />
            <div className="min-w-0">
              <p className="text-white/80 text-xs font-medium truncate">{currentUser.name}</p>
              <p className="text-white/30 text-xs">Admin</p>
            </div>
          </div>
          <button onClick={logout} className="w-full text-xs text-red-400/60 hover:text-red-400 py-2 transition-colors text-left pl-2">
            → Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile tab bar */}
        <div className="lg:hidden flex overflow-x-auto gap-2 p-4 border-b border-white/10 bg-background/95 backdrop-blur sticky top-16 z-10">
          {NAV_ITEMS.map(item => (
            <button key={item.key} onClick={() => setTab(item.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap flex-shrink-0 transition-all ${tab === item.key ? "bg-cyan-400/15 text-cyan-400 border border-cyan-400/30" : "text-white/50 border border-white/10"}`}>
              <item.icon size={12} /> {item.label}
            </button>
          ))}
        </div>

        <div className="p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-white font-bold text-xl" style={{ fontFamily: "'Poppins',sans-serif" }}>
              {NAV_ITEMS.find(n => n.key === tab)?.label}
            </h1>
            <span className="text-white/20 text-xs hidden sm:block">C-SERVICE BUSINESS — ULTRA STUDIO · Panel Admin</span>
          </div>
          {TABS[tab]}
        </div>
      </main>
    </div>
  );
}
