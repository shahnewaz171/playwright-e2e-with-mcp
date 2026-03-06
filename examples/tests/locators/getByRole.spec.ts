import test, { expect } from "@playwright/test";

test("Get by rule practice - heading", async ({ page }) => {
  await page.goto("");

  const heading = page.getByRole("heading", { name: "our services" });

  await expect(heading).toBeVisible();
});

test("Get by rule practice - List", async ({ page }) => {
  await page.goto("");

  const list = page.getByRole("list");
  await expect(list).toBeVisible();

  const listItems = await page.getByRole("listitem").all();

  for (const item of listItems) {
    const itemText = await item.textContent();
    expect(itemText).toBeTruthy(); // Ensure the list item has text content
  }
});

test("Get by rule practice - cookie banner", async ({ page }) => {
  await page.goto("");

  const acceptCookieBanner = page.getByRole("button", {
    name: "Accept",
    exact: true, // Use it for case-sensitive and whole-string matching
  });
  const declineCookieBanner = page.getByRole("button", {
    name: "Decline",
    exact: true,
  });

  await acceptCookieBanner.click();

  await expect(acceptCookieBanner).not.toBeVisible(); // Accept button should not be visible after clicking
  await expect(declineCookieBanner).not.toBeVisible(); // Decline button should not be visible after clicking accept
});

test("Get by rule practice - anchor", async ({ page }) => {
  await page.goto("");

  await page.getByRole("button", { name: "Decline" }).click();

  await page.getByRole("link", { name: "Go to Feedback Form" }).click();

  expect(page.url()).toContain("FeedBack"); // Verify that the URL contains "FeedBack" on path after clicking the link

  // await expect(
  //   page.getByRole("button", { name: "Save Progress" }),
  // ).toBeVisible();
});
