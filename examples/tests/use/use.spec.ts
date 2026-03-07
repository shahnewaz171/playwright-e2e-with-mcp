import test from "@playwright/test";

test.use({
  baseURL: "",
  locale: "bd-BD",
});

test("Test with use annotation", async ({ page }) => {
  await page.goto("https://google.com/");
});

test("Test with use annotation - 2", async ({ browser }) => {
  const context = await browser.newContext({
    locale: "af-ZA",
  });
  const page = await context.newPage();

  await page.goto("https://google.com/");
});
