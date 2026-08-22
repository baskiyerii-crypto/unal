'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, ShieldCheck, Menu, X } from 'lucide-react';
import {
  type ContactPerson,
  DEFAULT_CONTACT_PERSONS,
  DEFAULT_WHATSAPP_MESSAGE,
  formatPhoneDisplay,
  toTelHref,
  toWhatsAppHref,
} from '@/lib/utils/contacts';

interface HeaderProps {
  contacts?: ContactPerson[];
  whatsappMessage?: string;
}

export function Header({
  contacts = DEFAULT_CONTACT_PERSONS,
  whatsappMessage = DEFAULT_WHATSAPP_MESSAGE,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Anasayfa' },
    { href: '/#hizmetler', label: 'Hizmetlerimiz' },
    { href: '/#projeler', label: 'Projelerimiz' },
    { href: '/blog', label: 'Blog & Rehber' },
    { href: '/#iletisim', label: 'İletişim' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
        <div className="bg-[#24292E] text-white text-xs py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-gray-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                20 Yıllık Tecrübe &amp; Garantili Çatı İşçiliği
              </span>
              <span className="hidden md:inline text-gray-500">|</span>
              <span className="hidden md:inline text-gray-300">Ankara • Antalya • Tüm Türkiye</span>
            </div>
            <div className="flex items-center gap-3 font-medium flex-wrap justify-center">
              {contacts.map((person) => (
                <a
                  key={`header-tel-${person.name}-${person.phone}`}
                  href={toTelHref(person.phone)}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  <Phone className="w-3 h-3 text-[#D4AF37] shrink-0" />
                  <span className="whitespace-nowrap">
                    {person.name} · {formatPhoneDisplay(person.phone)}
                  </span>
                </a>
              ))}
              <span className="text-gray-500 hidden sm:inline">|</span>
              {contacts.map((person) => (
                <a
                  key={`header-wa-${person.name}-${person.phone}`}
                  href={toWhatsAppHref(person.phone, whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                  {person.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#24292E] text-[#D4AF37] flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-[#24292E]">
                  MENAK<span className="text-[#D4AF37]">YAPI</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-500">
                  Çatı Sistemleri
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[#24292E]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 shrink-0">
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {contacts.map((person) => (
                <a
                  key={`header-cta-${person.name}-${person.phone}`}
                  href={toTelHref(person.phone)}
                  className="flex items-center gap-1.5 btn-primary text-[11px] whitespace-nowrap px-3 py-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="flex flex-col items-start leading-tight">
                    <span className="font-bold">{person.name}</span>
                    <span className="opacity-90">{formatPhoneDisplay(person.phone)}</span>
                  </span>
                </a>
              ))}
            </div>
              <a href="#teklif-al" className="btn-accent text-xs whitespace-nowrap shrink-0">
                Teklif Al
              </a>
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-[#24292E] hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none cursor-pointer"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#24292E]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#24292E]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-[#24292E] hover:bg-gray-50 hover:text-[#D4AF37] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-100 flex flex-col gap-2">
                {contacts.map((person) => (
                  <a
                    key={`header-mobile-tel-${person.name}-${person.phone}`}
                    href={toTelHref(person.phone)}
                    className="flex items-center justify-center gap-2 btn-primary text-xs w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {person.name} · {formatPhoneDisplay(person.phone)}
                  </a>
                ))}
                {contacts.map((person) => (
                  <a
                    key={`header-mobile-wa-${person.name}-${person.phone}`}
                    href={toWhatsAppHref(person.phone, whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-full transition-all w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp · {person.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
