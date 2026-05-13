import { GraduationCap, Play, FileText, Download, Star, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useStore } from "@/stores/useStore";
import { T } from "@/data/translations";

const COURSES = [
  { id: "c1", title: "Montage Vidéo Professionnel", level: "Débutant → Pro", duration: "12h", students: 340, rating: 4.9, color: "#00d4ff", badge: "Bestseller" },
  { id: "c2", title: "Business Digital & Réseaux", level: "Intermédiaire", duration: "8h", students: 210, rating: 4.8, color: "#7c3aed", badge: "Populaire" },
  { id: "c3", title: "Tournage Cinéma 4K", level: "Avancé", duration: "16h", students: 180, rating: 4.9, color: "#0062ff", badge: "Nouveau" },
  { id: "c4", title: "Motion Design & Animation", level: "Intermédiaire", duration: "10h", students: 150, rating: 4.7, color: "#f59e0b", badge: null },
  { id: "c5", title: "Marketing Digital & IA", level: "Tous niveaux", duration: "6h", students: 280, rating: 4.8, color: "#10b981", badge: "Tendance" },
  { id: "c6", title: "IA Créative & Automatisation", level: "Avancé", duration: "8h", students: 120, rating: 4.9, color: "#ef4444", badge: "Nouveau" },
];

const BADGE_COLORS: Record<string, string> = {
  "Bestseller": "bg-amber-400/15 text-amber-400 border-amber-400/25",
  "Populaire": "bg-purple-400/15 text-purple-400 border-purple-400/25",
  "Nouveau": "bg-emerald-400/15 text-emerald-400 border-emerald-400/25",
  "Tendance": "bg-cyan-400/15 text-cyan-400 border-cyan-400/25",
};

export default function AcademySection() {
  const { language } = useStore();
  const t = T[language];

  return (
    <section className="section-padding relative" id="academy">
      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,98,255,0.15) 0%, transparent 70%)' }} />
      <div className="container-cinema relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="section-tag w-fit"><GraduationCap size={12} /> {t.academy.title}</div>
            <h2 className="section-title mt-3">{t.academy.title}</h2>
            <p className="section-subtitle mt-2">{t.academy.sub}</p>
          </div>
          <Link href="/academy" className="btn-cinema btn-outline flex-shrink-0 text-sm">
            Voir tout <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((c, i) => (
            <div key={c.id} className="cinema-card p-6 group cursor-pointer" data-testid={`course-${c.id}`}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}>
                  <Play size={20} style={{ color: c.color }} className="ml-0.5" />
                </div>
                {c.badge && (
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border ${BADGE_COLORS[c.badge]}`}>{c.badge}</span>
                )}
              </div>

              <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "'Poppins',sans-serif" }}>{c.title}</h3>
              <p className="text-white/40 text-xs mb-4">{c.level}</p>

              {/* Progress bar (random progress for demo) */}
              <div className="mb-4">
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="progress-bar-fill h-full rounded-full" style={{ width: `${20 + i * 13}%` }} />
                </div>
                <p className="text-white/30 text-xs mt-1">{20 + i * 13}% complété</p>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-white/40">
                <span className="flex items-center gap-1"><FileText size={11} /> {c.duration}</span>
                <span className="flex items-center gap-1"><Star size={11} className="text-amber-400" /> {c.rating}</span>
                <span>{c.students} étudiants</span>
              </div>

              <button className="btn-cinema btn-primary w-full mt-4 justify-center text-xs py-2.5">
                <Download size={13} /> Commencer
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
