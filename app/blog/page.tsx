import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Flosser Odontologia Digital",
  description:
    "Artigos e conteúdos sobre saúde bucal, tratamentos e novidades da Flosser Odontologia Digital em Manaus.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-flosser-black">
      <Navbar />

      <section className="relative pt-40 pb-16 md:pt-48 md:pb-20 grain overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-flosser-surface/40 to-flosser-black" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-flosser-sage">
              Blog Flosser
            </span>
            <span className="flex-1 h-px bg-flosser-border" />
          </div>
          <div className="max-w-3xl">
            <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-light text-flosser-text leading-[1.05] tracking-tight">
              Saúde bucal{" "}
              <span className="italic text-flosser-sage">de verdade</span>,
              explicada.
            </h1>
            <p className="mt-8 text-base md:text-lg text-flosser-muted leading-relaxed font-light max-w-2xl">
              Diagnóstico, tratamentos e decisões clínicas — em linguagem
              direta, sem hype e sem enrolação.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-28 md:pb-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-flosser-muted font-light">
              Nenhum artigo publicado ainda. Em breve.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-flosser-surface mb-5">
                    {post.imagem && (
                      <Image
                        src={post.imagem}
                        alt={post.titulo}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        priority={i < 3}
                      />
                    )}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-flosser-black/80 backdrop-blur-sm text-flosser-sage text-[9px] font-semibold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full border border-flosser-sage/30">
                        {post.categoria}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-flosser-muted mb-3">
                    <time dateTime={post.data}>
                      {format(parseISO(post.data), "dd MMM yyyy", {
                        locale: ptBR,
                      })}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-flosser-border" />
                    <span>{post.tempoLeitura} min de leitura</span>
                  </div>

                  <h2 className="font-sans text-2xl md:text-3xl font-light text-flosser-text leading-snug tracking-tight group-hover:text-flosser-sage transition-colors">
                    {post.titulo}
                  </h2>

                  <p className="mt-4 text-sm text-flosser-muted leading-relaxed font-light line-clamp-3">
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
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
