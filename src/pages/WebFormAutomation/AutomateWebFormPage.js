import { Logger } from '../../utils/Logger.js';

class AutomateWebFormPage {
  constructor(page) {
    this.page = page;
    this.countryDropdown = page.locator(
      '#root > div.py-5.container > div > div > form > div:nth-child(1) > select'
    );
    this.titleDropdown = page.locator(
      '#root > div.py-5.container > div > div > form > div:nth-child(2) > select'
    );
    this.firstNameInput = page.locator(
      '#root > div.py-5.container > div > div > form > div.row > div:nth-child(1) > input'
    );
    this.lastNameInput = page.locator(
      '#root > div.py-5.container > div > div > form > div.row > div:nth-child(2) > input'
    );
    this.dobInput = page.locator(
      '#root > div.py-5.container > div > div > form > div:nth-child(4) > div.react-datepicker-wrapper > div > input'
    );
    this.joiningDateInput = page.locator(
      '#root > div.py-5.container > div > div > form > div:nth-child(5) > input'
    );
    this.emailInput = page.locator(
      '#root > div.py-5.container > div > div > form > div:nth-child(6) > input'
    );

    // ✅ Phone fields
    this.phoneCountryCodeDropdown = page.locator(
      '#root > div.py-5.container > div > div > form > div:nth-child(7) > div > div.col-md-4 > select'
    );
    this.phoneNumberInput = page.locator(
      '#root > div.py-5.container > div > div > form > div:nth-child(7) > div > div.col-md-8 > input'
    );

    // ✅ Dynamic radio locator (same base selector, nth-child changes)
    this.communicationRadio = (method) => {
      const index = method === 'Email' ? 1 : 2;
      return this.page.locator(
        `#root > div.py-5.container > div > div > form > div:nth-child(8) > div > div:nth-child(${index}) > input`
      );
    };

    this.submitButton = page.locator(
      '#root > div.py-5.container > div > div > form > div.d-flex.justify-content-end.gap-2 > button.btn.btn-primary'
    );

    this.successMessage = page.locator(
      '#root > div.py-5.container > div > div > div > div.card-body > div'
    );
    Logger.debug('AutomateWebFormPage initialized');
  }

  async fillForm(data) {
    Logger.info(`Selecting country: ${data.country}`);
    await this.countryDropdown.selectOption({ label: data.country });
    
    Logger.info(`Selecting title: ${data.title}`);
    await this.titleDropdown.selectOption({ label: data.title });
    
    Logger.info(`Filling first name: ${data.firstName}`);
    await this.firstNameInput.fill(data.firstName);
    
    Logger.info(`Filling last name: ${data.lastName}`);
    await this.lastNameInput.fill(data.lastName);
    
    Logger.info(`Filling date of birth: ${data.dob}`);
    await this.dobInput.fill(data.dob);
    
    Logger.info(`Filling joining date: ${data.joiningDate}`);
    await this.joiningDateInput.fill(data.joiningDate);
    
    Logger.info(`Filling email: ${data.email}`);
    await this.emailInput.fill(data.email);

    Logger.info(`Selecting phone country code: ${data.phoneCountryCode}`);
    await this.phoneCountryCodeDropdown.selectOption({ label: data.phoneCountryCode });
    
    Logger.info(`Filling phone number: ${data.phoneNumber}`);
    await this.phoneNumberInput.fill(data.phoneNumber);

    Logger.info(`Selecting communication method: ${data.communication}`);
    await this.communicationRadio(data.communication).check();

    Logger.info('Clicking submit button');
    await this.submitButton.click();
    Logger.success('Form submitted successfully');
  }

  async verifySuccessMessage() {
    Logger.info('Verifying success message visibility');
    const isVisible = await this.successMessage.isVisible();
    
    if (isVisible) {
      Logger.success('Success message is visible');
    } else {
      Logger.warn('Success message is not visible');
    }
    
    return isVisible;
  }
}

export { AutomateWebFormPage };
