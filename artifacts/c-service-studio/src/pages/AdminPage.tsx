import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useStore } from "@/stores/useStore";
import {
  LayoutDashboard,
  Users,
  Newspaper,
  Briefcase,
  MessageSquare,
  Settings,
  Lock,
  Trash2,
  TrendingUp,
  Film,
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

/* ================= TYPES ================= */
type Tab =
  | "overview"
  | "news"
  | "business"
  | "users"
  | "messages"
  | "settings";

/* ================= NAV ================= */
const NAV_ITEMS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
  { key: "news", label: "Actualités", icon: Newspaper },
  { key: "business", label: "Annonces", icon: Briefcase },
  { key: "users", label: "Utilisateurs", icon: Users },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "settings", label: "Paramètres", icon: Settings },
];

/* ================= STORAGE UPLOAD ================= */
const uploadImage = async (file: File) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("c-service-images")
    .upload(fileName, file);

  if (error) {
    toast.error(error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("c-service-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

/* ================= OVERVIEW ================= */
function OverviewTab() {
  const { visitCount, listings, users } = useStore();
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("posts").select("*").then(({ data }) => {
      setNews(data || []);
    });
  }, []);

  const cards = [
    { icon: TrendingUp, label: "Visiteurs", value: visitCount },
    { icon: Newspaper, label: "News", value: news.length },
    { icon: Briefcase, label: "Annonces", value: listings.length },
    { icon: Users, label: "Users", value: users.length },
    { icon: Film, label: "Portfolio", value: 9 },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="cinema-card p-5">
          <c.icon className="text-cyan-400" />
          <div className="text-2xl text-white font-bold">{c.value}</div>
          <p className="text-white/40 text-xs">{c.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ================= NEWS ================= */
function NewsTab() {
  const [news, setNews] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    category: "Studio",
  });

  const load = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    setNews(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const addNews = async () => {
    const { error } = await supabase.from("posts").insert({
      title: form.title,
      content: form.description,
      image: form.image,
      category: form.category,
      created_at: new Date().toISOString(),
    });

    if (error) return toast.error(error.message);

    toast.success("News ajoutée !");
    setForm({ title: "", description: "", image: "", category: "Studio" });
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("posts").delete().eq("id", id);
    setNews(news.filter((n) => n.id !== id));
    toast.success("Supprimé");
  };

  return (
    <div>
      <h2 className="text-white mb-4">News ({news.length})</h2>

      <div className="cinema-card p-4 mb-4">
        <input
          placeholder="Titre"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button onClick={addNews}>Ajouter</button>
      </div>

      {news.map((n) => (
        <div key={n.id} className="cinema-card p-3 flex justify-between">
          <div>
            <p className="text-white">{n.title}</p>
          </div>
          <button onClick={() => remove(n.id)}>
            <Trash2 className="text-red-400" />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ================= BUSINESS ================= */
function BusinessTab() {
  const [listings, setListings] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "Montage",
    image: "",
    whatsapp: "",
  });

  const load = async () => {
    const { data } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });

    setListings(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    const { error } = await supabase.from("listings").insert({
      ...form,
      created_at: new Date().toISOString(),
    });

    if (error) return toast.error(error.message);

    toast.success("Annonce ajoutée !");
    setForm({
      title: "",
      price: "",
      description: "",
      category: "Montage",
      image: "",
      whatsapp: "",
    });

    load();
  };

  const remove = async (id: string) => {
    await supabase.from("listings").delete().eq("id", id);
    setListings(listings.filter((l) => l.id !== id));
    toast.success("Supprimé");
  };

  return (
    <div>
      <h2 className="text-white mb-4">Business ({listings.length})</h2>

      <div className="cinema-card p-4 mb-4">
        <input
          placeholder="Titre"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Prix"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <button onClick={add}>Publier</button>
      </div>

      {listings.map((l) => (
        <div key={l.id} className="cinema-card p-3 flex justify-between">
          <div>
            <p className="text-white">{l.title}</p>
            <p className="text-white/40 text-xs">{l.price}</p>
          </div>

          <button onClick={() => remove(l.id)}>
            <Trash2 className="text-red-400" />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ================= ADMIN ================= */
export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [session, setSession] = useState<any>(null);
  const { currentUser } = useStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (!session) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <Lock className="text-red-400" />
        <Link href="/login">Login Admin</Link>
      </div>
    );
  }

  const TABS: Record<Tab, React.ReactNode> = {
    overview: <OverviewTab />,
    news: <NewsTab />,
    business: <BusinessTab />,
    users: <div className="text-white">Users</div>,
    messages: <div className="text-white">Messages</div>,
    settings: <div className="text-white">Settings</div>,
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 border-r border-white/10">
        {NAV_ITEMS.map((item) => (
          <button key={item.key} onClick={() => setTab(item.key)}>
            <item.icon size={14} /> {item.label}
          </button>
        ))}

        <button onClick={logout} className="text-red-400 mt-6">
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6">{TABS[tab]}</main>
    </div>
  );
}
