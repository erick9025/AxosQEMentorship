
import { test, expect } from '@playwright/test';

test('Escribir and Click Actions', async ({ page }) => {
  await page.goto('https://support.saucelabs.com/s/login/?language=en_US');

  await page.locator('label.uiLabel-left.form-element__label.uiLabel').fill('rober010389@gmail.com');
  await page.locator("#input-6").fill('Bankaxos1234#');
  await page.waitForTimeout(5000);

  // URL inicial
  const initialUrl = page.url();

  // clic en Log in
  await page.locator("button:has-text('Log in')").click();

  // Validar que la URL cambió
  await expect(page).not.toHaveURL(initialUrl,
    {
      timeout: 15000
    });

  await page.waitForTimeout(4000);
  
  //Valida el texto en la pantalla nueva 
  await expect(
    page.getByText('Get answers to your Sauce questions')
  ).toBeVisible({
    timeout: 15000

  })
});