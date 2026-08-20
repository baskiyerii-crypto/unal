import type { CollectionConfig } from 'payload';

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Soru',
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Cevap',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Genel Çatı Hizmetleri', value: 'genel' },
        { label: 'Kenet Çatı Avantajları', value: 'kenet-cati' },
        { label: 'Garanti ve Fiyatlandırma', value: 'garanti' },
      ],
      defaultValue: 'genel',
      label: 'Kategori',
    },
  ],
};
