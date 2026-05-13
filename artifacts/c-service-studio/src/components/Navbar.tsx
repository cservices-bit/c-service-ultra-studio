import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Moon, Sun, User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { T } from "@/data/translations";
import AuthModal from "@/components/AuthModal";

const LINKS = [
  { key: "home", href: "/" },
  { key: "portfolio", href: "/portfolio" },
  { key: "academy", href: "/academy" },
  { key: "services", href: "/#services" },
  { key: "business", href: "/business" },
  { key: "gallery", href: "/#gallery" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme, language, setLanguage, currentUser, logout } = useStore();
  const t = T[language].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navItems = LINKS.map(l => ({ ...l, label: t[l.key as keyof typeof t] || l.key }));

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} data-testid="navbar">
        <div className="container-cinema flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group" data-testid="nav-logo">
            <span className="font-bebas text-2xl text-white tracking-widest group-hover:text-glow-cyan transition-all" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              C-SERVICE
            </span>
            <span className="text-[0.55rem] tracking-[0.3em] text-cyan-400 uppercase font-montserrat" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              BUSINESS — ULTRA STUDIO
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="nav-links-desktop hidden lg:flex items-center gap-6">
            {navItems.map(item => (
              <a key={item.key} href={item.href}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 ${location === item.href ? "text-cyan-400" : "text-white/70"}`}
                data-testid={`nav-link-${item.key}`}>
                {item.label}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language */}
            <div className="hidden sm:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
              {(["FR", "EN", "SW"] as const).map(lang => (
                <button key={lang} data-testid={`lang-${lang}`}
                  onClick={() => setLanguage(lang)}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium transition-all ${language === lang ? "bg-cyan-400 text-slate-900" : "text-white/50 hover:text-white"}`}>
                  {lang}
                </button>
              ))}
            </div>

            {/* Theme */}
            <button onClick={toggleTheme} data-testid="theme-toggle"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-cyan-400 hover:border-cyan-400/30 transition-all">
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Auth */}
            {currentUser ? (
              <div className="relative">
                <button onClick={() => setShowUserMenu(!showUserMenu)} data-testid="user-menu-btn"
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full pl-1 pr-3 py-1 hover:border-cyan-400/30 transition-all">
                  <img src={currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=00d4ff&color=050a14`}
                    className="w-6 h-6 rounded-full object-cover" alt={currentUser.name} />
                  <span className="text-xs text-white/80 hidden sm:block max-w-[80px] truncate">{currentUser.name}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 glass rounded-xl border border-white/10 py-1 z-50 shadow-xl" data-testid="user-dropdown">
                    {currentUser.role === "admin" && (
                      <Link href="/admin" onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-cyan-400 hover:bg-white/5 transition-colors">
                        <LayoutDashboard size={14} /> Admin Dashboard
                      </Link>
                    )}
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:bg-white/5 transition-colors">
                      <Settings size={14} /> Paramètres
                    </button>
                    <button onClick={() => { logout(); setShowUserMenu(false); }} data-testid="logout-btn"
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors">
                      <LogOut size={14} /> Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setShowAuth(true)} data-testid="auth-btn"
                className="hidden sm:flex items-center gap-1.5 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm px-3 py-1.5 rounded-full hover:bg-cyan-400/20 transition-all">
                <User size={14} /> Connexion
              </button>
            )}

            {/* Hamburger */}
            <button className="lg:hidden w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors nav-mobile-toggle" data-testid="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden glass-dark border-t border-white/10 mt-2" data-testid="mobile-menu">
            <div className="container-cinema py-4 flex flex-col gap-3">
              {navItems.map(item => (
                <a key={item.key} href={item.href}
                  className="text-sm text-white/70 hover:text-cyan-400 py-2 border-b border-white/5 transition-colors">
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-2">
                {(["FR", "EN", "SW"] as const).map(lang => (
                  <button key={lang} onClick={() => setLanguage(lang)}
                    className={`text-xs px-3 py-1 rounded-full transition-all ${language === lang ? "bg-cyan-400 text-slate-900 font-bold" : "bg-white/5 text-white/50"}`}>
                    {lang}
                  </button>
                ))}
              </div>
              {!currentUser && (
                <button onClick={() => { setShowAuth(true); setMenuOpen(false); }}
                  className="btn-cinema btn-primary text-sm justify-center mt-2">
                  <User size={14} /> Connexion
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
