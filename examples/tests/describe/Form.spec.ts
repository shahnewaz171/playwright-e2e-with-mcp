import { test, expect, Page } from "@playwright/test";

const name = "Shahnewaz";
const email = "shahnewaz@email.com";
const comment = "This is a feedback comment.";
const highlights = "The website is user-friendly and visually appealing.";

test.beforeEach(() => {
  console.log("This runs before each test in this file");
});

test.describe("Form is submitted successfully", () => {
  test.beforeEach(() => {
    console.log(
      "This runs before each test in the 'Form is submitted successfully' describe block",
    );
  });

  test("Required fields", async ({ page }) => {
    let formSubmitted = false;

    page.on("dialog", async (dialog) => {
      await dialog.accept();
      formSubmitted = true;
    });

    await page.goto("FeedBackForm.html");

    await completeFields(page);

    await clickButton(page, "Submit");

    expect(formSubmitted).toBeTruthy();
  });

  test("Required fields & form is cleared after submit", async ({ page }) => {
    let formSubmitted = false;

    page.on("dialog", async (dialog) => {
      await dialog.accept();
      formSubmitted = true;
    });

    await page.goto("FeedBackForm.html");

    await completeFields(page);

    await clickButton(page, "Submit");

    expect(formSubmitted).toBeTruthy();

    // check if form is cleared:
    await checkIfItemsEmpty(page);
  });
});

test.describe("Form is NOT submitted", () => {
  test("Minimal fields", async ({ page }) => {
    let formSubmitted = false;

    page.on("dialog", (dialog) => {
      dialog.accept();
      formSubmitted = true;
    });

    await page.goto("FeedBackForm.html");

    await completeFields(page);

    // clear required field:
    await page.getByLabel("name").clear();

    await clickButton(page, "Submit");

    expect(formSubmitted).toBeFalsy();
  });

  test("if user selects NO on dialog", async ({ page }) => {
    page.on("dialog", (dialog) => {
      dialog.dismiss();
    });

    await page.goto("FeedBackForm.html");

    await completeFields(page);

    await clickButton(page, "Submit");

    // check if form is NOT cleared:
    await checkIfItemsNotEmpty(page);
  });
});

async function clickButton(
  page: Page,
  buttonName: "Submit" | "Save" | "Clear",
) {
  await page
    .getByRole("button", {
      name: buttonName,
    })
    .click();
}

async function completeFields(page: Page) {
  const nameLabel = page.getByLabel("name");
  await nameLabel.fill(name);

  const emailLabel = page.getByLabel("email");
  await emailLabel.fill(email);

  const commentLabel = page.getByLabel("comment");
  await commentLabel.fill(comment);

  const highlightsLabel = page.getByLabel("highlights");
  await highlightsLabel.fill(highlights);

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();
}

async function checkIfItemsNotEmpty(page: Page) {
  const nameLabel = page.getByLabel("name");

  const emailLabel = page.getByLabel("email");

  const commentLabel = page.getByLabel("comment");

  const highlightsLabel = page.getByLabel("highlights");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });

  await expect(nameLabel).toHaveValue(name);
  await expect(emailLabel).toHaveValue(email);
  await expect(commentLabel).toHaveValue(comment);
  await expect(highlightsLabel).toHaveValue(highlights);
  await expect(checkBox).toBeChecked();
}

async function checkIfItemsEmpty(page: Page) {
  const nameLabel = page.getByLabel("name");

  const emailLabel = page.getByLabel("email");

  const commentLabel = page.getByLabel("comment");

  const highlightsLabel = page.getByLabel("highlights");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });

  await expect(nameLabel).toBeEmpty();
  await expect(emailLabel).toBeEmpty();
  await expect(commentLabel).toBeEmpty();
  await expect(highlightsLabel).toBeEmpty();
  await expect(checkBox).not.toBeChecked();
}
