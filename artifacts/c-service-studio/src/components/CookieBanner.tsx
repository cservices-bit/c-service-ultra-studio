import { useEffect, useState } from "react";
import { Shield, X, Cookie } from "lucide-react";
import { useStore } from "@/stores/useStore";

export default function CookieBanner() {
  const { cookieConsent, setCookieConsent } = useStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (cookieConsent === null) setTimeout(() => setShow(true), 2000);
  }, [cookieConsent]);

  const accept = () => { setCookieConsent(true); setShow(false); };
  const decline = () => { setCookieConsent(false); setShow(false); };

  if (cookieConsent !== null) return null;

  return (
    <div className={`cookie-banner ${show ? "show" : ""}`} data-testid="cookie-banner">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-9 h-9 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie size={16} className="text-cyan-400" />
          </div>
          <div>
            <p className="text-white/90 text-sm font-medium">Nous utilisons des cookies</p>
            <p className="text-white/50 text-xs mt-0.5 max-w-xl">
              Ce site utilise des cookies pour améliorer votre expérience et analyser l'audience. Vos données sont protégées.{" "}
              <a href="/cookies" className="text-cyan-400 hover:underline">En savoir plus</a>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a href="/privacy" className="text-xs text-white/40 hover:text-cyan-400 transition-colors hidden sm:block">Politique</a>
          <button onClick={decline} data-testid="cookie-decline"
            className="text-xs px-3 py-2 text-white/50 border border-white/10 rounded-full hover:border-white/30 transition-all">
            Refuser
          </button>
          <button onClick={accept} data-testid="cookie-accept"
            className="text-xs px-4 py-2 bg-cyan-400 text-slate-900 font-semibold rounded-full hover:bg-cyan-300 transition-all flex items-center gap-1.5">
            <Shield size={12} /> Accepter tout
          </button>
        </div>
      </div>
    </div>
  );
}
