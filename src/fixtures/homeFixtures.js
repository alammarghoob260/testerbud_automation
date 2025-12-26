// fixtures/homeFixture.js
import { test as base, expect } from '@playwright/test';
import { homePageUrl } from '../utils/testData.js';
import { Logger } from '../utils/Logger.js';

const test = base.extend({
  practiceSitePage: async ({ page }, use) => {
    Logger.info('Setting up practiceSitePage fixture');

    try {
      // Navigate to homepage with explicit wait and timeout
      Logger.info(`Navigating to ${homePageUrl}`);
      await page.goto(homePageUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForLoadState('domcontentloaded');
      expect(page.url()).toContain('testerbud.com');
      Logger.success('Homepage loaded successfully');

      // Store locators in variables
      const practiceSiteDropdown = page.locator('#practice-sites-dropdown > span');
      const practiceSiteOptions = page.locator('#testerbud-navbar > div > div > div > a');

      // Wait for dropdown to be visible
      Logger.info('Waiting for practice sites dropdown');
      await practiceSiteDropdown.waitFor({ state: 'visible', timeout: 15000 });
      expect(await practiceSiteDropdown.isVisible()).toBeTruthy();

      // Dropdown open
      Logger.info('Opening practice sites dropdown');
      await practiceSiteDropdown.click();
      await page.waitForLoadState('domcontentloaded');

      // Helper method to select option by index
      const selectPracticeSite = async (index = 0) => {
        Logger.info(`Selecting practice site at index ${index}`);
        await practiceSiteOptions.nth(index).waitFor({ state: 'visible', timeout: 15000 });
        expect(await practiceSiteOptions.nth(index).isVisible()).toBeTruthy();
        await practiceSiteOptions.nth(index).click();
        await page.waitForLoadState('domcontentloaded');
        Logger.success(`Successfully navigated to practice site ${index}`);
      };

      // Helper to navigate to home
      const navigateHome = async () => {
        Logger.info('Navigating back to home');
        await page.goto(homePageUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForLoadState('domcontentloaded');
      };

      // Helper to wait for element visibility
      const waitForElement = async (selector, timeout = 10000) => {
        Logger.debug(`Waiting for element: ${selector}`);
        await page.locator(selector).waitFor({ state: 'visible', timeout });
        expect(await page.locator(selector).isVisible()).toBeTruthy();
      };

      // Helper to check page readiness
      const isPageReady = async () => {
        try {
          await page.waitForLoadState('networkidle', { timeout: 5000 });
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
