import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Sparkles, Cpu, Award, Zap, ArrowRight, MessageSquare, Heart, Info, Users, HelpCircle, PhoneCall, Radio, BookOpen, Gift, RotateCw, CheckCircle2 } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import BlogCard from '../components/BlogCard';
import RandomServicesBanner from '../components/RandomServicesBanner';
import { mockPosts } from '../data/mockPosts';
import { mockClients } from '../data/mockData';

export default function Home() {
  // Get latest 3 posts
  const latestPosts = mockPosts.slice(0, 3);
  const featuredClient = mockClients[0];

  const servicesList = [
    {
      title: "Desenvolvimento WordPress",
      description: "Sites institucionais, lojas virtuais WooCommerce e portais leves desenvolvidos do zero, sem templates prontos pesados.",
      path: "/servicos/wordpress",
      iconName: "wordpress" as const,
      benefits: ["Nota Máxima no PageSpeed", "Totalmente Responsivo", "Painel 100% Customizado"]
    },
    {
      title: "SEO / GEO Posicionamento",
      description: "Estratégia completa de otimização de busca orgânica, auditorias de concorrência e SEO Local para dominar o Google Maps.",
      path: "/servicos/seo",
      iconName: "seo" as const,
      benefits: ["Atração de Leads Qualificados", "Otimização Google Perfil", "Aumento no Tráfego Orgânico"]
    },
    {
      title: "Hospedagem Cloud cPanel",
      description: "Infraestrutura Cloud VPS de alto desempenho com o painel de controle cPanel para gestão simplificada de e-mails, subdomínios, bancos de dados e alta segurança.",
      path: "/servicos/hospedagem",
      iconName: "hospedagem" as const,
      benefits: ["Gerenciamento via cPanel", "Contas de e-mail corporativo", "Migração Gratuita"]
    },
    {
      title: "PROVOX Streaming & Rádio",
      description: "Sistema profissional de sonorização ambiente e rádio online corporativa com agendamento inteligente de playlists e vinhetas comerciais.",
      path: "/servicos/streaming",
      iconName: "streaming" as const,
      benefits: ["Transmissão HD Estável", "AutoDJ em Nuvem 24/7", "Anúncios e Spots Agendados"]
    }
  ];

  return (
    <div id="home-page" className="space-y-20 pb-16 animate-fade-in">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-slate-200">
        
        {/* Animated Background Blobs and Tech Grid */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/40 blur-[120px]"
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -30, 40, 0],
              scale: [1, 1.15, 0.9, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-teal-400/25 blur-[120px]"
            animate={{
              x: [0, -60, 40, 0],
              y: [0, 40, -50, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-[30%] right-[10%] w-[35%] h-[35%] rounded-full bg-indigo-300/40 blur-[100px]"
            animate={{
              x: [0, -40, 20, 0],
              y: [0, 50, -30, 0],
              scale: [0.9, 1.1, 0.95, 0.9],
            }}
            transition={{
              duration: 3.0,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-300/20 blur-[100px]"
            animate={{
              x: [0, 30, -40, 0],
              y: [0, -50, 30, 0],
              scale: [1.1, 0.9, 1.05, 1.1],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Subtle Grid overlay for high-tech feeling */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-45" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                  <Sparkles className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
                  <span>Agência Digital - Canoas, RS</span>
                </div>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Acelere sua marca com <span className="text-blue-700">infraestrutura Cloud</span> e WordPress de elite.
              </h1>
              
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A AGÊNCIA OZ desenvolve sites de altíssima velocidade, gerencia servidores VPS Cloud gerenciados e otimiza sua empresa para o topo do Google. Sem enrolação, sem lentidão e com suporte local humanizado.
              </p>
              
              {/* CTAs */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link
                    to="/promocao"
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-extrabold text-base px-8 py-4 rounded-xl shadow-lg shadow-orange-100 transition-all hover:-translate-y-0.5 cursor-pointer text-center"
                  >
                    <Gift className="h-5 w-5 animate-bounce" />
                    Garantir Site Grátis
                  </Link>
                  <Link
                    to="/servicos/wordpress"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-blue-100 transition-all hover:-translate-y-0.5"
                  >
                    Conheça WordPress
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
                <div className="text-center lg:text-left">
                  <span className="text-xs text-slate-400 font-medium">
                    Ou se preferir,{" "}
                    <a
                      href="https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+falar+com+a+OZ+Digital+sobre+um+projeto."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-600 font-bold underline transition-colors"
                    >
                      fale conosco imediatamente por WhatsApp
                    </a>
                  </span>
                </div>
              </div>

              {/* Badges bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 max-w-lg mx-auto lg:mx-0">
                <div>
                  <h4 className="text-2xl font-extrabold text-blue-700">1.1s</h4>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Média de Carga</p>
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold text-orange-500">99.9%</h4>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Uptime Garantido</p>
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold text-teal-600">+ 20 Anos</h4>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">no mercado</p>
                </div>
              </div>

            </div>

            {/* Hero Right Image / Visual: Random Rotating Services Banner */}
            <div className="lg:col-span-5 relative flex justify-center">
              <RandomServicesBanner />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Services Grid & Landing Pages CTA Banner */}
      <section className="bg-slate-50 border-y border-slate-200/60 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700">O Que Fazemos de Melhor</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Nossas Especialidades Digitais
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Estruturamos soluções robustas e integradas para impulsionar a infraestrutura e a visibilidade online do seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {servicesList.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* 2.5. Solução 360 Graus Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-10 lg:p-12 shadow-2xl border border-blue-800/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                <RotateCw className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                <span>SOLUÇÃO 360 GRAUS • AUXÍLIO GERAL PARA EMPRESAS</span>
              </div>
              
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Sua empresa precisa de auxílio geral na presença digital?
              </h2>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Unificamos <strong>Diagnóstico Digital, VPS Cloud cPanel, Desenvolvimento WordPress, SEO no Google e Suporte Contínuo</strong> em um único pacote inteligente. Chega de sofrer com múltiplos fornecedores que não se comunicam.
              </p>

              {/* Steps overview preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-left">
                  <span className="text-orange-400 font-bold block">1. Diagnóstico & Cloud</span>
                  <span className="text-slate-400 text-[11px]">Auditoria e VPS cPanel rápida</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-left">
                  <span className="text-blue-400 font-bold block">2. Site & Landing Pages</span>
                  <span className="text-slate-400 text-[11px]">WordPress veloz e conversão</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-left">
                  <span className="text-emerald-400 font-bold block">3. Google & Suporte</span>
                  <span className="text-slate-400 text-[11px]">SEO, GEO e time dedicado</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center items-stretch lg:items-end">
              <Link
                to="/360-graus"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-center text-sm sm:text-base px-6 py-4 rounded-xl shadow-lg shadow-orange-950/50 transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Conhecer o Pacote 360°</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/360-graus#diagnostico-360"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-center text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
              >
                Simular Diagnóstico Gratuito
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2.6. Landing Pages Highlight Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-8 lg:p-10 shadow-xl border border-emerald-800/50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Zap className="h-3.5 w-3.5 text-emerald-400 animate-pulse" /> Landing Pages de Alta Conversão
              </span>
              
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Páginas ultra-rápidas para turbinar suas campanhas de tráfego pago
              </h2>
              
              <p className="text-sm text-emerald-100/80 leading-relaxed max-w-2xl">
                Aumente suas vendas com landing pages focadas em conversão, otimizadas para mobile e carregamento em menos de 1 segundo. Conheça nossos modelos interativos para diversos segmentos:
              </p>

              {/* Badges para as 4 LPs */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1">
                <Link to="/l/medicos" className="text-xs bg-white/10 hover:bg-white/20 text-slate-100 border border-white/15 px-3 py-1.5 rounded-lg transition-colors font-medium">
                  Médicos & Clínicas
                </Link>
                <Link to="/l/advogados" className="text-xs bg-white/10 hover:bg-white/20 text-slate-100 border border-white/15 px-3 py-1.5 rounded-lg transition-colors font-medium">
                  Advogados & Escritórios
                </Link>
                <Link to="/l/loja" className="text-xs bg-white/10 hover:bg-white/20 text-slate-100 border border-white/15 px-3 py-1.5 rounded-lg transition-colors font-medium">
                  E-commerce & Lojas
                </Link>
                <Link to="/l/artesanato" className="text-xs bg-white/10 hover:bg-white/20 text-slate-100 border border-white/15 px-3 py-1.5 rounded-lg transition-colors font-medium">
                  Artesanato & Ateliês
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch lg:items-end">
              <Link
                to="/servicos/landingpages"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-center text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                Ver Todos os Modelos de LP
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/orcamento?servico=landingpages"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/15 font-bold text-center text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
              >
                Solicitar Orçamento de Landing Page
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Client Spotlight Case */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Destaque de Portfólio</span>
              <h2 className="font-display text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Como ajudamos o {featuredClient.name} a multiplicar contatos
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                {featuredClient.description}
              </p>
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Resultado Consolidado</span>
                <p className="font-display text-lg font-bold text-emerald-600">
                  {featuredClient.results}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/clientes"
                  className="inline-flex items-center gap-2 font-bold text-sm text-blue-700 hover:text-orange-500 transition-colors"
                >
                  Ver Outros Casos de Sucesso &rarr;
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-slate-100 border border-slate-200">
                <img
                  src={featuredClient.image}
                  alt={featuredClient.name}
                  loading="lazy"
                  width={800}
                  height={450}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <h4 className="font-display font-bold text-lg tracking-tight">{featuredClient.name}</h4>
                    <p className="text-xs text-slate-300">{featuredClient.location}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Core Value Proposition: Problem vs Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-2xl p-8 lg:p-16 text-white grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Por que nos escolher?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              Seu site atual é lento, cai constantemente ou não gera contatos?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Muitas empresas investem alto em anúncios patrocinados no Google e Instagram, mas perdem até 70% das conversões porque o site demora mais de 3 segundos para carregar no celular do cliente ou não está posicionado organicamente.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-xs font-semibold text-slate-300">Chega de painéis compartilhados lentos e instáveis</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-xs font-semibold text-slate-300">Chega de suporte robótico por chat de ticket demorado</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-8 space-y-6">
            <h3 className="font-display text-xl font-bold text-white tracking-tight">
              A Solução AGÊNCIA OZ:
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-emerald-400 font-bold text-xs mt-0.5 shrink-0">✓</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Velocidade Extrema</h4>
                  <p className="text-xs text-slate-400">Hospedagem Cloud com cache a nível de hardware Nginx/Redis.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-emerald-400 font-bold text-xs mt-0.5 shrink-0">✓</span>
                <div>
                  <h4 className="text-sm font-bold text-white">WordPress Sem Bloqueios</h4>
                  <p className="text-xs text-slate-400">Desenvolvimento limpo de temas visando conversão e SEO.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-emerald-400 font-bold text-xs mt-0.5 shrink-0">✓</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Presença Local & Tradição</h4>
                  <p className="text-xs text-slate-400">Especialistas sediados em Canoas - RS com seleção para a Incubadora Tecnológica do Uni Lasalle e mais de 20 anos de mercado.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4.5. Explorar Ecossistema (Resumos das Seções do Site) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500 font-bold">Mapa do Site</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Navegue pelas Áreas Principais da AGÊNCIA OZ
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Explore os bastidores de nossa agência técnica, veja todos os casos de sucesso de clientes, tire suas dúvidas de tecnologia ou fale diretamente com nosso time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1: Sobre */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 text-blue-700 rounded-xl w-12 h-12 flex items-center justify-center border border-blue-100 shadow-sm">
                <Info className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 tracking-tight">Sobre a Agência</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nascida de um compromisso absoluto com a velocidade, ética técnica e suporte humanizado. Conheça nossa história e os 4 pilares técnicos de desenvolvimento.
              </p>
            </div>
            <div className="pt-6">
              <Link to="/sobre" className="text-xs font-bold text-blue-700 hover:text-orange-500 flex items-center gap-1 transition-colors">
                Ver Nossa História &rarr;
              </Link>
            </div>
          </div>

          {/* Card 2: Clientes */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="p-3 bg-orange-50 text-orange-500 rounded-xl w-12 h-12 flex items-center justify-center border border-orange-100 shadow-sm">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 tracking-tight">Nossos Clientes</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                A prova de que nosso método focado em alta performance funciona está nos resultados reais de nossos clientes. Conheça as marcas que aceleraram seu faturamento.
              </p>
            </div>
            <div className="pt-6">
              <Link to="/clientes" className="text-xs font-bold text-orange-500 hover:text-blue-700 flex items-center gap-1 transition-colors">
                Ver Casos de Sucesso &rarr;
              </Link>
            </div>
          </div>

          {/* Card 3: FAQ */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-12 h-12 flex items-center justify-center border border-emerald-100 shadow-sm">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 tracking-tight">Perguntas Frequentes</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tem dúvidas sobre migração gratuita, segurança de sites WordPress, infraestrutura VPS Cloud ou otimização Google? Nossa central de ajuda completa responde tudo.
              </p>
            </div>
            <div className="pt-6">
              <Link to="/faq" className="text-xs font-bold text-emerald-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                Acessar Central de Ajuda &rarr;
              </Link>
            </div>
          </div>

          {/* Card 4: Contato */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl w-12 h-12 flex items-center justify-center border border-purple-100 shadow-sm">
                <PhoneCall className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 tracking-tight">Fale Conosco</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pronto para iniciar seu projeto ou acelerar seu site WordPress atual? Preencha o formulário em minutos ou chame nosso atendimento pelo WhatsApp.
              </p>
            </div>
            <div className="pt-6">
              <Link to="/orcamento" className="text-xs font-bold text-purple-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                Entrar em Contato &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-8 md:p-12 shadow-2xl border border-slate-800">
          
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80"
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/85 to-blue-950/90"></div>
          </div>

          {/* Abs circles decorative */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Promo text details */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                <Gift className="h-3.5 w-3.5 animate-bounce" /> PROMOÇÃO SITE + E-MAIL CORPORATIVO GRÁTIS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                Abra seu negócio online <br className="hidden sm:inline" />
                <span className="text-orange-500">sem custo</span> de desenvolvimento!
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                Novos parceiros da **AGÊNCIA OZ** ganham um site profissional de até 5 páginas hospedado na nossa infraestrutura Cloud de ultra-alta velocidade, mais **1 conta de e-mail corporativo** de forma 100% gratuita! Você só paga a assinatura de hospedagem.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 pt-2 text-xs font-bold text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span>Até 5 páginas completas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span>Painel cPanel de Alto Desempenho</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span>1 Conta de E-mail Corporativo Grátis</span>
                </div>
              </div>
            </div>

            {/* Banner CTA block */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-stretch lg:items-end">
              <Link
                to="/promocao"
                className="bg-orange-500 hover:bg-orange-600 text-white font-black text-center text-base px-8 py-4 rounded-2xl shadow-xl transition-all hover:-translate-y-1 hover:scale-[1.03] cursor-pointer"
              >
                Garantir Site Grátis
              </Link>
              <Link
                to="/promocao"
                className="bg-white/5 text-white border border-white/10 hover:border-white/20 hover:bg-white/10 font-bold text-center text-sm px-6 py-3 rounded-2xl transition-all cursor-pointer"
              >
                Como Funciona? &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Selected Blog Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Conteúdo Relevante</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Aprenda a Otimizar Seu Negócio
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Artigos produzidos pela nossa equipe técnica. Sem jargões complexos.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-xs py-3 px-6 rounded-xl transition-all self-start"
          >
            Acessar o Blog Completo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 6. Final CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 lg:p-16 text-center space-y-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-radial-gradient from-blue-400 to-transparent pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-4 relative">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Pronto para transformar seu site em uma máquina de vendas?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Traga o seu site WordPress para os servidores VPS gerenciados da AGÊNCIA OZ ou crie um projeto totalmente novo com velocidade e SEO otimizados.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto relative">
            <Link
              to="/orcamento"
              className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold text-base px-8 py-4 rounded-xl transition-transform hover:-translate-y-0.5 shadow-lg shadow-blue-900/40"
            >
              Iniciar Meu Projeto
            </Link>
            <a
              href="https://wa.me/5548991984678?text=Ol%C3%A1%21+Quero+um+or%C3%A7amento+r%C3%A1pido."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-base px-8 py-4 rounded-xl transition-transform hover:-translate-y-0.5 shadow-lg shadow-orange-500/40 flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Chamar Comercial
            </a>
          </div>

          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider relative pt-2">
            Atendimento local em Canoas e Remoto para todo o Brasil.
          </div>
        </div>
      </section>

    </div>
  );
}
