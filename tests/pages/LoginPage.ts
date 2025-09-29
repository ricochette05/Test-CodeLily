import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  // Locators
  public readonly emailInput: Locator;
  public readonly passwordInput: Locator;
  public readonly signInButton: Locator;
  public readonly registerLink: Locator;

  constructor(public readonly page: Page) {
    // Grab elements using robust locators
    this.emailInput = page.getByRole('textbox', { name: 'Email:' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password:' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
  }

  // Actions
  async navigateTo(): Promise<void> {
    await this.page.context().clearCookies();
    await this.page.goto('https://grand-youtiao-2114df.netlify.app/login');
    await this.verifyPageLoaded();
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordInput.fill(password);
  }

  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  async clickRegister(): Promise<void> {
    await this.registerLink.click();
  }

  // Assertions
  async verifyPageLoaded(): Promise<void> {
    await expect(this.emailInput).toBeVisible({ timeout: 10000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 10000 });
    await expect(this.signInButton).toBeVisible({ timeout: 10000 });
  }

  async verifyLoginSuccessful(expectedUrl: string = 'https://grand-youtiao-2114df.netlify.app/dashboard'): Promise<void> {
    await expect(this.page.getByText('Client Portal Welcome Logout')).toBeVisible({ timeout: 10000 });
    await expect(this.page).toHaveURL('https://grand-youtiao-2114df.netlify.app/client-portal.html', { timeout: 10000 });
  }

  async verifyLoginFailed(): Promise<void> {
    await expect(this.page.getByText('Client Portal Welcome Logout')).toBeVisible({ timeout: 10000 });
  }
  async screenshot(): Promise<Buffer> {
    return await this.page.screenshot();
  }
}
