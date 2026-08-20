import React from 'react';
import Hero from '@/components/blocks/hero';
import StatsBlock from '@/components/blocks/stats-block';
import ServicesGrid from '@/components/blocks/services-grid';
import GalleryBlock from '@/components/blocks/gallery-block';
import ContactCtaBlock from '@/components/blocks/contact-cta-block';
import FormBlock from '@/components/blocks/form-block';
import { getSiteSettings } from '@/lib/payload/getSiteSettings';

export const revalidate = 60; // ISR 60 seconds

export default async function HomePage() {
  const settings = await getSiteSettings();

  const phone = settings?.phone || '05317924006';
  const formattedPhone = phone.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
  const whatsapp = settings?.whatsapp || '05317924006';
  const formattedWhatsapp = whatsapp.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');

  return (
    <>
      {/* Hero Section */}
      <Hero 
        badge="Ankara, Antalya ve Tüm Türkiye Çatı Sistemleri"
        title="Dayanıklı Kenet Çatı ve Profesyonel Çatı Çözümleri"
        description="20 yıllık tecrübe ve 15 kişilik uzman ekibimizle kenet çatı montajı, tadilat, oluk değişimi ve çatı yapımında kesintisiz hizmet sunuyoruz."
        primaryCtaText="Ücretsiz Teklif Al"
        primaryCtaLink="#teklif-al"
        secondaryCtaText={`Hemen Ara: ${formattedPhone}`}
        secondaryCtaLink={`tel:${phone}`}
      />

      {/* Corporate Trust & Statistics */}
      <StatsBlock 
        title="Rakamlarla MenakYapı Güvencesi"
      />

      {/* Core Services Grid */}
      <ServicesGrid 
        badge="Hizmetlerimiz"
        title="Uzmanlık Alanlarımız ve Çatı Çözümlerimiz"
        subtitle="Ankara, Antalya ve tüm Türkiye'de kurumsal ve bireysel projeleriniz için garantili çatı yapım, yenileme ve kenet çatı hizmetleri."
      />

      {/* Portfolio & Project Showcase Gallery */}
      <GalleryBlock 
        title="Tamamlanan Çatı ve Yapı Projelerimiz"
        subtitle="Ankara, Antalya ve Türkiye genelinde teslim ettiğimiz kenet çatı ve tadilat projelerimizden örnekler."
      />

      {/* Contact Call to Action */}
      <ContactCtaBlock 
        title="Çatınız İçin Hemen Ücretsiz Keşif ve Fiyat Alın"
        description="Uzman ekibimiz adresinize gelerek çatı durumunu inceler, ihtiyaçları belirler ve en uygun bütçeli teklifi hazırlar."
        phoneHighlight={formattedPhone}
        whatsappHighlight={formattedWhatsapp}
      />

      {/* Interactive Form Block */}
      <FormBlock 
        title="Hızlı Teklif Formu"
        description="Çatı ihtiyacınızı bildirin, uzman ekibimiz 30 dakika içinde sizinle iletişime geçsin."
      />
    </>
  );
}

