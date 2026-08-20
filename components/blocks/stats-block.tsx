import React from 'react';
import { Award, Users, Building2, Wrench } from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
}

interface StatsBlockProps {
  title?: string;
  items?: StatItem[];
}

const defaultItems: StatItem[] = [
  { value: '20 Yıl', label: 'Sektörel Tecrübe ve Deneyim' },
  { value: '500+', label: 'Tamamlanan Mutlu Müşteri Projesi' },
  { value: '15 Uzman', label: 'Sertifikalı Çatı Ustası ve Ekip' },
  { value: '%100', label: 'Garantili Su ve Isı Yalıtımı' },
];

export default function StatsBlock({
  title = 'Rakamlarla MenakYapı Güvencesi',
  items = defaultItems,
}: StatsBlockProps) {
  const icons = [Award, Building2, Users, Wrench];

  return (
    <section className="py-12 bg-white border-y border-gray-200 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-center text-sm uppercase tracking-widest text-[#D4AF37] font-bold mb-8">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#D4AF37]/40 transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-[#24292E] text-[#D4AF37] flex items-center justify-center mb-3">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#24292E] tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
