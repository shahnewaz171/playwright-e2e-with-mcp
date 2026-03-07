import test, { expect } from "@playwright/test";

test.use({
  storageState: {
    cookies: [],
    origins: [
      {
        origin: "http://localhost:5001",
        localStorage: [],
        // localStorage: [
        //   { name: "name", value: "Shahnewaz" },
        //   { name: "email", value: "shahnewaz@example.com" },
        // ],
      },
    ],
  },
});

test("Local Storage", async ({ page }) => {
  await page.goto("/FeedBackForm.html");

  const nameField = page.getByRole("textbox", { name: "Name" });
  //   await nameField.fill("Shahnewaz");

  const emailField = page.getByRole("textbox", { name: "Email" });
  //   await emailField.fill("shahnewaz@example.com");

  await page.evaluate(() => {
    localStorage.setItem("name", "Shahnewaz");
    localStorage.setItem("email", "shahnewaz@example.com");
  });
  //   const saveProgressBtn = page.getByRole("button", { name: "Save Progress" });
  //   await saveProgressBtn.click();

  await page.reload();

  await expect(nameField).toHaveValue("Shahnewaz");
  await expect(emailField).toHaveValue("shahnewaz@example.com");
});
