import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function toIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value.slice(0, 10);
  return "";
}

export type PostMeta = {
  slug: string;
  titulo: string;
  resumo: string;
  data: string;
  autor: string;
  categoria: string;
  imagem: string;
  tempoLeitura: number;
};

export type Post = PostMeta & {
  html: string;
};

function readPostFile(file: string): PostMeta | null {
  try {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      titulo: String(data.titulo ?? ""),
      resumo: String(data.resumo ?? ""),
      data: toIso(data.data),
      autor: String(data.autor ?? "Equipe Flosser"),
      categoria: String(data.categoria ?? ""),
      imagem: String(data.imagem ?? ""),
      tempoLeitura: Number(data.tempoLeitura ?? 5),
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPostFile)
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.data < b.data ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    titulo: String(data.titulo ?? ""),
    resumo: String(data.resumo ?? ""),
    data: toIso(data.data),
    autor: String(data.autor ?? "Equipe Flosser"),
    categoria: String(data.categoria ?? ""),
    imagem: String(data.imagem ?? ""),
    tempoLeitura: Number(data.tempoLeitura ?? 5),
    html: processed.toString(),
  };
}

export function getRelatedPosts(slug: string, limit = 2): PostMeta[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  const sameCategoria = all.filter(
    (p) => p.slug !== slug && p.categoria === current.categoria
  );
  const others = all.filter(
    (p) => p.slug !== slug && p.categoria !== current.categoria
  );
  return [...sameCategoria, ...others].slice(0, limit);
}
