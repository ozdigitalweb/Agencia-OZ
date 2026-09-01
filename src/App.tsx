/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout & Global Components
import Header from './components/Header';
import Footer from './components/Footer';
import PromoPopup from './components/PromoPopup';
import OzzyChatWidget from './components/OzzyChatWidget';

// Page Views
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Servicos from './pages/Servicos';
import ServicosHospedagem from './pages/ServicosHospedagem';
import ServicosWordPress from './pages/ServicosWordPress';
import ServicosSEO from './pages/ServicosSEO';
import ServicosProvox from './pages/ServicosProvox';
import ComoCriarRadioWeb from './pages/ComoCriarRadioWeb';
import BriefingRadioWeb from './pages/BriefingRadioWeb';
import ServicosLandingPages from './pages/ServicosLandingPages';
import Clientes from './pages/Clientes';
import BlogArchive from './pages/BlogArchive';
import BlogSingle from './pages/BlogSingle';
import AdminBlog from './pages/AdminBlog';
import FAQ from './pages/FAQ';
import Contato from './pages/Contato';
import Promocao from './pages/Promocao';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import Orcamento from './pages/Orcamento';
import LpFuturoBusca from './pages/LpFuturoBusca';
import Solucao360 from './pages/Solucao360';
import ServicosMidia from './pages/ServicosMidia';

// Commercial Landing Pages Demo Examples
import LpMedicos from './pages/l/LpMedicos';
import LpAdvogados from './pages/l/LpAdvogados';
import LpLoja from './pages/l/LpLoja';
import LpArtesanato from './pages/l/LpArtesanato';

// Auto-Scroll restoration component between route changes and dynamic SEO titles
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }

    // Dynamic Title Management for high SEO value
    if (pathname === '/') {
      document.title = "AGÊNCIA OZ | Criação de Sites WordPress, Hospedagem VPS Cloud & SEO";
    } else if (pathname === '/sobre') {
      document.title = "Sobre Nós | AGÊNCIA OZ - Performance e Segurança";
    } else if (pathname === '/servicos') {
      document.title = "Nossos Serviços de Elite | AGÊNCIA OZ";
    } else if (pathname === '/servicos/landingpages') {
      document.title = "Landing Pages de Alta Conversão | AGÊNCIA OZ";
    } else if (pathname === '/servicos/hospedagem') {
      document.title = "Hospedagem Cloud cPanel Premium VPS | AGÊNCIA OZ";
    } else if (pathname === '/servicos/wordpress') {
      document.title = "Desenvolvimento WordPress sob Medida | AGÊNCIA OZ";
    } else if (pathname === '/servicos/seo') {
      document.title = "SEO / GEO Posicionamento e Otimização AI | AGÊNCIA OZ";
    } else if (pathname === '/servicos/streaming') {
      document.title = "PROVOX Streaming & Rádio Corporativa | AGÊNCIA OZ";
    } else if (pathname === '/guias/como-criar-radio-web' || pathname === '/servicos/streaming/como-criar-radio-web') {
      document.title = "Como Criar Sua Rádio Web do Zero — Guia Completo | AGÊNCIA OZ";
    } else if (pathname === '/servicos/provox/briefing' || pathname === '/servicos/provox/questionario') {
      document.title = "Questionário & Briefing Rádio Web - PROVOX | AGÊNCIA OZ";
    } else if (pathname === '/clientes') {
      document.title = "Casos de Sucesso e Clientes | AGÊNCIA OZ";
    } else if (pathname === '/blog') {
      document.title = "Blog de Tecnologia, SEO e Infraestrutura | AGÊNCIA OZ";
    } else if (pathname === '/admin' || pathname === '/admin/blog') {
      document.title = "OZGESTOR — Gestor de Atendimento, Blog & CRM | AGÊNCIA OZ";
    } else if (pathname === '/faq') {
      document.title = "Central de Ajuda e Perguntas Frequentes | AGÊNCIA OZ";
    } else if (pathname === '/contato') {
      document.title = "Fale Conosco e Solicite um Orçamento | AGÊNCIA OZ";
    } else if (pathname === '/promocao') {
      document.title = "Promoção Especial Site Grátis | AGÊNCIA OZ";
    } else if (pathname === '/politica-privacidade') {
      document.title = "Política de Privacidade | AGÊNCIA OZ";
    } else if (pathname === '/orcamento') {
      document.title = "Solicite um Orçamento | AGÊNCIA OZ";
    } else if (pathname === '/360-graus' || pathname === '/solucao-360' || pathname === '/servicos/360-graus') {
      document.title = "Solução 360 Graus — Auxílio Digital Completo para Empresas | AGÊNCIA OZ";
    } else if (pathname === '/l/futuro-da-busca') {
      document.title = "O Futuro da Busca Orgânica: SEO vs GEO | AGÊNCIA OZ";
    } else if (pathname === '/l/medicos') {
      document.title = "Modelo Landing Page para Médicos & Clínicas | AGÊNCIA OZ";
    } else if (pathname === '/l/advogados') {
      document.title = "Modelo Landing Page para Advogados & Escritórios | AGÊNCIA OZ";
    } else if (pathname === '/l/loja') {
      document.title = "Modelo Landing Page para Lojas & Comércios | AGÊNCIA OZ";
    } else if (pathname === '/l/artesanato') {
      document.title = "Modelo Landing Page para Artesanato & Ateliês | AGÊNCIA OZ";
    }
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div
      className={`flex flex-col min-h-screen font-sans bg-slate-50 text-slate-800 antialiased relative ${
        isAdminRoute ? 'border-0' : 'border-8 border-slate-900'
      }`}
      id="app-wrapper"
    >
      {/* Scroll Restorer */}
      <ScrollToTop />

      {/* Public Header (only visible on non-admin routes) */}
      {!isAdminRoute && <Header />}

      {/* Main Section Loops (WordPress templates equivalent) */}
      <main className="flex-grow flex flex-col" id="main-content">
        <Routes>
          {/* 1. Home - front-page.php */}
          <Route path="/" element={<Home />} />
          
          {/* 2. Sobre Nós */}
          <Route path="/sobre" element={<Sobre />} />
          
          {/* 3. Serviços Overview */}
          <Route path="/servicos" element={<Servicos />} />
          
          {/* 3.1. Solução 360 Graus */}
          <Route path="/360-graus" element={<Solucao360 />} />
          <Route path="/solucao-360" element={<Solucao360 />} />
          <Route path="/servicos/360-graus" element={<Solucao360 />} />
          
          {/* 3.5. Landing Pages */}
          <Route path="/servicos/landingpages" element={<ServicosLandingPages />} />
          
          {/* 3.8. Mídia, Divulgação & Assistente Virtual IA */}
          <Route path="/servicos/midia" element={<ServicosMidia />} />
          <Route path="/midia" element={<ServicosMidia />} />
          
          {/* 4. Hospedagem de Sites (planos e preços) */}
          <Route path="/servicos/hospedagem" element={<ServicosHospedagem />} />
          
          {/* 5. Desenvolvimento WordPress */}
          <Route path="/servicos/wordpress" element={<ServicosWordPress />} />
          
          {/* 6. SEO e Posicionamento */}
          <Route path="/servicos/seo" element={<ServicosSEO />} />
          
          {/* 6.5. PROVOX Streaming */}
          <Route path="/servicos/streaming" element={<ServicosProvox />} />
          <Route path="/servicos/streaming/como-criar-radio-web" element={<ComoCriarRadioWeb />} />
          <Route path="/guias/como-criar-radio-web" element={<ComoCriarRadioWeb />} />
          <Route path="/servicos/provox/briefing" element={<BriefingRadioWeb />} />
          <Route path="/servicos/provox/questionario" element={<BriefingRadioWeb />} />
          
          {/* 7. Clientes / Portfólio */}
          <Route path="/clientes" element={<Clientes />} />
          
          {/* 8. Blog Archive / Index */}
          <Route path="/blog" element={<BlogArchive />} />
          
          {/* 8.5. Blog Admin Management */}
          <Route path="/admin" element={<AdminBlog />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          
          {/* 9. Blog Single - single.php */}
          <Route path="/blog/:slug" element={<BlogSingle />} />
          
          {/* 10. FAQ / Dúvidas */}
          <Route path="/faq" element={<FAQ />} />
          
          {/* 11. Contato */}
          <Route path="/contato" element={<Contato />} />

          {/* 12. Promoção Especial */}
          <Route path="/promocao" element={<Promocao />} />

          {/* 13. Política de Privacidade */}
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />

          {/* 13.5. Solicitação de Orçamento */}
          <Route path="/orcamento" element={<Orcamento />} />

          {/* 14. LP Futuro da Busca (SEO vs GEO) */}
          <Route path="/l/futuro-da-busca" element={<LpFuturoBusca />} />

          {/* 15. Exemplos de Landing Pages Comerciais */}
          <Route path="/l/medicos" element={<LpMedicos />} />
          <Route path="/l/advogados" element={<LpAdvogados />} />
          <Route path="/l/loja" element={<LpLoja />} />
          <Route path="/l/artesanato" element={<LpArtesanato />} />

          {/* Fallback routing */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Public Footer (only visible on non-admin routes) */}
      {!isAdminRoute && <Footer />}

      {/* Agente Virtual OZZY Floating Assistant on public pages */}
      {!isAdminRoute && <OzzyChatWidget />}

      {/* Exclusive Floating Promo Pop-up and Modal on public pages */}
      {!isAdminRoute && <PromoPopup />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

