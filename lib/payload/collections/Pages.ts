import type { CollectionConfig } from 'payload';
import { HeroBlock } from '../blocks/HeroBlock';
import { StatsBlock } from '../blocks/StatsBlock';
import { ServicesGridBlock } from '../blocks/ServicesGridBlock';
import { GalleryBlock } from '../blocks/GalleryBlock';
import { ContactCtaBlock } from '../blocks/ContactCtaBlock';
import { FormBlock } from '../blocks/FormBlock';

export const Pages: CollectionConfig = {
  slug: 'pages',
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
      label: 'Sayfa Başlığı',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Sayfa URL Slug (Örn: anasayfa, kurumsal, iletisim)',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        StatsBlock,
        ServicesGridBlock,
        GalleryBlock,
        ContactCtaBlock,
        FormBlock,
      ],
      label: 'Sayfa İçerik Blokları',
    },
    {
      type: 'group',
      name: 'seo',
      label: 'SEO ve Arama Motoru Ayarları',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Başlık (Title Tag)',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Açıklama (Description)',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Sosyal Medya Paylaşım Görseli (OG Image)',
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          label: 'Kanonik URL (Canonical)',
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          label: 'Arama motorlarından gizle (noindex)',
          defaultValue: false,
        },
      ],
    },
  ],
};
