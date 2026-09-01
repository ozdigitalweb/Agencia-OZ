import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  RotateCw, 
  CheckCircle2, 
  ArrowRight, 
  Server, 
  Globe, 
  Search, 
  Radio, 
  ShieldCheck, 
  Headphones, 
  Zap, 
  TrendingUp, 
  Layers, 
  HelpCircle, 
  Sparkles,
  Award,
  Clock,
  Send,
  MessageSquare,
  Palette
} from 'lucide-react';
import solucao360EcosystemImg from '../assets/images/solucao_360_ecosystem_1787783122934.jpg';

export default function Solucao360() {
  // State for interactive 360 Diagnostic checklist
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([
    'Site moderno e rápido',
    'Hospedagem Cloud segura'
  ]);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const toggleNeed = (need: string) => {
    if (selectedNeeds.includes(need)) {
      setSelectedNeeds(selectedNeeds.filter(item => item !== need));
    } else {
      setSelectedNeeds([...selectedNeeds, need]);
    }
  };

  const commonNeedsList = [
    { id: 'site', label: 'Criação ou Redesign de Site Institucional WordPress', category: 'Desenvolvimento' },
    { id: 'landing', label: 'Landing Page de Alta Conversão para Anúncios', category: 'Vendas' },
    { id: 'midia-social', label: 'Desenho de Criativos, Avaliação de Mídia Social, Organização de Posts e Copy', category: 'Mídia / Redes' },
    { id: 'hospedagem', label: 'Hospedagem Cloud com cPanel e E-mails que não caem em Spam', category: 'Infraestrutura' },
    { id: 'seo', label: 'Posicionamento no Google Orgânico e Google Maps (SEO/GEO)', category: 'Visibilidade' },
    { id: 'streaming', label: 'Sonorização Ambiente / Rádio Corporativa PROVOX', category: 'Comunicação' },
    { id: 'suporte', label: 'Suporte Técnico Humanizado e Manutenção Contínua', category: 'Segurança' },
    { id: 'velocidade', label: 'Otimização de Velocidade (PageSpeed 90+)', category: 'Performance' },
    { id: 'blindagem', label: 'Blindagem contra Invasões, Malware e Backups Diários', category: 'Segurança' }
  ];

  const handleSendDiagnostic = (e: React.FormEvent) => {
    e.preventDefault();
    const needsText = selectedNeeds.length > 0 
      ? selectedNeeds.map(n => `• ${n}`).join('%0A') 
      : 'Auxílio geral em todas as frentes digitais.';
    
    const message = `*SOLICITAÇÃO DE DIAGNÓSTICO 360° - AGÊNCIA OZ*%0A%0A` +
      `*Empresa:* ${companyName || 'Não informada'}%0A` +
      `*Contato:* ${contactName || 'Não informado'}%0A` +
      `*WhatsApp:* ${whatsapp || 'Não informado'}%0A%0A` +
      `*Necessidades Selecionadas no Pacote 360°:*%0A${needsText}%0A%0A` +
      `Gostaria de uma avaliação completa para a minha empresa.`;

    window.open(`https://wa.me/5548991984678?text=${message}`, '_blank');
  };

  const steps360 = [
    {
      stepNumber: "01",
      title: "Diagnóstico Digital & Auditoria Raio-X",
      badge: "Mapeamento Completo",
      icon: Search,
      description: "Analisamos tudo o que sua empresa já possui (ou precisa construir): saúde do site, histórico de domínio, velocidade de carregamento, reputação de e-mails, posicionamento no Google e pontos de vazamento de clientes.",
      deliverables: [
        "Auditoria de velocidade e nota no Google PageSpeed",
        "Análise de segurança, SSL e portas do servidor",
        "Mapeamento de palavras-chave do seu segmento e concorrentes",
        "Relatório transparente de prioridades de execução"
      ]
    },
    {
      stepNumber: "02",
      title: "Infraestrutura Cloud & E-mails Blindados",
      badge: "Base Sólida",
      icon: Server,
      description: "Montamos e configuramos seu ambiente em servidores VPS Cloud de última geração com cPanel gerenciado. Chega de e-mails corporativos que caem na caixa de spam ou sites fora do ar na primeira campanha de tráfego.",
      deliverables: [
        "Hospedagem VPS Cloud com isolamento de recursos",
        "Contas de e-mail corporativo com autenticação SPF, DKIM e DMARC",
        "Certificado SSL Dedicado (HTTPS) grátis e perpétuo",
        "Rotina diária e automatizada de backups externos"
      ]
    },
    {
      stepNumber: "03",
      title: "Desenvolvimento Web & Landing Pages de Alta Performance",
      badge: "Presença de Alto Impacto",
      icon: Globe,
      description: "Construímos seu novo site institucional ou landing pages no WordPress com código limpo, sem temas prontos pesados. Foco total em velocidade extrema no celular e elementos estratégicos de conversão.",
      deliverables: [
        "Design sob medida e Landing Pages otimizadas para carregamento < 1s",
        "Estrutura 100% responsiva para celulares, tablets e desktops",
        "Integração direta com WhatsApp, CRM, Pixels de rastreamento e formulários",
        "Painel administrativo simplificado para você editar textos com facilidade"
      ]
    },
    {
      stepNumber: "04",
      title: "Desenho de Criativos, Avaliação de Mídia Social, Organização de Posts & Copy",
      badge: "Engajamento & Conteúdo",
      icon: Palette,
      description: "Avaliamos a presença digital da sua marca nas redes sociais, organizamos o cronograma e linha editorial de posts, desenhamos criativos de alto impacto (feed, stories e carrosséis) e redigimos copies persuasivas alinhadas às suas Landing Pages e campanhas.",
      deliverables: [
        "Avaliação e diagnóstico do perfil de mídia social da empresa",
        "Desenho de criativos e artes estratégicas para Instagram e Facebook",
        "Organização de calendário editorial e planejamento de postagens",
        "Copywriting persuasivo focado em conexão, quebra de objeções e conversão"
      ]
    },
    {
      stepNumber: "05",
      title: "Posicionamento no Google (SEO Tradicional + GEO para IA)",
      badge: "Tráfego Orgânico Qualificado",
      icon: TrendingUp,
      description: "Colocamos sua marca no radar de quem realmente quer comprar. Configuramos seu perfil do Google Empresas para dominar a busca local e estruturamos os dados do site para ser citado por IAs como Gemini e ChatGPT.",
      deliverables: [
        "Otimização de SEO On-page (títulos, meta-tags, alt text e schema.org)",
        "Configuração e refinamento do Google Meu Negócio / Maps",
        "Otimização GEO (Generative Engine Optimization) para respostas em IA",
        "Indexação prioritária no Google Search Console"
      ]
    },
    {
      stepNumber: "06",
      title: "Monitoramento 24/7, Blindagem & Suporte Humanizado",
      badge: "Paz de Espírito",
      icon: Headphones,
      description: "O trabalho não termina na entrega. Acompanhamos a evolução da sua empresa mês a mês com atualizações de segurança constantes, monitoramento preventivo e suporte técnico direto por WhatsApp.",
      deliverables: [
        "Monitoramento ativo de estabilidade e uptime 99.9%",
        "Atualizações regulares do núcleo WordPress e plugins",
        "Varreduras contínuas contra malwares e tentativas de invasão",
        "Canal direto com nossos especialistas sem filas nem chamados impessoais"
      ]
    },
    {
      stepNumber: "07",
      title: "Sonorização & Rádio Corporativa PROVOX (Serviço Específico)",
      badge: "Específico • Fora do Pacote",
      icon: Radio,
      isSpecific: true,
      description: "Atenção: Este é um serviço específico e NÃO está incluso no pacote base da Solução 360 Graus. Trata-se de uma contratação avulsa e sob medida para empresas físicas, redes de lojas ou marcas que querem um canal de áudio exclusivo, vinhetas promocionais e grade musical personalizada sem anúncios de concorrentes.",
      deliverables: [
        "Serviço avulso e sob medida (não incluso no pacote padrão 360°)",
        "Streaming em nuvem com AutoDJ funcionando 24h por dia",
        "Programação de vinhetas, promoções e comunicados comerciais",
        "Reprodutor customizado com player exclusivo para site e lojas"
      ]
    }
  ];

  return (
    <div id="solucao-360-page" className="space-y-20 pb-20 animate-fade-in font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-24 border-b border-slate-800">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30">
              <RotateCw className="h-4 w-4 animate-spin" style={{ animationDuration: '8s' }} />
              <span>PACOTE CORPORATIVO ALL-IN-ONE</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Solução <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-orange-400">360 Graus</span> para sua Empresa
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              O auxílio digital completo e integrado para empresas que precisam de resultados reais. Unificamos infraestrutura Cloud, desenvolvimento web de alta performance, SEO, e-mails corporativos e suporte contínuo em uma única parceria sólida.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#passo-a-passo"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base px-8 py-4 rounded-xl shadow-lg shadow-orange-950/50 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Ver o Passo a Passo dos Serviços</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#diagnostico-360"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-base px-7 py-4 rounded-xl transition-all hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4 text-orange-400" />
                <span>Simular Diagnóstico 360°</span>
              </a>
            </div>

            {/* Micro Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-slate-800 max-w-3xl mx-auto text-left">
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-3">
                <div className="text-orange-400 font-bold text-xs">01. Centralizado</div>
                <div className="text-slate-200 text-xs font-semibold">Um só fornecedor</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-3">
                <div className="text-blue-400 font-bold text-xs">02. 100% Cloud</div>
                <div className="text-slate-200 text-xs font-semibold">Servidores VPS Rápidos</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-3">
                <div className="text-emerald-400 font-bold text-xs">03. Google Ready</div>
                <div className="text-slate-200 text-xs font-semibold">SEO e GEO Otimizados</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-3">
                <div className="text-purple-400 font-bold text-xs">04. Sem Robôs</div>
                <div className="text-slate-200 text-xs font-semibold">Suporte Humanizado</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Para Quem é a Solução 360 Graus */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-md border border-orange-200">
                Diagnóstico de Necessidades
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Sua empresa se identifica com algum destes cenários?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Muitas empresas sofrem com problemas digitais fragmentados: contratam um profissional para o site, outro para a hospedagem e outro para o marketing, e ninguém assume a responsabilidade quando algo falha.
              </p>
              <div className="pt-2">
                <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-100 flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-900 leading-relaxed font-medium">
                    Na <strong>Solução 360 Graus da AGÊNCIA OZ</strong>, nós assumimos toda a infraestrutura e a inteligência digital para você focar apenas em atender seus clientes e vender mais.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">✕</div>
                <h3 className="text-sm font-bold text-slate-900">Site Lento ou Desatualizado</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Seu site demora mais de 3 segundos para abrir no celular e os clientes desistem antes mesmo de ver sua proposta.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">✕</div>
                <h3 className="text-sm font-bold text-slate-900">E-mails Caindo no Spam</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Propostas e mensagens importantes que não chegam aos clientes por falta de autenticação SPF, DKIM e DMARC.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">✕</div>
                <h3 className="text-sm font-bold text-slate-900">Invisível no Google Maps</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Concorrentes diretos aparecem nas primeiras posições enquanto a sua marca não é encontrada nas buscas locais.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">✕</div>
                <h3 className="text-sm font-bold text-slate-900">Suporte Inexistente</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Horas esperando por robôs de atendimento em hospedagens baratas compartilhadas sem suporte especializado.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. O Passo a Passo dos Serviços Envolvidos */}
      <section id="passo-a-passo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
            Metodologia Transparente
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            O Passo a Passo do Pacote 360 Graus
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Conheça todas as etapas e serviços envolvidos no nosso pacote completo para transformar a presença digital da sua empresa com clareza e previsibilidade:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps360.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={idx}
                className={`bg-white border rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group ${
                  step.isSpecific 
                    ? 'border-amber-300/80 hover:border-amber-400 bg-gradient-to-b from-white to-amber-50/20' 
                    : 'border-slate-200/90 hover:border-blue-300'
                }`}
              >
                {/* Step Top */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-extrabold text-lg shadow-2xs group-hover:scale-105 transition-transform ${
                      step.isSpecific ? 'bg-amber-100 text-amber-700' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {step.stepNumber}
                    </span>
                    <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border text-right ${
                      step.isSpecific 
                        ? 'text-amber-800 bg-amber-50 border-amber-200' 
                        : 'text-blue-700 bg-blue-50 border-blue-100'
                    }`}>
                      {step.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`font-display font-bold text-lg leading-snug transition-colors ${
                      step.isSpecific 
                        ? 'text-slate-900 group-hover:text-amber-700' 
                        : 'text-slate-900 group-hover:text-blue-700'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Deliverables List */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    {step.isSpecific ? 'Diferenciais deste serviço sob medida:' : 'O que está incluído nesta etapa:'}
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {step.deliverables.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${step.isSpecific ? 'text-amber-600' : 'text-emerald-600'}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}

          {/* 8. Imagem & Card do Ecossistema Integrado 360 Graus (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-md flex flex-col md:flex-row relative group hover:border-orange-500/50 transition-all duration-300 text-white">
            {/* Lado da Imagem */}
            <div className="md:w-1/2 relative min-h-[220px] sm:min-h-[260px] md:min-h-full overflow-hidden bg-slate-900">
              <img
                src={solucao360EcosystemImg}
                alt="Ecossistema Digital Integrado - Solução 360 Graus AGÊNCIA OZ"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-orange-500/40 text-orange-400 text-xs font-black uppercase tracking-wider shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                Ecossistema 360°
              </div>
            </div>

            {/* Lado do Conteúdo + CTA */}
            <div className="md:w-1/2 p-6 sm:p-7 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Integração Total</span>
                <h3 className="font-display font-extrabold text-xl text-white leading-tight">
                  Sua Empresa Conectada de Ponta a Ponta
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                  Todas as etapas do pacote funcionam de forma sincronizada: infraestrutura Cloud de alto desempenho, site e Landing Pages com velocidade extrema, criativos para redes sociais, SEO orgânico e suporte técnico humanizado contínuo.
                </p>
              </div>

              <div className="space-y-4 pt-3 border-t border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    Sem Fornecedores Isolados
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    Tudo em 1 Única Parceria
                  </span>
                </div>

                <a
                  href="https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+o+Pacote+Solu%C3%A7%C3%A3o+360+Graus+da+AG%C3%8ANCIA+OZ."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-orange-500/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Solicitar Proposta do Pacote 360°</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tabela / Matriz de Vantagens: Isolado vs. 360 Graus */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative shadow-xl border border-slate-800">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-950/60 px-3 py-1 rounded-md border border-orange-500/30">
              Economia e Eficiência
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Contratar Serviços Isolados <span className="text-slate-400">vs.</span> Solução 360°
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Veja por que unificar todas as pontas digitais com a AGÊNCIA OZ traz mais resultados com menor custo.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-4">Critério</th>
                  <th className="py-4 px-4 text-red-300">Contratar Fornecedores Separados</th>
                  <th className="py-4 px-4 text-emerald-400 bg-slate-800/80 rounded-t-xl">Solução 360 Graus (AGÊNCIA OZ)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-200">Responsabilidade Técnica</td>
                  <td className="py-4 px-4 text-slate-400">Um fornecedor culpa o outro quando o site cai ou o e-mail falha.</td>
                  <td className="py-4 px-4 text-emerald-300 font-medium bg-slate-800/80">Responsabilidade única centralizada por especialistas.</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-200">Custo Total</td>
                  <td className="py-4 px-4 text-slate-400">Mensalidades dispersas somam valores elevados e imprevisíveis.</td>
                  <td className="py-4 px-4 text-emerald-300 font-medium bg-slate-800/80">Pacote all-in-one com excelente custo-benefício.</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-200">Tempo de Resolução</td>
                  <td className="py-4 px-4 text-slate-400">Dias esperando respostas em tickets lentos e burocráticos.</td>
                  <td className="py-4 px-4 text-emerald-300 font-medium bg-slate-800/80">Atendimento ágil direto no WhatsApp com engenheiros.</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-200">Integração de Tecnologias</td>
                  <td className="py-4 px-4 text-slate-400">Plugins incompatíveis, servidores mal dimensionados e conflitos.</td>
                  <td className="py-4 px-4 text-emerald-300 font-medium bg-slate-800/80">Arquitetura afinada sob medida para nota 90+ no PageSpeed.</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-200">Evolução Contínua</td>
                  <td className="py-4 px-4 text-slate-400">O site é entregue e esquecido, tornando-se obsoleto rapidamente.</td>
                  <td className="py-4 px-4 text-emerald-300 font-medium bg-slate-800/80 rounded-b-xl">Manutenção, auditorias mensais e melhorias ativas.</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 5. Simulador Interativo / Solicitação de Diagnóstico 360 */}
      <section id="diagnostico-360" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-orange-300 rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-100 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-md border border-orange-200">
                Simulador de Necessidades
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                Personalize o Pacote 360° para a sua Empresa
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                Selecione as áreas que mais precisam de auxílio no momento para receber uma avaliação personalizada e sem compromisso.
              </p>
            </div>

            {/* Interactive Checkbox Grid */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                1. Quais serviços sua empresa necessita?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {commonNeedsList.map((item) => {
                  const isChecked = selectedNeeds.includes(item.label);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleNeed(item.label)}
                      className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start justify-between gap-3 cursor-pointer ${
                        isChecked 
                          ? 'bg-orange-50/80 border-orange-400 text-slate-900 font-bold shadow-2xs' 
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-orange-600 uppercase font-bold block">{item.category}</span>
                        <span>{item.label}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                        isChecked ? 'bg-orange-500 border-orange-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Form Details */}
            <form onSubmit={handleSendDiagnostic} className="space-y-4 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                2. Informações para contato
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Nome da sua Empresa"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Seu Nome"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp com DDD"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl shadow-lg shadow-orange-100 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Solicitar Diagnóstico 360° Gratuito no WhatsApp</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center">
                Atendimento rápido por especialistas da AGÊNCIA OZ. Sem compromisso e sem termos ocultos.
              </p>
            </form>

          </div>
        </div>
      </section>

      {/* 6. FAQ - Perguntas Frequentes 360 */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Dúvidas Frequentes sobre a Solução 360 Graus
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Tudo o que você precisa saber antes de iniciar a transformação digital da sua empresa.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-blue-700 shrink-0" />
              Minha empresa já possui um site antigo e e-mails. Como funciona a migração?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Nossa equipe cuida de 100% do processo de migração de forma segura e transparente, sem que seu site fique fora do ar e sem perda de histórico de e-mails corporativos.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-blue-700 shrink-0" />
              Quanto tempo leva para implementar todo o pacote 360°?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Em média, a infraestrutura Cloud e os e-mails são ativados em 24 a 48 horas. O desenvolvimento do site WordPress sob medida e as otimizações de SEO são concluídos em etapas ágeis de 7 a 20 dias úteis.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-blue-700 shrink-0" />
              Preciso contratar todos os serviços ou posso personalizar?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              O pacote 360° é totalmente flexível. Analisamos o que sua empresa realmente necessita no momento e montamos uma proposta sob medida, evitando custos com ferramentas desnecessárias.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Bottom CTA Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-2xl font-extrabold">Pronto para ter auxílio digital completo na sua empresa?</h3>
            <p className="text-xs sm:text-sm text-blue-100">Fale agora com nosso time técnico em Canoas - RS e agende seu diagnóstico 360°.</p>
          </div>
          <a
            href="https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+a+Solu%C3%A7%C3%A3o+360+Graus+para+a+minha+empresa."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl shadow-md transition-all hover:scale-105"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </section>

    </div>
  );
}
