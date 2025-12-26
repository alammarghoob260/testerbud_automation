// pages/LoginPage.js
import { Logger } from '../../utils/Logger.js';
import { DataValidator } from '../../utils/DataValidator.js';
import { RetryHelper } from '../../utils/RetryHelper.js';

class LoginPage {
  constructor(page) {
    this.page = page;
    // ✅ Using specific IDs (Playwright best practice)
    this.emailInput = page.locator('#formBasicEmail');
    this.passwordInput = page.locator('#formBasicPassword');
    this.rememberMeCheckbox = page.locator('#formBasicCheckbox');

    // ✅ Fallback to role-based selectors if CSS selectors fail
    this.signInButton = page.locator('button.btn.btn-primary[type="submit"]').or(
      page.getByRole('button', { name: /sign in/i })
    );

    // ✅ Success alert message (more maintainable selector)
    this.welcomeMessage = page.locator('.alert.alert-success').first();

    Logger.debug('LoginPage initialized');
  }

  async login(email, password) {
    // ✅ Validate credentials before attempting login
    const validation = DataValidator.validateCredentials(email, password);
    if (!validation.isValid) {
      Logger.error(`Credential validation failed: ${validation.errors.join(', ')}`);
      throw new Error(`Invalid credentials: ${validation.errors.join(', ')}`);
    }
    Logger.debug('Credentials validation passed');

    Logger.info(`Filling email field: ${email}`);
    await RetryHelper.retryFill(this.emailInput, email);

    Logger.info('Filling password field');
    await RetryHelper.retryFill(this.passwordInput, password);

    // ✅ Optional: Check remember me if visible
    try {
      if (await this.rememberMeCheckbox.isVisible()) {
        const checked = await this.rememberMeCheckbox.isChecked();
        if (!checked) {
          Logger.info('Checking remember me checkbox');
          await this.rememberMeCheckbox.check();
        }
      }
    } catch (error) {
      Logger.warn('Remember me checkbox not interactable, skipping');
    }

    Logger.info('Clicking sign in button');
    await RetryHelper.retryClick(this.signInButton, this.page);
    Logger.success('Login action completed');
  }

  async verifyWelcomeMessage() {
    Logger.info('Verifying welcome message visibility');
    try {
      await this.welcomeMessage.waitFor({ state: 'visible', timeout: 5000 });
      const messageText = await this.welcomeMessage.textContent();
      Logger.success(`Welcome message is visible: "${messageText?.trim()}"`);
      return true;
    } catch (error) {
      Logger.warn(`Welcome message not visible: ${error.message}`);
      return false;
    }
  }
}

export { LoginPage };
