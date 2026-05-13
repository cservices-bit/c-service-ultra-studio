import { useState } from "react";
import { Cookie, ToggleLeft, ToggleRight, Shield } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { toast } from "sonner";

export default function CookiesPage() {
  const { cookieConsent, setCookieConsent } = useStore();
  const [analytics, setAnalytics] = useState(cookieConsent === true);
  const [marketing, setMarketing] = useState(false);

  const save = () => {
    setCookieConsent(analytics || marketing);
    toast.success("Préférences de cookies sauvegardées !");
  };

  const ToggleBtn = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`w-12 h-6 rounded-full transition-all relative ${enabled ? "bg-cyan-400" : "bg-white/10"}`}>
      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${enabled ? "left-6.5" : "left-0.5"}`} style={{ left: enabled ? "calc(100% - 1.375rem)" : "0.125rem" }} />
    </button>
  );

  return (
    <div className="min-h-screen pt-24">
      <div className="relative py-12 text-center" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 60%)' }}>
        <div className="container-cinema">
          <div className="section-tag mx-auto w-fit mb-4"><Cookie size={12} /> Légal</div>
          <h1 className="section-title mb-3">Gestion des <span className="gradient-text">Cookies</span></h1>
          <p className="text-white/40 text-sm">Gérez vos préférences de cookies ci-dessous</p>
        </div>
      </div>

      <div className="container-cinema py-12 max-w-3xl">
        <div className="space-y-4 mb-8">
          {/* Essential cookies */}
          <div className="cinema-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white font-semibold" style={{ fontFamily: "'Poppins',sans-serif" }}>Cookies essentiels</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400">Toujours actifs</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">Ces cookies sont nécessaires au bon fonctionnement du site. Ils permettent la navigation, la sauvegarde de vos préférences (langue, thème), l'authentification et la persistance de votre session. Ils ne peuvent pas être désactivés.</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["csb-store", "app-language", "app-theme"].map(c => (
                    <code key={c} className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/40">{c}</code>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-12 h-6 rounded-full bg-emerald-400 relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5" style={{ left: 'calc(100% - 1.375rem)' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="cinema-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-2" style={{ fontFamily: "'Poppins',sans-serif" }}>Cookies analytiques</h3>
                <p className="text-white/50 text-sm leading-relaxed">Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site. Ils nous permettent d'améliorer nos pages et contenus. Les données sont anonymisées et ne permettent pas de vous identifier personnellement.</p>
              </div>
              <div className="flex-shrink-0">
                <ToggleBtn enabled={analytics} onChange={() => setAnalytics(!analytics)} />
              </div>
            </div>
          </div>

          {/* Marketing */}
          <div className="cinema-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-2" style={{ fontFamily: "'Poppins',sans-serif" }}>Cookies marketing</h3>
                <p className="text-white/50 text-sm leading-relaxed">Ces cookies permettent d'afficher des publicités personnalisées en fonction de vos centres d'intérêt. Ils aident à mesurer l'efficacité de nos campagnes publicitaires sur les réseaux sociaux et autres plateformes.</p>
              </div>
              <div className="flex-shrink-0">
                <ToggleBtn enabled={marketing} onChange={() => setMarketing(!marketing)} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <button onClick={save} className="btn-cinema btn-primary"><Shield size={14} /> Sauvegarder mes préférences</button>
          <button onClick={() => { setAnalytics(true); setMarketing(true); save(); }} className="btn-cinema btn-outline">Tout accepter</button>
          <button onClick={() => { setAnalytics(false); setMarketing(false); save(); }} className="btn-cinema btn-ghost">Tout refuser</button>
        </div>

        <div className="cinema-card p-6">
          <h3 className="text-white font-semibold mb-4">Qu'est-ce qu'un cookie ?</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4">Un cookie est un petit fichier texte enregistré sur votre ordinateur ou appareil mobile par votre navigateur lorsque vous visitez un site web. Les cookies servent à mémoriser vos préférences, à analyser le trafic et à personnaliser votre expérience.</p>
          <p className="text-white/50 text-sm leading-relaxed">Ce site utilise uniquement des cookies propres (first-party) et ne fait appel à aucun service de pistage tiers. Pour toute question, contactez-nous à <a href="mailto:Cianney029@gmail.com" className="text-cyan-400 hover:underline">Cianney029@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
