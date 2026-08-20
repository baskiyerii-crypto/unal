import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

import { Users } from './lib/payload/collections/Users';
import { Pages } from './lib/payload/collections/Pages';
import { Projects } from './lib/payload/collections/Projects';
import { Services } from './lib/payload/collections/Services';
import { Testimonials } from './lib/payload/collections/Testimonials';
import { Faqs } from './lib/payload/collections/Faqs';
import { Media } from './lib/payload/collections/Media';
import { QuoteRequests } from './lib/payload/collections/QuoteRequests';
import { Posts } from './lib/payload/collections/Posts';
import { SiteSettings } from './lib/payload/globals/SiteSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const payloadSecret =
  process.env.PAYLOAD_SECRET ||
  (() => {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('FATAL: PAYLOAD_SECRET environment variable is missing in production!');
    }
    return 'dev-only-secret-key-change-in-production-min-32-chars';
  })();

const databaseUri =
  process.env.DATABASE_URI ||
  (() => {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('FATAL: DATABASE_URI environment variable is missing in production!');
    }
    return 'postgres://menak_user:menak_pass@localhost:5432/menak_db';
  })();

// Optional: Alpine/Coolify may lack sharp native bindings; never block admin boot.
let sharpInstance: typeof import('sharp') | undefined;
try {
  sharpInstance = (await import('sharp')).default;
} catch (error) {
  console.warn('[WARNING]: sharp unavailable; image resizing disabled:', error);
}

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Pages,
    Projects,
    Services,
    Testimonials,
    Faqs,
    Media,
    QuoteRequests,
    Posts,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
    // First-boot / Coolify: create missing tables in empty Postgres.
    push: true,
  }),
  ...(sharpInstance ? { sharp: sharpInstance } : {}),
});
