import type { Block } from 'payload';

export const ServicesGridBlock: Block = {
  slug: 'services-grid',
  labels: {
    singular: 'Hizmetler Bloğu',
    plural: 'Hizmet Blokları',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Rozet (Örn: Hizmetlerimiz)',
      defaultValue: 'Hizmetlerimiz',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Bölüm Başlığı',
      defaultValue: 'Uzmanlık Alanlarımız ve Çatı Sistemleri',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Alt Açıklama Metni',
      defaultValue: 'Kenet çatı montajından oluk değişimine kadar tüm çatı ihtiyaçlarınızda kaliteli malzeme ve garantili işçilik.',
    },
  ],
};
