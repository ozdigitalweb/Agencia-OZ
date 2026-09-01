import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Search, 
  Sparkles, 
  Cpu, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  BarChart3, 
  HelpCircle, 
  RefreshCw,
  TrendingUp,
  Award,
  Zap,
  Check,
  MapPin
} from 'lucide-react';

export default function LpFuturoBusca() {
  const [activeTab, setActiveTab] = useState<'seo' | 'geo'>('geo');
  
  // Interactive Readiness Quiz State
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const quizQuestions = [
    {
      id: 1,
      question: "Sua marca possui citações diretas em fóruns, portais de notícia ou blogs de autoridade do seu nicho?",
      description: "As IAs usam referências externas para validar quem é autoridade."
    },
    {
      id: 2,
      question: "Seus conteúdos respondem de forma objetiva a perguntas complexas de usuários (padrão de busca conversacional)?",
      description: "A busca por voz e chats de IA priorizam respostas diretas e ricas."
    },
    {
      id: 3,
      question: "O seu site carrega em menos de 1.5 segundos e possui nota verde no Google PageSpeed?",
      description: "Robôs de IA preferem ler dados estruturados em servidores ultra velozes."
    },
    {
      id: 4,
      question: "Seus produtos ou serviços contam com avaliações reais e estruturadas em plataformas como Google e Trustpilot?",
      description: "mecanismos generativos cruzam opiniões públicas para fazer recomendações."
    },
    {
      id: 5,
      question: "Seu site possui marcação de dados Schema.org completa e atualizada?",
      description: "Facilita a leitura semântica do conteúdo pelos algoritmos LLM."
    }
  ];

  const handleAnswer = (qId: number, value: boolean) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const calculateScore = () => {
    const yesCount = Object.values(answers).filter(Boolean).length;
    setScore(yesCount);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  };

  // Lead Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    site: '',
    whatsapp: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API Submission
    setFormSubmitted(true);
  };

  return (
    <div id="lp-futuro-busca-page" className="bg-slate-50 text-slate-800 font-sans selection:bg-orange-500 selection:text-white overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-slate-50/50 overflow-hidden">
        {/* Animated Background related to SEO and GEO Posicionamento */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />

          {/* Upward Trending SEO Graph (glowing SVG curve) */}
          <svg className="absolute bottom-0 left-0 w-full h-48 opacity-25" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lp-seo-gradient" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 180 Q 250 160 500 100 T 1000 20"
              fill="none"
              stroke="url(#lp-seo-gradient)"
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
              children: <div className="w-2.5 h-2.5 bg-indigo-500/50 rounded-full" />
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
              className={`absolute ${shape.className}`}
              style={{ left: shape.x, top: shape.y }}
              animate={{
                y: [0, -12, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8
              }}
            >
              {shape.children}
            </motion.div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-sm font-semibold tracking-wide uppercase shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-orange-400" />
            O Futuro do SEO Organico
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            SEO vs GEO: Sua marca está pronta para a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-800 to-orange-600">Era das buscas por IA?</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            As buscas tradicionais do Google estão se transformando. Com a chegada do <strong>Search Generative Experience (SGE)</strong> e assistentes como Gemini e ChatGPT Search, o tráfego orgânico mudou de regras. Sua empresa será citada pelas IAs ou esquecida?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="#quiz" 
              className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base rounded-2xl transition-all shadow-lg hover:shadow-orange-500/20 text-center"
            >
              Fazer Teste de Prontidão IA Grátis
            </a>
            <a 
              href="#diagnostico" 
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm sm:text-base rounded-2xl transition-all shadow-lg text-center"
            >
              Falar com Especialista
            </a>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 border-t border-slate-100 max-w-3xl mx-auto">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tecnologia OZ</span>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              GEO (Generative Engine Optimization)
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              SEO Semântico Avançado
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              SGE Readiness
            </div>
          </div>
        </div>
      </section>

      {/* SEO VS GEO DUAL COMPARISON TAB */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-8">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-700">Mudança de Paradigma</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Entenda a Revolução: SEO vs GEO
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
            A forma tradicional de otimização de sites está ganhando um novo ecossistema completo.
          </p>
        </div>

        {/* Tab Buttons & Highlighted Instruction */}
        <div className="flex flex-col items-center justify-center mb-12 space-y-6">
          <motion.div 
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-amber-500/10 border-2 border-orange-500/30 text-slate-900 rounded-2xl text-sm sm:text-base font-black shadow-md relative group select-none"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-600"></span>
            </span>
            <span className="tracking-wide text-center">
              CLIQUE NOS CARTÕES ABAIXO PARA VER O QUE MUDA NA PRÁTICA:
            </span>
          </motion.div>

          <div className="bg-slate-100/90 border-2 border-slate-200/80 p-2 rounded-3xl shadow-lg flex flex-wrap sm:flex-nowrap justify-center gap-2.5 max-w-lg w-full">
            <button
              onClick={() => setActiveTab('seo')}
              className={`flex-1 min-w-[150px] px-6 py-4 rounded-2xl text-sm sm:text-base font-black tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 ${
                activeTab === 'seo'
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/35 border-b-4 border-blue-800 scale-[1.03]'
                  : 'bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-slate-200/80 active:translate-y-0.5'
              }`}
            >
              <Search className={`h-4 w-4 shrink-0 transition-transform ${activeTab === 'seo' ? 'text-white scale-110' : 'text-blue-500'}`} />
              <span>Tradicional (SEO)</span>
            </button>
            <button
              onClick={() => setActiveTab('geo')}
              className={`flex-1 min-w-[150px] px-6 py-4 rounded-2xl text-sm sm:text-base font-black tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 ${
                activeTab === 'geo'
                  ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/35 border-b-4 border-orange-800 scale-[1.03]'
                  : 'bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-slate-200/80 active:translate-y-0.5'
              }`}
            >
              <Brain className={`h-4 w-4 shrink-0 transition-transform ${activeTab === 'geo' ? 'text-white scale-110' : 'text-orange-500'}`} />
              <span>O Futuro (GEO)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Comparison Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card left: Visual Mockup */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Simulação de Tela</span>
              
              {activeTab === 'seo' ? (
                <div className="border border-slate-100 rounded-2xl bg-slate-50 p-4 space-y-4 font-sans text-sm">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                    <Search className="h-4 w-4 text-blue-500" />
                    <span className="font-bold text-slate-600">Busca Google: "Melhor hospedagem de Canoas"</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-white border border-slate-100 rounded-xl space-y-1 shadow-sm">
                      <span className="text-xs text-emerald-600 font-semibold">Anúncio • www.anuncio.com.br</span>
                      <h4 className="font-bold text-blue-800">Serviço de Hospedagem Rápida</h4>
                      <p className="text-[13px] text-slate-500">Contrate agora com 50% de desconto e suporte técnico grátis.</p>
                    </div>
                    <div className="p-3 bg-white border border-slate-100 rounded-xl space-y-1 shadow-sm">
                      <span className="text-xs text-slate-400">www.siteorganico1.com.br</span>
                      <h4 className="font-bold text-blue-800">Top 5 Hospedagens de Sites em Canoas (2026)</h4>
                      <p className="text-[13px] text-slate-500">Confira a lista atualizada das empresas com melhor suporte técnico...</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-indigo-100 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-orange-50/20 p-4 space-y-4 font-sans text-sm">
                  <div className="flex items-center gap-2 pb-2 border-b border-indigo-100">
                    <Brain className="h-4 w-4 text-indigo-600" />
                    <span className="font-bold text-indigo-900">Resposta da IA (Gemini / ChatGPT)</span>
                  </div>
                  <div className="space-y-2 text-[13px] text-slate-600 leading-relaxed">
                    <p>
                      Com base nas avaliações de desenvolvedores e portais técnicos, a <strong className="text-slate-900">AGÊNCIA OZ</strong> se destaca em Canoas por utilizar servidores Cloud VPS dedicados com velocidade superior.
                    </p>
                    <div className="p-2.5 bg-white border border-indigo-100 rounded-lg flex items-center justify-between gap-2 shadow-sm">
                      <div>
                        <p className="font-bold text-slate-800 text-[12px]">Citação direta identificada:</p>
                        <p className="text-[11px] text-slate-400">"Hospedagem Cloud cPanel Premium VPS..."</p>
                      </div>
                      <span className="text-[12px] bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-bold shrink-0">Recomendado</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                {activeTab === 'seo' ? "O foco tradicional por cliques" : "O foco futuro por indicação"}
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                {activeTab === 'seo' 
                  ? "O objetivo sempre foi aparecer entre os 10 primeiros links azuis do Google para capturar tráfego passivo."
                  : "O objetivo agora é treinar as inteligências artificiais para que sua marca seja a única resposta sugerida ao usuário."
                }
              </p>
            </div>
          </div>

          {/* Cards right: Explanation list */}
          <div className="lg:col-span-7 space-y-4 flex flex-col justify-center">
            {activeTab === 'seo' ? (
              <>
                <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">1</div>
                    <h3 className="font-display font-extrabold text-slate-900 text-base">Palavras-Chave e Títulos</h3>
                  </div>
                  <p className="text-sm text-slate-500 pl-11">
                    Organizamos os textos do seu site com os termos mais pesquisados pelos seus clientes para o Google entender facilmente do que se trata sua empresa.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">2</div>
                    <h3 className="font-display font-extrabold text-slate-900 text-base">Recomendações e Links Externos</h3>
                  </div>
                  <p className="text-sm text-slate-500 pl-11">
                    Conectar seu site com portais e parceiros para mostrar ao Google que sua marca é confiável e respeitada no mercado.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">3</div>
                    <h3 className="font-display font-extrabold text-slate-900 text-base">Páginas Claras e Objetivas</h3>
                  </div>
                  <p className="text-sm text-slate-500 pl-11">
                    Estrutura simples e rápida onde o cliente encontra facilmente seus produtos, serviços e formas de contato.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white border border-orange-100 p-6 rounded-2xl space-y-2 shadow-sm relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-12 h-12 bg-orange-500/5 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold">1</div>
                    <h3 className="font-display font-extrabold text-slate-900 text-base flex items-center gap-2">
                      Otimização para IA (GEO) <Zap className="h-4 w-4 text-orange-500" />
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 pl-11">
                    Formatamos o seu conteúdo para que assistentes virtuais como ChatGPT e Gemini entendam sua empresa e a recomendem nas conversas.
                  </p>
                </div>
                <div className="bg-white border border-orange-100 p-6 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold">2</div>
                    <h3 className="font-display font-extrabold text-slate-900 text-base">Reputação e Presença Digital</h3>
                  </div>
                  <p className="text-sm text-slate-500 pl-11">
                    Sua empresa bem posicionada nas fontes certas. As IAs analisam a internet inteira para indicar apenas quem é referência no setor.
                  </p>
                </div>
                <div className="bg-white border border-orange-100 p-6 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold">3</div>
                    <h3 className="font-display font-extrabold text-slate-900 text-base">Perguntas e Respostas Diretas</h3>
                  </div>
                  <p className="text-sm text-slate-500 pl-11">
                    Textos focados nas dúvidas reais dos seus clientes, facilitando para a IA destacar a sua marca como a solução ideal.
                  </p>
                </div>
              </>
            )}
          </div>

        </div>
      </section>

      {/* THREE STEPS ROADMAP TO TRANSITION */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-3">
            <span className="text-sm font-bold uppercase tracking-widest text-orange-400">Passo a Passo</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              Como preparamos seu negócio para o Futuro?
            </h2>
            <p className="text-base text-slate-400 max-w-2xl mx-auto">
              Nossa equipe desenvolveu um framework exclusivo combinando a solidez técnica de servidores de alta velocidade com estratégias semânticas direcionadas a algoritmos de LLM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white tracking-tight">1. Velocidade Extrema Cloud</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Hospedamos seu site WordPress em servidores Cloud dedicados com otimização LiteSpeed. Robôs de IA descartam sites lentos ou com quedas de conexão frequentes.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white tracking-tight">2. Engenharia de Menções</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Mapeamos os principais hubs digitais e portais do seu nicho para estruturar menções externas reais da sua marca, educando as redes neuronais do Gemini e OpenAI.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white tracking-tight">3. SEO Semântico & FAQ SGE</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Produzimos respostas milimetricamente formatadas para as buscas de linguagem natural, garantindo que seu conteúdo seja perfeitamente consumido e sugerido por IAs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE READINESS QUIZ */}
      <section id="quiz" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 border-4 border-orange-500/40 rounded-[2.5rem] shadow-2xl shadow-orange-500/15 overflow-hidden p-8 sm:p-14 space-y-10 text-white">
          {/* Glowing abstract background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="text-center space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-black bg-orange-500 text-white border-2 border-orange-400 shadow-lg shadow-orange-500/30 uppercase tracking-widest animate-pulse">
              <Sparkles className="h-4 w-4 text-white" /> Diagnóstico Interativo de Visibilidade IA
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Seu site está preparado para o tráfego da IA?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-medium">
              Responda a 5 perguntas rápidas de auto-avaliação e descubra se sua empresa corre risco de ficar oculta na rede de inteligência artificial.
            </p>
          </div>

          {/* PROGRESS BAR */}
          <div className="relative z-10 max-w-xl mx-auto space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-300">
              <span>Progresso do Diagnóstico</span>
              <span className="text-orange-400">{Object.keys(answers).length} de {quizQuestions.length} Respondidas</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50 p-0.5">
              <motion.div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(Object.keys(answers).length / quizQuestions.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 80 }}
              />
            </div>
          </div>

          {!quizSubmitted ? (
            <div className="space-y-6 relative z-10 max-w-3xl mx-auto">
              {quizQuestions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                return (
                  <motion.div 
                    key={q.id} 
                    whileHover={{ scale: 1.01 }}
                    className={`p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 space-y-4 ${
                      isAnswered 
                        ? 'bg-slate-800/40 border-slate-700/80' 
                        : 'bg-slate-800/20 border-slate-800 hover:border-slate-700/60'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase ${
                          isAnswered ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          Pergunta {idx + 1} de {quizQuestions.length}
                        </span>
                        {isAnswered && (
                          <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Respondida
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-white text-base sm:text-lg lg:text-xl leading-snug">{q.question}</h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">{q.description}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => handleAnswer(q.id, true)}
                        className={`px-6 py-3.5 rounded-xl text-sm font-black tracking-wide border-2 transition-all flex items-center gap-2.5 ${
                          answers[q.id] === true
                            ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 scale-[1.03]'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <CheckCircle2 className={`h-4.5 w-4.5 ${answers[q.id] === true ? 'text-white' : 'text-slate-400'}`} />
                        Sim, temos / Fazemos
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAnswer(q.id, false)}
                        className={`px-6 py-3.5 rounded-xl text-sm font-black tracking-wide border-2 transition-all flex items-center gap-2.5 ${
                          answers[q.id] === false
                            ? 'bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20 scale-[1.03]'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <HelpCircle className={`h-4.5 w-4.5 ${answers[q.id] === false ? 'text-white' : 'text-slate-400'}`} />
                        Não / Não tenho certeza
                      </button>
                    </div>
                  </motion.div>
                );
              })}

              <motion.button
                type="button"
                onClick={calculateScore}
                disabled={Object.keys(answers).length < quizQuestions.length}
                whileHover={Object.keys(answers).length === quizQuestions.length ? { scale: 1.02 } : {}}
                whileTap={Object.keys(answers).length === quizQuestions.length ? { scale: 0.98 } : {}}
                className="w-full py-5 rounded-2xl font-black text-base sm:text-lg text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all shadow-xl shadow-orange-500/25 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-8"
              >
                <Sparkles className="h-5 w-5 text-white" />
                <span>Gerar Meu Diagnóstico de Visibilidade IA Gratuitamente</span>
              </motion.button>
            </div>
          ) : (
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 text-white space-y-8 text-center relative overflow-hidden max-w-3xl mx-auto z-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full pointer-events-none" />
              
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  <Award className="h-4 w-4" /> Diagnóstico Concluído com Sucesso!
                </span>
                
                <div className="space-y-1">
                  <div className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400">
                    {score}/{quizQuestions.length}
                  </div>
                  <span className="text-sm text-slate-400 font-bold uppercase tracking-wider block">
                    Pontuação de Preparação IA da sua Empresa
                  </span>
                </div>
                
                <div className="max-w-xl mx-auto pt-4">
                  {score <= 2 ? (
                    <div className="p-5 bg-red-500/10 border border-red-500/30 rounded-2xl space-y-2 text-left">
                      <div className="flex items-center gap-2 text-red-400 font-black text-sm uppercase tracking-wide">
                        <ShieldAlert className="h-5 w-5 shrink-0" /> Alto Risco de Invisibilidade Generativa
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        Sua marca está quase totalmente despreparada para a Era da IA. Seus concorrentes que já otimizam com GEO (Generative Engine Optimization) podem absorver todas as indicações dos assistentes virtuais (como Gemini e ChatGPT) nos próximos meses, deixando sua empresa invisível nas buscas conversacionais.
                      </p>
                    </div>
                  ) : score <= 4 ? (
                    <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-2 text-left">
                      <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase tracking-wide">
                        <TrendingUp className="h-5 w-5 shrink-0" /> Alerta de Otimização & Oportunidade
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        Você já possui alguns pilares básicos, mas ainda faltam pontos cruciais de engenharia de menções, dados estruturados JSON-LD e FAQ semântico estruturado para garantir solidez no ranking generativo. Há um grande espaço para dominar seu nicho antes dos concorrentes!
                      </p>
                    </div>
                  ) : (
                    <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-2 text-left">
                      <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wide">
                        <Award className="h-5 w-5 shrink-0" /> Excelente Preparação Estrutural
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        Excelente! Seu site possui bases tecnicamente robustas. Agende nosso diagnóstico ao vivo gratuito para darmos o polimento final e garantirmos estratégias de citação direta no Gemini e ChatGPT que blindam o seu tráfego.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
                <a
                  href="#diagnostico"
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-black rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Resgatar Plano de Ação Grátis</span>
                </a>
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-black rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-700"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Refazer Diagnóstico</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* LEAD CONVERSION & BOOKING FORM */}
      <section id="diagnostico" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-sm font-bold uppercase tracking-widest text-orange-600">Ação imediata</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Solicite um Diagnóstico SEO / GEO Gratuito para a sua Empresa
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Faremos uma análise técnica do seu site atual, avaliando a velocidade de carregamento em servidores de alto desempenho, dados estruturados semânticos e identificação de menções no ecossistema das IAs.
            </p>
            
            <div className="space-y-3 pt-2">
              {[
                "Relatório completo de velocidade Core Web Vitals.",
                "Auditoria básica de citações diretas em buscadores generativos.",
                "Roteiro prático com melhorias imediatas para seu site.",
                "Atendimento individual feito por especialistas em SEO de Canoas."
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-sm sm:text-base text-slate-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 p-6 sm:p-10 rounded-3xl shadow-lg">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h3 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl pb-2 border-b border-slate-200">
                  Preencha para receber
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-400">Seu Nome</label>
                    <input
                      type="text"
                      required
                      value={formData.nome}
                      onChange={e => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                      placeholder="Ex: João Silva"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-400">Seu E-mail Corporativo</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Ex: joao@suaempresa.com"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-400">Endereço do Site Atual</label>
                    <input
                      type="url"
                      required
                      value={formData.site}
                      onChange={e => setFormData(prev => ({ ...prev, site: e.target.value }))}
                      placeholder="Ex: https://suaempresa.com.br"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-400">WhatsApp para Contato</label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={e => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                      placeholder="Ex: (48) 99999-9999"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base rounded-2xl transition-all shadow-md shadow-orange-500/10 flex items-center justify-center gap-2 pt-1"
                >
                  Solicitar Diagnóstico Grátis <ArrowRight className="h-4 w-4" />
                </button>
                
                <p className="text-[12px] text-slate-400 text-center leading-relaxed">
                  Respeitamos integralmente a LGPD. Seus dados serão utilizados apenas por nossa equipe técnica para confecção do relatório de diagnóstico orgânico.
                </p>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <Check className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-slate-900 text-xl tracking-tight">Obrigado! Recebemos sua solicitação</h3>
                  <p className="text-sm sm:text-base text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Nossa equipe técnica já está analisando o site <strong>{formData.site}</strong>. Entraremos em contato pelo WhatsApp <strong>{formData.whatsapp}</strong> em até 24 horas úteis para apresentar o diagnóstico.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    Fazer outra solicitação
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
