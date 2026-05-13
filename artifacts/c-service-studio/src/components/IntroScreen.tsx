import { useEffect, useState } from "react";
import { useStore } from "@/stores/useStore";

export default function IntroScreen() {
  const { introSeen, setIntroSeen } = useStore();
  const [visible, setVisible] = useState(!introSeen);
  const [text, setText] = useState("");
  const [showLogo, setShowLogo] = useState(false);
  const [progress, setProgress] = useState(0);
  const fullText = "Bienvenue dans l'univers C-SERVICE BUSINESS — ULTRA STUDIO";

  useEffect(() => {
    if (introSeen) return;

    const t1 = setTimeout(() => setShowLogo(true), 300);
    const t2 = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setText(fullText.slice(0, i));
        setProgress(Math.round((i / fullText.length) * 100));
        if (i >= fullText.length) clearInterval(iv);
      }, 35);
    }, 1200);

    const t3 = setTimeout(() => {
      setVisible(false);
      setIntroSeen();
    }, 4800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [introSeen]);

  if (!visible) return null;

  return (
    <div className="intro-screen" data-testid="intro-screen">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(0,98,255,0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(124,58,237,0.15) 0%, transparent 60%)',
        }} />
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-20" style={{
            width: Math.random() * 4 + 1 + 'px', height: Math.random() * 4 + 1 + 'px',
            left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
            background: '#00d4ff',
            boxShadow: '0 0 6px #00d4ff',
            animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: Math.random() * 2 + 's',
          }} />
        ))}
        {/* Scanline */}
        <div className="absolute left-0 right-0 h-[2px] opacity-10" style={{
          background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
          animation: 'scanline 3s linear infinite',
          top: 0,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* Logo */}
        <div className={`transition-all duration-700 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ filter: showLogo ? 'none' : 'blur(20px)' }}>
          <div className="relative">
            {/* Light rays */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <div key={i} className="absolute w-40 h-[1px] opacity-30" style={{
                  background: 'linear-gradient(90deg, transparent, #00d4ff)',
                  transform: `rotate(${deg}deg) translateX(50%)`,
                  animation: `lightRay ${1.5 + i * 0.1}s ease-out forwards`,
                  animationDelay: `${0.5 + i * 0.05}s`,
                }} />
              ))}
            </div>
            <div className="relative z-10 px-8 py-4">
              <div className="font-bebas text-5xl md:text-7xl tracking-wider text-white text-glow-cyan" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                C-SERVICE
              </div>
              <div className="font-montserrat text-xs md:text-sm tracking-[0.4em] text-cyan-400 uppercase mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                BUSINESS — ULTRA STUDIO
              </div>
            </div>
          </div>
        </div>

        {/* Typewriter */}
        <div className="min-h-[3rem] flex items-center">
          <p className="text-white/70 font-poppins text-sm md:text-base max-w-md" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {text}<span className="inline-block w-0.5 h-4 bg-cyan-400 ml-1 animate-pulse" />
          </p>
        </div>

        {/* Progress */}
        <div className="w-64 md:w-80">
          <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-100" style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00d4ff, #0062ff)',
              boxShadow: '0 0 8px rgba(0,212,255,0.6)',
            }} />
          </div>
          <p className="text-white/30 text-xs mt-2 font-poppins text-center">Chargement {progress}%</p>
        </div>
      </div>
    </div>
  );
}
