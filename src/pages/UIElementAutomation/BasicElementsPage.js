class BasicElementsPage {
  constructor(page) {
    this.page = page;

    // Text Field
    this.textField = page.getByLabel('Text Field (Input Box):');
    this.textFieldOutput = page
      .locator('#textField')
      .locator('xpath=../../following-sibling::div//div[@class="output-box"]');

    // Text Area
    this.textArea = page.getByLabel('Text Area:');
    this.textAreaOutput = page
      .locator('#textArea')
      .locator('xpath=../../following-sibling::div//div[@class="output-box"]');

    // Button
    this.clickMeButton = page.getByRole('button', { name: 'Click Me' });
    this.clickMeOutput = page.locator('text=Clicked');

    // Single Checkbox
    this.singleCheckbox = page.locator('input.form-check-input').nth(0);

    this.singleCheckboxOutput = page.locator(
      '#root div.mt-5.explore-ui-container div:nth-child(7) div:nth-child(2) > div'
    );

    // Multiple Checkboxes
    this.checkboxOption1 = page.locator('input.form-check-input').nth(1);
    this.checkboxOption2 = page.locator('input.form-check-input').nth(2);
    this.checkboxOption3 = page.locator('input.form-check-input').nth(3);
    this.multipleCheckboxOutput = page.locator('(//div[@class="output-box"])[5]');

    // Radio Buttons
    this.radio1 = page.locator('input[type="radio"][value="Radio 1"]');
    this.radio2 = page.locator('input[type="radio"][value="Radio 2"]');
    this.radio3 = page.locator('input[type="radio"][value="Radio 3"]');
    this.radioOutput = page.locator('(//div[@class="output-box"])[6]');

    // Single Dropdown
    this.singleDropdown = page.getByLabel('Dropdown (Single Select):');
    this.singleDropdownOutput = page
      .locator('#singleDropdown')
      .locator('xpath=../../following-sibling::div//div[@class="output-box"]');

    // Multi Dropdown
    this.multiDropdown = page.getByLabel('Dropdown (Multi-Select):');
    this.multiDropdownOutput = page
      .locator('#multiDropdown')
      .locator('xpath=../../following-sibling::div//div[@class="output-box"]');
  }

  async checkBasicElementsVisible() {
    await Promise.all([
      this.textField.waitFor(),
      this.textArea.waitFor(),
      this.clickMeButton.waitFor(),
      this.singleCheckbox.waitFor(),
      this.checkboxOption1.waitFor(),
      this.radio1.waitFor(),
      this.singleDropdown.waitFor(),
      this.multiDropdown.waitFor(),
    ]);
    return true;
  }
}

export { BasicElementsPage };
