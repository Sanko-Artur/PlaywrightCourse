export class SignUpPage {
  constructor(page) {
    this.page = page;

    this.emailInpit = page.locator('[placeholder="E-Mail"]');
    this.passwordInput = page.locator('[placeholder="Password"]');
    this.registerBtn = page.locator('[type="submit"]');
  }

  async signUpAsNewUser(loginDetails) {
    await this.emailInpit.waitFor({ timeout: 3000 });
    await this.emailInpit.fill(loginDetails.email);
    await this.passwordInput.waitFor({ timeout: 3000 });
    await this.passwordInput.fill(loginDetails.password);
    await this.registerBtn.waitFor({ timeout: 3000 });
    await this.registerBtn.click();
  }
}
