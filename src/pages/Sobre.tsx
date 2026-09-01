import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  MapPin, 
  Award, 
  CheckCircle, 
  MessageSquare, 
  Calendar, 
  Building2, 
  GraduationCap, 
  Code2, 
  Globe, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  CheckCircle2,
  FileCheck,
  Cpu
} from 'lucide-react';

export default function Sobre() {
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+conversar+com+a+equipe+da+OZ+Digital.";

  const timelineEvents = [
    {
      year: "2002",
      badge: "Fundação da Software House",
      title: "Início das Operações Comerciais e Desenvolvimento de Sistemas",
      location: "Canoas, Rio Grande do Sul",
      icon: Building2,
      color: "blue",
      description: "Fundada como uma software house focada em Tecnologia da Informação, desenvolvimento de soluções corporativas sob medida e atendimento web. A empresa iniciou sua atuação estruturando sistemas e desenvolvendo projetos digitais robustos para empresas privadas e instituições."
    },
    {
      year: "2006",
      badge: "Incubadora Tecnológica Uni Lasalle",
      title: "Seleção para a Incubadora Tecnológica do Uni Lasalle de Canoas-RS",
      location: "Uni Lasalle (Universidade La Salle - Canoas/RS)",
      icon: GraduationCap,
      color: "orange",
      description: "Após rigoroso e criterioso processo seletivo, a empresa foi selecionada e alocada na Incubadora Tecnológica do Uni Lasalle de Canoas-RS, onde atuou ativamente impulsionando a inovação regional. Durante esse período, desenvolveu dezenas de portais institucionais e projetou sistemas proprietários estratégicos, tais como:",
      highlights: [
        "Software de Gestão e Processamento de Concursos Públicos",
        "Sistema Gerenciador de Vagas de Estágio e Oportunidades",
        "Desenvolvimento de portais corporativos sob medida com alta segurança"
      ]
    },
    {
      year: "2008 – 2014",
      badge: "Atuação no Setor Público & Terceiro Setor",
      title: "Contrato e Gestão Digital para a SECOM da Prefeitura de Canoas",
      location: "Fundação La Salle / Prefeitura de Canoas",
      icon: Code2,
      color: "blue",
      description: "Durante cerca de 6 anos, a empresa atendeu a Secretaria de Comunicação (SECOM) do município de Canoas via contrato pela Fundação La Salle, coordenando importantes avanços de tecnologia e acessibilidade digital até a transição para o CANOASTEC:",
      highlights: [
        "Análise e reestruturação completa do novo portal municipal que estava paralisado",
        "Avaliação, migração e importação do acervo de conteúdos para plataformas de Software Livre",
        "Adequação integral do portal municipal para pessoas com deficiência (Lei da Acessibilidade Digital PCD)",
        "Desenvolvimento e sustentação de hotsites para grandes eventos internacionais: FALP, Canoas Jazz e Fórum Social Mundial",
        "Desenvolvimento de novas funcionalidades, suporte e treinamento contínuo de servidores públicos"
      ]
    },
    {
      year: "2014 – 2020",
      badge: "Evolução do Modelo & MKT Digital",
      title: "Especialização em WordPress Corporativo e E-Commerce",
      location: "Operação Digital Nacional",
      icon: Layers,
      color: "orange",
      description: "Com a transformação do mercado digital, a empresa reestruturou seu modelo de atuação para um formato ágil e focado em alta performance. Manteve a sustentação e suporte técnico dos sistemas já consolidados e expandiu fortemente a oferta de serviços em Marketing Digital, SEO, Lojas Virtuais (e-Commerce) e ecossistemas WordPress corporativos."
    },
    {
      year: "2021 – Presente",
      badge: "Inovação, UX/UI & Alta Performance",
      title: "Metodologias Ágeis, Padrões Google UX/UI e Grandes Projects",
      location: "AGÊNCIA OZ • Canoas / RS",
      icon: Sparkles,
      color: "emerald",
      description: "Consolidação da AGÊNCIA OZ como referência em desenvolvimento web de alta velocidade, segurança e otimização para motores de busca (SEO/GEO). A equipe opera com metodologias ágeis (Kanban), contínua atualização em Análise e Desenvolvimento de Sistemas (Unilasalle) e processos de design fundamentados nas diretrizes globais de UX/UI do Google (Empatizar, Definir, Idealizar e Prototipar).",
      recentProjects: [
        { name: "CSSGAPA", url: "https://cssgapa.com.br" },
        { name: "VTE Tecnologia", url: "https://www.vtetecnologia.com.br" },
        { name: "Psicopedagodaça", url: "https://www.psicopedagodanca.com.br" },
        { name: "Eficiência Hospitalar", url: "https://www.eficienciahospitalar.com.br" },
        { name: "RN Com Digital", url: "https://rncomdigital.com.br/" }
      ]
    }
  ];

  return (
    <div id="sobre-page" className="space-y-20 pb-16 animate-fade-in">
      
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Nossa Trajetória Institucional
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Mais de 20 anos de inovação e excelência em tecnologia digital.
          </h1>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
            Sediada em Canoas - RS, a AGÊNCIA OZ combina histórico de desenvolvimento de sistemas corporativos, atuação no setor público, projetos de acessibilidade e especialização em ecossistemas web de alta performance.
          </p>
        </div>
      </section>

      {/* 2. Story and Sede */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Quem é a AGÊNCIA OZ?
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Fundada em Canoas - RS, a <strong>AGÊNCIA OZ</strong> (originalmente fundada em 2002 como OZ Digital) nasceu com o propósito de entregar solidez técnica e engenharia de software confiável para o mercado corporativo e governamental.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Ao longo de mais de duas décadas, construiu uma trajetória sólida marcada pela <strong>Seleção para a Incubadora Tecnológica do Uni Lasalle de Canoas-RS</strong>, gestão de portais governamentais acessíveis a pessoas com deficiência (PCDs), desenvolvimento de sistemas para concursos públicos e criação de e-commerces e sites institucionais de alta performance.
            </p>
            
            {/* Highlight Card */}
            <div className="bg-gradient-to-r from-blue-50/80 via-slate-50 to-orange-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100/80 px-2.5 py-0.5 rounded-md inline-block">
                  Engenharia & Padrão de Excelência
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  Hoje, combinamos o rigor da engenharia de software com os padrões mais modernos de <strong>UX/UI Design (Google)</strong>, metodologias ágeis (Kanban) e infraestrutura Cloud gerenciada para garantir que nossos clientes vendam mais e fiquem sempre à frente no Google.
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-video shadow-xl bg-slate-100 border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=webp&fit=crop&w=800&q=75"
              alt="Canoas, RS"
              loading="lazy"
              width={800}
              height={450}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
              <div className="text-white space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-orange-500 font-bold uppercase tracking-wider">
                  <MapPin className="h-4 w-4" /> Canoas, RS
                </div>
                <h3 className="font-display font-bold text-lg">Tradição & Inovação Digital desde 2002</h3>
                <p className="text-xs text-slate-300">Hub de tecnologia localizado na região metropolitana de Porto Alegre.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. TIMELINE / LINHA DO TEMPO INSTITUCIONAL */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        
        <div className="relative space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full">
              <Calendar className="h-4 w-4 text-orange-400" /> Histórico da Empresa
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Linha do Tempo & Linha de Evolução da AGÊNCIA OZ
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Confira os marcos decisivos da nossa história: do desenvolvimento de softwares corporativos e incubação universitária até o pioneirismo em UX/UI e inteligência para web.
            </p>
          </div>

          {/* Timeline Nodes */}
          <div className="relative border-l-2 border-slate-700/80 ml-4 sm:ml-32 lg:ml-40 space-y-12 pl-6 sm:pl-10">
            
            {timelineEvents.map((event, idx) => {
              const IconComp = event.icon;
              return (
                <div key={idx} className="relative group">
                  
                  {/* Left Floating Year Label (Desktop) */}
                  <div className="hidden sm:flex absolute -left-36 lg:-left-44 top-0.5 items-center justify-end w-28 lg:w-32 text-right">
                    <span className="font-display font-extrabold text-xl lg:text-2xl text-orange-400 tracking-tight">
                      {event.year}
                    </span>
                  </div>

                  {/* Node Bullet Icon */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-0.5 w-10 h-10 rounded-xl bg-slate-800 border-2 border-orange-500 text-orange-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <IconComp className="h-5 w-5" />
                  </div>

                  {/* Content Card */}
                  <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl hover:border-slate-600 transition-all">
                    
                    {/* Header info */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
                      <span className="sm:hidden font-display font-bold text-orange-400 text-lg">
                        {event.year}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                        {event.badge}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-orange-400" /> {event.location}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white tracking-tight">
                      {event.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Bullet Highlights */}
                    {event.highlights && (
                      <div className="space-y-2 pt-2 bg-slate-900/50 p-4 rounded-xl border border-slate-700/40">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Principais Entregas e Realizações:
                        </span>
                        <ul className="space-y-2 text-xs text-slate-300">
                          {event.highlights.map((item, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Recent Work / Cases Links */}
                    {event.recentProjects && (
                      <div className="space-y-3 pt-3 border-t border-slate-700/60">
                        <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block">
                          Últimos Trabalhos e Portfólio Realizado:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {event.recentProjects.map((proj, pIdx) => (
                            <a
                              key={pIdx}
                              href={proj.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-orange-500/60 hover:bg-slate-900 text-slate-200 hover:text-white transition-all text-xs font-bold group/link"
                            >
                              <span className="flex items-center gap-2">
                                <Globe className="h-3.5 w-3.5 text-orange-400" /> {proj.name}
                              </span>
                              <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover/link:text-orange-400 transition-colors" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* 4. Our Values / Pillars */}
      <section className="bg-white border border-slate-200 py-16 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Valores de Atuação</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Os 4 Pilares da AGÊNCIA OZ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Guiamos nossas entregas com base em ética técnica, acessibilidade e compromisso real com o faturamento do cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                01
              </div>
              <h3 className="font-display font-bold text-base text-slate-900 tracking-tight">Transparência Total</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Não vendemos recursos desnecessários. Explicamos cada decisão de código e apresentamos métricas reais de velocidade.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                02
              </div>
              <h3 className="font-display font-bold text-base text-slate-900 tracking-tight">Velocidade como Regra</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Um segundo a mais de carregamento custa clientes. Cada linha de código que escrevemos visa otimização e nota máxima no Google PageSpeed.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                03
              </div>
              <h3 className="font-display font-bold text-base text-slate-900 tracking-tight">Segurança & Acessibilidade</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aplicações preparadas para conformidade PCD, blindagem técnica atenta e infraestrutura de backup automatizada.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                04
              </div>
              <h3 className="font-display font-bold text-base text-slate-900 tracking-tight">Suporte Técnico Direto</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Esqueça robôs ou chamados impessoais. Nosso time técnico local te atende diretamente com agilidade e proximidade.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Sede Highlight Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Atendimento Próximo</span>
            <h3 className="font-display text-2xl font-bold text-slate-900 leading-snug tracking-tight">
              Sede em Canoas - RS com Atendimento em Todo o Brasil
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Nossa operação comercial e equipe técnica ficam localizadas em Canoas - RS. De lá, coordenamos a engenharia web, gestão de servidores e estratégias de aceleração digital para marcas de destaque.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Oferecemos atendimento humanizado por WhatsApp, reuniões estratégicas online e acompanhamento próximo para garantir o máximo retorno sobre o investimento dos nossos parceiros.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                <CheckCircle className="h-4 w-4 text-blue-700" /> Atendimento Ágil
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                <CheckCircle className="h-4 w-4 text-orange-500" /> Parceria de Confiança
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center space-y-4">
            <MapPin className="h-10 w-10 text-orange-500 animate-bounce" />
            <h4 className="font-display font-bold text-slate-900 text-sm tracking-tight">Canoas - RS</h4>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Sediados em Canoas, com atendimento digital especializado para todo o Brasil.
            </p>
          </div>

        </div>
      </section>

      {/* 6. CTA Footer */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Vamos colocar a presença digital da sua empresa em outro patamar?
        </h2>
        <p className="text-sm text-slate-500">
          Nossa equipe está pronta para desenhar a melhor solução técnica e estratégica para o seu negócio.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/orcamento"
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors shadow-lg shadow-blue-100"
          >
            Solicitar Orçamento
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Conversar via WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}

