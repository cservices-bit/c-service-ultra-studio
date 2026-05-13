import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { T } from "@/data/translations";

const FAQS = [
  { q: "Quels sont vos délais de livraison ?", a: "Nos délais varient selon le projet. Un montage standard est livré en 3-5 jours ouvrés. Un projet cinéma complet peut prendre 2-4 semaines. Nous proposons également un service express sous 48h pour les urgences." },
  { q: "Travaillez-vous dans toute la RDC ?", a: "Oui ! Nous intervenons principalement à Kinshasa mais nous acceptons des projets dans toute la RDC et même à l'international. Pour les projets hors Kinshasa, des frais de déplacement s'appliquent." },
  { q: "Quels formats de fichiers acceptez-vous ?", a: "Nous acceptons tous les formats standards : MP4, MOV, AVI, MKV pour la vidéo ; JPG, PNG, RAW pour les photos. Nous travaillons en 4K, Full HD et HD selon vos besoins." },
  { q: "Proposez-vous des paiements échelonnés ?", a: "Absolument ! Nous proposons un acompte de 30% à la commande, 40% à mi-projet et le solde à la livraison finale. Contactez-nous pour discuter des modalités adaptées à votre projet." },
  { q: "Comment se déroule une séance de tournage ?", a: "Après validation du devis, nous réalisons un brief créatif complet avec vous. Le jour J, notre équipe arrive avec tout l'équipement nécessaire. Vous recevez un premier cut dans les 48-72h suivant le tournage." },
  { q: "Proposez-vous des formations pour débutants ?", a: "Oui ! Notre Académie propose des formations pour tous niveaux, des débutants complets aux professionnels souhaitant se perfectionner. Tous nos cours incluent des exercices pratiques et un support après-formation." },
  { q: "Vos LUTs sont-ils compatibles avec tous les logiciels ?", a: "Nos LUTs sont compatibles avec Adobe Premiere Pro, After Effects, DaVinci Resolve, CapCut, Final Cut Pro et Filmora. Chaque pack inclut les instructions d'installation pour chaque logiciel." },
  { q: "Comment vous contacter pour un projet urgent ?", a: "Pour les urgences, WhatsApp est le moyen le plus rapide : +243 850406200. Nous répondons généralement dans l'heure sur WhatsApp. Vous pouvez également écrire à Cianney029@gmail.com." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const { language } = useStore();
  const t = T[language];

  return (
    <section className="section-padding relative" id="faq">
      <div className="container-cinema">
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit"><HelpCircle size={12} /> FAQ</div>
          <h2 className="section-title mt-4">{t.faq.title}</h2>
          <p className="section-subtitle mt-4 mx-auto text-center">{t.faq.sub}</p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div key={i} className={`cinema-card overflow-hidden transition-all duration-300 ${open === i ? "border-cyan-400/30" : ""}`} data-testid={`faq-item-${i}`}>
              <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpen(open === i ? null : i)}>
                <span className={`font-semibold text-sm md:text-base transition-colors ${open === i ? "text-cyan-400" : "text-white"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {faq.q}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all ${open === i ? "bg-cyan-400/20 border border-cyan-400/30" : "bg-white/5 border border-white/10"}`}>
                  {open === i ? <Minus size={14} className="text-cyan-400" /> : <Plus size={14} className="text-white/50" />}
                </div>
              </button>
              <div className={`faq-answer ${open === i ? "open" : ""}`}>
                <p className="text-white/50 text-sm leading-relaxed px-5 pb-5">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
