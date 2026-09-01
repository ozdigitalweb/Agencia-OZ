import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return null;
  }

  const whatsappUrl = "https://wa.me/5548991984678?text=Ol%C3%A1%21+Gostaria+de+um+or%C3%A7amento+com+a+OZ+Digital.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      title="Fale conosco no WhatsApp"
      aria-label="Fale conosco no WhatsApp"
      id="whatsapp-floating-btn"
    >
      <MessageSquare className="h-6 w-6 animate-pulse" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-out whitespace-nowrap text-sm font-medium">
        Falar com Especialista
      </span>
    </a>
  );
}
