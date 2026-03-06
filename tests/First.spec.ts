import test, { expect } from "@playwright/test";

test("Go to Docs", async ({ page }) => {
  // Arrange
  await page.goto("https://playwright.dev/");
  await page.getByRole("link", { name: "Docs" }).click();

  const heading = page.getByRole("heading", {
    name: "IntroductionDirect link to",
  });

  await expect(heading).toHaveText("Introduction");
});
