// pages/ForgotPasswordPage.js
class ForgotPasswordPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator(
      '#root > div.min-vh-100.d-flex.flex-column.justify-content-center.container-fluid > div > div > div:nth-child(4) > div > form > div.mb-3 > input'
    );

    this.continueButton = page.locator(
      '#root > div.min-vh-100.d-flex.flex-column.justify-content-center.container-fluid > div > div > div:nth-child(4) > div > form > div.d-grid.gap-2 > button'
    );

    this.pageHeading = page.locator(
      '#root > div.min-vh-100.d-flex.flex-column.justify-content-center.container-fluid > div > div > div:nth-child(4) > div > h3'
    );
  }

  async isVisible() {
    return await this.pageHeading.isVisible();
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}

export { ForgotPasswordPage };
