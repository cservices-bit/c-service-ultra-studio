import { useState } from "react";
import { X, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { toast } from "sonner";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (tab === "login") {
      const res = login(email, password);
      if (res.success) { toast.success("Connexion réussie !"); onClose(); }
      else toast.error(res.error || "Erreur de connexion");
    } else {
      if (!name.trim()) { toast.error("Entrez votre nom."); setLoading(false); return; }
      const res = register(name, email, password);
      if (res.success) { toast.success("Compte créé avec succès !"); onClose(); }
      else toast.error(res.error || "Erreur d'inscription");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4" data-testid="auth-modal">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-strong rounded-2xl p-8 w-full max-w-md border border-cyan-400/20 shadow-2xl" style={{ boxShadow: '0 0 60px rgba(0,212,255,0.1)' }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors" data-testid="auth-close">
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mx-auto mb-4">
            <User size={24} className="text-cyan-400" />
          </div>
          <h2 className="font-bebas text-3xl text-white tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {tab === "login" ? "Connexion" : "Créer un compte"}
          </h2>
          <p className="text-white/40 text-sm mt-1">C-SERVICE BUSINESS — ULTRA STUDIO</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white/5 rounded-full p-1">
          <button onClick={() => setTab("login")} data-testid="tab-login"
            className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${tab === "login" ? "bg-cyan-400 text-slate-900" : "text-white/50"}`}>
            Connexion
          </button>
          <button onClick={() => setTab("register")} data-testid="tab-register"
            className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${tab === "register" ? "bg-cyan-400 text-slate-900" : "text-white/50"}`}>
            Inscription
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {tab === "register" && (
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input data-testid="input-name" type="text" placeholder="Nom complet" value={name} onChange={e => setName(e.target.value)} required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors" />
            </div>
          )}
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input data-testid="input-email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors" />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input data-testid="input-password" type={showPwd ? "text" : "password"} placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors" />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button type="submit" data-testid="auth-submit" disabled={loading}
            className="btn-cinema btn-primary justify-center mt-2 disabled:opacity-50">
            {loading ? "Chargement..." : tab === "login" ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        <p className="text-center text-white/30 text-xs mt-4">
          En continuant, vous acceptez nos{" "}
          <a href="/terms" className="text-cyan-400 hover:underline">Conditions</a> et{" "}
          <a href="/privacy" className="text-cyan-400 hover:underline">Politique de confidentialité</a>.
        </p>

        {/* Demo credentials hint */}
        <div className="mt-4 p-3 bg-cyan-400/5 border border-cyan-400/15 rounded-xl">
          <p className="text-white/40 text-xs text-center">
            Admin: <span className="text-cyan-400">cianney029@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
