import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  HeartPulse, 
  UserCheck, 
  ArrowLeft,
  Sparkles,
  ChevronRight,
  Star,
  Activity,
  HelpCircle,
  Users,
  FileText,
  ThumbsUp,
  Smartphone,
  Video
} from 'lucide-react';

export default function LpMedicos() {
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Vim+pelo+modelo+de+Landing+Page+para+M%C3%A9dicos+e+gostaria+de+um+or%C3%A7amento.";
  const clinicPhone = "(48) 99198-4678";

  return (
    <div id="lp-medicos-demo" className="bg-slate-50 text-slate-800 font-sans selection:bg-teal-500 selection:text-white min-h-screen">
      
      {/* Top Banner indicating this is a live commercial demo */}
      <div className="bg-slate-900 text-white text-xs py-2.5 px-4 text-center border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-teal-500/20 text-teal-300 font-extrabold px-2 py-0.5 rounded border border-teal-500/30">
            MODELO DEMO
          </span>
          <span className="font-medium text-slate-300">
            Landing Page de Alta Conversão para Médicos, Médicas e Clínicas de Saúde
          </span>
        </div>
        <div className="flex items-center gap-3 mx-auto sm:mx-0">
          <Link 
            to="/servicos/landingpages#modelos" 
            className="bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 px-3 py-1 rounded font-bold transition-all flex items-center gap-1.5 hover:border-teal-500/60 shadow-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar para Todos os Modelos
          </Link>
          <Link 
            to="/orcamento?servico=lp-medicos" 
            className="bg-teal-600 hover:bg-teal-500 text-white px-3 py-1 rounded font-bold transition-colors"
          >
            Quero uma LP Similar
          </Link>
        </div>
      </div>

      {/* CLINIC HERO SECTION WITH EMBEDDED BOOKING CARD */}
      <header className="relative bg-gradient-to-b from-teal-900 via-slate-900 to-slate-950 text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Ambient Lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-widest">
              <Stethoscope className="h-4 w-4 text-teal-400" />
              <span>Dra. Amanda Silva — CRM 12345 / RQE 6789</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Cuidado Médico Especializado & Agendamento Sem Burocracia
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Gastroenterologia, Clínica Médica e Prevenção. Escolha o melhor dia e horário para seu atendimento presencial ou consulta online.
            </p>

            {/* Doctor Bio Quick Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 max-w-xl">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?fm=webp&fit=crop&w=300&q=80"
                alt="Dra. Amanda Silva"
                className="w-16 h-16 rounded-xl object-cover border border-teal-500/40 shrink-0"
              />
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2 text-teal-400 font-bold">
                  <Award className="h-4 w-4" /> Especialista em Saúde Digestiva
                </div>
                <p className="text-slate-300 font-medium">Membro da Sociedade Brasileira de Gastroenterologia</p>
                <p className="text-slate-400">Atendimento Particular e Reembolso de Convênios</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-2">
              <span className="flex items-center gap-1.5 font-bold"><ShieldCheck className="h-4 w-4 text-teal-400" /> Prontuário Criptografado</span>
              <span className="flex items-center gap-1.5 font-bold"><Clock className="h-4 w-4 text-teal-400" /> Consultas de 50 min</span>
              <span className="flex items-center gap-1.5 font-bold"><MapPin className="h-4 w-4 text-teal-400" /> Estacionamento Privativo</span>
            </div>
          </div>

          {/* Right Hero: Direct Appointment Box Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-teal-500/30 space-y-5">
              <div className="space-y-1 text-center border-b border-slate-100 pb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
                  <Calendar className="h-3.5 w-3.5 text-teal-600" /> Pré-Agendamento Rápido
                </span>
                <h3 className="font-display font-extrabold text-xl text-slate-900 pt-1">
                  Agende Sua Consulta
                </h3>
                <p className="text-xs text-slate-500">
                  Responda abaixo e receba horários livres no WhatsApp em 15min
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qual modalidade prefere?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-teal-50 border-2 border-teal-600 text-teal-900 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs">
                      <UserCheck className="h-4 w-4 text-teal-600" /> Presencial
                    </button>
                    <button className="bg-slate-50 border border-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs hover:border-teal-400">
                      <Video className="h-4 w-4 text-teal-600" /> Telemedicina
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Selecione o motivo da consulta</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-teal-500">
                    <option>Gastroenterologia (Dores, Refluxo, Gastrite)</option>
                    <option>Check-up Clínico Geral e Exames</option>
                    <option>Alergias e Intolerâncias Alimentares</option>
                    <option>Retorno ou Segunda Opinião Médica</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Horário de preferência</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-teal-500">
                    <option>Manhã (08h às 12h)</option>
                    <option>Tarde (13h às 18h)</option>
                    <option>Horário Flexível / Próxima data vaga</option>
                  </select>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white font-black py-3.5 rounded-xl text-center text-sm transition-all shadow-lg shadow-teal-600/30 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Enviar Preferência no WhatsApp
                </a>

                <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" /> Sigilo médico resguardado conforme normas do CFM
                </p>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* NUMBERS / STATS STRIP */}
      <section className="bg-teal-950 text-white py-8 border-b border-teal-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-teal-400">+5.000</p>
              <p className="text-xs text-slate-300 font-medium">Pacientes Atendidos</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-teal-400">12+ Anos</p>
              <p className="text-xs text-slate-300 font-medium">De Experiência Médica</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-teal-400">99.8%</p>
              <p className="text-xs text-slate-300 font-medium">Índice de Satisfação</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-teal-400">15 min</p>
              <p className="text-xs text-slate-300 font-medium">Resposta no WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALTIES / SERVICES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Áreas de Atuação & Tratamentos</span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Cuidado Médico Completo e Especializado
          </h2>
          <p className="text-sm text-slate-500">
            Cuidados integrais voltados para a prevenção, diagnóstico precoce e tratamento personalizado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Consultas Gastroenterológicas",
              desc: "Avaliação detalhada de dores abdominais, refluxo gastroesofágico, azia, gastrite e síndrome do intestino irritável.",
              icon: Stethoscope
            },
            {
              title: "Check-up Preventivo e Exames",
              desc: "Encaminhamento e acompanhamento de exames de endoscopia digestiva alta, colonoscopia e ultrassom abdominal.",
              icon: HeartPulse
            },
            {
              title: "Telemedicina e Acompanhamento",
              desc: "Consultas online práticas para orientação contínua, retorno de exames e renovação de prescrições médicas.",
              icon: Video
            },
            {
              title: "Tratamento de Alergias Alimentares",
              desc: "Diagnóstico e manejo de intolerâncias à lactose, glúten e sensibilidades digestivas com plano de nutrição.",
              icon: Activity
            },
            {
              title: "Acompanhamento Pré e Pós Cirúrgico",
              desc: "Orientação rigorosa e segura para pacientes submetidos a procedimentos do trato gastrointestinal.",
              icon: ShieldCheck
            },
            {
              title: "Saúde Preventiva da Longevidade",
              desc: "Orientação para hábitos saudáveis, reeducação alimentar funcional e qualidade de vida no longo prazo.",
              icon: UserCheck
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 hover:shadow-xl transition-all duration-300 border-t-4 border-t-teal-600 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 pt-4"
                >
                  <span>Agendar esta especialidade</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERMEDIATE CTA BANNER #1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="bg-gradient-to-r from-teal-800 via-slate-900 to-teal-900 rounded-3xl p-8 lg:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-teal-500/30">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-300 bg-teal-900/60 px-3 py-1 rounded-full border border-teal-500/30 inline-block">
              Agendamento Descomplicado
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Precisa de consulta para esta semana?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Consulte os horários disponíveis e valores direto com nossa secretária pelo WhatsApp. Resposta rápida e humanizada.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-black px-8 py-4 rounded-xl text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Falar no WhatsApp Agora
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / PATIENT JOURNEY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Sua Jornada de Cuidado</span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Como Funciona Seu Atendimento
          </h2>
          <p className="text-sm text-slate-500">
            Processo simples, transparente e focado no seu conforto desde o primeiro contato.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Contato Via WhatsApp",
              desc: "Você clica nos botões do site e é direcionado direto para o WhatsApp da clínica.",
              icon: Smartphone
            },
            {
              step: "02",
              title: "Escolha de Horário",
              desc: "Nossa equipe envia as opções de dias e horários para consulta presencial ou online.",
              icon: Calendar
            },
            {
              step: "03",
              title: "Consulta Humanizada",
              desc: "Atendimento sem correria, anamnese completa e pedido de exames se necessário.",
              icon: Stethoscope
            },
            {
              step: "04",
              title: "Acompanhamento",
              desc: "Retorno programado para avaliar exames e monitorar a evolução do seu tratamento.",
              icon: ThumbsUp
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 relative overflow-hidden">
                <span className="text-4xl font-extrabold text-slate-100 absolute top-4 right-4 select-none">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 relative z-10">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed relative z-10">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-slate-100 border-y border-slate-200 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Depoimentos Reais</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
              O Que Dizem Nossos Pacientes
            </h2>
            <p className="text-sm text-slate-500">
              A satisfação e a recuperação dos nossos pacientes são nossa maior prioridade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Mariana Costa",
                role: "Paciente de Gastro",
                text: "Estava há meses sofrendo com fortes dores de refluxo. A doutora foi extremamente atenciosa, explicou tudo com calma e em poucas semanas já me senti renovada!",
                stars: 5
              },
              {
                name: "Carlos Eduardo Santos",
                role: "Atendimento Presencial",
                text: "A clínica é linda e super organizada. Agendei tudo pelo WhatsApp sem nenhuma burocracia. O atendimento médico superou minhas expectativas.",
                stars: 5
              },
              {
                name: "Fernanda Lima",
                role: "Telemedicina",
                text: "Fiz a consulta online durante minha viagem e recebi as prescrições no celular. Praticidade incrível e médica nota 1000!",
                stars: 5
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / DIFFERENTIALS + SCHEDULE */}
      <section className="bg-teal-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-300">Diferenciais da Clínica</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              Por que escolher nosso atendimento médico?
            </h2>
            <div className="space-y-4">
              {[
                "Consultas com tempo estendido e sem correria para ouvir o paciente com calma.",
                "Consultório moderno localizado em centro médico de fácil acesso com estacionamento.",
                "Agendamento direto pelo WhatsApp sem espera em filas de telefone.",
                "Atendimento presencial e telemedicina com prontuário eletrônico seguro."
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/90 border border-teal-500/30 rounded-3xl p-8 space-y-6 shadow-2xl">
            <h3 className="font-display font-extrabold text-2xl text-white">Horários de Atendimento</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal-400" /> Segunda a Sexta</span>
                <span className="font-bold text-white">08:00h às 19:00h</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal-400" /> Sábados</span>
                <span className="font-bold text-white">08:00h às 12:00h</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal-400" /> Localização</span>
                <span className="font-bold text-white">Av. Principal, 1000 — Sala 502</span>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-black py-4 rounded-xl text-center text-sm transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="h-4 w-4" />
              Verificar Disponibilidade de Agenda
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Dúvidas Frequentes</span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Perguntas Frequentes de Pacientes
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Atendem por plano de saúde ou apenas particular?",
              a: "Atendemos consultas particulares e oferecemos recibo médico para reembolso junto ao seu convênio. Também possuímos parcerias com planos selecionados."
            },
            {
              q: "Como funciona a consulta por Telemedicina?",
              a: "Você recebe um link seguro no celular ou computador. A consulta ocorre por vídeochamada com a mesma duração e qualidade da consulta presencial."
            },
            {
              q: "Quais documentos preciso levar na primeira consulta?",
              a: "Recomendamos levar documento de identidade, histórico de exames anteriores de sangue ou imagem e a lista de medicamentos de uso contínuo."
            },
            {
              q: "A clínica possui estacionamento?",
              a: "Sim, o edifício médico conta com estacionamento privativo com manobrista para total comodidade dos nossos pacientes."
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-teal-600 shrink-0" />
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL HIGH CONVERSION CTA */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <HeartPulse className="h-4 w-4 text-teal-400" />
            Cuidado Especializado para Você
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Não Deixe Sua Saúde para Depois. Agende Sua Consulta Hoje!
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Nossa equipe está pronta para lhe atender com todo o respeito, atenção e agilidade que você merece.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-slate-950 font-black px-8 py-4 rounded-xl text-sm transition-all shadow-xl shadow-teal-500/20 flex items-center justify-center gap-2"
            >
              <Calendar className="h-5 w-5" />
              Agendar no WhatsApp
            </a>
            <a
              href={`tel:${clinicPhone}`}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl text-sm transition-colors border border-slate-800 flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4 text-teal-400" />
              Ligar para {clinicPhone}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER CALLOUT */}
      <footer className="py-12 bg-slate-950 text-slate-400 text-center px-4 space-y-4 border-t border-slate-800">
        <p className="text-xs">
          Este é um exemplo demonstrativo de Landing Page comercial criada pela AGÊNCIA OZ para profissionais da saúde.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs font-bold text-teal-400">
          <Link to="/servicos/landingpages#modelos" className="hover:underline">Ver Outros Exemplos</Link>
          <span>•</span>
          <Link to="/orcamento?servico=lp-medicos" className="hover:underline">Solicitar Projeto para Minha Clínica</Link>
        </div>
      </footer>

    </div>
  );
}
