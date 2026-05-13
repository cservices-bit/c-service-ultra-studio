import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { T } from "@/data/translations";

const TESTIMONIALS = [
  { name: "Jean-Baptiste Mwamba", role: "Artiste Musicien", text: "C-SERVICE a transformé mon clip en œuvre cinématographique. Qualité incroyable, équipe professionnelle et résultats au-delà de mes attentes !", avatar: "https://ui-avatars.com/api/?name=Jean+Baptiste&background=00d4ff&color=050a14&bold=true", stars: 5 },
  { name: "Marie Kalonda", role: "Wedding Planner", text: "Nous faisons confiance à C-SERVICE pour tous nos mariages. Les vidéos sont magiques, les clients sont toujours époustouflés. Travail exceptionnel !", avatar: "https://ui-avatars.com/api/?name=Marie+Kalonda&background=7c3aed&color=fff&bold=true", stars: 5 },
  { name: "Pastor Emmanuel Dikua", role: "Pasteur, Église Vie Abondante", text: "Grâce à C-SERVICE, notre culte touche des milliers de personnes en ligne. La qualité du streaming est vraiment professionnelle et accessible.", avatar: "https://ui-avatars.com/api/?name=Emmanuel+Dikua&background=0062ff&color=fff&bold=true", stars: 5 },
  { name: "Alice Muamba", role: "Directrice Marketing, Groupe Pharma", text: "Nos publicités réalisées par C-SERVICE ont multiplié nos ventes par trois. Créativité, rapidité et professionnalisme au rendez-vous.", avatar: "https://ui-avatars.com/api/?name=Alice+Muamba&background=f59e0b&color=050a14&bold=true", stars: 5 },
  { name: "Serge Lufua", role: "Entrepreneur Digital", text: "J'ai suivi la formation montage vidéo et j'ai pu lancer mon propre studio en 3 mois. Cianney est un excellent formateur, très pédagogue.", avatar: "https://ui-avatars.com/api/?name=Serge+Lufua&background=10b981&color=050a14&bold=true", stars: 5 },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);
  const { language } = useStore();
  const t = T[language];

  useEffect(() => {
    if (!auto) return;
    const iv = setInterval(() => setCurrent(c => (c + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(iv);
  }, [auto]);

  const prev = () => { setAuto(false); setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); };
  const next = () => { setAuto(false); setCurrent(c => (c + 1) % TESTIMONIALS.length); };
  const item = TESTIMONIALS[current];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.3) 0%, transparent 60%)' }} />

      <div className="container-cinema relative z-10">
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit"><Star size={12} /> {t.testimonials.title}</div>
          <h2 className="section-title mt-4">{t.testimonials.title}</h2>
          <p className="section-subtitle mt-4 mx-auto text-center">{t.testimonials.sub}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="cinema-card p-8 md:p-12 relative text-center">
            <Quote className="absolute top-6 left-6 text-cyan-400/20" size={48} />
            <Quote className="absolute bottom-6 right-6 text-cyan-400/20 rotate-180" size={48} />

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: item.stars }).map((_, i) => <Star key={i} size={18} className="text-amber-400 fill-amber-400" />)}
            </div>

            {/* Text */}
            <blockquote className="text-white/80 text-lg md:text-xl leading-relaxed italic mb-8 relative z-10">
              "{item.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full border-2 border-cyan-400/30" />
              <div className="text-left">
                <p className="text-white font-semibold text-sm">{item.name}</p>
                <p className="text-white/40 text-xs">{item.role}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={prev} data-testid="testimonial-prev"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-cyan-400/40 hover:text-cyan-400 transition-all">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => { setAuto(false); setCurrent(i); }}
                    className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-cyan-400 w-6" : "bg-white/20"}`} />
                ))}
              </div>
              <button onClick={next} data-testid="testimonial-next"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-cyan-400/40 hover:text-cyan-400 transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
