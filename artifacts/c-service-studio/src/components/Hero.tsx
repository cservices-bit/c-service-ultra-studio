import { useEffect, useRef, useState } from "react";
import { Play, Download, MessageCircle, ChevronDown, Star } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { T } from "@/data/translations";
import { useLocation } from "wouter";

const STATS = [
  { value: 500, suffix: "+", key: "clients" },
  { value: 1200, suffix: "+", key: "videos" },
  { value: 8, suffix: "", key: "exp" },
  { value: 50, suffix: "+", key: "awards" },
];

function useCounter(target: number, suffix: string, start: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const duration = 2000;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [start, target]);
  return val.toLocaleString() + suffix;
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const display = useCounter(value, suffix, started);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); ob.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="stat-number">{display}</div>
      <div className="text-white/50 text-xs uppercase tracking-widest font-poppins mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{label}</div>
    </div>
  );
}

function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let anim: number;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.5 + 0.5, vx: (Math.random() - 0.5) * 0.3, vy: -Math.random() * 0.5 - 0.2,
      a: Math.random(),
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.a * 0.6;
        ctx.fillStyle = "#00d4ff";
        ctx.shadowBlur = 8; ctx.shadowColor = "#00d4ff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        p.x += p.vx; p.y += p.vy;
        if (p.y < -5) { p.y = c.height + 5; p.x = Math.random() * c.width; }
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
      });
      anim = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(anim); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full particle-canvas" />;
}

export default function Hero() {
  const { language } = useStore();
  const t = T[language];
  const [, navigate] = useLocation();
  const lines = t.hero.title.split("\n");

  return (
    <section className="hero-bg relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20" id="hero">
      <ParticleCanvas />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050a14]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050a14]/60 via-transparent to-[#050a14]/60" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="container-cinema relative z-10 flex flex-col items-center text-center gap-8 py-20">
        {/* Badge */}
        <div className="section-tag anim-fade-up" style={{ animationDelay: "0.2s" }}>
          <Star size={12} className="text-cyan-400" />
          Studio Cinéma Premium — Kinshasa, RDC
        </div>

        {/* Title */}
        <h1 className="max-w-4xl anim-fade-up" style={{ animationDelay: "0.4s" }}>
          {lines.map((line, i) => (
            <span key={i} className={`block font-bebas text-glow-cyan ${i === 0 ? "text-white" : "gradient-text"}`}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1.05, letterSpacing: "0.02em" }}>
              {line}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="text-white/50 max-w-xl text-sm md:text-base tracking-wide anim-fade-up" style={{ animationDelay: "0.6s", fontFamily: "'Poppins', sans-serif" }}>
          {t.hero.sub}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 anim-fade-up" style={{ animationDelay: "0.8s" }}>
          <a href="/portfolio" className="btn-cinema btn-primary">
            <Play size={16} /> {t.hero.btn1}
          </a>
          <a href="#" className="btn-cinema btn-outline">
            <Download size={16} /> {t.hero.btn2}
          </a>
          <a href="/contact" className="btn-cinema btn-ghost">
            <MessageCircle size={16} /> {t.hero.btn3}
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-4 anim-fade-up" style={{ animationDelay: "1s" }}>
          {STATS.map(s => (
            <StatCounter key={s.key} value={s.value} suffix={s.suffix} label={t.stats[s.key as keyof typeof t.stats]} />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-cyan-400/60 rounded-full" style={{ animation: "scrollIndicator 1.5s ease-in-out infinite" }} />
          </div>
          <ChevronDown size={16} className="opacity-40" />
        </div>
      </div>

      <style>{`@keyframes scrollIndicator { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(4px);opacity:0.3} }`}</style>
    </section>
  );
}
