import { expect } from '@playwright/test';
import { isDesktopViewport } from './../utils/isDesktopViewport';

export class NavBar {
  constructor(page) {
    this.page = page;

    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.navBtns = page.locator('[data-qa="desktop-nav-link"]');

    this.checkoutBtn = page.getByRole('link', { name: 'Checkout' });
    this.mobileBurgerBtn = page.locator('[data-qa="mobile-navigation"]');
  }

  async getBasketCount() {
    await this.basketCounter.waitFor({ timeout: 3000 });
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  }

  async goToCheckout() {
    if (!isDesktopViewport(this.page)) {
      await this.mobileBurgerBtn.waitFor({ timeout: 3000 });
      await this.mobileBurgerBtn.click();
    }
    // const checkoutBtn = this.navBtns.nth(2);
    // await checkoutBtn.waitFor({ timeout: 3000 });
    // await expect(checkoutBtn).toHaveText('Checkout');
    await this.checkoutBtn.waitFor({ timeout: 3000 });
    expect(await this.checkoutBtn.innerText()).toBe('Checkout');
    await this.checkoutBtn.click();
    await expect(this.page).toHaveURL('/basket');
  }
}
