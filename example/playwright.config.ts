import { defineConfig, devices } from "@playwright/test";
import path from "path";

const authFile = path.resolve(__dirname, "playwright/.auth/user.json");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env") });

const baseURL = process.env.BASE_URL;
const slowMo = process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0;
const startLocalServer = baseURL === 'http://localhost:8080';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: !!process.env.CI, // headless is for enabling the browser UI when running tests locally, and disable it when running tests on CI
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: "data-test-id",
    launchOptions: slowMo ? { slowMo } : undefined,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      testIgnore: /auth/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    // project for files with auth
    {
      name: "auth-files",
      // match for file with auth:
      testMatch: /auth/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: authFile,
      },
      dependencies: ["auth-setup"],
    },

    {
      name: "auth-setup",
      testMatch: "auth.setup.ts",
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
webServer: startLocalServer
    ? {
        command: 'npm run dev -- --host 127.0.0.1 --port 8080 --strictPort',
        url: baseURL,
        reuseExistingServer: true,
        timeout: 120_000,
      }
    : undefined,
});
