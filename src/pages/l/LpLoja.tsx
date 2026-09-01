import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Tag, 
  Sparkles, 
  Percent, 
  Truck, 
  Star, 
  CreditCard, 
  CheckCircle2, 
  MessageSquare, 
  ArrowLeft,
  Flame,
  Heart,
  ChevronRight,
  ShieldCheck,
  Gift,
  HelpCircle,
  Clock,
  PackageCheck
} from 'lucide-react';

export default function LpLoja() {
  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Vim+pelo+modelo+de+Landing+Page+para+Loja+e+gostaria+de+um+or%C3%A7amento.";

  const products = [
    {
      name: "Tênis UltraComfort Sport Pro",
      category: "Lançamento Exclusivo",
      price: "R$ 189,90",
      oldPrice: "R$ 279,90",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?fm=webp&fit=crop&w=600&q=80",
      rating: 4.9
    },
    {
      name: "Jaqueta Puffer Streetwear Impermeável",
      category: "Inverno 2026",
      price: "R$ 249,90",
      oldPrice: "R$ 349,90",
      img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?fm=webp&fit=crop&w=600&q=80",
      rating: 4.8
    },
    {
      name: "Relógio Chrono Black Edition",
      category: "Mais Vendido",
      price: "R$ 199,90",
      oldPrice: "R$ 299,90",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=webp&fit=crop&w=600&q=80",
      rating: 5.0
    },
    {
      name: "Mochila Executiva Antifurto USB",
      category: "Praticidade Urbana",
      price: "R$ 139,90",
      oldPrice: "R$ 199,90",
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?fm=webp&fit=crop&w=600&q=80",
      rating: 4.9
    },
    {
      name: "Óculos de Sol Polarizado UV400",
      category: "Acessórios",
      price: "R$ 119,90",
      oldPrice: "R$ 179,90",
      img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?fm=webp&fit=crop&w=600&q=80",
      rating: 4.9
    },
    {
      name: "Fone TWS Bluetooth Noise Cancelling",
      category: "Tecnologia",
      price: "R$ 159,90",
      oldPrice: "R$ 229,90",
      img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?fm=webp&fit=crop&w=600&q=80",
      rating: 4.8
    },
    {
      name: "Bolsa Couro Legítimo Minimalista",
      category: "Moda & Estilo",
      price: "R$ 219,90",
      oldPrice: "R$ 310,00",
      img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?fm=webp&fit=crop&w=600&q=80",
      rating: 5.0
    },
    {
      name: "Kit 3 Camisetas Algodão Pima Premium",
      category: "Essenciais",
      price: "R$ 149,90",
      oldPrice: "R$ 210,00",
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?fm=webp&fit=crop&w=600&q=80",
      rating: 4.9
    }
  ];

  return (
    <div id="lp-loja-demo" className="bg-slate-50 text-slate-800 font-sans selection:bg-rose-500 selection:text-white min-h-screen">
      
      {/* Top Banner indicating this is a live commercial demo */}
      <div className="bg-slate-900 text-white text-xs py-2.5 px-4 text-center border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-rose-500/20 text-rose-300 font-extrabold px-2 py-0.5 rounded border border-rose-500/30">
            MODELO DEMO
          </span>
          <span className="font-medium text-slate-300">
            Landing Page de Oferta & Catálogo Direto no WhatsApp para Lojas e Comércios
          </span>
        </div>
        <div className="flex items-center gap-3 mx-auto sm:mx-0">
          <Link 
            to="/servicos/landingpages#modelos" 
            className="bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 px-3 py-1 rounded font-bold transition-all flex items-center gap-1.5 hover:border-rose-500/60 shadow-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar para Todos os Modelos
          </Link>
          <Link 
            to="/orcamento?servico=lp-loja" 
            className="bg-rose-600 hover:bg-rose-500 text-white px-3 py-1 rounded font-bold transition-colors"
          >
            Quero uma LP Similar
          </Link>
        </div>
      </div>

      {/* RETAIL FLASH SALE HERO */}
      <header className="relative bg-gradient-to-br from-slate-950 via-rose-950 to-slate-900 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          
          {/* Top Ticker Notification */}
          <div className="max-w-xl mx-auto bg-rose-500/20 border border-rose-500/40 rounded-full py-1.5 px-4 text-center text-xs font-bold text-rose-300 flex items-center justify-center gap-2">
            <Flame className="h-4 w-4 text-rose-400 animate-pulse" />
            <span>OFERTA RELÂMPAGO DO DIA — CUPOM: PRIMEIRACOMPRA (10% EXTRA NO PIX)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs font-bold">
                <Clock className="h-3.5 w-3.5 text-rose-400" />
                <span>Termina em: 02h : 45m : 12s</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Sua Loja de Estilo & Qualidade em 1 Clique
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                Confira lançamentos exclusivos com até 40% de desconto. Faça seu pedido diretamente pelo WhatsApp com atendimento rápido e entrega garantida.
              </p>

              {/* Quick Category Filter Pills */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold">
                <span className="bg-rose-600 text-white px-3.5 py-1.5 rounded-full cursor-pointer shadow">Todos os Destaques</span>
                <span className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-3.5 py-1.5 rounded-full cursor-pointer">Calçados</span>
                <span className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-3.5 py-1.5 rounded-full cursor-pointer">Moda & Inverno</span>
                <span className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-3.5 py-1.5 rounded-full cursor-pointer">Acessórios</span>
                <span className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-3.5 py-1.5 rounded-full cursor-pointer">Eletrônicos</span>
              </div>

              {/* CTA */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-rose-500 hover:bg-rose-400 text-white font-black px-8 py-4 rounded-xl text-sm transition-all shadow-xl shadow-rose-500/25 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Comprar Direto no WhatsApp
                </a>
              </div>
            </div>

            {/* Right Product Spotlight Frame */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-rose-500/40 shadow-2xl bg-slate-900 aspect-square group">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?fm=webp&fit=crop&w=800&q=80"
                  alt="Tênis UltraComfort Sport Pro"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
                
                <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider">
                  Ofertão 40% OFF
                </span>

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <p className="text-xs font-extrabold text-white">Tênis UltraComfort Sport Pro</p>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-rose-400">R$ 189,90</span>
                    <span className="text-xs text-slate-400 line-through">R$ 279,90</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">Frete Grátis</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* RETAIL BENEFITS STRIP */}
      <section className="bg-slate-900 text-white py-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs sm:text-sm font-bold">
            <div className="flex items-center justify-center gap-2">
              <Truck className="h-5 w-5 text-rose-400" />
              <span>Envio em 24h para todo Brasil</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-5 w-5 text-rose-400" />
              <span>Garantia de Troca em 30 Dias</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CreditCard className="h-5 w-5 text-rose-400" />
              <span>Até 12x Sem Juros no Cartão</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Gift className="h-5 w-5 text-rose-400" />
              <span>Brinde nas compras acima de R$ 200</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS CATALOG */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600">Catálogo em Destaque</span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Os Mais Desejados do Mês
          </h2>
          <p className="text-sm text-slate-500">
            Clique no botão do produto para conversar com o vendedor e concluir seu pedido com atendimento rápido.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md">
                    {item.category}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    <span>{item.rating}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900 line-clamp-1">{item.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-rose-600">{item.price}</span>
                    <span className="text-xs text-slate-400 line-through">{item.oldPrice}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Comprar no WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERMEDIATE CTA BANNER #1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="bg-gradient-to-r from-rose-700 via-rose-900 to-slate-900 rounded-3xl p-8 lg:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-rose-500/30">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-rose-900/80 px-3 py-1 rounded-full border border-rose-500/30 inline-block">
              Cupom Exclusivo no WhatsApp
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ganhe 10% de Desconto Adicional no Seu Primeiro Pedido!
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Mande uma mensagem no nosso WhatsApp com o código <strong className="text-amber-300">#PRIMEIRACOMPRA</strong> e receba a oferta imediatamente.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-8 py-4 rounded-xl text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Garantir Desconto Extra
            </a>
          </div>
        </div>
      </section>

      {/* WHY BUY WITH US / DIFFERENTIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600">Sua Compra Protegida</span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Por Que Comprar Conosco?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Envio Rápido em 24h",
              desc: "Seu pedido é embalado e postado nos Correios ou transportadora em até 1 dia útil.",
              icon: Truck
            },
            {
              title: "Atendimento Humanizado",
              desc: "Tire dúvidas de tamanhos, materiais e modelos direto com um atendente real.",
              icon: MessageSquare
            },
            {
              title: "Garantia de 30 Dias",
              desc: "Não serviu ou não gostou? Troque sem complicação em até 30 dias após o recebimento.",
              icon: ShieldCheck
            },
            {
              title: "Pagamento 100% Seguro",
              desc: "Receba o código de rastreio e acompanhe seu pacote pelo WhatsApp em tempo real.",
              icon: PackageCheck
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="bg-slate-100 border-y border-slate-200 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600">Clientes Satisfeitos</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
              Aprovação de Quem Já Comprou
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Beatriz M.",
                role: "Compra via WhatsApp",
                text: "Atendimento maravilhoso! Tirei dúvidas sobre o tamanho do tênis pelo WhatsApp e chegou em 3 dias aqui em Curitiba. Perfeito!",
                stars: 5
              },
              {
                name: "Lucas R.",
                role: "Cliente Frequente",
                text: "A qualidade da jaqueta me surpreendeu. O tecido é reforçado e o acabamento é de primeira. Já é minha terceira compra.",
                stars: 5
              },
              {
                name: "Gisele Alencar",
                role: "Compra de Presente",
                text: "Comprei a mochila pro meu marido e chegou super bem embalada e com brinde fofo. Recomendo muito a loja!",
                stars: 5
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500" />
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

      {/* FAQ SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600">Dúvidas de Compras</span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Quais são as formas de pagamento aceitas?",
              a: "Aceitamos PIX com 10% de desconto, cartões de crédito em até 12x (sendo até 6x sem juros) e boleto bancário."
            },
            {
              q: "Como faço para calcular o frete e prazo de entrega?",
              a: "É só enviar o seu CEP no WhatsApp que nossa equipe calcula a opção mais rápida e barata para a sua região."
            },
            {
              q: "E se a peça não servir ou precisar trocar?",
              a: "Não se preocupe! Você tem até 30 dias para solicitar a troca gratuita direto conosco pelo WhatsApp."
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-rose-600 shrink-0" />
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
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider">
            <Flame className="h-4 w-4 text-rose-400" />
            Ofertas por Tempo Limitado
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Gostou de Algum Produto? Garanta o Seu Antes que Esgote!
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Nossa equipe de vendas está online no WhatsApp pronta para tirar suas dúvidas e fechar seu pedido.
          </p>

          <div className="pt-4 flex justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-10 py-4 rounded-xl text-sm transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Finalizar Pedido no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-slate-950 text-slate-400 text-center px-4 space-y-4 border-t border-slate-800">
        <p className="text-xs">
          Exemplo demonstrativo de Landing Page de alta conversão para Lojas e E-commerce criada pela AGÊNCIA OZ.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs font-bold text-rose-400">
          <Link to="/servicos/landingpages#modelos" className="hover:underline">Ver Outros Exemplos</Link>
          <span>•</span>
          <Link to="/orcamento?servico=lp-loja" className="hover:underline">Solicitar Projeto para Minha Loja</Link>
        </div>
      </footer>

    </div>
  );
}
