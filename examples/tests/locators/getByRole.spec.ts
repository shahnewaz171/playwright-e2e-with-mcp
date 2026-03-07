import test, { expect } from "@playwright/test";

test.describe.configure({ mode: "parallel" }); // Run tests in parallel within this describe block. Each test will run in its own worker thread, allowing for faster execution. This is especially useful when you have a large number of tests that can be executed concurrently without dependencies on each other.

test.beforeAll(async () => {
  console.log("Initial settings or setup can be done here");
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async setup
});

test.beforeEach(async ({ page }) => {
  await page.goto("");
});

test("Get by rule practice - heading", async ({ page }) => {
  const heading = page.getByRole("heading", { name: "our services" });

  await expect(heading).toBeVisible();
});

test("Get by rule practice - List", async ({ page }) => {
  const list = page.getByRole("list");
  await expect(list).toBeVisible();

  const listItems = await page.getByRole("listitem").all();

  for (const item of listItems) {
    const itemText = await item.textContent();
    expect(itemText).toBeTruthy(); // Ensure the list item has text content
  }
});

test("Get by rule practice - cookie banner", async ({ page }) => {
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
  await page.getByRole("button", { name: "Decline" }).click();

  await page.getByRole("link", { name: "Go to Feedback Form" }).click();

  expect(page.url()).toContain("FeedBack"); // Verify that the URL contains "FeedBack" on path after clicking the link

  // await expect(
  //   page.getByRole("button", { name: "Save Progress" }),
  // ).toBeVisible();
});

test.afterEach(async ({ page }) => {
  console.log("Test completed. You can perform cleanup tasks here if needed.");
});

test.afterAll(async () => {
  console.log("Close database connections or perform cleanup tasks here");
});
