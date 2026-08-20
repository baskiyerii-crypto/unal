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

  test('should display contact phone number and WhatsApp links', async ({ page }) => {
    // Expect phone number 0531 792 40 06 to be visible
    const phoneLinks = page.locator('a[href^="tel:05317924006"]');
    await expect(phoneLinks.first()).toBeVisible();

    // Expect WhatsApp link to be present
    const whatsappLinks = page.locator('a[href*="wa.me"]');
    await expect(whatsappLinks.first()).toBeVisible();
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
