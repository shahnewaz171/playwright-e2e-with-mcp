import test, { expect } from "@playwright/test";
import path, { join } from "path";

test("Files uploading", async ({ page }) => {
  await page.goto("/Files.html");

  const fileInput = page.locator("#fileInput");

  await fileInput.setInputFiles({
    name: "file1.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("test file"),
  });

  await expect(page.locator("#fileListContainer")).toContainText("file1.txt");
});

// test("Multiple files uploading", async ({ page }) => {
//   await page.goto("/Files.html");

//   const fileChooserPromise = page.waitForEvent("filechooser");

//     const fileInput = page.locator("#fileInput");
//     await fileInput.

//   await page.locator(".upload-btn").click();

//   const fileChooser = await fileChooserPromise;

//   await fileChooser.setFiles(path.join(__dirname, "path/to/your/image.png"));

//   //  await fileChooser.setFiles([
//   //    {
//   //      name: "file1.txt",

//   //   console.log(filePaths);
// });

test("File downloading", async ({ page }) => {
  await page.goto("/Files.html");

  const downloadPromise = page.waitForEvent("download");

  await page.locator(".download-btn").click();
  // await page.getByText("Download Document").click();

  const download = await downloadPromise;

  const path = join(
    __dirname,
    "..",
    "..",
    "test-results",
    "files",
    download.suggestedFilename(),
  );

  // await download.saveAs(download.suggestedFilename());
  await download.saveAs(path);
});
