import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button id="back-to-top" data-testid="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={visible ? "visible" : ""}
      aria-label="Retour en haut">
      <ArrowUp size={18} />
    </button>
  );
}
