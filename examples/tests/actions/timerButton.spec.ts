import test, { expect } from "@playwright/test";

test("Complex button test - wrong approach", async ({ page }) => {
  await page.goto("ComplexButton.html");

  const button = page.locator("button");

  const isVisible = await button.isVisible();
  expect.soft(isVisible).toBe(true);

  const isEnabled = await button.isEnabled();
  expect.soft(isEnabled).toBe(true);

  await button.click();
});

test("Complex button test - wrong approach - with good results", async ({
  page,
}) => {
  await page.goto("ComplexButton.html");

  const button = page.locator("button");

  await button.click();

  const isVisible = await button.isVisible();
  expect.soft(isVisible).toBe(true);

  const isEnabled = await button.isEnabled();
  expect.soft(isEnabled).toBe(true);
});

test("Timer button - good approach", async ({ page }) => {
  await page.goto("/ComplexButton.html");

  const timerButton = page.locator("#myButton");

  await expect(timerButton).toBeVisible();
  await expect(timerButton).toBeEnabled();

  await timerButton.click();

  await expect(page.locator("#myLabel")).toBeVisible();
});
