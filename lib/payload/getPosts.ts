import { getPayload } from 'payload';
import config from '@/payload.config';
import type { Post } from '@/payload-types';

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentHtml?: string;
  contentRichText?: any;
  coverImageUrl: string;
  coverImageAlt: string;
  category: 'kenet-cati' | 'cati-tamiri' | 'villa-insaat' | 'maliyet-rehberi' | 'yasal-surecler' | 'genel';
  categoryLabel: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  faqItems?: Array<{ question: string; answer: string }>;
  metaTitle?: string;
  metaDescription?: string;
}

export const CATEGORY_MAP: Record<string, string> = {
  'kenet-cati': 'Kenet Çatı Sistemleri',
  'cati-tamiri': 'Çatı Tamiri & İzolasyon',
  'villa-insaat': 'Villa & Konut İnşaatı',
  'maliyet-rehberi': 'Maliyet & Fiyat Rehberi',
  'yasal-surecler': 'Yasal Süreçler & İmar',
  genel: 'Genel Yapı Rehberi',
};

export const FALLBACK_POSTS: BlogArticle[] = [
  // ==========================================
  // 1. KENET ÇATI SİSTEMLERİ (3 KAPSAMLI YAZI)
  // ==========================================
  {
    id: 'fallback-1',
    title: '2026 Kenet Çatı Kaplama m² Fiyatları ve Malzeme Seçim Rehberi',
    slug: '2026-kenet-cati-m2-fiyatlari-ve-malzeme-secim-rehberi',
    excerpt: 'Titanyum çinko, alüminyum ve galvaniz kenet çatı sistemlerinin 2026 yılı m² maliyet hesaplaması, uzun ömürlülük karşılaştırması ve şantiye uygulama püf noktaları.',
    coverImageUrl: '/images/kenet-cati-hero.png',
    coverImageAlt: 'MenakYapı Kenet Çatı Sistemleri Şantiye Uygulaması',
    category: 'kenet-cati',
    categoryLabel: 'Kenet Çatı Sistemleri',
    author: 'MenakYapı Mühendislik Ekibi',
    publishedAt: '2026-07-15T10:00:00.000Z',
    readingTime: 7,
    featured: true,
    faqItems: [
      {
        question: 'Kenet çatı sistemlerinin ortalama ömrü ne kadardır?',
        answer: 'Titanyum çinko ve kaliteli alüminyum kenet çatılar doğru detay izolasyonuyla 50 ila 100 yıl arasında bakım gerektirmeden dayanıklılık sağlar.',
      },
      {
        question: 'Kenet çatı su sızdırır mı?',
        answer: 'Kenet çatı panelleri vidalanmadan özel robot kenetleme makinesiyle kenetlendiği için yüzeyde vida deliği bulunmaz. Bu nedenle su sızdırma riski sıfırdır.',
      },
      {
        question: '2026 yılı kenet çatı m² işçilik ve malzeme maliyeti nasıl hesaplanır?',
        answer: 'Maliyet; çatının eğimi, izolasyon katman sayısı (taşyünü/membran), altyapı karkas malzemesi ve seçilen panel sac türüne göre m² bazında belirlenir.',
      },
    ],
    metaTitle: '2026 Kenet Çatı m² Fiyatları & Kaplama Rehberi | MenakYapı',
    metaDescription: 'Kenet çatı sistemlerinin 2026 m² maliyeti, titanyum çinko kaplama avantajları ve şantiye uygulama detayları hakkında uzman rehber.',
    contentHtml: `
      <h2>Kenet Çatı Nedir ve Neden Tercih Edilmelidir?</h2>
      <p>Modern mimaride çatı kaplama teknolojilerinin zirvesi olarak kabul edilen <strong>kenet çatı sistemleri</strong>, eksiz panel birleşimi sayesinde su sızdırmazlığını garanti altına alan teknik bir çatı kaplama yöntemidir. Geleneksel kiremit veya şıngıl (shingle) çatılarda yaşanan vida deliği korozyonu ve fırtınada uçma riski kenet sistemlerde tamamen ortadan kalkar.</p>
      
      <h3>2026 Yılı Kenet Çatı Kaplama Malzeme Türleri ve Fiyat Faktörleri</h3>
      <p>Kenet çatı maliyetleri hesaplanırken kullanılan ana metalin türü ve altyapı izolasyon katmanları doğrudan rol oynar:</p>
      <ul>
        <li><strong>Titanyum Çinko Kenet:</strong> En uzun ömürlü (75-100 yıl), kendisini tamir edebilen patina tabakasına sahip premium malzemedir.</li>
        <li><strong>Alüminyum Kenet:</strong> Hafifliği ve deniz kenarı nemli iklimlere yüksek korozyon direnci ile öne çıkar. 0.70mm ve 0.80mm alaşım kalibreleri tercih edilir.</li>
        <li><strong>Boyalı Galvaniz Sac Kenet:</strong> Ekonomik ve yüksek dayanımlı çözüm arayan endüstriyel ve konut projeleri için idealdir.</li>
      </ul>

      <blockquote>
        <p><strong>Eşsiz Su Sızdırmazlık Garantisi:</strong> Kenet panelleri çatı yüzeyine delik açılmadan gizli klipsler (klips sistemi) ile sabitlenir. Yüzeyde dışarıdan görünen hiçbir vida bulunmaz.</p>
      </blockquote>

      <h2>Şantiye Uygulamasında Nelere Dikkat Edilmelidir?</h2>
      <p>Kenet çatı uygulamasının başarısı sadece sac kalitesine değil, çatı altı izolasyon tabakasına bağlıdır. MenakYapı olarak şantiyelerimizde uyguladığımız standart katman sıralaması:</p>
      <ol>
        <li>Taşıyıcı Çelik veya Ahşap Karkas Altyapı</li>
        <li>Nem Bariyeri ve Su Yalıtım Membranı</li>
        <li>Yüksek Yoğunluklu Taşyünü Isı ve Ses İzolasyonu (150 kg/m³)</li>
        <li>Havalandırmalı Profil Katmanı ve OSB/Tahta Kaplama</li>
        <li>Buhar Dengeleyici Ayırıcı Şilte</li>
        <li>Eksiz Kenet Çatı Panelleri ve Robot Kenetleme</li>
      </ol>

      <h2>Sonuç ve Ücretsiz Keşif Teklifi</h2>
      <p>Eğer yapınız için uzun ömürlü, fırtınaya ve suya %100 dayanıklı bir çatı çözümü arıyorsanız, MenakYapı mühendislik ekibimiz ile iletişime geçerek yerinde keşif ve metraj analizi talep edebilirsiniz.</p>
    `,
  },
  {
    id: 'fallback-1b',
    title: 'Titanyum Çinko Kenet Çatı Sistemleri: Lüks Mimaride Sızdırmazlık',
    slug: 'titanyum-cinko-kenet-cati-sistemleri-luks-mimari',
    excerpt: 'Prestijli villalar ve özgün mimari projelerde tercih edilen titanyum çinko kaplama teknikleri, doğal patina tabakası ve 75 yıllık ömür avantajı.',
    coverImageUrl: '/images/projects/proje-01.jpg',
    coverImageAlt: 'Titanyum Çinko Kenet Çatı Şantiye Montajı',
    category: 'kenet-cati',
    categoryLabel: 'Kenet Çatı Sistemleri',
    author: 'MenakYapı Mühendislik Ekibi',
    publishedAt: '2026-07-10T11:00:00.000Z',
    readingTime: 6,
    featured: false,
    metaTitle: 'Titanyum Çinko Kenet Çatı Kaplama | MenakYapı',
    metaDescription: 'Prestijli villa ve yapılarda kullanılan titanyum çinko kenet kaplama detayları, patina tabakası ve 75 yıllık ömür avantajları.',
    contentHtml: `
      <h2>Lüks Mimarinin Vazgeçilmezi: Titanyum Çinko</h2>
      <p>Titanyum çinko kenet sistemleri, zamansız estetiği ve kendi kendini onaran yüzey yapısıyla lüks villa ve kurumsal binaların ilk tercihidir. Çinko, bakır ve titanyum alaşımından oluşan bu özel malzeme, atmosferik koşullarla temas ettikçe yüzeyinde koruyucu bir <strong>patina tabakası</strong> oluşturur.</p>

      <h3>Neden Titanyum Çinko Tercih Edilmelidir?</h3>
      <ul>
        <li><strong>Kendi Kendini Yenileme:</strong> Yüzeyde oluşan kılcal çizikler zamanla patina tabakası sayesinde kendiliğinden kapanır.</li>
        <li><strong>Sıfır Bakım Maliyeti:</strong> Boya veya boya yenileme gerektirmez, 75 ila 100 yıl boyunca ilk günkü estetiğini korur.</li>
        <li><strong>Esnek Mimari Uyum:</strong> Düz, eğimli, tonoz ve kubbe çatı formlarına mükemmel uyum sağlar.</li>
      </ul>

      <h2>Şantiye İşçiliğinde Kritik Püf Noktaları</h2>
      <p>Titanyum çinko malzeme genleşme katsayısı yüksek bir metaldir. Bu nedenle şantiyedeki montaj sırasında **hareketli klips (kayar klips)** kullanılması zorunludur. MenakYapı ekiplerimiz genleşme paylarını mühendislik hesaplarıyla belirleyerek çatıda pot yapma veya bükülme riskini tamamen ortadan kaldırır.</p>
    `,
  },
  {
    id: 'fallback-1c',
    title: 'Alüminyum Kenet Çatı Panelleri ile Fırtınaya Dayanıklı Mimari',
    slug: 'aluminyum-kenet-cati-panelleri-firtina-dayanimi',
    excerpt: 'Şiddetli rüzgar ve fırtına riski yüksek bölgelerde alüminyum kenet çatı klips sisteminin mekanik direnci ve hafif karkas avantajı.',
    coverImageUrl: '/images/projects/proje-05.jpg',
    coverImageAlt: 'Alüminyum Kenet Çatı Montajı',
    category: 'kenet-cati',
    categoryLabel: 'Kenet Çatı Sistemleri',
    author: 'MenakYapı Teknik Ekip',
    publishedAt: '2026-07-05T09:00:00.000Z',
    readingTime: 5,
    featured: false,
    metaTitle: 'Alüminyum Kenet Çatı Sistemleri | MenakYapı',
    metaDescription: 'Fırtına dayanımı yüksek, paslanmaz alüminyum kenet çatı sistemleri. Şantiye kurulumu ve altyapı avantajları.',
    contentHtml: `
      <h2>Fırtına ve Şiddetli Rüzgarlara Karşı Tam Koruma</h2>
      <p>Özellikle yüksek rakımlı veya deniz kenarı fırtınalı bölgelerde çatı kaplamasının rüzgar yüküne dayanımı hayati önem taşır. Alüminyum kenet paneller hafif yapısıyla bina taşıyıcı karkasına yük bindirmezken, gizli klips sabitlemesi sayesinde 150 km/s üzerindeki rüzgarlarda bile sökülme yaşamaz.</p>

      <h3>Alüminyum Kenet Sisteminin Avantajları</h3>
      <ol>
        <li><strong>Korozyon ve Pas Bağışıklığı:</strong> Tuzlu deniz havası veya karlı iklimlerde paslanma yapmaz.</li>
        <li><strong>Hafif Statik Yük:</strong> m² başına yaklaşık 2.5 - 3.2 kg ağırlık ile binanın deprem performansını olumlu etkiler.</li>
        <li><strong>Geniş Renk Yelpazesi:</strong> Elektrostatik toz boyalı veya PVDF kaplı yüzey alternatifleri sunar.</li>
      </ol>
    `,
  },

  // ==========================================
  // 2. ÇATI TAMİRİ & İZOLASYON (3 KAPSAMLI YAZI)
  // ==========================================
  {
    id: 'fallback-3',
    title: 'Çatı Sızdırma ve Isı Kaybı Neden Olur? Tamir mi Yenileme mi?',
    slug: 'cati-sizdirma-ve-isi-kaybi-neden-olur-tamir-mi-yenileme-mi',
    excerpt: 'Ev ve işyerlerinde yaşanan tavan akması, rutubet ve yüksek doğalgaz faturalarının arkasındaki çatı izolasyon hataları ve doğru çözüm yolları.',
    coverImageUrl: '/images/roof-repair-waterproofing.png',
    coverImageAlt: 'Çatı İzolasyon ve Çatı Tamir Detayı',
    category: 'cati-tamiri',
    categoryLabel: 'Çatı Tamiri & İzolasyon',
    author: 'MenakYapı Teknik Ekip',
    publishedAt: '2026-06-18T09:15:00.000Z',
    readingTime: 6,
    featured: false,
    faqItems: [
      {
        question: 'Çatı izolasyonu ısı faturasını ne kadar düşürür?',
        answer: 'Doğru taşyünü ve membran kombinasyonu ile yapılan çatı izolasyonu binalardaki ısı kaybını %25 ila %35 oranında engeller.',
      },
      {
        question: 'Çatı akması lokal tamirle geçer mi?',
        answer: 'Eğer su sızması tek bir baca kenarından kaynaklanıyorsa lokal izolasyon çözebilir. Ancak membran ömrü dolmuşsa komple yenileme şarttır.',
      },
    ],
    metaTitle: 'Çatı Akması ve İzolasyon Çözümleri | MenakYapı',
    metaDescription: 'Çatı sızdırma nedenleri, tavan rutubeti çözümleri ve çatı tamiri mi yoksa komple yenileme mi kararı için teknik rehber.',
    contentHtml: `
      <h2>Çatılardan Isı Kaybı ve Su Sızıntısı Neden Kaynaklanır?</h2>
      <p>Kış aylarında yaşanan tavan akıntıları ve nemlenme sadece yaşam konforunu bozmakla kalmaz, binanın taşıyıcı betonarme yapısına ve donatı demirlerine zarar vererek korozyona (paslanmaya) yol açar.</p>

      <h3>En Sık Karşılaşılan Çatı Hataları:</h3>
      <ul>
        <li><strong>Yırtılmış veya Eskimiş Membranlar:</strong> 10 yılı geçmiş bitümlü membranlar esnekliğini kaybederek çatlayabilir.</li>
        <li><strong>Baca ve Dere Kenarı İşçilik Hataları:</strong> Suyun en çok biriktiği birleşim detaylarında baskı çıtası kullanılmaması.</li>
        <li><strong>Havalandırmasız Çatı Araları (Yoğuşma):</strong> Çatı altındaki sıcak hava ile dışarıdaki soğuk havanın karşılaşmasıyla oluşan terleme su akıntısı sanılabilir.</li>
      </ul>

      <h2>Tamir mi Yapılmalı Yoksa Komple Yenileme mi?</h2>
      <p>MenakYapı teknik ekibimiz termal kamera ve keşi araçlarıyla çatınızı yerinde inceler. Yıpranma oranı %30'un altındaysa lokal izolasyon ve oluk yenileme önerilir. Ancak karkas ahşapları çürümüşse kenet kaplamalı komple yenileme en ekonomik ve kalıcı seçenektir.</p>
    `,
  },
  {
    id: 'fallback-3b',
    title: 'Eski Çatı Yenileme ve Aktarma Rehberi: Ankara Çatı Ustası Çözümleri',
    slug: 'eski-cati-yenileme-ve-aktarma-rehberi-ankara',
    excerpt: 'Yıpranmış ahşap ve kiremit çatıların çelik karkas ve kenet sistemlerle komple yenilenmesi süreci ve dikkat edilmesi gerekenler.',
    coverImageUrl: '/images/projects/proje-02.jpg',
    coverImageAlt: 'Eski Çatı Aktarma ve Yenileme',
    category: 'cati-tamiri',
    categoryLabel: 'Çatı Tamiri & İzolasyon',
    author: 'MenakYapı Saha Ekibi',
    publishedAt: '2026-06-12T14:00:00.000Z',
    readingTime: 6,
    featured: false,
    metaTitle: 'Ankara Eski Çatı Aktarma & Yenileme | MenakYapı',
    metaDescription: 'Eski ahşap ve kiremit çatıların çelik karkas ve sızdırmaz kenet sistem ile yenilenmesi rehberi.',
    contentHtml: `
      <h2>Geleneksel Çatı Aktarma İşlemi Yeterli Mi?</h2>
      <p>Halk arasında "çatı aktarma" olarak bilinen kırık kiremit değiştirme işlemi geçici bir çözümdür. Ağır kiremitler zamanla ahşap karkası bel verdirir ve her fırtınada uçma riski yaratır.</p>

      <h3>Garantili Çatı Yenileme Aşamalarımız</h3>
      <ol>
        <li>Eski kiremit ve yıpranmış ahşapların güvenli şekilde sökülmesi.</li>
        <li>Galvanizli hafif çelik profiller ile kırılmaz taşıyıcı karkas kurulumu.</li>
        <li>10 cm Taşyünü ısı yalıtımı ve 3mm polyester keçeli su izolasyon membran serimi.</li>
        <li>Vida deliksiz eksiz kenet çatı panellerinin robotla kapatılması.</li>
      </ol>
    `,
  },
  {
    id: 'fallback-3c',
    title: 'Çatı Yalıtımında Membran ve Taşyünü Seçimi: Suya ve Soğuğa Son',
    slug: 'cati-yalitiminda-membran-ve-tasyunu-secimi',
    excerpt: 'Binalarda enerji tasarrufu sağlayan taşyünü ısı yalıtımı ve bitümlü su yalıtım membranlarının doğru katman sırasıyla serilmesi.',
    coverImageUrl: '/images/projects/proje-04.jpg',
    coverImageAlt: 'Taşyünü ve Membran Yalıtım',
    category: 'cati-tamiri',
    categoryLabel: 'Çatı Tamiri & İzolasyon',
    author: 'MenakYapı Mühendislik Ekibi',
    publishedAt: '2026-06-01T10:30:00.000Z',
    readingTime: 5,
    featured: false,
    metaTitle: 'Çatı Taşyünü ve Membran Yalıtımı | MenakYapı',
    metaDescription: 'Isı kaybını %35 azaltan taşyünü ve su sızdırmaz membran uygulamalarında malzeme seçimi ve katman detayları.',
    contentHtml: `
      <h2>Isı ve Su Yalıtımının Mükemmel Uyumu</h2>
      <p>Doğru yalıtım malzemesi seçimi çatı ömrünü iki katına çıkarır. Isı yalıtımında kullanılan <strong>150 kg/m³ yoğunluktaki taşyünü</strong> sadece soğuğu ve sıcağı engellemekle kalmaz, A1 sınıfı yanmazlık özelliği ile yangın güvenliği sağlar.</p>

      <h3>Doğru Yalıtım Katman Sıralaması</h3>
      <p>Ters yapılan yalıtım nem birikmesine sebep olur. Doğru sıralama: Buhar Kesici Membran -> Taşyünü Isı Yalıtımı -> Su Yalıtım Membranı -> Ayırıcı Şilte -> Metal Kaplama şeklinde olmalıdır.</p>
    `,
  },

  // ==========================================
  // 3. VİLLA & KONUT İNŞAATI (3 KAPSAMLI YAZI)
  // ==========================================
  {
    id: 'fallback-2',
    title: 'Anahtar Teslim Villa İnşaat Süreci: Arsa İmarından Anahtar Teslimine 7 Adım',
    slug: 'anahtar-teslim-villa-insaat-sureci-7-adim',
    excerpt: 'Müstakil villa yaptırmak isteyenler için arsa imar durum kontrolü, mimari proje çizimi, belediye ruhsatı ve şantiye kaba-ince inşaat aşamaları.',
    coverImageUrl: '/images/villa-roof-construction.png',
    coverImageAlt: 'MenakYapı Anahtar Teslim Lüks Villa Projesi',
    category: 'villa-insaat',
    categoryLabel: 'Villa & Konut İnşaatı',
    author: 'MenakYapı İnşaat Mühendisliği',
    publishedAt: '2026-07-02T14:30:00.000Z',
    readingTime: 8,
    featured: false,
    faqItems: [
      {
        question: 'Villa inşaat ruhsatı kaç günde çıkar?',
        answer: 'Mimari, statik, mekanik ve elektrik projelerinin tamamlanmasının ardından belediyeye başvuru sonrası ruhsat onay süreci ortalama 30 ila 60 gün sürer.',
      },
      {
        question: 'Anahtar teslim villa inşaatı ne kadar sürede tamamlanır?',
        answer: 'Metrekareye ve hava koşullarına bağlı olarak 250-400 m² büyüklüğündeki müstakil bir villa kaba ve ince inşaat dahil 8 ila 12 ay arasında teslim edilir.',
      },
    ],
    metaTitle: 'Anahtar Teslim Villa İnşaat Rehberi | MenakYapı',
    metaDescription: 'Arsa imar durumundan mimari projelendirmeye ve kaba-ince inşaat teslimine kadar 7 adımda müstakil villa yapım rehberi.',
    contentHtml: `
      <h2>Hayalinizdeki Müstakil Yaşamı İnşa Etmek</h2>
      <p>Kendi arsanız üzerine özel müstakil bir villa inşa ettirmek hayatınızın en önemli yatırımlarından biridir. Doğru planlama ve deneyimli bir mühendislik firması ile çalışıldığında süreç son derece keyifli ve sorunsuz ilerler.</p>

      <h3>1. Adım: Arsa İmar Durumu ve Zemin Etüdü</h3>
      <p>İnşaat alanının (TAKS/KAKS) emsal oranları, taban oturum sınırları ve zemin taşıma kapasitesi belirlenir. Bu aşamada Jeoloji Mühendisleri tarafından zemin etüt raporu hazırlanır.</p>

      <h3>2. Adım: Mimari Tasarım ve Ruhsat Projeleri</h3>
      <p>Mimar ve mühendis ekibimiz yaşam alışkanlıklarınıza uygun 3D mimari konsept tasarımları hazırlar. Onayınızın ardından Statik, Mekanik ve Elektrik projeleri çizilerek belediye ruhsatına sunulur.</p>

      <h3>3. Adım: Kaba İnşaat ve Temel İzolasyonu</h3>
      <p>Ruhsat alındıktan sonra kazı çalışmaları başlar. Temel radye beton öncesinde su ve bohçalama izolasyonu titizlikle uygulanır. Betonarme karkas ve tuğla duvar örme işlemleri tamamlanır.</p>

      <h3>4. Adım: Çatı Kaplama ve İnce İnşaat</h3>
      <p>Yapının dış iklim şartlarından korunması için çatı izolasyonu ve kaplaması (Kenet veya Kiremit) öncelikle bitirilir. Dış cephe mantolama, elektrik-su tesisatı, şap ve sıva işleri yapılır.</p>
    `,
  },
  {
    id: 'fallback-2b',
    title: 'Müstakil Konut ve Villa Çatılarında Kenet Çatı Tasarım Avantajları',
    slug: 'mustakil-konut-villa-catilarinda-kenet-cati-avantajlari',
    excerpt: 'Modern villa tasarımlarında gizli dere, eksiz oluk ve kenet çatı entegrasyonu ile mimari estetiğin zirvesine ulaşma yöntemleri.',
    coverImageUrl: '/images/projects/proje-03.jpg',
    coverImageAlt: 'Lüks Villa Kenet Çatı Uygulaması',
    category: 'villa-insaat',
    categoryLabel: 'Villa & Konut İnşaatı',
    author: 'MenakYapı Mimari Ekibi',
    publishedAt: '2026-06-25T16:00:00.000Z',
    readingTime: 6,
    featured: false,
    metaTitle: 'Villa Mimarisinde Kenet Çatı Tasarımı | MenakYapı',
    metaDescription: 'Lüks villalarda gizli dere ve kenet çatı uyumu, modern mimari hatlar ve sızdırmaz çatı çözümleri.',
    contentHtml: `
      <h2>Modern Villa Mimarisine Uyumlu Çatı Çözümleri</h2>
      <p>Lüks konut projelerinde gizli dere ve kenet kaplama kombinasyonu, yapının dış hatlarını kesintisiz ve son derece modern gösterir. Çatı saçaklarından su damlamasını önleyen gizli dereler mimari tasarımı tamamlar.</p>
    `,
  },
  {
    id: 'fallback-2c',
    title: 'Villa İnşaatında Kaba ve İnce İşçilik Maliyetleri Nasıl Dengelenir?',
    slug: 'villa-insaatinda-kaba-ve-ince-iscilik-maliyetleri',
    excerpt: 'Betonarme karkas, duvar, sıva, elektrik-su tesisatı ve şap işçiliklerinde bütçe kontrolü yapmanın püf noktaları.',
    coverImageUrl: '/images/projects/proje-06.jpg',
    coverImageAlt: 'Villa Kaba ve İnce İnşaat Aşaması',
    category: 'villa-insaat',
    categoryLabel: 'Villa & Konut İnşaatı',
    author: 'MenakYapı Mühendislik Ekibi',
    publishedAt: '2026-06-15T12:00:00.000Z',
    readingTime: 7,
    featured: false,
    metaTitle: 'Villa İnşaat Bütçe & Maliyet Yönetimi | MenakYapı',
    metaDescription: 'Villa yapımında kaba ve ince inşaat maliyet kalemleri, bütçe tasarruf stratejileri ve mühendislik planlaması.',
    contentHtml: `
      <h2>İnşaat Bütçesini Doğru Yönetmek</h2>
      <p>Villa inşaatlarında toplam maliyetin yaklaşık %35'ini kaba karkas, %20'sini dış kabuk ve çatı, %45'ini ise ince dekorasyon işçilikleri oluşturur. Statik ve çatı güvenliğinden taviz vermeden bütçe dengesi kurma yöntemleri anlatılmaktadır.</p>
    `,
  },

  // ==========================================
  // 4. MALİYET & FİYAT REHBERİ (3 KAPSAMLI YAZI)
  // ==========================================
  {
    id: 'fallback-4a',
    title: '2026 Çatı Kaplama m² İşçilik ve Malzeme Fiyat Listesi',
    slug: '2026-cati-kaplama-m2-iscilik-ve-malzeme-fiyat-listesi',
    excerpt: 'Kiremit, şıngıl, galvaniz sac ve kenet çatı kaplama sistemlerinin 2026 güncel m² maliyet karşılaştırması ve piyasa analizi.',
    coverImageUrl: '/images/kenet-cati-hero.png',
    coverImageAlt: '2026 Çatı Kaplama Fiyat Analizi',
    category: 'maliyet-rehberi',
    categoryLabel: 'Maliyet & Fiyat Rehberi',
    author: 'MenakYapı Maliyet Analiz Birimi',
    publishedAt: '2026-07-20T08:00:00.000Z',
    readingTime: 6,
    featured: false,
    metaTitle: '2026 Çatı Kaplama m² Fiyatları | MenakYapı',
    metaDescription: '2026 güncel çatı kaplama m² malzeme ve işçilik fiyat analizi. Kenet çatı, kiremit ve panel maliyet kıyaslaması.',
    contentHtml: `
      <h2>2026 Yılı Güncel Çatı Kaplama Maliyetleri</h2>
      <p>Çatı yapımında maliyeti belirleyen en temel değişkenler malzeme kalitesi, çatı alanı (m²) ve şantiye işçilik zorluk derecesidir. Fiyatlar m² bazında malzeme + işçilik + iskele kurulumu dahil olarak hesaplanır.</p>

      <h3>Çatı Malzemeleri m² Dayanıklılık ve Fiyat Karşılaştırması</h3>
      <ul>
        <li><strong>Titanyum Çinko Kenet:</strong> Yüksek ilk yatırım maliyeti / 75+ yıl ömür / Sıfır bakım masrafı.</li>
        <li><strong>Alüminyum Kenet:</strong> Orta-yüksek maliyet / 50+ yıl ömür / Paslanmaz korozyon direnci.</li>
        <li><strong>Boyalı Galvaniz Kenet:</strong> Ekonomik ideal seçim / 30-40 yıl ömür / Yüksek mekanik dayanım.</li>
      </ul>
    `,
  },
  {
    id: 'fallback-4b',
    title: 'Sandviç Panel ve Kenet Çatı Fiyat Karşılaştırması: Hangisi Karlı?',
    slug: 'sandvic-panel-ve-kenet-cati-fiyat-karsilastirmasi',
    excerpt: 'Ticari binalar ve konutlar için sandviç panel ile kenet çatı arasındaki yatırım maliyeti, amortisman ve izolasyon farkı.',
    coverImageUrl: '/images/industrial-sandwich-panel-roof.png',
    coverImageAlt: 'Sandviç Panel ve Kenet Çatı Karşılaştırması',
    category: 'maliyet-rehberi',
    categoryLabel: 'Maliyet & Fiyat Rehberi',
    author: 'MenakYapı Mühendislik Ekibi',
    publishedAt: '2026-07-08T15:00:00.000Z',
    readingTime: 5,
    featured: false,
    metaTitle: 'Sandviç Panel mi Kenet Çatı mı? | MenakYapı',
    metaDescription: 'Sandviç panel ve kenet çatı maliyet, izolasyon ve kullanım ömrü karşılaştırma rehberi.',
    contentHtml: `
      <h2>Doğru Çatı Yatırımını Seçmek</h2>
      <p>Sandviç paneller fabrika ve depo gibi geniş açıklıklı endüstriyel yapılarda hızlı montaj sağlar. Kenet çatı ise vida deliksiz yapısıyla %100 sızdırmazlık sunarak konut, villa ve prestij binalarında daha yüksek amortisman sağlar.</p>
    `,
  },
  {
    id: 'fallback-4c',
    title: 'Eksiz Oluk ve Yağmur İndirme Sistemleri Metre Fiyatları',
    slug: 'eksiz-oluk-ve-yagmur-indirme-sistemleri-metre-fiyatlari',
    excerpt: 'Alüminyum ve bakır eksiz oluk montajında metre tül hesaplaması, köşe birleşim ve iniş borusu maliyet detayları.',
    coverImageUrl: '/images/eksiz-oluk-sistemi.png',
    coverImageAlt: 'Eksiz Oluk Montaj Fiyatları',
    category: 'maliyet-rehberi',
    categoryLabel: 'Maliyet & Fiyat Rehberi',
    author: 'MenakYapı Teknik Ekip',
    publishedAt: '2026-06-20T10:00:00.000Z',
    readingTime: 4,
    featured: false,
    metaTitle: 'Eksiz Oluk Metre Tül Fiyatları 2026 | MenakYapı',
    metaDescription: 'Eksiz alüminyum ve galvaniz oluk metre tül fiyatları, montaj işçiliği ve yağmur indirme borusu maliyetleri.',
    contentHtml: `
      <h2>Eksiz Oluk Metre Tül Fiyat Hesaplaması</h2>
      <p>Yağmur suyunun bina temelinden güvenle uzaklaştırılmasında eksiz oluk sistemleri metre tül (mt tül) üzerinden fiyatlandırılır. Ek yeri bulunmadığı için sarkma ve sızdırma yapmaz.</p>
    `,
  },

  // ==========================================
  // 5. YASAL SÜREÇLER & İMAR (3 KAPSAMLI YAZI)
  // ==========================================
  {
    id: 'fallback-5a',
    title: 'İnşaat Ruhsatı Nasıl Alınır? Belediye İmar Süreçleri ve İstenen Belgeler',
    slug: 'insaat-ruhsati-nasil-alinir-belediye-imar-surecleri',
    excerpt: 'Yeni bina veya çatı tadilatlarında belediye ruhsatı almak için gerekli mimari projeler, tapu belgeleri ve harç ödemeleri.',
    coverImageUrl: '/images/legal-building-permits.png',
    coverImageAlt: 'İnşaat Ruhsat Belgeleri ve Projeler',
    category: 'yasal-surecler',
    categoryLabel: 'Yasal Süreçler & İmar',
    author: 'MenakYapı Hukuk ve İmar Danışmanlığı',
    publishedAt: '2026-07-12T13:00:00.000Z',
    readingTime: 7,
    featured: false,
    metaTitle: 'İnşaat Ruhsatı Nasıl Alınır? 2026 İmar Rehberi | MenakYapı',
    metaDescription: 'Belediye inşaat ruhsatı alma adımları, gerekli mimari projeler, tapu ve zemin etüt evrakları rehberi.',
    contentHtml: `
      <h2>Belediye İmar ve Ruhsat Başvuru Adımları</h2>
      <p>Arsanıza ev veya işyeri yapmak için belediyeden Yapı Ruhsatı almanız zorunludur. Ruhsatsız yapılan inşaatlar hakkında İmar Kanunu 32. ve 42. maddeleri gereğince durdurma ve yıkım kararı uygulanır.</p>

      <h3>Ruhsat Başvurusunda İstenen Temel Evraklar</h3>
      <ol>
        <li>Tapu Tescil Belgesi ve Aplikasyon Krokisi</li>
        <li>Belediyeden Alınmış Güncel İmar Durum Belgesi</li>
        <li>Zemin Etüt Raporu (Jeoloji Mühendisleri Onaylı)</li>
        <li>Mimari, Statik, Elektrik ve Mekanik Tesisat Projeleri</li>
        <li>Yapı Denetim Hizmet Sözleşmesi ve Şantiye Şefi Taahhütnamesi</li>
      </ol>
    `,
  },
  {
    id: 'fallback-5b',
    title: 'Çatı Katı Piyesi ve Teras Kapatma Yasal Mı? İmar Yönetmeliği 2026',
    slug: 'cati-kati-piyesi-ve-teras-kapatma-yasal-mi-2026',
    excerpt: 'Dubleks daire çatı piyesi düzenlemeleri, teras cam balkonu ve saçak uzatmalarında yasal sınırlar ve ruhsat şartları.',
    coverImageUrl: '/images/projects/proje-07.jpg',
    coverImageAlt: 'Teras Kapatma ve Çatı Piyesi',
    category: 'yasal-surecler',
    categoryLabel: 'Yasal Süreçler & İmar',
    author: 'MenakYapı Teknik Ekip',
    publishedAt: '2026-06-28T11:00:00.000Z',
    readingTime: 5,
    featured: false,
    metaTitle: 'Teras Kapatma ve Çatı Piyesi Yasal Mı? | MenakYapı',
    metaDescription: 'Planlı Alanlar İmar Yönetmeliğine göre teras kapatma, çatı piyesi kaldırma ve yasal ruhsat düzenlemeleri.',
    contentHtml: `
      <h2>Planlı Alanlar İmar Yönetmeliğinde Çatı Düzenlemeleri</h2>
      <p>Çatı katı piyesleri ve teras kapatma projelerinde bağımsız bölüm alanını artıran kalıcı kapamalar belediye ruhsatına tabidir. Hafif ahşap veya sökülebilir pergole sistemleri ile emsal alanına giren kapalı alan farkları anlatılmaktadır.</p>
    `,
  },
  {
    id: 'fallback-5c',
    title: 'Şantiye Kurulumunda İş Güvenliği ve Yapı Denetim Sorumlulukları',
    slug: 'santiye-kurulumunda-is-guvenligi-ve-yapi-denetim',
    excerpt: 'Yüksekte çalışma iş güvenliği kuralları, yaşam hattı montajı ve Yapı Denetim kanunu kapsamında müteahhit sorumlulukları.',
    coverImageUrl: '/images/projects/proje-08.jpg',
    coverImageAlt: 'Şantiye İş Güvenliği ve İskele',
    category: 'yasal-surecler',
    categoryLabel: 'Yasal Süreçler & İmar',
    author: 'MenakYapı İş Güvenliği Uzmanı',
    publishedAt: '2026-06-10T09:00:00.000Z',
    readingTime: 6,
    featured: false,
    metaTitle: 'Çatı Şantiyelerinde İSG ve Yapı Denetim | MenakYapı',
    metaDescription: 'Çatı ve yüksekte çalışmalarda TS EN 795 yaşam hatları, iş güvenliği kuralları ve şantiye denetim prosedürleri.',
    contentHtml: `
      <h2>Yüksekte Çalışma ve Şantiye Güvenliği Standartları</h2>
      <p>MenakYapı olarak tüm çatı montajı projelerimizde TS EN 1263-1 güvenlik ağları, TSE belgeli dış cephe iskeleleri ve sertifikalı **yaşam hatları (life-line)** kurularak sıfır kaza hedefiyle çalışılmaktadır.</p>
    `,
  },

  // ==========================================
  // 6. GENEL YAPI REHBERİ (3 KAPSAMLI YAZI)
  // ==========================================
  {
    id: 'fallback-6a',
    title: 'Endüstriyel Depo ve Fabrika Çatılarında Doğru Kaplama Seçimi',
    slug: 'endustriyel-depo-ve-fabrika-catilarinda-dogru-kaplama-secimi',
    excerpt: 'Büyük ölçekli ticari yapılarda ısı tasarrufu sağlayan sandviç panel ve kenet çatı sistemlerinin karşılaştırmalı analizi.',
    coverImageUrl: '/images/industrial-sandwich-panel-roof.png',
    coverImageAlt: 'Fabrika ve Depo Çatı Kaplama',
    category: 'genel',
    categoryLabel: 'Genel Yapı Rehberi',
    author: 'MenakYapı Mühendislik Ekibi',
    publishedAt: '2026-07-18T14:00:00.000Z',
    readingTime: 6,
    featured: false,
    metaTitle: 'Fabrika ve Depo Çatı Kaplama Çözümleri | MenakYapı',
    metaDescription: 'Endüstriyel binalarda ısı ve su yalıtımlı sandviç panel ve kenet çatı çözümleri, GES altyapı uyumu.',
    contentHtml: `
      <h2>Fabrikalarda Enerji Verimliliği ve Çatı</h2>
      <p>Büyük metrajlı fabrika ve depolarda çatı kaplamasının izolasyon kalitesi ısıtma-soğutma giderlerini %30 etkiler. Ayrıca çatılara kurulacak Güneş Enerjisi Sistemleri (GES) için delik delmeden monte edilen kenet kelepçe altyapısı tercih edilmelidir.</p>
    `,
  },
  {
    id: 'fallback-6b',
    title: 'Eksiz Oluk Montajı: Binalarda Temel ve Cephe Koruma Sistemi',
    slug: 'eksiz-oluk-montaji-binalarda-temel-ve-cephe-koruma',
    excerpt: 'Yağmur sularının dış cepheye leke yapmasını ve temel suyuna karışarak korozyona sebep olmasını engelleyen eksiz oluk çözümleri.',
    coverImageUrl: '/images/eksiz-oluk-sistemi.png',
    coverImageAlt: 'Eksiz Oluk Montajı',
    category: 'genel',
    categoryLabel: 'Genel Yapı Rehberi',
    author: 'MenakYapı Teknik Ekip',
    publishedAt: '2026-07-01T10:00:00.000Z',
    readingTime: 5,
    featured: false,
    metaTitle: 'Eksiz Oluk Montajı ve Bina Koruma | MenakYapı',
    metaDescription: 'Eksiz oluk montaj avantajları, su tahliyesi ve dış cephe izolasyonunu koruma yöntemleri.',
    contentHtml: `
      <h2>Binanızın Ömrünü Uzatan Gizli Kahraman: Eksiz Oluklar</h2>
      <p>Eksiz oluklar, şantiye alanında kamyonet üzerindeki mobil çekme makinesi ile binanın tam ölçüsünde tek parça olarak üretilir. Ek yeri bulunmadığı için su kaçırmaz, binanın dış cephe mantolamasını ve temel betonunu sudan korur.</p>
    `,
  },
  {
    id: 'fallback-6c',
    title: 'Çatı Bakımı Kaç Yılda Bir Yapılmalı? Kış Öncesi Çatı Kontrol Checklist',
    slug: 'cati-bakimi-kac-yilda-bir-yapilmali-kis-oncesi-checklist',
    excerpt: 'Sonbahar ve kış ayları gelmeden önce oluk temizliği, dere kontrolleri ve bağlantı elamanlarının gözden geçirilmesi rehberi.',
    coverImageUrl: '/images/projects/proje-09.jpg',
    coverImageAlt: 'Çatı Periyodik Bakımı',
    category: 'genel',
    categoryLabel: 'Genel Yapı Rehberi',
    author: 'MenakYapı Bakım Servisi',
    publishedAt: '2026-05-20T11:00:00.000Z',
    readingTime: 5,
    featured: false,
    contentHtml: `
      <h2>Kışa Hazır Bir Çatı İçin Yapılması Gerekenler</h2>
      <p>Tıkanmış olukların temizlenmesi, yaprak süzgeçlerinin kontrolü ve kiremit/sac izolasyon muayenesi.</p>
    `,
  },
];

export async function getAllPosts(categoryFilter?: string): Promise<BlogArticle[]> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: 'posts',
      sort: '-publishedAt',
      limit: 100,
    });

    if (res.docs && res.docs.length > 0) {
      const posts: BlogArticle[] = res.docs.map((doc: any) => ({
        id: String(doc.id),
        title: doc.title,
        slug: doc.slug,
        excerpt: doc.excerpt || '',
        coverImageUrl: typeof doc.coverImage === 'object' && doc.coverImage?.url ? doc.coverImage.url : '/images/kenet-cati-hero.png',
        coverImageAlt: doc.title,
        category: doc.category || 'genel',
        categoryLabel: CATEGORY_MAP[doc.category] || 'Genel Yapı Rehberi',
        author: doc.author || 'MenakYapı Mühendislik Ekibi',
        publishedAt: doc.publishedAt || new Date().toISOString(),
        readingTime: doc.readingTime || 5,
        featured: Boolean(doc.featured),
        faqItems: doc.faqItems || [],
        metaTitle: doc.seo?.metaTitle || doc.title,
        metaDescription: doc.seo?.metaDescription || doc.excerpt,
      }));

      if (categoryFilter && categoryFilter !== 'all') {
        return posts.filter((p) => p.category === categoryFilter);
      }
      return posts;
    }
  } catch (err) {
    console.warn('[WARNING]: Failed to fetch posts from Payload CMS, falling back to static seed posts:', err);
  }

  if (categoryFilter && categoryFilter !== 'all') {
    return FALLBACK_POSTS.filter((p) => p.category === categoryFilter);
  }
  return FALLBACK_POSTS;
}

export async function getPostBySlug(slug: string): Promise<BlogArticle | null> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    });

    if (res.docs && res.docs.length > 0) {
      const doc = res.docs[0] as any;
      return {
        id: String(doc.id),
        title: doc.title,
        slug: doc.slug,
        excerpt: doc.excerpt || '',
        coverImageUrl: typeof doc.coverImage === 'object' && doc.coverImage?.url ? doc.coverImage.url : '/images/kenet-cati-hero.png',
        coverImageAlt: doc.title,
        category: doc.category || 'genel',
        categoryLabel: CATEGORY_MAP[doc.category] || 'Genel Yapı Rehberi',
        author: doc.author || 'MenakYapı Mühendislik Ekibi',
        publishedAt: doc.publishedAt || new Date().toISOString(),
        readingTime: doc.readingTime || 5,
        featured: Boolean(doc.featured),
        faqItems: doc.faqItems || [],
        metaTitle: doc.seo?.metaTitle || doc.title,
        metaDescription: doc.seo?.metaDescription || doc.excerpt,
      };
    }
  } catch (err) {
    console.warn('[WARNING]: Failed to fetch post by slug from Payload CMS:', err);
  }

  const fallback = FALLBACK_POSTS.find((p) => p.slug === slug);
  return fallback || null;
}

export async function getFeaturedPost(): Promise<BlogArticle> {
  const posts = await getAllPosts();
  const featured = posts.find((p) => p.featured);
  return featured || posts[0] || FALLBACK_POSTS[0];
}
