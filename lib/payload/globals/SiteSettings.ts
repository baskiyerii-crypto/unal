import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Genel Ayarları',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'contactPersons',
      type: 'array',
      label: 'İletişim Kişileri',
      labels: {
        singular: 'Kişi',
        plural: 'Kişiler',
      },
      minRows: 1,
      maxRows: 2,
      required: true,
      admin: {
        description:
          'Telefon ve WhatsApp ikonlarına basınca bu isimler seçenek olarak çıkar. Her kişinin numarası hem arama hem WhatsApp için kullanılır.',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'İsim',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon / WhatsApp Numarası',
          required: true,
          admin: {
            description: 'Örn: 05317924006 (boşluksuz)',
          },
        },
      ],
      defaultValue: [
        { name: 'Merkez Hat', phone: '05317924006' },
        { name: 'Saha Hat', phone: '05317924006' },
      ],
    },
    {
      name: 'whatsappMessage',
      type: 'textarea',
      label: 'WhatsApp Varsayılan Karşılama Mesajı',
      defaultValue:
        'Merhaba MenakYapı, çatı/kenet çatı hizmetleriniz hakkında ücretsiz teklif ve bilgi almak istiyorum.',
    },
    {
      name: 'email',
      type: 'text',
      label: 'E-Posta Adresi',
      defaultValue: 'menakyapi@gmail.com',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Açık Adres',
      defaultValue: 'Şehitler caddesi Selahattin Ecevit sokak 36/3 Mamak Ankara',
      required: true,
    },
    {
      name: 'workingHours',
      type: 'text',
      label: 'Çalışma Saatleri',
      defaultValue: 'Haftaiçi 08:00 - 17:00',
      required: true,
    },
    {
      type: 'group',
      name: 'stats',
      label: 'Kurumsal İstatistikler',
      fields: [
        {
          name: 'experienceYears',
          type: 'text',
          label: 'Tecrübe Süresi',
          defaultValue: '20 Yıllık Tecrübe',
        },
        {
          name: 'completedProjects',
          type: 'text',
          label: 'Tamamlanan Proje / Müşteri',
          defaultValue: '500+ Mutlu Müşteri',
        },
        {
          name: 'teamSize',
          type: 'text',
          label: 'Ekip Sayısı',
          defaultValue: '15 Kişilik Uzman Ekip',
        },
      ],
    },
    {
      type: 'group',
      name: 'tracking',
      label: 'Analiz & İzleme Kodları',
      fields: [
        {
          name: 'gtmId',
          type: 'text',
          label: 'Google Tag Manager ID (Örn: GTM-XXXXXXX)',
        },
        {
          name: 'ga4Id',
          type: 'text',
          label: 'Google Analytics 4 ID (Örn: G-XXXXXXXXXX)',
        },
        {
          name: 'googleSearchConsoleMeta',
          type: 'text',
          label: 'Search Console Meta Doğrulama Kodu',
        },
      ],
    },
  ],
};
