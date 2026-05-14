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
  Mail,
  TrendingUp,
  Film,
  GraduationCap,
  Download,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

type Tab =
  | "overview"
  | "news"
  | "business"
  | "users"
  | "messages"
  | "settings";

const NAV_ITEMS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
  { key: "news", label: "Actualités", icon: Newspaper },
  { key: "business", label: "Annonces", icon: Briefcase },
  { key: "users", label: "Utilisateurs", icon: Users },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "settings", label: "Paramètres", icon: Settings },
];

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

  const messages = JSON.parse(localStorage.getItem("csb-messages") || "[]");

  const cards = [
    {
      icon: TrendingUp,
      label: "Visiteurs total",
      value: visitCount.toLocaleString(),
      color: "#00d4ff",
      trend: "+12%",
    },
    {
      icon: Newspaper,
      label: "Actualités",
      value: news.length,
      color: "#7c3aed",
      trend: "+3",
    },
    {
      icon: Briefcase,
      label: "Annonces",
      value: listings.length,
      color: "#f59e0b",
      trend: "+2",
    },
    {
      icon: Users,
      label: "Comptes",
      value: users.length,
      color: "#10b981",
      trend: "+5",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      value: messages.length,
      color: "#0062ff",
      trend: "+8",
    },
    {
      icon: Film,
      label: "Portfolio",
      value: 9,
      color: "#ef4444",
      trend: "stable",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="cinema-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `${c.color}15`,
                  border: `1px solid ${c.color}30`,
                }}
              >
                <c.icon size={18} style={{ color: c.color }} />
              </div>
              <span className="text-xs text-emerald-400">{c.trend}</span>
            </div>

            <div
              className="text-3xl font-bold mb-1"
              style={{ color: c.color }}
            >
              {c.value}
            </div>

            <p className="text-white/40 text-xs">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== NEWS TAB (SUPABASE CLEAN) ===================== */
function NewsTab() {
  const [news, setNews] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    category: "Studio",
  });

  const loadNews = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    setNews(data || []);
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("posts").insert({
      title: form.title,
      content: form.description,
      image: form.image,
      category: form.category,
      created_at: new Date().toISOString(),
    });

    if (error) return toast.error(error.message);

    toast.success("Publié !");
    setForm({ title: "", description: "", image: "", category: "Studio" });
    setShowForm(false);
    loadNews();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) return toast.error(error.message);

    setNews(news.filter((n) => n.id !== id));
    toast.success("Supprimé !");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h3 className="text-white font-semibold">
          Actualités ({news.length})
        </h3>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-cinema btn-primary text-xs"
        >
          <Plus size={12} /> Nouvelle
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="cinema-card p-6">
          <input
            placeholder="Titre"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full p-2 text-black mb-2"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full p-2 text-black mb-2"
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
            className="w-full p-2 text-black mb-2"
          />

          <button className="bg-blue-500 px-4 py-2 rounded">
            Publier
          </button>
        </form>
      )}

      <div className="space-y-3">
        {news.map((n) => (
          <div
            key={n.id}
            className="cinema-card p-4 flex justify-between"
          >
            <div>
              <p className="text-white">{n.title}</p>
              <p className="text-white/40 text-xs">
                {n.category}
              </p>
            </div>

            <button onClick={() => handleDelete(n.id)}>
              <Trash2 className="text-red-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== MAIN ADMIN ===================== */
export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const { currentUser, logout } = useStore();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <Lock className="mx-auto mb-3 text-red-400" />
          <h2>Accès refusé</h2>
          <Link href="/">Retour</Link>
        </div>
      </div>
    );
  }

  const TABS: Record<Tab, React.ReactNode> = {
    overview: <OverviewTab />,
    news: <NewsTab />,
    business: <
