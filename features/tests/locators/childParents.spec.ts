import test, { expect } from "@playwright/test";

test("Child locator practice", async ({ page }) => {
  await page.goto("");

  const serviceList = page.getByRole("list");
  const serviceListItems = await serviceList.getByRole("listitem").all();

  expect(serviceListItems.length).toBeGreaterThan(0);

  //  with css locators
  const serviceItems = await page.locator("ul > li").all();

  for (const item of serviceItems) {
    const itemContent = await item.textContent();
    console.log("Service Item:", itemContent); // Log the text content of each service item
    expect(itemContent).toBeTruthy(); // Ensure the service item has text content
  }
});

test("Parent locator practice", async ({ page }) => {
  await page.goto("");

  //   const cookieBanner = page.locator("#cookie-banner");
  const acceptCookieBtn = page.getByTestId("accept-cookies");
  const cookieBanner = acceptCookieBtn.locator("..");
  await acceptCookieBtn.click();
  await expect(cookieBanner).not.toBeVisible();
});

test("N-th element locator - button", async ({ page }) => {
  await page.goto("");

  const button = page.getByRole("button");

  const acceptCookieBtn = button.first(); // Get the first button (Accept)
  const declineCookieBtn = button.last(); // Get the last button (Decline)

  await acceptCookieBtn.click();
  await expect(declineCookieBtn).not.toBeVisible();
});

test("N-th element locator - list items", async ({ page }) => {
  await page.goto("");

  const listItem = page.getByRole("listitem");

  const item = listItem.nth(3); // Get the fourth list item
  console.log("item:", await item.textContent()); // Log the text content of the fourth list item

  await expect(item).toBeVisible();
});
