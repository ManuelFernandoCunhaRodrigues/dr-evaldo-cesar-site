# Site do Dr. Evaldo César Macau

Landing page responsiva para apresentação do atendimento em Otorrinolaringologia. O projeto usa vinext, React, TypeScript e Tailwind CSS, com geração otimizada para publicação no Sites.

## Desenvolvimento

```bash
npm install
npm run dev
```

Para validar a versão de produção:

```bash
npm run build
```

## Atualizar informações

Os dados comerciais ficam centralizados em `app/site-config.ts`:

- `whatsappNumber`: número com DDI e DDD, somente dígitos;
- `phone`: telefone de contato;
- `instagramUrl`: endereço completo do perfil;
- `address`, `mapsUrl` e `hours`: endereço, rota e horário de atendimento.

Enquanto o número não estiver preenchido, os botões abrem o seletor do WhatsApp com uma mensagem pronta, sem direcionar para um destinatário inventado.

As fotografias oficiais estão em `public/assets/photos` e os logotipos, em `public/assets/logo`.

## Antes da publicação definitiva

- Confirmar WhatsApp, telefone, Instagram e horários.
- Confirmar endereço e link do Google Maps.
- Substituir a URL canonical pelo domínio oficial.
- Revisar a política de privacidade conforme os serviços de análise que forem adicionados.
- Inserir Google Analytics ou Google Tag Manager somente com a configuração de consentimento adequada à LGPD.

## SEO e acessibilidade

- Uma única página com um único `h1` e hierarquia semântica de títulos.
- Metadados Open Graph e Twitter Card.
- Dados estruturados `Physician` e `FAQPage` apenas com informações apresentadas na página.
- `robots.txt`, `sitemap.xml`, textos alternativos e foco visível.
- Menu e FAQ navegáveis por teclado, áreas de toque mínimas e suporte a `prefers-reduced-motion`.
- Eventos preparados no `dataLayer`: `click_whatsapp`, `click_directions` e `open_faq`.
