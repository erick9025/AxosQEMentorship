import { test, expect } from "@playwright/test";

test("Validate selection of Female radio button", async ({ page }) => {
  await page.goto(
    "https://www.testmuai.com/selenium-playground/radiobutton-demo/",
  );

  const femaleRadio = page.locator('input[name="optradio"][value="Female"]');

  await expect(femaleRadio).toBeVisible();
  await femaleRadio.check();
  await expect(femaleRadio).toBeChecked();
  const GetValueButton = page.locator(
    'button[id="buttoncheck"][class="mb-10 bg-lambda-900 border border-lambda-900 text-white rounded px-15 py-5 hover:bg-transparent hover:text-lambda-900 focus:outline-none"]',
  );

  await GetValueButton.click();
  await expect(
    page.locator(
      'p[class="text-gray-900 text-size-15 my-10 text-black radiobutton"]',
    ),
  ).toHaveText("Radio button 'Female' is checked");
});
