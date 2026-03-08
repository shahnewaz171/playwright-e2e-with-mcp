/*
 - useful for dynamic elements that do not have a unique selector.
 - useful for elements that are not visible on the page, such as modals or pop-ups.
 - we can use it also for complex scenarios where we need to locate an element based on its relationship with other elements.
*/

import test, { expect } from "@playwright/test";

test("Get by test id practice - Accept cookie", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("");

  const acceptCookieBtn = page.getByTestId("accept-cookies");
  await acceptCookieBtn.click();

  await expect(acceptCookieBtn).not.toBeVisible();
});
