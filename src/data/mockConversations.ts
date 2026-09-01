import { Conversation } from '../types/ozzyChat';

export const mockConversations: Conversation[] = [
  {
    id: 'conv-01-clinica-canoas',
    contact: {
      name: 'Dr. Roberto Silveira',
      company: 'Clínica Cardio Canoas',
      email: 'contato@cardiocanoas.com.br',
      phone: '(51) 99882-4411',
      socialMedia: '@cardiocanoas',
      city: 'Canoas',
      state: 'RS',
      segment: 'Saúde & Medicina',
      notes: 'Procura criação de Landing Page para agendamento de consultas particulares e quer melhorar o posicionamento no Google Maps da região metropolitana.'
    },
    status: 'active',
    stage: 'proposta',
    assignedTo: 'human_agent',
    channel: 'web_chat',
    tags: ['#solucao360', '#medicos', '#canoas', '#seo-local', '#urgente'],
    dealValue: 3490,
    unreadCount: 1,
    isStarred: true,
    sourcePage: '/l/medicos-saude',
    lastMessage: 'Perfeito! Gostei da estrutura da Landing Page. Vocês conseguem integrar direto com nosso WhatsApp da recepção?',
    lastMessageAt: '2026-08-26T14:45:00Z',
    createdAt: '2026-08-26T11:20:00Z',
    messages: [
      {
        id: 'msg-01-1',
        role: 'user',
        senderName: 'Dr. Roberto Silveira',
        content: 'Olá! Sou médico cardiologista aqui de Canoas. Nosso site atual demora muito para abrir no celular e não recebemos contatos.',
        timestamp: '2026-08-26T11:20:15Z',
        channel: 'web_chat'
      },
      {
        id: 'msg-01-2',
        role: 'assistant',
        senderName: 'OZZY (IA)',
        content: 'Olá, Dr. Roberto! 🦇 É um prazer atender a Clínica Cardio Canoas!\n\nNa **AGÊNCIA OZ**, desenvolvemos **Landing Pages médicas de alta conversão** em WordPress limpo com velocidade de carregamento inferior a 1 segundo no celular, botões estratégicos de agendamento no WhatsApp e conformidade total com o CFM.\n\nAlém disso, aplicamos **SEO Local** para sua clínica aparecer no topo do Google quando pacientes de Canoas e Porto Alegre buscarem por cardiologistas.',
        timestamp: '2026-08-26T11:20:20Z',
        channel: 'web_chat',
        suggestedActions: [
          { label: 'Ver Modelo Médico', path: '/l/medicos-saude' },
          { label: 'Simular Orçamento', path: '/orcamento' }
        ]
      },
      {
        id: 'msg-01-3',
        role: 'user',
        senderName: 'Dr. Roberto Silveira',
        content: 'Quanto tempo leva para colocar no ar uma landing page dessas e qual o valor médio?',
        timestamp: '2026-08-26T11:23:40Z',
        channel: 'web_chat'
      },
      {
        id: 'msg-01-4',
        role: 'internal_note',
        senderName: 'Ozzy Copilot (IA)',
        content: '🔒 NOTA INTERNA: Lead altamente qualificado de Canoas/RS. Segmento médico de alto ticket. Recomendado enviar proposta do Pacote 360 Graus com Landing Page + Hospedagem Cloud + SEO Local.',
        timestamp: '2026-08-26T11:24:00Z',
        channel: 'internal'
      },
      {
        id: 'msg-01-5',
        role: 'human_agent',
        senderName: 'Rodrigo (Equipe OZ)',
        content: 'Olá, Dr. Roberto! Assumi o atendimento para te passar os detalhes. Nosso prazo padrão de entrega para Landing Pages médicas completas é de 5 a 7 dias úteis. Incluímos o design sob medida, hospedagem cloud blindada e configuração do Google Meu Negócio.',
        timestamp: '2026-08-26T11:35:10Z',
        channel: 'web_chat'
      },
      {
        id: 'msg-01-6',
        role: 'user',
        senderName: 'Dr. Roberto Silveira',
        content: 'Perfeito! Gostei da estrutura da Landing Page. Vocês conseguem integrar direto com nosso WhatsApp da recepção?',
        timestamp: '2026-08-26T14:45:00Z',
        channel: 'web_chat'
      }
    ]
  },
  {
    id: 'conv-02-advocacia-tavares',
    contact: {
      name: 'Dra. Camila Tavares',
      company: 'Tavares & Associados Advocacia',
      email: 'camila@tavaresadvocacia.com.br',
      phone: '(51) 98112-9900',
      socialMedia: '@tavares.adv',
      city: 'Porto Alegre',
      state: 'RS',
      segment: 'Direito / Advocacia',
      notes: 'Quer migrar hospedagem cPanel que vive caindo e e-mails que caem em spam. Interessada em redesign de site institucional.'
    },
    status: 'active',
    stage: 'qualificado',
    assignedTo: 'ozzy_ai',
    channel: 'web_chat',
    tags: ['#hospedagem', '#wordpress', '#cpanel', '#emails-corporativos'],
    dealValue: 2800,
    unreadCount: 0,
    isStarred: false,
    sourcePage: '/servicos/hospedagem',
    lastMessage: 'OZZY: Para escritórios de advocacia, oferecemos o plano Cloud cPanel com IPs limpos, DKIM, SPF e DMARC 100% configurados para seus e-mails nunca caírem em Spam.',
    lastMessageAt: '2026-08-26T13:10:00Z',
    createdAt: '2026-08-26T13:05:00Z',
    messages: [
      {
        id: 'msg-02-1',
        role: 'user',
        senderName: 'Dra. Camila Tavares',
        content: 'Boa tarde! Nossos e-mails corporativos estão caindo direto na caixa de spam dos clientes e o site do escritório está fora do ar. Vocês fazem migração?',
        timestamp: '2026-08-26T13:05:10Z',
        channel: 'web_chat'
      },
      {
        id: 'msg-02-2',
        role: 'assistant',
        senderName: 'OZZY (IA)',
        content: 'Boa tarde, Dra. Camila! 🦇\n\nSim! Fazemos a **migração 100% gratuita** do seu site e de todas as contas de e-mail sem tirar sua empresa do ar.\n\nNa nossa **Hospedagem Cloud com cPanel NVMe**, configuramos rigorosamente todos os registros de autenticação (SPF, DKIM, DMARC e RDNS reverso) garantindo que seus e-mails cheguem sempre na Caixa de Entrada com segurança e sem bloqueios.',
        timestamp: '2026-08-26T13:05:25Z',
        channel: 'web_chat',
        suggestedActions: [
          { label: 'Planos de Hospedagem', path: '/servicos/hospedagem' },
          { label: 'Chamar no WhatsApp', url: 'https://wa.me/5548991984678?text=Ola%2C+preciso+de+migracao+urgente+de+emails' }
        ]
      }
    ]
  },
  {
    id: 'conv-03-rede-varejo-provox',
    contact: {
      name: 'Marcelo Bittencourt',
      company: 'Supermercados Sul Real (8 Lojas)',
      email: 'marcelo.mkt@sulreal.com.br',
      phone: '(48) 99120-3344',
      socialMedia: '@redesulreal',
      city: 'Florianópolis',
      state: 'SC',
      segment: 'Varejo & Supermercados',
      notes: 'Busca sonorização ambiente indoor com rádio corporativa PROVOX para as 8 filiais da rede, com vinhetas promocionais diárias.'
    },
    status: 'active',
    stage: 'negociacao',
    assignedTo: 'human_agent',
    channel: 'whatsapp',
    tags: ['#provox', '#radio-web', '#som-ambiente', '#varejo', '#multilojas'],
    dealValue: 4800,
    unreadCount: 2,
    isStarred: true,
    sourcePage: '/servicos/provox',
    lastMessage: 'Excelente! Vamos fechar para as 8 unidades. Você pode nos enviar o modelo de contrato e as instruções para os gerentes instalarem o player?',
    lastMessageAt: '2026-08-26T15:10:00Z',
    createdAt: '2026-08-25T16:00:00Z',
    messages: [
      {
        id: 'msg-03-1',
        role: 'user',
        senderName: 'Marcelo Bittencourt',
        content: 'Olá! Vimos o sistema PROVOX de som ambiente para lojas. Como funciona a programação de ofertas e vinhetas?',
        timestamp: '2026-08-25T16:00:10Z',
        channel: 'whatsapp'
      },
      {
        id: 'msg-03-2',
        role: 'human_agent',
        senderName: 'Atendimento OZ',
        content: 'Olá Marcelo! O PROVOX conta com AutoDJ em nuvem funcionando 24 horas por dia. Programamos as vinhetas de ofertas para tocar em intervalos programados (ex: a cada 15 minutos), com grade musical personalizada de acordo com o perfil dos seus clientes e sem anúncios de concorrentes.',
        timestamp: '2026-08-25T16:15:00Z',
        channel: 'whatsapp'
      },
      {
        id: 'msg-03-3',
        role: 'internal_note',
        senderName: 'Equipe Comercial',
        content: '🔒 NOTA: Enviada tabela com desconto progressivo para 8 filiais (R$ 600/mês total). Cliente adorou o player web compatível com Android TV e Raspberry Pi.',
        timestamp: '2026-08-26T09:30:00Z',
        channel: 'internal'
      },
      {
        id: 'msg-03-4',
        role: 'user',
        senderName: 'Marcelo Bittencourt',
        content: 'Excelente! Vamos fechar para as 8 unidades. Você pode nos enviar o modelo de contrato e as instruções para os gerentes instalarem o player?',
        timestamp: '2026-08-26T15:10:00Z',
        channel: 'whatsapp'
      }
    ]
  },
  {
    id: 'conv-04-boutique-moda-social',
    contact: {
      name: 'Fernanda Linhares',
      company: 'Studio Linhares Moda & Design',
      email: 'fernanda@studiolinhares.com',
      phone: '(51) 98744-1234',
      socialMedia: '@studiolinhares',
      city: 'Gramado',
      state: 'RS',
      segment: 'Moda & E-commerce',
      notes: 'Interessada no novo serviço de Criação de Criativos para Instagram, organização de feed e copy de conversão para a coleção de inverno.'
    },
    status: 'active',
    stage: 'novo_lead',
    assignedTo: 'ozzy_ai',
    channel: 'lp_form',
    tags: ['#criativos', '#redessociais', '#copy', '#instagram', '#360graus'],
    dealValue: 1950,
    unreadCount: 1,
    isStarred: false,
    sourcePage: '/servicos/midia',
    lastMessage: 'Gostaria de um pacote mensal para artes de feed, carrosséis de produtos e textos persuasivos.',
    lastMessageAt: '2026-08-26T15:15:00Z',
    createdAt: '2026-08-26T15:15:00Z',
    messages: [
      {
        id: 'msg-04-1',
        role: 'user',
        senderName: 'Fernanda Linhares',
        content: 'Olá! Preenchi o formulário na página de Mídia. Gostaria de um pacote mensal para artes de feed, carrosséis de produtos e textos persuasivos para aumentar as vendas no Instagram.',
        timestamp: '2026-08-26T15:15:00Z',
        channel: 'lp_form'
      },
      {
        id: 'msg-04-2',
        role: 'assistant',
        senderName: 'OZZY (IA)',
        content: 'Olá Fernanda! 🦇 Seja muito bem-vinda!\n\nNo nosso serviço de **Mídia & Criativos**, criamos artes de alto impacto visual (Feed, Stories, Carrosséis) que seguem a mesma identidade da sua marca, acompanhadas de copywriting estratégico para atrair e converter seguidores em compradoras.\n\nVocê já tem uma data prevista para o lançamento da nova coleção?',
        timestamp: '2026-08-26T15:15:20Z',
        channel: 'lp_form',
        suggestedActions: [
          { label: 'Ver Solução 360°', path: '/360-graus' },
          { label: 'Falar no WhatsApp', url: 'https://wa.me/5548991984678' }
        ]
      }
    ]
  },
  {
    id: 'conv-05-engenharia-estrutural',
    contact: {
      name: 'Eng. Lucas Menezes',
      company: 'Menezes Engenharia & Projetos',
      email: 'lucas@menezeseng.com.br',
      phone: '(11) 97655-0988',
      socialMedia: '@menezesengenharia',
      city: 'São Paulo',
      state: 'SP',
      segment: 'Engenharia Civil & Construção',
      notes: 'Fechou o Pacote Solução 360 Completo: Site WordPress, Hospedagem NVMe e Otimização SEO.'
    },
    status: 'closed',
    stage: 'fechado',
    assignedTo: 'human_agent',
    channel: 'web_chat',
    tags: ['#solucao360', '#fechado', '#wordpress', '#seo-nacional'],
    dealValue: 5900,
    unreadCount: 0,
    isStarred: true,
    sourcePage: '/360-graus',
    lastMessage: 'Contrato assinado e pagamento da 1ª parcela efetuado via PIX. Ansioso para iniciarmos!',
    lastMessageAt: '2026-08-26T10:00:00Z',
    createdAt: '2026-08-24T09:00:00Z',
    messages: [
      {
        id: 'msg-05-1',
        role: 'user',
        senderName: 'Eng. Lucas Menezes',
        content: 'Bom dia! Gostaria de contratar a Solução 360 para estruturar toda a presença digital da Menezes Engenharia.',
        timestamp: '2026-08-24T09:00:00Z',
        channel: 'web_chat'
      },
      {
        id: 'msg-05-2',
        role: 'human_agent',
        senderName: 'Rodrigo (Equipe OZ)',
        content: 'Excelente decisão, Lucas! Vamos cuidar de tudo: do design sob medida à velocidade extrema e proteção do servidor.',
        timestamp: '2026-08-24T09:20:00Z',
        channel: 'web_chat'
      },
      {
        id: 'msg-05-3',
        role: 'user',
        senderName: 'Eng. Lucas Menezes',
        content: 'Contrato assinado e pagamento da 1ª parcela efetuado via PIX. Ansioso para iniciarmos!',
        timestamp: '2026-08-26T10:00:00Z',
        channel: 'web_chat'
      }
    ]
  }
];
