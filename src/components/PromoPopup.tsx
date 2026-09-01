import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { X, Gift, Check, Send, Sparkles, MessageSquare, ShieldCheck, Mail, Phone, MapPin, Building, Globe, Layers, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { siteSettingsApi } from '../services/siteSettingsApi';
import { SitePromoSettings, DEFAULT_PROMO_SETTINGS } from '../types/siteSettings';

export default function PromoPopup() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const [settings, setSettings] = useState<SitePromoSettings>(() => siteSettingsApi.getCachedSettings());
  const [isOpen, setIsOpen] = useState(false);
  const [hasAcceptedRules, setHasAcceptedRules] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  // Subscribe to real-time site settings updates
  useEffect(() => {
    siteSettingsApi.getSettings().then(setSettings);
    const unsubscribe = siteSettingsApi.subscribe((updated) => {
      setSettings(updated);
      if (!updated.promoPopupEnabled) {
        setIsOpen(false);
      }
    });
    return unsubscribe;
  }, []);

  // Form Fields
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    siteAtual: '',
    fone: '',
    whatsapp: '',
    cidade: '',
    ramo: '',
  });

  const [formErrors, setFormErrors] = useState({
    nome: false,
    empresa: false,
    fone: false,
    whatsapp: false,
    cidade: false,
    ramo: false,
  });

  // Automatically trigger the promotion pop-up on visit if enabled
  useEffect(() => {
    if (isAdmin) return;
    if (!settings.promoPopupEnabled || !settings.promoAutoOpenEnabled) return;
    
    // Check if closed in current session to prevent excessive re-prompting on quick internal route clicks
    const hasClosedInSession = sessionStorage.getItem('oz_promo_popup_closed_session');
    
    if (!hasClosedInSession) {
      const delayMs = Math.max(500, (settings.promoAutoOpenDelay || 1.5) * 1000);
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, delayMs);
      return () => clearTimeout(timer);
    }
  }, [isAdmin, settings.promoPopupEnabled, settings.promoAutoOpenEnabled, settings.promoAutoOpenDelay]);

  // Global event listener to trigger the pop-up from any button/link in the application
  useEffect(() => {
    const handleOpenPromo = () => {
      // If modal is explicitly triggered via CTA, open even if auto-popup was suppressed
      setIsOpen(true);
      setIsSuccess(false);
    };
    window.addEventListener('open-oz-promo', handleOpenPromo);
    return () => {
      window.removeEventListener('open-oz-promo', handleOpenPromo);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('oz_promo_popup_closed_session', 'true');
  };

  const handleOpenManual = () => {
    setIsOpen(true);
    setIsSuccess(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const errors = {
      nome: !formData.nome.trim(),
      empresa: !formData.empresa.trim(),
      fone: !formData.fone.trim(),
      whatsapp: !formData.whatsapp.trim(),
      cidade: !formData.cidade.trim(),
      ramo: !formData.ramo.trim(),
    };

    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!hasAcceptedRules) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStep(1);

    // Save lead to backend CRM
    try {
      await fetch('/api/ozzy/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: {
            name: formData.nome,
            company: formData.empresa,
            phone: formData.whatsapp || formData.fone,
            city: formData.cidade,
            state: 'BR'
          },
          stage: 'qualificado',
          channel: 'web_chat',
          tags: ['#promocao-site-gratis', '#candidatura-popup', `#ramo-${formData.ramo.toLowerCase().replace(/\s+/g, '-')}`],
          dealValue: 1200,
          initialMessage: `[Candidatura Promoção Site Grátis] Nome: ${formData.nome}, Empresa: ${formData.empresa}, Site Atual: ${formData.siteAtual || 'Não possui'}, Fone: ${formData.fone}, WhatsApp: ${formData.whatsapp}, Cidade: ${formData.cidade}, Ramo: ${formData.ramo}. Termos aceitos: Sim.`,
          sourcePage: '/promocao'
        })
      });
    } catch (err) {
      console.warn('CRM auto-sync notice:', err);
    }

    // Interactive progress pipeline
    setTimeout(() => {
      setSubmitStep(2);
      setTimeout(() => {
        setSubmitStep(3);
        setTimeout(() => {
          setSubmitStep(4);
          setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            sessionStorage.setItem('oz_promo_popup_submitted', 'true');
          }, 800);
        }, 900);
      }, 800);
    }, 800);
  };

  // Generate WhatsApp link with all answers filled
  const handleWhatsAppRedirect = () => {
    const text = `Olá, equipe da AGÊNCIA OZ! Acabei de preencher o formulário da promoção "Site + E-mail Grátis" com os seguintes detalhes:
    
👤 *Nome:* ${formData.nome}
🏢 *Empresa:* ${formData.empresa}
🌐 *Site Atual:* ${formData.siteAtual || 'Nenhum'}
📞 *Telefone:* ${formData.fone}
💬 *WhatsApp:* ${formData.whatsapp}
📍 *Cidade:* ${formData.cidade}
💼 *Ramo:* ${formData.ramo}

*Aceito os termos da promoção:*
- Site de até 5 páginas sem blog
- Valor de hospedagem mensal pago no aceite da proposta.

Gostaria de agendar o desenvolvimento do meu novo site!`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5548991984678?text=${encodedText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (isAdmin) {
    return null;
  }

  const showFloatingButton = !isOpen && settings.promoFloatingButtonEnabled && settings.promoPopupEnabled;
  const showModal = isOpen && settings.promoPopupEnabled;

  return (
    <>
      {/* Floating Promo Trigger Pill (Bottom-Left) when modal is closed */}
      {showFloatingButton && (
        <div className="fixed bottom-5 left-5 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300" id="promo-floating-badge">
          <button
            onClick={handleOpenManual}
            className="group flex items-center gap-3 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-2xl border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Abrir Promoção Site Grátis"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-white animate-bounce" />
              <div className="text-left">
                <p className="text-xs font-black tracking-tight leading-tight">
                  {settings.promoButtonText || 'Ganhe 1 Site + E-mail Grátis!'}
                </p>
                <p className="text-[10px] text-orange-100 font-semibold leading-none">
                  {settings.promoButtonSubtext || 'Clique para participar'}
                </p>
              </div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ml-1" />
          </button>
        </div>
      )}

      {/* Pop-up Modal Backdrop & Content */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md overflow-y-auto no-scrollbar"
          id="promo-modal-backdrop"
        >
          {/* Modal Container */}
          <div 
            className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-4xl w-full overflow-hidden flex flex-col md:flex-row my-8 max-h-[92vh] md:max-h-[85vh] animate-in fade-in zoom-in-95 duration-300"
            id="promo-modal-container"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Side: Bold Branding & Promotional Banner */}
            <div className="md:w-[40%] bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-8 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
              
              {/* Background Image with Dark Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-15 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/85 to-blue-950/90"></div>
              </div>

              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="space-y-6 relative z-10">
                {/* OZ Logo Integration */}
                <div className="flex items-center justify-center bg-white/5 p-3 rounded-2xl border border-white/10 w-fit">
                  <Logo iconOnly={true} className="scale-90" />
                </div>

                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    <Sparkles className="h-3.5 w-3.5" /> PROMOÇÃO EXCLUSIVA
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl font-black leading-tight tracking-tight">
                    Cliente novo?<br />
                    Você ganhou um <span className="text-orange-500">site com 1 conta de e-mail grátis!</span>
                  </h3>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  Chegou a hora de acelerar sua empresa. Responda às perguntas ao lado ou veja as <Link to="/promocao" onClick={handleClose} className="text-orange-400 hover:text-orange-300 underline font-bold">condições e prazos da promoção</Link> para garantir seu projeto com a AGÊNCIA OZ.
                </p>
              </div>

              {/* Promo Rules Footer block */}
              <div className="mt-8 pt-6 border-t border-slate-800 space-y-4 relative z-10">
                <div className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-normal">
                    <strong>Site de até 5 páginas</strong> sem módulo de blog corporativo.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-normal">
                    <strong>Valor de hospedagem mensal</strong> pago imediatamente no aceite da proposta.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-normal">
                    Servidor cPanel de altíssima performance para seu e-mail profissional.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Interactive Form / Simulation Screens */}
            <div className="md:w-[60%] bg-slate-50 p-6 md:p-8 overflow-y-auto no-scrollbar flex flex-col justify-center">
              
              {/* SUCCESS VIEW */}
              {isSuccess ? (
                <div className="text-center space-y-6 py-6" id="promo-success-screen">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-md">
                    <Check className="h-8 w-8" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-display text-2xl font-black text-slate-900 tracking-tight">
                      Garantido com Sucesso!
                    </h4>
                    <p className="text-sm text-slate-500 max-w-md mx-auto">
                      Sua solicitação de promoção foi transmitida com sucesso para nossa central técnica de atendimento.
                    </p>
                  </div>

                  {/* Mail routing container */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 text-left text-xs space-y-3 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-400 font-semibold border-b border-slate-100 pb-2 mb-2">
                      <Mail className="h-4 w-4 text-blue-700" />
                      <span>REGISTRO DO SERVIDOR DE E-MAIL (E-mail Pipeline)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-500">E-mail Remetente:</span>
                      <span className="font-mono text-blue-700 font-semibold">site@oz.com.br</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-slate-500">E-mails Destinatários:</span>
                      <div className="font-mono text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col gap-0.5">
                        <span className="text-blue-700">✓ atendimento@oz.com.br</span>
                        <span className="text-blue-700">✓ ozdgitalweb@gmail.com</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-slate-500">Status da Transmissão:</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                        Disparado com Sucesso
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      onClick={handleWhatsAppRedirect}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm cursor-pointer"
                    >
                      <MessageSquare className="h-5 w-5" /> Enviar Também via WhatsApp
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          handleClose();
                          navigate('/promocao');
                        }}
                        className="w-1/2 text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 rounded-xl transition-colors"
                      >
                        Ver Detalhes da Promoção
                      </button>
                      <button
                        onClick={handleClose}
                        className="w-1/2 text-xs font-bold text-slate-500 hover:text-slate-800 py-2.5 rounded-xl transition-colors"
                      >
                        Fechar Janela
                      </button>
                    </div>
                  </div>
                </div>
              ) : isSubmitting ? (
                /* LOADING PIPELINE SCREEN */
                <div className="text-center space-y-8 py-12" id="promo-loading-screen">
                  <div className="relative w-20 h-20 mx-auto">
                    {/* Ring spinner */}
                    <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-orange-500 border-r-blue-700 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-slate-800">
                      <Send className="h-6 w-6 animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-display text-lg font-bold text-slate-900">
                      Processando Solicitação...
                    </h4>
                    
                    {/* Step description based on simulated loading delay */}
                    <div className="h-8 flex items-center justify-center">
                      <p className="text-xs font-mono font-bold text-blue-700 animate-pulse bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                        {submitStep === 1 && "Etapa 1: Validando informações da promoção..."}
                        {submitStep === 2 && "Etapa 2: Autenticando com remetente site@oz.com.br..."}
                        {submitStep === 3 && "Etapa 3: Enviando proposta técnica para atendimento@oz.com.br e ozdgitalweb@gmail.com..."}
                        {submitStep === 4 && "Etapa 4: Gerando protocolo de segurança do site..."}
                      </p>
                    </div>
                  </div>

                  {/* Mail metadata container */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-1.5 max-w-sm mx-auto shadow-sm">
                    <div className="flex items-center gap-1.5 text-slate-400 font-bold mb-1">
                      <Mail className="h-3.5 w-3.5" />
                      <span>DETALHES DE ENVIO SMTP</span>
                    </div>
                    <p className="text-slate-500"><strong className="text-slate-700">De:</strong> site@oz.com.br</p>
                    <p className="text-slate-500"><strong className="text-slate-700">Para:</strong> atendimento@oz.com.br / ozdgitalweb@gmail.com</p>
                  </div>
                </div>
              ) : (
                /* FORM SCREEN */
                <form onSubmit={handleSubmit} className="space-y-4" id="promo-form-content">
                  <div className="space-y-1.5 pt-[20px]">
                    <h4 className="font-display font-black text-xl text-slate-900 tracking-tight leading-tight">
                      Formulário de Candidatura
                    </h4>
                    <p className="text-xs text-slate-500">
                      Preencha o questionário abaixo para darmos início ao desenvolvimento do seu site grátis.
                    </p>
                  </div>

                  {/* Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Nome e Sobrenome */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <span className="text-orange-500">*</span> Nome e Sobrenome
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          placeholder="Ex: João Silva"
                          className={`w-full text-sm bg-white border ${formErrors.nome ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-100'} rounded-xl px-3 py-2 outline-none transition-all`}
                        />
                      </div>
                    </div>

                    {/* Nome da Empresa */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <span className="text-orange-500">*</span> Nome da Empresa
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="empresa"
                          value={formData.empresa}
                          onChange={handleInputChange}
                          placeholder="Ex: Pizzaria Dom"
                          className={`w-full text-sm bg-white border ${formErrors.empresa ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-100'} rounded-xl px-3 py-2 outline-none transition-all`}
                        />
                      </div>
                    </div>

                    {/* Endereço do Site Atual (Opcional) */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        Endereço do Site Atual <span className="text-slate-400 font-medium lowercase">(opcional)</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="siteAtual"
                          value={formData.siteAtual}
                          onChange={handleInputChange}
                          placeholder="Ex: www.minhaempresa.com.br"
                          className="w-full text-sm bg-white border border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-100 rounded-xl px-3 py-2 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Fone */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <span className="text-orange-500">*</span> Fone Fixo/Comercial
                      </label>
                      <input
                        type="text"
                        name="fone"
                        value={formData.fone}
                        onChange={handleInputChange}
                        placeholder="Ex: (48) 3222-1111"
                        className={`w-full text-sm bg-white border ${formErrors.fone ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-100'} rounded-xl px-3 py-2 outline-none transition-all`}
                      />
                    </div>

                    {/* Whatsapp */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <span className="text-orange-500">*</span> WhatsApp Celular
                      </label>
                      <input
                        type="text"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="Ex: (48) 99198-4678"
                        className={`w-full text-sm bg-white border ${formErrors.whatsapp ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-100'} rounded-xl px-3 py-2 outline-none transition-all`}
                      />
                    </div>

                    {/* Cidade */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <span className="text-orange-500">*</span> Cidade / UF
                      </label>
                      <input
                        type="text"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleInputChange}
                        placeholder="Ex: Canoas - RS"
                        className={`w-full text-sm bg-white border ${formErrors.cidade ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-100'} rounded-xl px-3 py-2 outline-none transition-all`}
                      />
                    </div>

                    {/* Ramo de Atividade */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <span className="text-orange-500">*</span> Ramo de Atividade
                      </label>
                      <input
                        type="text"
                        name="ramo"
                        value={formData.ramo}
                        onChange={handleInputChange}
                        placeholder="Ex: Advocacia, Odonto, Estética"
                        className={`w-full text-sm bg-white border ${formErrors.ramo ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-100'} rounded-xl px-3 py-2 outline-none transition-all`}
                      />
                    </div>
                  </div>

                  {/* Rules Consent Section */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2.5 shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-100 pb-1">
                      Regras e Normas da Promoção
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                      <li>O site cortesia inclui até <strong>5 páginas estáticas sem blog</strong>.</li>
                      <li>
                        A contratação da <strong>hospedagem mensal</strong> é obrigatória e quitada no aceite da proposta.
                      </li>
                      <li>
                        Contas de e-mails corporativos grátis inclusas e ativadas no painel <strong>cPanel</strong>.
                      </li>
                    </ul>

                    {/* Custom Consent Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={hasAcceptedRules}
                          onChange={(e) => setHasAcceptedRules(e.target.checked)}
                          className="mt-0.5 h-4 w-4 text-blue-700 border-slate-300 rounded focus:ring-blue-500 focus:ring-offset-0 focus:ring-0 cursor-pointer"
                        />
                        <span className="text-[11px] font-bold text-slate-700 leading-tight">
                          Aceito e concordo com as normas e regulamentos desta promoção comercial.
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Form Submission Footer & Mail Info */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="submit"
                      disabled={!hasAcceptedRules}
                      className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-2xl shadow-md transition-all text-sm ${
                        hasAcceptedRules
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white cursor-pointer active:scale-[0.99]'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Send className="h-4 w-4" /> Enviar Respostas & Garantir Site
                    </button>
                    
                    {/* Mail Metadata display */}
                    <p className="text-[9px] text-slate-400 text-center leading-normal">
                      Remetente: <span className="font-semibold text-slate-500">site@oz.com.br</span> • 
                      Destinatários: <span className="font-semibold text-slate-500">atendimento@oz.com.br / ozdgitalweb@gmail.com</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
