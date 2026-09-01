import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import Breadcrumbs from './Breadcrumbs';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setServicesDropdown(false);
    setAboutDropdown(false);
  }, [location]);

  // Handle scroll event to add background on header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+falar+com+um+consultor+da+OZ+Digital.";

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/clientes', label: 'Clientes' },
    { path: '/blog', label: 'Blog' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contato', label: 'Contato' },
  ];

  const services = [
    { path: '/servicos', label: 'Todos os Serviços' },
    { path: '/360-graus', label: 'Solução 360° (Auxílio Geral)' },
    { path: '/servicos/landingpages', label: 'Landingpages' },
    { path: '/servicos/midia', label: 'Mídia & Divulgação' },
    { path: '/servicos/hospedagem', label: 'Hospedagem Cloud' },
    { path: '/servicos/wordpress', label: 'Desenvolvimento WordPress' },
    { path: '/servicos/seo', label: 'SEO / GEO Posicionamento' },
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3' 
          : 'bg-white py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Breadcrumbs */}
          <div className="flex flex-col items-start justify-center">
            <Link 
              to="/" 
              className="flex items-center gap-3 mb-[20px]"
              id="header-logo"
            >
              <Logo className="hover:scale-[1.02] transition-transform" />
            </Link>
            <Breadcrumbs />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Menu Principal">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `font-medium text-sm transition-all hover:text-orange-500 ${
                  isActive ? 'text-orange-500 border-b-2 border-orange-500 pb-1 font-bold' : 'text-slate-600 pb-1 border-b-2 border-transparent'
                }`
              }
            >
              Início
            </NavLink>

            {/* Sobre Nós Dropdown */}
            <div className="relative group/dropdown">
              <button
                className={`flex items-center gap-1 font-medium text-sm transition-all hover:text-orange-500 focus:outline-none pb-1 border-b-2 ${
                  location.pathname === '/sobre' || location.pathname === '/clientes' ? 'text-orange-500 border-orange-500 font-bold' : 'text-slate-600 border-transparent'
                }`}
                onClick={() => setAboutDropdown(!aboutDropdown)}
                onMouseEnter={() => setAboutDropdown(true)}
              >
                Sobre Nós
                <ChevronDown className="h-4 w-4 transition-transform group-hover/dropdown:rotate-180" />
              </button>
              
              <div 
                className="absolute left-0 mt-2 w-52 rounded-xl bg-white shadow-xl border border-slate-200 py-2 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 transform translate-y-1 group-hover/dropdown:translate-y-0 z-50"
                onMouseLeave={() => setAboutDropdown(false)}
              >
                <NavLink
                  to="/sobre"
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-orange-50/60 hover:text-orange-600 ${
                      isActive ? 'text-orange-600 font-bold bg-orange-50/70' : 'text-slate-600'
                    }`
                  }
                >
                  Sobre a Agência
                </NavLink>
                <NavLink
                  to="/clientes"
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-orange-50/60 hover:text-orange-600 ${
                      isActive ? 'text-orange-600 font-bold bg-orange-50/70' : 'text-slate-600'
                    }`
                  }
                >
                  Nossos Clientes
                </NavLink>
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="relative group/dropdown">
              <button
                className={`flex items-center gap-1 font-medium text-sm transition-all hover:text-orange-500 focus:outline-none pb-1 border-b-2 ${
                  location.pathname.startsWith('/servicos') ? 'text-orange-500 border-orange-500 font-bold' : 'text-slate-600 border-transparent'
                }`}
                onClick={() => setServicesDropdown(!servicesDropdown)}
                onMouseEnter={() => setServicesDropdown(true)}
              >
                Serviços
                <ChevronDown className="h-4 w-4 transition-transform group-hover/dropdown:rotate-180" />
              </button>
              
              <div 
                className="absolute left-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-slate-200 py-2 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 transform translate-y-1 group-hover/dropdown:translate-y-0 z-50"
                onMouseLeave={() => setServicesDropdown(false)}
              >
                {services.map((service) => (
                  <NavLink
                    key={service.path}
                    to={service.path}
                    end={service.path === '/servicos'}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-orange-50/60 hover:text-orange-600 ${
                        isActive ? 'text-orange-600 font-bold bg-orange-50/70' : 'text-slate-600'
                      }`
                    }
                  >
                    {service.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* 360º Direct Menu Item */}
            <NavLink 
              to="/360-graus" 
              className={({ isActive }) => 
                `font-semibold text-sm transition-all hover:text-orange-500 flex items-center gap-1 ${
                  isActive ? 'text-orange-500 border-b-2 border-orange-500 pb-1 font-bold' : 'text-slate-600 pb-1 border-b-2 border-transparent'
                }`
              }
            >
              <span>360º</span>
            </NavLink>

            <NavLink 
              to="/blog" 
              className={({ isActive }) => 
                `font-medium text-sm transition-all hover:text-orange-500 ${
                  isActive ? 'text-orange-500 border-b-2 border-orange-500 pb-1 font-bold' : 'text-slate-600 pb-1 border-b-2 border-transparent'
                }`
              }
            >
              Blog
            </NavLink>

            <NavLink 
              to="/contato" 
              className={({ isActive }) => 
                `font-medium text-sm transition-all hover:text-orange-500 ${
                  isActive ? 'text-orange-500 border-b-2 border-orange-500 pb-1 font-bold' : 'text-slate-600 pb-1 border-b-2 border-transparent'
                }`
              }
            >
              Contato
            </NavLink>

            <NavLink 
              to="/promocao" 
              className={({ isActive }) => 
                `font-bold text-sm transition-all text-orange-600 hover:text-orange-700 pb-1 border-b-2 flex items-center gap-1.5 ${
                  isActive ? 'border-orange-500' : 'border-transparent hover:border-orange-500'
                }`
              }
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Promoção
            </NavLink>
          </nav>

          {/* Action block with Local Office Metadata & WhatsApp CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="text-right hidden xl:block pr-1">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Canoas, RS</p>
              <p className="text-sm font-bold text-slate-700">(48) 99198-4678</p>
            </div>

            <Link
              to="/orcamento"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-orange-100 transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
              id="header-cta-whatsapp"
            >
              <MessageSquare className="h-4 w-4" />
              Orçamento
            </Link>
          </div>

          {/* Mobile Hamburguer Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Abrir menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white shadow-inner animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-base font-medium ${
                  isActive ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              Início
            </NavLink>
            {/* Sobre Nós for Mobile */}
            <div className="py-1 border-b border-slate-50 my-1">
              <span className="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                Sobre Nós
              </span>
              <NavLink
                to="/sobre"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-6 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'text-orange-600 font-bold bg-orange-50/70' : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'
                  }`
                }
              >
                Sobre a Agência
              </NavLink>
              <NavLink
                to="/clientes"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-6 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'text-orange-600 font-bold bg-orange-50/70' : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'
                  }`
                }
              >
                Nossos Clientes
              </NavLink>
            </div>
            
            {/* Services for Mobile (flat list to keep simple) */}
            <div className="py-1 border-b border-slate-50 my-1">
              <span className="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                Serviços
              </span>
              {services.map((service) => (
                <NavLink
                  key={service.path}
                  to={service.path}
                  end={service.path === '/servicos'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-6 py-2 rounded-lg text-sm font-medium ${
                      isActive ? 'text-orange-600 font-bold bg-orange-50/70' : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'
                    }`
                  }
                >
                  {service.label}
                </NavLink>
              ))}
            </div>
            
            {/* 360º Mobile Item */}
            <NavLink
              to="/360-graus"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-base font-semibold flex items-center justify-between ${
                  isActive ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              <span>360º Solução Completa</span>
              <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full uppercase">All-in-One</span>
            </NavLink>

            <NavLink
              to="/blog"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-base font-medium ${
                  isActive ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/contato"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-base font-medium ${
                  isActive ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              Contato
            </NavLink>

            <NavLink
              to="/promocao"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `w-full text-left block px-3 py-2.5 rounded-lg text-base font-bold text-orange-600 flex items-center gap-2 cursor-pointer ${
                  isActive ? 'bg-orange-50 font-black' : 'hover:bg-orange-50'
                }`
              }
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Promoção Especial
            </NavLink>

            <div className="pt-4 border-t border-slate-100">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded-xl font-bold text-base shadow-md"
              >
                <MessageSquare className="h-5 w-5" />
                Conversar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
