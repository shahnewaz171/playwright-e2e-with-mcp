import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: "html",
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
    launchOptions: {
      slowMo: 1000,
    },
    testIdAttribute: "data-testid", // we can change default test id attribute such as data-pw, data-testid
  },
});
