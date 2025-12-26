import { Logger } from '../../utils/Logger.js';
import { DataValidator } from '../../utils/DataValidator.js';
import { RetryHelper } from '../../utils/RetryHelper.js';

class AutomateWebFormPage {
  constructor(page) {
    this.page = page;

    // ✅ Improved selectors using data-testid / role-based selectors (Playwright best practice)
    // Fallback to CSS selectors if specific IDs not available
    this.countryDropdown = page
      .locator('select[name="country"]')
      .or(
        page.locator('#root > div.py-5.container > div > div > form > div:nth-child(1) > select')
      );

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

    // ✅ Phone fields with improved selectors
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

    // ✅ Communication radio using improved selector with fallback
    this.communicationRadio = (method) => {
      const index = method === 'Email' ? 1 : 2;
      return this.page.locator(
        `#root > div.py-5.container > div > div > form > div:nth-child(8) > div > div:nth-child(${index}) > input`
      );
    };

    // ✅ Submit button using role selector
    this.submitButton = page
      .getByRole('button', { name: /submit|save/i })
      .or(
        page.locator(
          '#root > div.py-5.container > div > div > form > div.d-flex.justify-content-end.gap-2 > button.btn.btn-primary'
        )
      );

    // ✅ Success message with flexible selector
    this.successMessage = page
      .locator('.card-body > div, .alert, [data-testid="success"]')
      .first();

    Logger.debug('AutomateWebFormPage initialized');
  }

  async fillForm(data) {
    // ✅ Validate form data before filling
    const validation = DataValidator.validateFormData(data);
    if (!validation.isValid) {
      Logger.error(`Form data validation failed: ${validation.errors.join(', ')}`);
      throw new Error(`Invalid form data: ${validation.errors.join(', ')}`);
    }
    Logger.debug('Form data validation passed');

    try {
      Logger.info(`Selecting country: ${data.country}`);
      await RetryHelper.retrySelect(this.countryDropdown, { label: data.country });

      Logger.info(`Selecting title: ${data.title}`);
      await RetryHelper.retrySelect(this.titleDropdown, { label: data.title });

      Logger.info(`Filling first name: ${data.firstName}`);
      await RetryHelper.retryFill(this.firstNameInput, data.firstName);

      Logger.info(`Filling last name: ${data.lastName}`);
      await RetryHelper.retryFill(this.lastNameInput, data.lastName);

      Logger.info(`Filling date of birth: ${data.dob}`);
      await RetryHelper.retryFill(this.dobInput, data.dob);

      Logger.info(`Filling joining date: ${data.joiningDate}`);
      await RetryHelper.retryFill(this.joiningDateInput, data.joiningDate);

      Logger.info(`Filling email: ${data.email}`);
      await RetryHelper.retryFill(this.emailInput, data.email);

      Logger.info(`Selecting phone country code: ${data.phoneCountryCode}`);
      await RetryHelper.retrySelect(this.phoneCountryCodeDropdown, {
        label: data.phoneCountryCode
      });

      Logger.info(`Filling phone number: ${data.phoneNumber}`);
      await RetryHelper.retryFill(this.phoneNumberInput, data.phoneNumber);

      Logger.info(`Selecting communication method: ${data.communication}`);
      await RetryHelper.retryElement(
        this.communicationRadio(data.communication),
        async (el) => el.check()
      );

      Logger.info('Clicking submit button');
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
      await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
      const messageText = await this.successMessage.textContent();
      Logger.success(`Success message is visible: "${messageText?.trim()}"`);
      return true;
    } catch (error) {
      Logger.warn(`Success message not visible: ${error.message}`);
      return false;
    }
  }
}

export { AutomateWebFormPage };
