import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Cpu, ShieldAlert, Sparkles, CheckCircle2, MessageSquare, ArrowRight, Layers, FileCode, Code, Zap, Globe } from 'lucide-react';

export default function ServicosWordPress() {
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento+para+desenvolvimento+WordPress.";

  const workflowSteps = [
    {
      num: "01",
      title: "Planejamento e SEO-first",
      desc: "Analisamos seus concorrentes, as palavras-chave do seu setor e estruturamos o mapa do site visando a conversão antes de desenhar qualquer linha de layout."
    },
    {
      num: "02",
      title: "Design de Interface UI/UX",
      desc: "Criamos telas exclusivas no Figma alinhadas com a sua marca. Nada de templates pré-fabricados que parecem iguais a centenas de outros sites."
    },
    {
      num: "03",
      title: "Desenvolvimento Limpo",
      desc: "Programamos o tema WordPress do absoluto zero, respeitando as boas práticas e sem acúmulo de plugins lentos, resultando em carregamento abaixo de 1.5s."
    },
    {
      num: "04",
      title: "Blindagem de Segurança",
      desc: "Configuramos caminhos de login ocultos, firewalls ativos de aplicação (WAF) e SSL de criptografia militar para proteger sua base contra invasões."
    }
  ];

  return (
    <div id="wordpress-service-page" className="space-y-20 pb-16 animate-fade-in">
      
      {/* 1. Header Banner with Animated WordPress & Code Background */}
      <section className="relative overflow-hidden bg-slate-50/50 border-b border-slate-200 py-16 lg:py-24">
        
        {/* Animated Background related to WordPress, Clean Code & Performance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />

          {/* Speed & Code Sine Wave SVG */}
          <svg className="absolute bottom-0 left-0 w-full h-48 opacity-25" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wp-code-gradient" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 160 Q 250 120 500 150 T 1000 30"
              fill="none"
              stroke="url(#wp-code-gradient)"
              strokeWidth="4"
              initial={{ strokeDasharray: "1000", strokeDashoffset: "1000" }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 3.5, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
            />
          </svg>

          {/* Clean Code Node Left */}
          <div className="absolute left-[8%] top-[22%] opacity-40 hidden md:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/40 animate-ping" />
              <div className="absolute w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 animate-pulse" />
              <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg relative z-10">
                <FileCode className="h-5 w-5" />
              </div>
            </motion.div>
          </div>

          {/* PageSpeed Performance Node Right */}
          <div className="absolute right-[10%] top-[20%] opacity-40 hidden md:block">
            <motion.div
              animate={{ scale: [0.95, 1.1, 0.95], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center w-14 h-14"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 blur-md opacity-80 animate-pulse" />
              <div className="bg-slate-900 border border-slate-700 text-white w-full h-full rounded-full relative z-10 flex items-center justify-center shadow-lg">
                <Cpu className="h-6 w-6 text-sky-400" />
              </div>
              <div className="absolute -inset-3 border border-sky-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            </motion.div>
          </div>

          {/* Floating Code Badges & Tags */}
          {[
            { 
              x: "12%", 
              y: "65%", 
              className: "w-10 h-10 bg-blue-500/10 border-2 border-blue-500/30 rounded-full flex items-center justify-center",
              children: <div className="w-3 h-3 bg-blue-500/40 rounded-full animate-ping" />
            },
            { 
              x: "82%", 
              y: "68%", 
              className: "w-10 h-10 bg-cyan-500/10 border-2 border-cyan-500/30 rotate-45 flex items-center justify-center",
              children: <div className="w-3 h-3 bg-cyan-500/40" />
            },
            { 
              x: "6%", 
              y: "48%", 
              className: "w-8 h-8 bg-indigo-500/10 border border-indigo-500/30 rounded-lg flex items-center justify-center rotate-12",
              children: <div className="w-2 h-2 bg-indigo-500/50 rounded-full" />
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 inline-flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Desenvolvimento WordPress
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Sites WordPress Sob Medida: Rápidos, Seguros e Conversivos
          </h1>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
            Desenvolvemos temas limpos e exclusivos focados em performance extrema e facilidade de gerenciamento. Destaque-se da concorrência e venda mais online.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/orcamento?servico=wordpress"
              className="bg-blue-700 hover:bg-blue-800 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md inline-flex items-center gap-2 hover:-translate-y-0.5"
            >
              <MessageSquare className="h-4 w-4" /> Solicitar Orçamento de Site
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Problem vs Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
              A Diferença do Nosso Código
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Por que fugimos de temas pesados do Elementor e Envato?
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Muitas agências cobram caro para instalar um template pronto que vem recheado de centenas de arquivos CSS e scripts JavaScript redundantes. Esse excesso de peso faz o site demorar mais de 6 segundos para abrir nos smartphones 3G/4G, reduzindo consideravelmente a sua conversão.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Na **AGÊNCIA OZ**, desenvolvemos temas limpos e exclusivos em WordPress. Isso resulta em carregamentos instantâneos, facilidade total para aplicar SEO on-page, segurança blindada contra invasões de robôs maliciosos e um painel de controle simples onde você atualiza textos e imagens em segundos.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl space-y-6">
            <h3 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="h-6 w-6 text-orange-500" /> Nossos Diferenciais:
            </h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                <span>Código sem poluição: velocidade incrível atestada no Google PageSpeed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                <span>Projetos 100% Mobile-first que se adaptam a qualquer celular</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                <span>Preparado para SEO (WordPress estruturado com marcações corretas)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                <span>Edição intuitiva: altere qualquer bloco de texto sem medo de quebrar o layout</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 3. Development Workflow (Figma to Live) */}
      <section className="bg-slate-900 text-white py-16 rounded-2xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Processo Transparente</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Como Desenvolvemos Seu Site WordPress
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Passo a passo estruturado para entregar seu site no prazo, sem surpresas técnicas negativas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl space-y-4 relative">
                <span className="absolute top-4 right-4 text-xs font-bold text-slate-700 bg-slate-800 px-2 py-1 rounded">
                  PASSO {step.num}
                </span>
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  {step.num}
                </div>
                <h3 className="font-display font-bold text-base text-white leading-snug tracking-tight">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. WordPress Security and Performance Shield */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Segurança Blindada</span>
            <h2 className="font-display text-2xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Seu WordPress livre de invasões e malwares de uma vez por todas
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              O WordPress é o CMS mais visado por hackers simplesmente por ser o mais usado no planeta. A maioria das brechas acontece devido à falta de atualizações e políticas de senha fracas.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Nossos projetos já nascem com blindagem nativa ativa. Removemos informações de cabeçalho públicas sobre o núcleo WP, protegemos caminhos de administração confidenciais e implementamos um firewall dinâmico ativo no nível de hospedagem Cloud.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tempo de Carga</span>
              <p className="font-display text-2xl font-extrabold text-emerald-600">Sub 1.5s</p>
              <p className="text-xs text-slate-500 leading-relaxed">Garantia técnica de renderização rápida em redes de dados móveis.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Google PageSpeed</span>
              <p className="font-display text-2xl font-extrabold text-blue-700">Nota 90-100</p>
              <p className="text-xs text-slate-500 leading-relaxed">Otimização estrutural alinhada às métricas Core Web Vitals do Google.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Footer Section */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Quer renovar a imagem e os resultados da sua empresa na internet?
        </h2>
        <p className="text-sm text-slate-500">
          Solicite um orçamento de desenvolvimento de site em Canoas e conte com suporte técnico próximo e altamente qualificado.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/orcamento?servico=wordpress"
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors shadow-lg shadow-blue-100"
          >
            Fazer Orçamento do Site
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
