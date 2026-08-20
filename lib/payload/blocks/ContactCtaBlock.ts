import type { Block } from 'payload';

export const ContactCtaBlock: Block = {
  slug: 'contact-cta-block',
  labels: {
    singular: 'İletişim CTA Bloğu',
    plural: 'İletişim CTA Blokları',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Bölüm Başlığı',
      defaultValue: 'Çatınız İçin Hemen Ücretsiz Keşif ve Fiyat Alın',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Açıklama Metni',
      defaultValue: 'Uzman ekibimiz adresinize gelerek çatı durumunu inceler ve en uygun teklifi hazırlar.',
    },
    {
      name: 'phoneHighlight',
      type: 'text',
      label: 'Telefon Numarası',
      defaultValue: '0531 792 40 06',
    },
    {
      name: 'whatsappHighlight',
      type: 'text',
      label: 'WhatsApp Numarası',
      defaultValue: '0531 792 40 06',
    },
  ],
};
