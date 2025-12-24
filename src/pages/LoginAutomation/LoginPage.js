// pages/LoginPage.js
import { Logger } from '../../utils/Logger.js';

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
    Logger.debug('LoginPage initialized');
  }

  async login(email, password) {
    Logger.info('Filling email field');
    await this.emailInput.fill(email);
    
    Logger.info('Filling password field');
    await this.passwordInput.fill(password);

    if (await this.rememberMeCheckbox.isVisible()) {
      const checked = await this.rememberMeCheckbox.isChecked();
      if (!checked) {
        Logger.info('Checking remember me checkbox');
        await this.rememberMeCheckbox.check();
      }
    }

    Logger.info('Clicking sign in button');
    await this.signInButton.click();
  }

  async verifyWelcomeMessage() {
    Logger.info('Verifying welcome message visibility');
    await this.welcomeMessage.waitFor({ state: 'visible' });
    const isVisible = await this.welcomeMessage.isVisible();
    
    if (isVisible) {
      Logger.success('Welcome message is visible');
    } else {
      Logger.warn('Welcome message is not visible');
    }
    
    return isVisible;
  }
}

export { LoginPage };
