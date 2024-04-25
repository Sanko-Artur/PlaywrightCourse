import { expect } from '@playwright/test';

export class PaymentPage {
  constructor(page) {
    this.page = page;

    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountInput = page.locator('[data-qa="discount-code-input"]');
    this.submitDiscountBtn = page.locator('[data-qa="submit-discount-button"]');
    this.discountActiveMessage = page.locator(
      '[data-qa="discount-active-message"]'
    );
    this.totalPrice = page.locator('[data-qa="total-value"]');
    this.totalPriceWithDiscount = page.locator(
      '[data-qa="total-with-discount-value"]'
    );

    this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]');
    this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]');
    this.validUntilInput = page.locator('[data-qa="valid-until"]');
    this.creditCardCVCInput = page.locator('[data-qa="credit-card-cvc"]');
    this.payBtn = page.locator('[data-qa="pay-button"]');
  }

  async activateDiscount() {
    await this.discountCode.waitFor({ timeout: 3000 });
    const code = await this.discountCode.innerText();
    await this.discountInput.waitFor({ timeout: 3000 });

    // Option 1 for laggy input: using .fill() with await expect()
    await this.discountInput.fill(code);
    await expect(this.discountInput).toHaveValue(code);

    // Option 2 for laggy input: slow typing
    // await this.discountInput.focus();
    // await this.page.keyboard.type(code, { delay: 1000 });
    // expect(await this.discountInput.inputValue()).toBe(code);

    expect(await this.discountActiveMessage.isVisible()).toBe(false);
    expect(await this.totalPriceWithDiscount.isVisible()).toBe(false);
    await this.submitDiscountBtn.waitFor({ timeout: 3000 });
    await this.submitDiscountBtn.click();
    await this.discountActiveMessage.waitFor({ timeout: 3000 });
    expect(await this.discountActiveMessage.innerText()).toBe(
      'Discount activated!'
    );

    await this.totalPrice.waitFor({ timeout: 3000 });
    const totalValueText = await this.totalPrice.innerText();
    const totalValueOnlyNumber = parseInt(totalValueText.replace('$', ''), 10);

    await this.totalPriceWithDiscount.waitFor({ timeout: 3000 });
    const discountValueText = await this.totalPriceWithDiscount.innerText();
    const discountValueOnlyNumber = parseInt(
      discountValueText.replace('$', ''),
      10
    );

    expect(totalValueOnlyNumber).toBeGreaterThan(discountValueOnlyNumber);
  }

  async fillPaymentDetails(paymentDetails) {
    await this.creditCardOwnerInput.waitFor({ timeout: 3000 });
    await this.creditCardOwnerInput.fill(paymentDetails.creditCardOwner);

    await this.creditCardNumberInput.waitFor({ timeout: 3000 });
    await this.creditCardNumberInput.fill(paymentDetails.creditCardNumber);

    await this.validUntilInput.waitFor({ timeout: 3000 });
    await this.validUntilInput.fill(paymentDetails.validUntil);

    await this.creditCardCVCInput.waitFor({ timeout: 3000 });
    await this.creditCardCVCInput.fill(paymentDetails.creditCardCVC);
  }

  async completePayment() {
    await this.payBtn.waitFor({ timeout: 3000 });
    await this.payBtn.click();

    await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
  }
}
