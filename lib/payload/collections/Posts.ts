import type { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Makale Başlığı',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug (Örn: 2026-kenet-cati-m2-fiyatlari)',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Özet / Kısa Açıklama (Arama ve Liste Kartı İçin)',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Makale İçeriği',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Kapak Görseli',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Kenet Çatı Sistemleri', value: 'kenet-cati' },
        { label: 'Çatı Tamiri & İzolasyon', value: 'cati-tamiri' },
        { label: 'Villa & Konut İnşaatı', value: 'villa-insaat' },
        { label: 'Maliyet & Fiyat Rehberi', value: 'maliyet-rehberi' },
        { label: 'Yasal Süreçler & İmar', value: 'yasal-surecler' },
        { label: 'Genel Yapı Rehberi', value: 'genel' },
      ],
      defaultValue: 'kenet-cati',
      required: true,
      label: 'Kategori',
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'MenakYapı Mühendislik Ekibi',
      label: 'Yazar Adı',
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      label: 'Yayınlanma Tarihi',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      defaultValue: 5,
      label: 'Tahmini Okuma Süresi (Dakika)',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Manşet / Öne Çıkarılan Yazı Yap',
      defaultValue: false,
    },
    {
      name: 'faqItems',
      type: 'array',
      label: 'Google SSS (FAQ Schema) İçeriği',
      labels: {
        singular: 'Soru & Cevap',
        plural: 'Sıkça Sorulan Sorular',
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
      ],
    },
    {
      type: 'group',
      name: 'seo',
      label: 'SEO & Sosyal Medya Ayarları',
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
