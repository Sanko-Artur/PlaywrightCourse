import { expect } from '@playwright/test';

export class DeliveryDetails {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
    this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
    this.streetInput = page.locator('[data-qa="delivery-address-street"]');
    this.postCodeInput = page.locator('[data-qa="delivery-postcode"]');
    this.cityInput = page.locator('[data-qa="delivery-city"]');
    this.countryDropDown = page.locator('[data-qa="country-dropdown"]');

    this.saveAddressBtn = page.locator('[data-qa="save-address-button"]');
    this.savedAddressContainer = page.locator(
      '[data-qa="saved-address-container"]'
    );

    this.savedAddressFirstName = page.locator(
      '[data-qa="saved-address-firstName"]'
    );
    this.savedAddressLastName = page.locator(
      '[data-qa="saved-address-lastName"]'
    );
    this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
    this.savedAddressPostcode = page.locator(
      '[data-qa="saved-address-postcode"]'
    );
    this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
    this.savedAddressCountry = page.locator(
      '[data-qa="saved-address-country"]'
    );

    this.continueToPaymentBtn = page.locator(
      '[data-qa="continue-to-payment-button"]'
    );
  }

  async fillDetails(deliveryDetails) {
    await this.firstNameInput.waitFor({ timeout: 3000 });
    await this.firstNameInput.fill(deliveryDetails.firstNameInput);
    await this.lastNameInput.waitFor({ timeout: 3000 });
    await this.lastNameInput.fill(deliveryDetails.lastNameInput);
    await this.streetInput.waitFor({ timeout: 3000 });
    await this.streetInput.fill(deliveryDetails.streetInput);
    await this.postCodeInput.waitFor({ timeout: 3000 });
    await this.postCodeInput.fill(deliveryDetails.postCodeInput);
    await this.cityInput.waitFor({ timeout: 3000 });
    await this.cityInput.fill(deliveryDetails.cityInput);

    await this.countryDropDown.waitFor({ timeout: 3000 });
    await this.countryDropDown.selectOption(deliveryDetails.country);
  }

  async saveDetails() {
    const addressCountBeforSaving = await this.savedAddressContainer.count();
    await this.saveAddressBtn.waitFor({ timeout: 3000 });
    await this.saveAddressBtn.click();
    await expect(this.savedAddressContainer).toHaveCount(
      addressCountBeforSaving + 1
    );
    await this.savedAddressFirstName.first().waitFor({ timeout: 3000 });

    expect(await this.savedAddressFirstName.first().innerText()).toBe(
      await this.firstNameInput.inputValue()
    );
    expect(await this.savedAddressLastName.first().innerText()).toBe(
      await this.lastNameInput.inputValue()
    );
    expect(await this.savedAddressStreet.first().innerText()).toBe(
      await this.streetInput.inputValue()
    );
    expect(await this.savedAddressPostcode.first().innerText()).toBe(
      await this.postCodeInput.inputValue()
    );
    expect(await this.savedAddressCity.first().innerText()).toBe(
      await this.cityInput.inputValue()
    );
    expect(await this.savedAddressCountry.first().innerText()).toBe(
      await this.countryDropDown.inputValue()
    );
  }

  async continueToPayment() {
    await this.continueToPaymentBtn.waitFor({ timeout: 3000 });
    await this.continueToPaymentBtn.click();
    await this.page.waitForURL(/\/payment/, { timeout: 3000 });
  }
}
