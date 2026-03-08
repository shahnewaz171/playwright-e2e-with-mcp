import test, { devices } from "@playwright/test";

const inputDevice = devices["iPhone 15 Pro"];

test.use({
  baseURL: "",
  ...inputDevice,
});

test('Observe device change - "devicechange" event', async ({ page }) => {
  await page.goto("https://google.com/");
});
