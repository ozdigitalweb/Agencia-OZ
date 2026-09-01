import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, CheckCircle, Lock, Eye } from 'lucide-react';

export default function PoliticaPrivacidade() {
  return (
    <div id="politica-privacidade-page" className="bg-slate-50 min-h-screen py-16 lg:py-24 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Voltar button & Header */}
        <div className="space-y-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar para a Home
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Legal</span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                Política de Privacidade
              </h1>
            </div>
          </div>
          
          <p className="text-xs text-slate-400 font-mono">
            Última atualização: 20 de Julho de 2026
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
          
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-700" /> 1. Compromisso com a Privacidade
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              A <strong>AGÊNCIA OZ Soluções Web</strong>, com sede em Canoas/RS, valoriza a sua privacidade e se compromete com a segurança e a transparência no tratamento dos dados pessoais de todos os usuários, clientes e parceiros. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos as informações coletadas em nossa plataforma oficial e canais de atendimento corporativos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-700" /> 2. Coleta de Informações
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Coletamos informações das seguintes maneiras:
            </p>
            <ul className="space-y-2.5 text-sm text-slate-600 pl-5 list-disc">
              <li>
                <strong>Formulários de Contato:</strong> Coletamos nome, e-mail, telefone/WhatsApp e informações corporativas quando você preenche nossos formulários de solicitação de orçamento ou análise de SEO.
              </li>
              <li>
                <strong>Atendimento via WhatsApp:</strong> Mensagens enviadas para nosso canal de atendimento são processadas para viabilizar as propostas comerciais e suporte técnico.
              </li>
              <li>
                <strong>Dados de Navegação (Cookies):</strong> Usamos cookies e tecnologias semelhantes para analisar tráfego, otimizar a velocidade de carregamento de páginas e direcionar campanhas de tráfego pago (Google Ads e Meta Ads).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-700" /> 3. Uso e Armazenamento dos Dados
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Os dados coletados são utilizados exclusivamente para:
            </p>
            <ul className="space-y-2.5 text-sm text-slate-600 pl-5 list-disc">
              <li>Envio de orçamentos personalizados e execução dos serviços técnicos contratados;</li>
              <li>Melhoria contínua da performance do nosso site e das landing pages desenvolvidas;</li>
              <li>Comunicações administrativas, faturamento de assinaturas de hospedagem e atualizações técnicas de segurança em servidores Cloud VPS.</li>
            </ul>
            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              Não compartilhamos nem vendemos informações pessoais a terceiros sem autorização prévia, respeitando integralmente a <strong>Lei Geral de Proteção de Dados (LGPD)</strong> vigente no Brasil.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-700" /> 4. Seus Direitos
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Como titular dos dados, você possui o direito de solicitar a qualquer momento a confirmação da existência de tratamento, o acesso aos seus dados pessoais, bem como a correção ou exclusão definitiva de nossa base de dados. Para solicitações de privacidade, envie um e-mail para <a href="mailto:atendimento@oz.com.br" className="text-blue-700 hover:underline font-semibold">atendimento@oz.com.br</a>.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="font-display text-base font-bold text-slate-900 tracking-tight">
              Sede e Contato Legal
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              AGÊNCIA OZ Soluções Web<br />
              Canoas - RS, Brasil<br />
              E-mail: atendimento@oz.com.br<br />
              Telefone: +55 (48) 99198-4678
            </p>
          </section>

        </div>

        {/* Closing support card */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-bold text-base text-white">Dúvidas sobre seus dados?</h4>
            <p className="text-xs text-slate-400">Nossa equipe técnica e jurídica está sempre à disposição para esclarecimentos.</p>
          </div>
          <a
            href="https://wa.me/5548991984678?text=Ola!+Gostaria+de+saber+mais+sobre+a+Politica+de+Privacidade."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
          >
            Falar pelo WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
