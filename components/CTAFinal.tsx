"use client";

import { useEffect, useRef, useState } from "react";

/* WhatsApp principal: (92) 99969-3483 */
const WHATSAPP_URL =
  "https://wa.me/5592999693483?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flosser%20e%20gostaria%20de%20agendar%20minha%20consulta.";

export default function CTAFinal() {
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
      id="contato"
      ref={ref}
      className="relative py-28 md:py-40 bg-gradient-dark overflow-hidden grain"
    >
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-orb-sage opacity-60 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-orb-sage opacity-50 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
        <div
          className={`transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="divider-sage" />
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-flosser-sage">
              Agende sua consulta
            </span>
            <span className="divider-sage" />
          </div>

          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-flosser-text leading-[1.05] tracking-tight">
            Pronto para cuidar da sua boca{" "}
            <span className="italic text-flosser-sage">de verdade</span>?
          </h2>

          <p className="mt-10 text-base md:text-lg text-flosser-muted leading-relaxed max-w-2xl mx-auto font-light">
            Agende sua consulta. Você recebe um diagnóstico completo, um plano
            de tratamento explicado com clareza e a segurança de estar em uma
            clínica com estrutura para resolver — não só para começar.
          </p>

          <div className="mt-12 flex justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn-sage group inline-flex items-center gap-3 text-flosser-black px-10 py-5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase transition-all w-full sm:w-auto justify-center"
            >
              Falar com a Flosser no WhatsApp
              <span
                aria-hidden
                className="inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>

          <p className="mt-8 text-sm text-flosser-muted/80 italic font-sans">
            Atendemos por agendamento. Respondemos em até 1 hora útil.
          </p>
        </div>
      </div>
    </section>
  );
}
