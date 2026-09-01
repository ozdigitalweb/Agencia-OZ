import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  BookOpen, 
  HelpCircle, 
  Send, 
  Tag, 
  Link as LinkIcon, 
  Layers, 
  Sliders, 
  Zap, 
  MessageSquare, 
  Bot, 
  Eye, 
  Save, 
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { ozzyKnowledgeApi, OzzyKnowledgeItem, KnowledgePayload } from '../services/ozzyKnowledgeApi';

// Batman symbol for OZZY branding
function BatmanIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 4.5c-.35 0-.7.42-.9 1.15-.85-.18-1.85-.12-2.85.45-1.95.95-3.65 2.65-5.25 4.8 1.45-.65 3.15-.8 4.65-.3-.85 1.3-.4 2.45.85 3.05 1.45-1.45 2.95-1.55 4.45-.6.25-.7.5-1.4.8-2.1.3.7.55 1.4.8 2.1 1.5-.95 3-.85 4.45.6 1.25-.6 1.7-1.75.85-3.05 1.5-.5 3.2-.35 4.65.3-1.6-2.15-3.3-3.85-5.25-4.8-1-.57-2-.63-2.85-.45-.2-.73-.55-1.15-.9-1.15h-.6z" />
    </svg>
  );
}

const CATEGORY_PRESETS = [
  'Solução 360°',
  'Hospedagem Cloud',
  'WordPress & LPs',
  'SEO & Posicionamento',
  'PROVOX Streaming',
  'Preços & Prazos',
  'Contato & Atendimento',
  'Portfólio & Casos',
  'Diferenciais Técnicos',
  'Geral / Institucional'
];

export default function OzzyKnowledgeManager() {
  const [items, setItems] = useState<OzzyKnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<OzzyKnowledgeItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Solução 360°',
    content: '',
    tags: '',
    priority: 'high' as 'high' | 'medium' | 'low',
    active: true,
    suggestedLink1Label: '',
    suggestedLink1Url: '',
    suggestedLink2Label: '',
    suggestedLink2Url: ''
  });
  const [saving, setSaving] = useState(false);

  // Test Sandbox State
  const [testQuery, setTestQuery] = useState('');
  const [testLoading, setTestLoading] = useState(false);
  const [testResult, setTestResult] = useState<{ reply: string; source: string; suggestedActions?: any[] } | null>(null);
  const [showTester, setShowTester] = useState(false);

  useEffect(() => {
    loadKnowledge();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const loadKnowledge = async () => {
    setLoading(true);
    try {
      const data = await ozzyKnowledgeApi.getAll();
      setItems(data);
    } catch (err: any) {
      showNotification('error', err.message || 'Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Solução 360°',
      content: '',
      tags: '',
      priority: 'high',
      active: true,
      suggestedLink1Label: '',
      suggestedLink1Url: '',
      suggestedLink2Label: '',
      suggestedLink2Url: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: OzzyKnowledgeItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      content: item.content,
      tags: item.tags.join(', '),
      priority: item.priority || 'medium',
      active: item.active !== false,
      suggestedLink1Label: item.suggestedLinks?.[0]?.label || '',
      suggestedLink1Url: item.suggestedLinks?.[0]?.url || '',
      suggestedLink2Label: item.suggestedLinks?.[1]?.label || '',
      suggestedLink2Url: item.suggestedLinks?.[1]?.url || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      showNotification('error', 'Por favor preencha o título e o conteúdo.');
      return;
    }

    setSaving(true);
    try {
      const suggestedLinks: { label: string; url: string }[] = [];
      if (formData.suggestedLink1Label && formData.suggestedLink1Url) {
        suggestedLinks.push({ label: formData.suggestedLink1Label, url: formData.suggestedLink1Url });
      }
      if (formData.suggestedLink2Label && formData.suggestedLink2Url) {
        suggestedLinks.push({ label: formData.suggestedLink2Label, url: formData.suggestedLink2Url });
      }

      const payload: KnowledgePayload = {
        title: formData.title.trim(),
        category: formData.category,
        content: formData.content.trim(),
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        priority: formData.priority,
        active: formData.active,
        suggestedLinks
      };

      if (editingItem) {
        await ozzyKnowledgeApi.update(editingItem.id, payload);
        showNotification('success', `Tópico "${payload.title}" atualizado no conhecimento do OZZY!`);
      } else {
        await ozzyKnowledgeApi.create(payload);
        showNotification('success', `Novo conhecimento adicionado com sucesso! OZZY já aprendeu.`);
      }

      setIsModalOpen(false);
      await loadKnowledge();
    } catch (err: any) {
      showNotification('error', err.message || 'Erro ao salvar tópico.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (item: OzzyKnowledgeItem) => {
    try {
      await ozzyKnowledgeApi.update(item.id, { active: !item.active });
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, active: !i.active } : i));
      showNotification('success', `Status do tópico atualizado para ${!item.active ? 'Ativo' : 'Desativado'}.`);
    } catch (err: any) {
      showNotification('error', 'Erro ao alterar status.');
    }
  };

  const handleDeleteItem = async (item: OzzyKnowledgeItem) => {
    if (!window.confirm(`Tem certeza que deseja remover o conhecimento "${item.title}" do OZZY?`)) {
      return;
    }

    try {
      await ozzyKnowledgeApi.delete(item.id);
      setItems(prev => prev.filter(i => i.id !== item.id));
      showNotification('success', 'Conhecimento removido com sucesso.');
    } catch (err: any) {
      showNotification('error', err.message || 'Erro ao excluir.');
    }
  };

  const handleResetDefaults = async () => {
    if (!window.confirm('Deseja restaurar a base de conhecimento original da AGÊNCIA OZ? Itens padrões serão restaurados.')) {
      return;
    }

    try {
      setLoading(true);
      const data = await ozzyKnowledgeApi.resetToDefaults();
      setItems(data);
      showNotification('success', 'Base de conhecimento restaurada com os padrões da agência!');
    } catch (err: any) {
      showNotification('error', err.message || 'Erro ao restaurar.');
    } finally {
      setLoading(false);
    }
  };

  const handleTestSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!testQuery.trim() || testLoading) return;

    setTestLoading(true);
    setTestResult(null);
    try {
      const res = await ozzyKnowledgeApi.testQuery(testQuery.trim());
      setTestResult(res);
    } catch (err: any) {
      showNotification('error', 'Erro ao consultar o Ozzy.');
    } finally {
      setTestLoading(false);
    }
  };

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      item.title.toLowerCase().includes(q) || 
      item.content.toLowerCase().includes(q) || 
      item.tags.some(t => t.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q);
    
    return matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(items.map(i => i.category)));
  const activeCount = items.filter(i => i.active).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className={`p-4 rounded-xl shadow-lg flex items-center justify-between text-sm font-medium transition-all animate-fade-in ${
          notification.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BatmanIcon className="w-48 h-48 text-orange-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold border border-orange-500/30">
              <BatmanIcon className="w-3.5 h-3.5" />
              <span>Cérebro do Agente Virtual OZZY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Base de Conhecimento & Treinamento
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Alimente o OZZY com regras de negócios, serviços, preços, diferenciais técnicos e respostas a dúvidas. Qualquer item adicionado ou editado aqui é imediatamente incorporado às respostas da IA e do motor de busca local.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowTester(!showTester)}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md ${
                showTester 
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300' 
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{showTester ? 'Fechar Testador' : 'Testar Respostas do Ozzy'}</span>
            </button>

            <button
              onClick={handleOpenCreateModal}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Conhecimento</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
            <span className="text-xs text-slate-400 font-medium block">Total de Tópicos</span>
            <span className="text-xl font-bold text-white">{items.length}</span>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
            <span className="text-xs text-slate-400 font-medium block">Tópicos Ativos</span>
            <span className="text-xl font-bold text-emerald-400">{activeCount}</span>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
            <span className="text-xs text-slate-400 font-medium block">Categorias</span>
            <span className="text-xl font-bold text-amber-400">{categories.length}</span>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Motor IA</span>
              <span className="text-xs font-bold text-blue-300">Gemini 3.7 + Contexto</span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Interactive Testing Sandbox */}
      {showTester && (
        <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 shadow-2xl space-y-4 animate-fade-in text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                <BatmanIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-amber-400">Simulador de Conversa com o OZZY</h3>
                <p className="text-xs text-slate-400">Digite uma pergunta para testar como o OZZY consulta a base de conhecimento em tempo real</p>
              </div>
            </div>
            <button 
              onClick={() => setShowTester(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleTestSubmit} className="flex gap-2">
            <input
              type="text"
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              placeholder="Ex: Quanto custa a hospedagem? / Como funciona a Solução 360? / O que inclui a criação de sites?"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={testLoading || !testQuery.trim()}
              className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md"
            >
              {testLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Consultar</span>
            </button>
          </form>

          {/* Quick preset test questions */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-xs text-slate-400 font-medium py-1">Testes rápidos:</span>
            {[
              'Como funciona a Solução 360?',
              'Quais são os planos de Hospedagem?',
              'Como não cair em caixa de spam?',
              'Vocês fazem rádio web?',
              'Qual o WhatsApp para contato?'
            ].map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setTestQuery(q);
                  ozzyKnowledgeApi.testQuery(q).then(setTestResult).catch(() => {});
                }}
                className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-amber-300 px-2.5 py-1 rounded-lg transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Result Box */}
          {testResult && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3 mt-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <BatmanIcon className="w-3.5 h-3.5" /> Resposta Gerada pelo OZZY:
                </span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-300">
                  Fonte: {testResult.source}
                </span>
              </div>
              <div className="text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                {testResult.reply}
              </div>
              {testResult.suggestedActions && testResult.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {testResult.suggestedActions.map((action, i) => (
                    <span key={i} className="text-xs bg-slate-800 text-orange-400 px-2.5 py-1 rounded-md border border-slate-700 font-medium">
                      🔗 {action.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar tópico, palavra-chave ou conteúdo..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleResetDefaults}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              title="Restaurar tópicos padrões da agência"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restaurar Padrões</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas ({items.length})
          </button>
          {CATEGORY_PRESETS.map((cat) => {
            const count = items.filter(i => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat} {count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Knowledge Cards Grid */}
      {loading ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Carregando base de conhecimento do OZZY...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-800">Nenhum tópico encontrado</h4>
            <p className="text-sm text-slate-500">Tente ajustar a busca ou clique no botão abaixo para cadastrar um novo conhecimento.</p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Conhecimento</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                item.active ? 'border-slate-200' : 'border-slate-300 opacity-60 bg-slate-50/70'
              }`}
            >
              <div className="space-y-3">
                {/* Card Top Details */}
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-block bg-blue-50 text-blue-800 font-bold text-xs px-2.5 py-1 rounded-md border border-blue-100">
                    {item.category}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleActive(item)}
                      className={`text-xs px-2 py-0.5 rounded-full font-bold transition-colors ${
                        item.active 
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                      title="Ativar ou desativar tópico nas respostas do OZZY"
                    >
                      {item.active ? '● Ativo' : '○ Pausado'}
                    </button>
                    {item.priority === 'high' && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded-full">
                        Prioritário
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>

                {/* Content Excerpt */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.content}
                </p>

                {/* Keywords Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 6).map((tag, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        #{tag}
                      </span>
                    ))}
                    {item.tags.length > 6 && (
                      <span className="text-[10px] text-slate-400 py-0.5">
                        +{item.tags.length - 6}
                      </span>
                    )}
                  </div>
                )}

                {/* Suggested Links */}
                {item.suggestedLinks && item.suggestedLinks.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-[11px]">
                    <span className="text-slate-400 font-medium">Ações:</span>
                    {item.suggestedLinks.map((link, idx) => (
                      <span key={idx} className="text-blue-700 bg-blue-50/70 px-2 py-0.5 rounded border border-blue-100 flex items-center gap-1 font-semibold">
                        <LinkIcon className="w-3 h-3" /> {link.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs">
                <span className="text-slate-400">
                  Atualizado em {item.updatedAt}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="text-slate-700 hover:text-blue-700 hover:bg-blue-50 p-1.5 rounded-lg transition-colors flex items-center gap-1 font-bold"
                    title="Editar conhecimento"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>

                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                    title="Remover tópico"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Knowledge Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto no-scrollbar">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8 animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/30">
                  <BatmanIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingItem ? 'Editar Conhecimento do Ozzy' : 'Adicionar Novo Conhecimento'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ensine novos serviços, respostas a dúvidas ou regras de atendimento
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveItem} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Título / Pergunta do Tópico *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Como funciona a migração gratuita de site?"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Categoria *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  >
                    {CATEGORY_PRESETS.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Prioridade no Prompt
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  >
                    <option value="high">Alta (Sempre priorizar)</option>
                    <option value="medium">Média (Padrão)</option>
                    <option value="low">Baixa (Secundária)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Conteúdo / Explicação Detalhada do Ozzy *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Escreva aqui tudo o que o OZZY precisa saber sobre este assunto. Inclua dados técnicos, valores, regras, benefícios e passos a passos..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
                <span className="text-[11px] text-slate-400 block mt-1">
                  Dica: Quanto mais claro e detalhado, mais precisa e natural será a resposta do Ozzy aos clientes.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Palavras-chave & Gatilhos (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="migrar, migracao, trocar hospedagem, cpanel, preco migracao"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>

              {/* Suggested Action Links */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
                <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Botões de Ação / Links Sugeridos (Opcional)
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Texto do Botão 1 (ex: Fazer Orçamento)"
                    value={formData.suggestedLink1Label}
                    onChange={(e) => setFormData({ ...formData, suggestedLink1Label: e.target.value })}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="URL ou rota 1 (ex: /orcamento ou https://wa.me/...)"
                    value={formData.suggestedLink1Url}
                    onChange={(e) => setFormData({ ...formData, suggestedLink1Url: e.target.value })}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Texto do Botão 2 (ex: Solução 360°)"
                    value={formData.suggestedLink2Label}
                    onChange={(e) => setFormData({ ...formData, suggestedLink2Label: e.target.value })}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="URL ou rota 2 (ex: /360-graus)"
                    value={formData.suggestedLink2Url}
                    onChange={(e) => setFormData({ ...formData, suggestedLink2Url: e.target.value })}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Status active */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="modal-active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-blue-700 rounded border-slate-300 focus:ring-blue-600"
                />
                <label htmlFor="modal-active" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Tópico Ativo (incorporar imediatamente ao cérebro do OZZY)
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-2 text-sm font-bold rounded-xl shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all"
                >
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{editingItem ? 'Salvar Alterações' : 'Adicionar ao Ozzy'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
