export type ConversationStage = 
  | 'novo_lead'
  | 'qualificado'
  | 'proposta'
  | 'negociacao'
  | 'fechado'
  | 'perdido';

export type MessageRole = 
  | 'user'           // Lead / Visitante
  | 'assistant'      // Ozzy IA
  | 'human_agent'    // Atendente OZ Humano
  | 'internal_note'; // Nota interna da equipe / CRM

export type CommunicationChannel = 
  | 'web_chat'
  | 'whatsapp'
  | 'lp_form'
  | 'internal';

export interface ToolActionResult {
  tool: string;
  actionLabel: string;
  data: any;
}

export interface AgentSettings {
  autonomyMode: 'autonomous' | 'copilot';
  toolsEnabled: {
    check_domain_availability: boolean;
    generate_instant_proposal: boolean;
    schedule_diagnostic_meeting: boolean;
    calculate_roi_performance: boolean;
    update_crm_lead: boolean;
  };
  autoAssignLeads: boolean;
  autoAdvanceFunnel: boolean;
  systemVersion: string;
  updatedAt: string;
}

export interface AgentActivityLog {
  id: string;
  toolName: string;
  actionLabel: string;
  inputParams: any;
  resultSummary: string;
  clientName: string;
  status: 'success' | 'failed' | 'pending';
  executedAt: string;
}

export interface LeadContact {
  name: string;
  company: string;
  email: string;
  phone: string;
  socialMedia?: string; // Instagram / LinkedIn / Facebook
  city: string;
  state: string;
  avatar?: string;
  segment?: string;
  notes?: string;
}

export interface ConversationMessage {
  id: string;
  role: MessageRole;
  senderName: string;
  content: string;
  timestamp: string;
  channel: CommunicationChannel;
  suggestedActions?: { label: string; path?: string; url?: string }[];
  postActionText?: string;
  toolAction?: ToolActionResult;
}

export interface Conversation {
  id: string;
  contact: LeadContact;
  status: 'active' | 'archived' | 'closed';
  stage: ConversationStage;
  assignedTo: 'ozzy_ai' | 'human_agent';
  channel: CommunicationChannel;
  tags: string[];
  dealValue: number; // valor estimado em R$
  unreadCount: number;
  isStarred: boolean;
  sourcePage: string;
  lastMessage: string;
  lastMessageAt: string;
  createdAt: string;
  messages: ConversationMessage[];
}

export interface ConversationStats {
  total: number;
  unread: number;
  handledByAi: number;
  handledByHuman: number;
  totalDealValue: number;
  stageCounts: Record<ConversationStage, number>;
}
