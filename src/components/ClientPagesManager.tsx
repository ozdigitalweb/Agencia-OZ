import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Copy, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Building2, 
  Tag, 
  Phone, 
  FileText, 
  Server, 
  X, 
  Save, 
  Eye, 
  Clock, 
  Filter,
  Check,
  RefreshCw,
  FolderPlus
} from 'lucide-react';
import { clientPagesApi, ClientPage } from '../services/clientPagesApi';

interface ClientPagesManagerProps {
  onShowToast: (type: 'success' | 'error', message: string) => void;
}

export default function ClientPagesManager({ onShowToast }: ClientPagesManagerProps) {
  const [pages, setPages] = useState<ClientPage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<ClientPage, 'id' | 'createdAt' | 'updatedAt'>>({
    clientName: '',
    pageTitle: '',
    slug: '',
    category: 'Landing Page',
    segment: '',
    status: 'active',
    heroHeadline: '',
    heroSubheadline: '',
    ctaText: 'Falar no WhatsApp',
    whatsappNumber: '5548991984678',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&fit=crop&w=600&q=70',
    clientNotes: '',
    hostingPlan: 'VPS Cloud cPanel Dedicado'
  });

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = () => {
    const data = clientPagesApi.getClientPages();
    setPages(data);
  };

  // Filter logic
  const filteredPages = pages.filter(page => {
    const matchesSearch = 
      page.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.pageTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.segment.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || page.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || page.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenNewModal = () => {
    setEditingPageId(null);
    setFormData({
      clientName: '',
      pageTitle: '',
      slug: '',
      category: 'Landing Page',
      segment: '',
      status: 'active',
      heroHeadline: '',
      heroSubheadline: '',
      ctaText: 'Falar no WhatsApp',
      whatsappNumber: '5548991984678',
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&fit=crop&w=600&q=70',
      clientNotes: '',
      hostingPlan: 'VPS Cloud cPanel Dedicado'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (page: ClientPage) => {
    setEditingPageId(page.id);
    setFormData({
      clientName: page.clientName,
      pageTitle: page.pageTitle,
      slug: page.slug,
      category: page.category,
      segment: page.segment,
      status: page.status,
      heroHeadline: page.heroHeadline,
      heroSubheadline: page.heroSubheadline,
      ctaText: page.ctaText,
      whatsappNumber: page.whatsappNumber || '',
      featuredImage: page.featuredImage,
      clientNotes: page.clientNotes,
      hostingPlan: page.hostingPlan || ''
    });
    setIsModalOpen(true);
  };

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.clientName.trim() || !formData.pageTitle.trim() || !formData.slug.trim()) {
      onShowToast('error', 'Preencha o nome do cliente, título da página e URL/slug.');
      return;
    }

    if (editingPageId) {
      clientPagesApi.updateClientPage(editingPageId, formData);
      onShowToast('success', `Página de "${formData.clientName}" atualizada com sucesso!`);
    } else {
      clientPagesApi.addClientPage(formData);
      onShowToast('success', `Página para "${formData.clientName}" criada com sucesso!`);
    }

    setIsModalOpen(false);
    loadPages();
  };

  const handleDelete = (page: ClientPage) => {
    if (window.confirm(`Tem certeza que deseja remover a página de "${page.clientName}"?`)) {
      clientPagesApi.deleteClientPage(page.id);
      loadPages();
      onShowToast('success', `Página de "${page.clientName}" removida.`);
    }
  };

  const handleDuplicate = (page: ClientPage) => {
    const duplicated = clientPagesApi.duplicateClientPage(page.id);
    if (duplicated) {
      loadPages();
      onShowToast('success', `Cópia criada para "${page.clientName}".`);
    }
  };

  const handleToggleStatus = (page: ClientPage) => {
    const nextStatus = page.status === 'active' ? 'draft' : 'active';
    clientPagesApi.updateClientPage(page.id, { status: nextStatus });
    loadPages();
    onShowToast('success', `Status de "${page.clientName}" alterado para ${nextStatus === 'active' ? 'No Ar / Ativa' : 'Rascunho'}.`);
  };

  // Metrics
  const totalPages = pages.length;
  const activePages = pages.filter(p => p.status === 'active').length;
  const draftPages = pages.filter(p => p.status === 'draft').length;

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Metric Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border-2 border-slate-100 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Total Gerenciado</span>
            <Layers className="h-4 w-4 text-blue-600" />
          </div>
          <div className="font-display text-3xl font-black text-slate-900">{totalPages}</div>
          <p className="text-[11px] text-slate-500 font-medium">Páginas & Landings no OZGESTOR</p>
        </div>

        <div className="bg-emerald-50/60 border-2 border-emerald-100 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-800">
            <span>Páginas No Ar</span>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="font-display text-3xl font-black text-emerald-900">{activePages}</div>
          <p className="text-[11px] text-emerald-700 font-medium">Ativas e Acessíveis aos Clientes</p>
        </div>

        <div className="bg-amber-50/60 border-2 border-amber-100 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-800">
            <span>Em Rascunho</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="font-display text-3xl font-black text-amber-900">{draftPages}</div>
          <p className="text-[11px] text-amber-700 font-medium">Projetos em Construção</p>
        </div>

        <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-5 shadow-sm space-y-1 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-orange-400">
            <span>Ação Rápida</span>
            <Sparkles className="h-4 w-4 text-orange-400" />
          </div>
          <button
            onClick={handleOpenNewModal}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 mt-2"
          >
            <Plus className="h-4 w-4" /> Nova Página de Cliente
          </button>
        </div>

      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
        
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por cliente, título, URL ou segmento..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span>Categoria:</span>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:border-blue-600"
          >
            <option value="all">Todas as Categorias</option>
            <option value="Landing Page">Landing Page</option>
            <option value="Portal & Site Institucional">Portal & Site Institucional</option>
            <option value="Hotsite">Hotsite</option>
            <option value="E-commerce / Vitrine">E-commerce / Vitrine</option>
            <option value="Parceria Estratégica / Portfólio">Parceria Estratégica / Portfólio</option>
            <option value="Outro">Outro</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 ml-1">
            <span>Status:</span>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:border-blue-600"
          >
            <option value="all">Todos os Status</option>
            <option value="active">No Ar / Ativa</option>
            <option value="draft">Em Rascunho</option>
            <option value="maintenance">Em Manutenção</option>
          </select>

          <button
            onClick={handleOpenNewModal}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <Plus className="h-3.5 w-3.5" /> Adicionar Página
          </button>

        </div>

      </div>

      {/* Pages Grid */}
      {filteredPages.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Globe className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-extrabold text-slate-900 text-lg">Nenhuma página de cliente encontrada</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tente alterar os filtros de busca ou cadastre uma nova página de cliente para seu portfólio no OZGESTOR.
            </p>
          </div>
          <button
            onClick={handleOpenNewModal}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Cadastrar Primeira Página
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPages.map((page) => (
            <div
              key={page.id}
              className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Top Image Preview & Status Badge */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={page.featuredImage}
                    alt={page.pageTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&fit=crop&w=600&q=70');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                  
                  {/* Status Indicator */}
                  <div className="absolute top-3 left-3">
                    <button
                      onClick={() => handleToggleStatus(page)}
                      className={`text-[10px] font-mono font-extrabold uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 transition-transform active:scale-95 ${
                        page.status === 'active'
                          ? 'bg-emerald-500 text-white'
                          : page.status === 'draft'
                          ? 'bg-amber-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}
                      title="Clique para alternar status"
                    >
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      {page.status === 'active' ? 'No Ar / Ativa' : page.status === 'draft' ? 'Em Rascunho' : 'Manutenção'}
                    </button>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-slate-200 px-2.5 py-1 rounded-lg border border-white/20">
                      {page.category}
                    </span>
                  </div>

                  {/* Client Badge on Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-orange-400 block drop-shadow-sm">
                      {page.clientName}
                    </span>
                    <h4 className="font-display font-black text-base text-white truncate drop-shadow-md">
                      {page.pageTitle}
                    </h4>
                  </div>

                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3.5">
                  
                  {/* Slug / Link Box */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-700 font-bold truncate max-w-[210px]" title={page.slug}>
                      {page.slug}
                    </span>
                    {page.slug.startsWith('http') ? (
                      <a
                        href={page.slug}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 shrink-0"
                      >
                        <span>Visitar</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <a
                        href={page.slug}
                        className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 shrink-0"
                      >
                        <span>Ver Rota</span>
                        <Eye className="h-3 w-3" />
                      </a>
                    )}
                  </div>

                  {/* Details Info */}
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                      <span className="font-medium">Segmento: <strong>{page.segment}</strong></span>
                    </div>

                    {page.hostingPlan && (
                      <div className="flex items-center gap-2">
                        <Server className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <span className="font-medium">Plano: <strong>{page.hostingPlan}</strong></span>
                      </div>
                    )}

                    {page.heroHeadline && (
                      <p className="text-slate-700 text-xs italic bg-slate-50/80 p-2.5 rounded-lg border border-slate-100 line-clamp-2">
                        &quot;{page.heroHeadline}&quot;
                      </p>
                    )}
                  </div>

                  {/* Client Notes / Requisitos */}
                  {page.clientNotes && (
                    <div className="text-[11px] text-slate-500 bg-amber-50/60 border border-amber-200/80 p-2.5 rounded-xl space-y-1">
                      <span className="font-bold text-amber-900 block flex items-center gap-1">
                        <FileText className="h-3 w-3 text-amber-600" /> Obs / Requisitos do Cliente:
                      </span>
                      <p className="line-clamp-2 text-amber-950">{page.clientNotes}</p>
                    </div>
                  )}

                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 flex items-center justify-between gap-2">
                
                <button
                  onClick={() => handleOpenEditModal(page)}
                  className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <Edit3 className="h-3.5 w-3.5 text-blue-600" /> Editar
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleDuplicate(page)}
                    className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg transition-colors shadow-2xs"
                    title="Duplicar como modelo"
                  >
                    <Copy className="h-3.5 w-3.5 text-slate-600" />
                  </button>

                  <button
                    onClick={() => handleDelete(page)}
                    className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg transition-colors shadow-2xs"
                    title="Excluir página"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT CLIENT PAGE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-2xl overflow-hidden shadow-2xl my-8">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-orange-400 bg-orange-500/20 px-2.5 py-0.5 rounded-md border border-orange-500/30">
                  OZGESTOR — Páginas de Clientes
                </span>
                <h3 className="font-display font-extrabold text-xl text-white">
                  {editingPageId ? 'Editar Página de Cliente' : 'Cadastrar Nova Página de Cliente'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSavePage} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              
              {/* Row 1: Client Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Nome do Cliente / Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Ex: CSSGAPA Canoas, RN Com Digital..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Categoria do Projeto *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                  >
                    <option value="Landing Page">Landing Page</option>
                    <option value="Portal & Site Institucional">Portal & Site Institucional</option>
                    <option value="Hotsite">Hotsite</option>
                    <option value="E-commerce / Vitrine">E-commerce / Vitrine</option>
                    <option value="Parceria Estratégica / Portfólio">Parceria Estratégica / Portfólio</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Page Title & URL/Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Título da Página / Projeto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pageTitle}
                    onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                    placeholder="Ex: Portal Oficial do CSSGAPA..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    URL / Slug da Página *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="Ex: https://cssgapa.com.br ou /l/medicos"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Row 3: Segment & Status & Hosting Plan */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Segmento / Nicho
                  </label>
                  <input
                    type="text"
                    value={formData.segment}
                    onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                    placeholder="Ex: Aviação, Saúde, Direito..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Status da Página
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="active">No Ar / Ativa</option>
                    <option value="draft">Em Rascunho</option>
                    <option value="maintenance">Em Manutenção</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Plano de Hospedagem
                  </label>
                  <input
                    type="text"
                    value={formData.hostingPlan || ''}
                    onChange={(e) => setFormData({ ...formData, hostingPlan: e.target.value })}
                    placeholder="Ex: VPS Cloud cPanel..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Row 4: Hero Headline & Subheadline */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-600 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-orange-500" />
                  Copywriting Principal (Destaque da Página)
                </h4>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Chamada Principal (Hero Headline)
                  </label>
                  <input
                    type="text"
                    value={formData.heroHeadline}
                    onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                    placeholder="Ex: Seja um Associado CSSGAPA - Tradição e Lazer em Canoas/RS"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Subtítulo / Descrição da Oferta
                  </label>
                  <textarea
                    rows={2}
                    value={formData.heroSubheadline}
                    onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                    placeholder="Ex: Estrutura completa para os Suboficiais e Sargentos da Guarnição de Aeronáutica..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Row 5: CTA Text & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Texto do Botão de Conversão (CTA)
                  </label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    placeholder="Ex: Seja um Associado - Clique Aqui"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    WhatsApp de Atendimento
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappNumber || ''}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="Ex: 5548991984678"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Row 6: Image URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  URL da Imagem / Foto Principal da Fachada
                </label>
                <input
                  type="text"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  placeholder="Cole o caminho da imagem..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Row 7: Client Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Observações & Requisitos do Cliente
                </label>
                <textarea
                  rows={3}
                  value={formData.clientNotes}
                  onChange={(e) => setFormData({ ...formData, clientNotes: e.target.value })}
                  placeholder="Especificações técnicas, preferências visuais ou histórico do contrato do cliente..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {editingPageId ? 'Salvar Alterações' : 'Criar Página de Cliente'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
