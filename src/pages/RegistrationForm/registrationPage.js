// src/pages/RegistrationPage/RegistrationPage.js
export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.confirmPasswordInput = page.locator('#confirmPassword');
    this.submitButton = page.locator('button:has-text("Register")');
    this.successMessage = page.locator('text=Registration successful');
  }

  async register(email, password, confirmPassword) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.submitButton.click();
  }

  async verifySuccessMessage() {
    return await this.successMessage.isVisible();
  }
}
