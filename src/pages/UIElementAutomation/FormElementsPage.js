/**
 * FormElementsPage Page Object
 * Handles form elements interactions
 */

class FormElementsPage {
  constructor(page) {
    this.page = page;
    
    // Text Input Fields
    this.firstNameInput = 'input[name="firstName"]';
    this.lastNameInput = 'input[name="lastName"]';
    this.emailInput = 'input[name="email"]';
    this.passwordInput = 'input[name="password"]';
    this.textInput = 'input[type="text"]';
    
    // Select Dropdowns
    this.countrySelect = 'select[name="country"]';
    this.stateSelect = 'select[name="state"]';
    this.genderSelect = 'select[name="gender"]';
    
    // Checkboxes
    this.agreeCheckbox = 'input[type="checkbox"][name="agree"]';
    this.rememberCheckbox = 'input[type="checkbox"][name="remember"]';
    this.checkboxes = 'input[type="checkbox"]';
    
    // Radio Buttons
    this.radioButtons = 'input[type="radio"]';
    this.maleRadio = 'input[type="radio"][value="male"]';
    this.femaleRadio = 'input[type="radio"][value="female"]';
    
    // TextArea
    this.commentTextarea = 'textarea[name="comments"]';
    this.messageTextarea = 'textarea[name="message"]';
    
    // Form Submit
    this.submitButton = 'button[type="submit"]';
    this.resetButton = 'button[type="reset"]';
    this.cancelButton = 'button[type="button"].btn-cancel';
    
    // Form
    this.form = 'form';
  }

  /**
   * Fill first name
   */
  async fillFirstName(firstName) {
    await this.page.fill(this.firstNameInput, firstName);
  }

  /**
   * Fill last name
   */
  async fillLastName(lastName) {
    await this.page.fill(this.lastNameInput, lastName);
  }

  /**
   * Fill email
   */
  async fillEmail(email) {
    await this.page.fill(this.emailInput, email);
  }

  /**
   * Fill password
   */
  async fillPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  /**
   * Select country
   */
  async selectCountry(country) {
    await this.page.selectOption(this.countrySelect, country);
  }

  /**
   * Select state
   */
  async selectState(state) {
    await this.page.selectOption(this.stateSelect, state);
  }

  /**
   * Select gender
   */
  async selectGender(gender) {
    await this.page.selectOption(this.genderSelect, gender);
  }

  /**
   * Check agree checkbox
   */
  async checkAgree() {
    await this.page.check(this.agreeCheckbox);
  }

  /**
   * Uncheck agree checkbox
   */
  async uncheckAgree() {
    await this.page.uncheck(this.agreeCheckbox);
  }

  /**
   * Select male radio button
   */
  async selectMale() {
    await this.page.check(this.maleRadio);
  }

  /**
   * Select female radio button
   */
  async selectFemale() {
    await this.page.check(this.femaleRadio);
  }

  /**
   * Fill comment textarea
   */
  async fillComment(comment) {
    await this.page.fill(this.commentTextarea, comment);
  }

  /**
   * Fill message textarea
   */
  async fillMessage(message) {
    await this.page.fill(this.messageTextarea, message);
  }

  /**
   * Submit form
   */
  async submitForm() {
    await this.page.click(this.submitButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Reset form
   */
  async resetForm() {
    await this.page.click(this.resetButton);
  }

  /**
   * Click cancel button
   */
  async clickCancel() {
    await this.page.click(this.cancelButton);
  }

  /**
   * Get form field value
   */
  async getFieldValue(fieldName) {
    const selector = `input[name="${fieldName}"]`;
    return await this.page.inputValue(selector);
  }

  /**
   * Check if checkbox is checked
   */
  async isCheckboxChecked(checkboxName) {
    const selector = `input[type="checkbox"][name="${checkboxName}"]`;
    return await this.page.isChecked(selector);
  }

  /**
   * Get selected option from dropdown
   */
  async getSelectedOption(selectName) {
    const selector = `select[name="${selectName}"]`;
    return await this.page.inputValue(selector);
  }

  /**
   * Check if form is valid
   */
  async isFormValid() {
    return await this.page.evaluate(() => {
      const form = document.querySelector('form');
      return form && form.checkValidity();
    });
  }
}

module.exports = FormElementsPage;
