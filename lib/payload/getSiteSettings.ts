import { getPayload } from 'payload';
import config from '@/payload.config';
import { ensureAdminAndSettings } from './seedAdminAndSettings';

export async function getSiteSettings() {
  try {
    await ensureAdminAndSettings();
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 2,
    });

    if (!settings) {
      console.warn('[WARNING]: site-settings Global is null or undefined! Please configure site-settings in Payload Admin.');
    }

    return settings;
  } catch (error) {
    console.warn('[WARNING]: Failed to fetch site-settings from Payload CMS:', error);
    return null;
  }
}

