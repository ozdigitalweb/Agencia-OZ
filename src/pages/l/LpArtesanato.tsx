import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Palette, 
  Scissors, 
  Heart, 
  Gift, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  ArrowLeft,
  Feather,
  Gem,
  Award,
  ChevronRight,
  Star,
  HelpCircle,
  Package,
  Brush,
  Smile,
  ShieldCheck
} from 'lucide-react';

export default function LpArtesanato() {
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Vim+pelo+modelo+de+Landing+Page+para+Artesanato+e+gostaria+de+um+or%C3%A7amento.";

  const items = [
    {
      title: "Vasos de Cerâmica Manual",
      desc: "Esculpidos um a um em argila natural, com acabamento esmaltado rústico e textura exclusiva.",
      img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?fm=webp&fit=crop&w=600&q=80",
      tag: "Peça Única"
    },
    {
      title: "Velas Aromáticas Botânicas",
      desc: "Feitas com cera vegetal de coco, óleos essenciais puros e pavio de madeira crepitante.",
      img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?fm=webp&fit=crop&w=600&q=80",
      tag: "100% Ecológico"
    },
    {
      title: "Tapeçaria e Macramê em Algodão",
      desc: "Peças decorativas tecidas à mão com fios de algodão cru para trazer aconchego ao seu lar.",
      img: "https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?fm=webp&fit=crop&w=600&q=80",
      tag: "Artesanal"
    },
    {
      title: "Luminárias de Madeira Rústica",
      desc: "Feitas com madeira de reuso tratada, lâmpada de filamento aquecido e design orgânico.",
      img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?fm=webp&fit=crop&w=600&q=80",
      tag: "Sustentável"
    },
    {
      title: "Saboaria Herbal & Fitoterápica",
      desc: "Sabonetes artesanais produzidos pelo método cold process com ervas e manteigas brasileiras.",
      img: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?fm=webp&fit=crop&w=600&q=80",
      tag: "Autocuidado"
    },
    {
      title: "Bordados Afetivos Personalizados",
      desc: "Bordados livres feitos à mão em bastidor de madeira para eternizar nomes, datas e retratos de família.",
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?fm=webp&fit=crop&w=600&q=80",
      tag: "Sob Encomenda"
    }
  ];

  return (
    <div id="lp-artesanato-demo" className="bg-stone-50 text-stone-800 font-sans selection:bg-amber-700 selection:text-white min-h-screen">
      
      {/* Top Banner indicating this is a live commercial demo */}
      <div className="bg-stone-900 text-white text-xs py-2.5 px-4 text-center border-b border-stone-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded border border-amber-500/30">
            MODELO DEMO
          </span>
          <span className="font-medium text-stone-300">
            Landing Page Afetiva e Encantadora para Artesãos, Ateliês e Marcas Autorais
          </span>
        </div>
        <div className="flex items-center gap-3 mx-auto sm:mx-0">
          <Link 
            to="/servicos/landingpages#modelos" 
            className="bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 px-3 py-1 rounded font-bold transition-all flex items-center gap-1.5 hover:border-amber-500/60 shadow-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar para Todos os Modelos
          </Link>
          <Link 
            to="/orcamento?servico=lp-artesanato" 
            className="bg-amber-700 hover:bg-amber-600 text-white px-3 py-1 rounded font-bold transition-colors"
          >
            Quero uma LP Similar
          </Link>
        </div>
      </div>

      {/* WARM EDITORIAL MAGAZINE HERO */}
      <header className="relative bg-gradient-to-br from-amber-950 via-stone-900 to-stone-950 text-stone-100 pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-amber-900/40 overflow-hidden">
        
        {/* Soft Organic Warm Light */}
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Ateliê Raízes — Arte Autoral Feita à Mão</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Peças Únicas com Alma, Textura e História
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
              Modelagem manual em cerâmica, ceras botânicas e macramê em algodão cru. Trazemos o aconchego e a beleza do feito à mão para o seu ambiente.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-4 text-xs font-bold text-amber-300/90 pt-1">
              <span className="flex items-center gap-1.5 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-amber-900/40">
                <Heart className="h-4 w-4 text-amber-400" /> 100% Produção Autoral
              </span>
              <span className="flex items-center gap-1.5 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-amber-900/40">
                <Feather className="h-4 w-4 text-amber-400" /> Insumos Sustentáveis
              </span>
              <span className="flex items-center gap-1.5 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-amber-900/40">
                <Gift className="h-4 w-4 text-amber-400" /> Embalagem Afetiva
              </span>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-600 hover:bg-amber-500 text-white font-extrabold px-8 py-4 rounded-xl text-sm transition-all shadow-xl shadow-amber-700/30 flex items-center justify-center gap-2"
              >
                <Palette className="h-5 w-5" />
                Encomendar Peça Exclusiva
              </a>
            </div>
          </div>

          {/* Right Collage Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-stone-900 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?fm=webp&fit=crop&w=800&q=80"
                alt="Processo artesanal em cerâmica"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-stone-950/90 border border-stone-800 text-center space-y-1">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Lote Limitado de Inverno</p>
                <p className="text-xs text-stone-300">Cada peça é moldada individualmente com tempo e dedicação.</p>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* STORYTELLING SPLIT */}
      <section className="bg-white text-stone-900 py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">A História do Ateliê</span>
            <h2 className="font-display text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
              "Resgatamos o valor do tempo e do afeto em um mundo acelerado."
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              O Ateliê Raízes nasceu da paixão pelas matérias-primas naturais brasileiras. Não produzimos em massa: trabalhamos com tiragens pequenas para garantir que cada vaso, vela ou tecido chegue até sua casa impregnado de energia boa e cuidado artesanal.
            </p>
            <div className="p-4 bg-stone-50 border-l-4 border-amber-700 rounded-r-2xl text-xs italic text-stone-700 space-y-1">
              <p className="font-bold text-stone-900">— Ana Clara, Fundadora & Artesã Principal</p>
              <p>"A verdadeira beleza das coisas está nas imperfeições sutis do trabalho humano."</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?fm=webp&fit=crop&w=500&q=80"
              alt="Cerâmica artesanal"
              className="rounded-2xl border border-stone-200 shadow-md object-cover h-64 w-full"
            />
            <img
              src="https://images.unsplash.com/photo-1603006905003-be475563bc59?fm=webp&fit=crop&w=500&q=80"
              alt="Velas aromáticas artesanais"
              className="rounded-2xl border border-stone-200 shadow-md object-cover h-64 w-full mt-8"
            />
          </div>
        </div>
      </section>

      {/* VALUES STRIP */}
      <section className="bg-stone-900 text-white py-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs sm:text-sm font-bold">
            <div className="flex items-center justify-center gap-2">
              <Heart className="h-5 w-5 text-amber-400" />
              <span>Produção Afetiva e Autoral</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Feather className="h-5 w-5 text-amber-400" />
              <span>Insumos Biodegradáveis</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Gift className="h-5 w-5 text-amber-400" />
              <span>Caixa Presente com Carta à Mão</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-400" />
              <span>Entrega Segura com Plastico Bolha</span>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">Coleções Autorais</span>
          <h2 className="font-display text-3xl font-extrabold text-stone-900 tracking-tight">
            Nossos Trabalhos Manuais
          </h2>
          <p className="text-sm text-stone-600">
            Design único para decorar seu ambiente com elegância e identidade brasileira.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-video overflow-hidden bg-stone-100">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-amber-800 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display font-bold text-xl text-stone-900">{item.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4 text-amber-400" />
                  Consultar Disponibilidade
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERMEDIATE CTA BANNER #1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-stone-900 rounded-3xl p-8 lg:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-amber-500/30">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-900/80 px-3 py-1 rounded-full border border-amber-500/30 inline-block">
              Projetos Especiais & Encomendas
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Quer encomendar uma peça exclusiva com cores e tamanhos sob medida?
            </h3>
            <p className="text-sm text-stone-200 leading-relaxed">
              Traga sua ideia ou paleta de cores para o nosso WhatsApp e criamos um projeto autoral especial para você.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-500 text-white font-black px-8 py-4 rounded-xl text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <Palette className="h-5 w-5" />
              Encomendar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* THE ARTISAN JOURNEY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">Processo Autoral</span>
          <h2 className="font-display text-3xl font-extrabold text-stone-900 tracking-tight">
            Do Ateliê Direto Para Sua Casa
          </h2>
          <p className="text-sm text-stone-600">
            Conheça o cuidado e carinho dedicados a cada etapa do feitio da sua arte.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Seleção do Material",
              desc: "Escolhemos barro, ceras vegetais e fios de algodão de produtores locais sustentáveis.",
              icon: Feather
            },
            {
              step: "02",
              title: "Feitio Manual",
              desc: "Modelagem, secagem natural e tecelagem lenta sem processos industriais acelerados.",
              icon: Brush
            },
            {
              step: "03",
              title: "Curadoria & Acabamento",
              desc: "Inspeção rigorosa de detalhes, aromas e textura para garantir a beleza da peça.",
              icon: Sparkles
            },
            {
              step: "04",
              title: "Embalagem Afetiva",
              desc: "Enviado em caixa perfumada com bilhete escrito à mão e proteção reforçada.",
              icon: Gift
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 relative overflow-hidden">
                <span className="text-4xl font-extrabold text-stone-200 absolute top-4 right-4 select-none">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-stone-900 relative z-10">{item.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed relative z-10">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-stone-200/60 border-y border-stone-300 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">Depoimentos Carinhosos</span>
            <h2 className="font-display text-3xl font-extrabold text-stone-900 tracking-tight">
              O Encanto de Nossos Clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Mariana L.",
                role: "Decoração de Sala",
                text: "O macramê ficou impecável na minha sala de estar. Todo mundo que chega em casa elogia o capricho da peça e o perfume da embalagem!",
                stars: 5
              },
              {
                name: "Clara & Fernando",
                role: "Lembrancinhas de Casamento",
                text: "Encomendamos 80 mini velas aromáticas para nosso casamento. Nossos convidados amaram o perfume e a delicadeza dos potinhos de cerâmica.",
                stars: 5
              },
              {
                name: "Sofia R.",
                role: "Presente de Aniversário",
                text: "Pedi um bordado personalizado com a foto do meu pet e fiquei emocionada quando abri a caixa. Veio uma cartinha linda. Ganharam uma cliente fiel!",
                stars: 5
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-600">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-600" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-100">
                  <p className="text-sm font-bold text-stone-900">{t.name}</p>
                  <p className="text-xs text-amber-800">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">Dúvidas Frequentes</span>
          <h2 className="font-display text-3xl font-extrabold text-stone-900 tracking-tight">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Qual é o prazo para peças feitas sob encomenda?",
              a: "Como cada peça é produzida manualmente, o prazo de confecção varia de 5 a 12 dias úteis dependendo da complexidade antes do envio."
            },
            {
              q: "As peças de cerâmica e velas chegam inteiras pelos Correios?",
              a: "Sim! Utilizamos embalagens ultra reforçadas com plástico bolha grosso e caixas rígidas. Garantimos a reposição imediata caso aconteça qualquer avaria no transporte."
            },
            {
              q: "Posso personalizar as cores e os aromas?",
              a: "Com certeza! Essa é a beleza do trabalho artesanal. Basta nos chamar no WhatsApp para definir suas preferências de paleta de cores ou essências."
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-6 space-y-2">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-amber-800 shrink-0" />
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL HIGH CONVERSION CTA */}
      <section className="bg-stone-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-t border-stone-800">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Heart className="h-4 w-4 text-amber-400" />
            Arte com Alma para Seu Lar
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Traga Aconchego e Exclusividade Para a Sua Casa
          </h2>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
            Converse diretamente com a artesã no WhatsApp para escolher sua peça pronta ou encomendar seu projeto especial.
          </p>

          <div className="pt-4 flex justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-500 text-white font-black px-10 py-4 rounded-xl text-sm transition-all shadow-xl shadow-amber-600/20 flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Falar com a Artesã no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-stone-900 text-stone-400 text-center px-4 space-y-4 border-t border-stone-800">
        <p className="text-xs">
          Exemplo demonstrativo de Landing Page autoral para Artesão e Ateliê criada pela AGÊNCIA OZ.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs font-bold text-amber-400">
          <Link to="/servicos/landingpages#modelos" className="hover:underline">Ver Outros Exemplos</Link>
          <span>•</span>
          <Link to="/orcamento?servico=lp-artesanato" className="hover:underline">Solicitar Projeto para Meu Ateliê</Link>
        </div>
      </footer>

    </div>
  );
}
