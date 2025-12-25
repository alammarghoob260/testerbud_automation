// tests/login.spec.js
import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/homeFixtures.js';
import { LoginPage } from '../../src/pages/LoginAutomation/LoginPage.js';
import { Logger } from '../../src/utils/Logger.js';
import { DataValidator } from '../../src/utils/DataValidator.js';
import dotenv from 'dotenv';

dotenv.config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

test('login flow with first practice site', async ({ practiceSitePage }) => {
  Logger.info('Starting Login Test');

  // ✅ Step 1: Validate credentials before attempting login
  const validation = DataValidator.validateCredentials(email, password);

  if (!validation.isValid) {
    Logger.error(`Credentials validation failed: ${validation.errors.join(', ')}`);
    // Fail the test immediately if credentials are invalid
    expect(validation.isValid).toBeTruthy();
    return;
  }
  Logger.success('Credentials validation passed');

  try {
    Logger.info('Selecting first practice site');
    await practiceSitePage.selectPracticeSite(0);

    Logger.info(`Attempting login with email: ${email}`);
    const loginPage = new LoginPage(practiceSitePage.page);
    await loginPage.login(email, password);

    Logger.info('Verifying welcome message');
    const welcomeVisible = await loginPage.verifyWelcomeMessage();

    expect(welcomeVisible).toBeTruthy();
    Logger.success('Login test passed successfully');
  } catch (error) {
    Logger.error(`Login test failed: ${error.message}`);
    throw error;
  }
});
