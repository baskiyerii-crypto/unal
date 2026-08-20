import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ShieldCheck, MessageCircle } from 'lucide-react';

interface FooterProps {
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  workingHours?: string;
}

export function Footer({
  phone = '05317924006',
  whatsapp = '05317924006',
  email = 'menakyapi@gmail.com',
  address = 'Şehitler caddesi Selahattin Ecevit sokak 36/3 Mamak Ankara',
  workingHours = 'Hafta içi 08:00 - 17:00',
}: FooterProps) {
  const formattedPhone = phone.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
  const whatsappClean = whatsapp.replace(/^0/, '');

  return (
    <footer className="bg-[#24292E] text-white pt-16 pb-8 border-t-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-gray-700/60">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37] text-[#24292E] flex items-center justify-center font-bold text-xl">
                M
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                MENAK<span className="text-[#D4AF37]">YAPI</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ankara, Antalya ve Türkiye genelinde kenet çatı sistemleri, çatı montajı, oluk değişimi ve çatı tadilat hizmetlerinde 20 yıllık tecrübe.
            </p>
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantili İşçilik & Birinci Sınıf Malzeme</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-[#D4AF37]">Hizmetlerimiz</h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/#hizmetler" className="hover:text-[#D4AF37] transition-colors">
                  Kenet Çatı Sistemleri
                </Link>
              </li>
              <li>
                <Link href="/#hizmetler" className="hover:text-[#D4AF37] transition-colors">
                  Çatı Yapımı ve Montajı
                </Link>
              </li>
              <li>
                <Link href="/#hizmetler" className="hover:text-[#D4AF37] transition-colors">
                  Çatı Tadilat ve Onarımı
                </Link>
              </li>
              <li>
                <Link href="/#hizmetler" className="hover:text-[#D4AF37] transition-colors">
                  Oluk Montajı ve Değişimi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-[#D4AF37]">İletişim Bilgileri</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-white font-medium">
                  {formattedPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`https://wa.me/90${whatsappClean}`} target="_blank" rel="noreferrer" className="hover:text-emerald-400 font-medium">
                  WhatsApp: {formattedPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours & CTA */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-[#D4AF37]">Çalışma Saatleri</h3>
            <div className="flex items-center gap-3 text-sm text-gray-300 bg-gray-800/60 p-3 rounded-lg border border-gray-700">
              <Clock className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <div>
                <div className="font-medium text-white">Mesai Saatlerimiz</div>
                <div className="text-xs text-gray-400">{workingHours}</div>
              </div>
            </div>
            <div className="pt-2">
              <a href="#teklif-al" className="btn-accent w-full block text-center text-xs">
                Ücretsiz Keşif İste
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} MenakYapı Çatı Sistemleri. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="/kvkk" className="hover:text-gray-300">
              KVKK Aydınlatma Metni
            </Link>
            <Link href="/gizlilik" className="hover:text-gray-300">
              Gizlilik Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
