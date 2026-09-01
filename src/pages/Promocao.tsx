import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Gift, CheckCircle, HelpCircle, XCircle, Clock, AlertTriangle, ChevronRight, MessageSquare, ShieldCheck, Globe, Mail, HardDrive, Zap } from 'lucide-react';

export default function Promocao() {
  const [searchParams] = useSearchParams();
  const isSuccess = searchParams.get('success') === 'true';
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+garantir+a+promo%C3%A7%C3%A3o+de+Site+%2B+1+E-mail+Gr%C3%A1tis+da+Ag%C3%AAncia+OZ.";

  const handleOpenPromoPopup = () => {
    window.dispatchEvent(new CustomEvent('open-oz-promo'));
  };

  return (
    <div id="promocao-page" className="space-y-16 pb-20 animate-fade-in">
      
      {/* Success Notification Alert */}
      {isSuccess && (
        <div className="max-w-4xl mx-auto px-4 pt-10" id="promocao-success-alert">
          <div className="bg-emerald-50 border-2 border-emerald-500 rounded-3xl p-6 md:p-8 text-center space-y-4 relative overflow-hidden shadow-xl animate-in fade-in duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
              <CheckCircle className="h-6 w-6 animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Candidatura Enviada com Sucesso!
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Parabéns! Suas informações foram transmitidas com sucesso via SMTP para nossa equipe (<strong>atendimento@oz.com.br</strong> e <strong>ozdgitalweb@gmail.com</strong>). Agora, clique no botão abaixo para iniciar o seu atendimento rápido!
              </p>
            </div>
            <div className="pt-2 flex justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="h-4 w-4" />
                Falar Conosco no WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 1. Hero Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-orange-950 text-white py-16 lg:py-24 relative overflow-hidden border-b border-orange-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_50%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase tracking-widest animate-pulse">
            <Gift className="h-4 w-4" /> Oportunidade Exclusiva
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
            Sua empresa merece mais do que um <span className="text-orange-500">perfil nas redes sociais</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            Quem constrói o negócio apenas no Instagram ou WhatsApp está construindo em terreno alugado. Garanta o seu endereço fixo e próprio na internet com a AGÊNCIA OZ.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleOpenPromoPopup}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold px-8 py-4 rounded-xl text-base shadow-xl shadow-orange-900/20 transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Gift className="h-5 w-5 animate-bounce" />
              Preencher Inscrição (Pop-up)
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-7 py-4 rounded-xl text-base transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-5 w-5 text-emerald-400" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 2. Terreno Alugado vs Terreno Próprio Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card Left - Alugado */}
          <div className="bg-slate-100 border border-slate-200 rounded-3xl p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-slate-300">
              <XCircle className="h-16 w-16 stroke-[1.2]" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Redes Sociais</span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-800">O Risco do Terreno Alugado</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              As redes sociais são ótimas para engajar e criar proximidade com o público, mas elas têm um limite claro: <strong>você não é dono delas</strong>. Um algoritmo pode mudar suas regras do dia para a noite, reduzindo brutalmente o seu alcance orgânico. 
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Além disso, uma conta de negócios pode ser suspensa ou hackeada sem qualquer aviso prévio, fazendo você perder o contato imediato com seus clientes e todo o histórico construído ao longo de anos de trabalho.
            </p>
          </div>

          {/* Card Right - Próprio */}
          <div className="bg-gradient-to-br from-blue-900 to-slate-900 border border-blue-800 text-white rounded-3xl p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-blue-800">
              <ShieldCheck className="h-16 w-16 stroke-[1.2]" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Site Profissional</span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">Seu Endereço Fixo na Internet</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Um site profissional é o seu quartel-general digital. Ele transmite credibilidade instantânea, exibe sua marca exatamente como você quer, aparece nas buscas locais do Google, funciona ininterruptamente 24 horas por dia e é <strong>100% de sua propriedade</strong>.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              É a ferramenta definitiva que transforma visitantes casuais em clientes qualificados e estabelece a verdadeira autoridade de mercado que a sua marca precisa para crescer de forma independente.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center max-w-3xl mx-auto">
          <p className="text-sm sm:text-base text-slate-600">
            Pensando exatamente nisso, a <strong>AGÊNCIA OZ</strong> criou uma oportunidade única para você estruturar sua presença digital sem precisar gastar rios de dinheiro no início da sua jornada técnica.
          </p>
        </div>
      </section>

      {/* 3. Beneficios / O que Ganha */}
      <section className="bg-slate-900 text-white py-16 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
        
        <div className="relative space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Parceria de Sucesso</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              Torne-se Parceiro e Ganhe Muito Mais!
            </h2>
            <p className="text-sm text-slate-400">
              Novos parceiros que contratam nossa infraestrutura de hospedagem recebem de presente o desenvolvimento completo do site institucional e as contas de e-mail.
            </p>
          </div>

          {/* Grid de Benefícios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Item 1 */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-sm text-white tracking-tight">Site Profissional</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Desenvolvimento completo de um site institucional moderno com até 5 páginas completas sob medida.
              </p>
            </div>

            {/* Item 2 */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-sm text-white tracking-tight">Ultra-Velocidade</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hospedagem em servidores Cloud VPS de alta performance e tempo de carregamento otimizado.
              </p>
            </div>

            {/* Item 3 */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-sm text-white tracking-tight">1 E-mail Incluso</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Conta de e-mail corporativo personalizada (contato@suaempresa.com) para maior profissionalismo.
              </p>
            </div>

            {/* Item 4 */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <HardDrive className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-sm text-white tracking-tight">1 GB de Espaço</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Armazenamento rápido em disco para guardar com tranquilidade todos os arquivos, e-mails e mídias.
              </p>
            </div>

            {/* Item 5 */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
                <CheckCircle className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-sm text-white tracking-tight">Tráfego Liberado</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seu site no ar com transferência ilimitada, pronto para receber milhares de visitas sem taxas extras.
              </p>
            </div>
          </div>

          {/* Estrutura de páginas */}
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 max-w-3xl mx-auto space-y-4">
            <h3 className="font-display text-lg font-bold text-center flex items-center justify-center gap-2 text-orange-400">
              Estrutura de Páginas Inclusa no Pacote
            </h3>
            <p className="text-xs text-slate-400 text-center max-w-xl mx-auto">
              Desenvolvemos as cinco seções estruturais essenciais recomendadas pelo Google para rankear o seu domínio e explicar o seu negócio:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-slate-200">
              {['Home', 'Quem Somos', 'Produtos', 'Serviços', 'Contato'].map((page, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span>{page}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Tabela de Investimento */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Finanças Claras</span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Como funciona o investimento
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Você paga apenas a assinatura técnica de hospedagem — o desenvolvimento profissional do site e o e-mail são presentes da nossa agência!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Tabela de Investimento Column */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between">
            <div className="overflow-x-auto my-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    <th className="p-3.5 sm:p-5">Item</th>
                    <th className="p-3.5 sm:p-5 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <tr>
                    <td className="p-3.5 sm:p-5 font-semibold text-slate-800">
                      Hospedagem recorrente (9 meses adicionais)
                      <span className="block text-[10px] sm:text-xs font-normal text-slate-400 mt-0.5">
                        Você terá uma hospedagem mensal recorrente de 9 meses pelo mesmo valor.
                      </span>
                    </td>
                    <td className="p-3.5 sm:p-5 text-right font-bold text-slate-900 text-xs sm:text-base whitespace-nowrap">R$ 30,00 / mês</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-3.5 sm:p-5 font-semibold text-slate-800">
                      Cobrança inicial
                      <span className="block text-[10px] sm:text-xs font-normal text-slate-400 mt-0.5">
                        Contratação do plano trimestral inicial.
                      </span>
                    </td>
                    <td className="p-3.5 sm:p-5 text-right font-bold text-orange-600 text-xs sm:text-base">
                      3 meses antecipados (R$ 90,00)
                    </td>
                  </tr>

                  <tr className="bg-slate-50/50">
                    <td className="p-3.5 sm:p-5 font-semibold text-slate-800">
                      Registro de domínio (anual) - opcional
                      <span className="block text-[10px] sm:text-xs font-normal text-slate-400 mt-0.5">
                        Sua identidade oficial (ex: suaempresa.com.br) direto no Registro.br.
                      </span>
                    </td>
                    <td className="p-3.5 sm:p-5 text-right font-bold text-slate-900 text-xs sm:text-base whitespace-nowrap">R$ 100,00 / ano</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-5 relative group min-h-[320px] flex">
            {/* Visual background glowing effects */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/15 to-orange-500/15 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative border border-slate-200 rounded-2xl overflow-hidden shadow-xl bg-slate-100 flex-grow flex">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
                alt="Finanças Claras Agência OZ"
                referrerPolicy="no-referrer"
                className="w-full h-full min-h-[320px] object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-sm border border-slate-800 p-4 rounded-xl text-white space-y-1">
                <span className="text-xxs font-bold text-orange-400 uppercase tracking-wider">Custo Benefício Imbatível</span>
                <p className="text-xs text-slate-300 leading-normal">
                  Nós absorvemos todo o custo de design, desenvolvimento e SEO inicial para que seu único foco seja ver sua empresa crescer.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Prazos e Condições */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Prazos */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-xl font-extrabold text-slate-900">⏱️ Prazos de Entrega</h3>
          </div>
          
          <ul className="space-y-4 text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
              <span>
                Após o envio do conteúdo (textos e materiais prontos) pelo cliente, o site é entregue em até <strong>5 dias úteis</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0 mt-1" />
              <span>
                Qualquer atraso no envio do conteúdo por parte do cliente será descontado do prazo de entrega estipulado.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 text-orange-500 shrink-0 mt-1" />
              <span>
                O desenvolvimento de conteúdo para o site não está incluso no pacote (deverá ser orçado à parte).
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <XCircle className="h-4 w-4 text-slate-400 shrink-0 mt-1" />
              <span>
                O registro de domínio e a migração de conteúdo antigo não estão inclusos neste pacote promocional gratuito.
              </span>
            </li>
          </ul>
        </div>

        {/* Condições importantes */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-xl font-extrabold text-slate-900">Condições Importantes</h3>
          </div>
          
          <ul className="grid grid-cols-1 gap-3 text-sm text-slate-600">
            {[
              "Fidelidade de 12 meses — não é possível migrar o site para outra hospedagem durante esse período.",
              "Qualquer manutenção de texto ou fotos, pós-entrega do site, deverá ser feita pela Agência.",
              "Conteúdo por conta do cliente — todos os textos de serviços e informações devem ser enviados prontos.",
              "Estrutura do site rigidamente limitada às páginas: Home, Quem Somos, Produtos, Serviços e Contato.",
              "Esta promoção não inclui landing page de conversão específica, e-commerce complexo ou blog.",
              "Registro de domínio e migração de sites pré-existentes não estão inclusos.",
              "Vagas altamente limitadas de acordo com a capacidade do nosso servidor neste lote."
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="h-4 w-4 text-orange-500 shrink-0 mt-1" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

      </section>

      {/* 6. Closing Call to Action banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl">
          <h3 className="font-display text-2xl sm:text-3xl font-black">
            Não deixe seu negócio depender apenas do algoritmo das redes sociais!
          </h3>
          <p className="text-sm sm:text-base text-orange-50 max-w-3xl mx-auto leading-relaxed">
            Tenha um endereço fixo e garanta presença digital de verdade para a sua empresa crescer no Google com toda a segurança que a AGÊNCIA OZ oferece.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleOpenPromoPopup}
              className="w-full sm:w-auto bg-white hover:bg-orange-50 text-slate-950 font-black px-8 py-4 rounded-xl text-base transition-all hover:-translate-y-0.5 shadow-xl inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Gift className="h-5 w-5 text-orange-500" />
              Abrir Formulário de Inscrição
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-extrabold px-8 py-4 rounded-xl text-base transition-all hover:-translate-y-0.5 shadow-lg inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-5 w-5 text-emerald-400" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
