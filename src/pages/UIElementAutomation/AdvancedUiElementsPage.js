/**
 * AdvancedUiElementsPage Page Object
 * Handles advanced UI elements and interactions
 */

class AdvancedUiElementsPage {
  constructor(page) {
    this.page = page;
    
    // Input Elements with Validation
    this.inputWithValidation = 'input.form-control';
    this.inputError = '.invalid-feedback';
    this.inputSuccess = '.valid-feedback';
    this.inputGroup = '.input-group';
    
    // Date Picker
    this.dateInput = 'input[type="date"]';
    this.datePickerContainer = '.date-picker';
    this.datePickerCalendar = '.calendar';
    
    // Time Picker
    this.timeInput = 'input[type="time"]';
    this.timePickerContainer = '.time-picker';
    
    // Color Picker
    this.colorInput = 'input[type="color"]';
    this.colorPickerContainer = '.color-picker';
    
    // Range Slider
    this.rangeSlider = 'input[type="range"]';
    this.sliderContainer = '.slider-container';
    this.sliderValue = '.slider-value';
    
    // Toggle Switch
    this.toggleSwitch = '.toggle-switch, input[type="checkbox"].switch';
    this.switchLabel = '.switch-label';
    
    // Rating Component
    this.ratingContainer = '.rating';
    this.ratingStar = '.star';
    this.ratingValue = '.rating-value';
    
    // Search Input
    this.searchInput = 'input[type="search"], .search-input';
    this.searchButton = 'button.search-btn';
    this.searchResults = '.search-results';
    this.searchResultItem = '.search-result-item';
    
    // Autocomplete
    this.autocompleteInput = '.autocomplete input';
    this.autocompleteDropdown = '.autocomplete-dropdown';
    this.autocompleteItem = '.autocomplete-item';
    
    // Multiselect
    this.multiselectContainer = '.multiselect';
    this.multiselectInput = '.multiselect input';
    this.multiselectDropdown = '.multiselect-dropdown';
    this.multiselectOption = '.multiselect-option';
    this.selectedTag = '.selected-tag';
    
    // File Upload
    this.fileInput = 'input[type="file"]';
    this.fileUploadArea = '.file-upload-area';
    this.uploadedFile = '.uploaded-file';
    this.deleteFileButton = '.delete-file';
  }

  /**
   * Fill input with validation
   */
  async fillInputWithValidation(selector, value) {
    await this.page.fill(selector, value);
    await this.page.waitForFunction(() => {
      return document.querySelector(`${selector}`).checkValidity();
    });
  }

  /**
   * Get input error message
   */
  async getInputErrorMessage(inputSelector) {
    const errorSelector = `${inputSelector} + ${this.inputError}`;
    return await this.page.textContent(errorSelector);
  }

  /**
   * Check if input has error
   */
  async hasInputError(inputSelector) {
    return await this.page.isVisible(`${inputSelector} + ${this.inputError}`);
  }

  /**
   * Select date from date picker
   */
  async selectDate(dateString) {
    await this.page.fill(this.dateInput, dateString);
  }

  /**
   * Get selected date
   */
  async getSelectedDate() {
    return await this.page.inputValue(this.dateInput);
  }

  /**
   * Select time from time picker
   */
  async selectTime(timeString) {
    await this.page.fill(this.timeInput, timeString);
  }

  /**
   * Get selected time
   */
  async getSelectedTime() {
    return await this.page.inputValue(this.timeInput);
  }

  /**
   * Select color from color picker
   */
  async selectColor(colorHex) {
    await this.page.fill(this.colorInput, colorHex);
  }

  /**
   * Get selected color
   */
  async getSelectedColor() {
    return await this.page.inputValue(this.colorInput);
  }

  /**
   * Set range slider value
   */
  async setRangeSliderValue(value) {
    await this.page.fill(this.rangeSlider, value.toString());
  }

  /**
   * Get range slider value
   */
  async getRangeSliderValue() {
    return await this.page.inputValue(this.rangeSlider);
  }

  /**
   * Toggle switch on/off
   */
  async toggleSwitch(isOn = true) {
    const isChecked = await this.page.isChecked(this.toggleSwitch);
    if (isChecked !== isOn) {
      await this.page.click(this.toggleSwitch);
    }
  }

  /**
   * Check if switch is on
   */
  async isSwitchOn() {
    return await this.page.isChecked(this.toggleSwitch);
  }

  /**
   * Set rating
   */
  async setRating(starCount) {
    const stars = await this.page.$$(this.ratingStar);
    if (stars.length >= starCount) {
      await stars[starCount - 1].click();
    }
  }

  /**
   * Get current rating
   */
  async getCurrentRating() {
    return await this.page.textContent(this.ratingValue);
  }

  /**
   * Search for text
   */
  async search(searchText) {
    await this.page.fill(this.searchInput, searchText);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchResults, { state: 'visible' });
  }

  /**
   * Get search results count
   */
  async getSearchResultsCount() {
    const results = await this.page.$$(this.searchResultItem);
    return results.length;
  }

  /**
   * Click search result
   */
  async clickSearchResult(index) {
    const results = await this.page.$$(this.searchResultItem);
    if (results.length > index) {
      await results[index].click();
    }
  }

  /**
   * Type in autocomplete
   */
  async typeAutocomplete(text) {
    await this.page.fill(this.autocompleteInput, text);
    await this.page.waitForSelector(this.autocompleteDropdown, { state: 'visible' });
  }

  /**
   * Select autocomplete item
   */
  async selectAutocompleteItem(itemText) {
    const items = await this.page.$$(this.autocompleteItem);
    for (const item of items) {
      const text = await item.textContent();
      if (text.includes(itemText)) {
        await item.click();
        break;
      }
    }
  }

  /**
   * Select multiple items in multiselect
   */
  async selectMultiselectItems(items) {
    for (const item of items) {
      await this.page.fill(this.multiselectInput, item);
      const options = await this.page.$$(this.multiselectOption);
      for (const option of options) {
        const text = await option.textContent();
        if (text.includes(item)) {
          await option.click();
          break;
        }
      }
    }
  }

  /**
   * Get selected multiselect items
   */
  async getSelectedMultiselectItems() {
    const tags = await this.page.$$(this.selectedTag);
    const items = [];
    for (const tag of tags) {
      items.push(await tag.textContent());
    }
    return items;
  }

  /**
   * Upload file
   */
  async uploadFile(filePath) {
    await this.page.fill(this.fileInput, filePath);
  }

  /**
   * Get uploaded files count
   */
  async getUploadedFilesCount() {
    const files = await this.page.$$(this.uploadedFile);
    return files.length;
  }

  /**
   * Delete uploaded file
   */
  async deleteUploadedFile(fileIndex) {
    const deleteButtons = await this.page.$$(this.deleteFileButton);
    if (deleteButtons.length > fileIndex) {
      await deleteButtons[fileIndex].click();
    }
  }
}

module.exports = AdvancedUiElementsPage;
