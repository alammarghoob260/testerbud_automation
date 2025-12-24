// fixtures/homeFixture.js
import { test as base } from '@playwright/test';
import { homePageUrl } from '../utils/testData';

const test = base.extend({
  practiceSitePage: async ({ page }, use) => {
    // Navigate to homepage
    await page.goto(homePageUrl);
    await page.waitForLoadState('domcontentloaded');

    // Store locators in variables
    const practiceSiteDropdown = page.locator('#practice-sites-dropdown > span');
    const practiceSiteOptions = page.locator('#testerbud-navbar > div > div > div > a');

    // Dropdown open
    await practiceSiteDropdown.click();

    // Helper method to select option by index
    const selectPracticeSite = async (index = 0) => {
      await practiceSiteOptions.nth(index).click();
    };

    // Pass both page + helper to test
    await use({ page, selectPracticeSite });
  },
});

export { test };
