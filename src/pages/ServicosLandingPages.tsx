import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Layers, Zap, Heart, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Target, Stethoscope, Scale, ShoppingBag, Palette, ExternalLink, Eye, TrendingUp, BarChart3, Instagram, Facebook, Megaphone, CheckCircle2 } from 'lucide-react';
import ConversionFunnelSection from '../components/ConversionFunnelSection';

export default function ServicosLandingPages() {
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento+para+cria%C3%A7%C3%A3o+de+uma+Landing+Page.";

  const landingMediaPillars = [
    {
      icon: Palette,
      badge: "CRIATIVOS & REDES SOCIAIS",
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
      badge: "COPYWRITING DE CONVERSÃO",
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
      badge: "DIVULGAÇÃO ESTRATÉGICA",
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

  const steps = [
    {
      num: "01",
      title: "Análise e Copywriting",
      desc: "Estudamos o seu público-alvo, as dores dos seus clientes e os seus principais concorrentes para estruturar um texto de vendas altamente persuasivo."
    },
    {
      num: "02",
      title: "Design de Alta Conversão",
      desc: "Desenhamos um layout exclusivo no Figma, com foco na usabilidade mobile, blocos lógicos de quebra de objeções e botões de chamada para ação chamativos."
    },
    {
      num: "03",
      title: "Desenvolvimento Ultra-Rápido",
      desc: "Programamos a sua página com código super otimizado e limpo, garantindo carregamento instantâneo em smartphones 3G/4G para evitar desperdício com anúncios."
    },
    {
      num: "04",
      title: "Integração e Rastreamento",
      desc: "Instalamos Pixel do Facebook/Instagram, Google Analytics, Tag Manager e ferramentas de mapa de calor para que você possa mensurar com precisão cada centavo investido."
    }
  ];

  const demoLandingPages = [
    {
      title: "Médicos & Clínicas",
      category: "Saúde & Medicina",
      desc: "Ideal para médicos, dentistas e clínicas. Foco no agendamento rápido de consultas pelo WhatsApp, autoridade profissional e apresentação de especialidades.",
      icon: Stethoscope,
      path: "/l/medicos",
    },
    {
      title: "Advogados & Escritórios",
      category: "Setor Jurídico",
      desc: "Design executivo e sóbrio para advogados. Foco na captação de clientes para áreas trabalhistas, de família, cível e empresarial com sigilo.",
      icon: Scale,
      path: "/l/advogados",
    },
    {
      title: "Lojas & Comércios",
      category: "Vendas & Varejo",
      desc: "Vitrine de produtos e ofertas de alta conversão. Perfeito para lojas de roupas, calçados, acessórios e catálogo rápido via WhatsApp.",
      icon: ShoppingBag,
      path: "/l/loja",
    },
    {
      title: "Artesanato & Ateliês",
      category: "Arte & Produtos Autorais",
      desc: "Visual acolhedor e afetuoso para valorizar peças feitas à mão, ateliês, cerâmicas, velas botânicas e encomendas personalizadas.",
      icon: Palette,
      path: "/l/artesanato",
    }
  ];

  return (
    <div id="landingpages-service-page" className="space-y-20 pb-16 animate-fade-in">
      
      {/* 1. Header Banner with Animated Landing Pages & Conversion Background */}
      <section className="relative overflow-hidden bg-slate-50/50 border-b border-slate-200 py-16 lg:py-24">
        
        {/* Animated Background related to Landing Pages & Traffic/Conversion */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />

          {/* High Conversion Growth Curve SVG */}
          <svg className="absolute bottom-0 left-0 w-full h-48 opacity-25" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lp-conversion-gradient" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 190 Q 300 170 550 80 T 1000 15"
              fill="none"
              stroke="url(#lp-conversion-gradient)"
              strokeWidth="4"
              initial={{ strokeDasharray: "1000", strokeDashoffset: "1000" }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 3.2, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
            />
          </svg>

          {/* Conversion Target Node with radar pulses */}
          <div className="absolute left-[7%] top-[20%] opacity-40 hidden md:block">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 animate-ping" />
              <div className="absolute w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 animate-pulse" />
              <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-lg relative z-10">
                <Target className="h-5 w-5" />
              </div>
            </motion.div>
          </div>

          {/* Speed & High Conversion Spark Node */}
          <div className="absolute right-[8%] top-[18%] opacity-40 hidden md:block">
            <motion.div
              animate={{ scale: [0.95, 1.1, 0.95], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center w-14 h-14"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-400 blur-md opacity-80 animate-pulse" />
              <div className="bg-slate-900 border border-slate-700 text-white w-full h-full rounded-full relative z-10 flex items-center justify-center shadow-lg">
                <Zap className="h-6 w-6 text-amber-400" />
              </div>
              <div className="absolute -inset-3 border border-amber-500/20 rounded-full animate-ping" style={{ animationDuration: '3.5s' }} />
            </motion.div>
          </div>

          {/* Floating Conversion Badges & Geometric Shapes */}
          {[
            { 
              x: "10%", 
              y: "68%", 
              className: "w-12 h-12 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-full flex items-center justify-center",
              children: <div className="w-4 h-4 bg-emerald-500/40 rounded-full animate-ping" />
            },
            { 
              x: "82%", 
              y: "65%", 
              className: "w-10 h-10 bg-amber-500/10 border-2 border-amber-500/30 rotate-45 flex items-center justify-center",
              children: <div className="w-3 h-3 bg-amber-500/40" />
            },
            { 
              x: "5%", 
              y: "45%", 
              className: "w-8 h-8 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center rotate-12",
              children: <div className="w-2 h-2 bg-blue-500/50 rounded-full" />
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
                delay: idx * 0.8,
              }}
            >
              {item.children}
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" /> Landing Pages Premium
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Landing Pages de Alta Conversão: Transforme Cliques em Clientes
              </h1>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                Criamos páginas de vendas rápidas, persuasivas e totalmente otimizadas para tráfego pago (Google Ads, Meta Ads e TikTok Ads). Pare de desperdiçar seu orçamento de marketing com páginas lentas.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/orcamento?servico=lp-outra"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  <MessageSquare className="h-4 w-4" /> Solicitar Orçamento
                </Link>
                <Link
                  to="/promocao"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-xl text-sm transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  Ver Promoção Ativa
                </Link>
              </div>
            </div>
            
            {/* Illustrative Landing Page mockup image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 aspect-video bg-slate-100 group">
              <img
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?fm=webp&fit=crop&w=800&q=75"
                alt="Mockup ilustrativo de Landing Page de alta performance"
                loading="eager"
                width={800}
                height={450}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-slate-800 shadow-md">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>Taxa de Conversão &gt; 18.4%</span>
              </div>
              <div className="absolute bottom-4 right-4 bg-blue-600 text-white text-xxs font-black tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-md">
                DESIGN RESPONSIVO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5. Exemplos Demonstrativos de Landing Pages por Nicho */}
      <section id="modelos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24 sm:scroll-mt-28">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-200/80 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-orange-500" /> Modelos Comerciais Demonstrativos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Exemplos Reais de Landing Pages Otimizadas por Nicho
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Clique nos cartões abaixo para navegar e testar a estrutura de conversão ao vivo de cada segmento comercial:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {demoLandingPages.map((demo, idx) => {
            const Icon = demo.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border-t-4 border-t-slate-200 group-hover:border-t-blue-700 hover:border-blue-300 group relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-700 flex items-center justify-center group-hover:scale-110 transition-all">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border bg-slate-100 text-slate-600 border-slate-200 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200 transition-colors">
                      {demo.category}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-700 transition-colors">
                      {demo.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {demo.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    to={demo.path}
                    className="w-full bg-slate-900 group-hover:bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Ver Exemplo Ao Vivo</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2.0. Os 3 Pilares de Mídia, Criativos & Divulgação Transferidos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200/80 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Criativos, Copywriting & Divulgação
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Estrutura Completa para Suas Campanhas Venderem Mais
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Desenvolvemos todo o ecossistema estratégico que alimenta sua Landing Page: artes de alto impacto para anúncios no Meta, copy magnética e planejamento multicanal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {landingMediaPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group hover:border-blue-300"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white group-hover:bg-blue-700 flex items-center justify-center shadow-md transition-all">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`text-[10px] sm:text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-xl text-slate-900 tracking-tight leading-snug group-hover:text-blue-700 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">
                    O QUE ESTÁ INCLUÍDO:
                  </span>
                  <ul className="space-y-2.5">
                    {pillar.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2.1. Banner Conexão Integrada de Mídia & Landing Page */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                Sinergia Total entre Anúncio e Landing Page
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Anúncios no Meta + Copy Persuasiva + Landing Page de Alta Velocidade
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Quando a arte do Instagram, o texto do anúncio e a página de destino possuem a mesma identidade visual e tom de voz, o seu Custo por Lead (CPL) cai drasticamente e a taxa de conversão no WhatsApp dispara.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/orcamento?servico=lp-outra"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black px-6 py-3.5 rounded-xl text-xs transition-all shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  Solicitar Pacote Completo (LP + Criativos)
                </Link>
                <Link
                  to="/servicos/midia"
                  className="inline-flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-bold px-5 py-3.5 rounded-xl text-xs transition-all border border-slate-700"
                >
                  <Megaphone className="w-4 h-4 text-orange-400" />
                  Ver Detalhes do Serviço de Mídia
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-3.5 text-xs">
              <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider block border-b border-slate-800 pb-2">
                ⚡ Vantagens do Ecossistema OZ:
              </span>
              <ul className="space-y-2.5 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Artes dimensionadas nos padrões oficiais (1:1, 4:5 e 9:16).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Copywriting focado em quebra de objeções e benefícios reais.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Carregamento instantâneo da LP em menos de 1 segundo no celular.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Funil de Conversão & Prompt Prontos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ConversionFunnelSection />
      </div>



      {/* 4. Pricing / Packages Overview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        <div className="space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pronto para Decolar Suas Campanhas?
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
            Oferecemos soluções sob medida para infoprodutores, comércios locais, prestadores de serviços, clínicas e muito mais. Fale agora mesmo com um especialista.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 max-w-2xl mx-auto space-y-6 shadow-sm">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="h-3 w-3" />
            Promoção Ativa
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-black text-2xl text-slate-900">Landing Page Exclusiva + Hospedagem</h3>
            <p className="text-xs text-slate-400">Entrega rápida em até 7 dias úteis com suporte completo pós-entrega.</p>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/orcamento?servico=lp-outra"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-4 rounded-xl text-sm transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="h-4 w-4" />
              Garantir Orçamento Grátis
            </Link>
            <Link
              to="/promocao"
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-xl text-sm transition-all inline-flex items-center justify-center gap-1.5"
            >
              Ver Promoção Ativa <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
