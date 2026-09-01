import React from 'react';
import { Link } from 'react-router-dom';
import { Check, MessageSquare, Sparkles } from 'lucide-react';
import { Plan } from '../data/mockData';

interface PlanCardProps {
  plan: Plan;
  key?: any;
}

export default function PlanCard({ plan }: PlanCardProps) {
  return (
    <div
      id={`plan-card-${plan.id}`}
      className={`relative flex flex-col h-full rounded-2xl p-8 transition-all duration-300 ${
        plan.popular
          ? 'bg-slate-900 text-white shadow-xl scale-105 border-2 border-blue-700 z-10'
          : 'bg-white text-slate-800 border border-slate-200 hover:border-slate-400 hover:shadow-lg'
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-700 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-300 stroke-[2]" />
          <span>Mais Vendido</span>
        </span>
      )}

      {/* Plan Info */}
      <div className="mb-6">
        <h3 className={`font-display text-xl font-bold tracking-tight ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
          {plan.name}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
          {plan.description}
        </p>
      </div>

      {/* Price Section */}
      <div className="flex items-baseline mb-8">
        <span className={`text-sm font-semibold ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>R$&nbsp;</span>
        <span className={`text-5xl font-black tracking-tight ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
          {plan.price}
        </span>
        <span className={`text-sm font-semibold ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
          /{plan.period}
        </span>
      </div>

      {/* Divider */}
      <div className={`w-full h-px mb-8 ${plan.popular ? 'bg-slate-800' : 'bg-slate-200'}`} />

      {/* Features List */}
      <ul className="space-y-4 mb-8 flex-grow">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm">
            <Check className={`h-5 w-5 shrink-0 mt-0.5 ${plan.popular ? 'text-blue-400' : 'text-blue-700'}`} />
            <span className={plan.popular ? 'text-slate-300' : 'text-slate-600'}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Action CTA Button */}
      <Link
        to={`/orcamento?servico=hospedagem`}
        className={`flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl text-sm font-bold transition-all ${
          plan.popular
            ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-lg'
            : 'bg-slate-900 hover:bg-slate-800 text-white'
        }`}
      >
        <MessageSquare className="h-4 w-4 shrink-0" />
        {plan.ctaText}
      </Link>
    </div>
  );
}
