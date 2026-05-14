orm.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))}  
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
<img src={u.avatar || https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=00d4ff&color=050a14} className="w-7 h-7 rounded-full object-cover" alt={u.name} />
<span className="text-white/80 text-xs font-medium">{u.name}</span>
</div>
</td>
<td className="p-4 text-white/50 text-xs hidden sm:table-cell">{u.email}</td>
<td className="p-4">
<span className={text-xs px-2 py-0.5 rounded-full border ${u.role === "admin" ? "bg-purple-400/10 border-purple-400/20 text-purple-400" : "bg-white/5 border-white/10 text-white/40"}}>{u.role}</span>
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
<a href={mailto:${m.email}} className="text-cyan-400 text-xs mt-2 inline-flex items-center gap-1 hover:underline"><Mail size={11} /> Répondre</a>
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
<button key={item.key} onClick={() => setTab(item.key)} data-testid={admin-nav-${item.key}}
className={flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${tab === item.key ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20" : "text-white/50 hover:bg-white/5 hover:text-white/80"}}>
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
        
