import { Link } from "wouter";
import { Phone, Mail, Instagram, Youtube, Facebook, Twitter, Shield, Lock, CheckCircle } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { T } from "@/data/translations";

export default function Footer() {
  const { language, visitCount } = useStore();
  const t = T[language].footer;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8 overflow-hidden" style={{ background: 'linear-gradient(180deg, #050a14 0%, #020508 100%)' }}>
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-16 rounded-full blur-3xl opacity-10" style={{ background: '#00d4ff' }} />

      <div className="container-cinema">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="font-bebas text-3xl text-white tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>C-SERVICE</div>
              <div className="text-xs tracking-[0.3em] text-cyan-400 uppercase font-montserrat" style={{ fontFamily: "'Montserrat', sans-serif" }}>BUSINESS — ULTRA STUDIO</div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs italic mb-6">{t.tagline}</p>
            <div className="flex items-center gap-3 mb-3">
              <a href="https://wa.me/243850406200" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/50 hover:text-emerald-400 transition-colors text-sm">
                <Phone size={14} className="text-emerald-400" /> +243 850406200
              </a>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <a href="mailto:Cianney029@gmail.com"
                className="flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors text-sm">
                <Mail size={14} className="text-cyan-400" /> Cianney029@gmail.com
              </a>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Youtube, label: "YouTube", href: "#" },
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Twitter, label: "Twitter", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-cyan-400 hover:border-cyan-400/30 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{t.links}</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Accueil", href: "/" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Académie", href: "/academy" },
                { label: "Business", href: "/business" },
                { label: "Blog", href: "/blog" },
                { label: "Téléchargements", href: "/downloads" },
                { label: "LUTs Cinéma", href: "/luts" },
                { label: "Contact", href: "/contact" },
              ].map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/40 hover:text-cyan-400 text-sm transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Security */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{t.legal}</h4>
            <ul className="space-y-2.5 mb-6">
              {[
                { label: t.privacy, href: "/privacy" },
                { label: t.terms, href: "/terms" },
                { label: t.cookies, href: "/cookies" },
                { label: t.security, href: "/security" },
              ].map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/40 hover:text-cyan-400 text-sm transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-purple-400/40 group-hover:bg-purple-400 transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Security Badges */}
            <div className="flex flex-col gap-2">
              <div className="badge-security badge-ssl"><Lock size={10} /> SSL Secured</div>
              <div className="badge-security badge-verified"><CheckCircle size={10} /> Verified Business</div>
              <div className="badge-security badge-protected"><Shield size={10} /> Protected Website</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs text-center sm:text-left">
            © {year} C-SERVICE BUSINESS — ULTRA STUDIO. {t.rights}. Propriétaire : Cianney
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse" />
            <span className="text-white/25 text-xs">{visitCount.toLocaleString()} visiteurs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
