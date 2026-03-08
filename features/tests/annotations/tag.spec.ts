import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/FeedBackForm.html");
});

test("Feedback form - Tag locator", { tag: "@name" }, async ({ page }) => {
  const nameField = page.getByRole("textbox", { name: "name" });

  await nameField.fill("John Doe");

  expect(nameField).toBeTruthy();

  await page.context().clearCookies();

  await page.reload();

  await expect(nameField).toBeEmpty();
});

test(
  "Feedback email form - Tag locator",
  { tag: "@email" },
  async ({ page }) => {
    const emailField = page.getByRole("textbox", { name: "email" });

    await emailField.fill("shahnewaz@example.com");

    expect(emailField).toBeTruthy();

    await page.context().clearCookies();

    await page.reload();

    await expect(emailField).toBeEmpty();
  },
);
