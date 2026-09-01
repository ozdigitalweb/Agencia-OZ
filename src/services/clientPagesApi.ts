import cssgapaFachadaImg from '../assets/images/cssgapa_oficial_gate_1785470751978.jpg';

export interface ClientPage {
  id: string;
  clientName: string;
  pageTitle: string;
  slug: string;
  category: 'Landing Page' | 'Portal & Site Institucional' | 'Hotsite' | 'E-commerce / Vitrine' | 'Parceria Estratégica / Portfólio' | 'Outro';
  segment: string;
  status: 'active' | 'draft' | 'maintenance';
  heroHeadline: string;
  heroSubheadline: string;
  ctaText: string;
  whatsappNumber?: string;
  featuredImage: string;
  clientNotes: string;
  hostingPlan?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'oz_gestor_client_pages_v2';

const INITIAL_CLIENT_PAGES: ClientPage[] = [
  {
    id: 'cp-cssgapa-01',
    clientName: 'CSSGAPA Canoas',
    pageTitle: 'Portal Oficial do Centro Social e Esportivo da Aeronáutica',
    slug: 'https://cssgapa.com.br',
    category: 'Portal & Site Institucional',
    segment: 'Aviação, Esporte & Lazer',
    status: 'active',
    heroHeadline: 'Seja um Associado CSSGAPA - Tradição e Lazer em Canoas/RS',
    heroSubheadline: 'Sede campestre e esportiva para Suboficiais e Sargentos da Guarnição de Aeronáutica de Canoas com piscinas, quadras e salões de festas.',
    ctaText: 'Seja um Associado - Clique Aqui',
    whatsappNumber: '5548991984678',
    featuredImage: cssgapaFachadaImg,
    clientNotes: 'Desenvolvido em WordPress com otimização SEO Local Canoas, SSL ativo e foto real da fachada oficial de acesso.',
    hostingPlan: 'VPS Cloud cPanel Dedicado',
    createdAt: '2026-07-28',
    updatedAt: '2026-07-30'
  },
  {
    id: 'cp-rncom-02',
    clientName: 'RN Com Digital (Rogério Nolasco)',
    pageTitle: 'Parceria Estratégica em Sites WordPress',
    slug: 'https://rncomdigital.com.br/',
    category: 'Parceria Estratégica / Portfólio',
    segment: 'Marketing & Mídia Digital (Porto Alegre/RS)',
    status: 'active',
    heroHeadline: 'Projetos Web de Alta Performance em Parceria Estratégica',
    heroSubheadline: 'Desenvolvimento colaborativo de sites corporativos em WordPress entregues com UX intuitiva, SEO avançado e velocidade máxima.',
    ctaText: 'Ver Projetos no Ar',
    whatsappNumber: '5548991984678',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&fit=crop&w=600&q=70',
    clientNotes: 'Parceria com Rogério Nolasco em Porto Alegre/RS para desenvolvimento conjunto de portfólios e portai WordPress.',
    hostingPlan: 'Hospedagem Gerenciada WordPress',
    createdAt: '2026-07-25',
    updatedAt: '2026-07-30'
  },
  {
    id: 'cp-vte-03',
    clientName: 'VTE Tecnologia',
    pageTitle: 'Engenharia de Software & Soluções em TI',
    slug: 'https://www.vtetecnologia.com.br',
    category: 'Portal & Site Institucional',
    segment: 'Tecnologia & Software',
    status: 'active',
    heroHeadline: 'Sistemas Corporativos e Soluções Tecnológicas Confiáveis',
    heroSubheadline: 'Desenvolvimento de alta complexidade com infraestrutura em nuvem e foco em segurança digital.',
    ctaText: 'Conhecer Soluções VTE',
    whatsappNumber: '5548991984678',
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?fm=webp&fit=crop&w=600&q=70',
    clientNotes: 'Sustentação técnica de servidores Cloud VPS e otimização contínua de segurança.',
    hostingPlan: 'Cloud VPS cPanel Dedicated',
    createdAt: '2026-06-15',
    updatedAt: '2026-07-20'
  }
];

export const clientPagesApi = {
  getClientPages(): ClientPage[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CLIENT_PAGES));
        return INITIAL_CLIENT_PAGES;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to load client pages from localStorage:', e);
      return INITIAL_CLIENT_PAGES;
    }
  },

  saveClientPages(pages: ClientPage[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    } catch (e) {
      console.error('Failed to save client pages to localStorage:', e);
    }
  },

  addClientPage(page: Omit<ClientPage, 'id' | 'createdAt' | 'updatedAt'>): ClientPage {
    const pages = this.getClientPages();
    const newPage: ClientPage = {
      ...page,
      id: `cp-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    pages.unshift(newPage);
    this.saveClientPages(pages);
    return newPage;
  },

  updateClientPage(id: string, updates: Partial<ClientPage>): ClientPage | null {
    const pages = this.getClientPages();
    const index = pages.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    const updatedPage: ClientPage = {
      ...pages[index],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    pages[index] = updatedPage;
    this.saveClientPages(pages);
    return updatedPage;
  },

  deleteClientPage(id: string): boolean {
    let pages = this.getClientPages();
    const initialLen = pages.length;
    pages = pages.filter(p => p.id !== id);
    if (pages.length !== initialLen) {
      this.saveClientPages(pages);
      return true;
    }
    return false;
  },

  duplicateClientPage(id: string): ClientPage | null {
    const pages = this.getClientPages();
    const target = pages.find(p => p.id === id);
    if (!target) return null;

    const copy: ClientPage = {
      ...target,
      id: `cp-${Date.now()}`,
      clientName: `${target.clientName} (Cópia)`,
      pageTitle: `${target.pageTitle} - Cópia`,
      slug: `${target.slug}-copia`,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    pages.unshift(copy);
    this.saveClientPages(pages);
    return copy;
  }
};
