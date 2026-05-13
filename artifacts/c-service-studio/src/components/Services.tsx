import { useRef, useEffect } from "react";
import { Film, Scissors, Music, Megaphone, Camera, Radio, Layers, Wind, Globe, GraduationCap, ArrowRight } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { T } from "@/data/translations";

const SERVICES = [
  { icon: Scissors, name: "Montage vidéo", en: "Video Editing", sw: "Uhariri wa Video", desc: "Montage professionnel avec effets cinéma, étalonnage colorimétrique et transitions premium.", color: "#00d4ff" },
  { icon: Film, name: "Production cinéma", en: "Cinema Production", sw: "Uzalishaji wa Sinema", desc: "Tournage professionnel 4K/8K avec équipement cinéma de dernière génération.", color: "#0062ff" },
  { icon: Music, name: "Clips musicaux", en: "Music Videos", sw: "Video za Muziki", desc: "Réalisation de clips musicaux créatifs avec direction artistique complète.", color: "#7c3aed" },
  { icon: Megaphone, name: "Publicités", en: "Advertising", sw: "Matangazo", desc: "Spots publicitaires percutants pour tous supports (TV, web, réseaux sociaux).", color: "#f59e0b" },
  { icon: Camera, name: "Photographie", en: "Photography", sw: "Upigaji Picha", desc: "Séances photo professionnelles : événements, portraits, produits, backstage.", color: "#10b981" },
  { icon: Radio, name: "Streaming live", en: "Live Streaming", sw: "Matangazo ya Moja kwa Moja", desc: "Diffusion en direct multi-plateformes avec régie technique complète.", color: "#ef4444" },
  { icon: Layers, name: "Motion design", en: "Motion Design", sw: "Ubunifu wa Mwendo", desc: "Animation graphique, générique, intro, habillage vidéo et infographies animées.", color: "#00d4ff" },
  { icon: Wind, name: "Drone", en: "Drone", sw: "Ndege", desc: "Prises de vues aériennes cinématographiques avec drones professionnels.", color: "#0062ff" },
  { icon: Globe, name: "Branding digital", en: "Digital Branding", sw: "Branding ya Kidijitali", desc: "Identité visuelle complète : logo, charte graphique, templates réseaux sociaux.", color: "#7c3aed" },
  { icon: GraduationCap, name: "Formation", en: "Training", sw: "Mafunzo", desc: "Formations individuelles et collectives en production vidéo et digital.", color: "#f59e0b" },
];

function ServiceCard({ s, index, lang }: { s: typeof SERVICES[0]; index: number; lang: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const name = lang === "EN" ? s.en : lang === "SW" ? s.sw : s.name;

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { e.target.classList.add("!opacity-100", "!translate-y-0"); ob.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <div ref={ref} className="cinema-card p-6 group cursor-pointer opacity-0 translate-y-8 transition-all duration-700"
      style={{ transitionDelay: `${index * 60}ms` }} data-testid={`service-card-${index}`}>
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
        <s.icon size={22} style={{ color: s.color }} />
      </div>

      <h3 className="text-white font-semibold text-base mb-2 font-poppins group-hover:text-cyan-400 transition-colors"
        style={{ fontFamily: "'Poppins', sans-serif" }}>{name}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>

      <div className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: s.color }}>
        Découvrir <ArrowRight size={12} />
      </div>

      {/* Bottom border glow on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
    </div>
  );
}

export default function Services() {
  const { language } = useStore();
  const t = T[language];

  return (
    <section className="section-padding relative" id="services">
      <div className="container-cinema">
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit">
            <Film size={12} /> {t.services.title}
          </div>
          <h2 className="section-title mt-4">{t.services.title}</h2>
          <p className="section-subtitle mt-4 mx-auto text-center">{t.services.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SERVICES.map((s, i) => <ServiceCard key={s.name} s={s} index={i} lang={language} />)}
        </div>
      </div>
    </section>
  );
}
