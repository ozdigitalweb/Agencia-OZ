import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  // Don't render on home page
  if (pathname === '/') {
    return null;
  }

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [{ label: 'Início', path: '/' }];

    if (pathname === '/sobre') {
      items.push({ label: 'Sobre Nós', path: '/sobre' });
    } else if (pathname === '/clientes') {
      items.push({ label: 'Clientes', path: '/clientes' });
    } else if (pathname === '/blog') {
      items.push({ label: 'Blog', path: '/blog' });
    } else if (pathname.startsWith('/blog/')) {
      items.push({ label: 'Blog', path: '/blog' });
      items.push({ label: 'Artigo', path: pathname });
    } else if (pathname === '/faq') {
      items.push({ label: 'FAQ', path: '/faq' });
    } else if (pathname === '/contato') {
      items.push({ label: 'Contato', path: '/contato' });
    } else if (pathname === '/promocao') {
      items.push({ label: 'Promoção', path: '/promocao' });
    } else if (pathname === '/orcamento') {
      items.push({ label: 'Orçamento', path: '/orcamento' });
    } else if (pathname === '/politica-privacidade') {
      items.push({ label: 'Privacidade', path: '/politica-privacidade' });
    } else if (pathname === '/servicos') {
      items.push({ label: 'Serviços', path: '/servicos' });
    } else if (pathname === '/servicos/landingpages') {
      items.push({ label: 'Serviços', path: '/servicos' });
      items.push({ label: 'Landing Pages', path: '/servicos/landingpages' });
    } else if (pathname === '/servicos/hospedagem') {
      items.push({ label: 'Serviços', path: '/servicos' });
      items.push({ label: 'Hospedagem', path: '/servicos/hospedagem' });
    } else if (pathname === '/servicos/wordpress') {
      items.push({ label: 'Serviços', path: '/servicos' });
      items.push({ label: 'WordPress', path: '/servicos/wordpress' });
    } else if (pathname === '/servicos/seo') {
      items.push({ label: 'Serviços', path: '/servicos' });
      items.push({ label: 'SEO & GEO', path: '/servicos/seo' });
    } else if (pathname === '/servicos/provox') {
      items.push({ label: 'Serviços', path: '/servicos' });
      items.push({ label: 'PROVOX', path: '/servicos/provox' });
    } else if (pathname === '/l/medicos') {
      items.push({ label: 'Serviços', path: '/servicos' });
      items.push({ label: 'Landing Pages', path: '/servicos/landingpages' });
      items.push({ label: 'Demo Médicos', path: '/l/medicos' });
    } else if (pathname === '/l/advogados') {
      items.push({ label: 'Serviços', path: '/servicos' });
      items.push({ label: 'Landing Pages', path: '/servicos/landingpages' });
      items.push({ label: 'Demo Advogados', path: '/l/advogados' });
    } else if (pathname === '/l/loja') {
      items.push({ label: 'Serviços', path: '/servicos' });
      items.push({ label: 'Landing Pages', path: '/servicos/landingpages' });
      items.push({ label: 'Demo Loja', path: '/l/loja' });
    } else if (pathname === '/l/artesanato') {
      items.push({ label: 'Serviços', path: '/servicos' });
      items.push({ label: 'Landing Pages', path: '/servicos/landingpages' });
      items.push({ label: 'Demo Artesanato', path: '/l/artesanato' });
    } else if (pathname === '/l/futuro-da-busca') {
      items.push({ label: 'Serviços', path: '/servicos' });
      items.push({ label: 'Futuro da Busca', path: '/l/futuro-da-busca' });
    } else {
      const pathSegments = pathname.split('/').filter(Boolean);
      let currentPath = '';
      pathSegments.forEach((segment) => {
        currentPath += `/${segment}`;
        const formattedLabel = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        items.push({ label: formattedLabel, path: currentPath });
      });
    }

    return items;
  };

  const breadcrumbs = getBreadcrumbItems();

  return (
    <nav aria-label="Breadcrumb" className="inline-flex items-center text-[11px] font-medium pt-0.5 animate-fade-in">
      <ol className="inline-flex items-center gap-1 flex-wrap">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={item.path} className="inline-flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className="h-2.5 w-2.5 text-orange-300 shrink-0" />
              )}
              {isLast ? (
                <span className="text-orange-500/90 font-semibold truncate max-w-[130px] sm:max-w-[180px]" title={item.label}>
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-orange-400/80 hover:text-orange-600 transition-colors flex items-center gap-1"
                >
                  {index === 0 && <Home className="h-2.5 w-2.5 text-orange-400/90" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
