import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: "html",
  // fullyParallel: true,
  // workers: 3, // we can specify the number of workers to run tests in parallel. By default, it uses the half of the available CPU cores.
  workers: "50%", // we can specify the percentage of workers to run tests in parallel. By default, it uses the half of the available CPU cores.
  retries: 0, // we can specify the number of retries for failed tests. By default, it is 0.
  // grep: /Tag locator/, // we can run tests with test title matching the regex pattern
  // grepInvert: /Tag locator/, // we can run tests with test title not matching the regex pattern
  webServer: {
    command: "pnpm run start",
    url: "http://localhost:5001",
    reuseExistingServer: true,
  },
  // timeout: 5000,
  use: {
    baseURL: "http://localhost:5001",
    headless: false,
    locale: "en-US",
    defaultBrowserType: "chromium",
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      slowMo: 1000,
    },
    testIdAttribute: "data-testid", // we can change default test id attribute such as data-pw, data-testid
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["auth-setup"],
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    // multiple environments
    // {
    //   name: "production",
    //   use: {
    //     baseURL: "production.example.com",
    //   },
    //   retries: 0,
    // },
    {
      name: "auth-setup",
      testMatch: "tests/setup/Auth.setup.ts",
    },
  ],
});
