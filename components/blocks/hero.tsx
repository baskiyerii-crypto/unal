'use client';

import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Eye, X, MapPin } from 'lucide-react';

interface HeroProps {
  badge?: string;
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

const heroSlides = [
  {
    image: '/images/projects/proje-01.jpg',
    badge: 'Öne Çıkan Proje',
    tag: '%100 Sızdırmazlık',
    title: 'Titanyum Çinko Kenet Çatı Montajı',
    desc: 'Vidalamasız eksiz kenet dikiş teknolojisi ile paslanmaz ve sızdırmaz çatı kaplama.',
    location: 'Ankara & Antalya',
  },
  {
    image: '/images/projects/proje-03.jpg',
    badge: 'Villa Projesi',
    tag: 'Mimari Çözüm',
    title: 'Modern Mimari Kenet Çatı Kaplama',
    desc: 'Estetik görünüm ve yüksek ısı-su yalıtım performansı sağlayan özel büküm paneller.',
    location: 'Antalya / Alanya',
  },
  {
    image: '/images/projects/proje-04.jpg',
    badge: 'Şantiye Montaj',
    tag: 'Uzman Kadro',
    title: 'Çatı Karkas & Yalıtım Katmanları',
    desc: 'OSB, nem örtüsü ve havalandırma çıtaları ile tam donanımlı alt yapı hazırlığı.',
    location: 'Ankara / OSTİM',
  },
  {
    image: '/images/projects/proje-07.jpg',
    badge: 'Detay İşçilik',
    tag: 'Eksiz Oluk',
    title: 'Eksiz Çinko Oluk ve Tahliye Sistemleri',
    desc: 'Yerinde çekim eksiz oluk imalatı ile sıfır su sızıntısı ve uzun ömürlü kullanım.',
    location: 'Ankara & Antalya',
  },
  {
    image: '/images/projects/proje-10.jpg',
    badge: 'Fabrika & Depo',
    tag: 'Garantili İşçilik',
    title: 'Geniş Metraj Kenet Çatı Sistemleri',
    desc: 'Zorlu hava şartlarına dayanıklı, 50 yılı aşan ömür beklentili endüstriyel çatı çözümleri.',
    location: 'Tüm Türkiye',
  },
];

export default function Hero({
  badge = 'Ankara, Antalya & Tüm Türkiye — 20 Yıllık Uzmanlık',
  title = '50 Yıl Sızdırmazlık Garantili Kenet Çatı & Çatı Çözümleri',
  description = 'Çatınız su sızdırıp yapınıza zarar vermesin! Birinci sınıf titanyum çinko kenet çatı, garantili çatı tadilatı ve eksiz oluk montajında 24 saat içinde ücretsiz keşif ve şeffaf fiyatlandırma.',
  primaryCtaText = 'Ücretsiz Keşif & Fiyat Al',
  primaryCtaLink = '#teklif-al',
  secondaryCtaText = 'Hemen Ara: 0531 792 40 06',
  secondaryCtaLink = 'tel:05317924006',
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (isPaused || isLightboxOpen) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, isLightboxOpen]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const activeSlide = heroSlides[currentSlide];

  return (
    <section className="relative bg-[#24292E] text-white py-16 lg:py-24 overflow-hidden">
      {/* Dynamic Ambient Background Image Slider with Vivid Visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-65 scale-105' : 'opacity-0 scale-100 pointer-events-none'
            }`}
            style={{ transitionProperty: 'opacity, transform', transitionDuration: '1000ms' }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover filter brightness-100 contrast-105"
            />
          </div>
        ))}
        {/* Balanced Dark Gradient Vignette for Text Contrast & High Image Visibility */}
        <div className="absolute inset-0 bg-linear-to-br from-[#1a1d21]/75 via-[#24292E]/60 to-[#1a1d21]/80 backdrop-blur-[1px]" />
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>{badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              {description}
            </p>

            {/* Key Features Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Birinci Sınıf Kenet Sac & Titanyum Çinko</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>%100 Su Yalıtım Garantili Montaj</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Hızlı Keşif & Şeffaf Fiyatlandırma</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Ankara & Antalya Yerinde Müdahale</span>
              </div>
            </div>

            {/* CTA Buttons & Trust Micro-Copy */}
            <div className="pt-4 space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href={primaryCtaLink} className="btn-accent text-sm w-full sm:w-auto text-center flex items-center justify-center gap-2 shadow-lg hover:shadow-[#D4AF37]/20 transition-all font-bold py-3.5 px-6 whitespace-nowrap shrink-0">
                  <span className="whitespace-nowrap">{primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
                <a href={secondaryCtaLink} className="btn-primary border border-gray-600 hover:border-[#D4AF37] text-sm w-full sm:w-auto text-center flex items-center justify-center gap-2 py-3.5 px-6 whitespace-nowrap shrink-0">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="whitespace-nowrap">{secondaryCtaText}</span>
                </a>
              </div>
              <div className="text-xs text-gray-400 font-medium flex items-center justify-center lg:justify-start gap-2 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <span className="whitespace-nowrap">✓ %100 Yazılı İşçilik Garantisi | 24 Saatte Keşif Randevusu</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Project Carousel Slider with Lightbox Click */}
          <div className="lg:col-span-5">
            <div 
              className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-gray-700/60 shadow-2xl group bg-[#1a1d21] cursor-pointer"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onClick={() => setIsLightboxOpen(true)}
            >
              {/* Image Container with Crossfade effect */}
              <div className="relative h-95 sm:h-105 w-full overflow-hidden">
                {heroSlides.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#1a1d21] via-[#24292E]/60 to-transparent" />
                  </div>
                ))}
              </div>

              {/* Hover Zoom Badge Hint */}
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="bg-[#D4AF37] text-[#24292E] font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                  <Eye className="w-3.5 h-3.5" />
                  Tam Ekran İncele
                </span>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                aria-label="Önceki Proje"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#24292E]/80 border border-white/20 text-white flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#24292E] transition-all shadow-lg backdrop-blur-md opacity-80 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Sonraki Proje"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#24292E]/80 border border-white/20 text-white flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#24292E] transition-all shadow-lg backdrop-blur-md opacity-80 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Content Card Overlay */}
              <div className="absolute bottom-0 inset-x-0 z-20 p-5 sm:p-6 space-y-2.5 bg-linear-to-t from-[#1a1d21] via-[#1a1d21]/90 to-transparent backdrop-blur-[2px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#D4AF37] bg-[#24292E]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/30 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    {activeSlide.badge}
                  </span>
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-400 font-semibold px-2.5 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md">
                    {activeSlide.tag}
                  </span>
                </div>

                <h3 className="font-extrabold text-white text-base sm:text-lg leading-tight transition-all">
                  {activeSlide.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {activeSlide.desc}
                </p>

                {/* Bottom Bar: Location & Slide Dots */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                  <span className="font-medium text-gray-400">{activeSlide.location}</span>

                  {/* Indicator Dots */}
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Slayt ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentSlide
                            ? 'w-6 bg-[#D4AF37]'
                            : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Hero Lightbox Fullscreen Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative bg-[#24292E] text-white rounded-2xl max-w-4xl w-full overflow-hidden border border-gray-700 shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Kapat"
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#24292E] transition-all border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev / Next Modal Arrows */}
            <button
              onClick={(e) => handlePrev(e)}
              aria-label="Önceki Slayt"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/70 border border-white/30 text-white flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#24292E] transition-all shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => handleNext(e)}
              aria-label="Sonraki Slayt"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/70 border border-white/30 text-white flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#24292E] transition-all shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
              {/* Modal Image */}
              <div className="md:col-span-7 bg-black flex items-center justify-center min-h-80 md:min-h-115">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="w-full h-full object-contain max-h-130"
                />
              </div>

              {/* Modal Details Panel */}
              <div className="md:col-span-5 p-6 space-y-5 flex flex-col justify-between bg-[#1a1d21]">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-extrabold text-[#D4AF37] bg-[#24292E] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                      {activeSlide.badge}
                    </span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 font-semibold px-2.5 py-1 rounded-full border border-emerald-500/30">
                      {activeSlide.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white leading-tight">
                    {activeSlide.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-semibold">{activeSlide.location}</span>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed pt-2 border-t border-gray-800">
                    {activeSlide.desc}
                  </p>
                </div>

                {/* Modal CTA Buttons */}
                <div className="pt-4 border-t border-gray-800 space-y-3">
                  <a
                    href="#teklif-al"
                    onClick={() => setIsLightboxOpen(false)}
                    className="btn-accent text-xs w-full text-center flex items-center justify-center gap-2 py-3 whitespace-nowrap"
                  >
                    <span className="whitespace-nowrap">Bu Proje İçin Fiyat Alın</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </a>
                  <a
                    href="tel:05317924006"
                    className="btn-primary border border-gray-600 hover:border-[#D4AF37] text-xs w-full text-center flex items-center justify-center gap-2 py-2.5 whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="whitespace-nowrap">0531 792 40 06 — Hemen Ara</span>
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


