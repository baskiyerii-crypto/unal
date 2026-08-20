import type { Block } from 'payload';

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Banner',
    plural: 'Hero Banners',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Üst Rozet / Etiket (Örn: Ankara & Antalya Çatı Sistemleri)',
      defaultValue: 'Ankara, Antalya ve Tüm Türkiye Çatı Sistemleri',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Ana Başlık (H1)',
      required: true,
      defaultValue: 'Dayanıklı Kenet Çatı ve Profesyonel Çatı Çözümleri',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Açıklama Metni',
      defaultValue: '20 yıllık tecrübe ve 15 kişilik uzman ekibimizle kenet çatı montajı, tadilat, oluk değişimi ve çatı yapımında kesintisiz hizmet sunuyoruz.',
    },
    {
      name: 'primaryCtaText',
      type: 'text',
      label: 'Birincil Buton Yazısı',
      defaultValue: 'Ücretsiz Teklif Al',
    },
    {
      name: 'primaryCtaLink',
      type: 'text',
      label: 'Birincil Buton Linki',
      defaultValue: '#teklif-al',
    },
    {
      name: 'secondaryCtaText',
      type: 'text',
      label: 'İkincil Buton Yazısı (Tıkla Ara)',
      defaultValue: 'Hemen Ara: 0531 792 40 06',
    },
    {
      name: 'secondaryCtaLink',
      type: 'text',
      label: 'İkincil Buton Linki',
      defaultValue: 'tel:05317924006',
    },
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Arkaplan Görseli',
    },
  ],
};
