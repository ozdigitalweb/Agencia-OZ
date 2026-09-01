import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Shield, 
  Gavel, 
  Briefcase, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  Award, 
  Lock, 
  ArrowLeft,
  Building2,
  FileText,
  Clock,
  MapPin,
  ChevronRight,
  HelpCircle,
  Users,
  ShieldAlert,
  Star,
  FileCheck,
  Search,
  CheckSquare
} from 'lucide-react';

export default function LpAdvogados() {
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Vim+pelo+modelo+de+Landing+Page+para+Advogados+e+gostaria+de+um+or%C3%A7amento.";
  const phone = "(48) 99198-4678";

  return (
    <div id="lp-advogados-demo" className="bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 min-h-screen">
      
      {/* Top Banner indicating this is a live commercial demo */}
      <div className="bg-slate-900 text-white text-xs py-2.5 px-4 text-center border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded border border-amber-500/30">
            MODELO DEMO
          </span>
          <span className="font-medium text-slate-300">
            Landing Page de Alta Conversão para Advogados e Escritórios Jurídicos
          </span>
        </div>
        <div className="flex items-center gap-3 mx-auto sm:mx-0">
          <Link 
            to="/servicos/landingpages#modelos" 
            className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 px-3 py-1 rounded font-bold transition-all flex items-center gap-1.5 hover:border-amber-500/60 shadow-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar para Todos os Modelos
          </Link>
          <Link 
            to="/orcamento?servico=lp-advogados" 
            className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1 rounded font-bold transition-colors"
          >
            Quero uma LP Similar
          </Link>
        </div>
      </div>

      {/* MONUMENTAL HERO WITH LAWYER PHOTO */}
      <header className="relative bg-slate-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
        
        {/* Subtle Luxury Pattern & Ambient Glow */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Monogram Crest Emblem */}
            <div className="inline-flex flex-col items-start gap-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent border border-amber-500/40 flex items-center justify-center shadow-lg">
                  <Scale className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 block">
                    MENDES & ASSOCIADOS ADVOCACIA
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                    <span>OAB/RS nº 45.123</span>
                    <span>•</span>
                    <span>Atendimento Nacional</span>
                    <span>•</span>
                    <span className="text-amber-400 flex items-center gap-1"><Lock className="h-3 w-3" /> Sigilo Absoluto</span>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Defesa Estratégica dos Seus Direitos com Solidez e Agilidade
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Especialistas em causas de Família, Trabalhista, Imobiliário e Direito Cível. Avaliamos a viabilidade jurídica do seu caso com clareza, ética e transparência.
            </p>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center gap-2.5">
                <Shield className="h-5 w-5 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">+15 Anos de Atuação</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center gap-2.5">
                <Lock className="h-5 w-5 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">Sigilo Profissional</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Award className="h-5 w-5 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">Alta Taxa de Éxito</span>
              </div>
            </div>

            {/* Quick Dual Hero CTA */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-7 py-4 rounded-xl text-sm transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-5 w-5" />
                Agendar Consulta no WhatsApp
              </a>
              <a
                href={`tel:${phone}`}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-xl text-sm transition-colors border border-slate-800 flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4 text-amber-400" />
                Ligar {phone}
              </a>
            </div>

          </div>

          {/* Right Column: Photo of Lawyers */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-slate-900 aspect-[4/5] group">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?fm=webp&fit=crop&w=800&q=80"
                alt="Advogados e Consultores Jurídicos Mendes & Associados"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
              
              <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <Award className="h-3.5 w-3.5" /> Dra. Luciana Mendes
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/95 border border-amber-500/30 backdrop-blur-md space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Advocacia de Alta Performance</p>
                  <span className="text-[10px] text-slate-400 font-mono">OAB/RS 45.123</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "Compromisso inegociável com a defesa rigorosa dos interesses de cada cliente."
                </p>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* NUMBERS STRIP */}
      <section className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">+15 Anos</p>
              <p className="text-xs text-slate-400 font-medium">De Tradição Jurídica</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">+1.200</p>
              <p className="text-xs text-slate-400 font-medium">Casos e Processos Atendidos</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">100%</p>
              <p className="text-xs text-slate-400 font-medium">Sigilo e Confidencialidade</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">Nacional</p>
              <p className="text-xs text-slate-400 font-medium">Atendimento Presencial e Online</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="bg-white text-slate-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Áreas de Especialidade</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
              Como Podemos Defender Seus Direitos
            </h2>
            <p className="text-sm text-slate-600">
              Atuação estratégica com foco na defesa dos seus interesses e prevenção de riscos judiciais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Direito de Família e Sucessões",
                desc: "Divórcio consensual e litigioso, guarda de filhos, pensão alimentícia, partilha de bens e inventários com agilidade.",
                icon: Gavel
              },
              {
                title: "Direito Trabalhista",
                desc: "Defesa de direitos do trabalhador, cálculo de verbas rescisórias, horas extras, justa causa e acidentes de trabalho.",
                icon: Briefcase
              },
              {
                title: "Direito Imobiliário e Contratos",
                desc: "Assessoria na compra e venda de imóveis, contratos de locação, regularização de propriedades e usucapião.",
                icon: Building2
              },
              {
                title: "Direito Cível e Consumidor",
                desc: "Ações de indenização, cobranças indevidas, problemas com bancos, cias aéreas e renegociação de dívidas.",
                icon: Scale
              },
              {
                title: "Direito Previdenciário (INSS)",
                desc: "Aposentadorias, auxílio-doença, BPC/LOAS e planejamento previdenciário para garantia de benefícios.",
                icon: FileText
              },
              {
                title: "Consultoria Jurídica Empresarial",
                desc: "Proteção de empresas, elaboração de contratos comerciais, defesa trabalhista e gestão de passivos.",
                icon: Shield
              }
            ].map((area, idx) => {
              const Icon = area.icon;
              return (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4 hover:border-amber-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-200">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-900">{area.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{area.desc}</p>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 pt-4"
                  >
                    <span>Consultar sobre esta área</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERMEDIATE CTA BANNER #1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-8 lg:p-12 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 inline-block">
              Análise Inicial do Seu Caso
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Tem dúvidas sobre seus direitos ou um processo em andamento?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Tire suas dúvidas direto com um advogado especializado pelo WhatsApp de forma totalmente sigilosa.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-4 rounded-xl text-sm transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Tirar Dúvidas no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* HOW WE WORK / PROCESS */}
      <section className="bg-slate-50 text-slate-900 py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Passo a Passo</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
              Como Funciona Nosso Atendimento
            </h2>
            <p className="text-sm text-slate-600">
              Acompanhamento transparente da consulta inicial até a solução final do seu processo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Contato Inicial",
                desc: "Você envia uma mensagem detalhando sua situação para nossa equipe de atendimento.",
                icon: MessageSquare
              },
              {
                step: "02",
                title: "Análise de Documentos",
                desc: "Examinamos contratos, notificações ou documentos do seu caso sem jargões complicados.",
                icon: Search
              },
              {
                step: "03",
                title: "Estratégia Jurídica",
                desc: "Apresentamos o melhor caminho judicial ou extrajudicial para proteger seus direitos.",
                icon: FileCheck
              },
              {
                step: "04",
                title: "Atuação & Relatórios",
                desc: "Ajuizamos a ação e mantemos você atualizado sobre cada movimentação no tribunal.",
                icon: CheckSquare
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 relative overflow-hidden shadow-sm">
                  <span className="text-4xl font-extrabold text-slate-200 absolute top-4 right-4 select-none">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 relative z-10">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed relative z-10">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REVIEWS / TESTIMONIALS */}
      <section className="bg-slate-900 border-y border-slate-800 py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Casos e Reconhecimento</span>
            <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
              O Que Nossos Clientes Dizem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Roberto S. B.",
                role: "Ação Trabalhista",
                text: "Consegui receber todas as minhas verbas rescisórias e horas extras não pagas. Dra. Luciana foi firme e muito atenciosa do começo ao fim.",
                stars: 5
              },
              {
                name: "Camila M.",
                role: "Direito de Família",
                text: "Meu divórcio e guarda foram resolvidos de forma amigável e rápida sem traumas para meus filhos. Recomendo de olhos fechados!",
                stars: 5
              },
              {
                name: "Empresa de Logística A.T.",
                role: "Assessoria Imobiliária",
                text: "Regularizamos o contrato da nossa nova sede industrial em tempo recorde com total segurança jurídica. Equipe nota mil.",
                stars: 5
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-900">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-amber-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white text-slate-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Compromisso com o Cliente</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
              Atendimento Humanizado e Transparente
            </h2>
            <div className="space-y-4">
              {[
                "Atendimento presencial no escritório ou online para sua total comodidade.",
                "Linguagem simples, clara e sem jargões jurídicos complicados.",
                "Acompanhamento constante do andamento do seu processo.",
                "Honorários claros e facilitados conforme a necessidade do cliente."
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6 shadow-md">
            <h3 className="font-display font-bold text-2xl text-slate-900">Solicite uma Análise do Seu Caso</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fale diretamente com nossa equipe jurídica pelo WhatsApp para esclarecer dúvidas iniciais sem compromisso.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 rounded-xl text-center text-sm transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="h-5 w-5" />
              Enviar Mensagem Segura no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-slate-50 text-slate-900 py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Tire Suas Dúvidas</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Quanto custa uma consulta jurídica?",
                a: "Os honorários dependem da complexidade do caso e seguem a tabela da OAB. Na consulta inicial pelo WhatsApp avaliamos seu problema e explicamos todos os custos com total transparência."
              },
              {
                q: "É possível entrar com uma ação morando em outra cidade?",
                a: "Sim! Hoje quase todos os processos judiciais são 100% digitais. Atendemos clientes de todo o Brasil via vídeochamada e WhatsApp com total validade jurídica."
              },
              {
                q: "Quanto tempo demora para resolver meu caso?",
                a: "Prazos variam conforme o tipo de ação e o tribunal. Em casos de acordos extrajudiciais tudo pode se resolver em poucas semanas. Mantemos você informado de cada etapa."
              },
              {
                q: "Minhas informações estarão seguras?",
                a: "Sim. O sigilo entre advogado e cliente é resguardado por lei (Estatuto da OAB) e garantido por nossa política estrita de privacidade."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2 shadow-sm">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-amber-600 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL HIGH CONVERSION CTA */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            Proteja Seus Direitos Hoje
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Não Deixe Seus Prazos Prescreverem. Fale Conosco Agora!
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Agende uma conversa sigilosa com nosso escritório e receba orientação jurídica segura para o seu caso.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-4 rounded-xl text-sm transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Falar no WhatsApp
            </a>
            <a
              href={`tel:${phone}`}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl text-sm transition-colors border border-slate-800 flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4 text-amber-400" />
              Ligar para {phone}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-slate-950 text-slate-500 text-center px-4 space-y-4 border-t border-slate-900">
        <p className="text-xs">
          Exemplo demonstrativo de Landing Page de alta conversão criada pela AGÊNCIA OZ para escritórios de advocacia.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs font-bold text-amber-400">
          <Link to="/servicos/landingpages#modelos" className="hover:underline">Ver Outros Exemplos</Link>
          <span>•</span>
          <Link to="/orcamento?servico=lp-advogados" className="hover:underline">Solicitar Projeto para Meu Escritório</Link>
        </div>
      </footer>

    </div>
  );
}
