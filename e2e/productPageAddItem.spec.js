import { test, expect } from '@playwright/test';

const textBeforeClicking = 'Add to Basket';
const textAfterClicking = 'Remove from Basket';

test.skip('Product page add to basket', async ({ page }) => {
  await page.goto('/');

  const addToBasketFirstBtn = page
    .locator('[data-qa="product-button"]')
    .first();
  const basketCounter = page.locator('[data-qa="header-basket-count"]');
  const checkoutBtn = page.getByRole('link', { name: 'Checkout' });
  //   const checkoutBtn = '(//*[@data-qa="desktop-nav-link"])[3]';

  await addToBasketFirstBtn.waitFor();
  await expect(addToBasketFirstBtn).toHaveText(textBeforeClicking);
  await basketCounter.waitFor();
  await expect(basketCounter).toHaveText('0');
  await addToBasketFirstBtn.click();
  await expect(addToBasketFirstBtn).toHaveText(textAfterClicking);
  await expect(basketCounter).toHaveText('1');

  //   await page.waitForSelector(checkoutBtn);
  //   await page.click(checkoutBtn);
  await checkoutBtn.waitFor();
  await checkoutBtn.click();
  //   await expect(page).toHaveURL('/basket');
  await page.waitForURL('/basket');

  //   await page.pause();
});
