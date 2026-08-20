import { seedFullDatabase } from './seedFullDatabase';

let seeded = false;

export async function ensureAdminAndSettings() {
  if (seeded) return;
  try {
    await seedFullDatabase();
    seeded = true;
  } catch (error) {
    console.warn('[SEED WARNING]: Failed to auto-seed full database:', error);
  }
}
