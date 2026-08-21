'use client';

import React, { useEffect } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import {
  type ContactPerson,
  formatPhoneDisplay,
  toTelHref,
  toWhatsAppHref,
  DEFAULT_WHATSAPP_MESSAGE,
} from '@/lib/utils/contacts';

export type ContactPickerMode = 'call' | 'whatsapp';

interface ContactPickerProps {
  contacts: ContactPerson[];
  mode: ContactPickerMode | null;
  onClose: () => void;
  whatsappMessage?: string;
}

export function ContactPicker({
  contacts,
  mode,
  onClose,
  whatsappMessage = DEFAULT_WHATSAPP_MESSAGE,
}: ContactPickerProps) {
  useEffect(() => {
    if (!mode) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mode, onClose]);

  if (!mode || contacts.length === 0) return null;

  const isCall = mode === 'call';
  const title = isCall ? 'Kimi aramak istersiniz?' : 'WhatsApp ile kime yazmak istersiniz?';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-picker-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        aria-label="Kapat"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
        <div
          className={`px-5 py-4 flex items-start justify-between gap-3 ${
            isCall ? 'bg-[#24292E] text-white' : 'bg-emerald-600 text-white'
          }`}
        >
          <div>
            <p id="contact-picker-title" className="font-bold text-base">
              {title}
            </p>
            <p className="text-xs opacity-80 mt-0.5">İsim ve numaraya tıklayın</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-white/15 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ul className="p-3 space-y-2">
          {contacts.map((person) => {
            const href = isCall
              ? toTelHref(person.phone)
              : toWhatsAppHref(person.phone, whatsappMessage);

            return (
              <li key={`${person.name}-${person.phone}`}>
                <a
                  href={href}
                  {...(isCall
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                  onClick={onClose}
                  className={`flex items-center gap-3 w-full rounded-xl px-4 py-3.5 border transition-all ${
                    isCall
                      ? 'border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10'
                      : 'border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      isCall
                        ? 'bg-[#24292E] text-[#D4AF37]'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {isCall ? (
                      <Phone className="w-5 h-5" />
                    ) : (
                      <MessageCircle className="w-5 h-5" />
                    )}
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block font-bold text-[#24292E] text-sm truncate">
                      {person.name}
                    </span>
                    <span className="block text-xs text-gray-500 mt-0.5 font-medium">
                      {formatPhoneDisplay(person.phone)}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
