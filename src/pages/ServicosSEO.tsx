import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Trophy, Compass, MapPin, CheckCircle, MessageSquare, ArrowRight, TrendingUp, Brain, Cpu } from 'lucide-react';

export default function ServicosSEO() {
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+um+or%C3%A7amento+sobre+os+servi%C3%A7os+de+SEO+e+Google.";

  const stepsList = [
    {
      num: "01",
      title: "Auditoria Técnica de SEO",
      desc: "Analisamos o código do seu site, velocidade, erros de rastreamento (404), indexação e como o Google enxerga seu negócio hoje para corrigir todos os erros estruturais primários."
    },
    {
      num: "02",
      title: "Pesquisa de Intenção de Busca",
      desc: "Descobrimos exatamente quais termos seu potencial cliente digita no Google quando está pronto para comprar. Focamos em palavras de alta conversão, não apenas em tráfego inútil."
    },
    {
      num: "03",
      title: "SEO On-Page e Conteúdo",
      desc: "Ajustamos cabeçalhos (H1, H2), imagens, descrições meta e criamos artigos realistas de alta autoridade para provar ao Google que sua marca é especialista no setor."
    },
    {
      num: "04",
      title: "SEO Local & Google Maps",
      desc: "Otimizamos seu Google Perfil de Empresa (Google Meu Negócio) com foco em Canoas e Porto Alegre. Faça sua marca liderar o mapa de buscas de forma consistente."
    }
  ];

  return (
    <div id="seo-service-page" className="space-y-20 pb-16 animate-fade-in">
      
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden bg-slate-50/50 border-b border-slate-200 py-16 lg:py-24">
        
        {/* Animated Background related to SEO and GEO Posicionamento */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />

          {/* Upward Trending SEO Graph (glowing SVG curve) */}
          <svg className="absolute bottom-0 left-0 w-full h-48 opacity-25" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="seo-gradient" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 180 Q 250 160 500 100 T 1000 20"
              fill="none"
              stroke="url(#seo-gradient)"
              strokeWidth="4"
              initial={{ strokeDasharray: "1000", strokeDashoffset: "1000" }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 3, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
            />
          </svg>

          {/* GEO Location Pin with radar pulses */}
          <div className="absolute left-[8%] top-[25%] opacity-40 hidden md:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/40 animate-ping" />
              <div className="absolute w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 animate-pulse" />
              <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg relative z-10">
                <MapPin className="h-5 w-5" />
              </div>
            </motion.div>
          </div>

          {/* AI Neural / Connection Nodes */}
          <div className="absolute right-[10%] top-[20%] opacity-40 hidden md:block">
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center w-14 h-14"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 blur-md opacity-85 animate-pulse" />
              <div className="bg-slate-900 border border-slate-700 text-white w-full h-full rounded-full relative z-10 flex items-center justify-center shadow-lg">
                <Cpu className="h-6 w-6 text-orange-400" />
              </div>
              {/* Surrounding concentric active rings */}
              <div className="absolute -inset-3 border border-orange-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute -inset-6 border border-amber-500/10 rounded-full animate-pulse" />
            </motion.div>
          </div>

          {/* Floating Search/SEO Shapes */}
          {[
            { 
              x: "12%", 
              y: "65%", 
              className: "w-12 h-12 bg-blue-500/10 border-2 border-blue-500/30 rounded-full flex items-center justify-center",
              children: <div className="w-4 h-4 bg-blue-500/40 rounded-full animate-ping" />
            },
            { 
              x: "78%", 
              y: "70%", 
              className: "w-10 h-10 bg-orange-500/10 border-2 border-orange-500/30 rotate-45 flex items-center justify-center",
              children: <div className="w-3 h-3 bg-orange-500/40" />
            },
            { 
              x: "6%", 
              y: "42%", 
              className: "w-8 h-8 bg-indigo-500/10 border border-indigo-500/30 rounded-lg flex items-center justify-center rotate-12",
              children: <div className="w-2 h-2 bg-indigo-500/50 rounded-full" />
            },
            { 
              x: "88%", 
              y: "48%", 
              className: "w-14 h-14 bg-emerald-500/5 border border-emerald-500/20 rounded-full flex items-center justify-center",
              children: (
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className="absolute inset-0 border border-emerald-500/30 rounded-full animate-pulse" />
                  <div className="w-2.5 h-2.5 bg-emerald-500/60 rounded-full" />
                </div>
              )
            },
            { 
              x: "45%", 
              y: "12%", 
              className: "w-10 h-10 flex items-center justify-center",
              children: (
                <svg className="w-6 h-6 text-purple-500/40 animate-spin" style={{ animationDuration: '6s' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6L2 9.6h7.6z" />
                </svg>
              )
            },
          ].map((shape, i) => (
            <motion.div
              key={i}
              className={`absolute ${shape.className} shadow-sm pointer-events-none`}
              style={{ left: shape.x, top: shape.y }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            >
              {shape.children}
            </motion.div>
          ))}

          {/* Floating glow spheres */}
          <motion.div
            className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-blue-400/10 blur-[80px]"
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -30, 30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-orange-400/10 blur-[90px]"
            animate={{
              x: [0, -40, 40, 0],
              y: [0, 40, -40, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
            SEO / GEO Posicionamento
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Apareça no Topo do Google e Seja Recomendado pelas IAs
          </h1>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
            Desenvolvemos estratégias completas de SEO técnico tradicional e GEO (Generative Engine Optimization) voltadas para Canoas e região metropolitana. Garanta que seu negócio apareça tanto nas buscas do Google quanto nas recomendações de Inteligência Artificial.
          </p>
        </div>
      </section>

      {/* 2. Problem vs Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
              O Gargalo Financeiro dos Anúncios
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Sua empresa é refém do Google Ads e do Instagram Ads?
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Investir em anúncios pagos (tráfego pago) é excelente para resultados imediatos, mas traz uma grande armadilha: no momento em que você reduz ou zera a verba diária, o fluxo de clientes e contatos para o seu site para de forma abrupta.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              O **SEO (Search Engine Optimization)** cria um canal orgânico permanente de atração. Ao posicionar seu site institucional ou ficha do Google Maps no topo das buscas regionais, você atrai leads extremamente qualificados (pessoas que já estão buscando ativamente pelo seu serviço) de forma gratuita e sem depender de cliques patrocinados.
            </p>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-2xl space-y-6 shadow-xl">
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="h-6 w-6 text-orange-500" /> Benefícios do SEO:
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-white tracking-tight">Custo por clique igual a zero</h4>
                  <p className="text-xs text-slate-400">Atraia milhares de visitas orgânicas qualificadas sem pagar taxas por clique.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-white tracking-tight">Dominância no Mercado Local</h4>
                  <p className="text-xs text-slate-400">Destaque-se no Google Maps em Canoas e Porto Alegre de forma consolidada e permanente.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-white tracking-tight">Autoridade de Marca</h4>
                  <p className="text-xs text-slate-400">Empresas posicionadas nas primeiras posições orgânicas transmitem maior credibilidade.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* SEO vs GEO Comparison Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
          
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-15 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-slate-950/95"></div>
          </div>

          {/* Glow effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

          <div className="relative z-10 space-y-8">
            <div className="text-center lg:text-left space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30">
                <Brain className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
                <span>O FUTURO DA BUSCA ORGÂNICA</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                SEO vs GEO: Sua marca está pronta para a <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Era da Inteligência Artificial</span>?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                As pessoas não estão mais apenas digitando no Google. Elas estão perguntando diretamente para assistentes inteligentes como <strong>Google Gemini</strong>, <strong>ChatGPT</strong> e <strong>Perplexity</strong>. Otimizar apenas para robôs tradicionais não basta: sua empresa precisa de posicionamento GEO.
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
              
              {/* Tradicional SEO */}
              <div className="bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-2xl relative group">
                <div className="absolute top-4 right-4 text-xs font-mono font-bold tracking-widest text-slate-500 bg-slate-950 px-3 py-1 rounded-full border border-slate-800/50">
                  TRADICIONAL
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                    <Search className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">SEO</h3>
                    <p className="text-xxs uppercase tracking-wider text-slate-400 font-bold">Search Engine Optimization</p>
                  </div>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-400 font-bold shrink-0">→</span>
                    <div>
                      <strong className="text-white">Objetivo Principal:</strong> Ficar nas primeiras posições do Google quando as pessoas buscarem pelos seus serviços.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-400 font-bold shrink-0">→</span>
                    <div>
                      <strong className="text-white">Como Funciona:</strong> Uso dos termos mais buscados, site rápido, textos organizados e indicações de outros portais.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-400 font-bold shrink-0">→</span>
                    <div>
                      <strong className="text-white">Pesquisas do Cliente:</strong> Buscas curtas e diretas na barra de pesquisa (ex: "Empresa de Contabilidade em Canoas").
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-400 font-bold shrink-0">→</span>
                    <div>
                      <strong className="text-white">Resultado Prático:</strong> O cliente clica no seu link no Google e acessa o site para solicitar um orçamento.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Inovador GEO */}
              <div className="bg-gradient-to-br from-purple-950/30 to-slate-900/60 border border-purple-500/20 p-6 sm:p-8 rounded-2xl relative group shadow-lg shadow-purple-950/20">
                <div className="absolute top-4 right-4 text-xs font-mono font-bold tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
                  NOVA ERA (IA)
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">GEO</h3>
                    <p className="text-xxs uppercase tracking-wider text-purple-400 font-bold">Generative Engine Optimization</p>
                  </div>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-purple-400 font-bold shrink-0">→</span>
                    <div>
                      <strong className="text-white">Objetivo Principal:</strong> Ser a empresa recomendada e citada por assistentes de IA (ChatGPT, Gemini, etc.).
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-purple-400 font-bold shrink-0">→</span>
                    <div>
                      <strong className="text-white">Como Funciona:</strong> Respostas diretas a dúvidas reais, informações claras e boa reputação na internet.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-purple-400 font-bold shrink-0">→</span>
                    <div>
                      <strong className="text-white">Pesquisas do Cliente:</strong> Perguntas detalhadas feitas por voz ou texto (ex: "Qual a melhor contabilidade para abrir minha startup no RS?").
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-purple-400 font-bold shrink-0">→</span>
                    <div>
                      <strong className="text-white">Resultado Prático:</strong> A IA sugere sua empresa diretamente na conversa e entrega o link do seu site para o cliente.
                    </div>
                  </li>
                </ul>
              </div>

            </div>

            {/* Combined Strategy Banner */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="space-y-1 text-center md:text-left z-10">
                <h4 className="font-display font-bold text-white text-base">Estratégia Híbrida Inteligente</h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                  Na <strong>AGÊNCIA OZ</strong>, nós integramos SEO e GEO. Ao mesmo tempo que estruturamos o seu site institucional para voar baixo nas buscas orgânicas tradicionais do Google, otimizamos o conteúdo para que sua marca seja a recomendação número um nos painéis de resposta das IAs.
                </p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shrink-0 flex items-center gap-1.5 z-10"
              >
                Garantir Presença em IA
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SEO Methodology Grid */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Nossa Metodologia</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Passo a Passo para Conquistar a Primeira Página
            </h2>
            <p className="text-xs text-slate-500">
              Estrutura prática desenvolvida para maximizar resultados orgânicos seguros e duradouros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stepsList.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4 items-start">
                <span className="font-display font-black text-2xl text-orange-500 bg-slate-50 border border-slate-100 px-3 py-1 rounded-xl">
                  {step.num}
                </span>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-slate-900 text-base tracking-tight">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Local SEO Focus Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">SEO Local em Canoas</span>
            <h2 className="font-display text-2xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Sua empresa está visível para quem busca em Niterói, Centro ou Marechal Rondon?
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              O SEO Local é a ferramenta de conversão mais poderosa para negócios físicos e prestadores de serviço locais. Quando um morador de Canoas ou redondezas busca pelo seu ramo com termos geolocalizados, o Google dá prioridade máxima para a exibição de perfis otimizados no Maps.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Nós configuramos a consistência NAP (Name, Address, Phone) da sua empresa em diretórios locais do RS, geramos links de avaliações estratégicos e otimizamos as palavras-chave internas para garantir que sua empresa apareça para quem está fisicamente perto de contratar você.
            </p>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center space-y-4 max-w-sm w-full">
              <MapPin className="h-10 w-10 text-orange-500 mx-auto animate-pulse" />
              <h4 className="font-display font-bold text-slate-900 text-sm tracking-tight">Alavanque sua Pesquisa Local</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Apareça com destaque no Google Maps nas principais avenidas e bairros de Canoas e região metropolitana.
              </p>
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-xs font-bold text-emerald-600">+85% em ligações e cliques de rotas</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CTA Footer Section */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pronto para liderar as buscas do seu setor no Google?
        </h2>
        <p className="text-sm text-slate-500">
          Entre em contato conosco e receba uma análise de SEO básica gratuita do site atual da sua empresa.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/orcamento?servico=seo"
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors shadow-lg shadow-blue-100"
          >
            Fazer Análise de SEO Grátis
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Chamar via WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}
