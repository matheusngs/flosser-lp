import type { Metadata } from "next";
import { IBM_Plex_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const title =
  "Flosser Odontologia Digital — Clínica Odontológica Completa em Manaus";
const description =
  "A Flosser é uma clínica odontológica completa em Manaus — com equipe especializada, tecnologia digital integrada e um padrão clínico construído para resolver do início ao fim.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "odontologia",
    "implantodontia",
    "ortodontia",
    "invisalign",
    "odontologia do sono",
    "reabilitação oral",
    "estética dental",
    "clínica odontológica Manaus",
    "Flosser",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_BR",
    siteName: "Flosser Odontologia Digital",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Flosser Odontologia Digital",
    description:
      "Clínica odontológica completa em Manaus com todas as especialidades sob o mesmo teto.",
    medicalSpecialty: [
      "Implantodontia",
      "Ortodontia",
      "Odontologia do Sono",
      "Reabilitação Oral",
      "Odontologia Estética",
      "Profilaxia",
    ],
    telephone: ["+5592999693483", "+5592991287668"],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Av. Mário Ypiranga, 315 térreo, Sala 01, Edifício The Office Adrianópolis",
      addressLocality: "Manaus",
      addressRegion: "AM",
      postalCode: "69057-000",
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
    ],
    url: "https://flosser.com.br",
  };

  return (
    <html lang="pt-BR" className={`${ibmPlexSans.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased bg-flosser-black text-flosser-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
