import { test, expect } from "@playwright/test";

test("Validate selection of Female radio button", async ({ page }) => {
  await page.goto(
    "https://www.testmuai.com/selenium-playground/radiobutton-demo/",
  );

  const femaleRadio = page.locator('input[name="optradio"][value="Female"]');

  await expect(femaleRadio).toBeVisible();
  await femaleRadio.check();
  await expect(femaleRadio).toBeChecked();

  await page.locator('button[id="buttoncheck"]').click();
  await expect(page.locator('p[class="radiobutton"]')).toHaveText(
    "Radio button 'Female' is checked",
  );
});
