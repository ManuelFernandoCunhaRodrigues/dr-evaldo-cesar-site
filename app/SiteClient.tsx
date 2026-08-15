"use client";

import { useEffect, useState } from "react";
import { siteConfig, whatsappUrl } from "./site-config";

const specialties = [
  { code: "N", title: "Nariz e respiração", text: "Avaliação de rinite, sinusite, obstrução nasal, desvio de septo e outras alterações da respiração." },
  { code: "O", title: "Ouvido e audição", text: "Investigação de dores, infecções, perda auditiva, ouvido entupido e outras alterações auditivas." },
  { code: "E", title: "Tontura, vertigem e zumbido", text: "Avaliação de sintomas relacionados ao equilíbrio e à audição, como tontura, vertigem e zumbido." },
  { code: "G", title: "Garganta, amígdalas e adenoide", text: "Acompanhamento de alterações da garganta, amigdalites, ronco e dificuldades respiratórias." },
  { code: "I", title: "Otorrino infantil", text: "Atendimento cuidadoso para crianças com problemas respiratórios, auditivos, de amígdalas ou adenoides." },
  { code: "C", title: "Avaliação cirúrgica", text: "Orientações claras sobre indicação, preparação e acompanhamento de procedimentos otorrinolaringológicos." },
];

const symptoms = [
  "Dificuldade para respirar pelo nariz", "Rinite ou sinusite recorrente", "Dores de ouvido",
  "Zumbido ou redução da audição", "Tonturas ou alterações de equilíbrio", "Rouquidão persistente",
  "Dor ou dificuldade para engolir", "Ronco ou alterações do sono", "Infecções recorrentes",
];

const locations = [
  { name: "Clínica Rhinus", subtitle: "", logo: "/assets/logo/clinica-rhinus.png", address: "Rua das Andirobas, 10, sala 405, Jardim Renascença, São Luís – MA, CEP 65075-040.", reference: "Próximo à Lagoa da Jansen.", mapsUrl: "https://share.google/MG1haMyEcS3pog2UO", whatsappMessage: "Olá! Gostaria de agendar uma consulta com o Dr. Evaldo César Macau na Clínica Rhinus." },
  { name: "Unidade Medical Center Jaracaty", subtitle: "UDI Hospital", logo: "/assets/logo/udi.svg", address: "Avenida Professor Carlos Cunha, 1, Edifício Medical Center Jaracaty, 2º andar, Jaracaty, São Luís – MA, CEP 65076-820.", reference: "", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Unidade%20Medical%20Center%20Jaracaty%2C%20Avenida%20Professor%20Carlos%20Cunha%2C%201%2C%20Edif%C3%ADcio%20Medical%20Center%20Jaracaty%2C%202%C2%BA%20andar%2C%20Jaracaty%2C%20S%C3%A3o%20Lu%C3%ADs%20-%20MA%2C%2065076-820", whatsappMessage: "Olá! Gostaria de agendar uma consulta com o Dr. Evaldo César Macau na Unidade Medical Center Jaracaty." },
] as const;

const faqs = [
  { q: "Quando devo procurar um otorrinolaringologista?", a: "Quando sintomas nos ouvidos, nariz, garganta, audição, voz, respiração ou equilíbrio persistirem, se repetirem ou afetarem sua rotina. Em situações urgentes, procure atendimento de emergência." },
  { q: "Quais regiões do corpo são avaliadas pelo otorrino?", a: "O otorrinolaringologista avalia principalmente ouvidos, nariz, garganta e estruturas relacionadas à audição, respiração, voz e equilíbrio." },
  { q: "O atendimento é para adultos e crianças?", a: "Sim. O Dr. Evaldo atende adultos e crianças de qualquer idade, respeitando as necessidades de cada fase da vida." },
  { q: "Como posso agendar uma consulta?", a: "Use um dos botões de agendamento para iniciar uma conversa no WhatsApp e confirmar a disponibilidade diretamente com a equipe." },
  { q: "Onde ficam os locais de atendimento?", a: "O atendimento é realizado na Clínica Rhinus, no Jardim Renascença, e na Unidade Medical Center Jaracaty, no UDI Hospital, em São Luís — MA." },
  { q: "O atendimento é particular ou aceita convênio?", a: "Valores e cobertura de planos de saúde devem ser confirmados diretamente com a equipe antes do agendamento." },
];

function track(event: string, detail?: string) {
  window.dispatchEvent(new CustomEvent("dr-evaldo-conversion", { detail: { event, detail } }));
  const layer = (window as Window & { dataLayer?: Record<string, string>[] }).dataLayer;
  layer?.push({ event, detail: detail ?? "" });
}

function WhatsAppLink({ children, className = "button button-primary", placement, message }: { children: React.ReactNode; className?: string; placement: string; message?: string }) {
  return <a className={className} href={whatsappUrl(message)} target="_blank" rel="noreferrer" onClick={() => track("click_whatsapp", placement)}>{children}</a>;
}

export function SiteClient() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        name: siteConfig.doctor.name,
        medicalSpecialty: "Otolaryngologic",
        location: locations.map((location) => ({ "@type": "MedicalClinic", name: location.name === "Clínica Rhinus" ? "Executive Lake Center" : "Unidade Medical Center Jaracaty – UDI Hospital", address: { "@type": "PostalAddress", streetAddress: location.name === "Clínica Rhinus" ? "Rua das Andirobas, 10, sala 405, Jardim Renascença" : "Avenida Professor Carlos Cunha, 1, Edifício Medical Center Jaracaty, 2º andar, Jaracaty", addressLocality: "São Luís", addressRegion: "MA", postalCode: location.name === "Clínica Rhinus" ? "65075-040" : "65076-820", addressCountry: "BR" } })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
      },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner container">
          <a href="#inicio" className="brand" aria-label="Ir ao início" onClick={closeMenu}>
            <img src="/assets/logo/dr-evaldo-horizontal.webp" width="922" height="344" alt="Dr. Evaldo César Macau, Otorrinolaringologista" />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#inicio">Início</a><a href="#especialidades">Atendimentos</a><a href="#sobre">Sobre</a><a href="#duvidas">Dúvidas</a><a href="#contato">Contato</a>
          </nav>
          <WhatsAppLink className="button button-primary header-cta" placement="header">Agendar consulta <span aria-hidden="true">↗</span></WhatsAppLink>
          <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
        <nav id="mobile-menu" className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegação mobile">
          <a href="#inicio" onClick={closeMenu}>Início</a><a href="#especialidades" onClick={closeMenu}>Atendimentos</a><a href="#sobre" onClick={closeMenu}>Sobre</a><a href="#duvidas" onClick={closeMenu}>Dúvidas</a><a href="#contato" onClick={closeMenu}>Contato</a>
          <WhatsAppLink placement="menu_mobile">Agendar consulta</WhatsAppLink>
        </nav>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-glow glow-one"></div><div className="hero-glow glow-two"></div>
          <div className="hero-grid container">
            <div className="hero-copy">
              <p className="eyebrow"><span aria-hidden="true">✦</span> Otorrinolaringologista em São Luís — MA</p>
              <h1>Cuidado especializado para a saúde do <span>ouvido, nariz e garganta</span></h1>
              <p className="hero-lead">Atendimento para adultos e crianças, com escuta atenta, explicações claras e acompanhamento individualizado.</p>
              <div className="hero-actions">
                <WhatsAppLink placement="hero">Agendar consulta <span aria-hidden="true">↗</span></WhatsAppLink>
                <a className="button button-secondary" href="#sobre">Conheça o Dr. Evaldo</a>
              </div>
              <p className="credentials">{siteConfig.doctor.name} <span>•</span> {siteConfig.doctor.crm} <span>•</span> {siteConfig.doctor.rqe}</p>
            </div>
            <div className="hero-visual" aria-label="Dr. Evaldo em seu consultório">
              <div className="photo-arch">
                <img src="/assets/photos/img-20230530-wa0121.webp" width="1068" height="1600" alt="Dr. Evaldo César Macau com jaleco e instrumento de avaliação otorrinolaringológica" fetchPriority="high" />
              </div>
              <div className="float-card card-one"><span className="card-icon">♡</span><span><strong>Atendimento humanizado</strong><small>Escuta e cuidado</small></span></div>
              <div className="float-card card-two"><span className="card-icon">✓</span><span><strong>Cuidado especializado</strong><small>Adultos e crianças</small></span></div>
            </div>
            <div className="mobile-trust" aria-label="Diferenciais do atendimento">
              <span>Escuta atenta</span><span>Explicações claras</span><span>Atendimento individualizado</span>
            </div>
          </div>
        </section>

        <section className="quality-strip" aria-label="Informações do atendimento">
          <div className="container quality-grid"><div><strong>Adultos e crianças</strong><span>Cuidado em cada fase da vida</span></div><div><strong>Ouvido, nariz e garganta</strong><span>Avaliação especializada</span></div><div><strong>Consulta acolhedora</strong><span>Informação clara em cada etapa</span></div></div>
        </section>

        <section className="section specialties" id="especialidades">
          <div className="container">
            <div className="section-heading split-heading"><div><p className="eyebrow">Áreas de atendimento</p><h2>Sua saúde merece atenção especializada</h2></div><p>Uma avaliação cuidadosa ajuda a investigar sintomas e orientar a conduta adequada para cada caso.</p></div>
            <div className="specialty-grid">
              {specialties.map((item, index) => <article className={`specialty-card ${index === 0 ? "featured" : ""}`} key={item.title}><span className="specialty-icon" aria-hidden="true">{item.code}</span><h3>{item.title}</h3><p>{item.text}</p><a href="#contato">Saiba mais <span aria-hidden="true">→</span></a></article>)}
            </div>
            <div className="section-cta"><p>Não sabe qual atendimento procurar?</p><WhatsAppLink className="button button-secondary" placement="especialidades">Fale com a equipe</WhatsAppLink></div>
          </div>
        </section>

        <section className="section about" id="sobre">
          <div className="container about-grid">
            <div className="about-visual">
              <img src="/assets/photos/img-20230530-wa0096.webp" width="1068" height="1600" loading="lazy" alt="Retrato profissional do Dr. Evaldo César Macau" />
              <div className="about-card"><span>Formação especializada</span><strong>UFMA • UNICAMP • Universidade de Lisboa</strong></div>
            </div>
            <div className="about-copy"><p className="eyebrow">Sobre o especialista</p><h2>Cuidado, escuta e atenção em cada consulta</h2><p>O Dr. Evaldo César Macau é médico otorrinolaringologista, graduado pela Universidade Federal do Maranhão e com residência médica em Otorrinolaringologia pela UNICAMP.</p><p>Possui Título de Especialista pela ABORL-CCF e realizou estágio especializado em Otoneurologia na Universidade de Lisboa. Atua no atendimento de adultos e crianças, com dedicação especial às cirurgias nasais e faríngeas na infância e ao cuidado de pacientes com tontura, vertigem, perda auditiva e zumbido.</p><div className="about-quote">“Procuro explicar cada etapa de maneira clara e oferecer um atendimento acolhedor e individualizado.”</div><WhatsAppLink placement="sobre">Agendar uma consulta <span aria-hidden="true">↗</span></WhatsAppLink></div>
          </div>
        </section>

        <section className="section locations" aria-labelledby="locations-title">
          <div className="container"><div className="section-heading centered"><p className="eyebrow">Onde encontrar</p><h2 id="locations-title">Locais de atendimento</h2><p>Escolha a unidade mais conveniente e entre em contato para agendar sua consulta com o Dr. Evaldo César Macau.</p></div><div className="locations-grid">{locations.map((location) => <article className="location-card" key={location.name}><img className="location-logo" src={location.logo} alt={`Logotipo da ${location.name}`} /><h3>{location.name}</h3>{location.subtitle && <p className="location-subtitle">{location.subtitle}</p>}<address>{location.address}</address>{location.reference && <p className="location-reference">{location.reference}</p>}<div className="location-actions"><a className="button button-secondary" href={location.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver rota para ${location.name}`} onClick={() => track("click_directions", location.name)}>Ver rota <span aria-hidden="true">→</span></a><WhatsAppLink placement={`local_${location.name}`} message={location.whatsappMessage}>Agendar nesta unidade</WhatsAppLink></div></article>)}</div></div>
        </section>

        <section className="section symptoms">
          <div className="container symptoms-grid">
            <div className="symptom-intro"><p className="eyebrow light">Quando buscar avaliação</p><h2>Alguns sinais merecem ser investigados</h2><p>Alterações na respiração, audição, voz ou equilíbrio podem afetar o sono, a comunicação e o bem-estar.</p><div className="medical-note"><span aria-hidden="true">i</span>Estas informações têm caráter educativo e não substituem uma avaliação médica.</div></div>
            <ul className="symptom-list">{symptoms.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
          </div>
        </section>

        <section className="section values">
          <div className="container"><div className="section-heading centered"><p className="eyebrow">Um atendimento baseado em confiança</p><h2>Cuidado presente em cada detalhe</h2></div><div className="values-grid">
            <article><span>01</span><h3>Escuta cuidadosa</h3><p>A consulta começa com atenção às suas queixas, dúvidas e histórico de saúde.</p></article>
            <article><span>02</span><h3>Explicações claras</h3><p>Informações acessíveis sobre sintomas, exames e possibilidades de acompanhamento.</p></article>
            <article><span>03</span><h3>Cuidado individualizado</h3><p>Cada orientação considera as necessidades e características do paciente.</p></article>
            <article><span>04</span><h3>Formação especializada</h3><p>Experiência direcionada à saúde do ouvido, nariz, garganta e equilíbrio.</p></article>
          </div></div>
        </section>

        <section className="section scheduling">
          <div className="container scheduling-card"><div><p className="eyebrow light">Agendamento simples</p><h2>Seu cuidado começa com uma conversa</h2><p>Confirme a disponibilidade de forma rápida e receba as orientações para a consulta.</p><WhatsAppLink className="button button-white" placement="agendamento">Conversar pelo WhatsApp <span aria-hidden="true">↗</span></WhatsAppLink></div><ol><li><span>1</span><div><strong>Entre em contato</strong><p>Inicie uma conversa pelo WhatsApp.</p></div></li><li><span>2</span><div><strong>Escolha o horário</strong><p>Confirme a disponibilidade com a equipe.</p></div></li><li><span>3</span><div><strong>Compareça à consulta</strong><p>Receba as orientações para o atendimento.</p></div></li></ol></div>
        </section>

        <section className="section faq" id="duvidas">
          <div className="container faq-grid"><div className="faq-intro"><p className="eyebrow">Dúvidas frequentes</p><h2>Informação também faz parte do cuidado</h2><p>Veja respostas rápidas para perguntas comuns sobre o atendimento.</p></div><div className="accordion">{faqs.map((item) => <details key={item.q} onToggle={(event) => { if (event.currentTarget.open) track("open_faq", item.q); }}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></div>
        </section>

        <section className="section contact" id="contato">
          <div className="container contact-card"><div className="contact-copy"><p className="eyebrow light">Local de atendimento</p><h2>{siteConfig.clinic.name}</h2><p>{siteConfig.clinic.address}</p><p className="contact-note">Atendimento para adultos e crianças. {siteConfig.clinic.hours}.</p><div className="contact-actions"><WhatsAppLink className="button button-white" placement="contato">Agendar consulta</WhatsAppLink><a className="button button-outline-light" href={siteConfig.clinic.mapsUrl} target="_blank" rel="noreferrer" onClick={() => track("click_directions")}>Como chegar <span aria-hidden="true">↗</span></a></div></div><div className="contact-image"><img src="/assets/photos/img-20230530-wa0165.webp" width="1200" height="1600" loading="lazy" alt="Dr. Evaldo durante procedimento cirúrgico" /></div></div>
        </section>
      </main>

      <footer><div className="container footer-grid"><div className="footer-brand"><img src="/assets/logo/dr-evaldo-horizontal.webp" width="922" height="344" alt="Dr. Evaldo César Macau" /><p>{siteConfig.doctor.specialty}<br />{siteConfig.doctor.crm} • {siteConfig.doctor.rqe}</p></div><nav aria-label="Navegação do rodapé"><strong>Navegue</strong><a href="#inicio">Início</a><a href="#especialidades">Atendimentos</a><a href="#sobre">Sobre</a><a href="#duvidas">Dúvidas</a></nav><div><strong>Atendimento</strong><p>{siteConfig.clinic.name}<br />São Luís — MA</p><WhatsAppLink className="footer-link" placement="rodape">Falar com a equipe →</WhatsAppLink></div></div><div className="container footer-bottom"><p>© {new Date().getFullYear()} Dr. Evaldo César Macau. Todos os direitos reservados.</p><p>As informações deste site não substituem uma consulta médica.</p></div></footer>

      <WhatsAppLink className="mobile-sticky" placement="barra_mobile"><span aria-hidden="true">✦</span> Agendar consulta</WhatsAppLink>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
