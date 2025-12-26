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
   */
  static isValidAddress(address = {}) {
    const { fullName, street, city, state, zip } = address;
    const errors = [];

    if (!this.isValidName(fullName)) errors.push('Invalid full name');
    if (!street || street.trim().length < 3) errors.push('Invalid street');
    if (!city || city.trim().length < 2) errors.push('Invalid city');
    if (!state || state.trim().length < 2) errors.push('Invalid state');
    if (!zip || !/^\d{4,10}$/.test(zip)) errors.push('Invalid zip');

    return { isValid: errors.length === 0, errors };
  }

  static isValidPayment(payment = {}) {
    const { cardNumber, expiry, cvv } = payment;
    const errors = [];

    if (!cardNumber || !/^\d{13,19}$/.test(cardNumber.replace(/\s+/g, '')))
      errors.push('Invalid card number');
    if (!expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) errors.push('Invalid expiry (MM/YY)');
    if (!cvv || !/^\d{3,4}$/.test(cvv)) errors.push('Invalid CVV');

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
}

export { DataValidator };
