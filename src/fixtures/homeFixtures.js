// fixtures/homeFixture.js
import { test as base } from '@playwright/test';
import { homePageUrl } from '../utils/testData.js';
import { Logger } from '../utils/Logger.js';

const test = base.extend({
  practiceSitePage: async ({ page }, use) => {
    Logger.info('Setting up practiceSitePage fixture');

    try {
      // Navigate to homepage
      Logger.info(`Navigating to ${homePageUrl}`);
      await page.goto(homePageUrl);
      await page.waitForLoadState('domcontentloaded');
      Logger.success('Homepage loaded successfully');

      // Store locators in variables
      const practiceSiteDropdown = page.locator('#practice-sites-dropdown > span');
      const practiceSiteOptions = page.locator('#testerbud-navbar > div > div > div > a');

      // Dropdown open
      Logger.info('Opening practice sites dropdown');
      await practiceSiteDropdown.click();
      await page.waitForLoadState('domcontentloaded');

      // Helper method to select option by index
      const selectPracticeSite = async (index = 0) => {
        Logger.info(`Selecting practice site at index ${index}`);
        await practiceSiteOptions.nth(index).click();
        await page.waitForLoadState('domcontentloaded');
        Logger.success(`Successfully navigated to practice site ${index}`);
      };

      // Helper to navigate to home
      const navigateHome = async () => {
        Logger.info('Navigating back to home');
        await page.goto(homePageUrl);
        await page.waitForLoadState('domcontentloaded');
      };

      // Helper to wait for element visibility
      const waitForElement = async (selector, timeout = 5000) => {
        Logger.debug(`Waiting for element: ${selector}`);
        await page.locator(selector).waitFor({ state: 'visible', timeout });
      };

      // Helper to check page readiness
      const isPageReady = async () => {
        try {
          await page.waitForLoadState('networkidle', { timeout: 3000 });
          return true;
        } catch {
          return false;
        }
      };

      // Pass page + helpers to test
      await use({
        page,
        selectPracticeSite,
        navigateHome,
        waitForElement,
        isPageReady,
      });

      Logger.info('Fixture teardown completed');
    } catch (error) {
      Logger.error(`Fixture setup failed: ${error.message}`);
      throw error;
    }
  },
});

export { test };
