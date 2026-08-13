export const siteConfig = {
  doctor: {
    name: "Dr. Evaldo César Macau",
    specialty: "Otorrinolaringologista",
    crm: "CRM-MA 10415",
    rqe: "RQE 3698",
  },
  clinic: {
    name: "Clínica Rhinus",
    address: "Rua das Juçaras, Edifício Executive Lake Center, sala 405, Jardim Renascença — São Luís, MA",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica+Rhinus+Executive+Lake+Center+S%C3%A3o+Lu%C3%ADs+MA",
    hours: "Consulte a disponibilidade com a equipe",
  },
  contact: {
    // Insira o número com DDI e DDD após a confirmação, por exemplo: 5598999999999.
    whatsappNumber: "",
    phone: "",
    instagramUrl: "",
  },
} as const;

const whatsappMessage = encodeURIComponent("Olá! Gostaria de consultar a disponibilidade para uma avaliação com o Dr. Evaldo César Macau.");

export const whatsappUrl = siteConfig.contact.whatsappNumber
  ? `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${whatsappMessage}`
  : `https://wa.me/?text=${whatsappMessage}`;
