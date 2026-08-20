import type { CollectionConfig } from 'payload';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      label: 'Müşteri Adı / Firma',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Lokasyon (Örn: Antalya / Alanya)',
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      label: 'Müşteri Yorumu',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      label: 'Puan (1-5 Yıldız)',
    },
  ],
};
