import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  MessageSquare,
  Sparkles,
  User,
  Users,
  Building,
  Phone,
  Mail,
  MapPin,
  Tag,
  DollarSign,
  Search,
  Filter,
  Send,
  Lock,
  RotateCcw,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Plus,
  Trash2,
  Star,
  Zap,
  PhoneCall,
  Flame,
  Globe,
  Radio,
  Edit3,
  Check,
  AlertCircle,
  Copy,
  ArrowRight,
  Shield,
  Layers,
  ArrowUpRight,
  Smile,
  Paperclip,
  MessageCircle,
  TrendingUp,
  Inbox,
  Cpu,
  Sliders,
  Activity,
  Calendar,
  Settings,
  ListFilter
} from 'lucide-react';
import {
  Conversation,
  ConversationMessage,
  ConversationStage,
  ConversationStats,
  MessageRole,
  CommunicationChannel,
  LeadContact,
  AgentSettings,
  AgentActivityLog,
  ToolActionResult
} from '../types/ozzyChat';
import {
  fetchConversations,
  sendConversationMessage,
  updateConversationDetails,
  deleteConversationApi,
  createConversationApi,
  requestAiCopilotSuggestion,
  resetDemoConversationsApi,
  fetchAgentSettings,
  updateAgentSettings,
  fetchAgentLogs,
  clearAgentLogs,
  executeAgentToolApi
} from '../services/ozzyConversationsApi';

// Funnel Stage configuration with clean, subtle light badges
const STAGE_CONFIG: Record<ConversationStage, { label: string; bg: string; text: string; border: string }> = {
  novo_lead: { label: 'Novo Lead', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  qualificado: { label: 'Qualificado (IA)', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  proposta: { label: 'Proposta Enviada', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  negociacao: { label: 'Em Negociação', bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' },
  fechado: { label: 'Fechado / Ganho', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
  perdido: { label: 'Perdido', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' }
};

// Canned response templates
const CANNED_RESPONSES = [
  {
    title: 'Apresentar Solução 360°',
    content: 'Olá! A **Solução 360 Graus da AGÊNCIA OZ** reúne tudo o que seu negócio precisa em uma única parceria: desenvolvimento do site WordPress ultra-rápido, hospedagem Cloud blindada com cPanel, e-mails corporativos, artes para redes sociais e SEO no Google. Podemos enviar uma proposta personalizada?'
  },
  {
    title: 'Hospedagem & Migração Grátis',
    content: 'Olá! Oferecemos migração 100% gratuita do seu site e e-mails para nossos servidores Cloud NVMe de alta performance com cPanel. Seus e-mails contarão com SPF, DKIM e DMARC configurados para máxima entregabilidade.'
  },
  {
    title: 'Agendar Conversa no WhatsApp',
    content: 'Que ótimo! Podemos agendar uma conversa rápida de 15 minutos pelo WhatsApp Oficial da AGÊNCIA OZ no número (48) 99198-4678 para analisarmos sua estrutura atual sem compromisso.'
  },
  {
    title: 'Mídia & Criativos Redes Sociais',
    content: 'Olá! No nosso serviço de Mídia & Criativos, desenvolvemos posts estratégicos para Instagram e Facebook (Feed, Stories, Carrosséis) com copywriting de alta conversão alinhado ao seu site e campanhas.'
  },
  {
    title: 'Dados para Pagamento / PIX',
    content: 'Para formalizarmos o projeto, trabalhamos com contrato e pagamento facilitado via PIX ou cartão de crédito em até 12x. Enviaremos a fatura e o contrato assinado digitalmente.'
  }
];

export default function OzzyChatManager() {
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stats, setStats] = useState<ConversationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<'all' | 'unread' | 'ai' | 'human' | 'whatsapp'>('all');
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('all');
  
  // Composer state
  const [composerMode, setComposerMode] = useState<'web_chat' | 'whatsapp' | 'internal_note'>('web_chat');
  const [messageInput, setMessageInput] = useState('');
  const [sending, setSending] = useState(false);
  const [isCopilotLoading, setIsCopilotLoading] = useState(false);
  const [copilotSuggestion, setCopilotSuggestion] = useState<string | null>(null);

  // Contact editing state
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [editForm, setEditForm] = useState<Partial<LeadContact>>({});
  const [newTagInput, setNewTagInput] = useState('');

  // New Lead Modal state
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    company: '',
    phone: '',
    socialMedia: '',
    email: '',
    city: 'Canoas',
    state: 'RS',
    segment: 'Comércio / Serviços',
    stage: 'novo_lead' as ConversationStage,
    dealValue: 2490,
    tags: '#solucao360',
    initialMessage: ''
  });

  // Agent Management State
  const [isAgentSettingsOpen, setIsAgentSettingsOpen] = useState(false);
  const [isAgentLogsOpen, setIsAgentLogsOpen] = useState(false);
  const [agentSettings, setAgentSettings] = useState<AgentSettings | null>(null);
  const [agentLogs, setAgentLogs] = useState<AgentActivityLog[]>([]);
  const [isExecutingAgentTool, setIsExecutingAgentTool] = useState(false);
  const [toolExecuteFeedback, setToolExecuteFeedback] = useState<string | null>(null);

  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Load Agent Settings & Logs
  const loadAgentConfig = async () => {
    try {
      const [settingsData, logsData] = await Promise.all([
        fetchAgentSettings(),
        fetchAgentLogs()
      ]);
      setAgentSettings(settingsData);
      setAgentLogs(logsData);
    } catch (err) {
      console.warn('Error fetching agent data:', err);
    }
  };

  useEffect(() => {
    loadAgentConfig();
  }, []);

  // Load conversations on mount or filter change
  const loadData = async () => {
    setLoading(true);
    try {
      let unreadOnly = selectedSegment === 'unread';
      let assignedTo = selectedSegment === 'ai' ? 'ozzy_ai' : selectedSegment === 'human' ? 'human_agent' : undefined;
      let channel = selectedSegment === 'whatsapp' ? 'whatsapp' : undefined;

      const data = await fetchConversations({
        search: searchTerm,
        stage: selectedStageFilter !== 'all' ? selectedStageFilter : undefined,
        unreadOnly,
        assignedTo,
        channel
      });

      setConversations(data.conversations);
      setStats(data.stats);

      // Select first conversation if none selected
      if (!selectedId && data.conversations.length > 0) {
        setSelectedId(data.conversations[0].id);
      } else if (selectedId && !data.conversations.some(c => c.id === selectedId) && data.conversations.length > 0) {
        setSelectedId(data.conversations[0].id);
      }
    } catch (err) {
      console.error('Error loading conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchTerm, selectedSegment, selectedStageFilter]);

  // Selected conversation object
  const activeConv = conversations.find(c => c.id === selectedId) || null;

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [activeConv?.messages]);

  // Initialize edit contact form when selection changes
  useEffect(() => {
    if (activeConv) {
      setEditForm(activeConv.contact);
      setIsEditingContact(false);
      setCopilotSuggestion(null);
    }
  }, [activeConv?.id]);

  // Send message or internal note handler
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeConv || !messageInput.trim() || sending) return;

    const content = messageInput.trim();
    setSending(true);

    try {
      let role: MessageRole = 'human_agent';
      let channel: CommunicationChannel = 'web_chat';
      let senderName = 'Equipe OZ Digital';

      if (composerMode === 'internal_note') {
        role = 'internal_note';
        channel = 'internal';
        senderName = 'Nota Interna (Equipe OZ)';
      } else if (composerMode === 'whatsapp') {
        role = 'human_agent';
        channel = 'whatsapp';
        senderName = 'Atendimento WhatsApp OZ';
      }

      const res = await sendConversationMessage(activeConv.id, {
        role,
        content,
        senderName,
        channel
      });

      if (res.success) {
        setMessageInput('');
        setCopilotSuggestion(null);
        setConversations(prev => prev.map(c => c.id === activeConv.id ? res.conversation : c));
      }
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  // Toggle AI vs Human assignment
  const handleToggleAssignment = async () => {
    if (!activeConv) return;
    const newAssigned = activeConv.assignedTo === 'ozzy_ai' ? 'human_agent' : 'ozzy_ai';
    const updated = await updateConversationDetails(activeConv.id, { assignedTo: newAssigned });
    setConversations(prev => prev.map(c => c.id === activeConv.id ? updated : c));
  };

  // Toggle Star
  const handleToggleStar = async (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const conv = conversations.find(c => c.id === convId);
    if (!conv) return;
    const updated = await updateConversationDetails(convId, { isStarred: !conv.isStarred });
    setConversations(prev => prev.map(c => c.id === convId ? updated : c));
  };

  // Agent Settings Toggle
  const handleToggleAgentAutonomy = async (mode: 'autonomous' | 'copilot') => {
    if (!agentSettings) return;
    try {
      const updated = await updateAgentSettings({ autonomyMode: mode });
      setAgentSettings(updated);
    } catch (err) {
      alert('Erro ao atualizar modo do agente');
    }
  };

  const handleToggleAgentTool = async (toolKey: keyof AgentSettings['toolsEnabled']) => {
    if (!agentSettings) return;
    try {
      const newTools = {
        ...agentSettings.toolsEnabled,
        [toolKey]: !agentSettings.toolsEnabled[toolKey]
      };
      const updated = await updateAgentSettings({ toolsEnabled: newTools });
      setAgentSettings(updated);
    } catch (err) {
      alert('Erro ao atualizar ferramenta do agente');
    }
  };

  const handleClearAgentLogs = async () => {
    if (!confirm('Deseja limpar todos os logs de atividade do agente?')) return;
    const ok = await clearAgentLogs();
    if (ok) {
      setAgentLogs([]);
    }
  };

  // Trigger an Agent tool directly for the current conversation
  const handleExecuteAgentTool = async (toolName: string, customParams?: any) => {
    if (!activeConv || isExecutingAgentTool) return;

    setIsExecutingAgentTool(true);
    setToolExecuteFeedback(`OZZY executando ferramenta: ${toolName}...`);

    try {
      let params = customParams || {};

      if (toolName === 'generate_instant_proposal') {
        params = {
          clientName: activeConv.contact.name || 'Cliente',
          company: activeConv.contact.company || 'Empresa',
          segment: activeConv.contact.segment || 'Serviços & Comércio',
          packageType: 'completo_360',
          city: activeConv.contact.city || 'Canoas / RS',
          needsStore: false,
          needsRadio: false
        };
      } else if (toolName === 'check_domain_availability') {
        const rawDomain = activeConv.contact.company
          ? activeConv.contact.company.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com.br'
          : 'empresaexemplo.com.br';
        params = { domain: rawDomain };
      } else if (toolName === 'schedule_diagnostic_meeting') {
        params = {
          clientName: activeConv.contact.name || 'Cliente',
          phone: activeConv.contact.phone || '(48) 99198-4678',
          company: activeConv.contact.company || 'Empresa',
          preferredChannel: 'whatsapp',
          timeframe: 'proximos_2_dias'
        };
      } else if (toolName === 'calculate_roi_performance') {
        params = {
          currentMonthlyVisits: 3500,
          averageTicket: 350,
          currentLoadTimeSec: 4.8
        };
      }

      const toolResult = await executeAgentToolApi(toolName, params, activeConv.contact.name);

      // Build text summary based on tool result
      let generatedMessage = '';
      if (toolName === 'generate_instant_proposal') {
        generatedMessage = `💼 **Proposta Comercial Solução 360 Graus Gerada com Sucesso!**\n\n` +
          `• **Proposta:** #${toolResult.data.proposalId}\n` +
          `• **Setup do Projeto:** ${toolResult.data.setupPriceFormatted}\n` +
          `• **Mensalidade Cloud:** ${toolResult.data.monthlyPriceFormatted}\n` +
          `• **Prazo de Entrega:** ${toolResult.data.deliveryDays}\n\n` +
          `Acesse os entregáveis no card abaixo ou finalize diretamente no WhatsApp da AGÊNCIA OZ!`;
      } else if (toolName === 'check_domain_availability') {
        generatedMessage = `🔍 **Consulta de Domínio Realizada:**\n\n` +
          `O domínio **${toolResult.data.domain}** está **${toolResult.data.available ? 'LIVRE PARA REGISTRO ✅' : 'JÁ REGISTRADO ⚠️'}**.\n` +
          `Valor anual: ${toolResult.data.annualPrice} (${toolResult.data.registrar}).`;
      } else if (toolName === 'schedule_diagnostic_meeting') {
        generatedMessage = `📅 **Diagnóstico Estratégico Agendado:**\n\n` +
          `• **Horário:** ${toolResult.data.dateTime}\n` +
          `• **Canal:** ${toolResult.data.channel}\n` +
          `• **Código:** ${toolResult.data.meetingId}\n\n` +
          `Nossa equipe enviou o lembrete para o WhatsApp ${activeConv.contact.phone || 'cadastrado'}.`;
      } else if (toolName === 'calculate_roi_performance') {
        generatedMessage = `📊 **Relatório de Impacto & Otimização de Performance:**\n\n` +
          `• **Ganho de Velocidade Estimado:** ${toolResult.data.speedGain}\n` +
          `• **Redução de Taxa de Rejeição:** ${toolResult.data.bounceReduction}\n` +
          `• **Aumento de Conversão:** ${toolResult.data.conversionIncrease}\n` +
          `• **Impacto Anual Estimado:** ${toolResult.data.annualEstimateImpact}`;
      }

      // Send to conversation with toolAction
      const msgRes = await sendConversationMessage(activeConv.id, {
        role: 'assistant',
        content: generatedMessage,
        senderName: 'OZZY Agente IA (Autônomo)',
        channel: activeConv.channel
      });

      if (msgRes.success) {
        // Attach toolAction to the created message in state
        msgRes.message.toolAction = toolResult;
        setConversations(prev => prev.map(c => {
          if (c.id === activeConv.id) {
            return {
              ...c,
              messages: [...c.messages, msgRes.message],
              lastMessage: generatedMessage,
              lastMessageAt: new Date().toISOString()
            };
          }
          return c;
        }));
      }

      // Refresh logs
      const updatedLogs = await fetchAgentLogs();
      setAgentLogs(updatedLogs);

      setToolExecuteFeedback(`✅ ${toolResult.actionLabel} executada com sucesso!`);
      setTimeout(() => setToolExecuteFeedback(null), 4000);
    } catch (err: any) {
      console.error('Error executing tool:', err);
      setToolExecuteFeedback(`❌ Erro: ${err.message}`);
      setTimeout(() => setToolExecuteFeedback(null), 4000);
    } finally {
      setIsExecutingAgentTool(false);
    }
  };

  // Change stage handler
  const handleStageChange = async (newStage: ConversationStage) => {
    if (!activeConv) return;
    const updated = await updateConversationDetails(activeConv.id, { stage: newStage });
    setConversations(prev => prev.map(c => c.id === activeConv.id ? updated : c));
  };

  // Update deal value handler
  const handleDealValueChange = async (newVal: number) => {
    if (!activeConv) return;
    const updated = await updateConversationDetails(activeConv.id, { dealValue: newVal });
    setConversations(prev => prev.map(c => c.id === activeConv.id ? updated : c));
  };

  // Add tag handler
  const handleAddTag = async () => {
    if (!activeConv || !newTagInput.trim()) return;
    let tag = newTagInput.trim();
    if (!tag.startsWith('#')) tag = '#' + tag;
    if (activeConv.tags.includes(tag)) return;

    const newTags = [...activeConv.tags, tag];
    const updated = await updateConversationDetails(activeConv.id, { tags: newTags });
    setConversations(prev => prev.map(c => c.id === activeConv.id ? updated : c));
    setNewTagInput('');
  };

  // Remove tag handler
  const handleRemoveTag = async (tagToRemove: string) => {
    if (!activeConv) return;
    const newTags = activeConv.tags.filter(t => t !== tagToRemove);
    const updated = await updateConversationDetails(activeConv.id, { tags: newTags });
    setConversations(prev => prev.map(c => c.id === activeConv.id ? updated : c));
  };

  // Save contact edits
  const handleSaveContact = async () => {
    if (!activeConv) return;
    const updated = await updateConversationDetails(activeConv.id, {
      contact: {
        ...activeConv.contact,
        ...editForm
      } as LeadContact
    });
    setConversations(prev => prev.map(c => c.id === activeConv.id ? updated : c));
    setIsEditingContact(false);
  };

  // Request Copilot Suggestion
  const handleGetCopilotSuggestion = async () => {
    if (!activeConv || isCopilotLoading) return;
    setIsCopilotLoading(true);
    try {
      const res = await requestAiCopilotSuggestion(activeConv.id);
      setCopilotSuggestion(res.suggestion);
    } catch (err) {
      console.error('Error fetching copilot suggestion:', err);
    } finally {
      setIsCopilotLoading(false);
    }
  };

  // Apply suggestion to input
  const applyCopilotSuggestion = () => {
    if (copilotSuggestion) {
      setMessageInput(copilotSuggestion);
      setCopilotSuggestion(null);
    }
  };

  // Delete Conversation
  const handleDeleteConversation = async (convId: string) => {
    if (!confirm('Deseja realmente arquivar/excluir esta conversa?')) return;
    const ok = await deleteConversationApi(convId);
    if (ok) {
      setConversations(prev => prev.filter(c => c.id !== convId));
      if (selectedId === convId) {
        setSelectedId(null);
      }
    }
  };

  // Reset demo data
  const handleResetDemo = async () => {
    if (!confirm('Restaurar conversas de demonstração do CRM?')) return;
    const resetList = await resetDemoConversationsApi();
    setConversations(resetList);
    if (resetList.length > 0) {
      setSelectedId(resetList[0].id);
    }
    loadData();
  };

  // Create new lead submit
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadData.name.trim()) return;

    const tagsArray = newLeadData.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
      .map(t => t.startsWith('#') ? t : '#' + t);

    const created = await createConversationApi({
      contact: {
        name: newLeadData.name,
        company: newLeadData.company,
        phone: newLeadData.phone,
        socialMedia: newLeadData.socialMedia,
        email: newLeadData.email,
        city: newLeadData.city,
        state: newLeadData.state,
        segment: newLeadData.segment
      },
      stage: newLeadData.stage,
      channel: 'web_chat',
      tags: tagsArray,
      dealValue: Number(newLeadData.dealValue) || 1500,
      initialMessage: newLeadData.initialMessage || 'Olá, gostaria de saber mais sobre os serviços da AGÊNCIA OZ.'
    });

    setConversations(prev => [created, ...prev]);
    setSelectedId(created.id);
    setIsNewLeadModalOpen(false);
    setNewLeadData({
      name: '',
      company: '',
      phone: '',
      socialMedia: '',
      email: '',
      city: 'Canoas',
      state: 'RS',
      segment: 'Comércio / Serviços',
      stage: 'novo_lead',
      dealValue: 2490,
      tags: '#solucao360',
      initialMessage: ''
    });
  };

  return (
    <div className="space-y-5">
      {/* 1. TOP STATS BAR - Clean, Spacious & Light */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Header Title & Subtitle */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight font-display">
                Central de Atendimento & CRM
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Ozzy Ativo
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Gestão de conversas web, WhatsApp, transbordo para equipe e funil de vendas.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setIsAgentSettingsOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs px-3 py-2 rounded-xl shadow-xs border border-amber-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Configurar ferramentas e autonomia do agente Ozzy"
            >
              <Cpu className="w-4 h-4 text-orange-400" />
              <span>Agente Autônomo</span>
              <span className={`w-2 h-2 rounded-full ${agentSettings?.autonomyMode === 'autonomous' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            </button>

            <button
              onClick={() => setIsAgentLogsOpen(true)}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Ver histórico de execuções das ferramentas do agente"
            >
              <Activity className="w-3.5 h-3.5 text-slate-500" />
              <span>Logs ({agentLogs.length})</span>
            </button>

            <button
              onClick={() => setIsNewLeadModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Lead</span>
            </button>
            <button
              onClick={loadData}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Atualizar conversas"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Atualizar</span>
            </button>
            <button
              onClick={handleResetDemo}
              className="text-xs text-slate-400 hover:text-slate-600 px-2.5 py-2 transition-colors cursor-pointer"
              title="Restaurar dados de demonstração"
            >
              Restaurar Demo
            </button>
          </div>
        </div>

        {/* 4 Clean Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
          <div className="bg-slate-50/70 border border-slate-100 p-3 rounded-xl">
            <span className="text-[11px] font-medium text-slate-500">Total de Conversas</span>
            <div className="text-lg font-bold text-slate-900 mt-0.5">{stats?.total || 0}</div>
          </div>
          <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-xl">
            <span className="text-[11px] font-medium text-amber-700">Mensagens Não Lidas</span>
            <div className="text-lg font-bold text-amber-900 mt-0.5">{stats?.unread || 0}</div>
          </div>
          <div className="bg-orange-50/50 border border-orange-100 p-3 rounded-xl">
            <span className="text-[11px] font-medium text-orange-700">Atendimentos IA (24/7)</span>
            <div className="text-lg font-bold text-orange-900 mt-0.5">{stats?.handledByAi || 0}</div>
          </div>
          <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl">
            <span className="text-[11px] font-medium text-emerald-700">Pipeline de Vendas</span>
            <div className="text-lg font-bold text-emerald-900 mt-0.5">
              R$ {(stats?.totalDealValue || 0).toLocaleString('pt-BR')}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 3-COLUMN WORKSPACE - Refined Light Design */}
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs min-h-[720px] w-full">
        
        {/* ================= COLUMN 1: INBOX LIST (4 cols on lg, 3 on xl+) ================= */}
        <div className="lg:col-span-4 xl:col-span-3 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50/40">
          
          {/* Search & Segments */}
          <div className="p-3.5 space-y-2.5 border-b border-slate-200 bg-white">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nome, empresa ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-7 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] no-scrollbar">
              <button
                onClick={() => setSelectedSegment('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSegment === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Todos ({conversations.length})
              </button>
              <button
                onClick={() => setSelectedSegment('unread')}
                className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSegment === 'unread'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Não Lidos ({stats?.unread || 0})
              </button>
              <button
                onClick={() => setSelectedSegment('ai')}
                className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSegment === 'ai'
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                IA Ozzy
              </button>
              <button
                onClick={() => setSelectedSegment('human')}
                className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSegment === 'human'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Humano
              </button>
              <button
                onClick={() => setSelectedSegment('whatsapp')}
                className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSegment === 'whatsapp'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                WhatsApp
              </button>
            </div>

            {/* Funnel Stage Filter */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
              <span className="text-[11px] font-medium text-slate-400">Etapa:</span>
              <select
                value={selectedStageFilter}
                onChange={(e) => setSelectedStageFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] text-slate-700 focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="all">Todas as Etapas</option>
                <option value="novo_lead">Novo Lead</option>
                <option value="qualificado">Qualificado (IA)</option>
                <option value="proposta">Proposta Enviada</option>
                <option value="negociacao">Em Negociação</option>
                <option value="fechado">Fechado / Ganho</option>
                <option value="perdido">Perdido</option>
              </select>
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div className="flex-1 overflow-y-auto max-h-[580px] divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-slate-400 text-xs">Carregando conversas...</div>
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <Inbox className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500 font-medium">Nenhuma conversa nesta categoria</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedSegment('all'); setSelectedStageFilter('all'); }}
                  className="text-xs text-orange-600 hover:underline font-semibold cursor-pointer"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              conversations.map((conv) => {
                const isSelected = conv.id === selectedId;
                const stageInfo = STAGE_CONFIG[conv.stage] || STAGE_CONFIG.novo_lead;
                const isAi = conv.assignedTo === 'ozzy_ai';

                return (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedId(conv.id)}
                    className={`p-3.5 transition-colors cursor-pointer relative ${
                      isSelected
                        ? 'bg-orange-50/70 border-l-4 border-orange-500'
                        : 'bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isAi ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {conv.contact.name.slice(0, 2).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                            <span>{conv.contact.name}</span>
                            {conv.isStarred && <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />}
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate">
                            {conv.contact.company || conv.contact.city || 'Sem empresa'}
                          </p>
                        </div>
                      </div>

                      {/* Time & Unread Indicator */}
                      <div className="text-right shrink-0 flex flex-col items-end gap-1">
                        <span className="text-[10px] text-slate-400">
                          {new Date(conv.lastMessageAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {conv.unreadCount > 0 && (
                          <span className="w-4 h-4 rounded-full bg-orange-500 text-white font-bold text-[9px] flex items-center justify-center">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Message Snippet */}
                    <p className={`text-[11px] mt-1.5 line-clamp-1 leading-relaxed ${
                      conv.unreadCount > 0 ? 'text-slate-900 font-semibold' : 'text-slate-600'
                    }`}>
                      {conv.lastMessage}
                    </p>

                    {/* Bottom Metadata */}
                    <div className="flex items-center justify-between gap-1.5 mt-2 text-[10px]">
                      <span className={`px-2 py-0.5 rounded-md font-semibold border ${stageInfo.bg} ${stageInfo.text} ${stageInfo.border}`}>
                        {stageInfo.label}
                      </span>

                      {conv.dealValue > 0 && (
                        <span className="font-semibold text-emerald-700">
                          R$ {conv.dealValue.toLocaleString('pt-BR')}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ================= COLUMN 2: ACTIVE CHAT THREAD (5 cols on lg, 6 on xl+) ================= */}
        <div className="lg:col-span-5 xl:col-span-6 flex flex-col bg-slate-50/30 border-b lg:border-b-0 lg:border-r border-slate-200">
          {activeConv ? (
            <>
              {/* Thread Header - Clean & No overlapping items */}
              <div className="p-3.5 bg-white border-b border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-xs font-bold shrink-0">
                    {activeConv.contact.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-xs font-bold text-slate-900 truncate">{activeConv.contact.name}</h3>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {activeConv.channel === 'whatsapp' ? 'WhatsApp' : activeConv.channel === 'lp_form' ? 'Formulário' : 'Web Chat'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">
                      {activeConv.contact.company || 'Contato Direto'} {activeConv.contact.phone && `• ${activeConv.contact.phone}`}
                    </p>
                  </div>
                </div>

                {/* Assignment & Top Quick Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleToggleAssignment}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeConv.assignedTo === 'ozzy_ai'
                        ? 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                    title="Alternar entre atendimento por IA ou Humano"
                  >
                    {activeConv.assignedTo === 'ozzy_ai' ? (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                        <span>IA Ozzy</span>
                      </>
                    ) : (
                      <>
                        <User className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Humano</span>
                      </>
                    )}
                  </button>

                  {activeConv.contact.phone && (
                    <a
                      href={`https://wa.me/55${activeConv.contact.phone.replace(/\D/g, '')}?text=Ol%C3%A1+${encodeURIComponent(activeConv.contact.name)}%2C+sou+da+AG%C3%8ANCIA+OZ.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                      title="Abrir WhatsApp oficial"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                    </a>
                  )}

                  <button
                    onClick={(e) => handleToggleStar(activeConv.id, e)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      activeConv.isStarred
                        ? 'bg-amber-50 text-amber-600 border-amber-200'
                        : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700'
                    }`}
                    title="Favoritar conversa"
                  >
                    <Star className={`w-4 h-4 ${activeConv.isStarred ? 'fill-amber-500 text-amber-500' : ''}`} />
                  </button>

                  <button
                    onClick={() => handleDeleteConversation(activeConv.id)}
                    className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer"
                    title="Excluir / Arquivar conversa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Message Stream - Clean Bubbles with Good Readability */}
              <div
                ref={chatScrollRef}
                className="flex-1 p-4 overflow-y-auto max-h-[440px] space-y-3.5 bg-slate-50/50"
              >
                {activeConv.messages.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Nenhuma mensagem registrada nesta conversa.
                  </div>
                ) : (
                  activeConv.messages.map((msg) => {
                    const isUser = msg.role === 'user';
                    const isAssistant = msg.role === 'assistant';
                    const isHuman = msg.role === 'human_agent';
                    const isNote = msg.role === 'internal_note';

                    // Private internal note
                    if (isNote) {
                      return (
                        <div
                          key={msg.id}
                          className="bg-amber-50 border border-dashed border-amber-300 rounded-xl p-3 space-y-1 my-2 text-amber-900 text-xs"
                        >
                          <div className="flex items-center justify-between text-[10px] font-bold text-amber-700">
                            <span className="flex items-center gap-1">
                              <Lock className="w-3 h-3 text-amber-600" />
                              Nota Interna • {msg.senderName}
                            </span>
                            <span>{new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <p className="text-xs text-amber-950 leading-relaxed font-sans">{msg.content}</p>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${isUser ? 'justify-start' : 'justify-end'}`}
                      >
                        {isUser && (
                          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-1">
                            <User className="w-3 h-3" />
                          </div>
                        )}

                        <div className={`max-w-[85%] space-y-1 ${isUser ? 'items-start' : 'items-end'}`}>
                          {/* Sender & Timestamp */}
                          <div className={`flex items-center gap-1.5 text-[10px] text-slate-400 ${isUser ? '' : 'justify-end'}`}>
                            <span className="font-semibold text-slate-600">{msg.senderName}</span>
                            <span>•</span>
                            <span>{new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>

                          {/* Message Bubble */}
                          <div
                            className={`p-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                              isUser
                                ? 'bg-white text-slate-800 rounded-tl-xs border border-slate-200'
                                : isAssistant
                                ? 'bg-amber-50/90 text-slate-800 rounded-tr-xs border border-amber-200'
                                : 'bg-emerald-50 text-slate-800 rounded-tr-xs border border-emerald-200'
                            }`}
                          >
                            {isAssistant && (
                              <div className="flex items-center gap-1 text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-1 pb-1 border-b border-amber-200">
                                <Sparkles className="w-3 h-3 text-orange-500" />
                                <span>IA Ozzy 24/7 (Automático)</span>
                              </div>
                            )}

                            {isHuman && (
                              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1 pb-1 border-b border-emerald-200">
                                <Shield className="w-3 h-3 text-emerald-600" />
                                <span>Atendente Especialista OZ</span>
                              </div>
                            )}

                            <div className="prose prose-xs max-w-none text-slate-800">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {msg.content}
                              </ReactMarkdown>
                            </div>

                            {/* Tool Action Visual Cards (Executed by Ozzy Agent) */}
                            {msg.toolAction && (
                              <div className="mt-2.5 pt-2 border-t border-slate-200 text-[11px] space-y-2">
                                <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-orange-100 text-orange-800 border border-orange-200">
                                  <Cpu className="w-3 h-3 text-orange-600" />
                                  <span>{msg.toolAction.actionLabel}</span>
                                </div>

                                {msg.toolAction.tool === 'check_domain_availability' && (
                                  <div className="bg-white rounded-xl p-2.5 border border-slate-200 space-y-1.5 shadow-2xs">
                                    <div className="flex items-center justify-between">
                                      <strong className="text-slate-900 font-mono">{msg.toolAction.data.domain}</strong>
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                        msg.toolAction.data.available ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                      }`}>
                                        {msg.toolAction.data.available ? 'DISPONÍVEL' : 'REGISTRADO'}
                                      </span>
                                    </div>
                                    <div className="text-slate-600 text-[11px]">
                                      Preço: {msg.toolAction.data.annualPrice} ({msg.toolAction.data.registrar})
                                    </div>
                                  </div>
                                )}

                                {msg.toolAction.tool === 'generate_instant_proposal' && (
                                  <div className="bg-white rounded-xl p-2.5 border border-purple-200 space-y-1.5 shadow-2xs">
                                    <div className="flex items-center justify-between border-b border-purple-100 pb-1 font-bold text-purple-900">
                                      <span>{msg.toolAction.data.title}</span>
                                      <span className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">
                                        #{msg.toolAction.data.proposalId}
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                                      <div className="bg-slate-50 p-1.5 rounded">Setup: <strong>{msg.toolAction.data.setupPriceFormatted}</strong></div>
                                      <div className="bg-slate-50 p-1.5 rounded">Mensal: <strong>{msg.toolAction.data.monthlyPriceFormatted}</strong></div>
                                    </div>
                                    <div className="text-[10px] text-slate-500">Prazo: {msg.toolAction.data.deliveryDays}</div>
                                  </div>
                                )}

                                {msg.toolAction.tool === 'schedule_diagnostic_meeting' && (
                                  <div className="bg-white rounded-xl p-2.5 border border-blue-200 space-y-1 shadow-2xs">
                                    <div className="font-bold text-blue-900 flex items-center gap-1">
                                      <Calendar className="w-3 h-3 text-blue-600" />
                                      {msg.toolAction.data.dateTime}
                                    </div>
                                    <div className="text-slate-600 text-[10px]">Canal: {msg.toolAction.data.channel} • Duração: {msg.toolAction.data.duration}</div>
                                  </div>
                                )}

                                {msg.toolAction.tool === 'calculate_roi_performance' && (
                                  <div className="bg-white rounded-xl p-2.5 border border-amber-200 space-y-1 shadow-2xs">
                                    <div className="font-bold text-amber-900">Ganho: {msg.toolAction.data.speedGain}</div>
                                    <div className="text-[10px] text-slate-600">{msg.toolAction.data.annualEstimateImpact}</div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Suggested Quick Actions */}
                            {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-slate-200">
                                {msg.suggestedActions.map((act, aIdx) => (
                                  <span
                                    key={aIdx}
                                    className="px-2 py-0.5 rounded bg-white text-orange-700 border border-orange-200 text-[10px] font-semibold"
                                  >
                                    {act.label}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Explanatory Navigation Text Rendered after buttons */}
                            {msg.postActionText && (
                              <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-600 italic">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {msg.postActionText}
                                </ReactMarkdown>
                              </div>
                            )}
                          </div>
                        </div>

                        {!isUser && (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-1 ${
                            isAssistant
                              ? 'bg-amber-100 text-orange-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {isAssistant ? <Sparkles className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* AI Copilot Suggestion Banner */}
              {copilotSuggestion && (
                <div className="mx-3.5 my-2 p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-amber-800 font-bold text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                      Sugestão do Copilot:
                    </span>
                    <button
                      onClick={() => setCopilotSuggestion(null)}
                      className="text-slate-400 hover:text-slate-700 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-slate-700 text-xs italic leading-relaxed">
                    "{copilotSuggestion}"
                  </p>
                  <button
                    onClick={applyCopilotSuggestion}
                    className="w-full bg-white hover:bg-orange-50 text-orange-700 border border-orange-200 font-bold py-1 rounded-lg text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Usar esta resposta</span>
                  </button>
                </div>
              )}

              {/* Composer Box */}
              <div className="p-3.5 bg-white border-t border-slate-200 space-y-2.5">
                {/* Agent Trigger Bar for Quick Tool Execution */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 flex items-center justify-between gap-2 flex-wrap text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[11px]">
                    <Cpu className="w-3.5 h-3.5 text-orange-500" />
                    <span>Ações do Agente OZZY:</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      disabled={isExecutingAgentTool}
                      onClick={() => handleExecuteAgentTool('generate_instant_proposal')}
                      className="bg-white hover:bg-purple-50 text-purple-800 border border-purple-200 hover:border-purple-300 px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
                      title="Gerar Proposta Comercial Instantânea para este lead"
                    >
                      <DollarSign className="w-3 h-3 text-purple-600" />
                      <span>Gerar Proposta 360°</span>
                    </button>

                    <button
                      type="button"
                      disabled={isExecutingAgentTool}
                      onClick={() => handleExecuteAgentTool('check_domain_availability')}
                      className="bg-white hover:bg-amber-50 text-amber-800 border border-amber-200 hover:border-amber-300 px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
                      title="Checar disponibilidade de domínio do cliente"
                    >
                      <Search className="w-3 h-3 text-amber-600" />
                      <span>Checar Domínio</span>
                    </button>

                    <button
                      type="button"
                      disabled={isExecutingAgentTool}
                      onClick={() => handleExecuteAgentTool('schedule_diagnostic_meeting')}
                      className="bg-white hover:bg-blue-50 text-blue-800 border border-blue-200 hover:border-blue-300 px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
                      title="Agendar Diagnóstico com a Equipe OZ"
                    >
                      <Calendar className="w-3 h-3 text-blue-600" />
                      <span>Agendar Diagnóstico</span>
                    </button>

                    <button
                      type="button"
                      disabled={isExecutingAgentTool}
                      onClick={() => handleExecuteAgentTool('calculate_roi_performance')}
                      className="bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 hover:border-emerald-300 px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
                      title="Calcular simulação de ganho e ROI"
                    >
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                      <span>Calcular ROI</span>
                    </button>
                  </div>
                </div>

                {toolExecuteFeedback && (
                  <div className="px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-900 text-xs font-semibold animate-fade-in flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-spin" />
                    <span>{toolExecuteFeedback}</span>
                  </div>
                )}

                {/* Composer Mode Tabs & Helpers */}
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                    <button
                      onClick={() => setComposerMode('web_chat')}
                      className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-colors cursor-pointer ${
                        composerMode === 'web_chat' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      💬 Web Chat
                    </button>
                    <button
                      onClick={() => setComposerMode('whatsapp')}
                      className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-colors cursor-pointer ${
                        composerMode === 'whatsapp' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      📱 WhatsApp
                    </button>
                    <button
                      onClick={() => setComposerMode('internal_note')}
                      className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-colors cursor-pointer ${
                        composerMode === 'internal_note' ? 'bg-white text-amber-800 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      🔒 Nota Interna
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Canned Templates */}
                    <select
                      onChange={(e) => {
                        const template = CANNED_RESPONSES.find(t => t.title === e.target.value);
                        if (template) setMessageInput(template.content);
                        e.target.value = '';
                      }}
                      className="bg-slate-50 border border-slate-200 text-[11px] text-slate-700 rounded-lg px-2 py-1 focus:outline-none focus:border-orange-500 cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>⚡ Respostas Prontas</option>
                      {CANNED_RESPONSES.map((t, idx) => (
                        <option key={idx} value={t.title}>{t.title}</option>
                      ))}
                    </select>

                    {/* Copilot Suggest Button */}
                    <button
                      type="button"
                      onClick={handleGetCopilotSuggestion}
                      disabled={isCopilotLoading}
                      className="bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 px-2 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                      title="Solicitar sugestão ao Ozzy Copilot"
                    >
                      <Sparkles className={`w-3 h-3 ${isCopilotLoading ? 'animate-spin' : ''}`} />
                      <span>{isCopilotLoading ? '...' : 'Copilot'}</span>
                    </button>
                  </div>
                </div>

                {/* Textarea Form */}
                <form onSubmit={handleSendMessage} className="space-y-2">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder={
                      composerMode === 'internal_note'
                        ? 'Escreva uma nota interna confidencial da equipe...'
                        : composerMode === 'whatsapp'
                        ? 'Digite a mensagem para enviar via WhatsApp...'
                        : 'Digite a resposta para o cliente (Enter para enviar)...'
                    }
                    rows={2}
                    className={`w-full rounded-xl p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all resize-none ${
                      composerMode === 'internal_note'
                        ? 'bg-amber-50/50 border border-amber-200 focus:border-amber-400'
                        : 'bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500'
                    }`}
                  />

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span><strong>Enter</strong> para enviar</span>
                    <button
                      type="submit"
                      disabled={!messageInput.trim() || sending}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer disabled:opacity-40 ${
                        composerMode === 'internal_note'
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : composerMode === 'whatsapp'
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-orange-500 hover:bg-orange-600 text-white'
                      }`}
                    >
                      <Send className="w-3 h-3" />
                      <span>{sending ? 'Enviando...' : composerMode === 'internal_note' ? 'Salvar Nota' : 'Enviar'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-2">
              <MessageSquare className="w-10 h-10 text-slate-300" />
              <p className="text-xs font-medium text-slate-600">Selecione uma conversa na lista</p>
            </div>
          )}
        </div>

        {/* ================= COLUMN 3: CONTACT PROFILE & CRM (3 cols on lg, 3 on xl+) ================= */}
        <div className="lg:col-span-3 xl:col-span-3 p-4 space-y-4 bg-white flex flex-col overflow-y-auto max-h-[720px]">
          {activeConv ? (
            <>
              {/* Contact Header */}
              <div className="space-y-2.5 pb-3.5 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Ficha do Lead
                  </span>
                  <button
                    onClick={() => setIsEditingContact(!isEditingContact)}
                    className="text-xs text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>{isEditingContact ? 'Cancelar' : 'Editar'}</span>
                  </button>
                </div>

                {isEditingContact ? (
                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="text-[10px] text-slate-500 block font-medium mb-0.5">Nome</label>
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block font-medium mb-0.5">Empresa</label>
                      <input
                        type="text"
                        value={editForm.company || ''}
                        onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block font-medium mb-0.5">Telefone / WhatsApp</label>
                      <input
                        type="text"
                        value={editForm.phone || ''}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block font-medium mb-0.5">Rede Social (Instagram / Link)</label>
                      <input
                        type="text"
                        placeholder="@instagram ou linkedin.com/in/..."
                        value={editForm.socialMedia || ''}
                        onChange={(e) => setEditForm({ ...editForm, socialMedia: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block font-medium mb-0.5">E-mail</label>
                      <input
                        type="email"
                        value={editForm.email || ''}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block font-medium mb-0.5">Cidade / UF</label>
                      <input
                        type="text"
                        value={editForm.city || ''}
                        onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800"
                      />
                    </div>
                    <button
                      onClick={handleSaveContact}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer mt-2"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Salvar</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-slate-800">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-bold">{activeConv.contact.name}</span>
                    </div>
                    {activeConv.contact.company && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{activeConv.contact.company}</span>
                      </div>
                    )}
                    {activeConv.contact.phone && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-medium text-emerald-700">{activeConv.contact.phone}</span>
                      </div>
                    )}
                    {activeConv.contact.socialMedia && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Globe className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span className="font-medium text-purple-700 truncate">{activeConv.contact.socialMedia}</span>
                      </div>
                    )}
                    {activeConv.contact.email && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{activeConv.contact.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{activeConv.contact.city || 'Canoas'}, {activeConv.contact.state || 'RS'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Deal Pipeline & Stage */}
              <div className="space-y-2.5 pb-3.5 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Funil de Vendas
                </span>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-500 font-medium block">Etapa no Funil</label>
                  <select
                    value={activeConv.stage}
                    onChange={(e) => handleStageChange(e.target.value as ConversationStage)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="novo_lead">1. Novo Lead</option>
                    <option value="qualificado">2. Qualificado (IA)</option>
                    <option value="proposta">3. Proposta Enviada</option>
                    <option value="negociacao">4. Em Negociação</option>
                    <option value="fechado">5. Fechado / Ganho ✅</option>
                    <option value="perdido">6. Perdido ❌</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-500 font-medium block">Valor da Proposta (R$)</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">R$</span>
                    <input
                      type="number"
                      value={activeConv.dealValue || ''}
                      onChange={(e) => handleDealValueChange(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-2.5 py-1.5 text-xs font-bold text-emerald-800 focus:outline-none focus:border-orange-500"
                      placeholder="0,00"
                    />
                  </div>
                </div>
              </div>

              {/* Tags Section */}
              <div className="space-y-2.5 pb-3.5 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Tags
                </span>

                <div className="flex flex-wrap gap-1">
                  {activeConv.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-slate-400 hover:text-rose-600 text-xs font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-1">
                  <input
                    type="text"
                    placeholder="Adicionar tag (ex: #urgente)"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    onClick={handleAddTag}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 rounded-lg text-xs cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Lead Source */}
              <div className="space-y-1 text-[11px] text-slate-400 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Origem do Lead
                </span>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-slate-600">
                  <div className="font-medium truncate">Página: {activeConv.sourcePage}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {new Date(activeConv.createdAt).toLocaleDateString('pt-BR')} às {new Date(activeConv.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Nenhum lead selecionado
            </div>
          )}
        </div>

      </div>

      {/* 3. NEW LEAD MODAL - Clean Light Design */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full text-slate-900 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-orange-500" />
                Cadastrar Lead no CRM
              </h3>
              <button
                onClick={() => setIsNewLeadModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-base font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] text-slate-600 font-medium block mb-1">Nome do Contato *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Dr. Paulo Mendes"
                    value={newLeadData.name}
                    onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 font-medium block mb-1">Empresa</label>
                  <input
                    type="text"
                    placeholder="Ex: Clínica Saúde Canoas"
                    value={newLeadData.company}
                    onChange={(e) => setNewLeadData({ ...newLeadData, company: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] text-slate-600 font-medium block mb-1">WhatsApp / Telefone</label>
                  <input
                    type="text"
                    placeholder="(51) 99999-9999"
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 font-medium block mb-1">Rede Social (Instagram / Link)</label>
                  <input
                    type="text"
                    placeholder="@instagram ou linkedin"
                    value={newLeadData.socialMedia}
                    onChange={(e) => setNewLeadData({ ...newLeadData, socialMedia: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-600 font-medium block mb-1">E-mail</label>
                <input
                  type="email"
                  placeholder="contato@empresa.com"
                  value={newLeadData.email}
                  onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[11px] text-slate-600 font-medium block mb-1">Etapa Inicial</label>
                  <select
                    value={newLeadData.stage}
                    onChange={(e) => setNewLeadData({ ...newLeadData, stage: e.target.value as ConversationStage })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="novo_lead">Novo Lead</option>
                    <option value="qualificado">Qualificado (IA)</option>
                    <option value="proposta">Proposta Enviada</option>
                    <option value="negociacao">Em Negociação</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 font-medium block mb-1">Valor Proposta (R$)</label>
                  <input
                    type="number"
                    value={newLeadData.dealValue}
                    onChange={(e) => setNewLeadData({ ...newLeadData, dealValue: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 font-medium block mb-1">Cidade / UF</label>
                  <input
                    type="text"
                    value={newLeadData.city}
                    onChange={(e) => setNewLeadData({ ...newLeadData, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-600 font-medium block mb-1">Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  placeholder="#solucao360, #canoas"
                  value={newLeadData.tags}
                  onChange={(e) => setNewLeadData({ ...newLeadData, tags: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-600 font-medium block mb-1">Mensagem Inicial / Demanda</label>
                <textarea
                  rows={2}
                  placeholder="Descreva a demanda inicial do cliente..."
                  value={newLeadData.initialMessage}
                  onChange={(e) => setNewLeadData({ ...newLeadData, initialMessage: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  Salvar no CRM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. AGENT SETTINGS & AUTONOMY MODAL */}
      {isAgentSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-xl w-full text-slate-900 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-xs">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-slate-900">
                    Configuração do Agente IA OZZY
                  </h3>
                  <p className="text-xs text-slate-500">
                    Controle de autonomia, ferramentas executáveis e parâmetros de IA
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAgentSettingsOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {agentSettings ? (
              <div className="space-y-4 text-xs">
                {/* Autonomy Mode Selector */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="font-bold text-slate-800 text-[11px] block uppercase tracking-wider">
                    Modo de Operação do Agente
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleAgentAutonomy('autonomous')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        agentSettings.autonomyMode === 'autonomous'
                          ? 'bg-orange-50 border-orange-300 text-orange-950 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs flex items-center gap-1.5 text-orange-700">
                          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                          100% Autônomo
                        </span>
                        {agentSettings.autonomyMode === 'autonomous' && <Check className="w-4 h-4 text-orange-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Ozzy decide e executa ferramentas sozinho, gerando propostas, checando domínios e agendando.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleAgentAutonomy('copilot')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        agentSettings.autonomyMode === 'copilot'
                          ? 'bg-blue-50 border-blue-300 text-blue-950 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs flex items-center gap-1.5 text-blue-700">
                          <Shield className="w-3.5 h-3.5 text-blue-500" />
                          Modo Copilot
                        </span>
                        {agentSettings.autonomyMode === 'copilot' && <Check className="w-4 h-4 text-blue-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Ozzy apenas sugere ações e aguarda autorização humana no painel do Gestor.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Enabled Agent Tools */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-800 text-[11px] block uppercase tracking-wider">
                    Ferramentas Habilitadas (Function Calling)
                  </span>

                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <DollarSign className="w-4 h-4 text-purple-600" />
                        <div>
                          <div className="font-bold text-slate-900">Gerador de Proposta Instantânea</div>
                          <div className="text-[10px] text-slate-500">Gera proposta comercial Solução 360° com valores e prazos</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={agentSettings.toolsEnabled.generate_instant_proposal}
                        onChange={() => handleToggleAgentTool('generate_instant_proposal')}
                        className="w-4 h-4 text-orange-500 rounded cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <Search className="w-4 h-4 text-amber-600" />
                        <div>
                          <div className="font-bold text-slate-900">Consulta de Disponibilidade de Domínio</div>
                          <div className="text-[10px] text-slate-500">Verifica disponibilidade no Registro.br e sugere nomes premium</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={agentSettings.toolsEnabled.check_domain_availability}
                        onChange={() => handleToggleAgentTool('check_domain_availability')}
                        className="w-4 h-4 text-orange-500 rounded cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-bold text-slate-900">Agendador de Diagnóstico Estratégico</div>
                          <div className="text-[10px] text-slate-500">Agenda reunião técnica de 15 minutos e integra com CRM</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={agentSettings.toolsEnabled.schedule_diagnostic_meeting}
                        onChange={() => handleToggleAgentTool('schedule_diagnostic_meeting')}
                        className="w-4 h-4 text-orange-500 rounded cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <div>
                          <div className="font-bold text-slate-900">Calculadora de ROI & Performance</div>
                          <div className="text-[10px] text-slate-500">Simula impacto de migração para Cloud NVMe e ganho de tráfego</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={agentSettings.toolsEnabled.calculate_roi_performance}
                        onChange={() => handleToggleAgentTool('calculate_roi_performance')}
                        className="w-4 h-4 text-orange-500 rounded cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <Sliders className="w-4 h-4 text-slate-600" />
                        <div>
                          <div className="font-bold text-slate-900">Atualização Automática de Lead no CRM</div>
                          <div className="text-[10px] text-slate-500">Extrai automaticamente e-mail, telefone, empresa e valor de contrato</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={agentSettings.toolsEnabled.update_crm_lead}
                        onChange={() => handleToggleAgentTool('update_crm_lead')}
                        className="w-4 h-4 text-orange-500 rounded cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                {/* Model and System Specs */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-[11px] text-slate-500">
                  <div className="flex justify-between">
                    <span>Modelo de Linguagem Ativo:</span>
                    <strong className="text-slate-800 font-mono">gemini-2.5-flash (Google GenAI)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Chamadas de Ferramentas:</span>
                    <strong className="text-slate-800 font-mono">Habilitadas (Function Calling)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Base de Conhecimento:</span>
                    <strong className="text-slate-800">AGÊNCIA OZ Solução 360° (Canoas/RS)</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-slate-400">Carregando configurações...</div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAgentSettingsOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. AGENT ACTIVITY LOGS MODAL */}
      {isAgentLogsOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl w-full text-slate-900 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold shadow-xs">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-slate-900">
                    Histórico de Ações do Agente OZZY
                  </h3>
                  <p className="text-xs text-slate-500">
                    Registro de execuções de ferramentas, parâmetros e resultados em tempo real
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearAgentLogs}
                  className="text-xs text-rose-600 hover:text-rose-800 px-2.5 py-1 rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  Limpar Logs
                </button>
                <button
                  onClick={() => setIsAgentLogsOpen(false)}
                  className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Logs List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {agentLogs.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Nenhuma atividade registrada ainda. O agente registrará cada ferramenta executada aqui.
                </div>
              ) : (
                agentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 text-[10px] font-mono">
                          {log.toolName}
                        </span>
                        <span>{log.clientName ? `Cliente: ${log.clientName}` : 'Geral'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span>{new Date(log.executedAt).toLocaleTimeString('pt-BR')}</span>
                        <span className={`px-1.5 py-0.5 rounded font-bold ${
                          log.status === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {log.status === 'success' ? 'SUCESSO' : 'ERRO'}
                        </span>
                      </div>
                    </div>

                    <div className="text-slate-600 text-[11px] leading-relaxed">
                      {log.resultSummary}
                    </div>

                    {log.inputParams && (
                      <pre className="p-2 bg-slate-900 text-emerald-400 font-mono text-[10px] rounded-lg overflow-x-auto max-h-24">
                        {JSON.stringify(log.inputParams, null, 2)}
                      </pre>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100 shrink-0">
              <button
                type="button"
                onClick={() => setIsAgentLogsOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
