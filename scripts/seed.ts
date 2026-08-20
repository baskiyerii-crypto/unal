import fs from 'fs';
import path from 'path';

// Load .env file explicitly for CLI execution
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8');
  for (const line of envConfig.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...valParts] = trimmed.split('=');
      const val = valParts.join('=').trim();
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  }
}

import { seedFullDatabase } from '../lib/payload/seedFullDatabase';

async function run() {
  console.log('[CLI SEED]: Starting manual seeding process...');
  await seedFullDatabase();
  console.log('[CLI SEED]: Seeding completed successfully. Exiting.');
  process.exit(0);
}

run().catch((err) => {
  console.error('[CLI SEED FATAL ERROR]:', err);
  process.exit(1);
});
