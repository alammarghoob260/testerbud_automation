// pages/VerifyCodePage.js
class VerifyCodePage {
  constructor(page) {
    this.page = page;
    this.codeInput = page.locator(
      '#root > div.min-vh-100.d-flex.flex-column.justify-content-center.container-fluid > div > div > div:nth-child(4) > div > form > div.mb-3 > input'
    );

    this.verifyButton = page.locator(
      '#root > div.min-vh-100.d-flex.flex-column.justify-content-center.container-fluid > div > div > div:nth-child(4) > div > form > div.d-grid > button'
    );

    this.pageHeading = page.locator(
      '#root > div.min-vh-100.d-flex.flex-column.justify-content-center.container-fluid > div > div > div:nth-child(4) > div > h3'
    );
  }

  async isVisible() {
    return await this.pageHeading.isVisible();
  }

  async enterCode(code) {
    await this.codeInput.fill(code);
  }

  async clickVerify() {
    await this.verifyButton.click();
  }
}

export { VerifyCodePage };
