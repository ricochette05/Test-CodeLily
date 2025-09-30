import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/Dashboard';

test.describe('Client Portal / Dashboard', () => {
  let portal: DashboardPage;

  test.beforeEach(async ({ page }) => {
    portal = new DashboardPage(page);
    await portal.goto();
  });

  test('Verify header is visible and correct', async () => {
    await expect(portal.header).toBeVisible();
    await expect(portal.header).toHaveText('Dashboard Overview');
  });

  test('Verify Dashboard Overview Page contents and logout option exists', async ({ page }) => {
    // Verify header
    await expect(portal.header).toHaveText('Dashboard Overview');

    // Metrics
    // Metrics
    const activeShipmentsCard = page.locator('text=Active Shipments').locator('..'); 
    await expect(activeShipmentsCard.getByText('5', { exact: true })).toBeVisible();

    const deliveredCard = page.locator('text=Delivered This Week').locator('..');
    await expect(deliveredCard.getByText('2', { exact: true })).toBeVisible();

    const pendingCard = page.locator('text=Pending Action').locator('..');
    await expect(pendingCard.getByText('1', { exact: true })).toBeVisible();


    // Recent shipments table
    await expect(page.getByRole('heading', { name: 'Recent Shipments' })).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();

    // Logout link
    await expect(portal.logoutLink).toBeVisible();
    await expect(portal.logoutLink).toHaveText('Logout');
  });

  test('Verify logout function)', async ({ page }) => {
    await portal.logout(); // <-- perform the action
    await expect(page).toHaveURL(/hackathon\/index\.html$/);
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  });
});
