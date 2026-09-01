import React, { useState } from 'react';
import { HelpCircle, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { mockFaqs } from '../data/mockData';
import FAQAccordion from '../components/FAQAccordion';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Hospedagem', 'WordPress', 'SEO', 'Geral'];

  const filteredFaqs = mockFaqs.filter(faq => {
    if (selectedCategory === 'Todos') return true;
    return faq.category === selectedCategory;
  });

  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Tive+uma+d%C3%BAvida+lendo+o+FAQ+do+site+da+OZ+Digital.";

  return (
    <div id="faq-page" className="space-y-16 pb-16 animate-fade-in">
      
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 flex items-center justify-center gap-1.5">
            <HelpCircle className="h-4 w-4" /> Perguntas Frequentes
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Central de Dúvidas Técnicas
          </h1>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
            Esclareça suas dúvidas sobre a localização dos nossos servidores, nossa metodologia de programação de temas WordPress e prazos de retorno das buscas do Google.
          </p>
        </div>
      </section>

      {/* 2. Category Selector Buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Accordion Lists */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <FAQAccordion key={faq.id} faq={faq} />
          ))}
        </div>
      </section>

      {/* 4. Still have doubts section */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-slate-900 text-white rounded-2xl p-8 lg:p-12 space-y-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-radial-gradient from-blue-400 to-transparent pointer-events-none" />
          
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Ainda com dúvidas?</span>
            <h3 className="font-display text-2xl font-bold tracking-tight">Não encontrou a resposta que procurava?</h3>
            <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
              Fale diretamente com nossa equipe de suporte local e tire suas dúvidas técnicas em tempo real via WhatsApp humano.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/orcamento"
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors border border-slate-700"
            >
              Fale no Formulário
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
