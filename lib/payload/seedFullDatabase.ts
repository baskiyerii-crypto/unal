import { getPayload } from 'payload';
import config from '@/payload.config';
import fs from 'fs';
import path from 'path';
import { FALLBACK_POSTS } from './getPosts';

export async function seedFullDatabase() {
  console.log('[SEED]: Starting full database initialization for MenakYapı...');

  try {
    const payload = await getPayload({ config });

    // 1. Ensure primary admin user exists
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    });

    let adminUser = users.docs[0];
    if (!adminUser) {
      adminUser = await payload.create({
        collection: 'users',
        data: {
          email: process.env.INITIAL_ADMIN_EMAIL || 'admin@menakyapi.com',
          password: process.env.INITIAL_ADMIN_PASSWORD || 'MenakYapi2026!Admin',
        },
      });
      console.log('[SEED]: Primary admin user created.');
    } else {
      console.log('[SEED]: Primary admin user already exists.');
    }

    // Helper to upload media file if not existing
    const uploadedMediaMap: Record<string, any> = {};

    async function ensureMedia(relativePath: string, altText: string) {
      if (uploadedMediaMap[relativePath]) {
        return uploadedMediaMap[relativePath];
      }

      const fullPath = path.resolve(process.cwd(), relativePath);
      if (!fs.existsSync(fullPath)) {
        console.warn(`[SEED WARNING]: Media file missing at ${fullPath}`);
        return null;
      }

      const filename = path.basename(fullPath);
      
      // Check if media already uploaded in DB by alt or filename
      const existingMedia = await payload.find({
        collection: 'media',
        where: {
          alt: { equals: altText },
        },
        limit: 1,
      });

      if (existingMedia.docs.length > 0) {
        uploadedMediaMap[relativePath] = existingMedia.docs[0];
        return existingMedia.docs[0];
      }

      const fileBuffer = fs.readFileSync(fullPath);
      const ext = path.extname(filename).toLowerCase();
      const mimetype = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';

      const createdMedia = await payload.create({
        collection: 'media',
        data: {
          alt: altText,
        },
        file: {
          data: fileBuffer,
          name: filename,
          mimetype,
          size: fileBuffer.length,
        },
      });

      console.log(`[SEED]: Uploaded media asset: ${filename} (ID: ${createdMedia.id})`);
      uploadedMediaMap[relativePath] = createdMedia;
      return createdMedia;
    }

    // Upload core images
    const heroImage = await ensureMedia('public/images/kenet-cati-hero.png', 'MenakYapı Kenet Çatı Sistemleri Hero Görseli');
    const detailImage = await ensureMedia('public/images/kenet-cati-detail.png', 'Kenet Çatı Detay ve Birleşim Noktaları');
    const panelImage = await ensureMedia('public/images/sandvic-panel-cati.png', 'Sandviç Panel Çatı Kaplama');
    const repairImage = await ensureMedia('public/images/roof-repair-waterproofing.png', 'Çatı İzolasyonu ve Su Yalıtımı');
    const olukImage = await ensureMedia('public/images/eksiz-oluk-sistemi.png', 'Eksiz Oluk ve Yağmur İndirme Sistemleri');
    const villaImage = await ensureMedia('public/images/villa-roof-construction.png', 'Villa ve Özel Mimari Çatı Yapımı');
    const industrialImage = await ensureMedia('public/images/industrial-sandwich-panel-roof.png', 'Endüstriyel Çatı Kaplama');
    const legalImage = await ensureMedia('public/images/legal-building-permits.png', 'Çatı Ruhsatı ve Yasal İmar Süreçleri');

    // Upload project gallery images
    const projectMediaDocs: any[] = [];
    for (let i = 1; i <= 14; i++) {
      const padNum = i < 10 ? `0${i}` : `${i}`;
      const projPath = `public/images/projects/proje-${padNum}.jpg`;
      const projMedia = await ensureMedia(projPath, `MenakYapı Tamamlanan Çatı Projesi ${padNum}`);
      if (projMedia) {
        projectMediaDocs.push(projMedia);
      }
    }

    // 2. Populate Services Collection
    const serviceItems = [
      {
        title: 'Kenet Çatı Yapımı & Kaplama',
        slug: 'kenet-cati-yapimi',
        shortSummary: 'Çift kenet kilitleme teknolojisi ile fırtınaya, rüzgara ve suya %100 dayanıklı, vidalanmasız modern çatı kaplama çözümleri.',
        coverImage: heroImage?.id,
        features: [
          { item: '%100 Su Yalıtım Garantisi' },
          { item: 'Vida Deliği Olmadan Eksiz Montaj' },
          { item: '50 Yıl+ Kullanım Ömrü' },
          { item: 'Titanyum Çinko & Alüminyum Seçenekleri' },
        ],
      },
      {
        title: 'Çatı İzolasyonu & Su Yalıtımı',
        slug: 'cati-izolasyonu-yalitimi',
        shortSummary: 'Poliüretan, membran ve taşyünü uygulamaları ile ısınma giderlerinizi %40 azaltan profesyonel ısı ve su yalıtımı.',
        coverImage: repairImage?.id,
        features: [
          { item: '%40 Enerji Tasarrufu' },
          { item: 'Buhar Dengeleyici Membran' },
          { item: 'Yangına Dayanıklı Taşyünü' },
          { item: 'Nem ve Küf Önleyici Kaplama' },
        ],
      },
      {
        title: 'Eksiz Oluk & Dere Sistemleri',
        slug: 'eksiz-oluk-sistemleri',
        shortSummary: 'Yerinde şantiyede tek parça olarak çekilen, ek yeri olmadığı için sızdırma yapmayan estetik eksiz oluk sistemleri.',
        coverImage: olukImage?.id,
        features: [
          { item: 'Şantiyede Metrajına Göre Üretim' },
          { item: 'Sızdırmaz Eksiz Yapı' },
          { item: 'Elektrostatik Toz Boyalı Renkler' },
          { item: 'Yüksek Su Taşıma Kapasitesi' },
        ],
      },
      {
        title: 'Sandviç Panel Çatı Kaplama',
        slug: 'sandvic-panel-kaplama',
        shortSummary: 'Fabrika, depo, hangar ve ticari yapılar için yüksek ısı yalıtımlı, hızlı montajlı poliüretan sandviç panel sistemleri.',
        coverImage: panelImage?.id,
        features: [
          { item: 'Hızlı ve Pratik Montaj' },
          { item: 'Yüksek Isı & Ses İzolasyonu' },
          { item: 'Geniş Renk ve Form Seçeneği' },
          { item: 'Hafif ve Dayanıklı Taşıyıcı Yapı' },
        ],
      },
      {
        title: 'Çatı Tamiri & Komple Tadilat',
        slug: 'cati-tamiri-tadilat',
        shortSummary: 'Eski, yıpranmış, su alan ve ahşap karkası çürümüş çatıların sökümü, karkas yenilenmesi ve garantili tadilatı.',
        coverImage: detailImage?.id,
        features: [
          { item: 'Ücretsiz Yerinde Keşif' },
          { item: 'Çelik & Ahşap Karkas Güçlendirme' },
          { item: 'Kiremit & Sac Değişimi' },
          { item: 'Yaz Kış Garantili Onarım' },
        ],
      },
      {
        title: 'Villa & Özel Mimari Çatı Projeleri',
        slug: 'villa-ve-mimari-cati',
        shortSummary: 'Lüks konut ve müstakil villalar için özel tasarım mimari kenet çatı, tonoz ve beşik çatı imalatı.',
        coverImage: villaImage?.id,
        features: [
          { item: 'Özel Mimari Çözümler' },
          { item: 'Gizli Oluk ve Detay İmalatları' },
          { item: 'Estetik Renk Kartelası' },
          { item: 'Mühendislik Hesaplamalı Taşıyıcılar' },
        ],
      },
    ];

    for (const svc of serviceItems) {
      const existing = await payload.find({
        collection: 'services',
        where: { slug: { equals: svc.slug } },
        limit: 1,
      });

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'services',
          data: svc as any,
        });
        console.log(`[SEED]: Created Service: ${svc.title}`);
      }
    }

    // 3. Populate Projects Collection
    const projectItems = [
      {
        title: 'Ankara İncek Lüks Villa Kenet Çatı Projesi',
        slug: 'incek-villa-kenet-cati',
        category: 'kenet-cati',
        location: 'Ankara / Gölbaşı',
        featured: true,
        gallery: projectMediaDocs.slice(0, 3).map((m) => ({ image: m.id })),
      },
      {
        title: 'Antalya Alanya Otel Çatı Yenileme & İzolasyon',
        slug: 'alanya-otel-cati-yenileme',
        category: 'cati-tadilat',
        location: 'Antalya / Alanya',
        featured: true,
        gallery: projectMediaDocs.slice(3, 6).map((m) => ({ image: m.id })),
      },
      {
        title: 'Ostim Sanayi Depo Sandviç Panel Çatı Kaplama',
        slug: 'ostim-depo-sandvic-panel',
        category: 'cati-yapimi',
        location: 'Ankara / Yenimahalle',
        featured: true,
        gallery: projectMediaDocs.slice(6, 9).map((m) => ({ image: m.id })),
      },
      {
        title: 'Mamak Konut Sitesi Eksiz Oluk & Dere Değişimi',
        slug: 'mamak-konut-eksiz-oluk',
        category: 'oluk-montaji',
        location: 'Ankara / Mamak',
        featured: true,
        gallery: projectMediaDocs.slice(9, 12).map((m) => ({ image: m.id })),
      },
    ];

    for (const prj of projectItems) {
      const existing = await payload.find({
        collection: 'projects',
        where: { slug: { equals: prj.slug } },
        limit: 1,
      });

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'projects',
          data: prj as any,
        });
        console.log(`[SEED]: Created Project: ${prj.title}`);
      }
    }

    // 4. Populate Posts Collection (All 15 SEO Articles)
    for (const pst of FALLBACK_POSTS) {
      const existing = await payload.find({
        collection: 'posts',
        where: { slug: { equals: pst.slug } },
        limit: 1,
      });

      if (existing.docs.length === 0) {
        let coverMediaDoc = heroImage;
        if (pst.coverImageUrl) {
          const cleanRelPath = 'public' + pst.coverImageUrl;
          const mediaRes = await ensureMedia(cleanRelPath, pst.coverImageAlt || pst.title);
          if (mediaRes) {
            coverMediaDoc = mediaRes;
          }
        }

        await payload.create({
          collection: 'posts',
          data: {
            title: pst.title,
            slug: pst.slug,
            excerpt: pst.excerpt,
            category: pst.category,
            author: pst.author,
            publishedAt: pst.publishedAt,
            readingTime: pst.readingTime,
            featured: pst.featured,
            coverImage: coverMediaDoc?.id || heroImage?.id,
            faqItems: pst.faqItems || [],
            seo: {
              metaTitle: pst.metaTitle || pst.title,
              metaDescription: pst.metaDescription || pst.excerpt,
            },
          } as any,
        });
        console.log(`[SEED]: Created Blog Post (${pst.category}): ${pst.title}`);
      }
    }

    // 5. Populate Testimonials Collection
    const testimonials = [
      {
        clientName: 'Mehmet Yılmaz',
        location: 'Ankara / Gölbaşı',
        comment: 'Villamızın çatısını kenet sistem yaptırdık. Aşırı rüzgarda dahi ses yapmıyor ve 2 yıldır en ufak su sızıntısı yaşamadık. MenakYapı ekibine teşekkürler.',
        rating: 5,
      },
      {
        clientName: 'Serdar Kaya',
        location: 'Ankara / Keçiören',
        comment: 'Eski çatı kiremitlerimizi tamamen söküp sandviç panel ve eksiz oluk yaptılar. İşçilik ve zamanında teslimat harikaydı.',
        rating: 5,
      },
      {
        clientName: 'Ahmet Balcı',
        location: 'Antalya / Döşemealtı',
        comment: 'Antalya sıcağında çatı izolasyonu sayesinde evimizin üst katı serinledi. Profesyonel kadro ve temiz çalışma.',
        rating: 5,
      },
    ];

    for (const tst of testimonials) {
      const existing = await payload.find({
        collection: 'testimonials',
        where: { clientName: { equals: tst.clientName } },
        limit: 1,
      });

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'testimonials',
          data: tst,
        });
        console.log(`[SEED]: Created Testimonial from: ${tst.clientName}`);
      }
    }

    // 6. Populate Faqs Collection
    const faqs: Array<{
      question: string;
      answer: string;
      category: 'genel' | 'kenet-cati' | 'garanti';
    }> = [
      {
        question: 'Kenet çatı uygulamasının ömrü ne kadardır?',
        answer: 'Doğru imalat ve kaliteli alüminyum/çinko malzeme kullanımı ile kenet çatılar 50 yılın üzerinde bakım gerektirmeden dayanır.',
        category: 'kenet-cati',
      },
      {
        question: 'Çatı keşfi ve fiyat teklifi ücretli mi?',
        answer: 'Hayır, Ankara, Antalya ve çevre illerde yerinde çatı keşfi ve detaylı metrajlı teklif hazırlanması tamamen ücretsizdir.',
        category: 'garanti',
      },
      {
        question: 'Yapılan çatı uygulamaları garanti kapsamında mı?',
        answer: 'Evet, yaptığımız tüm kenet çatı ve izolasyon uygulamaları 10 yıl işçilik ve su yalıtım garantisi altındaki.',
        category: 'garanti',
      },
    ];

    for (const faq of faqs) {
      const existing = await payload.find({
        collection: 'faqs',
        where: { question: { equals: faq.question } },
        limit: 1,
      });

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'faqs',
          data: faq,
        });
        console.log(`[SEED]: Created FAQ: ${faq.question}`);
      }
    }

    // 7. Populate SiteSettings Global
    const currentSettings = await payload.findGlobal({
      slug: 'site-settings',
    });

    const hasContacts =
      Array.isArray(currentSettings?.contactPersons) &&
      currentSettings.contactPersons.length > 0;

    if (!currentSettings || !hasContacts) {
      await payload.updateGlobal({
        slug: 'site-settings',
        data: {
          contactPersons: [
            { name: 'Merkez Hat', phone: '05317924006' },
            { name: 'Saha Hat', phone: '05317924006' },
          ],
          whatsappMessage:
            'Merhaba MenakYapı, çatı/kenet çatı hizmetleriniz hakkında ücretsiz teklif ve bilgi almak istiyorum.',
          email: 'menakyapi@gmail.com',
          address: 'Şehitler caddesi Selahattin Ecevit sokak 36/3 Mamak Ankara',
          workingHours: 'Haftaiçi 08:00 - 17:00',
          stats: {
            experienceYears: '20 Yıllık Tecrübe',
            completedProjects: '500+ Mutlu Müşteri',
            teamSize: '15 Kişilik Uzman Ekip',
          },
        },
      });
      console.log('[SEED]: SiteSettings global updated with contact persons.');
    }

    // 8. Populate Pages Collection (Anasayfa / Homepage)
    const existingHome = await payload.find({
      collection: 'pages',
      where: { slug: { in: ['index', 'home', 'anasayfa'] } },
      limit: 1,
    });

    if (existingHome.docs.length === 0) {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Anasayfa',
          slug: 'index',
          layout: [
            {
              blockType: 'hero',
              headline: 'Kenet Çatı & Yapı Çözümlerinde 20 Yıllık Uzmanlık',
              subheadline: 'Ankara, Antalya ve tüm Türkiye’de %100 su yalıtım garantili kenet çatı, izolasyon, sandviç panel ve eksiz oluk sistemleri.',
              ctaButtonText: 'Ücretsiz Keşif & Teklif Alın',
              ctaButtonLink: '#teklif-al',
              secondaryButtonText: 'Hizmetlerimizi İnceleyin',
              secondaryButtonLink: '#hizmetler',
              backgroundMedia: heroImage?.id,
            },
            {
              blockType: 'stats_block',
              title: 'Rakamlarla MenakYapı Güvencesi',
            },
            {
              blockType: 'services_grid',
              title: 'Uzmanlık Alanlarımız ve Hizmetlerimiz',
              subtitle: 'Kenet çatıdan izolasyona, eksiz oluktan villa projelerine kadar eksiksiz yapı çözümleri.',
            },
            {
              blockType: 'gallery_block',
              title: 'Tamamlanan Örnek Projelerimiz',
              subtitle: 'Son teslim ettiğimiz kenet çatı ve konut uygulamalarından kareler.',
            },
            {
              blockType: 'contact_cta_block',
              title: 'Çatınız İçin Profesyonel Keşif İster Mısınız?',
              description: 'Uzman ekibimiz adresinize gelerek çatı incelemenizi yapsın, en uygun malzeme ve fiyat teklifini sunsun.',
              buttonText: 'Hemen Arayın: 0531 792 40 06',
            },
          ],
          seo: {
            metaTitle: 'MenakYapı — Kenet Çatı Sistemleri, Yapı & Çatı Tadilatı | Ankara & Antalya',
            metaDescription: 'MenakYapı; Ankara, Antalya ve tüm Türkiye’de kenet çatı sistemleri, çatı yapımı, oluk değişimi ve izolasyon tadilatında 20 yıllık tecrübesiyle garantili hizmet sunar. Ücretsiz teklif alın!',
          },
        } as any,
      });
      console.log('[SEED]: Created Homepage (slug: index) with full Payload layout blocks.');
    } else {
      console.log('[SEED]: Homepage already exists in Pages collection.');
    }

    console.log('[SEED COMPLETE]: Full database seeding completed successfully!');
  } catch (error) {
    console.error('[SEED ERROR]: Failed to seed full database:', error);
  }
}
