import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Megaphone, 
  Bot, 
  Sparkles, 
  MessageSquare, 
  Share2, 
  Instagram, 
  Facebook, 
  Layers, 
  Target, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Palette, 
  Radio, 
  Users,
  MessageCircle,
  BarChart3,
  Award
} from 'lucide-react';

// Símbolo do Batman do Ozzy
function BatmanIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 4.5c-.35 0-.7.42-.9 1.15-.85-.18-1.85-.12-2.85.45-1.95.95-3.65 2.65-5.25 4.8 1.45-.65 3.15-.8 4.65-.3-.85 1.3-.4 2.45.85 3.05 1.45-1.45 2.95-1.55 4.45-.6.25-.7.5-1.4.8-2.1.3.7.55 1.4.8 2.1 1.5-.95 3-.85 4.45.6 1.25-.6 1.7-1.75.85-3.05 1.5-.5 3.2-.35 4.65.3-1.6-2.15-3.3-3.85-5.25-4.8-1-.57-2-.63-2.85-.45-.2-.73-.55-1.15-.9-1.15h-.6z" />
    </svg>
  );
}

export default function ServicosMidia() {
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+os+servi%C3%A7os+de+M%C3%ADdia%2C+Divulga%C3%A7%C3%A3o+e+Assistente+Virtual+OZZY.";

  const mediaPillars = [
    {
      icon: Bot,
      badge: "Inteligência Artificial 24/7",
      badgeColor: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      title: "Assistente Virtual Inteligente (OZZY)",
      description: "Implementamos um consultor de IA personalizado no seu site, treinado com todas as informações, produtos, dúvidas e diferenciais do seu negócio. Ele atende 24 horas por dia, qualifica clientes e transborda para o WhatsApp.",
      features: [
        "Atendimento imediato sem filas (tempo de resposta 0s)",
        "Treinamento sob medida na base de dados da sua empresa",
        "Qualificação automática e coleta de dados do lead",
        "Transbordo inteligente para o WhatsApp dos seus vendedores"
      ]
    },
    {
      icon: Palette,
      badge: "Criativos & Redes Sociais",
      badgeColor: "bg-pink-500/10 text-pink-600 border-pink-500/20",
      title: "Artes para Instagram, Facebook e Redes",
      description: "Design profissional de criativos visuais estratégicos para feed, stories e carrosséis. Nossas artes são desenvolvidas em harmonia direta com suas Landing Pages para criar uma experiência de marca coesa e irresistível.",
      features: [
        "Criativos de alto impacto para Instagram e Facebook",
        "Formatos otimizados para Feed (1:1 / 4:5) e Stories (9:16)",
        "Identidade visual consistente com a página de destino",
        "Artes pensadas para quebrar objeções e gerar cliques"
      ]
    },
    {
      icon: Target,
      badge: "Copywriting de Conversão",
      badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      title: "Copywriting & Roteiros de Anúncios",
      description: "Textos de vendas formulados por especialistas em comportamento do consumidor. Escrevemos copies altamente persuasivas para anúncios no Meta Ads, legendas magnéticas e mensagens diretas de vendas.",
      features: [
        "Títulos ganchos que prendem a atenção no primeiro segundo",
        "Técnicas de persuasão focadas em benefícios reais",
        "Chamadas para Ação (CTAs) de altíssima resposta",
        "Sinergia total entre os anúncios e a Landing Page"
      ]
    },
    {
      icon: Megaphone,
      badge: "Divulgação Estratégica",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      title: "Divulgação de Marca & Lançamento de Produtos",
      description: "Planejamento e estruturação completa para colocar seu novo produto ou serviço em evidência no mercado. Unimos tráfego, anúncios, conteúdo e páginas para acelerar suas vendas desde o primeiro dia.",
      features: [
        "Estratégia multicanal de lançamento e tração de produtos",
        "Segmentação direcionada ao seu público comprador ideal",
        "Construção de autoridade e reconhecimento de marca local/nacional",
        "Métricas e acompanhamento de retorno do investimento"
      ]
    }
  ];

  const ozzyHighlights = [
    {
      title: "Zero Clientes Perdidos Fora do Horário",
      desc: "Mais de 40% das buscas e compras acontecem à noite ou fins de semana. O assistente atende, tira dúvidas e encaminha para fechamento sem interrupções."
    },
    {
      title: "Alimentação Contínua da Base",
      desc: "Você pode atualizar promoções, novos produtos e políticas em tempo real através do painel gestor OZGESTOR."
    },
    {
      title: "Economia de Tempo da Equipe",
      desc: "Sua equipe comercial só assume quando o cliente já entendeu o produto, o valor estimado e está pronto para o contrato."
    },
    {
      title: "Experiência Inovadora e Memorável",
      desc: "Proporciona ao visitante uma experiência moderna de atendimento com tecnologia de ponta em Português do Brasil."
    }
  ];

  return (
    <div id="servicos-midia-page" className="space-y-20 pb-16 animate-fade-in">
      
      {/* 1. Hero Section with Animated High-Tech Canvas */}
      <section className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-24">
        
        {/* Subtle Grid & Particle Waves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-40">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />
          
          <svg className="absolute bottom-0 left-0 w-full h-48 opacity-30" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="media-hero-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 160 Q 250 80 500 130 T 1000 40"
              fill="none"
              stroke="url(#media-hero-gradient)"
              strokeWidth="4"
              initial={{ strokeDasharray: "1000", strokeDashoffset: "1000" }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 3.5, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Mídia, Divulgação & Assistente Virtual IA
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Divulgação de Marca, Criativos de Alto Impacto & Atendimento com IA.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Conectamos seu negócio ao público certo através de **artes profissionais para Instagram e Facebook**, **copywriting magnético**, estratégias de **lançamento de produtos** e o **OZZY**, o assistente virtual inteligente com atendimento 24/7.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black px-7 py-4 rounded-xl text-sm transition-all shadow-lg shadow-orange-500/20 inline-flex items-center gap-2 hover:-translate-y-0.5 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  Solicitar Estratégia de Mídia
                </a>

                <Link
                  to="/orcamento"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-xl text-sm transition-all border border-slate-700 inline-flex items-center gap-2 hover:-translate-y-0.5"
                >
                  <BarChart3 className="h-4 w-4 text-orange-400" />
                  Simular Orçamento
                </Link>
              </div>

              {/* Trust markers */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Artes 100% Personalizadas
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  Copywriting Focado em Vendas
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  OZZY IA Integrado
                </span>
              </div>
            </div>

            {/* Right Card Mockup - Interactive OZZY & Media Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 border border-slate-800 shadow-2xl space-y-6">
                
                {/* Header Preview */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-black shadow-md shadow-orange-500/30">
                      <BatmanIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm text-white">OZZY Agent</span>
                        <span className="text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">Online 24/7</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Consultor Inteligente OZ</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
                    IA Generativa
                  </span>
                </div>

                {/* Interactive Speech Bubbles Showcase */}
                <div className="space-y-3 text-xs">
                  <div className="bg-slate-800/90 text-slate-300 p-3 rounded-2xl rounded-tl-none border border-slate-700/80 leading-relaxed">
                    <p className="font-semibold text-amber-400 mb-1">💬 Atendimento & Conversão:</p>
                    <p>
                      &quot;Olá! Sou o OZZY. O que você gostaria de divulgar hoje? Criamos suas artes para Instagram/Facebook, estruturamos sua Landing Page e atendemos seus clientes em tempo real!&quot;
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold p-3 rounded-2xl rounded-tr-none shadow-md ml-auto max-w-[85%] text-right">
                    &quot;Quero atrair mais clientes para minha clínica através de anúncios no Instagram!&quot;
                  </div>

                  <div className="bg-slate-800/90 text-slate-300 p-3 rounded-2xl rounded-tl-none border border-slate-700/80 leading-relaxed">
                    <p className="text-[11px] text-slate-300">
                      ⚡ <strong>Excelente!</strong> Criamos o pacote de artes + copy de alta conversão para os anúncios e direcionamos o público para sua Landing Page com agendamento direto pelo WhatsApp!
                    </p>
                  </div>
                </div>

                {/* Action trigger button */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const btn = document.getElementById('ozzy-floating-btn');
                      if (btn) btn.click();
                    }}
                    className="w-full bg-slate-800 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 border border-orange-500/40 font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
                  >
                    <BatmanIcon className="w-4 h-4" />
                    <span>Clique para Testar o OZZY Agora</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-200/80 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-orange-500" /> Pilares da Nossa Mídia
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Divulgação Estratégica & Tecnologia de Atendimento
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Não basta apenas criar um site: é preciso atrair o público com artes chamativas, copy convincente e atender o cliente no exato instante em que ele se interessa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mediaPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group hover:border-orange-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 text-orange-400 group-hover:bg-orange-500 group-hover:text-slate-950 flex items-center justify-center shadow-md transition-all">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full border ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-xl text-slate-900 group-hover:text-orange-600 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                    O que está incluído:
                  </span>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {pillar.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Deep Dive: Artes para Redes Sociais + Copywriting Vinculado a Landing Pages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-pink-500/20 border border-pink-500/40 text-pink-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Palette className="w-3.5 h-3.5" />
                Sinergia Total: Redes Sociais + Landing Pages
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Artes para Instagram/Facebook & Copywriting Vinculados à sua Landing Page
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Um dos maiores erros nas campanhas digitais é o visitante ver um anúncio atraente no Instagram, mas ao clicar cair em uma página sem nenhuma relação visual ou textual com a oferta.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Na **AGÊNCIA OZ**, a criação de criativos (feed e stories) e a elaboração da copy de vendas são **100% integradas à criação da Landing Page**. Quando o usuário clica no anúncio, ele encontra exatamente a mesma identidade, os mesmos argumentos e uma continuidade perfeita que multiplica as chances de contato no WhatsApp.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
                    <Instagram className="w-4 h-4" />
                    <span>Criativos que Param o Feed</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Artes com contrastes calculados, tipografia de impacto e foco total na chamada para ação (CTA).
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
                    <Target className="w-4 h-4" />
                    <span>Copy de Quebra de Objeções</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Textos persuasivos que antecipam dúvidas de preço, confiança e garantia antes mesmo do cliente perguntar.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/servicos/landingpages"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 hover:underline"
                >
                  <span>Conhecer nossos modelos de Landing Pages</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Visual Representation */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Funil Visual Contínuo OZ
                </h4>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-3 p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="w-7 h-7 rounded-lg bg-pink-600/30 text-pink-400 flex items-center justify-center font-black">1</span>
                    <div>
                      <p className="font-bold text-white">Anúncio no Instagram / Face</p>
                      <p className="text-[11px] text-slate-400">Artes e copy focadas no gancho da dor</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <span className="text-slate-500 font-bold text-xs">↓</span>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center font-black">2</span>
                    <div>
                      <p className="font-bold text-white">Landing Page de Carregamento &lt; 1s</p>
                      <p className="text-[11px] text-slate-400">Mesma identidade visual e quebra de objeções</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <span className="text-slate-500 font-bold text-xs">↓</span>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 bg-slate-900 rounded-xl border border-emerald-500/40 bg-emerald-950/20">
                    <span className="w-7 h-7 rounded-lg bg-emerald-600 text-slate-950 flex items-center justify-center font-black">3</span>
                    <div>
                      <p className="font-bold text-emerald-400">OZZY ou WhatsApp Direto</p>
                      <p className="text-[11px] text-slate-400">Conversão do lead em proposta e venda</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. OZZY Special Feature Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 border border-orange-200 px-3 py-1 rounded-full text-xs font-bold">
              <Bot className="w-3.5 h-3.5 text-orange-600" />
              Tecnologia Exclusiva AGÊNCIA OZ
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              OZZY: Seu Vendedor e Consultor Digital Sempre Ativo
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              O OZZY pode ser implementado no site oficial da sua empresa, integrando o seu banco de conhecimento com respostas ultra-rápidas, síntese de voz e coleta de contatos qualificados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ozzyHighlights.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-3 hover:border-orange-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-black text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-display font-bold text-base text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Final CTA Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        <div className="space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pronto para Acelerar a Divulgação da sua Empresa?
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
            Fale conosco hoje mesmo para desenharmos uma estratégia completa de Mídia, Criativos para Instagram/Facebook, Landing Pages e Assistente Virtual com IA.
          </p>
        </div>

        <div className="bg-slate-950 text-white border border-slate-800 rounded-3xl p-8 max-w-2xl mx-auto space-y-6 shadow-xl">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold">
            <Award className="h-3.5 w-3.5" />
            Atendimento Consultivo Especializado
          </div>

          <div className="space-y-1">
            <h3 className="font-display font-black text-2xl text-white">Pacote de Mídia & Divulgação Digital</h3>
            <p className="text-xs text-slate-400">Criativos + Copywriting + Landing Page + Implementação de IA.</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black px-8 py-4 rounded-xl text-sm transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-95"
            >
              <MessageSquare className="h-4 w-4" />
              Falar no WhatsApp
            </a>

            <Link
              to="/orcamento"
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-xl text-sm transition-all inline-flex items-center justify-center gap-1.5 border border-slate-700"
            >
              Simulador de Preço <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
