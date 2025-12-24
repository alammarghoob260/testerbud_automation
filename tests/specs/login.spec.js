// tests/login.spec.js
import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/homeFixtures.js';
import { LoginPage } from '../../src/pages/LoginAutomation/LoginPage.js';
import dotenv from 'dotenv';

dotenv.config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

test('login flow with first practice site', async ({ practiceSitePage }) => {
  // abhi ke liye sirf pehla option
  await practiceSitePage.selectPracticeSite(0);

  const loginPage = new LoginPage(practiceSitePage.page);
  await loginPage.login(email, password);
  const welcomeVisible = await loginPage.verifyWelcomeMessage();

  expect(welcomeVisible).toBeTruthy();
});
