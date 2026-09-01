import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Radio, 
  CheckCircle2, 
  Send, 
  FileText, 
  ShieldCheck, 
  Music, 
  Cpu, 
  Mic, 
  Globe, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Check, 
  AlertTriangle,
  HelpCircle,
  Headphones,
  Sliders
} from 'lucide-react';

interface FormData {
  // Step 1: Visão Geral
  nomeRadio: string;
  objetivoPrincipal: string;
  publicoAlvo: string;
  radiosReferencia: string;

  // Step 2: Conteúdo e Programação
  formatoProgramacao: string;
  generosMusicais: string;
  programacao24h: string;
  programasAoVivo: string;
  temConteudoProduzido: string;
  intencaoPodcasts: string;

  // Step 3: Aspectos Legais e Financeiros
  temCnpj: string;
  estrategiaMonetizacao: string;
  conhecimentoEcad: string;
  interesseInpi: string;

  // Step 4: Requisitos Técnicos
  equipamentosAtuais: string;
  conexaoInternet: string;
  softwareAutomacao: string;
  provedorStreaming: string;
  precisaSiteEApp: string;

  // Step 5: Marketing e Contato
  canaisDivulgacao: string;
  identidadeVisual: string;
  nomeCliente: string;
  emailCliente: string;
  whatsappCliente: string;
  cidadeEstado: string;
  observacoesAdicionais: string;
}

const initialFormData: FormData = {
  nomeRadio: '',
  objetivoPrincipal: 'Entretenimento & Música',
  publicoAlvo: '',
  radiosReferencia: '',
  formatoProgramacao: 'Musical com vinhetas',
  generosMusicais: '',
  programacao24h: 'Sim, com AutoDJ quando estiver offline',
  programasAoVivo: 'Sim, locução ao vivo em horários específicos',
  temConteudoProduzido: 'Preciso de vinhetas e vinhetas faladas',
  intencaoPodcasts: 'Sim, no futuro',
  temCnpj: 'Já possuo CNPJ',
  estrategiaMonetizacao: 'Patrocínios locais e anúncios no site',
  conhecimentoEcad: 'Quero orientações sobre o recolhimento ECAD',
  interesseInpi: 'Sim, desejo proteger a marca',
  equipamentosAtuais: 'Computador i5 + Microfone e Mesa de Som',
  conexaoInternet: 'Banda larga fibra (acima de 50MB upload)',
  softwareAutomacao: 'Gostaria da recomendação da Agência OZ',
  provedorStreaming: 'PROVOX Streaming HD (Agência OZ)',
  precisaSiteEApp: 'Sim, quero Site Administrável e App Mobile',
  canaisDivulgacao: 'Instagram, Facebook, WhatsApp e Eventos',
  identidadeVisual: 'Preciso criar a logomarca e identidade visual',
  nomeCliente: '',
  emailCliente: '',
  whatsappCliente: '',
  cidadeEstado: '',
  observacoesAdicionais: ''
};

export default function BriefingRadioWeb() {
  const [activeTab, setActiveTab] = useState<'questionario' | 'guia'>('guia');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSummaryText = () => {
    return `*BRIEFING E QUESTIONÁRIO - PROPOSIÇÃO RÁDIO WEB PROVOX*
    
*1. VISÃO GERAL DO PROJETO*
• Nome da Rádio: ${formData.nomeRadio || 'A definir'}
• Objetivo Principal: ${formData.objetivoPrincipal}
• Público-Alvo: ${formData.publicoAlvo || 'Não informado'}
• Referências/Inspirações: ${formData.radiosReferencia || 'Nenhuma'}

*2. CONTEÚDO E PROGRAMAÇÃO*
• Formato: ${formData.formatoProgramacao}
• Gêneros Musicais: ${formData.generosMusicais || 'Variados'}
• Operação 24 horas: ${formData.programacao24h}
• Programas ao Vivo: ${formData.programasAoVivo}
• Conteúdo Pré-produzido: ${formData.temConteudoProduzido}
• Podcasts/Sob Demanda: ${formData.intencaoPodcasts}

*3. LEGAIS E FINANCEIROS*
• Formalização CNPJ: ${formData.temCnpj}
• Monetização: ${formData.estrategiaMonetizacao}
• Direitos Autorais (ECAD): ${formData.conhecimentoEcad}
• Registro INPI: ${formData.interesseInpi}

*4. TÉCNICO E INFRAESTRUTURA*
• Equipamentos: ${formData.equipamentosAtuais}
• Internet Upload: ${formData.conexaoInternet}
• Software de Automação: ${formData.softwareAutomacao}
• Provedor de Streaming: ${formData.provedorStreaming}
• Site Administrável & App Mobile: ${formData.precisaSiteEApp}

*5. MARKETING E DADOS DO CLIENTE*
• Divulgação: ${formData.canaisDivulgacao}
• Identidade Visual/Logo: ${formData.identidadeVisual}
• Cliente: ${formData.nomeCliente || 'Não informado'}
• E-mail: ${formData.emailCliente || 'Não informado'}
• Telefone/WhatsApp: ${formData.whatsappCliente || 'Não informado'}
• Cidade/Estado: ${formData.cidadeEstado || 'Não informado'}
• Obs/Detalhes: ${formData.observacoesAdicionais || 'Nenhuma'}`;
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(generateSummaryText());
    window.open(`https://wa.me/5548991984678?text=${text}`, '_blank');
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateSummaryText());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div id="briefing-radio-web-page" className="space-y-12 pb-16 animate-fade-in">
      
      {/* 1. Header Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full">
            <Radio className="h-4 w-4 text-orange-400 animate-pulse" /> PROVOX STREAMING • RÁDIO WEB PROFISSIONAL
          </span>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Questionário & Guia de Levantamento para <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">Rádio Web</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Planeje sua emissora online com segurança. Analise os requisitos de direitos autorais (ECAD), equipamentos de estúdio, automação e preencha nosso questionário de escopo para receber uma proposta de investimento sob medida.
          </p>

          {/* Tab Switchers */}
          <div className="flex justify-center pt-4">
            <div className="bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700/80 inline-flex gap-2 shadow-xl">
              <button
                type="button"
                onClick={() => setActiveTab('guia')}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'guia' 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <ShieldCheck className="h-4 w-4" /> Guia de Requisitos (ECAD, Hardware e Software)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('questionario')}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'questionario' 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <FileText className="h-4 w-4" /> Questionário de Escopo (21 Perguntas)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= TAB 1: QUESTIONÁRIO ================= */}
        {activeTab === 'questionario' && (
          <div className="space-y-8">
            
            {/* Step Selector Progress Header */}
            {!isSubmitted && (
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span>Progresso do Questionário</span>
                  <span className="text-orange-600">Etapa {currentStep} de 5</span>
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map(step => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setCurrentStep(step)}
                      className={`h-2.5 rounded-full transition-all ${
                        step <= currentStep ? 'bg-orange-500' : 'bg-slate-200'
                      }`}
                      title={`Ir para etapa ${step}`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-[11px] font-semibold text-center text-slate-600">
                  <span className={currentStep === 1 ? 'text-orange-600 font-bold' : ''}>1. Visão Geral</span>
                  <span className={currentStep === 2 ? 'text-orange-600 font-bold' : ''}>2. Programação</span>
                  <span className={currentStep === 3 ? 'text-orange-600 font-bold' : ''}>3. Legais & Finanças</span>
                  <span className={currentStep === 4 ? 'text-orange-600 font-bold' : ''}>4. Técnica & Infra</span>
                  <span className={currentStep === 5 ? 'text-orange-600 font-bold' : ''}>5. Marketing & Dados</span>
                </div>
              </div>
            )}

            {/* Submission Confirmation Card */}
            {isSubmitted ? (
              <div className="bg-white border-2 border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                
                <div className="space-y-2 max-w-2xl mx-auto">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Formulário Concluído com Sucesso!</span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Obrigado pelas informações do seu projeto de Rádio Web!
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Com base nas suas respostas, nossa equipe da <strong>AGÊNCIA OZ</strong> vai analisar os requisitos técnicos, licenças do ECAD e estrutura de streaming PROVOX para preparar sua proposta detalhada.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl max-w-2xl mx-auto text-left text-xs font-mono text-slate-700 whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {generateSummaryText()}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Send className="h-4 w-4" /> Enviar Resumo pelo WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="w-full sm:w-auto bg-slate-800 hover:bg-slate-900 text-white font-bold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    {copiedText ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    {copiedText ? 'Copiado para Área de Transferência!' : 'Copiar Resumo em Texto'}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setIsSubmitted(false); setCurrentStep(1); }}
                    className="w-full sm:w-auto text-slate-500 hover:text-slate-800 text-xs font-bold px-4 py-3"
                  >
                    Revisar ou Refazer Questionário
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitForm} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
                
                {/* STEP 1: VISÃO GERAL DO PROJETO */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Bloco 3.1</span>
                      <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                        1. Visão Geral do Projeto
                      </h2>
                      <p className="text-xs text-slate-500">Definição conceitual e metas iniciais da sua nova Rádio Web.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          1. Qual é o nome provisório ou definitivo da rádio web? *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Rádio Web Canoas Pop, FM Sertaneja Digital, Rádio Gospel Luz..."
                          value={formData.nomeRadio}
                          onChange={(e) => handleInputChange('nomeRadio', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          2. Qual é o principal objetivo da rádio web?
                        </label>
                        <select
                          value={formData.objetivoPrincipal}
                          onChange={(e) => handleInputChange('objetivoPrincipal', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                        >
                          <option value="Entretenimento & Música">Entretenimento & Programação Musical</option>
                          <option value="Informação e Jornalismo Local">Informação, Notícias e Jornalismo Local</option>
                          <option value="Nicho Específico / Segmentada">Nicho Específico (Rock, Sertanejo, Esportes, Religiosa)</option>
                          <option value="Divulgação de Artistas Independentes">Divulgação de Artistas e Bandas da Região</option>
                          <option value="Rádio Corporativa / Ambiente">Rádio Corporativa (Lojas, Redes de Supermercado, Shoppings)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          3. Qual é o público-alvo principal da rádio?
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Jovens de 18 a 35 anos, Comunidade de Canoas e POA, Empresários locais..."
                          value={formData.publicoAlvo}
                          onChange={(e) => handleInputChange('publicoAlvo', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          4. Existe alguma inspiração ou rádio de referência que você admira?
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Jovem Pan, Rádio Atlântida, Antena 1, Rádio Eldorado..."
                          value={formData.radiosReferencia}
                          onChange={(e) => handleInputChange('radiosReferencia', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
                      >
                        Próximo: Conteúdo & Programação <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: CONTEÚDO E PROGRAMAÇÃO */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Bloco 3.2</span>
                      <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                        2. Conteúdo e Programação
                      </h2>
                      <p className="text-xs text-slate-500">Grade musical, locução ao vivo e programas sob demanda.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          5. Qual será o formato predominante da programação?
                        </label>
                        <select
                          value={formData.formatoProgramacao}
                          onChange={(e) => handleInputChange('formatoProgramacao', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                        >
                          <option value="Musical continuado com vinhetas">Musical continuado com vinhetas</option>
                          <option value="Talk show / Entrevistas e debates">Talk show / Entrevistas e debates</option>
                          <option value="Jornalístico / Informativo diário">Jornalístico / Informativo diário</option>
                          <option value="Misto (Música, notícias e participação ao vivo)">Misto (Música, notícias e locução)</option>
                          <option value="Religioso / Transmissão de cultos/missas">Religioso / Transmissão de cultos/missas</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          6. Quais gêneros musicais serão abordados?
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Pop, Rock, Sertanejo Universitário, MPB, Eletrônico, Gospel, Anos 80/90..."
                          value={formData.generosMusicais}
                          onChange={(e) => handleInputChange('generosMusicais', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          7. A programação será 24 horas? Como funcionará o AutoDJ?
                        </label>
                        <select
                          value={formData.programacao24h}
                          onChange={(e) => handleInputChange('programacao24h', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                        >
                          <option value="Sim, 24h no ar com AutoDJ rodando playlists gravadas no servidor">Sim, 24h no ar com AutoDJ no servidor PROVOX</option>
                          <option value="Sim, com transmissão ao vivo 24 horas continuada do computador local">Sim, transmissão ao vivo continuada do computador</option>
                          <option value="Horário comercial fixo (sem AutoDJ à noite)">Horário comercial fixo (apenas em horários específicos)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          8. Haverá programas ao vivo? Quantos e com qual frequência?
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: 2 programas por dia (manhã e final da tarde), com locutor ao vivo..."
                          value={formData.programasAoVivo}
                          onChange={(e) => handleInputChange('programasAoVivo', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          9. Você já possui acervo e áudios produzidos (vinhetas, jingles)?
                        </label>
                        <select
                          value={formData.temConteudoProduzido}
                          onChange={(e) => handleInputChange('temConteudoProduzido', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                        >
                          <option value="Já possuo acervo musical e vinhetas prontas">Já possuo acervo musical e vinhetas prontas</option>
                          <option value="Tenho acervo musical, mas preciso produzir vinhetas profissionais">Tenho acervo musical, mas preciso de vinhetas novas</option>
                          <option value="Não tenho nada produzido, preciso de assessoria completa da OZ">Não tenho nada produzido, preciso de assessoria completa</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          10. Existe intenção de criar Podcasts ou disponibilizar áudios sob demanda?
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Sim, episódios semanais no site e aplicativo..."
                          value={formData.intencaoPodcasts}
                          onChange={(e) => handleInputChange('intencaoPodcasts', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-slate-600 hover:text-slate-900 font-bold px-4 py-2 text-sm flex items-center gap-1"
                      >
                        <ArrowLeft className="h-4 w-4" /> Voltar
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
                      >
                        Próximo: Aspectos Legais & Finanças <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: ASPECTOS LEGAIS E FINANCEIROS */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Bloco 3.3</span>
                      <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                        3. Aspectos Legais, ECAD e Monetização
                      </h2>
                      <p className="text-xs text-slate-500">Formalização do empreendimento, direitos autorais e faturamento.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          11. O cliente já possui CNPJ ou pretende formalizar a empresa?
                        </label>
                        <select
                          value={formData.temCnpj}
                          onChange={(e) => handleInputChange('temCnpj', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                        >
                          <option value="Já possuo CNPJ ativo">Já possuo CNPJ ativo</option>
                          <option value="Pretendo abrir MEI ou Empresa Individual para a rádio">Pretendo abrir MEI ou Empresa Individual</option>
                          <option value="Projeto em fase de testes (Pessoa Física)">Projeto inicial em Pessoa Física</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          12. Há previsão de monetização da rádio (anúncios, patrocínios, doações)?
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Venda de banners no site, patrocínio comercial de programas, Google AdSense..."
                          value={formData.estrategiaMonetizacao}
                          onChange={(e) => handleInputChange('estrategiaMonetizacao', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2">
                        <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                          13. Direitos Autorais (ECAD) - Execução Pública Musical
                        </div>
                        <p className="text-xs text-amber-900/80 leading-relaxed">
                          A execução de músicas em Web Rádios exige o recolhimento mensal junto ao ECAD através da "Licença Cobertor". O uso de contas pessoais de streaming (Spotify/Apple Music) é proibido para transmissões públicas.
                        </p>
                        <select
                          value={formData.conhecimentoEcad}
                          onChange={(e) => handleInputChange('conhecimentoEcad', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-amber-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white text-slate-800"
                        >
                          <option value="Já conheço o ECAD e possuo orçamento separado">Já conheço o ECAD e possuo orçamento mensal previsto</option>
                          <option value="Quero orientações e auxílio da Agência OZ sobre os custos do ECAD">Quero orientações da Agência OZ para entender os custos do ECAD</option>
                          <option value="Transmitirei apenas músicas autorais ou de domínio público">Transmitirei apenas programação própria/autoral sem músicas comerciais</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          14. Existe interesse em registrar a marca (nome e logo) no INPI?
                        </label>
                        <select
                          value={formData.interesseInpi}
                          onChange={(e) => handleInputChange('interesseInpi', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                        >
                          <option value="Sim, quero resguardar e registrar o nome da rádio no INPI">Sim, quero proteger e registrar a marca no INPI</option>
                          <option value="Talvez no futuro, após a rádio ganhar audiência">Talvez no futuro</option>
                          <option value="Não tenho interesse no momento">Não tenho interesse no momento</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-slate-600 hover:text-slate-900 font-bold px-4 py-2 text-sm flex items-center gap-1"
                      >
                        <ArrowLeft className="h-4 w-4" /> Voltar
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
                      >
                        Próximo: Técnica & Infraestrutura <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: REQUISITOS TÉCNICOS E INFRAESTRUTURA */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Bloco 3.4</span>
                      <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                        4. Requisitos Técnicos e Infraestrutura
                      </h2>
                      <p className="text-xs text-slate-500">Equipamentos do estúdio, conectividade, encoders e aplicativos.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          15. Quais equipamentos de hardware você já possui para o estúdio?
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Computador i5 8GB, Microfone Shure SM58, Mesa Behringer Xenyx USB, Fones fechados..."
                          value={formData.equipamentosAtuais}
                          onChange={(e) => handleInputChange('equipamentosAtuais', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          16. Qual a qualidade da conexão de internet no local de transmissão?
                        </label>
                        <select
                          value={formData.conexaoInternet}
                          onChange={(e) => handleInputChange('conexaoInternet', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                        >
                          <option value="Fibra Óptica excelente (Upload acima de 20 Mbps)">Fibra Óptica (Upload acima de 20 Mbps - Ideal)</option>
                          <option value="Banda Larga padrão (Upload entre 5 e 10 Mbps)">Banda Larga padrão (Upload entre 5 e 10 Mbps)</option>
                          <option value="Não tenho certeza, preciso testar minha taxa de Upload">Não tenho certeza, preciso de ajuda para testar</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          17. Há preferência por algum software de automação de rádio?
                        </label>
                        <select
                          value={formData.softwareAutomacao}
                          onChange={(e) => handleInputChange('softwareAutomacao', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                        >
                          <option value="Gostaria da recomendação e instalação técnica da Agência OZ">Recomendação técnica da Agência OZ</option>
                          <option value="Opção Gratuita / Código Aberto (RadioDJ, AzuraCast, PlayIt Live)">Opção Gratuita (RadioDJ, AzuraCast, PlayIt Live)</option>
                          <option value="Opção Profissional Paga (ZaraStudio, Dinesat, Pulsar)">Opção Profissional Paga (ZaraStudio, Dinesat)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          18. Provedor de Streaming / Servidor de Áudio
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Quero o servidor PROVOX Streaming HD da OZ com suporte..."
                          value={formData.provedorStreaming}
                          onChange={(e) => handleInputChange('provedorStreaming', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          19. Há interesse em ter Site Administrável e/ou Aplicativo Mobile?
                        </label>
                        <select
                          value={formData.precisaSiteEApp}
                          onChange={(e) => handleInputChange('precisaSiteEApp', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                        >
                          <option value="Sim, quero o combo completo (Site Administrável + App Android e iOS)">Sim, combo completo (Site Administrável + App Android/iOS)</option>
                          <option value="Apenas o Site Administrável com Player Integrado">Apenas o Site Administrável com Player Integrado</option>
                          <option value="Apenas o Aplicativo Mobile para celulares">Apenas o Aplicativo Mobile</option>
                          <option value="Somente o link do servidor de streaming (já tenho site)">Somente o servidor de streaming</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-slate-600 hover:text-slate-900 font-bold px-4 py-2 text-sm flex items-center gap-1"
                      >
                        <ArrowLeft className="h-4 w-4" /> Voltar
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(5)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
                      >
                        Próximo: Divulgação & Finalizar <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: MARKETING, DIVULGAÇÃO E SEUS DADOS */}
                {currentStep === 5 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Bloco 3.5</span>
                      <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                        5. Marketing, Identidade e Dados do Responsável
                      </h2>
                      <p className="text-xs text-slate-500">Informe os canais de divulgação e seus dados para receber a proposta.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          20. Qais canais de divulgação pretende utilizar?
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Instagram, Facebook, Tik Tok, Anúncios patrocinados, Parcerias em canais locais..."
                          value={formData.canaisDivulgacao}
                          onChange={(e) => handleInputChange('canaisDivulgacao', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          21. Existe um plano para a criação da identidade visual (logotipo, cores, vinhetas)?
                        </label>
                        <select
                          value={formData.identidadeVisual}
                          onChange={(e) => handleInputChange('identidadeVisual', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                        >
                          <option value="Preciso que a Agência OZ crie o logotipo e manual de marca">Preciso que a Agência OZ crie o logotipo e identidade visual</option>
                          <option value="Já possuo o logotipo e artes das redes sociais prontas">Já possuo a identidade visual e logotipo prontos</option>
                        </select>
                      </div>

                      <div className="border-t border-slate-100 pt-6 space-y-4">
                        <h3 className="font-display font-bold text-slate-900 text-sm uppercase tracking-wider text-orange-600 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" /> Dados de Contato do Solicitante
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Seu Nome Completo *</label>
                            <input
                              type="text"
                              required
                              placeholder="Seu nome"
                              value={formData.nomeCliente}
                              onChange={(e) => handleInputChange('nomeCliente', e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Telefone *</label>
                            <input
                              type="text"
                              required
                              placeholder="(00) 00000-0000"
                              value={formData.whatsappCliente}
                              onChange={(e) => handleInputChange('whatsappCliente', e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">E-mail Profissional *</label>
                            <input
                              type="email"
                              required
                              placeholder="seuemail@dominio.com.br"
                              value={formData.emailCliente}
                              onChange={(e) => handleInputChange('emailCliente', e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Cidade e Estado</label>
                            <input
                              type="text"
                              placeholder="Ex: Canoas / RS"
                              value={formData.cidadeEstado}
                              onChange={(e) => handleInputChange('cidadeEstado', e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Observações Adicionais ou Dúvidas</label>
                          <textarea
                            rows={3}
                            placeholder="Descreva detalhes específicos do seu projeto..."
                            value={formData.observacoesAdicionais}
                            onChange={(e) => handleInputChange('observacoesAdicionais', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-6 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="text-slate-600 hover:text-slate-900 font-bold px-4 py-2 text-sm flex items-center gap-1"
                      >
                        <ArrowLeft className="h-4 w-4" /> Voltar
                      </button>

                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 text-sm"
                      >
                        <Send className="h-4 w-4" /> Concluir e Gerar Proposta
                      </button>
                    </div>
                  </div>
                )}

              </form>
            )}

          </div>
        )}

        {/* ================= TAB 2: GUIA DE REQUISITOS (ECAD, HARDWARE, SOFTWARE) ================= */}
        {activeTab === 'guia' && (
          <div className="space-y-12 animate-fade-in">
            
            {/* Intro text */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500">PROPOSIÇÃO DE INVESTIMENTO & LEGISLAÇÃO</span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                Requisitos Essenciais para Implantação de uma Rádio Web no Brasil
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                A operação de uma emissora online exige alinhamento em cinco camadas principais: aspectos legais (direitos autorais/ECAD e registro de marca), hardware de estúdio, softwares de automação/encoder, infraestrutura de streaming e estratégia de conteúdo.
              </p>
            </div>

            {/* Grid of Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* 1. Direitos Autorais e ECAD */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Seção 2.1</span>
                    <h3 className="font-display font-extrabold text-slate-900 text-lg">Direitos Autorais & ECAD</h3>
                  </div>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Licença Cobertor (Blanket License):</strong> O pagamento ao ECAD é obrigatório sempre que houver execução pública de fonogramas musicais.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Relatórios Mensais:</strong> A rádio deve enviar relatórios das faixas veiculadas para distribuição aos artistas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Uso de Contas Pessoais:</strong> Utilizar serviços como Spotify ou Apple Music para reprodução pública em rádio web viola os termos das plataformas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Marca no INPI:</strong> Recomendado a obtenção de CNPJ e registro do nome/logotipo no INPI.</span>
                  </li>
                </ul>
              </div>

              {/* 2. Hardware de Estúdio */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Seção 2.2</span>
                    <h3 className="font-display font-extrabold text-slate-900 text-lg">Equipamentos de Hardware</h3>
                  </div>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Computador Estação:</strong> Processador Intel Core i5 ou superior, mínimo de 8GB RAM e interface de áudio dedicada.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Microfones:</strong> Condensador (Audio-Technica AT2020) para estúdio acautelado ou Dinâmico (Shure SM58) para versatilidade.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Mesa de Som / Interface:</strong> Behringer Xenyx USB, Focusrite Scarlett ou Yamaha MG series.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Conectividade Upload:</strong> Internet estável com upload mínimo recomendado de 5 a 10 Mbps.</span>
                  </li>
                </ul>
              </div>

              {/* 3. Softwares de Automação & Encoders */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <Sliders className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Seção 2.3</span>
                    <h3 className="font-display font-extrabold text-slate-900 text-lg">Software & Processamento</h3>
                  </div>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Automação Gratuita:</strong> RadioDJ, PlayIt Live ou AzuraCast (servidor cloud).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Automação Paga:</strong> ZaraStudio, Dinesat e Pulsar para emissoras comerciais.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Encoder de Transmissão:</strong> BUTT (Broadcast Using This Tool) ou Altacast para enviar o sinal ao servidor.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Processador de Áudio:</strong> Stereo Tool para compressão, equalização e impacto de voz no padrão FM.</span>
                  </li>
                </ul>
              </div>

              {/* 4. Servidor PROVOX Streaming */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">Seção 2.4</span>
                    <h3 className="font-display font-extrabold text-slate-900 text-lg">Infraestrutura PROVOX</h3>
                  </div>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>AutoDJ 24h:</strong> Transmissão continuada mesmo quando seu computador pessoal está desligado.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Site Administrável:</strong> Portal para publicação da grade de horários, notícias e atendimento.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Aplicativo Mobile:</strong> Criação de App dedicado no Android e iOS.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Métricas de Audiência:</strong> Monitoramento em tempo real do número de ouvintes e geolocalização.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom CTA to Form */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold">
                Pronto para transformar sua ideia em uma Rádio Web no ar?
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                Preencha o questionário de escopo de 21 perguntas e receba nossa orientação técnica e comercial completa.
              </p>
              <button
                type="button"
                onClick={() => { setActiveTab('questionario'); setCurrentStep(1); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all inline-flex items-center gap-2 text-sm"
              >
                Preencher Questionário de Escopo <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
