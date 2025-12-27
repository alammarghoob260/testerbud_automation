// pages/LoginPage.js
import { Logger } from '../../utils/Logger.js';
import { DataValidator } from '../../utils/DataValidator.js';
import { RetryHelper } from '../../utils/RetryHelper.js';
import { expect } from '@playwright/test';

class LoginPage {
  constructor(page) {
    this.page = page;

    // ✅ Semantic locators
    this.emailInput = page.getByRole('textbox', { name: /email/i });
    this.passwordInput = page.getByPlaceholder('Enter your password');
    this.rememberMeCheckbox = page.getByLabel('Remember me');
    this.signInButton = page.getByRole('button', { name: /sign in/i });

    // ✅ Success alert message locator
    this.welcomeMessage = page.getByText('Login Successful! Welcome to Premium Banking.');

    Logger.debug('LoginPage initialized');
  }

  async login(email, password) {
    const validation = DataValidator.validateCredentials(email, password);
    if (!validation.isValid) {
      Logger.error(`Credential validation failed: ${validation.errors.join(', ')}`);
      throw new Error(`Invalid credentials: ${validation.errors.join(', ')}`);
    }

    Logger.info(`Filling email field: ${email}`);
    await expect(this.emailInput).toBeVisible({ timeout: 10000 });
    await RetryHelper.retryFill(this.emailInput, email);

    Logger.info('Filling password field');
    await expect(this.passwordInput).toBeVisible({ timeout: 10000 });
    await RetryHelper.retryFill(this.passwordInput, password);

    Logger.info('Clicking sign in button');
    await expect(this.signInButton).toBeVisible({ timeout: 10000 });
    await expect(this.signInButton).toBeEnabled();
    await RetryHelper.retryClick(this.signInButton, this.page);
    Logger.success('Login action completed');
  }

  // ✅ Added missing method
  async verifyWelcomeMessage() {
    Logger.info('Verifying welcome message visibility');
    await expect(this.welcomeMessage).toBeVisible({ timeout: 10000 });
    const messageText = await this.welcomeMessage.textContent();
    Logger.success(`Welcome message is visible: "${messageText?.trim()}"`);
    return true;
  }
}

export { LoginPage };
