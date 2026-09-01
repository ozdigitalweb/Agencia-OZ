import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Globe, Server, ShieldCheck, Zap, Heart, MessageSquare, ArrowRight, Layout, Mail, Cpu, HardDrive, Database, Terminal, Lock, Code, CpuIcon, CheckCircle2, Sparkles } from 'lucide-react';
import PlanCard from '../components/PlanCard';
import { mockPlans } from '../data/mockData';

export default function ServicosHospedagem() {
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Quero+tirar+d%C3%BAvidas+sobre+os+planos+de+Hospedagem+Cloud.";

  const fullTechnicalDetails = [
    {
      category: "Infraestrutura & Hardware",
      icon: <Server className="h-5 w-5 text-blue-600" />,
      items: [
        { label: "Sistema Operacional", value: "AlmaLinux 9.6" },
        { label: "Processador", value: "Intel(R) Xeon(R) Silver 4114 CPU @ 2.20GHz" },
        { label: "Armazenamento", value: "Entre 60 GB NVMe e 200 GB NVMe (de acordo com o plano)" },
        { label: "Transferência Mensal", value: "Ilimitada" },
        { label: "Memória RAM", value: "DDR5 de Alta Velocidade" },
        { label: "Data Center", value: "Cloud no Brasil, monitoramento 24h com segurança de alto nível" }
      ]
    },
    {
      category: "Desenvolvimento & Linguagens",
      icon: <Code className="h-5 w-5 text-emerald-600" />,
      items: [
        { label: "Linguagens de Programação", value: "CGI, Fast CGI, PHP 8.0+, Ruby (on Rails), Perl, Python, entre outras" },
        { label: "Módulos de Programação", value: "Curl, CPAN, Biblioteca GD, ImageMagick" },
        { label: "Bancos de Dados", value: "Número Ilimitado de Bancos de Dados MySQL com acesso ao phpMyAdmin" },
        { label: "Gerenciamento de Sistema", value: "Acesso SSH e agendamento de tarefas Cron" }
      ]
    },
    {
      category: "Painéis, DNS & Ferramentas",
      icon: <Layout className="h-5 w-5 text-orange-500" />,
      items: [
        { label: "Painéis de Controle", value: "cPanel & WHM (gerenciamento e revenda) e WHMCS (clientes e cobrança)" },
        { label: "DNS", value: "Name Servers Privados (DNS) com base no seu próprio domínio" },
        { label: "Certificado SSL", value: "Let's Encrypt para todos os seus domínios e de seus clientes" },
        { label: "Criador de Sites", value: "Licença válida inclusa (+ Todos os recursos disponíveis no cPanel & WHM)" }
      ]
    },
    {
      category: "E-mail Corporativo & Segurança",
      icon: <Mail className="h-5 w-5 text-purple-600" />,
      items: [
        { label: "Contas de E-mail", value: "Número Ilimitado de contas POP3 e IMAP" },
        { label: "Webmail", value: "Horde ou RoundCube" },
        { label: "Proteção Anti-SPAM", value: "CloudMark e SpamAssassin" },
        { label: "Mais Recursos de E-mail", value: "Número ilimitado de listas de e-mail, autoresponders e redirecionamentos" }
      ]
    }
  ];

  return (
    <div id="hospedagem-service-page" className="space-y-20 pb-16 animate-fade-in">
      
      {/* 1. Header Banner with Animated Cloud VPS & Hardware Background */}
      <section className="relative overflow-hidden bg-slate-50/50 border-b border-slate-200 py-16 lg:py-24">
        
        {/* Animated Background related to Cloud Hosting, Hardware & Security */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />

          {/* Cloud Network Data Wave SVG */}
          <svg className="absolute bottom-0 left-0 w-full h-48 opacity-25" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hosting-server-gradient" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 170 Q 250 110 500 160 T 1000 40"
              fill="none"
              stroke="url(#hosting-server-gradient)"
              strokeWidth="4"
              initial={{ strokeDasharray: "1000", strokeDashoffset: "1000" }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 3.8, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
            />
          </svg>

          {/* Cloud Server Node Left */}
          <div className="absolute left-[8%] top-[22%] opacity-40 hidden md:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/40 animate-ping" />
              <div className="absolute w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 animate-pulse" />
              <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg relative z-10">
                <Server className="h-5 w-5" />
              </div>
            </motion.div>
          </div>

          {/* Security Shield Node Right */}
          <div className="absolute right-[10%] top-[20%] opacity-40 hidden md:block">
            <motion.div
              animate={{ scale: [0.95, 1.1, 0.95], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center w-14 h-14"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-blue-600 blur-md opacity-80 animate-pulse" />
              <div className="bg-slate-900 border border-slate-700 text-white w-full h-full rounded-full relative z-10 flex items-center justify-center shadow-lg">
                <ShieldCheck className="h-6 w-6 text-purple-400" />
              </div>
              <div className="absolute -inset-3 border border-purple-500/20 rounded-full animate-ping" style={{ animationDuration: '3.2s' }} />
            </motion.div>
          </div>

          {/* Floating Hardware Shapes */}
          {[
            { 
              x: "11%", 
              y: "66%", 
              className: "w-10 h-10 bg-blue-500/10 border-2 border-blue-500/30 rounded-full flex items-center justify-center",
              children: <div className="w-3 h-3 bg-blue-500/40 rounded-full animate-ping" />
            },
            { 
              x: "80%", 
              y: "65%", 
              className: "w-10 h-10 bg-purple-500/10 border-2 border-purple-500/30 rotate-45 flex items-center justify-center",
              children: <div className="w-3 h-3 bg-purple-500/40" />
            },
            { 
              x: "5%", 
              y: "48%", 
              className: "w-8 h-8 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center rotate-12",
              children: <div className="w-2 h-2 bg-emerald-500/50 rounded-full" />
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
            <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Hospedagem de Alta Performance
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Hospedagem VPS Cloud 100% Gerenciada cPanel
          </h1>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
            Seu site fora do ar significa prejuízo e perda de reputação. Migre para servidores Cloud com processadores Intel Xeon, armazenamento NVMe e sistema AlmaLinux 9.6 com suporte humanizado local.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/orcamento?servico=hospedagem"
              className="bg-blue-700 hover:bg-blue-800 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md inline-flex items-center gap-2 hover:-translate-y-0.5"
            >
              <MessageSquare className="h-4 w-4" /> Solicitar Orçamento de Hospedagem
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Problem vs Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Por que a Hospedagem Comum falha?
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              A verdade que as grandes empresas de hospedagem de R$ 15 ocultam de você
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Planos de hospedagem extremamente baratos compartilham o mesmo servidor físico com milhares de outros sites desconhecidos. Se apenas um desses sites sofrer um ataque hacker ou usar processamento excessivo em uma campanha, o seu site ficará extremamente lento ou cairá imediatamente.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Na AGÊNCIA OZ, disponibilizamos infraestrutura corporativa com cPanel & WHM, processadores Intel Xeon Silver, discos NVMe e isolamento de recursos para que sua empresa tenha a máxima performance.
            </p>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-2xl space-y-6 shadow-xl">
            <h3 className="font-display text-lg font-bold tracking-tight">Vantagens da Nossa Infraestrutura:</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>AlmaLinux 9.6 com Intel Xeon Silver @ 2.20GHz</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Armazenamento NVMe de 60GB a 200GB com RAM DDR5</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Transferência Mensal Ilimitada e SSL Let's Encrypt Grátis</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Contas de e-mail e Bancos de Dados MySQL Ilimitados</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Data Center Cloud no Brasil com monitoramento 24h</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Pricing Plans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Escolha o Plano Ideal</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Nossos Planos Cloud Gerenciados
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Planos transparentes, sem pegadinhas na renovação e faturamento simplificado em Reais (R$).
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {mockPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* 4. Complete Technical Specs Grid */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Ficha Técnica Completa</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Especificações Detalhadas dos Servidores
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Confira os recursos técnicos avançados e o ambiente completo de hospedagem disponibilizado para o seu projeto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fullTechnicalDetails.map((group, groupIdx) => (
              <div key={groupIdx} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 lg:p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-700/80 pb-4">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-700">
                    {group.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">{group.category}</h3>
                </div>

                <div className="space-y-4">
                  {group.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="space-y-1">
                      <span className="text-xs font-bold text-orange-400 uppercase tracking-wide block">
                        {item.label}
                      </span>
                      <p className="text-sm font-semibold text-slate-200">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-900/40 via-slate-800 to-orange-950/30 border border-slate-700 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="space-y-1">
              <h4 className="font-display font-bold text-base text-white">Precisa de configurações customizadas ou Revenda cPanel/WHM?</h4>
              <p className="text-xs text-slate-300">Oferecemos setups sob medida com Name Servers Privados e WHMCS para agências e revendedores.</p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shrink-0 inline-flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" /> Consultar Configuração Sob Medida
            </a>
          </div>
        </div>
      </section>

      {/* 5. CTA Footer Section */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Ainda com dúvidas de qual plano escolher?
        </h2>
        <p className="text-sm text-slate-500">
          Chame nosso time comercial e faremos uma análise gratuita da estrutura do seu site atual.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/orcamento?servico=hospedagem"
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors shadow-lg shadow-blue-100"
          >
            Falar com Consultor
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Tirar Dúvidas WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}
