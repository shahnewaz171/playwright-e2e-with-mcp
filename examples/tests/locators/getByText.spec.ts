import test, { expect } from "@playwright/test";

test("Get by text practice", async ({ page }) => {
  await page.goto("/FeedBackForm.html");

  // const text = page.getByText("below to provide").nth(0);
  const text = page.getByText("below to provide").first(); // Use .first() or .nth(0) to get the first matching element

  await expect(text).toBeVisible();
});

test("Get by text practice - Error message", async ({ page }) => {
  await page.goto("/FeedBackForm.html");

  const emailValidationError = page.getByText("Invalid email");

  //   await expect(emailValidationError).not.toBeVisible(); // the error message should not be visible
  await expect(emailValidationError).toBeHidden(); // the error message should be hidden

  await page.getByRole("textbox", { name: "Email" }).fill("shahnewaz@gmail");
  await expect(emailValidationError).toBeVisible(); // the error message should be visible after entering an invalid email

  await page
    .getByRole("textbox", { name: "Email" })
    .fill("shahnewaz@gmail.com");
  await expect(emailValidationError).toBeHidden(); // the error message should be hidden after entering a valid email

  const hiddenFeatureButton = page.getByText("Hidden feature");
  //   const hiddenFeatureButton = page.getByRole("button", {
  //     name: "Hidden feature",
  //   });
  const hiddenFeatureButtontext = await hiddenFeatureButton.textContent();
  console.log("Hidden Feature Button Text:", hiddenFeatureButtontext); // Log the text content of the hidden feature button
  //   await expect(hiddenFeatureButton).toBeVisible(); // The hidden feature button should be visible on the page
});
