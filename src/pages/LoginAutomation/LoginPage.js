// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#formBasicEmail');
    this.passwordInput = page.locator('#formBasicPassword');
    this.rememberMeCheckbox = page.locator('#formBasicCheckbox');
    this.signInButton = page.locator(
      '#root > div.mt-5.pt-5.pb-5.mb-5.container > div.justify-content-center.row > div > div > div > form > button'
    );
    this.welcomeMessage = page.locator(
      '#root > div.mt-5.pt-5.pb-5.mb-5.container > div.justify-content-center.row > div > div > div > div.fade.alert.alert-success.show'
    );
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    if (await this.rememberMeCheckbox.isVisible()) {
      const checked = await this.rememberMeCheckbox.isChecked();
      if (!checked) {
        await this.rememberMeCheckbox.check();
      }
    }

    await this.signInButton.click();
  }

  async verifyWelcomeMessage() {
    await this.welcomeMessage.waitFor({ state: 'visible' });
    return this.welcomeMessage.isVisible();
  }
}

export { LoginPage };
