import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuemSomos from "@/components/QuemSomos";
import Transformacoes from "@/components/Transformacoes";
import Servicos from "@/components/Servicos";
import Depoimentos from "@/components/Depoimentos";
import Profissionais from "@/components/Profissionais";
import UltimosArtigos from "@/components/UltimosArtigos";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { fetchGoogleReviews } from "@/lib/google-reviews";
import { getAllPosts } from "@/lib/blog";

export default async function Home() {
  const googleReviews = await fetchGoogleReviews();
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-flosser-black">
      <Navbar />
      <Hero />
      <QuemSomos />
      <Transformacoes />
      <Servicos />
      <Depoimentos data={googleReviews} />
      <Profissionais />
      <UltimosArtigos posts={posts} />
      <CTAFinal />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
