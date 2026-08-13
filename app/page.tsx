import type { Metadata } from "next";
import { SiteClient } from "./SiteClient";

export const metadata: Metadata = {
  title: "Otorrino em São Luís",
  description:
    "Agende sua consulta com o Dr. Evaldo César Macau, otorrinolaringologista em São Luís, para avaliação da saúde dos ouvidos, nariz e garganta.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Dr. Evaldo César Macau | Otorrinolaringologista",
    description: "Cuidado especializado para ouvidos, nariz e garganta.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Dr. Evaldo César Macau — Otorrinolaringologia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Evaldo César Macau | Otorrinolaringologista",
    description: "Cuidado especializado para ouvidos, nariz e garganta.",
    images: ["/og.png"],
  },
};

export default function Home() {
  return <SiteClient />;
}
