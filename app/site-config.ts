export const siteConfig = {
  doctor: {
    name: "Dr. Evaldo César Macau",
    specialty: "Otorrinolaringologista",
    crm: "CRM-MA 10415",
    rqe: "RQE 3698",
  },
  clinic: {
    name: "Clínica Rhinus",
    address: "Rua das Andirobas, 10, sala 405, Jardim Renascença — São Luís, MA, CEP 65075-040",
    mapsUrl: "https://share.google/MG1haMyEcS3pog2UO",
    hours: "Consulte a disponibilidade com a equipe",
  },
  contact: {
    // Insira o número com DDI e DDD após a confirmação, por exemplo: 5598999999999.
    whatsappNumber: "",
    phone: "",
    instagramUrl: "",
  },
} as const;

export function whatsappUrl(message = "Olá! Gostaria de consultar a disponibilidade para uma avaliação com o Dr. Evaldo César Macau.") {
  const encodedMessage = encodeURIComponent(message);
  return siteConfig.contact.whatsappNumber
    ? `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;
}
