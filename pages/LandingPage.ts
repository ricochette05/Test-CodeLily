import { Page, expect } from '@playwright/test';

export class LandingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://grand-youtiao-2114df.netlify.app/');
  }

  async checkNavVisibility() {
  await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(this.page.locator('nav').getByRole('link', { name: 'About Us' })).toBeVisible();
  await expect(this.page.getByRole('link', { name: 'Services' })).toBeVisible();
  await expect(this.page.getByRole('link', { name: 'contact' })).toBeVisible();
  await expect(this.page.getByRole('link', { name: 'Sign In / Register' })).toBeVisible();
 }


  async checkFooterVisibility() {
    await expect(this.page.getByRole('link', { name: 'Our Mission & Values' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Operating Hours' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'support' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Global Network' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Service Areas' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Shipping Guides' })).toBeVisible();
  }
}
