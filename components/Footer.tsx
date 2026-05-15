import { Instagram, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";

const links = [
  { href: "/#quem-somos", label: "Quem Somos" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#profissionais", label: "Profissionais" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contato", label: "Contato" },
];

const WHATSAPP_1 =
  "https://wa.me/5592999693483?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flosser%20e%20gostaria%20de%20agendar%20minha%20consulta.";
const WHATSAPP_2 =
  "https://wa.me/5592991287668?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flosser%20e%20gostaria%20de%20agendar%20minha%20consulta.";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-dark border-t border-white/5 overflow-hidden">
      {/* Orb sage */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-orb-sage opacity-40 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            {/* Logo legível: maior + brilho */}
            <Image
              src="/logo-flosser.svg"
              alt="Flosser Odontologia Digital"
              width={280}
              height={104}
              className="h-24 md:h-28 w-auto brightness-[300%] [filter:brightness(3)_drop-shadow(0_2px_8px_rgba(0,0,0,0.8))]"
            />
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-flosser-sage mb-6">
              Navegação
            </h3>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-flosser-muted hover:text-flosser-text transition-colors font-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5" id="contato">
            <h3 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-flosser-sage mb-6">
              Endereço
            </h3>
            <div className="flex items-start gap-3 text-sm text-flosser-muted font-light leading-relaxed">
              <MapPin size={15} className="mt-0.5 shrink-0 text-flosser-sage" />
              <address className="not-italic">
                Av. Mário Ypiranga, 315 térreo, Sala 01
                <br />
                Edifício The Office Adrianópolis
                <br />
                Manaus – AM, 69057-000
              </address>
            </div>

            <h3 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-flosser-sage mt-8 mb-6">
              Contatos
            </h3>
            <ul className="space-y-3 text-sm text-flosser-muted font-light">
              <li>
                <a
                  href={WHATSAPP_1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-flosser-text transition-colors"
                >
                  <Phone size={15} className="shrink-0 text-flosser-sage" />
                  <span>(92) 99969-3483</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-flosser-text transition-colors"
                >
                  <Phone size={15} className="shrink-0 text-flosser-sage" />
                  <span>(92) 99128-7668</span>
                </a>
              </li>
              {/* Instagram movido para Contatos (PDF) */}
              <li>
                <a
                  href="https://www.instagram.com/flosserodontodigital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da Flosser"
                  className="flex items-center gap-3 hover:text-flosser-text transition-colors"
                >
                  <Instagram size={15} className="shrink-0 text-flosser-sage" />
                  <span>@flosserodontodigital</span>
                </a>
              </li>
            </ul>

            <h3 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-flosser-sage mt-8 mb-6">
              Funcionamento
            </h3>
            <ul className="space-y-3 text-sm text-flosser-muted font-light">
              <li className="flex items-center gap-3">
                <Clock size={15} className="shrink-0 text-flosser-sage" />
                <span>Segunda à Sexta: 08h às 19h</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={15} className="shrink-0 text-flosser-sage" />
                <span>Sábado e Domingo: Fechado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-[11px] text-flosser-soft tracking-wide">
            © {year} Flosser Odontologia Digital. Todos os direitos reservados.
          </p>
          <p className="text-[11px] text-flosser-soft tracking-wide">
            Desenvolvido por{" "}
            <span className="text-flosser-text/80 font-medium">Hermes Com</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
