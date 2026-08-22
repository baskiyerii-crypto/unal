import { test, expect } from '@playwright/test';

test.describe('MenakYapı Homepage & Lead Form E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render homepage heading and brand title correctly', async ({ page }) => {
    // Expect page title to contain MenakYapı
    await expect(page).toHaveTitle(/MenakYapı/);

    // Expect hero H1 title to be visible
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('Kenet Çatı');
  });

  test('should show two named phone numbers and WhatsApp links in the header', async ({ page }) => {
    const header = page.locator('header');
    await expect(header.locator('a[href^="tel:"]').first()).toBeVisible();
    expect(await header.locator('a[href^="tel:"]').count()).toBeGreaterThanOrEqual(2);
    expect(await header.locator('a[href*="wa.me"]').count()).toBeGreaterThanOrEqual(2);

    await page.getByRole('button', { name: /Telefon ile ulaşın/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog').locator('a[href^="tel:"]')).toHaveCount(2);
  });

  test('should show validation error when submitting quote form without KVKK consent', async ({ page }) => {
    // Scroll to Teklif Al form
    const formSection = page.locator('#teklif-al');
    await formSection.scrollIntoViewIfNeeded();

    // Fill form inputs
    await page.fill('input[placeholder="Örn: Ahmet Yılmaz"]', 'Test Kullanıcı');
    await page.fill('input[placeholder="05XX XXX XX XX"]', '05317924006');

    // Submit form without checking KVKK
    await page.click('button[type="submit"]');

    // Expect error message about KVKK consent
    const errorMessage = page.locator('text=KVKK Aydınlatma Metni');
    await expect(errorMessage).toBeVisible();
  });
});
