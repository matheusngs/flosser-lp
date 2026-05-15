"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Profissional = {
  nome: string;
  funcao: string;
  foto: string;
  /* Ajuste fino da posição vertical da foto p/ alinhar a cabeça (object-position) */
  objectPosition?: string;
  especialidades: string[];
};

/* Fotos, função e especialidades dos profissionais.
   As alturas das cabeças são normalizadas via objectPosition enquanto
   o cliente não envia as fotos já corrigidas. */
const profissionais: Profissional[] = [
  {
    nome: "Dra. Luiza Brescianini",
    funcao: "Cirurgiã-dentista",
    foto: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dra_Luiza.jpg-CgBpliL3nJjYanuMoja9BRHiPAhJFX.webp",
    objectPosition: "center 18%",
    especialidades: [
      "Graduada UNINORTE • 2016",
      "Habilitação em L-PRF (INTRALOCK – SP) • 2015",
      "Perícia Forense em Odontologia (UEA-AM) • 2016",
      "Imersão em Lentes de Contato e Cirurgias Estéticas Periodontais – Miami Anatomical Research Center EUA • 2017",
      "Especialista em Periodontia (IAES) • 2018",
      "Habilitação em Invisalign – Align Technology EUA • 2018",
      "Especialista em Ortodontia (FASERRA – SP) • 2020",
    ],
  },
  {
    nome: "Dr. Dante Brescianini",
    funcao: "Implantodontista • Periodontista",
    foto: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dr_dante.jpg-gUSWbjJJ9PdwOF0W6qEmzNaHD6J7Bm.webp",
    objectPosition: "center 85%",
    especialidades: [
      "Graduado UFAM • 1988",
      "Especialista em Periodontia (APCD Bauru-SP) • 1991",
      "Especialista em Implantodontia (Profis FOB-USP Bauru-SP) • 1998",
      "Analgesia consciente por óxido nitroso – Ibirapuera SP • 2003",
      "Habilitação em LPRF – Intralock SP • 2015",
      "Mini residência em Implantodontia – Universidade da Flórida • 2016",
      "Cirurgia Plástica Periodontal – Curitiba • 2018",
      "CRO 1198 AM",
    ],
  },
  {
    nome: "Dr. Rogério Carvalho",
    funcao: "Implantodontista • Periodontista",
    foto: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dr_rogerio.jpg-5nxbCzdxobmomhS0atWjHA8EGfLPT8.webp",
    objectPosition: "center 18%",
    especialidades: [
      "Especialização em Prótese Dentária",
      "Especialista em Periodontia",
      "Especialista em Implantodontia",
      "Membro da Academia Internacional de Osseointegração",
      "Membro Associado da Sociedade Brasileira de Odontologia Estética",
    ],
  },
  {
    nome: "Dra. Axiley Marcelle",
    funcao: "Ortodontista",
    foto: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dra_Axiley.jpg-fmgVXc7tdigm7XHFGtVCLQvVKRMXWs.webp",
    objectPosition: "center 18%",
    especialidades: [
      "Graduada UNINORTE • 2016",
      "Imersão em Lentes de Contato e Cirurgias Estéticas Periodontais – Miami Anatomical Research Center EUA • 2017",
      "Capacitação em Harmonização Orofacial (IOFAM) • 2017",
      "Especialista em Ortodontia (FASERRA – SP) • 2020",
      "CRO 6018",
    ],
  },
  {
    nome: "Dr. Moisés Aleli Gomes",
    funcao: "Endodontista",
    foto: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dr_moises.jpg-6j0tI4wxbiRqYbeqxUULudfad8aU2F.webp",
    objectPosition: "center 100%",
    especialidades: [
      "Graduação em Odontologia (UEA) • 2017",
      "Capacitação em Endodontia (UEA) • 2018",
      "Capacitação em Cirurgia Bucal Avançada (UEA) • 2018",
      "Layers in Manaus – The Style Italiano method (UNICA) • 2016",
      "Imersão em Restaurações Cerâmicas (UNICA) • 2016",
      "Especialização em Endodontia (UEA) • 2022",
      "CRO 5878",
    ],
  },
  {
    nome: "Dr. Gustavo Albuquerque",
    funcao: "Cirurgião Bucomaxilofacial",
    foto: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dr_gustavo.jpg-lzFNMXNu0SB0SnfKPaUQZ138zQdMoN.webp",
    objectPosition: "center 75%",
    especialidades: [
      "Mestre em Cirurgia e Trauma Bucomaxilofacial",
      "Especialista em Cirurgia e Traumatologia Bucomaxilofacial",
      "Implantodontista – Instituto Odontológico de Cirurgia e Prótese",
      "Professor de Cirurgia e Traumatologia Bucomaxilofacial – UEA",
      "Professor de Pós-graduação em Cirurgia – UEA",
      "Preceptor da Residência em Cirurgia Bucomaxilofacial – UEA",
      "Curso avançado em Cirurgia da ATM – Viena/Áustria",
    ],
  },
  {
    nome: "Dra. Natália dos Reis",
    funcao: "Ortodontista",
    foto: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dra_natalia-60vTy5sOT7GIyOilrb0MA9UlmwslpU.jpg",
    objectPosition: "center 100%",
    especialidades: [
      "Bacharelado em Odontologia (Fametro) • 2022",
      "Pós-Graduação em Ortodontia (IOA Manaus) • 2025",
      "Fluxo Digital CAD-CAM – Dentsply Sirona • 2023",
      "Imersão em Clareamento Dental Supervisionado • 2024",
      "Atendimento a pacientes com necessidades especiais, lactantes e lactentes • 2020",
      "Alinhadores ortodônticos ClearCorrect • 2025",
      "Pré-natal odontológico e atendimento primário a lactentes • 2025",
    ],
  },
  {
    nome: "Dra. Karla Aidar",
    funcao: "Médica Dermatologista",
    foto: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dra_karla-RShLAcrnjuxlLlqyhnW3y1d9Bh1Cnb.jpg",
    objectPosition: "center 18%",
    especialidades: [
      "Graduação em Medicina – Universidade do Estado do Amazonas",
      "Especialista em Medicina Estética – Instituto Superior de Medicina/SP",
      "Especialista em Dermatologia – Afya/SP",
      "Especialista em Tricologia – RAT (Priscila Barreto-SP)",
      "Constante participação em congressos nacionais e internacionais",
      "Docente na Afya Faculdade de Ciências Médicas de Manacapuru-AM (2025–atual)",
      "Dermatologia clínica e cirúrgica – Hospital de Aeronáutica de Manaus (2025–atual)",
    ],
  },
];

export default function Profissionais() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [flipped, setFlipped] = useState<number | null>(null);

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
      id="profissionais"
      ref={ref}
      className="relative py-24 md:py-36 bg-gradient-light overflow-hidden"
    >
      {/* Orb bege */}
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-orb-beige opacity-60 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          className={`max-w-3xl mb-16 md:mb-20 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-light text-flosser-ink leading-[1.05] tracking-tight">
            Conheça nossos{" "}
            <span className="italic text-flosser-sage-dark">profissionais</span>.
          </h2>
          <p className="mt-8 text-base md:text-lg text-flosser-ink-muted leading-relaxed font-light max-w-2xl">
            Nossa equipe foi construída para cobrir todas as fases do seu
            tratamento — com cada profissional comprometido com o mesmo
            protocolo clínico, o mesmo rigor de diagnóstico e o mesmo resultado
            que a Flosser se propõe a entregar.
          </p>
          <p className="mt-4 text-xs tracking-[0.2em] uppercase text-flosser-sage-dark font-semibold">
            Passe o mouse ou toque no card para ver as especialidades
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {profissionais.map((p, i) => {
            const isFlipped = flipped === i;
            return (
              <article
                key={i}
                className={`flip-card group relative transition-all duration-700 ${
                  isFlipped ? "is-flipped" : ""
                } ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setFlipped(isFlipped ? null : i)}
                  aria-label={`Ver especialidades de ${p.nome}`}
                  className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-flosser-sage-dark rounded-2xl"
                >
                  <div className="relative aspect-[4/5] w-full">
                    <div className="flip-card-inner">
                      {/* FRENTE - foto */}
                      <div className="flip-card-face rounded-2xl overflow-hidden glass-light">
                        <div className="relative w-full h-full">
                          <Image
                            src={p.foto}
                            alt={`Foto de ${p.nome}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            style={{
                              objectPosition: p.objectPosition || "center 20%",
                            }}
                          />
                          <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
                          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-flosser-black/45 to-transparent" />
                          <span className="absolute top-4 right-4 glass-dark text-flosser-text/90 text-[9px] tracking-[0.25em] uppercase font-semibold rounded-full px-3 py-1.5">
                            Especialidades
                          </span>
                        </div>
                      </div>

                      {/* VERSO - especialidades sobre fundo da foto + glass sage */}
                      <div className="flip-card-face flip-card-back rounded-2xl overflow-hidden">
                        <div className="absolute inset-0">
                          <Image
                            src={p.foto}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover blur-md scale-110"
                            style={{
                              objectPosition: p.objectPosition || "center 20%",
                            }}
                            aria-hidden
                          />
                          <div className="absolute inset-0 bg-flosser-sage-soft/85" />
                        </div>
                        <div className="relative h-full p-5 md:p-6 flex flex-col">
                          <p className="text-[10px] tracking-[0.3em] uppercase text-flosser-sage-light font-semibold">
                            {p.funcao}
                          </p>
                          <h3 className="font-sans text-lg md:text-xl font-light text-flosser-text leading-tight tracking-tight mt-2 mb-4">
                            {p.nome}
                          </h3>
                          <ul className="space-y-2 overflow-y-auto pr-1 text-[12px] md:text-[12.5px] text-flosser-text/90 leading-snug font-light">
                            {p.especialidades.map((esp, j) => (
                              <li
                                key={j}
                                className="flex gap-2 items-start"
                              >
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-flosser-sage-light shrink-0" />
                                <span>{esp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                <div className="pt-5">
                  <h3 className="font-sans text-xl md:text-2xl font-light text-flosser-ink tracking-tight">
                    {p.nome}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-5 h-px bg-flosser-sage-dark" />
                    <p className="text-[11px] tracking-[0.2em] uppercase text-flosser-sage-dark font-semibold">
                      {p.funcao}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
