import { describe, it, expect } from 'vitest';
import { z } from 'zod';

const quoteSchema = z.object({
  fullName: z.string().min(2, 'Ad Soyad en az 2 karakter olmalıdır.'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz.'),
  city: z.string().default('Ankara'),
  service: z.string().default('kenet-cati'),
  message: z.string().optional(),
  kvkkConsent: z.literal(true, {
    errorMap: () => ({ message: 'KVKK onayı zorunludur.' }),
  }),
});

describe('Quote Form Validation Tests', () => {
  it('validates a correct form submission successfully', () => {
    const validData = {
      fullName: 'Ahmet Yılmaz',
      phone: '05317924006',
      city: 'Ankara',
      service: 'kenet-cati',
      message: '150 m2 kenet çatı fiyatı rica ediyorum',
      kvkkConsent: true,
    };

    const result = quoteSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('fails validation when KVKK consent is false', () => {
    const invalidData = {
      fullName: 'Mehmet Demir',
      phone: '05317924006',
      city: 'Antalya',
      service: 'oluk-montaji',
      kvkkConsent: false,
    };

    const result = quoteSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
