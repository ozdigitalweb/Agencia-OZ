import React, { useState, useEffect } from 'react';
import {
  FileText,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Search,
  Filter,
  Layers,
  Copy,
  ExternalLink,
  MessageCircle,
  Save,
  RotateCcw,
  Sliders,
  Calendar,
  Clock,
  ShieldCheck,
  Check,
  Zap,
  Tag,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { proposalsApi } from '../services/proposalsApi';
import { ProposalConfig, ProposalPackage, ProposalGeneralSettings } from '../types/proposals';

interface ProposalsManagerProps {
  onNotify?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export default function ProposalsManager({ onNotify }: ProposalsManagerProps) {
  const [config, setConfig] = useState<ProposalConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters & Tabs
  const [activeTab, setActiveTab] = useState<'packages' | 'settings' | 'simulator'>('packages');
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal for Edit / Create Package
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<Partial<ProposalPackage> | null>(null);
  const [deliverableInput, setDeliverableInput] = useState('');

  // Simulator State
  const [simSelectedPkgId, setSimSelectedPkgId] = useState<string>('solucao_360');
  const [simClientName, setSimClientName] = useState('Marcelo Krauthein');
  const [simCompanyName, setSimCompanyName] = useState('Tanque Soft');
  const [simCustomSetup, setSimCustomSetup] = useState<number | ''>('');
  const [simCustomMonthly, setSimCustomMonthly] = useState<number | ''>('');
  const [copiedText, setCopiedText] = useState(false);

  // Load config on mount
  useEffect(() => {
    loadConfig();
  }, []);

  const notify = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (onNotify) {
      onNotify(msg, type);
    } else {
      if (type === 'error') alert(`❌ ${msg}`);
      else alert(`✅ ${msg}`);
    }
  };

  const loadConfig = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await proposalsApi.getConfig();
      setConfig(data);
      if (data.packages.length > 0 && !simSelectedPkgId) {
        setSimSelectedPkgId(data.packages[0].id);
      }
    } catch (err: any) {
      setError(err.message || 'Falha ao carregar configurações de propostas.');
    } finally {
      setLoading(false);
    }
  };

  // Open Edit Package Modal
  const handleOpenEditModal = (pkg?: ProposalPackage) => {
    if (pkg) {
      setEditingPkg({ ...pkg, deliverables: [...pkg.deliverables] });
    } else {
      setEditingPkg({
        id: '',
        title: '',
        category: 'Solução 360°',
        setupPrice: 1500,
        monthlyPrice: 49.90,
        deliveryDays: '7 a 15 dias úteis',
        paymentTerms: 'PIX com 10% de desconto ou até 12x no cartão de crédito',
        badge: 'Novo Pacote',
        popular: false,
        deliverables: [
          'Site WordPress com Nota 90+ no PageSpeed',
          'Hospedagem Cloud cPanel NVMe Dedicada',
          'E-mails Corporativos Blindados com SPF/DKIM'
        ],
        notes: '',
        active: true,
        order: (config?.packages?.length || 0) + 1
      });
    }
    setDeliverableInput('');
    setIsModalOpen(true);
  };

  // Save Package in Modal
  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg || !editingPkg.title) {
      notify('O título do pacote é obrigatório.', 'error');
      return;
    }

    setSaving(true);
    try {
      if (editingPkg.id && config?.packages.some(p => p.id === editingPkg.id)) {
        await proposalsApi.updatePackage(editingPkg.id, editingPkg);
        notify(`Pacote "${editingPkg.title}" atualizado com sucesso!`);
      } else {
        await proposalsApi.createPackage(editingPkg as any);
        notify(`Novo pacote "${editingPkg.title}" cadastrado com sucesso!`);
      }
      setIsModalOpen(false);
      setEditingPkg(null);
      await loadConfig();
    } catch (err: any) {
      notify(err.message || 'Erro ao salvar pacote.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Toggle active status
  const handleToggleActive = async (pkg: ProposalPackage) => {
    try {
      const updated = await proposalsApi.updatePackage(pkg.id, { active: !pkg.active });
      notify(`Pacote ${updated.active ? 'ativado' : 'desativado'} com sucesso!`);
      await loadConfig();
    } catch (err: any) {
      notify(err.message || 'Erro ao alterar status do pacote.', 'error');
    }
  };

  // Delete package
  const handleDeletePackage = async (id: string, title: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir o pacote "${title}"?`)) {
      return;
    }
    try {
      await proposalsApi.deletePackage(id);
      notify(`Pacote "${title}" removido com sucesso.`);
      await loadConfig();
    } catch (err: any) {
      notify(err.message || 'Erro ao excluir pacote.', 'error');
    }
  };

  // Save General Settings
  const handleSaveGeneralSettings = async (settings: ProposalGeneralSettings) => {
    setSaving(true);
    try {
      await proposalsApi.updateConfig({ generalSettings: settings });
      notify('Configurações gerais de propostas salvas com sucesso!');
      await loadConfig();
    } catch (err: any) {
      notify(err.message || 'Erro ao salvar configurações.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Reset to Defaults
  const handleResetDefaults = async () => {
    if (!window.confirm('Atenção: Deseja restaurar a tabela de preços e propostas para os padrões de fábrica da AGÊNCIA OZ?')) {
      return;
    }
    setLoading(true);
    try {
      const res = await proposalsApi.resetDefaults();
      setConfig(res);
      notify('Tabela de propostas restaurada para os padrões oficiais!');
    } catch (err: any) {
      notify(err.message || 'Erro ao restaurar padrões.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Add deliverable item
  const handleAddDeliverable = () => {
    if (!deliverableInput.trim() || !editingPkg) return;
    const current = editingPkg.deliverables || [];
    setEditingPkg({
      ...editingPkg,
      deliverables: [...current, deliverableInput.trim()]
    });
    setDeliverableInput('');
  };

  const handleRemoveDeliverable = (index: number) => {
    if (!editingPkg || !editingPkg.deliverables) return;
    const updated = editingPkg.deliverables.filter((_, i) => i !== index);
    setEditingPkg({ ...editingPkg, deliverables: updated });
  };

  if (loading && !config) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400 space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
        <p className="text-sm font-medium">Carregando Tabela de Preços & Propostas Comerciais...</p>
      </div>
    );
  }

  const packages = config?.packages || [];
  const categories = ['all', ...Array.from(new Set(packages.map(p => p.category)))];

  const filteredPackages = packages.filter(p => {
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchSearch = !searchFilter ||
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (p.notes && p.notes.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchCat && matchSearch;
  });

  // Calculate Metrics
  const activePackagesCount = packages.filter(p => p.active).length;
  const avgSetup = packages.length > 0
    ? Math.round(packages.filter(p => p.setupPrice > 0).reduce((acc, p) => acc + p.setupPrice, 0) / (packages.filter(p => p.setupPrice > 0).length || 1))
    : 0;
  const popularPkg = packages.find(p => p.popular) || packages[0];

  // Simulator Active Package
  const selectedSimPkg = packages.find(p => p.id === simSelectedPkgId) || packages[0];
  const simSetupValue = simCustomSetup !== '' ? Number(simCustomSetup) : (selectedSimPkg?.setupPrice ?? 1890);
  const simMonthlyValue = simCustomMonthly !== '' ? Number(simCustomMonthly) : (selectedSimPkg?.monthlyPrice ?? 49.90);
  const pixDiscount = config?.generalSettings?.defaultDiscountPixPercent || 10;
  const simSetupPix = simSetupValue > 0 ? Math.round(simSetupValue * (1 - pixDiscount / 100)) : 0;
  const targetWhatsApp = config?.generalSettings?.defaultWhatsApp || '5548991984678';

  const simulatedProposalText = `*PROPOSTA COMERCIAL AGÊNCIA OZ* 🚀
━━━━━━━━━━━━━━━━━━━━
📄 *Serviço:* ${selectedSimPkg?.title || 'Solução Digital'}
👤 *Cliente:* ${simClientName || 'Cliente'}
🏢 *Empresa:* ${simCompanyName || 'Sua Empresa'}
📅 *Data:* ${new Date().toLocaleDateString('pt-BR')} (Válida por ${config?.generalSettings?.proposalValidityDays || 7} dias)

💰 *INVESTIMENTO:*
• *Taxa de Implantação / Setup:* ${simSetupValue === 0 ? 'Grátis (R$ 0,00)' : `R$ ${simSetupValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
${simSetupValue > 0 ? `👉 *À vista no PIX com ${pixDiscount}% OFF:* R$ ${simSetupPix.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n💳 *Cartão de Crédito:* em até 12x` : ''}
• *Manutenção & Hospedagem NVMe:* ${simMonthlyValue === 0 ? 'Sem mensalidade' : `R$ ${simMonthlyValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês`}

⏱️ *Prazo de Entrega:* ${selectedSimPkg?.deliveryDays || '7 a 15 dias úteis'}

📦 *ITENS INCLUSOS:*
${(selectedSimPkg?.deliverables || []).map(d => `✅ ${d}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━
📞 *Atendimento & Fechamento Direto:*
https://wa.me/${targetWhatsApp}?text=${encodeURIComponent(`Olá! Gostaria de aprovar a proposta de ${selectedSimPkg?.title} para a empresa ${simCompanyName}.`)}

_${config?.generalSettings?.defaultFooterNotes || 'AGÊNCIA OZ - Transformando presença digital em vendas reais.'}_`;

  const handleCopyProposal = () => {
    navigator.clipboard.writeText(simulatedProposalText);
    setCopiedText(true);
    notify('Proposta formatada copiada para a área de transferência!');
    setTimeout(() => setCopiedText(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-orange-500/20 to-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Gestor Comercial & Precificação OZZY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tabela de Preços & Propostas Comerciais
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Gerencie os pacotes de serviços, valores de setup (ex: Solução 360°, LPs, Hospedagem cPanel), mensalidades, entregáveis e o gerador de propostas que o <strong>OZZY</strong> utiliza para orçamentos automáticos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleOpenEditModal()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-xs uppercase tracking-wider text-white transition-all shadow-lg shadow-orange-500/30 hover:scale-[1.02] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Pacote</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Restaurar Tabela Padrão Oficial"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Padrões</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-8 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Pacotes Ativos</span>
            <div className="flex items-center gap-2 mt-1">
              <Layers className="w-4 h-4 text-orange-400" />
              <span className="text-xl font-bold text-white">{activePackagesCount} / {packages.length}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Ticket Médio Setup</span>
            <div className="flex items-center gap-2 mt-1">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="text-xl font-bold text-white">R$ {avgSetup.toLocaleString('pt-BR')}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Desconto PIX</span>
            <div className="flex items-center gap-2 mt-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xl font-bold text-white">{config?.generalSettings?.defaultDiscountPixPercent || 10}% OFF</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Carro-Chefe</span>
            <div className="flex items-center gap-2 mt-1 truncate">
              <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="text-xs font-bold text-orange-300 truncate">{popularPkg?.title.split('(')[0] || 'Solução 360'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm">
        <button
          onClick={() => setActiveTab('packages')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'packages'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4 text-orange-400" />
          <span>Tabela de Pacotes & Serviços ({packages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'simulator'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Simulador & Gerador de Proposta</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'settings'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Sliders className="w-4 h-4 text-orange-400" />
          <span>Configurações Gerais & WhatsApp</span>
        </button>
      </div>

      {/* TAB 1: PACKAGES LIST */}
      {activeTab === 'packages' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar pacote por nome ou ID..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Categoria:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-orange-500"
              >
                <option value="all">Todas as Categorias</option>
                {categories.filter(c => c !== 'all').map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredPackages.map((pkg) => {
              const isFreeSetup = pkg.setupPrice === 0;
              const isNoMonthly = pkg.monthlyPrice === 0;

              return (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl relative ${
                    pkg.active
                      ? pkg.popular
                        ? 'border-orange-500/80 ring-2 ring-orange-500/10'
                        : 'border-slate-200 hover:border-orange-400'
                      : 'border-slate-200 opacity-60 bg-slate-50'
                  }`}
                >
                  {/* Top Badge */}
                  <div className="p-5 pb-0">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        {pkg.category}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {pkg.popular && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-extrabold shadow-sm">
                            <Sparkles className="w-3 h-3" />
                            <span>Carro-Chefe</span>
                          </span>
                        )}
                        {pkg.badge && !pkg.popular && (
                          <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold">
                            {pkg.badge}
                          </span>
                        )}
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${pkg.active ? 'bg-emerald-500' : 'bg-slate-300'}`}
                          title={pkg.active ? 'Pacote Ativo' : 'Pacote Inativo'}
                        />
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {pkg.title}
                    </h3>
                    <code className="text-[10px] font-mono text-slate-400 block mt-0.5">
                      ID: {pkg.id}
                    </code>
                  </div>

                  {/* Pricing Box */}
                  <div className="px-5 py-4 my-3 bg-slate-50 border-y border-slate-100">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Valor de Setup (Implantação)
                        </span>
                        <div className="text-xl font-black text-slate-900 mt-0.5">
                          {isFreeSetup ? (
                            <span className="text-emerald-700">Grátis (R$ 0,00)</span>
                          ) : (
                            <span className="text-orange-600">
                              R$ {pkg.setupPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Mensalidade
                        </span>
                        <div className="text-sm font-bold text-slate-700 mt-0.5">
                          {isNoMonthly ? (
                            <span className="text-slate-500">Sem mensalidade</span>
                          ) : (
                            <span>R$ {pkg.monthlyPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 font-medium border-t border-slate-200/60 pt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{pkg.deliveryDays}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 truncate max-w-[140px]" title={pkg.paymentTerms}>
                        {pkg.paymentTerms}
                      </span>
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="px-5 pb-4 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Entregáveis Inclusos ({pkg.deliverables.length}):
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {pkg.deliverables.slice(0, 4).map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                      {pkg.deliverables.length > 4 && (
                        <li className="text-[11px] font-semibold text-orange-600 pl-5">
                          + {pkg.deliverables.length - 4} outros itens inclusos...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Bottom Actions */}
                  <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleToggleActive(pkg)}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all ${
                        pkg.active
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-slate-200 border-slate-300 text-slate-600 hover:bg-slate-300'
                      }`}
                    >
                      {pkg.active ? '✓ Ativo no OZZY' : 'Inativo'}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSimSelectedPkgId(pkg.id);
                          setActiveTab('simulator');
                        }}
                        className="p-2 rounded-xl text-slate-500 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                        title="Simular Proposta Comercial deste Pacote"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleOpenEditModal(pkg)}
                        className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Editar Valores e Entregáveis"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeletePackage(pkg.id, pkg.title)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Excluir Pacote"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPackages.length === 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 space-y-3">
              <Layers className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">Nenhum pacote encontrado com os filtros atuais.</p>
              <button
                onClick={() => { setSearchFilter(''); setCategoryFilter('all'); }}
                className="text-xs font-bold text-orange-600 hover:underline"
              >
                Limpar filtros de busca
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SIMULATOR & PROPOSAL GENERATOR */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: Parameters */}
          <div className="lg:col-span-5 space-y-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Simulador de Proposta em Tempo Real</h3>
                <p className="text-xs text-slate-500">Personalize o orçamento para qualquer lead ou cliente.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Selecione o Pacote Base:
                </label>
                <select
                  value={simSelectedPkgId}
                  onChange={(e) => {
                    setSimSelectedPkgId(e.target.value);
                    const chosen = packages.find(p => p.id === e.target.value);
                    if (chosen) {
                      setSimCustomSetup(chosen.setupPrice);
                      setSimCustomMonthly(chosen.monthlyPrice);
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                >
                  {packages.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} (Setup: R$ {p.setupPrice.toLocaleString('pt-BR')} | Mensal: R$ {p.monthlyPrice.toLocaleString('pt-BR')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Nome do Contato:
                  </label>
                  <input
                    type="text"
                    value={simClientName}
                    onChange={(e) => setSimClientName(e.target.value)}
                    placeholder="Ex: Marcelo Krauthein"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Nome da Empresa:
                  </label>
                  <input
                    type="text"
                    value={simCompanyName}
                    onChange={(e) => setSimCompanyName(e.target.value)}
                    placeholder="Ex: Tanque Soft"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Custom Value Overrides */}
              <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200/60 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-900 block">
                  Ajuste Especial de Valor (Opcional)
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Setup Personalizado (R$):
                    </label>
                    <input
                      type="number"
                      value={simSetupValue}
                      onChange={(e) => setSimCustomSetup(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-orange-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Mensalidade (R$):
                    </label>
                    <input
                      type="number"
                      value={simMonthlyValue}
                      onChange={(e) => setSimCustomMonthly(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCopyProposal}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                >
                  {copiedText ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedText ? 'Copiado para Área de Transferência!' : 'Copiar Proposta Formatada'}</span>
                </button>

                <a
                  href={`https://wa.me/${targetWhatsApp}?text=${encodeURIComponent(simulatedProposalText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Live Preview */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-100 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">Preview de Proposta Formal (WhatsApp / E-mail)</span>
                </div>

                <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/30">
                  Pronta para Envio
                </span>
              </div>

              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
                {simulatedProposalText}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Proposta gerada com motor de regras dinâmico da AGÊNCIA OZ.</span>
              <span className="text-slate-300 font-semibold">{simCompanyName}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GENERAL SETTINGS */}
      {activeTab === 'settings' && config && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Configurações Globais de Propostas</h3>
            <p className="text-xs text-slate-500">Defina os parâmetros padrão que se aplicam a todas as propostas geradas.</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveGeneralSettings(config.generalSettings);
            }}
            className="space-y-5"
          >
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                WhatsApp Oficial para Envio e Fechamento de Propostas:
              </label>
              <input
                type="text"
                value={config.generalSettings.defaultWhatsApp}
                onChange={(e) => setConfig({
                  ...config,
                  generalSettings: { ...config.generalSettings, defaultWhatsApp: e.target.value }
                })}
                placeholder="Ex: 5548991984678"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-orange-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Formato com código do país e DDD (ex: 5548991984678).
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Desconto Padrão à Vista no PIX (%):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={config.generalSettings.defaultDiscountPixPercent}
                    onChange={(e) => setConfig({
                      ...config,
                      generalSettings: { ...config.generalSettings, defaultDiscountPixPercent: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500 pr-8"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Validade Padrão da Proposta (Dias):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={config.generalSettings.proposalValidityDays}
                    onChange={(e) => setConfig({
                      ...config,
                      generalSettings: { ...config.generalSettings, proposalValidityDays: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500 pr-12"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">dias</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Razão Social / Nome da Empresa no Rodapé:
              </label>
              <input
                type="text"
                value={config.generalSettings.companyLegalName}
                onChange={(e) => setConfig({
                  ...config,
                  generalSettings: { ...config.generalSettings, companyLegalName: e.target.value }
                })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Mensagem Padrão de Rodapé e Garantia:
              </label>
              <textarea
                rows={3}
                value={config.generalSettings.defaultFooterNotes}
                onChange={(e) => setConfig({
                  ...config,
                  generalSettings: { ...config.generalSettings, defaultFooterNotes: e.target.value }
                })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Salvar Configurações Gerais</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: EDIT / CREATE PROPOSAL PACKAGE */}
      {isModalOpen && editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
                  <Edit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {editingPkg.id ? `Editar Pacote: ${editingPkg.title}` : 'Cadastrar Novo Pacote de Proposta'}
                  </h3>
                  <p className="text-xs text-slate-500">Configure os valores e os entregáveis técnicos deste serviço.</p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-2 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="p-6 space-y-5 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Título Oficial do Pacote *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPkg.title || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, title: e.target.value })}
                    placeholder="Ex: Solução 360 Graus"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Código ID do Serviço
                  </label>
                  <input
                    type="text"
                    value={editingPkg.id || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, id: e.target.value })}
                    placeholder="Ex: solucao_360 (deixe em branco p/ gerar)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-700 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={editingPkg.category || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, category: e.target.value })}
                    placeholder="Ex: Sites & LPs"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Valor de Setup (R$) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">R$</span>
                    <input
                      type="number"
                      step="any"
                      required
                      value={editingPkg.setupPrice !== undefined ? editingPkg.setupPrice : ''}
                      onChange={(e) => setEditingPkg({ ...editingPkg, setupPrice: Number(e.target.value) })}
                      placeholder="0,00"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-orange-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Coloque 0 para gratuito/incluso.</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Mensalidade (R$) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">R$</span>
                    <input
                      type="number"
                      step="any"
                      required
                      value={editingPkg.monthlyPrice !== undefined ? editingPkg.monthlyPrice : ''}
                      onChange={(e) => setEditingPkg({ ...editingPkg, monthlyPrice: Number(e.target.value) })}
                      placeholder="0,00"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Prazo Estimado de Entrega
                  </label>
                  <input
                    type="text"
                    value={editingPkg.deliveryDays || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, deliveryDays: e.target.value })}
                    placeholder="Ex: 7 a 15 dias úteis"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Condições de Pagamento
                  </label>
                  <input
                    type="text"
                    value={editingPkg.paymentTerms || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, paymentTerms: e.target.value })}
                    placeholder="Ex: PIX com 10% OFF ou até 12x"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Deliverables Builder */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block">
                  Itens Inclusos / Entregáveis do Pacote:
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={deliverableInput}
                    onChange={(e) => setDeliverableInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDeliverable();
                      }
                    }}
                    placeholder="Adicionar item entregável (ex: Certificado SSL Grátis)..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Adicionar
                  </button>
                </div>

                <div className="space-y-1.5 max-h-40 overflow-y-auto pt-1">
                  {(editingPkg.deliverables || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                    >
                      <span className="truncate">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1 font-bold text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flags */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.popular || false}
                    onChange={(e) => setEditingPkg({ ...editingPkg, popular: e.target.checked })}
                    className="w-4 h-4 text-orange-500 rounded border-slate-300 focus:ring-orange-500"
                  />
                  <span>Destacar como "Mais Recomendado / Popular"</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.active !== false}
                    onChange={(e) => setEditingPkg({ ...editingPkg, active: e.target.checked })}
                    className="w-4 h-4 text-orange-500 rounded border-slate-300 focus:ring-orange-500"
                  />
                  <span>Pacote Ativo no OZZY e no Orçamento</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Salvando...' : 'Salvar Pacote'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
