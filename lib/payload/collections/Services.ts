import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Hizmet Adı',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
    },
    {
      name: 'shortSummary',
      type: 'textarea',
      required: true,
      label: 'Kısa Özet (Kart Görünümü)',
    },
    {
      name: 'fullDescription',
      type: 'richText',
      label: 'Detaylı Hizmet Açıklaması',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Kapak Görseli',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Öne Çıkan Özellikler Checklist',
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Özellik',
        },
      ],
    },
  ],
};
