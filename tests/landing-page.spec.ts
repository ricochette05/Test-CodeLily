import { test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test.describe('Landing Page Tests', () => {
  test('Verify navigation and footer links', async ({ page }) => {
    const landingPage = new LandingPage(page);

    await landingPage.goto();

    // NAVIGATION
    await landingPage.checkNavVisibility();
    await landingPage.checkNavVisibility();

    // FOOTER
    await landingPage.checkFooterVisibility();
  });
});
