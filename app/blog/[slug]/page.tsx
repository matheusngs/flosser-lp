import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";

/* WhatsApp principal: (92) 99969-3483 */
const WHATSAPP_URL =
  "https://wa.me/5592999693483?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flosser%20e%20gostaria%20de%20agendar%20minha%20consulta.";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Artigo não encontrado — Flosser" };
  return {
    title: `${post.titulo} — Blog Flosser`,
    description: post.resumo,
    openGraph: {
      title: post.titulo,
      description: post.resumo,
      images: post.imagem ? [post.imagem] : undefined,
      type: "article",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(params.slug, 2);

  return (
    <main className="min-h-screen bg-flosser-black">
      <Navbar />

      <article>
        <header className="relative pt-32 md:pt-40 pb-12 md:pb-16 grain overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-flosser-surface/40 to-flosser-black" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase text-flosser-muted hover:text-flosser-sage transition-colors mb-10"
            >
              <ArrowLeft size={13} />
              Voltar ao blog
            </Link>

            <span className="inline-block bg-flosser-sage/10 text-flosser-sage text-[10px] font-semibold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full border border-flosser-sage/30 mb-8">
              {post.categoria}
            </span>

            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-light text-flosser-text leading-[1.1] tracking-tight">
              {post.titulo}
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-flosser-muted">
              <span className="text-flosser-sage">{post.autor}</span>
              <span className="w-1 h-1 rounded-full bg-flosser-border" />
              <time dateTime={post.data}>
                {format(parseISO(post.data), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </time>
              <span className="w-1 h-1 rounded-full bg-flosser-border" />
              <span>{post.tempoLeitura} min de leitura</span>
            </div>
          </div>
        </header>

        {post.imagem && (
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 mb-16 md:mb-20">
            <div className="relative aspect-[16/9] rounded-sm overflow-hidden">
              <Image
                src={post.imagem}
                alt={post.titulo}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 pb-20">
          <div
            className="prose-flosser"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="mt-16 pt-10 border-t border-flosser-border">
            <div className="flex flex-col items-start gap-5">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-flosser-sage">
                Agende sua consulta
              </span>
              <p className="font-sans text-2xl md:text-3xl font-light text-flosser-text leading-snug">
                Tem dúvida sobre o seu caso?{" "}
                <span className="italic text-flosser-sage">
                  Fale com a equipe.
                </span>
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-flosser-sage text-flosser-black px-8 py-4 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-flosser-sage-light transition-all"
              >
                Falar com a Flosser
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="pb-28 md:pb-36 bg-flosser-surface py-20 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex items-center gap-3 mb-12">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-flosser-sage">
                Continue lendo
              </span>
              <span className="flex-1 h-px bg-flosser-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-flosser-black mb-5">
                    {r.imagem && (
                      <Image
                        src={r.imagem}
                        alt={r.titulo}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    )}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-flosser-black/80 backdrop-blur-sm text-flosser-sage text-[9px] font-semibold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full border border-flosser-sage/30">
                        {r.categoria}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-light text-flosser-text leading-snug tracking-tight group-hover:text-flosser-sage transition-colors">
                    {r.titulo}
                  </h3>
                  <p className="mt-3 text-sm text-flosser-muted leading-relaxed font-light line-clamp-2">
                    {r.resumo}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
