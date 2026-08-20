import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { getSiteSettings } from '@/lib/payload/getSiteSettings';

function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return m;
    }
  });
}

// In-Memory Rate Limiting per IP (15 mins window, max 5 requests)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

const quoteSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Ad Soyad en az 3 karakter olmalıdır.')
    .regex(/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/, 'Ad Soyad sadece harf içermelidir.'),
  phone: z
    .string()
    .regex(/^0[0-9]{10}$/, 'Geçerli bir telefon numarası giriniz. (Örn: 05XXXXXXXXX)'),
  city: z.string().default('Ankara'),
  service: z.string().default('kenet-cati'),
  message: z.string().max(2000, 'Mesaj en fazla 2000 karakter olabilir.').optional(),
  kvkkConsent: z.literal(true, {
    errorMap: () => ({ message: 'KVKK onayı zorunludur.' }),
  }),
});

const serviceLabels: Record<string, string> = {
  'kenet-cati': 'Kenet Çatı Sistemleri',
  'cati-yapimi': 'Çatı Yapımı ve Montajı',
  'cati-tadilat': 'Çatı Tadilat ve Onarımı',
  'oluk-montaji': 'Oluk Montajı ve Değişimi',
};

export async function POST(req: Request) {
  try {
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Çok fazla teklif talebi gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validatedData = quoteSchema.parse(body);

    // 1. Save submission directly into Payload CMS database (PostgreSQL)
    let savedLeadId: string | number | null = null;
    try {
      const payload = await getPayload({ config });
      const createdRecord = await payload.create({
        collection: 'quote-requests',
        data: {
          fullName: validatedData.fullName,
          phone: validatedData.phone,
          city: validatedData.city,
          service: serviceLabels[validatedData.service] || validatedData.service,
          message: validatedData.message || '',
          kvkkConsent: validatedData.kvkkConsent,
          status: 'new',
        },
      });
      savedLeadId = createdRecord.id;
      console.log(`[QUOTE API SUCCESS]: Lead saved to Payload CMS DB with ID: ${savedLeadId}`);
    } catch (dbError) {
      console.error('[QUOTE API DB ERROR]: Failed to persist lead in Payload CMS:', dbError);
    }

    // 2. Resolve recipient email from SiteSettings Global or ENV
    const siteSettings = await getSiteSettings();
    const recipient = siteSettings?.email || process.env.NOTIFICATION_EMAIL_RECIPIENT || 'menakyapi@gmail.com';

    // 3. Send Notification Email via Nodemailer SMTP if configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = Number(process.env.SMTP_PORT) || 587;

    const formattedService = serviceLabels[validatedData.service] || validatedData.service;
    const cleanPhone = validatedData.phone.replace(/\s+/g, '');
    const safeFullName = escapeHtml(validatedData.fullName);
    const safeCity = escapeHtml(validatedData.city);
    const safeMessage = validatedData.message ? escapeHtml(validatedData.message) : 'Not girilmedi';
    const safeService = escapeHtml(formattedService);

    if (smtpHost && smtpUser && smtpPass && smtpPass !== 'your_app_specific_password_here') {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: `"MenakYapı Web Formu" <${smtpUser}>`,
          to: recipient,
          subject: `🔔 [YENİ TEKLİF İSTEĞİ] ${safeFullName} - ${safeCity}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; rounded: 8px;">
              <div style="background-color: #24292E; padding: 16px; text-align: center; border-radius: 6px 6px 0 0;">
                <h1 style="color: #D4AF37; margin: 0; font-size: 20px; text-transform: uppercase;">MenakYapı Çatı Sistemleri</h1>
                <p style="color: #ffffff; margin: 4px 0 0 0; font-size: 13px;">Web Sitesinden Yeni Müşteri Teklif Talebi</p>
              </div>

              <div style="padding: 20px; background-color: #ffffff;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333333;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; width: 35%;">Müşteri Adı Soyadı:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${safeFullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Telefon Numarası:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                      <a href="tel:${cleanPhone}" style="color: #0066cc; font-weight: bold; text-decoration: none;">${validatedData.phone} (Tıkla Ara)</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Şehir / Bölge:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${safeCity}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Talep Edilen Hizmet:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${safeService}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Müşteri Mesajı / Notu:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${safeMessage}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold;">KVKK Aydınlatma Onayı:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: green; font-weight: bold;">✅ Onaylandı</td>
                  </tr>
                  ${savedLeadId ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Payload CMS Kayıt ID:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">#${savedLeadId}</td>
                  </tr>
                  ` : ''}
                </table>

                <div style="margin-top: 24px; text-align: center;">
                  <a href="tel:${cleanPhone}" style="background-color: #25D366; color: #ffffff; padding: 12px 24px; border-radius: 30px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 14px;">
                    📞 Müşteriyi Hemen Ara (${validatedData.phone})
                  </a>
                </div>
              </div>

              <div style="background-color: #f8f9fa; padding: 12px; text-align: center; border-radius: 0 0 6px 6px; font-size: 11px; color: #777777;">
                Bu e-posta MenakYapı web portalı teklif formu üzerinden otomatik üretilmiştir.
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`[SMTP SUCCESS]: Notification email successfully sent to ${recipient}`);
      } catch (mailError) {
        console.error('[SMTP ERROR]: Failed to send email via SMTP transporter:', mailError);
      }
    } else {
      console.warn(
        `[SMTP NOTICE]: SMTP_PASS is missing or set to placeholder in .env. Email notice skipped, lead saved in DB (#${savedLeadId}).`
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Teklif talebiniz başarıyla alındı. Ekibimiz 30 dakika içerisinde sizinle iletişime geçecektir.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message || 'Form doğrulama hatası.' }, { status: 400 });
    }
    console.error('[QUOTE API SYSTEM ERROR]:', error);
    return NextResponse.json({ error: 'Sunucu hatası oluştu. Lütfen tekrar deneyin.' }, { status: 500 });
  }
}
