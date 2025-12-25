// tests/forgotPassword.spec.js
import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/homeFixtures.js';
import { ForgotPasswordPage } from '../../src/pages/ForgotPasswordPage/ForgotPasswordPage.js';
import { VerifyCodePage } from '../../src/pages/ForgotPasswordPage/VerifyCodePage.js';
import { ResetPasswordPage } from '../../src/pages/ForgotPasswordPage/ResetPasswordPage.js';
import { testDetails } from '../../src/utils/testData.js';
import { Logger } from '../../src/utils/Logger.js';
import { DataValidator } from '../../src/utils/DataValidator.js';

test('Forgot Password Flow', async ({ practiceSitePage }) => {
  Logger.info('Starting Forgot Password Test');

  // ✅ Step 0: Validate input data before automation
  const errors = [];

  if (!DataValidator.isValidEmail(testDetails.email)) {
    errors.push('Invalid email format');
  }
  if (!testDetails.securityCode || testDetails.securityCode.length < 4) {
    errors.push('Invalid security code format');
  }
  if (!DataValidator.isValidPassword(testDetails.newPassword)) {
    errors.push(
      'New password must be at least 8 characters, include uppercase, lowercase, number, and special character'
    );
  }

  if (errors.length > 0) {
    Logger.error(`Forgot Password data validation failed: ${errors.join(', ')}`);
    expect(errors).toHaveLength(0); // fail the test immediately
    return;
  }
  Logger.success('Forgot Password data validation passed');

  // Step 1: Select practice site (3rd option)
  await practiceSitePage.selectPracticeSite(2);

  // Step 2: Forgot Password Page
  const forgotPage = new ForgotPasswordPage(practiceSitePage.page);
  expect(await forgotPage.isVisible()).toBeTruthy();
  await forgotPage.enterEmail(testDetails.email);
  await forgotPage.clickContinue();

  // Step 3: Verify Code Page
  const verifyPage = new VerifyCodePage(practiceSitePage.page);
  expect(await verifyPage.isVisible()).toBeTruthy();
  await verifyPage.enterCode(testDetails.securityCode);
  await verifyPage.clickVerify();

  // Step 4: Reset Password Page
  const resetPage = new ResetPasswordPage(practiceSitePage.page);
  expect(await resetPage.isVisible()).toBeTruthy();
  await resetPage.enterPasswords(
    testDetails.oldPassword,
    testDetails.newPassword,
    testDetails.newPassword
  );
  await resetPage.clickReset();

  // Step 5: Final Confirmation
  expect(await resetPage.successMessageVisible()).toBeTruthy();
  Logger.success('Forgot Password flow passed successfully');
});
