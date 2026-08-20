import type { Block } from 'payload';

export const FormBlock: Block = {
  slug: 'form-block',
  labels: {
    singular: 'Form Bloğu (Teklif Al)',
    plural: 'Form Blokları',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Form Başlığı',
      defaultValue: 'Hızlı Teklif Formu',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Form Açıklaması',
      defaultValue: 'İhtiyacınızı ve iletişim bilgilerinizi iletin, 30 dakika içinde sizi arayalım.',
    },
  ],
};
