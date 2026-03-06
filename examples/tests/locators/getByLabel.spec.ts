import test, { expect } from "@playwright/test";

test("Get by label practice", async ({ page }) => {
  await page.goto("/FeedBackForm.html");

  const text = page.getByLabel("Name");
  await text.click();
  await text.fill("Shahnewaz");

  await expect(text).toHaveValue("Shahnewaz"); // Verify that the input field has the expected value after filling it
});
