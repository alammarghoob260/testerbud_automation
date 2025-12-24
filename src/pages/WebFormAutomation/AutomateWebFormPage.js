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
  }

  async fillForm(data) {
    await this.countryDropdown.selectOption({ label: data.country });
    await this.titleDropdown.selectOption({ label: data.title });
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.dobInput.fill(data.dob);
    await this.joiningDateInput.fill(data.joiningDate);
    await this.emailInput.fill(data.email);

    // ✅ Fill both phone fields
    await this.phoneCountryCodeDropdown.selectOption({ label: data.phoneCountryCode });
    await this.phoneNumberInput.fill(data.phoneNumber);

    // ✅ Dynamic radio selection
    await this.communicationRadio(data.communication).check();

    await this.submitButton.click();
  }

  async verifySuccessMessage() {
    return await this.successMessage.isVisible();
  }
}

export { AutomateWebFormPage };
