'use client';

import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck } from 'lucide-react';
import {
  type ContactPerson,
  DEFAULT_CONTACT_PERSONS,
  DEFAULT_WHATSAPP_MESSAGE,
  formatPhoneDisplay,
  toTelHref,
  toWhatsAppHref,
} from '@/lib/utils/contacts';

interface ContactCtaBlockProps {
  title?: string;
  description?: string;
  contacts?: ContactPerson[];
  whatsappMessage?: string;
  address?: string;
  workingHours?: string;
}

export default function ContactCtaBlock({
  title = 'Çatınızda Sorun mu Var? Bekledikçe Maliyet Büyümesin!',
  description = 'Erken müdahale ile su sızıntısı ve yapısal hasarın önüne geçin. Uzman ekibimiz adresinize gelip çatı durumunu incelesin, 24 saat içinde sürprizsiz net fiyat teklifinizi sunsun.',
  contacts = DEFAULT_CONTACT_PERSONS,
  whatsappMessage = DEFAULT_WHATSAPP_MESSAGE,
  address = 'Şehitler caddesi Selahattin Ecevit sokak 36/3 Mamak / Ankara',
  workingHours = 'Hafta içi 08:00 - 17:00',
}: ContactCtaBlockProps) {
  return (
    <section id="iletisim" className="py-16 bg-[#24292E] text-white border-y border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-r from-gray-800 to-[#24292E] p-8 sm:p-12 rounded-2xl border border-gray-700 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Hızlı Keşif & 24 Saatte Fiyat Garantisi</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {title}
                </h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{description}</p>

                <div className="pt-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {contacts.map((person) => (
                      <div
                        key={`cta-${person.name}-${person.phone}`}
                        className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-2"
                      >
                        <p className="text-xs font-bold text-[#D4AF37]">{person.name}</p>
                        <p className="text-sm font-extrabold text-white">
                          {formatPhoneDisplay(person.phone)}
                        </p>
                        <div className="flex flex-col gap-2">
                          <a
                            href={toTelHref(person.phone)}
                            className="btn-accent text-xs text-center flex items-center justify-center gap-2 font-bold py-2.5 px-3 whitespace-nowrap"
                          >
                            <Phone className="w-3.5 h-3.5 shrink-0 text-[#24292E]" />
                            Ara
                          </a>
                          <a
                            href={toWhatsAppHref(person.phone, whatsappMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-2.5 rounded-full transition-all flex items-center justify-center gap-2"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-emerald-400 font-medium pt-1 text-center lg:text-left">
                    ⚡ 30 Dakika İçinde Yanıt & Ücretsiz Yerinde Keşif
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
                <div className="flex items-start gap-3 text-xs text-gray-300">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white mb-0.5">Merkez Adresimiz</div>
                    <div>{address}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-300 border-t border-white/10 pt-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <div>
                    <span className="font-bold text-white">Çalışma Saatleri: </span>
                    <span>{workingHours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
