/*
 - Recommended to use CSS selectors as a last resort when other locators are not available or not suitable for the element we want to locate.
 - CSS selectors are powerful and flexible, but they can be brittle and hard to maintain if the dom element structure changes in the page.
*/

import test, { expect } from "@playwright/test";

test("CSS selector practice - Heading", async ({ page }) => {
  await page.goto("");

  const welcomeHeading = page.locator("header").locator("h1");
  const welcomeHeadingText = await welcomeHeading.textContent();
  // await expect(welcomeHeading).toContainText("Cool");
  expect(welcomeHeadingText).toContain("Cool");

  const welcomeMessage = page.locator("header > p");
  const welcomeMessageText = await welcomeMessage.textContent();
  expect(welcomeMessageText).toContain("one-stop solution");

  const cookieBanner = page.locator(".accept");
  await cookieBanner.click();
  await expect(cookieBanner).not.toBeVisible();

  const serviceHeading = page.locator("#services").locator("h2");
  await expect(serviceHeading).toHaveText("Our Services");
});
