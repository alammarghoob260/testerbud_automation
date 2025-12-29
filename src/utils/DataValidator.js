/**
 * Data Validation Utilities
 * Provides validation helpers for test data and form inputs
 */

class DataValidator {
  static isValidEmail(email) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  static isValidPhoneNumber(phone) {
    if (!phone) return false;
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
  }

  static isValidDate(dateString) {
    if (!dateString) return false;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  }

  static isValidName(name) {
    if (!name) return false;
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    return nameRegex.test(name) && name.trim().length >= 2;
  }

  static isValidPassword(password) {
    if (!password) return false;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return passwordRegex.test(password);
  }

  static isValidQuantity(qty, max = 99) {
    const n = Number(qty);
    return Number.isInteger(n) && n > 0 && n <= max;
  }

  /**
   * Validates address fields (safe destructuring)
   * @param {Object} address - Address object with fullName, street, city, state, zip
   * @returns {Object} { isValid: boolean, errors: Array }
   */
  static isValidAddress(address = {}) {
    if (!address || typeof address !== 'object') {
      return { isValid: false, errors: ['Address must be a valid object'] };
    }

    const { fullName = '', street = '', city = '', state = '', zip = '' } = address;
    const errors = [];

    // Validate full name
    if (!fullName || !this.isValidName(fullName)) {
      errors.push('Invalid full name (min 2 letters, letters/spaces/hyphens/apostrophes only)');
    }

    // Validate street (at least 3 characters, alphanumeric and spaces)
    if (!street || street.trim().length < 3 || !/^[a-zA-Z0-9\s,\.\-#]*$/.test(street)) {
      errors.push('Invalid street (min 3 characters, alphanumeric and spaces allowed)');
    }

    // Validate city (at least 2 characters)
    if (!city || city.trim().length < 2 || !/^[a-zA-Z\s\-']*$/.test(city)) {
      errors.push('Invalid city (min 2 characters, letters only)');
    }

    // Validate state (at least 2 characters)
    if (!state || state.trim().length < 2 || !/^[a-zA-Z\s\-']*$/.test(state)) {
      errors.push('Invalid state (min 2 characters, letters only)');
    }

    // Validate zip code (4-10 digits)
    if (!zip || !/^\d{4,10}$/.test(zip.toString())) {
      errors.push('Invalid zip code (4-10 digits required)');
    }

    return { isValid: errors.length === 0, errors };
  }

  /**
   * Validates payment details
   * @param {Object} payment - Payment object with cardNumber, expiry, cvv
   * @returns {Object} { isValid: boolean, errors: Array }
   */
  static isValidPayment(payment = {}) {
    if (!payment || typeof payment !== 'object') {
      return { isValid: false, errors: ['Payment must be a valid object'] };
    }

    const { cardNumber = '', expiry = '', cvv = '' } = payment;
    const errors = [];

    // Validate card number (13-19 digits, Luhn algorithm would be ideal but this is sufficient)
    const cardDigitsOnly = cardNumber.toString().replace(/\s+/g, '');
    if (!cardDigitsOnly || !/^\d{13,19}$/.test(cardDigitsOnly)) {
      errors.push('Invalid card number (13-19 digits required, no special characters)');
    }

    // Validate expiry date (MM/YY format)
    if (!expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.toString())) {
      errors.push('Invalid expiry date (MM/YY format required, e.g., 12/25)');
    }

    // Validate CVV (3-4 digits)
    if (!cvv || !/^\d{3,4}$/.test(cvv.toString())) {
      errors.push('Invalid CVV (3-4 digits required)');
    }

    return { isValid: errors.length === 0, errors };
  }

  static validateFormData(data = {}) {
    const errors = [];

    if (!this.isValidName(data.firstName)) errors.push('Invalid first name format');
    if (!this.isValidName(data.lastName)) errors.push('Invalid last name format');
    if (!this.isValidEmail(data.email)) errors.push('Invalid email format');
    if (!this.isValidDate(data.dob)) errors.push('Invalid date of birth format (use YYYY-MM-DD)');
    if (!this.isValidPhoneNumber(data.phoneNumber))
      errors.push('Invalid phone number format (10 digits required)');

    return { isValid: errors.length === 0, errors };
  }

  static validateCredentials(email, password) {
    const errors = [];

    if (!this.isValidEmail(email)) errors.push('Invalid email format');
    if (!this.isValidPassword(password))
      errors.push(
        'Password must be at least 8 characters, include uppercase, lowercase, number, and special character'
      );

    return { isValid: errors.length === 0, errors };
  }

  /**
   * Validates flight booking form data
   * @param {Object} form - Form object with from, to, departureDate, returnDate, passengers, etc.
   * @returns {Object} { isValid: boolean, errors: Array }
   */
  static isValidFlightForm(form = {}) {
    if (!form || typeof form !== 'object') {
      return { isValid: false, errors: ['Form must be a valid object'] };
    }

    const { from = '', to = '', departureDate = '', returnDate = '', passengers = 1 } = form;
    const errors = [];

    // Validate from location
    if (!from || from.trim().length < 2) {
      errors.push('Invalid departure location (min 2 characters required)');
    }

    // Validate to location
    if (!to || to.trim().length < 2) {
      errors.push('Invalid destination location (min 2 characters required)');
    }

    // Validate departure date
    if (!this.isValidDate(departureDate)) {
      errors.push('Invalid departure date (use YYYY-MM-DD format)');
    }

    // Validate return date (optional, but if provided should be valid)
    if (returnDate && !this.isValidDate(returnDate)) {
      errors.push('Invalid return date (use YYYY-MM-DD format)');
    }

    // Validate passengers
    if (!this.isValidQuantity(passengers, 9)) {
      errors.push('Invalid number of passengers (1-9 required)');
    }

    return { isValid: errors.length === 0, errors };
  }
}

export { DataValidator };
