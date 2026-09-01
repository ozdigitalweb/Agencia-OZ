import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Radio,
  Music,
  Volume2,
  Mic,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  ShoppingBag,
  Hotel,
  Users,
  HeartPulse,
  Sparkles,
  Play,
  Headphones,
  Disc,
  Activity,
  Zap,
  Sliders,
  FileText,
  Star,
  DollarSign,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Send,
  ShieldCheck,
  Check,
  BookOpen,
  Globe,
  Award
} from 'lucide-react';
import ProvoxPlayer from '../components/ProvoxPlayer';

export default function ServicosProvox() {
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+o+PROVOX+Streaming+e+Radioweb.";

  // Billing Cycle State for Plans (Mensal vs Anual)
  const [billingCycle, setBillingCycle] = useState<'mensal' | 'anual'>('mensal');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    nomeRadio: '',
    planoInteresse: 'Premium Profissional',
    mensagem: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email) return;

    const text = `*Solicitação de Demonstração - PROVOX Streaming*\n\n` +
      `*Nome:* ${formData.nome}\n` +
      `*E-mail:* ${formData.email}\n` +
      `*Telefone:* ${formData.telefone}\n` +
      `*Rádio/Empresa:* ${formData.nomeRadio || 'Não informado'}\n` +
      `*Plano de Interesse:* ${formData.planoInteresse}\n` +
      `*Mensagem:* ${formData.mensagem}`;

    const url = `https://wa.me/5548991984678?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setFormSubmitted(true);
  };

  // REQUISITO: Segmentos de Atuação (Uma Solução, Diversos Segmentos de Sucesso)
  const segments = [
    {
      icon: <ShoppingBag className="h-6 w-6 text-orange-500" />,
      title: "Varejo & Compras",
      subtitle: "Engajando Consumidores em Tempo Real",
      desc: "A música certa aumenta a satisfação do cliente e impulsiona vendas. Implemente playlists personalizadas para criar um ambiente acolhedor e estimulante. Utilize o sistema para divulgar ofertas e promoções de forma direta aos consumidores em sua loja física."
    },
    {
      icon: <Hotel className="h-6 w-6 text-blue-700" />,
      title: "Hotelaria & Hospedarias",
      subtitle: "Transforme a Experiência dos Seus Hóspedes",
      desc: "Fortaleça a identidade de sua marca com trilhas sonoras refinadas para áreas comuns, notícias locais e anúncios dinâmicos sobre atividades, horários e serviços oferecidos no estabelecimento."
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-600" />,
      title: "Eventos & Entretenimento",
      subtitle: "Aplicações de Transmissão Inovadoras",
      desc: "Alcance uma audiência global com transmissões ao vivo de alta fidelidade para feiras, festivais e eventos corporativos. Crie rádios temáticas personalizadas com bate-papo, enquetes, áudio marketing e interatividade em tempo real."
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-red-500" />,
      title: "Saúde & Bem-Estar",
      subtitle: "Trilha Sonora de Recuperação e Equilíbrio",
      desc: "Promova ambientes tranquilos, acolhedores e livres de estresse com playlists de relaxamento focadas em consultórios e clínicas. Transmita meditações guiadas, dicas de bem-estar e programas informativos acessíveis."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-purple-600" />,
      title: "Festas & Celebrações Privadas",
      subtitle: "Música Perfeita Sem Interrupções",
      desc: "Ideal para aniversários, casamentos e formaturas. Oferecemos acesso a uma biblioteca musical adaptada a todos os gostos, controle absoluto e interação para pedidos especiais de músicas e dedicatórias em tempo real."
    }
  ];

  // Benefits
  const benefits = [
    {
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      title: "Facilidade de Uso Total",
      desc: "Painel administrativo intuitivo em português. Suba suas músicas, ordene playlists e agende vinhetas em poucos cliques."
    },
    {
      icon: <Activity className="h-6 w-6 text-cyan-500" />,
      title: "Qualidade de Áudio HD (AAC+ / MP3)",
      desc: "Transmissão límpida em até 320kbps estéreo com baixo consumo de dados para o ouvinte no celular."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
      title: "Suporte Técnico VIP 24/7",
      desc: "Equipe especializada pronta no WhatsApp para auxiliar na configuração de softwares de estúdio e automação."
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: "Alcance Global e Baixa Latência",
      desc: "Servidores Cloud de alta capacidade localizados estrategicamente para garantir áudio sem travamentos em qualquer país."
    },
    {
      icon: <DollarSign className="h-6 w-6 text-emerald-600" />,
      title: "Monetização e Gestão de Anúncios",
      desc: "Programe spots comerciais de patrocinadores em horários exatos e crie uma nova fonte de faturamento para sua rádio."
    },
    {
      icon: <Sliders className="h-6 w-6 text-purple-500" />,
      title: "Auto DJ Nuvem Ininterrupto",
      desc: "Sua rádio continua no ar 24h por dia mesmo se você desligar seu computador pessoal ou faltar energia no estúdio."
    }
  ];

  // Resource Categories (Recursos Oferecidos)
  const resourcesList = [
    {
      title: "Streaming de Alta Fidelidade",
      desc: "Formatos AAC+ HD e MP3 com bitrates variáveis de 32kbps a 320kbps. Transmissão estabilizada para audiências massivas sem perda de pacotes."
    },
    {
      title: "Painel de Controle Completo",
      desc: "Gerenciamento visual de arquivos com uploader em massa, criador de vinhetas, medidor de ouvintes e relatórios geográficos em tempo real."
    },
    {
      title: "Auto DJ 24/7 Inteligente",
      desc: "Agendamento inteligente de vinhetas, hora certa falada, vinhetas promocionais e troca automática de playlists de acordo com o horário do dia."
    },
    {
      title: "Web Player & Apps Mobile",
      desc: "Player responsivo HTML5 customizável com capa da música, título ao vivo e suporte para aplicativos nativos Android e iOS."
    },
    {
      title: "Agendador de Comerciais & Vinhetas",
      desc: "Insira vinhetas e chamadas promocionais a cada X músicas ou em horários exatos da grade de programação."
    },
    {
      title: "Suporte e SLA Garantido",
      desc: "Atendimento humano, rápido e resolutivo via WhatsApp, garantindo estabilidade contratual de 99.9% de uptime."
    }
  ];

  // Pricing Plans
  const plans = [
    {
      id: "basico",
      name: "Básico / Iniciante",
      desc: "Ideal para novas rádios web, rádios comunitárias e projetos autorais em fase inicial.",
      priceMonthly: 49.90,
      priceAnnual: 39.90,
      popular: false,
      features: [
        "Até 100 Ouvintes Simultâneos",
        "Auto DJ com 5 GB de Armazenamento SSD",
        "Qualidade AAC+ HD até 128 kbps",
        "Player HTML5 Responsivo para Sites",
        "Hora Certa Falada Automática",
        "Suporte Técnico Padrão via E-mail e WhatsApp"
      ],
      btnText: "Assinar Plano Básico"
    },
    {
      id: "premium",
      name: "Premium / Profissional",
      desc: "A escolha mais popular para emissoras comerciais, igrejas e sonorização de lojas físicas.",
      priceMonthly: 89.90,
      priceAnnual: 69.90,
      popular: true,
      features: [
        "Até 500 Ouvintes Simultâneos",
        "Auto DJ com 20 GB de Armazenamento SSD",
        "Qualidade Máxima AAC+ / MP3 HD 320 kbps",
        "Agendador Inteligente de Comerciais e Vinhetas",
        "Player Web Customizável com Capa de Álbum",
        "Estatísticas de Audiência Avançadas",
        "Suporte Prioritário VIP via WhatsApp"
      ],
      btnText: "Assinar Plano Profissional"
    },
    {
      id: "empresarial",
      name: "Empresarial / Corporativo",
      desc: "Para redes de lojas, grandes marcas, eventos e emissoras de grande porte.",
      priceMonthly: 179.90,
      priceAnnual: 139.90,
      popular: false,
      features: [
        "Ouvintes Simultâneos Ilimitados",
        "Auto DJ com 50 GB de Armazenamento SSD",
        "Qualidade de Estúdio 320 kbps HD",
        "App Android Dedicado da sua Rádio de Brinde",
        "Multi-usuários com Níveis de Acesso",
        "Relatórios de Execução de Comerciais para Clientes",
        "Gerente de Conta Dedicado + Suporte 24/7"
      ],
      btnText: "Assinar Plano Corporativo"
    }
  ];

  // Testimonials & Cases
  const testimonials = [
    {
      quote: "Com o PROVOX, transformamos a sonorização das nossas 12 lojas físicas. Agendamos comerciais das promoções do dia e o faturamento das ofertas de balcão subiu vertiginosamente.",
      author: "Marcelo Silveira",
      role: "Diretor de Marketing — Redes de Supermercados",
      rating: 5
    },
    {
      quote: "A qualidade do áudio e a estabilidade do Auto DJ impressionam. Nossa igreja transmite cultos e música 24h sem nenhuma queda. O suporte da OZ é sensacional!",
      author: "Pr. Fernando Garcia",
      role: "Comunidade Evangélica Vida Nova",
      rating: 5
    },
    {
      quote: "O player responsivo encaixou perfeitamente no nosso portal de notícias. Os ouvintes elogiam muito a clareza do som mesmo na conexão 4G do celular.",
      author: "Luciana Bastos",
      role: "Gestora de Mídia — Rádio Web Metrópole",
      rating: 5
    }
  ];

  // FAQ Items
  const faqs = [
    {
      q: "O que é o sistema de Rádio Web PROVOX?",
      a: "O PROVOX é uma solução completa de streaming de áudio e Auto DJ em nuvem que permite a qualquer empresa ou comunicador criar e gerenciar uma emissora de rádio online com áudio de alta fidelidade e vinhetas comerciais agendadas."
    },
    {
      q: "Preciso deixar meu computador ligado para a rádio funcionar?",
      a: "Não! Com o nosso recurso Auto DJ em nuvem, você envia suas músicas e comerciais para nossos servidores e programa a grade. O servidor mantém a rádio transmitindo 24 horas por dia, 7 dias por semana de forma 100% autônoma."
    },
    {
      q: "Como faço para transmitir ao vivo do meu estúdio?",
      a: "Você pode usar programas gratuitos como OBS Studio, Mixxx ou BUTT para conectar seu microfone e mesa de som ao servidor PROVOX. O Auto DJ pausa suavemente ao ligar o sinal ao vivo e retorna automaticamente quando você encerra."
    },
    {
      q: "Posso vender anúncios e comerciais na minha rádio?",
      a: "Sim! Nosso painel conta com um agendador comercial completo onde você programa vinhetas e spots patrocinados por horário fixo ou intervalo de músicas, facilitando a monetização."
    },
    {
      q: "Como disponibilizo o player da rádio para meus ouvintes?",
      a: "Fornecemos um código pronto para você colocar no seu site, além de links compatíveis com reprodutores de celular e cadastro gratuito no agregador RadiosNet."
    }
  ];

  return (
    <div id="provox-service-page" className="space-y-20 pb-16 animate-fade-in">

      {/* 1. Hero Section with Animated Electronic Music Background */}
      <section className="relative bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-24 overflow-hidden">
        
        {/* ANIMATED ELECTRONIC MUSIC BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-orange-500/20 via-purple-600/20 to-cyan-500/20 rounded-full blur-[120px]"
          />

          {/* Bass Drop Radial Waves */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-30">
            {[1, 2, 3, 4].map((ring) => (
              <motion.div
                key={ring}
                animate={{
                  scale: [1, 2.2],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: ring * 0.9,
                }}
                className="absolute border border-orange-500/40 rounded-full"
                style={{ width: `${ring * 140}px`, height: `${ring * 140}px` }}
              />
            ))}
          </div>

          {/* Spinning DJ Vinyl Disc Wireframe Left */}
          <div className="absolute top-10 -left-12 hidden lg:block opacity-25">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative w-56 h-56 rounded-full border-4 border-dashed border-cyan-400/40 flex items-center justify-center"
            >
              <div className="w-40 h-40 rounded-full border-2 border-orange-500/30 border-t-orange-500 flex items-center justify-center">
                <Disc className="w-16 h-16 text-cyan-400" />
              </div>
            </motion.div>
          </div>

          {/* Spinning DJ Headphones / Neon Ring Right */}
          <div className="absolute top-12 -right-12 hidden lg:block opacity-25">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="relative w-56 h-56 rounded-full border-4 border-dashed border-orange-500/40 flex items-center justify-center"
            >
              <div className="w-40 h-40 rounded-full border-2 border-purple-500/30 flex items-center justify-center">
                <Headphones className="w-16 h-16 text-orange-400" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-widest shadow-lg backdrop-blur-md">
            <Radio className="h-4 w-4 animate-pulse text-orange-400" />
            <span>Lance Sua Rádio Web Profissional em Minutos!</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full border border-orange-500/30">PROVOX Streaming HD</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Transmissão de Áudio HD, Auto DJ 24/7 e Gestão de Audiência Sem Complicação
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            Soluções completas para streaming de áudio de alta qualidade, gerenciamento de conteúdo na nuvem, vinhetas programadas e aplicativos personalizados. Dê voz à sua empresa ou projeto hoje mesmo!
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#planos"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-orange-950/30 inline-flex items-center gap-2"
            >
              <DollarSign className="h-4 w-4" />
              Conheça Nossos Planos
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Falar no WhatsApp
            </a>
            <Link
              to="/guias/como-criar-radio-web"
              className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm px-6 py-3.5 rounded-xl transition-all inline-flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4 text-orange-400" />
              Guia: Como Criar Rádio Web
            </Link>
          </div>

        </div>
      </section>

      {/* 2. REQUISITO: Live Player Demo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500 flex items-center gap-1.5">
              <Play className="h-3.5 w-3.5 text-orange-500 fill-orange-500" /> Player de Demonstração em Tempo Real
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Sinal On-Line Ativo em HD
            </span>
          </div>
          <ProvoxPlayer
            streamUrl="https://sv11.hdradios.net:6806/;"
            title="RÁDIO CORPORATIVA RFM"
            subtitle="Transmissão ao vivo PROVOX Streaming HD em Tempo Real"
            songName="Seleção Exclusiva Pop, Rock & Hits Nacionais"
            stationUrl="https://rebeldiafm.com.br"
          />
        </div>
      </section>

      {/* 3. Benefícios / Vantagens Chave */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Por que escolher o PROVOX?</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Benefícios Exclusivos da Nossa Plataforma de Streaming
          </h2>
          <p className="text-sm text-slate-500">
            Infraestrutura moderna e simplificada para você focar no conteúdo enquanto nós cuidamos de toda a tecnologia de transmissão.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl w-12 h-12 flex items-center justify-center border border-slate-100 shadow-2xs">
                {b.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 tracking-tight">{b.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. REQUISITO: Segmentos de Atuação (Uma Solução, Diversos Segmentos de Sucesso) */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-sm font-bold uppercase tracking-widest text-orange-500">Segmentos de Atuação</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Uma Solução, Diversos Segmentos de Sucesso
            </h2>
            <p className="text-sm text-slate-500">
              O PROVOX se adapta perfeitamente aos mais variados modelos de negócios, criando experiências auditivas memoráveis e profissionais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {segments.map((seg, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow flex flex-col space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl w-12 h-12 flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
                  {seg.icon}
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-400 block">{seg.subtitle}</span>
                  <h3 className="font-display font-bold text-lg text-slate-900 mt-0.5 tracking-tight">{seg.title}</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                  {seg.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Recursos Oferecidos em Detalhes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Recursos Técnicos</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tudo o que sua Rádio Web Precisa em um Único Lugar
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Desenvolvido para oferecer máxima confiabilidade, controle e flexibilidade na operação diária.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourcesList.map((res, idx) => (
            <div key={idx} className="flex gap-4 items-start bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-display font-bold text-slate-900 text-sm tracking-tight">{res.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{res.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Tabela de Planos e Preços Comparativos */}
      <section id="planos" className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Planos e Preços</span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Escolha o Plano Ideal para a Sua Rádio Web
            </h2>
            <p className="text-sm text-slate-300">
              Planos sem fidelidade obrigatória com ativação imediata. Economize até 20% no pagamento anual.
            </p>

            {/* Cycle Toggle */}
            <div className="inline-flex items-center bg-slate-950 p-1.5 rounded-full border border-slate-800 gap-2 mt-4">
              <button
                onClick={() => setBillingCycle('mensal')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${billingCycle === 'mensal' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle('anual')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${billingCycle === 'anual' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                <span>Anual</span>
                <span className="bg-emerald-500 text-slate-950 text-[10px] px-1.5 py-0.5 rounded-full font-black uppercase">20% OFF</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((p) => {
              const price = billingCycle === 'anual' ? p.priceAnnual : p.priceMonthly;
              return (
                <div
                  key={p.id}
                  className={`rounded-2xl p-8 flex flex-col justify-between transition-all relative ${
                    p.popular
                      ? 'bg-slate-950 border-2 border-orange-500 shadow-2xl scale-105 z-10'
                      : 'bg-slate-950/80 border border-slate-800'
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                      Mais Escolhido
                    </span>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-white tracking-tight">{p.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{p.desc}</p>
                    </div>

                    <div className="border-y border-slate-800/80 py-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-slate-400 font-semibold">R$</span>
                        <span className="text-4xl font-extrabold text-white tracking-tight">{price.toFixed(2).replace('.', ',')}</span>
                        <span className="text-xs text-slate-400 font-medium">/mês</span>
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        {billingCycle === 'anual' ? 'Cobrado anualmente' : 'Faturamento mensal recorrente'}
                      </span>
                    </div>

                    <ul className="space-y-3 text-xs text-slate-300">
                      {p.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <a
                      href={`https://wa.me/5548991984678?text=${encodeURIComponent(`Ol%C3%A1%21+Gostaria+de+assinar+o+plano+*${p.name}*+do+PROVOX+Streaming.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md ${
                        p.popular
                          ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/30'
                          : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                      }`}
                    >
                      <Zap className="h-4 w-4" />
                      <span>{p.btnText}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Depoimentos / Cases de Sucesso */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Prova Social</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quem Usa e Recomenda o PROVOX
          </h2>
          <p className="text-sm text-slate-500">
            Veja como nossos clientes utilizam o streaming para gerar engajamento e resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <h4 className="font-bold text-slate-900 text-sm">{t.author}</h4>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ (Perguntas Frequentes) */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Dúvidas Frequentes</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Perguntas Frequentes sobre o Serviço
          </h2>
          <p className="text-sm text-slate-500">
            Tire suas dúvidas antes de contratar o seu streaming de rádio web.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-orange-500 shrink-0" />
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" /> : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Formulário de Contato / Solicitação de Demonstração */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2 border-b border-slate-100 pb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Demonstração Sem Compromisso</span>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Solicite um Teste Grátis ou Orçamento Personalizado
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Preencha os campos abaixo para conversar diretamente com um consultor técnico no WhatsApp.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="font-bold text-emerald-900 text-base">Solicitação Enviada!</h4>
              <p className="text-xs text-emerald-700">
                Encaminhamos seu contato para atendimento imediato no WhatsApp.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-xs font-bold text-emerald-800 underline hover:text-emerald-900"
              >
                Enviar nova solicitação
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">E-mail *</label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Telefone</label>
                  <input
                    type="tel"
                    placeholder="(48) 99198-4678"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome da Rádio / Empresa</label>
                  <input
                    type="text"
                    placeholder="Ex: Rádio Web Hits"
                    value={formData.nomeRadio}
                    onChange={(e) => setFormData({ ...formData, nomeRadio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Plano de Interesse</label>
                  <select
                    value={formData.planoInteresse}
                    onChange={(e) => setFormData({ ...formData, planoInteresse: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Básico / Iniciante">Básico / Iniciante (R$ 49,90)</option>
                    <option value="Premium Profissional">Premium Profissional (R$ 89,90)</option>
                    <option value="Empresarial Corporativo">Empresarial Corporativo (R$ 179,90)</option>
                    <option value="Personalizado">Projeto Especial Sob Medida</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mensagem ou Observação</label>
                <textarea
                  rows={3}
                  placeholder="Conte-nos brevemente o que você precisa..."
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-3.5 rounded-xl transition-colors shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Enviar Solicitação no WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 10. Link Direct Banner to Educational Portal "Como Criar Sua Rádio Web" */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-2xl p-8 space-y-4 border border-blue-800 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Conteúdo Educacional</span>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
            Quer aprender como montar e configurar sua rádio web antes de contratar?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Acesse nosso guia completo com indicação de microfones, softwares de automação, agendamento de programas e dicas de direitos autorais.
          </p>
          <div className="pt-2">
            <Link
              to="/guias/como-criar-radio-web"
              className="bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2 shadow-md"
            >
              <BookOpen className="h-4 w-4 text-orange-500" />
              Acessar Guia "Como Criar Sua Rádio Web"
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
