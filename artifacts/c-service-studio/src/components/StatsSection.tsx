import { useEffect, useRef, useState } from "react";
import { Users, Video, Trophy, BookOpen, Clock } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { T } from "@/data/translations";

const STATS_DATA = [
  { icon: Users, value: 500, suffix: "+", key: "clients", color: "#00d4ff" },
  { icon: Video, value: 1200, suffix: "+", key: "videos", color: "#0062ff" },
  { icon: Trophy, value: 50, suffix: "+", key: "awards", color: "#7c3aed" },
  { icon: BookOpen, value: 10, suffix: "", key: "academy", color: "#f59e0b", label: "Formations" },
  { icon: Clock, value: 8, suffix: "", key: "exp", color: "#10b981" },
];

function Counter({ value, suffix, started }: { value: number; suffix: string; started: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!started) return;
    const dur = 2000, t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick); else setV(value);
    };
    requestAnimationFrame(tick);
  }, [started, value]);
  return <>{v.toLocaleString()}{suffix}</>;
}

export default function StatsSection() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { language } = useStore();
  const t = T[language];

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); ob.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const labels: Record<string, string> = {
    clients: t.stats.clients, videos: t.stats.videos, exp: t.stats.exp, awards: t.stats.awards, academy: "Formations"
  };

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,98,255,0.05) 0%, rgba(124,58,237,0.05) 100%)' }} />
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,212,255,0.8) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="container-cinema relative z-10">
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit">{t.stats_section.title}</div>
          <h2 className="section-title mt-4">{t.stats_section.title}</h2>
          <p className="section-subtitle mt-4 mx-auto text-center">{t.stats_section.sub}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {STATS_DATA.map((s, i) => (
            <div key={s.key} className="cinema-card p-6 text-center group hover:border-cyan-400/30 transition-all" data-testid={`stat-${s.key}`}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110"
                style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <div className="font-bebas text-4xl md:text-5xl mb-1" style={{ fontFamily: "'Bebas Neue',sans-serif", color: s.color, textShadow: `0 0 20px ${s.color}60` }}>
                <Counter value={s.value} suffix={s.suffix} started={started} />
              </div>
              <p className="text-white/40 text-xs uppercase tracking-widest" style={{ fontFamily: "'Poppins',sans-serif" }}>
                {s.label || labels[s.key]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
