import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Target, MousePointer, Flame, ArrowRight } from 'lucide-react';

interface LandingPageCtaBannerProps {
  isGlobal?: boolean;
  noWrapper?: boolean;
}

export default function LandingPageCtaBanner({ isGlobal = false, noWrapper = false }: LandingPageCtaBannerProps) {
  const { pathname } = useLocation();

  // Hide the banner if:
  // 1. The user is on the specific Landing Pages service page (they are already looking at it)
  // 2. It is being rendered globally (isGlobal = true) and the user is on the Home page (where it's already embedded)
  if (pathname === '/servicos/landingpages' || (isGlobal && pathname === '/')) {
    return null;
  }

  const content = (
    <div className="relative overflow-hidden rounded-3xl bg-black text-white p-8 md:p-12 shadow-2xl border-2 border-slate-800">
      
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/85 to-slate-950/95"></div>
      </div>

      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Text and Value Prop */}
        <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 border border-orange-500/30">
            <Flame className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
            <span>LANÇAMENTO: LANDING PAGES DE ALTA CONVERSÃO</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            Seus anúncios não estão dando retorno? <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Multiplique suas vendas</span> com páginas de elite.
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Desenvolvemos páginas de vendas de altíssima conversão, com copywriting persuasivo voltado a vendas, carregamento ultrarrápido (menos de 1 segundo) e integrações completas de Pixel do Meta Ads, Google Ads e TikTok Ads.
          </p>

          {/* Quick Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
              <Target className="h-5 w-5 text-orange-500 shrink-0" />
              <span className="text-xs font-bold text-slate-200">Copywriting Persuasivo</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
              <Zap className="h-5 w-5 text-blue-400 shrink-0" />
              <span className="text-xs font-bold text-slate-200">Carga em &lt; 1 Segundo</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
              <MousePointer className="h-5 w-5 text-emerald-400 shrink-0" />
              <span className="text-xs font-bold text-slate-200">Pixel & Tags Prontos</span>
            </div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-stretch lg:items-end">
          <Link
            to="/servicos/landingpages"
            className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-center text-base px-8 py-4 rounded-2xl shadow-xl shadow-blue-950/50 transition-all hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
          >
            Conhecer Landing Pages
          </Link>
          <a
            href="https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+as+Landing+Pages+de+Alta+Convers%C3%A3o+da+OZ+Digital."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-center text-sm px-6 py-3 rounded-2xl transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            Falar no WhatsApp
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

      </div>
    </div>
  );

  if (noWrapper) {
    return <div className="w-full my-8">{content}</div>;
  }

  return (
    <section id="landingpage-cta-banner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      {content}
    </section>
  );
}
