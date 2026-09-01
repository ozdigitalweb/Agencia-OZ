import React from 'react';
import { MapPin, Mail, Phone, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function Contato() {
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+um+atendimento+com+a+OZ+Digital.";

  return (
    <div id="contato-page" className="space-y-16 pb-16 animate-fade-in">
      
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-700">
            Fale Conosco
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Vamos Iniciar um Projeto de Sucesso?
          </h1>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
            Fale com nossa equipe de especialistas baseada em Canoas. Tire suas dúvidas sobre servidores Cloud, solicite orçamentos WordPress ou receba auditoria de SEO básica gratuita.
          </p>
        </div>
      </section>

      {/* 2. Form + Coordinates Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-bold uppercase tracking-widest text-orange-500">Informações de Contato</span>
              <h2 className="font-display text-2xl font-extrabold text-slate-900 leading-snug tracking-tight">
                Canais de Atendimento Direto
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Escolha o canal que preferir ou preencha o formulário para que nossa equipe retorne seu contato em até 2 horas úteis.
              </p>
            </div>

            {/* Coordinates Grid */}
            <div className="space-y-6">
              
              {/* Phone */}
              <div className="flex gap-4 items-start bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="p-3 bg-slate-50 rounded-xl text-blue-700 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Telefone e Comercial</h4>
                  <p className="text-sm font-bold text-slate-800">+55 (48) 99198-4678</p>
                  <p className="text-xs text-slate-400">Atendimento por voz e chat humanizado.</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="p-3 bg-slate-50 rounded-xl text-emerald-500 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">E-mail de Contato</h4>
                  <p className="text-sm font-bold text-slate-800">atendimento@oz.com.br</p>
                  <p className="text-xs text-slate-400">Envie solicitações de propostas corporativas.</p>
                </div>
              </div>

              {/* Sede */}
              <div className="flex gap-4 items-start bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="p-3 bg-slate-50 rounded-xl text-orange-500 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Escritório Administrativo</h4>
                  <p className="text-sm font-bold text-slate-800 leading-tight">Canoas - RS</p>
                  <p className="text-sm text-slate-500">Brasil</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex gap-4 items-start bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="p-3 bg-slate-50 rounded-xl text-slate-500 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Horário de Funcionamento</h4>
                  <p className="text-sm font-bold text-slate-800">Segunda a Sexta, das 09h às 18h</p>
                  <p className="text-xs text-slate-400">Plantão técnico aos fins de semana para planos Enterprise.</p>
                </div>
              </div>

            </div>

            {/* Support guarantee banner */}
            <div className="p-6 rounded-2xl bg-slate-950 text-white flex gap-4 items-start relative overflow-hidden">
              <ShieldCheck className="h-8 w-8 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Privacidade e Segurança</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Seus dados estão protegidos sob rígidos protocolos em conformidade com a LGPD e são tratados exclusivamente para orçamentos comerciais.
                </p>
              </div>
            </div>

          </div>

          {/* Right Side: Form & Urgent Support Box */}
          <div className="lg:col-span-7 space-y-8">
            <ContactForm />

            {/* High Contrast Support Call */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 lg:p-8 space-y-4 text-center">
              <h3 className="font-display text-xl font-bold text-slate-900 tracking-tight">Precisa de atendimento de urgência?</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Se o seu site atual está fora do ar ou com problemas sérios de carregamento, fale com nosso time técnico imediatamente pelo canal comercial do WhatsApp.
              </p>
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors shadow-lg shadow-orange-500/10 w-full sm:w-auto"
                >
                  <MessageSquare className="h-4 w-4" />
                  Atendimento Imediato via WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
