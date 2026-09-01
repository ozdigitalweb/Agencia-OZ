import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Briefcase, 
  ChevronRight, 
  MessageSquare, 
  ExternalLink, 
  Sparkles, 
  MapPin, 
  Tag, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Filter 
} from 'lucide-react';
import { mockClients } from '../data/mockData';

// Service route helper to link tags directly to services pages
function getServiceRoute(serviceName: string): { path: string; label: string } {
  const s = serviceName.toLowerCase();
  
  if (
    s.includes('wordpress') ||
    s.includes('criação de site') ||
    s.includes('ui/ux') ||
    s.includes('desenvolvimento web') ||
    s.includes('portal') ||
    s.includes('front-end')
  ) {
    return { path: '/servicos/wordpress', label: 'Desenvolvimento WordPress' };
  }
  
  if (
    s.includes('hospedagem') ||
    s.includes('cloud') ||
    s.includes('cpanel') ||
    s.includes('servidor') ||
    s.includes('sistemas')
  ) {
    return { path: '/servicos/hospedagem', label: 'Hospedagem Cloud cPanel' };
  }
  
  if (
    s.includes('seo') ||
    s.includes('velocidade') ||
    s.includes('core web') ||
    s.includes('pixel') ||
    s.includes('analytics') ||
    s.includes('campanha') ||
    s.includes('posicionamento')
  ) {
    return { path: '/servicos/seo', label: 'SEO & Otimização AI' };
  }
  
  if (
    s.includes('catálogo') ||
    s.includes('landing') ||
    s.includes('agenda') ||
    s.includes('galeria') ||
    s.includes('eventos') ||
    s.includes('b2b') ||
    s.includes('convênios')
  ) {
    return { path: '/servicos/landingpages', label: 'Landing Pages & Catálogos' };
  }

  if (s.includes('streaming') || s.includes('rádio') || s.includes('áudio')) {
    return { path: '/servicos/streaming', label: 'PROVOX Streaming' };
  }

  return { path: '/servicos', label: 'Ver Nossos Serviços' };
}

export default function Clientes() {
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+conhecer+melhor+os+casos+de+sucesso+da+OZ+Digital.";
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');

  // Available Category Filter Options
  const categories = [
    { id: 'todos', label: 'Todos os Casos' },
    { id: 'wordpress', label: 'Sites & WordPress' },
    { id: 'catalogo', label: 'Catálogos & B2B' },
    { id: 'portal', label: 'Portais & Mídias' },
  ];

  // Filter logic
  const filteredClients = mockClients.filter(client => {
    if (selectedFilter === 'todos') return true;
    const cat = client.category.toLowerCase();
    if (selectedFilter === 'wordpress' && (cat.includes('wordpress') || cat.includes('site'))) return true;
    if (selectedFilter === 'catalogo' && (cat.includes('catálogo') || cat.includes('produtos'))) return true;
    if (selectedFilter === 'portal' && (cat.includes('portal') || cat.includes('mídias') || cat.includes('plataforma'))) return true;
    return false;
  });

  return (
    <div id="clientes-page" className="space-y-16 pb-20 animate-fade-in">
      
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
            <Briefcase className="h-3.5 w-3.5 text-blue-600" /> Clientes e Portfólio de Sucesso
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Casos Reais de Performance, Velocidade e Conversão.
          </h1>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Conheça alguns dos projetos institucionais, catálogos B2B, portais e migrações de alta performance desenvolvidos pela AGÊNCIA OZ.
          </p>
        </div>
      </section>

      {/* 2. Interactive Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2.5 pb-4 border-b border-slate-200/80">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" /> Filtrar por:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                selectedFilter === cat.id
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Client Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              id={`portfolio-case-${client.id}`}
              className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
            >
              {/* Featured Image Frame */}
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                <img
                  src={client.image}
                  alt={`Captura de tela do projeto: ${client.name}`}
                  loading="lazy"
                  width={600}
                  height={338}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
                  {client.category}
                </div>

                {/* Status Badge */}
                <div className="absolute bottom-4 right-4 bg-emerald-600/95 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  <span>Projeto Ativo</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 sm:p-8 flex flex-col flex-grow space-y-5">
                
                {/* Title & Location */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors tracking-tight">
                      {client.name}
                    </h3>
                    {client.websiteUrl && client.websiteUrl !== '#' && (
                      <a
                        href={client.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-lg transition-colors shrink-0 shadow-2xs"
                        title={`Visitar site de ${client.name}`}
                      >
                        <span>Visitar Site</span>
                        <ExternalLink className="h-3.5 w-3.5 text-blue-600" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                    <MapPin className="h-3.5 w-3.5 text-orange-500" />
                    <span>Sede: {client.location}</span>
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {client.description}
                </p>

                {/* Interactive Services Tags with Direct Links */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Serviços Prestados (Clique para detalhes):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {client.services.map((service, idx) => {
                      const serviceRoute = getServiceRoute(service);
                      return (
                        <Link
                          key={idx}
                          to={serviceRoute.path}
                          title={`Ver mais detalhes sobre ${serviceRoute.label}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 transition-all duration-200 group/tag shadow-2xs"
                        >
                          <Tag className="h-3 w-3 text-orange-500 group-hover/tag:text-blue-600 transition-colors" />
                          <span>{service}</span>
                          <ArrowUpRight className="h-3 w-3 opacity-60 group-hover/tag:opacity-100 transition-opacity text-blue-600" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Impactful Results Box */}
                <div className="bg-gradient-to-br from-emerald-50/60 to-teal-50/40 border border-emerald-200/80 rounded-xl p-4.5 mt-auto space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                    <span>Resultados Atingidos:</span>
                  </span>
                  <p className="font-display font-extrabold text-sm text-slate-800 leading-snug">
                    {client.results}
                  </p>
                </div>

                {/* Footer CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">
                    Solução Sob Medida
                  </span>
                  <a
                    href={`${whatsappUrl}&text=Ol%C3%A1%21+Gostaria+de+um+projeto+similar+ao+de+${encodeURIComponent(client.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-900 transition-colors"
                  >
                    <span>Quero um site similar</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Proof and Core Quality Metrics */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white py-16 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
          <div className="space-y-3 p-4">
            <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-2xl flex items-center justify-center mx-auto text-orange-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="font-display text-4xl font-extrabold text-white">100%</h4>
            <p className="text-xs uppercase tracking-widest text-orange-400 font-bold">Uptime Contratual</p>
            <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">Garantia técnica em servidores Cloud gerenciados de alta estabilidade.</p>
          </div>
          <div className="space-y-3 p-4">
            <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
              <Zap className="h-6 w-6" />
            </div>
            <h4 className="font-display text-4xl font-extrabold text-white">Sub 1.5s</h4>
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Velocidade de Carga</p>
            <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">Sites otimizados especificamente para Core Web Vitals e pontuação verde.</p>
          </div>
          <div className="space-y-3 p-4">
            <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto text-blue-400">
              <Clock className="h-6 w-6" />
            </div>
            <h4 className="font-display text-4xl font-extrabold text-white">Atendimento Local</h4>
            <p className="text-xs uppercase tracking-widest text-blue-400 font-bold">Suporte Humanizado</p>
            <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">Equipe própria sediada em Canoas pronta para atender seu negócio.</p>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Quer ver sua marca destacada nesta lista de sucesso?
        </h2>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Desenvolvemos sites ultrarrápidos e seguros para empresas que buscam liderança no Google e alta conversão de clientes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/orcamento"
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            Começar Meu Projeto
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Falar pelo WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}
