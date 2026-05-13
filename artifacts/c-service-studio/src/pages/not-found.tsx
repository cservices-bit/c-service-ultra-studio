import { Link } from "wouter";
import { Home, Film } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen hero-bg flex items-center justify-center">
      <div className="text-center px-6">
        <div className="font-bebas text-[8rem] leading-none gradient-text mb-4" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>404</div>
        <h1 className="text-white font-bold text-2xl mb-3" style={{ fontFamily: "'Poppins',sans-serif" }}>Page introuvable</h1>
        <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto">La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-cinema btn-primary"><Home size={15} /> Accueil</Link>
          <Link href="/portfolio" className="btn-cinema btn-outline"><Film size={15} /> Portfolio</Link>
        </div>
      </div>
    </div>
  );
}
