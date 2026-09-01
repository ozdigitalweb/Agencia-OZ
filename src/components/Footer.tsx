import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Globe, Award } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Gerenciador de Conteúdo: Exibir apenas informações essenciais de rodapé
  if (isAdmin) {
    return (
      <footer id="admin-footer" className="bg-slate-900 border-t border-slate-800 py-4 px-4 sm:px-8 text-xs text-slate-400 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p>
            &copy; {currentYear} AGÊNCIA OZ Soluções Web. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
            <Link to="/politica-privacidade" target="_blank" className="hover:text-blue-400 transition-colors font-medium">
              Política de Privacidade
            </Link>
            <span className="flex items-center gap-1 text-slate-400">
              <Shield className="h-3.5 w-3.5 text-slate-500" /> Protótipo Referência WordPress
            </span>
            <span className="text-slate-400">Canoas / RS</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        
        {/* 4 Equal 25% Columns Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 xl:gap-12 w-full items-start">
          
          {/* Column 1 (25%): Quick Institutional Links */}
          <div className="w-full space-y-4">
            <h3 className="text-white font-display text-sm font-bold tracking-wide uppercase border-l-2 border-orange-500 pl-3">
              Institucional
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/sobre" className="text-slate-400 hover:text-orange-400 transition-colors font-medium">
                  Sobre a AGÊNCIA OZ
                </Link>
              </li>
              <li>
                <Link to="/clientes" className="text-slate-400 hover:text-orange-400 transition-colors font-medium">
                  Clientes e Portfólio
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-orange-400 transition-colors font-medium">
                  Artigos e Blog
                </Link>
              </li>
              <li>
                <Link to="/admin/blog" className="text-amber-400 hover:text-amber-300 transition-colors font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  <span>OZGESTOR (Painel)</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-orange-400 transition-colors font-medium">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-slate-400 hover:text-orange-400 transition-colors font-medium">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 (25%): Services Column */}
          <div className="w-full space-y-4">
            <h3 className="text-white font-display text-sm font-bold tracking-wide uppercase border-l-2 border-blue-500 pl-3">
              Serviços Premium
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/360-graus" className="text-white hover:text-orange-400 transition-colors font-bold flex items-center gap-1.5">
                  <span>Solução 360 Graus</span>
                  <span className="text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/40 px-1.5 py-0.2 rounded font-bold uppercase">All-in-One</span>
                </Link>
              </li>
              <li>
                <Link to="/servicos/midia" className="text-slate-400 hover:text-orange-400 transition-colors font-medium flex items-center gap-1.5">
                  <span>Mídia & Assistente IA (OZZY)</span>
                  <span className="text-[10px] bg-pink-500/20 text-pink-300 border border-pink-500/30 px-1.5 py-0.2 rounded font-bold uppercase">Novo</span>
                </Link>
              </li>
              <li>
                <Link to="/servicos/hospedagem" className="text-slate-400 hover:text-blue-400 transition-colors font-medium">
                  Hospedagem Cloud cPanel
                </Link>
              </li>
              <li>
                <Link to="/servicos/wordpress" className="text-slate-400 hover:text-blue-400 transition-colors font-medium">
                  Desenvolvimento WordPress
                </Link>
              </li>
              <li>
                <Link to="/l/futuro-da-busca" className="text-slate-400 hover:text-blue-400 transition-colors font-medium">
                  Futuro da Busca (SEO vs GEO)
                </Link>
              </li>
              <li>
                <Link to="/promocao" className="text-slate-400 hover:text-blue-400 transition-colors font-medium">
                  Promoção Site Grátis
                </Link>
              </li>
              <li>
                <Link to="/servicos/streaming" className="text-slate-400 hover:text-blue-400 transition-colors font-medium flex items-center gap-1.5">
                  <span>PROVOX Streaming</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-1.5 py-0.2 rounded font-bold uppercase">Ao Vivo</span>
                </Link>
                <div className="pt-1">
                  <Link 
                    to="/servicos/provox/briefing" 
                    className="text-slate-400 hover:text-orange-400 transition-colors text-xs font-medium flex items-center gap-1.5 group"
                  >
                    <span className="text-orange-400 font-bold shrink-0">↳</span>
                    <span>Briefing & Questionário Rádio</span>
                  </Link>
                </div>
              </li>
              <li>
                <Link to="/servicos" className="text-amber-400 hover:text-amber-300 transition-colors font-bold text-xs uppercase tracking-wider flex items-center gap-1 mt-2">
                  Ver Todos os Serviços &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 (25%): LPages Column */}
          <div className="w-full space-y-4">
            <h3 className="text-white font-display text-sm font-bold tracking-wide uppercase border-l-2 border-indigo-400 pl-3">
              LPages
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/servicos/landingpages#modelos" className="text-slate-200 hover:text-orange-400 transition-colors font-bold">
                  Landing Pages de Elite
                </Link>
              </li>
              <li className="pt-1 text-[11px] font-bold text-orange-400 uppercase tracking-wider">
                Modelos Demonstrativos:
              </li>
              <li>
                <Link to="/l/medicos" className="text-slate-400 hover:text-teal-300 transition-colors text-xs font-medium flex items-center gap-1.5">
                  <span className="text-teal-400">•</span>
                  <span>LP Médicos & Clínicas</span>
                </Link>
              </li>
              <li>
                <Link to="/l/advogados" className="text-slate-400 hover:text-amber-300 transition-colors text-xs font-medium flex items-center gap-1.5">
                  <span className="text-amber-400">•</span>
                  <span>LP Advogados</span>
                </Link>
              </li>
              <li>
                <Link to="/l/loja" className="text-slate-400 hover:text-rose-300 transition-colors text-xs font-medium flex items-center gap-1.5">
                  <span className="text-rose-400">•</span>
                  <span>LP Lojas & Comércios</span>
                </Link>
              </li>
              <li>
                <Link to="/l/artesanato" className="text-slate-400 hover:text-orange-300 transition-colors text-xs font-medium flex items-center gap-1.5">
                  <span className="text-orange-400">•</span>
                  <span>LP Artesanato & Ateliês</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 (25%): Brand Presentation */}
          <div className="space-y-4 w-full">
            <Link to="/" className="flex items-center gap-3 inline-block">
              <Logo size="sm" className="hover:scale-[1.02] transition-transform" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Especialistas em infraestrutura Cloud de alto desempenho, desenvolvimento WordPress sob medida e estratégias de SEO focadas em conversão real.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800">
                <Globe className="h-3.5 w-3.5 text-blue-400" /> Hosting 100% Cloud
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800">
                <Award className="h-3.5 w-3.5 text-orange-400" /> WordPress Partner
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium font-sans">
          <p>
            &copy; {currentYear} AGÊNCIA OZ Soluções Web. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
            <Link to="/politica-privacidade" className="hover:text-slate-300 transition-colors">
              Política de Privacidade
            </Link>
            <span className="flex items-center gap-1 text-slate-500">
              <Shield className="h-3.5 w-3.5 text-slate-500" /> Protótipo Referência WordPress
            </span>
            <span className="text-slate-500">Canoas / RS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
