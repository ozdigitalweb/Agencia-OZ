import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Send, 
  X, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Check, 
  Copy, 
  ExternalLink, 
  ArrowRight,
  ArrowUpRight,
  Zap,
  PhoneCall,
  ChevronRight,
  ShieldCheck,
  Flame,
  MessageCircle,
  User,
  Building2,
  Phone,
  Globe,
  MapPin,
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Calendar,
  DollarSign,
  TrendingUp,
  Cpu,
  Clock,
  Search,
  Radio,
  Palette,
  Layers,
  LucideIcon
} from 'lucide-react';
import { ToolActionResult } from '../types/ozzyChat';

// Símbolo Minimalista OZZY (Sleek Geometric Vector)
function BatmanIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 5.5c-.3 0-.6.3-.8.9-.7-.1-1.6-.1-2.4.4-1.7.8-3.1 2.3-4.5 4.1 1.2-.5 2.7-.7 3.9-.2-.7 1.1-.3 2 .7 2.6 1.2-1.2 2.5-1.3 3.8-.5.2-.6.4-1.2.7-1.8.3.6.5 1.2.7 1.8 1.3-.8 2.6-.7 3.8.5 1-.6 1.4-1.5.7-2.6 1.2-.5 2.7-.3 3.9.2-1.4-1.8-2.8-3.3-4.5-4.1-.8-.5-1.7-.5-2.4-.4-.2-.6-.5-.9-.8-.9h-.5z" />
    </svg>
  );
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedActions?: { label: string; path?: string; url?: string }[];
  postActionText?: string;
  toolAction?: ToolActionResult;
}

// Remove any captured CRM summary list from chat message display
function cleanLeadSummaryFromText(text: string): string {
  if (!text) return text;
  let cleaned = text.replace(/\(?\*?\s*(?:Empresa|Whats|Instagram|Cidade|Rede social)\s*:\s*[^\n\)]+(?:\|\s*(?:Empresa|Whats|Instagram|Cidade|Rede social)\s*:\s*[^\n\)]+)*\s*\*?\)?/gi, '');
  cleaned = cleaned.replace(/\(\s*\)/g, '').replace(/\n{3,}/g, '\n\n').trim();
  return cleaned;
}

// Separate navigation explainer so it is placed after action buttons
function extractNavigationExplainer(text: string): { mainText: string; postText?: string } {
  const cleaned = cleanLeadSummaryFromText(text);
  const marker = 'Você poderá ver mais detalhes de cada área';
  const marker2 = 'Voce podera ver mais detalhes de cada area';
  
  let idx = cleaned.indexOf(marker);
  if (idx === -1) {
    idx = cleaned.indexOf(marker2);
  }

  if (idx !== -1) {
    const mainText = cleaned.substring(0, idx).trim();
    const postText = cleaned.substring(idx).trim();
    return { mainText: mainText || cleaned, postText };
  }

  return { mainText: cleaned };
}

interface LeadFormState {
  name: string;
  company: string;
  phone: string;
  socialMedia: string;
  city: string;
}

interface QuickChip {
  label: string;
  icon: LucideIcon;
  prompt: string;
}

// Quick action chips with minimalist icons
const QUICK_INTENT_CHIPS: QuickChip[] = [
  { label: 'Solução 360°', icon: Globe, prompt: 'Gostaria de informações sobre a Solução 360 Graus.' },
  { label: 'Sites & LPs', icon: Layers, prompt: 'Gostaria de informações sobre Criação de Sites e Landing Pages.' },
  { label: 'Hospedagem Cloud', icon: Zap, prompt: 'Quais os planos e recursos da Hospedagem Cloud cPanel?' },
  { label: 'Mídia & Redes', icon: Palette, prompt: 'Quais são as soluções de Mídia Digital e Artes para Redes Sociais?' },
  { label: 'SEO Local', icon: Search, prompt: 'Como funciona o posicionamento SEO Local e no Google Maps?' },
  { label: 'Rádio PROVOX', icon: Radio, prompt: 'Como funciona a Rádio Corporativa e Som Ambiente PROVOX?' },
  { label: 'Fazer Orçamento', icon: FileText, prompt: 'Quero simular um orçamento para o meu projeto.' }
];

// Helper to determine the best minimalist icon for action pills
function getActionIcon(label: string, path?: string, url?: string): LucideIcon {
  const text = (label + ' ' + (path || '') + ' ' + (url || '')).toLowerCase();
  if (text.includes('wa.me') || text.includes('whatsapp')) return MessageCircle;
  if (text.includes('360')) return Globe;
  if (text.includes('site') || text.includes('landing') || text.includes('lp')) return Layers;
  if (text.includes('hospedagem') || text.includes('cloud')) return Zap;
  if (text.includes('midia') || text.includes('mídia') || text.includes('artes') || text.includes('rede')) return Palette;
  if (text.includes('seo') || text.includes('busca') || text.includes('google')) return Search;
  if (text.includes('radio') || text.includes('rádio') || text.includes('provox') || text.includes('stream')) return Radio;
  if (text.includes('orcamento') || text.includes('orçamento') || text.includes('proposta') || text.includes('simular')) return FileText;
  if (url) return ExternalLink;
  return ArrowUpRight;
}

export default function OzzyChatWidget() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin');

  const [isOpen, setIsOpen] = useState(false);
  
  const [leadData, setLeadData] = useState<LeadFormState>(() => {
    const saved = localStorage.getItem('ozzy_saved_lead_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      name: '',
      company: '',
      phone: '',
      socialMedia: '',
      city: ''
    };
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('ozzy_chat_history_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If the only message is the initial welcome, ensure old suggested actions are cleaned
          if (parsed.length === 1 && parsed[0].id?.startsWith('welcome')) {
            return [{
              id: parsed[0].id,
              role: 'assistant',
              content: 'Olá! Sou o **OZZY**, Consultor da **AGÊNCIA OZ** 🦇\n\n👉 *Qual é o seu nome?*',
              timestamp: parsed[0].timestamp || new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            }];
          }
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
    return [
      {
        id: 'welcome-1',
        role: 'assistant',
        content: 'Olá! Sou o **OZZY**, Consultor da **AGÊNCIA OZ** 🦇\n\n👉 *Qual é o seu nome?*',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(() => {
    return localStorage.getItem('ozzy_voice_enabled') === 'true';
  });
  const [hasUnread, setHasUnread] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showNotificationBubble, setShowNotificationBubble] = useState(true);

  // Derived progress indicators for the 5 lead collection fields
  const hasName = Boolean(leadData.name && !leadData.name.includes('Visitante Web'));
  const hasCompany = Boolean(leadData.company && !leadData.company.includes('Origem:'));
  const hasPhone = Boolean(leadData.phone);
  const hasSocial = Boolean(leadData.socialMedia);
  const hasCity = Boolean(leadData.city && leadData.city !== 'Visitante Online');
  const collectedCount = [hasName, hasCompany, hasPhone, hasSocial, hasCity].filter(Boolean).length;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setShowNotificationBubble(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    localStorage.setItem('ozzy_chat_history_v2', JSON.stringify(messages));
  }, [messages]);

  const playChime = (type: 'send' | 'receive') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'send') {
        osc.frequency.setValueAtTime(480, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(960, ctx.currentTime + 0.07);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
        osc.start();
        osc.stop(ctx.currentTime + 0.07);
      } else {
        osc.frequency.setValueAtTime(650, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch (err) {
      // Audio not permitted
    }
  };

  const speakText = (text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`\[\]()]/g, ' ').slice(0, 240);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (userText?: string, explicitLead?: LeadFormState) => {
    const textToSend = (userText || input).trim();
    if (!textToSend || isLoading) return;

    setInput('');
    playChime('send');

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Get or create persistent visitor session ID
      let visitorId = localStorage.getItem('ozzy_visitor_id');
      if (!visitorId) {
        visitorId = `visit-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
        localStorage.setItem('ozzy_visitor_id', visitorId);
      }

      const response = await fetch('/api/ozzy/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          sessionId: visitorId,
          sourcePage: window.location.pathname,
          leadData: explicitLead || leadData,
          history: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error('Falha na resposta.');
      }

      const data = await response.json();
      playChime('receive');

      if (data.leadData) {
        setLeadData(prev => {
          const updated = {
            name: data.leadData.name && !data.leadData.name.includes('Visitante Web') ? data.leadData.name : prev.name,
            company: data.leadData.company && !data.leadData.company.includes('Origem:') ? data.leadData.company : prev.company,
            phone: data.leadData.phone || prev.phone,
            socialMedia: data.leadData.socialMedia || prev.socialMedia,
            city: data.leadData.city && data.leadData.city !== 'Visitante Online' ? data.leadData.city : prev.city
          };
          localStorage.setItem('ozzy_saved_lead_data', JSON.stringify(updated));
          return updated;
        });
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: cleanLeadSummaryFromText(data.reply || 'Posso te ajudar com isso! Deseja falar diretamente com nossa equipe no WhatsApp?'),
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: data.suggestedActions || [],
        postActionText: data.postActionText,
        toolAction: data.toolAction || undefined
      };

      setMessages(prev => [...prev, botMessage]);

      if (voiceEnabled) {
        speakText(botMessage.content);
      }

      if (!isOpen) {
        setHasUnread(true);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Estou com alta demanda de consultas no momento. Mas nossa equipe técnica atende você em tempo real via WhatsApp no **(48) 99198-4678**.',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: 'Chamar no WhatsApp', url: 'https://wa.me/5548991984678?text=Ola%2C+estava+no+chat+do+site+e+quero+falar+com+atendimento' },
          { label: 'Simular Orçamento', path: '/orcamento' }
        ]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    localStorage.setItem('ozzy_voice_enabled', String(next));
    if (next) {
      playChime('receive');
      speakText('Áudio do Ozzy ativado.');
    } else {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem('ozzy_saved_lead_data');
    setLeadData({
      name: '',
      company: '',
      phone: '',
      socialMedia: '',
      city: ''
    });
    const initial: ChatMessage[] = [
      {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        content: 'Olá! Sou o **OZZY**, Consultor da **AGÊNCIA OZ** 🦇\n\n👉 *Qual é o seu nome?*',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(initial);
    localStorage.setItem('ozzy_chat_history_v2', JSON.stringify(initial));
    setInput('');
    playChime('receive');
    if (voiceEnabled) {
      speakText('Conversa reiniciada.');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleActionClick = (action: { label: string; path?: string; url?: string }) => {
    if (action.path) {
      navigate(action.path);
      if (window.innerWidth < 640) {
        setIsOpen(false);
      }
    } else if (action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Generate a direct WhatsApp link with contextual pre-filled message
  const getContextualWhatsAppUrl = () => {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    const topicText = lastUserMsg ? ` sobre: "${lastUserMsg.content.slice(0, 50)}"` : '';
    const text = encodeURIComponent(`Olá equipe OZ! Estava conversando com o Ozzy no site${topicText} e gostaria de um atendimento direto.`);
    return `https://wa.me/5548991984678?text=${text}`;
  };

  if (isAdmin) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans" id="ozzy-agent-widget">
      {/* Modern Compact Dialog */}
      {isOpen && (
        <div 
          className="fixed sm:absolute bottom-0 sm:bottom-16 right-0 sm:right-0 w-full sm:w-[400px] h-[88vh] sm:h-[570px] max-h-[92vh] bg-slate-950/95 border border-slate-800 rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 backdrop-blur-2xl animate-fade-in text-xs"
          role="dialog"
          aria-label="Chat Inteligente OZZY"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-white select-none">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/25 text-slate-950 font-black border border-amber-300/40">
                  <BatmanIcon className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white tracking-tight">
                    OZZY
                  </h3>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/30">
                    IA Turbo
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Consultoria Instantânea OZ
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              <button
                type="button"
                onClick={toggleVoice}
                title={voiceEnabled ? 'Voz ativada (clique para silenciar)' : 'Voz desativada (clique para ativar áudio do Ozzy)'}
                className={`p-1.5 rounded-lg transition-all active:scale-90 cursor-pointer ${
                  voiceEnabled 
                    ? 'text-amber-400 bg-amber-500/20 border border-amber-500/30 shadow-xs' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                aria-label="Alternar áudio"
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handleClearHistory}
                title="Reiniciar conversa"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all active:scale-90 active:rotate-180 cursor-pointer"
                aria-label="Reiniciar conversa"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                title="Fechar chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all active:scale-90 cursor-pointer"
                aria-label="Fechar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Header Quick Status & WhatsApp Direct */}
          <div className="bg-slate-900/95 border-b border-slate-800 px-3.5 py-2 flex items-center justify-between text-[11px] gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                collectedCount === 5 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : collectedCount > 0 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {collectedCount === 5 ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 stroke-[2]" />
                    <span>5/5 CRM Completo</span>
                  </>
                ) : (
                  <span>{collectedCount}/5 Dados CRM</span>
                )}
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">• Suporte Direto</span>
            </div>

            <a
              href={getContextualWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 hover:underline text-[11px] flex-shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>WhatsApp OZ</span>
            </a>
          </div>

          {/* Mini Real-Time Lead Progress Badges */}
          <div className="bg-slate-950/90 border-b border-slate-800/80 px-3.5 py-1.5 flex items-center justify-between text-[10px] gap-1 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="text-slate-500 font-medium flex items-center gap-1 text-[9px] uppercase tracking-wider">
              Coleta:
            </span>
            <div className="flex items-center gap-1">
              <span className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors ${hasName ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80' : 'bg-slate-900 text-slate-500 border border-slate-800'}`}>
                {hasName ? <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[2.5]" /> : <User className="w-2.5 h-2.5 text-slate-500 stroke-[1.75]" />} Nome
              </span>
              <span className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors ${hasCompany ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80' : 'bg-slate-900 text-slate-500 border border-slate-800'}`}>
                {hasCompany ? <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[2.5]" /> : <Building2 className="w-2.5 h-2.5 text-slate-500 stroke-[1.75]" />} Empresa
              </span>
              <span className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors ${hasPhone ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80' : 'bg-slate-900 text-slate-500 border border-slate-800'}`}>
                {hasPhone ? <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[2.5]" /> : <Phone className="w-2.5 h-2.5 text-slate-500 stroke-[1.75]" />} Whats
              </span>
              <span className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors ${hasSocial ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80' : 'bg-slate-900 text-slate-500 border border-slate-800'}`}>
                {hasSocial ? <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[2.5]" /> : <Globe className="w-2.5 h-2.5 text-slate-500 stroke-[1.75]" />} Social
              </span>
              <span className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors ${hasCity ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80' : 'bg-slate-900 text-slate-500 border border-slate-800'}`}>
                {hasCity ? <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[2.5]" /> : <MapPin className="w-2.5 h-2.5 text-slate-500 stroke-[1.75]" />} Cidade
              </span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-slate-950 scrollbar-thin scrollbar-thumb-slate-800 text-xs">
              {messages.map((msg) => {
                const { mainText, postText } = extractNavigationExplainer(msg.content);
                const effectivePostText = msg.postActionText || postText;

                return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-500/40 flex-shrink-0 flex items-center justify-center text-orange-400 text-xs font-bold mt-0.5">
                      <BatmanIcon className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[86%] space-y-1.5 group ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3 rounded-2xl text-[12px] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-tr-none shadow-md shadow-orange-500/10 font-medium'
                          : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none shadow-sm'
                      }`}
                    >
                      <div className="markdown-body prose prose-invert prose-xs max-w-none text-[12px] leading-relaxed prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-amber-400 prose-headings:text-white">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {mainText}
                        </ReactMarkdown>
                      </div>

                      {/* Tool Action Visual Cards (Executed by Ozzy Agent) */}
                      {msg.toolAction && (
                        <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px]">
                          {/* 1. Domain Check Card */}
                          {msg.toolAction.tool === 'check_domain_availability' && (
                            <div className="bg-slate-950/80 rounded-xl p-2.5 border border-slate-700/80 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-amber-300 flex items-center gap-1">
                                  <Search className="w-3 h-3 text-orange-400" />
                                  Domínio: {msg.toolAction.data.domain}
                                </span>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                                  msg.toolAction.data.available 
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                }`}>
                                  {msg.toolAction.data.available ? 'LIVRE PARA REGISTRO' : 'REGISTRADO'}
                                </span>
                              </div>

                              <div className="text-[11px] text-slate-300">
                                <div>Valor Anual: <strong className="text-white">{msg.toolAction.data.annualPrice}</strong> ({msg.toolAction.data.registrar})</div>
                              </div>

                              {msg.toolAction.data.suggestions && msg.toolAction.data.suggestions.length > 0 && (
                                <div className="space-y-1">
                                  <span className="text-[10px] text-slate-400 font-semibold">Sugestões disponíveis:</span>
                                  <div className="flex flex-wrap gap-1">
                                    {msg.toolAction.data.suggestions.map((s: string, idx: number) => (
                                      <button
                                        key={idx}
                                        onClick={() => handleSend(`Consultar disponibilidade do domínio ${s}`)}
                                        className="bg-slate-900 hover:bg-orange-500/20 border border-slate-700 text-orange-300 px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer"
                                      >
                                        {s}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <a
                                href={msg.toolAction.data.registerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-[11px] transition-colors"
                              >
                                {msg.toolAction.data.available ? 'Garantir este Domínio com a OZ' : 'Consultar no Registro Oficial'}
                              </a>
                            </div>
                          )}

                          {/* 2. Proposal Card */}
                          {msg.toolAction.tool === 'generate_instant_proposal' && (
                            <div className="bg-slate-950/80 rounded-xl p-2.5 border border-purple-500/30 space-y-2">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                <span className="font-bold text-purple-300 flex items-center gap-1">
                                  <FileText className="w-3 h-3 text-purple-400" />
                                  Proposta {msg.toolAction.data.proposalId}
                                </span>
                                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-mono">
                                  {msg.toolAction.data.deliveryDays}
                                </span>
                              </div>

                              <div className="space-y-1 text-slate-300">
                                <div className="font-semibold text-white">{msg.toolAction.data.title}</div>
                                <div className="flex justify-between items-center bg-slate-900 p-1.5 rounded-lg">
                                  <span>Investimento Setup:</span>
                                  <strong className="text-amber-300 text-xs">{msg.toolAction.data.setupPriceFormatted}</strong>
                                </div>
                                <div className="flex justify-between items-center bg-slate-900 p-1.5 rounded-lg">
                                  <span>Mensalidade Cloud:</span>
                                  <strong className="text-emerald-400 text-xs">{msg.toolAction.data.monthlyPriceFormatted}</strong>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Entregáveis Inclusos:</span>
                                <ul className="space-y-0.5 text-[10px] text-slate-300">
                                  {msg.toolAction.data.deliverables?.slice(0, 4).map((d: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-1">
                                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
                                      <span>{d}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <a
                                href={msg.toolAction.data.directWhatsAppLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1.5 w-full text-center py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-[11px] shadow-sm transition-all"
                              >
                                <span>Fechar Proposta no WhatsApp Oficial</span>
                                <MessageCircle className="w-3.5 h-3.5 stroke-[2]" />
                              </a>
                            </div>
                          )}

                          {/* 3. Diagnostic Meeting Card */}
                          {msg.toolAction.tool === 'schedule_diagnostic_meeting' && (
                            <div className="bg-slate-950/80 rounded-xl p-2.5 border border-blue-500/30 space-y-2">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                <span className="font-bold text-blue-300 flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-blue-400 stroke-[1.75]" />
                                  Diagnóstico Agendado
                                </span>
                                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-mono font-bold">
                                  {msg.toolAction.data.meetingId}
                                </span>
                              </div>

                              <div className="space-y-1.5 text-slate-300 text-[11px]">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-blue-400 stroke-[1.75]" />
                                  <span>Horário: <strong className="text-white">{msg.toolAction.data.dateTime}</strong></span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-slate-400 stroke-[1.75]" />
                                  <span>Canal: <strong className="text-white">{msg.toolAction.data.channel}</strong></span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5 text-slate-400 stroke-[1.75]" />
                                  <span>Duração: <span className="text-slate-400">{msg.toolAction.data.duration}</span></span>
                                </div>
                              </div>

                              <a
                                href={msg.toolAction.data.confirmWhatsAppUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1.5 w-full text-center py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-[11px] transition-colors"
                              >
                                <span>Confirmar Presença no WhatsApp VIP</span>
                                <MessageCircle className="w-3.5 h-3.5 stroke-[2]" />
                              </a>
                            </div>
                          )}

                          {/* 4. ROI Performance Card */}
                          {msg.toolAction.tool === 'calculate_roi_performance' && (
                            <div className="bg-slate-950/80 rounded-xl p-2.5 border border-amber-500/30 space-y-2">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                <span className="font-bold text-amber-300 flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3 text-amber-400 stroke-[1.75]" />
                                  Simulação de Impacto & ROI
                                </span>
                                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                                  {msg.toolAction.data.speedGain}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-1.5 text-center text-[10px]">
                                <div className="bg-slate-900 p-1.5 rounded-lg">
                                  <div className="text-slate-400">Rejeição</div>
                                  <div className="font-bold text-emerald-400">{msg.toolAction.data.bounceReduction}</div>
                                </div>
                                <div className="bg-slate-900 p-1.5 rounded-lg">
                                  <div className="text-slate-400">Conversão</div>
                                  <div className="font-bold text-amber-300">{msg.toolAction.data.conversionIncrease}</div>
                                </div>
                              </div>

                              <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800 flex items-start gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400 stroke-[1.75] shrink-0 mt-0.5" />
                                <div><strong>Impacto Anual Estimado:</strong> {msg.toolAction.data.annualEstimateImpact}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* High-Impact Action Buttons */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {msg.suggestedActions.map((action, idx) => {
                          const IconComp = getActionIcon(action.label, action.path, action.url);
                          const cleanLabel = action.label.replace(/^[\p{Emoji}\p{Extended_Pictographic}\s]+/u, '').trim();
                          return (
                            <button
                              key={idx}
                              onClick={() => handleActionClick(action)}
                              className="text-[11px] bg-slate-900 hover:bg-orange-500/20 text-slate-200 hover:text-orange-300 border border-slate-700/80 hover:border-orange-500/50 px-2.5 py-1 rounded-xl flex items-center gap-1.5 transition-all shadow-sm font-semibold group/btn active:scale-95 cursor-pointer"
                            >
                              <IconComp className="w-3.5 h-3.5 text-orange-400 stroke-[1.75]" />
                              <span>{cleanLabel || action.label}</span>
                              {action.url ? (
                                <ExternalLink className="w-3 h-3 text-slate-500 group-hover/btn:text-orange-400 group-hover/btn:translate-x-0.5 transition-transform stroke-[1.75]" />
                              ) : (
                                <ChevronRight className="w-3 h-3 text-slate-500 group-hover/btn:text-orange-400 group-hover/btn:translate-x-0.5 transition-transform stroke-[1.75]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Explanatory Navigation Text Rendered AFTER the Action Buttons */}
                    {effectivePostText && (
                      <div className="p-2.5 rounded-xl bg-slate-900/90 text-slate-300 border border-slate-800/90 text-[11px] leading-relaxed shadow-sm">
                        <div className="markdown-body prose prose-invert prose-xs max-w-none text-[11px] leading-relaxed prose-p:my-0.5 prose-strong:text-amber-400">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {effectivePostText}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}

                    {/* Metadata and Copy */}
                    <div className={`flex items-center gap-2 text-[9px] text-slate-500 px-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <span>{msg.timestamp}</span>
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => copyToClipboard(effectivePostText ? `${mainText}\n\n${effectivePostText}` : mainText, msg.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-orange-400 flex items-center gap-0.5 cursor-pointer"
                          title="Copiar texto"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

              {isLoading && (
                <div className="flex gap-2.5 justify-start items-center text-slate-400">
                  <div className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                    <BatmanIcon className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="bg-slate-900 border border-slate-800 px-3 py-2 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <span className="text-xs text-amber-400 font-bold">Ozzy Escrevendo</span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

          {/* Quick Intent Pills Carousel */}
          <div className="bg-slate-900/90 border-t border-slate-800/80 px-3 py-2 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {QUICK_INTENT_CHIPS.map((chip, i) => {
              const Icon = chip.icon;
              return (
                <button
                  key={i}
                  disabled={isLoading}
                  onClick={() => handleSend(chip.prompt)}
                  className="text-[11px] font-semibold bg-slate-800/80 hover:bg-orange-500 hover:text-white text-slate-300 border border-slate-700/70 hover:border-orange-400 px-2.5 py-1 rounded-full transition-all flex-shrink-0 flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer group/chip"
                >
                  <Icon className="w-3.5 h-3.5 text-orange-400 group-hover/chip:text-white stroke-[1.75]" />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte ao Ozzy ou informe Nome, Empresa, Whats..."
                  disabled={isLoading}
                  className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Enviar mensagem"
                className="w-9 h-9 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 flex items-center justify-center disabled:opacity-40 transition-all active:scale-95 flex-shrink-0 shadow-md shadow-orange-500/20 cursor-pointer"
              >
                <Send className="w-4 h-4 text-slate-950 fill-current" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 pt-2">
              <span className="flex items-center gap-1 text-slate-400 font-medium">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Base AGÊNCIA OZ
              </span>
              <span className="text-slate-500">
                Canoas / RS • Brasil
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Launcher Pill Button */}
      <div className="relative flex items-center justify-end gap-2.5">
        {/* Unopened Callout Bubble */}
        {!isOpen && showNotificationBubble && (
          <div 
            onClick={() => {
              setIsOpen(true);
              setShowNotificationBubble(false);
            }}
            className="hidden sm:flex items-center gap-2.5 bg-slate-900/95 border border-amber-500/50 text-white px-3.5 py-2 rounded-2xl shadow-2xl animate-bounce backdrop-blur-md cursor-pointer hover:border-amber-400 transition-all"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
            <div className="text-[11px]">
              <p className="font-extrabold text-amber-400 leading-tight">Dúvidas sobre Solução 360° ou Sites?</p>
              <p className="text-[10px] text-slate-300 leading-tight">Fale agora com o OZZY em tempo real</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotificationBubble(false);
              }}
              className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
              aria-label="Fechar balão"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Big Glow Launch Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowNotificationBubble(false);
          }}
          className={`flex items-center gap-3 p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer ${
            isOpen
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'bg-gradient-to-tr from-slate-950 via-slate-900 to-orange-950 text-white border border-amber-500/70 hover:border-amber-400 hover:scale-105 shadow-orange-500/30'
          }`}
          title="Falar com o Agente Virtual OZZY"
          aria-label="Abrir assistente virtual OZZY"
          id="ozzy-floating-btn"
        >
          {/* Glowing Batman Symbol Icon */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg shadow-orange-500/40 border border-yellow-300/60 group-hover:rotate-6 group-hover:scale-110 transition-all">
              <BatmanIcon className="w-6 h-6 animate-pulse drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
          </div>

          <div className="text-left hidden sm:block pr-1">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xs tracking-wide bg-gradient-to-r from-white via-amber-100 to-orange-300 bg-clip-text text-transparent">
                OZZY
              </span>
              <span className="text-[8px] font-black uppercase tracking-wider bg-orange-500/30 text-amber-300 px-1.5 py-0.2 rounded border border-orange-500/40">
                IA 24/7
              </span>
            </div>
            <p className="text-[10px] text-slate-300 font-semibold leading-none">
              {isOpen ? 'Fechar Janela' : 'Consultor Virtual'}
            </p>
          </div>

          {hasUnread && !isOpen && (
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          )}
        </button>
      </div>
    </div>
  );
}
