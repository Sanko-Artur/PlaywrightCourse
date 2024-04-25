export class MyAccountPage {
  constructor(page) {
    this.page = page;

    this.pageHeading = page.locator('//h1[contains(text(),"My Account")]');
    this.errorMessage = page.locator('[data-qa="error-message"]');
  }

  async visit() {
    await this.page.goto('/my-account');
  }

  async waitForPageHeading() {
    await this.pageHeading.waitFor({ timeout: 3000 });
  }

  async waitForErrorMessage() {
    await this.errorMessage.waitFor({ timeout: 3000 });
  }
}
