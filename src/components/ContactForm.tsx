import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'wordpress',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      tempErrors.name = "O nome completo é obrigatório.";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "O e-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Insira um endereço de e-mail válido.";
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = "O telefone / WhatsApp é obrigatório para contato.";
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      tempErrors.phone = "Insira um telefone válido com DDD (mínimo 10 dígitos).";
    }
    if (!formData.message.trim()) {
      tempErrors.message = "Por favor, digite uma mensagem descrevendo seu projeto.";
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "A mensagem deve ter pelo menos 10 caracteres.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'wordpress',
        message: ''
      });
    }, 1200);
  };

  return (
    <div id="contact-form-container" className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-100">
      {isSubmitted ? (
        <div className="text-center py-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">
            Mensagem Enviada!
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto mb-8">
            Agradecemos o seu contato. Um dos nossos especialistas de Canoas entrará em contato via WhatsApp ou e-mail nas próximas 2 horas comerciais.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Enviar Nova Mensagem
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          
          <div>
            <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">
              Fale Conosco
            </h3>
            <p className="text-sm text-slate-500">
              Preencha os campos abaixo e receba um orçamento personalizado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="form-name" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Nome Completo
              </label>
              <input
                type="text"
                id="form-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Pedro Silva"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.name 
                    ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                    : 'border-slate-200 focus:ring-blue-100 focus:border-brand-blue'
                }`}
              />
              {errors.name && (
                <p className="flex items-center gap-1 text-xs font-semibold text-red-500 mt-1">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="form-email" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                E-mail Corporativo
              </label>
              <input
                type="email"
                id="form-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex: pedro@suaempresa.com.br"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.email 
                    ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                    : 'border-slate-200 focus:ring-blue-100 focus:border-brand-blue'
                }`}
              />
              {errors.email && (
                <p className="flex items-center gap-1 text-xs font-semibold text-red-500 mt-1">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* WhatsApp/Phone */}
            <div className="space-y-2">
              <label htmlFor="form-phone" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                WhatsApp / Celular
              </label>
              <input
                type="tel"
                id="form-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ex: (48) 99198-4678"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.phone 
                    ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                    : 'border-slate-200 focus:ring-blue-100 focus:border-brand-blue'
                }`}
              />
              {errors.phone && (
                <p className="flex items-center gap-1 text-xs font-semibold text-red-500 mt-1">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Interest */}
            <div className="space-y-2">
              <label htmlFor="form-service" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Serviço de Interesse
              </label>
              <select
                id="form-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue bg-white"
              >
                <option value="hospedagem">Hospedagem Cloud Premium</option>
                <option value="wordpress">Desenvolvimento WordPress</option>
                <option value="seo">SEO e Otimização no Google</option>
                <option value="tudo">Solução Completa (Todos)</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="form-message" className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Descrição do Projeto / Mensagem
            </label>
            <textarea
              id="form-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Fale um pouco sobre o seu site, os objetivos do seu negócio ou as necessidades da sua infraestrutura..."
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.message 
                  ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                  : 'border-slate-200 focus:ring-blue-100 focus:border-brand-blue'
              }`}
            />
            {errors.message && (
              <p className="flex items-center gap-1 text-xs font-semibold text-red-500 mt-1">
                <AlertCircle className="h-3 w-3 shrink-0" />
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full bg-brand-blue hover:bg-blue-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-blue-600/10 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processando Envio...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Enviar Solicitação de Orçamento
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
