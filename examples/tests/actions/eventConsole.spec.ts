import test, { expect } from "@playwright/test";

test("Test error inside the console", async ({ page }) => {
  page.on("console", (msg) => {
    // console.log("Error message:", msg.text());
    expect
      .soft(msg.type(), `Error message: ${msg.text()}`)
      .not.toEqual("error");
  });

  await page.goto("/Events.html");

  const button = page.getByRole("button", { name: "Call wrong server" });

  await button.click();
  await page.waitForTimeout(500);
});

test.fail("Test error", async ({ page }) => {
  page.on("console", (msg) => {
    // console.log("Error message:", msg.text());
    expect
      .soft(msg.type(), `Error message: ${msg.text()}`)
      .not.toEqual("error");
  });

  await page.goto("/Events.html");

  const button = page.getByRole("button", { name: "Call wrong server" });

  await button.click();
  await page.waitForTimeout(500);
});
