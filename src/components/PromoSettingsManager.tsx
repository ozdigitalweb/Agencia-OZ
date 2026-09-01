import React, { useState, useEffect } from 'react';
import { 
  Gift, 
  ToggleLeft, 
  ToggleRight, 
  Sparkles, 
  Clock, 
  Eye, 
  Save, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  ShieldCheck,
  MousePointerClick,
  Sliders,
  Flame,
  Zap,
  Info,
  Check
} from 'lucide-react';
import { siteSettingsApi } from '../services/siteSettingsApi';
import { SitePromoSettings, DEFAULT_PROMO_SETTINGS } from '../types/siteSettings';

interface PromoSettingsManagerProps {
  onShowToast: (type: 'success' | 'error', message: string) => void;
}

export default function PromoSettingsManager({ onShowToast }: PromoSettingsManagerProps) {
  const [settings, setSettings] = useState<SitePromoSettings>(DEFAULT_PROMO_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await siteSettingsApi.getSettings();
      setSettings(data);
      setHasChanges(false);
    } catch (err) {
      onShowToast('error', 'Não foi possível carregar as configurações do servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (key: keyof SitePromoSettings, value: boolean) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    
    // Auto-save immediately for slick admin experience
    try {
      await siteSettingsApi.updateSettings({ [key]: value });
      const label = 
        key === 'promoPopupEnabled' 
          ? (value ? 'Pop-up da Promoção ATIVADO com sucesso!' : 'Pop-up da Promoção DESATIVADO no site.')
          : key === 'promoFloatingButtonEnabled'
          ? (value ? 'Botão Flutuante "Ganhe 1 Site" ATIVADO com sucesso!' : 'Botão Flutuante DESATIVADO no site.')
          : (value ? 'Abertura Automática do Pop-up ATIVADA.' : 'Abertura Automática do Pop-up DESATIVADA.');
      
      onShowToast('success', label);
    } catch (err) {
      onShowToast('error', 'Erro ao salvar configuração no servidor.');
    }
  };

  const handleDelayChange = async (delaySeconds: number) => {
    const updated = { ...settings, promoAutoOpenDelay: delaySeconds };
    setSettings(updated);
    try {
      await siteSettingsApi.updateSettings({ promoAutoOpenDelay: delaySeconds });
      onShowToast('success', `Tempo de abertura automática ajustado para ${delaySeconds}s.`);
    } catch (err) {
      onShowToast('error', 'Erro ao atualizar tempo de abertura.');
    }
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Deseja redefinir as configurações de promoção para os padrões da AGÊNCIA OZ?')) {
      setIsSaving(true);
      try {
        const restored = await siteSettingsApi.updateSettings(DEFAULT_PROMO_SETTINGS);
        setSettings(restored);
        onShowToast('success', 'Configurações redefinidas para os valores padrão.');
      } catch (err) {
        onShowToast('error', 'Erro ao redefinir configurações.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleTestPopupNow = () => {
    window.dispatchEvent(new CustomEvent('open-oz-promo'));
    onShowToast('success', 'Disparo de teste do Pop-up efetuado!');
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-sm">
        <RefreshCw className="w-8 h-8 text-orange-500 animate-spin mx-auto" />
        <p className="text-sm font-bold text-slate-600">Carregando controles da promoção...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in" id="promo-settings-manager">
      
      {/* Top Banner & Overview */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Controle de Conversão & Campanhas
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              Gerenciador da Promoção "Site + E-mail Grátis"
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Ative ou desative com 1 clique a exibição do pop-up modal de candidatura e do botão flutuante em todo o site. As alterações entram em vigor imediatamente para todos os visitantes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleTestPopupNow}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-4 py-3 rounded-2xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              title="Abre o pop-up imediatamente para testar"
            >
              <Eye className="w-4 h-4" /> Testar Pop-up Agora
            </button>
            <a
              href="/promocao"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs px-4 py-3 rounded-2xl transition-all flex items-center gap-2"
            >
              <span>Ver Página /promocao</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Switches Grid (Liga / Desliga) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: LIGA/DESLIGA POP-UP GERAL */}
        <div className={`rounded-3xl p-6 border transition-all duration-300 shadow-sm flex flex-col justify-between ${
          settings.promoPopupEnabled 
            ? 'bg-white border-orange-200 ring-4 ring-orange-500/5' 
            : 'bg-slate-50 border-slate-200 opacity-90'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                settings.promoPopupEnabled ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'bg-slate-200 text-slate-500'
              }`}>
                <Gift className="w-6 h-6" />
              </div>

              {/* Status Badge */}
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 ${
                settings.promoPopupEnabled 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-slate-200 text-slate-600 border border-slate-300'
              }`}>
                <span className={`w-2 h-2 rounded-full ${settings.promoPopupEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                {settings.promoPopupEnabled ? 'LIGADO / ATIVO' : 'DESLIGADO'}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-display font-black text-lg text-slate-900">
                Pop-up da Promoção (Modal)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Controla o funcionamento do formulário modal de inscrição em todo o site. Se desligado, o pop-up não será renderizado nem aberto.
              </p>
            </div>
          </div>

          {/* Interactive Switch Button */}
          <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Status no Site:
            </span>
            <button
              onClick={() => handleToggle('promoPopupEnabled', !settings.promoPopupEnabled)}
              className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                settings.promoPopupEnabled ? 'bg-orange-500' : 'bg-slate-300'
              }`}
              role="switch"
              aria-checked={settings.promoPopupEnabled}
            >
              <span
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  settings.promoPopupEnabled ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* CARD 2: LIGA/DESLIGA BOTÃO FLUTUANTE */}
        <div className={`rounded-3xl p-6 border transition-all duration-300 shadow-sm flex flex-col justify-between ${
          settings.promoFloatingButtonEnabled 
            ? 'bg-white border-amber-200 ring-4 ring-amber-500/5' 
            : 'bg-slate-50 border-slate-200 opacity-90'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                settings.promoFloatingButtonEnabled ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' : 'bg-slate-200 text-slate-500'
              }`}>
                <MousePointerClick className="w-6 h-6" />
              </div>

              {/* Status Badge */}
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 ${
                settings.promoFloatingButtonEnabled 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-slate-200 text-slate-600 border border-slate-300'
              }`}>
                <span className={`w-2 h-2 rounded-full ${settings.promoFloatingButtonEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                {settings.promoFloatingButtonEnabled ? 'LIGADO / ATIVO' : 'DESLIGADO'}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-display font-black text-lg text-slate-900">
                Botão Flutuante "Ganhe 1 Site"
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Exibe o badge flutuante animado no canto inferior esquerdo da tela com chamada direta para a promoção comercial.
              </p>
            </div>
          </div>

          {/* Interactive Switch Button */}
          <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Status no Site:
            </span>
            <button
              onClick={() => handleToggle('promoFloatingButtonEnabled', !settings.promoFloatingButtonEnabled)}
              className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                settings.promoFloatingButtonEnabled ? 'bg-amber-500' : 'bg-slate-300'
              }`}
              role="switch"
              aria-checked={settings.promoFloatingButtonEnabled}
            >
              <span
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  settings.promoFloatingButtonEnabled ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* CARD 3: LIGA/DESLIGA ABERTURA AUTOMÁTICA */}
        <div className={`rounded-3xl p-6 border transition-all duration-300 shadow-sm flex flex-col justify-between ${
          settings.promoAutoOpenEnabled 
            ? 'bg-white border-blue-200 ring-4 ring-blue-500/5' 
            : 'bg-slate-50 border-slate-200 opacity-90'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                settings.promoAutoOpenEnabled ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-slate-200 text-slate-500'
              }`}>
                <Clock className="w-6 h-6" />
              </div>

              {/* Status Badge */}
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 ${
                settings.promoAutoOpenEnabled 
                  ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                  : 'bg-slate-200 text-slate-600 border border-slate-300'
              }`}>
                <span className={`w-2 h-2 rounded-full ${settings.promoAutoOpenEnabled ? 'bg-blue-500' : 'bg-slate-400'}`}></span>
                {settings.promoAutoOpenEnabled ? 'AUTO ATIVO' : 'MANUAL'}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-display font-black text-lg text-slate-900">
                Abertura Automática na Visita
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Abre o modal automaticamente após o visitante navegar no site. Se desligado, o pop-up só abre ao clicar no botão.
              </p>
            </div>

            {/* Delay Selector */}
            {settings.promoAutoOpenEnabled && (
              <div className="pt-2">
                <label className="text-[11px] font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">
                  Tempo de Espera para Abertura:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1.0, 1.5, 3.0, 5.0].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => handleDelayChange(sec)}
                      className={`text-xs font-bold py-1.5 rounded-xl border transition-all ${
                        settings.promoAutoOpenDelay === sec
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Switch Button */}
          <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Abertura Automática:
            </span>
            <button
              onClick={() => handleToggle('promoAutoOpenEnabled', !settings.promoAutoOpenEnabled)}
              className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                settings.promoAutoOpenEnabled ? 'bg-blue-600' : 'bg-slate-300'
              }`}
              role="switch"
              aria-checked={settings.promoAutoOpenEnabled}
            >
              <span
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  settings.promoAutoOpenEnabled ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Live Preview Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h3 className="font-display font-black text-lg text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-500" /> Prévia Visual dos Elementos no Site
            </h3>
            <p className="text-xs text-slate-500">
              Confira como os visitantes visualizam os botões e gatilhos da promoção no ar:
            </p>
          </div>

          <button
            onClick={handleResetDefaults}
            disabled={isSaving}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Restaurar Padrões da Agência
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Element 1: Floating Badge Preview */}
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
              <span>Selo Flutuante (Canto Inferior Esquerdo)</span>
              <span className={settings.promoFloatingButtonEnabled ? 'text-emerald-400 font-black' : 'text-slate-500'}>
                {settings.promoFloatingButtonEnabled ? '● Visível no site' : '○ Oculto no site'}
              </span>
            </div>

            <div className="py-4 flex items-center justify-center bg-slate-950/60 rounded-xl border border-slate-800/60 min-h-[90px]">
              {settings.promoFloatingButtonEnabled ? (
                <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-2xl border border-white/20">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-white" />
                    <div className="text-left">
                      <p className="text-xs font-black tracking-tight leading-tight">
                        {settings.promoButtonText || 'Ganhe 1 Site + E-mail Grátis!'}
                      </p>
                      <p className="text-[10px] text-orange-100 font-semibold leading-none">
                        {settings.promoButtonSubtext || 'Clique para participar'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic text-center">
                  O botão flutuante está desativado no momento.
                </div>
              )}
            </div>
          </div>

          {/* Element 2: Modal Trigger & Info */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Modal de Candidatura</span>
              <span className={settings.promoPopupEnabled ? 'text-emerald-600 font-black' : 'text-slate-500'}>
                {settings.promoPopupEnabled ? '● Ativo no site' : '○ Desativado'}
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Integração com CRM & Envio de E-mails</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                As candidaturas preenchidas alimentam a Central de Conversas (CRM) em tempo real e notificam a equipe comercial através dos canais oficiais da AGÊNCIA OZ.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
