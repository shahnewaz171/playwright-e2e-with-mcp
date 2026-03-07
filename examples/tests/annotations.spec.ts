import test, { expect } from "@playwright/test";

function getUserId(userid?: number) {
  if (!userid) throw new Error("This is an error message");

  return userid;
}

// test.only("focus this test", async ({ page }) => {
//   // Run only focused tests in the entire project.
// });

test.fail("This test is expected to fail", async ({ page }) => {
  const userId = getUserId();

  expect(userId).toBeTruthy();
});

test.skip("This test is skipped", async ({ page }) => {
  console.log("Test does not run");
});

test("Mobile test", async ({ page, isMobile }) => {
  test.skip(!isMobile, "This test runs only on mobile devices");
});

test.fixme("This test is expected to be fixed in the future", async ({
  page,
}) => {
  const userId = getUserId();

  expect(userId).toBeTruthy();
  console.log("This fixme marks the test as failing and won't run");
});

test("slow test", async ({ page }) => {
  test.slow();
  // ...
});
