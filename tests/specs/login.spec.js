// tests/login.spec.js
import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/homeFixtures.js';
import { LoginPage } from '../../src/pages/LoginAutomation/LoginPage.js';
import { Logger } from '../../src/utils/Logger.js';
import dotenv from 'dotenv';

dotenv.config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

test('login flow with first practice site', async ({ practiceSitePage }) => {
  Logger.info('Starting Login Test');
  
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
