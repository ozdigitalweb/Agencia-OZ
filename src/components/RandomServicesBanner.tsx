import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  Shield,
  Sparkles,
  Globe,
  Cpu,
  ShieldCheck,
  Radio,
  Music,
  Award,
  BookOpen,
  Headphones,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export interface ServiceBannerItem {
  id: string;
  category: string;
  badge: string;
  title: string;
  subtitle: string;
  highlight1Title: string;
  highlight1Sub: string;
  highlight2Title: string;
  highlight2Sub: string;
  icon1: React.ReactNode;
  icon2: React.ReactNode;
  path: string;
  accentBg: string;
  accentText: string;
}

export default function RandomServicesBanner() {
  const services: ServiceBannerItem[] = [
    {
      id: 'wordpress',
      category: 'DESEMPENHO REAL',
      badge: 'Site & E-commerce',
      title: 'WordPress Otimizado Core Web Vitals',
      subtitle: 'Desenvolvimento leve sem templates pesados. Nota máxima de velocidade no Google PageSpeed.',
      highlight1Title: 'Performance Máxima',
      highlight1Sub: 'Core Web Vitals Nota 90+ em Mobile & Desktop',
      highlight2Title: 'Segurança cPanel',
      highlight2Sub: 'WAF Ativo, SSL Grátis e Backups Automatizados',
      icon1: <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-orange-500 shrink-0 animate-bounce" />,
      icon2: <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-400 shrink-0" />,
      path: '/servicos/wordpress',
      accentBg: 'bg-blue-50 border-blue-100',
      accentText: 'text-slate-800'
    },
    {
      id: 'seo',
      category: 'VISIBILIDADE ORGÂNICA',
      badge: 'Posicionamento Google',
      title: 'SEO Estratégico & Busca Local (GEO)',
      subtitle: 'Conquiste os primeiros lugares no Google Maps e receba leads qualificados organicamente.',
      highlight1Title: 'Otimização de Busca',
      highlight1Sub: 'Auditoria de Concorrência & Palavras-Chave',
      highlight2Title: 'Google Perfil da Empresa',
      highlight2Sub: 'Dominância nas Buscas Locais da sua Região',
      icon1: <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-amber-500 shrink-0 animate-pulse" />,
      icon2: <Globe className="h-6 w-6 sm:h-7 sm:w-7 text-blue-500 shrink-0" />,
      path: '/servicos/seo',
      accentBg: 'bg-purple-50 border-purple-100',
      accentText: 'text-slate-900'
    },
    {
      id: 'hospedagem',
      category: 'INFRAESTRUTURA CLOUD',
      badge: 'Servidor VPS cPanel',
      title: 'Hospedagem Cloud cPanel Gerenciada',
      subtitle: 'Servidores NVMe ultra-rápidos com gestão completa de e-mails corporativos e subdomínios.',
      highlight1Title: 'Uptime 99.9% Garantido',
      highlight1Sub: 'Infraestrutura Cloud de Baixa Latência',
      highlight2Title: 'E-mails Corporativos',
      highlight2Sub: 'Migração Gratuita & Suporte Especializado VIP',
      icon1: <Cpu className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-400 shrink-0 animate-pulse" />,
      icon2: <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-400 shrink-0" />,
      path: '/servicos/hospedagem',
      accentBg: 'bg-slate-900 text-white border-slate-800',
      accentText: 'text-white'
    },
    {
      id: 'streaming',
      category: 'ÁUDIO & STREAMING HD',
      badge: 'Rádio Corporativa',
      title: 'PROVOX Streaming & Rádio Web 24/7',
      subtitle: 'Sonorização para lojas, hospitais, igrejas e emissoras com Auto DJ em nuvem e vinhetas comerciais.',
      highlight1Title: 'Transmissão HD AAC+',
      highlight1Sub: 'Som cristalino em alta fidelidade com baixo consumo',
      highlight2Title: 'Auto DJ em Nuvem',
      highlight2Sub: 'Programação no ar 24h/dia sem precisar de PC ligado',
      icon1: <Radio className="h-6 w-6 sm:h-7 sm:w-7 text-orange-400 shrink-0 animate-pulse" />,
      icon2: <Music className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-400 shrink-0" />,
      path: '/servicos/streaming',
      accentBg: 'bg-slate-950 text-white border-slate-800',
      accentText: 'text-white'
    },
    {
      id: 'landing-pages',
      category: 'MARKETING DE VENDAS',
      badge: 'Alta Conversão',
      title: 'Landing Pages de Alta Conversão',
      subtitle: 'Páginas persuasivas com carregamento instantâneo projetadas para transformar visitantes em clientes.',
      highlight1Title: 'Foco em Vendas',
      highlight1Sub: 'Integração direta com WhatsApp e Formulários',
      highlight2Title: 'Design Responsivo',
      highlight2Sub: 'Carregamento leve e otimizado para celulares',
      icon1: <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-500 shrink-0" />,
      icon2: <Award className="h-6 w-6 sm:h-7 sm:w-7 text-orange-400 shrink-0" />,
      path: '/servicos/landing-pages',
      accentBg: 'bg-emerald-50 border-emerald-100',
      accentText: 'text-slate-900'
    },
    {
      id: 'como-criar-radio',
      category: 'PORTAL EDUCACIONAL',
      badge: 'Guia Completo',
      title: 'Como Criar Sua Rádio Web do Zero',
      subtitle: 'Guia completo com tutoriais de equipamentos, softwares de automação, microfones e servidores.',
      highlight1Title: 'Passo a Passo Prático',
      highlight1Sub: 'Do planejamento ao sinal no ar sem mistério',
      highlight2Title: 'Softwares Recomendados',
      highlight2Sub: 'Audacity, Mixxx, RadioBOSS e Dicas de Direitos Autorais',
      icon1: <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-400 shrink-0" />,
      icon2: <Headphones className="h-6 w-6 sm:h-7 sm:w-7 text-orange-400 shrink-0" />,
      path: '/guias/como-criar-radio-web',
      accentBg: 'bg-cyan-950 text-white border-cyan-800',
      accentText: 'text-white'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto Rotation Timer (3.8 seconds)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused, services.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleRandom = () => {
    let nextIdx = Math.floor(Math.random() * services.length);
    if (nextIdx === currentIndex) {
      nextIdx = (currentIndex + 1) % services.length;
    }
    setCurrentIndex(nextIdx);
  };

  const activeService = services[currentIndex];

  return (
    <div
      className="relative w-full max-w-md sm:max-w-lg h-[410px] sm:h-[430px] md:aspect-square md:h-auto select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Visual Backdrop Frame */}
      <div className="absolute inset-4 rounded-[40px] bg-slate-100 border border-slate-200 shadow-inner transform rotate-3" />

      {/* Main Browser Window Card */}
      <div className="absolute inset-4 rounded-[40px] bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col justify-between p-5 sm:p-7 transform -rotate-1 hover:rotate-0 transition-all duration-500">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-red-400 shadow-2xs" />
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 shadow-2xs" />
            <span className="w-3.5 h-3.5 rounded-full bg-green-400 shadow-2xs" />
            <span className="text-[11px] font-mono text-slate-400 font-bold ml-1">oz.com.br</span>
          </div>

          {/* Random Shuffle & Nav Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleRandom}
              title="Sortear outro serviço aleatório"
              className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200/60 transition-colors cursor-pointer"
            >
              <Shuffle className="h-3 w-3 text-orange-500" />
              <span>Aleatório</span>
            </button>

            <button
              onClick={handlePrev}
              title="Anterior"
              className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleNext}
              title="Próximo"
              className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Animated Content Area */}
        <div className="my-auto py-2 relative min-h-[220px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="space-y-3"
            >
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-orange-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                  {activeService.category}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {activeService.badge}
                </span>
              </div>

              {/* Service Card Highlight #1 */}
              <div className={`rounded-xl p-3 sm:p-3.5 border ${activeService.accentBg} flex items-center gap-3 shadow-2xs transition-all`}>
                {activeService.icon1}
                <div className="overflow-hidden">
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide opacity-80">
                    {activeService.highlight1Title}
                  </h4>
                  <p className={`text-xs sm:text-sm font-extrabold truncate ${activeService.accentText}`}>
                    {activeService.title}
                  </p>
                </div>
              </div>

              {/* Service Card Highlight #2 */}
              <div className="bg-slate-900 text-white rounded-xl p-3 sm:p-3.5 border border-slate-800 flex items-center gap-3 shadow-2xs">
                {activeService.icon2}
                <div className="overflow-hidden">
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-blue-400">
                    {activeService.highlight2Title}
                  </h4>
                  <p className="text-xs sm:text-sm font-bold text-slate-200 truncate">
                    {activeService.highlight2Sub}
                  </p>
                </div>
              </div>

              {/* Direct Link to Service */}
              <div className="pt-1">
                <Link
                  to={activeService.path}
                  className="w-full bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-800 font-bold text-xs py-2 px-3.5 rounded-xl transition-all flex items-center justify-between group border border-slate-200"
                >
                  <span className="truncate">Ver Solução de {activeService.badge}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-1 shrink-0" />
                </Link>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer & Indicators Bar */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-1.5">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                title={`Ir para serviço ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-5 bg-orange-500' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="font-mono text-slate-400 font-bold">{currentIndex + 1} / {services.length}</span>
            <span className="text-emerald-500 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Ao Vivo
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
