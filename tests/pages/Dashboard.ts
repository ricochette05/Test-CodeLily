import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly header: Locator;
  readonly profileMenu: Locator;
  readonly logoutButton: Locator;
  // add more locators as needed
  
  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header h1');  // adjust selector to actual header
    this.profileMenu = page.locator('[data-testid="profile-menu"]');  // example
    this.logoutButton = page.locator('button:has-text("Logout")');
  }

  async goto() {
    await this.page.goto('/client-portal.html');  // assuming baseURL is set
  }

  async getHeaderText(): Promise<string> {
    return (await this.header.textContent())!;
  }

  async openProfileMenu() {
    await this.profileMenu.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  // More methods for interactions on the portal page
}
