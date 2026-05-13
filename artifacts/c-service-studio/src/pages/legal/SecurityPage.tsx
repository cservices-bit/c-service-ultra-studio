import { Shield, Lock, Eye, Server, CheckCircle, AlertTriangle } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="relative py-12 text-center" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 60%)' }}>
        <div className="container-cinema">
          <div className="section-tag mx-auto w-fit mb-4"><Shield size={12} /> Sécurité</div>
          <h1 className="section-title mb-3">Politique de <span className="gradient-text">Sécurité</span></h1>
          <p className="text-white/40 text-sm">Notre engagement pour la protection de vos données</p>
        </div>
      </div>

      <div className="container-cinema py-12 max-w-4xl">
        {/* Security badges */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {[
            { icon: Lock, label: "SSL/TLS Chiffrement", color: "#00d4ff", bg: "rgba(0,212,255,0.1)", border: "rgba(0,212,255,0.2)" },
            { icon: CheckCircle, label: "Verified Business", color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
            { icon: Shield, label: "HTTPS Secured", color: "#7c3aed", bg: "rgba(124,58,237,0.1)", border: "rgba(124,58,237,0.2)" },
            { icon: Eye, label: "Privacy First", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
          ].map(b => (
            <div key={b.label} className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: b.bg, border: `1px solid ${b.border}` }}>
              <b.icon size={14} style={{ color: b.color }} />
              <span className="text-sm font-medium" style={{ color: b.color }}>{b.label}</span>
            </div>
          ))}
        </div>

        <div className="cinema-card p-8 space-y-8">
          {[
            { icon: Lock, color: "#00d4ff", title: "1. Chiffrement des communications", content: "Toutes les communications entre votre navigateur et notre site sont chiffrées via SSL/TLS (HTTPS). Le certificat SSL garantit l'authenticité de notre site et protège vos données en transit. Toute tentative de connexion non sécurisée est automatiquement redirigée vers HTTPS." },
            { icon: Server, color: "#7c3aed", title: "2. Stockage local sécurisé", content: "Ce site n'utilise pas de base de données distante pour stocker vos données personnelles. Vos préférences, historique de navigation et données de compte sont stockés localement dans votre navigateur (localStorage) et ne transitent pas par des serveurs tiers. Cela minimise les risques de violation de données." },
            { icon: Eye, color: "#10b981", title: "3. Authentification sécurisée", content: "Notre système d'authentification utilise des pratiques de sécurité modernes. Les mots de passe ne sont jamais stockés en clair. Les sessions utilisateur sont gérées localement avec expiration automatique. Nous vous recommandons d'utiliser un mot de passe fort et unique pour votre compte." },
            { icon: Shield, color: "#f59e0b", title: "4. Protection contre les attaques", content: "Des mesures de protection sont en place contre les attaques courantes : protection XSS (Cross-Site Scripting), validation côté client de toutes les entrées utilisateur, protection CSRF pour les formulaires, limitation du contenu externe via des politiques CSP." },
            { icon: CheckCircle, color: "#00d4ff", title: "5. Signalement de vulnérabilités", content: "Si vous découvrez une vulnérabilité de sécurité sur notre site, nous vous encourageons à nous la signaler de manière responsable. Contactez-nous immédiatement à Cianney029@gmail.com avec les détails de la vulnérabilité. Nous nous engageons à traiter votre signalement dans les 48 heures." },
            { icon: AlertTriangle, color: "#ef4444", title: "6. Conseils de sécurité", content: "Pour votre sécurité en ligne : utilisez des mots de passe uniques et complexes, activez l'authentification à deux facteurs lorsque disponible, gardez votre navigateur et système d'exploitation à jour, méfiez-vous des tentatives de phishing, ne partagez jamais vos identifiants de connexion." },
          ].map((s, i) => (
            <div key={i} className="border-b border-white/5 last:border-0 pb-6 last:pb-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                  <s.icon size={14} style={{ color: s.color }} />
                </div>
                <h2 className="text-white font-semibold" style={{ fontFamily: "'Poppins',sans-serif" }}>{s.title}</h2>
              </div>
              <p className="text-white/50 text-sm leading-relaxed pl-11">{s.content}</p>
            </div>
          ))}
        </div>

        <div className="cinema-card p-6 border-emerald-400/15 mt-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-white font-semibold text-sm mb-1">Contact sécurité</p>
              <p className="text-white/50 text-sm">Pour tout signalement de sécurité ou question urgente :<br />
                Email : <a href="mailto:Cianney029@gmail.com" className="text-cyan-400 hover:underline">Cianney029@gmail.com</a><br />
                WhatsApp : <a href="https://wa.me/243850406200" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">+243 850 406 200</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
