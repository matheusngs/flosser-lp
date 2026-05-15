"use client";

import { useEffect, useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import Image from "next/image";

/* WhatsApp principal: (92) 99969-3483 */
const WHATSAPP_URL =
  "https://wa.me/5592999693483?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flosser%20e%20gostaria%20de%20agendar%20minha%20consulta.";

const links = [
  { href: "/#quem-somos", label: "Quem Somos" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#profissionais", label: "Profissionais" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "glass-dark-strong"
          : "bg-gradient-to-b from-flosser-black/70 via-flosser-black/30 to-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <nav className="flex items-center justify-between h-32 md:h-36">
          <a
            href="#inicio"
            className="flex items-center h-full"
            aria-label="Flosser Odontologia Digital"
          >
            <Image
              src="/logo-flosser.svg"
              alt="Flosser Odontologia Digital"
              width={280}
              height={104}
              className="h-24 md:h-28 w-auto brightness-[300%] [filter:brightness(3)_drop-shadow(0_2px_8px_rgba(0,0,0,0.8))]"
            />
          </a>

          <ul className="hidden lg:flex items-center gap-9">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[13px] text-flosser-text/90 hover:text-flosser-sage transition-colors font-normal tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn-sage inline-flex items-center gap-2 text-flosser-black px-4 py-2 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors"
            >
              Agendar consulta
            </a>
            <a
              href="https://www.instagram.com/flosserodontodigital/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Flosser"
              className="glass-btn-outline w-9 h-9 rounded-full hover:border-flosser-sage hover:text-flosser-sage flex items-center justify-center text-flosser-text/80 transition-colors"
            >
              <Instagram size={16} />
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-flosser-text"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="lg:hidden glass-dark-strong border-t border-white/10">
          <ul className="flex flex-col p-5 gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3.5 text-flosser-text/90 hover:text-flosser-sage rounded-2xl text-sm font-normal tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn-sage block w-full text-center text-flosser-black px-5 py-3.5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors"
              >
                Agendar consulta
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
