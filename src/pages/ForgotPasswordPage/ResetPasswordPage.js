// pages/ResetPasswordPage.js
class ResetPasswordPage {
  constructor(page) {
    this.page = page;
    this.currentPasswordInput = page.locator(
      '#root > div.min-vh-100.d-flex.flex-column.justify-content-center.container-fluid > div > div > div:nth-child(4) > div > form > div:nth-child(1) > input'
    );

    this.newPasswordInput = page.locator(
      '#root > div.min-vh-100.d-flex.flex-column.justify-content-center.container-fluid > div > div > div:nth-child(4) > div > form > div:nth-child(2) > input'
    );

    this.confirmPasswordInput = page.locator(
      '#root > div.min-vh-100.d-flex.flex-column.justify-content-center.container-fluid > div > div > div:nth-child(4) > div > form > div:nth-child(3) > input'
    );

    this.resetButton = page.locator(
      '#root > div.min-vh-100.d-flex.flex-column.justify-content-center.container-fluid > div > div > div:nth-child(4) > div > form > div.d-grid > button'
    );

    this.pageHeading = page.locator(
      '#root > div.min-vh-100.d-flex.flex-column.justify-content-center.container-fluid > div > div > div:nth-child(4) > div > h3'
    );

    this.successMessage = page.locator(
      '#root > div.min-vh-100.d-flex.flex-column.justify-content-center.container-fluid > div > div > div:nth-child(4) > div > h2'
    );
  }

  async isVisible() {
    return await this.pageHeading.isVisible();
  }

  async enterPasswords(current, newPass, confirmPass) {
    await this.currentPasswordInput.fill(current);
    await this.newPasswordInput.fill(newPass);
    await this.confirmPasswordInput.fill(confirmPass);
  }

  async clickReset() {
    await this.resetButton.click();
  }

  async successMessageVisible() {
    return await this.successMessage.isVisible();
  }
}

export { ResetPasswordPage };
