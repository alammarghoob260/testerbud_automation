/**
 * Data Validation Tests
 * Tests to validate test data and ensure it meets requirements before test execution
 */

import { test, expect } from '@playwright/test';
import { DataValidator } from '../../src/utils/DataValidator.js';
import { webFormData } from '../../src/utils/testData.js';
import { Logger } from '../../src/utils/Logger.js';
import dotenv from 'dotenv';

dotenv.config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

test.describe('Data Validation Tests', () => {
  test('validate form test data', async () => {
    Logger.info('Running form data validation test');

    const validation = DataValidator.validateFormData(webFormData);

    if (!validation.isValid) {
      Logger.error(`Form data validation failed: ${validation.errors.join(', ')}`);
    } else {
      Logger.success('Form data validation passed');
    }

    expect(validation.isValid).toBeTruthy();
    expect(validation.errors).toHaveLength(0);
  });

  test('validate login credentials', async () => {
    Logger.info('Running credentials validation test');

    const validation = DataValidator.validateCredentials(email, password);

    if (!validation.isValid) {
      Logger.error(`Credentials validation failed: ${validation.errors.join(', ')}`);
    } else {
      Logger.success('Credentials validation passed');
    }

    expect(validation.isValid).toBeTruthy();
    expect(validation.errors).toHaveLength(0);
  });

  test('validate individual form fields', async () => {
    Logger.info('Running individual field validation tests');

    expect(DataValidator.isValidEmail(webFormData.email)).toBeTruthy();
    Logger.debug('Email validation passed');

    expect(DataValidator.isValidName(webFormData.firstName)).toBeTruthy();
    Logger.debug('First name validation passed');

    expect(DataValidator.isValidName(webFormData.lastName)).toBeTruthy();
    Logger.debug('Last name validation passed');

    expect(DataValidator.isValidDate(webFormData.dob)).toBeTruthy();
    Logger.debug('DOB validation passed');

    expect(DataValidator.isValidPhoneNumber(webFormData.phoneNumber)).toBeTruthy();
    Logger.debug('Phone number validation passed');

    Logger.success('All field validations passed');
  });

  test('validate email format', async () => {
    Logger.info('Testing email validation');

    expect(DataValidator.isValidEmail('valid@example.com')).toBeTruthy();
    expect(DataValidator.isValidEmail('invalid.email')).toBeFalsy();
    expect(DataValidator.isValidEmail('another@domain.co.uk')).toBeTruthy();

    Logger.success('Email validation tests passed');
  });

  test('validate phone number format', async () => {
    Logger.info('Testing phone number validation');

    expect(DataValidator.isValidPhoneNumber('9876543210')).toBeTruthy();
    expect(DataValidator.isValidPhoneNumber('123')).toBeFalsy();
    expect(DataValidator.isValidPhoneNumber('+91 98765 43210')).toBeTruthy();

    Logger.success('Phone number validation tests passed');
  });

  test('validate date format', async () => {
    Logger.info('Testing date validation');

    expect(DataValidator.isValidDate('1995-08-15')).toBeTruthy();
    expect(DataValidator.isValidDate('2025-12-25')).toBeTruthy();
    expect(DataValidator.isValidDate('08-15-1995')).toBeFalsy();
    expect(DataValidator.isValidDate('1995-13-01')).toBeFalsy();

    Logger.success('Date validation tests passed');
  });

  test('validate name format', async () => {
    Logger.info('Testing name validation');

    expect(DataValidator.isValidName('John')).toBeTruthy();
    expect(DataValidator.isValidName('Mary-Jane')).toBeTruthy();
    expect(DataValidator.isValidName("O'Brien")).toBeTruthy();
    expect(DataValidator.isValidName('J')).toBeFalsy();
    expect(DataValidator.isValidName('123Invalid')).toBeFalsy();

    Logger.success('Name validation tests passed');
  });
});
