import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Cpu, Search, ArrowRight, CheckCircle2, Radio, Layers, Megaphone } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  path: string;
  iconName: 'hospedagem' | 'wordpress' | 'seo' | 'streaming' | 'landingpages' | 'midia';
  benefits: string[];
  key?: any;
}

export default function ServiceCard({ title, description, path, iconName, benefits }: ServiceCardProps) {
  
  const getIcon = () => {
    switch (iconName) {
      case 'hospedagem':
        return <Globe className="h-6 w-6 text-blue-700" />;
      case 'wordpress':
        return <Cpu className="h-6 w-6 text-orange-500" />;
      case 'seo':
        return <Search className="h-6 w-6 text-emerald-600" />;
      case 'streaming':
        return <Radio className="h-6 w-6 text-purple-600" />;
      case 'landingpages':
        return <Layers className="h-6 w-6 text-amber-500" />;
      case 'midia':
        return <Megaphone className="h-6 w-6 text-pink-600" />;
      default:
        return <Globe className="h-6 w-6 text-blue-700" />;
    }
  };

  const getThemeColor = () => {
    switch (iconName) {
      case 'hospedagem':
        return 'bg-blue-50 border border-blue-100';
      case 'wordpress':
        return 'bg-orange-50 border border-orange-100';
      case 'seo':
        return 'bg-emerald-50 border border-emerald-100';
      case 'streaming':
        return 'bg-purple-50 border border-purple-100';
      case 'landingpages':
        return 'bg-amber-50 border border-amber-100';
      case 'midia':
        return 'bg-pink-50 border border-pink-100';
      default:
        return 'bg-blue-50 border border-blue-100';
    }
  };

  return (
    <div
      id={`service-card-${iconName}`}
      className="flex flex-col h-full bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all duration-300"
    >
      {/* Icon Frame */}
      <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${getThemeColor()} mb-6`}>
        {getIcon()}
      </div>

      {/* Service Info */}
      <h3 className="font-display text-xl font-bold text-slate-900 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      {/* Bullet Benefits */}
      <div className="space-y-2.5 mb-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      {/* Link Navigation */}
      <Link
        to={path}
        className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-orange-500 group/link transition-colors mt-auto self-start"
      >
        Saber Mais
        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
      </Link>
    </div>
  );
}
