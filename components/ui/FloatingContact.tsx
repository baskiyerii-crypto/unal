'use client';

import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { ContactPicker, type ContactPickerMode } from '@/components/ui/ContactPicker';
import {
  type ContactPerson,
  DEFAULT_CONTACT_PERSONS,
  DEFAULT_WHATSAPP_MESSAGE,
  formatPhoneDisplay,
} from '@/lib/utils/contacts';

interface FloatingContactProps {
  contacts?: ContactPerson[];
  whatsappMessage?: string;
}

export function FloatingContact({
  contacts = DEFAULT_CONTACT_PERSONS,
  whatsappMessage = DEFAULT_WHATSAPP_MESSAGE,
}: FloatingContactProps) {
  const [mounted, setMounted] = useState(false);
  const [pickerMode, setPickerMode] = useState<ContactPickerMode | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const primaryLabel = formatPhoneDisplay(contacts[0]?.phone || '05317924006');

  if (!mounted) return null;

  return (
    <>
      <div className="fixed bottom-5 left-0 right-0 z-50 pointer-events-none px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between">
        <div className="relative pointer-events-auto group">
          <span className="absolute inset-0 rounded-full bg-[#D4AF37]/40 animate-pulse-ring pointer-events-none" />

          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 bg-[#24292E] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-[#D4AF37]/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>
              Hemen Usta ile Görüş: <strong className="text-[#D4AF37]">{primaryLabel}</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setPickerMode('call')}
            aria-label="Telefon ile ulaşın — numara seçin"
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-[#24292E] to-[#111827] text-[#D4AF37] border-2 border-[#D4AF37]/50 shadow-xl shadow-black/20 hover:scale-110 hover:border-[#D4AF37] transition-all duration-300 cursor-pointer"
          >
            <Phone className="w-6 h-6 animate-phone-shake" />
          </button>
        </div>

        <div className="relative pointer-events-auto group">
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-pulse-ring pointer-events-none" />

          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 bg-white text-gray-900 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xl border border-emerald-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>7/24 WhatsApp Hızlı Teklif Al</span>
          </div>

          <button
            type="button"
            onClick={() => setPickerMode('whatsapp')}
            aria-label="WhatsApp ile teklif alın — kişi seçin"
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-[#25D366] to-[#128C7E] text-white shadow-xl shadow-emerald-600/30 hover:scale-110 hover:shadow-emerald-600/50 transition-all duration-300 cursor-pointer"
          >
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </button>
        </div>
      </div>

      <ContactPicker
        contacts={contacts}
        mode={pickerMode}
        onClose={() => setPickerMode(null)}
        whatsappMessage={whatsappMessage}
      />
    </>
  );
}
