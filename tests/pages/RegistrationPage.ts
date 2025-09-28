import { expect, Locator, Page } from '@playwright/test';

export class RegistrationPage {
  // Locators
  public readonly emailInput: Locator;
  public readonly passwordInput: Locator;
  public readonly confirmPasswordInput: Locator;
  public readonly registerButton: Locator;
  public readonly loginLink: Locator;

  constructor(public readonly page: Page) {
    
    this.emailInput = page.getByRole('textbox', { name: 'Email:' });
    this.passwordInput = page.locator('#register-password');       // FIXED
    this.confirmPasswordInput = page.locator('#confirm-password'); // FIXED
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.loginLink = page.getByRole('link', { name: 'Sign In' });
  }

  // Actions
  async navigateTo(): Promise<void> {
    await this.page.context().clearCookies();
    await this.page.goto('https://grand-youtiao-2114df.netlify.app/login#');
    await this.page.getByRole('link', { name: 'Register' }).click();
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

  async enterConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.confirmPasswordInput.fill(password);
  }

  async clickRegister(): Promise<void> {
    await this.registerButton.click();
  }

  async register(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.enterConfirmPassword(password);
    await this.clickRegister();
  }

  async clickLogin(): Promise<void> {
    await this.loginLink.click();
  }

  // Assertions
  async verifyPageLoaded(): Promise<void> {
    await expect(this.emailInput).toBeVisible({ timeout: 10000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 10000 });
    await expect(this.confirmPasswordInput).toBeVisible({ timeout: 10000 });
    await expect(this.registerButton).toBeVisible({ timeout: 10000 });
  }

  async verifyRegistrationSuccessful(): Promise<void> {
    // await expect(this.page).toHaveURL(expectedUrl, { timeout: 10000 });
    await expect(this.page.locator('#login-form')).toBeVisible({ timeout: 5000 });
  }
  
  async verifyRegistrationFailed(): Promise<void> {
    // Assert the login form is still visible
    await expect(this.page.locator('#login-form')).toBeVisible({ timeout: 5000 });
  }

  async screenshot(): Promise<Buffer> {
    return await this.page.screenshot();
  }
}
