import { useState } from "react";
import { Phone, Mail, MapPin, Send, Instagram, Youtube, Facebook, MessageCircle, Shield } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { T } from "@/data/translations";
import { toast } from "sonner";

export default function ContactPage() {
  const { language } = useStore();
  const t = T[language].contact;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Veuillez remplir tous les champs requis."); return; }
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    const messages = JSON.parse(localStorage.getItem("csb-messages") || "[]");
    messages.unshift({ ...form, id: Math.random().toString(36).slice(2), date: new Date().toISOString() });
    localStorage.setItem("csb-messages", JSON.stringify(messages));
    setForm({ name: "", email: "", subject: "", message: "" });
    setSending(false);
    toast.success(t.success);
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <div className="relative py-16 text-center" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 60%)' }}>
        <div className="container-cinema">
          <div className="section-tag mx-auto w-fit mb-4"><MessageCircle size={12} /> Contact</div>
          <h1 className="section-title mb-4">{t.title}</h1>
          <p className="section-subtitle mx-auto text-center">{t.sub}</p>
        </div>
      </div>

      <div className="container-cinema py-12">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info panel */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* WhatsApp CTA */}
            <a href="https://wa.me/243850406200" target="_blank" rel="noopener noreferrer" data-testid="whatsapp-btn"
              className="cinema-card p-6 flex items-center gap-4 border-emerald-400/20 hover:border-emerald-400/40 group transition-all">
              <div className="w-12 h-12 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center group-hover:scale-110 transition-all flex-shrink-0">
                <Phone size={22} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-emerald-400 font-semibold text-sm">WhatsApp Direct</p>
                <p className="text-white text-lg font-bold">+243 850 406 200</p>
                <p className="text-white/40 text-xs mt-0.5">Réponse en moins d'1 heure</p>
              </div>
            </a>

            {/* Email */}
            <a href="mailto:Cianney029@gmail.com" data-testid="email-btn"
              className="cinema-card p-6 flex items-center gap-4 border-cyan-400/20 hover:border-cyan-400/40 group transition-all">
              <div className="w-12 h-12 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center group-hover:scale-110 transition-all flex-shrink-0">
                <Mail size={22} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-cyan-400 font-semibold text-sm">Email</p>
                <p className="text-white text-base font-bold break-all">Cianney029@gmail.com</p>
                <p className="text-white/40 text-xs mt-0.5">Réponse sous 24h</p>
              </div>
            </a>

            {/* Location */}
            <div className="cinema-card p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-400/10 border border-purple-400/20 flex items-center justify-center flex-shrink-0">
                <MapPin size={22} className="text-purple-400" />
              </div>
              <div>
                <p className="text-purple-400 font-semibold text-sm">Studio</p>
                <p className="text-white text-sm font-bold">Kinshasa, RDC</p>
                <p className="text-white/40 text-xs mt-0.5">Afrique Centrale</p>
              </div>
            </div>

            {/* Social */}
            <div className="cinema-card p-6">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Réseaux sociaux</p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Instagram, label: "Instagram", color: "#E1306C" },
                  { icon: Youtube, label: "YouTube", color: "#FF0000" },
                  { icon: Facebook, label: "Facebook", color: "#1877F2" },
                ].map(s => (
                  <a key={s.label} href="#" aria-label={s.label}
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 transition-all group">
                    <s.icon size={18} className="text-white/40 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Security badge */}
            <div className="flex flex-wrap gap-2">
              <span className="badge-security badge-ssl"><Shield size={10} /> SSL Secured</span>
              <span className="badge-security badge-verified">Verified Business</span>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="cinema-card p-8" data-testid="contact-form">
              <h2 className="text-white font-bold text-xl mb-6" style={{ fontFamily: "'Poppins',sans-serif" }}>Envoyez-nous un message</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">{t.name} *</label>
                  <input data-testid="contact-name" type="text" placeholder="Votre nom complet" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-400/50 transition-colors" />
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">{t.email} *</label>
                  <input data-testid="contact-email" type="email" placeholder="votre@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-400/50 transition-colors" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-white/50 text-xs mb-1.5 block">{t.subject}</label>
                  <input data-testid="contact-subject" type="text" placeholder="Objet de votre message" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-400/50 transition-colors" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-white/50 text-xs mb-1.5 block">{t.message} *</label>
                  <textarea data-testid="contact-message" placeholder="Décrivez votre projet ou posez votre question..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none" />
                </div>
              </div>
              <button type="submit" data-testid="contact-submit" disabled={sending}
                className="btn-cinema btn-primary mt-6 disabled:opacity-50">
                {sending ? "Envoi en cours..." : <><Send size={15} /> {t.send}</>}
              </button>
              <p className="text-white/20 text-xs mt-3">
                Vos données sont protégées. Voir notre <a href="/privacy" className="text-cyan-400/60 hover:text-cyan-400">Politique de confidentialité</a>.
              </p>
            </form>

            {/* Map placeholder */}
            <div className="mt-6 cinema-card overflow-hidden">
              <div className="aspect-video bg-white/3 flex flex-col items-center justify-center gap-3" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,98,255,0.08) 0%, rgba(5,10,20,0.95) 100%)' }}>
                <MapPin size={36} className="text-cyan-400/40" />
                <p className="text-white/30 text-sm">Kinshasa, République Démocratique du Congo</p>
                <a href="https://maps.google.com/?q=Kinshasa,Congo" target="_blank" rel="noopener noreferrer"
                  className="text-cyan-400 text-xs flex items-center gap-1 hover:underline">
                  Voir sur Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
