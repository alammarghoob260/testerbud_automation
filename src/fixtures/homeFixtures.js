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

      // ✅ Use role-based locator for the button
      const practiceSiteDropdown = page.getByRole('button', { name: 'Practice Sites' });
      const practiceSiteOptions = page.locator('#testerbud-navbar > div > div > div > a');

      // Helper method to select option by index
      const selectPracticeSite = async (index = 0) => {
        Logger.info(`Selecting practice site at index ${index}`);
        
        // Open dropdown
        Logger.info('Opening practice sites dropdown');
        await practiceSiteDropdown.waitFor({ state: 'visible', timeout: 15000 });
        await expect(practiceSiteDropdown).toBeVisible({ timeout: 15000 });
        await practiceSiteDropdown.click();
        
        // Select the option
        await expect(practiceSiteOptions.nth(index)).toBeVisible({ timeout: 15000 });
        await practiceSiteOptions.nth(index).click();
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
        await expect(page.locator(selector)).toBeVisible({ timeout });
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
