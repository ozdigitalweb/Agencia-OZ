import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Radio,
  BookOpen,
  Mic,
  Headphones,
  Sliders,
  Cpu,
  Globe,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  Play,
  ShoppingBag,
  Hotel,
  Users,
  HeartPulse,
  Sparkles,
  Award,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  Send,
  Zap,
  Disc,
  DollarSign
} from 'lucide-react';
import ProvoxPlayer from '../components/ProvoxPlayer';

export default function ComoCriarRadioWeb() {
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Estou+lendo+o+guia+de+Como+Criar+uma+R%C3%A1dio+Web+e+gostaria+de+tirar+d%C3%BAvidas.";

  const [activeTabStep, setActiveTabStep] = useState<number>(1);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    nomeProjeto: '',
    duvida: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email) return;

    // Construct WhatsApp message URL
    const text = `*Dúvida do Portal Como Criar Rádio Web*\n\n` +
      `*Nome:* ${formData.nome}\n` +
      `*E-mail:* ${formData.email}\n` +
      `*Telefone:* ${formData.telefone}\n` +
      `*Projeto:* ${formData.nomeProjeto || 'Não informado'}\n` +
      `*Dúvida/Mensagem:* ${formData.duvida}`;

    const url = `https://wa.me/5548991984678?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setFormSubmitted(true);
  };

  // Reused requirement: Segmentos de Atuação (Uma Solução, Diversos Segmentos de Sucesso)
  const segments = [
    {
      icon: <ShoppingBag className="h-6 w-6 text-orange-500" />,
      title: "Varejo & Compras",
      subtitle: "Som Ambiente Comercial e Promoções",
      desc: "Aprenda a estruturar rádios internas para redes de lojas e supermercados com vinhetas promocionais programadas no intervalo certo para alavancar vendas em até 30%."
    },
    {
      icon: <Hotel className="h-6 w-6 text-blue-700" />,
      title: "Hotelaria & Hospedarias",
      subtitle: "Identidade Sonora e Recepção",
      desc: "Como criar listas musicais exclusivas e avisos informativos sobre horários de café da manhã, passeios e serviços de quarto em hotéis e pousadas."
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-600" />,
      title: "Igrejas & Comunidades",
      subtitle: "Transmissão de Cultos e Programas",
      desc: "Passo a passo para rádios comunitárias e evangélicas transmitirem cultos ao vivo, mensagens de fé, programas interativos e orações 24 horas por dia."
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-red-500" />,
      title: "Saúde & Consultórios",
      subtitle: "Relaxamento e Informação em Salas de Espera",
      desc: "Estratégias de sonorização para clínicas e hospitais com programas de saúde preventiva, notícias do bem e playlists relaxantes para os pacientes."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-purple-600" />,
      title: "Podcasters & Comunicadores",
      subtitle: "Transformando Áudio em Audiência Fiel",
      desc: "Como criar uma programação contínua mesclando episódios de podcasts gravados com transmissões de locução ao vivo e programas de notícias."
    }
  ];

  const stepsGuide = [
    {
      num: 1,
      title: "Planejamento e Nicho de Atuação",
      short: "Nicho e Identidade",
      icon: BookOpen,
      desc: "Antes de ligar o microfone, defina com clareza o propósito da sua rádio web. O sucesso depende de um nicho bem direcionado e de uma grade de programação estruturada.",
      items: [
        "Defina a linha editorial (Música, Notícias, Religiosa, Esportes, Varejo).",
        "Escolha um nome marcante e fácil de lembrar e registrar.",
        "Mapeie seu público-alvo (idade, região, hábitos de escuta).",
        "Crie a grade horária: programas ao vivo, boletins informativos e blocos musicais."
      ],
      tip: "Dica de Ouro: Rádios focadas em um segmento específico ganham audiência e anunciantes muito mais rápido do que rádios genéricas."
    },
    {
      num: 2,
      title: "Escolha dos Equipamentos Essenciais",
      short: "Equipamentos",
      icon: Mic,
      desc: "Você não precisa gastar milhares de reais para começar. É possível montar um estúdio de rádio web profissional com investimentos modesto.",
      items: [
        "Microfone: Inicie com um USB dinâmico (ex: Audio-Technica ATR2100x ou Fifine K669B) ou XLR + Interface de Áudio.",
        "Fone de Ouvido: Modelo fechado (over-ear) para monitorar sua voz sem vazamento de áudio.",
        "Computador: Qualquer PC ou notebook i3/i5 com 8GB de RAM suporta a transmissão de áudio.",
        "Mesa de Som (Opcional): Útil quando você possui mais de 2 locutores presenciais no mesmo estúdio."
      ],
      tip: "Um ambiente silencioso com carpetes ou cortinas de tecido espesso reduz o eco do microfone instantaneamente."
    },
    {
      num: 3,
      title: "Softwares de Transmissão e Automação",
      short: "Softwares",
      icon: Sliders,
      desc: "Os softwares de automação gerenciam as playlists, vinhetas, hora certa, comerciais e conectam seu áudio ao servidor de streaming.",
      items: [
        "RadioBOSS / SAM Broadcaster: Softwares profissionais completos para automação com agendador de vinhetas e hora certa.",
        "Mixxx (Gratuito e Open Source): Excelente opção para iniciantes e DJs criarem programação ao vivo.",
        "OBS Studio (Gratuito): Perfeito se você desejar transmitir também com vídeo ao vivo para redes sociais.",
        "Encoder BUTT (Broadcast Using This Tool): Utilitário leve para enviar o áudio da sua placa de som direto ao servidor."
      ],
      tip: "Ative sempre o compressor/limiter no software para manter todas as músicas e vozes no mesmo volume."
    },
    {
      num: 4,
      title: "Servidor de Streaming e Auto DJ",
      short: "Streaming & Nuvem",
      icon: Cpu,
      desc: "O servidor de streaming é o 'corruptor de sinal' que recebe o áudio do seu estúdio e transmite simultaneamente para milhares de ouvintes na internet.",
      items: [
        "Protocolo de Áudio: AAC+ HD (menor consumo de dados com qualidade superior) ou MP3 320kbps.",
        "Auto DJ em Nuvem: Envie suas músicas para o servidor PROVOX e mantenha a rádio no ar 24h/dia sem deixar o PC ligado.",
        "Painel de Controle: Crie playlists, programe comerciais e acompanhe relatórios de ouvintes ao vivo.",
        "Web Player & Apps: Incorpore o player diretamente no seu site e disponibilize aplicativo Android/iOS."
      ],
      tip: "Utilize os servidores Cloud PROVOX com garantia de 99.9% de uptime para garantir transmissão sem quedas."
    },
    {
      num: 5,
      title: "Produção de Conteúdo e Vinhetas",
      short: "Vinhetas & Spots",
      icon: Disc,
      desc: "A plástica sonora (vinhetas, chamadas, trilhas de fundo) dá o tom de profissionalismo à sua rádio web.",
      items: [
        "Grave Vinhetas Institucionais: Aberturas de bloco, chamadas de frequência e assinatura da emissora.",
        "Spots Comerciais: Ofertas de patrocínios locais e anúncios agendados.",
        "Hora Certa e Tempo: Mantenha seus ouvintes informados com locução automática da hora e clima.",
        "Edição de Áudio: Utilize o software gratuito Audacity para gravar e tratar locuções com equalizador e reverb."
      ],
      tip: "Mantenha as vinhetas curtas (de 3 a 8 segundos) para não cansar o ouvinte durante a transição musical."
    },
    {
      num: 6,
      title: "Divulgação e Estratégia de Audiência",
      short: "Divulgação & Mídias",
      icon: Globe,
      desc: "Sua rádio precisa ser facilmente encontrada onde os ouvintes costumam escutar música.",
      items: [
        "Cadastre em Agregadores: Inscreva sua rádio no RadiosNet, TuneIn, CXRadio e Onlineradiobox.",
        "Redes Sociais: Crie conteúdos de bastidores no Instagram e TikTok para aproximar a audiência.",
        "WhatsApp / Telegram: Crie grupos VIP de ouvintes para pedidos de música e sorteios de prêmios.",
        "SEO Local e Site Oficial: Tenha um site rápido para a rádio aparecer no topo das buscas do Google."
      ],
      tip: "Compartilhe cortes curtos das entrevistas e programas ao vivo nas redes sociais para atrair novos ouvintes."
    },
    {
      num: 7,
      title: "Aspectos Legais e Direitos Autorais (ECAD)",
      short: "Direitos Autorais",
      icon: ShieldCheck,
      desc: "Entender as diretrizes de execução pública de músicas e licenças evita problemas e garante um negócio seguro.",
      items: [
        "Execução de Músicas Comerciais: Fique atento às regulamentações do ECAD para rádio web no Brasil.",
        "Músicas Royalty-Free / Creative Commons: Excelente alternativa para sonorização ambiente corporativa sem cobrança de direitos.",
        "Música Própria e Autorais: Convide artistas locais que autorizem expressamente a execução de suas obras.",
        "Registro de Marca: Proteja o nome e o logotipo da sua rádio no INPI."
      ],
      tip: "Empresas usando sonorização comercial ambiente podem optar por trilhas exclusivas livres de royalties do catálogo PROVOX."
    }
  ];

  const toolsList = [
    { name: "Audacity", cat: "Edição de Áudio", type: "Gratuito", desc: "Editor e gravador multipista essencial para tratar voz e vinhetas." },
    { name: "Mixxx", cat: "Automação / DJ", type: "Gratuito", desc: "Software completo para transmissões ao vivo e mixagem." },
    { name: "RadioBOSS", cat: "Automação Profissional", type: "Pago / Teste Grátis", desc: "Líder de mercado para agendamento inteligente e Auto DJ." },
    { name: "OBS Studio", cat: "Transmissão & Vídeo", type: "Gratuito", desc: "Permite transmitir áudio e vídeo da rádio simultaneamente no YouTube e Instagram." },
    { name: "PROVOX Cloud", cat: "Servidor & Auto DJ", type: "Plano PROVOX", desc: "Servidor de streaming HD de alta fidelidade com Auto DJ 24h e estatísticas em tempo real." },
    { name: "RadiosNet", cat: "Agregador de Rádios", type: "Gratuito", desc: "Maior diretório de rádios do Brasil para cadastrar seu streaming gratuitamente." }
  ];

  const faqs = [
    {
      q: "Preciso ter um computador ligado 24 horas por dia para ter uma Rádio Web?",
      a: "Não! Com o nosso sistema Auto DJ no servidor PROVOX, você envia suas músicas e comerciais para a nuvem. O servidor se encarrega de manter sua rádio tocando 24 horas por dia, 7 dias por semana, sem gastar energia nem depender da sua internet de casa."
    },
    {
      q: "Qual a velocidade de internet necessária para transmitir ao vivo?",
      a: "Para transmitir ao vivo com áudio de alta qualidade em AAC+ HD (64kbps a 128kbps), uma conexão estável de apenas 5 Megas de upload já é suficiente. A distribuição do sinal para os seus ouvintes é feita 100% pelos servidores da AGÊNCIA OZ."
    },
    {
      q: "Como os ouvintes vão escutar minha rádio no celular e no carro?",
      a: "Através do Web Player responsivo que funciona em qualquer navegador de smartphone, através do seu próprio aplicativo Android/iOS ou cadastrando sua rádio em aplicativos como RadiosNet e TuneIn (compatíveis com Android Auto e Apple CarPlay)."
    },
    {
      q: "Posso colocar comerciais e vinhetas na rádio?",
      a: "Sim! No painel PROVOX você pode agendar vinhetas e comerciais por intervalo de tempo (ex: a cada 3 músicas) ou por horário fixo (ex: às 12:00 em ponto), automatizando o faturamento da sua rádio."
    },
    {
      q: "A AGÊNCIA OZ ajuda na configuração inicial da rádio web?",
      a: "Com certeza! Nossa equipe oferece suporte técnico completo, orientando na instalação dos programas de transmissão, configuração do painel Auto DJ e fornecendo o código do player para o seu site."
    }
  ];

  return (
    <div id="como-criar-radio-web-page" className="space-y-20 pb-16 animate-fade-in">

      {/* 1. Hero Section */}
      <section className="relative bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-24 overflow-hidden">
        
        {/* Animated Sound Background Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-40">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/30 via-orange-500/30 to-purple-600/30 rounded-full blur-[130px]"
          />

          {/* Equalizer lines SVG */}
          <svg className="absolute bottom-0 left-0 w-full h-32 opacity-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0 60 Q 300 0 600 60 T 1200 60" fill="none" stroke="#f97316" strokeWidth="4" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg">
            <BookOpen className="h-4 w-4 text-orange-400" />
            <span>Guia Definitivo & Central de Recursos</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Como Criar Sua Rádio Web de Sucesso Passo a Passo
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            O tutorial completo para você planejar, montar o estúdio, escolher equipamentos, configurar softwares de automação e colocar sua emissora online 24h no ar com qualidade de som HD.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#passo-a-passo"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-orange-950/30 inline-flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Explorar o Passo a Passo
            </a>
            <a
              href="#ferramentas"
              className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm px-6 py-3.5 rounded-xl transition-all inline-flex items-center gap-2"
            >
              <Cpu className="h-4 w-4 text-cyan-400" />
              Softwares e Ferramentas
            </a>
            <Link
              to="/servicos/streaming"
              className="bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all border border-blue-600 inline-flex items-center gap-2"
            >
              <Radio className="h-4 w-4" />
              Conhecer Planos PROVOX
            </Link>
          </div>

        </div>
      </section>

      {/* 2. REQUISITO: Player de Demonstração em Tempo Real */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500 flex items-center gap-1.5">
              <Play className="h-3.5 w-3.5 text-orange-500 fill-orange-500" /> Ouça como Fica o Som da Sua Rádio Web no Player PROVOX
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Sinal Ao Vivo em HD
            </span>
          </div>
          <ProvoxPlayer
            streamUrl="https://sv11.hdradios.net:6806/;"
            title="RÁDIO CORPORATIVA DEMO RFM"
            subtitle="Qualidade AAC+ 128kbps transmitida com o sistema PROVOX Streaming"
            songName="Programação Rádio Web Profissional — Transmissão Contínua"
            stationUrl="https://rebeldiafm.com.br"
          />
        </div>
      </section>

      {/* 3. REQUISITO: Segmentos de Atuação (Uma Solução, Diversos Segmentos de Sucesso) */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-sm font-bold uppercase tracking-widest text-orange-500">Segmentos de Atuação</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Uma Solução, Diversos Segmentos de Sucesso
            </h2>
            <p className="text-sm text-slate-500">
              Veja como aplicar os conceitos de rádio web nos mais variados modelos de negócios e projetos de comunicação.
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

      {/* 4. Introdução: O que é Rádio Web */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Por que criar uma Rádio Web?</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              A revolução do áudio digital e do streaming sem fronteiras
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Diferente das rádios FM/AM tradicionais, que exigem licenças governamentais milionárias e antenas de transmissão limitadas geograficamente, uma <strong>Rádio Web opera 100% via internet</strong> com alcance global e custo acessível.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Com o avanço dos smartphones, podcasts, conectividade no carro (Android Auto/CarPlay) e caixas de som inteligentes, a audiência de áudio online cresce exponencialmente. Você pode criar um canal exclusivo para sua marca, igreja, escola, comércio ou projeto pessoal.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                <span className="text-2xl font-black text-blue-700 block">100%</span>
                <span className="text-xs text-slate-600 font-medium">Alcance Global de Ouvintes</span>
              </div>
              <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                <span className="text-2xl font-black text-orange-500 block">24/7</span>
                <span className="text-xs text-slate-600 font-medium">Transmissão Nuvem AutoDJ</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-8 space-y-6 shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <Zap className="h-6 w-6 text-orange-400" />
              <h3 className="font-display text-lg font-bold text-white">Vantagens em Comparação à Rádio FM Tradicional</h3>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Custo Mínimo de Entrada:</strong> Sem necessidade de antenas, transmissores de RF ou burocracias de concessão pública.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Métricas Exatas em Tempo Real:</strong> Saiba exatamente quantos ouvintes estão conectados, suas cidades e tempo de permanência.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Interatividade Direta:</strong> Receba pedidos musicais e mensagens por WhatsApp diretamente no player web ou aplicativo.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Qualidade de Som Superior:</strong> Áudio digital estéreo HD sem chiados nem interferências atmosféricas.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Guia Passo a Passo em 7 Módulos Interativos */}
      <section id="passo-a-passo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Tutorial Completo</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Os 7 Passos para Construir Sua Rádio Web do Zero
          </h2>
          <p className="text-sm text-slate-500">
            Navegue pelos módulos abaixo e siga o roteiro testado por centenas de comunicadores e empresas.
          </p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
          {stepsGuide.map((step) => {
            const IconComp = step.icon;
            const isActive = activeTabStep === step.num;
            return (
              <button
                key={step.num}
                onClick={() => setActiveTabStep(step.num)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center ${isActive ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  {step.num}
                </span>
                <IconComp className="h-4 w-4" />
                <span>{step.short}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Content Box */}
        {stepsGuide.filter(s => s.num === activeTabStep).map((step) => {
          const IconComp = step.icon;
          return (
            <div key={step.num} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <IconComp className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Passo {step.num} de 7</span>
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{step.title}</h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                  Etapa Fundamental
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                {step.desc}
              </p>

              <div className="space-y-3 bg-slate-50 p-6 rounded-xl border border-slate-200/80">
                <h4 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Principais Ações deste Passo:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
                  {step.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200/60 shadow-2xs">
                      <span className="text-orange-500 font-bold shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3 text-xs sm:text-sm text-orange-900 font-semibold">
                <Award className="h-5 w-5 text-orange-600 shrink-0" />
                <span>{step.tip}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* 6. Ferramentas e Recursos Recomendados */}
      <section id="ferramentas" className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Toolkit Recomendado</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Softwares e Recursos Indispensáveis
            </h2>
            <p className="text-sm text-slate-300">
              Listamos os melhores programas gratuitos e pagos para automatizar e editar o áudio da sua emissora.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsList.map((tool, idx) => (
              <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {tool.cat}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${tool.type.includes('Gratuito') ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
                      {tool.type}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white tracking-tight">{tool.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ (Perguntas Frequentes do Iniciante) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Tire Suas Dúvidas</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Perguntas Frequentes de Quem Quer Criar Rádio Web
          </h2>
          <p className="text-sm text-slate-500">
            Respostas diretas às principais dúvidas de iniciantes no mundo do áudio streaming.
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

      {/* 8. Formulário de Dúvidas & Suporte a Projetos */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2 border-b border-slate-100 pb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Consultoria Gratuita</span>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Precisa de Ajuda para Planejar sua Rádio Web?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Preencha os dados abaixo e fale com um especialista técnico da AGÊNCIA OZ sem compromisso.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="font-bold text-emerald-900 text-base">Mensagem Enviada com Sucesso!</h4>
              <p className="text-xs text-emerald-700">
                Redirecionamos seus dados para o WhatsApp de atendimento técnico. Entraremos em contato em breve!
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-xs font-bold text-emerald-800 underline hover:text-emerald-900"
              >
                Enviar outra dúvida
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Silva"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">E-mail Profissional *</label>
                  <input
                    type="email"
                    required
                    placeholder="carlos@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Telefone</label>
                  <input
                    type="tel"
                    placeholder="(48) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome Pretendido da Rádio</label>
                  <input
                    type="text"
                    placeholder="Ex: Rádio Web Sertaneja FM"
                    value={formData.nomeProjeto}
                    onChange={(e) => setFormData({ ...formData, nomeProjeto: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sua Dúvida ou Projeto</label>
                <textarea
                  rows={3}
                  placeholder="Conte um pouco sobre sua ideia, os equipamentos que já possui e qual sua principal dúvida..."
                  value={formData.duvida}
                  onChange={(e) => setFormData({ ...formData, duvida: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-3.5 rounded-xl transition-colors shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Enviar Dúvida e Falar no WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 9. Final CTA: Direct link to PROVOX Streaming Service */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-slate-950 text-white rounded-2xl p-8 lg:p-12 space-y-6 relative overflow-hidden border border-slate-800">
          <div className="relative z-10 space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
              Pronto para colocar sua rádio web no ar sem complicação técnica?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Assine um dos nossos planos PROVOX Streaming e receba sua rádio com Auto DJ configurado, suporte especializado via WhatsApp e aplicativo web em minutos.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/servicos/streaming"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-orange-950/40 inline-flex items-center justify-center gap-2"
              >
                <Radio className="h-4 w-4" />
                Ver Planos e Preços PROVOX
              </Link>
              <Link
                to="/servicos/provox/briefing"
                className="w-full sm:w-auto bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all border border-blue-600 inline-flex items-center justify-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Preencher Briefing Rádio Web
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
