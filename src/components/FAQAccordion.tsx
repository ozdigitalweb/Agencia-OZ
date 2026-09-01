import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '../data/mockData';

interface FAQAccordionProps {
  faq: FaqItem;
  key?: any;
}

export default function FAQAccordion({ faq }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      id={`faq-accordion-${faq.id}`}
      className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-all duration-200 hover:border-slate-400"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left font-display font-bold text-slate-800 hover:text-blue-700 hover:bg-slate-50/50 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="pr-4 tracking-tight">{faq.question}</span>
        <ChevronDown 
          className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-blue-700' : ''
          }`} 
        />
      </button>

      {/* Accordion Content with smooth height transition */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-6 text-sm text-slate-500 leading-relaxed bg-slate-50/30">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}
