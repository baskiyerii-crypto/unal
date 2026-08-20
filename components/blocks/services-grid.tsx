import React from 'react';
import { ShieldCheck, Wrench, Layers, Droplets, ArrowRight } from 'lucide-react';

interface ServicesGridProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

const serviceItems = [
  {
    icon: Layers,
    title: 'Kenet Çatı Sistemleri',
    description: 'Titanyum-çinko ve alüminyum paneller ile eksiz, uzun ömürlü ve %100 sızdırmaz kenet çatı imalatı ve montajı.',
    features: ['Eksiz Vidalama Tekniği', 'Titanyum Çinko & Alüminyum', 'Estetik ve Modern Mimari'],
    image: '/images/kenet-cati-hero.png',
  },
  {
    icon: Wrench,
    title: 'Çatı Yapımı ve Montajı',
    description: 'Sıfırdan çatı karkas kurulumu, çelik konstrüksiyon, panel kaplama ve ısı yalıtımı imalatı.',
    features: ['Çelik & Ahşap Karkas', 'Sandviç Panel Kaplama', 'Isı ve Ses İzolasyonu'],
    image: '/images/sandvic-panel-cati.png',
  },
  {
    icon: ShieldCheck,
    title: 'Çatı Tadilat ve Onarımı',
    description: 'Eski ve su sızdıran çatıların tespiti, izolasyon yenileme, kırık kiremit/sac değişimi ve acil tamirat.',
    features: ['Su Sızıntı Tespiti', 'İzolasyon ve Membran Yenileme', 'Rüzgar ve Deprem Dayanımı'],
    image: '/images/kenet-cati-detail.png',
  },
  {
    icon: Droplets,
    title: 'Oluk Montajı ve Değişimi',
    description: 'Eksiz çinko, bakır ve galvaniz yağmur suyu oluğu sistemleri montajı, temizliği ve değişimi.',
    features: ['Eksiz Yağmur Oluğu', 'Paslanmaz Çinko & Bakır', 'Yüksek Tahliye Kapasitesi'],
    image: '/images/eksiz-oluk-sistemi.png',
  },
];

export default function ServicesGrid({
  badge = 'Hizmetlerimiz',
  title = 'Uzmanlık Alanlarımız ve Çatı Çözümlerimiz',
  subtitle = 'Ankara, Antalya ve tüm Türkiye\'de kurumsal ve bireysel projeleriniz için garantili çatı yapım, yenileme ve kenet çatı hizmetleri.',
}: ServicesGridProps) {
  return (
    <section id="hizmetler" className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            {badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24292E] tracking-tight">
            {title}
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceItems.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx}
                className="card-custom overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37] transition-all"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-gray-900">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#24292E] via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-6 w-12 h-12 rounded-xl bg-[#24292E] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-[#24292E] group-hover:text-[#D4AF37] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2 pt-2 border-t border-gray-100">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs font-medium text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 flex items-center justify-between">
                  <a 
                    href="#teklif-al" 
                    className="text-xs font-bold text-[#24292E] hover:text-[#D4AF37] flex items-center gap-1 transition-colors mt-4"
                  >
                    <span>Fiyat & Keşif İste</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 mt-4">
                    Garantili İşçilik
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
