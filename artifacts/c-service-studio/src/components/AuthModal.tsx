import { useState } from "react";
import { X, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (tab === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
  toast.error(error.message);
} else {
  toast.success("Connexion réussie !");
  onClose();
  window.location.href = "/admin";
}
      } else {
        if (!name.trim()) {
          toast.error("Entrez votre nom.");
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Compte créé avec succès !");
          onClose();
        }
      }
    } catch (err) {
      toast.error("Une erreur est survenue.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4" data-testid="auth-modal">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative glass-strong rounded-2xl p-8 w-full max-w-md border border-cyan-400/20 shadow-2xl"
        style={{ boxShadow: "0 0 60px rgba(0,212,255,0.1)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mx-auto mb-4">
            <User size={24} className="text-cyan-400" />
          </div>

          <h2 className="text-3xl font-bold text-white">
            {tab === "login" ? "Connexion" : "Créer un compte"}
          </h2>

          <p className="text-white/40 text-sm mt-2">
            C-SERVICE BUSINESS — ULTRA STUDIO
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`flex-1 py-2 rounded-lg ${
              tab === "login"
                ? "bg-cyan-500 text-black"
                : "bg-white/10 text-white"
            }`}
          >
            Connexion
          </button>

          <button
            type="button"
            onClick={() => setTab("register")}
            className={`flex-1 py-2 rounded-lg ${
              tab === "register"
                ? "bg-cyan-500 text-black"
                : "bg-white/10 text-white"
            }`}
          >
            Inscription
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "register" && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-white/40" size={18} />
              <input
                type="text"
                placeholder="Nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 p-3 rounded-lg text-black"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/40" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-3 rounded-lg text-black"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/40" size={18} />

            <input
              type={showPwd ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 p-3 rounded-lg text-black"
              required
            />

            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 py-3 rounded-lg font-bold"
          >
            {loading
              ? "Chargement..."
              : tab === "login"
              ? "Se connecter"
              : "S'inscrire"}
          </button>
        </form>

        <p className="text-center text-white/40 text-xs mt-6">
          Admin : <span className="text-cyan-400">cianney029@gmail.com</span>
        </p>
      </div>
    </div>
  );
}
