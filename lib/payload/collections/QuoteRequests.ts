import type { CollectionConfig } from 'payload';

export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'phone', 'city', 'service', 'status', 'createdAt'],
  },
  labels: {
    singular: 'Teklif Talebi',
    plural: 'Teklif & İletişim Talepleri',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Müşteri Adı Soyadı',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefon Numarası',
    },
    {
      name: 'city',
      type: 'text',
      defaultValue: 'Ankara',
      label: 'Şehir / Bölge',
    },
    {
      name: 'service',
      type: 'text',
      label: 'İstenen Hizmet',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Çatı Detayları / Müşteri Notu',
    },
    {
      name: 'kvkkConsent',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      label: 'KVKK Onayı Verildi mi?',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: '🆕 Yeni Talep', value: 'new' },
        { label: '📞 Müşteri Arandı', value: 'contacted' },
        { label: '📋 Teklif Sunuldu', value: 'quoted' },
        { label: '✅ Anlaşma Sağlandı', value: 'completed' },
        { label: '❌ İptal / Uygun Değil', value: 'cancelled' },
      ],
      label: 'Talep İşlem Durumu',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Yönetici Notları (İç Kullanım)',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
