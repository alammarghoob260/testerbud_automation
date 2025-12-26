// tests/registration.spec.js
import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/homeFixtures.js';
import { RegistrationPage } from '../../src/pages/RegistrationForm/registrationPage.js';
import { Logger } from '../../src/utils/Logger.js';
import { DataValidator } from '../../src/utils/DataValidator.js';
import { registrationDetails } from '../../src/utils/testData.js';

test('Registration Flow with valid data', async ({ practiceSitePage }) => {
  Logger.info('Starting Registration Test');

  // ✅ Step 0: Validate input data before automation
  const errors = [];

  if (!DataValidator.isValidEmail(registrationDetails.email)) {
    errors.push('Invalid email format');
  }
  if (!DataValidator.isValidPassword(registrationDetails.password)) {
    errors.push(
      'Password must be at least 8 characters, include uppercase, lowercase, number, and special character'
    );
  }
  if (registrationDetails.password !== registrationDetails.confirmPassword) {
    errors.push('Confirm password does not match');
  }

  if (errors.length > 0) {
    Logger.error(`Registration data validation failed: ${errors.join(', ')}`);
    expect(errors).toHaveLength(0); // fail the test immediately
    return;
  }
  Logger.success('Registration data validation passed');

  try {
    // Step 1: Select practice site (4th option)
    Logger.info('Selecting Registration practice site');
    await practiceSitePage.selectPracticeSite(3);

    // Step 2: Instantiate page object
    const registrationPage = new RegistrationPage(practiceSitePage.page);

    // Step 3: Fill the registration form
    Logger.info('Filling registration form');
    await registrationPage.register(
      registrationDetails.email,
      registrationDetails.password,
      registrationDetails.confirmPassword
    );

    // Step 4: Verify success message
    Logger.info('Verifying registration success message');
    const successVisible = await registrationPage.verifySuccessMessage();
    expect(successVisible).toBeTruthy();
    Logger.success('Registration test passed successfully');
  } catch (error) {
    Logger.error(`Registration test failed: ${error.message}`);
    throw error;
  }
});
