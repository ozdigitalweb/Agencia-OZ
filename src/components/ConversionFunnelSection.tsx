import React from 'react';
import {
  MessageCircle,
  Smartphone,
  Globe,
  CheckCircle2,
  Users,
  Sparkles,
  MousePointer,
  HeartHandshake,
  ArrowRight,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function ConversionFunnelSection() {
  return (
    <section id="funil-conversao" className="space-y-12 py-8 scroll-mt-24">
      
      {/* Section Header with Increased Font Sizes */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-sm font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full inline-flex items-center gap-2 shadow-2xs">
          <Sparkles className="h-4 w-4 text-emerald-600" /> Vendas Descomplicadas
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          A Lógica do Funil de Vendas na Prática
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Entenda como um simples post na rede social traz clientes qualificados conversando direto no seu WhatsApp.
        </p>
      </div>

      {/* REFRESHED NEW LIGHT & VIBRANT CARD CONTAINER */}
      <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        
        {/* Subtle Ambient Background Gradient Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-50/50 pointer-events-none -z-10" />

        <div className="relative z-10 space-y-10 sm:space-y-12">
          
          {/* Main Box Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200/80 pb-6 gap-4">
            <div className="space-y-1">
              <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-orange-600 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                Passo a Passo Simples
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-black text-slate-900">
                Como Seu Cliente Chega Até Você
              </h3>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-slate-700 font-bold shadow-2xs">
              <HeartHandshake className="h-4 w-4 text-emerald-600" />
              <span>Caminho Direto para Fechar Negócio</span>
            </div>
          </div>

          {/* 3 Step Visual Cards (High Contrast Vibrant Design) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">

            {/* STEP 1: ORANGE CARD */}
            <div className="bg-orange-50/50 border-2 border-orange-200/90 hover:border-orange-400 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group shadow-sm hover:shadow-md">
              <div className="space-y-5">
                
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                    <Smartphone className="h-7 w-7" />
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-extrabold uppercase px-3.5 py-1.5 rounded-full bg-orange-500 text-white shadow-2xs">
                    Etapa 1
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 group-hover:text-orange-600 transition-colors">
                    1. Chamando a Atenção
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                    Um anúncio ou post atraente no Instagram ou Facebook que faz as pessoas pararem de rolar a tela.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-orange-200/80 text-sm space-y-2.5 shadow-2xs">
                  <p className="text-slate-900 font-extrabold text-xs sm:text-sm flex items-center gap-2">
                    <Zap className="h-4 w-4 text-orange-500" /> O que não pode faltar:
                  </p>
                  <ul className="text-slate-700 space-y-2 text-xs sm:text-sm font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                      <span>Mensagem clara e direta</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                      <span>Solução para uma dúvida do cliente</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                      <span>Convite simples para clicar e saber mais</span>
                    </li>
                  </ul>
                </div>

                <div className="text-xs sm:text-sm bg-orange-100/80 text-orange-950 p-3.5 rounded-xl border border-orange-200/80 leading-relaxed font-medium">
                  💡 <strong>Dica:</strong> O post não precisa explicar tudo — o objetivo dele é fazer a pessoa clicar.
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-orange-200/80 flex items-center justify-between text-xs sm:text-sm text-slate-600 font-semibold">
                <span>Objetivo: Atrair o Clique</span>
                <span className="text-orange-600 font-extrabold">Primeiro Contato</span>
              </div>
            </div>

            {/* STEP 2: BLUE CARD */}
            <div className="bg-blue-50/50 border-2 border-blue-200/90 hover:border-blue-400 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group shadow-sm hover:shadow-md">
              <div className="space-y-5">
                
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
                    <Globe className="h-7 w-7" />
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-extrabold uppercase px-3.5 py-1.5 rounded-full bg-blue-600 text-white shadow-2xs">
                    Etapa 2
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 group-hover:text-blue-600 transition-colors">
                    2. Apresentando a Oferta
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                    O cliente chega na sua página web, onde encontra tudo explicado de forma bonita, rápida e confiável.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-blue-200/80 text-sm space-y-2.5 shadow-2xs">
                  <p className="text-slate-900 font-extrabold text-xs sm:text-sm flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" /> Como a página convence:
                  </p>
                  <ul className="text-slate-700 space-y-2 text-xs sm:text-sm font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      <span>Título principal com a solução da dor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      <span>Depoimentos de clientes satisfeitos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      <span>Benefícios claros e garantia de qualidade</span>
                    </li>
                  </ul>
                </div>

                <div className="text-xs sm:text-sm bg-blue-100/80 text-blue-950 p-3.5 rounded-xl border border-blue-200/80 leading-relaxed font-medium">
                  💡 <strong>Dica:</strong> A página confirma o que o anúncio prometeu para criar confiança instantânea.
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-blue-200/80 flex items-center justify-between text-xs sm:text-sm text-slate-600 font-semibold">
                <span>Objetivo: Gerar Confiança</span>
                <span className="text-blue-600 font-extrabold">Apresentação</span>
              </div>
            </div>

            {/* STEP 3: EMERALD CARD */}
            <div className="bg-emerald-50/50 border-2 border-emerald-200/90 hover:border-emerald-400 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group shadow-sm hover:shadow-md">
              <div className="space-y-5">
                
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                    <MessageCircle className="h-7 w-7" />
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-extrabold uppercase px-3.5 py-1.5 rounded-full bg-emerald-600 text-white shadow-2xs">
                    Etapa 3
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 group-hover:text-emerald-600 transition-colors">
                    3. Fechando Negócio
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                    O visitante clica no botão em destaque e inicia uma conversa diretamente no seu WhatsApp.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-emerald-200/80 text-sm space-y-2.5 shadow-2xs">
                  <p className="text-slate-900 font-extrabold text-xs sm:text-sm flex items-center gap-2">
                    <MousePointer className="h-4 w-4 text-emerald-600" /> Segredo do botão:
                  </p>
                  <ul className="text-slate-700 space-y-2 text-xs sm:text-sm font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      <span>Texto convidativo (&quot;Quero Garantir Meu Desconto&quot;)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      <span>Visível no começo, meio e final da página</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      <span>Sem distrações ou opções confusas</span>
                    </li>
                  </ul>
                </div>

                <div className="text-xs sm:text-sm bg-emerald-100/80 text-emerald-950 p-3.5 rounded-xl border border-emerald-200/80 leading-relaxed font-medium">
                  💡 <strong>Dica:</strong> Quando o botão é claro e direto, a chance de receber mensagens aumenta muito.
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-emerald-200/80 flex items-center justify-between text-xs sm:text-sm text-slate-600 font-semibold">
                <span>Objetivo: Receber Mensagens</span>
                <span className="text-emerald-600 font-extrabold">Conversão Real</span>
              </div>
            </div>

          </div>

          {/* SIMULATION BAR CHART WITH INCREMENTED FONTS */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
              <div className="space-y-1">
                <h4 className="text-base sm:text-xl font-bold text-white flex items-center gap-2.5">
                  <Users className="h-5 w-5 text-emerald-400" />
                  Simulação de Resultados do Funil
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  Exemplo visual de como as pessoas navegam até chamar você diretamente no WhatsApp
                </p>
              </div>
              <span className="text-xs sm:text-sm font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3.5 py-1.5 rounded-xl w-fit">
                Fluxo Contínuo de Clientes
              </span>
            </div>

            <div className="space-y-5 pt-1">
              {/* Step A */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-slate-200 font-bold gap-1">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500 shrink-0" />
                    Pessoas que viram o anúncio nas redes sociais
                  </span>
                  <span className="font-mono text-orange-400 font-extrabold">10.000 visualizações</span>
                </div>
                <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full w-full transition-all duration-500" />
                </div>
              </div>

              {/* Step B */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-slate-200 font-bold gap-1">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
                    Pessoas que se interessaram e clicaram para entrar no site
                  </span>
                  <span className="font-mono text-blue-400 font-extrabold">1.500 visitantes</span>
                </div>
                <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full w-[40%] transition-all duration-500" />
                </div>
              </div>

              {/* Step C */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-slate-200 font-bold gap-1">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                    Clientes prontos que chamaram diretamente no WhatsApp
                  </span>
                  <span className="font-mono text-emerald-400 font-extrabold">330 contatos no seu WhatsApp</span>
                </div>
                <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-[22%] transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
