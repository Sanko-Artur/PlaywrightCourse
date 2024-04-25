import { expect } from '@playwright/test';
import { NavBar } from './NavBar';
import { isDesktopViewport } from './../utils/isDesktopViewport';

export class ProductPage {
  constructor(page) {
    this.page = page;

    this.addBtns = page.locator('[data-qa="product-button"]');
    this.sortDropDown = page.locator('[data-qa="sort-dropdown"]');
    this.priceAsc = page.locator('[value="price-asc"]');
    this.prodTitles = page.locator('[data-qa="product-title"]');
  }

  async visit() {
    await this.page.goto('/');
  }

  async addProductToBasket(index) {
    const specificAddBtn = this.addBtns.nth(index);
    await specificAddBtn.waitFor({ timeout: 3000 });
    await expect(specificAddBtn).toHaveText('Add to Basket');
    const navBar = new NavBar(this.page);
    // only dekstop viewport
    let basketCountBeforeClick;
    if (isDesktopViewport(this.page)) {
      basketCountBeforeClick = await navBar.getBasketCount();
    }
    await specificAddBtn.click();
    await expect(specificAddBtn).toHaveText('Remove from Basket');
    // only dekstop viewport
    if (isDesktopViewport(this.page)) {
      const basketCountAfterClick = await navBar.getBasketCount();
      expect(basketCountAfterClick).toBeGreaterThan(basketCountBeforeClick);
    }
  }

  async sortByCheapest() {
    await this.sortDropDown.waitFor({ timeout: 3000 });
    await this.prodTitles.first().waitFor({ timeout: 3000 });
    const prodTitlesBeforSorting = await this.prodTitles.allInnerTexts();
    await this.sortDropDown.selectOption('price-asc');
    const prodTitlesAfterSorting = await this.prodTitles.allInnerTexts();
    expect(prodTitlesAfterSorting).not.toEqual(prodTitlesBeforSorting);
  }
}
