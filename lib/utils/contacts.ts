export type ContactPerson = {
  name: string;
  phone: string;
};

export const DEFAULT_CONTACT_PERSONS: ContactPerson[] = [
  { name: 'Merkez Hat', phone: '05317924006' },
  { name: 'Saha Hat', phone: '05317924006' },
];

export const DEFAULT_WHATSAPP_MESSAGE =
  'Merhaba MenakYapı, çatı/kenet çatı hizmetleriniz hakkında ücretsiz teklif ve bilgi almak istiyorum.';

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function formatPhoneDisplay(phone: string): string {
  const digits = normalizePhone(phone);
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
  }
  return phone;
}

export function toTelHref(phone: string): string {
  return `tel:${normalizePhone(phone)}`;
}

export function toWhatsAppHref(phone: string, message?: string): string {
  let digits = normalizePhone(phone);
  if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  const base = `https://wa.me/90${digits}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

type SettingsLike = {
  contactPersons?: Array<{ name?: string | null; phone?: string | null } | null> | null;
  phone?: string | null;
  whatsapp?: string | null;
};

export function resolveContactPersons(settings: SettingsLike | null | undefined): ContactPerson[] {
  const raw = settings?.contactPersons;
  if (Array.isArray(raw) && raw.length > 0) {
    const mapped = raw
      .filter((p): p is { name: string; phone: string } => Boolean(p?.name && p?.phone))
      .map((p) => ({
        name: p.name.trim(),
        phone: normalizePhone(p.phone),
      }))
      .filter((p) => p.phone.length >= 10);

    if (mapped.length > 0) {
      return mapped.slice(0, 2);
    }
  }

  // Legacy single-field fallback (pre-migration documents / partial seed)
  const legacy = settings?.phone || settings?.whatsapp;
  if (legacy) {
    return [{ name: 'İletişim', phone: normalizePhone(legacy) }];
  }

  return DEFAULT_CONTACT_PERSONS;
}
