import cssgapaFachadaImg from '../assets/images/cssgapa_oficial_gate_1785470751978.jpg';

export interface Plan {
  id: number;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  ctaText: string;
}

export interface ClientProject {
  id: number;
  name: string;
  category: string;
  location: string;
  description: string;
  services: string[];
  results: string;
  image: string;
  websiteUrl: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const mockPlans: Plan[] = [
  {
    id: 1,
    name: "PLANO START WPress",
    price: 30,
    period: "mês",
    description: "Servidor Cloud robusto com AlmaLinux 9.6, processador Intel Xeon e memória DDR5. Inclui cPanel completo para gestão de e-mails, domínios e bancos de dados.",
    features: [
      "Sistema Operacional AlmaLinux 9.6",
      "Processador Intel Xeon Silver 2.20GHz",
      "60 GB Espaço em Disco NVMe Ultra Rápido",
      "Memória RAM DDR5 de alta velocidade",
      "Transferência Mensal Ilimitada",
      "Painel de Controle cPanel completo",
      "Bancos de Dados MySQL Ilimitados (phpMyAdmin)",
      "Contas de E-mail POP3/IMAP e Webmail",
      "Certificado SSL Let's Encrypt Gratuito",
      "Proteção Anti-SPAM CloudMark e SpamAssassin"
    ],
    popular: false,
    ctaText: "Contratar PLANO START"
  },
  {
    id: 2,
    name: "PLANO PLENO WPress",
    price: 60,
    period: "mês",
    description: "Ideal para empresas em crescimento. Infraestrutura Cloud no Brasil com processador Intel Xeon, memória DDR5, cPanel & WHM e e-mails ilimitados.",
    features: [
      "Sistema Operacional AlmaLinux 9.6",
      "Processador Intel Xeon Silver 2.20GHz",
      "120 GB Espaço em Disco NVMe Ultra Rápido",
      "Memória RAM DDR5 de alta velocidade",
      "Transferência Mensal Ilimitada",
      "Painel de Controle cPanel & WHM",
      "Bancos de Dados MySQL Ilimitados",
      "Contas de E-mail e Subdomínios Ilimitados",
      "Acesso SSH e Agendamento Cron",
      "Certificado SSL Let's Encrypt para todos os domínios",
      "PHP 8.0+, Python, Ruby on Rails, Perl e CGI"
    ],
    popular: true,
    ctaText: "Contratar PLANO PLENO (Mais Vendido)"
  },
  {
    id: 3,
    name: "PLANO MAIS WPress",
    price: 120,
    period: "mês",
    description: "Para grandes projetos, e-commerces e agências. Acesso total SSH, cPanel & WHM, Name Servers Privados, criador de sites e máxima capacidade NVMe.",
    features: [
      "Sistema Operacional AlmaLinux 9.6",
      "Processador Intel Xeon Silver 2.20GHz",
      "200 GB Espaço em Disco NVMe Ultra Rápido",
      "Memória RAM DDR5 de alta velocidade",
      "Transferência Mensal Ilimitada",
      "Painéis cPanel, WHM & WHMCS",
      "Name Servers Privados (DNS com seu próprio domínio)",
      "Bancos de Dados MySQL Ilimitados",
      "Contas de E-mail e Redirecionamentos Ilimitados",
      "Criador de Sites com licença válida",
      "Acesso SSH, Cron, Curl, ImageMagick e GD",
      "Suporte VIP 24/7 e Monitoramento 24h"
    ],
    popular: false,
    ctaText: "Contratar PLANO MAIS"
  }
];

export const mockClients: ClientProject[] = [
  {
    id: 1,
    name: "Essência Humana",
    category: "Site Institucional | WordPress",
    location: "Florianópolis, SC",
    description: "Desenvolvimento de site institutional com agendamento online de consultas para clínica de tratamentos terapêuticos e bem-estar em Florianópolis.",
    services: ["Criação de Site WordPress", "Integração de Agenda Online", "Otimização de Velocidade"],
    results: "+180% de agendamentos diretos pelo site e facilitação da gestão de atendimento para terapeutas.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?fm=webp&fit=crop&w=600&q=70",
    websiteUrl: "#"
  },
  {
    id: 2,
    name: "Produtora de Festas Freedom",
    category: "Site de Eventos | WordPress",
    location: "São José, SC",
    description: "Criação de site dinâmico para a renomada produtora de festas FREEDOM, com agenda integrada, galeria de fotos e blog histórico de depoimentos.",
    services: ["Desenvolvimento WordPress", "Galeria de Fotos Otimizada", "Gestão de Agenda de Eventos"],
    results: "+300% de acessos na semana de eventos e otimização total da velocidade de carga.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?fm=webp&fit=crop&w=600&q=70",
    websiteUrl: "#"
  },
  {
    id: 3,
    name: "Sindicato SIMA Alvorada",
    category: "Portal de Notícias | WordPress",
    location: "Alvorada, RS",
    description: "Portal de notícias e serviços para os Servidores Públicos da cidade de Alvorada. Desenvolvimento com foco em legibilidade, formulários digitais e facilidade de publicação.",
    services: ["Portal WordPress", "Gerenciamento de Conteúdo", "Área de Convênios"],
    results: "Suporta mais de 15 mil acessos de servidores ativos com tempo de carregamento inferior a 1.2 segundos.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?fm=webp&fit=crop&w=600&q=70",
    websiteUrl: "#"
  },
  {
    id: 4,
    name: "RN Com Digital",
    category: "Parceria Estratégica | Sites WordPress",
    location: "Porto Alegre, RS",
    description: "Parceria estratégica com Rogério Nolasco (RN Com Digital). Atuação conjunta no desenvolvimento de portfólios profissionais, portais institucionais e projetos web em WordPress com alta performance, segurança e otimização para SEO.",
    services: ["Desenvolvimento WordPress", "Projetos em Parceria", "Otimização & SEO"],
    results: "Desenvolvimento colaborativo de sites em WordPress entregues com máxima velocidade, UX intuitiva e estrutura pronta para conversão.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&fit=crop&w=600&q=70",
    websiteUrl: "https://rncomdigital.com.br/"
  },
  {
    id: 5,
    name: "SR Laboratórios",
    category: "Catálogo Online | WordPress",
    location: "Canoas, RS",
    description: "Website institucional e catálogo técnico de produtos para laboratórios, focado em facilidade de navegação e integração com canais tradicionais.",
    services: ["Desenvolvimento WordPress", "Estrutura de Catálogo Digital", "Hospedagem WP Pro"],
    results: "Navegação amigável por mais de 500 itens técnicos e aumento de 65% nos pedidos de orçamento diretos.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?fm=webp&fit=crop&w=600&q=70",
    websiteUrl: "#"
  },
  {
    id: 8,
    name: "VTE Tecnologia",
    category: "Catálogo de Produtos | WordPress",
    location: "Porto Alegre, RS",
    description: "Website moderno funcionando como catálogo de produtos eletrônicos próprios e fabricados sob demanda para parceiros e terceiros.",
    services: ["Desenvolvimento WordPress", "Catálogo de Produtos B2B", "SEO de Alta Performance"],
    results: "Ranqueamento orgânico de termos técnicos industriais trazendo leads qualificados diariamente.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?fm=webp&fit=crop&w=600&q=70",
    websiteUrl: "#"
  },
  {
    id: 9,
    name: "CSSGAPA",
    category: "Portal & Site Institucional | WordPress",
    location: "Canoas, RS",
    description: "Desenvolvimento do portal oficial do Centro Social e Esportivo dos Suboficiais e Sargentos da Guarnição de Aeronáutica de Canoas (CSSGAPA).",
    services: ["Desenvolvimento WordPress", "Portal Institucional", "Otimização & Segurança"],
    results: "Comunicação centralizada para associados e visitantes, com alta velocidade, segurança e fácil gestão de conteúdo.",
    image: cssgapaFachadaImg,
    websiteUrl: "https://cssgapa.com.br"
  }
];

export const mockFaqs: FaqItem[] = [
  {
    id: 1,
    question: "Onde ficam localizados os servidores da AGÊNCIA OZ?",
    answer: "Nossos servidores de alta performance estão localizados em data centers de primeira linha no Brasil (São Paulo) e nos Estados Unidos (Miami), garantindo a menor latência (ping rápido) e máxima velocidade para os usuários que acessam seu site de qualquer lugar do país.",
    category: "Hospedagem"
  },
  {
    id: 2,
    question: "A AGÊNCIA OZ faz a migração gratuita do meu site antigo?",
    answer: "Sim! Ao contratar qualquer plano de Hospedagem Cloud a partir do plano WP Pro, nossa equipe técnica cuida de toda a migração do seu site, e-mails e banco de dados sem cobrar nenhuma taxa adicional e sem deixar seu site fora do ar em nenhum momento.",
    category: "Hospedagem"
  },
  {
    id: 3,
    question: "O que é desenvolvimento sob medida em WordPress?",
    answer: "Desenvolvemos temas do absoluto zero, sem depender de templates pesados ou construtores de arrastar-e-soltar lentos. Isso garante que seu site seja leve, rápido, seguro e totalmente adaptado às necessidades de conversão e identidade visual exclusiva da sua marca.",
    category: "WordPress"
  },
  {
    id: 4,
    question: "Quanto tempo demora para ver os resultados do trabalho de SEO?",
    answer: "O SEO é uma estratégia de médio a longo prazo. Geralmente, as primeiras melhorias de ranqueamento local e correção técnica começam a dar resultados visíveis entre 60 e 90 dias. Resultados expressivos em palavras-chave altamente concorridas costumam consolidar-se entre 4 e 6 meses.",
    category: "SEO"
  },
  {
    id: 5,
    question: "Como funciona o suporte técnico da AGÊNCIA OZ?",
    answer: "Nosso suporte é humanizado e focado em soluções ágeis. Atendemos via WhatsApp comercial em horário comercial estendido, e via sistema de tickets / e-mail 24 horas por dia. Clientes do plano Enterprise contam também com canal de ligação direta de emergência.",
    category: "Geral"
  },
  {
    id: 6,
    question: "Os sites desenvolvidos pela OZ são responsivos?",
    answer: "Com certeza. 100% dos sites e landing pages criados pela AGÊNCIA OZ são projetados de forma mobile-first. Eles se adaptam perfeitamente a smartphones de qualquer tamanho de tela, tablets, notebooks e monitores de alta resolução.",
    category: "WordPress"
  }
];
