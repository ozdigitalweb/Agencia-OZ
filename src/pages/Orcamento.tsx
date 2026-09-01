import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Building2, 
  Phone, 
  Mail, 
  Calculator,
  ArrowLeft,
  FileCheck,
  Check
} from 'lucide-react';

export default function Orcamento() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('servico') || searchParams.get('service') || 'lp-outra';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService,
    deadline: 'imediato',
    budgetRange: 'padrao',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync state if query parameter changes
  useEffect(() => {
    const s = searchParams.get('servico') || searchParams.get('service');
    if (s) {
      setFormData(prev => ({ ...prev, service: s }));
    }
  }, [searchParams]);

  const serviceOptions = [
    { value: 'lp-medicos', label: 'Landing Page - Médicos, Dentistas & Clínicas' },
    { value: 'lp-advogados', label: 'Landing Page - Advogados & Escritórios Jurídicos' },
    { value: 'lp-loja', label: 'Landing Page - Lojas, Comércios & Produtos' },
    { value: 'lp-artesanato', label: 'Landing Page - Artesanato, Ateliês & Arte Autoral' },
    { value: 'lp-outra', label: 'Landing Page Personalizada (Outro Segmento)' },
    { value: 'midia', label: 'Mídia, Criativos para Redes Sociais & Assistente IA (OZZY)' },
    { value: 'wordpress', label: 'Site Institucional em WordPress' },
    { value: 'hospedagem', label: 'Hospedagem Cloud VPS / cPanel' },
    { value: 'seo', label: 'SEO & Otimização de Busca (Google & GEO)' },
    { value: 'streaming', label: 'PROVOX Streaming & Rádio Corporativa' },
    { value: 'combo', label: 'Projeto Completo (Site + Hospedagem + SEO)' },
  ];

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      tempErrors.name = 'O nome completo é obrigatório.';
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'O e-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Insira um e-mail válido.';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'O WhatsApp/Telefone é obrigatório para enviarmos a proposta.';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      tempErrors.phone = 'Insira um número válido com DDD (mínimo 10 dígitos).';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const getSelectedServiceLabel = () => {
    const match = serviceOptions.find(opt => opt.value === formData.service);
    return match ? match.label : 'Landing Page Personalizada';
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Preenchi o formulário de orçamento no site.\n\n` +
    `*Nome:* ${formData.name}\n` +
    `*E-mail:* ${formData.email}\n` +
    `*Telefone:* ${formData.phone}\n` +
    `*Serviço Escolhido:* ${getSelectedServiceLabel()}\n` +
    (formData.company ? `*Empresa:* ${formData.company}\n` : '') +
    (formData.message ? `*Detalhes:* ${formData.message}` : '')
  );

  const whatsappUrl = `https://wa.me/5548991984678?text=${whatsappMessage}`;

  return (
    <div id="orcamento-page" className="space-y-16 pb-20 animate-fade-in bg-slate-50 min-h-screen">
      
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Calculator className="h-4 w-4" />
            <span>Proposta Comercial sem Compromisso</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Solicite um Orçamento Sob Medida
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Escolha o modelo ou serviço desejado abaixo. Nossa equipe analisará seu projeto e enviará uma proposta detalhada em até 2 horas comerciais.
          </p>

          <div className="pt-2 flex justify-center">
            <Link 
              to="/servicos/landingpages" 
              className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Ver todos os modelos de Landing Pages
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Main Form & Benefits Container */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Container */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 space-y-6">
            
            {isSubmitted ? (
              <div className="text-center py-8 space-y-6 animate-fade-in">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <h2 className="font-display text-2xl font-black text-slate-900">
                    Solicitação Recebida com Sucesso!
                  </h2>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Obrigado, <strong className="text-slate-900">{formData.name}</strong>! Recebemos seu pedido de orçamento para:
                  </p>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-blue-900 max-w-md mx-auto">
                    {getSelectedServiceLabel()}
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-3 max-w-md mx-auto text-xs text-slate-600">
                  <p className="font-bold text-slate-900 text-sm">O que acontece agora?</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Análise técnica do escopo pelo nosso time especialista.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Envio de proposta formal por e-mail ou WhatsApp em até 2h úteis.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-8 py-4 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/20 inline-flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Acelerar Atendimento via WhatsApp
                  </a>

                  <div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-slate-400 hover:text-slate-600 underline font-semibold pt-2"
                    >
                      Enviar outro orçamento
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                
                <div className="border-b border-slate-100 pb-4 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-600">Preencha Abaixo</span>
                  <h2 className="font-display text-2xl font-extrabold text-slate-900">
                    Formulário de Orçamento
                  </h2>
                  <p className="text-xs text-slate-500">
                    Campos com <span className="text-red-500">*</span> são obrigatórios para elaboração da proposta.
                  </p>
                </div>

                {/* COMBO BOX DE SERVIÇO */}
                <div className="space-y-2">
                  <label htmlFor="service-select" className="block text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center justify-between">
                    <span>Qual serviço ou modelo você deseja? <span className="text-red-500">*</span></span>
                    <span className="text-[10px] text-blue-600 font-semibold lowercase">(Selecione no combo)</span>
                  </label>
                  <select
                    id="service-select"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-blue-500/30 focus:border-blue-600 bg-blue-50/50 text-slate-900 font-bold text-sm focus:outline-none transition-all shadow-sm"
                  >
                    <optgroup label="Landing Pages Demonstrativas">
                      <option value="lp-medicos">Landing Page - Médicos, Dentistas & Clínicas</option>
                      <option value="lp-advogados">Landing Page - Advogados & Escritórios Jurídicos</option>
                      <option value="lp-loja">Landing Page - Lojas, Comércios & Ofertas</option>
                      <option value="lp-artesanato">Landing Page - Artesanato, Ateliês & Arte Autoral</option>
                      <option value="lp-outra">Landing Page Personalizada (Outros Segmentos)</option>
                    </optgroup>
                    <optgroup label="Outros Serviços de TI & Web">
                      <option value="wordpress">Desenvolvimento de Site WordPress</option>
                      <option value="hospedagem">Hospedagem Cloud VPS cPanel</option>
                      <option value="seo">SEO & Otimização de Busca Google / GEO</option>
                      <option value="streaming">PROVOX Streaming & Rádio Corporativa</option>
                      <option value="combo">Projeto Completo (Site + Hospedagem + SEO)</option>
                    </optgroup>
                  </select>
                </div>

                {/* Personal Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Seu Nome Completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Carlos Eduardo"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.name 
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                          : 'border-slate-200 focus:ring-blue-100 focus:border-blue-600'
                      }`}
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1 text-xs font-semibold text-red-500">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      E-mail Corporativo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="carlos@suaempresa.com.br"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.email 
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                          : 'border-slate-200 focus:ring-blue-100 focus:border-blue-600'
                      }`}
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1 text-xs font-semibold text-red-500">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      WhatsApp / Celular com DDD <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="form-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(48) 99198-4678"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.phone 
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                          : 'border-slate-200 focus:ring-blue-100 focus:border-blue-600'
                      }`}
                    />
                    {errors.phone && (
                      <p className="flex items-center gap-1 text-xs font-semibold text-red-500">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-company" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Nome da Empresa / Clínica <span className="text-slate-400 font-normal">(Opcional)</span>
                    </label>
                    <input
                      type="text"
                      id="form-company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Ex: Clínica Viva Bem"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                    />
                  </div>

                </div>

                {/* Deadline Selector */}
                <div className="space-y-1.5">
                  <label htmlFor="form-deadline" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Previsão de Início do Projeto
                  </label>
                  <select
                    id="form-deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 bg-white"
                  >
                    <option value="imediato">Urgente / Início Imediato (Esta semana)</option>
                    <option value="15dias">Próximos 15 a 30 dias</option>
                    <option value="pesquisa">Apenas pesquisando orçamentos para o futuro</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="form-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Detalhes do Projeto / Observações
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Conte-nos brevemente o que precisa (ex: cores de preferência, se já possui domínio, recursos essenciais...)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-base py-4 rounded-xl shadow-lg shadow-blue-700/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processando Orçamento...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar Solicitação de Orçamento
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Seus dados estão protegidos em conformidade com a LGPD. Resposta em até 2h úteis.
                </p>

              </form>
            )}

          </div>

          {/* Right Side: Guarantees & Direct WhatsApp Box */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp fast track card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Sparkles className="h-3.5 w-3.5" /> Preferência por WhatsApp?
              </span>

              <h3 className="font-display font-extrabold text-xl text-white">
                Fale Diretamente com Nosso Comercial
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Se preferir não preencher o formulário completo, você pode nos chamar diretamente no WhatsApp para uma conversa rápida.
              </p>

              <div className="pt-1">
                <a
                  href={`https://wa.me/5548991984678?text=${encodeURIComponent('Olá! Vim pelo site da Agência OZ e gostaria de solicitar um orçamento para Landing Page/Site.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
                >
                  <MessageSquare className="h-4 w-4" />
                  Abrir Conversa no WhatsApp
                </a>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-emerald-400" /> Resposta em 15min</span>
                <span className="font-bold text-slate-300">(48) 99198-4678</span>
              </div>
            </div>

            {/* Why choose OZ cards */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-display font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-400">
                Por que a Agência OZ?
              </h4>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold">Entrega Ágil & Código Otimizado</strong>
                    <span>Páginas entregues em tempo recorde com pontuação alta no Google PageSpeed.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold">100% Responsivo e Mobile-First</strong>
                    <span>Layouts perfeitos para todos os smartphones e dispositivos móveis.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold">Suporte e Treinamento Inclusos</strong>
                    <span>Acompanhamento contínuo e suporte humanizado via WhatsApp.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
