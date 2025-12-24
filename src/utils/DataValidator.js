/**
 * Data Validation Utilities
 * Provides validation helpers for test data and form inputs
 */

class DataValidator {
  /**
   * Validates email format
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates phone number format
   */
  static isValidPhoneNumber(phone) {
    // Remove all non-digit characters and check if at least 10 digits remain
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
  }

  /**
   * Validates date format (YYYY-MM-DD)
   */
  static isValidDate(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;

    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  }

  /**
   * Validates name fields (letters, spaces, hyphens)
   */
  static isValidName(name) {
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    return nameRegex.test(name) && name.length >= 2;
  }

  /**
   * Validates entire form data object
   */
  static validateFormData(data) {
    const errors = [];

    if (!this.isValidName(data.firstName)) {
      errors.push('Invalid first name format');
    }
    if (!this.isValidName(data.lastName)) {
      errors.push('Invalid last name format');
    }
    if (!this.isValidEmail(data.email)) {
      errors.push('Invalid email format');
    }
    if (!this.isValidDate(data.dob)) {
      errors.push('Invalid date of birth format (use YYYY-MM-DD)');
    }
    if (!this.isValidPhoneNumber(data.phoneNumber)) {
      errors.push('Invalid phone number format (10 digits required)');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validates credentials
   */
  static validateCredentials(email, password) {
    const errors = [];

    if (!this.isValidEmail(email)) {
      errors.push('Invalid email format');
    }
    if (!password || password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export { DataValidator };
