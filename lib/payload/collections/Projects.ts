import type { CollectionConfig } from 'payload';

export const Projects: CollectionConfig = {
  slug: 'projects',
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
      label: 'Proje Başlığı',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Kenet Çatı Sistemleri', value: 'kenet-cati' },
        { label: 'Çatı Yapımı & Montajı', value: 'cati-yapimi' },
        { label: 'Çatı Tadilat & Onarımı', value: 'cati-tadilat' },
        { label: 'Oluk Montajı & Değişimi', value: 'oluk-montaji' },
      ],
      defaultValue: 'kenet-cati',
      required: true,
      label: 'Proje Kategorisi',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Şehir / İlçe (Örn: Ankara / Mamak)',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Anasayfada Öne Çıkar',
      defaultValue: true,
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Proje Fotoğrafları',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
};
