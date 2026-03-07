import test, { expect } from "@playwright/test";

test("Click actions", async ({ page }) => {
  await page.goto("/FeedBackForm.html");

  const submitButton = page.getByRole("button", { name: "Submit" });
  await submitButton.click();
});

test("Click action", async ({ page }) => {
  await page.goto("/FeedBackForm.html");

  const submitButton = page.getByRole("button", { name: "Submit" });
  await submitButton.click({ button: "right", position: { x: 10, y: 10 } });
});

test("Click action - Select", async ({ page }) => {
  await page.goto("/FeedBackForm.html");

  const improvementSelect = page.getByLabel("Areas for Improvement");

  const firstOption = improvementSelect.getByRole("option").first();
  await firstOption.click();
  await expect(improvementSelect).toHaveValue("content");

  const secondOption = improvementSelect.getByRole("option").nth(1);
  await secondOption.click({
    modifiers: ["Shift"], // Hold the Shift key while clicking to select multiple options
  });
  await expect(improvementSelect).toHaveValues(["content", "presentation"]);
});

test("Click action - Checkbox", async ({ page }) => {
  await page.goto("/FeedBackForm.html");

  const checkbox = page.getByRole("checkbox", { name: "I agree to the site" });

  await checkbox.check();
  await checkbox.uncheck();

  await expect(checkbox).not.toBeChecked();
});

test("Click action - Selects", async ({ page }) => {
  await page.goto("/FeedBackForm.html");

  const improvementSelect = page.getByLabel("Areas for Improvement");

  await improvementSelect.selectOption(["content", "presentation"]);
});
