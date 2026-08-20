import type { Block } from 'payload';

export const GalleryBlock: Block = {
  slug: 'gallery-block',
  labels: {
    singular: 'Proje Galerisi Bloğu',
    plural: 'Proje Galeri Blokları',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Bölüm Başlığı',
      defaultValue: 'Tamamlanan Çatı ve Yapı Projelerimiz',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Alt Açıklama',
      defaultValue: 'Ankara, Antalya ve Türkiye genelinde teslim ettiğimiz kenet çatı ve tadilat projelerinden görseller.',
    },
  ],
};
