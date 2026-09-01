import { Conversation, ConversationMessage, ConversationStats, MessageRole, CommunicationChannel, AgentSettings, AgentActivityLog, ToolActionResult } from '../types/ozzyChat';
import { mockConversations } from '../data/mockConversations';

const ADMIN_PASS = 'ozgestor2025';

// --- AGENT AUTONOMY & TOOL APIs ---

export async function fetchAgentSettings(): Promise<AgentSettings> {
  try {
    const res = await fetch('/api/ozzy/agent/settings', {
      headers: { 'Authorization': `Bearer ${ADMIN_PASS}` }
    });
    if (res.ok) {
      const data = await res.json();
      return data.settings;
    }
  } catch (err) {
    console.warn('Error fetching agent settings:', err);
  }
  return {
    autonomyMode: 'autonomous',
    toolsEnabled: {
      check_domain_availability: true,
      generate_instant_proposal: true,
      schedule_diagnostic_meeting: true,
      calculate_roi_performance: true,
      update_crm_lead: true
    },
    autoAssignLeads: true,
    autoAdvanceFunnel: true,
    systemVersion: 'OZZY Agent v3.5 Pro (Autonomous AI Agent)',
    updatedAt: new Date().toISOString()
  };
}

export async function updateAgentSettings(settings: Partial<AgentSettings>): Promise<AgentSettings> {
  try {
    const res = await fetch('/api/ozzy/agent/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_PASS}`
      },
      body: JSON.stringify(settings)
    });
    if (res.ok) {
      const data = await res.json();
      return data.settings;
    }
  } catch (err) {
    console.error('Error updating agent settings:', err);
  }
  throw new Error('Falha ao atualizar configurações do agente.');
}

export async function fetchAgentLogs(): Promise<AgentActivityLog[]> {
  try {
    const res = await fetch('/api/ozzy/agent/logs', {
      headers: { 'Authorization': `Bearer ${ADMIN_PASS}` }
    });
    if (res.ok) {
      const data = await res.json();
      return data.logs || [];
    }
  } catch (err) {
    console.warn('Error fetching agent logs:', err);
  }
  return [];
}

export async function clearAgentLogs(): Promise<boolean> {
  try {
    const res = await fetch('/api/ozzy/agent/logs', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${ADMIN_PASS}` }
    });
    return res.ok;
  } catch (err) {
    console.error('Error clearing agent logs:', err);
    return false;
  }
}

export async function executeAgentToolApi(toolName: string, params: any, clientName?: string): Promise<ToolActionResult> {
  const res = await fetch('/api/ozzy/agent/execute-tool', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADMIN_PASS}`
    },
    body: JSON.stringify({ toolName, params, clientName })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Erro na execução da ferramenta do Agente.');
  }

  const data = await res.json();
  return data.toolResult;
}

export async function fetchConversations(params?: {
  search?: string;
  stage?: string;
  channel?: string;
  unreadOnly?: boolean;
  assignedTo?: string;
}): Promise<{ total: number; conversations: Conversation[]; stats: ConversationStats }> {
  try {
    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.stage) query.set('stage', params.stage);
    if (params?.channel) query.set('channel', params.channel);
    if (params?.unreadOnly) query.set('unreadOnly', 'true');
    if (params?.assignedTo) query.set('assignedTo', params.assignedTo);

    const res = await fetch(`/api/ozzy/conversations?${query.toString()}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API /api/ozzy/conversations error, falling back to local state:', err);
  }

  // Fallback to local memory / mock if backend unreachable
  return getLocalFilteredConversations(params);
}

export async function fetchConversationById(id: string): Promise<Conversation | null> {
  try {
    const res = await fetch(`/api/ozzy/conversations/${id}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Error fetching conversation detail:', err);
  }
  return mockConversations.find(c => c.id === id) || null;
}

export async function sendConversationMessage(
  id: string,
  data: {
    role: MessageRole;
    content: string;
    senderName?: string;
    channel?: CommunicationChannel;
  }
): Promise<{ success: boolean; message: ConversationMessage; conversation: Conversation }> {
  try {
    const res = await fetch(`/api/ozzy/conversations/${id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_PASS}`
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('Error sending message:', err);
  }

  // Local fallback response
  const conv = mockConversations.find(c => c.id === id);
  const newMsg: ConversationMessage = {
    id: 'msg-' + Date.now(),
    role: data.role,
    senderName: data.senderName || (data.role === 'human_agent' ? 'Atendente OZ' : data.role === 'assistant' ? 'OZZY (IA)' : 'Nota Interna'),
    content: data.content,
    timestamp: new Date().toISOString(),
    channel: data.channel || 'web_chat'
  };
  if (conv) {
    conv.messages.push(newMsg);
    conv.lastMessage = data.content;
    conv.lastMessageAt = newMsg.timestamp;
    if (data.role === 'human_agent') {
      conv.assignedTo = 'human_agent';
    }
  }
  return { success: true, message: newMsg, conversation: conv! };
}

export async function updateConversationDetails(
  id: string,
  updates: Partial<Conversation>
): Promise<Conversation> {
  try {
    const res = await fetch(`/api/ozzy/conversations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_PASS}`
      },
      body: JSON.stringify(updates)
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('Error updating conversation:', err);
  }

  const conv = mockConversations.find(c => c.id === id);
  if (conv) {
    Object.assign(conv, updates);
    return conv;
  }
  throw new Error('Conversation not found');
}

export async function deleteConversationApi(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/ozzy/conversations/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${ADMIN_PASS}`
      }
    });
    return res.ok;
  } catch (err) {
    console.error('Error deleting conversation:', err);
    return false;
  }
}

export async function createConversationApi(data: Partial<Conversation> & { initialMessage?: string }): Promise<Conversation> {
  try {
    const res = await fetch('/api/ozzy/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_PASS}`
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('Error creating conversation:', err);
  }

  const newConv: Conversation = {
    id: 'conv-' + Date.now(),
    contact: data.contact || {
      name: 'Novo Contato',
      company: 'Empresa',
      email: '',
      phone: '',
      city: 'Canoas',
      state: 'RS'
    },
    status: 'active',
    stage: data.stage || 'novo_lead',
    assignedTo: data.assignedTo || 'ozzy_ai',
    channel: data.channel || 'web_chat',
    tags: data.tags || ['#novo-lead'],
    dealValue: data.dealValue || 1500,
    unreadCount: 0,
    isStarred: false,
    sourcePage: data.sourcePage || '/360-graus',
    lastMessage: data.initialMessage || data.lastMessage || 'Conversa iniciada.',
    lastMessageAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    messages: data.messages || (data.initialMessage ? [{
      id: `msg-${Date.now()}`,
      role: 'user',
      senderName: data.contact?.name || 'Cliente',
      content: data.initialMessage,
      timestamp: new Date().toISOString(),
      channel: data.channel || 'web_chat'
    }] : [])
  };
  mockConversations.unshift(newConv);
  return newConv;
}

export async function requestAiCopilotSuggestion(
  conversationId: string,
  userGoal?: string
): Promise<{ suggestion: string; bulletPoints?: string[] }> {
  try {
    const res = await fetch(`/api/ozzy/conversations/${conversationId}/ai-suggest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_PASS}`
      },
      body: JSON.stringify({ userGoal })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('Error getting AI suggestion:', err);
  }

  return {
    suggestion: `Olá! Analisamos a sua solicitação com atenção. Com a Solução 360 da AGÊNCIA OZ, cuidamos de toda a infraestrutura, criação do seu novo site WordPress com alta velocidade e posicionamento no Google Maps. Podemos agendar uma demonstração rápida de 15 minutos pelo WhatsApp?`,
    bulletPoints: [
      'Site com carregamento em < 1 segundo',
      'Configuração completa de e-mails corporativos sem cair em spam',
      'Atendimento humanizado direto no WhatsApp'
    ]
  };
}

export async function resetDemoConversationsApi(): Promise<Conversation[]> {
  try {
    const res = await fetch('/api/ozzy/conversations/reset-demo', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ADMIN_PASS}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      return data.conversations;
    }
  } catch (err) {
    console.error('Error resetting demo conversations:', err);
  }
  return mockConversations;
}

// Local fallback filter helper
function getLocalFilteredConversations(params?: {
  search?: string;
  stage?: string;
  channel?: string;
  unreadOnly?: boolean;
  assignedTo?: string;
}) {
  let list = [...mockConversations];

  if (params?.search) {
    const q = params.search.toLowerCase();
    list = list.filter(c => 
      c.contact.name.toLowerCase().includes(q) ||
      c.contact.company.toLowerCase().includes(q) ||
      c.contact.phone.includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q)) ||
      c.lastMessage.toLowerCase().includes(q)
    );
  }

  if (params?.stage && params.stage !== 'all') {
    list = list.filter(c => c.stage === params.stage);
  }

  if (params?.channel && params.channel !== 'all') {
    list = list.filter(c => c.channel === params.channel);
  }

  if (params?.unreadOnly) {
    list = list.filter(c => c.unreadCount > 0);
  }

  if (params?.assignedTo && params.assignedTo !== 'all') {
    list = list.filter(c => c.assignedTo === params.assignedTo);
  }

  const stageCounts: Record<string, number> = {
    novo_lead: 0,
    qualificado: 0,
    proposta: 0,
    negociacao: 0,
    fechado: 0,
    perdido: 0
  };

  let unread = 0;
  let handledByAi = 0;
  let handledByHuman = 0;
  let totalDealValue = 0;

  mockConversations.forEach(c => {
    if (c.unreadCount > 0) unread++;
    if (c.assignedTo === 'ozzy_ai') handledByAi++;
    if (c.assignedTo === 'human_agent') handledByHuman++;
    totalDealValue += (c.dealValue || 0);
    if (stageCounts[c.stage] !== undefined) {
      stageCounts[c.stage]++;
    }
  });

  return {
    total: list.length,
    conversations: list,
    stats: {
      total: mockConversations.length,
      unread,
      handledByAi,
      handledByHuman,
      totalDealValue,
      stageCounts: stageCounts as any
    }
  };
}
