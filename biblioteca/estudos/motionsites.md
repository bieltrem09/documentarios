# Estudo: motionsites.ai (galeria de referências de sites)

Estudado em 13/11/2026. Galeria pública de heros e landing pages animados (vendidos como prompts para Lovable, Bolt, Cursor, Claude).
Serviu de modelo para o **novo visual do nosso app** (sem login). Aqui fica o que aprendemos e o índice das referências deles, **só como link**:
as prévias em vídeo e os prompts são deles (parte é paga), então não copiamos mídia nem texto de prompt para o repositório.
Quando uma delas interessar, abra o link, estude a técnica e, se quiser guardar, salve um print/gravação em `biblioteca/_novas/` para catalogar como `web-XXXX`.

## Como o site é construído (o que copiamos no app)

| Elemento | Como é | No nosso app |
|---|---|---|
| Fundo | grafite `#121212`, texto `#F5F5F5`, secundário `rgba(255,255,255,.72)` | igual |
| Fonte | sistema / Geist; títulos peso 900 em caixa alta, `letter-spacing -0.03em`, 66px / 56px de entrelinha | Geist 900 |
| Hero | selo pequeno com borda laranja, título de 2 linhas, palavra final com gradiente radial lilás → creme → laranja (`#D0B2FF → #FFEED8 → #E8400D`), subtítulo cinza, botão pílula branco-azulado com glow | igual, com textos do InDeep |
| Navegação | logo à esquerda + abas (Sites/Dashboards/Social), links à direita, ícone de busca em círculo `#262626` 48px, botão "Sign up" | logo próprio + abas Edição/Sites/Banco, busca; **sem login** |
| Filtros | grupo segmentado (Featured/Popular/Recent) em pílula com borda `rgba(255,255,255,.1)`, ativo `#202020`; linha de categorias rolável com seta; dropdown "Pricing" | Destaque/Recentes/A–Z, categorias com seta, dropdown Nicho/Segmento e "Filtros" (mídia, cor, tags) |
| Grade | masonry de 4 colunas, gap 12px, mídia com raio 20px sem moldura, vídeo em autoplay mudo e loop | igual (vídeo toca só quando está visível) |
| Legenda do card | título 18px bold + categoria 12px cinza na mesma linha, ícone à direita (copiar/coroa) | título + categoria/segmento + botão copiar ID |
| Card aberto | o card vira um painel largo no topo da grade: mídia à esquerda, coluna à direita com título, categoria, curtidas, botão principal; seta de voltar em círculo sobre a mídia | painel igual, com a ficha técnica completa na coluna |
| Login | card central "Welcome back", botões pílula `#2A2A2A`, botão principal com gradiente laranja → azul → lilás | não usado (uso pessoal); o gradiente virou a marca |

## Padrões de técnica que mais aparecem (para estudar e recriar)

- **Vídeo de fundo full-bleed** gerado por IA (pessoas, produtos, paisagens) com título grande por cima.
- **3D / scroll-driven**: objetos que giram com o scroll (esfera de fotos "Orbit Sphere", partículas formando cabeça/cérebro, cristal em wireframe).
- **Partículas** (Particle Brain, Particle Self): nuvem de pontos formando uma forma; ótimo também para intro de documentário.
- **Lojas virtuais / provadores**: arara de roupas 3D, carrossel de looks, "virtual fitting".
- **Estantes e arquivos** (Book Shelf, VHS Archive): objetos enfileirados em perspectiva que se abrem no hover; ideia boa para arquivo histórico em vídeo.
- **Texto gigante atrás do sujeito** e mistura sans pesada + serifada itálica.
- **Liquid glass / glassmorphism** em cards e navbar.

## Taxonomia deles e quantidade (765 itens)


Landing Page (61) · Hero (58) · SaaS (57) · Portfolio (37) · 3D (34) · Hero Section (33) · Agency (25) · Creative (22) · AI (19) · Interactive (19) · Travel (17) · Ecommerce (16) · Fintech (15) · Fashion (14) · Footer (14) · Features (11) · Technology (10) · Wellness (9) · CTA (8) · Pricing (7) · About (6) · Healthcare (6) · Footer Section (5) · Cards (5) · Cybersecurity (5) · Real Estate (4) · Features Section (4) · Finance (4) · 404 (3) · Social Media (3) · Web3 (3) · Health (3) · Crypto (3) · Music (3) · Sports (3) · Community (3) · Login Page (3) · Logistics (3) · Services (2) · Benefits (2) · Tabs (2) · Slider (2) · Automotive (2) · Transportation (2) · Ecommerce App (2) · E-commerce (2) · Entertainment (2) · Developer (2) · Education (2) · Testimonials (2) · Landing page (2) · Component (2) · 3D Website (2) · Dashboard (2) · Product (2) · Agency Website (2) · Art (2) · Lifestyle (2) · Analytics (2) · AI Assistant (2) · Security (2) · Creative Studio (2) · Editorial (2) · Space (2) · Architecture (2) · Robotics (2) · Tech (2) · Design (2) · 3D Character (2) · Finance App (2) · Hover (2) · Motion Design (2) · Publishing (2) · Interactive 3D (1) · Waitlist (1) · Marquee (1) · landing page (1) · Investor Presentations (1) · Info (1) · Books (1) · Testimonial (1) · CTA Section (1) · FAQ (1) · Process (1) · HR Management (1) · Education Website (1) · Dashboard Demo (1) · Presentation (1) · Projects (1) · Blog (1) · Carousal (1) · VPN (1) · Case Studies (1) · Productivity (1) · Categories (1) · Mindfulness (1) · Accordion (1) · Sign Up (1) · Sign In Form (1) · Developer Platform (1) · Contact us (1) · SaaS Website (1) · Why Us (1) · Use Case (1) · Mobile App (1) · Travel App (1) · Booking (1) · Signup (1) · AI App (1) · Statistics App (1) · AI Data (1) · Learning SaaS (1) · Medicine (1) · Health App (1) · AI SaaS Website (1) · AI / SaaS (1) · Church (1) · Form (1) · Bento (1) · Products (1) · Stats (1) · Feature (1) · Loyalty App (1) · Email Marketing (1) · Learning (1) · App (1) · Utility (1) · Driving (1) · Sustainability (1) · Artificial Intelligence (1) · Website (1) · Data (1) · Game UI (1) · Events (1) · Culture (1) · Fitness (1) · Film (1) · Business (1) · Medical (1) · Food (1) · Sign in (1) · Science (1) · Threejs (1) · AI Technology (1) · threejs (1) · Data Intelligence (1) · Construction (1) · Nature (1) · Curated (1) · Recruitment (1) · Cyberpunk (1) · Communication (1) · Environmental (1) · Social (1) · Creative Agency (1) · E-coommerce (1) · Med (1) · Automative (1) · Manufacturing (1) · Model (1) · Luxury (1) · Photography (1) · Draggable (1) · Motion (1) · WebGL Portfolio (1) · Personal (1) · Cars (1) · Navbar (1) · Reveal (1) · Supply (1) · AI Creative (1) · Game Menu (1) · 3D Interactive (1) · Game (1) · AI Builder (1) · Authentication (1) · Ski Gear (1) · Portfolio Builder (1) · Kids Show (1) · 3D Viewer (1) · Podcast (1) · Healthcare AI (1) · AI Course (1) · Creator Platform (1) · Onboarding (1) · Hiking App (1) · Scroll-Driven 3D (1) · Interactive Map (1) · FAQ Page (1) · Rental Landing (1) · Travel Fintech (1) · AI SaaS (1) · Mental Health (1) · Affiliate (1) · Fintech Landing (1) · Investment (1) · Legal Studio (1) · Agency Hero (1) · AI Research (1) · Trading App (1) · Fintech Hero (1) · Wearables (1) · AI Hero (1) · Crypto Hero (1) · Fintech CTA (1) · Signup Page (1) · 3D Portfolio (1) · AI Product (1) · Staffing (1) · 3D Store (1) · History (1) · Halloween (1) · Community App (1)


## Índice de referências (link direto)

`★` = prévia gratuita no site deles.


### Landing Page (61)

- [3D Story](https://motionsites.ai/?prompt=3d-story)
- [Acreage Farming](https://motionsites.ai/?prompt=acreage-farming-hero)
- [AeroCore](https://motionsites.ai/?prompt=aerocore)
- [AI Automation](https://motionsites.ai/?prompt=ai-automation)
- [AI Designer Agency](https://motionsites.ai/?prompt=ai-designer-agency)
- [AI Designer Portfolio](https://motionsites.ai/?prompt=vortex-studio-hero) ★
- [AI Interface](https://motionsites.ai/?prompt=ai-interface)
- [AKOR Security](https://motionsites.ai/?prompt=akor-security-landing)
- [Apex Pulse](https://motionsites.ai/?prompt=apex-pulse)
- [Art Landing](https://motionsites.ai/?prompt=art-landing)
- [Bloom](https://motionsites.ai/?prompt=bl)
- [Cinematic Landing Page](https://motionsites.ai/?prompt=cinematic-landing-page)
- [Clarity Core](https://motionsites.ai/?prompt=bio-active)
- [ClubX Investors](https://motionsites.ai/?prompt=clubx-hero)
- [CodeNest Coding Platform](https://motionsites.ai/?prompt=codenest-hero) ★
- [Cosmos Interface](https://motionsites.ai/?prompt=cosmos-interface)
- [Creative Agency](https://motionsites.ai/?prompt=creative-agency)
- [Digital Experiences](https://motionsites.ai/?prompt=digital-experiences) ★
- [Dreamcore Landing](https://motionsites.ai/?prompt=dreamcore-landing)
- [E-commerce Website](https://motionsites.ai/?prompt=ecommerce-website-landing)
- [Financial Suite](https://motionsites.ai/?prompt=financial-suite)
- [FlowMate](https://motionsites.ai/?prompt=flowmate-landing)
- [Focus AI](https://motionsites.ai/?prompt=focus-ai-landing)
- [Future-State](https://motionsites.ai/?prompt=future-state)
- [Glitch Pulse](https://motionsites.ai/?prompt=glitch-pulse)
- [Golden Portal](https://motionsites.ai/?prompt=golden-portal)
- [Guardnet](https://motionsites.ai/?prompt=guardnet-landing)
- [Health Portal](https://motionsites.ai/?prompt=health-portal) ★
- [Innovation](https://motionsites.ai/?prompt=innovation-landing) ★
- [Investment Gate](https://motionsites.ai/?prompt=investment-hero)
- [Layered Depth](https://motionsites.ai/?prompt=layered-depth)
- [Liquid Glass Agency](https://motionsites.ai/?prompt=liquid-glass-agency)
- [Luxury Botanical](https://motionsites.ai/?prompt=luxury-botanical)
- [Luxury Ecommerce Design](https://motionsites.ai/?prompt=luxury-editorial-ecommerce-design)
- [Luxury Real Estate](https://motionsites.ai/?prompt=luxury-real-estate)
- [Mindloop Landing](https://motionsites.ai/?prompt=mindloop-landing) ★
- [Neon Logic](https://motionsites.ai/?prompt=neon-logic) ★
- [NeoVision](https://motionsites.ai/?prompt=neovision-landing)
- [Neural Interface](https://motionsites.ai/?prompt=neural-interface)
- [NexaCore](https://motionsites.ai/?prompt=nexacore-hero)
- [Nike Premium Landing](https://motionsites.ai/?prompt=nike-premium-landing)
- [Nimbus Grid](https://motionsites.ai/?prompt=nimbus-grid)
- [NOVA Space Systems](https://motionsites.ai/?prompt=nova-space-landing)
- [Orbis NFT](https://motionsites.ai/?prompt=orbis-nft-landing) ★
- [Prisma Creative Studio](https://motionsites.ai/?prompt=prisma-landing) ★
- [PROMPT](https://motionsites.ai/?prompt=prompt-hero) ★
- [RIVR DeFi](https://motionsites.ai/?prompt=rivr-defi-landing)
- [Scenic Travel](https://motionsites.ai/?prompt=travel-hero)
- [SkyElite Private Jets](https://motionsites.ai/?prompt=skyelite-hero) ★
- [Smarter Growth](https://motionsites.ai/?prompt=smarter-growth)
- [Space Voyage](https://motionsites.ai/?prompt=20)
- [Stellar Launch](https://motionsites.ai/?prompt=stellar-launch)
- [Synthesis](https://motionsites.ai/?prompt=synthesis)
- [Urban Jungle](https://motionsites.ai/?prompt=urban-jungle-hero)
- [USD Halo](https://motionsites.ai/?prompt=halo-usd-landing) ★
- [Veloce Finance](https://motionsites.ai/?prompt=veloce-finance-landing)
- [Vitara](https://motionsites.ai/?prompt=vitara-hero)
- [Weblex Dark Hero](https://motionsites.ai/?prompt=11)
- [Yacht Club](https://motionsites.ai/?prompt=yacht-club-hero)
- [Yoga Coach](https://motionsites.ai/?prompt=yoga-coach)
- [Zenith Realty](https://motionsites.ai/?prompt=zenith-realty-landing)

### Hero (58)

- [AI Workflow Hero](https://motionsites.ai/?prompt=ai-workflow) ★
- [Audio Showcase](https://motionsites.ai/?prompt=audio-showcase) ★
- [Bio-Age Dashboard](https://motionsites.ai/?prompt=bio-age-dashboard)
- [Bio-Digital](https://motionsites.ai/?prompt=bio-digital)
- [Bold Studio](https://motionsites.ai/?prompt=bold-studio) ★
- [Book Hero](https://motionsites.ai/?prompt=book-hero)
- [Camper Overnight](https://motionsites.ai/?prompt=camper-overnight) ★
- [Cargo Group](https://motionsites.ai/?prompt=cargo-group)
- [Cinematic Brand](https://motionsites.ai/?prompt=cinematic-brand)
- [Contact Cybernetic](https://motionsites.ai/?prompt=contact-cybernetic) ★
- [Conversion](https://motionsites.ai/?prompt=conversion)
- [Cosmic](https://motionsites.ai/?prompt=cosmic)
- [CozyPaws](https://motionsites.ai/?prompt=cozypaws) ★
- [Creative Portfolio](https://motionsites.ai/?prompt=creative-portfolio) ★
- [Cursor Follow](https://motionsites.ai/?prompt=cursor-follow)
- [Cyberpunk Reveal](https://motionsites.ai/?prompt=cyberpunk-reveal) ★
- [Cybersecurity Hero](https://motionsites.ai/?prompt=cybersecurity-hero) ★
- [Cybersecurity Hero v2](https://motionsites.ai/?prompt=cybersecurity-hero-v2)
- [Eco Intelligence](https://motionsites.ai/?prompt=eco-intelligence)
- [Equilibrium](https://motionsites.ai/?prompt=equilibrium) ★
- [FinancialFocus](https://motionsites.ai/?prompt=financialfocus)
- [Futuristic Cinematic](https://motionsites.ai/?prompt=futuristic-cinematic)
- [Futuristic Tech](https://motionsites.ai/?prompt=futuristic-tech)
- [Growth Marketing SaaS](https://motionsites.ai/?prompt=growth-marketing-saas)
- [Immersive Ocean](https://motionsites.ai/?prompt=immersive-ocean) ★
- [Impact Ventures](https://motionsites.ai/?prompt=impact-ventures) ★
- [Innovation Studio](https://motionsites.ai/?prompt=innovation-studio)
- [Integration SaaS](https://motionsites.ai/?prompt=integration-saas)
- [IntelligentX](https://motionsites.ai/?prompt=intelligentx) ★
- [Interactive Discovery](https://motionsites.ai/?prompt=interactive-discovery) ★
- [Interactive Portfolio](https://motionsites.ai/?prompt=interactive-portfolio)
- [Lead Funnel](https://motionsites.ai/?prompt=lead-funnel)
- [Learnly](https://motionsites.ai/?prompt=learnly)
- [Luminara](https://motionsites.ai/?prompt=luminara)
- [Luxury Hero](https://motionsites.ai/?prompt=luxury-hero)
- [Naturecore SaaS](https://motionsites.ai/?prompt=naturecore-saas)
- [Network Hero](https://motionsites.ai/?prompt=network-hero) ★
- [Obsidian Hero](https://motionsites.ai/?prompt=obsidian-hero)
- [Organic Odyssey](https://motionsites.ai/?prompt=organic-odyssey) ★
- [Portal](https://motionsites.ai/?prompt=portal) ★
- [Prosthetics Hero](https://motionsites.ai/?prompt=prosthetics-hero) ★
- [Retro-Futurist](https://motionsites.ai/?prompt=retro-futurist) ★
- [Reveal Hero](https://motionsites.ai/?prompt=reveal-hero)
- [Solar Energy Hero](https://motionsites.ai/?prompt=solar-energy-hero)
- [SpeakUp Venture Hero](https://motionsites.ai/?prompt=speakup-venture-hero)
- [Stillmind](https://motionsites.ai/?prompt=stillmind) ★
- [Subscription Agency](https://motionsites.ai/?prompt=subscription-agency) ★
- [Tech-Forward](https://motionsites.ai/?prompt=tech-forward) ★
- [Unwind Hero](https://motionsites.ai/?prompt=unwind-hero)
- [VaultShield](https://motionsites.ai/?prompt=vaultshield) ★
- [Velorix IIC](https://motionsites.ai/?prompt=velorix-iic)
- [Vertex Sci](https://motionsites.ai/?prompt=vertex-sci)
- [Vision Reveal](https://motionsites.ai/?prompt=vision-reveal) ★
- [Visual Hero](https://motionsites.ai/?prompt=visual-hero) ★
- [Waitlist Hero](https://motionsites.ai/?prompt=waitlist-hero)
- [Wellbeing OS](https://motionsites.ai/?prompt=wellbeing-os) ★
- [Wellness Balance](https://motionsites.ai/?prompt=wellness-balance) ★
- [Wellness Hero](https://motionsites.ai/?prompt=wellness-hero) ★

### SaaS (57)

- [Agent Grove](https://motionsites.ai/?prompt=agent-grove) ★
- [AI Meeting Notes](https://motionsites.ai/?prompt=ai-meeting-notes)
- [AI Workflow Agents](https://motionsites.ai/?prompt=ai-workflow-agents) ★
- [Anveril](https://motionsites.ai/?prompt=anveril) ★
- [Apex SaaS](https://motionsites.ai/?prompt=apex-saas-hero)
- [AuraMail](https://motionsites.ai/?prompt=auramail)
- [Autonomous Ops](https://motionsites.ai/?prompt=autonomous-ops) ★
- [Beauty Studio](https://motionsites.ai/?prompt=beauty-studio) ★
- [Bionova Biotech](https://motionsites.ai/?prompt=bionova-hero)
- [BookedUp](https://motionsites.ai/?prompt=bookedup)
- [Card Ring](https://motionsites.ai/?prompt=card-ring)
- [ClearInvoice SaaS Hero](https://motionsites.ai/?prompt=3)
- [CoderCrest](https://motionsites.ai/?prompt=codercrest-hero)
- [Crystal Koi](https://motionsites.ai/?prompt=crystal-koi) ★
- [Cybersecurity](https://motionsites.ai/?prompt=cybersecurity)
- [Data Relay](https://motionsites.ai/?prompt=data-relay)
- [Data Storytelling](https://motionsites.ai/?prompt=data-storytelling)
- [Datacore Booking](https://motionsites.ai/?prompt=datacore-booking-hero) ★
- [Datacore SaaS Hero](https://motionsites.ai/?prompt=4)
- [Digitwist AI Builder](https://motionsites.ai/?prompt=digitwist-hero) ★
- [Finlytic AI Agent](https://motionsites.ai/?prompt=finlytic-hero)
- [Global Talent](https://motionsites.ai/?prompt=global-talent)
- [Grow AI Talent Platform](https://motionsites.ai/?prompt=grow-ai-hero)
- [Growth Analytics](https://motionsites.ai/?prompt=growth-analytics)
- [Growth Decisions](https://motionsites.ai/?prompt=growth-decisions) ★
- [Halcyonn](https://motionsites.ai/?prompt=halcyonn)
- [Halftone FAQ](https://motionsites.ai/?prompt=solace-faq) ★
- [HR SaaS Hero](https://motionsites.ai/?prompt=16)
- [Intelligent Performance](https://motionsites.ai/?prompt=intelligent-performance) ★
- [Intelligent Systems](https://motionsites.ai/?prompt=intelligent-systems)
- [JungleMind](https://motionsites.ai/?prompt=junglemind) ★
- [macOS widget](https://motionsites.ai/?prompt=macos-widget) ★
- [Mindloop](https://motionsites.ai/?prompt=mindloop-hero)
- [Minimal Workflow SaaS](https://motionsites.ai/?prompt=minimal-workflow-saas)
- [Moss Island](https://motionsites.ai/?prompt=moss-island) ★
- [Neuralyn](https://motionsites.ai/?prompt=neuralyn-hero) ★
- [Nexora Automation](https://motionsites.ai/?prompt=nexora-hero) ★
- [Nickel Payments](https://motionsites.ai/?prompt=nickel-hero)
- [Peakline Redshift](https://motionsites.ai/?prompt=peakline-redshift)
- [Planet Orbit](https://motionsites.ai/?prompt=planet-orbit-hero)
- [Price Calculator](https://motionsites.ai/?prompt=price-calculator) ★
- [Quantum Lucid](https://motionsites.ai/?prompt=quantum-lucid) ★
- [SAAS Software](https://motionsites.ai/?prompt=convix-software-hero) ★
- [SaaS Value](https://motionsites.ai/?prompt=saas-value) ★
- [Scaling Platform](https://motionsites.ai/?prompt=scaling-platform) ★
- [Securify Data Security](https://motionsites.ai/?prompt=securify-hero) ★
- [Skytrace](https://motionsites.ai/?prompt=skytrace)
- [Slate](https://motionsites.ai/?prompt=slate-hero)
- [Synapse Dark Hero](https://motionsites.ai/?prompt=7)
- [Systema](https://motionsites.ai/?prompt=systema)
- [Targo Logistics Hero](https://motionsites.ai/?prompt=12)
- [Task Engine](https://motionsites.ai/?prompt=task-engine) ★
- [Taskora SaaS Hero](https://motionsites.ai/?prompt=2)
- [Terra Geo Map](https://motionsites.ai/?prompt=terra-hero)
- [Vexel](https://motionsites.ai/?prompt=vexela) ★
- [Video Editor](https://motionsites.ai/?prompt=video-editor) ★
- [Website Builder](https://motionsites.ai/?prompt=website-builder)

### Portfolio (37)

- [3D Jack Portfolio](https://motionsites.ai/?prompt=3d-jack-portfolio-hero) ★
- [Anchor AI](https://motionsites.ai/?prompt=anchor-ai)
- [Arctic Lab](https://motionsites.ai/?prompt=arctic-lab)
- [Atelier Unit](https://motionsites.ai/?prompt=atelier-unit) ★
- [AXON](https://motionsites.ai/?prompt=axon) ★
- [Bold Portfolio Hero](https://motionsites.ai/?prompt=6)
- [Bookshop](https://motionsites.ai/?prompt=folio-books-hero) ★
- [Card Stack](https://motionsites.ai/?prompt=card-stack) ★
- [Creative Designer Portfolio](https://motionsites.ai/?prompt=creative-designer-portfolio)
- [Dark Portfolio](https://motionsites.ai/?prompt=dark-portfolio)
- [Dark Portfolio Hero](https://motionsites.ai/?prompt=15)
- [Designer Portfolio](https://motionsites.ai/?prompt=designer-portfolio) ★
- [Digital Director](https://motionsites.ai/?prompt=digital-director) ★
- [DJ ZakDerdan](https://motionsites.ai/?prompt=dj-zakderdan)
- [Future 3D Portfolio](https://motionsites.ai/?prompt=future-3d-portfolio)
- [Glass Portfolio](https://motionsites.ai/?prompt=glass-portfolio) ★
- [Gold Standard](https://motionsites.ai/?prompt=gold-standard) ★
- [Ink Portfolio](https://motionsites.ai/?prompt=ink-portfolio)
- [Koi Pond](https://motionsites.ai/?prompt=koi-pond)
- [Laptop Portfolio](https://motionsites.ai/?prompt=laptop-portfolio) ★
- [Living Portrait](https://motionsites.ai/?prompt=living-portrait-hero) ★
- [Maya Lind Profile](https://motionsites.ai/?prompt=maya-lind-profile) ★
- [Menuchi](https://motionsites.ai/?prompt=menuchi)
- [Paper Craft](https://motionsites.ai/?prompt=paper-craft) ★
- [Parallex](https://motionsites.ai/?prompt=parallex) ★
- [Personal Showcase](https://motionsites.ai/?prompt=personal-showcase) ★
- [Photo Globe](https://motionsites.ai/?prompt=photo-globe) ★
- [Pink Rider](https://motionsites.ai/?prompt=pink-rider) ★
- [Portfolio Cosmic](https://motionsites.ai/?prompt=portfolio-cosmic-hero) ★
- [Sea Ring](https://motionsites.ai/?prompt=sea-ring) ★
- [Shelf Hero](https://motionsites.ai/?prompt=vasari-vhs-hero) ★
- [Sphere Gallery](https://motionsites.ai/?prompt=sphere-gallery) ★
- [VHS Archive](https://motionsites.ai/?prompt=vhs-archive) ★
- [Video Ribbon](https://motionsites.ai/?prompt=vante-ribbon-hero) ★
- [Viktor Portfolio](https://motionsites.ai/?prompt=19)
- [Work Ribbon](https://motionsites.ai/?prompt=work-ribbon) ★
- [Year Recap](https://motionsites.ai/?prompt=year-recap)

### 3D (34)

- [3D Character Studio](https://motionsites.ai/?prompt=3d-character-studio) ★
- [Alethia](https://motionsites.ai/?prompt=alethia)
- [Arctis](https://motionsites.ai/?prompt=arctis)
- [Autumn Fox](https://motionsites.ai/?prompt=autumn-fox) ★
- [Cast and Render](https://motionsites.ai/?prompt=cast-and-render) ★
- [Design World](https://motionsites.ai/?prompt=design-world) ★
- [Dragon Knight](https://motionsites.ai/?prompt=dragon-knight)
- [Facet Glass](https://motionsites.ai/?prompt=facet-glass-hero) ★
- [Feathers Atlas](https://motionsites.ai/?prompt=feathers-atlas) ★
- [Fin Coin](https://motionsites.ai/?prompt=fin-coin)
- [Flower Valley](https://motionsites.ai/?prompt=fernhollow) ★
- [Glass Tree](https://motionsites.ai/?prompt=seedwell-hero)
- [Halo Prism](https://motionsites.ai/?prompt=halo-prism) ★
- [HAVENORBI](https://motionsites.ai/?prompt=havenorbi)
- [Heart Health Dashboard](https://motionsites.ai/?prompt=heart-health-dashboard)
- [Jelly Garden](https://motionsites.ai/?prompt=jelly-garden)
- [Kernel Code](https://motionsites.ai/?prompt=kernel-code)
- [Lost Little Explorer](https://motionsites.ai/?prompt=lost-little-explorer)
- [Lumora](https://motionsites.ai/?prompt=lumora)
- [Mind AI](https://motionsites.ai/?prompt=mind-ai) ★
- [Nightmast Studio](https://motionsites.ai/?prompt=nightmast-3dstudio)
- [Nimbus AI](https://motionsites.ai/?prompt=nimbus-ai)
- [OctaForm](https://motionsites.ai/?prompt=octaform)
- [Particle Brain](https://motionsites.ai/?prompt=nously-brain)
- [Phoenix ignis](https://motionsites.ai/?prompt=phoenix-ignis) ★
- [Plush Sky Den](https://motionsites.ai/?prompt=plush-sky-den)
- [Renewable greentech](https://motionsites.ai/?prompt=greentech-greentech)
- [Roadster 3D](https://motionsites.ai/?prompt=roadster-3d)
- [Robot Jellyfish](https://motionsites.ai/?prompt=medusa-jellyfish-hero) ★
- [Sakura QR](https://motionsites.ai/?prompt=sakura-qr) ★
- [Skyra AI](https://motionsites.ai/?prompt=skyra-ai)
- [Space planet](https://motionsites.ai/?prompt=space-planet) ★
- [Specimen](https://motionsites.ai/?prompt=specimen)
- [Sun Timeline](https://motionsites.ai/?prompt=lifeline-sun-hero) ★

### Hero Section (33)

- [Aethera Studio](https://motionsites.ai/?prompt=aethera-hero) ★
- [Aetheris Voyage](https://motionsites.ai/?prompt=aetheris-voyage-hero) ★
- [Asme](https://motionsites.ai/?prompt=asme-hero) ★
- [Automation Machines](https://motionsites.ai/?prompt=automation-machines-hero)
- [Bloom AI](https://motionsites.ai/?prompt=bloom-ai-hero) ★
- [Crypto Wealth](https://motionsites.ai/?prompt=crypto-wealth-hero)
- [DesignPro Academy](https://motionsites.ai/?prompt=designpro-hero) ★
- [Digital Epoch](https://motionsites.ai/?prompt=digital-epoch-hero) ★
- [Dot](https://motionsites.ai/?prompt=dot-hero) ★
- [Duolingo Styleguide](https://motionsites.ai/?prompt=duolingo-styleguide-hero) ★
- [EcoVolta](https://motionsites.ai/?prompt=ecovolta-hero)
- [EcoVolta V2](https://motionsites.ai/?prompt=ecovolta-v2-hero)
- [EMBER.dsgn](https://motionsites.ai/?prompt=ember-dsgn-hero)
- [EVR Ventures](https://motionsites.ai/?prompt=evr-ventures-hero)
- [Impressive Hero](https://motionsites.ai/?prompt=impressive-hero)
- [Luminex](https://motionsites.ai/?prompt=luminex-hero) ★
- [Nexus IT Solutions](https://motionsites.ai/?prompt=nexus-hero)
- [Portal](https://motionsites.ai/?prompt=portal-hero) ★
- [Power AI](https://motionsites.ai/?prompt=power-ai-hero) ★
- [Prioritize](https://motionsites.ai/?prompt=prioritize-hero)
- [Railroad.ai](https://motionsites.ai/?prompt=railroad-ai-hero)
- [RIVR](https://motionsites.ai/?prompt=rivr-hero) ★
- [Sentinel AI](https://motionsites.ai/?prompt=sentinel-ai-hero) ★
- [Shamoni](https://motionsites.ai/?prompt=shamoni-hero)
- [Slam Dunk](https://motionsites.ai/?prompt=slam-dunk-hero)
- [Stellar AI](https://motionsites.ai/?prompt=stellar-ai-hero) ★
- [Sync AI](https://motionsites.ai/?prompt=stellar-ai-v2-hero)
- [Taskly](https://motionsites.ai/?prompt=taskly-hero) ★
- [Transform Data](https://motionsites.ai/?prompt=transform-data-hero) ★
- [VertexAI Hero](https://motionsites.ai/?prompt=vertex-ai-hero)
- [VEX Ventures](https://motionsites.ai/?prompt=vex-ventures-hero) ★
- [WISA Space](https://motionsites.ai/?prompt=wisa-space-hero)
- [xPortfolio Hero](https://motionsites.ai/?prompt=xportfolio-hero)

### Agency (25)

- [ASCII Studio](https://motionsites.ai/?prompt=ascii-studio)
- [Build Unit](https://motionsites.ai/?prompt=build-unit)
- [Buzzentic Agency](https://motionsites.ai/?prompt=21)
- [Creative Studio](https://motionsites.ai/?prompt=creative-studio) ★
- [Curved Reel](https://motionsites.ai/?prompt=curved-reel) ★
- [Elo One Results](https://motionsites.ai/?prompt=elo-one-results) ★
- [Framelix 3D Studios](https://motionsites.ai/?prompt=13)
- [Glassmorphism Agency Hero](https://motionsites.ai/?prompt=5)
- [Global Hubs](https://motionsites.ai/?prompt=global-hubs)
- [Golden Identity](https://motionsites.ai/?prompt=golden-identity)
- [Immersive Studio](https://motionsites.ai/?prompt=immersive-studio)
- [Intelligent Operations](https://motionsites.ai/?prompt=intelligent-operations) ★
- [Logoisum Video Agency](https://motionsites.ai/?prompt=14)
- [Modern Agency](https://motionsites.ai/?prompt=modern-agency) ★
- [Neural Pathway](https://motionsites.ai/?prompt=neural-pathway) ★
- [New Era Bold Hero](https://motionsites.ai/?prompt=1)
- [Northstar](https://motionsites.ai/?prompt=northstar) ★
- [Octo Studio](https://motionsites.ai/?prompt=octo-studio)
- [Orbit Engineers](https://motionsites.ai/?prompt=orbit-engineers)
- [Orvante Agency](https://motionsites.ai/?prompt=orvante-agency) ★
- [Talent Collective](https://motionsites.ai/?prompt=talent-collective) ★
- [Trend Carousel](https://motionsites.ai/?prompt=trend-carousel) ★
- [Velorah](https://motionsites.ai/?prompt=velorah-hero) ★
- [Video Studio](https://motionsites.ai/?prompt=video-studio) ★
- [Work Stack](https://motionsites.ai/?prompt=work-stack)

### Creative (22)

- [AI Film Studio](https://motionsites.ai/?prompt=ai-film-studio)
- [AI Future Studio](https://motionsites.ai/?prompt=ai-future-studio)
- [Ancient Oath](https://motionsites.ai/?prompt=ancient-oath)
- [Ascend](https://motionsites.ai/?prompt=ascend)
- [Avant Studio](https://motionsites.ai/?prompt=avant-studio)
- [Creative Matter](https://motionsites.ai/?prompt=creative-matter)
- [Dream Garden](https://motionsites.ai/?prompt=dream-garden)
- [Frame Futures](https://motionsites.ai/?prompt=frame-futures)
- [Frozen Cave](https://motionsites.ai/?prompt=frozen-cave)
- [Honey Bee](https://motionsites.ai/?prompt=honey-bee) ★
- [Hover Ink](https://motionsites.ai/?prompt=hover-ink)
- [Internet Alchemist](https://motionsites.ai/?prompt=nightmast-studio)
- [Keel](https://motionsites.ai/?prompt=keel)
- [Octopus Mentality](https://motionsites.ai/?prompt=octopus-mentality)
- [Orange Horse](https://motionsites.ai/?prompt=orange-horse)
- [Petalyx](https://motionsites.ai/?prompt=petalyx) ★
- [Plume](https://motionsites.ai/?prompt=plume)
- [Skyflora](https://motionsites.ai/?prompt=skyflora)
- [Space Voyage](https://motionsites.ai/?prompt=space-voyage) ★
- [Sparkform](https://motionsites.ai/?prompt=sparkform) ★
- [Undr Drift](https://motionsites.ai/?prompt=undr-drift)
- [Vintage Care](https://motionsites.ai/?prompt=vintage-care)

### AI (19)

- [Agent Crew](https://motionsites.ai/?prompt=agent-crew)
- [Agent Hero](https://motionsites.ai/?prompt=nova-agent-hero) ★
- [Agent Wave](https://motionsites.ai/?prompt=agent-wave) ★
- [AI Companions](https://motionsites.ai/?prompt=ai-companions)
- [AI Image Generator UI](https://motionsites.ai/?prompt=ai-image-generator-ui) ★
- [AI Runtime](https://motionsites.ai/?prompt=ai-runtime) ★
- [Cosmic Mapping](https://motionsites.ai/?prompt=cosmic-mapping)
- [Cosmo Forge](https://motionsites.ai/?prompt=cosmo-forge)
- [Draftwise](https://motionsites.ai/?prompt=draftwise)
- [Fastshot](https://motionsites.ai/?prompt=fastshot) ★
- [Halden AI Teammate Hero](https://motionsites.ai/?prompt=halden-port-hero) ★
- [Helion Dispatch](https://motionsites.ai/?prompt=helion-dispatch)
- [Human Machine](https://motionsites.ai/?prompt=human-machine)
- [Nomi AI Agent](https://motionsites.ai/?prompt=nomi-ai-agent)
- [Open Agent](https://motionsites.ai/?prompt=open-agent)
- [Orbit Flora](https://motionsites.ai/?prompt=orbit-flora) ★
- [Palomar Labs](https://motionsites.ai/?prompt=palomar-labs) ★
- [Quantum Human](https://motionsites.ai/?prompt=quantum-human)
- [Scanner Comparison](https://motionsites.ai/?prompt=distill-comparison) ★

### Interactive (19)

- [Card Story](https://motionsites.ai/?prompt=card-story)
- [Chef Stack](https://motionsites.ai/?prompt=chef-stack)
- [Design Collage](https://motionsites.ai/?prompt=design-collage) ★
- [Grid Runner](https://motionsites.ai/?prompt=grid-runner)
- [Infinite Gallery](https://motionsites.ai/?prompt=aurelis-infinite-gallery)
- [Jellyfish Scroll](https://motionsites.ai/?prompt=driftlab-hero) ★
- [Michelle 3D portfolio](https://motionsites.ai/?prompt=michelle-3d-portfolio)
- [Obsidian](https://motionsites.ai/?prompt=obsidian)
- [Orbit Sphere](https://motionsites.ai/?prompt=orbit-sphere)
- [Orbit Stickers](https://motionsites.ai/?prompt=orbit-stickers)
- [Peculiar Atelier](https://motionsites.ai/?prompt=peculiar-atelier) ★
- [Pixel Garden](https://motionsites.ai/?prompt=pixel-garden) ★
- [Runway Lookbook](https://motionsites.ai/?prompt=vell-lookbook) ★
- [Saffron Field](https://motionsites.ai/?prompt=saffron-field)
- [Scroll Landing Page](https://motionsites.ai/?prompt=scroll-landing)
- [Solar Fog](https://motionsites.ai/?prompt=lumen-roof-hero) ★
- [Spider Web](https://motionsites.ai/?prompt=found-spider) ★
- [Stridr](https://motionsites.ai/?prompt=stridr)
- [SynapticForge](https://motionsites.ai/?prompt=synapticforge)

### Travel (17)

- [AI Trip Planner](https://motionsites.ai/?prompt=ai-trip-planner) ★
- [Frostbound](https://motionsites.ai/?prompt=frostbound)
- [Halvøy Nordic Cabin Site](https://motionsites.ai/?prompt=halvoy-fjord-hero)
- [Mars Trips](https://motionsites.ai/?prompt=redline-mars-hero) ★
- [Mostar Guide](https://motionsites.ai/?prompt=mostar-guide) ★
- [Mountain Retreat](https://motionsites.ai/?prompt=mountain-retreat)
- [Pirate Ship](https://motionsites.ai/?prompt=saltwake-pirate-hero) ★
- [Place Saver](https://motionsites.ai/?prompt=place-saver) ★
- [Places Organizer](https://motionsites.ai/?prompt=places-organizer)
- [Tana Elephant](https://motionsites.ai/?prompt=tana-elephant-sections) ★
- [Travel Explorer](https://motionsites.ai/?prompt=travel-explorer)
- [Travel Journal](https://motionsites.ai/?prompt=travel-journal) ★
- [Wander Far](https://motionsites.ai/?prompt=wander-far) ★
- [Wanderful Hero](https://motionsites.ai/?prompt=wanderful-hero) ★
- [Way Farer](https://motionsites.ai/?prompt=way-farer)
- [Wild Pil](https://motionsites.ai/?prompt=wild-pill-hero) ★
- [yondering. Hero](https://motionsites.ai/?prompt=yondering-hero)

### Ecommerce (16)

- [Balloon Drop](https://motionsites.ai/?prompt=balloon-drop) ★
- [Clothing Rail](https://motionsites.ai/?prompt=clothing-rail) ★
- [Daisy Shop](https://motionsites.ai/?prompt=shop)
- [Fine Jewelry Shop](https://motionsites.ai/?prompt=fine-jewelry-shop)
- [Futuristic Eyewear](https://motionsites.ai/?prompt=futuristic-eyewear)
- [Halo Sound](https://motionsites.ai/?prompt=halo-sound)
- [Jewelry Store](https://motionsites.ai/?prompt=jewelry-store)
- [Look Circle](https://motionsites.ai/?prompt=look-circle) ★
- [Outfit Carousel](https://motionsites.ai/?prompt=outfit-carousel) ★
- [Outfit Drop](https://motionsites.ai/?prompt=outfit-drop) ★
- [OYLA](https://motionsites.ai/?prompt=oyla)
- [Performance Eyewear](https://motionsites.ai/?prompt=performance-eyewear)
- [Runway Look](https://motionsites.ai/?prompt=runway-look) ★
- [Style Studio](https://motionsites.ai/?prompt=style-studio) ★
- [Vertex](https://motionsites.ai/?prompt=vertex) ★
- [Virtual Fitting](https://motionsites.ai/?prompt=virtual-fitting) ★

### Fintech (15)

- [Aurex Finance](https://motionsites.ai/?prompt=aurex-finance) ★
- [Cobalt Hour](https://motionsites.ai/?prompt=cobalt-hour) ★
- [Crypto Vault](https://motionsites.ai/?prompt=crypto-vault)
- [Crystal Scroll](https://motionsites.ai/?prompt=crystal-scroll)
- [Crystal Scroll](https://motionsites.ai/?prompt=crystal-scroll-v2)
- [Evergreen Finance](https://motionsites.ai/?prompt=evergreen-finance)
- [Finance Assistant](https://motionsites.ai/?prompt=finance-assistant)
- [FinFlow](https://motionsites.ai/?prompt=finflow)
- [Glint](https://motionsites.ai/?prompt=glint)
- [Pulse](https://motionsites.ai/?prompt=pulse)
- [Remit Race](https://motionsites.ai/?prompt=remit-race)
- [Sellix](https://motionsites.ai/?prompt=sellix) ★
- [Vexor CTA](https://motionsites.ai/?prompt=vexor-cta) ★
- [Wealth Video Hero](https://motionsites.ai/?prompt=0)
- [Wealthcore](https://motionsites.ai/?prompt=wealthcore)

### Fashion (14)

- [Bag Slots](https://motionsites.ai/?prompt=bag-slots) ★
- [Cloud Kicks](https://motionsites.ai/?prompt=cloud-kicks)
- [Editorial Eyewear](https://motionsites.ai/?prompt=editorial-eyewear)
- [Fashion Lookbook](https://motionsites.ai/?prompt=fashion-lookbook) ★
- [Fox Couture](https://motionsites.ai/?prompt=fox-couture) ★
- [Future Fashion](https://motionsites.ai/?prompt=future-fashion) ★
- [Main Character](https://motionsites.ai/?prompt=main-character) ★
- [MAREN Hero](https://motionsites.ai/?prompt=maren-hero) ★
- [Orla Fashion](https://motionsites.ai/?prompt=orla-fashion)
- [Outdoor Apparel](https://motionsites.ai/?prompt=outdoor-apparel)
- [Outfit Receipt](https://motionsites.ai/?prompt=outfit-receipt)
- [Sale Ring](https://motionsites.ai/?prompt=sale-ring)
- [Spin Product](https://motionsites.ai/?prompt=spin-product) ★
- [Synth Mode](https://motionsites.ai/?prompt=synth-mode) ★

### Footer (14)

- [Ember Studio](https://motionsites.ai/?prompt=ember-studio)
- [Heritage Grove](https://motionsites.ai/?prompt=heritage-grove) ★
- [Koru Tech Footer](https://motionsites.ai/?prompt=koru-tech-footer) ★
- [Mistveil](https://motionsites.ai/?prompt=mistveil)
- [Nietzsche sustainibilty](https://motionsites.ai/?prompt=nietzsche-sustainibilty)
- [NimbusOS Footer](https://motionsites.ai/?prompt=nimbusos-footer) ★
- [NOX Grid](https://motionsites.ai/?prompt=nox-grid)
- [Offline](https://motionsites.ai/?prompt=offline-footer) ★
- [ORRIS Footer](https://motionsites.ai/?prompt=orris-footer)
- [Shipcraft Footer](https://motionsites.ai/?prompt=shipcraft-footer) ★
- [Stark Minimal Footer](https://motionsites.ai/?prompt=stark-minimal-footer) ★
- [Tide Footer](https://motionsites.ai/?prompt=tide-engraving-footer)
- [Vantix Footer](https://motionsites.ai/?prompt=vantix-footer) ★
- [Wayfinder](https://motionsites.ai/?prompt=wayfinder) ★

### Features (11)

- [Capabilities](https://motionsites.ai/?prompt=capabilities) ★
- [Capabilities Overview](https://motionsites.ai/?prompt=features)
- [Gridcore](https://motionsites.ai/?prompt=gridcore)
- [Interior Features](https://motionsites.ai/?prompt=interior-features)
- [LaunchEx Submissions](https://motionsites.ai/?prompt=launchex-submissions)
- [Liquid Glass Features](https://motionsites.ai/?prompt=liquid-glass-features)
- [Max Reed Portfolio](https://motionsites.ai/?prompt=max-reed-portfolio) ★
- [NexaCore Control](https://motionsites.ai/?prompt=nexacore-control) ★
- [NexaCore Results](https://motionsites.ai/?prompt=nexacore-results) ★
- [Nike Hover](https://motionsites.ai/?prompt=nike-hover) ★
- [Vela Ul](https://motionsites.ai/?prompt=vela-ul) ★

### Technology (10)

- [Augmented Sight](https://motionsites.ai/?prompt=augmented-sight)
- [Cyber Ronin](https://motionsites.ai/?prompt=cyber-ronin) ★
- [Geno Trace](https://motionsites.ai/?prompt=geno-trace)
- [Innovation Lab](https://motionsites.ai/?prompt=innovation-lab) ★
- [Intelligence Layer](https://motionsites.ai/?prompt=intelligence-layer) ★
- [NEX Robotics](https://motionsites.ai/?prompt=nex-robotics)
- [React Vision](https://motionsites.ai/?prompt=react-vision)
- [Signal ID](https://motionsites.ai/?prompt=signal-id) ★
- [Silent Velocity](https://motionsites.ai/?prompt=silent-velocity)
- [Spectrum Grid](https://motionsites.ai/?prompt=spectrum-grid)

### Wellness (9)

- [Breathstone](https://motionsites.ai/?prompt=breathstone)
- [Celestial Renewal](https://motionsites.ai/?prompt=celestial-renewal) ★
- [Fitness Dashboard](https://motionsites.ai/?prompt=fitness-dashboard)
- [Mindful Companion](https://motionsites.ai/?prompt=mindful-companion)
- [Mindora](https://motionsites.ai/?prompt=mindora)
- [Mood Tracker](https://motionsites.ai/?prompt=mood-tracker)
- [Nature Ritual](https://motionsites.ai/?prompt=nature-ritual)
- [Routine Coach](https://motionsites.ai/?prompt=routine-coach)
- [Wellness Companion](https://motionsites.ai/?prompt=wellness-companion) ★

### CTA (8)

- [Editorial Collection CTA](https://motionsites.ai/?prompt=editorial-collection-cta)
- [FAQ CTA](https://motionsites.ai/?prompt=faq-cta) ★
- [Global CTA Footer](https://motionsites.ai/?prompt=global-cta-footer)
- [Liquid Glass CTA](https://motionsites.ai/?prompt=liquid-glass-cta) ★
- [Mouse Trail CTA](https://motionsites.ai/?prompt=mouse-trail-cta)
- [Nimbus Ops](https://motionsites.ai/?prompt=nimbus-ops)
- [Orbis CTA](https://motionsites.ai/?prompt=orbis-cta)
- [Rocket CTA](https://motionsites.ai/?prompt=rocket-cta) ★

### Pricing (7)

- [3D Studio Pricing](https://motionsites.ai/?prompt=3d-studio-pricing)
- [Nex Max Upgrade](https://motionsites.ai/?prompt=nex-max-upgrade)
- [NimBus Pricing](https://motionsites.ai/?prompt=nimbus-pricing)
- [Rocket Pricing](https://motionsites.ai/?prompt=rocket-pricing) ★
- [SaaS Pricing Flow](https://motionsites.ai/?prompt=saas-pricing-flow)
- [Smart Pricing](https://motionsites.ai/?prompt=smart-pricing)
- [What Package Fits You](https://motionsites.ai/?prompt=package-fits-pricing)

### About (6)

- [Axion About](https://motionsites.ai/?prompt=axion-about) ★
- [Botanical Shadow About](https://motionsites.ai/?prompt=botanical-shadow-about)
- [LaunchEx About](https://motionsites.ai/?prompt=launchex-about) ★
- [Orbis Hello](https://motionsites.ai/?prompt=orbis-hello) ★
- [Portfolio About](https://motionsites.ai/?prompt=portfolio-about) ★
- [Tech-Noir About](https://motionsites.ai/?prompt=tech-noir-about) ★

### Healthcare (6)

- [Aesthetic Dental Clinic](https://motionsites.ai/?prompt=aesthetic-dental-clinic)
- [Dental Implant Clinic](https://motionsites.ai/?prompt=dental-implant-clinic)
- [Genovera](https://motionsites.ai/?prompt=genovera)
- [KnowSugar](https://motionsites.ai/?prompt=knowsugar)
- [Modern Dental Clinic](https://motionsites.ai/?prompt=modern-dental-clinic)
- [Pet Diagnostics](https://motionsites.ai/?prompt=pet-diagnostics) ★

### Footer Section (5)

- [HAUL!](https://motionsites.ai/?prompt=haul-footer) ★
- [Kresna Footer](https://motionsites.ai/?prompt=kresna-footer) ★
- [Lumina](https://motionsites.ai/?prompt=lumina-footer) ★
- [Vize Footer](https://motionsites.ai/?prompt=vize-footer) ★
- [Zenith Footer](https://motionsites.ai/?prompt=zenith-footer)

### Cards (5)

- [Cognitra Offer](https://motionsites.ai/?prompt=cognitra-offer)
- [Nimbus Security](https://motionsites.ai/?prompt=nimbus-security)
- [Nimbus Sticky Cards](https://motionsites.ai/?prompt=nimbus-sticky-cards)
- [Orbis Cards](https://motionsites.ai/?prompt=orbis-cards)
- [Veloce Cards](https://motionsites.ai/?prompt=veloce-cards)

### Cybersecurity (5)

- [Cyber Layer](https://motionsites.ai/?prompt=cyber-layer) ★
- [Imperial VPN](https://motionsites.ai/?prompt=imperial-vpn)
- [Sentinel](https://motionsites.ai/?prompt=sentinel)
- [VeilGuard CTA](https://motionsites.ai/?prompt=veilguard-cta) ★
- [Velaris](https://motionsites.ai/?prompt=velaris)

### Real Estate (4)

- [3D Property](https://motionsites.ai/?prompt=3d-property)
- [Coastal Estate](https://motionsites.ai/?prompt=coastal-estate)
- [Floor Picker](https://motionsites.ai/?prompt=floor-picker)
- [Sky Estate](https://motionsites.ai/?prompt=sky-estate)

### Features Section (4)

- [Benefits Features](https://motionsites.ai/?prompt=benefits-features)
- [Glow Features](https://motionsites.ai/?prompt=glow-features) ★
- [Keep Ahead Features](https://motionsites.ai/?prompt=keep-ahead-features)
- [Nexora Features](https://motionsites.ai/?prompt=nexora-features)

### Finance (4)

- [Frontier](https://motionsites.ai/?prompt=frontier)
- [Relocation Card](https://motionsites.ai/?prompt=relocation-card)
- [TrustFlow](https://motionsites.ai/?prompt=trustflow) ★
- [Venture Fund](https://motionsites.ai/?prompt=venture-fund) ★

### 404 (3)

- [404 Planet](https://motionsites.ai/?prompt=404-planet) ★
- [Nexto 404](https://motionsites.ai/?prompt=404) ★
- [Skybridge 404](https://motionsites.ai/?prompt=skybridge-404) ★

### Social Media (3)

- [Digital Reality](https://motionsites.ai/?prompt=digital-reality-hero)
- [Social Media Posts](https://motionsites.ai/?prompt=social-media-posts-hero)
- [Velorah Focus](https://motionsites.ai/?prompt=velorah-focus-hero)

### Web3 (3)

- [Humanoid Flow](https://motionsites.ai/?prompt=humanoid-flow)
- [Orbit Web3](https://motionsites.ai/?prompt=orbit-web3-hero)
- [Web3 EOS Hero](https://motionsites.ai/?prompt=9)

### Health (3)

- [AI Calorie Tracker](https://motionsites.ai/?prompt=ai-calorie-tracker)
- [Supplement Shop](https://motionsites.ai/?prompt=supplement-shop)
- [Wellness Devicex](https://motionsites.ai/?prompt=wellness-device) ★

### Crypto (3)

- [Bitcoin Yield](https://motionsites.ai/?prompt=bitcoin-yield)
- [Vaultline](https://motionsites.ai/?prompt=vaultline)
- [Vela Terms Hero](https://motionsites.ai/?prompt=vela-terms-hero) ★

### Music (3)

- [Album App](https://motionsites.ai/?prompt=album-release)
- [Album Flow](https://motionsites.ai/?prompt=album-flow) ★
- [Vinyl](https://motionsites.ai/?prompt=vinyl) ★

### Sports (3)

- [Athlete Profile](https://motionsites.ai/?prompt=athlete-profile)
- [F1 Driver Profile](https://motionsites.ai/?prompt=f1-driver-profile)
- [Footballer Portfolio](https://motionsites.ai/?prompt=footballer-portfolio)

### Community (3)

- [Creator Guild](https://motionsites.ai/?prompt=creator-guild)
- [Kindred Dot Hands Hero](https://motionsites.ai/?prompt=kindred-dots-hero) ★
- [Verra Events Hero](https://motionsites.ai/?prompt=verra-events-hero) ★

### Login Page (3)

- [Cutora](https://motionsites.ai/?prompt=cutora) ★
- [Teeshift Login](https://motionsites.ai/?prompt=teeshift-login)
- [Vertex3D Login](https://motionsites.ai/?prompt=vertex3d-login) ★

### Logistics (3)

- [Freight Command](https://motionsites.ai/?prompt=freight-command)
- [Freight Scroll Hero](https://motionsites.ai/?prompt=freight-scroll-hero) ★
- [Freight Services Hero](https://motionsites.ai/?prompt=freight-services-hero) ★

### Services (2)

- [Agency Services](https://motionsites.ai/?prompt=agency-services)
- [Arceage Services](https://motionsites.ai/?prompt=arceage-services)

### Benefits (2)

- [Guardnet Benefits](https://motionsites.ai/?prompt=guardnet-benefits) ★
- [Kova Features](https://motionsites.ai/?prompt=kova-features)

### Tabs (2)

- [Glassmorphic Feature Tabs](https://motionsites.ai/?prompt=glassmorphic-feature-tabs)
- [Technical Specifications](https://motionsites.ai/?prompt=technical-specifications)

### Slider (2)

- [Feedback Slider](https://motionsites.ai/?prompt=feedback-slider)
- [Media Card Carousel](https://motionsites.ai/?prompt=media-card-carousel)

### Automotive (2)

- [Car Atelier](https://motionsites.ai/?prompt=car-atelier)
- [New Era Automotive Hero](https://motionsites.ai/?prompt=8)

### Transportation (2)

- [CARGOX Mobile](https://motionsites.ai/?prompt=cargox-mobile)
- [Cross-Border](https://motionsites.ai/?prompt=cross-border) ★

### Ecommerce App (2)

- [Gear Shop](https://motionsites.ai/?prompt=gear-shop)
- [Pet Products](https://motionsites.ai/?prompt=pet-products)

### E-commerce (2)

- [Backpack Hero](https://motionsites.ai/?prompt=scree-backpack-hero)
- [Luxury Focus](https://motionsites.ai/?prompt=luxury-focus)

### Entertainment (2)

- [Film Discs](https://motionsites.ai/?prompt=film-discs)
- [Movie Premiere](https://motionsites.ai/?prompt=movie-premiere)

### Developer (2)

- [Codeveil](https://motionsites.ai/?prompt=codeveil)
- [Shipping Infrastructure](https://motionsites.ai/?prompt=shipping-infrastructure)

### Education (2)

- [Adaptive Learning](https://motionsites.ai/?prompt=adaptive-learning)
- [LearnHub](https://motionsites.ai/?prompt=skills-lea)

### Testimonials (2)

- [Arceage Testimonial](https://motionsites.ai/?prompt=arceage-testimonial)
- [Radial Diagram](https://motionsites.ai/?prompt=radial-diagram) ★

### Landing page (2)

- [Email Landing Page](https://motionsites.ai/?prompt=email-landing-page) ★
- [Gateway Portal](https://motionsites.ai/?prompt=gateway-portal)

### Component (2)

- [Animated Cards](https://motionsites.ai/?prompt=animated-cards) ★
- [Loader Animation](https://motionsites.ai/?prompt=18)

### 3D Website (2)

- [3D Collectible Hero](https://motionsites.ai/?prompt=3d-collectible-hero) ★
- [Pulse 3D](https://motionsites.ai/?prompt=pulse-3d)

### Dashboard (2)

- [Axle Journey](https://motionsites.ai/?prompt=axle-journey)
- [Dashboard UI](https://motionsites.ai/?prompt=dashboard)

### Product (2)

- [Daisy Sweet](https://motionsites.ai/?prompt=daisy-sweet)
- [Daisy Wild](https://motionsites.ai/?prompt=daisy-wild) ★

### Agency Website (2)

- [Product Studio](https://motionsites.ai/?prompt=product-studio)
- [Remote Dev Collective](https://motionsites.ai/?prompt=remote-dev-collective)

### Art (2)

- [Atrium MTL](https://motionsites.ai/?prompt=atrium-mtl) ★
- [Form Study](https://motionsites.ai/?prompt=form-study)

### Lifestyle (2)

- [Sea Serenade](https://motionsites.ai/?prompt=sea-serenade)
- [Tokyo Nocturne](https://motionsites.ai/?prompt=tokyo-nocturne)

### Analytics (2)

- [3D Bloom Layer](https://motionsites.ai/?prompt=3d-bloom-layer)
- [Data Signal](https://motionsites.ai/?prompt=data-signal) ★

### AI Assistant (2)

- [DeepThink](https://motionsites.ai/?prompt=deepthink) ★
- [Iris Assistant](https://motionsites.ai/?prompt=iris-assistant) ★

### Security (2)

- [AI Cyber Defense](https://motionsites.ai/?prompt=ai-cyber-defense)
- [Angel Shield](https://motionsites.ai/?prompt=angel-shield)

### Creative Studio (2)

- [Pixel Muse](https://motionsites.ai/?prompt=pixel-muse)
- [TOKA](https://motionsites.ai/?prompt=toka-hero)

### Editorial (2)

- [Vectrus Energy](https://motionsites.ai/?prompt=vectrus-energy) ★
- [Velia](https://motionsites.ai/?prompt=velia) ★

### Space (2)

- [Celestix](https://motionsites.ai/?prompt=celestix)
- [Nebula Hero](https://motionsites.ai/?prompt=nebula-hero) ★

### Architecture (2)

- [Building Atlas](https://motionsites.ai/?prompt=building-atlas) ★
- [Monolith Hero](https://motionsites.ai/?prompt=monolith-hero) ★

### Robotics (2)

- [Future Machine](https://motionsites.ai/?prompt=future-machine) ★
- [Verkos Robotics](https://motionsites.ai/?prompt=verkos-robotics)

### Tech (2)

- [Riverine](https://motionsites.ai/?prompt=riverine) ★
- [Terrena](https://motionsites.ai/?prompt=terrena)

### Design (2)

- [Custom Spaces](https://motionsites.ai/?prompt=custom-spaces) ★
- [Go On, White](https://motionsites.ai/?prompt=go-on-white)

### 3D Character (2)

- [Agehana](https://motionsites.ai/?prompt=agehana)
- [Lumora Skyranger](https://motionsites.ai/?prompt=lumora-skyranger) ★

### Finance App (2)

- [Ledgely](https://motionsites.ai/?prompt=ledgely)
- [Moxly](https://motionsites.ai/?prompt=moxly-hero)

### Hover (2)

- [Good Fox Hover](https://motionsites.ai/?prompt=good-fox-hover)
- [Ink Reveal](https://motionsites.ai/?prompt=ink-reveal)

### Motion Design (2)

- [FinSmith](https://motionsites.ai/?prompt=finsmith)
- [Kinova](https://motionsites.ai/?prompt=kinova)

### Publishing (2)

- [Book Shelf](https://motionsites.ai/?prompt=book-shelf)
- [Storybook](https://motionsites.ai/?prompt=storybook) ★

### Interactive 3D (1)

- [Shadow 3D](https://motionsites.ai/?prompt=shadow-3d)

### Waitlist (1)

- [No-Code Waitlist](https://motionsites.ai/?prompt=no-code-waitlist) ★

### Marquee (1)

- [Scroll Marquee](https://motionsites.ai/?prompt=scroll-marquee)

### landing page (1)

- [Mythic Naturecore](https://motionsites.ai/?prompt=mythic-naturecore)

### Investor Presentations (1)

- [Investor Deck](https://motionsites.ai/?prompt=deck-investor)

### Info (1)

- [Guardnet Demo](https://motionsites.ai/?prompt=guardnet-demo)

### Books (1)

- [Reading Library](https://motionsites.ai/?prompt=reading-library)

### Testimonial (1)

- [Kova Testimonial](https://motionsites.ai/?prompt=kova-testimonial)

### CTA Section (1)

- [Community CTA](https://motionsites.ai/?prompt=community-cta)

### FAQ (1)

- [Rocket FAQ](https://motionsites.ai/?prompt=rocket-faq)

### Process (1)

- [NexaCore Process](https://motionsites.ai/?prompt=nexacore-process)

### HR Management (1)

- [Modern HR Dashboard](https://motionsites.ai/?prompt=modern-hr-dashboard)

### Education Website (1)

- [Fun 404 Page](https://motionsites.ai/?prompt=fun-404-page) ★

### Dashboard Demo (1)

- [Nimbus Demo](https://motionsites.ai/?prompt=nimbus-demo)

### Presentation (1)

- [Pro AI Deck](https://motionsites.ai/?prompt=pro-ai-deck)

### Projects (1)

- [Projects Catalog](https://motionsites.ai/?prompt=projects-catalog)

### Blog (1)

- [Blog Showcase](https://motionsites.ai/?prompt=blog-showcase) ★

### Carousal (1)

- [FlowMate Carousal](https://motionsites.ai/?prompt=flowmate-carousal)

### VPN (1)

- [Mythic VPN](https://motionsites.ai/?prompt=mythic-vpn)

### Case Studies (1)

- [Pixel Grid Hover](https://motionsites.ai/?prompt=pixel-grid-hover) ★

### Productivity (1)

- [Nexar](https://motionsites.ai/?prompt=nexar-hero)

### Categories (1)

- [Beauty Categories](https://motionsites.ai/?prompt=beauty-categories) ★

### Mindfulness (1)

- [Inner Quest](https://motionsites.ai/?prompt=inner-quest)

### Accordion (1)

- [Apex Program Accordion](https://motionsites.ai/?prompt=apex-program-accordion)

### Sign Up (1)

- [Aurora Onboard](https://motionsites.ai/?prompt=aurora-onboard) ★

### Sign In Form (1)

- [Solace sign-in](https://motionsites.ai/?prompt=solace-sign-in)

### Developer Platform (1)

- [Model Infrastructure](https://motionsites.ai/?prompt=model-infrastructure)

### Contact us (1)

- [Build With Us](https://motionsites.ai/?prompt=build-with-us) ★

### SaaS Website (1)

- [Lending AI Agents](https://motionsites.ai/?prompt=lending-ai-agents)

### Why Us (1)

- [Halo Benefits](https://motionsites.ai/?prompt=halo-benefits)

### Use Case (1)

- [Halo Use Case](https://motionsites.ai/?prompt=halo-use-case) ★

### Mobile App (1)

- [Innovation Summit](https://motionsites.ai/?prompt=innovation-summit)

### Travel App (1)

- [Luxury Escapes](https://motionsites.ai/?prompt=luxury-escapes)

### Booking (1)

- [Lodge Booking App](https://motionsites.ai/?prompt=lodge-booking-app)

### Signup (1)

- [NovaDesk Signup](https://motionsites.ai/?prompt=novadesk-signup)

### AI App (1)

- [AI Assistant App](https://motionsites.ai/?prompt=ai-assistant-app)

### Statistics App (1)

- [F1 Racing Hub](https://motionsites.ai/?prompt=f1-racing-hub) ★

### AI Data (1)

- [Strata AI](https://motionsites.ai/?prompt=strata-ai) ★

### Learning SaaS (1)

- [Live Language Classes](https://motionsites.ai/?prompt=live-language-classes)

### Medicine (1)

- [Mind-Body Healing](https://motionsites.ai/?prompt=mind-body-healing) ★

### Health App (1)

- [Dental Care App](https://motionsites.ai/?prompt=dental-care-app)

### AI SaaS Website (1)

- [AI Driving Assistant](https://motionsites.ai/?prompt=ai-driving-assistant)

### AI / SaaS (1)

- [AI Automation Hero](https://motionsites.ai/?prompt=10)

### Church (1)

- [Church Community](https://motionsites.ai/?prompt=church-community) ★

### Form (1)

- [Arceage Contact Us](https://motionsites.ai/?prompt=arceage-contact-us)

### Bento (1)

- [Bento Grid Stats](https://motionsites.ai/?prompt=bento-grid-stats)

### Products (1)

- [Beauty Products](https://motionsites.ai/?prompt=beauty-products)

### Stats (1)

- [Arceage Stats](https://motionsites.ai/?prompt=arceage-stats) ★

### Feature (1)

- [Cognitra Feature](https://motionsites.ai/?prompt=cognitra-feature) ★

### Loyalty App (1)

- [Coffee Rewards](https://motionsites.ai/?prompt=coffee-rewards) ★

### Email Marketing (1)

- [Email Marketing](https://motionsites.ai/?prompt=design-rocket-email-hero) ★

### Learning (1)

- [Bite-Sized Courses](https://motionsites.ai/?prompt=bite-sized-courses)

### App (1)

- [ADHD Planner](https://motionsites.ai/?prompt=adhd-planner) ★

### Utility (1)

- [Forecast Center](https://motionsites.ai/?prompt=forecast-center) ★

### Driving (1)

- [Automotive AI](https://motionsites.ai/?prompt=automotive-ai)

### Sustainability (1)

- [CleanTech](https://motionsites.ai/?prompt=cleantech)

### Artificial Intelligence (1)

- [Deep Neural Interface](https://motionsites.ai/?prompt=deep-neural-interface)

### Website (1)

- [Neo Museum](https://motionsites.ai/?prompt=neo-museum) ★

### Data (1)

- [Spatial Mapping Platform](https://motionsites.ai/?prompt=spatial-mapping-platform)

### Game UI (1)

- [Robot Battle Arena](https://motionsites.ai/?prompt=robot-battle-arena)

### Events (1)

- [Sweet Question](https://motionsites.ai/?prompt=sweet-question)

### Culture (1)

- [Ink Dynasty](https://motionsites.ai/?prompt=ink-dynasty)

### Fitness (1)

- [Performance Run](https://motionsites.ai/?prompt=performance-run)

### Film (1)

- [Motion Frame](https://motionsites.ai/?prompt=motion-frame)

### Business (1)

- [Worldwide Hubs](https://motionsites.ai/?prompt=worldwide-hubs)

### Medical (1)

- [Cardia 3D](https://motionsites.ai/?prompt=cardia-3d)

### Food (1)

- [Sky Cookie](https://motionsites.ai/?prompt=sky-cookie)

### Sign in (1)

- [Real-Time Alerts](https://motionsites.ai/?prompt=real-time-alerts) ★

### Science (1)

- [Planetary Pulse](https://motionsites.ai/?prompt=planetary-pulse) ★

### Threejs (1)

- [Glass Orb](https://motionsites.ai/?prompt=glass-orb)

### AI Technology (1)

- [Ascera AI](https://motionsites.ai/?prompt=ascera-ai)

### threejs (1)

- [3D Future Flora](https://motionsites.ai/?prompt=3d-future-flora)

### Data Intelligence (1)

- [Quantum Core](https://motionsites.ai/?prompt=quantum-core) ★

### Construction (1)

- [BuildShield](https://motionsites.ai/?prompt=buildshield)

### Nature (1)

- [TerraVision](https://motionsites.ai/?prompt=terravision)

### Curated (1)

- [Rare Gallery](https://motionsites.ai/?prompt=rare-gallery) ★

### Recruitment (1)

- [Nexa Talent](https://motionsites.ai/?prompt=nexa-talent)

### Cyberpunk (1)

- [arc Summit](https://motionsites.ai/?prompt=arc-summit)

### Communication (1)

- [Global gateway](https://motionsites.ai/?prompt=global-gateway)

### Environmental (1)

- [TrueEarth](https://motionsites.ai/?prompt=trueearth) ★

### Social (1)

- [Digital Persona](https://motionsites.ai/?prompt=digital-persona)

### Creative Agency (1)

- [Playful Idea](https://motionsites.ai/?prompt=playful-idea) ★

### E-coommerce (1)

- [LTX Video](https://motionsites.ai/?prompt=ltx-video) ★

### Med (1)

- [Vitalis](https://motionsites.ai/?prompt=vitalis)

### Automative (1)

- [Veyra Electric](https://motionsites.ai/?prompt=veyra-electric) ★

### Manufacturing (1)

- [Cordex](https://motionsites.ai/?prompt=cordex) ★

### Model (1)

- [Sur(face)](https://motionsites.ai/?prompt=sur-face)

### Luxury (1)

- [Monolithic](https://motionsites.ai/?prompt=monolithic)

### Photography (1)

- [Nature Portfolio](https://motionsites.ai/?prompt=nature-portfolio) ★

### Draggable (1)

- [Lunar Carousel](https://motionsites.ai/?prompt=lunar-carousel)

### Motion (1)

- [ConSentinel](https://motionsites.ai/?prompt=nival-cyberspace) ★

### WebGL Portfolio (1)

- [Particle Field](https://motionsites.ai/?prompt=particle-field)

### Personal (1)

- [Nival Cyberspace](https://motionsites.ai/?prompt=consentinel) ★

### Cars (1)

- [Avelon Drive](https://motionsites.ai/?prompt=avelon-drive)

### Navbar (1)

- [Atlas Nav](https://motionsites.ai/?prompt=atlas-nav) ★

### Reveal (1)

- [Kairo Studio](https://motionsites.ai/?prompt=kairo-studio)

### Supply (1)

- [Logistics Freight](https://motionsites.ai/?prompt=logistics-freight) ★

### AI Creative (1)

- [Nouver](https://motionsites.ai/?prompt=nouver)

### Game Menu (1)

- [Inknomad](https://motionsites.ai/?prompt=inknomad)

### 3D Interactive (1)

- [Moss Valley](https://motionsites.ai/?prompt=moss-valley)

### Game (1)

- [Roadster](https://motionsites.ai/?prompt=roadster)

### AI Builder (1)

- [RidgeAI](https://motionsites.ai/?prompt=ridgeai) ★

### Authentication (1)

- [Keylight](https://motionsites.ai/?prompt=keylight) ★

### Ski Gear (1)

- [KAIRN](https://motionsites.ai/?prompt=kairn) ★

### Portfolio Builder (1)

- [Eclipsio](https://motionsites.ai/?prompt=eclipsio) ★

### Kids Show (1)

- [Meadowbell](https://motionsites.ai/?prompt=meadowbell) ★

### 3D Viewer (1)

- [Abyss Atlas](https://motionsites.ai/?prompt=abyss-atlas)

### Podcast (1)

- [murmur](https://motionsites.ai/?prompt=murmur) ★

### Healthcare AI (1)

- [Corvana AI](https://motionsites.ai/?prompt=corvana-ai) ★

### AI Course (1)

- [Skyprompt](https://motionsites.ai/?prompt=skyprompt) ★

### Creator Platform (1)

- [Reelmark](https://motionsites.ai/?prompt=reelmark-v2) ★

### Onboarding (1)

- [Gridwork Co](https://motionsites.ai/?prompt=gridwork-co) ★

### Hiking App (1)

- [Lauberhorn Ridge](https://motionsites.ai/?prompt=lauberhorn-ridge) ★

### Scroll-Driven 3D (1)

- [Particle Self](https://motionsites.ai/?prompt=particle-self)

### Interactive Map (1)

- [Halden Stories](https://motionsites.ai/?prompt=halden-stories) ★

### FAQ Page (1)

- [ZENTRADE FAQ](https://motionsites.ai/?prompt=zentrade-faq) ★

### Rental Landing (1)

- [Find Your Stay](https://motionsites.ai/?prompt=find-your-stay)

### Travel Fintech (1)

- [Rovin Footer](https://motionsites.ai/?prompt=rovin-footer) ★

### AI SaaS (1)

- [Synthora Hero](https://motionsites.ai/?prompt=synthora-hero) ★

### Mental Health (1)

- [Mindora Hero](https://motionsites.ai/?prompt=mindora-hero) ★

### Affiliate (1)

- [ON&ON Partners Hero](https://motionsites.ai/?prompt=onon-partners-hero)

### Fintech Landing (1)

- [nuvo](https://motionsites.ai/?prompt=nuvo-landing) ★

### Investment (1)

- [Seed Ark](https://motionsites.ai/?prompt=seed-ark-hero)

### Legal Studio (1)

- [MK Consulting](https://motionsites.ai/?prompt=mk-consulting-hero) ★

### Agency Hero (1)

- [Vexa Studio](https://motionsites.ai/?prompt=vexa-studio)

### AI Research (1)

- [Atlas Lab Features](https://motionsites.ai/?prompt=atlas-lab) ★

### Trading App (1)

- [Zapline](https://motionsites.ai/?prompt=zapline-cta) ★

### Fintech Hero (1)

- [zeno](https://motionsites.ai/?prompt=zeno-bank)

### Wearables (1)

- [Halora](https://motionsites.ai/?prompt=halora) ★

### AI Hero (1)

- [Vocari Hero](https://motionsites.ai/?prompt=vocari-hero) ★

### Crypto Hero (1)

- [Vaultra Hero](https://motionsites.ai/?prompt=vaultra-hero) ★

### Fintech CTA (1)

- [Fundora](https://motionsites.ai/?prompt=fundora)

### Signup Page (1)

- [Fintora Signup](https://motionsites.ai/?prompt=fintora-signup)

### 3D Portfolio (1)

- [Lena Varga Hero](https://motionsites.ai/?prompt=lena-varga-hero)

### AI Product (1)

- [StellarMind Hero](https://motionsites.ai/?prompt=stellarmind-hero)

### Staffing (1)

- [Norva Staffing Hero](https://motionsites.ai/?prompt=norva-staffing-hero) ★

### 3D Store (1)

- [Loops Virtual Store](https://motionsites.ai/?prompt=loops-virtual-store)

### History (1)

- [Oda Hero](https://motionsites.ai/?prompt=oda-nobunaga-hero) ★

### Halloween (1)

- [Hollowmere Halloween Descent](https://motionsites.ai/?prompt=hollowmere-halloween) ★

### Community App (1)

- [Social Hangouts](https://motionsites.ai/?prompt=social-hangouts)
