import test, { expect } from "@playwright/test";

test("Fill actions", async ({ page }) => {
  await page.goto("/FeedBackForm.html");

  const nameField = page.getByRole("textbox", { name: "Name" });
  await nameField.fill("Shahnewaz");

  //   await nameField.press("Enter");

  const emailField = page.getByRole("textbox", { name: "Email" });

  //   await emailField.fill("shahnewaz@example.");
  //   await emailField.press("Escape");
  await emailField.fill("shahnewaz@example.co");
  await emailField.press("m");
});

test("Key press", async ({ page }) => {
  await page.goto("/FeedBackForm.html");

  const commentField = page.getByRole("textbox", { name: "Comment" });
  await commentField.fill("This is a feedback comment.");

  //   await commentField.press("Escape");
  //   await page.keyboard.type("This is additional feedback typed using keyboard.");
  await page.keyboard.down("Escape");

  await expect(commentField).toBeEmpty();
});
