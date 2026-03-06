import test, { chromium } from "@playwright/test";

test("Close smart bar", async ({ page }) => {
  await page.goto("https://www.udemy.com/");

  await page.getByTestId("smart-bar-hide").click();
});

test("Is the banner visible?", async ({ page }) => {
  await page.goto("https://www.udemy.com/");

  await page.pause();
});

test("Browser fixture", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.udemy.com/");
});

test("Create a page manually", async ({}) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.udemy.com/");
});
