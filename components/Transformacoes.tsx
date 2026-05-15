"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const WHATSAPP_URL =
  "https://wa.me/5592999693483?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flosser%20e%20gostaria%20de%20agendar%20minha%20consulta.";

const resultados = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-193-chNoMqQNvuWrrFha0N3qyttiJOskud.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-198-gplWIoTKefve2kZ4IgqoHltGvsnMos.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-192-XqCAvdpYiXsjmU97Qqxl8s7AYf7bbI.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-194-KCeehrYhCiCsFZY93tLETqBf2K43sK.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-203-oFhnBezPdNY7FMsSolwGJnNsGJzKuH.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-207-3SvfGtoJzoOyaJOm8dWQZhtdZ3vmRv.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-204-zrRJsQAE17mUTo8sEu4hmjBTqYr8DR.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-197-Pwz51jUmrYON1Fp0BztRBSjJy33Imv.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-208-RWJ8vDChO9ifIteny2uGXCBbOtU94g.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-200-Du7yIId8wBYBjcci7Ps74qw4j9MWpQ.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-201-uuQqigTfNtbZ9LvcBRud6O8Vtci1zZ.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-202-ABL0kVz4UN65kbjgzOPXrt6XS5U6Td.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-205-je3dR2MMFLQHUlvhk8uNg4P4XBUetm.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-206-5FQaFbsrcmfMRXPT27n8uxoGsSZQfp.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-195-8WimZAJCBleKGtFbp8ERuSeIngJlnK.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-196-8yfwa2fFSc5isZJ5eAEpXdfBPkZvWE.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-199-Cc0XL2iCbXaRVaWFsEHiDVWCK8npNL.jpg",
];

export default function Transformacoes() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [slideW, setSlideW] = useState(0);
  const total = resultados.length;
  const display = [...resultados, ...resultados];

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
    const start = () => { clearInterval(id); id = setInterval(() => setIndex(p => p + 1), 1500); };
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
    <section id="transformacoes" ref={sectionRef} className="relative py-24 md:py-36 bg-gradient-dark overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-orb-sage opacity-60 pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className={`max-w-3xl mb-16 md:mb-20 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-light text-flosser-text leading-[1.05] tracking-tight">
            Resultados que começam pelo <span className="italic text-flosser-sage">diagnóstico certo</span>.
          </h2>
          <p className="mt-8 text-base md:text-lg text-flosser-muted leading-relaxed font-light max-w-2xl">
            Cada caso aqui começa com um exame completo. O que você vê no resultado final é consequência de um plano clínico bem executado.
          </p>
        </div>
      </div>

      <div className={`relative mb-16 transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}>
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
            {display.map((src, i) => (
              <figure key={i} className="group relative aspect-[3/4] w-[60vw] sm:w-[320px] md:w-[360px] lg:w-[400px] shrink-0 overflow-hidden rounded-2xl glass-dark mr-4 md:mr-6">
                <Image src={src} alt={`Resultado ${(i % total) + 1}`} fill sizes="(max-width:640px) 60vw,(max-width:1024px) 320px,400px" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-flosser-black/40 via-transparent to-transparent" />
              </figure>
            ))}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 mt-8 flex items-center gap-4">
          <button onClick={scrollPrev} aria-label="Anterior" className="glass-dark w-12 h-12 rounded-full flex items-center justify-center text-flosser-text hover:bg-white/10 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={scrollNext} aria-label="Próximo" className="glass-dark w-12 h-12 rounded-full flex items-center justify-center text-flosser-text hover:bg-white/10 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div className="flex gap-1.5 ml-4">
            {resultados.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Resultado ${i + 1}`} className={`h-2 rounded-full transition-all duration-300 ${i === displayIdx ? "bg-flosser-sage w-6" : "bg-white/25 hover:bg-white/40 w-2"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className={`flex justify-start transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="glass-btn-sage group inline-flex items-center gap-3 text-flosser-black px-8 py-4 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase transition-all w-full sm:w-auto justify-center">
            Quero transformar o meu sorriso.
            <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
