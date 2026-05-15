"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Star, BadgeCheck } from "lucide-react";
import type { GoogleReviewsData } from "@/lib/google-reviews";

/* WhatsApp principal: (92) 99969-3483 */
const WHATSAPP_URL =
  "https://wa.me/5592999693483?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flosser%20e%20gostaria%20de%20agendar%20minha%20consulta.";

/* Fallback das avaliações do Google — extraídas do widget atual no flosser.com.br.
   Substituído automaticamente quando GOOGLE_PLACES_API_KEY estiver configurada. */
const FALLBACK_GOOGLE: GoogleReviewsData = {
  nota: 5.0,
  total: 21,
  mapsUri:
    "https://www.google.com/maps/search/?api=1&query=Flosser+Odontologia+Digital+Av+Mario+Ypiranga+315+Adrianopolis+Manaus",
  reviews: [
    {
      autor: "Diana Côrtes",
      tempo: "1 ano atrás",
      estrelas: 5,
      texto:
        "Excelente. Todos atenciosos e preocupados com meu bem estar; Dr Dante sempre apto a resolver minhas…",
      avatar: "",
    },
    {
      autor: "Erick Moreira",
      tempo: "2 anos atrás",
      estrelas: 5,
      texto: "Atendimento nota 1000!",
      avatar: "",
    },
    {
      autor: "Vanessa Maciel",
      tempo: "2 anos atrás",
      estrelas: 5,
      texto:
        "A melhor clínica de cuidados com o sorriso que já conheci, tecnologia de ponta e profissionais altamente…",
      avatar: "",
    },
  ],
};

function initialOf(name: string) {
  return name?.trim().charAt(0).toUpperCase() || "•";
}

function GoogleG({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-label="Google"
      role="img"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function Depoimentos({
  data,
}: {
  data?: GoogleReviewsData | null;
}) {
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

  const google = data && data.total > 0 ? data : FALLBACK_GOOGLE;
  const reviewsList =
    google.reviews.length > 0
      ? google.reviews.slice(0, 3)
      : FALLBACK_GOOGLE.reviews;

  return (
    <>
      <section
        id="depoimentos"
        ref={ref}
        className="relative py-24 md:py-36 bg-gradient-dark overflow-hidden"
      >
        {/* Orb sage */}
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-orb-sage opacity-60 pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div
            className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16 md:mb-20 transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="lg:col-span-7">
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-light text-flosser-text leading-[1.05] tracking-tight">
                Quem já veio{" "}
                <span className="italic text-flosser-sage">resolver</span>,
                voltou para cuidar.
              </h2>
            </div>

            <div className="lg:col-span-5 lg:justify-self-end">
              <a
                href={google.mapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-dark group inline-flex items-center gap-4 py-4 px-5 rounded-full hover:border-flosser-sage transition-colors"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.round(google.nota)
                          ? "fill-[#FBBC05] text-[#FBBC05]"
                          : "text-flosser-border"
                      }
                    />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-flosser-text">
                    {google.nota.toFixed(1)}
                  </span>
                </div>
                <span className="h-4 w-px bg-flosser-border" />
                <span className="text-xs text-flosser-muted font-light">
                  <span className="text-flosser-text font-medium">
                    {google.total}
                  </span>{" "}
                  avaliações
                </span>
                <GoogleG className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {reviewsList.map((r, i) => (
              <article
                key={`${r.autor}-${i}`}
                className={`glass-dark relative rounded-2xl p-7 md:p-8 hover:-translate-y-1 transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden bg-flosser-sage/30 shrink-0 flex items-center justify-center">
                      {r.avatar ? (
                        <Image
                          src={r.avatar}
                          alt={`Foto de ${r.autor}`}
                          fill
                          sizes="44px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                          unoptimized
                        />
                      ) : (
                        <span className="font-sans text-xl text-flosser-sage-light">
                          {initialOf(r.autor)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-flosser-text">
                        {r.autor}
                      </p>
                      <p className="text-xs text-flosser-muted">{r.tempo}</p>
                    </div>
                  </div>
                  <GoogleG className="w-6 h-6 shrink-0" />
                </div>

                <div className="flex items-center gap-1.5 mb-4">
                  {Array.from({ length: r.estrelas }).map((_, s) => (
                    <Star
                      key={s}
                      size={16}
                      className="fill-[#FBBC05] text-[#FBBC05]"
                    />
                  ))}
                  <BadgeCheck
                    size={16}
                    className="ml-1 text-[#4285F4] fill-[#4285F4]/10"
                  />
                </div>

                <p className="text-sm text-flosser-text/85 leading-relaxed font-light line-clamp-6">
                  {r.texto}
                </p>
              </article>
            ))}
          </div>

          <div
            className={`flex justify-start transition-all duration-1000 delay-300 ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn-sage group inline-flex items-center gap-3 text-flosser-black px-8 py-4 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase transition-all w-full sm:w-auto justify-center"
            >
              Quero agendar a minha consulta.
              <span
                aria-hidden
                className="inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
