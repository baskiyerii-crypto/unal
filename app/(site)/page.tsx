import React from 'react';
import Hero from '@/components/blocks/hero';
import StatsBlock from '@/components/blocks/stats-block';
import ServicesGrid from '@/components/blocks/services-grid';
import GalleryBlock from '@/components/blocks/gallery-block';
import ContactCtaBlock from '@/components/blocks/contact-cta-block';
import FormBlock from '@/components/blocks/form-block';
import { getSiteSettings } from '@/lib/payload/getSiteSettings';
import {
  DEFAULT_WHATSAPP_MESSAGE,
  formatPhoneDisplay,
  resolveContactPersons,
  toTelHref,
} from '@/lib/utils/contacts';

export const revalidate = 60;

export default async function HomePage() {
  const settings = await getSiteSettings();
  const contacts = resolveContactPersons(settings);
  const primaryPhone = contacts[0]?.phone || '05317924006';
  const formattedPhone = formatPhoneDisplay(primaryPhone);
  const whatsappMessage = settings?.whatsappMessage || DEFAULT_WHATSAPP_MESSAGE;
  const address =
    settings?.address || 'Şehitler caddesi Selahattin Ecevit sokak 36/3 Mamak / Ankara';
  const workingHours = settings?.workingHours || 'Hafta içi 08:00 - 17:00';

  return (
    <>
      <Hero
        badge="Ankara, Antalya ve Tüm Türkiye Çatı Sistemleri"
        title="Dayanıklı Kenet Çatı ve Profesyonel Çatı Çözümleri"
        description="20 yıllık tecrübe ve 15 kişilik uzman ekibimizle kenet çatı montajı, tadilat, oluk değişimi ve çatı yapımında kesintisiz hizmet sunuyoruz."
        primaryCtaText="Ücretsiz Teklif Al"
        primaryCtaLink="#teklif-al"
        secondaryCtaText={`Hemen Ara: ${formattedPhone}`}
        secondaryCtaLink={toTelHref(primaryPhone)}
      />

      <StatsBlock title="Rakamlarla MenakYapı Güvencesi" />

      <ServicesGrid
        badge="Hizmetlerimiz"
        title="Uzmanlık Alanlarımız ve Çatı Çözümlerimiz"
        subtitle="Ankara, Antalya ve tüm Türkiye'de kurumsal ve bireysel projeleriniz için garantili çatı yapım, yenileme ve kenet çatı hizmetleri."
      />

      <GalleryBlock
        title="Tamamlanan Çatı ve Yapı Projelerimiz"
        subtitle="Ankara, Antalya ve Türkiye genelinde teslim ettiğimiz kenet çatı ve tadilat projelerimizden örnekler."
      />

      <ContactCtaBlock
        title="Çatınız İçin Hemen Ücretsiz Keşif ve Fiyat Alın"
        description="Uzman ekibimiz adresinize gelerek çatı durumunu inceler, ihtiyaçları belirler ve en uygun bütçeli teklifi hazırlar."
        contacts={contacts}
        whatsappMessage={whatsappMessage}
        address={address}
        workingHours={workingHours}
      />

      <FormBlock />
    </>
  );
}
