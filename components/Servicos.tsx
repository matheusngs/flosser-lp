"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

type Servico = {
  numero: string;
  titulo: string;
  texto: string;
  imagem: string;
  objectPosition?: string;
};

const servicos: Servico[] = [
  {
    numero: "01",
    titulo: "Implantodontia",
    texto: "Implante não é luxo. É função — é mastigar direito pelo resto da vida. Planejamos cada caso digitalmente antes de tocar na sua boca.",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/implante_dente-o2OsbiaLHbhH9LUr1ew1VaBljfe5Aw.jpg",
  },
  {
    numero: "02",
    titulo: "Ortodontia (Invisalign e aparelho)",
    texto: "Alinhamento feito com diagnóstico completo. Aqui você entende por que está usando o aparelho, não só como ele funciona.",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aparelho-hD1ndSYoTMLOi0BrjPGtFof4RZu7aH.jpg",
  },
  {
    numero: "03",
    titulo: "Odontologia do Sono",
    texto: "Ronco e apneia têm tratamento odontológico. Poucos sabem — e menos ainda tratam. A Flosser é referência nesse nicho em Manaus.",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sono-IQcxe6ctWwqYe2RLcLjEQWhZmgfgfs.jpg",
  },
  {
    numero: "04",
    titulo: "Reabilitação Oral",
    texto: "Para quem quer resolver os problemas da boca de vez. Equipe integrada, tecnologia digital e um plano de tratamento transparente do início ao fim.",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cadeira_dentista2-KSeZo5bk3Y4NpGnygMDx4er1djhMJQ.jpeg",
  },
  {
    numero: "05",
    titulo: "Estética com diagnóstico",
    texto: "Faceta, lente e clareamento só depois que a boca está saudável. É assim que garantimos que o resultado dura.",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dentistica-opcao-02-scaled-TQxbZsJ6VVgdGToLfuJ8n1g7pOIhfR.jpg",
  },
  {
    numero: "06",
    titulo: "Profilaxia (limpeza dentária)",
    texto: "O cuidado que previne o problema caro lá na frente. A limpeza é o único momento em que examinamos cada milímetro da sua boca, é quando descobrimos como realmente anda sua saúde bucal.",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0569-1-1-scaled-mAJZX4JzNlr9SE5ILE4oWCRwH8NAYg.jpg",
    objectPosition: "center 95%",
  },
];

export default function Servicos() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [slideW, setSlideW] = useState(0);
  const total = servicos.length;
  const display = [...servicos, ...servicos];

  /* Measure slide width */
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || trackRef.current.children.length < 2) return;
      const a = trackRef.current.children[0] as HTMLElement;
      const b = trackRef.current.children[1] as HTMLElement;
      setSlideW(b.offsetLeft - a.offsetLeft);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* Reset seamlessly when reaching duplicates */
  const handleTransitionEnd = useCallback(() => {
    if (index >= total) {
      setAnimate(false);
      setIndex(0);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    }
  }, [index, total]);

  /* Autoplay — pause on hover, resume on leave */
  useEffect(() => {
    let id: ReturnType<typeof setInterval>;
    const start = () => { clearInterval(id); id = setInterval(() => setIndex(p => p + 1), 2000); };
    const stop = () => clearInterval(id);
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("pointerenter", stop);
    el.addEventListener("pointerleave", start);
    start();
    return () => { stop(); el.removeEventListener("pointerenter", stop); el.removeEventListener("pointerleave", start); };
  }, []);

  /* Intersection observer */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollPrev = () => {
    if (index === 0) {
      setAnimate(false);
      setIndex(total);
      requestAnimationFrame(() => requestAnimationFrame(() => { setAnimate(true); setIndex(total - 1); }));
    } else setIndex(p => p - 1);
  };
  const scrollNext = () => setIndex(p => p + 1);
  const displayIdx = index % total;

  return (
    <section id="servicos" ref={sectionRef} className="relative py-24 md:py-36 bg-gradient-light overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-orb-beige opacity-60 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className={`max-w-2xl mb-14 md:mb-20 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-light text-flosser-ink leading-[1.05] tracking-tight">
            Principais serviços da <span className="italic text-flosser-sage-dark">clínica</span>
          </h2>
          <p className="mt-8 text-base md:text-lg text-flosser-ink-muted leading-relaxed font-light">
            Ter todas as especialidades sob o mesmo teto significa que o seu tratamento não fragmenta. Ele avança.
          </p>
        </div>
      </div>

      <div className={`relative transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}>
        <div className="overflow-hidden" ref={containerRef}>
          <div
            ref={trackRef}
            className="flex"
            style={{
              transform: slideW ? `translateX(-${index * slideW}px)` : undefined,
              transition: animate ? "transform 0.35s cubic-bezier(0.25,1,0.5,1)" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {display.map((s, i) => (
              <article key={i} className="glass-light-strong shrink-0 w-[85vw] sm:w-[400px] lg:w-[440px] rounded-2xl p-8 md:p-10 hover:shadow-[0_12px_48px_-12px_rgba(126,148,112,0.35)] transition-shadow duration-500 flex flex-col relative overflow-hidden group mr-6">
                <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden">
                  <Image src={s.imagem} alt={s.titulo} fill quality={75} loading="lazy" sizes="(max-width:640px) 85vw,400px" className="object-cover group-hover:scale-105 transition-transform duration-500" style={{ objectPosition: s.objectPosition || "center" }} />
                </div>

                <h3 className="font-sans text-2xl md:text-3xl font-light text-flosser-ink leading-tight tracking-tight mb-5">{s.titulo}</h3>
                <p className="text-sm md:text-[15px] text-flosser-ink-muted leading-relaxed font-light flex-grow">{s.texto}</p>
                <div className="mt-6 pt-6 flex items-center gap-3 border-t border-white/40">
                  <span className="divider-sage" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-flosser-ink-soft">Especialidade</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 mt-8 flex items-center gap-4">
          <button onClick={scrollPrev} aria-label="Anterior" className="glass-light w-12 h-12 rounded-full flex items-center justify-center text-flosser-ink hover:bg-white/60 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={scrollNext} aria-label="Próximo" className="glass-light w-12 h-12 rounded-full flex items-center justify-center text-flosser-ink hover:bg-white/60 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div className="flex gap-1.5 ml-4">
            {servicos.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Serviço ${i + 1}`} className={`h-2 rounded-full transition-all duration-300 ${i === displayIdx ? "bg-flosser-sage-dark w-6" : "bg-black/15 hover:bg-black/25 w-2"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
