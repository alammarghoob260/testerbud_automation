// pages/ForgotPasswordPage.js
import { expect } from '@playwright/test';

class ForgotPasswordPage {
  constructor(page) {
    this.page = page;

    // ✅ Use semantic locator for the Forgot Password heading
    this.pageHeading = page.getByRole('heading', {
      level: 1,
      name: 'Master Password Recovery Automation',
    });
    this.emailInput = page.getByPlaceholder('Enter your registered email');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async isVisible() {
    await expect(this.pageHeading).toBeVisible({ timeout: 10000 });
    return true;
  }

  async enterEmail(email) {
    await expect(this.emailInput).toBeVisible({ timeout: 10000 });
    await this.emailInput.fill(email);
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}

export { ForgotPasswordPage };
