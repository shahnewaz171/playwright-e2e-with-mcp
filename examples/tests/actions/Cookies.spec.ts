import test, { expect } from "@playwright/test";

test("Cookies actions", async ({ page }) => {
  await page.goto("/FeedBackForm.html");

  await page.context().addCookies([
    {
      name: "cookieConsent",
      value: "accepted",
      url: page.url(),
    },
  ]);

  await page.reload();

  await expect(page.locator("#cookie-banner")).not.toBeVisible();
});
