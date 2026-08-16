import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ArrowRight, CalendarCheck, Check, ChevronDown, CircleAlert, Clock3,
  Ear, HeartHandshake, MapPin, Menu, MessageCircle,
  PhoneCall, ShieldCheck, Sparkles, Stethoscope, UserRoundCheck, X,
} from 'lucide-react'
import { contactText, siteConfig, trackEvent, whatsappUrl } from './config'

const navItems = [
  ['Início', '#inicio'], ['Sobre', '#sobre'], ['Especialidades', '#especialidades'],
  ['Dúvidas', '#duvidas'], ['Contato', '#contato'],
] as const

const specialties = [
  { icon: 'nose', title: 'Nariz e respiração', text: 'Avaliação de rinite, sinusite, obstrução nasal, desvio de septo e outras alterações que podem dificultar a respiração.', className: 'nose' },
  { icon: Ear, title: 'Ouvido e audição', text: 'Investigação de dores no ouvido, infecções, perda auditiva, sensação de ouvido entupido e outras alterações auditivas.', className: 'ear' },
  { icon: 'dizziness', title: 'Otoneuro: tontura, vertigem e zumbido', text: 'Atendimento em otoneuro para avaliação de sintomas relacionados ao equilíbrio e à audição, como tontura, vertigem, labirintite e zumbido.', className: 'balance' },
  { icon: 'throat', title: 'Garganta, amígdalas e adenoide', text: 'Acompanhamento de amigdalites, alterações da garganta, aumento das adenoides, ronco e dificuldades respiratórias.', className: 'throat' },
  { icon: 'baby', title: 'Otorrinolaringologia infantil', text: 'Atendimento cuidadoso para crianças com problemas respiratórios, infecções recorrentes, alterações auditivas, amígdalas ou adenoides.', className: 'kids' },
  { icon: Stethoscope, title: 'Avaliação cirúrgica', text: 'Avaliação para cirurgias otorrinolaringológicas, com orientações sobre indicação, preparação e acompanhamento do procedimento.', className: 'surgery' },
] as const

const locations = [
  {
    name: 'Clínica Rhinus',
    subtitle: '',
    logo: '/logos/clinica-rhinus.png',
    logoAlt: 'Logotipo da Clínica Rhinus',
    address: 'Rua das Andirobas, 10, sala 405, Jardim Renascença, São Luís – MA, CEP 65075-040.',
    reference: 'Próximo à Lagoa da Jansen.',
    mapsUrl: 'https://share.google/MG1haMyEcS3pog2UO',
    whatsappMessage: 'Olá! Gostaria de agendar uma consulta com o Dr. Evaldo César Macau na Clínica Rhinus.',
  },
  {
    name: 'Unidade Medical Center Jaracaty',
    subtitle: 'UDI Hospital',
    logo: '/logos/udi.svg',
    logoAlt: 'Logotipo da UDI Hospital',
    address: 'Avenida Professor Carlos Cunha, 1, Edifício Medical Center Jaracaty, 2º andar, Jaracaty, São Luís – MA, CEP 65076-820.',
    reference: '',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Unidade%20Medical%20Center%20Jaracaty%2C%20Avenida%20Professor%20Carlos%20Cunha%2C%201%2C%20Edif%C3%ADcio%20Medical%20Center%20Jaracaty%2C%202%C2%BA%20andar%2C%20Jaracaty%2C%20S%C3%A3o%20Lu%C3%ADs%20-%20MA%2C%2065076-820',
    whatsappMessage: 'Olá! Gostaria de agendar uma consulta com o Dr. Evaldo César Macau na Unidade Medical Center Jaracaty.',
  },
] as const

function NoseIcon() {
  return <span className="nose-icon" aria-hidden="true"><img src="/images/icone-nariz.svg" alt="" /></span>
}

function DizzinessIcon() {
  return <img className="dizziness-icon" src="/images/icone-tontura-cabeca.svg" alt="" aria-hidden="true" />
}

function ThroatIcon() {
  return <img className="throat-icon" src="/images/icone-dor-garganta.svg" alt="" aria-hidden="true" />
}

function BabyIcon() {
  return <img className="baby-icon" src="/images/icone-bebe-azul.svg" alt="" aria-hidden="true" />
}

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" /><path d="M17.5 6.5h.01" /></svg>
}

const symptoms = [
  'Dificuldade para respirar pelo nariz', 'Rinite ou sinusite recorrente', 'Dores de ouvido',
  'Zumbido', 'Redução da audição', 'Tonturas ou alterações de equilíbrio',
  'Rouquidão persistente', 'Dor ou dificuldade para engolir', 'Ronco ou alterações do sono',
]

const differentials = [
  { icon: HeartHandshake, title: 'Escuta cuidadosa', text: 'A consulta começa com atenção às suas queixas, dúvidas e histórico de saúde.' },
  { icon: Stethoscope, title: 'Explicações claras', text: 'Informações acessíveis sobre sintomas, exames e possibilidades de acompanhamento.' },
  { icon: UserRoundCheck, title: 'Cuidado individualizado', text: 'Cada conduta é definida conforme as necessidades e características do paciente.' },
  { icon: ShieldCheck, title: 'Formação especializada', text: 'Experiência direcionada ao cuidado do ouvido, nariz, garganta, respiração, audição e equilíbrio.' },
]

const patientReviews = [
  {
    name: 'Cynthia Amaral', verified: 'Opinião verificada', date: '9 de agosto de 2024', location: 'Clínica Rhinus',
    text: 'Médico excelente, hoje toda a nossa família consulta com ele, nos traz segurança, atendimento personalizado, confiança no que faz e, o melhor, saímos satisfeitos e curados. Jamais vou esquecer o que fez pelo meu pai, hoje um homem curado, sem sofrimentos. Graças a Deus e à competência do Dr. Evaldo Macau.',
  },
  {
    name: 'Luiza', verified: 'Consulta verificada', date: '16 de setembro de 2022', location: 'Pronto Otorrino',
    text: 'Adorei a consulta, primeira vez, mas o atendimento é super-rápido, sem muita espera e com comodidade. O Dr. é supergente boa, me fez ficar sem perguntas e atendeu minhas expectativas como mãe.',
  },
  {
    name: 'Karla', verified: 'Consulta verificada', date: '12 de setembro de 2024', location: 'Clínica Rhinus',
    text: 'Excelente profissional, tirou todas as minhas dúvidas e é bem prestativo. Muito obrigado, doutor.',
  },
  {
    name: 'A. R. de Carvalho', verified: 'Opinião verificada', date: '30 de agosto de 2024', location: 'Clínica Rhinus',
    text: 'Dr. Evaldo tem sido um profissional empático, esclarecedor e certeiro!',
  },
  {
    name: 'Paulo César Rodrigues Lima', verified: 'Consulta verificada', date: '27 de fevereiro de 2025', location: 'Clínica Rhinus',
    text: 'Excelente médico, muito atencioso e educado e me deixou muito mais tranquilo.',
  },
  {
    name: 'Ticiana', verified: 'Opinião verificada', date: '20 de fevereiro de 2022', location: 'Pronto Otorrino',
    text: 'Excelente médico, competente, atencioso, diagnóstico e tratamento adequados, sem falar da pontualidade e da explicação detalhada sobre o problema.',
  },
] as const

function PatientReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [cardsPerView, setCardsPerView] = useState(1)
  const [activePage, setActivePage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const pageCount = Math.ceil(patientReviews.length / cardsPerView)

  useEffect(() => {
    const updateCardsPerView = () => setCardsPerView(window.innerWidth >= 900 ? 3 : window.innerWidth >= 600 ? 2 : 1)
    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  useEffect(() => {
    setActivePage((current) => Math.min(current, pageCount - 1))
  }, [pageCount])

  useEffect(() => {
    const track = trackRef.current
    const card = track?.querySelectorAll<HTMLElement>('.patient-review')[activePage * cardsPerView]
    if (!track || !card) return
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }, [activePage, cardsPerView])

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActivePage((current) => (current + 1) % pageCount), 2500)
    return () => window.clearInterval(timer)
  }, [isPaused, pageCount])

  return <div className="container patient-reviews reveal" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocusCapture={() => setIsPaused(true)} onBlurCapture={() => setIsPaused(false)}>
    <div className="reviews-carousel-heading">
      <div><span className="eyebrow">Opiniões verificadas</span><h3>Experiências compartilhadas por pacientes</h3></div>
    </div>
    <div className="patient-reviews-track" ref={trackRef} role="region" aria-label="Opiniões dos pacientes" tabIndex={0}>
      {patientReviews.map(({ name, date, location, text }) => <article className="patient-review" key={`${name}-${date}`}>
        <div className="patient-review-header">
          <span className="review-avatar" aria-hidden="true">{name.charAt(0)}</span>
          <h3>{name}</h3>
        </div>
        <blockquote>“{text}”</blockquote>
        <footer><span>{date} · {location}</span><a href={siteConfig.contact.doctoralia} target="_blank" rel="noreferrer">Doctoralia <ArrowRight size={15} /></a></footer>
      </article>)}
    </div>
    <div className="reviews-carousel-dots" aria-label="Navegação das opiniões">
      {Array.from({ length: pageCount }, (_, index) => <button className={index === activePage ? 'active' : ''} type="button" aria-label={`Ir para o grupo ${index + 1} de opiniões`} aria-current={index === activePage ? 'true' : undefined} onClick={() => setActivePage(index)} key={index} />)}
    </div>
  </div>
}

const faqs = [
  ['Quando devo procurar um otorrinolaringologista?', 'Quando houver sintomas persistentes ou recorrentes relacionados à audição, nariz, garganta, voz, equilíbrio, respiração ou sono. A avaliação médica ajuda a compreender cada caso.'],
  ['Quais regiões do corpo são avaliadas pelo otorrino?', 'O otorrinolaringologista avalia principalmente ouvidos, nariz e garganta, além de estruturas relacionadas da cabeça e do pescoço.'],
  ['Como posso agendar uma consulta?', 'Use um dos botões de agendamento desta página para consultar a disponibilidade. O WhatsApp será ativado assim que o número oficial for configurado.'],
  ['Onde ficam os locais de atendimento?', 'O atendimento é realizado no Executive Lake Center, no Jardim Renascença, e na Unidade Medical Center Jaracaty, no UDI Hospital, em São Luís — MA.'],
  ['Quais informações devo levar para a consulta?', 'Leve um documento de identificação e, se tiver, exames anteriores, receitas em uso e anotações sobre os sintomas que deseja relatar.'],
  ['O atendimento é particular ou aceita convênio?', 'Essa informação ainda será confirmada. Consulte diretamente a equipe antes de agendar.'],
] as const

function WhatsAppLink({ children, className = 'button primary', source, message }: { children: ReactNode; className?: string; source: string; message?: string }) {
  return (
    <a className={className} href={whatsappUrl(message)} target="_blank" rel="noreferrer"
      onClick={() => trackEvent(siteConfig.contact.whatsapp ? 'click_whatsapp' : 'click_doctoralia', { source })}>
      {children}
    </a>
  )
}

function LocationsSection() {
  return <section className="section locations" aria-labelledby="locations-title">
    <div className="container">
      <SectionTitle eyebrow="Onde encontrar" title="Locais de atendimento" text="Escolha a unidade mais conveniente e entre em contato para agendar sua consulta com o Dr. Evaldo César Macau." centered id="locations-title" />
      <div className="locations-grid">
        {locations.map((location, index) => <article className="location-card reveal" style={{ '--delay': `${index * 100}ms` } as React.CSSProperties} key={location.name}>
          {location.logo && <img className="location-logo" src={location.logo} alt={location.logoAlt} />}
          <h3>{location.name}</h3>
          {location.subtitle && <p className="location-subtitle">{location.subtitle}</p>}
          <address>{location.address}</address>
          {location.reference && <p className="location-reference">{location.reference}</p>}
          <div className="location-actions">
            <a className="button secondary" href={location.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver rota para ${location.name}`} onClick={() => trackEvent('click_directions', { location: location.name })}>Ver rota <ArrowRight size={18} /></a>
            <WhatsAppLink source={`location-${index + 1}`} message={location.whatsappMessage}>Agendar nesta unidade <MessageCircle size={18} /></WhatsAppLink>
          </div>
        </article>)}
      </div>
    </div>
  </section>
}

function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a className="brand" href="#inicio" aria-label="Dr. Evaldo César Macau — início">
          <img src={siteConfig.assets.logoLight} alt="Dr. Evaldo César Macau, Otorrinolaringologista" width="344" height="82" />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <WhatsAppLink className="button primary nav-cta" source="header">Agendar consulta <ArrowRight size={17} /></WhatsAppLink>
        <button className="menu-toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Navegação mobile">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowRight size={18} /></a>)}
          <WhatsAppLink source="mobile-menu">Agendar consulta <MessageCircle size={18} /></WhatsAppLink>
        </nav>
      </div>
    </header>
  )
}

function SectionTitle({ eyebrow, title, text, centered = false, id }: { eyebrow: string; title: string; text?: string; centered?: boolean; id?: string }) {
  return <div className={`section-title reveal ${centered ? 'centered' : ''}`}>
    <span className="eyebrow">{eyebrow}</span><h2 id={id}>{title}</h2>{text && <p>{text}</p>}
  </div>
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  const contentId = `faq-content-${index}`
  return <div className={`faq-item ${open ? 'open' : ''}`}>
    <h3><button type="button" aria-expanded={open} aria-controls={contentId} onClick={() => { setOpen(!open); if (!open) trackEvent('open_faq', { question }) }}>
      <span>{question}</span><ChevronDown aria-hidden="true" />
    </button></h3>
    <div id={contentId} className="faq-answer" role="region" aria-hidden={!open}><p>{answer}</p></div>
  </div>
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible') })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return <>
    <Header />
    <main id="conteudo">
      <section className="hero" id="inicio">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy reveal visible">
            <span className="eyebrow"><MapPin size={15} /> Otorrinolaringologista em São Luís — MA</span>
            <h1>Cuidado especializado para a saúde do <em>ouvido, nariz e garganta</em></h1>
            <p>Atendimento otorrinolaringológico para adultos e crianças, com escuta atenta, explicações claras e acompanhamento individualizado.</p>
            <div className="doctor-id"><strong>Dr. Evaldo César Macau</strong><span>Otorrinolaringologista · CRM-MA 10415 · RQE 3698</span></div>
            <div className="hero-actions">
              <WhatsAppLink source="hero">Agendar consulta <MessageCircle size={19} /></WhatsAppLink>
              <a className="button secondary" href="#sobre">Conheça o Dr. Evaldo <ArrowRight size={19} /></a>
            </div>
            <div className="hero-trust"><span><ShieldCheck size={18} /> Cuidado responsável</span><span><HeartHandshake size={18} /> Atendimento humanizado</span></div>
            <div className="hero-certifications" aria-label="Certificações profissionais">
              <img className="hero-residency-seal" src="/images/credentials/selo-residencia-medica-nota-a.webp" alt="Residência Médica Nota A — UNICAMP" width="1254" height="1254" />
              <img className="hero-aborl-seal" src="/images/credentials/aborl-titulo-especialista.webp" alt="Título de Especialista — ABORL-CCF" width="2048" height="788" />
            </div>
          </div>
          <div className="hero-visual reveal visible">
            <div className="portrait-shape"><div className="portrait-ring" /><img src={siteConfig.assets.hero} alt="Retrato profissional do Dr. Evaldo César Macau" width="1080" height="1620" fetchPriority="high" /></div>
            <div className="floating-card card-one"><span className="icon-box"><HeartHandshake size={21} /></span><span><strong>Escuta com atenção</strong><small>Atendimento humanizado</small></span></div>
            <div className="floating-card card-two"><span className="icon-box"><CalendarCheck size={21} /></span><span><strong>Agende pelo WhatsApp</strong><small>Contato direto com a equipe</small></span></div>
            <div className="floating-badge"><Sparkles size={16} /> Cuidado especializado</div>
          </div>
        </div>
        <a className="scroll-cue" href="#especialidades" aria-label="Ir para especialidades"><span>Explore</span><ChevronDown /></a>
      </section>

      <section className="section quality-life">
        <div className="container quality-grid">
          <div className="quality-heading reveal"><span className="eyebrow">Saúde e bem-estar</span><h2>Cuidar da sua saúde também é cuidar da sua qualidade de vida</h2></div>
          <div className="quality-copy reveal">
            <p>Dificuldades para respirar, dores no ouvido, infecções recorrentes, tontura, zumbido e alterações na audição podem afetar o sono, a comunicação e o bem-estar.</p>
            <p>A avaliação com um otorrinolaringologista ajuda a investigar esses sintomas e identificar a conduta mais adequada para cada caso.</p>
            <p>Aqui, cada paciente é recebido com atenção, respeito e informações claras durante todas as etapas do atendimento.</p>
            <WhatsAppLink source="quality-life">Quero agendar uma avaliação <ArrowRight size={19} /></WhatsAppLink>
          </div>
        </div>
      </section>

      <section className="section specialties" id="especialidades">
        <div className="container">
          <SectionTitle eyebrow="Ouvidos, nariz e garganta" title="Áreas de atendimento" text="Avaliação especializada para adultos e crianças, respeitando as necessidades de cada fase da vida." centered />
          <div className="specialty-grid">
            {specialties.map(({ icon: Icon, title, text, className }, i) => <article className={`specialty-card ${className} reveal`} style={{ '--delay': `${i * 90}ms` } as React.CSSProperties} key={title}>
              <div className="specialty-icon">{Icon === 'nose' ? <NoseIcon /> : Icon === 'dizziness' ? <DizzinessIcon /> : Icon === 'throat' ? <ThroatIcon /> : Icon === 'baby' ? <BabyIcon /> : <Icon strokeWidth={1.7} />}</div><span className="card-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p><a href="#sintomas">Saiba mais <ArrowRight size={18} /></a>
            </article>)}
          </div>
          <div className="center-action reveal"><WhatsAppLink source="after-specialties">Quero agendar uma avaliação <MessageCircle size={19} /></WhatsAppLink></div>
        </div>
      </section>

      <section className="section about" id="sobre">
        <div className="container about-grid">
          <div className="about-visual reveal">
            <div className="about-image"><img src={siteConfig.assets.about} alt="Dr. Evaldo César Macau com equipamento de avaliação otorrinolaringológica" width="1080" height="1620" loading="lazy" /></div>
            <div className="about-card"><Stethoscope size={24} /><div><strong>Otorrinolaringologia</strong><span>Ouvidos · Nariz · Garganta</span></div></div>
            <span className="about-dot dot-a" /><span className="about-dot dot-b" />
          </div>
          <div className="about-copy reveal">
            <span className="eyebrow">Sobre o especialista</span>
            <h2>Conheça o Dr. Evaldo Macau</h2>
            <p>Sou médico otorrinolaringologista, graduado em Medicina pela Universidade Federal do Maranhão — UFMA, com residência médica em Otorrinolaringologia pela Universidade Estadual de Campinas — UNICAMP.</p>
            <p>Possuo Título de Especialista em Otorrinolaringologia pela ABORL-CCF e realizei estágio especializado em Otoneurologia na Universidade de Lisboa, em Portugal.</p>
            <p>Atuo no atendimento de adultos e crianças, realizando consultas, exames e avaliações cirúrgicas. Tenho dedicação especial às cirurgias nasais e faríngeas na infância e ao acompanhamento de pacientes com tontura, vertigem, perda auditiva e zumbido.</p>
            <p>Procuro explicar cada etapa de maneira clara e oferecer um atendimento acolhedor e individualizado. Seja bem-vindo.</p>
            <ul className="check-list"><li><Check /> CRM-MA 10415</li><li><Check /> RQE 3698</li><li><Check /> Atendimento para adultos e crianças</li></ul>
            <WhatsAppLink source="about">Agendar uma consulta <ArrowRight size={19} /></WhatsAppLink>
          </div>
        </div>
      </section>

      <section className="section credentials">
        <div className="container credentials-grid">
          <div className="credentials-intro reveal"><span className="eyebrow">Formação e experiência</span><h2>Conhecimento técnico a serviço de um cuidado próximo</h2><p>Formação médica e atuação profissional dedicadas à Otorrinolaringologia.</p></div>
          <ul className="credential-list reveal">
            <li><Check /><span>Graduação em Medicina pela Universidade Federal do Maranhão — UFMA</span></li>
            <li><Check /><span>Residência Médica em Otorrinolaringologia pela UNICAMP</span></li>
            <li><Check /><span>Título de Especialista em Otorrinolaringologia pela ABORL-CCF</span></li>
            <li><Check /><span>Estágio especializado em Otoneurologia pela Universidade de Lisboa</span></li>
            <li><Check /><span>Médico assistente do Hospital Universitário da UFMA</span></li>
            <li><Check /><span>Integrante do corpo clínico da Clínica Rhinus</span></li>
          </ul>
        </div>
      </section>

      <section className="section all-ages">
        <div className="container all-ages-grid">
          <div className="all-ages-image reveal"><img src={siteConfig.assets.clinical} alt="Dr. Evaldo durante avaliação otorrinolaringológica" width="1080" height="1620" loading="lazy" /></div>
          <div className="all-ages-copy reveal"><span className="eyebrow">Todas as fases da vida</span><h2>Atendimento para adultos e crianças</h2><p>Cada fase da vida apresenta necessidades diferentes.</p><p>Nas crianças, alterações nas amígdalas, adenoides, respiração e audição podem interferir no sono, na fala e no desenvolvimento.</p><p>Nos adultos, sintomas como sinusite, obstrução nasal, zumbido, tontura e perda auditiva também precisam ser investigados com atenção.</p><p>O atendimento é realizado com linguagem acessível e participação do paciente e da família nas decisões.</p></div>
        </div>
      </section>

      <LocationsSection />

      <section className="section symptoms" id="sintomas">
        <div className="container symptoms-grid">
          <div className="symptoms-intro reveal">
            <span className="eyebrow">Observe os sinais</span><h2>Quando procurar um otorrinolaringologista?</h2>
            <p>Alguns sintomas podem indicar que é hora de conversar com um médico de ouvido, nariz e garganta.</p>
            <div className="medical-note"><CircleAlert /><p>Estas informações possuem caráter educativo e não substituem uma avaliação médica.</p></div>
          </div>
          <ul className="symptom-list">
            {symptoms.map((symptom, i) => <li className="reveal" style={{ '--delay': `${(i % 3) * 70}ms` } as React.CSSProperties} key={symptom}><span>{String(i + 1).padStart(2, '0')}</span><p>{symptom}</p><Check /></li>)}
          </ul>
        </div>
      </section>

      <section className="section differentials">
        <div className="container">
          <SectionTitle eyebrow="Confiança em cada etapa" title="Um atendimento baseado em confiança" text="Da conversa inicial às orientações, cada etapa é pensada para que você se sinta bem informado." centered />
          <div className="differential-grid">{differentials.map(({ icon: Icon, title, text }, i) => <article className="differential-card reveal" style={{ '--delay': `${i * 70}ms` } as React.CSSProperties} key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="section journey">
        <div className="container">
          <SectionTitle eyebrow="Simples e direto" title="Como funciona o agendamento" centered />
          <div className="journey-grid">
            {[['01', MessageCircle, 'Entre em contato', 'Clique no botão e acesse o canal de agendamento.'], ['02', Clock3, 'Escolha o melhor horário', 'Confirme a disponibilidade diretamente com a equipe.'], ['03', CalendarCheck, 'Compareça à consulta', 'Receba as orientações necessárias para o atendimento.']].map(([number, Icon, title, text], i) => {
              const StepIcon = Icon as typeof MessageCircle
              return <article className="journey-step reveal" style={{ '--delay': `${i * 100}ms` } as React.CSSProperties} key={title as string}><span className="step-number">{number as string}</span><div className="step-icon"><StepIcon /></div><h3>{title as string}</h3><p>{text as string}</p></article>
            })}
          </div>
        </div>
      </section>

      <section className="section reviews">
        <div className="container reviews-card reveal">
          <div><span className="eyebrow light">Relatos públicos</span><h2>A confiança de quem já foi atendido</h2><p>Os pacientes destacam a atenção durante as consultas, a clareza das explicações, a tranquilidade transmitida e o cuidado no acompanhamento.</p><p>São relatos que reforçam o compromisso com um atendimento humano, responsável e dedicado.</p></div>
          <div className="reviews-action"><strong>16</strong><span>opiniões publicadas na Doctoralia</span><a className="button white" href={siteConfig.contact.doctoralia} target="_blank" rel="noreferrer">Ver avaliações dos pacientes <ArrowRight size={18} /></a></div>
        </div>
        <PatientReviewsCarousel />
      </section>

      <section className="section faq" id="duvidas">
        <div className="container faq-grid">
          <div className="faq-intro reveal"><span className="eyebrow">Dúvidas frequentes</span><h2>Informação clara também faz parte do cuidado</h2><p>Encontre respostas objetivas sobre a consulta e o atendimento.</p><WhatsAppLink className="text-link" source="faq">Ainda tem dúvidas? Fale conosco <ArrowRight size={18} /></WhatsAppLink></div>
          <div className="faq-list reveal">{faqs.map(([q, a], i) => <FAQItem key={q} question={q} answer={a} index={i} />)}</div>
        </div>
      </section>

      <section className="section contact" id="contato">
        <div className="container contact-card reveal">
          <div className="contact-copy"><span className="eyebrow light">Agende sua consulta</span><h2>Dê o primeiro passo para cuidar da sua saúde</h2><p>Se você apresenta dificuldade para respirar, crises frequentes de sinusite, dores no ouvido, zumbido, tontura, perda auditiva, ronco ou problemas recorrentes nas amígdalas, procure uma avaliação especializada.</p><p>Entre em contato para consultar a disponibilidade e agendar seu atendimento.</p><WhatsAppLink className="button white" source="contact">Consultar disponibilidade <MessageCircle size={19} /></WhatsAppLink><div className="contact-doctor-id"><strong>Dr. Evaldo César Macau</strong><span>Otorrinolaringologista · CRM-MA 10415 · RQE 3698</span></div></div>
          <div className="contact-info">
            <div><MapPin /><span><small>{siteConfig.location.clinic}</small><strong>{contactText.address}</strong></span></div>
            <a href="tel:+5598991433929"><PhoneCall /><span><small>Telefone</small><strong>{contactText.phone}</strong></span></a>
            <div><Clock3 /><span><small>Atendimento</small><strong>{contactText.hours}</strong></span></div>
            <a href={siteConfig.contact.instagram} target="_blank" rel="noreferrer" onClick={() => trackEvent('click_instagram', { source: 'contact' })}><InstagramIcon /><span><small>Instagram</small><strong>@drevaldomacau</strong></span></a>
            <a className="location-link" href={siteConfig.location.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('click_directions')}><MapPin /> Ver localização <ArrowRight /></a>
          </div>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand"><img src={siteConfig.assets.logoDark} alt="Dr. Evaldo César Macau" width="344" height="82" /><p>Otorrinolaringologia com atenção, clareza e cuidado para adultos e crianças.</p><p><strong>CRM-MA 10415 · RQE 3698</strong></p></div>
        <div><h2>Navegação</h2>{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
        <div><h2>Contato</h2><a href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle /> Agendamento online</a>{siteConfig.contact.instagram ? <a href={siteConfig.contact.instagram} target="_blank" rel="noreferrer"><InstagramIcon /> Instagram</a> : <span className="placeholder-link"><InstagramIcon /> Instagram a configurar</span>}<a href="#privacidade">Política de Privacidade</a></div>
      </div>
      <div className="container footer-bottom" id="privacidade"><p>© {new Date().getFullYear()} Dr. Evaldo César Macau. Todos os direitos reservados.</p><p>As informações deste site são educativas e não substituem consulta médica.</p></div>
    </footer>
    <WhatsAppLink className="floating-whatsapp" source="floating" ><MessageCircle /><span>Agendar</span></WhatsAppLink>
  </>
}
