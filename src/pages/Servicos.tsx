import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Globe, Cpu, Search, CheckCircle, ArrowRight, MessageSquare, ShieldCheck, Heart, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import servicesHeroImg from '../assets/images/realistic_services_agency_team_1784686196153.jpg';

export default function Servicos() {
  const servicesList = [
    {
      title: "Landing Pages de Alta Conversão",
      description: "Páginas de vendas rápidas, persuasivas e totalmente otimizadas para tráfego pago (Google Ads, Meta Ads e TikTok Ads), garantindo o máximo retorno do seu investimento.",
      path: "/servicos/landingpages",
      iconName: "landingpages" as const,
      benefits: ["Copywriting focado em vendas", "Carregamento em menos de 1 segundo", "Pixel e Tag Manager integrados"]
    },
    {
      title: "Mídia, Divulgação & Assistente IA (OZZY)",
      description: "Criação de artes para Instagram e Facebook, copywriting persuasivo, estratégias de divulgação de marca/produtos e implantação do assistente virtual OZZY 24/7.",
      path: "/servicos/midia",
      iconName: "midia" as const,
      benefits: ["Artes profissionais para Feed e Stories", "Copywriting conectado à sua Landing Page", "Atendimento e qualificação com IA 24/7"]
    },
    {
      title: "Desenvolvimento WordPress",
      description: "Projetos institucionais e e-commerces criados sob medida, com foco absoluto em conversão de leads, design de ponta e otimização Core Web Vitals para carregamento instantâneo.",
      path: "/servicos/wordpress",
      iconName: "wordpress" as const,
      benefits: ["Código limpo desenvolvido do zero", "Totalmente otimizado para celulares", "Painel administrativo intuitivo"]
    },
    {
      title: "SEO e Posicionamento Google",
      description: "Análise técnica avançada, otimização on-page de conteúdo e estratégias de SEO Local para fazer sua empresa liderar as pesquisas da sua região no Google e Maps.",
      path: "/servicos/seo",
      iconName: "seo" as const,
      benefits: ["Aumento real de visitas qualificadas", "Dominância nas buscas locais de Canoas e região", "Relatórios mensais objetivos de performance"]
    },
    {
      title: "Hospedagem Cloud cPanel",
      description: "Infraestrutura Cloud VPS de alto desempenho totalmente gerenciada com painel administrativo cPanel. Gerencie e-mails profissionais, domínios e bancos de dados com máxima facilidade e segurança total.",
      path: "/servicos/hospedagem",
      iconName: "hospedagem" as const,
      benefits: ["Painel de controle cPanel completo", "Contas de e-mail corporativo grátis", "Suporte local especializado por WhatsApp"]
    },
    {
      title: "PROVOX Streaming & Rádio Web",
      description: "Sistema profissional de streaming de áudio, rádio online e sonorização ambiente comercial com agendamento inteligente de playlists, vinhetas e anúncios corporativos.",
      path: "/servicos/streaming",
      iconName: "streaming" as const,
      benefits: ["Transmissão de alta estabilidade e áudio HD", "Sistema AutoDJ inteligente na nuvem 24/7", "Fácil inserção de vinhetas e spots comerciais"]
    }
  ];

  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+um+or%C3%A7amento+para+meus+canais+digitais.";

  return (
    <div id="servicos-overview-page" className="space-y-20 pb-16 animate-fade-in">
      
      {/* 1. Header Banner with Animated Digital Ecosystem Background */}
      <section className="relative overflow-hidden bg-slate-50/50 border-b border-slate-200 py-16 lg:py-24">
        
        {/* Animated Background related to Full Digital Ecosystem */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />

          {/* Technology Wave SVG */}
          <svg className="absolute bottom-0 left-0 w-full h-48 opacity-25" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="services-ecosystem-gradient" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 180 Q 250 130 500 160 T 1000 25"
              fill="none"
              stroke="url(#services-ecosystem-gradient)"
              strokeWidth="4"
              initial={{ strokeDasharray: "1000", strokeDashoffset: "1000" }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 3.5, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
            />
          </svg>

          {/* Web Network Hub Node Left */}
          <div className="absolute left-[7%] top-[20%] opacity-40 hidden md:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/40 animate-ping" />
              <div className="absolute w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 animate-pulse" />
              <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg relative z-10">
                <Globe className="h-5 w-5" />
              </div>
            </motion.div>
          </div>

          {/* Intelligent Technology Node Right */}
          <div className="absolute right-[8%] top-[18%] opacity-40 hidden md:block">
            <motion.div
              animate={{ scale: [0.95, 1.1, 0.95], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center w-14 h-14"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 to-emerald-400 blur-md opacity-80 animate-pulse" />
              <div className="bg-slate-900 border border-slate-700 text-white w-full h-full rounded-full relative z-10 flex items-center justify-center shadow-lg">
                <Cpu className="h-6 w-6 text-orange-400" />
              </div>
              <div className="absolute -inset-3 border border-orange-500/20 rounded-full animate-ping" style={{ animationDuration: '3.2s' }} />
            </motion.div>
          </div>

          {/* Floating Service Badges & Geometric Shapes */}
          {[
            { 
              x: "10%", 
              y: "65%", 
              className: "w-10 h-10 bg-blue-500/10 border-2 border-blue-500/30 rounded-full flex items-center justify-center",
              children: <div className="w-3 h-3 bg-blue-500/40 rounded-full animate-ping" />
            },
            { 
              x: "82%", 
              y: "66%", 
              className: "w-10 h-10 bg-emerald-500/10 border-2 border-emerald-500/30 rotate-45 flex items-center justify-center",
              children: <div className="w-3 h-3 bg-emerald-500/40" />
            },
            { 
              x: "5%", 
              y: "45%", 
              className: "w-8 h-8 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center justify-center rotate-12",
              children: <div className="w-2 h-2 bg-orange-500/50 rounded-full" />
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className={`absolute hidden sm:flex ${item.className}`}
              style={{ left: item.x, top: item.y }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4 + idx,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.7,
              }}
            >
              {item.children}
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-orange-500" /> Nossos Serviços
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Tecnologia de ponta pensada para resultados comerciais.
              </h1>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                Unimos infraestrutura de servidores robusta, design de alta conversão em WordPress, inteligência de SEO orgânico e streaming corporativo de áudio para fazer seu negócio faturar mais online e offline.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/80 text-slate-700 border border-slate-200 shadow-sm backdrop-blur-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Hospedagem Cloud cPanel
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/80 text-slate-700 border border-slate-200 shadow-sm backdrop-blur-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> WordPress & Landing Pages
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/80 text-slate-700 border border-slate-200 shadow-sm backdrop-blur-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> SEO & Google Maps
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/80 text-slate-700 border border-slate-200 shadow-sm backdrop-blur-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> PROVOX Streaming
                </span>
              </div>
            </div>

            {/* Realistic Agency Team Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 aspect-video bg-slate-100 group">
              <img
                src={servicesHeroImg}
                alt="Equipe técnica de especialistas da AGÊNCIA OZ trabalhando em projetos de tecnologia"
                loading="eager"
                width={800}
                height={450}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-slate-800 shadow-md">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>Equipe Especializada AGÊNCIA OZ</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Solução 360 Featured Highlight */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-blue-800/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 bg-orange-950/80 px-2.5 py-1 rounded-md border border-orange-500/30">
              Pacote Corporativo All-in-One
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
              Solução 360 Graus: Auxílio Geral para sua Empresa
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Precisa de ajuda em todas as frentes digitais ao mesmo tempo? Unificamos hospedagem Cloud cPanel, site WordPress rápido, SEO no Google e suporte contínuo em uma única contratação.
            </p>
          </div>
          <Link
            to="/360-graus"
            className="shrink-0 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-105 flex items-center gap-2"
          >
            <span>Ver Passo a Passo 360°</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Especialidades que Transformam Negócios
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Clique no serviço de interesse para conferir detalhes técnicos completos, planos e preços.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </section>

      {/* 3. The Problem & OZ Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-blue-900/30 to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Diferencial Técnico</span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                Por que a AGÊNCIA OZ é diferente das agências de marketing tradicionais?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                A maioria das agências foca apenas no visual e na gestão de posts de redes sociais, esquecendo que a **infraestrutura técnica** é o coração da conversão. Nós cuidamos do ecossistema completo: do hardware do servidor na nuvem até a linha de código do site e os algoritmos do Google.
              </p>
              <div className="flex items-center gap-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 max-w-sm">
                <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-white">Garantia técnica documentada em contrato.</span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-800/45 border border-slate-700/40 p-6 rounded-xl">
                <h4 className="font-display font-bold text-white text-sm mb-2 tracking-tight">Hospedagem Gerenciada</h4>
                <p className="text-xs text-slate-400">Você não precisa lidar com painéis técnicos, SSH ou bancos de dados. Nosso time cuida de tudo para você focar nas suas vendas.</p>
              </div>
              <div className="bg-slate-800/45 border border-slate-700/40 p-6 rounded-xl">
                <h4 className="font-display font-bold text-white text-sm mb-2 tracking-tight">Desenvolvimento WordPress Puro</h4>
                <p className="text-xs text-slate-400">Sem dependência de dezenas de plugins que inflam e tornam o site inseguro. Código limpo que facilita indexar no topo das buscas.</p>
              </div>
              <div className="bg-slate-800/45 border border-slate-700/40 p-6 rounded-xl">
                <h4 className="font-display font-bold text-white text-sm mb-2 tracking-tight">SEO Baseado em Dados</h4>
                <p className="text-xs text-slate-400">Estratégias orientadas a atrair visitantes que já estão ativamente buscando pelos seus serviços, gerando leads qualificados imediatos.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Final Banner with CTA Form Link */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Precisa de uma consultoria personalizada?
        </h2>
        <p className="text-sm text-slate-500">
          Agende um bate-papo de 15 minutos com nosso time técnico em Canoas e identifique gargalos no seu site atual.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/orcamento"
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors shadow-lg shadow-blue-100"
          >
            Agendar Diagnóstico Gratuito
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Falar pelo WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}
