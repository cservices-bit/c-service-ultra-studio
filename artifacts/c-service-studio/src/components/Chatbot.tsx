import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message { role: "bot" | "user"; text: string; }

const RESPONSES: Record<string, string> = {
  bonjour: "Bonjour ! Bienvenue chez C-SERVICE BUSINESS — ULTRA STUDIO. Comment puis-je vous aider aujourd'hui ?",
  hello: "Hello! Welcome to C-SERVICE BUSINESS — ULTRA STUDIO. How can I help you?",
  services: "Nous offrons : montage vidéo, production cinéma, clips musicaux, photographie, streaming live, motion design, drone, branding digital et formation !",
  prix: "Nos tarifs commencent à partir de 50$. Contactez-nous sur WhatsApp (+243 850406200) pour un devis personnalisé.",
  contact: "📱 WhatsApp : +243 850406200\n📧 Email : Cianney029@gmail.com",
  formation: "Nous proposons des formations en : montage vidéo, tournage cinéma, motion design, business digital et marketing. Visitez notre Académie !",
  académie: "L'Académie C-SERVICE propose des cours professionnels avec vidéos, PDF et progression interactive. Cliquez sur 'Académie' dans le menu.",
  luts: "Nos LUTs cinéma couvrent : Teal & Orange, Hollywood, Wedding, Netflix Style, Dark Cinematic et bien plus ! Disponibles dans la section LUTs.",
  montage: "Notre service de montage vidéo professionnel inclut : effets, transitions, étalonnage colorimétrique, musique et sous-titres. À partir de 50$.",
  default: "Je suis votre assistant C-SERVICE. Pour plus d'informations, contactez-nous : WhatsApp +243 850406200 ou email Cianney029@gmail.com",
};

const getResponse = (msg: string) => {
  const lower = msg.toLowerCase();
  for (const [key, val] of Object.entries(RESPONSES)) {
    if (key !== "default" && lower.includes(key)) return val;
  }
  return RESPONSES.default;
};

const SUGGESTIONS = ["Nos services", "Prix & tarifs", "Contact", "Formations", "LUTs"];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([{ role: "bot", text: "Bonjour ! Je suis l'assistant C-SERVICE. Comment puis-je vous aider ?" }]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    setMsgs(m => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      setMsgs(m => [...m, { role: "bot", text: getResponse(text) }]);
    }, 600);
  };

  return (
    <>
      {/* FAB */}
      <button className="chatbot-fab" onClick={() => setOpen(!open)} data-testid="chatbot-fab" aria-label="Chat">
        {open ? <X size={22} className="text-slate-900" /> : <MessageCircle size={22} className="text-slate-900" />}
      </button>

      {/* Window */}
      <div className={`chatbot-window ${open ? "" : "hidden"}`} data-testid="chatbot-window">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,98,255,0.1))' }}>
          <div className="w-9 h-9 rounded-full bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center">
            <Bot size={18} className="text-cyan-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Assistant C-SERVICE</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs text-white/40">En ligne</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ maxHeight: '300px' }}>
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-cyan-400/20 border border-cyan-400/20 text-white"
                  : "bg-white/5 border border-white/10 text-white/80"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Suggestions */}
        <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => send(s)}
              className="text-xs px-2.5 py-1 rounded-full border border-cyan-400/20 text-cyan-400/70 hover:bg-cyan-400/10 transition-colors">
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={e => { e.preventDefault(); send(input); }} className="p-3 border-t border-white/10 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Votre question..."
            data-testid="chatbot-input"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40" />
          <button type="submit" data-testid="chatbot-send"
            className="w-9 h-9 flex items-center justify-center bg-cyan-400 rounded-xl text-slate-900 hover:bg-cyan-300 transition-colors flex-shrink-0">
            <Send size={15} />
          </button>
        </form>
      </div>
    </>
  );
}
