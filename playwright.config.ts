import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  // Set the base URL for tests — so you can use relative paths in page.goto
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    baseURL: 'https://grand-youtiao-2114df.netlify.app',
  },
  reporter: [['list'], ['html']],

  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    // },
    // {
    //   name: 'Firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'WebKit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
  ],
});
