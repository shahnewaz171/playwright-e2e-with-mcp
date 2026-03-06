import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  webServer: {
    command: "pnpm run start",
    url: "http://localhost:5001",
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://localhost:5001",
    headless: false,
    launchOptions: {
      slowMo: 1000,
    },
  },
});
