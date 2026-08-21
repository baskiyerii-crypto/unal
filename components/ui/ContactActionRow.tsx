'use client';

import React, { useState } from 'react';
import { ContactPicker, type ContactPickerMode } from '@/components/ui/ContactPicker';
import {
  type ContactPerson,
  DEFAULT_CONTACT_PERSONS,
  DEFAULT_WHATSAPP_MESSAGE,
  formatPhoneDisplay,
} from '@/lib/utils/contacts';

interface ContactActionRowProps {
  contacts?: ContactPerson[];
  whatsappMessage?: string;
  callLabel?: string;
  whatsappLabel?: string;
}

export function ContactActionRow({
  contacts = DEFAULT_CONTACT_PERSONS,
  whatsappMessage = DEFAULT_WHATSAPP_MESSAGE,
  callLabel,
  whatsappLabel = 'WhatsApp İle Yazın',
}: ContactActionRowProps) {
  const [pickerMode, setPickerMode] = useState<ContactPickerMode | null>(null);
  const primaryLabel = formatPhoneDisplay(contacts[0]?.phone || '05317924006');

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setPickerMode('call')}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D4AF37] text-slate-950 font-bold text-sm hover:bg-[#B89628] transition-colors shadow-lg cursor-pointer"
        >
          {callLabel || `${primaryLabel} Hemen Ara`}
        </button>
        <button
          type="button"
          onClick={() => setPickerMode('whatsapp')}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors cursor-pointer"
        >
          {whatsappLabel}
        </button>
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
