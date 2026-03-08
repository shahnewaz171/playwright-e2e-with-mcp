import test, { expect } from "@playwright/test";

test("Dialog handling", async ({ page }) => {
  page.on("dialog", async (dialog) => {
    const message = dialog.message();
    console.log("message:", message);

    await dialog.accept();
  });

  await page.goto("/FeedBackForm.html");

  const commentField = page.getByRole("textbox", { name: "Comment" });
  await commentField.fill("This is a feedback comment.");

  await page.getByRole("button", { name: "Save Progress" }).click();
  await page.getByRole("button", { name: "Clear Progress" }).click();

  await expect(commentField).toBeEmpty();
});

test("Saving storage but canceling dialog", async ({ page }) => {
  page.on("dialog", async (dialog) => {
    const message = dialog.message();

    if (message.includes("clear the form progress")) {
      await dialog.dismiss();
      return;
    }

    await dialog.accept();
  });

  await page.goto("/FeedBackForm.html");

  const commentField = page.getByRole("textbox", { name: "Comment" });
  await commentField.fill("This is a feedback comment.");

  await page.getByRole("button", { name: "Save Progress" }).click();
  await page.getByRole("button", { name: "Clear Progress" }).click();

  expect(commentField).toBeTruthy();
});
