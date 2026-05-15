"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function QuemSomos() {
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
      id="quem-somos"
      ref={ref}
      className="relative py-24 md:py-36 bg-gradient-light overflow-hidden"
    >
      {/* Orb bege para profundidade */}
      <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-orb-beige opacity-70 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div
            className={`lg:col-span-5 order-2 lg:order-1 transition-all duration-1000 ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden glass-light">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ENSAIO_FLOSSER__52_-1024x683-VoBotpkWIz9wrNjYIBrC2io9lsrwVY.jpg"
                alt="Equipe completa da Flosser Odontologia Digital em Manaus"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
            </div>
            <div className="mt-4 text-[10px] tracking-[0.3em] uppercase text-flosser-ink-soft">
              Estrutura · Protocolo · Equipe
            </div>

            {/* Subtítulo final em card frosted glass na lateral esquerda (PDF) */}
            <div className="glass-light-strong mt-8 rounded-2xl p-8 md:p-10">
              <div className="flex items-start gap-4">
                <span className="block w-1 self-stretch bg-flosser-sage-dark rounded-full" />
                <p className="font-sans text-xl md:text-2xl lg:text-[1.75rem] font-light text-flosser-ink leading-snug italic">
                  Antes de falar em sorriso, a gente fala em saúde.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`lg:col-span-7 order-1 lg:order-2 transition-all duration-1000 delay-200 ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-light text-flosser-ink leading-[1.05] tracking-tight">
              Uma clínica construída para{" "}
              <span className="italic text-flosser-sage-dark">resolver</span>.
              Não somente para vender tratamento.
            </h2>

            <div className="mt-10 space-y-6 text-base md:text-lg text-flosser-ink-muted leading-relaxed font-light max-w-2xl">
              <p>
                A Flosser nasceu de uma visão diferente: uma clínica com
                estrutura, equipe e tecnologia capazes de cuidar da saúde bucal
                completa de cada paciente — sem fragmentar o cuidado, sem
                encaminhar para fora, sem pular etapas.
              </p>
              <p>
                Somos uma equipe multidisciplinar com cobertura de praticamente
                todas as especialidades odontológicas, tecnologia digital de
                ponta e um protocolo que começa sempre pelo mesmo lugar:
                entender o que sua boca realmente precisa antes de qualquer
                procedimento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
