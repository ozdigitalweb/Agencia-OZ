import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { mockPosts, BlogPost } from './src/data/mockPosts.js';
import { mockConversations } from './src/data/mockConversations.js';
import { getDatabaseStatus, initializeDatabaseSchema, migrateJsonToMysql, getMySqlPool } from './src/server/db.js';
import mysql from 'mysql2/promise';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Path for storing JSON data persistently
const DATA_DIR = path.join(process.cwd(), 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const KNOWLEDGE_FILE = path.join(DATA_DIR, 'knowledge.json');
const CONVERSATIONS_FILE = path.join(DATA_DIR, 'conversations.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const AGENT_LOGS_FILE = path.join(DATA_DIR, 'agent_logs.json');
const AGENT_SETTINGS_FILE = path.join(DATA_DIR, 'agent_settings.json');

// Default site promo settings
const DEFAULT_SITE_SETTINGS = {
  promoPopupEnabled: true,
  promoFloatingButtonEnabled: true,
  promoAutoOpenEnabled: true,
  promoAutoOpenDelay: 1.5,
  promoButtonText: 'Ganhe 1 Site + E-mail Grátis!',
  promoButtonSubtext: 'Clique para participar',
  updatedAt: new Date().toISOString()
};

// Default autonomous agent settings
const DEFAULT_AGENT_SETTINGS = {
  autonomyMode: 'autonomous', // 'autonomous' | 'copilot'
  toolsEnabled: {
    check_domain_availability: true,
    generate_instant_proposal: true,
    schedule_diagnostic_meeting: true,
    calculate_roi_performance: true,
    update_crm_lead: true
  },
  autoAssignLeads: true,
  autoAdvanceFunnel: true,
  systemVersion: 'OZZY Agent v3.5 Pro (Autonomous AI Agent)',
  updatedAt: new Date().toISOString()
};

// Initial agent activity logs
const DEFAULT_AGENT_LOGS = [
  {
    id: 'log-01',
    toolName: 'check_domain_availability',
    actionLabel: 'Verificação de Domínio .com.br',
    inputParams: { domainName: 'supermercadossulreal.com.br' },
    resultSummary: 'Domínio Registrado (Ativo no Registro.br)',
    clientName: 'Marcelo Bittencourt',
    status: 'success',
    executedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString()
  },
  {
    id: 'log-02',
    toolName: 'generate_instant_proposal',
    actionLabel: 'Geração de Proposta Comercial',
    inputParams: { serviceType: 'solucao_360', companyName: 'Studio Linhares Moda & Design' },
    resultSummary: 'Proposta #OZ-PROP-8921 gerada com valor R$ 1.950',
    clientName: 'Fernanda Linhares',
    status: 'success',
    executedAt: new Date(Date.now() - 1000 * 60 * 50).toISOString()
  },
  {
    id: 'log-03',
    toolName: 'schedule_diagnostic_meeting',
    actionLabel: 'Agendamento de Diagnóstico Técnico',
    inputParams: { clientName: 'Dr. Roberto Silveira', preferredDate: 'Sexta-feira 14:00' },
    resultSummary: 'Diagnóstico agendado com sucesso (Google Meet + WhatsApp)',
    clientName: 'Dr. Roberto Silveira',
    status: 'success',
    executedAt: new Date(Date.now() - 1000 * 60 * 95).toISOString()
  }
];

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed if settings.json doesn't exist
if (!fs.existsSync(SETTINGS_FILE)) {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SITE_SETTINGS, null, 2), 'utf-8');
}

// Initial seed for agent settings and logs
if (!fs.existsSync(AGENT_SETTINGS_FILE)) {
  fs.writeFileSync(AGENT_SETTINGS_FILE, JSON.stringify(DEFAULT_AGENT_SETTINGS, null, 2), 'utf-8');
}
if (!fs.existsSync(AGENT_LOGS_FILE)) {
  fs.writeFileSync(AGENT_LOGS_FILE, JSON.stringify(DEFAULT_AGENT_LOGS, null, 2), 'utf-8');
}

function getStoredAgentSettings(): typeof DEFAULT_AGENT_SETTINGS {
  try {
    const raw = fs.readFileSync(AGENT_SETTINGS_FILE, 'utf-8');
    return { ...DEFAULT_AGENT_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    return DEFAULT_AGENT_SETTINGS;
  }
}

function saveAgentSettings(settings: any) {
  fs.writeFileSync(AGENT_SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
}

function getStoredAgentLogs(): any[] {
  try {
    const raw = fs.readFileSync(AGENT_LOGS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return DEFAULT_AGENT_LOGS;
  }
}

function saveAgentLogs(logs: any[]) {
  fs.writeFileSync(AGENT_LOGS_FILE, JSON.stringify(logs, null, 2), 'utf-8');
}

function recordAgentLog(toolName: string, actionLabel: string, inputParams: any, resultSummary: string, clientName: string = 'Visitante Web') {
  try {
    const logs = getStoredAgentLogs();
    const newLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      toolName,
      actionLabel,
      inputParams,
      resultSummary,
      clientName: clientName || 'Visitante Web',
      status: 'success',
      executedAt: new Date().toISOString()
    };
    logs.unshift(newLog);
    // Keep max 100 logs
    if (logs.length > 100) logs.length = 100;
    saveAgentLogs(logs);
    return newLog;
  } catch (err) {
    console.error('Error recording agent log:', err);
  }
}

// Helper functions for settings data
function getStoredSettings(): typeof DEFAULT_SITE_SETTINGS {
  try {
    const raw = fs.readFileSync(SETTINGS_FILE, 'utf-8');
    return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Error reading settings file, returning fallback:', err);
    return DEFAULT_SITE_SETTINGS;
  }
}

function saveSettings(settings: any) {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
}

// Initial seed if posts.json doesn't exist
if (!fs.existsSync(POSTS_FILE)) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(mockPosts, null, 2), 'utf-8');
}

// Initial seed if conversations.json doesn't exist
if (!fs.existsSync(CONVERSATIONS_FILE)) {
  fs.writeFileSync(CONVERSATIONS_FILE, JSON.stringify(mockConversations, null, 2), 'utf-8');
}

// Helper functions for conversations data
function getStoredConversations(): any[] {
  try {
    const raw = fs.readFileSync(CONVERSATIONS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading conversations file, returning fallback:', err);
    return mockConversations;
  }
}

function saveConversations(conversations: any[]) {
  fs.writeFileSync(CONVERSATIONS_FILE, JSON.stringify(conversations, null, 2), 'utf-8');
}

// Helper functions for post data
function getStoredPosts(): (BlogPost & { status?: 'published' | 'draft' })[] {
  try {
    const raw = fs.readFileSync(POSTS_FILE, 'utf-8');
    const posts = JSON.parse(raw);
    return posts.map((p: any) => ({
      ...p,
      status: p.status || 'published'
    }));
  } catch (err) {
    console.error('Error reading posts file, returning fallback:', err);
    return mockPosts.map(p => ({ ...p, status: 'published' as const }));
  }
}

function savePosts(posts: any[]) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf-8');
}

// Helper functions for OZZY Knowledge Base
interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  priority: 'high' | 'medium' | 'low';
  active: boolean;
  suggestedLinks?: { label: string; url: string }[];
  updatedAt: string;
}

const DEFAULT_KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: "kb-01-solucao-360",
    title: "Solução 360 Graus (Pacote Completo de Auxílio Digital)",
    category: "Solução 360°",
    content: "Solução 360 Graus da AGÊNCIA OZ (Pacote All-in-One):\n\n• **Diagnóstico Raio-X**: Análise completa de velocidade, segurança e SEO\n• **Site ou Landing Page**: Desenvolvimento em WordPress ultrarrápido\n• **Hospedagem Cloud Dedicada**: Servidor VPS NVMe com cPanel e e-mails blindados\n• **SEO Local & GEO**: Otimização para Google Maps e IAs (Gemini e ChatGPT)\n• **Suporte Humanizado**: Atendimento direto no WhatsApp sem filas",
    tags: ["360", "solução 360", "pacote", "auxilio geral", "tudo incluso", "completo", "consultoria", "transformacao digital"],
    priority: "high",
    active: true,
    suggestedLinks: [
      { label: "Solução 360°", url: "/360-graus" },
      { label: "Diagnóstico Gratuito", url: "/orcamento" }
    ],
    updatedAt: "2026-08-28"
  },
  {
    id: "kb-02-hospedagem-vps",
    title: "Hospedagem Cloud WordPress com cPanel Dedicado",
    category: "Hospedagem Cloud",
    content: "Recursos da Hospedagem Cloud AGÊNCIA OZ:\n\n• **Servidores Cloud NVMe**: Carregamento instantâneo do seu site\n• **cPanel Oficial em Português**: Painel completo e fácil de gerenciar\n• **E-mails Blindados Anti-Spam**: Registros SPF, DKIM e DMARC configurados\n• **SSL Grátis e Backups Diários**: Segurança total inclusa\n• **Planos a partir de R$ 49,90/mês** com migração gratuita do seu site atual",
    tags: ["hospedagem", "cpanel", "vps", "cloud", "servidor", "email", "e-mail", "ssl", "backup", "migracao", "nvme"],
    priority: "high",
    active: true,
    suggestedLinks: [
      { label: "Planos de Hospedagem", url: "/servicos/hospedagem" },
      { label: "Migração Grátis", url: "https://wa.me/5548991984678?text=Ola%2C+quero+migrar+meu+site+para+a+hospedagem+OZ" }
    ],
    updatedAt: "2026-08-28"
  },
  {
    id: "kb-10-cpanel-recursos",
    title: "Recursos do Painel cPanel Oficial (Gerenciamento, E-mails, SSL e Backup)",
    category: "Hospedagem Cloud",
    content: "Painel cPanel Oficial AGÊNCIA OZ:\n\n• **Gerenciador de Arquivos**: Editor de código e descompactador ZIP integrados\n• **E-mails Corporativos Ilimitados**: Webmail Roundcube com proteção anti-spam\n• **Editor de DNS Avançado**: Gerenciamento de entradas A, CNAME, MX, TXT\n• **Bancos de Dados MySQL**: Alta velocidade em discos NVMe com phpMyAdmin\n• **WordPress Toolkit**: Instalação e atualização em 1 clique\n• **Certificados SSL Automáticos**: Renovação Let's Encrypt / AutoSSL sem custo",
    tags: ["cpanel", "painel", "recursos cpanel", "gerenciador de arquivos", "webmail", "mysql", "phpmyadmin", "ssl", "php", "autossl", "roundcube", "backup cpanel", "dns"],
    priority: "high",
    active: true,
    suggestedLinks: [
      { label: "Planos com cPanel", url: "/servicos/hospedagem" },
      { label: "Migrar cPanel Grátis", url: "https://wa.me/5548991984678?text=Ola%2C+gostaria+de+migrar+minha+conta+cPanel+para+a+OZ" }
    ],
    updatedAt: "2026-08-28"
  },
  {
    id: "kb-03-sites-wordpress",
    title: "Criação de Sites, Landing Pages, Artes para Redes Sociais e Copywriting",
    category: "WordPress, LPs & Mídia",
    content: "Criação de Sites & Landing Pages de Alta Conversão:\n\n• **Landing Pages Estratégicas**: Focadas em gerar orçamentos e vendas\n• **Sites Institucionais**: 100% responsivos com WordPress e painel fácil\n• **Carregamento Instantâneo**: Nota 90+ no Google PageSpeed\n• **Artes e Copywriting Alinhados**: Identidade visual em sintonia com anúncios\n• **Integração Completa**: WhatsApp Direto, CRM e OZZY Assistente IA",
    tags: ["site", "criar site", "wordpress", "landing page", "artes", "instagram", "facebook", "copywriting", "copy", "redes sociais", "desenvolvimento", "portal", "responsivo", "pagespeed", "rapido"],
    priority: "high",
    active: true,
    suggestedLinks: [
      { label: "Landing Pages", url: "/servicos/landingpages" },
      { label: "Mídia & Assistente IA", url: "/servicos/midia" },
      { label: "Sites WordPress", url: "/servicos/wordpress" }
    ],
    updatedAt: "2026-08-28"
  },
  {
    id: "kb-11-midia-divulgacao-ozzy",
    title: "Mídia Digital, Divulgação de Marca e Assistente Virtual IA (OZZY)",
    category: "Mídia & IA",
    content: "Soluções de Mídia & Divulgação AGÊNCIA OZ:\n\n• **Artes para Redes Sociais**: Posts para Feed, Stories e Carrosséis\n• **Copywriting de Conversão**: Textos persuasivos para anúncios e páginas\n• **Campanhas de Divulgação**: Estratégias para lançamento e captação de clientes\n• **OZZY Assistente Virtual com IA**: Atendimento 24/7 integrado ao seu site",
    tags: ["midia", "mídia", "divulgacao", "divulgação", "artes", "instagram", "facebook", "social media", "copy", "copywriting", "ozzy", "assistente virtual", "ia", "inteligencia artificial", "robo", "atendimento 24h", "lancamento de produtos"],
    priority: "high",
    active: true,
    suggestedLinks: [
      { label: "Mídia & Assistente IA", url: "/servicos/midia" },
      { label: "Landing Pages & Artes", url: "/servicos/landingpages" }
    ],
    updatedAt: "2026-08-28"
  },
  {
    id: "kb-04-seo-geo",
    title: "Diferença entre SEO Tradicional vs GEO (Generative Engine Optimization)",
    category: "SEO, GEO & Futuro da Busca",
    content: "Diferença entre **SEO** e **GEO** no cenário digital atual:\n\n• **SEO (Search Engine Optimization)**:\nOtimização para motores de busca tradicionais (Google, Bing). Foco em ranquear em links azuis na SERP através de palavras-chave, velocidade de carregamento (PageSpeed 90+), backlinks de autoridade, metadados e SEO Local no Google Perfil da Empresa (Google Maps).\n\n• **GEO (Generative Engine Optimization)**:\nOtimização para mecanismos de busca generativos com IA (ChatGPT, Google Gemini, Perplexity, Copilot e Google AI Overviews). Foco em estruturação semântica, Schema.org enriquecido, autoridade de marca e respostas diretas para que as IAs citem e recomendem a sua empresa como a melhor solução do nicho.\n\n• **A Abordagem da AGÊNCIA OZ (Solução 360°)**:\nUnificamos SEO + GEO na construção do seu site e presença digital. Sua empresa conquista visibilidade tanto nas buscas clássicas do Google quanto nas recomendações de Inteligência Artificial.",
    tags: ["seo", "geo", "seo vs geo", "diferença", "diferenca", "futuro da busca", "google", "maps", "busca", "primeira pagina", "gemini", "chatgpt", "perplexity", "copilot", "sge", "ai overviews", "posicionamento", "palavras chave", "trafego organico"],
    priority: "high",
    active: true,
    suggestedLinks: [
      { label: "Página Futuro da Busca (SEO vs GEO)", url: "/l/futuro-da-busca" },
      { label: "Serviços de SEO & Posicionamento", url: "/servicos/seo" },
      { label: "Solução 360° OZ", url: "/360-graus" }
    ],
    updatedAt: "2026-08-28"
  },
  {
    id: "kb-05-provox-streaming",
    title: "PROVOX Streaming & Rádio Corporativa / Som Ambiente (Serviço Específico)",
    category: "PROVOX Streaming",
    content: "PROVOX Streaming & Rádio Corporativa:\n\n• **Transmissão em Nuvem 24h**: Com AutoDJ sem precisar de PC ligado\n• **Vinhetas e Comerciais Agendados**: Divulgue suas promoções nos horários certos\n• **Player Exclusivo sem Concorrentes**: Som ambiente para lojas, clínicas e academias",
    tags: ["provox", "radio", "streaming", "som ambiente", "musica", "autodj", "vinhetas", "comerciais", "loja", "clinica", "radio web", "servico especifico", "avulso"],
    priority: "medium",
    active: true,
    suggestedLinks: [
      { label: "PROVOX Streaming", url: "/servicos/streaming" },
      { label: "Questionário Briefing", url: "/servicos/provox/briefing" }
    ],
    updatedAt: "2026-08-28"
  },
  {
    id: "kb-06-precos-prazos",
    title: "Preços, Formas de Pagamento e Prazos Médios de Entrega",
    category: "Preços & Prazos",
    content: "Tabela de Preços e Prazos Médios AGÊNCIA OZ:\n\n• **Hospedagem Cloud cPanel**: A partir de R$ 49,90/mês\n• **Landing Pages**: A partir de R$ 890 (Entrega em 3 a 7 dias úteis)\n• **Sites Institucionais WordPress**: A partir de R$ 1.690 (Entrega em 10 a 20 dias úteis)\n• **Solução 360°**: Pacote sob medida após diagnóstico gratuito\n• **Formas de Pagamento**: PIX com desconto ou cartão em até 12x",
    tags: ["preco", "preço", "quanto custa", "valor", "tabela", "parcelamento", "prazo", "dias", "pagamento", "pix", "cartao", "orcamento"],
    priority: "high",
    active: true,
    suggestedLinks: [
      { label: "Simulador de Orçamento", url: "/orcamento" },
      { label: "Falar com Consultor", url: "https://wa.me/5548991984678?text=Ola%2C+gostaria+de+um+orcamento+personalizado" }
    ],
    updatedAt: "2026-08-28"
  },
  {
    id: "kb-07-contato-atendimento",
    title: "Canais Oficiais de Contato, Localização e Horário de Atendimento",
    category: "Contato & Atendimento",
    content: "Canais Oficiais da AGÊNCIA OZ:\n\n• **WhatsApp Oficial / Telefone**: (48) 99198-4678\n• **E-mail**: contato@agenciaoz.com.br\n• **Sede**: Canoas / RS (Atendimento para todo o Brasil)\n• **Horário**: Segunda a Sexta, das 09h às 18h (Servidores monitorados 24/7)",
    tags: ["contato", "whatsapp", "telefone", "email", "endereco", "onde fica", "canoas", "porto alegre", "rs", "horario", "suporte"],
    priority: "high",
    active: true,
    suggestedLinks: [
      { label: "Página de Contato", url: "/contato" },
      { label: "Chamar no WhatsApp", url: "https://wa.me/5548991984678" }
    ],
    updatedAt: "2026-08-28"
  },
  {
    id: "kb-08-casos-sucesso",
    title: "Casos de Sucesso e Portfólio (CSSGAPA, RN Com e Clientes)",
    category: "Portfólio & Casos",
    content: "Portfólio e Casos de Sucesso:\n\n• **CSSGAPA Canoas**: Portal da Aeronáutica com agendamentos e eventos\n• **RN Com Digital (Porto Alegre)**: Parceria de desenvolvimento WordPress\n• **Clínicas, Escritórios e E-commerces**: Mais de 50 sites com nota 90+ no PageSpeed",
    tags: ["clientes", "portfolio", "casos de sucesso", "cssgapa", "aeronautica", "canoas", "rn com", "rogerio nolasco", "depoimentos", "exemplos"],
    priority: "medium",
    active: true,
    suggestedLinks: [
      { label: "Ver Clientes e Portfólio", url: "/clientes" }
    ],
    updatedAt: "2026-08-28"
  },
  {
    id: "kb-09-diferenciais-anti-spam",
    title: "Diferencial Técnico: E-mails Blindados e Nota Máxima no PageSpeed",
    category: "Diferenciais Técnicos",
    content: "Diferenciais Técnicos da AGÊNCIA OZ:\n\n• **E-mails Blindados**: SPF, DKIM e DMARC configurados para 100% de entrega\n• **Velocidade Extrema**: Imagens WebP, cache NVMe e nota 90+ no PageSpeed\n• **Suporte Humanizado**: Contato direto pelo WhatsApp sem intermediários",
    tags: ["diferenciais", "spam", "dkim", "spf", "dmarc", "velocidade", "pagespeed", "cache", "suporte humanizado", "por que escolher"],
    priority: "high",
    active: true,
    suggestedLinks: [
      { label: "Solução 360°", url: "/360-graus" },
      { label: "Falar no WhatsApp", url: "https://wa.me/5548991984678" }
    ],
    updatedAt: "2026-08-28"
  }
];

// Initial seed if knowledge.json doesn't exist
if (!fs.existsSync(KNOWLEDGE_FILE)) {
  fs.writeFileSync(KNOWLEDGE_FILE, JSON.stringify(DEFAULT_KNOWLEDGE_ITEMS, null, 2), 'utf-8');
}

function getStoredKnowledge(): KnowledgeItem[] {
  try {
    if (!fs.existsSync(KNOWLEDGE_FILE)) {
      fs.writeFileSync(KNOWLEDGE_FILE, JSON.stringify(DEFAULT_KNOWLEDGE_ITEMS, null, 2), 'utf-8');
      return DEFAULT_KNOWLEDGE_ITEMS;
    }
    const raw = fs.readFileSync(KNOWLEDGE_FILE, 'utf-8');
    const items = JSON.parse(raw);
    if (!Array.isArray(items)) return DEFAULT_KNOWLEDGE_ITEMS;

    // Merge any missing default knowledge items or updated critical ones
    let modified = false;
    for (const def of DEFAULT_KNOWLEDGE_ITEMS) {
      const idx = items.findIndex(i => i.id === def.id);
      if (idx === -1) {
        items.push(def);
        modified = true;
      } else if (def.id === 'kb-04-seo-geo' && !items[idx].content.includes('Generative Engine Optimization')) {
        items[idx] = def;
        modified = true;
      }
    }
    if (modified) {
      saveKnowledge(items);
    }
    return items;
  } catch (err) {
    console.error('Error reading knowledge file, returning default:', err);
    return DEFAULT_KNOWLEDGE_ITEMS;
  }
}

function saveKnowledge(items: KnowledgeItem[]) {
  fs.writeFileSync(KNOWLEDGE_FILE, JSON.stringify(items, null, 2), 'utf-8');
}

// --- PROPOSTAS COMERCIAIS & TABELA DE PREÇOS ---
export interface ProposalPackage {
  id: string;
  title: string;
  category: string;
  setupPrice: number;
  monthlyPrice: number;
  deliveryDays: string;
  paymentTerms: string;
  badge?: string;
  popular?: boolean;
  deliverables: string[];
  notes?: string;
  active: boolean;
  order: number;
}

export interface ProposalGeneralSettings {
  defaultWhatsApp: string;
  defaultDiscountPixPercent: number;
  proposalValidityDays: number;
  companyLegalName: string;
  defaultFooterNotes: string;
}

export interface ProposalConfig {
  packages: ProposalPackage[];
  generalSettings: ProposalGeneralSettings;
  updatedAt: string;
}

const PROPOSALS_CONFIG_FILE = path.join(process.cwd(), 'proposals-config.json');

const DEFAULT_PROPOSALS_CONFIG: ProposalConfig = {
  generalSettings: {
    defaultWhatsApp: '5548991984678',
    defaultDiscountPixPercent: 10,
    proposalValidityDays: 7,
    companyLegalName: 'AGÊNCIA OZ - Tecnologia, Sites e Presença Digital',
    defaultFooterNotes: 'Proposta sujeita a análise técnica e disponibilidade de cronograma. Suporte VIP humanizado incluso.'
  },
  packages: [
    {
      id: 'solucao_360',
      title: 'Solução 360 Graus (Pacote Completo Digital)',
      category: 'Solução 360°',
      setupPrice: 1890,
      monthlyPrice: 49.90,
      deliveryDays: '7 a 15 dias úteis',
      paymentTerms: 'PIX com 10% de desconto à vista ou até 12x no cartão de crédito',
      badge: 'Mais Recomendado',
      popular: true,
      deliverables: [
        'Diagnóstico Raio-X & SEO Local no Google Maps',
        'Site WordPress Ultrarrápido (Nota 90+ Google PageSpeed)',
        'Hospedagem Cloud cPanel NVMe Dedicada com SSL Grátis',
        'E-mails Corporativos Blindados com SPF, DKIM e DMARC',
        'Suporte Técnico VIP Humanizado no WhatsApp'
      ],
      notes: 'Pacote líder de vendas da AGÊNCIA OZ. Cobre todas as frentes digitais da empresa.',
      active: true,
      order: 1
    },
    {
      id: 'landing_page',
      title: 'Landing Page de Alta Conversão + Artes Estratégicas',
      category: 'Sites & LPs',
      setupPrice: 890,
      monthlyPrice: 49.90,
      deliveryDays: '3 a 7 dias úteis',
      paymentTerms: 'PIX com 10% de desconto ou até 12x no cartão',
      badge: 'Alta Conversão',
      popular: false,
      deliverables: [
        'Design Exclusivo Focado em Conversão de Leads e Vendas',
        'Copywriting Persuasivo Alinhado aos Seus Anúncios',
        'Criativos para Redes Sociais (Feed e Stories)',
        'Integração Direta com WhatsApp e CRM OZZY',
        'Carregamento Instantâneo (< 1s) e Mobile-First'
      ],
      notes: 'Ideal para campanhas de tráfego pago, lançamentos de produtos e captação rápida.',
      active: true,
      order: 2
    },
    {
      id: 'site_institucional',
      title: 'Site Institucional Completo em WordPress',
      category: 'Sites & LPs',
      setupPrice: 1690,
      monthlyPrice: 49.90,
      deliveryDays: '10 a 20 dias úteis',
      paymentTerms: 'PIX com 10% de desconto ou até 12x no cartão',
      badge: 'Autoridade',
      popular: false,
      deliverables: [
        'Até 5 páginas completas (Início, Sobre, Serviços, Portfólio, Contato)',
        'Painel WordPress Fácil de Atualizar sem depender de programador',
        'Blog Integrado com Gestor de Conteúdo e Notícias',
        'Otimização Completa para Dispositivos Móveis e Tablets',
        'Formulários Inteligentes com Notificação no WhatsApp'
      ],
      notes: 'Excelente para empresas consolidadas, clínicas, escritórios e prestadores de serviços.',
      active: true,
      order: 3
    },
    {
      id: 'hospedagem_cpanel',
      title: 'Hospedagem Cloud WordPress com cPanel NVMe',
      category: 'Hospedagem Cloud',
      setupPrice: 0,
      monthlyPrice: 49.90,
      deliveryDays: 'Ativação Imediata (Migração Grátis em 24h)',
      paymentTerms: 'Faturamento mensal ou anual com desconto',
      badge: 'Zero Setup',
      popular: true,
      deliverables: [
        'cPanel Oficial em Português com instalador em 1 clique',
        'Discos SSD NVMe de Altíssima Velocidade',
        'Certificado SSL (HTTPS) Grátis e Ilimitado',
        'Backups Diários Automáticos com Restauração Rápida',
        'Contas de E-mail Ilimitadas com Anti-Spam Blindado',
        'Migração 100% Gratuita do seu site atual'
      ],
      notes: 'Plataforma em nuvem com alta redundância, uptime de 99.9% e suporte especializado.',
      active: true,
      order: 4
    },
    {
      id: 'seo_geo',
      title: 'SEO Local Google + GEO (Otimização para IAs Generativas)',
      category: 'SEO & Posicionamento',
      setupPrice: 990,
      monthlyPrice: 0,
      deliveryDays: '5 a 10 dias úteis',
      paymentTerms: 'PIX à vista com 10% de desconto ou até 12x',
      badge: 'Inovação IA',
      popular: false,
      deliverables: [
        'Otimização do Google Meu Negócio / Google Maps',
        'Estruturação de Dados Schema.org para Gemini, ChatGPT e Copilot',
        'Otimização On-Page de Títulos, Metatags e Velocidade Core Web Vitals',
        'Relatório de Posicionamento, Palavras-chave e Recomendações'
      ],
      notes: 'Garante que a empresa apareça tanto no topo do Google Maps quanto nas recomendações de IAs.',
      active: true,
      order: 5
    },
    {
      id: 'provox_streaming',
      title: 'PROVOX Streaming & Rádio Corporativa / Som Ambiente',
      category: 'Streaming & Mídia',
      setupPrice: 0,
      monthlyPrice: 89.90,
      deliveryDays: 'Ativação em até 24h',
      paymentTerms: 'Mensalidade recorrente sem fidelidade',
      badge: 'Transmissão 24h',
      popular: false,
      deliverables: [
        'Transmissão Contínua em Nuvem 24/7 com AutoDJ sem precisar de PC ligado',
        'Inserção Automática de Vinhetas e Comerciais nos Horários Programados',
        'Player Personalizado para o Site da sua Empresa',
        'Música Ambiente Legalizada sem Anúncios de Concorrentes'
      ],
      notes: 'Perfeito para lojas físicas, academias, supermercados, clínicas e web rádios.',
      active: true,
      order: 6
    },
    {
      id: 'loja_virtual',
      title: 'Loja Virtual WooCommerce & E-commerce Integrado',
      category: 'E-commerce',
      setupPrice: 2890,
      monthlyPrice: 69.90,
      deliveryDays: '15 a 30 dias úteis',
      paymentTerms: 'PIX com 10% de desconto ou até 12x no cartão',
      badge: 'Vendas Online',
      popular: false,
      deliverables: [
        'Catálogo de Produtos Ilimitados com Variações (Cores, Tamanhos)',
        'Integração com Gateways de Pagamento (Mercado Pago, PagSeguro, Asaas)',
        'Cálculo Automático de Frete (Correios, Melhor Envio, Jadlog)',
        'Recuperação de Carrinho Abandonado e Checkout Transparente',
        'Treinamento Completo em Vídeo para Gestão de Pedidos'
      ],
      notes: 'Plataforma robusta, sem comissões sobre suas vendas.',
      active: true,
      order: 7
    },
    {
      id: 'gestao_trafego',
      title: 'Gestão de Tráfego Pago & Mídia Digital (Meta Ads + Google Ads)',
      category: 'Tráfego & Anúncios',
      setupPrice: 690,
      monthlyPrice: 990.00,
      deliveryDays: 'Configuração e Início em 48h',
      paymentTerms: 'Setup de Implantação + Mensalidade de Gestão',
      badge: 'Geração de Leads',
      popular: false,
      deliverables: [
        'Planejamento Estratégico de Palavras-Chave e Públicos-Alvo',
        'Instalação de Pixel do Meta, Google Tag Manager e API de Conversões',
        'Criação de Campanhas no Google Ads (Pesquisa e Performance Max)',
        'Criação de Anúncios no Instagram e Facebook Focados em WhatsApp',
        'Relatórios Semanais de Desempenho e Otimizações Contínuas'
      ],
      notes: 'Investimento em mídia pago diretamente às plataformas (Google/Meta).',
      active: true,
      order: 8
    }
  ],
  updatedAt: '2026-08-28'
};

function getStoredProposalConfig(): ProposalConfig {
  try {
    if (!fs.existsSync(PROPOSALS_CONFIG_FILE)) {
      fs.writeFileSync(PROPOSALS_CONFIG_FILE, JSON.stringify(DEFAULT_PROPOSALS_CONFIG, null, 2), 'utf-8');
      return DEFAULT_PROPOSALS_CONFIG;
    }
    const raw = fs.readFileSync(PROPOSALS_CONFIG_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.packages)) {
      return DEFAULT_PROPOSALS_CONFIG;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading proposals config file, returning default:', err);
    return DEFAULT_PROPOSALS_CONFIG;
  }
}

function saveProposalConfig(config: ProposalConfig) {
  config.updatedAt = new Date().toISOString().split('T')[0];
  fs.writeFileSync(PROPOSALS_CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

// Admin Token Authentication Mock
const ADMIN_TOKEN = 'oz_admin_secret_token_2026_key';
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'agenciaoz2026'
};

function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acesso não autorizado. Faça login como administrador.' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Sessão inválida ou expirada.' });
  }
  next();
}

// --- API ENDPOINTS ---

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    return res.json({
      success: true,
      token: ADMIN_TOKEN,
      user: {
        name: 'Administrador OZ',
        role: 'Gestor de Conteúdo',
        email: 'admin@agenciaoz.com.br'
      }
    });
  }
  return res.status(401).json({ error: 'Usuário ou senha incorretos.' });
});

// Admin Verify Token
app.get('/api/admin/me', authMiddleware, (req, res) => {
  return res.json({
    user: {
      name: 'Administrador OZ',
      role: 'Gestor de Conteúdo',
      email: 'admin@agenciaoz.com.br'
    }
  });
});

// --- MYSQL DATABASE MANAGEMENT ENDPOINTS ---

// GET /api/database/status - Retrieve MySQL / JSON connection & table status
app.get('/api/database/status', async (req, res) => {
  try {
    const status = await getDatabaseStatus();
    return res.json(status);
  } catch (err: any) {
    console.error('Error fetching database status:', err);
    return res.status(500).json({ error: 'Erro ao verificar status do banco de dados' });
  }
});

// POST /api/database/test-connection - Test MySQL connection credentials
app.post('/api/database/test-connection', async (req, res) => {
  const { host, port, user, password, database, url } = req.body;
  const start = Date.now();

  try {
    let connection: mysql.Connection;

    if (url) {
      connection = await mysql.createConnection(url);
    } else if (host && user) {
      connection = await mysql.createConnection({
        host: host || 'localhost',
        port: port ? parseInt(port, 10) : 3306,
        user: user || 'root',
        password: password || '',
        database: database || undefined,
        connectTimeout: 5000
      });
    } else {
      // Test existing pool
      const pool = getMySqlPool();
      if (!pool) {
        return res.json({
          success: false,
          message: 'Nenhuma credencial do MySQL fornecida ou configurada no .env. O sistema está operando em modo JSON local.'
        });
      }
      const conn = await pool.getConnection();
      try {
        await conn.ping();
        const latencyMs = Date.now() - start;
        return res.json({
          success: true,
          message: `Conexão ativa com o banco de dados MySQL no servidor!`,
          latencyMs
        });
      } finally {
        conn.release();
      }
    }

    try {
      await connection.ping();
      const latencyMs = Date.now() - start;
      await connection.end();
      return res.json({
        success: true,
        message: 'Conexão com o servidor MySQL estabelecida com sucesso!',
        latencyMs
      });
    } catch (pingErr: any) {
      await connection.end().catch(() => {});
      throw pingErr;
    }
  } catch (err: any) {
    return res.json({
      success: false,
      message: err?.message || 'Falha ao autenticar no servidor MySQL.'
    });
  }
});

// POST /api/database/migrate-json-to-mysql - Sync local JSON records into MySQL tables
app.post('/api/database/migrate-json-to-mysql', authMiddleware, async (req, res) => {
  try {
    const result = await migrateJsonToMysql();
    return res.json(result);
  } catch (err: any) {
    console.error('Error during JSON to MySQL migration:', err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Erro durante a sincronização de dados'
    });
  }
});


// GET /api/site-settings - Public & Admin promo settings
app.get('/api/site-settings', (req, res) => {
  try {
    const settings = getStoredSettings();
    return res.json(settings);
  } catch (err) {
    console.error('Error fetching site settings:', err);
    return res.status(500).json({ error: 'Erro ao carregar configurações.' });
  }
});

// PUT /api/site-settings - Update site settings (Admin / Protected with fallback)
app.put('/api/site-settings', (req, res) => {
  try {
    const current = getStoredSettings();
    const { 
      promoPopupEnabled, 
      promoFloatingButtonEnabled, 
      promoAutoOpenEnabled, 
      promoAutoOpenDelay,
      promoButtonText,
      promoButtonSubtext 
    } = req.body;

    const updated = {
      ...current,
      ...(typeof promoPopupEnabled === 'boolean' ? { promoPopupEnabled } : {}),
      ...(typeof promoFloatingButtonEnabled === 'boolean' ? { promoFloatingButtonEnabled } : {}),
      ...(typeof promoAutoOpenEnabled === 'boolean' ? { promoAutoOpenEnabled } : {}),
      ...(typeof promoAutoOpenDelay === 'number' ? { promoAutoOpenDelay } : {}),
      ...(typeof promoButtonText === 'string' ? { promoButtonText: promoButtonText.trim() } : {}),
      ...(typeof promoButtonSubtext === 'string' ? { promoButtonSubtext: promoButtonSubtext.trim() } : {}),
      updatedAt: new Date().toISOString()
    };

    saveSettings(updated);
    console.log('[Settings] Updated promo settings:', updated);
    return res.json(updated);
  } catch (err) {
    console.error('Error updating site settings:', err);
    return res.status(500).json({ error: 'Erro ao salvar configurações do site.' });
  }
});

// GET /api/posts - Public & Admin post listing
app.get('/api/posts', (req, res) => {
  const { status, category, search, limit, page } = req.query;
  let posts = getStoredPosts();

  // Filter status: by default public only sees 'published'
  if (status === 'all') {
    // Admin request
  } else if (status === 'draft') {
    posts = posts.filter(p => p.status === 'draft');
  } else {
    posts = posts.filter(p => p.status !== 'draft');
  }

  // Filter by category
  if (category && typeof category === 'string' && category.trim()) {
    posts = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Filter by search query
  if (search && typeof search === 'string' && search.trim()) {
    const q = search.toLowerCase().trim();
    posts = posts.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
    );
  }

  res.json({
    total: posts.length,
    posts
  });
});

// GET /api/categories - Listing of categories with count
app.get('/api/categories', (req, res) => {
  const posts = getStoredPosts().filter(p => p.status !== 'draft');
  const catMap: Record<string, number> = {};
  
  posts.forEach(p => {
    catMap[p.category] = (catMap[p.category] || 0) + 1;
  });

  const categories = Object.keys(catMap).map(cat => ({
    name: cat,
    count: catMap[cat]
  }));

  res.json(categories);
});

// GET /api/posts/:idOrSlug - Get single post
app.get('/api/posts/:idOrSlug', (req, res) => {
  const { idOrSlug } = req.params;
  const posts = getStoredPosts();
  
  const post = posts.find(p => p.slug === idOrSlug || p.id.toString() === idOrSlug);
  if (!post) {
    return res.status(404).json({ error: 'Artigo não encontrado.' });
  }

  res.json(post);
});

// POST /api/posts - Create post (Protected)
app.post('/api/posts', authMiddleware, (req, res) => {
  const { title, slug, excerpt, content, category, featuredImage, author, status } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ error: 'Título, conteúdo e categoria são obrigatórios.' });
  }

  const posts = getStoredPosts();
  
  // Generate unique ID
  const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
  
  // Clean slug
  let finalSlug = slug || title.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  if (!finalSlug) {
    finalSlug = `artigo-${newId}`;
  }

  // Ensure unique slug
  if (posts.some(p => p.slug === finalSlug)) {
    finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
  }

  const todayStr = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const newPost = {
    id: newId,
    title,
    slug: finalSlug,
    excerpt: excerpt || title,
    content,
    date: todayStr,
    category,
    featuredImage: featuredImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&fit=crop&w=600&q=70',
    author: author || {
      name: 'Equipe AGÊNCIA OZ',
      role: 'Especialista em Tecnologia',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?fm=webp&fit=crop&w=100&h=100&q=70'
    },
    status: status || 'published'
  };

  posts.unshift(newPost);
  savePosts(posts);

  res.status(201).json(newPost);
});

// PUT /api/posts/:id - Update post (Protected)
app.put('/api/posts/:id', authMiddleware, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const posts = getStoredPosts();
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Artigo não encontrado para atualização.' });
  }

  const existing = posts[index];
  const { title, slug, excerpt, content, category, featuredImage, author, status, date } = req.body;

  const updatedPost = {
    ...existing,
    title: title !== undefined ? title : existing.title,
    slug: slug !== undefined ? slug : existing.slug,
    excerpt: excerpt !== undefined ? excerpt : existing.excerpt,
    content: content !== undefined ? content : existing.content,
    category: category !== undefined ? category : existing.category,
    featuredImage: featuredImage !== undefined ? featuredImage : existing.featuredImage,
    author: author !== undefined ? author : existing.author,
    status: status !== undefined ? status : existing.status,
    date: date !== undefined ? date : existing.date
  };

  posts[index] = updatedPost;
  savePosts(posts);

  res.json(updatedPost);
});

// DELETE /api/posts/:id - Delete post (Protected)
app.delete('/api/posts/:id', authMiddleware, (req, res) => {
  const id = parseInt(req.params.id, 10);
  let posts = getStoredPosts();
  const initialLen = posts.length;

  posts = posts.filter(p => p.id !== id);

  if (posts.length === initialLen) {
    return res.status(404).json({ error: 'Artigo não encontrado para remoção.' });
  }

  savePosts(posts);
  res.json({ success: true, message: 'Artigo removido com sucesso.' });
});

// --- BASE DE CONHECIMENTO DO OZZY API ENDPOINTS ---

// GET /api/ozzy/knowledge - List all knowledge items
app.get('/api/ozzy/knowledge', (req, res) => {
  const items = getStoredKnowledge();
  res.json({ total: items.length, items });
});

// POST /api/ozzy/knowledge - Create knowledge item (Protected)
app.post('/api/ozzy/knowledge', authMiddleware, (req, res) => {
  const { title, category, content, tags, priority, active, suggestedLinks } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ error: 'Título, categoria e conteúdo são obrigatórios.' });
  }

  const items = getStoredKnowledge();
  const newId = `kb-${Date.now()}`;
  
  const parsedTags = Array.isArray(tags) 
    ? tags 
    : typeof tags === 'string' 
      ? tags.split(',').map(t => t.trim()).filter(Boolean) 
      : [];

  const newItem: KnowledgeItem = {
    id: newId,
    title: title.trim(),
    category: category.trim(),
    content: content.trim(),
    tags: parsedTags,
    priority: priority || 'medium',
    active: active !== false,
    suggestedLinks: Array.isArray(suggestedLinks) ? suggestedLinks : [],
    updatedAt: new Date().toISOString().split('T')[0]
  };

  items.unshift(newItem);
  saveKnowledge(items);

  res.status(201).json(newItem);
});

// PUT /api/ozzy/knowledge/:id - Update knowledge item (Protected)
app.put('/api/ozzy/knowledge/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const items = getStoredKnowledge();
  const index = items.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Tópico de conhecimento não encontrado.' });
  }

  const existing = items[index];
  const { title, category, content, tags, priority, active, suggestedLinks } = req.body;

  const parsedTags = tags !== undefined
    ? (Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map(t => t.trim()).filter(Boolean) : existing.tags)
    : existing.tags;

  const updatedItem: KnowledgeItem = {
    ...existing,
    title: title !== undefined ? title.trim() : existing.title,
    category: category !== undefined ? category.trim() : existing.category,
    content: content !== undefined ? content.trim() : existing.content,
    tags: parsedTags,
    priority: priority !== undefined ? priority : existing.priority,
    active: active !== undefined ? active : existing.active,
    suggestedLinks: suggestedLinks !== undefined ? suggestedLinks : existing.suggestedLinks,
    updatedAt: new Date().toISOString().split('T')[0]
  };

  items[index] = updatedItem;
  saveKnowledge(items);

  res.json(updatedItem);
});

// DELETE /api/ozzy/knowledge/:id - Delete knowledge item (Protected)
app.delete('/api/ozzy/knowledge/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  let items = getStoredKnowledge();
  const initialLen = items.length;

  items = items.filter(i => i.id !== id);

  if (items.length === initialLen) {
    return res.status(404).json({ error: 'Tópico não encontrado para remoção.' });
  }

  saveKnowledge(items);
  res.json({ success: true, message: 'Tópico removido com sucesso.' });
});

// POST /api/ozzy/knowledge/reset - Reset knowledge to agency defaults (Protected)
app.post('/api/ozzy/knowledge/reset', authMiddleware, (req, res) => {
  saveKnowledge(DEFAULT_KNOWLEDGE_ITEMS);
  res.json({ success: true, message: 'Base de conhecimento restaurada com sucesso.', items: DEFAULT_KNOWLEDGE_ITEMS });
});

// --- TABELA DE PREÇOS & PROPOSTAS COMERCIAIS API ENDPOINTS ---

// GET /api/proposals/config - Get proposal packages and settings (Public & Admin)
app.get('/api/proposals/config', (req, res) => {
  const config = getStoredProposalConfig();
  res.json(config);
});

// PUT /api/proposals/config - Update full config or general settings (Protected)
app.put('/api/proposals/config', authMiddleware, (req, res) => {
  const { packages, generalSettings } = req.body;
  const current = getStoredProposalConfig();

  const updated: ProposalConfig = {
    packages: Array.isArray(packages) ? packages : current.packages,
    generalSettings: generalSettings ? {
      ...current.generalSettings,
      ...generalSettings
    } : current.generalSettings,
    updatedAt: new Date().toISOString().split('T')[0]
  };

  saveProposalConfig(updated);
  res.json(updated);
});

// POST /api/proposals/packages - Create new proposal package (Protected)
app.post('/api/proposals/packages', authMiddleware, (req, res) => {
  const { id, title, category, setupPrice, monthlyPrice, deliveryDays, paymentTerms, badge, popular, deliverables, notes, active } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Título do pacote é obrigatório.' });
  }

  const current = getStoredProposalConfig();
  const rawId = id || title.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/(^_|_$)+/g, '');

  let pkgId = rawId || `pkg_${Date.now()}`;
  if (current.packages.some(p => p.id === pkgId)) {
    pkgId = `${pkgId}_${Date.now().toString().slice(-4)}`;
  }

  const newPkg: ProposalPackage = {
    id: pkgId,
    title: title.trim(),
    category: (category || 'Serviços').trim(),
    setupPrice: Number(setupPrice) || 0,
    monthlyPrice: Number(monthlyPrice) || 0,
    deliveryDays: (deliveryDays || '7 a 15 dias úteis').trim(),
    paymentTerms: (paymentTerms || 'PIX com 10% de desconto ou até 12x').trim(),
    badge: badge ? badge.trim() : undefined,
    popular: Boolean(popular),
    deliverables: Array.isArray(deliverables) ? deliverables.filter(Boolean) : ['Consultoria & Implementação Especializada'],
    notes: notes ? notes.trim() : '',
    active: active !== false,
    order: current.packages.length + 1
  };

  current.packages.push(newPkg);
  saveProposalConfig(current);

  res.status(201).json(newPkg);
});

// PUT /api/proposals/packages/:id - Update specific package (Protected)
app.put('/api/proposals/packages/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const current = getStoredProposalConfig();
  const index = current.packages.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Pacote de proposta não encontrado.' });
  }

  const existing = current.packages[index];
  const updatedPkg: ProposalPackage = {
    ...existing,
    title: updates.title !== undefined ? updates.title.trim() : existing.title,
    category: updates.category !== undefined ? updates.category.trim() : existing.category,
    setupPrice: updates.setupPrice !== undefined ? Number(updates.setupPrice) : existing.setupPrice,
    monthlyPrice: updates.monthlyPrice !== undefined ? Number(updates.monthlyPrice) : existing.monthlyPrice,
    deliveryDays: updates.deliveryDays !== undefined ? updates.deliveryDays.trim() : existing.deliveryDays,
    paymentTerms: updates.paymentTerms !== undefined ? updates.paymentTerms.trim() : existing.paymentTerms,
    badge: updates.badge !== undefined ? updates.badge.trim() : existing.badge,
    popular: updates.popular !== undefined ? Boolean(updates.popular) : existing.popular,
    deliverables: updates.deliverables !== undefined && Array.isArray(updates.deliverables)
      ? updates.deliverables.filter(Boolean)
      : existing.deliverables,
    notes: updates.notes !== undefined ? updates.notes.trim() : existing.notes,
    active: updates.active !== undefined ? Boolean(updates.active) : existing.active,
    order: updates.order !== undefined ? Number(updates.order) : existing.order
  };

  current.packages[index] = updatedPkg;
  saveProposalConfig(current);

  res.json(updatedPkg);
});

// DELETE /api/proposals/packages/:id - Delete package (Protected)
app.delete('/api/proposals/packages/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const current = getStoredProposalConfig();
  const initialLen = current.packages.length;

  current.packages = current.packages.filter(p => p.id !== id);

  if (current.packages.length === initialLen) {
    return res.status(404).json({ error: 'Pacote de proposta não encontrado para remoção.' });
  }

  saveProposalConfig(current);
  res.json({ success: true, message: 'Pacote removido com sucesso.' });
});

// POST /api/proposals/reset-defaults - Reset to default catalog (Protected)
app.post('/api/proposals/reset-defaults', authMiddleware, (req, res) => {
  saveProposalConfig(DEFAULT_PROPOSALS_CONFIG);
  res.json(DEFAULT_PROPOSALS_CONFIG);
});

// --- GESTOR DE CONVERSAS & CRM DE LEADS DO OZZY (GOHIGHLEVEL STYLE) ---

// GET /api/ozzy/conversations - List conversations with filtering & stats
app.get('/api/ozzy/conversations', (req, res) => {
  let conversations = getStoredConversations();
  const { search, stage, channel, unreadOnly, assignedTo } = req.query;

  // Compute overall stats before filtering list
  const stats = {
    total: conversations.length,
    unread: conversations.filter(c => c.unreadCount > 0).length,
    handledByAi: conversations.filter(c => c.assignedTo === 'ozzy_ai').length,
    handledByHuman: conversations.filter(c => c.assignedTo === 'human_agent').length,
    totalDealValue: conversations.reduce((acc, c) => acc + (Number(c.dealValue) || 0), 0),
    stageCounts: {
      novo_lead: conversations.filter(c => c.stage === 'novo_lead').length,
      qualificado: conversations.filter(c => c.stage === 'qualificado').length,
      proposta: conversations.filter(c => c.stage === 'proposta').length,
      negociacao: conversations.filter(c => c.stage === 'negociacao').length,
      fechado: conversations.filter(c => c.stage === 'fechado').length,
      perdido: conversations.filter(c => c.stage === 'perdido').length
    }
  };

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    conversations = conversations.filter(c => 
      c.contact?.name?.toLowerCase().includes(q) ||
      c.contact?.company?.toLowerCase().includes(q) ||
      c.contact?.phone?.includes(q) ||
      c.contact?.email?.toLowerCase().includes(q) ||
      (Array.isArray(c.tags) && c.tags.some((t: string) => t.toLowerCase().includes(q))) ||
      c.lastMessage?.toLowerCase().includes(q)
    );
  }

  if (stage && stage !== 'all') {
    conversations = conversations.filter(c => c.stage === stage);
  }

  if (channel && channel !== 'all') {
    conversations = conversations.filter(c => c.channel === channel);
  }

  if (unreadOnly === 'true') {
    conversations = conversations.filter(c => c.unreadCount > 0);
  }

  if (assignedTo && assignedTo !== 'all') {
    conversations = conversations.filter(c => c.assignedTo === assignedTo);
  }

  // Sort by most recent message
  conversations.sort((a, b) => new Date(b.lastMessageAt || 0).getTime() - new Date(a.lastMessageAt || 0).getTime());

  res.json({
    total: conversations.length,
    conversations,
    stats
  });
});

// GET /api/ozzy/conversations/:id - Get single conversation
app.get('/api/ozzy/conversations/:id', (req, res) => {
  const { id } = req.params;
  const conversations = getStoredConversations();
  const conv = conversations.find(c => c.id === id);

  if (!conv) {
    return res.status(404).json({ error: 'Conversa não encontrada.' });
  }

  res.json(conv);
});

// POST /api/ozzy/conversations - Create new lead / conversation
app.post('/api/ozzy/conversations', (req, res) => {
  const { contact, stage, channel, tags, dealValue, initialMessage, sourcePage } = req.body;

  const conversations = getStoredConversations();
  const now = new Date().toISOString();

  const newConv = {
    id: `conv-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    contact: contact || {
      name: 'Novo Contato',
      company: '',
      email: '',
      phone: '',
      city: 'Canoas',
      state: 'RS'
    },
    status: 'active',
    stage: stage || 'novo_lead',
    assignedTo: 'ozzy_ai',
    channel: channel || 'web_chat',
    tags: Array.isArray(tags) ? tags : ['#novo-lead'],
    dealValue: Number(dealValue) || 1500,
    unreadCount: 1,
    isStarred: false,
    sourcePage: sourcePage || '/360-graus',
    lastMessage: initialMessage || 'Nova oportunidade criada.',
    lastMessageAt: now,
    createdAt: now,
    messages: initialMessage ? [
      {
        id: `msg-${Date.now()}`,
        role: 'user',
        senderName: contact?.name || 'Cliente',
        content: initialMessage,
        timestamp: now,
        channel: channel || 'web_chat'
      }
    ] : []
  };

  conversations.unshift(newConv);
  saveConversations(conversations);

  res.status(201).json(newConv);
});

// POST /api/ozzy/conversations/:id/messages - Send a message or note in thread
app.post('/api/ozzy/conversations/:id/messages', (req, res) => {
  const { id } = req.params;
  const { role, content, senderName, channel } = req.body;

  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Conteúdo da mensagem é obrigatório.' });
  }

  const conversations = getStoredConversations();
  const index = conversations.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Conversa não encontrada.' });
  }

  const now = new Date().toISOString();
  const conv = conversations[index];

  const newMsg = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    role: role || 'human_agent',
    senderName: senderName || (role === 'human_agent' ? 'Atendente OZ' : role === 'assistant' ? 'OZZY (IA)' : role === 'internal_note' ? 'Nota Interna' : conv.contact.name),
    content,
    timestamp: now,
    channel: channel || conv.channel || 'web_chat'
  };

  if (!Array.isArray(conv.messages)) {
    conv.messages = [];
  }

  conv.messages.push(newMsg);
  if (role !== 'internal_note') {
    conv.lastMessage = content;
    conv.lastMessageAt = now;
  }

  // If human agent replies, mark assigned to human and clear unread count
  if (role === 'human_agent') {
    conv.assignedTo = 'human_agent';
    conv.unreadCount = 0;
  }

  conversations[index] = conv;
  saveConversations(conversations);

  res.status(201).json({
    success: true,
    message: newMsg,
    conversation: conv
  });
});

// PUT /api/ozzy/conversations/:id - Update lead details, stage, tags, value
app.put('/api/ozzy/conversations/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const conversations = getStoredConversations();
  const index = conversations.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Conversa não encontrada.' });
  }

  const updated = {
    ...conversations[index],
    ...updates,
    contact: {
      ...conversations[index].contact,
      ...(updates.contact || {})
    }
  };

  conversations[index] = updated;
  saveConversations(conversations);

  res.json(updated);
});

// DELETE /api/ozzy/conversations/:id - Delete / archive conversation
app.delete('/api/ozzy/conversations/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  let conversations = getStoredConversations();
  const initialLen = conversations.length;

  conversations = conversations.filter(c => c.id !== id);

  if (conversations.length === initialLen) {
    return res.status(404).json({ error: 'Conversa não encontrada.' });
  }

  saveConversations(conversations);
  res.json({ success: true, message: 'Conversa removida com sucesso.' });
});

// POST /api/ozzy/conversations/:id/ai-suggest - Copilot response generator
app.post('/api/ozzy/conversations/:id/ai-suggest', async (req, res) => {
  const { id } = req.params;
  const { userGoal } = req.body;
  const conversations = getStoredConversations();
  const conv = conversations.find(c => c.id === id);

  if (!conv) {
    return res.status(404).json({ error: 'Conversa não encontrada.' });
  }

  const ai = getGeminiClient();
  const lastMessagesText = (conv.messages || []).slice(-5).map((m: any) => `${m.senderName}: ${m.content}`).join('\n');

  if (ai) {
    try {
      const prompt = `Você é o OZZY Copilot da AGÊNCIA OZ. 
Um atendente humano está atendendo um cliente potencial no CRM (estilo GoHighLevel).
Dados do Lead:
- Nome: ${conv.contact?.name || 'Cliente'}
- Empresa: ${conv.contact?.company || 'Não informada'}
- Segmento: ${conv.contact?.segment || 'Geral'}
- Serviço de interesse: ${conv.sourcePage || 'Solução 360'}
- Etapa do funil: ${conv.stage}

Histórico recente da conversa:
${lastMessagesText}

Objetivo do atendente: ${userGoal || 'Responder com extrema simpatia, tirar dúvidas técnicas com segurança e conduzir o cliente para agendamento de diagnóstico ou fechamento no WhatsApp Oficial (48) 99198-4678.'}

Gere uma sugestão de mensagem direta, persuasiva e elegante pronta para o atendente enviar.`;

      const result = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt
      });

      return res.json({
        suggestion: result.text || 'Olá! Ficamos muito felizes com seu interesse. Como podemos te auxiliar hoje?'
      });
    } catch (err) {
      console.error('Error in AI Copilot suggest:', err);
    }
  }

  res.json({
    suggestion: `Olá ${conv.contact?.name || ''}! Compreendemos perfeitamente a sua necessidade. Na AGÊNCIA OZ entregamos a Solução 360 completa com WordPress rápido, hospedagem Cloud blindada e suporte humanizado direto. Podemos te enviar a proposta detalhada no WhatsApp?`
  });
});

// POST /api/ozzy/conversations/reset-demo - Restore sample conversations
app.post('/api/ozzy/conversations/reset-demo', authMiddleware, (req, res) => {
  saveConversations(mockConversations);
  res.json({ success: true, message: 'Conversas de demonstração restauradas com sucesso.', conversations: mockConversations });
});

// --- OZZY AUTONOMOUS AGENT TOOLS & FUNCTION CALLING ENGINE ---

interface ToolActionResult {
  tool: string;
  actionLabel: string;
  data: any;
}

// 1. Tool: Check domain availability
function executeCheckDomain(domainRaw: string, clientName: string = 'Visitante Web'): ToolActionResult {
  let cleanDomain = (domainRaw || '')
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/[^a-z0-9\-\.]/g, '');

  if (!cleanDomain.includes('.')) {
    cleanDomain = `${cleanDomain}.com.br`;
  }

  const baseName = cleanDomain.split('.')[0] || 'meunegocio';
  const isComBr = cleanDomain.endsWith('.com.br');
  const isCom = cleanDomain.endsWith('.com');

  // Realistic simulation with deterministic check for sample/popular names
  const popularTakenNames = ['agenciaoz', 'google', 'globo', 'mercadolivre', 'uol', 'nike', 'apple', 'itau', 'bradesco', 'nubank', 'remix', 'loja', 'site'];
  const isTaken = popularTakenNames.some(t => baseName === t || cleanDomain.startsWith(`${t}.`));

  const available = !isTaken;
  const annualPrice = isComBr ? 'R$ 40,00/ano' : isCom ? 'R$ 79,90/ano' : 'R$ 69,90/ano';
  const registrar = isComBr ? 'Registro.br (Oficial Brasil)' : 'ICANN Oficial';

  const suggestions = [
    `${baseName}oficial.com.br`,
    `${baseName}digital.com.br`,
    `use${baseName}.com.br`,
    `${baseName}app.com.br`
  ].filter(s => s !== cleanDomain);

  const resultData = {
    domain: cleanDomain,
    available,
    status: available ? 'available' : 'registered',
    statusLabel: available ? 'Disponível para Registro Imediato' : 'Domínio já Registrado',
    annualPrice,
    registrar,
    suggestions: available ? [] : suggestions.slice(0, 3),
    registerUrl: isComBr ? `https://registro.br/busca-dominio/?query=${encodeURIComponent(cleanDomain)}` : `https://wa.me/5548991984678?text=Ola%2C+quero+registrar+o+dominio+${encodeURIComponent(cleanDomain)}`,
    ozHostingBenefit: 'Na contratação da Solução 360 Graus, cuidamos de toda a configuração de DNS, SSL e SPF/DKIM para você!'
  };

  recordAgentLog(
    'check_domain_availability',
    'Verificação de Domínio',
    { domain: cleanDomain },
    available ? `Domínio ${cleanDomain} livre para registro (${annualPrice})` : `Domínio ${cleanDomain} já registrado. Sugestões geradas.`,
    clientName
  );

  return {
    tool: 'check_domain_availability',
    actionLabel: 'Verificação de Domínio',
    data: resultData
  };
}

// 2. Tool: Generate Instant Proposal
function executeGenerateProposal(params: { serviceType?: string; companyName?: string; contactName?: string; customNotes?: string }, clientName: string = 'Visitante Web'): ToolActionResult {
  const serviceType = params.serviceType || 'solucao_360';
  const company = params.companyName || 'Sua Empresa';
  const contact = params.contactName || clientName || 'Cliente';
  const propId = `OZ-PROP-${Math.floor(1000 + Math.random() * 9000)}`;

  const config = getStoredProposalConfig();
  const matchedPkg = config.packages.find(p => p.id === serviceType || p.id.toLowerCase() === serviceType.toLowerCase())
    || config.packages.find(p => serviceType.toLowerCase().includes(p.id.toLowerCase()))
    || config.packages[0]
    || DEFAULT_PROPOSALS_CONFIG.packages[0];

  const title = matchedPkg?.title || 'Solução 360 Graus (Pacote Completo Digital)';
  const setupPrice = Number(matchedPkg?.setupPrice) >= 0 ? Number(matchedPkg.setupPrice) : 1890;
  const monthlyPrice = Number(matchedPkg?.monthlyPrice) >= 0 ? Number(matchedPkg.monthlyPrice) : 49.90;
  const deliveryDays = matchedPkg?.deliveryDays || '7 a 15 dias úteis';
  const paymentTerms = matchedPkg?.paymentTerms || 'PIX com 10% de desconto à vista ou até 12x no cartão de crédito';
  const deliverables = matchedPkg?.deliverables && matchedPkg.deliverables.length > 0 ? matchedPkg.deliverables : [
    'Diagnóstico Raio-X & SEO Local',
    'Site WordPress Ultrarrápido (Nota 90+ Google PageSpeed)',
    'Hospedagem Cloud cPanel NVMe Dedicada',
    'E-mails Corporativos Blindados com SPF, DKIM e DMARC',
    'Suporte Técnico VIP Humanizado no WhatsApp'
  ];

  const targetWhatsApp = config.generalSettings?.defaultWhatsApp || '5548991984678';

  const resultData = {
    proposalId: propId,
    serviceType: matchedPkg?.id || serviceType,
    title,
    clientCompany: company,
    clientContact: contact,
    setupPrice,
    setupPriceFormatted: setupPrice === 0 ? 'Grátis (R$ 0,00)' : `R$ ${setupPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    monthlyPrice,
    monthlyPriceFormatted: monthlyPrice === 0 ? 'Sem mensalidade' : `R$ ${monthlyPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês`,
    deliveryDays,
    paymentTerms,
    deliverables,
    directWhatsAppLink: `https://wa.me/${targetWhatsApp}?text=${encodeURIComponent(`Olá, gostaria de confirmar a proposta ${propId} (${title}) para a empresa ${company}.`)}`,
    status: 'generated',
    createdAt: new Date().toISOString()
  };

  recordAgentLog(
    'generate_instant_proposal',
    'Geração de Proposta Comercial',
    { serviceType, company, contact },
    `Proposta ${propId} (${title}) - Setup: R$ ${setupPrice}, Mensal: R$ ${monthlyPrice}`,
    clientName
  );

  return {
    tool: 'generate_instant_proposal',
    actionLabel: 'Proposta Comercial Gerada',
    data: resultData
  };
}

// 3. Tool: Schedule Diagnostic Meeting
function executeScheduleMeeting(params: { clientName?: string; preferredDate?: string; preferredTime?: string; meetingChannel?: string; topic?: string }, clientName: string = 'Visitante Web'): ToolActionResult {
  const name = params.clientName || clientName || 'Cliente';
  const dateStr = params.preferredDate || 'Próximo dia útil';
  const timeStr = params.preferredTime || '14h30';
  const channel = params.meetingChannel === 'google_meet' ? 'Google Meet (Vídeo)' : params.meetingChannel === 'phone_call' ? 'Ligação Telefônica' : 'WhatsApp Oficial (Chamada/Chat VIP)';
  const topic = params.topic || 'Diagnóstico Raio-X Digital & Solução 360 Graus';
  const meetingId = `MTG-OZ-${Math.floor(1000 + Math.random() * 9000)}`;

  const resultData = {
    meetingId,
    clientName: name,
    dateTime: `${dateStr} às ${timeStr}`,
    channel,
    topic,
    duration: '20 minutos (Diagnóstico Rápido e Sem Custo)',
    expert: 'Consultor Sênior de Tecnologia & Negócios - AGÊNCIA OZ',
    confirmWhatsAppUrl: `https://wa.me/5548991984678?text=${encodeURIComponent(`Olá, agendei com o OZZY o diagnóstico ${meetingId} para ${dateStr} às ${timeStr} (${name}).`)}`,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  recordAgentLog(
    'schedule_diagnostic_meeting',
    'Agendamento de Diagnóstico',
    { name, dateStr, timeStr, channel },
    `Reunião ${meetingId} confirmada para ${dateStr} às ${timeStr} via ${channel}`,
    clientName
  );

  return {
    tool: 'schedule_diagnostic_meeting',
    actionLabel: 'Diagnóstico Agendado com Sucesso',
    data: resultData
  };
}

// 4. Tool: Calculate ROI & Speed Gain
function executeCalculateRoi(params: { monthlyVisitors?: number; currentHostingType?: string }, clientName: string = 'Visitante Web'): ToolActionResult {
  const visitors = Number(params.monthlyVisitors) || 3000;
  const currentSpeed = '4.2s (Média de mercado lenta)';
  const ozSpeed = '0.7s (Nota 95+ PageSpeed NVMe)';
  const bounceReduction = 'Redução de até 45% na taxa de rejeição';
  const conversionIncrease = '+28% a +35% no volume de contatos e vendas';
  const estimatedSavedLeads = Math.round(visitors * 0.035);

  const resultData = {
    monthlyVisitors: visitors,
    currentSpeed,
    ozSpeed,
    speedGain: '6x mais rápido',
    bounceReduction,
    conversionIncrease,
    estimatedSavedLeads: `${estimatedSavedLeads} novos contatos/mês recuperados`,
    annualEstimateImpact: `Aproximadamente R$ ${(estimatedSavedLeads * 180 * 12).toLocaleString('pt-BR')} em oportunidades que deixam de ser perdidas por lentidão.`,
    recommendation: 'Migração para Hospedagem Cloud NVMe com cPanel e Otimização PageSpeed',
    actionUrl: '/servicos/hospedagem'
  };

  recordAgentLog(
    'calculate_roi_performance',
    'Simulação de ROI & Velocidade',
    { visitors },
    `Simulação para ${visitors} visitas: ganho de ${conversionIncrease} e ${estimatedSavedLeads} leads/mês`,
    clientName
  );

  return {
    tool: 'calculate_roi_performance',
    actionLabel: 'Análise de Desempenho & ROI',
    data: resultData
  };
}

// Declarations of Agent Tools for Gemini 3
const ozzyAgentDeclarations = [
  {
    name: 'check_domain_availability',
    description: 'Verifica a disponibilidade de um domínio .com.br ou .com para a empresa do cliente, retornando preço anual, status e sugestões de nomes.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        domainName: {
          type: Type.STRING,
          description: 'O domínio a consultar (ex: meunegocio.com.br ou clinicasilva.com).'
        }
      },
      required: ['domainName']
    }
  },
  {
    name: 'generate_instant_proposal',
    description: 'Gera uma proposta comercial personalizada e imediata com escopo, preços de setup, mensalidade e formas de pagamento da AGÊNCIA OZ.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        serviceType: {
          type: Type.STRING,
          description: 'O tipo de serviço: "solucao_360", "hospedagem_cpanel", "landing_page", "site_institucional", "seo_geo" ou "provox_streaming".'
        },
        companyName: {
          type: Type.STRING,
          description: 'Nome da empresa do cliente.'
        },
        contactName: {
          type: Type.STRING,
          description: 'Nome da pessoa de contato.'
        },
        customNotes: {
          type: Type.STRING,
          description: 'Observações específicas ou nicho de atuação.'
        }
      },
      required: ['serviceType']
    }
  },
  {
    name: 'schedule_diagnostic_meeting',
    description: 'Agenda um diagnóstico gratuito de 20 minutos de presença digital com um especialista da AGÊNCIA OZ.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        clientName: {
          type: Type.STRING,
          description: 'Nome do cliente.'
        },
        preferredDate: {
          type: Type.STRING,
          description: 'Data ou dia da semana desejado (ex: "Sexta-feira", "Amanhã").'
        },
        preferredTime: {
          type: Type.STRING,
          description: 'Horário sugerido (ex: "14h00", "16h30").'
        },
        meetingChannel: {
          type: Type.STRING,
          description: 'Canal: "whatsapp_call", "google_meet" ou "phone_call".'
        }
      },
      required: ['clientName']
    }
  },
  {
    name: 'calculate_roi_performance',
    description: 'Calcula o impacto de velocidade, retenção de usuários e retorno sobre investimento de ter um site na nuvem rápida da OZ.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        monthlyVisitors: {
          type: Type.NUMBER,
          description: 'Número de visitantes mensais estimados no site.'
        },
        currentHostingType: {
          type: Type.STRING,
          description: 'Tipo de hospedagem atual.'
        }
      },
      required: ['monthlyVisitors']
    }
  }
];

// Heuristic Tool Detector for Smart Fallback & Direct Triggering
function detectAndExecuteHeuristicTool(message: string, currentLead: OzzyLeadState = {}): ToolActionResult | null {
  const p = message.toLowerCase();

  // 1. Detect domain checking intents (ex: "verificar dominio x", "checar se meunegocio.com.br está livre", "tem o dominio...")
  const domainMatch = p.match(/(?:(?:verificar|consultar|checar|disponibilidade|ver|tem|pesquisar)\s+(?:de\s+)?(?:o\s+)?dominio\s+([a-z0-9\-\.]+))|([a-z0-9\-]+\.(?:com\.br|com|net|org|site|app|adv\.br|med\.br))/i);
  if (domainMatch && (p.includes('dominio') || p.includes('domínio') || p.includes('.com') || p.includes('.br'))) {
    const rawDom = domainMatch[1] || domainMatch[2] || (currentLead.company ? `${currentLead.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br` : 'suaempresa.com.br');
    return executeCheckDomain(rawDom, currentLead.name || 'Visitante Web');
  }

  // 2. Detect proposal generation intent
  if (p.includes('gerar proposta') || p.includes('fazer proposta') || p.includes('quanto fica') || p.includes('orçamento instantâneo') || p.includes('cadastrar empresa') || p.includes('solucao 360')) {
    let sType = 'solucao_360';
    if (p.includes('hospedagem') || p.includes('cpanel')) sType = 'hospedagem_cpanel';
    else if (p.includes('landing page') || p.includes('lp')) sType = 'landing_page';
    else if (p.includes('site') && !p.includes('360')) sType = 'site_institucional';
    else if (p.includes('radio') || p.includes('rádio') || p.includes('provox') || p.includes('streaming')) sType = 'provox_streaming';
    else if (p.includes('seo') || p.includes('geo') || p.includes('google')) sType = 'seo_geo';

    return executeGenerateProposal({
      serviceType: sType,
      companyName: currentLead.company || 'Sua Empresa',
      contactName: currentLead.name || 'Cliente'
    }, currentLead.name || 'Visitante Web');
  }

  // 3. Detect meeting scheduling intent
  if (p.includes('agendar') || p.includes('marcar reuniao') || p.includes('marcar reunião') || p.includes('diagnostico') || p.includes('diagnóstico') || p.includes('conversar com especialista')) {
    return executeScheduleMeeting({
      clientName: currentLead.name || 'Cliente',
      preferredDate: p.includes('amanha') || p.includes('amanhã') ? 'Amanhã' : p.includes('sexta') ? 'Sexta-feira' : 'Próximo dia útil',
      preferredTime: '14h30',
      meetingChannel: 'whatsapp_call'
    }, currentLead.name || 'Visitante Web');
  }

  // 4. Detect ROI calculation intent
  if (p.includes('calcular roi') || p.includes('calcular velocidade') || p.includes('ganho de velocidade') || p.includes('pagespeed') || p.includes('visitas')) {
    const numMatch = p.match(/\b(\d{3,6})\b/);
    const vis = numMatch ? parseInt(numMatch[1], 10) : 3500;
    return executeCalculateRoi({ monthlyVisitors: vis }, currentLead.name || 'Visitante Web');
  }

  return null;
}

// --- AGENTE VIRTUAL OZZY (IA & CONSULTORIA CONVERSACIONAL) ---

interface OzzyLeadState {
  name?: string;
  company?: string;
  phone?: string;
  socialMedia?: string;
  city?: string;
  email?: string;
}

function getDynamicOzzySystemPrompt(currentLead: OzzyLeadState = {}): string {
  const knowledgeItems = getStoredKnowledge().filter(item => item.active !== false);

  const knowledgeText = knowledgeItems.map((item, idx) => {
    const tagsStr = item.tags.length > 0 ? ` [Tags: ${item.tags.join(', ')}]` : '';
    return `[#${idx + 1} - ${item.title} (${item.category})${tagsStr}]\n${item.content}`;
  }).join('\n\n');

  const knownName = currentLead.name && !currentLead.name.includes('Visitante Web') ? currentLead.name : '';
  const knownCompany = currentLead.company && !currentLead.company.includes('Origem:') ? currentLead.company : '';
  const knownPhone = currentLead.phone || '';
  const knownSocial = currentLead.socialMedia || '';
  const knownCity = currentLead.city && currentLead.city !== 'Visitante Online' ? currentLead.city : '';

  const missingFields: string[] = [];
  if (!knownName) missingFields.push('Nome');
  if (!knownCompany) missingFields.push('Empresa');
  if (!knownPhone) missingFields.push('Telefone / WhatsApp com DDD');
  if (!knownSocial) missingFields.push('Rede Social (Instagram @perfil ou link)');
  if (!knownCity) missingFields.push('Cidade');

  const leadStatusSummary = `
STATUS ATUAL DO CADASTRO DO CLIENTE (5 CAMPOS PRINCIPAIS):
1. Nome: ${knownName ? `✅ COLETADO: "${knownName}"` : '❌ PENDENTE'}
2. Empresa: ${knownCompany ? `✅ COLETADO: "${knownCompany}"` : '❌ PENDENTE'}
3. Telefone / WhatsApp: ${knownPhone ? `✅ COLETADO: "${knownPhone}"` : '❌ PENDENTE'}
4. Rede Social: ${knownSocial ? `✅ COLETADO: "${knownSocial}"` : '❌ PENDENTE'}
5. Cidade: ${knownCity ? `✅ COLETADO: "${knownCity}"` : '❌ PENDENTE'}
${missingFields.length === 0 ? '🎉 TODOS OS 5 DADOS FORAM COLETADOS COM SUCESSO!' : `⏳ CAMPOS AINDA FALTANTES NESTE DIÁLOGO: ${missingFields.join(', ')}`}`;

  return `Você é o OZZY, Consultor Inteligente de Tecnologia e Negócios da AGÊNCIA OZ (https://agenciaoz.com.br).

DIRETRIZES FUNDAMENTAIS DE COMUNICAÇÃO:
1. RESPOSTA DIRETA A PERGUNTAS E DÚVIDAS (PRIORIDADE MÁXIMA):
- Se o usuário fizer QUALQUER pergunta (ex: "qual a diferença entre SEO vs GEO", "o que é GEO", "quanto custa um site", "como funciona a hospedagem", "o que é cPanel", "como funciona a Solução 360", etc.), você DEVE responder IMEDIATAMENTE e com alta qualidade à pergunta dele.
- Explique de forma resumida, clara e persuasiva em tópicos curtos (com bullet points •, um abaixo do outro).
- NUNCA ignore a pergunta do cliente para forçar o formulário ou repetir mensagem de cadastro.

2. SOBRE SEO VS GEO (CONCEITO CRUCIAL DA AGÊNCIA OZ):
- SEO (Search Engine Optimization): Focado em buscadores tradicionais (Google, Bing). Otimiza palavras-chave, velocidade Core Web Vitals (nota 90+), backlinks, metatags e Google Maps (SEO Local) para aparecer nos links da SERP.
- GEO (Generative Engine Optimization): Focado em Motores de Busca com IA (ChatGPT, Google Gemini, Perplexity, Copilot e Google AI Overviews). Otimiza autoridade de marca, Schema.org enriquecido, respostas diretas e dados estruturados para que as IAs recomendem a empresa do cliente como autoridade.
- Solução 360° da OZ: Combina SEO + GEO para garantir liderança na busca tradicional e nas Inteligências Artificiais.

3. FLUXO DE QUALIFICAÇÃO (APENAS QUANDO NÃO HOUVER UMA PERGUNTA TÉCNICA/TEMÁTICA PENDENTE):
Se o cliente não fez uma pergunta temática e está apenas conversando ou iniciando o contato, siga a coleta de UM dado por vez:
1. 1º PASSO - NOME: Se ainda não tiver o nome do visitante, pergunte APENAS: "Qual é o seu nome?"
2. 2º PASSO - EMPRESA: Assim que ele responder o nome, agradeça e pergunte APENAS: "${knownName || '[Nome]'}, qual o nome da sua empresa ou negócio?"
3. 3º PASSO - WHATSAPP: Assim que tiver a empresa, pergunte APENAS: "Qual o seu WhatsApp com DDD para contato?"
4. 4º PASSO - REDE SOCIAL: Assim que tiver o WhatsApp, pergunte APENAS: "Qual o Instagram (@) da empresa?"
5. 5º PASSO - CIDADE: Assim que tiver o Instagram, pergunte APENAS: "De qual cidade você fala?"
6. FINALIZAÇÃO (QUANDO COMPLETAR OS 5 DADOS):
- Confirme que os dados foram registrados com sucesso no CRM da AGÊNCIA OZ.
- REGRA CRÍTICA: NUNCA liste, repita nem imprima os dados do cliente (como Empresa, Whats, Instagram, Cidade) na mensagem enviada a ele.
- Apresente o menu de soluções e serviços e pergunte: "Em quais serviços ou interesses você gostaria de ser atendido agora?"

${leadStatusSummary}

BASE DE CONHECIMENTO OFICIAL DA AGÊNCIA OZ:
${knowledgeText}

CONTATOS OFICIAIS DA OZ:
- WhatsApp Oficial: (48) 99198-4678
- E-mail: contato@agenciaoz.com.br
- Sede: Canoas / RS (Atendimento em todo o Brasil)`;
}

// Helper to extract lead contact data from messages
function extractLeadInfo(text: string, currentContact: any = {}) {
  const updated = { ...currentContact };
  let hasNewInfo = false;

  // Clean out any synthetic placeholders
  if (updated.name && (updated.name.includes('Visitante Web') || updated.name.includes('Visitante'))) {
    delete updated.name;
  }
  if (updated.company && (updated.company.startsWith('Origem:') || updated.company.includes('Origem:'))) {
    delete updated.company;
  }
  if (updated.city && (updated.city === 'Visitante Online' || updated.city.includes('Visitante'))) {
    delete updated.city;
  }

  // Clean helper
  const clean = text.trim();
  const lower = clean.toLowerCase();

  // 1. Extract email
  const emailMatch = clean.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (emailMatch && emailMatch[1]) {
    updated.email = emailMatch[1].trim().toLowerCase();
    hasNewInfo = true;
  }

  // 2. Extract phone (BR formats: (48) 99198-4678, 51 98888-7777, 48991984678, etc.)
  const phoneMatch = clean.match(/(?:(?:telefone|whats|whatsapp|fone|celular|tel|contato)\s*[:=]?\s*)?(?:\+?55\s?)?(?:\(?\s?([1-9]{2})\s?\)?\s?)?(9\s?\d{4}[-\s]?\d{4}|\d{4}[-\s]?\d{4})/i);
  if (phoneMatch && phoneMatch[0]) {
    const rawDigits = phoneMatch[0].replace(/\D/g, '');
    if (rawDigits.length >= 8 && rawDigits.length <= 13) {
      let formattedPhone = phoneMatch[0].replace(/^(?:telefone|whats|whatsapp|fone|celular|tel|contato)\s*[:=]?\s*/i, '').trim();
      if (rawDigits.length === 11) {
        formattedPhone = `(${rawDigits.slice(0, 2)}) ${rawDigits.slice(2, 7)}-${rawDigits.slice(7)}`;
      } else if (rawDigits.length === 10) {
        formattedPhone = `(${rawDigits.slice(0, 2)}) ${rawDigits.slice(2, 6)}-${rawDigits.slice(6)}`;
      }
      updated.phone = formattedPhone;
      hasNewInfo = true;
    }
  }

  // 3. Extract name patterns
  const namePatterns = [
    /(?:meu nome [eé]|me chamo|sou [oa]|aqui [eé] [oa]?|falo com|nome\s*[:=]\s*)\s*([A-ZÀ-Úa-zà-ú]+(?:\s+[A-ZÀ-Úa-zà-ú]+)*)/i,
    /(?:^|\n)\s*•?\s*Nome\s*[:=]\s*([^\n,\.]+)/i
  ];
  for (const pat of namePatterns) {
    const m = clean.match(pat);
    if (m && m[1] && m[1].length >= 2) {
      const candidate = m[1].trim();
      const candLower = candidate.toLowerCase();
      if (!candLower.includes('ozzy') && !candLower.includes('agencia') && !candLower.includes('empresa') && !candLower.includes('site') && !candLower.includes('ola') && !candLower.includes('bom dia')) {
        updated.name = candidate;
        hasNewInfo = true;
        break;
      }
    }
  }

  // If name is still missing and user typed a short 1-3 word text that looks like a person's name
  if (!updated.name && !clean.includes(':') && !clean.includes('@') && !clean.includes('http') && !clean.includes('?') && !clean.includes('/') && !clean.match(/\d/)) {
    const words = clean.split(/\s+/);
    if (words.length >= 1 && words.length <= 3) {
      const isSimpleName = words.every(w => /^[A-ZÀ-Úa-zà-ú]{2,}$/.test(w));
      const stopWords = ['sim', 'nao', 'não', 'ola', 'olá', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'site', 'sites', 'hospedagem', '360', 'orcamento', 'orçamento', 'radio', 'rádio', 'seo', 'geo', 'cpanel', 'midia', 'mídia', 'proposta', 'ajuda', 'suporte', 'consultor'];
      if (isSimpleName && !stopWords.includes(lower)) {
        updated.name = clean.charAt(0).toUpperCase() + clean.slice(1);
        hasNewInfo = true;
      }
    }
  }

  // 4. Extract company patterns
  const companyPatterns = [
    /(?:minha empresa [eé]|empresa\s*[:=]\s*|neg[oó]cio\s*[:=]\s*|loja\s*[:=]\s*|trabalho na|trabalho no|sou da|sou do|marca\s*[:=]\s*)\s*([A-ZÀ-Úa-zà-ú0-9\s&]+?)(?:[,\.\n]|$)/i,
    /(?:^|\n)\s*•?\s*Empresa\s*[:=]\s*([^\n,\.]+)/i
  ];
  for (const pat of companyPatterns) {
    const m = clean.match(pat);
    if (m && m[1] && m[1].length >= 2) {
      const candidate = m[1].trim();
      if (!candidate.toLowerCase().includes('ozzy') && !candidate.toLowerCase().includes('agência oz')) {
        updated.company = candidate;
        hasNewInfo = true;
        break;
      }
    }
  }

  // If user has a name already, and gives a 1-4 word text that is not phone/email/instagram, consider it company name
  if (updated.name && !updated.company && !hasNewInfo && !clean.includes('@') && !clean.match(/\d{4}/) && !clean.includes('http') && !clean.includes('?')) {
    const words = clean.split(/\s+/);
    if (words.length >= 1 && words.length <= 4) {
      const stopWords = ['sim', 'nao', 'não', 'ola', 'olá', 'oi', 'site', 'sites', 'hospedagem', '360', 'orcamento', 'orçamento', 'radio', 'rádio', 'seo', 'geo'];
      if (!stopWords.includes(lower)) {
        updated.company = clean;
        hasNewInfo = true;
      }
    }
  }

  // 5. Extract Social Media (Instagram / LinkedIn / Facebook / @usuario / link)
  const socialPatterns = [
    /(?:rede social|instagram|insta|facebook|linkedin|social|perfil)\s*[:=]\s*([^\n,\s]+)/i,
    /(?:^|[\s,])@([a-zA-Z0-9_\.]{2,30})/,
    /(?:https?:\/\/(?:www\.)?(?:instagram\.com|linkedin\.com|facebook\.com)\/[a-zA-Z0-9_\.\-]+)/i,
    /(?:^|\n)\s*•?\s*Rede\s*social\s*[:=]\s*([^\n,\.]+)/i
  ];
  for (const pat of socialPatterns) {
    const m = clean.match(pat);
    if (m) {
      const rawMatch = m[1] || m[0];
      let handle = rawMatch.trim();
      let cleanedHandle = handle.replace(/^(?:rede social|instagram|insta|facebook|linkedin|social|perfil)\s*[:=]\s*/i, '').trim();
      if (!cleanedHandle.startsWith('@') && !cleanedHandle.startsWith('http') && !cleanedHandle.includes(' ')) {
        cleanedHandle = `@${cleanedHandle}`;
      }
      if (cleanedHandle.length >= 2 && !cleanedHandle.toLowerCase().includes('ozzy') && !cleanedHandle.toLowerCase().includes('site')) {
        updated.socialMedia = cleanedHandle;
        hasNewInfo = true;
        break;
      }
    }
  }

  // If social media was asked (name, company, phone present) and user gave a handle or said "não tenho"
  if (!updated.socialMedia && updated.name && (updated.phone || updated.company)) {
    if (lower.includes('não tenho') || lower.includes('nao tenho') || lower.includes('sem instagram') || lower.includes('não uso') || lower.includes('nao uso')) {
      updated.socialMedia = 'Não possui';
      hasNewInfo = true;
    } else if (!clean.includes(' ') && !clean.match(/\d{4}/) && !clean.includes('?') && !clean.includes('/')) {
      const stopWords = ['sim', 'nao', 'não', 'ola', 'olá', 'oi', 'site', 'sites', 'hospedagem', '360', 'orcamento', 'orçamento', 'radio', 'rádio', 'seo', 'geo', 'ajuda'];
      if (!stopWords.includes(lower) && clean.length >= 2 && /^[a-zA-Z0-9_\.@]+$/.test(clean)) {
        updated.socialMedia = clean.startsWith('@') ? clean : `@${clean}`;
        hasNewInfo = true;
      }
    }
  }

  // 6. Extract city/state patterns
  const cityPatterns = [
    /(?:sou de|cidade\s*[:=]\s*|moro em|estamos em|estou em|atuamos em|sede em|de\s+)\s*([A-ZÀ-Úa-zà-ú\s]+(?:\/[A-Za-z]{2})?)(?:[,\.\n]|$)/i,
    /(?:^|\n)\s*•?\s*Cidade\s*[:=]\s*([^\n,\.]+)/i
  ];
  for (const pat of cityPatterns) {
    const m = clean.match(pat);
    if (m && m[1] && m[1].length >= 2) {
      const cityCandidate = m[1].trim();
      const candLower = cityCandidate.toLowerCase();
      if (!candLower.includes('ozzy') && !candLower.includes('site') && !candLower.includes('proposta') && !candLower.includes('empresa') && !candLower.includes('instagram')) {
        updated.city = cityCandidate;
        hasNewInfo = true;
        break;
      }
    }
  }

  // If city is still missing and user answered with 1-3 words
  if (!updated.city && updated.name && updated.socialMedia && !hasNewInfo) {
    if (lower.includes('não informar') || lower.includes('nao informar') || lower.includes('sigilo')) {
      updated.city = 'Não informada';
      hasNewInfo = true;
    } else if (!clean.includes('@') && !clean.match(/\d{3}/) && !clean.includes('?')) {
      const words = clean.split(/\s+/);
      if (words.length >= 1 && words.length <= 3) {
        const stopWords = ['sim', 'nao', 'não', 'ola', 'olá', 'oi', 'site', 'sites', 'hospedagem', '360', 'orcamento', 'orçamento'];
        if (!stopWords.includes(lower)) {
          updated.city = clean;
          hasNewInfo = true;
        }
      }
    }
  }

  return { contact: updated, hasNewInfo };
}

// Fallback intelligent knowledge responder that adapts to the conversation flow
function generateOzzyFallback(prompt: string, currentLead: OzzyLeadState = {}): {
  reply: string;
  suggestedActions: { label: string; url?: string; path?: string }[];
  postActionText?: string;
} {
  const p = prompt.toLowerCase().trim();
  const items = getStoredKnowledge().filter(i => i.active !== false);
  
  // Sort high priority first
  items.sort((a, b) => (b.priority === 'high' ? 1 : 0) - (a.priority === 'high' ? 1 : 0));

  const knownName = currentLead.name && !currentLead.name.includes('Visitante Web') ? currentLead.name : '';
  const knownCompany = currentLead.company && !currentLead.company.includes('Origem:') ? currentLead.company : '';
  const knownPhone = currentLead.phone || '';
  const knownSocial = currentLead.socialMedia || '';
  const knownCity = currentLead.city && currentLead.city !== 'Visitante Online' ? currentLead.city : '';

  // Determine next question in sequence
  let nextAsk = '';
  let allComplete = false;
  if (!knownName) {
    nextAsk = `\n\n👉 *Qual é o seu nome?*`;
  } else if (!knownCompany) {
    nextAsk = `\n\n👉 *${knownName}, qual é o nome da sua empresa ou negócio?*`;
  } else if (!knownPhone) {
    nextAsk = `\n\n👉 *Qual o seu WhatsApp com DDD para contato?*`;
  } else if (!knownSocial) {
    nextAsk = `\n\n👉 *Qual o Instagram (@) da sua empresa?*`;
  } else if (!knownCity) {
    nextAsk = `\n\n👉 *De qual cidade você fala?*`;
  } else {
    allComplete = true;
    nextAsk = '';
  }

  // 1. DIRECT THEMATIC QUERY: SEO VS GEO & AI SEARCH
  if (p.includes('geo') || (p.includes('seo') && (p.includes('diferen') || p.includes('ia') || p.includes('vs') || p.includes('busca') || p.includes('como') || p.includes('qual') || p.includes('o que') || p.includes('entender')))) {
    return {
      reply: `Excelente pergunta${knownName ? `, **${knownName}**` : ''}! Veja a diferença fundamental entre **SEO** e **GEO**:\n\n• **SEO (Search Engine Optimization)**:\nÉ a otimização tradicional voltada para buscadores clássicos como Google e Bing. O objetivo é ranquear nos links azuis da página de resultados (SERP) e no Google Maps através de palavras-chave, velocidade técnica (PageSpeed 90+), backlinks, metadados e SEO Local.\n\n• **GEO (Generative Engine Optimization)**:\nÉ a nova geração de otimização voltada para **Mecanismos de Busca com IA Generativa** (como ChatGPT, Google Gemini, Perplexity, Copilot e Google AI Overviews). Foca em autoridade semântica de marca, dados estruturados Schema.org e formato de respostas diretas para que as Inteligências Artificiais citem e recomendem a sua empresa diretamente nas respostas aos usuários.\n\n• **Como a AGÊNCIA OZ atua (Solução 360°)**:\nNós unificamos **SEO + GEO** em todos os projetos. Seu negócio conquista relevância nas buscas tradicionais do Google e é preparado para a liderança nas respostas com IA!`,
      suggestedActions: [
        { label: 'Página Futuro da Busca', path: '/l/futuro-da-busca' },
        { label: 'Serviços de SEO & GEO', path: '/servicos/seo' },
        { label: 'Solução 360°', path: '/360-graus' },
        { label: 'Consultoria no WhatsApp', url: 'https://wa.me/5548991984678?text=Ola%2C+gostaria+de+saber+mais+sobre+SEO+e+GEO+para+minha+empresa' }
      ]
    };
  }

  // 2. CHECK SPECIFIC KNOWLEDGE TOPICS
  for (const item of items) {
    const hasTagMatch = item.tags.some(tag => tag && p.includes(tag.toLowerCase()));
    const hasTitleMatch = p.includes(item.title.toLowerCase().slice(0, 15));
    const hasCategoryMatch = p.includes(item.category.toLowerCase());

    if (hasTagMatch || hasTitleMatch || hasCategoryMatch) {
      let actions = [
        { label: 'Solução 360°', path: '/360-graus' },
        { label: 'Simular Orçamento', path: '/orcamento' },
        { label: 'WhatsApp Oficial', url: 'https://wa.me/5548991984678?text=Ola%2C+estou+conversando+com+o+OZZY' }
      ];

      if (item.suggestedLinks && item.suggestedLinks.length > 0) {
        actions = item.suggestedLinks.map(l => ({
          label: l.label.replace(/^[\p{Emoji}\p{Extended_Pictographic}\s]+/u, '').trim() || l.label,
          ...(l.url.startsWith('http') ? { url: l.url } : { path: l.url })
        }));
      }

      return {
        reply: `Sobre **${item.title}**:\n\n${item.content}${nextAsk ? `\n\n${nextAsk.trim()}` : '\n\n*Posso te ajudar com mais algum detalhe ou tirar alguma dúvida específica?*'}`,
        suggestedActions: actions
      };
    }
  }

  // 3. IF USER IS ONLY FILLING FORM DATA (NO THEMATIC QUERY)
  // If user just gave their name
  if (knownName && !knownCompany && !p.includes('?') && p.split(' ').length <= 4) {
    return {
      reply: `Muito prazer, **${knownName}**!\n\n*Qual é o nome da sua empresa ou negócio?*`,
      suggestedActions: [
        { label: 'Solução 360°', path: '/360-graus' },
        { label: 'Sites & LPs', path: '/servicos/landingpages' },
        { label: 'Hospedagem Cloud', path: '/servicos/hospedagem' },
        { label: 'Fazer Orçamento', path: '/orcamento' }
      ]
    };
  }

  if (knownName && knownCompany && !knownPhone && !p.includes('?') && p.split(' ').length <= 4) {
    return {
      reply: `Excelente, **${knownName}** (${knownCompany})!\n\n*Qual o seu WhatsApp com DDD para contato?*`,
      suggestedActions: [
        { label: 'Solução 360°', path: '/360-graus' },
        { label: 'Fazer Orçamento', path: '/orcamento' }
      ]
    };
  }

  // If user just gave phone, social or city
  const hasFreshContactData = p.includes('@') || p.match(/\d{4}/) || p.includes('whatsapp') || p.includes('meu nome') || p.includes('me chamo');
  if (hasFreshContactData) {
    if (allComplete) {
      return {
        reply: `Perfeito${knownName ? `, **${knownName}**` : ''}! Seus dados foram registrados com sucesso no CRM da **AGÊNCIA OZ**.\n\nAbaixo você confere o nosso **Menu de Soluções e Serviços**:\n\n**Em quais serviços ou interesses você gostaria de ser atendido agora?**`,
        suggestedActions: [
          { label: 'Solução 360°', path: '/360-graus' },
          { label: 'Sites & LPs', path: '/servicos/landingpages' },
          { label: 'Hospedagem Cloud', path: '/servicos/hospedagem' },
          { label: 'Mídia Digital', path: '/servicos/midia' },
          { label: 'SEO Local', path: '/servicos/seo' },
          { label: 'Rádios & WebTV', path: '/servicos/streamradio' },
          { label: 'Simular Orçamento', path: '/orcamento' },
          { label: 'WhatsApp Oficial', url: 'https://wa.me/5548991984678?text=Ola%2C+acabei+de+me+cadastrar+com+o+OZZY+no+site' }
        ],
        postActionText: `Você poderá ver mais detalhes de cada área e navegar pelo site usando o **OZZY**!\n\n*Estou aqui para lhe explicar o conteúdo e tirar todas as suas dúvidas.*`
      };
    }

    return {
      reply: `Perfeito${knownName ? `, **${knownName}**` : ''}! Dados registrados com sucesso no CRM da **AGÊNCIA OZ**.\n\n${nextAsk.trim()}`,
      suggestedActions: [
        { label: 'Solução 360°', path: '/360-graus' },
        { label: 'Fazer Orçamento', path: '/orcamento' },
        { label: 'WhatsApp Oficial', url: 'https://wa.me/5548991984678?text=Ola%2C+acabei+de+me+cadastrar+com+o+OZZY+no+site' }
      ]
    };
  }

  // 4. Default helpful greeting / router
  return {
    reply: `Olá${knownName ? ` **${knownName}**` : ''}! Sou o **OZZY**, Consultor da **AGÊNCIA OZ**.\n\nComo posso te ajudar hoje? Você pode tirar dúvidas sobre **Solução 360°**, **Hospedagem cPanel**, **SEO vs GEO**, **Criação de Sites** ou **Mídia Digital**.${nextAsk ? `\n\n${nextAsk.trim()}` : ''}`,
    suggestedActions: [
      { label: 'Solução 360°', path: '/360-graus' },
      { label: 'Sites & LPs', path: '/servicos/landingpages' },
      { label: 'Hospedagem Cloud', path: '/servicos/hospedagem' },
      { label: 'SEO vs GEO', path: '/l/futuro-da-busca' },
      { label: 'Fazer Orçamento', path: '/orcamento' },
      { label: 'WhatsApp Oficial', url: 'https://wa.me/5548991984678?text=Ola%2C+estou+conversando+com+o+OZZY' }
    ]
  };
}

// GET /api/ozzy/agent/settings
app.get('/api/ozzy/agent/settings', authMiddleware, (req, res) => {
  res.json({ settings: getStoredAgentSettings() });
});

// PUT /api/ozzy/agent/settings
app.put('/api/ozzy/agent/settings', authMiddleware, (req, res) => {
  const current = getStoredAgentSettings();
  const updated = {
    ...current,
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  saveAgentSettings(updated);
  res.json({ success: true, settings: updated });
});

// GET /api/ozzy/agent/logs
app.get('/api/ozzy/agent/logs', authMiddleware, (req, res) => {
  res.json({ logs: getStoredAgentLogs() });
});

// DELETE /api/ozzy/agent/logs
app.delete('/api/ozzy/agent/logs', authMiddleware, (req, res) => {
  saveAgentLogs([]);
  res.json({ success: true, message: 'Logs de atividades do agente limpos com sucesso.' });
});

// POST /api/ozzy/agent/execute-tool - Direct tool trigger
app.post('/api/ozzy/agent/execute-tool', async (req, res) => {
  try {
    const { toolName, params, clientName } = req.body;
    let result: ToolActionResult | null = null;

    if (toolName === 'check_domain_availability') {
      result = executeCheckDomain(params?.domainName || params?.domain || 'meunegocio.com.br', clientName);
    } else if (toolName === 'generate_instant_proposal') {
      result = executeGenerateProposal(params || {}, clientName);
    } else if (toolName === 'schedule_diagnostic_meeting') {
      result = executeScheduleMeeting(params || {}, clientName);
    } else if (toolName === 'calculate_roi_performance') {
      result = executeCalculateRoi(params || {}, clientName);
    } else {
      return res.status(400).json({ error: `Ferramenta desconhecida: ${toolName}` });
    }

    res.json({ success: true, toolResult: result });
  } catch (err: any) {
    console.error('Error executing agent tool:', err);
    res.status(500).json({ error: err.message || 'Falha na execução da ferramenta.' });
  }
});

// POST /api/ozzy/chat
app.post('/api/ozzy/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    const sessionId = req.body?.sessionId;
    const sourcePage = req.body?.sourcePage || '/';
    const explicitLeadData = req.body?.leadData;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensagem inválida.' });
    }

    // Resolve current lead state before generating response
    let currentLeadState: OzzyLeadState = {};
    const convs = getStoredConversations();
    let existingConv = sessionId ? convs.find(c => c.id === sessionId) : undefined;
    
    if (existingConv && existingConv.contact) {
      currentLeadState = { ...existingConv.contact };
    }

    // Pre-extract any lead info present in this message or explicit payload
    const extraction = extractLeadInfo(message, currentLeadState);
    let updatedLead: OzzyLeadState = { ...extraction.contact };

    if (explicitLeadData) {
      if (explicitLeadData.name) updatedLead.name = explicitLeadData.name;
      if (explicitLeadData.company) updatedLead.company = explicitLeadData.company;
      if (explicitLeadData.email) updatedLead.email = explicitLeadData.email;
      if (explicitLeadData.phone) updatedLead.phone = explicitLeadData.phone;
      if (explicitLeadData.socialMedia) updatedLead.socialMedia = explicitLeadData.socialMedia;
      if (explicitLeadData.city) updatedLead.city = explicitLeadData.city;
    }

    const ai = getGeminiClient();
    const systemInstruction = getDynamicOzzySystemPrompt(updatedLead);
    const fallback = generateOzzyFallback(message, updatedLead);

    let reply = '';
    let source = 'knowledge-base';
    let toolAction: ToolActionResult | null = null;

    // Check if heuristic tool detector finds an intent
    const heuristicTool = detectAndExecuteHeuristicTool(message, updatedLead);
    if (heuristicTool) {
      toolAction = heuristicTool;
    }

    if (!ai) {
      reply = fallback.reply;
      source = 'knowledge-base';
      if (toolAction) {
        if (toolAction.tool === 'check_domain_availability') {
          reply = `Consultei o domínio **${toolAction.data.domain}** em tempo real!\n\n${toolAction.data.available ? `✅ **Domínio DISPONÍVEL para registro!**\nValor: **${toolAction.data.annualPrice}** via ${toolAction.data.registrar}.\nNa Solução 360 Graus da OZ cuidamos de toda a ativação e configuração de DNS para você.` : `❌ **Domínio já registrado.** Sugestões alternativas: ${toolAction.data.suggestions.map((s: string) => `\`${s}\``).join(', ')}`}`;
        } else if (toolAction.tool === 'generate_instant_proposal') {
          reply = `Gerei uma proposta comercial personalizada sob medida para você!\n\n📋 **${toolAction.data.title}** (Código: **${toolAction.data.proposalId}**)\n• Investimento de Setup: **${toolAction.data.setupPriceFormatted}**\n• Mensalidade: **${toolAction.data.monthlyPriceFormatted}**\n• Prazo de entrega: **${toolAction.data.deliveryDays}**\n• Forma de Pagamento: ${toolAction.data.paymentTerms}`;
        } else if (toolAction.tool === 'schedule_diagnostic_meeting') {
          reply = `Perfeito! Seu diagnóstico técnico foi pré-agendado com sucesso!\n\n📅 **${toolAction.data.dateTime}**\n📍 Canal: **${toolAction.data.channel}**\n🎯 Código de Agendamento: **${toolAction.data.meetingId}**\nNossa equipe entrará em contato para confirmar os detalhes!`;
        } else if (toolAction.tool === 'calculate_roi_performance') {
          reply = `Realizei a simulação de velocidade e impacto de conversão:\n\n🚀 **Ganho de ${toolAction.data.speedGain}** no carregamento!\n• Taxa de rejeição: **${toolAction.data.bounceReduction}**\n• Impacto estimado: **${toolAction.data.conversionIncrease}** em conversões (${toolAction.data.estimatedSavedLeads}).`;
        }
      }
    } else {
      try {
        // Prepare contents with recent history for context
        let contents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          const recentHistory = history.slice(-6);
          for (const h of recentHistory) {
            contents.push({
              role: h.role === 'user' ? 'user' : 'model',
              parts: [{ text: h.content }]
            });
          }
        }
        contents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        // Fast timeout wrapper to ensure Ozzy never hangs or delays
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('AI_TIMEOUT')), 10000)
        );

        const geminiCall = ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.5,
            maxOutputTokens: 650,
            thinkingConfig: { thinkingBudget: 0 },
            tools: [{ functionDeclarations: ozzyAgentDeclarations }]
          }
        });

        const response: any = await Promise.race([geminiCall, timeoutPromise]);

        // Check if Gemini invoked a function call
        if (response.functionCalls && response.functionCalls.length > 0) {
          const call = response.functionCalls[0];
          const callName = call.name;
          const callArgs = (call.args as any) || {};

          if (callName === 'check_domain_availability') {
            toolAction = executeCheckDomain(callArgs.domainName || callArgs.domain, updatedLead.name);
            reply = `🔍 **Consulta de Domínio Realizada:**\n\nO domínio **${toolAction.data.domain}** está **${toolAction.data.available ? 'LIVRE PARA REGISTRO ✅' : 'JÁ REGISTRADO ⚠️'}**.\nValor anual: **${toolAction.data.annualPrice}** via ${toolAction.data.registrar}.\n\nNa Solução 360 Graus da OZ cuidamos de toda a ativação e configuração de DNS para você!`;
          } else if (callName === 'generate_instant_proposal') {
            toolAction = executeGenerateProposal({
              serviceType: callArgs.serviceType,
              companyName: callArgs.companyName || updatedLead.company,
              contactName: callArgs.contactName || updatedLead.name,
              customNotes: callArgs.customNotes
            }, updatedLead.name);
            reply = `💼 **Proposta Comercial Solução 360 Graus Gerada com Sucesso!**\n\n• **Proposta:** #${toolAction.data.proposalId}\n• **Setup do Projeto:** **${toolAction.data.setupPriceFormatted}**\n• **Mensalidade Cloud:** **${toolAction.data.monthlyPriceFormatted}**\n• **Prazo de Entrega:** **${toolAction.data.deliveryDays}**\n\nConfira os detalhes no card abaixo ou finalize diretamente no WhatsApp da AGÊNCIA OZ!`;
          } else if (callName === 'schedule_diagnostic_meeting') {
            toolAction = executeScheduleMeeting({
              clientName: callArgs.clientName || updatedLead.name,
              preferredDate: callArgs.preferredDate,
              preferredTime: callArgs.preferredTime,
              meetingChannel: callArgs.meetingChannel
            }, updatedLead.name);
            reply = `📅 **Diagnóstico Estratégico Agendado:**\n\n• **Horário:** **${toolAction.data.dateTime}**\n• **Canal:** **${toolAction.data.channel}**\n• **Código de Agendamento:** **${toolAction.data.meetingId}**\n\nNossa equipe técnica entrará em contato para confirmar a sessão!`;
          } else if (callName === 'calculate_roi_performance') {
            toolAction = executeCalculateRoi({
              monthlyVisitors: callArgs.monthlyVisitors,
              currentHostingType: callArgs.currentHostingType
            }, updatedLead.name);
            reply = `📊 **Relatório de Impacto & Otimização de Performance:**\n\n🚀 **Ganho de Velocidade Estimado:** **${toolAction.data.speedGain}**\n• **Redução de Rejeição:** **${toolAction.data.bounceReduction}**\n• **Aumento Estimado em Conversões:** **${toolAction.data.conversionIncrease}**\n• **Impacto Anual:** ${toolAction.data.annualEstimateImpact}`;
          }
          source = 'gemini-ai-autonomous-agent';
        }

        if (!reply) {
          reply = response.text || fallback.reply;
          source = 'gemini-ai';
        }
      } catch (aiErr) {
        console.error('Gemini API call failed, falling back to smart knowledge base:', aiErr);
        reply = fallback.reply;
        source = 'knowledge-base-fallback';
      }
    }

    // Sanitize reply to strip any accidental CRM summary list
    let cleanReply = reply.replace(/\(?\*?\s*(?:Empresa|Whats|Instagram|Cidade|Rede social)\s*:\s*[^\n\)]+(?:\|\s*(?:Empresa|Whats|Instagram|Cidade|Rede social)\s*:\s*[^\n\)]+)*\s*\*?\)?/gi, '')
      .replace(/\(\s*\)/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // Check if reply itself contains the navigation explainer and split it into postActionText if so
    let effectivePostActionText = fallback.postActionText;
    const navMarker = 'Você poderá ver mais detalhes de cada área';
    if (cleanReply.includes(navMarker)) {
      const parts = cleanReply.split(navMarker);
      cleanReply = parts[0].trim();
      if (!effectivePostActionText) {
        effectivePostActionText = `${navMarker}${parts[1]}`.trim();
      }
    }

    // Record or update conversation in CRM
    if (sessionId) {
      try {
        const now = new Date().toISOString();
        let convIndex = convs.findIndex(c => c.id === sessionId);

        if (convIndex === -1) {
          const initialContact = {
            name: updatedLead.name || `Visitante Web (${sessionId.slice(-4)})`,
            company: updatedLead.company || `Origem: ${sourcePage}`,
            email: updatedLead.email || '',
            phone: updatedLead.phone || '',
            socialMedia: updatedLead.socialMedia || '',
            city: updatedLead.city || 'Visitante Online',
            state: 'BR'
          };

          const newTags = ['#site-ao-vivo', '#lead-ozzy'];
          if (extraction.hasNewInfo || updatedLead.phone || updatedLead.email || updatedLead.socialMedia) {
            newTags.push('#lead-qualificado');
          }
          if (toolAction) {
            newTags.push(`#agente-${toolAction.tool.replace(/_/g, '-')}`);
          }

          const newConv = {
            id: sessionId,
            contact: initialContact,
            status: 'active',
            stage: toolAction?.tool === 'generate_instant_proposal' ? 'proposta_enviada' : (initialContact.phone || initialContact.email || initialContact.socialMedia) ? 'qualificado' : 'novo_lead',
            assignedTo: 'ozzy_ai',
            channel: 'web_chat',
            tags: newTags,
            dealValue: toolAction?.data?.setupPrice || 1890,
            unreadCount: 1,
            isStarred: false,
            sourcePage: sourcePage,
            lastMessage: message,
            lastMessageAt: now,
            createdAt: now,
            messages: [
              {
                id: `msg-u-${Date.now()}`,
                role: 'user',
                senderName: initialContact.name || 'Visitante Web',
                content: message,
                timestamp: now,
                channel: 'web_chat'
              },
              {
                id: `msg-a-${Date.now() + 1}`,
                role: 'assistant',
                senderName: 'OZZY (IA Agente)',
                content: cleanReply,
                timestamp: now,
                channel: 'web_chat',
                suggestedActions: fallback.suggestedActions,
                postActionText: effectivePostActionText,
                toolAction: toolAction || undefined
              }
            ]
          };
          convs.unshift(newConv);
        } else {
          const existing = convs[convIndex];
          existing.lastMessage = message;
          existing.lastMessageAt = now;
          existing.contact = {
            ...existing.contact,
            ...updatedLead
          };

          if (extraction.hasNewInfo || explicitLeadData) {
            if (!existing.tags.includes('#lead-qualificado')) {
              existing.tags.push('#lead-qualificado');
            }
            if (existing.stage === 'novo_lead') {
              existing.stage = 'qualificado';
            }
          }

          if (toolAction) {
            const tag = `#agente-${toolAction.tool.replace(/_/g, '-')}`;
            if (!existing.tags.includes(tag)) existing.tags.push(tag);
            if (toolAction.tool === 'generate_instant_proposal' && (existing.stage === 'novo_lead' || existing.stage === 'qualificado')) {
              existing.stage = 'proposta_enviada';
              if (toolAction.data?.setupPrice) existing.dealValue = toolAction.data.setupPrice;
            }
          }

          if (!Array.isArray(existing.messages)) existing.messages = [];
          existing.messages.push({
            id: `msg-u-${Date.now()}`,
            role: 'user',
            senderName: existing.contact?.name || 'Visitante Web',
            content: message,
            timestamp: now,
            channel: 'web_chat'
          });
          existing.messages.push({
            id: `msg-a-${Date.now() + 1}`,
            role: 'assistant',
            senderName: 'OZZY (IA Agente)',
            content: cleanReply,
            timestamp: now,
            channel: 'web_chat',
            suggestedActions: fallback.suggestedActions,
            postActionText: effectivePostActionText,
            toolAction: toolAction || undefined
          });
          convs[convIndex] = existing;
        }
        saveConversations(convs);
      } catch (err) {
        console.error('Error auto-syncing widget conversation to CRM:', err);
      }
    }

    res.json({
      reply: cleanReply,
      source,
      suggestedActions: fallback.suggestedActions,
      postActionText: effectivePostActionText,
      toolAction: toolAction,
      leadData: updatedLead
    });
  } catch (error: any) {
    console.error('Error in /api/ozzy/chat:', error);
    // Graceful fallback on API error
    const fallback = generateOzzyFallback(req.body?.message || '');
    res.json({
      reply: fallback.reply,
      source: 'knowledge-base-fallback',
      suggestedActions: fallback.suggestedActions,
      postActionText: fallback.postActionText
    });
  }
});

// --- VITE MIDDLEWARE SETUP ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
