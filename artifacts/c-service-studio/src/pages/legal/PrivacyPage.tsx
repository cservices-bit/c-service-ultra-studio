import { Shield, Lock, Eye, Database } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="relative py-12 text-center" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)' }}>
        <div className="container-cinema">
          <div className="section-tag mx-auto w-fit mb-4"><Shield size={12} /> Légal</div>
          <h1 className="section-title mb-3">Politique de <span className="gradient-text">Confidentialité</span></h1>
          <p className="text-white/40 text-sm">Dernière mise à jour : 13 mai 2026</p>
        </div>
      </div>

      <div className="container-cinema py-12 max-w-4xl">
        <div className="cinema-card p-8 space-y-8">
          {[
            { icon: Eye, title: "1. Données collectées", content: "Nous collectons uniquement les informations nécessaires à la fourniture de nos services : nom, adresse email, et les informations que vous nous communiquez volontairement via notre formulaire de contact ou lors de la création d'un compte. Aucune donnée sensible (données bancaires, données de santé) n'est collectée directement sur ce site." },
            { icon: Database, title: "2. Utilisation des données", content: "Vos données sont utilisées exclusivement pour : vous répondre suite à votre prise de contact, améliorer votre expérience sur le site, vous envoyer des informations relatives à nos services si vous y avez consenti. Nous ne vendons, ne louons et ne cédons jamais vos données à des tiers commerciaux." },
            { icon: Lock, title: "3. Protection des données", content: "Nous appliquons des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Toutes les données locales sont stockées dans votre navigateur (localStorage) et ne transitent pas par nos serveurs." },
            { icon: Shield, title: "4. Cookies", content: "Ce site utilise des cookies fonctionnels essentiels à son bon fonctionnement, ainsi que des cookies analytiques pour améliorer l'expérience utilisateur. Vous pouvez gérer vos préférences de cookies via la bannière cookies ou la page Gestion des Cookies. Voir notre page dédiée aux cookies pour plus d'informations." },
            { icon: Eye, title: "5. Vos droits", content: "Conformément aux lois en vigueur sur la protection des données, vous disposez des droits suivants : droit d'accès à vos données, droit de rectification, droit à l'effacement ('droit à l'oubli'), droit à la portabilité, droit d'opposition. Pour exercer ces droits, contactez-nous à : Cianney029@gmail.com" },
            { icon: Database, title: "6. Conservation des données", content: "Les données personnelles que vous nous fournissez via le formulaire de contact sont conservées pour une durée maximale de 12 mois. Les données de compte sont conservées tant que votre compte est actif. Vous pouvez à tout moment demander la suppression de votre compte et de vos données." },
            { icon: Shield, title: "7. Contact", content: "Pour toute question relative à cette politique de confidentialité, vous pouvez nous contacter par email à Cianney029@gmail.com ou via WhatsApp au +243 850 406 200. Responsable du traitement : Cianney — C-SERVICE BUSINESS ULTRA STUDIO, Kinshasa, République Démocratique du Congo." },
          ].map((s, i) => (
            <div key={i} className="border-b border-white/5 last:border-0 pb-6 last:pb-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                  <s.icon size={14} className="text-cyan-400" />
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
