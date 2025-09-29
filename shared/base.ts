import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../tests/pages/LoginPage';
import { RegistrationPage } from '../tests/pages/RegistrationPage';

type MyFixtures = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await use(registrationPage);
  },
});

export { expect };
