import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.basketTiles = page.locator('[data-qa="basket-card"]');
    this.basketTilePrices = page.locator('[data-qa="basket-item-price"]');
    this.removeBtns = page.locator('[data-qa="basket-card-remove-item"]');
    this.continueToCheckoutBtn = page.locator(
      '[data-qa="continue-to-checkout"]'
    );
  }

  async removeCheapestProd() {
    await this.basketTiles.first().waitFor({ timeout: 3000 });
    const itemsBeforRemoval = await this.basketTiles.count();
    await this.basketTilePrices.first().waitFor({ timeout: 3000 });
    const allPrices = await this.basketTilePrices.allInnerTexts();
    const priceInNum = allPrices.map((price) => {
      const withoutDollarSign = price.replace('$', '');
      return parseInt(withoutDollarSign, 10);
    });
    const smallestPrice = Math.min(...priceInNum);
    const smallestPriceIdx = priceInNum.indexOf(smallestPrice);
    const specificRemoveBtn = await this.removeBtns.nth(smallestPriceIdx);
    await specificRemoveBtn.waitFor({ timeout: 3000 });
    await specificRemoveBtn.click();
    await expect(this.basketTiles).toHaveCount(itemsBeforRemoval - 1);
  }

  async clickContinueToCheckoutBtn() {
    await this.continueToCheckoutBtn.waitFor({ timeout: 3000 });
    expect(this.continueToCheckoutBtn).toHaveText('Continue to Checkout');
    await this.continueToCheckoutBtn.click();
    this.page.waitForURL(/\/login/, { timeout: 3000 });
  }
}
