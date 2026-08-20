'use client';

import React, { useState } from 'react';
import { Camera, MapPin, CheckCircle, Eye, X, Phone, ArrowRight, Filter } from 'lucide-react';

interface GalleryBlockProps {
  title?: string;
  subtitle?: string;
}

const CATEGORIES = [
  'Hepsi',
  'Kenet Çatı',
  'Eksiz Oluk',
  'Çatı Tadilat & İzolasyon',
  'Yapı & Karkas',
] as const;

type Category = (typeof CATEGORIES)[number];

interface ProjectItem {
  id: number;
  title: string;
  category: Category;
  location: string;
  tag: string;
  desc: string;
  image: string;
}

const galleryProjects: ProjectItem[] = [
  {
    id: 1,
    title: 'Titanyum Çinko Kenet Çatı Montajı',
    category: 'Kenet Çatı',
    location: 'Ankara / Mamak',
    tag: '650m² Kaplama',
    desc: 'Vidalamasız eksiz kenet dikiş teknolojisi ile sıfır su sızıntısı sağlayan yüksek dayanımlı çatı kaplama projesi.',
    image: '/images/projects/proje-01.jpg',
  },
  {
    id: 2,
    title: 'Çatı Büküm Detayı & Kenet Profil Birleşimi',
    category: 'Kenet Çatı',
    location: 'Antalya / Kepez',
    tag: 'Özel Kenet Büküm',
    desc: 'Bina mimarisine özel yerinde kenet paneli bükümü ve hassas birleşim işçiliği.',
    image: '/images/projects/proje-02.jpg',
  },
  {
    id: 3,
    title: 'Lüks Villa Kenet Çatı Kaplama',
    category: 'Kenet Çatı',
    location: 'Antalya / Alanya',
    tag: '%100 Su Sızdırmaz',
    desc: 'Zorlu deniz iklimine ve korozyona dayanıklı alüminyum kenet sac kaplama uygulaması.',
    image: '/images/projects/proje-03.jpg',
  },
  {
    id: 4,
    title: 'Şantiye Çatı Karkas & Izgara Hazırlığı',
    category: 'Yapı & Karkas',
    location: 'Ankara / OSTİM',
    tag: 'Çelik-Ahşap Karkas',
    desc: 'Kenet çatı kaplaması öncesi projeye uygun dayanıklı karkas, nem örtüsü ve altyapı hazırlığı.',
    image: '/images/projects/proje-04.jpg',
  },
  {
    id: 5,
    title: 'Eksiz Oluk & Çinko İzolasyon Montajı',
    category: 'Eksiz Oluk',
    location: 'Antalya / Muratpaşa',
    tag: 'Yerinde İmalat Oluk',
    desc: 'Mobil araçlarımızla yerinde çekilen ek yeri olmayan çinko eksiz oluk montajı.',
    image: '/images/projects/proje-05.jpg',
  },
  {
    id: 6,
    title: 'Kenet Çatı Dikiş & Panel İmalatı',
    category: 'Kenet Çatı',
    location: 'Ankara / Sincan',
    tag: 'Özel Metraj Büküm',
    desc: 'Çatı boyunca eksiz uzunlukta tek parça çekilen kenet paneller ile estetik görünüm.',
    image: '/images/projects/proje-06.jpg',
  },
  {
    id: 7,
    title: 'Çinko Eksiz Oluk ve Yağmur İniş Boruları',
    category: 'Eksiz Oluk',
    location: 'Antalya / Kemer',
    tag: 'Garantili Oluk',
    desc: 'Şiddetli yağışlara dayanıklı, taşmayı önleyen geniş kesitli eksiz oluk montajı.',
    image: '/images/projects/proje-07.jpg',
  },
  {
    id: 8,
    title: 'Villa Çatı İzolasyon ve Kenet Kaplama',
    category: 'Çatı Tadilat & İzolasyon',
    location: 'Ankara / Çankaya',
    tag: 'Taşyünü Yalıtım',
    desc: 'Taşyünü ses ve ısı yalıtımı ile desteklenmiş uzun ömürlü çatı yenileme çalışması.',
    image: '/images/projects/proje-08.jpg',
  },
  {
    id: 9,
    title: 'Endüstriyel Tesis Kenet Çatı Yenileme',
    category: 'Kenet Çatı',
    location: 'Ankara / Kahramankazan',
    tag: '1200m² Sanayi Çatısı',
    desc: 'Fabrika ve depo binaları için fırtına ile rüzgara maksimum direnç gösteren kenet çatı çözümü.',
    image: '/images/projects/proje-09.jpg',
  },
  {
    id: 10,
    title: 'Çatı Büküm İşçiliği & Kenet Kenar Detayı',
    category: 'Kenet Çatı',
    location: 'Antalya / Serik',
    tag: 'Titanyum Kenet',
    desc: 'Saçak ve mahya detaylarında su sızıntısını sıfıra indiren kenet büküm işçiliği.',
    image: '/images/projects/proje-10.jpg',
  },
  {
    id: 11,
    title: 'Ahşap Konstrüksiyon & Çatı Karkas Hazırlığı',
    category: 'Yapı & Karkas',
    location: 'Ankara / Gölbaşı',
    tag: 'Emprenyeli Karkas',
    desc: 'Nem ve kurtsuzlaşmaya karşı korumalı ahşap karkas ile güçlü çatı taşıyıcı sistemi.',
    image: '/images/projects/proje-11.jpg',
  },
  {
    id: 12,
    title: 'Çatı Havalandırma & Sızdırmaz Kenet Detayı',
    category: 'Çatı Tadilat & İzolasyon',
    location: 'Antalya / Manavgat',
    tag: 'Nem Örtüsü & Çıta',
    desc: 'Çatı altında yoğuşmayı engelleyen nefes alan buhar dengeleyici membrane uygulaması.',
    image: '/images/projects/proje-12.jpg',
  },
  {
    id: 13,
    title: 'Kenet Sac Kaplama & Detay İşçiliği',
    category: 'Kenet Çatı',
    location: 'Ankara / Yenimahalle',
    tag: 'Vida Deliğisiz Montaj',
    desc: 'Güneş, kar ve dolu yüküne karşı tam koruma sağlayan eksiz kenet klips montajı.',
    image: '/images/projects/proje-13.jpg',
  },
  {
    id: 14,
    title: 'Eksiz Oluk Birleşim & Çatı Tamirat Projesi',
    category: 'Eksiz Oluk',
    location: 'Antalya / Konyaaltı',
    tag: 'Tamirat & Değişim',
    desc: 'Eski ve su akıtan olukların sökülerek dekoratif eksiz çinko oluklar ile yenilenmesi.',
    image: '/images/projects/proje-14.jpg',
  },
];

export default function GalleryBlock({
  title = 'Tamamlanan Çatı ve Yapı Projelerimiz',
  subtitle = 'Ankara, Antalya ve Türkiye genelinde başarıyla teslim ettiğimiz 14 adet kenet çatı, eksiz oluk ve tadilat projemiz.',
}: GalleryBlockProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Hepsi');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filteredProjects = selectedCategory === 'Hepsi'
    ? galleryProjects
    : galleryProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projeler" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-gray-200 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              <Camera className="w-4 h-4" />
              <span>Gerçek Şantiye & Proje Galerimiz</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#24292E] tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl">
              {subtitle}
            </p>
          </div>
          <a href="#teklif-al" className="btn-primary text-xs shrink-0 flex items-center gap-2">
            <span>Kendi Projeniz İçin Teklif Alın</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </a>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <div className="flex items-center gap-1.5 pr-2 text-xs font-semibold text-gray-400 uppercase tracking-wider shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtrele:</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#24292E] text-[#D4AF37] shadow-md border border-[#D4AF37]/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#24292E]'
              }`}
            >
              {cat}
              {cat === 'Hepsi' && ` (${galleryProjects.length})`}
              {cat !== 'Hepsi' && ` (${galleryProjects.filter((p) => p.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((proj) => (
            <div 
              key={proj.id}
              onClick={() => setActiveModalProject(proj)}
              className="card-custom overflow-hidden group hover:border-[#D4AF37] transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl bg-white border border-gray-200"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-gray-900">
                <img 
                  src={proj.image} 
                  alt={proj.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-95 group-hover:opacity-100" 
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-[#24292E]/90 text-[#D4AF37] backdrop-blur-md border border-[#D4AF37]/30 shadow">
                    {proj.category}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-[10px] bg-emerald-500/90 text-white font-semibold px-2 py-0.5 rounded shadow flex items-center gap-1 backdrop-blur-md">
                    <CheckCircle className="w-3 h-3" />
                    Teslim
                  </span>
                </div>

                {/* Hover Overlay Icon */}
                <div className="absolute inset-0 bg-[#24292E]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-[#D4AF37] text-[#24292E] font-bold text-xs px-3.5 py-2 rounded-full flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-4 h-4" />
                    Büyüt & İncele
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-[#24292E] text-base group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {proj.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{proj.location}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-medium">
                  <span className="text-gray-400">Özel Detay:</span>
                  <span className="font-bold text-[#24292E] bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                    {proj.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Preview Modal */}
      {activeModalProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all"
          onClick={() => setActiveModalProject(null)}
        >
          <div 
            className="relative bg-[#24292E] text-white rounded-2xl max-w-4xl w-full overflow-hidden border border-gray-700 shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              aria-label="Kapat"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#24292E] transition-all border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
              {/* Modal Image */}
              <div className="md:col-span-7 bg-black flex items-center justify-center min-h-75 md:min-h-112.5">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-contain max-h-125"
                />
              </div>

              {/* Modal Details Panel */}
              <div className="md:col-span-5 p-6 space-y-5 flex flex-col justify-between bg-[#1a1d21]">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-extrabold text-[#D4AF37] bg-[#24292E] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                      {activeModalProject.category}
                    </span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 font-semibold px-2.5 py-1 rounded-full border border-emerald-500/30">
                      Tamamlanan Proje
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white leading-tight">
                    {activeModalProject.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-semibold">{activeModalProject.location}</span>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed pt-2 border-t border-gray-800">
                    {activeModalProject.desc}
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#24292E] border border-gray-700/60 space-y-1">
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Öne Çıkan Özellik</div>
                    <div className="text-sm font-extrabold text-[#D4AF37]">{activeModalProject.tag}</div>
                  </div>
                </div>

                {/* Modal CTA Buttons */}
                <div className="pt-4 border-t border-gray-800 space-y-3">
                  <a
                    href="#teklif-al"
                    onClick={() => setActiveModalProject(null)}
                    className="btn-accent text-xs w-full text-center flex items-center justify-center gap-2 py-3"
                  >
                    <span>Benzer Proje İçin Teklif Alın</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="tel:05317924006"
                    className="btn-primary border border-gray-600 hover:border-[#D4AF37] text-xs w-full text-center flex items-center justify-center gap-2 py-2.5"
                  >
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <span>0531 792 40 06 — Hemen Ara</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
