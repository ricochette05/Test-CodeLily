import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/Dashboard';

test.describe('Client Portal / Dashboard', () => {
  let portal: DashboardPage;

  test.beforeEach(async ({ page }) => {
    portal = new DashboardPage(page);
    await portal.goto();
  });

  test('header is visible and correct', async () => {
    const txt = await portal.getHeaderText();
    expect(txt).toContain('Client Portal');  // adapt expected string
  });

  test('can open profile menu and logout option exists', async () => {
    await portal.openProfileMenu();
    await expect(portal.logoutButton).toBeVisible();
  });

  test('logout works (navigates away / shows login)', async ({ page }) => {
    await portal.openProfileMenu();
    await portal.logout();
    // expect navigation to login, e.g.:
    await expect(page).toHaveURL(/login|signin/);
  });
});
