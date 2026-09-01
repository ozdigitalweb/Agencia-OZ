import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Lock, 
  LogOut, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Sparkles, 
  Globe, 
  Image as ImageIcon, 
  User, 
  Tag, 
  ArrowLeft, 
  Save, 
  Layout, 
  Heading1, 
  Heading2, 
  List, 
  Quote, 
  Code, 
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  FolderPlus,
  Menu,
  X,
  Layers,
  ChevronRight,
  MessageSquare,
  Zap,
  PanelLeftClose,
  PanelLeftOpen,
  Filter,
  Check,
  MessageCircle,
  HelpCircle,
  Gift,
  Home,
  DollarSign,
  Database
} from 'lucide-react';
import { blogApi, StoredPost, PostPayload } from '../services/api';
import BlogPostContent from '../components/BlogPostContent';
import ClientPagesManager from '../components/ClientPagesManager';
import OzzyKnowledgeManager from '../components/OzzyKnowledgeManager';
import OzzyChatManager from '../components/OzzyChatManager';
import PromoSettingsManager from '../components/PromoSettingsManager';
import ProposalsManager from '../components/ProposalsManager';
import DatabaseManager from '../components/DatabaseManager';

const PRESET_IMAGES = [
  { label: 'Tecnologia / Código', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&fit=crop&w=600&q=70' },
  { label: 'Servidor / Cloud', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?fm=webp&fit=crop&w=600&q=70' },
  { label: 'SEO / Analytics', url: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?fm=webp&fit=crop&w=600&q=70' },
  { label: 'Segurança / Shield', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?fm=webp&fit=crop&w=600&q=70' },
  { label: 'Design / Criatividade', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?fm=webp&fit=crop&w=600&q=70' }
];

const PRESET_AUTHORS = [
  { name: 'Eduardo Souza', role: 'CTO na AGÊNCIA OZ', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?fm=webp&fit=crop&w=100&h=100&q=70' },
  { name: 'Rafael Meneghetti', role: 'Especialista em Infraestrutura', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=webp&fit=crop&w=100&h=100&q=70' },
  { name: 'Fernanda Lima', role: 'Head de Performance de Busca', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=webp&fit=crop&w=100&h=100&q=70' },
  { name: 'Equipe AGÊNCIA OZ', role: 'Gestão de Conteúdo', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=webp&fit=crop&w=100&h=100&q=70' }
];

export default function AdminBlog() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('agenciaoz2026');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  // Posts & Dashboard state
  const [posts, setPosts] = useState<StoredPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Active view: 'list' | 'client-pages' | 'ozzy-chat' | 'ozzy-knowledge' | 'proposals' | 'editor' | 'promo-settings' | 'database'
  const [activeTab, setActiveTab] = useState<'list' | 'client-pages' | 'ozzy-chat' | 'ozzy-knowledge' | 'proposals' | 'editor' | 'promo-settings' | 'database'>('ozzy-chat');
  const [editorMode, setEditorMode] = useState<'edit' | 'preview'>('edit');
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Editor form state
  const [formData, setFormData] = useState<PostPayload>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'WordPress',
    featuredImage: PRESET_IMAGES[0].url,
    author: PRESET_AUTHORS[0],
    status: 'published'
  });
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [isSavingPost, setIsSavingPost] = useState(false);

  // Check auth on load
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    setAuthLoading(true);
    const user = await blogApi.verifyAuth();
    if (user) {
      setIsAuthenticated(true);
      fetchPosts();
    } else {
      setIsAuthenticated(false);
    }
    setAuthLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmittingLogin(true);

    try {
      await blogApi.login(username, password);
      setIsAuthenticated(true);
      fetchPosts();
      showToast('success', 'Autenticado com sucesso! Bem-vindo ao Gestor de Conteúdo.');
    } catch (err: any) {
      setLoginError(err.message || 'Dados de acesso incorretos.');
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  const handleLogout = () => {
    blogApi.removeToken();
    setIsAuthenticated(false);
    showToast('success', 'Sessão encerrada com sucesso.');
  };

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const data = await blogApi.getPosts({ status: 'all' });
      setPosts(data);
    } catch (err: any) {
      showToast('error', 'Erro ao carregar lista de artigos.');
    } finally {
      setLoadingPosts(false);
    }
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Filtered posts for list
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'published' && post.status !== 'draft') ||
      (filterStatus === 'draft' && post.status === 'draft');

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Extract unique categories
  const categories: string[] = Array.from(new Set(posts.map(p => p.category)));

  // Start creating new post
  const handleNewPost = () => {
    setEditingPostId(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '## Introdução\n\nEscreva seu artigo com riqueza de detalhes...\n\n## Principais Destaques\n\n* Ponto de atenção 1\n* Ponto de atenção 2\n\n## Conclusão\n\nResumo e direcionamento...',
      category: 'WordPress',
      featuredImage: PRESET_IMAGES[0].url,
      author: PRESET_AUTHORS[0],
      status: 'published'
    });
    setEditorMode('edit');
    setActiveTab('editor');
  };

  // Start editing existing post
  const handleEditPost = (post: StoredPost) => {
    setEditingPostId(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      featuredImage: post.featuredImage,
      author: post.author,
      status: post.status || 'published',
      date: post.date
    });
    setEditorMode('edit');
    setActiveTab('editor');
  };

  // Toggle quick post status
  const handleToggleStatus = async (post: StoredPost) => {
    const newStatus = post.status === 'draft' ? 'published' : 'draft';
    try {
      await blogApi.updatePost(post.id, { status: newStatus });
      showToast('success', `Artigo "${post.title}" alterado para ${newStatus === 'published' ? 'Publicado' : 'Rascunho'}.`);
      fetchPosts();
    } catch (err: any) {
      showToast('error', err.message || 'Erro ao alterar status.');
    }
  };

  // Delete post
  const handleDeletePost = async (post: StoredPost) => {
    if (window.confirm(`Tem certeza que deseja excluir o artigo "${post.title}"? Esta ação não pode ser desfeita.`)) {
      try {
        await blogApi.deletePost(post.id);
        showToast('success', 'Artigo removido com sucesso.');
        fetchPosts();
      } catch (err: any) {
        showToast('error', err.message || 'Erro ao remover artigo.');
      }
    }
  };

  // Auto generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setFormData(prev => ({
      ...prev,
      title: val,
      slug: editingPostId ? prev.slug : generatedSlug
    }));
  };

  // Formatting helper for text area
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('post-content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end) || 'texto';

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);

    setFormData(prev => ({ ...prev, content: newText }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  // Save post submit handler
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      showToast('error', 'Por favor preencha o título e o conteúdo do artigo.');
      return;
    }

    setIsSavingPost(true);
    try {
      const categoryToUse = showCustomCategory && customCategoryInput.trim() 
        ? customCategoryInput.trim() 
        : formData.category;

      const payload = {
        ...formData,
        category: categoryToUse
      };

      if (editingPostId) {
        await blogApi.updatePost(editingPostId, payload);
        showToast('success', 'Artigo atualizado com sucesso!');
      } else {
        await blogApi.createPost(payload);
        showToast('success', 'Novo artigo criado e publicado com sucesso!');
      }

      await fetchPosts();
      setActiveTab('list');
    } catch (err: any) {
      showToast('error', err.message || 'Erro ao salvar artigo.');
    } finally {
      setIsSavingPost(false);
    }
  };

  // Render Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 text-orange-500 animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-300">Carregando OZGESTOR...</p>
        </div>
      </div>
    );
  }

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-900 text-slate-100">
        <div className="w-full max-w-md space-y-6 bg-slate-800 border border-slate-700/80 p-7 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
          
          {/* Top navigation link to home */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-700/50">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-orange-400 transition-colors group"
              title="Voltar para a página inicial"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Voltar ao Site</span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-900 border border-slate-700/80 text-[11px] font-bold text-slate-300 hover:text-orange-400 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-orange-400" />
              <span>Home</span>
            </Link>
          </div>

          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-orange-400 shadow-lg shadow-orange-500/10">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="font-display text-3xl font-black text-white tracking-tight">
              OZGESTOR
            </h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Painel unificado de gerenciamento do Blog, Artigos e Páginas de Clientes da AGÊNCIA OZ.
            </p>
          </div>

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Usuário OZGESTOR
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Ex: admin"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Senha de Acesso
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingLogin}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmittingLogin ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Autenticando...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" /> Entrar no OZGESTOR
                </>
              )}
            </button>
          </form>

          {/* Preset hint box for convenience */}
          <div className="pt-4 border-t border-slate-700/60 bg-slate-900/50 p-3.5 rounded-xl text-[11px] text-slate-400 space-y-1">
            <span className="font-bold text-slate-300 block">Credenciais OZGESTOR (Demonstrativas):</span>
            <div>Usuário: <code className="text-orange-400 font-mono">admin</code></div>
            <div>Senha: <code className="text-orange-400 font-mono">agenciaoz2026</code></div>
          </div>

          {/* Direct return to home button */}
          <div className="pt-1 text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-950 border border-slate-700/70 hover:border-orange-500/50 text-xs font-bold text-slate-300 hover:text-orange-400 transition-all shadow-sm group"
            >
              <Home className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
              <span>← Voltar para a Página Inicial (Home)</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // 2. MAIN DASHBOARD (AUTHENTICATED)
  return (
    <div id="admin-blog-page" className="min-h-screen bg-slate-100 flex flex-col animate-fade-in relative">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2.5 border backdrop-blur-md animate-bounce ${
          notification.type === 'success' 
            ? 'bg-emerald-900/90 text-emerald-200 border-emerald-500/40' 
            : 'bg-red-900/90 text-red-200 border-red-500/40'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <AlertCircle className="h-4 w-4 text-red-400" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* 1. TOP NAVIGATION BAR OF THE GESTOR (Menus Relacionados ao Gestor no Topo) */}
      <header className="bg-slate-950 border-b border-slate-800 text-white px-3 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-40 shadow-xl shrink-0">
        {/* Left: Brand + Submenu Toggle + Session Navigation Tabs */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-orange-500/20">
              OZ
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="font-display font-black text-base text-white tracking-tight">OZGESTOR</span>
              <span className="text-[9px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-1.5 py-0.5 rounded font-bold uppercase">v2.5</span>
            </div>
          </div>

          {/* Submenu Retractable Toggle Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/90 flex items-center gap-1.5 text-xs font-semibold transition-all shrink-0 active:scale-95"
            title={sidebarCollapsed ? "Expandir Submenu Lateral da Sessão" : "Recolher Submenu Lateral"}
            aria-label="Alternar Submenu Lateral"
          >
            {sidebarCollapsed ? (
              <>
                <PanelLeftOpen className="w-4 h-4 text-orange-400" />
                <span className="hidden md:inline text-[11px] text-orange-300 font-bold">Submenu</span>
              </>
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4 text-slate-400" />
                <span className="hidden md:inline text-[11px] text-slate-400">Recolher</span>
              </>
            )}
          </button>

          {/* Mobile Drawer Button (< lg screens) */}
          <button
            onClick={() => setSidebarMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
            aria-label="Abrir Submenu"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* MENUS DO GESTOR NO TOPO (Main Sessions) */}
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-1" aria-label="Sessões Principais do Gestor">
            {/* Session 1: Atendimento & CRM */}
            <button
              onClick={() => {
                setActiveTab('ozzy-chat');
                setSidebarCollapsed(false);
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'ozzy-chat' || activeTab === 'ozzy-knowledge' || activeTab === 'proposals'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md shadow-orange-500/25 font-black'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Atendimento & CRM</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                activeTab === 'ozzy-chat' || activeTab === 'ozzy-knowledge' || activeTab === 'proposals' ? 'bg-slate-950 text-orange-400' : 'bg-slate-800 text-slate-400'
              }`}>
                CRM
              </span>
            </button>

            {/* Session 2: Conteúdo & Blog */}
            <button
              onClick={() => {
                setActiveTab('list');
                setSidebarCollapsed(false);
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'list' || activeTab === 'editor'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Conteúdo & Blog</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === 'list' || activeTab === 'editor' ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {posts.length}
              </span>
            </button>

            {/* Session 3: Páginas & CMS */}
            <button
              onClick={() => {
                setActiveTab('client-pages');
                setSidebarCollapsed(false);
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'client-pages'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Páginas & CMS</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                activeTab === 'client-pages' ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                CMS
              </span>
            </button>

            {/* Session 4: Promoção & Pop-up (Liga / Desliga) */}
            <button
              onClick={() => {
                setActiveTab('promo-settings');
                setSidebarCollapsed(false);
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'promo-settings'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-md shadow-orange-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Promoção & Pop-up</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                activeTab === 'promo-settings' ? 'bg-slate-950 text-orange-400' : 'bg-orange-500/20 text-orange-400'
              }`}>
                POP-UP
              </span>
            </button>

            {/* Session 5: Banco de Dados MySQL */}
            <button
              onClick={() => {
                setActiveTab('database');
                setSidebarCollapsed(false);
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'database'
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-700/25 font-black'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>Banco MySQL</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                activeTab === 'database' ? 'bg-blue-800 text-blue-200' : 'bg-blue-500/20 text-blue-300'
              }`}>
                SQL
              </span>
            </button>

          </nav>
        </div>

        {/* Right: Site View Links + User Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            to="/"
            target="_blank"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-xs font-medium transition-colors border border-transparent hover:border-slate-800"
            title="Visualizar site principal no ar"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ver Site</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </Link>

          <Link
            to="/blog"
            target="_blank"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-xs font-medium transition-colors border border-transparent hover:border-slate-800"
            title="Visualizar blog público"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>Ver Blog</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </Link>

          <div className="h-5 w-px bg-slate-800 hidden sm:block"></div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-bold border border-red-500/20 transition-colors"
            title="Sair do Painel de Gestão"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER OVERLAY */}
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}

      {/* 2. MAIN LAYOUT: RETRACTABLE LATERAL SUBMENU + WORKSPACE */}
      <div className="flex-1 flex min-h-[calc(100vh-4rem)] relative">
        
        {/* LATERAL RETRACTABLE SUBMENU (Submenu da Sessão Ativa) */}
        <aside className={`
          fixed lg:sticky top-16 bottom-0 left-0 z-30
          ${sidebarCollapsed ? 'w-0 lg:w-0 border-r-0 overflow-hidden' : 'w-72 bg-slate-900 border-r border-slate-800'}
          text-slate-300 flex flex-col justify-between h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none shrink-0
          ${sidebarMobileOpen ? 'translate-x-0 !w-72 bg-slate-900' : (sidebarCollapsed ? '-translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0')}
        `}>
          {!sidebarCollapsed && (
            <div className="p-4 space-y-5">
              
              {/* Dynamic Submenu Header based on active session */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-400">
                    Submenu da Sessão
                  </span>
                  <h2 className="text-sm font-black text-white">
                    {(activeTab === 'ozzy-chat' || activeTab === 'ozzy-knowledge' || activeTab === 'proposals') && 'Atendimento & CRM'}
                    {(activeTab === 'list' || activeTab === 'editor') && 'Conteúdo & Blog'}
                    {activeTab === 'client-pages' && 'Páginas & Landing Pages'}
                    {activeTab === 'promo-settings' && 'Promoção & Pop-up'}
                    {activeTab === 'database' && 'Banco de Dados MySQL'}
                  </h2>

                </div>

                <button
                  onClick={() => {
                    setSidebarMobileOpen(false);
                    setSidebarCollapsed(true);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Recolher submenu"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic Submenu Items for: ATENDIMENTO & CRM */}
              {(activeTab === 'ozzy-chat' || activeTab === 'ozzy-knowledge' || activeTab === 'proposals') && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="block px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Módulos de Atendimento
                    </span>

                    <button
                      onClick={() => {
                        setActiveTab('ozzy-chat');
                        setSidebarMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeTab === 'ozzy-chat'
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-md shadow-orange-500/20'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <MessageSquare className={`w-4 h-4 ${activeTab === 'ozzy-chat' ? 'text-slate-950' : 'text-orange-400'}`} />
                        <span>Central de Conversas</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        activeTab === 'ozzy-chat' ? 'bg-slate-950 text-orange-400' : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        CRM
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('ozzy-knowledge');
                        setSidebarMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeTab === 'ozzy-knowledge'
                          ? 'bg-orange-500 text-white font-extrabold shadow-md shadow-orange-500/20'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className={`w-4 h-4 ${activeTab === 'ozzy-knowledge' ? 'text-white' : 'text-amber-400'}`} />
                        <span>Treinamento do OZZY</span>
                      </div>
                      <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                        RAG IA
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('proposals');
                        setSidebarMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeTab === 'proposals'
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-md shadow-orange-500/20'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <DollarSign className={`w-4 h-4 ${activeTab === 'proposals' ? 'text-slate-950' : 'text-orange-400'}`} />
                        <span>Tabela de Preços & Propostas</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        activeTab === 'proposals' ? 'bg-slate-950 text-orange-400' : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        PREÇOS
                      </span>
                    </button>
                  </div>

                  {/* CRM Information Card */}
                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-[11px]">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Captura Ativa de Leads</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      O OZZY solicita Nome, WhatsApp, E-mail e Empresa no chat do site e atualiza automaticamente os leads no CRM.
                    </p>
                    <a
                      href="https://wa.me/5548991984678"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 hover:text-emerald-300 font-bold mt-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Oficial OZ</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Dynamic Submenu Items for: CONTEÚDO & BLOG */}
              {(activeTab === 'list' || activeTab === 'editor') && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="block px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Ações do Blog
                    </span>

                    <button
                      onClick={() => {
                        setActiveTab('list');
                        setFilterStatus('all');
                        setSidebarMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeTab === 'list' && filterStatus === 'all'
                          ? 'bg-blue-600 text-white font-extrabold shadow-md shadow-blue-600/20'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span>Todos os Artigos</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-800 text-slate-400">
                        {posts.length}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        handleNewPost();
                        setSidebarMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeTab === 'editor' && !editingPostId
                          ? 'bg-orange-500 text-white font-extrabold shadow-md shadow-orange-500/20'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Plus className="w-4 h-4 text-orange-400" />
                        <span>Criar Novo Artigo</span>
                      </div>
                      <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded font-bold">
                        Novo
                      </span>
                    </button>
                  </div>

                  {/* Sub-Filters: Status */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <span className="block px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Filtrar por Status
                    </span>

                    <button
                      onClick={() => {
                        setActiveTab('list');
                        setFilterStatus('published');
                        setSidebarMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        activeTab === 'list' && filterStatus === 'published'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        Publicados
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {posts.filter(p => p.status === 'published').length}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('list');
                        setFilterStatus('draft');
                        setSidebarMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        activeTab === 'list' && filterStatus === 'draft'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                        Rascunhos
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {posts.filter(p => p.status === 'draft').length}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Dynamic Submenu Items for: PÁGINAS & CMS */}
              {activeTab === 'client-pages' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="block px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Páginas & Landing Pages
                    </span>

                    <button
                      onClick={() => {
                        setActiveTab('client-pages');
                        setSidebarMobileOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    >
                      <div className="flex items-center gap-2.5">
                        <Globe className="w-4 h-4 text-white" />
                        <span>Páginas de Clientes</span>
                      </div>
                      <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded-full font-bold">
                        CMS
                      </span>
                    </button>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 space-y-2 text-xs">
                    <span className="font-bold text-slate-200 block text-[11px]">Modelos Comerciais Integrados:</span>
                    <ul className="space-y-1.5 text-[11px] text-slate-400">
                      <li className="flex items-center gap-1.5">🩺 Clínicas & Médicos</li>
                      <li className="flex items-center gap-1.5">⚖️ Advocacia & Jurídico</li>
                      <li className="flex items-center gap-1.5">🛍️ Loja & E-commerce</li>
                      <li className="flex items-center gap-1.5">🎨 Artesanato & Ateliês</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Dynamic Submenu Items for: PROMOÇÃO & POP-UP */}
              {activeTab === 'promo-settings' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="block px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Gatilhos & Conversão
                    </span>

                    <button
                      onClick={() => {
                        setActiveTab('promo-settings');
                        setSidebarMobileOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md shadow-orange-500/20"
                    >
                      <div className="flex items-center gap-2.5">
                        <Gift className="w-4 h-4 text-slate-950" />
                        <span>Controle de Liga/Desliga</span>
                      </div>
                      <span className="text-[10px] bg-slate-950 text-orange-400 px-2 py-0.5 rounded-full font-bold">
                        ATIVO
                      </span>
                    </button>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 space-y-2.5 text-xs">
                    <span className="font-bold text-slate-200 block text-[11px]">Ações Rápidas:</span>
                    <div className="space-y-1.5">
                      <button
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent('open-oz-promo'));
                          showToast('success', 'Disparo de teste do Pop-up efetuado!');
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-[11px] font-bold transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Testar Pop-up no Navegador</span>
                      </button>
                      <a
                        href="/promocao"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white text-[11px] font-medium transition-colors flex items-center justify-between"
                      >
                        <span>Abrir Landing /promocao</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Submenu Items for: BANCO DE DADOS MYSQL */}
              {activeTab === 'database' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="block px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Infraestrutura & Dados
                    </span>

                    <button
                      onClick={() => {
                        setActiveTab('database');
                        setSidebarMobileOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold bg-blue-700 text-white shadow-md shadow-blue-700/20 font-black"
                    >
                      <div className="flex items-center gap-2.5">
                        <Database className="w-4 h-4 text-blue-300" />
                        <span>Status & Tabelas</span>
                      </div>
                      <span className="text-[10px] bg-blue-800 text-blue-200 px-2 py-0.5 rounded-full font-bold">
                        MYSQL
                      </span>
                    </button>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 space-y-2 text-xs">
                    <span className="font-bold text-slate-200 block text-[11px]">Banco Relacional MySQL:</span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Gerencie conexões de alta performance, visualização de schema SQL, migração de dados e métricas em tempo real.
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}


          {/* Bottom Submenu User & Session Badge */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-slate-800 bg-slate-950/70 space-y-2.5">
              <div className="flex items-center gap-2.5 px-1">
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">Admin OZGESTOR</p>
                  <p className="text-[10px] text-slate-400 truncate">Sessão Autenticada</p>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* WORKSPACE CONTENT AREA */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
          
          {/* Main Area View Header */}
          <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-16 z-20 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-0.5">
                <span className="text-slate-400">OZGESTOR</span>
                <span>/</span>
                <span className="text-slate-800 font-bold">
                  {activeTab === 'list' && 'Artigos do Blog'}
                  {activeTab === 'client-pages' && 'Páginas de Clientes'}
                  {activeTab === 'ozzy-chat' && 'Central de Conversas & CRM de Leads'}
                  {activeTab === 'ozzy-knowledge' && 'Base de Conhecimento & Treinamento do Ozzy'}
                  {activeTab === 'proposals' && 'Tabela de Preços & Propostas Comerciais'}
                  {activeTab === 'promo-settings' && 'Controle da Promoção & Pop-up'}
                  {activeTab === 'database' && 'Banco de Dados MySQL'}
                  {activeTab === 'editor' && (editingPostId ? `Editar Artigo #${editingPostId}` : 'Criar Novo Artigo')}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-display">
                {activeTab === 'list' && 'Gerenciador de Artigos do Blog'}
                {activeTab === 'client-pages' && 'Gestão de Páginas de Clientes'}
                {activeTab === 'ozzy-chat' && 'Central de Conversas & CRM de Leads'}
                {activeTab === 'ozzy-knowledge' && 'Base de Conhecimento & Treinamento do OZZY'}
                {activeTab === 'proposals' && 'Tabela de Preços & Propostas Comerciais'}
                {activeTab === 'promo-settings' && 'Controle e Liga/Desliga da Promoção'}
                {activeTab === 'database' && 'Banco de Dados MySQL & Infraestrutura'}
                {activeTab === 'editor' && (editingPostId ? 'Edição de Artigo' : 'Novo Artigo do Blog')}
              </h1>

            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              {activeTab === 'list' && (
                <button
                  onClick={handleNewPost}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Novo Artigo
                </button>
              )}

              {activeTab === 'editor' && (
                <button
                  onClick={() => setActiveTab('list')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" /> Voltar para Artigos
                </button>
              )}
            </div>
          </div>

          {/* Tab View Contents */}
          <div className="p-3 sm:p-5 lg:p-6 space-y-6 w-full flex-1 min-w-0">

      {/* TAB CONTENT 1: POSTS LIST & STATS */}
      {activeTab === 'list' && (
        <div className="w-full space-y-6">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total de Artigos</span>
              <div className="text-2xl font-extrabold text-slate-900">{posts.length}</div>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Publicados no Ar</span>
              <div className="text-2xl font-extrabold text-emerald-600">
                {posts.filter(p => p.status !== 'draft').length}
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Rascunhos</span>
              <div className="text-2xl font-extrabold text-amber-600">
                {posts.filter(p => p.status === 'draft').length}
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Categorias Ativas</span>
              <div className="text-2xl font-extrabold text-blue-700">{categories.length}</div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por título ou palavra-chave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Category selector */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                <Tag className="h-3.5 w-3.5 text-slate-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-none"
                >
                  <option value="all">Todas as Categoria</option>
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Status selector */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-none"
                >
                  <option value="all">Todos os Status</option>
                  <option value="published">Apenas Publicados</option>
                  <option value="draft">Apenas Rascunhos</option>
                </select>
              </div>

              <button
                onClick={fetchPosts}
                title="Atualizar lista"
                className="p-2 text-slate-500 hover:text-blue-700 bg-slate-50 border border-slate-200 rounded-xl transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

          </div>

          {/* Posts Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {loadingPosts ? (
              <div className="p-12 text-center space-y-3">
                <RefreshCw className="h-6 w-6 text-blue-700 animate-spin mx-auto" />
                <p className="text-xs text-slate-500 font-semibold">Carregando catálogo de artigos...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <FileText className="h-8 w-8 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-700">Nenhum artigo encontrado com estes filtros.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterCategory('all');
                    setFilterStatus('all');
                  }}
                  className="text-xs text-blue-700 font-bold hover:underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-3.5 px-4">Artigo & Capa</th>
                      <th className="py-3.5 px-4">Categoria</th>
                      <th className="py-3.5 px-4">Autor</th>
                      <th className="py-3.5 px-4">Data</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {filteredPosts.map(post => (
                      <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                        
                        {/* Title & Cover */}
                        <td className="py-4 px-4 max-w-xs sm:max-w-md">
                          <div className="flex items-center gap-3">
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                            />
                            <div className="space-y-0.5">
                              <span className="font-bold text-slate-900 block leading-tight line-clamp-1 hover:text-blue-700 transition-colors cursor-pointer" onClick={() => handleEditPost(post)}>
                                {post.title}
                              </span>
                              <span className="text-[11px] text-slate-400 block line-clamp-1">
                                /{post.slug}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4 font-bold text-slate-700 whitespace-nowrap">
                          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                            {post.category}
                          </span>
                        </td>

                        {/* Author */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-slate-600">
                            <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                            <span className="font-semibold text-xs">{post.author.name}</span>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                          {post.date}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleStatus(post)}
                            title="Clique para alterar entre Publicado e Rascunho"
                            className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 border transition-all ${
                              post.status === 'draft'
                                ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'draft' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                            {post.status === 'draft' ? 'Rascunho' : 'Publicado'}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/blog/${post.slug}`}
                              target="_blank"
                              title="Visualizar Artigo no Site"
                              className="p-2 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>

                            <button
                              onClick={() => handleEditPost(post)}
                              title="Editar Artigo"
                              className="p-2 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors font-bold flex items-center gap-1"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>

                            <button
                              onClick={() => handleDeletePost(post)}
                              title="Excluir Artigo"
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB CONTENT 2: CLIENT PAGES MANAGER */}
      {activeTab === 'client-pages' && (
        <div className="w-full">
          <ClientPagesManager onShowToast={showToast} />
        </div>
      )}

      {/* TAB CONTENT 3: OZZY CHAT & LEADS CRM */}
      {activeTab === 'ozzy-chat' && (
        <div className="w-full">
          <OzzyChatManager />
        </div>
      )}

      {/* TAB CONTENT 4: OZZY KNOWLEDGE BASE & AI TRAINING */}
      {activeTab === 'ozzy-knowledge' && (
        <div className="w-full">
          <OzzyKnowledgeManager />
        </div>
      )}

      {/* TAB CONTENT 5: TABELA DE PREÇOS & PROPOSTAS COMERCIAIS */}
      {activeTab === 'proposals' && (
        <div className="w-full">
          <ProposalsManager onNotify={(msg, type) => showToast(type === 'error' ? 'error' : 'success', msg)} />
        </div>
      )}

      {/* TAB CONTENT 6: PROMO SETTINGS & POPUP SWITCHES */}
      {activeTab === 'promo-settings' && (
        <div className="w-full">
          <PromoSettingsManager onShowToast={showToast} />
        </div>
      )}

      {/* TAB CONTENT 7: DATABASE MYSQL MANAGEMENT */}
      {activeTab === 'database' && (
        <div className="w-full">
          <DatabaseManager />
        </div>
      )}


      {/* TAB CONTENT 3: POST EDITOR (CREATE / EDIT) */}
      {activeTab === 'editor' && (
        <div className="w-full space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Header / Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="font-display text-xl font-extrabold text-slate-900">
                  {editingPostId ? `Editar Artigo #${editingPostId}` : 'Criar Novo Artigo para o Blog'}
                </h2>
                <p className="text-xs text-slate-500">
                  Preencha os campos abaixo e visualize o resultado final em tempo real antes de publicar.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setEditorMode('edit')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    editorMode === 'edit'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Edit3 className="h-3.5 w-3.5" /> Formulário de Edição
                </button>
                <button
                  type="button"
                  onClick={() => setEditorMode('preview')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    editorMode === 'preview'
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" /> Pré-visualização Ao Vivo
                </button>
              </div>
            </div>

            {/* IF PREVIEW MODE ACTIVE */}
            {editorMode === 'preview' ? (
              <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-xl text-xs text-orange-800 font-bold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-orange-500 shrink-0" />
                  <span>Esta é a demonstração exata de como seu artigo aparecerá para os leitores no Blog.</span>
                </div>

                <BlogPostContent 
                  post={{
                    id: editingPostId || 999,
                    title: formData.title || 'Título do Artigo em Destaque',
                    slug: formData.slug || 'slug-do-artigo',
                    excerpt: formData.excerpt || 'Resumo explicativo sobre o artigo...',
                    content: formData.content || 'Conteúdo do artigo...',
                    date: formData.date || 'Hoje',
                    category: (formData.category as any) || 'WordPress',
                    featuredImage: formData.featuredImage || PRESET_IMAGES[0].url,
                    author: formData.author || PRESET_AUTHORS[0]
                  }} 
                />
              </div>
            ) : (
              /* EDITOR FORM */
              <form onSubmit={handleSavePost} className="space-y-6">
                
                {/* 1. Title & Slug */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-8 space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Título do Artigo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleTitleChange}
                      placeholder="Ex: Como Aumentar a Velocidade do Seu WordPress em 2026"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="md:col-span-4 space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      URL Amigável (Slug)
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="como-aumentar-velocidade-wordpress"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 font-mono focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* 2. Category & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  
                  <div className="sm:col-span-6 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                        Categoria *
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowCustomCategory(!showCustomCategory)}
                        className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-1"
                      >
                        <FolderPlus className="h-3 w-3" /> {showCustomCategory ? 'Usar Categoria Existente' : '+ Criar Nova Categoria'}
                      </button>
                    </div>

                    {showCustomCategory ? (
                      <input
                        type="text"
                        placeholder="Nome da Nova Categoria (Ex: Inteligência Artificial)"
                        value={customCategoryInput}
                        onChange={(e) => setCustomCategoryInput(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                      />
                    ) : (
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                      >
                        <option value="WordPress">WordPress</option>
                        <option value="Hospedagem">Hospedagem & Cloud</option>
                        <option value="SEO">SEO & Posicionamento</option>
                        <option value="Acessibilidade">Acessibilidade Digital</option>
                        <option value="Segurança">Segurança & WAF</option>
                        <option value="Design">UX/UI & Design</option>
                        {categories.filter(c => !['WordPress', 'Hospedagem', 'SEO', 'Acessibilidade', 'Segurança', 'Design'].includes(c)).map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="sm:col-span-6 space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Status de Publicação
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'published' | 'draft' }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                    >
                      <option value="published">🟢 Publicado (Visível no Blog)</option>
                      <option value="draft">🟡 Rascunho (Apenas no Painel)</option>
                    </select>
                  </div>

                </div>

                {/* 3. Excerpt */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Resumo de Destaque (Excerpt) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Escreva uma breve introdução impactante de 2 a 3 linhas para os cards de listagem e mecanismos de busca..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* 4. Featured Image Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                    <span>Imagem de Capa (URL)</span>
                    <span className="text-[11px] text-slate-400 font-normal">Selecione um banco predefinido ou informe uma URL Unsplash</span>
                  </label>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                    />
                    
                    {formData.featuredImage && (
                      <img
                        src={formData.featuredImage}
                        alt="Preview Capa"
                        className="w-16 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                      />
                    )}
                  </div>

                  {/* Preset Image Options */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-bold text-slate-400">Sugestões de Capa:</span>
                    {PRESET_IMAGES.map((img, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setFormData(prev => ({ ...prev, featuredImage: img.url }))}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                          formData.featuredImage === img.url
                            ? 'bg-orange-500 text-white border-orange-600'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Author Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Autor do Artigo
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {PRESET_AUTHORS.map((auth, i) => {
                      const isSelected = formData.author?.name === auth.name;
                      return (
                        <div
                          key={i}
                          onClick={() => setFormData(prev => ({ ...prev, author: auth }))}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                            isSelected
                              ? 'bg-blue-50 border-blue-500 shadow-sm'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <img src={auth.avatar} alt={auth.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                          <div className="space-y-0.5 overflow-hidden">
                            <span className="font-bold text-xs text-slate-900 block truncate">{auth.name}</span>
                            <span className="text-[10px] text-slate-500 block truncate">{auth.role}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Content Editor & Formatting Toolbar */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Conteúdo Completo do Artigo (Markdown Suportado) *
                    </label>
                    <span className="text-[11px] text-slate-400">Suporta formatação rich text, subtítulos e listas.</span>
                  </div>

                  {/* Formatting Toolbar */}
                  <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-2 rounded-t-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => insertFormatting('## ', '')}
                      title="Subtítulo H2"
                      className="px-2.5 py-1 text-xs font-extrabold bg-white border border-slate-200 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-1"
                    >
                      <Heading1 className="h-3.5 w-3.5 text-blue-700" /> H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('### ', '')}
                      title="Subtítulo H3"
                      className="px-2.5 py-1 text-xs font-bold bg-white border border-slate-200 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-1"
                    >
                      <Heading2 className="h-3.5 w-3.5 text-blue-700" /> H3
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('**', '**')}
                      title="Negrito"
                      className="px-2.5 py-1 text-xs font-black bg-white border border-slate-200 rounded hover:bg-slate-50 text-slate-700"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('* ', '')}
                      title="Lista de Marcadores"
                      className="px-2.5 py-1 text-xs font-bold bg-white border border-slate-200 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-1"
                    >
                      <List className="h-3.5 w-3.5 text-orange-500" /> Lista
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('> ', '')}
                      title="Citação"
                      className="px-2.5 py-1 text-xs font-bold bg-white border border-slate-200 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-1"
                    >
                      <Quote className="h-3.5 w-3.5 text-slate-500" /> Citação
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('```\n', '\n```')}
                      title="Bloco de Código"
                      className="px-2.5 py-1 text-xs font-mono font-bold bg-white border border-slate-200 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-1"
                    >
                      <Code className="h-3.5 w-3.5 text-emerald-600" /> Código
                    </button>
                  </div>

                  {/* Textarea */}
                  <textarea
                    id="post-content-textarea"
                    rows={16}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full bg-slate-50 border border-t-0 border-slate-200 rounded-b-xl p-4 text-xs sm:text-sm font-sans text-slate-900 leading-relaxed focus:outline-none focus:border-blue-600 font-medium"
                    placeholder="Escreva seu artigo aqui..."
                  />
                </div>

                {/* Submit Action Bar */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  
                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Cancelar e Voltar
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setEditorMode('preview')}
                      className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4 text-orange-500" /> Pré-visualizar
                    </button>

                    <button
                      type="submit"
                      disabled={isSavingPost}
                      className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-8 py-3 rounded-xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSavingPost ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" /> Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" /> {editingPostId ? 'Salvar Alterações' : 'Publicar Artigo Agora'}
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </form>
            )}

          </div>

        </div>
      )}

          </div>
        </main>
      </div>
    </div>
  );
}
