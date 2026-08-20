import type { Block } from 'payload';

export const StatsBlock: Block = {
  slug: 'stats-block',
  labels: {
    singular: 'İstatistik Bloğu',
    plural: 'İstatistik Blokları',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Bölüm Başlığı',
      defaultValue: 'Rakamlarla MenakYapı Güvencesi',
    },
    {
      name: 'items',
      type: 'array',
      label: 'İstatistik Maddeleri',
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Sayı / Değer (Örn: 20+)',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Açıklama (Örn: Yıllık Tecrübe)',
          required: true,
        },
      ],
    },
  ],
};
