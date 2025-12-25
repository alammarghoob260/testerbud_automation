import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/homeFixtures.js';
import { AutomateWebFormPage } from '../../src/pages/WebFormAutomation/AutomateWebFormPage.js';
import { webFormData } from '../../src/utils/testData.js';
import { Logger } from '../../src/utils/Logger.js';
import { DataValidator } from '../../src/utils/DataValidator.js';

test('Web Form Automation flow with dummy data', async ({ practiceSitePage }) => {
  Logger.info('Starting Web Form Automation Test');

  // ✅ Step 0: Validate form data before automation
  const validation = DataValidator.validateFormData(webFormData);

  if (!validation.isValid) {
    Logger.error(`Form data validation failed: ${validation.errors.join(', ')}`);
    // Fail the test immediately if data is invalid
    expect(validation.isValid).toBeTruthy();
    return;
  }
  Logger.success('Form data validation passed');

  try {
    // Step 1: Select second practice site (Web Form Automation)
    Logger.info('Selecting second practice site (Web Form Automation)');
    await practiceSitePage.selectPracticeSite(1);

    // Step 2: Instantiate page object
    const formPage = new AutomateWebFormPage(practiceSitePage.page);

    // Step 3: Fill the form using test data
    Logger.info('Filling form with test data');
    await formPage.fillForm(webFormData);

    // Step 4: Verify success message
    Logger.info('Verifying success message');
    const successVisible = await formPage.verifySuccessMessage();
    expect(successVisible).toBeTruthy();
    Logger.success('Web Form test passed successfully');
  } catch (error) {
    Logger.error(`Web Form test failed: ${error.message}`);
    throw error;
  }
});
