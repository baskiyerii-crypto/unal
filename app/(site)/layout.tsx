import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import Script from 'next/script';
import '../globals.css';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { FloatingContact } from '@/components/ui/FloatingContact';
import { getSiteSettings } from '@/lib/payload/getSiteSettings';
import {
  DEFAULT_WHATSAPP_MESSAGE,
  normalizePhone,
  resolveContactPersons,
} from '@/lib/utils/contacts';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'MenakYapı — Kenet Çatı Sistemleri, Yapı & Çatı Tadilatı | Ankara & Antalya',
  description:
    "MenakYapı; Ankara, Antalya ve tüm Türkiye'de kenet çatı sistemleri, çatı yapımı, oluk değişimi ve izolasyon tadilatında 20 yıllık tecrübesiyle garantili hizmet sunar. Ücretsiz teklif alın!",
  keywords: [
    'kenet çatı',
    'çatı yapımı',
    'çatı tadilatı',
    'oluk değişimi',
    'ankara çatı ustası',
    'antalya kenet çatı',
    'menakyapı',
  ],
  openGraph: {
    title: 'MenakYapı — Kenet Çatı Sistemleri ve Çatı Çözümleri',
    description: '20 yıllık tecrübe, 500+ tamamlanan proje, %100 su yalıtım garantisi.',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  const contacts = resolveContactPersons(settings);
  const primaryPhone = contacts[0]?.phone || '05317924006';
  const email = settings?.email || 'menakyapi@gmail.com';
  const address =
    settings?.address || 'Şehitler caddesi Selahattin Ecevit sokak 36/3 Mamak Ankara';
  const workingHours = settings?.workingHours || 'Haftaiçi 08:00 - 17:00';
  const gtmId = settings?.tracking?.gtmId || process.env.NEXT_PUBLIC_GTM_ID;
  const searchConsoleMeta = settings?.tracking?.googleSearchConsoleMeta;
  const whatsappMessage = settings?.whatsappMessage || DEFAULT_WHATSAPP_MESSAGE;

  const telSchema = `+90${normalizePhone(primaryPhone).replace(/^0/, '')}`;

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: 'MenakYapı',
    image: 'https://menakyapi.com/images/projects/proje-01.jpg',
    '@id': 'https://menakyapi.com/#organization',
    url: 'https://menakyapi.com',
    telephone: telSchema,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: 'Mamak',
      addressRegion: 'Ankara',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.9208,
      longitude: 32.8541,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    areaServed: [
      { '@type': 'City', name: 'Ankara' },
      { '@type': 'City', name: 'Antalya' },
      { '@type': 'Country', name: 'Türkiye' },
    ],
    knowsAbout: [
      'Kenet Çatı Sistemleri',
      'Titanyum Çinko Çatı Kaplama',
      'Çatı Tadilatı ve İzolasyon',
      'Eksiz Oluk Montajı',
      'Çatı İmalatı ve Montajı',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '128',
    },
  };

  return (
    <html lang="tr" className={`${outfit.variable} ${inter.variable} scroll-smooth`}>
      <head>
        {searchConsoleMeta && (
          <meta name="google-site-verification" content={searchConsoleMeta} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111827]">
        {gtmId && (
          <>
            <Script
              id="gtm-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${gtmId}');
                `,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          </>
        )}
        <Header contacts={contacts} whatsappMessage={whatsappMessage} />
        <main className="grow">{children}</main>
        <Footer
          contacts={contacts}
          whatsappMessage={whatsappMessage}
          email={email}
          address={address}
          workingHours={workingHours}
        />
        <FloatingContact contacts={contacts} whatsappMessage={whatsappMessage} />
      </body>
    </html>
  );
}
