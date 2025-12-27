// pages/WebFormAutomation/AutomateWebFormPage.js
import { Logger } from '../../utils/Logger.js';
import { DataValidator } from '../../utils/DataValidator.js';
import { RetryHelper } from '../../utils/RetryHelper.js';
import { expect } from '@playwright/test';

class AutomateWebFormPage {
  constructor(page) {
    this.page = page;

    // ✅ Country dropdown (unique locator)
    this.countryDropdown = page.locator('select.form-select').first();

    this.titleDropdown = page
      .locator('select[name="title"]')
      .or(
        page.locator('#root > div.py-5.container > div > div > form > div:nth-child(2) > select')
      );

    this.firstNameInput = page
      .locator('input[name="firstName"]')
      .or(
        page.locator(
          '#root > div.py-5.container > div > div > form > div.row > div:nth-child(1) > input'
        )
      );

    this.lastNameInput = page
      .locator('input[name="lastName"]')
      .or(
        page.locator(
          '#root > div.py-5.container > div > div > form > div.row > div:nth-child(2) > input'
        )
      );

    this.dobInput = page
      .locator('input[name="dob"]')
      .or(
        page.locator(
          '#root > div.py-5.container > div > div > form > div:nth-child(4) > div.react-datepicker-wrapper > div > input'
        )
      );

    this.joiningDateInput = page
      .locator('input[name="joiningDate"]')
      .or(page.locator('#root > div.py-5.container > div > div > form > div:nth-child(5) > input'));

    this.emailInput = page
      .locator('input[name="email"]')
      .or(page.locator('#root > div.py-5.container > div > div > form > div:nth-child(6) > input'));

    this.phoneCountryCodeDropdown = page
      .locator('select[name="phoneCountryCode"]')
      .or(
        page.locator(
          '#root > div.py-5.container > div > div > form > div:nth-child(7) > div > div.col-md-4 > select'
        )
      );

    this.phoneNumberInput = page
      .locator('input[name="phoneNumber"]')
      .or(
        page.locator(
          '#root > div.py-5.container > div > div > form > div:nth-child(7) > div > div.col-md-8 > input'
        )
      );

    this.communicationRadio = (method) => {
      const index = method === 'Email' ? 1 : 2;
      return this.page.locator(
        `#root > div.py-5.container > div > div > form > div:nth-child(8) > div > div:nth-child(${index}) > input`
      );
    };

    this.submitButton = page
      .getByRole('button', { name: /submit|save/i })
      .or(
        page.locator(
          '#root > div.py-5.container > div > div > form > div.d-flex.justify-content-end.gap-2 > button.btn.btn-primary'
        )
      );

    this.successMessage = page.locator('.card-body > div, .alert, [data-testid="success"]').first();

    Logger.debug('AutomateWebFormPage initialized');
  }

  async fillForm(data) {
    const validation = DataValidator.validateFormData(data);
    if (!validation.isValid) {
      Logger.error(`Form data validation failed: ${validation.errors.join(', ')}`);
      throw new Error(`Invalid form data: ${validation.errors.join(', ')}`);
    }
    Logger.debug('Form data validation passed');

    try {
      Logger.info(`Selecting country: ${data.country}`);
      await expect(this.countryDropdown).toBeVisible({ timeout: 10000 });
      await RetryHelper.retrySelect(this.countryDropdown, { label: data.country });

      Logger.info(`Selecting title: ${data.title}`);
      await expect(this.titleDropdown).toBeVisible({ timeout: 10000 });
      await RetryHelper.retrySelect(this.titleDropdown, { label: data.title });

      Logger.info(`Filling first name: ${data.firstName}`);
      await expect(this.firstNameInput).toBeVisible({ timeout: 10000 });
      await RetryHelper.retryFill(this.firstNameInput, data.firstName);

      Logger.info(`Filling last name: ${data.lastName}`);
      await expect(this.lastNameInput).toBeVisible({ timeout: 10000 });
      await RetryHelper.retryFill(this.lastNameInput, data.lastName);

      Logger.info(`Filling date of birth: ${data.dob}`);
      await expect(this.dobInput).toBeVisible({ timeout: 10000 });
      await RetryHelper.retryFill(this.dobInput, data.dob);

      Logger.info(`Filling joining date: ${data.joiningDate}`);
      await expect(this.joiningDateInput).toBeVisible({ timeout: 10000 });
      await RetryHelper.retryFill(this.joiningDateInput, data.joiningDate);

      Logger.info(`Filling email: ${data.email}`);
      await expect(this.emailInput).toBeVisible({ timeout: 10000 });
      await RetryHelper.retryFill(this.emailInput, data.email);

      Logger.info(`Selecting phone country code: ${data.phoneCountryCode}`);
      await expect(this.phoneCountryCodeDropdown).toBeVisible({ timeout: 10000 });
      await RetryHelper.retrySelect(this.phoneCountryCodeDropdown, {
        label: data.phoneCountryCode,
      });

      Logger.info(`Filling phone number: ${data.phoneNumber}`);
      await expect(this.phoneNumberInput).toBeVisible({ timeout: 10000 });
      await RetryHelper.retryFill(this.phoneNumberInput, data.phoneNumber);

      Logger.info(`Selecting communication method: ${data.communication}`);
      const radioElement = this.communicationRadio(data.communication);
      await expect(radioElement).toBeVisible({ timeout: 10000 });
      await RetryHelper.retryElement(radioElement, async (el) => el.check());

      Logger.info('Clicking submit button');
      await expect(this.submitButton).toBeVisible({ timeout: 10000 });
      await expect(this.submitButton).toBeEnabled();
      await RetryHelper.retryClick(this.submitButton, this.page);
      Logger.success('Form submitted successfully');
    } catch (error) {
      Logger.error(`Form fill failed: ${error.message}`);
      throw error;
    }
  }

  async verifySuccessMessage() {
    Logger.info('Verifying success message visibility');
    try {
      await expect(this.successMessage).toBeVisible({ timeout: 10000 });
      const messageText = await this.successMessage.textContent();
      expect(messageText).toBeTruthy();
      expect(messageText?.trim().length).toBeGreaterThan(0);
      Logger.success(`Success message is visible: "${messageText?.trim()}"`);
      return true;
    } catch (error) {
      Logger.error(`Success message not visible: ${error.message}`);
      throw error;
    }
  }
}

export { AutomateWebFormPage };
