"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { PostMeta } from "@/lib/blog";

export default function UltimosArtigos({ posts }: { posts: PostMeta[] }) {
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

  if (posts.length === 0) return null;

  const latest = posts.slice(0, 3);

  return (
    <section
      id="blog"
      ref={ref}
      className="relative py-24 md:py-36 bg-gradient-dark overflow-hidden"
    >
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-orb-sage opacity-50 pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl">
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-light text-flosser-text leading-[1.05] tracking-tight">
              Saúde bucal{" "}
              <span className="italic text-flosser-sage">explicada</span>.
            </h2>
            <p className="mt-8 text-base md:text-lg text-flosser-muted leading-relaxed font-light">
              Artigos sobre diagnóstico, tratamentos e decisões clínicas — em
              linguagem direta, sem hype.
            </p>
          </div>

          <Link
            href="/blog"
            className="group hidden md:inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-flosser-sage hover:text-flosser-sage-light transition-colors shrink-0"
          >
            Ver todos os artigos
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-12">
          {latest.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group flex flex-col transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="glass-dark relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                {post.imagem && (
                  <Image
                    src={post.imagem}
                    alt={post.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-2xl" />
                <div className="absolute top-4 left-4">
                  <span className="glass-dark text-flosser-sage text-[9px] font-semibold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full">
                    {post.categoria}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-flosser-muted mb-3">
                <time dateTime={post.data}>
                  {post.data &&
                    format(parseISO(post.data), "dd MMM yyyy", {
                      locale: ptBR,
                    })}
                </time>
                <span className="w-1 h-1 rounded-full bg-flosser-border" />
                <span>{post.tempoLeitura} min de leitura</span>
              </div>

              <h3 className="font-sans text-2xl md:text-3xl font-light text-flosser-text leading-snug tracking-tight group-hover:text-flosser-sage transition-colors">
                {post.titulo}
              </h3>

              <p className="mt-4 text-sm text-flosser-muted leading-relaxed font-light line-clamp-2">
                {post.resumo}
              </p>

              <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase text-flosser-sage">
                Ler artigo
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/blog"
          className="glass-btn-outline group md:hidden inline-flex items-center justify-center w-full gap-3 text-flosser-text px-7 py-4 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase transition-all"
        >
          Ver todos os artigos
          <span
            aria-hidden
            className="inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
