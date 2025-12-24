// tests/login.spec.js
import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/homeFixtures.js';
import { LoginPage } from '../../src/pages/LoginAutomation/LoginPage.js';
import dotenv from 'dotenv';

dotenv.config(); // load .env

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

test('login flow with fixture and env credentials', async ({ practiceSitePage }) => {
  const loginPage = new LoginPage(practiceSitePage);

  await loginPage.login(email, password);
  const welcomeVisible = await loginPage.verifyWelcomeMessage();

  expect(welcomeVisible).toBeTruthy();
});
