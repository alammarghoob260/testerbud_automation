import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/homeFixtures.js';
import { AutomateWebFormPage } from '../../src/pages/WebFormAutomation/AutomateWebFormPage.js';
import { webFormData } from '../../src/utils/testData.js';

test('Web Form Automation flow with dummy data', async ({ practiceSitePage }) => {
  // Step 1: Select second practice site (Web Form Automation)
  await practiceSitePage.selectPracticeSite(1);

  // Step 2: Instantiate page object
  const formPage = new AutomateWebFormPage(practiceSitePage.page);

  // Step 3: Fill the form using test data
  await formPage.fillForm(webFormData);

  // Step 4: Verify success message
  const successVisible = await formPage.verifySuccessMessage();
  expect(successVisible).toBeTruthy();
});
