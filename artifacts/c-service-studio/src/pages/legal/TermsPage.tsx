import { FileText, Scale, AlertCircle, CheckCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="relative py-12 text-center" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 60%)' }}>
        <div className="container-cinema">
          <div className="section-tag mx-auto w-fit mb-4"><FileText size={12} /> Légal</div>
          <h1 className="section-title mb-3">Conditions <span className="gradient-text">d'Utilisation</span></h1>
          <p className="text-white/40 text-sm">Dernière mise à jour : 13 mai 2026</p>
        </div>
      </div>

      <div className="container-cinema py-12 max-w-4xl">
        <div className="cinema-card p-8 space-y-8">
          {[
            { icon: CheckCircle, title: "1. Acceptation des conditions", content: "En accédant et en utilisant le site web de C-SERVICE BUSINESS ULTRA STUDIO, vous acceptez d'être lié par les présentes Conditions d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site. Ces conditions peuvent être modifiées à tout moment ; votre utilisation continue du site constitue votre acceptation des modifications." },
            { icon: FileText, title: "2. Services proposés", content: "C-SERVICE BUSINESS ULTRA STUDIO propose des services de production vidéo, montage cinéma, photographie, streaming live, motion design, formation digitale et services connexes. Les détails, tarifs et disponibilités des services sont sujets à modification sans préavis. Un devis personnalisé est établi pour chaque projet." },
            { icon: Scale, title: "3. Propriété intellectuelle", content: "Tout le contenu présent sur ce site (textes, images, vidéos, logos, LUTs, tutoriels, designs) est la propriété exclusive de C-SERVICE BUSINESS ULTRA STUDIO ou de ses partenaires et est protégé par les lois sur la propriété intellectuelle. Toute reproduction, distribution ou utilisation sans autorisation écrite est strictement interdite." },
            { icon: AlertCircle, title: "4. Limitation de responsabilité", content: "C-SERVICE BUSINESS ULTRA STUDIO ne saurait être tenu responsable de tout dommage direct, indirect, accessoire ou consécutif résultant de l'utilisation ou de l'impossibilité d'utiliser ce site. Nous ne garantissons pas que le site sera disponible en permanence, sans erreur ou exempt de virus." },
            { icon: CheckCircle, title: "5. Contenu utilisateur", content: "En soumettant du contenu (messages, commentaires, demandes de projets), vous accordez à C-SERVICE BUSINESS ULTRA STUDIO une licence non exclusive pour utiliser ce contenu dans le cadre de la fourniture de nos services. Vous êtes responsable de tout contenu que vous soumettez et garantissez qu'il ne viole pas les droits de tiers." },
            { icon: Scale, title: "6. Droit applicable", content: "Les présentes Conditions d'Utilisation sont régies par le droit congolais. Tout litige relatif à l'interprétation ou à l'exécution des présentes conditions sera soumis à la juridiction compétente de Kinshasa, République Démocratique du Congo. En cas de désaccord, les parties s'engagent à rechercher d'abord une solution amiable." },
            { icon: FileText, title: "7. Coordonnées", content: "Pour toute question concernant ces Conditions d'Utilisation : Email : Cianney029@gmail.com | WhatsApp : +243 850 406 200 | Adresse : Kinshasa, République Démocratique du Congo | Propriétaire : Cianney — C-SERVICE BUSINESS ULTRA STUDIO" },
          ].map((s, i) => (
            <div key={i} className="border-b border-white/5 last:border-0 pb-6 last:pb-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-400/10 border border-purple-400/20 flex items-center justify-center flex-shrink-0">
                  <s.icon size={14} className="text-purple-400" />
                </div>
                <h2 className="text-white font-semibold" style={{ fontFamily: "'Poppins',sans-serif" }}>{s.title}</h2>
              </div>
              <p className="text-white/50 text-sm leading-relaxed pl-11">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
