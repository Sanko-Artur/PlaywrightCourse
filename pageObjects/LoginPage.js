import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.registerBtn = page.locator('[data-qa="go-to-signup-button"]');
  }

  async clickRegisterBtn() {
    await this.registerBtn.waitFor({ timeout: 3000 });
    expect(this.registerBtn).toHaveText('Register');
    await this.registerBtn.click();
    this.page.waitForURL(/\/signup/, { timeout: 3000 });
  }
}
