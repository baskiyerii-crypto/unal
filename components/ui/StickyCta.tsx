'use client';

import React, { useState } from 'react';
import { ContactPicker, type ContactPickerMode } from '@/components/ui/ContactPicker';
import {
  type ContactPerson,
  DEFAULT_CONTACT_PERSONS,
  DEFAULT_WHATSAPP_MESSAGE,
  formatPhoneDisplay,
} from '@/lib/utils/contacts';

interface StickyCtaProps {
  contacts?: ContactPerson[];
  whatsappMessage?: string;
}

export function StickyCta({
  contacts = DEFAULT_CONTACT_PERSONS,
  whatsappMessage = DEFAULT_WHATSAPP_MESSAGE,
}: StickyCtaProps) {
  const [pickerMode, setPickerMode] = useState<ContactPickerMode | null>(null);
  const primaryLabel = formatPhoneDisplay(contacts[0]?.phone || '05317924006');

  return (
    <>
      <div className="bg-[#24292E] text-white rounded-2xl p-6 shadow-xl border border-slate-700 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#D4AF37] text-slate-950 uppercase mb-3">
          ŞANTİYE & TEKLİF HATTI
        </div>

        <h4 className="text-xl font-bold font-['Outfit'] mb-2 leading-tight">
          Projeniz İçin Ücretsiz Keşif İster Mısınız?
        </h4>

        <p className="text-gray-300 text-xs font-['Inter'] leading-relaxed mb-6">
          Çatı kaplama, kenet sistemleri veya müstakil villa projeniz için 20 yıllık tecrübemizle
          yerinde ücretsiz metraj analizi yapıyoruz.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setPickerMode('call')}
            className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-full bg-[#D4AF37] text-slate-950 font-bold text-sm hover:bg-[#B89628] transition-colors shadow-md text-center whitespace-nowrap cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="whitespace-nowrap">{primaryLabel} Ara</span>
          </button>

          <button
            type="button"
            onClick={() => setPickerMode('whatsapp')}
            className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors text-center whitespace-nowrap cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.705 1.754zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.001 3.655 3.744-.988z" />
            </svg>
            <span className="whitespace-nowrap">WhatsApp Teklif Al</span>
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
