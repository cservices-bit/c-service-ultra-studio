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
  Plus,
  TrendingUp,
  Film,
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

type Tab =
  | "overview"
  | "news"
  | "business"
  | "users"
  | "messages"
  | "settings";

const NAV_ITEMS = [
  { key: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
  { key: "news", label: "Actualités", icon: Newspaper },
  { key: "business", label: "Annonces", icon: Briefcase },
  { key: "users", label: "Utilisateurs", icon: Users },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "settings", label: "Paramètres", icon: Settings },
] as const;

/* ===================== OVERVIEW ===================== */
function OverviewTab() {
  const { visitCount, listings, users } = useStore();
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("posts")
      .select("*")
      .then(({ data }) => setNews(data || []));
  }, []);

  const cards = [
    { icon: TrendingUp, label: "Visites", value: visitCount },
    { icon: Newspaper, label: "News", value: news.length },
    { icon: Briefcase, label: "Annonces", value: listings.length },
    { icon: Users, label: "Users", value: users.length },
    { icon: Film, label: "Portfolio", value: 9 },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="cinema-card p-5">
          <c.icon className="text-white mb-2" />
          <p className="text-white text-xl">{c.value}</p>
          <p className="text-white/40 text-xs">{c.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ===================== NEWS ===================== */
function NewsTab() {
  const [news, setNews] = useState<any[]>([]);
  const [show, setShow] = useState(false);
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

  const add = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("posts").insert({
      title: form.title,
      content: form.description,
      image: form.image,
      category: form.category,
      created_at: new Date().toISOString(),
    });

    if (error) return toast.error(error.message);

    toast.success("News ajoutée !");
    setShow(false);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("posts").delete().eq("id", id);
    setNews(news.filter((n) => n.id !== id));
    toast.success("Supprimé !");
  };

  return (
    <div>
      <button onClick={() => setShow(!show)} className="btn-cinema">
        <Plus /> Ajouter
      </button>

      {show && (
        <form onSubmit={add} className="cinema-card p-4 mt-3">
          <input
            placeholder="Titre"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <button className="bg-blue-500 px-3 py-1 mt-2">
            Publier
          </button>
        </form>
      )}

      {news.map((n) => (
        <div key={n.id} className="cinema-card p-3 flex justify-between">
          <p>{n.title}</p>
          <button onClick={() => remove(n.id)}>
            <Trash2 />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ===================== BUSINESS ===================== */
function BusinessTab() {
  const [listings, setListings] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
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

  const add = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("listings").insert({
      title: form.title,
      price: form.price,
      description: form.description,
      created_at: new Date().toISOString(),
    });

    if (error) return toast.error(error.message);

    toast.success("Annonce ajoutée !");
    setShow(false);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("listings").delete().eq("id", id);
    setListings(listings.filter((l) => l.id !== id));
    toast.success("Supprimé !");
  };

  return (
    <div>
      <button onClick={() => setShow(!show)} className="btn-cinema">
        <Plus /> Ajouter
      </button>

      {show && (
        <form onSubmit={add} className="cinema-card p-4 mt-3">
          <input
            placeholder="Titre"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
          <input
            placeholder="Prix"
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />
          <button className="bg-blue-500 px-3 py-1 mt-2">
            Publier
          </button>
        </form>
      )}

      {listings.map((l) => (
        <div key={l.id} className="cinema-card p-3 flex justify-between">
          <p>{l.title}</p>
          <button onClick={() => remove(l.id)}>
            <Trash2 />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ===================== ADMIN ===================== */
export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const { currentUser } = useStore();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        <Lock />
        Accès refusé
      </div>
    );
  }

  const TABS: Record<Tab, React.ReactNode> = {
    overview: <OverviewTab />,
    news: <NewsTab />,
    business: <BusinessTab />, // ✅ CORRIGÉ ICI
    users: <div>Users</div>,
    messages: <div>Messages</div>,
    settings: <div>Settings</div>,
  };

  return (
    <div className="p-6">
      <div className="flex gap-3 mb-6">
        {NAV_ITEMS.map((i) => (
          <button key={i.key} onClick={() => setTab(i.key)}>
            {i.label}
          </button>
        ))}
      </div>

      {TABS[tab]}
    </div>
  );
}
