import test, { expect, Request } from "@playwright/test";

test.use({
  baseURL: "",
});

test("Monitors request events", async ({ page }) => {
  const requests: Request[] = [];

  page.on("request", (request: Request) => {
    requests.push(request);
  });

  await page.goto("https://playwright.dev");

  requests.forEach((request) => {
    console.log(`${request.resourceType()} ${request.url()}`);
  });
});

test.fail("Test error", async ({ page }) => {
  page.on("requestfailed", (request) => {
    expect(
      request,
      `Failed request from ${request.url()} with error text: ${request.failure()?.errorText}`,
    ).toBeUndefined();
  });

  await page.goto("http://localhost:5001/Events.html");

  const button = page.getByRole("button", { name: "Call wrong server" });

  await button.click();
  await page.waitForTimeout(500);
});
