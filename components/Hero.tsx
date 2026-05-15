"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

/* WhatsApp principal: (92) 99969-3483 */
const WHATSAPP_URL =
  "https://wa.me/5592999693483?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flosser%20e%20gostaria%20de%20agendar%20minha%20consulta.";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden grain"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Fachada da clínica Flosser Odontologia Digital em Manaus"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay preto → verde (direcionamento PDF), translúcido para preservar a foto */}
        {/* Lado direito mais escuro pra dar contraste no texto; lado esquerdo limpo pra manter a logo da fachada legível */}
        <div className="absolute inset-0 bg-gradient-to-l from-flosser-black/85 via-flosser-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-flosser-black/10 via-transparent to-flosser-black/55" />
        {/* Toque de verde (PDF) sem mascarar a foto */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-flosser-sage-soft/25" />
        {/* Orb sage para profundidade */}
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-orb-sage opacity-55 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full pt-28 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Texto agora à direita (PDF) */}
          <div className="lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
            <div
              className={`transition-all duration-1000 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="divider-sage" />
                <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-flosser-sage">
                  Clínica odontológica completa · Manaus
                </span>
              </div>

              {/* Reduzido para caber em 3 linhas (PDF) */}
              <h1 className="font-sans text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-light text-flosser-text leading-[1.05] tracking-tight">
                Seu novo sorriso começa com{" "}
                <span className="italic text-flosser-sage font-normal">
                  saúde bucal
                </span>{" "}
                de verdade.
              </h1>

              <p className="mt-7 text-base md:text-lg text-flosser-muted leading-relaxed max-w-xl font-light">
                A Flosser é uma clínica odontológica completa em Manaus — com
                equipe especializada, tecnologia digital integrada e um padrão
                clínico construído para resolver do início ao fim.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn-sage group inline-flex items-center gap-3 text-flosser-black px-8 py-4 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase transition-all w-full sm:w-auto justify-center"
                >
                  Agendar minha consulta
                  <span
                    aria-hidden
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>

              <p className="mt-6 text-sm text-flosser-muted/80 italic font-sans">
                Consulta com diagnóstico real. Sem pressa. Sem empurrar
                procedimento.
              </p>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#quem-somos"
        aria-label="Rolar para baixo"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-flosser-muted hover:text-flosser-sage transition-colors"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-semibold">
          Explorar
        </span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
